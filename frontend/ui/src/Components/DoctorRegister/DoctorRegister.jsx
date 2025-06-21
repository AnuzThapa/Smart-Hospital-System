// import React, { useState } from 'react';
// import './DoctorLogin.css';
// import { DoctorRegister } from '../../utils/auth';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// const DoctorLogin = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     first_name: '',
//     last_name: '',
//     position: '',
//     description: '',
//     education: '',
//     experience_years: '',
//     specialization: '',
//     certifications: '',
//     consultation_fee: '',
//     age: '',
//     picture:null
//   });

//   const [errors, setErrors] = useState({});

//   const [imagePreview, setImagePreview] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//     const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type
//       const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//       if (!allowedTypes.includes(file.type)) {
//         setErrors(prev => ({
//           ...prev,
//           picture: 'Please upload a valid image file (JPEG, PNG, or WebP)'
//         }));
//         return;
//       }

//       // Validate file size (5MB max)
//       const maxSize = 5 * 1024 * 1024; // 5MB in bytes
//       if (file.size > maxSize) {
//         setErrors(prev => ({
//           ...prev,
//           picture: 'Image size should be less than 5MB'
//         }));
//         return;
//       }

//       setFormData(prev => ({
//         ...prev,
//         picture: file
//       }));

//       // Create preview
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImagePreview(e.target.result);
//       };
//       reader.readAsDataURL(file);

//       // Clear any previous errors
//       if (errors.picture) {
//         setErrors(prev => ({
//           ...prev,
//           picture: ''
//         }));
//       }
//     }
//   };

//   const removeImage = () => {
//     setFormData(prev => ({
//       ...prev,
//       picture: null
//     }));
//     setImagePreview(null);
//     // Reset file input
//     const fileInput = document.getElementById('picture');
//     if (fileInput) {
//       fileInput.value = '';
//     }
//   };



//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.username.trim()) newErrors.username = 'Full name is required';
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
//     if (!formData.password) newErrors.password = 'Password is required';
//     else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     if (!formData.position.trim()) newErrors.position = 'Position is required';
//     if (!formData.specialization) newErrors.specialization = 'Specialization is required';
//     if (!formData.experience_years) newErrors.experience_years = 'Experience years is required';
//     if (!formData.age) newErrors.age = 'Age is required';
//     if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
//     if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
//     if (!formData.consultation_fee) newErrors.consultation_fee = 'Consultation fee is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         // const doctorData = {
//         //   username: formData.username,
//         //   first_name: formData.first_name,
//         //   last_name: formData.last_name,
//         //   email: formData.email,
//         //   password: formData.password,
//         //   position: formData.position,
//         //   description: formData.description,
//         //   education: formData.education,
//         //   experience_years: parseInt(formData.experience_years),
//         //   consultation_fee: parseFloat(formData.consultation_fee),
//         //   certifications: formData.certifications,
//         //   specialization: formData.specialization,
//         //   age: parseInt(formData.age)
//         // };
//         const doctorData = {
//           user: {
//             // username: formData.username,
//             email: formData.email,
//             password: formData.password,
//             full_name: `${formData.first_name} ${formData.last_name}`,
//             password2: formData.password,
//             // first_name: formData.first_name,
//             // last_name: formData.last_name,
//           },
//           position: formData.position,
//           description: formData.description,
//           education: formData.education,
//           experience_years: parseInt(formData.experience_years),
//           consultation_fee: parseFloat(formData.consultation_fee),
//           certifications: formData.certifications,
//           specialization: formData.specialization,
//           age: parseInt(formData.age)
//         };
//         // const { error } = await DoctorRegister(formData.username,formData.first_name,formData.last_name, formData.email, formData.password, formData.position, formData.description, formData.education, formData.experience_years,formData.consultation_fee,formData.certifications,formData.specialization);
//         const { error } = await DoctorRegister(doctorData);
//         if (error) {
//           Swal.fire({
//             title: 'Registration Failed!',
//             text: error,
//             icon: 'success',
//             confirmButtonText: 'OK',
//           });
//           //   setIsLoading(false);
//         } else {
//           navigate("/DoctorDashboard");  //this path is defined in route in app.jsx
//           //   setIsLoading(false);
//         }
//       } catch (error) {
//         console.error("Registration error", error)
//       }

