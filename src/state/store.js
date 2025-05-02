/**
 * Redux store configuration
 * Central state management for the application
 */
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import appReducer from './slices/appSlice';
import doctorReducer from './slices/doctorSlice';
import appointmentReducer from './slices/appointmentSlice';

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  doctor: doctorReducer,
  appointment: appointmentReducer,
  // Add more reducers here as your app grows
});

/**
 * Reset state when user logs out
 */
const resettableReducer = (state, action) => {
  if (action.type === 'auth/logout' || action.type === 'doctor/doctorLogout') {
    // Keep some state values and reset others when user logs out
    return rootReducer({
      app: state.app, // Preserve app settings
    }, action);
  }
  
  return rootReducer(state, action);
};

// Configure the Redux store
const store = configureStore({
  reducer: resettableReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the state when checking for non-serializable values
        ignoredActions: ['auth/loginSuccess', 'doctor/login'],
        ignoredPaths: [
          'auth.userData.someNonSerializableProperty',
          'doctor.currentDoctor.someNonSerializableProperty'
        ],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store; 