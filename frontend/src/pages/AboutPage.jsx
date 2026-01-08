import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiUsers, FiAward, FiTarget, FiCheck, FiArrowRight } from 'react-icons/fi';
import './AboutPage.css';

const AboutPage = () => {
    const team = [
        {
            name: 'Dr. Rajesh Kumar',
            role: 'Founder & CEO',
            image: 'https://randomuser.me/api/portraits/men/42.jpg',
            bio: 'Former Chief of Medicine at National Hospital with 25 years of experience.'
        },
        {
            name: 'Sarah Williams',
            role: 'Chief Technology Officer',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            bio: 'Tech veteran with experience at leading healthcare startups.'
        },
        {
            name: 'Dr. Priya Sharma',
            role: 'Medical Director',
            image: 'https://randomuser.me/api/portraits/women/65.jpg',
            bio: 'Board-certified physician focused on digital health innovation.'
        },
        {
            name: 'Michael Chen',
            role: 'Head of Operations',
            image: 'https://randomuser.me/api/portraits/men/36.jpg',
            bio: 'Operations expert ensuring seamless patient experiences.'
        }
    ];

    const values = [
        {
            icon: FiHeart,
            title: 'Patient First',
            description: 'Every decision we make puts patient health and experience at the center.'
        },
        {
            icon: FiAward,
            title: 'Excellence',
            description: 'We partner only with verified, highly-qualified healthcare professionals.'
        },
        {
            icon: FiUsers,
            title: 'Accessibility',
            description: 'Healthcare should be accessible to everyone, anywhere, anytime.'
        },
        {
            icon: FiTarget,
            title: 'Innovation',
            description: 'We continuously improve our platform to serve you better.'
        }
    ];

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-badge light">About Us</span>
                        <h1>Transforming Healthcare, One Appointment at a Time</h1>
                        <p>
                            DocChannel is on a mission to make quality healthcare accessible to everyone
                            through technology. We connect patients with the right doctors at the right time.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission-section section">
                <div className="container">
                    <div className="mission-grid">
                        <motion.div
                            className="mission-content"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="section-badge">Our Mission</span>
                            <h2>Making Healthcare Simple & Accessible</h2>
                            <p>
                                We believe that accessing quality healthcare shouldn't be complicated.
                                Long wait times, difficulty finding the right specialist, and inefficient
                                scheduling systems are problems of the past.
                            </p>
                            <p>
                                DocChannel bridges the gap between patients and healthcare providers with
                                a seamless digital platform that prioritizes convenience, transparency,
                                and quality care.
                            </p>
                            <div className="mission-stats">
                                <div className="stat-item">
                                    <span className="stat-number">10K+</span>
                                    <span className="stat-label">Happy Patients</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">500+</span>
                                    <span className="stat-label">Verified Doctors</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">50+</span>
                                    <span className="stat-label">Specialties</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="mission-image"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="image-grid">
                                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400" alt="Doctor consultation" />
                                <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400" alt="Medical team" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section section bg-gradient-light">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="section-badge">Our Values</span>
                        <h2>What Drives Us</h2>
                        <p>Our core values shape every decision we make and every feature we build.</p>
                    </motion.div>

                    <div className="values-grid">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                className="value-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="value-icon">
                                    <value.icon />
                                </div>
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="section-badge">Our Team</span>
                        <h2>Meet the People Behind DocChannel</h2>
                        <p>A dedicated team of healthcare experts and technologists.</p>
                    </motion.div>

                    <div className="team-grid">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                className="team-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="team-image">
                                    <img src={member.image} alt={member.name} />
                                </div>
                                <div className="team-info">
                                    <h4>{member.name}</h4>
                                    <span className="team-role">{member.role}</span>
                                    <p>{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta section bg-gradient-dark">
                <div className="container">
                    <motion.div
                        className="cta-content"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2>Ready to Experience Better Healthcare?</h2>
                        <p>Join thousands of patients who trust DocChannel for their healthcare needs.</p>
                        <div className="cta-actions">
                            <Link to="/register" className="btn btn-primary btn-lg">
                                Get Started Free
                            </Link>
                            <Link to="/contact" className="btn btn-outline btn-lg" style={{ borderColor: 'white', color: 'white' }}>
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
