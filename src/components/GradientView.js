import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * A simple component that mimics LinearGradient using regular Views
 * This is used as a fallback when react-native-linear-gradient is not working properly
 * 
 * @param {Object} props
 * @param {Array} props.colors - Array of colors to use in the gradient
 * @param {Object} props.style - Style object for the container
 * @param {Object} props.start - Start position (not used in this implementation)
 * @param {Object} props.end - End position (not used in this implementation)
 * @param {React.ReactNode} props.children - Child components
 */
const GradientView = ({ colors, style, children, start, end, ...rest }) => {
  // Use the first color as the background color if available
  const backgroundColor = colors && colors.length > 0 ? colors[0] : 'transparent';

  return (
    <View style={[styles.container, { backgroundColor }, style]} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default GradientView; 