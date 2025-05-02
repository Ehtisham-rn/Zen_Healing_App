/**
 * Storage utilities
 * Handles local data persistence with AsyncStorage
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logError } from './errorHandler';

/**
 * Store data in AsyncStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store (will be JSON stringified)
 * @returns {Promise<boolean>} Success status
 */
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    logError(error, 'Storage');
    return false;
  }
};

/**
 * Retrieve data from AsyncStorage
 * @param {string} key - Storage key
 * @returns {Promise<any>} Retrieved value, or null if error
 */
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    logError(error, 'Storage');
    return null;
  }
};

/**
 * Remove data from AsyncStorage
 * @param {string} key - Storage key
 * @returns {Promise<boolean>} Success status
 */
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    logError(error, 'Storage');
    return false;
  }
};

/**
 * Clear all data from AsyncStorage
 * @returns {Promise<boolean>} Success status
 */
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    logError(error, 'Storage');
    return false;
  }
};

/**
 * Get all keys stored in AsyncStorage
 * @returns {Promise<string[]>} Array of keys, or empty array if error
 */
export const getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    logError(error, 'Storage');
    return [];
  }
};

/**
 * Check if a key exists in AsyncStorage
 * @param {string} key - Storage key
 * @returns {Promise<boolean>} Whether the key exists
 */
export const hasKey = async (key) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes(key);
  } catch (error) {
    logError(error, 'Storage');
    return false;
  }
};

export default {
  storeData,
  getData,
  removeData,
  clearAll,
  getAllKeys,
  hasKey,
}; 