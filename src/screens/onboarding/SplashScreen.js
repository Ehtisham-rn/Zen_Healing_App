import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { ZEN_HEALING } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = ({ navigation }) => {
  // Animation values
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.9);

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to onboarding after 2.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={require('../../../assets/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Zen Healing Hub</Text>
        <Text style={styles.subtitle}>Your Wellness Journey Begins Here</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.PRIMARY,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.PRIMARY,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
  },
});

export default SplashScreen; 