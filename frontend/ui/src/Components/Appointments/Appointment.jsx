import React, { useEffect, useState } from 'react';
import './Appointment.css';
import { useNavigate } from 'react-router-dom';
import { SquareArrowLeft } from 'lucide-react';
import { bookAppointmentSlot, getAvailableSlots, getDoctors } from '../../utils/auth';
import Swal from 'sweetalert2';

const Appointment = () => {
  const [selectedDoctorSlots, setSelectedDoctorSlots] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    phone: '',
    email: '',
    reason: ''
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const navigate = useNavigate()
  const handleclick = () => {
    navigate('/')
  }

  const [doctors,setDoctors]=useState([])  //doctors is the list of dict
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data, error } = await getDoctors();   //dict containing data and error will be received 
      if (error) {
        console.log("Fetch error:", error);
      } else {
        setDoctors(data); // assuming you have a state variable like const [doctors, setDoctors] = useState([]);
        console.log(data)
      }
    };

    fetchDoctors();
  }, []);


  const handleDoctorSelect = async(doctor) => {
    // const slot=await getAvailableSlots(doctor.id)   //slot is the list of dict
    const { data, error } = await getAvailableSlots(doctor.id);

    if (error) {
    console.error("Error fetching slots:", error);
  } else {
    console.log("Available slots data:", data);  // ✅ Logs the array of slots
  }

    setSelectedDoctorSlots(data);
    
    setSelectedTimeSlot('');
    setShowBookingForm(false);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setShowBookingForm(true);
  };

  const handleInputChange = (e) => {
    setPatientInfo({
      ...patientInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleBookAppointment = async () => {
    if (!patientInfo.name || !patientInfo.phone || !patientInfo.email) {
      alert('Please fill in all required fields');
      return;
    }
    // const user = JSON.parse(localStorage.getItem('userId')); // or from context/auth state
    const patientId = localStorage.getItem('userId')
    const {data,error}=await bookAppointmentSlot(selectedTimeSlot.id,{
    slot:selectedTimeSlot.id,
    patient: patientId,
    phone: patientInfo.phone,
    symptoms: patientInfo.reason,
  })
    if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Booking Failed',
      text: error,
    });
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Booked!',
      text: 'Your appointment has been booked successfully.',
    });
    navigate('/appointment');
    }
    // alert(`Appointment booked successfully!\nDoctor: ${selectedDoctor.name}\nTime: ${selectedTimeSlot}\nPatient: ${patientInfo.name}`);
    // Reset form
    setSelectedDoctorSlots(null);
    setSelectedTimeSlot('');
    setPatientInfo({ name: '', phone: '', email: '', reason: '' });
    setShowBookingForm(false);
  };

  return (
    <div className="appointment-container">
      <div className="appointment-header">
        <h1>Book Your Appointment</h1>
        <p>Choose from our experienced doctors and find the perfect time slot</p>
      </div>

      <div className="doctors-grid">
        {doctors.map((doctor) => (
          <div
            key={doctor.id} q1
            className={`doctor-card ${selectedDoctorSlots?.id === doctor.id ? 'selected' : ''}`}
            onClick={() => handleDoctorSelect(doctor)}
          >
            <div className="doctor-image">
              <img src={doctor.picture} alt={doctor.name} />
              <div className="rating">⭐ {doctor.experience_years}</div>
            </div>
            <div className="doctor-info">
              <h3>{doctor.user.full_name}</h3>
              <p className="position">{doctor.position}</p>
              <p className="expertise">{doctor.specialization}</p>
              <div className="doctor-details">
                <span className="experience">📅 {doctor.education}</span>
                <span className="fee">💰 {doctor.consultation_fee}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

        {/* also can be done using appointmentslots feild in doctor model */}
      {selectedDoctorSlots && (
        <div className="time-slots-section">
          <h2>Available Time Slots for {selectedDoctorSlots[0].doctor_name}</h2>
          <div className="time-slots-grid">
            {selectedDoctorSlots.map((slot, index) => (
              <button
                key={index}
                className={`time-slot ${selectedTimeSlot === slot.start_time ? 'selected' : ''}`}
                onClick={() => handleTimeSlotSelect(slot)}
              >
                {slot.start_time} - {slot.end_time}
              </button>
            ))}
          </div>
        </div>
      )}
{/* slot,patient,phone,symptoms,bookedat */}
      {showBookingForm && (
        <div className="booking-form-section">
          <h2>Complete Your Booking</h2>
          <div className="booking-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={patientInfo.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={patientInfo.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={patientInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="reason">Reason for Visit</label>
              <textarea
                id="reason"
                name="reason"
                value={patientInfo.reason}
                onChange={handleInputChange}
                rows="3"
                placeholder="Brief description of your symptoms or reason for consultation"
              />
            </div>
            <div className="appointment-summary">
              <h3>Appointment Summary</h3>
              <div className="summary-details">
                <p><strong>Doctor:</strong> {selectedDoctorSlots[0].doctor_name}</p>
                <p><strong>Specialty:</strong> {selectedDoctorSlots[0].position}</p>
                <p><strong>Time:</strong> {selectedTimeSlot.start_time} - {selectedTimeSlot.end_time}</p>
                <p><strong>Consultation Fee:</strong> {selectedDoctorSlots.consultationFee}</p>
              </div>
            </div>
            <button onClick={handleBookAppointment} className="book-appointment-btn">
              Confirm Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;