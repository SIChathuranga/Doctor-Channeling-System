import { useState } from 'react';
import { FiPlus, FiTrash2, FiSave, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';

const DoctorSchedule = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [schedule, setSchedule] = useState({
        Monday: [{ start: '09:00', end: '12:00' }, { start: '14:00', end: '17:00' }],
        Tuesday: [{ start: '09:00', end: '12:00' }],
        Wednesday: [{ start: '14:00', end: '18:00' }],
        Thursday: [{ start: '09:00', end: '12:00' }, { start: '14:00', end: '17:00' }],
        Friday: [{ start: '09:00', end: '13:00' }],
        Saturday: [{ start: '09:00', end: '12:00' }],
        Sunday: []
    });

    const addSlot = (day) => { setSchedule({ ...schedule, [day]: [...schedule[day], { start: '09:00', end: '17:00' }] }); };
    const removeSlot = (day, index) => { setSchedule({ ...schedule, [day]: schedule[day].filter((_, i) => i !== index) }); };
    const updateSlot = (day, index, field, value) => { const newSlots = [...schedule[day]]; newSlots[index][field] = value; setSchedule({ ...schedule, [day]: newSlots }); };
    const handleSave = () => { toast.success('Schedule saved successfully!'); };

    return (
        <div className="schedule-page" style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}><div><h1>Manage Schedule</h1><p>Set your available time slots for appointments</p></div><button className="btn btn-primary" onClick={handleSave}><FiSave /> Save Schedule</button></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {days.map(day => (
                    <div key={day} style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: schedule[day].length > 0 ? 'var(--space-4)' : 0 }}>
                            <h3 style={{ fontSize: 'var(--text-lg)' }}>{day}</h3>
                            <button className="btn btn-sm btn-secondary" onClick={() => addSlot(day)}><FiPlus /> Add Slot</button>
                        </div>
                        {schedule[day].length === 0 ? <p style={{ color: 'var(--neutral-500)', fontSize: 'var(--text-sm)' }}>No slots - Day off</p> : (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                                {schedule[day].map((slot, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3)', background: 'var(--neutral-50)', borderRadius: 'var(--radius-lg)' }}>
                                        <FiClock style={{ color: 'var(--primary-500)' }} />
                                        <input type="time" value={slot.start} onChange={(e) => updateSlot(day, index, 'start', e.target.value)} style={{ border: '1px solid var(--neutral-200)', borderRadius: 'var(--radius-md)', padding: 'var(--space-2)' }} />
                                        <span>to</span>
                                        <input type="time" value={slot.end} onChange={(e) => updateSlot(day, index, 'end', e.target.value)} style={{ border: '1px solid var(--neutral-200)', borderRadius: 'var(--radius-md)', padding: 'var(--space-2)' }} />
                                        <button className="btn btn-icon btn-sm" style={{ color: 'var(--error-500)' }} onClick={() => removeSlot(day, index)}><FiTrash2 /></button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorSchedule;
