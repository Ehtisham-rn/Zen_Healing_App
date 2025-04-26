/**
 * Appointment state slice
 * Manages appointment-related state for the Zen Healing app
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import zenHealingApi from '../../services/zenHealingApi';
import { ZEN_HEALING } from '../../constants';
import { AppError } from '../../utils/errorHandler';

// Initial state
const initialState = {
  appointments: [],
  userAppointments: [], // Appointments for the current user
  doctorAppointments: [], // Appointments for the current doctor
  selectedAppointment: null,
  loading: {
    all: false,
    create: false,
    updateStatus: false,
  },
  error: {
    all: null,
    create: null,
    updateStatus: null,
  },
};

// Async thunks for appointment actions

// Get all appointments (admin or doctor role)
export const fetchAllAppointments = createAsyncThunk(
  'appointment/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await zenHealingApi.appointments.getAll();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch appointments');
    }
  }
);

// Get appointments for a specific user
export const fetchUserAppointments = createAsyncThunk(
  'appointment/fetchUserAppointments',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await zenHealingApi.appointments.getForUser(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch user appointments');
    }
  }
);

// Get appointments for a specific doctor
export const fetchDoctorAppointments = createAsyncThunk(
  'appointment/fetchDoctorAppointments',
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await zenHealingApi.appointments.getForDoctor(doctorId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch doctor appointments');
    }
  }
);

// Create a new appointment
export const createAppointment = createAsyncThunk(
  'appointment/create',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await zenHealingApi.appointments.create(appointmentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create appointment');
    }
  }
);

// Update appointment status
export const updateAppointmentStatus = createAsyncThunk(
  'appointment/updateStatus',
  async ({ appointmentId, status }, { rejectWithValue }) => {
    try {
      const response = await zenHealingApi.appointments.updateStatus(appointmentId, status);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update appointment status');
    }
  }
);

// Appointment slice
const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    // Set selected appointment
    setSelectedAppointment: (state, action) => {
      state.selectedAppointment = action.payload;
    },
    
    // Clear appointment errors
    clearErrors: (state) => {
      state.error = initialState.error;
    },
    
    // Filter appointments by status
    filterAppointmentsByStatus: (state, action) => {
      const status = action.payload;
      
      if (!status || status === 'all') {
        state.userAppointments = state.appointments;
        return;
      }
      
      state.userAppointments = state.appointments.filter(
        appointment => appointment.status === status
      );
    },
    
    // Filter appointments by date
    filterAppointmentsByDate: (state, action) => {
      const { startDate, endDate } = action.payload;
      
      if (!startDate && !endDate) {
        state.userAppointments = state.appointments;
        return;
      }
      
      state.userAppointments = state.appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.booking_date);
        
        if (startDate && endDate) {
          return appointmentDate >= new Date(startDate) && appointmentDate <= new Date(endDate);
        } else if (startDate) {
          return appointmentDate >= new Date(startDate);
        } else if (endDate) {
          return appointmentDate <= new Date(endDate);
        }
        
        return true;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all appointments
      .addCase(fetchAllAppointments.pending, (state) => {
        state.loading.all = true;
        state.error.all = null;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
        state.loading.all = false;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.loading.all = false;
        state.error.all = action.payload;
      })
      
      // Fetch user appointments
      .addCase(fetchUserAppointments.pending, (state) => {
        state.loading.all = true;
        state.error.all = null;
      })
      .addCase(fetchUserAppointments.fulfilled, (state, action) => {
        state.userAppointments = action.payload;
        state.loading.all = false;
      })
      .addCase(fetchUserAppointments.rejected, (state, action) => {
        state.loading.all = false;
        state.error.all = action.payload;
      })
      
      // Fetch doctor appointments
      .addCase(fetchDoctorAppointments.pending, (state) => {
        state.loading.all = true;
        state.error.all = null;
      })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.doctorAppointments = action.payload;
        state.loading.all = false;
      })
      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
        state.loading.all = false;
        state.error.all = action.payload;
      })
      
      // Create appointment
      .addCase(createAppointment.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        // Add the new appointment to both lists
        state.appointments.push(action.payload);
        state.userAppointments.push(action.payload);
        state.loading.create = false;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.payload;
      })
      
      // Update appointment status
      .addCase(updateAppointmentStatus.pending, (state) => {
        state.loading.updateStatus = true;
        state.error.updateStatus = null;
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        // Update the appointment in all relevant lists
        const updatedAppointment = action.payload;
        
        state.appointments = state.appointments.map(appointment => 
          appointment.id === updatedAppointment.id ? updatedAppointment : appointment
        );
        
        state.userAppointments = state.userAppointments.map(appointment => 
          appointment.id === updatedAppointment.id ? updatedAppointment : appointment
        );
        
        state.doctorAppointments = state.doctorAppointments.map(appointment => 
          appointment.id === updatedAppointment.id ? updatedAppointment : appointment
        );
        
        // If there's a selected appointment and it's the one we just updated, update it
        if (state.selectedAppointment && state.selectedAppointment.id === updatedAppointment.id) {
          state.selectedAppointment = updatedAppointment;
        }
        
        state.loading.updateStatus = false;
      })
      .addCase(updateAppointmentStatus.rejected, (state, action) => {
        state.loading.updateStatus = false;
        state.error.updateStatus = action.payload;
      });
  },
});

// Export actions and reducer
export const { 
  setSelectedAppointment, 
  clearErrors,
  filterAppointmentsByStatus,
  filterAppointmentsByDate
} = appointmentSlice.actions;

export default appointmentSlice.reducer;

// Selectors
export const selectAllAppointments = (state) => state.appointment.appointments;
export const selectUserAppointments = (state) => state.appointment.userAppointments;
export const selectDoctorAppointments = (state) => state.appointment.doctorAppointments;
export const selectSelectedAppointment = (state) => state.appointment.selectedAppointment;
export const selectAppointmentLoading = (state) => state.appointment.loading;
export const selectAppointmentErrors = (state) => state.appointment.error; 