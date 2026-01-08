import { auth } from '../config/firebase.js';

// Verify Firebase Auth Token
export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const token = authHeader.split('Bearer ')[1];

        try {
            const decodedToken = await auth.verifyIdToken(token);
            req.user = {
                uid: decodedToken.uid,
                email: decodedToken.email,
                role: decodedToken.role || 'patient'
            };
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Authentication error'
        });
    }
};

// Check if user is admin
export const isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Admin access required'
        });
    }
    next();
};

// Check if user is doctor
export const isDoctor = (req, res, next) => {
    if (req.user?.role !== 'doctor') {
        return res.status(403).json({
            success: false,
            message: 'Doctor access required'
        });
    }
    next();
};

// Check if user is patient
export const isPatient = (req, res, next) => {
    if (req.user?.role !== 'patient') {
        return res.status(403).json({
            success: false,
            message: 'Patient access required'
        });
    }
    next();
};

// Check if user is doctor or admin
export const isDoctorOrAdmin = (req, res, next) => {
    if (!['doctor', 'admin'].includes(req.user?.role)) {
        return res.status(403).json({
            success: false,
            message: 'Doctor or Admin access required'
        });
    }
    next();
};
