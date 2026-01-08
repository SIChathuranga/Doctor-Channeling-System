import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiSearch, FiCalendar, FiClock, FiShield, FiAward,
    FiUsers, FiStar, FiArrowRight, FiCheck, FiHeart,
    FiPhone, FiVideo, FiMessageSquare
} from 'react-icons/fi';
import './HomePage.css';

const HomePage = () => {
    const specialties = [
        { name: 'Cardiology', icon: '🫀', count: 24, color: '#ef4444' },
        { name: 'Dermatology', icon: '🧴', count: 18, color: '#f59e0b' },
        { name: 'Neurology', icon: '🧠', count: 15, color: '#8b5cf6' },
        { name: 'Pediatrics', icon: '👶', count: 22, color: '#10b981' },
        { name: 'Orthopedics', icon: '🦴', count: 12, color: '#0ea5e9' },
        { name: 'Ophthalmology', icon: '👁️', count: 16, color: '#6366f1' },
        { name: 'Dentistry', icon: '🦷', count: 20, color: '#ec4899' },
        { name: 'Psychiatry', icon: '🧘', count: 14, color: '#14b8a6' },
    ];

    const features = [
        {
            icon: FiCalendar,
            title: 'Easy Scheduling',
            description: 'Book appointments in seconds with our intuitive booking system. Choose your preferred doctor and time slot.'
        },
        {
            icon: FiClock,
            title: 'Real-Time Updates',
            description: 'Get instant notifications about your appointments, queue status, and doctor availability.'
        },
        {
            icon: FiShield,
            title: 'Secure & Private',
            description: 'Your health data is encrypted and protected with industry-leading security measures.'
        },
        {
            icon: FiAward,
            title: 'Verified Doctors',
            description: 'All our doctors are verified professionals with authentic credentials and certifications.'
        },
    ];

    const stats = [
        { number: '10K+', label: 'Happy Patients' },
        { number: '500+', label: 'Expert Doctors' },
        { number: '50+', label: 'Specialties' },
        { number: '99%', label: 'Satisfaction Rate' },
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Patient',
            image: 'https://randomuser.me/api/portraits/women/1.jpg',
            text: 'DocChannel made finding a specialist so easy! I booked an appointment within minutes and the whole experience was seamless.',
            rating: 5
        },
        {
            name: 'Michael Chen',
            role: 'Patient',
            image: 'https://randomuser.me/api/portraits/men/2.jpg',
            text: 'The real-time queue updates are amazing. No more waiting in crowded rooms. Highly recommended!',
            rating: 5
        },
        {
            name: 'Dr. Emily Brooks',
            role: 'Cardiologist',
            image: 'https://randomuser.me/api/portraits/women/3.jpg',
            text: 'As a doctor, this platform has streamlined my practice. Managing appointments has never been easier.',
            rating: 5
        }
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background">
                    <div className="hero-gradient"></div>
                    <div className="hero-pattern"></div>
                </div>

                <div className="hero-content container">
                    <motion.div
                        className="hero-text"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="hero-badge">
                            <FiHeart /> Trusted by 10,000+ Patients
                        </span>
                        <h1 className="hero-title">
                            Your Health, Our
                            <span className="gradient-text"> Priority</span>
                        </h1>
                        <p className="hero-subtitle">
                            Book appointments with top-rated doctors instantly. Experience healthcare
                            that fits your schedule with real-time availability and seamless booking.
                        </p>
                        <div className="hero-actions">
                            <Link to="/doctors" className="btn btn-primary btn-lg">
                                <FiSearch /> Find Doctors
                            </Link>
                            <Link to="/register" className="btn btn-secondary btn-lg">
                                Get Started <FiArrowRight />
                            </Link>
                        </div>
                        <div className="hero-stats">
                            {stats.map((stat, index) => (
                                <div key={index} className="hero-stat">
                                    <span className="hero-stat-number">{stat.number}</span>
                                    <span className="hero-stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="hero-visual"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="hero-image-container">
                            <div className="hero-card hero-card-1">
                                <div className="hero-card-icon">
                                    <FiCalendar />
                                </div>
                                <div className="hero-card-text">
                                    <span className="hero-card-title">Next Appointment</span>
                                    <span className="hero-card-value">Today, 3:00 PM</span>
                                </div>
                            </div>
                            <div className="hero-card hero-card-2">
                                <div className="hero-card-icon success">
                                    <FiCheck />
                                </div>
                                <div className="hero-card-text">
                                    <span className="hero-card-title">Booking Confirmed</span>
                                    <span className="hero-card-value">Dr. Smith - Cardiology</span>
                                </div>
                            </div>
                            <div className="hero-card hero-card-3">
                                <div className="hero-card-avatar-group">
                                    <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="" />
                                    <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="" />
                                    <img src="https://randomuser.me/api/portraits/women/3.jpg" alt="" />
                                    <span>+500</span>
                                </div>
                                <span className="hero-card-label">Doctors Online Now</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="hero-wave">
                    <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                        <path d="M0,64 C288,120 720,0 1440,64 L1440,120 L0,120 Z" fill="var(--neutral-50)" />
                    </svg>
                </div>
            </section>

            {/* Specialties Section */}
            <section className="specialties section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="section-badge">Specializations</span>
                        <h2 className="section-title">Find Care by Specialty</h2>
                        <p className="section-subtitle">
                            Browse our wide range of medical specialties and find the right doctor for your needs
                        </p>
                    </motion.div>

                    <div className="specialties-grid">
                        {specialties.map((specialty, index) => (
                            <motion.div
                                key={specialty.name}
                                className="specialty-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                <div
                                    className="specialty-icon"
                                    style={{ backgroundColor: `${specialty.color}15` }}
                                >
                                    <span style={{ fontSize: '32px' }}>{specialty.icon}</span>
                                </div>
                                <h3 className="specialty-name">{specialty.name}</h3>
                                <p className="specialty-count">{specialty.count} Doctors</p>
                                <Link to={`/doctors?specialty=${specialty.name}`} className="specialty-link">
                                    View All <FiArrowRight />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features section bg-gradient-light">
                <div className="container">
                    <div className="features-layout">
                        <motion.div
                            className="features-content"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="section-badge">Why Choose Us</span>
                            <h2 className="section-title">Healthcare Made Simple & Accessible</h2>
                            <p className="section-subtitle">
                                We're revolutionizing how you access healthcare with technology that puts patients first.
                            </p>

                            <div className="features-list">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        className="feature-item"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="feature-icon">
                                            <feature.icon />
                                        </div>
                                        <div className="feature-text">
                                            <h4>{feature.title}</h4>
                                            <p>{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="features-visual"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="features-image">
                                <div className="feature-demo-card">
                                    <div className="demo-header">
                                        <span className="demo-dot"></span>
                                        <span className="demo-dot"></span>
                                        <span className="demo-dot"></span>
                                    </div>
                                    <div className="demo-content">
                                        <div className="demo-doctor">
                                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Doctor" />
                                            <div>
                                                <h5>Dr. James Wilson</h5>
                                                <span>Cardiologist • 4.9 ⭐</span>
                                            </div>
                                        </div>
                                        <div className="demo-slots">
                                            <p>Available Today</p>
                                            <div className="demo-times">
                                                <span className="time-slot">9:00 AM</span>
                                                <span className="time-slot active">10:30 AM</span>
                                                <span className="time-slot">2:00 PM</span>
                                                <span className="time-slot">4:30 PM</span>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary" style={{ width: '100%' }}>
                                            Book Appointment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="how-it-works section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="section-badge">Simple Process</span>
                        <h2 className="section-title">How It Works</h2>
                        <p className="section-subtitle">
                            Book your appointment in three easy steps
                        </p>
                    </motion.div>

                    <div className="steps-grid">
                        <motion.div
                            className="step-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="step-number">01</div>
                            <div className="step-icon">
                                <FiSearch />
                            </div>
                            <h3>Search Doctor</h3>
                            <p>Browse through our list of verified doctors and choose based on specialty, location, and reviews.</p>
                        </motion.div>

                        <motion.div
                            className="step-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="step-number">02</div>
                            <div className="step-icon">
                                <FiCalendar />
                            </div>
                            <h3>Book Appointment</h3>
                            <p>Select your preferred date and time slot. Get instant confirmation for your booking.</p>
                        </motion.div>

                        <motion.div
                            className="step-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="step-number">03</div>
                            <div className="step-icon">
                                <FiCheck />
                            </div>
                            <h3>Get Care</h3>
                            <p>Visit the doctor at your scheduled time or connect via video consultation from anywhere.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials section bg-gradient-dark">
                <div className="container">
                    <motion.div
                        className="section-header light"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="section-badge light">Testimonials</span>
                        <h2 className="section-title">What Our Users Say</h2>
                        <p className="section-subtitle">
                            Real experiences from patients and doctors using DocChannel
                        </p>
                    </motion.div>

                    <div className="testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                className="testimonial-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="testimonial-rating">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FiStar key={i} className="star filled" />
                                    ))}
                                </div>
                                <p className="testimonial-text">"{testimonial.text}"</p>
                                <div className="testimonial-author">
                                    <img src={testimonial.image} alt={testimonial.name} />
                                    <div>
                                        <h5>{testimonial.name}</h5>
                                        <span>{testimonial.role}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta section">
                <div className="container">
                    <motion.div
                        className="cta-content"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2>Ready to Take Control of Your Health?</h2>
                        <p>Join thousands of patients who trust DocChannel for their healthcare needs.</p>
                        <div className="cta-actions">
                            <Link to="/register" className="btn btn-primary btn-lg">
                                Create Free Account
                            </Link>
                            <Link to="/doctors" className="btn btn-outline btn-lg" style={{ borderColor: 'white', color: 'white' }}>
                                Browse Doctors
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
