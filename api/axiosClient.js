// src/api/axiosClient.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// change this to your real API
const BASE_URL = 'https://lottery-one-sage.vercel.app/api';

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

// Request: attach token if available
axiosClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // ignore - attaching token failed
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response: unwrap and normalize
axiosClient.interceptors.response.use(
  (res) => res, // we'll handle res.data in API functions explicitly
  (error) => {
    // normalize error shape for easier handling
    if (error.response) {
      error.message = error.response.data?.message || error.response.statusText || error.message;
      error.status = error.response.status;
    }
    return Promise.reject(error);
  }
);


