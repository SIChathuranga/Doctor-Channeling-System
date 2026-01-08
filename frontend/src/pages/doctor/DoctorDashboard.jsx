import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FiCalendar, FiUsers, FiClock, FiTrendingUp, FiCheck, FiX, FiDollarSign, FiArrowRight } from 'react-icons/fi';
import '../patient/Dashboard.css';

const DoctorDashboard = () => {
    const { userData } = useAuth();
    const [stats, setStats] = useState({ todayAppointments: 8, totalPatients: 1500, pendingApprovals: 3, monthlyEarnings: 125000 });
    const [todayAppointments, setTodayAppointments] = useState([
        { id: 1, patientName: 'John Doe', time: '09:00 AM', status: 'waiting', queueNumber: 1, issue: 'Chest pain' },
        { id: 2, patientName: 'Mary Smith', time: '09:30 AM', status: 'in-progress', queueNumber: 2, issue: 'Regular checkup' },
        { id: 3, patientName: 'Robert Johnson', time: '10:00 AM', status: 'pending', queueNumber: 3, issue: 'Follow-up' },
        { id: 4, patientName: 'Sarah Williams', time: '10:30 AM', status: 'pending', queueNumber: 4, issue: 'ECG Report Review' }
    ]);

    const getGreeting = () => { const hour = new Date().getHours(); if (hour < 12) return 'Good Morning'; if (hour < 18) return 'Good Afternoon'; return 'Good Evening'; };

    return (
        <div className="dashboard">
            <motion.section className="welcome-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="welcome-content"><h1>{getGreeting()}, Dr. {userData?.displayName?.split(' ')[1] || 'Doctor'}! 👋</h1><p>You have {stats.todayAppointments} appointments today</p></div>
                <Link to="/doctor/schedule" className="btn btn-primary"><FiClock /> Manage Schedule</Link>
            </motion.section>

            <motion.section className="stats-grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="stat-card"><div className="stat-icon" style={{ backgroundColor: '#0ea5e915', color: '#0ea5e9' }}><FiCalendar /></div><div className="stat-info"><span className="stat-value">{stats.todayAppointments}</span><span className="stat-label">Today's Appointments</span></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ backgroundColor: '#8b5cf615', color: '#8b5cf6' }}><FiUsers /></div><div className="stat-info"><span className="stat-value">{stats.totalPatients}</span><span className="stat-label">Total Patients</span></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ backgroundColor: '#f59e0b15', color: '#f59e0b' }}><FiClock /></div><div className="stat-info"><span className="stat-value">{stats.pendingApprovals}</span><span className="stat-label">Pending Approvals</span></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ backgroundColor: '#10b98115', color: '#10b981' }}><FiDollarSign /></div><div className="stat-info"><span className="stat-value">Rs. {(stats.monthlyEarnings / 1000).toFixed(0)}K</span><span className="stat-label">Monthly Earnings</span></div></div>
            </motion.section>

            <motion.section className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="card-header"><h2>Today's Queue</h2><Link to="/doctor/appointments" className="view-all-link">View All <FiArrowRight /></Link></div>
                <div className="queue-list" style={{ padding: 'var(--space-4)' }}>
                    {todayAppointments.map(apt => (
                        <div key={apt.id} className="queue-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', background: 'var(--neutral-50)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-3)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-100)', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: 'var(--primary-700)' }}>#{apt.queueNumber}</div>
                                <div><h4 style={{ fontSize: 'var(--text-base)', marginBottom: '2px' }}>{apt.patientName}</h4><span style={{ fontSize: 'var(--text-sm)', color: 'var(--neutral-600)' }}>{apt.issue}</span></div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                                <span style={{ fontSize: 'var(--text-sm)', fontWeight: '500' }}>{apt.time}</span>
                                <span className={`status-badge ${apt.status === 'in-progress' ? 'confirmed' : apt.status}`}>{apt.status}</span>
                                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                                    <button className="btn btn-sm btn-success"><FiCheck /></button>
                                    <button className="btn btn-sm btn-danger"><FiX /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
};

export default DoctorDashboard;
