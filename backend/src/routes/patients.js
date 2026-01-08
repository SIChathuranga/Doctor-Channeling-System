import express from 'express';
import { db } from '../config/firebase.js';
import { verifyToken, isDoctor } from '../middleware/auth.js';

const router = express.Router();

// Get doctor's patients (Doctor only)
router.get('/', verifyToken, isDoctor, async (req, res) => {
    try {
        const { search, page = 1, limit = 20 } = req.query;

        // Get unique patients from appointments
        const appointmentsSnapshot = await db.collection('appointments')
            .where('doctorId', '==', req.user.uid)
            .orderBy('createdAt', 'desc')
            .get();

        const patientIds = new Set();
        const patientAppointments = {};

        appointmentsSnapshot.forEach(doc => {
            const data = doc.data();
            patientIds.add(data.patientId);

            if (!patientAppointments[data.patientId]) {
                patientAppointments[data.patientId] = {
                    count: 0,
                    lastVisit: data.date
                };
            }
            patientAppointments[data.patientId].count++;
        });

        // Get patient details
        const patients = [];
        for (const patientId of patientIds) {
            const patientDoc = await db.collection('users').doc(patientId).get();
            if (patientDoc.exists) {
                const data = patientDoc.data();
                patients.push({
                    id: patientId,
                    name: data.displayName,
                    email: data.email,
                    phone: data.phone,
                    gender: data.gender,
                    age: data.dateOfBirth ? calculateAge(data.dateOfBirth) : null,
                    bloodGroup: data.bloodGroup,
                    totalVisits: patientAppointments[patientId].count,
                    lastVisit: patientAppointments[patientId].lastVisit
                });
            }
        }

        // Filter by search if provided
        let filteredPatients = patients;
        if (search) {
            const searchLower = search.toLowerCase();
            filteredPatients = patients.filter(p =>
                p.name?.toLowerCase().includes(searchLower) ||
                p.email?.toLowerCase().includes(searchLower)
            );
        }

        res.json({
            success: true,
            data: filteredPatients.slice(0, parseInt(limit)),
            total: filteredPatients.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get patient's medical history (Doctor only)
router.get('/:id/history', verifyToken, isDoctor, async (req, res) => {
    try {
        const patientId = req.params.id;

        // Get appointments
        const appointmentsSnapshot = await db.collection('appointments')
            .where('patientId', '==', patientId)
            .where('doctorId', '==', req.user.uid)
            .orderBy('date', 'desc')
            .get();

        const appointments = [];
        appointmentsSnapshot.forEach(doc => {
            appointments.push({ id: doc.id, ...doc.data() });
        });

        // Get prescriptions
        const prescriptionsSnapshot = await db.collection('prescriptions')
            .where('patientId', '==', patientId)
            .where('doctorId', '==', req.user.uid)
            .orderBy('createdAt', 'desc')
            .get();

        const prescriptions = [];
        prescriptionsSnapshot.forEach(doc => {
            prescriptions.push({ id: doc.id, ...doc.data() });
        });

        res.json({
            success: true,
            data: {
                appointments,
                prescriptions
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Helper function to calculate age
function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export default router;
