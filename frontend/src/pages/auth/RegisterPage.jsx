import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiUser, FiPhone } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import './AuthPages.css';

const RegisterPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'patient',
        agreeTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { register, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
        setError('');
    };

    const validateStep1 = () => {
        if (!formData.displayName.trim()) {
            setError('Please enter your full name');
            return false;
        }
        if (!formData.email.trim()) {
            setError('Please enter your email');
            return false;
        }
        if (!formData.phone.trim()) {
            setError('Please enter your phone number');
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        if (!formData.agreeTerms) {
            setError('Please agree to the terms and conditions');
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep1()) {
            setStep(2);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep2()) return;

        setLoading(true);
        setError('');

        try {
            await register(formData.email, formData.password, {
                displayName: formData.displayName,
                phone: formData.phone,
                role: formData.role
            });
            // Navigation is handled by App.jsx
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = async () => {
        setLoading(true);
        setError('');

        try {
            await loginWithGoogle(formData.role);
        } catch (err) {
            setError('Google sign-in failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-left">
                    <div className="auth-left-content">
                        <Link to="/" className="auth-back">
                            <FiArrowLeft /> Back to Home
                        </Link>

                        <div className="auth-header">
                            <Link to="/" className="auth-logo">
                                <div className="auth-logo-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M12 4v16M4 12h16" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <span>DocChannel</span>
                            </Link>
                            <h1>Create Account</h1>
                            <p>Join thousands of users managing their health online</p>
                        </div>

                        {/* Progress Steps */}
                        <div className="auth-steps">
                            <div className={`auth-step ${step >= 1 ? 'active' : ''}`}>
                                <span className="step-number">1</span>
                                <span className="step-label">Personal Info</span>
                            </div>
                            <div className="step-line"></div>
                            <div className={`auth-step ${step >= 2 ? 'active' : ''}`}>
                                <span className="step-number">2</span>
                                <span className="step-label">Security</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            {error && (
                                <div className="auth-error">
                                    {error}
                                </div>
                            )}

                            {step === 1 && (
                                <>
                                    {/* Role Selection */}
                                    <div className="form-group">
                                        <label className="form-label">I want to register as</label>
                                        <div className="role-selector">
                                            <label className={`role-option ${formData.role === 'patient' ? 'active' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="role"
                                                    value="patient"
                                                    checked={formData.role === 'patient'}
                                                    onChange={handleChange}
                                                />
                                                <div className="role-content">
                                                    <span className="role-icon">👤</span>
                                                    <span className="role-title">Patient</span>
                                                    <span className="role-desc">Book appointments</span>
                                                </div>
                                            </label>
                                            <label className={`role-option ${formData.role === 'doctor' ? 'active' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="role"
                                                    value="doctor"
                                                    checked={formData.role === 'doctor'}
                                                    onChange={handleChange}
                                                />
                                                <div className="role-content">
                                                    <span className="role-icon">👨‍⚕️</span>
                                                    <span className="role-title">Doctor</span>
                                                    <span className="role-desc">Manage practice</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <div className="input-group">
                                            <FiUser className="input-icon" />
                                            <input
                                                type="text"
                                                name="displayName"
                                                className="form-input"
                                                placeholder="Enter your full name"
                                                value={formData.displayName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <div className="input-group">
                                            <FiMail className="input-icon" />
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-input"
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Phone Number</label>
                                        <div className="input-group">
                                            <FiPhone className="input-icon" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                className="form-input"
                                                placeholder="Enter your phone number"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-primary btn-lg auth-submit"
                                        onClick={handleNext}
                                    >
                                        Continue
                                    </button>

                                    <div className="divider-text">or continue with</div>

                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-lg auth-google"
                                        onClick={handleGoogleRegister}
                                        disabled={loading}
                                    >
                                        <FcGoogle size={20} />
                                        Google
                                    </button>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <div className="form-group">
                                        <label className="form-label">Password</label>
                                        <div className="input-group">
                                            <FiLock className="input-icon" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                className="form-input"
                                                placeholder="Create a password"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                            <button
                                                type="button"
                                                className="input-toggle"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FiEyeOff /> : <FiEye />}
                                            </button>
                                        </div>
                                        <span className="form-helper">Must be at least 6 characters</span>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Confirm Password</label>
                                        <div className="input-group">
                                            <FiLock className="input-icon" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                className="form-input"
                                                placeholder="Confirm your password"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                name="agreeTerms"
                                                checked={formData.agreeTerms}
                                                onChange={handleChange}
                                            />
                                            <span className="checkbox-custom"></span>
                                            <span>
                                                I agree to the{' '}
                                                <a href="#" className="form-link inline">Terms of Service</a>
                                                {' '}and{' '}
                                                <a href="#" className="form-link inline">Privacy Policy</a>
                                            </span>
                                        </label>
                                    </div>

                                    <div className="auth-buttons">
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-lg"
                                            onClick={() => setStep(1)}
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg"
                                            disabled={loading}
                                        >
                                            {loading ? <span className="spinner"></span> : 'Create Account'}
                                        </button>
                                    </div>
                                </>
                            )}

                            <p className="auth-footer-text">
                                Already have an account?{' '}
                                <Link to="/login" className="auth-link">
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>

                <div className="auth-right">
                    <div className="auth-right-content">
                        <div className="auth-benefits">
                            <h3>Why Join DocChannel?</h3>
                            <ul className="benefits-list">
                                <li>
                                    <span className="benefit-icon">🏥</span>
                                    <div>
                                        <strong>Access Top Doctors</strong>
                                        <p>Connect with verified healthcare professionals</p>
                                    </div>
                                </li>
                                <li>
                                    <span className="benefit-icon">📅</span>
                                    <div>
                                        <strong>Easy Scheduling</strong>
                                        <p>Book appointments in seconds, anytime</p>
                                    </div>
                                </li>
                                <li>
                                    <span className="benefit-icon">🔒</span>
                                    <div>
                                        <strong>Secure & Private</strong>
                                        <p>Your health data is always protected</p>
                                    </div>
                                </li>
                                <li>
                                    <span className="benefit-icon">📱</span>
                                    <div>
                                        <strong>Real-time Updates</strong>
                                        <p>Get notified about your appointments</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
