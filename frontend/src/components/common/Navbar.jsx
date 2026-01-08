import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, userData, logout } = useAuth();
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const getDashboardLink = () => {
        if (!userData) return '/dashboard';
        const roleLinks = {
            patient: '/dashboard',
            doctor: '/doctor/dashboard',
            admin: '/admin/dashboard'
        };
        return roleLinks[userData.role] || '/dashboard';
    };

    return (
        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <div className="navbar-logo-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 4v16M4 12h16" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span className="navbar-logo-text">DocChannel</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="navbar-menu">
                    <NavLink to="/" className={({ isActive }) =>
                        `navbar-link ${isActive ? 'navbar-link-active' : ''}`
                    } end>
                        Home
                    </NavLink>
                    <NavLink to="/doctors" className={({ isActive }) =>
                        `navbar-link ${isActive ? 'navbar-link-active' : ''}`
                    }>
                        Find Doctors
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) =>
                        `navbar-link ${isActive ? 'navbar-link-active' : ''}`
                    }>
                        About
                    </NavLink>
                    <NavLink to="/contact" className={({ isActive }) =>
                        `navbar-link ${isActive ? 'navbar-link-active' : ''}`
                    }>
                        Contact
                    </NavLink>
                </div>

                {/* Actions */}
                <div className="navbar-actions">
                    {user ? (
                        <div className="navbar-user">
                            <Link to={getDashboardLink()} className="btn btn-primary">
                                Dashboard
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="navbar-link hide-mobile">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="navbar-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`navbar-mobile ${mobileMenuOpen ? 'navbar-mobile-open' : ''}`}>
                <NavLink to="/" className="navbar-mobile-link" end>Home</NavLink>
                <NavLink to="/doctors" className="navbar-mobile-link">Find Doctors</NavLink>
                <NavLink to="/about" className="navbar-mobile-link">About</NavLink>
                <NavLink to="/contact" className="navbar-mobile-link">Contact</NavLink>

                <div className="navbar-mobile-divider"></div>

                {user ? (
                    <>
                        <Link to={getDashboardLink()} className="btn btn-primary navbar-mobile-btn">
                            Dashboard
                        </Link>
                        <button onClick={logout} className="btn btn-secondary navbar-mobile-btn">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-secondary navbar-mobile-btn">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-primary navbar-mobile-btn">
                            Get Started
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
