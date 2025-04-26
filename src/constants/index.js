/**
 * Application constants
 * Central place for all app-wide constants
 */

// App dimensions
export const SCREEN_DIMENSIONS = {
  // Use these instead of hardcoded values for consistent spacing
  SPACING: {
    TINY: 4,
    SMALL: 8,
    MEDIUM: 16,
    LARGE: 24,
    XLARGE: 32,
    XXLARGE: 48,
  },
  // Font sizes for consistent typography
  FONT_SIZES: {
    SMALL: 12,
    MEDIUM: 14,
    LARGE: 16,
    XLARGE: 20,
    XXLARGE: 24,
  },
};

// API status codes and messages
export const API = {
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  },
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
    TIMEOUT_ERROR: 'Request timed out. Please try again.',
    SERVER_ERROR: 'Something went wrong on our end. Please try again later.',
    UNAUTHORIZED: 'Please login to continue.',
    FORBIDDEN: 'You do not have permission to access this resource.',
  },
};

// Animation durations
export const ANIMATIONS = {
  DURATION: {
    SHORT: 200,
    MEDIUM: 300,
    LONG: 500,
  },
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'zen_healing_auth_token',
  USER_INFO: 'zen_healing_user_info',
  DOCTOR_INFO: 'zen_healing_doctor_info',
  APP_SETTINGS: 'zen_healing_app_settings',
  ONBOARDING_COMPLETED: 'zen_healing_onboarding_completed',
  RECENT_SEARCHES: 'zen_healing_recent_searches',
  FAVORITE_DOCTORS: 'zen_healing_favorite_doctors',
};

// Zen Healing specific constants
export const ZEN_HEALING = {
  // Appointment status options
  APPOINTMENT_STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
  },
  
  // Doctor status options
  DOCTOR_STATUS: {
    PENDING: 'pending',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
  },
  
  // Default pagination limits
  PAGINATION: {
    DEFAULT_LIMIT: 10,
    DOCTORS_PER_PAGE: 8,
    ARTICLES_PER_PAGE: 6,
  },
  
  // App colors - should match your design system
  COLORS: {
    PRIMARY: '#4CAF50',     // Green for healing/health
    SECONDARY: '#2196F3',   // Blue for calm/peace
    ACCENT: '#FF9800',      // Orange for energy
    SUCCESS: '#00C853',
    WARNING: '#FFD600',
    ERROR: '#FF3D00',
    TEXT: {
      PRIMARY: '#212121',
      SECONDARY: '#757575',
      DISABLED: '#9E9E9E',
    },
    BACKGROUND: {
      PRIMARY: '#FFFFFF',
      SECONDARY: '#F5F5F5',
    },
  },
}; 