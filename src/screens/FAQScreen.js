import React, { useState } from 'react';
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

// FAQ Accordion Component
const FAQItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity 
        style={styles.questionContainer} 
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <Text style={styles.question}>{question}</Text>
        <Ionicons 
          name={expanded ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color={ZEN_HEALING.COLORS.TEXT.SECONDARY} 
        />
      </TouchableOpacity>
      
      {expanded && (
        <View style={styles.answerContainer}>
          <Text style={styles.answer}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

const FAQScreen = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  // FAQ data
  const faqs = [
    {
      question: 'How do I book an appointment with a practitioner?',
      answer: 'To book an appointment, navigate to the Practitioners tab, select a practitioner of your choice, view their available time slots, and tap on your preferred appointment time. You will then be prompted to confirm the appointment details before finalizing the booking.'
    },
    {
      question: 'Can I cancel or reschedule my appointment?',
      answer: 'Yes, you can cancel or reschedule your appointment by going to the Appointments tab, selecting the appointment you wish to modify, and tapping on the "Cancel" or "Reschedule" button. Please note that some practitioners may have specific cancellation policies, which will be displayed during the cancellation process.'
    },
    {
      question: 'How do I become a practitioner on Zen Healing?',
      answer: 'To become a practitioner on our platform, tap on the Profile tab, and select the "Are you a practitioner?" option. From there, you can register as a practitioner by providing your professional details. Our team will review your application and contact you with further instructions.'
    },
    {
      question: 'Is my personal and health information secure?',
      answer: 'Yes, we take your privacy very seriously. All personal and health information is encrypted and stored securely. We comply with healthcare privacy regulations and do not share your information with third parties without your consent. You can review our Privacy Policy for more details.'
    },
    {
      question: 'What types of practitioners are available on Zen Healing?',
      answer: 'Zen Healing features a wide range of holistic healthcare practitioners including acupuncturists, naturopaths, massage therapists, nutritionists, chiropractors, yoga instructors, meditation coaches, and more. All practitioners on our platform are verified professionals in their field.'
    },
    {
      question: 'How do I pay for my appointments?',
      answer: 'Payments can be made directly through the app using various payment methods including credit/debit cards and digital wallets. After selecting your appointment time, you will be prompted to confirm the booking and complete the payment process.'
    },
    {
      question: 'Are virtual appointments available?',
      answer: 'Yes, many practitioners on our platform offer virtual appointments. When browsing practitioners, you can filter for those who offer virtual consultations. Virtual appointments are conducted through our secure in-app video conferencing feature.'
    },
    {
      question: 'How do I leave a review for a practitioner?',
      answer: 'After your appointment, you will receive a notification inviting you to leave a review. Alternatively, you can go to the practitioner\'s profile and tap on the "Leave a Review" button. Your feedback helps other users make informed decisions and helps practitioners improve their services.'
    },
    {
      question: 'What if I have technical issues with the app?',
      answer: 'If you experience any technical issues, go to the Profile tab and select "Contact Support". You can describe your issue in detail, and our technical support team will assist you as soon as possible. You can also email us directly at support@zenhealing.com.'
    },
    {
      question: 'Can I use Zen Healing on multiple devices?',
      answer: 'Yes, you can use your Zen Healing account on multiple devices. Simply download the app on your other device and log in with your account credentials. Your account information, appointments, and preferences will be synchronized across all your devices.'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={ZEN_HEALING.COLORS.TEXT.PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.subtitle}>
            Find answers to commonly asked questions about Zen Healing.
          </Text>
          
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              question={faq.question} 
              answer={faq.answer} 
            />
          ))}
          
          <View style={styles.moreQuestionsContainer}>
            <Text style={styles.moreQuestionsText}>
              Still have questions? Contact our support team for further assistance.
            </Text>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => navigation.navigate('ContactSupportScreen')}
            >
              <Text style={styles.contactButtonText}>Contact Support</Text>
            </TouchableOpacity>
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
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    marginBottom: 24,
    textAlign: 'center',
  },
  faqItem: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: ZEN_HEALING.COLORS.BORDER,
    borderRadius: 10,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    overflow: 'hidden',
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  question: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginRight: 8,
  },
  answerContainer: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: ZEN_HEALING.COLORS.BORDER,
  },
  answer: {
    fontSize: 15,
    lineHeight: 22,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
  },
  moreQuestionsContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
    padding: 16,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: ZEN_HEALING.COLORS.BORDER,
  },
  moreQuestionsText: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default FAQScreen; 