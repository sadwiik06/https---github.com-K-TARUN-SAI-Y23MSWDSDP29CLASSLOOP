import axios from 'axios';

// api.js
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  withCredentials: true
});

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log('Making request to:', config.url);
  console.log('Using token:', token);
  
  // Store request history
  const requestLog = JSON.parse(localStorage.getItem('requestLog') || '[]');
  requestLog.push({
    timestamp: new Date().toISOString(),
    url: config.url,
    method: config.method,
    headers: config.headers
  });
  localStorage.setItem('requestLog', JSON.stringify(requestLog));
  
  return config;
});

// Response interceptor to handle 401 errors and empty/invalid JSON
api.interceptors.response.use(
  response => {
    // Handle empty response data gracefully
    if (response && response.data === '') {
      response.data = {};
    }
    return response;
  },
  error => {
    console.error('API Error Intercepted:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
      message: error.message,
      toJSON: error.toJSON ? error.toJSON() : null
    });
    
    // TEMPORARILY DISABLE AUTO-REDIRECT
    // if (error.response?.status === 401) {
    //   localStorage.clear();
    //   window.location.href = '/login';
    // }
    
    return Promise.reject(error);
  }
);

export default api;
