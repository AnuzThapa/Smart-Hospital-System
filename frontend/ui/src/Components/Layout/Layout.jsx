// src/Components/Layout/Layout.jsx
import React, { useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Menu, Heart } from 'lucide-react';

import Sidebar from '../Sidebar/Sidebar';
import './Layout.css'; // Create as needed

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const onLoginClick = () => navigate("/login");
  const onRegisterClick = () => navigate("/register");
  const isHome = location.pathname === '/';
  return (
    <div className="app-container">
      {/* Desktop Header */}
      {isHome && ( 
        <>
        <header className="desktop-header">
        <div className="desktop-header-content">
          <div className="logo-container">
            <div className="logo-icon"><div className="medical-cross" /></div>
            <div className="logo-text"><span className="e-prefix">e</span>Hospital</div>
          </div>
          <div className="desktop-search-container">
            <div className="search-wrapper">
              <input type="text" className="search-input" placeholder="Search doctors..." />
              <button className="search-button">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                    </svg>
              </button>
            </div>
          </div>
          <div className="desktop-auth-buttons">
            <button onClick={onLoginClick} className="desktop-auth-btn desktop-login-btn">Login</button>
            <button onClick={onRegisterClick} className="desktop-auth-btn desktop-register-btn">Register</button>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="mobile-header-content">
          <button onClick={toggleSidebar} className="mobile-menu-btn">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="mobile-logo">
            <Heart className="w-6 h-6 text-blue-600" />
            <h1 className="mobile-logo-title">eHospital</h1>
          </div>
        </div>
      </header> 
      </>
      )}

      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Page content injected here */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
