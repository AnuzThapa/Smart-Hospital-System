import React, { useState } from "react";
import apiInstance from "../../utils/axios";
import { register } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Swal from "sweetalert2";
const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add form validation here if needed
//     if (form.password !== form.password2) {
//       alert("Passwords do not match!");
//       return;
//     }
//     alert("Registered Successfully!");
//     // Handle actual registration logic here
//   };
    const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.fullname.value;
    // const { error } = await register(fullname,email,password,password2);
    const { error } = await register(form.fullname, form.email, form.password, form.password2);
    if (error) {
       Swal.fire({
                      title: 'Registration Failed!',
                      text: error,
                      icon: 'success',
                      confirmButtonText: 'OK',
                      });
    //   setIsLoading(false);
    } else {
      navigate("/dashboard",{ state: { username } });  //this path is defined in route in app.jsx
    //   setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Create Account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Your full name"
            value={form.fullname}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            name="password2"
            placeholder="Confirm password"
            value={form.password2}
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-btn">Register</button>
        </form>
          <div className="login-footer">
          <p>
            Already have an account? 
            <a href="#" className="signup-link"> Sign In</a>
          </p>
        </div>
      </div>
     <div className="hero-decorative-1"></div>
     <div className="hero-decorative-2"></div>
    </div>
  );
};

export default Register;
