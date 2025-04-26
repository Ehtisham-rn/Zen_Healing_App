/**
 * Error handling utilities
 * Provides consistent error handling across the app
 */
import { Platform } from 'react-native';
import env from '../config/environment';
import * as Constants from '../constants';

/**
 * Custom error class to add more context to errors
 */
export class AppError extends Error {
  constructor(message, code, originalError = null) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.originalError = originalError;
    
    // Maintains proper stack trace for debugging (V8 only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

/**
 * Log errors based on environment
 * @param {Error} error - The error to log
 * @param {string} context - Where the error occurred
 */
export const logError = (error, context = 'General') => {
  // Only log detailed errors in development
  if (env.isDevelopment) {
    console.error(`[${context} Error]:`, error);
    
    if (error.originalError) {
      console.error('Original error:', error.originalError);
    }
    
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
  } else if (env.isStaging) {
    // In staging, log less detail
    console.error(`[${context}]:`, error.message);
  }
  
  // In production, we might want to send errors to a monitoring service
  if (env.isProduction) {
    // Example: sendToErrorMonitoring(error, context);
  }
};

/**
 * Handle API errors consistently
 * @param {Error} error - The API error
 * @returns {Object} Formatted error object
 */
export const handleApiError = (error) => {
  let errorMessage = Constants.API.ERROR_MESSAGES.SERVER_ERROR;
  let statusCode = Constants.API.STATUS_CODES.SERVER_ERROR;
  
  // Handle network errors
  if (!error.response) {
    if (error.message.includes('timeout')) {
      errorMessage = Constants.API.ERROR_MESSAGES.TIMEOUT_ERROR;
    } else {
      errorMessage = Constants.API.ERROR_MESSAGES.NETWORK_ERROR;
    }
  } 
  // Handle server responses with error status
  else if (error.response) {
    statusCode = error.response.status;
    
    switch (statusCode) {
      case Constants.API.STATUS_CODES.UNAUTHORIZED:
        errorMessage = Constants.API.ERROR_MESSAGES.UNAUTHORIZED;
        break;
      case Constants.API.STATUS_CODES.FORBIDDEN:
        errorMessage = Constants.API.ERROR_MESSAGES.FORBIDDEN;
        break;
      case Constants.API.STATUS_CODES.NOT_FOUND:
        errorMessage = 'The requested resource was not found.';
        break;
      case Constants.API.STATUS_CODES.BAD_REQUEST:
        errorMessage = error.response.data?.message || 'Invalid request. Please check your data.';
        break;
      default:
        errorMessage = error.response.data?.message || Constants.API.ERROR_MESSAGES.SERVER_ERROR;
    }
  }
  
  // Log the error
  logError(
    new AppError(errorMessage, statusCode, error),
    'API'
  );
  
  return {
    message: errorMessage,
    code: statusCode,
    originalError: env.isDevelopment ? error : null,
  };
};

/**
 * Get device info for error reporting
 */
export const getDeviceInfo = () => {
  return {
    platform: Platform.OS,
    version: Platform.Version,
    appVersion: '1.0.0', // This should come from app.json or similar
  };
};

export default {
  AppError,
  logError,
  handleApiError,
  getDeviceInfo,
}; 