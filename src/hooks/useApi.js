/**
 * useApi hook
 * A custom hook for making API calls with loading and error states
 */
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setNetworkStatus } from '../state/slices/appSlice';

/**
 * Hook for making API calls with built-in loading and error states
 * @param {Function} apiFunc - The API function to call
 * @returns {Object} - { execute, data, loading, error, reset }
 */
const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  
  /**
   * Execute the API call
   * @param {any} params - Parameters to pass to the API function
   * @returns {Promise<any>} - The API response data
   */
  const execute = useCallback(async (...params) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiFunc(...params);
      setData(response);
      
      // Reset network error state if successful
      dispatch(setNetworkStatus(true));
      
      return response;
    } catch (error) {
      setError(error);
      
      // Check if it's a network error
      if (error.message?.includes('network') || error.message?.includes('connect')) {
        dispatch(setNetworkStatus(false));
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  }, [apiFunc, dispatch]);
  
  /**
   * Reset the hook state
   */
  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);
  
  return { execute, data, loading, error, reset };
};

export default useApi; 