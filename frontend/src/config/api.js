// API Configuration for different environments
const API_BASE_URL = import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === 'production'
        ? 'https://your-backend.onrender.com'
        : 'http://localhost:5000');

export const API_CONFIG = {
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
};

// Helper function to get auth headers
export const getAuthHeaders = async (user) => {
    if (!user) return {};

    try {
        const token = await user.getIdToken();
        return {
            'Authorization': `Bearer ${token}`
        };
    } catch (error) {
        console.error('Error getting auth token:', error);
        return {};
    }
};

// API endpoints
export const API_ENDPOINTS = {
    // Auth
    auth: {
        me: '/api/auth/me',
        updateProfile: '/api/auth/me',
        setRole: '/api/auth/set-role'
    },

    // Doctors
    doctors: {
        list: '/api/doctors',
        getById: (id) => `/api/doctors/${id}`,
        updateProfile: '/api/doctors/profile',
        updateSchedule: '/api/doctors/schedule'
    },

    // Appointments
    appointments: {
        create: '/api/appointments',
        my: '/api/appointments/my',
        getById: (id) => `/api/appointments/${id}`,
        updateStatus: (id) => `/api/appointments/${id}/status`,
        cancel: (id) => `/api/appointments/${id}/cancel`,
        addPrescription: (id) => `/api/appointments/${id}/prescription`
    },

    // Admin
    admin: {
        stats: '/api/admin/stats',
        doctors: '/api/admin/doctors',
        verifyDoctor: (id) => `/api/admin/doctors/${id}/verify`,
        patients: '/api/admin/patients',
        appointments: '/api/admin/appointments'
    },

    // Health check
    health: '/api/health'
};

export default API_CONFIG;
