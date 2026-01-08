import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiUserPlus, FiCalendar, FiDollarSign, FiTrendingUp, FiActivity } from 'react-icons/fi';
import '../patient/Dashboard.css';

const AdminDashboard = () => {
    const stats = { totalDoctors: 125, totalPatients: 5420, totalAppointments: 15680, monthlyRevenue: 4250000, pendingApprovals: 8, activeToday: 45 };

    return (
        <div className="dashboard">
            <motion.section className="welcome-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'var(--gradient-dark)' }}>
                <div className="welcome-content"><h1>Admin Dashboard 🔧</h1><p>System overview and management</p></div>
            </motion.section>
            <motion.section className="stats-grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="stat-card"><div className="stat-icon" style={{ backgroundColor: '#0ea5e915', color: '#0ea5e9' }}><FiUserPlus /></div><div className="stat-info"><span className="stat-value">{stats.totalDoctors}</span><span className="stat-label">Total Doctors</span></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ backgroundColor: '#8b5cf615', color: '#8b5cf6' }}><FiUsers /></div><div className="stat-info"><span className="stat-value">{stats.totalPatients.toLocaleString()}</span><span className="stat-label">Total Patients</span></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ backgroundColor: '#10b98115', color: '#10b981' }}><FiCalendar /></div><div className="stat-info"><span className="stat-value">{stats.totalAppointments.toLocaleString()}</span><span className="stat-label">Total Appointments</span></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ backgroundColor: '#f59e0b15', color: '#f59e0b' }}><FiDollarSign /></div><div className="stat-info"><span className="stat-value">Rs. {(stats.monthlyRevenue / 1000000).toFixed(1)}M</span><span className="stat-label">Monthly Revenue</span></div></div>
            </motion.section>
            <div className="dashboard-grid">
                <motion.section className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <div className="card-header"><h2>Pending Doctor Approvals</h2><span className="badge badge-warning">{stats.pendingApprovals} Pending</span></div>
                    <div style={{ padding: 'var(--space-4)' }}>
                        {[1, 2, 3].map(i => (<div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', background: 'var(--neutral-50)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-3)' }}><div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}><div style={{ width: '48px', height: '48px', background: 'var(--gradient-primary)', borderRadius: 'var(--radius-full)' }}></div><div><h4>Dr. New Doctor {i}</h4><span style={{ fontSize: 'var(--text-sm)', color: 'var(--neutral-600)' }}>Cardiology • Applied 2 days ago</span></div></div><div style={{ display: 'flex', gap: 'var(--space-2)' }}><button className="btn btn-sm btn-success">Approve</button><button className="btn btn-sm btn-danger">Reject</button></div></div>))}
                    </div>
                </motion.section>
                <motion.section className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <div className="card-header"><h2>System Activity</h2></div>
                    <div style={{ padding: 'var(--space-4)' }}>
                        {['New patient registration', 'Doctor verified', 'Appointment completed', 'Payment received', 'New review posted'].map((activity, i) => (<div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3)', borderBottom: i < 4 ? '1px solid var(--neutral-100)' : 'none' }}><FiActivity style={{ color: 'var(--primary-500)' }} /><span style={{ flex: 1, fontSize: 'var(--text-sm)' }}>{activity}</span><span style={{ fontSize: 'var(--text-xs)', color: 'var(--neutral-500)' }}>{i + 1}m ago</span></div>))}
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default AdminDashboard;
