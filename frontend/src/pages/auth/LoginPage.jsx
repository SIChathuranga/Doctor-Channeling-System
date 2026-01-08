import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import './AuthPages.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(formData.email, formData.password);
            // Navigation is handled by App.jsx based on user role
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');

        try {
            await loginWithGoogle();
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
                            <h1>Welcome Back</h1>
                            <p>Login to access your healthcare dashboard</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            {error && (
                                <div className="auth-error">
                                    {error}
                                </div>
                            )}

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
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-label-row">
                                    <label className="form-label">Password</label>
                                    <Link to="/forgot-password" className="form-link">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="input-group">
                                    <FiLock className="input-icon" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        className="form-input"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="input-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-lg auth-submit"
                                disabled={loading}
                            >
                                {loading ? <span className="spinner"></span> : 'Login'}
                            </button>

                            <div className="divider-text">or continue with</div>

                            <button
                                type="button"
                                className="btn btn-secondary btn-lg auth-google"
                                onClick={handleGoogleLogin}
                                disabled={loading}
                            >
                                <FcGoogle size={20} />
                                Google
                            </button>

                            <p className="auth-footer-text">
                                Don't have an account?{' '}
                                <Link to="/register" className="auth-link">
                                    Create Account
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>

                <div className="auth-right">
                    <div className="auth-right-content">
                        <div className="auth-illustration">
                            <div className="illustration-shapes">
                                <div className="shape shape-1"></div>
                                <div className="shape shape-2"></div>
                                <div className="shape shape-3"></div>
                            </div>
                            <div className="illustration-card">
                                <div className="illustration-avatar">
                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Doctor" />
                                    <span className="online-badge"></span>
                                </div>
                                <h3>Dr. James Wilson</h3>
                                <p>Cardiologist • Available</p>
                                <div className="illustration-stats">
                                    <div>
                                        <strong>500+</strong>
                                        <span>Patients</span>
                                    </div>
                                    <div>
                                        <strong>4.9</strong>
                                        <span>Rating</span>
                                    </div>
                                    <div>
                                        <strong>10+</strong>
                                        <span>Years</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="auth-quote">
                            <p>"Access world-class healthcare from the comfort of your home."</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
