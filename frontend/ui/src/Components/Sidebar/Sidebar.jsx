import { Calendar,LogIn, Heart, Home, Phone, Settings, Stethoscope, X , MessageCircle } from "lucide-react";
import { useState } from "react";
// import AskAI from "../Components/AskAI/AskAI";
import './Sidebar.css'
import { useLocation, useNavigate } from "react-router-dom";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: Home, text: 'Home', id: 'home' },
    { icon: Stethoscope, text: 'Appointments', id: 'appointment' },
    { icon: MessageCircle, text: 'AI-service', id: 'AIservice' },
    { icon: Calendar, text: 'Dashboard', id: 'dashboard' },
    { icon: LogIn ,text:'Register As Doctor',id:'doctorRegister'},
  
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const handleclick=(id)=>{
    if (id=="home") {
      navigate('/')
    }
    if (id==="AIservice"){
      navigate('/AskAI')
    }
    else if (id==="dashboard"){
      navigate("/login")
    }
    else if(id==="appointment"){
      navigate('/appointment')
    }
    else if(id==="doctorRegister"){
      navigate('/doctorRegister')
    }
    else{
      pass
    }
  }
  return (
    <>
      {/* Sidebar CSS would be in Components/Sidebar/Sidebar.css */}
      

      {/* Overlay for mobile */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'show' : ''}`}
        onClick={toggleSidebar}
      />
      
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''} ${isHome ? 'expanded' : 'collapsed'}`}>
        
        {/* Header */}
        <div className="sidebar-header">
          {/* <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="sidebar-title">eHospital</h1>
          </div> */}
          <button 
            onClick={toggleSidebar}
            className="sidebar-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.id}`}
              className="sidebar-nav-item"
              onClick={(e)=>
                {handleclick(item.id)}
              }
            >
              <item.icon className="sidebar-nav-icon" />
              <span className="sidebar-nav-text">{item.text}</span>
            </a>
          ))}
        </nav>

        {/* Emergency Contact */}
        {/* <div className="sidebar-emergency">
          <Phone className="sidebar-emergency-icon" />
          <p className="sidebar-emergency-title">Emergency</p>
          <p className="sidebar-emergency-text">Call 911</p>
        </div> */}
        {isHome && (
          <div className="sidebar-emergency">
            <Phone className="sidebar-emergency-icon" />
            <p className="sidebar-emergency-title">Emergency</p>
            <p className="sidebar-emergency-text">Call 911</p>
          </div>
        )}
      </div>
    </>
  );
};
export default Sidebar;