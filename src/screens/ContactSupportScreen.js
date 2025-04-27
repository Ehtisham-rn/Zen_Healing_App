import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert
} from 'react-native';
import { ZEN_HEALING } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ContactSupportScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    // Validate inputs
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // In a real app, this would send the support request to a backend
    // For now, we'll just show a success message
    Alert.alert(
      'Message Sent',
      'Thank you for contacting support. We will get back to you as soon as possible.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={ZEN_HEALING.COLORS.TEXT.PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Support</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.subtitle}>
            Have a question or need help with something? Our support team is here to assist you.
          </Text>
          
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                placeholderTextColor={ZEN_HEALING.COLORS.TEXT.TERTIARY}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={ZEN_HEALING.COLORS.TEXT.TERTIARY}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Subject</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter subject"
                value={subject}
                onChangeText={setSubject}
                placeholderTextColor={ZEN_HEALING.COLORS.TEXT.TERTIARY}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Message</Text>
              <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Enter your message"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={5}
                placeholderTextColor={ZEN_HEALING.COLORS.TEXT.TERTIARY}
                textAlignVertical="top"
              />
            </View>
            
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.contactInfoContainer}>
            <Text style={styles.contactTitle}>Other Ways to Reach Us</Text>
            
            <View style={styles.contactMethod}>
              <Ionicons name="mail-outline" size={22} color={ZEN_HEALING.COLORS.PRIMARY} />
              <Text style={styles.contactText}>support@zenhealing.com</Text>
            </View>
            
            <View style={styles.contactMethod}>
              <Ionicons name="call-outline" size={22} color={ZEN_HEALING.COLORS.PRIMARY} />
              <Text style={styles.contactText}>(123) 456-7890</Text>
            </View>
            
            <View style={styles.contactMethod}>
              <Ionicons name="time-outline" size={22} color={ZEN_HEALING.COLORS.PRIMARY} />
              <Text style={styles.contactText}>Monday - Friday, 9:00 AM - 6:00 PM EST</Text>
            </View>
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
  formContainer: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 8,
  },
  input: {
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    borderWidth: 1,
    borderColor: ZEN_HEALING.COLORS.BORDER,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  messageInput: {
    height: 120,
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  contactInfoContainer: {
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 16,
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 15,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginLeft: 12,
  },
});

export default ContactSupportScreen; 