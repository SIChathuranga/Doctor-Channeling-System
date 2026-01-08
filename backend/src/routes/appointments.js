import express from 'express';
import { db } from '../config/firebase.js';
import { verifyToken, isDoctor, isDoctorOrAdmin } from '../middleware/auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Create new appointment (Patient)
router.post('/', verifyToken, async (req, res) => {
    try {
        const { doctorId, date, time, notes } = req.body;

        // Get doctor details
        const doctorDoc = await db.collection('users').doc(doctorId).get();
        if (!doctorDoc.exists || doctorDoc.data().role !== 'doctor') {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        const doctorData = doctorDoc.data();

        // Get patient details
        const patientDoc = await db.collection('users').doc(req.user.uid).get();
        const patientData = patientDoc.data();

        // Generate queue number (count appointments for that doctor on that date)
        const existingAppointments = await db.collection('appointments')
            .where('doctorId', '==', doctorId)
            .where('date', '==', date)
            .get();

        const queueNumber = existingAppointments.size + 1;

        const appointmentData = {
            doctorId,
            doctorName: doctorData.displayName,
            doctorSpecialty: doctorData.specialty,
            doctorPhoto: doctorData.photoURL,
            hospital: doctorData.hospital,
            patientId: req.user.uid,
            patientName: patientData.displayName,
            patientEmail: patientData.email,
            patientPhone: patientData.phone,
            date,
            time,
            notes: notes || '',
            fee: doctorData.consultationFee || 0,
            queueNumber,
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const docRef = await db.collection('appointments').add(appointmentData);

        res.status(201).json({
            success: true,
            message: 'Appointment booked successfully',
            data: {
                id: docRef.id,
                queueNumber,
                ...appointmentData
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get user's appointments
router.get('/my', verifyToken, async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;

        let query;
        if (req.user.role === 'doctor') {
            query = db.collection('appointments').where('doctorId', '==', req.user.uid);
        } else {
            query = db.collection('appointments').where('patientId', '==', req.user.uid);
        }

        if (status && status !== 'all') {
            query = query.where('status', '==', status);
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

// Get appointment by ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const doc = await db.collection('appointments').doc(req.params.id).get();

        if (!doc.exists) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        const data = doc.data();

        // Check if user has access to this appointment
        if (data.patientId !== req.user.uid && data.doctorId !== req.user.uid && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        res.json({
            success: true,
            data: { id: doc.id, ...data }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update appointment status (Doctor/Admin)
router.put('/:id/status', verifyToken, isDoctorOrAdmin, async (req, res) => {
    try {
        const { status } = req.body;

        if (!['confirmed', 'cancelled', 'completed', 'no-show'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        await db.collection('appointments').doc(req.params.id).update({
            status,
            updatedAt: new Date()
        });

        res.json({
            success: true,
            message: `Appointment ${status} successfully`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Cancel appointment (Patient - only pending/confirmed)
router.put('/:id/cancel', verifyToken, async (req, res) => {
    try {
        const doc = await db.collection('appointments').doc(req.params.id).get();

        if (!doc.exists) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        const data = doc.data();

        if (data.patientId !== req.user.uid) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        if (!['pending', 'confirmed'].includes(data.status)) {
            return res.status(400).json({
                success: false,
                message: 'Cannot cancel this appointment'
            });
        }

        await db.collection('appointments').doc(req.params.id).update({
            status: 'cancelled',
            cancelledBy: 'patient',
            cancelledAt: new Date(),
            updatedAt: new Date()
        });

        res.json({
            success: true,
            message: 'Appointment cancelled successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Add prescription to appointment (Doctor)
router.post('/:id/prescription', verifyToken, isDoctor, async (req, res) => {
    try {
        const { diagnosis, medications, instructions, followUpDate } = req.body;

        const doc = await db.collection('appointments').doc(req.params.id).get();

        if (!doc.exists) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        if (doc.data().doctorId !== req.user.uid) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const prescription = {
            id: uuidv4(),
            appointmentId: req.params.id,
            doctorId: req.user.uid,
            patientId: doc.data().patientId,
            diagnosis,
            medications,
            instructions,
            followUpDate,
            createdAt: new Date()
        };

        await db.collection('prescriptions').add(prescription);

        await db.collection('appointments').doc(req.params.id).update({
            hasPrescription: true,
            updatedAt: new Date()
        });

        res.status(201).json({
            success: true,
            message: 'Prescription added successfully',
            data: prescription
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
