import { useState } from 'react';
import { FiSearch, FiCheck, FiX, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';

const AdminDoctors = () => {
    const [filter, setFilter] = useState('all');
    const doctors = [
        { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', hospital: 'City Heart Center', status: 'verified', patients: 1500, rating: 4.9 },
        { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatology', hospital: 'Skin Care Clinic', status: 'verified', patients: 890, rating: 4.8 },
        { id: 3, name: 'Dr. New Doctor', specialty: 'Neurology', hospital: 'National Hospital', status: 'pending', patients: 0, rating: 0 },
        { id: 4, name: 'Dr. Emily Brooks', specialty: 'Pediatrics', hospital: "Children's Hospital", status: 'verified', patients: 2100, rating: 4.9 }
    ];
    const filtered = filter === 'all' ? doctors : doctors.filter(d => d.status === filter);

    return (
        <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}><div><h1>Manage Doctors</h1><p>View and manage all registered doctors</p></div></div>
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                <div style={{ flex: 1, position: 'relative' }}><FiSearch style={{ position: 'absolute', left: 'var(--space-4)', top: '50%', transform: 'translateY(-50%)', color: 'var(--neutral-400)' }} /><input type="text" placeholder="Search doctors..." style={{ width: '100%', padding: 'var(--space-3) var(--space-3) var(--space-3) calc(var(--space-4) + var(--space-8))', border: '2px solid var(--neutral-200)', borderRadius: 'var(--radius-lg)' }} /></div>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>{['all', 'verified', 'pending'].map(f => <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)} style={{ padding: 'var(--space-2) var(--space-4)', background: filter === f ? 'var(--primary-500)' : 'white', color: filter === f ? 'white' : 'var(--neutral-600)', border: '2px solid ' + (filter === f ? 'var(--primary-500)' : 'var(--neutral-200)'), borderRadius: 'var(--radius-full)', cursor: 'pointer' }}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>)}</div>
            </div>
            <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead><tr style={{ background: 'var(--neutral-50)', textAlign: 'left' }}><th style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>Doctor</th><th style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>Specialty</th><th style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>Hospital</th><th style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>Patients</th><th style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>Rating</th><th style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>Status</th><th style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>Actions</th></tr></thead>
                    <tbody>{filtered.map(doc => (<tr key={doc.id} style={{ borderBottom: '1px solid var(--neutral-100)' }}><td style={{ padding: 'var(--space-4)' }}><div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}><div style={{ width: '40px', height: '40px', background: 'var(--gradient-primary)', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600' }}>{doc.name[4]}</div><span style={{ fontWeight: '500' }}>{doc.name}</span></div></td><td style={{ padding: 'var(--space-4)', color: 'var(--neutral-600)' }}>{doc.specialty}</td><td style={{ padding: 'var(--space-4)', color: 'var(--neutral-600)' }}>{doc.hospital}</td><td style={{ padding: 'var(--space-4)', fontWeight: '500' }}>{doc.patients.toLocaleString()}</td><td style={{ padding: 'var(--space-4)' }}>{doc.rating > 0 ? `⭐ ${doc.rating}` : '-'}</td><td style={{ padding: 'var(--space-4)' }}><span className={`status-badge ${doc.status === 'verified' ? 'confirmed' : 'pending'}`}>{doc.status}</span></td><td style={{ padding: 'var(--space-4)' }}><div style={{ display: 'flex', gap: 'var(--space-2)' }}>{doc.status === 'pending' ? <><button className="btn btn-sm btn-success"><FiCheck /></button><button className="btn btn-sm btn-danger"><FiX /></button></> : <><button className="btn btn-sm btn-secondary"><FiEye /></button><button className="btn btn-sm btn-secondary"><FiEdit /></button></>}</div></td></tr>))}</tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDoctors;
