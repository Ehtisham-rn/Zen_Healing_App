/**
 * Zen Healing API Service
 * Provides specific methods for interacting with the Zen Healing Hub API
 */
import apiService from './api';

const zenHealingApi = {
  // Doctor endpoints
  doctors: {
    // Get all doctors
    getAll: () => apiService.get('/doctors/v1'),
    
    // Create a new doctor
    create: (doctorData) => apiService.post('/doctors/v1/doctors', doctorData),
    
    // Login a doctor
    login: (credentials) => apiService.post('/doctor/login', credentials),
    
    // Get a specific doctor by ID
    getById: (doctorId) => apiService.get(`/doctors/v1/${doctorId}`),
  },
  
  // Appointment endpoints
  appointments: {
    // Get all appointments
    getAll: () => apiService.get('/appointments'),
    
    // Create a new appointment
    create: (appointmentData) => apiService.post('/appointments', appointmentData),
    
    // Get appointments for a specific user
    getForUser: (userId) => apiService.get(`/appointments/user/${userId}`),
    
    // Get appointments for a specific doctor
    getForDoctor: (doctorId) => apiService.get(`/appointments/doctor/${doctorId}`),
    
    // Update appointment status
    updateStatus: (appointmentId, status) => apiService.put(`/appointments/${appointmentId}/status`, { status }),
  },
  
  // Speciality endpoints
  specialities: {
    // Get all specialities
    getAll: () => apiService.get('/v1/specialities'),
  },
  
  // Symptom endpoints
  symptoms: {
    // Get all symptoms
    getAll: () => apiService.get('/v1/symptoms'),
  },
  
  // Location endpoints
  locations: {
    // Get all locations
    getAll: () => apiService.get('/v1/locations'),
  },
  
  // Contact form endpoint
  contact: {
    // Submit contact form
    submit: (formData) => apiService.post('/v1/contact', formData),
  },
  
  // Articles endpoints - updated to match Postman collection
  articles: {
    // Get all articles
    getAll: () => apiService.get('/articles'),
    
    // Get a specific article by ID
    getById: (articleId) => apiService.get(`/articles/${articleId}`),
  },
};

export default zenHealingApi; 