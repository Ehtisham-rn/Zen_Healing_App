/**
 * API Service
 * Handles all network requests to the backend
 */
import axios from 'axios';
import env from '../config/environment';
import { handleApiError, logError } from '../utils/errorHandler';
import { STORAGE_KEYS } from '../constants';
import * as storage from '../utils/storage';

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
      const token = await storage.getData(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Log requests in development with better formatting
      if (env.isDevelopment) {
        const method = config.method.toUpperCase();
        const url = config.url;
        const data = config.data ? JSON.parse(config.data) : null;
        const params = config.params;
        
        console.log('───────────────────────────────────────');
        console.log(`🚀 API Request [${method} ${url}]`);
        if (params) console.log('📦 Params:', params);
        if (data) console.log('📦 Data:', data);
        console.log('───────────────────────────────────────');
      }
    } catch (error) {
      console.warn('Failed to process request interceptor', error);
    }
    return config;
  },
  (error) => {
    logError('API Request Error', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses in development with better formatting
    if (env.isDevelopment) {
      const method = response.config.method.toUpperCase();
      const url = response.config.url;
      
      console.log('───────────────────────────────────────');
      console.log(`✅ API Response [${method} ${url}]`);
      console.log('📦 Status:', response.status);
      console.log('📦 Data:', response.data);
      console.log('───────────────────────────────────────');
    }
    return response;
  },
  (error) => {
    try {
      // Enhanced error logging with safe access to properties
      const errorDetails = {
        url: error.config?.url || 'unknown_url',
        method: (error.config?.method || 'unknown_method').toUpperCase(),
        status: error.response?.status || 'no_status',
        data: error.response?.data || {},
        message: error.message || 'Unknown error',
      };
      
      logError('API Error', errorDetails);
      
      // Handle specific error cases
      if (error.response && error.response.status === 401) {
        // Handle token expiration or invalid auth
        // Example: logout or refresh token
      }
      
      // Format the error consistently
      return Promise.reject(handleApiError(error));
    } catch (internalError) {
      console.error('Error in response interceptor:', internalError);
      return Promise.reject({
        message: 'An unexpected error occurred',
        code: 500,
        key: 'internal_error'
      });
    }
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
      // JSON safety check for arrays/objects to prevent axios issues
      const processedData = typeof data === 'object' ? data : { data };
      
      const response = await apiClient.post(endpoint, processedData, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // PUT request
  put: async (endpoint, data = {}, config = {}) => {
    try {
      // JSON safety check for arrays/objects to prevent axios issues
      const processedData = typeof data === 'object' ? data : { data };
      
      const response = await apiClient.put(endpoint, processedData, config);
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
  
  // Helper to check if an API connection is available
  checkConnection: async () => {
    try {
      await apiClient.head('/');
      return true;
    } catch (error) {
      return false;
    }
  }
};

export default apiService; 