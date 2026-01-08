import { Link } from 'react-router-dom';
import {
    FiFacebook, FiTwitter, FiInstagram, FiLinkedin,
    FiMail, FiPhone, FiMapPin
} from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-main">
                <div className="footer-container">
                    {/* Brand Column */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <div className="footer-logo-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M12 4v16M4 12h16" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span>DocChannel</span>
                        </Link>
                        <p className="footer-description">
                            Your trusted partner in healthcare. Book appointments with top doctors,
                            manage your health records, and take control of your wellness journey.
                        </p>
                        <div className="footer-social">
                            <a href="#" className="social-link" aria-label="Facebook">
                                <FiFacebook />
                            </a>
                            <a href="#" className="social-link" aria-label="Twitter">
                                <FiTwitter />
                            </a>
                            <a href="#" className="social-link" aria-label="Instagram">
                                <FiInstagram />
                            </a>
                            <a href="#" className="social-link" aria-label="LinkedIn">
                                <FiLinkedin />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column">
                        <h4 className="footer-title">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/doctors">Find Doctors</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </ul>
                    </div>

                    {/* Specialties */}
                    <div className="footer-column">
                        <h4 className="footer-title">Specialties</h4>
                        <ul className="footer-links">
                            <li><a href="#">Cardiology</a></li>
                            <li><a href="#">Dermatology</a></li>
                            <li><a href="#">Neurology</a></li>
                            <li><a href="#">Pediatrics</a></li>
                            <li><a href="#">Orthopedics</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-column">
                        <h4 className="footer-title">Contact Us</h4>
                        <ul className="footer-contact">
                            <li>
                                <FiMapPin />
                                <span>123 Medical Center Drive, Colombo 07, Sri Lanka</span>
                            </li>
                            <li>
                                <FiPhone />
                                <span>+94 11 234 5678</span>
                            </li>
                            <li>
                                <FiMail />
                                <span>support@docchannel.lk</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="footer-container footer-bottom-content">
                    <p>&copy; {currentYear} DocChannel. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
