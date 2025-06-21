// import {useAuthStore} from "../store/auth";
import { useNavigate } from 'react-router-dom';
import apiInstance from './axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from "js-cookie";
// import axios from 'axios'; // Remove or comment out this line as it's no longer needed for API calls
import Swal from "sweetalert2";
import { useAuthStore } from '../store/auth';
// import { Cookie } from 'lucide-react';
// authentication functions in reactjs

// apiInstance is for login when there is no token available while login,and useAxios hook is used after token is available
export const login = async (username, password) => {
  try {
    const { data, status } = await apiInstance.post(`user/login/`, {
      username,
      password,
    });
    console.log(status)
    if (status === 200) {
      console.log(status)
      setAuthUser(data.access, data.refresh);
      // alert("Login Successful");
      Swal.fire({
            title: 'LoggedIn Successfully!',
            text: 'welcome to dashboard.',
            icon: 'success',
            confirmButtonText: 'OK',
    });
    
    }
    return { data, error: null };
  } catch (error) {
    // safer access with fallback
    Swal.fire({
            title: 'LoggedIn Failed!',
            text: 'Some Problem Occurred.',
            icon: 'error',
            confirmButtonText: 'OK',
    });
    const errorMsg =
      error.response && error.response.data && error.response.data.detail
        ? error.response.data.detail
        : error.message || "Something went wrong";
    return {
      data: null,
      error: errorMsg,
    };
  }
};

// send the post request to given endpoint to register the new user.
export const register = async (full_name,email,password,password2) =>{
    try{
        // const {data} = await axios.post(`user/register/`,{ 
        const {data} = await apiInstance.post(`user/register/`,{    //this fn takes the parameters from the frontend and make request to the api endpoint for registratioin.
            full_name,
            email,
            password,
            password2,
        })
        // await login(email,password);   //calls login function
        console.log(data)
        Swal.fire({
                title: 'Registration Successful!',
                text: 'You can now log in.',
                icon: 'success',
                confirmButtonText: 'OK',
                });
        return {data,error:null}
        
    }catch(error){
        console.log(error);
        return {
            data:null,
            error:error.response?.data?.detail || "Something went wrong",
        };
    }
};
// export const DoctorRegister = async(username,first_name,last_name,email,password,age,position,certifications,consultation_fee,experience_years,specialization,education,description)=>{
export const Doctorregister= async (doctorData) => {
//   const doctorData = {
//   user: {
//     username: username,
//     email: email,
//     password: password,
//     first_name: first_name,
//     last_name: last_name,
//   },
//   specialization: specialization,
//   position: position,
//   description: description,
//   age: age,
//   certifications: certifications,
//   experience_years: experience_years,
//   education: education,
//   consultation_fee: consultation_fee
// };
      try{
      const {data} =await apiInstance.post(`doctor/register/`,
               doctorData,{
                     headers: {
                                  "Content-Type": "multipart/form-data",
      }
    }
        );
     
      console.log(data)
      Swal.fire({
                title: 'Registration Successful!',
                text: 'You can now log in.',
                icon: 'success',
                confirmButtonText: 'OK',
                });
      return {data,error:null}
        
    }
  catch(error){
        console.log("Full error:", error.response?.data || error.message);
        return {
            data:null,
            error:error.response?.data?.detail || "Something went wrong",
        };
    }

  };

