// import { useState } from "react";
// import { Menu, Heart } from 'lucide-react';
// import { Routes, Route, useNavigate } from "react-router-dom";

// import Sidebar from "./Components/Sidebar/Sidebar";
// import Main from "./Components/Main/Main";
// import Register from "./Components/Register/Register";
// import AskAI from "./Components/AskAI/AskAI";
// import Login from "./Components/Login/Login";
// import './App.css'
// import UserDashboard from "./Components/UserDashboard/UserDashboard";
// import DoctorDashboard from "./Components/DoctorDashboard/DoctorDashboard";
// import Appointment from "./Components/Appointments/Appointment";
// import DoctorRegister from "./Components/DoctorRegister/DoctorRegister";
// import DoctorLogin from "./Components/DoctorLogin/DoctorLogin";
// const App = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const onRegisterClick = () => {
//     navigate("/register");
//   };
//   const onLoginClick = () => {
//     navigate("/login");
//   }

//   return (
//     // app component is wrapped inside browser router and app component has two conditional components: register element and app-container element 
//     // by default the app-container will be displayed since path is /
//     <Routes>
//       <Route
//         path="/"
//         element={
//           <div className="app-container">
//             <header className="desktop-header">
//               <div className="desktop-header-content">
//                 <div className="desktop-title-logo">

//                   <div className="logo-container">
//                     <div className="logo-icon">
//                       <div className="medical-cross"></div>
//                     </div>
//                     <div className="logo-text">
//                       <span className="e-prefix">e</span>Hospital
//                     </div>

//                   </div>
//                 </div>

//                 <div className="desktop-search-container">
//                   <div className="search-wrapper">
//                     <input
//                       type="text"
//                       className="search-input"
//                       placeholder="Search doctors, departments, services..."
//                     />
//                     <button className="search-button">
//                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                           d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 <div className="desktop-auth-buttons">
//                   <button
//                     className="desktop-auth-btn desktop-login-btn"
//                     onClick={onLoginClick}>
//                     Login
//                   </button>
//                   <button
//                     className="desktop-auth-btn desktop-register-btn"
//                     onClick={onRegisterClick}
//                   >
//                     Register
//                   </button>
//                 </div>
//               </div>
//             </header>

//             {/* Mobile Header */}
//             <header className="mobile-header">
//               <div className="mobile-header-content">
//                 <button
//                   onClick={toggleSidebar}
//                   className="mobile-menu-btn"
//                 >
//                   <Menu className="w-6 h-6 text-gray-700" />
//                 </button>
//                 <div className="mobile-logo">
//                   <Heart className="w-6 h-6 text-blue-600" />
//                   <h1 className="mobile-logo-title">eHospital</h1>
//                 </div>
//                 <div className="mobile-auth-buttons">
//                   <button
//                     className="mobile-auth-btn mobile-login-btn"
//                     onClick={onLoginClick}
//                   >
//                     Login
//                   </button>
//                   <button
//                     className="mobile-auth-btn mobile-register-btn"
//                     onClick={onRegisterClick}
//                   >
//                     Register
//                   </button>
//                 </div>
//               </div>
//             </header>

//             {/* Sidebar */}
//             <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

//             {/* Main Content */}
//             <Main sidebarOpen={sidebarOpen} />
//           </div>
//         }
//       />
//       <Route path="/register" element={<Register />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/askai" element={<AskAI />} />
//       <Route path="/dashboard" element={<UserDashboard />} />
//       <Route path='/doctordashboard' element={<DoctorDashboard />} />
//       <Route path="/appointment" element={<Appointment />} />
//       <Route path="/doctorRegister" element={<DoctorRegister />} />
//       <Route path="/doctorLogin" element={<DoctorLogin />} />

//     </Routes>
//   );
// };

// export default App;

import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Main from "./Components/Main/Main";
import AskAI from "./Components/AskAI/AskAI";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import UserDashboard from "./Components/UserDashboard/UserDashboard";
import DoctorDashboard from "./Components/DoctorDashboard/DoctorDashboard";
import Appointment from "./Components/Appointments/Appointment";
import DoctorRegister from "./Components/DoctorRegister/DoctorRegister";
import DoctorLogin from "./Components/DoctorLogin/DoctorLogin";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/askai" element={<AskAI />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/doctorRegister" element={<DoctorRegister />} />
        <Route path="/doctordashboard" element={<DoctorDashboard />} />
      </Route>

      {/* Routes that should NOT show Sidebar/Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/doctorLogin" element={<DoctorLogin />} />
    </Routes>
  );
};

export default App;

