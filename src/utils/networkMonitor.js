/**
 * Network Monitoring Utility
 * Tracks device connectivity and provides status updates
 */
import NetInfo from '@react-native-community/netinfo';
import { setNetworkStatus } from '../state/slices/appSlice';
import store from '../state/store';

/**
 * Start monitoring network connectivity
 * @returns {Function} - Unsubscribe function to stop monitoring
 */
export const startNetworkMonitoring = () => {
  // Subscribe to network state updates
  const unsubscribe = NetInfo.addEventListener(state => {
    // Update Redux state with network status
    store.dispatch(setNetworkStatus(state.isConnected && state.isInternetReachable));
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Network state:', state);
    }
  });
  
  return unsubscribe;
};

/**
 * Get current network state (one-time check)
 * @returns {Promise<Object>} - Network state object
 */
export const getCurrentNetworkState = async () => {
  try {
    const state = await NetInfo.fetch();
    return state;
  } catch (error) {
    console.error('Failed to get network state:', error);
    return {
      isConnected: false,
      isInternetReachable: false,
      type: 'unknown',
    };
  }
};

/**
 * Check if device is currently connected
 * @returns {Promise<boolean>} - Whether device is connected
 */
export const isConnected = async () => {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected && state.isInternetReachable;
  } catch (error) {
    console.error('Failed to check connection:', error);
    return false;
  }
};

export default {
  startNetworkMonitoring,
  getCurrentNetworkState,
  isConnected,
}; 