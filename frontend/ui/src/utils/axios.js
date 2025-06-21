import axios from 'axios';
import {API_BASE_URL} from './constants';
const apiInstance=axios.create({
    baseURL:API_BASE_URL,    //setting up the base url for all the requests
    timeout:200000,
    // after 5 sec if the server or endpoint doesnot returns any response then terminate the request
    // headers are required to make call to the endpoint
    headers:{
'Content-type':"application/json",
Accept:'application/json'
    },     //These HTTP headers specify that you're sending and expecting JSON data
})
export default apiInstance


// the backend django server must already be running at http://127.0.0.1:8000/,so ,http://127.0.0.1:8000/api/v1/, acts as a base url for apicall as set in constant.js

// Axios is commonly used to connect a React frontend with a Django backend, especially when Django is serving an API via Django REST Framework (DRF).