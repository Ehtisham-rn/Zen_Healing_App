/**
 * App state slice
 * Manages general application state
 */
import { createSlice } from '@reduxjs/toolkit';
import * as storage from '../../utils/storage';
import { STORAGE_KEYS } from '../../constants';

// Load initial settings from AsyncStorage (will be null initially, then updated after app loads)
const initialState = {
  // App settings
  settings: {
    theme: 'light', // light or dark
    notifications: true,
    language: 'en',  
  },
  // App status
  status: {
    isLoading: false,
    isOnline: true,
    hasNetworkError: false,
    maintenanceMode: false,
  },
  // Onboarding status
  onboarding: {
    completed: false,
    currentStep: 0,
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Update app settings
    updateSettings: (state, action) => {
      state.settings = {
        ...state.settings,
        ...action.payload,
      };
      
      // Persist settings to storage
      storage.storeData(STORAGE_KEYS.APP_SETTINGS, state.settings);
    },
    
    // Toggle theme
    toggleTheme: (state) => {
      const newTheme = state.settings.theme === 'light' ? 'dark' : 'light';
      state.settings.theme = newTheme;
      
      // Persist updated settings
      storage.storeData(STORAGE_KEYS.APP_SETTINGS, state.settings);
    },
    
    // Set loading state
    setLoading: (state, action) => {
      state.status.isLoading = action.payload;
    },
    
    // Update network status
    setNetworkStatus: (state, action) => {
      state.status.isOnline = action.payload;
      state.status.hasNetworkError = !action.payload;
    },
    
    // Set maintenance mode
    setMaintenanceMode: (state, action) => {
      state.status.maintenanceMode = action.payload;
    },
    
    // Update onboarding status
    updateOnboarding: (state, action) => {
      state.onboarding = {
        ...state.onboarding,
        ...action.payload,
      };
      
      // If onboarding is completed, store it
      if (action.payload.completed) {
        storage.storeData(STORAGE_KEYS.ONBOARDING_COMPLETED, true);
      }
    },
    
    // Initialize app state from storage
    initializeAppState: (state, action) => {
      // Merge stored settings if available
      if (action.payload.settings) {
        state.settings = {
          ...state.settings,
          ...action.payload.settings,
        };
      }
      
      // Set onboarding status if available
      if (action.payload.onboardingCompleted) {
        state.onboarding.completed = true;
      }
    },
  },
});

// Export actions and reducer
export const {
  updateSettings,
  toggleTheme,
  setLoading,
  setNetworkStatus,
  setMaintenanceMode,
  updateOnboarding,
  initializeAppState,
} = appSlice.actions;

export default appSlice.reducer;

// Selectors
export const selectTheme = (state) => state.app.settings.theme;
export const selectIsLoading = (state) => state.app.status.isLoading;
export const selectIsOnline = (state) => state.app.status.isOnline;
export const selectOnboardingStatus = (state) => state.app.onboarding;
export const selectSettings = (state) => state.app.settings; 