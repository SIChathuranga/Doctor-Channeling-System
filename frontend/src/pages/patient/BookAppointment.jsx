import { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { FiCalendar, FiClock, FiUser, FiFileText, FiCheck, FiArrowLeft } from 'react-icons/fi';

const BookAppointment = () => {
    const { doctorId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user, userData } = useAuth();
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState('');

    const date = searchParams.get('date');
    const time = searchParams.get('time');

    const doctor = { id: doctorId, displayName: 'Dr. Sarah Johnson', specialty: 'Cardiology', hospital: 'City Heart Center', fee: 3500, photoURL: 'https://randomuser.me/api/portraits/women/45.jpg' };

    const handleConfirmBooking = async () => {
        setLoading(true);
        try {
            await addDoc(collection(db, 'appointments'), { doctorId, patientId: user.uid, patientName: userData?.displayName, doctorName: doctor.displayName, specialty: doctor.specialty, hospital: doctor.hospital, date, time, notes, fee: doctor.fee, status: 'pending', queueNumber: Math.floor(Math.random() * 10) + 1, createdAt: serverTimestamp() });
            toast.success('Appointment booked successfully!');
            navigate('/dashboard/appointments');
        } catch (error) { toast.error('Failed to book appointment'); } finally { setLoading(false); }
    };

    return (
        <div className="book-appointment-page">
            <button className="btn btn-ghost" onClick={() => navigate(-1)}><FiArrowLeft /> Back</button>
            <div className="booking-container">
                <div className="booking-card">
                    <h2><FiCheck /> Confirm Your Appointment</h2>
                    <div className="booking-summary">
                        <div className="doctor-summary"><img src={doctor.photoURL} alt={doctor.displayName} /><div><h4>{doctor.displayName}</h4><span>{doctor.specialty}</span><span>{doctor.hospital}</span></div></div>
                        <div className="booking-details"><div className="detail"><FiCalendar /><span>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span></div><div className="detail"><FiClock /><span>{time}</span></div><div className="detail"><FiUser /><span>{userData?.displayName || 'Patient'}</span></div></div>
                        <div className="form-group"><label className="form-label"><FiFileText /> Notes (Optional)</label><textarea className="form-textarea" placeholder="Any symptoms or concerns..." value={notes} onChange={(e) => setNotes(e.target.value)} rows="3"></textarea></div>
                        <div className="fee-section"><span>Consultation Fee</span><span className="fee-amount">Rs. {doctor.fee.toLocaleString()}</span></div>
                        <button className="btn btn-primary btn-lg" onClick={handleConfirmBooking} disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>{loading ? <span className="spinner"></span> : 'Confirm Booking'}</button>
                    </div>
                </div>
            </div>
            <style>{`.book-appointment-page { animation: fadeIn 0.4s ease-out; } .booking-container { max-width: 600px; margin: var(--space-6) auto; } .booking-card { background: white; border-radius: var(--radius-xl); padding: var(--space-8); box-shadow: var(--shadow-lg); } .booking-card h2 { display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-6); } .doctor-summary { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-4); background: var(--neutral-50); border-radius: var(--radius-lg); margin-bottom: var(--space-6); } .doctor-summary img { width: 72px; height: 72px; border-radius: var(--radius-full); object-fit: cover; } .doctor-summary h4 { font-size: var(--text-lg); margin-bottom: var(--space-1); } .doctor-summary span { display: block; font-size: var(--text-sm); color: var(--neutral-600); } .booking-details { display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-6); } .detail { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); background: var(--neutral-50); border-radius: var(--radius-md); } .detail svg { color: var(--primary-500); } .fee-section { display: flex; justify-content: space-between; padding: var(--space-4); background: var(--success-50); border-radius: var(--radius-lg); margin-bottom: var(--space-6); font-weight: 600; } .fee-amount { font-size: var(--text-xl); color: var(--success-600); }`}</style>
        </div>
    );
};

export default BookAppointment;
