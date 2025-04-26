/**
 * App Initialization
 * Handles app setup and initialization for Zen Healing
 */
import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './state/store';
import { initializeAppState } from './state/slices/appSlice';
import { checkAuthState } from './state/slices/authSlice';
import { STORAGE_KEYS, ZEN_HEALING } from './constants';
import * as networkMonitor from './utils/networkMonitor';

// Import our AppNavigator
import AppNavigator from './navigation/AppNavigator';

/**
 * Main app component
 */
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize app on startup
  useEffect(() => {
    const setupApp = async () => {
      try {
        // Start network monitoring
        const unsubscribeNetwork = networkMonitor.startNetworkMonitoring();
        
        // Load app settings from storage
        const [appSettings, onboardingCompleted, doctorInfo] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.APP_SETTINGS),
          AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED),
          AsyncStorage.getItem(STORAGE_KEYS.DOCTOR_INFO),
        ]);
        
        // Initialize app state with stored values
        store.dispatch(initializeAppState({
          settings: appSettings ? JSON.parse(appSettings) : null,
          onboardingCompleted: onboardingCompleted === 'true',
        }));
        
        // Check if user is already logged in
        if (!doctorInfo) {
          await store.dispatch(checkAuthState());
        }
        
        // Finish loading
        setIsLoading(false);
        
        // Cleanup on app exit
        return () => {
          unsubscribeNetwork();
        };
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setIsLoading(false);
      }
    };
    
    setupApp();
  }, []);
  
  // Show loading screen while initializing
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={ZEN_HEALING.COLORS.PRIMARY} />
        <Text style={styles.loadingText}>Loading Zen Healing...</Text>
      </View>
    );
  }
  
  // Return the AppNavigator wrapped with necessary providers
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor={ZEN_HEALING.COLORS.BACKGROUND.PRIMARY} />
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.PRIMARY,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  }
});

export default App; 