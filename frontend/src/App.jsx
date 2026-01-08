import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Patient Dashboard Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientAppointments from './pages/patient/PatientAppointments';
import PatientMedicalRecords from './pages/patient/PatientMedicalRecords';
import PatientProfile from './pages/patient/PatientProfile';
import BookAppointment from './pages/patient/BookAppointment';

// Doctor Dashboard Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorSchedule from './pages/doctor/DoctorSchedule';
import DoctorPatients from './pages/doctor/DoctorPatients';
import DoctorProfile from './pages/doctor/DoctorProfile';

// Admin Dashboard Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDoctors from './pages/admin/AdminDoctors';
import AdminPatients from './pages/admin/AdminPatients';
import AdminAppointments from './pages/admin/AdminAppointments';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, userData, loading } = useAuth();

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner-lg"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userData?.role)) {
        // Redirect to appropriate dashboard based on role
        if (userData?.role === 'doctor') {
            return <Navigate to="/doctor" replace />;
        } else if (userData?.role === 'admin') {
            return <Navigate to="/admin" replace />;
        }
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

// Public Route - redirect to dashboard if logged in
const PublicRoute = ({ children }) => {
    const { user, userData, loading } = useAuth();

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner-lg"></div>
            </div>
        );
    }

    if (user) {
        if (userData?.role === 'doctor') {
            return <Navigate to="/doctor" replace />;
        } else if (userData?.role === 'admin') {
            return <Navigate to="/admin" replace />;
        }
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

function App() {
    return (
        <Routes>
            {/* Public Routes with Main Layout */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/doctors/:id" element={<DoctorProfilePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* Auth Routes - No Layout */}
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
            <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />

            {/* Patient Dashboard Routes */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute allowedRoles={['patient']}>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<PatientDashboard />} />
                <Route path="appointments" element={<PatientAppointments />} />
                <Route path="medical-records" element={<PatientMedicalRecords />} />
                <Route path="profile" element={<PatientProfile />} />
                <Route path="book/:doctorId" element={<BookAppointment />} />
            </Route>

            {/* Doctor Dashboard Routes */}
            <Route
                path="/doctor"
                element={
                    <ProtectedRoute allowedRoles={['doctor']}>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<DoctorDashboard />} />
                <Route path="appointments" element={<DoctorAppointments />} />
                <Route path="schedule" element={<DoctorSchedule />} />
                <Route path="patients" element={<DoctorPatients />} />
                <Route path="profile" element={<DoctorProfile />} />
            </Route>

            {/* Admin Dashboard Routes */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<AdminDashboard />} />
                <Route path="doctors" element={<AdminDoctors />} />
                <Route path="patients" element={<AdminPatients />} />
                <Route path="appointments" element={<AdminAppointments />} />
            </Route>

            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;
