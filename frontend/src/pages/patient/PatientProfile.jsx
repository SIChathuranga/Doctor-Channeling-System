import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiSave, FiCamera } from 'react-icons/fi';
import './PatientProfile.css';

const PatientProfile = () => {
    const { user, userData, fetchUserData } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        displayName: userData?.displayName || '',
        phone: userData?.phone || '',
        dateOfBirth: userData?.dateOfBirth || '',
        gender: userData?.gender || '',
        bloodGroup: userData?.bloodGroup || '',
        address: userData?.address || '',
        emergencyContact: userData?.emergencyContact || '',
        allergies: userData?.allergies || ''
    });

    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateDoc(doc(db, 'users', user.uid), { ...formData, updatedAt: serverTimestamp() });
            await fetchUserData(user.uid);
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error('Failed to update profile');
        } finally { setLoading(false); }
    };

    return (
        <div className="profile-page">
            <div className="page-header"><h1>My Profile</h1><p>Manage your personal information</p></div>
            <div className="profile-grid">
                <div className="profile-card avatar-card">
                    <div className="avatar-section">
                        <div className="avatar-large">{userData?.photoURL ? <img src={userData.photoURL} alt="Profile" /> : <span>{userData?.displayName?.[0] || 'U'}</span>}</div>
                        <button className="btn btn-secondary btn-sm"><FiCamera /> Change Photo</button>
                    </div>
                    <div className="user-info">
                        <h3>{userData?.displayName || 'User'}</h3>
                        <p><FiMail /> {user?.email}</p>
                        <span className="badge badge-primary">{userData?.role || 'Patient'}</span>
                    </div>
                </div>
                <form className="profile-card form-card" onSubmit={handleSubmit}>
                    <h3>Personal Information</h3>
                    <div className="form-grid">
                        <div className="form-group"><label className="form-label">Full Name</label><input type="text" name="displayName" className="form-input" value={formData.displayName} onChange={handleChange} /></div>
                        <div className="form-group"><label className="form-label">Phone</label><input type="tel" name="phone" className="form-input" value={formData.phone} onChange={handleChange} /></div>
                        <div className="form-group"><label className="form-label">Date of Birth</label><input type="date" name="dateOfBirth" className="form-input" value={formData.dateOfBirth} onChange={handleChange} /></div>
                        <div className="form-group"><label className="form-label">Gender</label><select name="gender" className="form-select" value={formData.gender} onChange={handleChange}><option value="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div>
                        <div className="form-group"><label className="form-label">Blood Group</label><select name="bloodGroup" className="form-select" value={formData.bloodGroup} onChange={handleChange}><option value="">Select</option><option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="O+">O+</option><option value="O-">O-</option><option value="AB+">AB+</option><option value="AB-">AB-</option></select></div>
                        <div className="form-group"><label className="form-label">Emergency Contact</label><input type="tel" name="emergencyContact" className="form-input" value={formData.emergencyContact} onChange={handleChange} /></div>
                    </div>
                    <div className="form-group full-width"><label className="form-label">Address</label><textarea name="address" className="form-textarea" rows="2" value={formData.address} onChange={handleChange}></textarea></div>
                    <div className="form-group full-width"><label className="form-label">Allergies (if any)</label><input type="text" name="allergies" className="form-input" placeholder="e.g., Penicillin, Peanuts" value={formData.allergies} onChange={handleChange} /></div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? <span className="spinner"></span> : <><FiSave /> Save Changes</>}</button>
                </form>
            </div>
        </div>
    );
};

export default PatientProfile;
