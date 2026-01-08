import { useState } from 'react';
import { FiSearch, FiUser, FiCalendar, FiFileText, FiEye } from 'react-icons/fi';

const DoctorPatients = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const patients = [
        { id: 1, name: 'John Doe', age: 45, gender: 'Male', phone: '+94 77 123 4567', lastVisit: '2026-01-05', totalVisits: 8, condition: 'Hypertension' },
        { id: 2, name: 'Mary Smith', age: 32, gender: 'Female', phone: '+94 77 234 5678', lastVisit: '2026-01-03', totalVisits: 5, condition: 'Regular Checkup' },
        { id: 3, name: 'Robert Johnson', age: 55, gender: 'Male', phone: '+94 77 345 6789', lastVisit: '2025-12-28', totalVisits: 12, condition: 'Heart Disease' },
        { id: 4, name: 'Sarah Williams', age: 28, gender: 'Female', phone: '+94 77 456 7890', lastVisit: '2025-12-20', totalVisits: 3, condition: 'Chest Pain' }
    ];
    const filtered = patients.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="patients-page" style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}><h1>My Patients</h1><p>View and manage your patient records</p></div>
            <div style={{ marginBottom: 'var(--space-6)', position: 'relative', maxWidth: '400px' }}>
                <FiSearch style={{ position: 'absolute', left: 'var(--space-4)', top: '50%', transform: 'translateY(-50%)', color: 'var(--neutral-400)' }} />
                <input type="text" placeholder="Search patients..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: 'var(--space-3) var(--space-3) var(--space-3) calc(var(--space-4) + var(--space-8))', border: '2px solid var(--neutral-200)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-sm)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
                {filtered.map(patient => (
                    <div key={patient.id} style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--neutral-100)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                            <div style={{ width: '56px', height: '56px', background: 'var(--gradient-primary)', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: 'var(--text-xl)' }}>{patient.name[0]}</div>
                            <div><h4>{patient.name}</h4><span style={{ fontSize: 'var(--text-sm)', color: 'var(--neutral-600)' }}>{patient.age} yrs, {patient.gender}</span></div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--neutral-600)' }}>
                            <span>📞 {patient.phone}</span><span><FiCalendar /> Last Visit: {patient.lastVisit}</span><span><FiFileText /> {patient.totalVisits} Total Visits</span><span style={{ color: 'var(--primary-600)', fontWeight: '500' }}>⚕️ {patient.condition}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--space-2)' }}><button className="btn btn-sm btn-primary" style={{ flex: 1, justifyContent: 'center' }}><FiEye /> View History</button><button className="btn btn-sm btn-secondary" style={{ flex: 1, justifyContent: 'center' }}><FiFileText /> Records</button></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorPatients;
