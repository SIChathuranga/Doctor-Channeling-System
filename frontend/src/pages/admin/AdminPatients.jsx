import { useState } from 'react';
import { FiSearch, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';

const AdminPatients = () => {
    const patients = [
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+94 77 123 4567', appointments: 12, joined: '2025-06-15', status: 'active' },
        { id: 2, name: 'Mary Smith', email: 'mary@example.com', phone: '+94 77 234 5678', appointments: 8, joined: '2025-08-20', status: 'active' },
        { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '+94 77 345 6789', appointments: 25, joined: '2024-12-10', status: 'active' },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', phone: '+94 77 456 7890', appointments: 5, joined: '2025-11-01', status: 'inactive' }
    ];

    return (
        <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}><div><h1>Manage Patients</h1><p>View all registered patients</p></div></div>
            <div style={{ marginBottom: 'var(--space-6)', position: 'relative', maxWidth: '400px' }}><FiSearch style={{ position: 'absolute', left: 'var(--space-4)', top: '50%', transform: 'translateY(-50%)', color: 'var(--neutral-400)' }} /><input type="text" placeholder="Search patients..." style={{ width: '100%', padding: 'var(--space-3) var(--space-3) var(--space-3) calc(var(--space-4) + var(--space-8))', border: '2px solid var(--neutral-200)', borderRadius: 'var(--radius-lg)' }} /></div>
            <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead><tr style={{ background: 'var(--neutral-50)', textAlign: 'left' }}><th style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>Patient</th><th style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>Contact</th><th style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>Appointments</th><th style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>Joined</th><th style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>Status</th><th style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>Actions</th></tr></thead>
                    <tbody>{patients.map(p => (<tr key={p.id} style={{ borderBottom: '1px solid var(--neutral-100)' }}><td style={{ padding: 'var(--space-4)' }}><div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}><div style={{ width: '40px', height: '40px', background: 'var(--gradient-primary)', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600' }}>{p.name[0]}</div><span style={{ fontWeight: '500' }}>{p.name}</span></div></td><td style={{ padding: 'var(--space-4)' }}><div style={{ fontSize: 'var(--text-sm)', color: 'var(--neutral-600)' }}>{p.email}<br />{p.phone}</div></td><td style={{ padding: 'var(--space-4)', fontWeight: '500' }}>{p.appointments}</td><td style={{ padding: 'var(--space-4)', color: 'var(--neutral-600)' }}>{p.joined}</td><td style={{ padding: 'var(--space-4)' }}><span className={`status-badge ${p.status === 'active' ? 'confirmed' : 'cancelled'}`}>{p.status}</span></td><td style={{ padding: 'var(--space-4)' }}><div style={{ display: 'flex', gap: 'var(--space-2)' }}><button className="btn btn-sm btn-secondary"><FiEye /></button><button className="btn btn-sm btn-secondary"><FiEdit /></button></div></td></tr>))}</tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPatients;
