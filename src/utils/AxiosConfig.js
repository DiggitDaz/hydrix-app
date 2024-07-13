import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Request interceptor to attach token to outgoing requests
axios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
});

// Response interceptor for handling responses
axios.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
});
