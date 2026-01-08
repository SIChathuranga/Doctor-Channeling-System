import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import {
    FiSearch, FiFilter, FiMapPin, FiStar, FiClock,
    FiDollarSign, FiChevronDown, FiX, FiHeart
} from 'react-icons/fi';
import './DoctorsPage.css';

const DoctorsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        specialty: searchParams.get('specialty') || '',
        location: '',
        availability: '',
        gender: '',
        priceRange: '',
        sortBy: 'rating'
    });

    const specialties = [
        'All Specialties',
        'Cardiology',
        'Dermatology',
        'Neurology',
        'Pediatrics',
        'Orthopedics',
        'Ophthalmology',
        'Dentistry',
        'Psychiatry',
        'General Medicine',
        'Gynecology',
        'ENT'
    ];

    // Sample doctors data (in production, this would come from Firebase)
    const sampleDoctors = [
        {
            id: '1',
            displayName: 'Dr. Sarah Johnson',
            specialty: 'Cardiology',
            qualification: 'MD, FACC',
            hospital: 'City Heart Center',
            location: 'Colombo',
            experience: 15,
            rating: 4.9,
            reviewCount: 287,
            fee: 3500,
            nextAvailable: 'Today',
            photoURL: 'https://randomuser.me/api/portraits/women/45.jpg',
            isVerified: true,
            languages: ['English', 'Sinhala']
        },
        {
            id: '2',
            displayName: 'Dr. Michael Chen',
            specialty: 'Dermatology',
            qualification: 'MD, FAAD',
            hospital: 'Skin Care Clinic',
            location: 'Kandy',
            experience: 12,
            rating: 4.8,
            reviewCount: 198,
            fee: 2500,
            nextAvailable: 'Tomorrow',
            photoURL: 'https://randomuser.me/api/portraits/men/32.jpg',
            isVerified: true,
            languages: ['English', 'Tamil']
        },
        {
            id: '3',
            displayName: 'Dr. Emily Brooks',
            specialty: 'Pediatrics',
            qualification: 'MD, FAAP',
            hospital: "Children's Hospital",
            location: 'Colombo',
            experience: 10,
            rating: 4.9,
            reviewCount: 342,
            fee: 2000,
            nextAvailable: 'Today',
            photoURL: 'https://randomuser.me/api/portraits/women/68.jpg',
            isVerified: true,
            languages: ['English', 'Sinhala']
        },
        {
            id: '4',
            displayName: 'Dr. James Wilson',
            specialty: 'Neurology',
            qualification: 'MD, PhD',
            hospital: 'National Hospital',
            location: 'Colombo',
            experience: 20,
            rating: 4.7,
            reviewCount: 156,
            fee: 4000,
            nextAvailable: 'In 2 days',
            photoURL: 'https://randomuser.me/api/portraits/men/52.jpg',
            isVerified: true,
            languages: ['English']
        },
        {
            id: '5',
            displayName: 'Dr. Priya Sharma',
            specialty: 'Gynecology',
            qualification: 'MD, FRCOG',
            hospital: 'Women\'s Care Center',
            location: 'Galle',
            experience: 14,
            rating: 4.8,
            reviewCount: 223,
            fee: 3000,
            nextAvailable: 'Today',
            photoURL: 'https://randomuser.me/api/portraits/women/33.jpg',
            isVerified: true,
            languages: ['English', 'Sinhala', 'Tamil']
        },
        {
            id: '6',
            displayName: 'Dr. David Lee',
            specialty: 'Orthopedics',
            qualification: 'MD, MS',
            hospital: 'Bone & Joint Clinic',
            location: 'Colombo',
            experience: 18,
            rating: 4.6,
            reviewCount: 189,
            fee: 3500,
            nextAvailable: 'Tomorrow',
            photoURL: 'https://randomuser.me/api/portraits/men/75.jpg',
            isVerified: true,
            languages: ['English']
        }
    ];

    useEffect(() => {
        // In production, fetch from Firebase
        // For now, use sample data
        setLoading(true);
        setTimeout(() => {
            let filteredDoctors = [...sampleDoctors];

            if (filters.search) {
                filteredDoctors = filteredDoctors.filter(doc =>
                    doc.displayName.toLowerCase().includes(filters.search.toLowerCase()) ||
                    doc.specialty.toLowerCase().includes(filters.search.toLowerCase())
                );
            }

            if (filters.specialty && filters.specialty !== 'All Specialties') {
                filteredDoctors = filteredDoctors.filter(doc =>
                    doc.specialty === filters.specialty
                );
            }

            // Sort
            if (filters.sortBy === 'rating') {
                filteredDoctors.sort((a, b) => b.rating - a.rating);
            } else if (filters.sortBy === 'experience') {
                filteredDoctors.sort((a, b) => b.experience - a.experience);
            } else if (filters.sortBy === 'fee-low') {
                filteredDoctors.sort((a, b) => a.fee - b.fee);
            } else if (filters.sortBy === 'fee-high') {
                filteredDoctors.sort((a, b) => b.fee - a.fee);
            }

            setDoctors(filteredDoctors);
            setLoading(false);
        }, 500);
    }, [filters]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            specialty: '',
            location: '',
            availability: '',
            gender: '',
            priceRange: '',
            sortBy: 'rating'
        });
    };

    return (
        <div className="doctors-page">
            {/* Hero Section */}
            <section className="doctors-hero">
                <div className="container">
                    <h1>Find Your Doctor</h1>
                    <p>Search from hundreds of verified healthcare professionals</p>

                    {/* Search Bar */}
                    <div className="search-container">
                        <div className="search-box">
                            <FiSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search by doctor name or specialty..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                            />
                        </div>
                        <button
                            className="filter-toggle"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <FiFilter />
                            Filters
                        </button>
                    </div>
                </div>
            </section>

            <div className="doctors-content container">
                {/* Filters Sidebar */}
                <aside className={`filters-sidebar ${showFilters ? 'filters-open' : ''}`}>
                    <div className="filters-header">
                        <h3>Filters</h3>
                        <button className="filters-close" onClick={() => setShowFilters(false)}>
                            <FiX />
                        </button>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Specialty</label>
                        <select
                            className="form-select"
                            value={filters.specialty}
                            onChange={(e) => handleFilterChange('specialty', e.target.value)}
                        >
                            {specialties.map(spec => (
                                <option key={spec} value={spec}>{spec}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Location</label>
                        <select
                            className="form-select"
                            value={filters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                        >
                            <option value="">All Locations</option>
                            <option value="colombo">Colombo</option>
                            <option value="kandy">Kandy</option>
                            <option value="galle">Galle</option>
                            <option value="jaffna">Jaffna</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Availability</label>
                        <select
                            className="form-select"
                            value={filters.availability}
                            onChange={(e) => handleFilterChange('availability', e.target.value)}
                        >
                            <option value="">Any Time</option>
                            <option value="today">Today</option>
                            <option value="tomorrow">Tomorrow</option>
                            <option value="this-week">This Week</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Gender</label>
                        <div className="filter-chips">
                            <button
                                className={`filter-chip ${filters.gender === '' ? 'active' : ''}`}
                                onClick={() => handleFilterChange('gender', '')}
                            >
                                All
                            </button>
                            <button
                                className={`filter-chip ${filters.gender === 'male' ? 'active' : ''}`}
                                onClick={() => handleFilterChange('gender', 'male')}
                            >
                                Male
                            </button>
                            <button
                                className={`filter-chip ${filters.gender === 'female' ? 'active' : ''}`}
                                onClick={() => handleFilterChange('gender', 'female')}
                            >
                                Female
                            </button>
                        </div>
                    </div>

                    <button className="btn btn-secondary" onClick={clearFilters}>
                        Clear All Filters
                    </button>
                </aside>

                {/* Doctors List */}
                <main className="doctors-list-section">
                    {/* Results Header */}
                    <div className="results-header">
                        <p className="results-count">
                            <strong>{doctors.length}</strong> doctors found
                        </p>
                        <div className="sort-select">
                            <label>Sort by:</label>
                            <select
                                value={filters.sortBy}
                                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                            >
                                <option value="rating">Highest Rated</option>
                                <option value="experience">Most Experienced</option>
                                <option value="fee-low">Lowest Fee</option>
                                <option value="fee-high">Highest Fee</option>
                            </select>
                        </div>
                    </div>

                    {/* Doctors Grid */}
                    {loading ? (
                        <div className="doctors-loading">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="doctor-card-skeleton">
                                    <div className="skeleton skeleton-avatar"></div>
                                    <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
                                    <div className="skeleton skeleton-text" style={{ width: '40%' }}></div>
                                    <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
                                </div>
                            ))}
                        </div>
                    ) : doctors.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">🔍</div>
                            <h3 className="empty-state-title">No doctors found</h3>
                            <p className="empty-state-text">Try adjusting your search or filters</p>
                            <button className="btn btn-primary" onClick={clearFilters}>
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="doctors-grid">
                            {doctors.map(doctor => (
                                <article key={doctor.id} className="doctor-card">
                                    <div className="doctor-card-header">
                                        <div className="doctor-avatar">
                                            <img src={doctor.photoURL} alt={doctor.displayName} />
                                            {doctor.isVerified && (
                                                <span className="verified-badge" title="Verified Doctor">✓</span>
                                            )}
                                        </div>
                                        <button className="favorite-btn">
                                            <FiHeart />
                                        </button>
                                    </div>

                                    <div className="doctor-card-body">
                                        <div className="doctor-specialty">
                                            <span className="badge badge-primary">{doctor.specialty}</span>
                                        </div>
                                        <h3 className="doctor-name">{doctor.displayName}</h3>
                                        <p className="doctor-qualification">{doctor.qualification}</p>

                                        <div className="doctor-info">
                                            <span className="info-item">
                                                <FiMapPin /> {doctor.hospital}, {doctor.location}
                                            </span>
                                            <span className="info-item">
                                                <FiClock /> {doctor.experience} years exp.
                                            </span>
                                        </div>

                                        <div className="doctor-rating">
                                            <FiStar className="star" />
                                            <span className="rating-value">{doctor.rating}</span>
                                            <span className="review-count">({doctor.reviewCount} reviews)</span>
                                        </div>
                                    </div>

                                    <div className="doctor-card-footer">
                                        <div className="doctor-fee">
                                            <span className="fee-label">Consultation</span>
                                            <span className="fee-value">Rs. {doctor.fee.toLocaleString()}</span>
                                        </div>
                                        <div className="doctor-availability">
                                            <span className="availability-dot"></span>
                                            {doctor.nextAvailable}
                                        </div>
                                    </div>

                                    <Link to={`/doctors/${doctor.id}`} className="btn btn-primary doctor-book-btn">
                                        Book Appointment
                                    </Link>
                                </article>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* Filter Overlay for Mobile */}
            {showFilters && (
                <div className="filter-overlay" onClick={() => setShowFilters(false)} />
            )}
        </div>
    );
};

export default DoctorsPage;
