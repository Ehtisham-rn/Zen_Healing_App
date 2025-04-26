/**
 * Doctor state slice
 * Manages doctor-related state for the Zen Healing app
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import zenHealingApi from '../../services/zenHealingApi';
import * as storage from '../../utils/storage';
import { STORAGE_KEYS } from '../../constants';
import { AppError } from '../../utils/errorHandler';

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
  },
  error: {
    doctors: null,
    doctorDetails: null,
    specialities: null,
    symptoms: null,
    locations: null,
    login: null,
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
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch specialities');
    }
  }
);

// Fetch all symptoms
export const fetchSymptoms = createAsyncThunk(
  'doctor/fetchSymptoms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await zenHealingApi.symptoms.getAll();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch symptoms');
    }
  }
);

// Fetch all locations
export const fetchLocations = createAsyncThunk(
  'doctor/fetchLocations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await zenHealingApi.locations.getAll();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch locations');
    }
  }
);

// Doctor login
export const doctorLogin = createAsyncThunk(
  'doctor/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await zenHealingApi.doctors.login(credentials);
      
      // Store doctor info in AsyncStorage
      await storage.storeData(STORAGE_KEYS.AUTH_TOKEN, response.token);
      await storage.storeData(STORAGE_KEYS.DOCTOR_INFO, response.doctor);
      
      return {
        token: response.token,
        doctor: response.doctor,
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Doctor registration
export const registerDoctor = createAsyncThunk(
  'doctor/register',
  async (doctorData, { rejectWithValue }) => {
    try {
      const response = await zenHealingApi.doctors.create(doctorData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
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
    
    // Doctor logout
    doctorLogout: (state) => {
      state.currentDoctor = null;
      // Clean up stored data
      storage.removeData(STORAGE_KEYS.AUTH_TOKEN);
      storage.removeData(STORAGE_KEYS.DOCTOR_INFO);
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
        state.specialities = action.payload;
        state.loading.specialities = false;
      })
      .addCase(fetchSpecialities.rejected, (state, action) => {
        state.loading.specialities = false;
        state.error.specialities = action.payload;
      })
      
      // Fetch symptoms cases
      .addCase(fetchSymptoms.pending, (state) => {
        state.loading.symptoms = true;
        state.error.symptoms = null;
      })
      .addCase(fetchSymptoms.fulfilled, (state, action) => {
        state.symptoms = action.payload;
        state.loading.symptoms = false;
      })
      .addCase(fetchSymptoms.rejected, (state, action) => {
        state.loading.symptoms = false;
        state.error.symptoms = action.payload;
      })
      
      // Fetch locations cases
      .addCase(fetchLocations.pending, (state) => {
        state.loading.locations = true;
        state.error.locations = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.locations = action.payload;
        state.loading.locations = false;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading.locations = false;
        state.error.locations = action.payload;
      })
      
      // Doctor login cases
      .addCase(doctorLogin.pending, (state) => {
        state.loading.login = true;
        state.error.login = null;
      })
      .addCase(doctorLogin.fulfilled, (state, action) => {
        state.currentDoctor = action.payload.doctor;
        state.loading.login = false;
      })
      .addCase(doctorLogin.rejected, (state, action) => {
        state.loading.login = false;
        state.error.login = action.payload;
      });
  },
});

// Export actions and reducer
export const { 
  applyFilters, 
  resetFilters, 
  setSelectedDoctor, 
  clearErrors,
  doctorLogout
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