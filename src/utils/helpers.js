/**
 * Helper utilities
 * Common utility functions for the application
 */

/**
 * Format a date to a readable string
 * @param {Date|string} date - The date to format
 * @param {string} format - The format to use (default: 'MMMM DD, YYYY')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'MMMM DD, YYYY') => {
  // This is a simple implementation
  // In a real app, use a library like date-fns or moment
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) {
    return '';
  }
  
  // Very basic formatting - use a proper date library in a real app
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const year = d.getFullYear();
  const month = months[d.getMonth()];
  const day = d.getDate().toString().padStart(2, '0');
  
  return `${month} ${day}, ${year}`;
};

/**
 * Format currency
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount == null) return '';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Truncate a string if it's longer than the specified length
 * @param {string} str - The string to truncate
 * @param {number} length - Maximum length
 * @param {string} ending - String to append to truncated text (default: '...')
 * @returns {string} Truncated string
 */
export const truncateString = (str, length, ending = '...') => {
  if (!str) return '';
  if (str.length <= length) return str;
  
  return str.substring(0, length - ending.length) + ending;
};

/**
 * Debounce a function
 * @param {Function} func - The function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Deep clone an object
 * @param {Object} obj - The object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Generate a random ID (UUID v4-like)
 * @returns {string} Random ID
 */
export const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export default {
  formatDate,
  formatCurrency,
  truncateString,
  debounce,
  deepClone,
  generateId,
}; 