//       // Handle form submission here
//     }
//   };

//   return (
//     <div className="doctor-login-container">
//       <div className="doctor-login-card">
//         <div className="header-section">
//           <div className="medical-icon">
//             <svg viewBox="0 0 24 24" fill="currentColor">
//               <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
//             </svg>
//           </div>
//           <h1>Doctor Registration</h1>
//           <p>Join our medical platform</p>
//         </div>

//         <div className="login-form">

//                     {/* Profile Picture Upload Section */}
//           <div className="form-group image-upload-section">
//             <label htmlFor="picture">Profile Picture</label>
//             <div className="image-upload-container">
//               {imagePreview ? (
//                 <div className="image-preview">
//                   <img src={imagePreview} alt="Profile preview" className="preview-image" />
//                   <button type="button" className="remove-image-btn" onClick={removeImage}>
//                     <svg viewBox="0 0 24 24" fill="currentColor">
//                       <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
//                     </svg>
//                   </button>
//                 </div>
//               ) : (
//                 <div className="upload-placeholder">
//                   <svg viewBox="0 0 24 24" fill="currentColor" className="upload-icon">
//                     <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
//                   </svg>
//                   <p>Click to upload profile picture</p>
//                   <p className="upload-hint">JPEG, PNG, or WebP (Max 5MB)</p>
//                 </div>
//               )}
//               <input
//                 type="file"
//                 id="picture"
//                 name="picture"
//                 accept="image/jpeg,image/jpg,image/png,image/webp"
//                 onChange={handleImageChange}
//                 className="file-input"
//               />
//             </div>
//             {errors.picture && <span className="error-message">{errors.picture}</span>}
//           </div>





//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="username">username *</label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className={errors.username ? 'error' : ''}
//                 placeholder="Dr. John Smith"
//               />
//               {errors.username && <span className="error-message">{errors.username}</span>}
//             </div>
//             <div className="form-group">
//               <label htmlFor="first_name">firstname *</label>
//               <input
//                 type="text"
//                 id="first_name"
//                 name="first_name"
//                 value={formData.first_name}
//                 onChange={handleChange}
//                 className={errors.first_name ? 'error' : ''}
//                 placeholder="Dr. John Smith"
//               />
//               {errors.first_name && <span className="error-message">{errors.first_name}</span>}
//             </div>
//             <div className="form-group">
//               <label htmlFor="fullName">lastname *</label>
//               <input
//                 type="text"
//                 id="last_name"
//                 name="last_name"
//                 value={formData.last_name}
//                 onChange={handleChange}
//                 className={errors.last_name ? 'error' : ''}
//                 placeholder="Dr. John Smith"
//               />
//               {errors.last_name && <span className="error-message">{errors.last_name}</span>}
//             </div>

//             <div className="form-group">
//               <label htmlFor="age">Age *</label>
//               <input
//                 type="number"
//                 id="age"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleChange}
//                 className={errors.age ? 'error' : ''}
//                 placeholder="35"
//                 min="25"
//                 max="80"
//               />
//               {errors.age && <span className="error-message">{errors.age}</span>}
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="email">Email Address *</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={errors.email ? 'error' : ''}
//                 placeholder="doctor@hospital.com"
//               />
//               {errors.email && <span className="error-message">{errors.email}</span>}
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password *</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={errors.password ? 'error' : ''}
//                 placeholder="Enter secure password"
//               />
//               {errors.password && <span className="error-message">{errors.password}</span>}
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="position">Position *</label>
//               <select
//                 id="position"
//                 name="position"
//                 value={formData.position}
//                 onChange={handleChange}
//                 className={errors.position ? 'error' : ''}
//               >
//                 <option value="">Select Position</option>
//                 <option value="attending">Attending Physician</option>
//                 <option value="resident">Resident</option>
//                 <option value="fellow">Fellow</option>
//                 <option value="chief">Chief of Medicine</option>
//                 <option value="consultant">Consultant</option>
//               </select>
//               {errors.position && <span className="error-message">{errors.position}</span>}
//             </div>

