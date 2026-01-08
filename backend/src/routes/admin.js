import express from 'express';
import { db, auth } from '../config/firebase.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get dashboard stats (Admin only)
router.get('/stats', verifyToken, isAdmin, async (req, res) => {
    try {
        // Count doctors
        const doctorsSnapshot = await db.collection('users').where('role', '==', 'doctor').get();
        const totalDoctors = doctorsSnapshot.size;
        const verifiedDoctors = doctorsSnapshot.docs.filter(doc => doc.data().isVerified).length;
        const pendingDoctors = totalDoctors - verifiedDoctors;

        // Count patients
        const patientsSnapshot = await db.collection('users').where('role', '==', 'patient').get();
        const totalPatients = patientsSnapshot.size;

        // Count appointments
        const appointmentsSnapshot = await db.collection('appointments').get();
        const totalAppointments = appointmentsSnapshot.size;

        // Today's appointments
        const today = new Date().toISOString().split('T')[0];
        const todayAppointments = appointmentsSnapshot.docs.filter(doc => doc.data().date === today).length;

        // Calculate revenue
        let totalRevenue = 0;
        appointmentsSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.status === 'completed') {
                totalRevenue += data.fee || 0;
            }
        });

        res.json({
            success: true,
            data: {
                totalDoctors,
                verifiedDoctors,
                pendingDoctors,
                totalPatients,
                totalAppointments,
                todayAppointments,
                totalRevenue
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get all doctors (Admin only)
router.get('/doctors', verifyToken, isAdmin, async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;

        let query = db.collection('users').where('role', '==', 'doctor');

        if (status === 'verified') {
            query = query.where('isVerified', '==', true);
        } else if (status === 'pending') {
            query = query.where('isVerified', '==', false);
        }

        const snapshot = await query.limit(parseInt(limit)).get();

        const doctors = [];
        snapshot.forEach(doc => {
            doctors.push({ id: doc.id, ...doc.data() });
        });

        res.json({
            success: true,
            data: doctors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Verify/Approve doctor (Admin only)
router.put('/doctors/:id/verify', verifyToken, isAdmin, async (req, res) => {
    try {
        const { isVerified } = req.body;

        await db.collection('users').doc(req.params.id).update({
            isVerified: isVerified !== false,
            verifiedAt: new Date(),
            verifiedBy: req.user.uid
        });

        res.json({
            success: true,
            message: isVerified ? 'Doctor verified successfully' : 'Doctor verification revoked'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get all patients (Admin only)
router.get('/patients', verifyToken, isAdmin, async (req, res) => {
    try {
        const { search, page = 1, limit = 20 } = req.query;

        const snapshot = await db.collection('users')
            .where('role', '==', 'patient')
            .limit(parseInt(limit))
            .get();

        const patients = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            patients.push({
                id: doc.id,
                displayName: data.displayName,
                email: data.email,
                phone: data.phone,
                createdAt: data.createdAt
            });
        });

        res.json({
            success: true,
            data: patients
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get all appointments (Admin only)
router.get('/appointments', verifyToken, isAdmin, async (req, res) => {
    try {
        const { status, date, page = 1, limit = 50 } = req.query;

        let query = db.collection('appointments');

        if (status && status !== 'all') {
            query = query.where('status', '==', status);
        }

        if (date) {
            query = query.where('date', '==', date);
        }

        query = query.orderBy('date', 'desc').limit(parseInt(limit));

        const snapshot = await query.get();

        const appointments = [];
        snapshot.forEach(doc => {
            appointments.push({ id: doc.id, ...doc.data() });
        });

        res.json({
            success: true,
            data: appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Delete user (Admin only)
router.delete('/users/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        // Delete from Firebase Auth
        await auth.deleteUser(req.params.id);

        // Delete from Firestore
        await db.collection('users').doc(req.params.id).delete();

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
