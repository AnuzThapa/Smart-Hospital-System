import React, { useState } from 'react';
import './Login.css';
import { login } from "../../utils/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Email is required';
    }
    // } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
    //   newErrors.username = 'Please enter a valid email';
    // }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
//     try {
//         const { data } = await login(formData.username, formData.password);
//         console.log('Login successful:', data);
//         navigate('/dashboard');
//     } catch (error) {
//     const message = error?.response?.data?.detail || 'Something went wrong during login.';
//     setErrors({ general: message });
//     console.error('Login failed:', message);
//     }
//     finally{
//       setIsLoading(false);
//     }
//   };
    const { data, error } = await login(formData.username, formData.password);

    if (error) {
    setErrors({ general: error });
    console.error("Login failed:", error);
    setIsLoading(false);
    } else {
    console.log("Login successful:", data);
    localStorage.setItem("userId", data.user.id);
    navigate("/dashboard");
    }
    }
    
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Please sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              username
            </label>
            <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`form-input ${errors.username ? 'error' : ''}`}
                placeholder="Enter your username"
                />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? 
            <a href="#" className="signup-link"> Sign up</a>
          </p>
        </div>
      </div>
       <div className="hero-decorative-1"></div>
       <div className="hero-decorative-2"></div>
    </div>
    
  );
};

export default Login;