//             <div className="form-group">
//               <label htmlFor="experienceYears">Experience (Years) *</label>
//               <input
//                 type="number"
//                 id="experience_years"
//                 name="experience_years"
//                 value={formData.experience_years}
//                 onChange={handleChange}
//                 className={errors.experience_years ? 'error' : ''}
//                 placeholder="10"
//                 min="0"
//                 max="50"
//               />
//               {errors.experience_years && <span className="error-message">{errors.experience_years}</span>}
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="specialization">Specialization *</label>
//             <select
//               id="specialization"
//               name="specialization"
//               value={formData.specialization}
//               onChange={handleChange}
//               className={errors.specialization ? 'error' : ''}
//             >
//               <option value="">Select Specialization</option>
//               <option value="1">Cardiology</option>
//               <option value="2">Neurology</option>
//               <option value="4">Orthopedics</option>
//               <option value="3">Pediatrics</option>
//               <option value="5">Dermatology</option>
//               <option value="6">Psychiatry</option>
//               <option value="7">General Medicine</option>
//             </select>
//             {errors.specialization && <span className="error-message">{errors.specialization}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="education">Education & Qualifications</label>
//             <textarea
//               id="education"
//               name="education"
//               value={formData.education}
//               onChange={handleChange}
//               placeholder="MD from Harvard Medical School, Residency at Mayo Clinic..."
//               rows="3"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="description">Professional Description</label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Brief description of your medical practice, areas of expertise, and professional background..."
//               rows="4"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="age">Consultation fee *</label>
//             <input
//               type="number"
//               id="consultation_fee"
//               name="consultation_fee"
//               value={formData.consultation_fee}
//               onChange={handleChange}
//               className={errors.consultation_fee ? 'error' : ''}
//               placeholder="3000"
//               min="2000"
//               max="8000"
//             />
//             {errors.consultation_fee && <span className="error-message">{errors.consultation_fee}</span>}
//           </div>
//           {/* </div> */}

//           <button type="button" onClick={handleSubmit} className="submit-btn">
//             <span>Register as Doctor</span>
//             <svg viewBox="0 0 24 24" fill="currentColor">
//               <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
//             </svg>
//           </button>
//         </div>

//         <div className="footer-links">
//           <a href="#login">Already have an account? Login</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorLogin;




