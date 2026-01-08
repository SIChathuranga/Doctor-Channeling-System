import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFoundPage = () => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--neutral-50)',
            padding: 'var(--space-6)'
        }}>
            <div style={{ textAlign: 'center', maxWidth: '500px' }}>
                <div style={{
                    fontSize: '120px',
                    fontWeight: '800',
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1
                }}>
                    404
                </div>
                <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
                    Page Not Found
                </h1>
                <p style={{ color: 'var(--neutral-600)', marginBottom: 'var(--space-8)', lineHeight: 1.6 }}>
                    Oops! The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
                    <Link to="/" className="btn btn-primary">
                        <FiHome /> Go to Homepage
                    </Link>
                    <button onClick={() => window.history.back()} className="btn btn-secondary">
                        <FiArrowLeft /> Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
