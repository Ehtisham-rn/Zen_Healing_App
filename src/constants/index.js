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
    PRIMARY: '#38B6E3',     // Bright sky blue (HSL: 195, 82%, 58%)
    SECONDARY: '#1A5D8A',   // Darker blue for contrast
    TERTIARY: '#7ED4F6',    // Lighter blue for accents
    ACCENT: '#FF9248',      // Warm orange (complementary to blue)
    SUCCESS: '#4CD964',     // Green for success states
    WARNING: '#FFCC00',     // Yellow for warnings
    ERROR: '#FF3B30',       // Red for errors
    TEXT: {
      PRIMARY: '#333333',
      SECONDARY: '#666666',
      TERTIARY: '#999999',
      DISABLED: '#CCCCCC',
      LIGHT: '#FFFFFF',
    },
    BACKGROUND: {
      PRIMARY: '#FFFFFF',
      SECONDARY: '#F7FBFD',  // Very light blue tint
      TERTIARY: '#EAF6FC',   // Light blue background
      DARK: '#333333',
    },
    BORDER: '#E0E0E0',
    SHADOW: 'rgba(56, 182, 227, 0.15)',  // Primary color shadow
  },
}; 