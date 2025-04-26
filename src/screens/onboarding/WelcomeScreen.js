import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ZEN_HEALING } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const WelcomeScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('OnboardingSteps');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../../assets/welcome.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Welcome to Zen Healing Hub</Text>
        
        <Text style={styles.description}>
          Your one-stop platform for holistic health and wellness. Connect with top practitioners
          and begin your journey to wellness today.
        </Text>
        
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <MaterialCommunityIcons 
                name="doctor" 
                size={24} 
                color={ZEN_HEALING.COLORS.PRIMARY}
                style={styles.icon}
              />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Expert Practitioners</Text>
              <Text style={styles.featureDescription}>
                Connect with certified holistic health specialists
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons 
                name="calendar" 
                size={24} 
                color={ZEN_HEALING.COLORS.PRIMARY}
                style={styles.icon}
              />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Easy Booking</Text>
              <Text style={styles.featureDescription}>
                Schedule appointments with just a few taps
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <FontAwesome5 
                name="spa" 
                size={24} 
                color={ZEN_HEALING.COLORS.PRIMARY}
                style={styles.icon}
              />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Wellness Resources</Text>
              <Text style={styles.featureDescription}>
                Access articles and tips for your wellness journey
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.PRIMARY,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  illustration: {
    width: '100%',
    height: 200,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.PRIMARY,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  features: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    alignSelf: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
  },
  footer: {
    padding: 24,
    paddingBottom: 16,
  },
  button: {
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen; 