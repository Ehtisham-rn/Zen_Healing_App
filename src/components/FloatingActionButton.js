import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { ZEN_HEALING } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

/**
 * A material design inspired floating action button component
 * @param {Object} props
 * @param {string} props.iconName - The name of the Ionicons icon to use
 * @param {function} props.onPress - Function to call when the button is pressed
 * @param {Object} props.style - Additional style for the container
 */
const FloatingActionButton = ({
  iconName = 'add',
  onPress,
  style
}) => {
  // Animation values
  const scale = useSharedValue(1);
  
  // Animated styles
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  // Handle press animation
  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };
  
  const handlePressOut = () => {
    scale.value = withSpring(1);
  };
  
  return (
    <Animated.View style={[styles.container, animatedStyles, style]}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <View style={styles.iconContainer}>
          <Ionicons name={iconName} size={28} color="white" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 999,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default FloatingActionButton; 