import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal
} from 'react-native';
import { ZEN_HEALING } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { useAppointments } from '../hooks/useAppointments';
import { selectCreateAppointmentLoading } from '../state/slices/appointmentSlice';

/**
 * Book Appointment Screen
 * Allows a user to book an appointment with a selected doctor
 */
const BookAppointmentScreen = ({ navigation, route }) => {
  // Get doctor information passed from the previous screen
  const doctor = route.params?.doctor;
  
  // Get appointments functionality from hook
  const { bookAppointment } = useAppointments();
  const dispatch = useDispatch();
  
  // Appointment form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [bookingDate, setBookingDate] = useState(new Date());
  const [bookingTime, setBookingTime] = useState(new Date());
  
  // Form validation errors
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  
  // Date and time picker state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  // Loading state
  const isLoading = useSelector(selectCreateAppointmentLoading);
  
  // Navigate back to previous screen
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Format time for API (HH:MM:SS)
  const formatTimeForApi = (date) => {
    return date.toTimeString().split(' ')[0];
  };
  
  // Format date for API (YYYY-MM-DD)
  const formatDateForApi = (date) => {
    return date.toISOString().split('T')[0];
  };
  
  // Handle date change from picker
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || bookingDate;
    setShowDatePicker(false);
    setBookingDate(currentDate);
  };
  
  // Handle time change from picker
  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || bookingTime;
    setShowTimePicker(false);
    setBookingTime(currentTime);
  };
  
  // Show date picker
  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };
  
  // Show time picker
  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };
  
  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    
    // Validate name
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    
    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    // Validate phone
    if (!phone.trim()) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (!/^[0-9]{7,15}$/.test(phone.replace(/[^0-9]/g, ''))) {
      setPhoneError('Please enter a valid phone number');
      isValid = false;
    } else {
      setPhoneError('');
    }
    
    return isValid;
  };
  
  // Handle form submission
  const handleBookAppointment = async () => {
    if (!validateForm()) {
      return;
    }
    
    // Prepare appointment data
    const appointmentData = {
      doctor_id: doctor.id,
      name,
      email,
      phone,
      booking_date: formatDateForApi(bookingDate),
      booking_time: formatTimeForApi(bookingTime),
      message: message.trim(),
      status: 'pending' // Default status for new appointments
    };
    
    try {
      // Book appointment
      const resultAction = await bookAppointment(appointmentData);
      
      if (resultAction.meta.requestStatus === 'fulfilled') {
        // Appointment booked successfully
        Alert.alert(
          'Appointment Booked',
          'Your appointment has been scheduled successfully.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        // Error booking appointment
        const errorMessage = resultAction.payload || 'Failed to book appointment. Please try again.';
        Alert.alert('Booking Failed', errorMessage);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error.message || 'An error occurred while booking the appointment. Please try again.'
      );
    }
  };
  
  // Filter out past dates for date picker
  const filterPastDates = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };
  
  // Make sure tomorrow is the default date
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingDate(tomorrow);
    
    // Default time to 9:00 AM
    const defaultTime = new Date();
    defaultTime.setHours(9, 0, 0, 0);
    setBookingTime(defaultTime);
  }, []);
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={ZEN_HEALING.COLORS.TEXT.PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Appointment</Text>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {doctor && (
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.doctorSpeciality}>
                {doctor.speciality ? doctor.speciality.name : ''}
              </Text>
            </View>
          )}
          
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Appointment Details</Text>
            
            {/* Date Picker */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Date</Text>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={showDatePickerModal}
                disabled={isLoading}
              >
                <Text style={styles.dateTimeText}>{formatDate(bookingDate)}</Text>
                <Ionicons name="calendar-outline" size={20} color={ZEN_HEALING.COLORS.PRIMARY} />
              </TouchableOpacity>
              
              {showDatePicker && (
                <DateTimePicker
                  value={bookingDate}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                  minimumDate={new Date()}
                />
              )}
            </View>
            
            {/* Time Picker */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Time</Text>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={showTimePickerModal}
                disabled={isLoading}
              >
                <Text style={styles.dateTimeText}>{formatTime(bookingTime)}</Text>
                <Ionicons name="time-outline" size={20} color={ZEN_HEALING.COLORS.PRIMARY} />
              </TouchableOpacity>
              
              {showTimePicker && (
                <DateTimePicker
                  value={bookingTime}
                  mode="time"
                  display="default"
                  onChange={onTimeChange}
                />
              )}
            </View>
            
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={[styles.input, nameError ? styles.inputError : null]}
                placeholder="Enter your full name"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (nameError) setNameError('');
                }}
                placeholderTextColor={ZEN_HEALING.COLORS.TEXT.TERTIARY}
                editable={!isLoading}
              />
              {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
            </View>
            
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={[styles.input, emailError ? styles.inputError : null]}
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) setEmailError('');
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor={ZEN_HEALING.COLORS.TEXT.TERTIARY}
                editable={!isLoading}
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>
            
            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={[styles.input, phoneError ? styles.inputError : null]}
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={(text) => {
                  setPhone(text);
                  if (phoneError) setPhoneError('');
                }}
                keyboardType="phone-pad"
                placeholderTextColor={ZEN_HEALING.COLORS.TEXT.TERTIARY}
                editable={!isLoading}
              />
              {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
            </View>
            
            {/* Message Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Message (Optional)</Text>
              <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Enter any specific details or concerns"
                value={message}
                onChangeText={setMessage}
                placeholderTextColor={ZEN_HEALING.COLORS.TEXT.TERTIARY}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!isLoading}
              />
            </View>
            
            <View style={styles.termsContainer}>
              <Ionicons name="information-circle-outline" size={18} color={ZEN_HEALING.COLORS.TEXT.SECONDARY} />
              <Text style={styles.termsText}>
                By booking this appointment, you agree to our 
                <Text style={styles.termsLink}> Terms & Conditions</Text> and 
                <Text style={styles.termsLink}> Cancellation Policy</Text>.
              </Text>
            </View>
            
            <TouchableOpacity
              style={[styles.bookButton, isLoading && styles.disabledButton]}
              onPress={handleBookAppointment}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.bookButtonText}>Book Appointment</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
  doctorInfo: {
    padding: 16,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.TERTIARY,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 4,
  },
  doctorSpeciality: {
    fontSize: 16,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 16,
    marginTop: 8,
  },
  inputContainer: {
    marginBottom: 20,
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
    paddingVertical: 12,
    fontSize: 15,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  messageInput: {
    height: 100,
    paddingTop: 12,
  },
  inputError: {
    borderColor: ZEN_HEALING.COLORS.ERROR,
  },
  errorText: {
    color: ZEN_HEALING.COLORS.ERROR,
    fontSize: 12,
    marginTop: 4,
  },
  dateTimeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    borderWidth: 1,
    borderColor: ZEN_HEALING.COLORS.BORDER,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  dateTimeText: {
    fontSize: 15,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  termsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    marginLeft: 8,
  },
  termsLink: {
    color: ZEN_HEALING.COLORS.PRIMARY,
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: `${ZEN_HEALING.COLORS.PRIMARY}80`,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BookAppointmentScreen; 