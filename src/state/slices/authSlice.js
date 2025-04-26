/**
 * Authentication state slice
 * Manages user authentication state
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/api';
import * as storage from '../../utils/storage';
import { STORAGE_KEYS } from '../../constants';
import { AppError } from '../../utils/errorHandler';

// Initial state
const initialState = {
  isAuthenticated: false,
  userData: null,
  token: null,
  loading: false,
  error: null,
};

// Async thunks for authentication actions
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Call login API
      const response = await apiService.post('/auth/login', { email, password });
      
      // Store token in AsyncStorage
      await storage.storeData(STORAGE_KEYS.AUTH_TOKEN, response.token);
      await storage.storeData(STORAGE_KEYS.USER_INFO, response.user);
      
      return {
        token: response.token,
        user: response.user,
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Logout thunk
export const logout = createAsyncThunk(
  'auth/logout', 
  async (_, { rejectWithValue }) => {
    try {
      // Call logout API if needed
      // await apiService.post('/auth/logout');
      
      // Clean up stored data
      await storage.removeData(STORAGE_KEYS.AUTH_TOKEN);
      await storage.removeData(STORAGE_KEYS.USER_INFO);
      
      return true;
    } catch (error) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

// Check if user has active session
export const checkAuthState = createAsyncThunk(
  'auth/checkAuthState',
  async (_, { rejectWithValue }) => {
    try {
      // Get token from storage
      const token = await storage.getData(STORAGE_KEYS.AUTH_TOKEN);
      
      if (!token) {
        return { isAuthenticated: false };
      }
      
      // Optionally validate token with backend
      // const response = await apiService.get('/auth/validate');
      
      // Get user info from storage
      const userData = await storage.getData(STORAGE_KEYS.USER_INFO);
      
      return {
        isAuthenticated: true,
        token,
        user: userData,
      };
    } catch (error) {
      // Clean up invalid session
      await storage.removeData(STORAGE_KEYS.AUTH_TOKEN);
      await storage.removeData(STORAGE_KEYS.USER_INFO);
      
      return rejectWithValue(error.message || 'Authentication check failed');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    updateUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
      // Optionally persist updated user data
      storage.storeData(STORAGE_KEYS.USER_INFO, state.userData);
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.userData = action.payload.user;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Authentication failed';
      })
      
      // Logout cases
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        // Reset to initial state
        return initialState;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Check auth state cases
      .addCase(checkAuthState.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        if (action.payload.isAuthenticated) {
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.userData = action.payload.user;
        }
        state.loading = false;
      })
      .addCase(checkAuthState.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.userData = null;
        state.token = null;
        state.loading = false;
      });
  },
});

// Export actions and reducer
export const { resetError, updateUserData } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.userData;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error; 