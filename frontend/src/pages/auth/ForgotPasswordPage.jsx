import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi';
import './AuthPages.css';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const { resetPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setError('Please enter your email address');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await resetPassword(email);
            setSuccess(true);
        } catch (err) {
            setError('Failed to send reset email. Please check your email address.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container auth-container-centered">
                <div className="auth-left auth-left-full">
                    <div className="auth-left-content">
                        <Link to="/login" className="auth-back">
                            <FiArrowLeft /> Back to Login
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

                            {!success ? (
                                <>
                                    <h1>Forgot Password?</h1>
                                    <p>No worries! Enter your email and we'll send you reset instructions.</p>
                                </>
                            ) : (
                                <>
                                    <div className="success-icon">
                                        <FiCheck />
                                    </div>
                                    <h1>Check Your Email</h1>
                                    <p>We've sent password reset instructions to <strong>{email}</strong></p>
                                </>
                            )}
                        </div>

                        {!success ? (
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
                                            className="form-input"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setError('');
                                            }}
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg auth-submit"
                                    disabled={loading}
                                >
                                    {loading ? <span className="spinner"></span> : 'Reset Password'}
                                </button>

                                <p className="auth-footer-text">
                                    Remember your password?{' '}
                                    <Link to="/login" className="auth-link">
                                        Back to Login
                                    </Link>
                                </p>
                            </form>
                        ) : (
                            <div className="auth-success-actions">
                                <Link to="/login" className="btn btn-primary btn-lg auth-submit">
                                    Back to Login
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-ghost"
                                    onClick={() => {
                                        setSuccess(false);
                                        setEmail('');
                                    }}
                                >
                                    Didn't receive the email? Try again
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
