import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiCalendar, FiFilter, FiSearch, FiMoreVertical,
    FiCheck, FiX, FiClock, FiMapPin
} from 'react-icons/fi';
import './PatientAppointments.css';

const PatientAppointments = () => {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Sample appointments data
    const appointments = [
        {
            id: '1',
            doctorName: 'Dr. Sarah Johnson',
            specialty: 'Cardiology',
            doctorPhoto: 'https://randomuser.me/api/portraits/women/45.jpg',
            date: '2026-01-10',
            time: '10:00 AM',
            hospital: 'City Heart Center',
            location: 'Colombo 07',
            status: 'confirmed',
            queueNumber: 5,
            fee: 3500,
            notes: 'Regular checkup for heart condition'
        },
        {
            id: '2',
            doctorName: 'Dr. Michael Chen',
            specialty: 'Dermatology',
            doctorPhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
            date: '2026-01-15',
            time: '2:30 PM',
            hospital: 'Skin Care Clinic',
            location: 'Kandy',
            status: 'pending',
            queueNumber: 3,
            fee: 2500,
            notes: 'Skin allergy consultation'
        },
        {
            id: '3',
            doctorName: 'Dr. Emily Brooks',
            specialty: 'Pediatrics',
            doctorPhoto: 'https://randomuser.me/api/portraits/women/68.jpg',
            date: '2025-12-20',
            time: '11:00 AM',
            hospital: "Children's Hospital",
            location: 'Colombo 05',
            status: 'completed',
            queueNumber: 7,
            fee: 2000,
            notes: 'Vaccination appointment'
        },
        {
            id: '4',
            doctorName: 'Dr. James Wilson',
            specialty: 'Neurology',
            doctorPhoto: 'https://randomuser.me/api/portraits/men/52.jpg',
            date: '2025-12-15',
            time: '3:00 PM',
            hospital: 'National Hospital',
            location: 'Colombo 10',
            status: 'cancelled',
            queueNumber: 2,
            fee: 4000,
            notes: 'Headache consultation'
        }
    ];

    const filteredAppointments = appointments.filter(apt => {
        const matchesFilter = filter === 'all' || apt.status === filter;
        const matchesSearch = apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            apt.specialty.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            confirmed: 'var(--success-500)',
            pending: 'var(--warning-500)',
            completed: 'var(--neutral-500)',
            cancelled: 'var(--error-500)'
        };
        return colors[status] || colors.pending;
    };

    return (
        <div className="appointments-page">
            <div className="page-header">
                <div>
                    <h1>My Appointments</h1>
                    <p>View and manage all your appointments</p>
                </div>
                <Link to="/doctors" className="btn btn-primary">
                    <FiCalendar /> Book New Appointment
                </Link>
            </div>

            {/* Filters */}
            <div className="filters-bar">
                <div className="search-filter">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by doctor or specialty..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="status-filters">
                    {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map(status => (
                        <button
                            key={status}
                            className={`filter-btn ${filter === status ? 'active' : ''}`}
                            onClick={() => setFilter(status)}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Appointments List */}
            <div className="appointments-container">
                {filteredAppointments.length > 0 ? (
                    <div className="appointments-list">
                        {filteredAppointments.map((appointment, index) => (
                            <motion.div
                                key={appointment.id}
                                className="appointment-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="appointment-status-bar" style={{ backgroundColor: getStatusColor(appointment.status) }}></div>

                                <div className="appointment-main">
                                    <div className="doctor-section">
                                        <img src={appointment.doctorPhoto} alt={appointment.doctorName} className="doctor-photo" />
                                        <div className="doctor-details">
                                            <h3>{appointment.doctorName}</h3>
                                            <span className="specialty">{appointment.specialty}</span>
                                            <div className="location">
                                                <FiMapPin /> {appointment.hospital}, {appointment.location}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="appointment-details">
                                        <div className="detail-item">
                                            <FiCalendar />
                                            <div>
                                                <span className="label">Date</span>
                                                <span className="value">{formatDate(appointment.date)}</span>
                                            </div>
                                        </div>
                                        <div className="detail-item">
                                            <FiClock />
                                            <div>
                                                <span className="label">Time</span>
                                                <span className="value">{appointment.time}</span>
                                            </div>
                                        </div>
                                        <div className="detail-item queue">
                                            <div className="queue-box">
                                                <span className="queue-label">Queue #</span>
                                                <span className="queue-number">{appointment.queueNumber}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="appointment-meta">
                                        <span className={`status-badge ${appointment.status}`}>
                                            {appointment.status === 'confirmed' && <FiCheck />}
                                            {appointment.status === 'cancelled' && <FiX />}
                                            {appointment.status === 'pending' && <FiClock />}
                                            {appointment.status}
                                        </span>
                                        <span className="fee">Rs. {appointment.fee.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="appointment-footer">
                                    <p className="notes">
                                        <strong>Notes:</strong> {appointment.notes}
                                    </p>
                                    <div className="actions">
                                        {appointment.status === 'pending' && (
                                            <>
                                                <button className="btn btn-sm btn-success">Confirm</button>
                                                <button className="btn btn-sm btn-secondary">Reschedule</button>
                                            </>
                                        )}
                                        {appointment.status === 'confirmed' && (
                                            <>
                                                <button className="btn btn-sm btn-primary">View Details</button>
                                                <button className="btn btn-sm btn-danger">Cancel</button>
                                            </>
                                        )}
                                        {appointment.status === 'completed' && (
                                            <>
                                                <button className="btn btn-sm btn-primary">View Prescription</button>
                                                <button className="btn btn-sm btn-secondary">Book Again</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <FiCalendar className="empty-icon" />
                        <h3>No appointments found</h3>
                        <p>You don't have any appointments matching your criteria</p>
                        <Link to="/doctors" className="btn btn-primary">
                            Book an Appointment
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientAppointments;
