/**
 * Environment configuration
 * Contains environment-specific settings and API endpoints
 */

// Set the current environment
const ENV = {
  dev: 'development',
  staging: 'staging',
  prod: 'production'
};

const currentEnv = ENV.dev; // Change this value to switch environments

// Environment-specific configuration
const config = {
  // Development environment
  [ENV.dev]: {
    apiUrl: 'https://backend.zenhealinghub.com/api', // Zen Healing Hub API
    apiTimeout: 10000, // 10 seconds
    logLevel: 'debug',
    useMockData: true, // Enable mock data in development
  },
  
  // Staging environment
  [ENV.staging]: {
    apiUrl: 'https://backend.zenhealinghub.com/api', // Using same URL for staging
    apiTimeout: 15000, // 15 seconds
    logLevel: 'info',
    useMockData: false,
  },
  
  // Production environment
  [ENV.prod]: {
    apiUrl: 'https://backend.zenhealinghub.com/api', // Using same URL for production
    apiTimeout: 20000, // 20 seconds
    logLevel: 'error',
    useMockData: false,
  },
};

// Export the current environment's configuration
export default {
  ...config[currentEnv],
  env: currentEnv,
  isProduction: currentEnv === ENV.prod,
  isDevelopment: currentEnv === ENV.dev,
  isStaging: currentEnv === ENV.staging,
}; 