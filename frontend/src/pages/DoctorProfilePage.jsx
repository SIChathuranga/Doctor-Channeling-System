import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
    FiMapPin, FiStar, FiClock, FiPhone, FiMail, FiAward,
    FiCalendar, FiUsers, FiCheck, FiChevronRight, FiArrowLeft,
    FiHeart, FiShare2, FiVideo, FiMessageSquare
} from 'react-icons/fi';
import './DoctorProfilePage.css';

const DoctorProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    // Sample doctor data
    const sampleDoctor = {
        id: '1',
        displayName: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        qualification: 'MD, FACC, FSCAI',
        hospital: 'City Heart Center',
        location: 'Colombo 07, Sri Lanka',
        experience: 15,
        rating: 4.9,
        reviewCount: 287,
        patientCount: 1500,
        fee: 3500,
        photoURL: 'https://randomuser.me/api/portraits/women/45.jpg',
        isVerified: true,
        languages: ['English', 'Sinhala', 'Tamil'],
        about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. She specializes in interventional cardiology, heart failure management, and preventive cardiology. She completed her fellowship at Johns Hopkins Hospital and has published numerous research papers in leading medical journals.',
        education: [
            { degree: 'MD in Medicine', institution: 'University of Colombo', year: '2005' },
            { degree: 'Cardiology Fellowship', institution: 'Johns Hopkins Hospital', year: '2010' },
            { degree: 'FACC Certification', institution: 'American College of Cardiology', year: '2012' }
        ],
        services: [
            'Heart Disease Diagnosis',
            'Cardiac Catheterization',
            'Echocardiography',
            'Stress Testing',
            'Pacemaker Implantation',
            'Heart Failure Management',
            'Preventive Cardiology',
            'Cholesterol Management'
        ],
        schedule: {
            monday: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
            tuesday: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
            wednesday: ['09:00 AM', '10:00 AM', '11:00 AM'],
            thursday: ['02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'],
            friday: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM'],
            saturday: ['09:00 AM', '10:00 AM'],
            sunday: []
        },
        reviews: [
            {
                id: 1,
                patientName: 'John D.',
                rating: 5,
                date: '2024-01-05',
                comment: 'Dr. Johnson is an excellent cardiologist. She took the time to explain my condition and treatment options thoroughly.'
            },
            {
                id: 2,
                patientName: 'Mary S.',
                rating: 5,
                date: '2024-01-02',
                comment: 'Very professional and caring. The staff was also very helpful. Highly recommend!'
            },
            {
                id: 3,
                patientName: 'Robert K.',
                rating: 4,
                date: '2023-12-28',
                comment: 'Great experience overall. The wait time was a bit long, but the consultation was worth it.'
            }
        ]
    };

    useEffect(() => {
        // In production, fetch from Firebase
        setLoading(true);
        setTimeout(() => {
            setDoctor(sampleDoctor);
            setLoading(false);
        }, 500);
    }, [id]);

    // Generate next 7 days
    const getNextDays = () => {
        const days = [];
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            days.push({
                date: date,
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                dateNum: date.getDate(),
                month: date.toLocaleDateString('en-US', { month: 'short' }),
                fullDate: date.toISOString().split('T')[0],
                dayName: date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
            });
        }
        return days;
    };

    const handleBookAppointment = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (selectedDate && selectedTime) {
            navigate(`/dashboard/book/${id}?date=${selectedDate}&time=${selectedTime}`);
        }
    };

    if (loading) {
        return (
            <div className="doctor-profile-page loading">
                <div className="container">
                    <div className="spinner-lg"></div>
                </div>
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="doctor-profile-page">
                <div className="container">
                    <div className="empty-state">
                        <h3>Doctor not found</h3>
                        <Link to="/doctors" className="btn btn-primary">Browse Doctors</Link>
                    </div>
                </div>
            </div>
        );
    }

    const nextDays = getNextDays();
    const availableSlots = selectedDate ?
        doctor.schedule[nextDays.find(d => d.fullDate === selectedDate)?.dayName] || [] : [];

    return (
        <div className="doctor-profile-page">
            {/* Header */}
            <div className="profile-header">
                <div className="profile-header-bg"></div>
                <div className="container">
                    <Link to="/doctors" className="back-link">
                        <FiArrowLeft /> Back to Doctors
                    </Link>
                </div>
            </div>

            <div className="profile-content container">
                <div className="profile-grid">
                    {/* Main Profile Section */}
                    <main className="profile-main">
                        {/* Doctor Info Card */}
                        <motion.div
                            className="profile-card doctor-info-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="doctor-profile-header">
                                <div className="doctor-avatar-large">
                                    <img src={doctor.photoURL} alt={doctor.displayName} />
                                    {doctor.isVerified && (
                                        <span className="verified-badge-large" title="Verified Doctor">
                                            <FiCheck />
                                        </span>
                                    )}
                                </div>
                                <div className="doctor-header-info">
                                    <div className="doctor-badges">
                                        <span className="badge badge-primary">{doctor.specialty}</span>
                                        {doctor.isVerified && (
                                            <span className="badge badge-success">Verified</span>
                                        )}
                                    </div>
                                    <h1>{doctor.displayName}</h1>
                                    <p className="doctor-qualification">{doctor.qualification}</p>
                                    <p className="doctor-location">
                                        <FiMapPin /> {doctor.hospital}, {doctor.location}
                                    </p>

                                    <div className="doctor-stats">
                                        <div className="stat">
                                            <FiStar className="stat-icon" style={{ color: 'var(--warning-500)' }} />
                                            <span className="stat-value">{doctor.rating}</span>
                                            <span className="stat-label">({doctor.reviewCount} reviews)</span>
                                        </div>
                                        <div className="stat">
                                            <FiClock className="stat-icon" />
                                            <span className="stat-value">{doctor.experience}</span>
                                            <span className="stat-label">Years Exp.</span>
                                        </div>
                                        <div className="stat">
                                            <FiUsers className="stat-icon" />
                                            <span className="stat-value">{doctor.patientCount}+</span>
                                            <span className="stat-label">Patients</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="doctor-actions">
                                    <button className="btn btn-icon btn-secondary">
                                        <FiHeart />
                                    </button>
                                    <button className="btn btn-icon btn-secondary">
                                        <FiShare2 />
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* About Section */}
                        <motion.div
                            className="profile-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h2 className="card-title">About</h2>
                            <p className="about-text">{doctor.about}</p>

                            <div className="languages">
                                <strong>Languages:</strong>
                                <div className="language-tags">
                                    {doctor.languages.map(lang => (
                                        <span key={lang} className="language-tag">{lang}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Education Section */}
                        <motion.div
                            className="profile-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="card-title">
                                <FiAward /> Education & Certifications
                            </h2>
                            <div className="education-list">
                                {doctor.education.map((edu, index) => (
                                    <div key={index} className="education-item">
                                        <div className="edu-icon">
                                            <FiAward />
                                        </div>
                                        <div className="edu-info">
                                            <h4>{edu.degree}</h4>
                                            <p>{edu.institution}</p>
                                            <span className="edu-year">{edu.year}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Services Section */}
                        <motion.div
                            className="profile-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="card-title">Services Offered</h2>
                            <div className="services-grid">
                                {doctor.services.map((service, index) => (
                                    <div key={index} className="service-item">
                                        <FiCheck className="service-check" />
                                        {service}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Reviews Section */}
                        <motion.div
                            className="profile-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="reviews-header">
                                <h2 className="card-title">Patient Reviews</h2>
                                <div className="overall-rating">
                                    <span className="rating-big">{doctor.rating}</span>
                                    <div className="rating-stars">
                                        {[...Array(5)].map((_, i) => (
                                            <FiStar
                                                key={i}
                                                className={i < Math.floor(doctor.rating) ? 'star filled' : 'star'}
                                            />
                                        ))}
                                    </div>
                                    <span className="rating-count">{doctor.reviewCount} reviews</span>
                                </div>
                            </div>

                            <div className="reviews-list">
                                {doctor.reviews.map(review => (
                                    <div key={review.id} className="review-item">
                                        <div className="review-header">
                                            <div className="reviewer-avatar">
                                                {review.patientName[0]}
                                            </div>
                                            <div className="reviewer-info">
                                                <h4>{review.patientName}</h4>
                                                <span className="review-date">{review.date}</span>
                                            </div>
                                            <div className="review-rating">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <FiStar key={i} className="star filled" />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="review-comment">{review.comment}</p>
                                    </div>
                                ))}
                            </div>

                            <button className="btn btn-secondary load-more-btn">
                                View All Reviews
                            </button>
                        </motion.div>
                    </main>

                    {/* Booking Sidebar */}
                    <aside className="booking-sidebar">
                        <motion.div
                            className="booking-card"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="booking-header">
                                <h3>Book Appointment</h3>
                                <div className="booking-fee">
                                    <span className="fee-label">Consultation Fee</span>
                                    <span className="fee-amount">Rs. {doctor.fee.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="booking-section">
                                <h4>Select Date</h4>
                                <div className="date-picker">
                                    {nextDays.map(day => (
                                        <button
                                            key={day.fullDate}
                                            className={`date-btn ${selectedDate === day.fullDate ? 'active' : ''} ${doctor.schedule[day.dayName]?.length === 0 ? 'disabled' : ''
                                                }`}
                                            onClick={() => {
                                                setSelectedDate(day.fullDate);
                                                setSelectedTime(null);
                                            }}
                                            disabled={doctor.schedule[day.dayName]?.length === 0}
                                        >
                                            <span className="date-day">{day.day}</span>
                                            <span className="date-num">{day.dateNum}</span>
                                            <span className="date-month">{day.month}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {selectedDate && (
                                <div className="booking-section">
                                    <h4>Select Time</h4>
                                    {availableSlots.length > 0 ? (
                                        <div className="time-picker">
                                            {availableSlots.map(time => (
                                                <button
                                                    key={time}
                                                    className={`time-btn ${selectedTime === time ? 'active' : ''}`}
                                                    onClick={() => setSelectedTime(time)}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="no-slots">No slots available for this date</p>
                                    )}
                                </div>
                            )}

                            <button
                                className="btn btn-primary btn-lg book-now-btn"
                                disabled={!selectedDate || !selectedTime}
                                onClick={handleBookAppointment}
                            >
                                <FiCalendar />
                                {user ? 'Book Appointment' : 'Login to Book'}
                            </button>

                            <div className="consultation-types">
                                <button className="consultation-type">
                                    <FiMapPin />
                                    <span>In-Person Visit</span>
                                </button>
                                <button className="consultation-type">
                                    <FiVideo />
                                    <span>Video Consultation</span>
                                </button>
                            </div>
                        </motion.div>

                        {/* Contact Card */}
                        <div className="contact-card">
                            <h4>Need Help?</h4>
                            <p>Contact our support team for assistance with booking</p>
                            <a href="tel:+94112345678" className="btn btn-secondary">
                                <FiPhone /> Call Support
                            </a>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfilePage;
