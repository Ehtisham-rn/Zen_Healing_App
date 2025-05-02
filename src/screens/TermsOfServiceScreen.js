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

const TermsOfServiceScreen = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={ZEN_HEALING.COLORS.TEXT.PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Service</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.lastUpdated}>Last Updated: July 1, 2023</Text>
          
          <Text style={styles.paragraph}>
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Zen Healing mobile application (the "Service") operated by Zen Healing ("us", "we", or "our").
          </Text>
          
          <Text style={styles.paragraph}>
            Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who wish to access or use the Service.
          </Text>
          
          <Text style={styles.paragraph}>
            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you do not have permission to access the Service.
          </Text>
          
          <Text style={styles.sectionTitle}>1. Communications</Text>
          <Text style={styles.paragraph}>
            By creating an account on our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send.
          </Text>
          
          <Text style={styles.sectionTitle}>2. Content</Text>
          <Text style={styles.paragraph}>
            Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
          </Text>
          
          <Text style={styles.paragraph}>
            By posting Content on or through the Service, You represent and warrant that: (i) the Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity.
          </Text>
          
          <Text style={styles.sectionTitle}>3. Accounts</Text>
          <Text style={styles.paragraph}>
            When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.
          </Text>
          
          <Text style={styles.paragraph}>
            You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </Text>
          
          <Text style={styles.sectionTitle}>4. Medical Disclaimer</Text>
          <Text style={styles.paragraph}>
            The content on our Service is provided for general information only. It is not intended to amount to medical advice on which you should rely. You must obtain professional or specialist advice before taking, or refraining from, any action on the basis of the content on our Service.
          </Text>
          
          <Text style={styles.paragraph}>
            The Zen Healing app connects users with healthcare practitioners but does not itself provide medical services. We do not guarantee that the healthcare practitioners available through our Service will be able to meet your specific needs. You are responsible for evaluating the qualifications of healthcare practitioners and determining whether they are suitable for your needs.
          </Text>
          
          <Text style={styles.sectionTitle}>5. Appointments and Cancellations</Text>
          <Text style={styles.paragraph}>
            The Service allows you to book appointments with healthcare practitioners. By booking an appointment, you agree to attend the appointment at the scheduled time or to cancel or reschedule in accordance with the practitioner's cancellation policy.
          </Text>
          
          <Text style={styles.paragraph}>
            Practitioners may have different cancellation policies. You are responsible for familiarizing yourself with the practitioner's cancellation policy at the time of booking. Failure to cancel an appointment in accordance with the practitioner's cancellation policy may result in charges.
          </Text>
          
          <Text style={styles.sectionTitle}>6. Intellectual Property</Text>
          <Text style={styles.paragraph}>
            The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Zen Healing and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Zen Healing.
          </Text>
          
          <Text style={styles.sectionTitle}>7. Termination</Text>
          <Text style={styles.paragraph}>
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
          </Text>
          
          <Text style={styles.paragraph}>
            If you wish to terminate your account, you may simply discontinue using the Service, or notify us that you wish to delete your account.
          </Text>
          
          <Text style={styles.paragraph}>
            All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
          </Text>
          
          <Text style={styles.sectionTitle}>8. Indemnification</Text>
          <Text style={styles.paragraph}>
            You agree to defend, indemnify and hold harmless Zen Healing and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) your use and access of the Service, by you or any person using your account and password; b) a breach of these Terms, or c) Content posted on the Service.
          </Text>
          
          <Text style={styles.sectionTitle}>9. Limitation Of Liability</Text>
          <Text style={styles.paragraph}>
            In no event shall Zen Healing, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
          </Text>
          
          <Text style={styles.sectionTitle}>10. Changes</Text>
          <Text style={styles.paragraph}>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </Text>
          
          <Text style={styles.paragraph}>
            By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
          </Text>
          
          <Text style={styles.sectionTitle}>11. Governing Law</Text>
          <Text style={styles.paragraph}>
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
          </Text>
          
          <Text style={styles.paragraph}>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have had between us regarding the Service.
          </Text>
          
          <Text style={styles.sectionTitle}>12. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions about these Terms, please contact us at:
          </Text>
          <Text style={styles.contactInfo}>
            Zen Healing{'\n'}
            Email: terms@zenhealing.com{'\n'}
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
  contactInfo: {
    fontSize: 15,
    lineHeight: 22,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginTop: 8,
    marginBottom: 40,
  },
});

export default TermsOfServiceScreen; 