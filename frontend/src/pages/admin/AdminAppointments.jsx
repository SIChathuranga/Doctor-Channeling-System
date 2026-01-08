import { useState } from 'react';
import { FiSearch, FiFilter, FiEye } from 'react-icons/fi';

const AdminAppointments = () => {
    const [filter, setFilter] = useState('all');
    const appointments = [
        { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: '2026-01-08', time: '10:00 AM', status: 'confirmed', fee: 3500 },
        { id: 2, patient: 'Mary Smith', doctor: 'Dr. Michael Chen', specialty: 'Dermatology', date: '2026-01-08', time: '11:30 AM', status: 'pending', fee: 2500 },
        { id: 3, patient: 'Robert Johnson', doctor: 'Dr. Emily Brooks', specialty: 'Pediatrics', date: '2026-01-08', time: '02:00 PM', status: 'completed', fee: 2000 },
        { id: 4, patient: 'Sarah Williams', doctor: 'Dr. James Wilson', specialty: 'Neurology', date: '2026-01-07', time: '03:30 PM', status: 'cancelled', fee: 4000 }
    ];
    const filtered = filter === 'all' ? appointments : appointments.filter(a => a.status === filter);

    return (
        <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}><div><h1>All Appointments</h1><p>View and manage system-wide appointments</p></div></div>
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}><FiSearch style={{ position: 'absolute', left: 'var(--space-4)', top: '50%', transform: 'translateY(-50%)', color: 'var(--neutral-400)' }} /><input type="text" placeholder="Search appointments..." style={{ width: '100%', padding: 'var(--space-3) var(--space-3) var(--space-3) calc(var(--space-4) + var(--space-8))', border: '2px solid var(--neutral-200)', borderRadius: 'var(--radius-lg)' }} /></div>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>{['all', 'confirmed', 'pending', 'completed', 'cancelled'].map(f => <button key={f} onClick={() => setFilter(f)} style={{ padding: 'var(--space-2) var(--space-4)', background: filter === f ? 'var(--primary-500)' : 'white', color: filter === f ? 'white' : 'var(--neutral-600)', border: '2px solid ' + (filter === f ? 'var(--primary-500)' : 'var(--neutral-200)'), borderRadius: 'var(--radius-full)', cursor: 'pointer', fontSize: 'var(--text-sm)', fontWeight: '500' }}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>)}</div>
            </div>
            <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', overflow: 'auto', boxShadow: 'var(--shadow-sm)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead><tr style={{ background: 'var(--neutral-50)', textAlign: 'left' }}><th style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>Patient</th><th style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>Doctor</th><th style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>Date & Time</th><th style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>Fee</th><th style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>Status</th><th style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>Actions</th></tr></thead>
                    <tbody>{filtered.map(apt => (<tr key={apt.id} style={{ borderBottom: '1px solid var(--neutral-100)' }}><td style={{ padding: 'var(--space-4)', fontWeight: '500' }}>{apt.patient}</td><td style={{ padding: 'var(--space-4)' }}><div><span style={{ fontWeight: '500' }}>{apt.doctor}</span><br /><span style={{ fontSize: 'var(--text-sm)', color: 'var(--neutral-600)' }}>{apt.specialty}</span></div></td><td style={{ padding: 'var(--space-4)' }}><div><span style={{ fontWeight: '500' }}>{apt.date}</span><br /><span style={{ fontSize: 'var(--text-sm)', color: 'var(--neutral-600)' }}>{apt.time}</span></div></td><td style={{ padding: 'var(--space-4)', fontWeight: '600', color: 'var(--success-600)' }}>Rs. {apt.fee.toLocaleString()}</td><td style={{ padding: 'var(--space-4)' }}><span className={`status-badge ${apt.status}`}>{apt.status}</span></td><td style={{ padding: 'var(--space-4)' }}><button className="btn btn-sm btn-secondary"><FiEye /> View</button></td></tr>))}</tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAppointments;
