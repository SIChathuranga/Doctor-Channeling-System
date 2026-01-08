import { useState } from 'react';
import { FiFile, FiDownload, FiEye, FiCalendar, FiUser, FiFileText } from 'react-icons/fi';
import './PatientMedicalRecords.css';

const PatientMedicalRecords = () => {
    const [activeTab, setActiveTab] = useState('prescriptions');

    const prescriptions = [
        { id: 1, doctor: 'Dr. Sarah Johnson', date: '2026-01-05', diagnosis: 'Hypertension', status: 'Active' },
        { id: 2, doctor: 'Dr. Emily Brooks', date: '2025-12-20', diagnosis: 'Common Cold', status: 'Completed' },
        { id: 3, doctor: 'Dr. Michael Chen', date: '2025-11-15', diagnosis: 'Skin Allergy', status: 'Completed' }
    ];

    const labReports = [
        { id: 1, name: 'Complete Blood Count', date: '2026-01-03', lab: 'City Lab', status: 'Ready' },
        { id: 2, name: 'Lipid Profile', date: '2025-12-28', lab: 'MediLab', status: 'Ready' },
        { id: 3, name: 'ECG Report', date: '2025-12-15', lab: 'Heart Center', status: 'Ready' }
    ];

    return (
        <div className="medical-records-page">
            <div className="page-header">
                <div>
                    <h1>Medical Records</h1>
                    <p>Access your prescriptions, lab reports, and medical history</p>
                </div>
            </div>

            <div className="tabs">
                <button className={`tab ${activeTab === 'prescriptions' ? 'active' : ''}`} onClick={() => setActiveTab('prescriptions')}>
                    <FiFileText /> Prescriptions
                </button>
                <button className={`tab ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
                    <FiFile /> Lab Reports
                </button>
                <button className={`tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
                    <FiCalendar /> Medical History
                </button>
            </div>

            <div className="records-content">
                {activeTab === 'prescriptions' && (
                    <div className="records-list">
                        {prescriptions.map(rx => (
                            <div key={rx.id} className="record-card">
                                <div className="record-icon"><FiFileText /></div>
                                <div className="record-info">
                                    <h4>{rx.diagnosis}</h4>
                                    <p><FiUser /> {rx.doctor}</p>
                                    <p><FiCalendar /> {rx.date}</p>
                                </div>
                                <span className={`status-badge ${rx.status.toLowerCase()}`}>{rx.status}</span>
                                <div className="record-actions">
                                    <button className="btn btn-sm btn-secondary"><FiEye /> View</button>
                                    <button className="btn btn-sm btn-primary"><FiDownload /> Download</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'reports' && (
                    <div className="records-list">
                        {labReports.map(report => (
                            <div key={report.id} className="record-card">
                                <div className="record-icon"><FiFile /></div>
                                <div className="record-info">
                                    <h4>{report.name}</h4>
                                    <p>🏥 {report.lab}</p>
                                    <p><FiCalendar /> {report.date}</p>
                                </div>
                                <span className="status-badge ready">{report.status}</span>
                                <div className="record-actions">
                                    <button className="btn btn-sm btn-secondary"><FiEye /> View</button>
                                    <button className="btn btn-sm btn-primary"><FiDownload /> Download</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="empty-state">
                        <FiCalendar className="empty-icon" />
                        <h3>Medical History Coming Soon</h3>
                        <p>Your complete medical history will be available here</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientMedicalRecords;
