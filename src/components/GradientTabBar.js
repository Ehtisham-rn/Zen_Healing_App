import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ZEN_HEALING } from '../constants';
import LinearGradient from 'react-native-linear-gradient';

/**
 * A component that wraps the tab bar with a gradient background
 * @param {Object} props
 * @param {React.ReactNode} props.children - The tab bar content
 * @param {Object} props.style - Additional style for the container
 */
const GradientTabBar = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,1)']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    borderRadius: 16,
    overflow: 'hidden',
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  gradient: {
    flex: 1,
    borderRadius: 16,
  }
});

export default GradientTabBar; 