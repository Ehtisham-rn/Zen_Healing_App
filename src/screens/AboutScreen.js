import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView, 
  Image
} from 'react-native';
import { ZEN_HEALING } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AboutScreen = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={ZEN_HEALING.COLORS.TEXT.PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/Logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          
          <Text style={styles.appName}>Zen Healing</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.paragraph}>
            At Zen Healing, our mission is to make holistic healthcare accessible to everyone. We believe in the power of integrative medicine and strive to connect users with trusted practitioners who can guide them on their wellness journey.
          </Text>
          
          <Text style={styles.sectionTitle}>Our Story</Text>
          <Text style={styles.paragraph}>
            Zen Healing was founded in 2023 by a team of healthcare professionals and technology experts who recognized the need for a better way to connect patients with holistic healthcare providers. After witnessing the challenges faced by both patients and practitioners in the traditional healthcare system, our founders set out to create a platform that would streamline the process of finding and booking appointments with qualified practitioners.
          </Text>
          
          <Text style={styles.paragraph}>
            What started as a small idea has grown into a comprehensive platform that serves thousands of users across the country. We continue to expand our network of practitioners and enhance our services to better meet the needs of our community.
          </Text>
          
          <Text style={styles.sectionTitle}>Our Values</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueTitle}>Accessibility</Text>
            <Text style={styles.valueDescription}>
              We believe that everyone deserves access to quality healthcare regardless of their location or background.
            </Text>
          </View>
          
          <View style={styles.valueContainer}>
            <Text style={styles.valueTitle}>Integrity</Text>
            <Text style={styles.valueDescription}>
              We are committed to maintaining the highest ethical standards in everything we do.
            </Text>
          </View>
          
          <View style={styles.valueContainer}>
            <Text style={styles.valueTitle}>Innovation</Text>
            <Text style={styles.valueDescription}>
              We continuously seek new ways to improve our platform and enhance the user experience.
            </Text>
          </View>
          
          <View style={styles.valueContainer}>
            <Text style={styles.valueTitle}>Community</Text>
            <Text style={styles.valueDescription}>
              We foster a supportive community of users and practitioners who share a commitment to holistic well-being.
            </Text>
          </View>
          
          <Text style={styles.sectionTitle}>Our Team</Text>
          <Text style={styles.paragraph}>
            Zen Healing is powered by a diverse team of healthcare professionals, technology experts, and wellness enthusiasts. Our team brings together a wealth of knowledge and experience from various fields to create a platform that truly meets the needs of our users.
          </Text>
          
          <Text style={styles.contactTitle}>Contact Us</Text>
          <Text style={styles.contactInfo}>
            Email: info@zenhealing.com{'\n'}
            Phone: (123) 456-7890{'\n'}
            Address: 123 Wellness Street, Health City, HC 12345
          </Text>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2023 Zen Healing. All rights reserved.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.PRIMARY,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: ZEN_HEALING.COLORS.BORDER,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  logo: {
    width: 120,
    height: 120,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.PRIMARY,
    textAlign: 'center',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    textAlign: 'center',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 16,
  },
  valueContainer: {
    marginBottom: 16,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.PRIMARY,
    marginBottom: 8,
  },
  valueDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginTop: 32,
    marginBottom: 12,
  },
  contactInfo: {
    fontSize: 15,
    lineHeight: 24,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  footer: {
    marginTop: 40,
    marginBottom: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: ZEN_HEALING.COLORS.TEXT.TERTIARY,
  },
});

export default AboutScreen; 