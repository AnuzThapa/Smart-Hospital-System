import { Clock, Heart, Shield, Star, Stethoscope, Users } from "lucide-react";
import { useState } from "react";
import './Main.css'
import { useNavigate } from "react-router-dom";
const Main = ({ sidebarOpen }) => {
  const navigate=useNavigate()
  const handleclick1=()=>{
    navigate('/appointment')
  }
  const handleclick2=()=>{
    navigate('/doctordashboard')
  }
  const services = [
    {
      icon: Stethoscope,
      title: "General Consultation",
      description: "Expert medical consultation for all your health concerns",
      gradient: "linear-gradient(135deg, #3b82f6, #2563eb)"
    },
    {
      icon: Heart,
      title: "Cardiology",
      description: "Specialized heart care and cardiovascular treatments",
      gradient: "linear-gradient(135deg, #ef4444, #dc2626)"
    },
    {
      icon: Shield,
      title: "Emergency Care",
      description: "24/7 emergency medical services and trauma care",
      gradient: "linear-gradient(135deg, #10b981, #059669)"
    }
  ];

  const stats = [
    { number: "10K+", label: "Patients Served", icon: Users },
    { number: "50+", label: "Expert Doctors", icon: Stethoscope },
    { number: "24/7", label: "Emergency Care", icon: Clock },
    { number: "4.9★", label: "Patient Rating", icon: Star }
  ];

  return (
    <>
      {/* Main CSS would be in Components/Main/Main.css */}
  

      <div className={`main-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
        
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">
              Your Health, Our Priority
            </h1>
            <p className="hero-subtitle">
              Experience world-class healthcare with cutting-edge technology and compassionate care
            </p>
            <div className="hero-buttons">
              <button className="hero-btn-primary"
              onClick={handleclick1}>
                Book Appointment
              </button>
              <button className="hero-btn-secondary"
              onClick={handleclick2}>
                Emergency Care
              </button>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="hero-decorative-1"></div>
          <div className="hero-decorative-2"></div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-container">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stats-card">
                  <div className="stats-icon-container">
                    <div className="stats-icon">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="stats-number">{stat.number}</p>
                  <p className="stats-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <div className="services-container">
            <div className="services-header">
              <h2 className="services-title">
                Our <span className="services-title-highlight">Services</span>
              </h2>
              <p className="services-subtitle">
                Comprehensive healthcare services designed to meet all your medical needs with excellence and care
              </p>
            </div>
            
            <div className="services-grid">
              {services.map((service, index) => (
                <div key={index} className="service-card">
                  <div 
                    className="service-card-bg"
                    style={{ background: service.gradient }}
                  ></div>
                  <div className="service-card-content">
                    <service.icon className="service-card-icon" />
                    <h3 className="service-card-title">{service.title}</h3>
                    <p className="service-card-description">{service.description}</p>
                    <button className="service-card-btn">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-container">
            <h2 className="cta-title">
              Ready to Get Started?
            </h2>
            <p className="cta-subtitle">
              Take the first step towards better health. Book your appointment today.
            </p>
            <button className="cta-btn">
              Schedule Consultation
            </button>
          </div>
        </section>
      </div>
    </>
  );
};
export default Main;