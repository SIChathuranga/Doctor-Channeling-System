import express from 'express';
import { db } from '../config/firebase.js';
import { verifyToken, isDoctor } from '../middleware/auth.js';

const router = express.Router();

// Get all verified doctors (public)
router.get('/', async (req, res) => {
    try {
        const { specialty, location, page = 1, limit = 10 } = req.query;

        let query = db.collection('users').where('role', '==', 'doctor').where('isVerified', '==', true);

        if (specialty) {
            query = query.where('specialty', '==', specialty);
        }

        const snapshot = await query.limit(parseInt(limit)).get();

        const doctors = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            doctors.push({
                id: doc.id,
                displayName: data.displayName,
                specialty: data.specialty,
                qualification: data.qualification,
                hospital: data.hospital,
                location: data.location,
                experience: data.experience,
                rating: data.rating || 0,
                reviewCount: data.reviewCount || 0,
                fee: data.consultationFee,
                photoURL: data.photoURL,
                isVerified: data.isVerified,
                languages: data.languages || []
            });
        });

        res.json({
            success: true,
            data: doctors,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: doctors.length
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get doctor by ID (public)
router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection('users').doc(req.params.id).get();

        if (!doc.exists || doc.data().role !== 'doctor') {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        const data = doc.data();

        // Get doctor's schedule
        const scheduleDoc = await db.collection('schedules').doc(req.params.id).get();

        // Get doctor's reviews
        const reviewsSnapshot = await db.collection('reviews')
            .where('doctorId', '==', req.params.id)
            .orderBy('createdAt', 'desc')
            .limit(10)
            .get();

        const reviews = [];
        reviewsSnapshot.forEach(reviewDoc => {
            reviews.push({ id: reviewDoc.id, ...reviewDoc.data() });
        });

        res.json({
            success: true,
            data: {
                id: doc.id,
                displayName: data.displayName,
                specialty: data.specialty,
                qualification: data.qualification,
                hospital: data.hospital,
                location: data.location,
                experience: data.experience,
                rating: data.rating || 0,
                reviewCount: data.reviewCount || 0,
                patientCount: data.patientCount || 0,
                fee: data.consultationFee,
                photoURL: data.photoURL,
                isVerified: data.isVerified,
                about: data.about,
                education: data.education || [],
                services: data.services || [],
                languages: data.languages || [],
                schedule: scheduleDoc.exists ? scheduleDoc.data() : {},
                reviews
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update doctor profile (Doctor only)
router.put('/profile', verifyToken, isDoctor, async (req, res) => {
    try {
        const { specialty, qualification, hospital, experience, consultationFee, about, services, languages } = req.body;

        const updateData = {
            ...(specialty && { specialty }),
            ...(qualification && { qualification }),
            ...(hospital && { hospital }),
            ...(experience && { experience }),
            ...(consultationFee && { consultationFee }),
            ...(about && { about }),
            ...(services && { services }),
            ...(languages && { languages }),
            updatedAt: new Date()
        };

        await db.collection('users').doc(req.user.uid).update(updateData);

        res.json({
            success: true,
            message: 'Doctor profile updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update doctor schedule (Doctor only)
router.put('/schedule', verifyToken, isDoctor, async (req, res) => {
    try {
        const { schedule } = req.body;

        await db.collection('schedules').doc(req.user.uid).set({
            ...schedule,
            updatedAt: new Date()
        }, { merge: true });

        res.json({
            success: true,
            message: 'Schedule updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get doctor's schedule
router.get('/:id/schedule', async (req, res) => {
    try {
        const scheduleDoc = await db.collection('schedules').doc(req.params.id).get();

        res.json({
            success: true,
            data: scheduleDoc.exists ? scheduleDoc.data() : {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
