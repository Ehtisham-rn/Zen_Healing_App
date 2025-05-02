/**
 * API Service
 * Handles all network requests to the backend
 */
import axios from 'axios';
import env from '../config/environment';
import { handleApiError } from '../utils/errorHandler';
import { STORAGE_KEYS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: env.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    // Add auth token if it exists
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Failed to retrieve auth token', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error cases
    if (error.response && error.response.status === 401) {
      // Handle token expiration or invalid auth
      // Example: logout or refresh token
    }
    
    // Format the error consistently
    return Promise.reject(handleApiError(error));
  }
);

/**
 * API service methods
 */
const apiService = {
  // GET request
  get: async (endpoint, params = {}, config = {}) => {
    try {
      const response = await apiClient.get(endpoint, { params, ...config });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // POST request
  post: async (endpoint, data = {}, config = {}) => {
    try {
      const response = await apiClient.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // PUT request
  put: async (endpoint, data = {}, config = {}) => {
    try {
      const response = await apiClient.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // DELETE request
  delete: async (endpoint, config = {}) => {
    try {
      const response = await apiClient.delete(endpoint, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Upload files
  uploadFile: async (endpoint, formData, config = {}) => {
    try {
      const uploadConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...config,
      };
      
      const response = await apiClient.post(endpoint, formData, uploadConfig);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService; 