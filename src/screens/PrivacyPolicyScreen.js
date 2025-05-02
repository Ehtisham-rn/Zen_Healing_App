import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { ZEN_HEALING } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PrivacyPolicyScreen = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={ZEN_HEALING.COLORS.TEXT.PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.lastUpdated}>Last Updated: July 1, 2023</Text>
          
          <Text style={styles.sectionTitle}>Introduction</Text>
          <Text style={styles.paragraph}>
            Zen Healing ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Zen Healing.
          </Text>
          <Text style={styles.paragraph}>
            This Privacy Policy applies to our website, mobile application, and related services (collectively, our "Service"). By accessing or using our Service, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.
          </Text>
          
          <Text style={styles.sectionTitle}>Information We Collect</Text>
          <Text style={styles.paragraph}>
            We collect information that you provide directly to us when using our Service:
          </Text>
          <Text style={styles.listItem}>• Personal Information: When you create an account, we may collect your name, email address, phone number, and other information you directly provide.</Text>
          <Text style={styles.listItem}>• Health Information: Information about your health, medical conditions, and appointment details that you provide to us.</Text>
          <Text style={styles.listItem}>• Communications: When you communicate with us or with practitioners through our Service, we may collect information about your communication and any information you choose to provide.</Text>
          
          <Text style={styles.paragraph}>
            We also automatically collect certain information when you use the Service:
          </Text>
          <Text style={styles.listItem}>• Usage Information: We collect information about your interactions with our Service, such as the pages or content you view, and other actions on our Service.</Text>
          <Text style={styles.listItem}>• Device Information: We collect information about the device you use to access our Service, including hardware model, operating system, and unique device identifiers.</Text>
          <Text style={styles.listItem}>• Location Information: With your consent, we may collect and process information about your geographical location.</Text>
          
          <Text style={styles.sectionTitle}>How We Use Your Information</Text>
          <Text style={styles.paragraph}>
            We use the information we collect for various purposes, including to:
          </Text>
          <Text style={styles.listItem}>• Provide, maintain, and improve our Service.</Text>
          <Text style={styles.listItem}>• Process and facilitate appointments with healthcare practitioners.</Text>
          <Text style={styles.listItem}>• Send you technical notices, updates, security alerts, and support messages.</Text>
          <Text style={styles.listItem}>• Respond to your comments, questions, and customer service requests.</Text>
          <Text style={styles.listItem}>• Communicate with you about products, services, offers, and events offered by Zen Healing.</Text>
          <Text style={styles.listItem}>• Monitor and analyze trends, usage, and activities in connection with our Service.</Text>
          <Text style={styles.listItem}>• Detect, investigate, and prevent fraudulent transactions and other illegal activities.</Text>
          <Text style={styles.listItem}>• Comply with legal obligations and enforce our terms.</Text>
          
          <Text style={styles.sectionTitle}>Sharing of Information</Text>
          <Text style={styles.paragraph}>
            We may share personal information in the following circumstances:
          </Text>
          <Text style={styles.listItem}>• With healthcare practitioners when you book appointments.</Text>
          <Text style={styles.listItem}>• With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</Text>
          <Text style={styles.listItem}>• In response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law or legal process.</Text>
          <Text style={styles.listItem}>• If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of Zen Healing or others.</Text>
          <Text style={styles.listItem}>• In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company.</Text>
          <Text style={styles.listItem}>• With your consent or at your direction.</Text>
          
          <Text style={styles.sectionTitle}>Your Choices</Text>
          <Text style={styles.paragraph}>
            You have several choices regarding the use of information on our Service:
          </Text>
          <Text style={styles.listItem}>• Account Information: You can update, correct, or delete your account information at any time by logging into your account settings.</Text>
          <Text style={styles.listItem}>• Cookies: Most web browsers are set to accept cookies by default. You can usually choose to set your browser to remove or reject browser cookies.</Text>
          <Text style={styles.listItem}>• Promotional Communications: You can opt out of receiving promotional emails from Zen Healing by following the instructions in those emails.</Text>
          <Text style={styles.listItem}>• Mobile Push Notifications: You can opt out of receiving push notifications through your device settings.</Text>
          
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions about this Privacy Policy, please contact us at:
          </Text>
          <Text style={styles.contactInfo}>
            Zen Healing{'\n'}
            Email: privacy@zenhealing.com{'\n'}
            Phone: (123) 456-7890{'\n'}
            Address: 123 Wellness Street, Health City, HC 12345
          </Text>
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
  lastUpdated: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 12,
  },
  listItem: {
    fontSize: 15,
    lineHeight: 22,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 8,
    paddingLeft: 12,
  },
  contactInfo: {
    fontSize: 15,
    lineHeight: 22,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginTop: 8,
    marginBottom: 40,
  },
});

export default PrivacyPolicyScreen; 