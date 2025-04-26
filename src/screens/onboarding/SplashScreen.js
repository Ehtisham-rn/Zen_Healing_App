import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { ZEN_HEALING } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientView from '../../components/GradientView';

const SplashScreen = ({ navigation }) => {
  // Animation values
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.9);
  const translateYAnim = new Animated.Value(20);

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
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to onboarding after 2.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, translateYAnim, navigation]);

  return (
    <GradientView
      colors={['#F7FBFD', '#EAF6FC']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: translateYAnim }
              ],
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
        
        <Animated.View style={[styles.poweredByContainer, { opacity: fadeAnim }]}>
          <Text style={styles.poweredByText}>Holistic Wellness at Your Fingertips</Text>
        </Animated.View>
      </SafeAreaView>
    </GradientView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.PRIMARY,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 24,
  },
  poweredByContainer: {
    position: 'absolute',
    bottom: 40,
  },
  poweredByText: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.TERTIARY,
    textAlign: 'center',
  },
});

export default SplashScreen; 