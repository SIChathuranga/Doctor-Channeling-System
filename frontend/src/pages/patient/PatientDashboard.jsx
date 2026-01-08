import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import {
    FiCalendar, FiClock, FiUser, FiFileText, FiPlusCircle,
    FiTrendingUp, FiHeart, FiActivity, FiArrowRight, FiCheck
} from 'react-icons/fi';
import './Dashboard.css';

const PatientDashboard = () => {
    const { user, userData } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalAppointments: 0,
        upcomingAppointments: 0,
        completedAppointments: 0,
        pendingAppointments: 0
    });
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [recentDoctors, setRecentDoctors] = useState([]);

    // Sample data (In production, fetch from Firebase)
    useEffect(() => {
        setLoading(true);

        // Simulate loading
        setTimeout(() => {
            setStats({
                totalAppointments: 12,
                upcomingAppointments: 2,
                completedAppointments: 9,
                pendingAppointments: 1
            });

            setUpcomingAppointments([
                {
                    id: '1',
                    doctorName: 'Dr. Sarah Johnson',
                    specialty: 'Cardiology',
                    doctorPhoto: 'https://randomuser.me/api/portraits/women/45.jpg',
                    date: '2026-01-10',
                    time: '10:00 AM',
                    hospital: 'City Heart Center',
                    status: 'confirmed',
                    queueNumber: 5
                },
                {
                    id: '2',
                    doctorName: 'Dr. Michael Chen',
                    specialty: 'Dermatology',
                    doctorPhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
                    date: '2026-01-15',
                    time: '2:30 PM',
                    hospital: 'Skin Care Clinic',
                    status: 'pending',
                    queueNumber: 3
                }
            ]);

            setRecentDoctors([
                {
                    id: '1',
                    name: 'Dr. Sarah Johnson',
                    specialty: 'Cardiology',
                    photo: 'https://randomuser.me/api/portraits/women/45.jpg',
                    rating: 4.9
                },
                {
                    id: '2',
                    name: 'Dr. Emily Brooks',
                    specialty: 'Pediatrics',
                    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
                    rating: 4.8
                },
                {
                    id: '3',
                    name: 'Dr. James Wilson',
                    specialty: 'Neurology',
                    photo: 'https://randomuser.me/api/portraits/men/52.jpg',
                    rating: 4.7
                }
            ]);

            setLoading(false);
        }, 500);
    }, [user]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const quickActions = [
        { icon: FiPlusCircle, label: 'Book Appointment', link: '/doctors', color: '#0ea5e9' },
        { icon: FiCalendar, label: 'My Appointments', link: '/dashboard/appointments', color: '#8b5cf6' },
        { icon: FiFileText, label: 'Medical Records', link: '/dashboard/medical-records', color: '#10b981' },
        { icon: FiUser, label: 'My Profile', link: '/dashboard/profile', color: '#f59e0b' }
    ];

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner-lg"></div>
            </div>
        );
    }

    return (
        <div className="dashboard">
            {/* Welcome Section */}
            <motion.section
                className="welcome-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="welcome-content">
                    <h1>{getGreeting()}, {userData?.displayName?.split(' ')[0] || 'User'}! 👋</h1>
                    <p>Here's an overview of your health activities</p>
                </div>
                <Link to="/doctors" className="btn btn-primary">
                    <FiPlusCircle /> Book Appointment
                </Link>
            </motion.section>

            {/* Quick Actions */}
            <motion.section
                className="quick-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {quickActions.map((action, index) => (
                    <Link
                        key={action.label}
                        to={action.link}
                        className="quick-action-card"
                        style={{ '--accent-color': action.color }}
                    >
                        <div className="action-icon" style={{ backgroundColor: `${action.color}15`, color: action.color }}>
                            <action.icon />
                        </div>
                        <span>{action.label}</span>
                    </Link>
                ))}
            </motion.section>

            {/* Stats Grid */}
            <motion.section
                className="stats-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: '#0ea5e915', color: '#0ea5e9' }}>
                        <FiCalendar />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.totalAppointments}</span>
                        <span className="stat-label">Total Appointments</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: '#8b5cf615', color: '#8b5cf6' }}>
                        <FiClock />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.upcomingAppointments}</span>
                        <span className="stat-label">Upcoming</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: '#10b98115', color: '#10b981' }}>
                        <FiCheck />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.completedAppointments}</span>
                        <span className="stat-label">Completed</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: '#f59e0b15', color: '#f59e0b' }}>
                        <FiActivity />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.pendingAppointments}</span>
                        <span className="stat-label">Pending</span>
                    </div>
                </div>
            </motion.section>

            {/* Main Content Grid */}
            <div className="dashboard-grid">
                {/* Upcoming Appointments */}
                <motion.section
                    className="dashboard-card appointments-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="card-header">
                        <h2>Upcoming Appointments</h2>
                        <Link to="/dashboard/appointments" className="view-all-link">
                            View All <FiArrowRight />
                        </Link>
                    </div>

                    {upcomingAppointments.length > 0 ? (
                        <div className="appointments-list">
                            {upcomingAppointments.map(appointment => (
                                <div key={appointment.id} className="appointment-item">
                                    <div className="appointment-doctor">
                                        <img src={appointment.doctorPhoto} alt={appointment.doctorName} />
                                        <div className="doctor-details">
                                            <h4>{appointment.doctorName}</h4>
                                            <span className="specialty">{appointment.specialty}</span>
                                            <span className="hospital">{appointment.hospital}</span>
                                        </div>
                                    </div>
                                    <div className="appointment-info">
                                        <div className="date-time">
                                            <span className="date">{formatDate(appointment.date)}</span>
                                            <span className="time">{appointment.time}</span>
                                        </div>
                                        <div className="queue-info">
                                            <span className="queue-label">Queue</span>
                                            <span className="queue-number">#{appointment.queueNumber}</span>
                                        </div>
                                        <span className={`status-badge ${appointment.status}`}>
                                            {appointment.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <FiCalendar className="empty-icon" />
                            <p>No upcoming appointments</p>
                            <Link to="/doctors" className="btn btn-primary btn-sm">
                                Book Now
                            </Link>
                        </div>
                    )}
                </motion.section>

                {/* Recent Doctors */}
                <motion.section
                    className="dashboard-card doctors-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="card-header">
                        <h2>Recent Doctors</h2>
                        <Link to="/doctors" className="view-all-link">
                            Find More <FiArrowRight />
                        </Link>
                    </div>

                    <div className="doctors-list">
                        {recentDoctors.map(doctor => (
                            <Link
                                key={doctor.id}
                                to={`/doctors/${doctor.id}`}
                                className="doctor-item"
                            >
                                <img src={doctor.photo} alt={doctor.name} />
                                <div className="doctor-info">
                                    <h4>{doctor.name}</h4>
                                    <span>{doctor.specialty}</span>
                                </div>
                                <div className="doctor-rating">
                                    ⭐ {doctor.rating}
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.section>
            </div>

            {/* Health Tips */}
            <motion.section
                className="health-tips"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="tip-card">
                    <div className="tip-icon">💧</div>
                    <div className="tip-content">
                        <h4>Stay Hydrated</h4>
                        <p>Drink at least 8 glasses of water daily for optimal health.</p>
                    </div>
                </div>
                <div className="tip-card">
                    <div className="tip-icon">🏃</div>
                    <div className="tip-content">
                        <h4>Stay Active</h4>
                        <p>30 minutes of exercise daily can improve your overall wellbeing.</p>
                    </div>
                </div>
                <div className="tip-card">
                    <div className="tip-icon">😴</div>
                    <div className="tip-content">
                        <h4>Rest Well</h4>
                        <p>Aim for 7-9 hours of quality sleep each night.</p>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default PatientDashboard;
