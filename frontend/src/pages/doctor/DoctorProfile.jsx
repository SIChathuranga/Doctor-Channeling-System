import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiPhone, FiMapPin, FiAward, FiSave, FiCamera, FiPlus, FiX } from 'react-icons/fi';
import '../patient/PatientProfile.css';

const DoctorProfile = () => {
    const { user, userData, fetchUserData } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        displayName: userData?.displayName || '',
        phone: userData?.phone || '',
        specialty: userData?.specialty || '',
        qualification: userData?.qualification || '',
        experience: userData?.experience || '',
        hospital: userData?.hospital || '',
        consultationFee: userData?.consultationFee || '',
        about: userData?.about || '',
        languages: userData?.languages || ['English'],
        services: userData?.services || []
    });
    const [newService, setNewService] = useState('');

    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
    const addService = () => { if (newService.trim()) { setFormData({ ...formData, services: [...formData.services, newService.trim()] }); setNewService(''); } };
    const removeService = (index) => { setFormData({ ...formData, services: formData.services.filter((_, i) => i !== index) }); };

    const handleSubmit = async (e) => {
        e.preventDefault(); setLoading(true);
        try { await updateDoc(doc(db, 'users', user.uid), { ...formData, updatedAt: serverTimestamp() }); await fetchUserData(user.uid); toast.success('Profile updated!'); }
        catch (error) { toast.error('Failed to update profile'); } finally { setLoading(false); }
    };

    const specialties = ['Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Ophthalmology', 'Dentistry', 'Psychiatry', 'General Medicine', 'Gynecology', 'ENT'];

    return (
        <div className="profile-page">
            <div className="page-header"><h1>Doctor Profile</h1><p>Manage your professional information</p></div>
            <form className="profile-card" onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-6)', borderBottom: '1px solid var(--neutral-100)' }}>
                    <div style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-full)', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 'var(--text-3xl)', fontWeight: '700' }}>{userData?.displayName?.[0] || 'D'}</div>
                    <div><h3>{userData?.displayName || 'Doctor'}</h3><p style={{ color: 'var(--neutral-600)' }}>{user?.email}</p><button type="button" className="btn btn-sm btn-secondary" style={{ marginTop: 'var(--space-2)' }}><FiCamera /> Change Photo</button></div>
                </div>
                <div className="form-grid">
                    <div className="form-group"><label className="form-label">Full Name</label><input type="text" name="displayName" className="form-input" value={formData.displayName} onChange={handleChange} /></div>
                    <div className="form-group"><label className="form-label">Phone</label><input type="tel" name="phone" className="form-input" value={formData.phone} onChange={handleChange} /></div>
                    <div className="form-group"><label className="form-label">Specialty</label><select name="specialty" className="form-select" value={formData.specialty} onChange={handleChange}><option value="">Select Specialty</option>{specialties.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                    <div className="form-group"><label className="form-label">Qualification</label><input type="text" name="qualification" className="form-input" placeholder="e.g., MD, FACC" value={formData.qualification} onChange={handleChange} /></div>
                    <div className="form-group"><label className="form-label">Experience (years)</label><input type="number" name="experience" className="form-input" value={formData.experience} onChange={handleChange} /></div>
                    <div className="form-group"><label className="form-label">Consultation Fee (Rs.)</label><input type="number" name="consultationFee" className="form-input" value={formData.consultationFee} onChange={handleChange} /></div>
                </div>
                <div className="form-group full-width"><label className="form-label">Hospital/Clinic</label><input type="text" name="hospital" className="form-input" value={formData.hospital} onChange={handleChange} /></div>
                <div className="form-group full-width"><label className="form-label">About</label><textarea name="about" className="form-textarea" rows="4" placeholder="Write about your experience and expertise..." value={formData.about} onChange={handleChange}></textarea></div>
                <div className="form-group full-width"><label className="form-label">Services Offered</label>
                    <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}><input type="text" className="form-input" placeholder="Add a service..." value={newService} onChange={(e) => setNewService(e.target.value)} /><button type="button" className="btn btn-secondary" onClick={addService}><FiPlus /></button></div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>{formData.services.map((s, i) => <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-3)', background: 'var(--primary-100)', color: 'var(--primary-700)', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-sm)' }}>{s}<button type="button" onClick={() => removeService(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}><FiX size={14} /></button></span>)}</div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? <span className="spinner"></span> : <><FiSave /> Save Profile</>}</button>
            </form>
        </div>
    );
};

export default DoctorProfile;