import React, { useState } from 'react';
import './DoctorRegister.css';
import { Doctorregister } from '../../utils/auth';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
// import doctorLogin from '../DoctorLogin/DoctorLogin.jsx';
const DoctorRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    position: '',
    description: '',
    education: '',
    experience_years: '',
    specialization: '',
    certifications: '',
    consultation_fee: '',
    age: '',
    picture: null
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          picture: 'Please upload a valid image file (JPEG, PNG, or WebP)'
        }));
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          picture: 'Image size should be less than 5MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        picture: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Clear any previous errors
      if (errors.picture) {
        setErrors(prev => ({
          ...prev,
          picture: ''
        }));
      }
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      picture: null
    }));
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById('picture');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.specialization) newErrors.specialization = 'Specialization is required';
    if (!formData.experience_years) newErrors.experience_years = 'Experience years is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!formData.consultation_fee) newErrors.consultation_fee = 'Consultation fee is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Create FormData for file upload
        const formDataToSend = new FormData();
        
        // Add user data
        const userData = {
          email: formData.email,
          password: formData.password,
          full_name: `${formData.first_name} ${formData.last_name}`,
          password2: formData.password,
        };
        
        // formDataToSend.append('user', JSON.stringify(userData));
        formDataToSend.append('user.email', formData.email);
        formDataToSend.append('user.password', formData.password);
        formDataToSend.append('user.password2', formData.password);
        formDataToSend.append('user.full_name', `${formData.first_name} ${formData.last_name}`);
        formDataToSend.append('position', formData.position);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('education', formData.education);
        formDataToSend.append('experience_years', parseInt(formData.experience_years));
        formDataToSend.append('consultation_fee', parseFloat(formData.consultation_fee));
        formDataToSend.append('certifications', formData.certifications);
        formDataToSend.append('specialization', formData.specialization);
        formDataToSend.append('age', parseInt(formData.age));
        
        // Add image if selected
        if (formData.picture) {
          formDataToSend.append('picture', formData.picture);
        }

        const { error } = await Doctorregister(formDataToSend);
        if (error) {
          Swal.fire({
            title: 'Registration Failed!',
            text: error,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else {
          Swal.fire({
            title: 'Registration Successful!',
            text: 'Welcome to our medical platform',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            navigate("/DoctorDashboard");
          });
        }
      } catch (error) {
        console.error("Registration error", error);
        Swal.fire({
          title: 'Registration Failed!',
          text: 'An unexpected error occurred. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  return (
    <div className="doctor-login-container">
      <div className="doctor-login-card">
        <div className="header-section">
          <div className="medical-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
            </svg>
          </div>
          <h1>Doctor Registration</h1>
          <p>Join our medical platform</p>
        </div>

        <div className="login-form">
          {/* Profile Picture Upload Section */}
          <div className="form-group image-upload-section">
            <label htmlFor="picture">Profile Picture</label>
            <div className="image-upload-container">
              {imagePreview ? (
                <div className="image-preview">
                  <img src={imagePreview} alt="Profile preview" className="preview-image" />
                  <button type="button" className="remove-image-btn" onClick={removeImage}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="upload-icon">
                    <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                  </svg>
                  <p>Click to upload profile picture</p>
                  <p className="upload-hint">JPEG, PNG, or WebP (Max 5MB)</p>
                </div>
              )}
              <input
                type="file"
                id="picture"
                name="picture"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
                className="file-input"
              />
            </div>
            {errors.picture && <span className="error-message">{errors.picture}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">username *</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? 'error' : ''}
                placeholder="Dr. John Smith"
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="first_name">firstname *</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={errors.first_name ? 'error' : ''}
                placeholder="John"
              />
              {errors.first_name && <span className="error-message">{errors.first_name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="last_name">lastname *</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={errors.last_name ? 'error' : ''}
                placeholder="Smith"
              />
              {errors.last_name && <span className="error-message">{errors.last_name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={errors.age ? 'error' : ''}
                placeholder="35"
                min="25"
                max="80"
              />
              {errors.age && <span className="error-message">{errors.age}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="doctor@hospital.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Enter secure password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="position">Position *</label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={errors.position ? 'error' : ''}
              >
                <option value="">Select Position</option>
                <option value="attending">Attending Physician</option>
                <option value="resident">Resident</option>
                <option value="fellow">Fellow</option>
                <option value="chief">Chief of Medicine</option>
                <option value="consultant">Consultant</option>
              </select>
              {errors.position && <span className="error-message">{errors.position}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="experience_years">Experience (Years) *</label>
              <input
                type="number"
                id="experience_years"
                name="experience_years"
                value={formData.experience_years}
                onChange={handleChange}
                className={errors.experience_years ? 'error' : ''}
                placeholder="10"
                min="0"
                max="50"
              />
              {errors.experience_years && <span className="error-message">{errors.experience_years}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="specialization">Specialization *</label>
            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className={errors.specialization ? 'error' : ''}
            >
              <option value="">Select Specialization</option>
              <option value="1">Cardiology</option>
              <option value="2">Neurology</option>
              <option value="4">Orthopedics</option>
              <option value="3">Pediatrics</option>
              <option value="5">Dermatology</option>
              <option value="6">Psychiatry</option>
              <option value="7">General Medicine</option>
            </select>
            {errors.specialization && <span className="error-message">{errors.specialization}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="education">Education & Qualifications</label>
            <textarea
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="MD from Harvard Medical School, Residency at Mayo Clinic..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Professional Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of your medical practice, areas of expertise, and professional background..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="consultation_fee">Consultation fee *</label>
            <input
              type="number"
              id="consultation_fee"
              name="consultation_fee"
              value={formData.consultation_fee}
              onChange={handleChange}
              className={errors.consultation_fee ? 'error' : ''}
              placeholder="3000"
              min="2000"
              max="8000"
            />
            {errors.consultation_fee && <span className="error-message">{errors.consultation_fee}</span>}
          </div>

          <button type="button" onClick={handleSubmit} className="submit-btn">
            <span>Register as Doctor</span>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </button>
        </div>

        <div className="footer-links">
          {/* <a href="#login">Already have an account? Login</a> */}
          <Link to="/doctorLogin">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegister;