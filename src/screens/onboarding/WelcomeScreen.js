import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { ZEN_HEALING } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GradientView from '../../components/GradientView';

const WelcomeScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  
  // Calculate dynamic sizes based on screen dimensions
  const illustrationHeight = Math.min(220, height * 0.25);
  const iconSize = Math.min(24, width * 0.06);
  const featureIconSize = Math.min(50, width * 0.12);
  
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
            style={[styles.illustration, { height: illustrationHeight }]}
            resizeMode="contain"
          />
        </View>
        
        <View style={[styles.contentCard, { marginTop: -illustrationHeight * 0.2 }]}>
          <Text style={styles.welcomeLabel}>WELCOME TO</Text>
          <Text style={[styles.title, { fontSize: Math.min(30, width * 0.07) }]}>Zen Healing Hub</Text>
          
          <Text style={[styles.description, { fontSize: Math.min(16, width * 0.04) }]}>
            Your one-stop platform for holistic health and wellness. Connect with top practitioners
            and begin your journey to wellness today.
          </Text>
          
          <View style={styles.divider} />
          
          <Text style={[styles.featuresTitle, { fontSize: Math.min(18, width * 0.045) }]}>The Zen Experience</Text>
          
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <View 
                style={[
                  styles.featureIcon, 
                  { 
                    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.TERTIARY,
                    width: featureIconSize,
                    height: featureIconSize,
                    borderRadius: featureIconSize * 0.3
                  }
                ]}
              >
                <MaterialCommunityIcons 
                  name="doctor" 
                  size={iconSize} 
                  color={ZEN_HEALING.COLORS.PRIMARY}
                  style={styles.icon}
                />
              </View>
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { fontSize: Math.min(16, width * 0.04) }]}>Expert Practitioners</Text>
                <Text style={[styles.featureDescription, { fontSize: Math.min(14, width * 0.035) }]}>
                  Connect with certified holistic health specialists
                </Text>
              </View>
            </View>
            
            <View style={styles.featureItem}>
              <View 
                style={[
                  styles.featureIcon, 
                  { 
                    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.TERTIARY,
                    width: featureIconSize,
                    height: featureIconSize,
                    borderRadius: featureIconSize * 0.3
                  }
                ]}
              >
                <Ionicons 
                  name="calendar" 
                  size={iconSize} 
                  color={ZEN_HEALING.COLORS.PRIMARY}
                  style={styles.icon}
                />
              </View>
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { fontSize: Math.min(16, width * 0.04) }]}>Easy Booking</Text>
                <Text style={[styles.featureDescription, { fontSize: Math.min(14, width * 0.035) }]}>
                  Schedule appointments with just a few taps
                </Text>
              </View>
            </View>
            
            <View style={styles.featureItem}>
              <View 
                style={[
                  styles.featureIcon, 
                  { 
                    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.TERTIARY,
                    width: featureIconSize,
                    height: featureIconSize,
                    borderRadius: featureIconSize * 0.3
                  }
                ]}
              >
                <FontAwesome5 
                  name="spa" 
                  size={iconSize} 
                  color={ZEN_HEALING.COLORS.PRIMARY}
                  style={styles.icon}
                />
              </View>
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { fontSize: Math.min(16, width * 0.04) }]}>Wellness Resources</Text>
                <Text style={[styles.featureDescription, { fontSize: Math.min(14, width * 0.035) }]}>
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
          style={[styles.button, { width: width * 0.9 }]}
        >
          <TouchableOpacity 
            style={styles.buttonContent}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { fontSize: Math.min(18, width * 0.045) }]}>Get Started</Text>
            <Ionicons name="arrow-forward" size={Math.min(20, width * 0.05)} color="white" style={styles.buttonIcon} />
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
    paddingTop: '5%',
  },
  illustration: {
    width: '90%',
  },
  contentCard: {
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.PRIMARY,
    borderRadius: 24,
    marginHorizontal: '5%',
    paddingHorizontal: '6%',
    paddingTop: '8%',
    paddingBottom: '8%',
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
    marginBottom: '2%',
  },
  title: {
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.PRIMARY,
    marginBottom: '4%',
  },
  description: {
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    lineHeight: 24,
    marginBottom: '6%',
  },
  divider: {
    height: 1,
    backgroundColor: ZEN_HEALING.COLORS.BORDER,
    marginBottom: '6%',
  },
  featuresTitle: {
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: '4%',
  },
  features: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%',
  },
  featureIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '4%',
  },
  icon: {
    alignSelf: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 4,
  },
  featureDescription: {
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    lineHeight: 20,
  },
  footer: {
    padding: '5%',
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.PRIMARY,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: ZEN_HEALING.COLORS.SHADOW,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    alignItems: 'center',
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
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginLeft: 8,
  },
});

export default WelcomeScreen; 