import { useState } from 'react';
import { FiCalendar, FiClock, FiCheck, FiX, FiEye, FiFileText } from 'react-icons/fi';
import '../patient/PatientAppointments.css';

const DoctorAppointments = () => {
    const [filter, setFilter] = useState('today');
    const appointments = [
        { id: 1, patientName: 'John Doe', age: 45, gender: 'Male', date: '2026-01-08', time: '09:00 AM', issue: 'Chest pain', status: 'confirmed', queueNumber: 1 },
        { id: 2, patientName: 'Mary Smith', age: 32, gender: 'Female', date: '2026-01-08', time: '09:30 AM', issue: 'Regular checkup', status: 'in-progress', queueNumber: 2 },
        { id: 3, patientName: 'Robert Johnson', age: 55, gender: 'Male', date: '2026-01-08', time: '10:00 AM', issue: 'Follow-up', status: 'pending', queueNumber: 3 }
    ];

    return (
        <div className="appointments-page">
            <div className="page-header"><h1>Appointments</h1><p>Manage your patient appointments</p></div>
            <div className="filters-bar">
                <div className="status-filters">
                    {['today', 'upcoming', 'completed', 'all'].map(f => (<button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>))}
                </div>
            </div>
            <div className="appointments-list">
                {appointments.map(apt => (
                    <div key={apt.id} className="appointment-card">
                        <div className="appointment-status-bar" style={{ backgroundColor: apt.status === 'in-progress' ? 'var(--primary-500)' : apt.status === 'confirmed' ? 'var(--success-500)' : 'var(--warning-500)' }}></div>
                        <div style={{ padding: 'var(--space-5)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                                <div style={{ width: '56px', height: '56px', background: 'var(--gradient-primary)', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: 'var(--text-xl)' }}>#{apt.queueNumber}</div>
                                <div><h4>{apt.patientName}</h4><span style={{ fontSize: 'var(--text-sm)', color: 'var(--neutral-600)' }}>{apt.age} yrs, {apt.gender} • {apt.issue}</span></div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
                                <div><span style={{ fontSize: 'var(--text-xs)', color: 'var(--neutral-500)' }}>Time</span><div style={{ fontWeight: '600' }}>{apt.time}</div></div>
                                <span className={`status-badge ${apt.status === 'in-progress' ? 'confirmed' : apt.status}`}>{apt.status}</span>
                                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                                    <button className="btn btn-sm btn-primary"><FiEye /> View</button>
                                    <button className="btn btn-sm btn-success"><FiFileText /> Prescription</button>
                                    <button className="btn btn-sm btn-secondary"><FiCheck /> Complete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorAppointments;
