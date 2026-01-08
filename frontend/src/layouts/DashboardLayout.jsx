import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    FiHome, FiCalendar, FiUsers, FiFileText, FiSettings,
    FiUser, FiClock, FiMenu, FiX, FiLogOut, FiBell,
    FiActivity, FiUserPlus
} from 'react-icons/fi';
import './DashboardLayout.css';

const DashboardLayout = ({ userType = 'patient' }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, userData, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    // Navigation items based on user type
    const navItems = {
        patient: [
            { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
            { path: '/dashboard/appointments', icon: FiCalendar, label: 'My Appointments' },
            { path: '/dashboard/medical-records', icon: FiFileText, label: 'Medical Records' },
            { path: '/dashboard/profile', icon: FiUser, label: 'Profile' },
        ],
        doctor: [
            { path: '/doctor/dashboard', icon: FiHome, label: 'Dashboard' },
            { path: '/doctor/appointments', icon: FiCalendar, label: 'Appointments' },
            { path: '/doctor/schedule', icon: FiClock, label: 'Schedule' },
            { path: '/doctor/patients', icon: FiUsers, label: 'Patients' },
            { path: '/doctor/profile', icon: FiUser, label: 'Profile' },
        ],
        admin: [
            { path: '/admin/dashboard', icon: FiActivity, label: 'Dashboard' },
            { path: '/admin/doctors', icon: FiUserPlus, label: 'Doctors' },
            { path: '/admin/patients', icon: FiUsers, label: 'Patients' },
            { path: '/admin/appointments', icon: FiCalendar, label: 'Appointments' },
        ]
    };

    const currentNavItems = navItems[userType] || navItems.patient;

    return (
        <div className="dashboard-layout">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-header">
                    <a href="/" className="sidebar-logo">
                        <div className="logo-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 4v16M4 12h16" strokeLinecap="round" />
                            </svg>
                        </div>
                        <span className="logo-text">DocChannel</span>
                    </a>
                    <button
                        className="sidebar-close"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FiX />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {currentNavItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/dashboard' || item.path === '/doctor/dashboard' || item.path === '/admin/dashboard'}
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
                            }
                            onClick={() => setSidebarOpen(false)}
                        >
                            <item.icon className="sidebar-link-icon" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="sidebar-link" onClick={handleLogout}>
                        <FiLogOut className="sidebar-link-icon" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="dashboard-main">
                {/* Top Header */}
                <header className="dashboard-header">
                    <button
                        className="menu-toggle"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <FiMenu />
                    </button>

                    <div className="header-search">
                        {/* Can add search functionality here */}
                    </div>

                    <div className="header-actions">
                        <button className="header-notification">
                            <FiBell />
                            <span className="notification-badge">3</span>
                        </button>

                        <div className="header-user">
                            <div className="header-user-info">
                                <span className="header-user-name">
                                    {userData?.displayName || user?.email?.split('@')[0]}
                                </span>
                                <span className="header-user-role">
                                    {userData?.role?.charAt(0).toUpperCase() + userData?.role?.slice(1)}
                                </span>
                            </div>
                            <div className="header-avatar">
                                {userData?.photoURL ? (
                                    <img src={userData.photoURL} alt="Profile" />
                                ) : (
                                    <span>{(userData?.displayName || user?.email)?.[0]?.toUpperCase()}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="dashboard-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
