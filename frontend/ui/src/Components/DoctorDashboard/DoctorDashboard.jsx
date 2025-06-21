import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Plus, Edit, Trash2, Eye, Phone, Mail, MapPin, Activity, AlertCircle, CheckCircle } from 'lucide-react';
import './DoctorDashboard.css';
import { setAppointmentSlots } from '../../utils/auth';
import Swal from 'sweetalert2';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, date: '2025-06-10', time: '09:00', duration: 30, isBooked: false },
    { id: 2, date: '2025-06-10', time: '09:30', duration: 30, isBooked: true },
    { id: 3, date: '2025-06-10', time: '10:00', duration: 30, isBooked: false },
    { id: 4, date: '2025-06-11', time: '14:00', duration: 45, isBooked: true },
  ]);
  
  const doctorId = localStorage.getItem("doctorId");

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: 'John Smith',
      time: '09:30',
      date: '2025-06-10',
      type: 'Consultation',
      status: 'confirmed',
      phone: '+1-555-0123',
      email: 'john.smith@email.com',
      notes: 'Follow-up for diabetes management'
    },
    {
      id: 2,
      patient: 'Sarah Johnson',
      time: '14:00',
      date: '2025-06-11',
      type: 'Check-up',
      status: 'pending',
      phone: '+1-555-0456',
      email: 'sarah.j@email.com',
      notes: 'Annual physical examination'
    },
    {
      id: 3,
      patient: 'Michael Brown',
      time: '10:15',
      date: '2025-06-09',
      type: 'Emergency',
      status: 'completed',
      phone: '+1-555-0789',
      email: 'mbrown@email.com',
      notes: 'Chest pain evaluation'
    }
  ]);

  const [newSlot, setNewSlot] = useState({
    date: '',
    time: '',
    duration: 30
  });

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // const {error} = setAppointmentSlots.post(doctorId,timeSlots)
  // if (error){
  //   Swal.fire({})
  // }
  // else{
  //   Navigate('/doctorDashboard')
  //   Swal.fire({})
  // }
 
 
  const addTimeSlot = async() => {

    if (newSlot.date && newSlot.time) {
      const slot = {
        id: Date.now(),
        date: newSlot.date,
        time: newSlot.time,
        duration: parseInt(newSlot.duration),
        isBooked: false
      };
      // setTimeSlots([...timeSlots, slot]);
      // setNewSlot({ date: '', time: '', duration: 30 });
    const updatedSlots = [...timeSlots, slot];
    setTimeSlots(updatedSlots);
    setNewSlot({ date: '', time: '', duration: 30 });
    
    // Send to backend
    try{
      const results = await setAppointmentSlots(doctorId, [slot]);

      if (results[0].success) {
        Swal.fire({ icon: 'success', title: 'Slot added successfully' });
      } else {
        console.log(results[0].error)
        Swal.fire({ icon: 'error', title: 'Failed to add slot', text: JSON.stringify(results[0].error) });
      }
    }
    catch (error) {
      console.error("Backend error:", error.response?.data || error.message);
      results.push({ success: false, error: error.response?.data || error.message });
}

    }
  };


  const deleteTimeSlot = (id) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
  };

  const updateAppointmentStatus = (id, status) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status } : apt
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'status-confirmed';
      case 'pending': return 'status-pending';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const todayAppointments = appointments.filter(apt => apt.date === '2025-06-10');
  const upcomingAppointments = appointments.filter(apt => new Date(apt.date) > new Date('2025-06-10'));

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Dr. Dashboard</h1>
          <p>Welcome back, Dr. Smith</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <Activity className="stat-icon" />
            <div>
              <span className="stat-number">{todayAppointments.length}</span>
              <span className="stat-label">Today's Appointments</span>
            </div>
          </div>
          <div className="stat-card">
            <Users className="stat-icon" />
            <div>
              <span className="stat-number">{appointments.length}</span>
              <span className="stat-label">Total Patients</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-nav">
        <button 
          className={`nav-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Activity size={20} />
          Overview
        </button>
        <button 
          className={`nav-button ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          <Calendar size={20} />
          Appointments
        </button>
        <button 
          className={`nav-button ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          <Clock size={20} />
          Time Slots
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="overview-grid">
              <div className="overview-card">
                <h3>Today's Schedule</h3>
                <div className="appointments-preview">
                  {todayAppointments.length > 0 ? (
                    todayAppointments.map(apt => (
                      <div key={apt.id} className="appointment-preview">
                        <div className="appointment-time">{apt.time}</div>
                        <div className="appointment-details">
                          <strong>{apt.patient}</strong>
                          <span className={`appointment-status ${getStatusColor(apt.status)}`}>
                            {apt.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-appointments">No appointments today</p>
                  )}
                </div>
              </div>

              <div className="overview-card">
                <h3>Quick Actions</h3>
                <div className="quick-actions">
                  <button className="action-button primary" onClick={() => setActiveTab('schedule')}>
                    <Plus size={16} />
                    Add Time Slot
                  </button>
                  <button className="action-button secondary" onClick={() => setActiveTab('appointments')}>
                    <Eye size={16} />
                    View All Appointments
                  </button>
                </div>
              </div>

              <div className="overview-card">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <CheckCircle className="activity-icon success" size={16} />
                    <span>Completed appointment with Michael Brown</span>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                  <div className="activity-item">
                    <AlertCircle className="activity-icon warning" size={16} />
                    <span>New appointment request from Sarah Johnson</span>
                    <span className="activity-time">4 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="appointments-section">
            <div className="section-header">
              <h2>Patient Appointments</h2>
            </div>
            
            <div className="appointments-grid">
              {appointments.map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-header">
                    <h3>{appointment.patient}</h3>
                    <span className={`appointment-status ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                  
                  <div className="appointment-info">
                    <div className="info-row">
                      <Calendar size={16} />
                      <span>{appointment.date} at {appointment.time}</span>
                    </div>
                    <div className="info-row">
                      <Activity size={16} />
                      <span>{appointment.type}</span>
                    </div>
                    <div className="info-row">
                      <Phone size={16} />
                      <span>{appointment.phone}</span>
                    </div>
                    <div className="info-row">
                      <Mail size={16} />
                      <span>{appointment.email}</span>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="appointment-notes">
                      <strong>Notes:</strong> {appointment.notes}
                    </div>
                  )}

                  <div className="appointment-actions">
                    <button 
                      className="action-btn view"
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      <Eye size={14} />
                      View
                    </button>
                    {appointment.status === 'pending' && (
                      <button 
                        className="action-btn confirm"
                        onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                      >
                        <CheckCircle size={14} />
                        Confirm
                      </button>
                    )}
                    {appointment.status === 'confirmed' && (
                      <button 
                        className="action-btn complete"
                        onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                      >
                        <CheckCircle size={14} />
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="schedule-section">
            <div className="section-header">
              <h2>Manage Time Slots</h2>
            </div>

            <div className="add-slot-form">
              <h3>Add New Time Slot</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={newSlot.date}
                    onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    value={newSlot.time}
                    onChange={(e) => setNewSlot({...newSlot, time: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Duration (minutes)</label>
                  <select
                    value={newSlot.duration}
                    onChange={(e) => setNewSlot({...newSlot, duration: e.target.value})}
                    className="form-input"
                  >
                    <option value={15}>15 min</option>
                    <option value={30}>30 min</option>
                    <option value={45}>45 min</option>
                    <option value={60}>60 min</option>
                  </select>
                </div>
                <button className="add-button" onClick={addTimeSlot}>
                  <Plus size={16} />
                  Add Slot
                </button>
              </div>
            </div>

            <div className="slots-grid">
              {timeSlots.map(slot => (
                <div key={slot.id} className={`slot-card ${slot.isBooked ? 'booked' : 'available'}`}>
                  <div className="slot-header">
                    <span className="slot-date">{slot.date}</span>
                    <span className={`slot-status ${slot.isBooked ? 'booked' : 'available'}`}>
                      {slot.isBooked ? 'Booked' : 'Available'}
                    </span>
                  </div>
                  <div className="slot-info">
                    <div className="slot-time">
                      <Clock size={16} />
                      {slot.time} ({slot.duration} min)
                    </div>
                  </div>
                  {!slot.isBooked && (
                    <div className="slot-actions">
                      <button 
                        className="delete-btn"
                        onClick={() => deleteTimeSlot(slot.id)}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedAppointment && (
        <div className="modal-overlay" onClick={() => setSelectedAppointment(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Appointment Details</h2>
              <button 
                className="close-button"
                onClick={() => setSelectedAppointment(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="patient-details">
                <h3>{selectedAppointment.patient}</h3>
                <div className="detail-row">
                  <Calendar size={16} />
                  <span>{selectedAppointment.date} at {selectedAppointment.time}</span>
                </div>
                <div className="detail-row">
                  <Activity size={16} />
                  <span>{selectedAppointment.type}</span>
                </div>
                <div className="detail-row">
                  <Phone size={16} />
                  <span>{selectedAppointment.phone}</span>
                </div>
                <div className="detail-row">
                  <Mail size={16} />
                  <span>{selectedAppointment.email}</span>
                </div>
                {selectedAppointment.notes && (
                  <div className="notes-section">
                    <strong>Notes:</strong>
                    <p>{selectedAppointment.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;