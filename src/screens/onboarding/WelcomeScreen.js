import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ZEN_HEALING } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GradientView from '../../components/GradientView';

const WelcomeScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('OnboardingSteps');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Image
            source={require('../../../assets/welcome.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.contentCard}>
          <Text style={styles.welcomeLabel}>WELCOME TO</Text>
          <Text style={styles.title}>Zen Healing Hub</Text>
          
          <Text style={styles.description}>
            Your one-stop platform for holistic health and wellness. Connect with top practitioners
            and begin your journey to wellness today.
          </Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.featuresTitle}>The Zen Experience</Text>
          
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.TERTIARY }]}>
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
              <View style={[styles.featureIcon, { backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.TERTIARY }]}>
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
              <View style={[styles.featureIcon, { backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.TERTIARY }]}>
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
      </ScrollView>
      
      <View style={styles.footer}>
        <GradientView
          colors={[ZEN_HEALING.COLORS.PRIMARY, ZEN_HEALING.COLORS.SECONDARY]}
          style={styles.button}
        >
          <TouchableOpacity 
            style={styles.buttonContent}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color="white" style={styles.buttonIcon} />
          </TouchableOpacity>
        </GradientView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
  },
  illustration: {
    width: '90%',
    height: 220,
  },
  contentCard: {
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.PRIMARY,
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: -40,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
    shadowColor: ZEN_HEALING.COLORS.SHADOW,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  welcomeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: ZEN_HEALING.COLORS.TEXT.TERTIARY,
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.PRIMARY,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    lineHeight: 24,
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: ZEN_HEALING.COLORS.BORDER,
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 16,
  },
  features: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
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
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.PRIMARY,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: ZEN_HEALING.COLORS.SHADOW,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  button: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginLeft: 8,
  },
});

export default WelcomeScreen; 