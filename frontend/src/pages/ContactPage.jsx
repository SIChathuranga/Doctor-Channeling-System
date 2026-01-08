import { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import toast from 'react-hot-toast';
import {
    FiMail, FiPhone, FiMapPin, FiClock, FiSend,
    FiMessageSquare, FiFacebook, FiTwitter, FiInstagram, FiLinkedin
} from 'react-icons/fi';
import './ContactPage.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addDoc(collection(db, 'contact_messages'), {
                ...formData,
                createdAt: serverTimestamp(),
                status: 'new'
            });
            setSubmitted(true);
            toast.success('Message sent successfully!');
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: FiPhone,
            title: 'Phone',
            value: '+94 11 234 5678',
            link: 'tel:+94112345678'
        },
        {
            icon: FiMail,
            title: 'Email',
            value: 'support@docchannel.lk',
            link: 'mailto:support@docchannel.lk'
        },
        {
            icon: FiMapPin,
            title: 'Address',
            value: '123 Medical Center Drive, Colombo 07, Sri Lanka',
            link: '#'
        },
        {
            icon: FiClock,
            title: 'Working Hours',
            value: 'Mon - Sat: 8:00 AM - 8:00 PM',
            link: '#'
        }
    ];

    return (
        <div className="contact-page">
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-badge light">Contact Us</span>
                        <h1>Get in Touch</h1>
                        <p>Have questions or need assistance? We're here to help!</p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="contact-section section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Form */}
                        <motion.div
                            className="contact-form-card"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {!submitted ? (
                                <>
                                    <div className="form-header">
                                        <FiMessageSquare className="form-icon" />
                                        <h2>Send Us a Message</h2>
                                        <p>Fill out the form below and we'll get back to you within 24 hours.</p>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-input"
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-input"
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    className="form-input"
                                                    placeholder="+94 77 123 4567"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Subject</label>
                                                <select
                                                    name="subject"
                                                    className="form-select"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select a subject</option>
                                                    <option value="general">General Inquiry</option>
                                                    <option value="booking">Booking Issue</option>
                                                    <option value="technical">Technical Support</option>
                                                    <option value="feedback">Feedback</option>
                                                    <option value="partnership">Partnership</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Message</label>
                                            <textarea
                                                name="message"
                                                className="form-textarea"
                                                placeholder="How can we help you?"
                                                rows="5"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg submit-btn"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <span className="spinner"></span>
                                            ) : (
                                                <>
                                                    <FiSend /> Send Message
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="success-state">
                                    <div className="success-icon">✓</div>
                                    <h2>Thank You!</h2>
                                    <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            setSubmitted(false);
                                            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                                        }}
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            )}
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            className="contact-info"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="info-cards">
                                {contactInfo.map((info, index) => (
                                    <a
                                        key={info.title}
                                        href={info.link}
                                        className="info-card"
                                    >
                                        <div className="info-icon">
                                            <info.icon />
                                        </div>
                                        <div className="info-content">
                                            <h4>{info.title}</h4>
                                            <p>{info.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="social-section">
                                <h4>Follow Us</h4>
                                <p>Stay connected for updates and health tips</p>
                                <div className="social-links">
                                    <a href="#" className="social-link"><FiFacebook /></a>
                                    <a href="#" className="social-link"><FiTwitter /></a>
                                    <a href="#" className="social-link"><FiInstagram /></a>
                                    <a href="#" className="social-link"><FiLinkedin /></a>
                                </div>
                            </div>

                            <div className="map-section">
                                <h4>Our Location</h4>
                                <div className="map-placeholder">
                                    <img
                                        src="https://maps.googleapis.com/maps/api/staticmap?center=Colombo,Sri+Lanka&zoom=14&size=400x200&maptype=roadmap&key=YOUR_API_KEY"
                                        alt="Map"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x200?text=Map+Location';
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Preview */}
            <section className="faq-preview section bg-gradient-light">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">FAQs</span>
                        <h2>Frequently Asked Questions</h2>
                        <p>Quick answers to common questions</p>
                    </div>

                    <div className="faq-grid">
                        <div className="faq-item">
                            <h4>How do I book an appointment?</h4>
                            <p>Simply search for a doctor, select your preferred date and time, and confirm your booking. It's that easy!</p>
                        </div>
                        <div className="faq-item">
                            <h4>Can I cancel or reschedule?</h4>
                            <p>Yes, you can cancel or reschedule your appointment up to 4 hours before the scheduled time.</p>
                        </div>
                        <div className="faq-item">
                            <h4>Are the doctors verified?</h4>
                            <p>All doctors on our platform go through a strict verification process to ensure quality care.</p>
                        </div>
                        <div className="faq-item">
                            <h4>What payment methods are accepted?</h4>
                            <p>We accept credit/debit cards, bank transfers, and cash payments at the clinic.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