export const doctorlogin = async (username, password) => {
  try {
    const { data, status } = await apiInstance.post(`doctor/login/`, {
      username,
      password,
    });
    console.log(status)
    if (status === 200) {
      console.log(status)
    //   setAuthUser(data.access, data.refresh);
    //   alert("Login Successful");
      Swal.fire({
            title: 'LoggedIn Successfully!',
            text: 'welcome to dashboard.',
            icon: 'success',
            confirmButtonText: 'OK',
    });
    
    }
    return { data, error: null };
  } catch (error) {
    // safer access with fallback
    Swal.fire({
            title: 'LoggedIn Failed!',
            text: 'Some Problem Occurred.',
            icon: 'error',
            confirmButtonText: 'OK',
    });
    const errorMsg =
      error.response && error.response.data && error.response.data.detail
        ? error.response.data.detail
        : error.message || "Something went wrong";
    return {
      data: null,
      error: errorMsg,
    };
  }
};
export const AiModel = async (query,imageFile=null) => {
    try {
        const formData = new FormData();
        formData.append('query', query);
        if (imageFile) {
          formData.append('image', imageFile); // must match backend expected field
        }
        const { data } = await apiInstance.post(`model/AiModel/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
       });
        // return { data: data.response, error: null };
        return { data, error: null }
    } catch (error) {
        console.error('AI Model Error:', error.response?.data || error.message);
        return {
            data: null,
            error: error.response?.data?.detail || "Failed to get AI response"
        };
    }
}

export const getDoctors = async() =>{
  try{
     const response= await apiInstance.get(`doctor/display/`)   //list of dict
     return { data: response.data, error: null };   //response.data is the actual list of dict
  }
  catch(error){
         console.error("Error fetching doctors:", error);
    return { data: null, error: error.response?.data?.detail || "Something went wrong" };
  }
  };
  


export const setAppointmentSlots = async (doctorId, timeSlots) => {
  const formatToSeconds = (time) => {
      return time.length === 5 ? `${time}:00` : time;  // converts "22:22" → "22:22:00"
    };
  const results = [];

  for (const slot of timeSlots) {
    const payload = {
      doctor: parseInt(doctorId),
      date: slot.date,
      start_time: formatToSeconds(slot.time),
      end_time: formatToSeconds(calculateEndTime(slot.time, slot.duration)), // function to compute end time
    };

     try {
      const response = await apiInstance.post(`/appointment-slot/${doctorId}/create/`, payload);
      results.push({ success: true, data: response.data });
    } catch (error) {
      console.error("Failed to add slot. Server response:", error.response?.data || error.message);
      results.push({ success: false, error: error.response?.data || error.message });
    }
  }

  return results;
};

const calculateEndTime = (startTime, duration) => {
  const [hour, minute] = startTime.split(':').map(Number);
  const startDate = new Date();
  startDate.setHours(hour, minute);
  startDate.setMinutes(startDate.getMinutes() + Number(duration));
  return startDate.toTimeString().slice(0, 5); // "HH:MM"
};


export const getAvailableSlots=async(doctorid)=>{
  try{
    const response=await apiInstance.get(`appointment-slot/display?doctor=${doctorid}`)    //see below for two method
    console.log(response)
    return {data:response.data, error:null};
  }
  catch(error){
    console.error("failed to fetch slots",error.response?.data || error.message);
    return {data:null,error:error.response?.data.detail || "Something went wrong"
    }
  }
}


export const bookAppointmentSlot = async (slot_id,data) => {
  try {
    const token = Cookies.get("access_token");
    console.log(token)
    const response = await apiInstance.post(
      `/appointment-slot/${slot_id}/book`, // ✅ Correct URL
      data, // Body (if any data needed)
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Auth header
        },
      }
    );

    return { data: response.data, error: null };
  } catch (error) {
    console.error("Failed to book slot", error.response?.data || error.message);
    return {
      data: null,
      error: error.response?.data?.detail || "Something went wrong",
    };
  }
};








// export const bookAppointmentSlot = async (slot_id) =>{
//   try{
//     const response=await apiInstance.post(`appointment-slot/book`)
//     return {data:response.data,error:null}
//   }
//   catch(error){
//     console.error("failed to book slot",error.response?.data || error.message);
//     return {data:null,error:error.response?.data.detail || "Something went wrong" }
//   }
// }
// export const logout = () =>{
//     Cookie.remove("access_token");//removing the tokens from the cookie
//     Cookie.remove("refresh_token");
//     useAuthStore.getStore().setUser(null);
//     alert("you have been logged out");
// }

export const setUser =async ()=>{
    const access_token = Cookies.get(`access_token`);
    const refresh_token=Cookies.get("refresh_token"); 
    if (!access_token || !refresh_token){
        alert("tokens doesnot exists");
        return;
    }
    if (isAccessTokenExpired(access_token)){
        const response =getRefreshedToken(refresh_token);//if token expires calls getrefreshtoken to refresh it.
        setAuthUser(response.access,response.refresh) //setting new access and refresh token if previous one expired.
    //when you refresh the token it automatically generates access and refresh token.
    }
}

export const setAuthUser = (access_token,refresh_token)=>{  //set the access and refresh token in cookie
    Cookies.set("access_token",access_token,{
        expires:1,
        secure:true,
    });
    Cookies.set("refresh_token",refresh_token,{
        expires:7,
        secure:true 
    });
    // const user=jwt_decode(access_token) ?? null  //Decodes the JWT access token to extract the user info.
    const user = jwtDecode(access_token) ?? null;
    if (user){
        useAuthStore.getState().setUser(user);
    }
    useAuthStore.getState().setLoading(false);
    
};

// // the endpoint takes the parameters i.e.refresh token to the refresh token page where there is feild that is seeking for token.
export const getRefreshedToken = async() => {
      const refresh_token=Cookies.get("refresh_token")
      const response=await axios.post(`/token/refresh/`,{
               refresh:refresh_token,
      });
      return response.data;
};

export const isAccessTokenExpired=()=>{
  try{
    // const decodedToken=jwt_decode(access_token)
    const decodedToken=jwtDecode(access_token)
    return decodedToken.exp < Date.now()/1000;
  }catch(error){
    return true;
  }
};





// important topics

// if -->  apiInstance.get(`appointment-slot/display?doctor=${doctorid}`)
        //  in urls.py --> path('appointment-slot/display', AvailableAppointmentSlotListView.as_view())
          //  in views.py --> doctor_id = self.request.query_params.get('doctor')

// if --> apiInstance.get(`appointment-slot/${doctorid}/display`)
          // path('appointment-slot/<int:doctorid>/display', AvailableAppointmentSlotListView.as_view())
              //  doctor_id = self.kwargs.get('doctorid')

