/**
 * Doctor state slice
 * Manages doctor-related state for the Zen Healing app
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import zenHealingApi from '../../services/zenHealingApi';
import * as storage from '../../utils/storage';
import { STORAGE_KEYS } from '../../constants';
import { AppError, logError } from '../../utils/errorHandler';
import { mockSpecialities, mockLocations, mockSymptoms } from '../../utils/mockData';

// Initial state
const initialState = {
  doctorsList: [],
  filteredDoctors: [],
  selectedDoctor: null,
  currentDoctor: null, // For logged-in doctor
  specialities: [],
  symptoms: [],
  locations: [],
  filters: {
    speciality: null,
    location: null,
    symptom: null,
    searchQuery: '',
  },
  loading: {
    doctors: false,
    doctorDetails: false,
    specialities: false,
    symptoms: false,
    locations: false,
    login: false,
    register: false,
  },
  error: {
    doctors: null,
    doctorDetails: null,
    specialities: null,
    symptoms: null,
    locations: null,
    login: null,
    register: null,
  },
};

// Async thunks for doctor actions

// Fetch all doctors
export const fetchDoctors = createAsyncThunk(
  'doctor/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await zenHealingApi.doctors.getAll();
      return response;
    } catch (error) {
      logError('Failed to fetch doctors', error);
      return rejectWithValue(error.message || 'Failed to fetch doctors');
    }
  }
);

// Fetch all specialities
export const fetchSpecialities = createAsyncThunk(
  'doctor/fetchSpecialities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await zenHealingApi.specialities.getAll();
      // Ensure we have proper data structure
      if (Array.isArray(response)) {
        return response;
      } else if (response && Array.isArray(response.data)) {
        return response.data;
      } else if (response && typeof response === 'object') {
        // Try to extract data from various response formats
        const possibleData = response.specialities || response.data || response.results || [];
        return Array.isArray(possibleData) ? possibleData : [];
      }
      return [];
    } catch (error) {
      logError('Failed to fetch specialities, using mock data', error);
      // Return mock data as fallback
      return mockSpecialities;
    }
  }
);

// Fetch all symptoms
export const fetchSymptoms = createAsyncThunk(
  'doctor/fetchSymptoms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await zenHealingApi.symptoms.getAll();
      // Ensure we have proper data structure
      if (Array.isArray(response)) {
        return response;
      } else if (response && Array.isArray(response.data)) {
        return response.data;
      } else if (response && typeof response === 'object') {
        // Try to extract data from various response formats
        const possibleData = response.symptoms || response.data || response.results || [];
        return Array.isArray(possibleData) ? possibleData : [];
      }
      return [];
    } catch (error) {
      logError('Failed to fetch symptoms, using mock data', error);
      // Return mock data as fallback
      return mockSymptoms;
    }
  }
);

// Fetch all locations
export const fetchLocations = createAsyncThunk(
  'doctor/fetchLocations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await zenHealingApi.locations.getAll();
      // Ensure we have proper data structure
      if (Array.isArray(response)) {
        return response;
      } else if (response && Array.isArray(response.data)) {
        return response.data;
      } else if (response && typeof response === 'object') {
        // Try to extract data from various response formats
        const possibleData = response.locations || response.data || response.results || [];
        return Array.isArray(possibleData) ? possibleData : [];
      }
      return [];
    } catch (error) {
      logError('Failed to fetch locations, using mock data', error);
      // Return mock data as fallback
      return mockLocations;
    }
  }
);

// Doctor login
export const doctorLogin = createAsyncThunk(
  'doctor/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await zenHealingApi.doctors.login(credentials);
      
      // Log the response to debug
      console.log('Doctor login response:', response);
      
      // Check if response contains the expected data
      if (!response || !response.token) {
        return rejectWithValue({
          message: 'Invalid response from server. Please try again.',
          code: 'INVALID_RESPONSE'
        });
      }
      
      // Store doctor info in AsyncStorage with safety checks
      if (response.token && typeof response.token === 'string') {
        await storage.storeData(STORAGE_KEYS.AUTH_TOKEN, response.token);
      } else {
        console.warn('Missing or invalid token in login response', response.token);
      }
      
      // Store doctor details if available with safety checks
      if (response.doctor && typeof response.doctor === 'object') {
        // Make sure we have a valid JSON string
        try {
          const doctorStr = JSON.stringify(response.doctor);
          await storage.storeData(STORAGE_KEYS.DOCTOR_INFO, doctorStr);
        } catch (e) {
          console.error('Error storing doctor info:', e);
        }
      } else {
        console.warn('Missing or invalid doctor object in login response');
      }
      
      // Store appointments if available with safety checks
      const appointments = response.appointments || 
        (response.doctor && response.doctor.doctor_appointments) || [];
      
      if (Array.isArray(appointments) && appointments.length > 0) {
        try {
          const appointmentsStr = JSON.stringify(appointments);
          await storage.storeData(STORAGE_KEYS.DOCTOR_APPOINTMENTS, appointmentsStr);
        } catch (e) {
          console.error('Error storing appointments:', e);
        }
      }
      
      // Return payload with proper structure
      return {
        token: response.token || '',
        doctor: response.doctor || null,
        appointments: Array.isArray(appointments) ? appointments : []
      };
    } catch (error) {
      console.error('Login error details:', error);
      logError('Login error', error);
      
      // Ensure we return a properly formatted error object
      return rejectWithValue({
        message: error.message || 'Login failed. Please check your credentials and try again.',
        code: error.code || 'LOGIN_ERROR'
      });
    }
  }
);

// Doctor registration
export const registerDoctor = createAsyncThunk(
  'doctor/register',
  async (doctorData, { rejectWithValue }) => {
    try {
      const response = await zenHealingApi.doctors.create(doctorData);
      
      // Check if response is valid
      if (!response) {
        return rejectWithValue('Invalid response from server. Please try again.');
      }
      
      return response;
    } catch (error) {
      logError('Registration error', error);
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Registration failed. Please check your information and try again.'
      );
    }
  }
);

// Doctor logout (thunk for async cleanup)
export const doctorLogout = createAsyncThunk(
  'doctor/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Clean up stored data
      await storage.removeData(STORAGE_KEYS.AUTH_TOKEN);
      await storage.removeData(STORAGE_KEYS.DOCTOR_INFO);
      return true;
    } catch (error) {
      logError('Logout error', error);
      return rejectWithValue('Failed to complete logout process');
    }
  }
);

// Doctor slice
const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    // Apply filters to doctors list
    applyFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
      
      // Apply filters to the doctors list
      let filtered = [...state.doctorsList];
      
      // Filter by speciality
      if (state.filters.speciality) {
        filtered = filtered.filter(doctor => 
          doctor.speciality_id === state.filters.speciality
        );
      }
      
      // Filter by location
      if (state.filters.location) {
        filtered = filtered.filter(doctor => 
          doctor.location_id === state.filters.location
        );
      }
      
      // Filter by symptom (if doctors have symptoms array)
      if (state.filters.symptom) {
        filtered = filtered.filter(doctor => 
          doctor.symptoms && doctor.symptoms.includes(state.filters.symptom)
        );
      }
      
      // Filter by search query
      if (state.filters.searchQuery) {
        const query = state.filters.searchQuery.toLowerCase();
        filtered = filtered.filter(doctor => 
          doctor.name.toLowerCase().includes(query) ||
          (doctor.speciality && doctor.speciality.toLowerCase().includes(query))
        );
      }
      
      state.filteredDoctors = filtered;
    },
    
    // Reset filters
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredDoctors = state.doctorsList;
    },
    
    // Set selected doctor
    setSelectedDoctor: (state, action) => {
      state.selectedDoctor = action.payload;
    },
    
    // Clear errors
    clearErrors: (state) => {
      state.error = initialState.error;
    },
    
    // Set mock data (for development/testing)
    setMockData: (state, action) => {
      const { specialities, locations, symptoms } = action.payload;
      if (specialities) state.specialities = specialities;
      if (locations) state.locations = locations;
      if (symptoms) state.symptoms = symptoms;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch doctors cases
      .addCase(fetchDoctors.pending, (state) => {
        state.loading.doctors = true;
        state.error.doctors = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.doctorsList = action.payload;
        state.filteredDoctors = action.payload;
        state.loading.doctors = false;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading.doctors = false;
        state.error.doctors = action.payload;
      })
      
      // Fetch specialities cases
      .addCase(fetchSpecialities.pending, (state) => {
        state.loading.specialities = true;
        state.error.specialities = null;
      })
      .addCase(fetchSpecialities.fulfilled, (state, action) => {
        state.specialities = action.payload && action.payload.length > 0 
          ? action.payload 
          : mockSpecialities; // Fallback to mock data if empty
        state.loading.specialities = false;
      })
      .addCase(fetchSpecialities.rejected, (state, action) => {
        state.specialities = mockSpecialities; // Use mock data on rejection
        state.loading.specialities = false;
        state.error.specialities = null; // Clear error since we're using mock data
      })
      
      // Fetch symptoms cases
      .addCase(fetchSymptoms.pending, (state) => {
        state.loading.symptoms = true;
        state.error.symptoms = null;
      })
      .addCase(fetchSymptoms.fulfilled, (state, action) => {
        state.symptoms = action.payload && action.payload.length > 0
          ? action.payload 
          : mockSymptoms; // Fallback to mock data if empty
        state.loading.symptoms = false;
      })
      .addCase(fetchSymptoms.rejected, (state, action) => {
        state.symptoms = mockSymptoms; // Use mock data on rejection
        state.loading.symptoms = false;
        state.error.symptoms = null; // Clear error since we're using mock data
      })
      
      // Fetch locations cases
      .addCase(fetchLocations.pending, (state) => {
        state.loading.locations = true;
        state.error.locations = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.locations = action.payload && action.payload.length > 0
          ? action.payload 
          : mockLocations; // Fallback to mock data if empty
        state.loading.locations = false;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.locations = mockLocations; // Use mock data on rejection
        state.loading.locations = false;
        state.error.locations = null; // Clear error since we're using mock data
      })
      
      // Doctor login cases
      .addCase(doctorLogin.pending, (state) => {
        state.loading.login = true;
        state.error.login = null;
      })
      .addCase(doctorLogin.fulfilled, (state, action) => {
        state.loading.login = false;
        state.error.login = null;
        state.currentDoctor = action.payload.doctor;
        
        // Store doctor appointments if available
        if (action.payload.appointments && Array.isArray(action.payload.appointments)) {
          state.currentDoctor = {
            ...state.currentDoctor,
            appointments: action.payload.appointments
          };
        }
      })
      .addCase(doctorLogin.rejected, (state, action) => {
        state.loading.login = false;
        
        // Ensure error is properly formatted
        if (action.payload) {
          if (typeof action.payload === 'string') {
            state.error.login = { message: action.payload };
          } else if (typeof action.payload === 'object') {
            state.error.login = action.payload;
          } else {
            state.error.login = { message: 'Login failed. Please try again.' };
          }
        } else if (action.error) {
          state.error.login = { message: action.error.message || 'Login failed. Please try again.' };
        } else {
          state.error.login = { message: 'Login failed. Please try again.' };
        }
      })
      
      // Doctor registration cases
      .addCase(registerDoctor.pending, (state) => {
        state.loading.register = true;
        state.error.register = null;
      })
      .addCase(registerDoctor.fulfilled, (state, action) => {
        state.loading.register = false;
      })
      .addCase(registerDoctor.rejected, (state, action) => {
        state.loading.register = false;
        state.error.register = action.payload;
      })
      
      // Doctor logout cases
      .addCase(doctorLogout.fulfilled, (state) => {
        state.currentDoctor = null;
      });
  },
});

// Export actions and reducer
export const { 
  applyFilters, 
  resetFilters, 
  setSelectedDoctor, 
  clearErrors,
  setMockData
} = doctorSlice.actions;

export default doctorSlice.reducer;

// Selectors
export const selectAllDoctors = (state) => state.doctor.doctorsList;
export const selectFilteredDoctors = (state) => state.doctor.filteredDoctors;
export const selectSelectedDoctor = (state) => state.doctor.selectedDoctor;
export const selectSpecialities = (state) => state.doctor.specialities;
export const selectSymptoms = (state) => state.doctor.symptoms;
export const selectLocations = (state) => state.doctor.locations;
export const selectDoctorFilters = (state) => state.doctor.filters;
export const selectCurrentDoctor = (state) => state.doctor.currentDoctor;
export const selectDoctorLoading = (state) => state.doctor.loading;
export const selectDoctorErrors = (state) => state.doctor.error;

// Selector for featured doctors (where feature=1)
export const selectFeaturedDoctors = (state) => 
  state.doctor.doctorsList.filter(doctor => doctor.feature === 1);