import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  FileText, 
  Heart, 
  Activity, 
  Bell, 
  Settings, 
  Download,
  Eye,
  Phone,
  MapPin,
  Clock,
  AlertCircle,
  TrendingUp,
  Pill
} from 'lucide-react';
import './UserDashboard.css';
import { useLocation } from 'react-router-dom';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const location = useLocation();
  const username = location.state?.username;
  // Sample data
  const userInfo = {
    name: username,
    age: 34,
    bloodType: "O+",
    height: "5'6\"",
    weight: "140 lbs",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@email.com",
    address: "123 Health St, Medical City, MC 12345"
  };

  const appointments = [
    {
      id: 1,
      doctor: "Dr. Smith",
      specialty: "Cardiology",
      date: "2025-06-15",
      time: "10:00 AM",
      status: "Upcoming",
      type: "Check-up"
    },
    {
      id: 2,
      doctor: "Dr. Davis",
      specialty: "General Medicine",
      date: "2025-06-20",
      time: "2:30 PM",
      status: "Scheduled",
      type: "Follow-up"
    },
    {
      id: 3,
      doctor: "Dr. Wilson",
      specialty: "Dermatology",
      date: "2025-05-28",
      time: "11:15 AM",
      status: "Completed",
      type: "Consultation"
    }
  ];

  const medicalReports = [
    {
      id: 1,
      title: "Blood Test Results",
      date: "2025-05-20",
      doctor: "Dr. Smith",
      type: "Lab Report",
      status: "Normal"
    },
    {
      id: 2,
      title: "Chest X-Ray",
      date: "2025-05-15",
      doctor: "Dr. Johnson",
      type: "Imaging",
      status: "Normal"
    },
    {
      id: 3,
      title: "Annual Physical Exam",
      date: "2025-04-30",
      doctor: "Dr. Davis",
      type: "Examination",
      status: "Complete"
    }
  ];

  const vitals = {
    heartRate: 72,
    bloodPressure: "120/80",
    temperature: "98.6°F",
    weight: "140 lbs",
    lastUpdated: "2025-06-01"
  };

  const medications = [
    {
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribed: "Dr. Smith"
    },
    {
      name: "Vitamin D3",
      dosage: "1000 IU",
      frequency: "Daily",
      prescribed: "Dr. Davis"
    }
  ];

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`tab-button ${isActive ? 'tab-button-active' : ''}`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className={`stat-card ${colorClass}`}>
      <div className="stat-card-content">
        <div className="stat-card-text">
          <p className="stat-card-title">{title}</p>
          <p className="stat-card-value">{value}</p>
        </div>
        <Icon className="stat-card-icon" size={32} />
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <div className="user-avatar">
              <User size={24} />
            </div>
            <div className="user-info">
              <h1 className="welcome-title">Welcome back, {userInfo.name}</h1>
              <p className="welcome-subtitle">Manage your health journey</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="header-button">
              <Bell size={20} />
            </button>
            <button className="header-button">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-main">
        {/* Navigation Tabs */}
        <div className="tab-navigation">
          <TabButton 
            id="overview" 
            label="Overview" 
            icon={Activity} 
            isActive={activeTab === 'overview'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="appointments" 
            label="Appointments" 
            icon={Calendar} 
            isActive={activeTab === 'appointments'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="reports" 
            label="Medical Reports" 
            icon={FileText} 
            isActive={activeTab === 'reports'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="profile" 
            label="Profile" 
            icon={User} 
            isActive={activeTab === 'profile'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-content">
            {/* Stats Grid */}
            <div className="stats-grid">
              <StatCard 
                title="Heart Rate" 
                value={`${vitals.heartRate} bpm`} 
                icon={Heart} 
                colorClass="stat-card-red" 
              />
              <StatCard 
                title="Blood Pressure" 
                value={vitals.bloodPressure} 
                icon={Activity} 
                colorClass="stat-card-blue" 
              />
              <StatCard 
                title="Weight" 
                value={vitals.weight} 
                icon={TrendingUp} 
                colorClass="stat-card-green" 
              />
              <StatCard 
                title="Temperature" 
                value={vitals.temperature} 
                icon={Activity} 
                colorClass="stat-card-orange" 
              />
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="overview-grid">
              {/* Recent Appointments */}
              <div className="card">
                <h3 className="card-title">
                  <Calendar className="card-title-icon" size={24} />
                  Upcoming Appointments
                </h3>
                <div className="appointments-list">
                  {appointments.slice(0, 2).map(apt => (
                    <div key={apt.id} className="appointment-item">
                      <div className="appointment-info">
                        <p className="appointment-doctor">{apt.doctor}</p>
                        <p className="appointment-specialty">{apt.specialty}</p>
                        <p className="appointment-datetime">{apt.date} at {apt.time}</p>
                      </div>
                      <span className={`status-badge ${apt.status === 'Upcoming' ? 'status-upcoming' : 'status-scheduled'}`}>
                        {apt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Medications */}
              <div className="card">
                <h3 className="card-title">
                  <Pill className="card-title-icon" size={24} />
                  Current Medications
                </h3>
                <div className="medications-list">
                  {medications.map((med, index) => (
                    <div key={index} className="medication-item">
                      <p className="medication-name">{med.name}</p>
                      <p className="medication-dosage">{med.dosage} - {med.frequency}</p>
                      <p className="medication-prescribed">Prescribed by {med.prescribed}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="card">
            <div className="card-header">
              <h2 className="section-title">
                <Calendar className="section-title-icon" size={28} />
                Your Appointments
              </h2>
              <button className="primary-button">
                Book New Appointment
              </button>
            </div>
            <div className="appointments-full-list">
              {appointments.map(apt => (
                <div key={apt.id} className="appointment-card">
                  <div className="appointment-card-content">
                    <div className="appointment-card-left">
                      <div className="doctor-avatar">
                        <User size={20} />
                      </div>
                      <div className="appointment-details">
                        <h4 className="doctor-name">{apt.doctor}</h4>
                        <p className="doctor-specialty">{apt.specialty}</p>
                        <div className="appointment-meta">
                          <span className="meta-item">
                            <Calendar size={14} />
                            {apt.date}
                          </span>
                          <span className="meta-item">
                            <Clock size={14} />
                            {apt.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="appointment-card-right">
                      <span className={`status-badge ${
                        apt.status === 'Upcoming' ? 'status-upcoming' :
                        apt.status === 'Scheduled' ? 'status-scheduled' :
                        'status-completed'
                      }`}>
                        {apt.status}
                      </span>
                      {apt.status !== 'Completed' && (
                        <button className="reschedule-button">
                          Reschedule
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Medical Reports Tab */}
        {activeTab === 'reports' && (
          <div className="card">
            <div className="card-header">
              <h2 className="section-title">
                <FileText className="section-title-icon" size={28} />
                Medical Reports & History
              </h2>
              <button className="primary-button">
                Upload Report
              </button>
            </div>
            <div className="reports-list">
              {medicalReports.map(report => (
                <div key={report.id} className="report-card">
                  <div className="report-card-content">
                    <div className="report-card-left">
                      <div className="report-icon">
                        <FileText size={20} />
                      </div>
                      <div className="report-details">
                        <h4 className="report-title">{report.title}</h4>
                        <p className="report-type">{report.type}</p>
                        <p className="report-meta">By {report.doctor} • {report.date}</p>
                      </div>
                    </div>
                    <div className="report-card-right">
                      <span className={`status-badge ${
                        report.status === 'Normal' ? 'status-normal' : 'status-complete'
                      }`}>
                        {report.status}
                      </span>
                      <button className="icon-button">
                        <Eye size={18} />
                      </button>
                      <button className="icon-button">
                        <Download size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="profile-grid">
            {/* Personal Information */}
            <div className="card">
              <h3 className="card-title">
                <User className="card-title-icon" size={24} />
                Personal Information
              </h3>
              <div className="profile-form">
                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">Full Name</label>
                    <p className="field-value">{userInfo.name}</p>
                  </div>
                  <div className="form-field">
                    <label className="field-label">Age</label>
                    <p className="field-value">{userInfo.age} years</p>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">Blood Type</label>
                    <p className="field-value">{userInfo.bloodType}</p>
                  </div>
                  <div className="form-field">
                    <label className="field-label">Height</label>
                    <p className="field-value">{userInfo.height}</p>
                  </div>
                </div>
                <div className="form-field">
                  <label className="field-label field-label-with-icon">
                    <Phone size={14} />
                    Phone Number
                  </label>
                  <p className="field-value">{userInfo.phone}</p>
                </div>
                <div className="form-field">
                  <label className="field-label">Email</label>
                  <p className="field-value">{userInfo.email}</p>
                </div>
                <div className="form-field">
                  <label className="field-label field-label-with-icon">
                    <MapPin size={14} />
                    Address
                  </label>
                  <p className="field-value">{userInfo.address}</p>
                </div>
              </div>
              <button className="edit-profile-button">
                Edit Profile
              </button>
            </div>

            {/* Health Summary */}
            <div className="card">
              <h3 className="card-title">
                <Heart className="card-title-icon card-title-icon-red" size={24} />
                Health Summary
              </h3>
              <div className="health-summary">
                <div className="health-card health-card-vitals">
                  <h4 className="health-card-title">Vital Signs</h4>
                  <div className="vitals-grid">
                    <div className="vital-item">
                      <span className="vital-label">Heart Rate:</span>
                      <span className="vital-value">{vitals.heartRate} bpm</span>
                    </div>
                    <div className="vital-item">
                      <span className="vital-label">BP:</span>
                      <span className="vital-value">{vitals.bloodPressure}</span>
                    </div>
                    <div className="vital-item">
                      <span className="vital-label">Weight:</span>
                      <span className="vital-value">{vitals.weight}</span>
                    </div>
                    <div className="vital-item">
                      <span className="vital-label">Temp:</span>
                      <span className="vital-value">{vitals.temperature}</span>
                    </div>
                  </div>
                  <p className="vitals-updated">Last updated: {vitals.lastUpdated}</p>
                </div>
                
                <div className="health-card health-card-status">
                  <h4 className="health-card-title">Health Status</h4>
                  <div className="health-status">
                    <div className="status-indicator"></div>
                    <span className="status-text">Good Health</span>
                  </div>
                  <p className="status-description">All vital signs within normal ranges</p>
                </div>

                <div className="health-card health-card-reminders">
                  <h4 className="health-card-title">
                    <AlertCircle className="reminder-icon" size={16} />
                    Reminders
                  </h4>
                  <ul className="reminders-list">
                    <li>• Annual physical exam due next month</li>
                    <li>• Blood work recommended in 3 months</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;