import express from 'express';
import { auth, db } from '../config/firebase.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get current user profile
router.get('/me', verifyToken, async (req, res) => {
    try {
        const userDoc = await db.collection('users').doc(req.user.uid).get();

        if (!userDoc.exists) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: {
                uid: req.user.uid,
                ...userDoc.data()
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update user profile
router.put('/me', verifyToken, async (req, res) => {
    try {
        const { displayName, phone, dateOfBirth, gender, bloodGroup, address } = req.body;

        const updateData = {
            ...(displayName && { displayName }),
            ...(phone && { phone }),
            ...(dateOfBirth && { dateOfBirth }),
            ...(gender && { gender }),
            ...(bloodGroup && { bloodGroup }),
            ...(address && { address }),
            updatedAt: new Date()
        };

        await db.collection('users').doc(req.user.uid).update(updateData);

        res.json({
            success: true,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Set custom claims for user role (Admin only)
router.post('/set-role', verifyToken, async (req, res) => {
    try {
        const { uid, role } = req.body;

        // Check if requester is admin
        const requesterDoc = await db.collection('users').doc(req.user.uid).get();
        if (requesterDoc.data()?.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access required'
            });
        }

        // Set custom claims
        await auth.setCustomUserClaims(uid, { role });

        // Update user document
        await db.collection('users').doc(uid).update({ role });

        res.json({
            success: true,
            message: `Role set to ${role} successfully`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
