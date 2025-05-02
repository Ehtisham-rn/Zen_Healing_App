import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { ZEN_HEALING } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { 
  registerDoctor, 
  fetchSpecialities, 
  fetchLocations, 
  fetchSymptoms, 
  selectSpecialities, 
  selectLocations, 
  selectSymptoms,
  setMockData
} from '../../state/slices/doctorSlice';
import { mockSpecialities, mockLocations, mockSymptoms } from '../../utils/mockData';
import { Picker } from '@react-native-picker/picker';
import MultiSelect from '../../components/MultiSelect';
import CustomPicker from '../../components/CustomPicker';

// Debug flag - set to false to disable debugging
const DEBUG_MODE = false;

const DoctorRegisterScreen = ({ navigation }) => {
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [specialityId, setSpecialityId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form validation errors
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [specialityError, setSpecialityError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [symptomsError, setSymptomsError] = useState('');
  
  // Loading state
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const specialities = useSelector(selectSpecialities);
  const locations = useSelector(selectLocations);
  const symptoms = useSelector(selectSymptoms);
  const loadingStates = useSelector(state => state.doctor.loading);
  
  // Load data on initial mount
  useEffect(() => {
    dispatch(fetchSpecialities());
    dispatch(fetchLocations());
    dispatch(fetchSymptoms());
    
    // If no data is fetched in 3 seconds, fall back to mock data
    const timer = setTimeout(() => {
      if (specialities.length === 0 || locations.length === 0 || symptoms.length === 0) {
        dispatch(setMockData({
          specialities: mockSpecialities,
          locations: mockLocations,
          symptoms: mockSymptoms
        }));
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [dispatch]);
  
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  const handleLoginPress = () => {
    navigation.navigate('DoctorLoginScreen');
  };
  
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
    
    // Validate address
    if (!address.trim()) {
      setAddressError('Address is required');
      isValid = false;
    } else {
      setAddressError('');
    }
    
    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }
    
    // Validate speciality
    if (!specialityId) {
      setSpecialityError('Please select a speciality');
      isValid = false;
    } else {
      setSpecialityError('');
    }
    
    // Validate location
    if (!locationId) {
      setLocationError('Please select a location');
      isValid = false;
    } else {
      setLocationError('');
    }
    
    // Validate symptoms
    if (selectedSymptoms.length === 0) {
      setSymptomsError('Please select at least one symptom');
      isValid = false;
    } else {
      setSymptomsError('');
    }
    
    return isValid;
  };
  
  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare doctor data to match API expectations
      const doctorData = {
        name,
        email,
        phone,
        address,
        password: Number(password) || password, // Convert to number if possible
        speciality_id: Number(specialityId),
        location_id: Number(locationId),
        status: 'pending', // Default status for new doctors
        symptoms: selectedSymptoms.map(id => Number(id)) // Convert to numbers
      };
      
      // Dispatch register action
      const resultAction = await dispatch(registerDoctor(doctorData));
      
      if (registerDoctor.fulfilled.match(resultAction)) {
        // Registration successful
        Alert.alert(
          'Registration Successful',
          'Your account has been created. You will be redirected to the login screen.',
          [{ 
            text: 'OK', 
            onPress: () => {
              // Automatically navigate to login screen
              navigation.navigate('DoctorLoginScreen', { email: email });
            }
          }]
        );
      } else {
        // Registration failed
        const errorMessage = resultAction.payload || resultAction.error.message || 'Registration failed. Please try again.';
        Alert.alert('Registration Failed', errorMessage);
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert(
        'Error',
        error.message || 'An unexpected error occurred during registration. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };
  
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
          <Text style={styles.headerTitle}>Doctor Registration</Text>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.formSection}>
            <Text style={styles.subtitle}>
              Create a practitioner account to offer your services on Zen Healing
            </Text>
            
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
                editable={!loading}
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
                editable={!loading}
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
                editable={!loading}
              />
              {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
            </View>
            
            {/* Address Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={[styles.input, addressError ? styles.inputError : null]}
                placeholder="Enter your address"
                value={address}
                onChangeText={(text) => {
                  setAddress(text);
                  if (addressError) setAddressError('');
                }}
                placeholderTextColor={ZEN_HEALING.COLORS.TEXT.TERTIARY}
                editable={!loading}
              />
              {addressError ? <Text style={styles.errorText}>{addressError}</Text> : null}
            </View>
            
            {/* Speciality Picker */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Speciality</Text>
              {loadingStates.specialities ? (
                <View style={[styles.pickerContainer, styles.loadingContainer]}>
                  <ActivityIndicator size="small" color={ZEN_HEALING.COLORS.PRIMARY} />
                  <Text style={styles.loadingText}>Loading specialities...</Text>
                </View>
              ) : (
                <CustomPicker
                  items={specialities}
                  selectedValue={specialityId}
                  onValueChange={(value) => {
                    setSpecialityId(value);
                    if (specialityError) setSpecialityError('');
                  }}
                  placeholder="Select a speciality"
                  title="Select Speciality"
                  error={!!specialityError}
                  enabled={!loading}
                />
              )}
              {specialityError ? <Text style={styles.errorText}>{specialityError}</Text> : null}
            </View>
            
            {/* Location Picker */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Location</Text>
              {loadingStates.locations ? (
                <View style={[styles.pickerContainer, styles.loadingContainer]}>
                  <ActivityIndicator size="small" color={ZEN_HEALING.COLORS.PRIMARY} />
                  <Text style={styles.loadingText}>Loading locations...</Text>
                </View>
              ) : (
                <CustomPicker
                  items={locations}
                  selectedValue={locationId}
                  onValueChange={(value) => {
                    setLocationId(value);
                    if (locationError) setLocationError('');
                  }}
                  placeholder="Select a location"
                  title="Select Location"
                  error={!!locationError}
                  enabled={!loading}
                />
              )}
              {locationError ? <Text style={styles.errorText}>{locationError}</Text> : null}
            </View>
            
            {/* Symptoms Multi-Select */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Symptoms You Can Treat</Text>
              {loadingStates.symptoms ? (
                <View style={[styles.pickerContainer, styles.loadingContainer]}>
                  <ActivityIndicator size="small" color={ZEN_HEALING.COLORS.PRIMARY} />
                  <Text style={styles.loadingText}>Loading symptoms...</Text>
                </View>
              ) : (
                <MultiSelect
                  items={symptoms}
                  selectedItems={selectedSymptoms}
                  onSelectionChange={(selected) => {
                    setSelectedSymptoms(selected);
                    if (symptomsError) setSymptomsError('');
                  }}
                  placeholder="Select symptoms you can treat"
                  title="Select Symptoms"
                  error={!!symptomsError}
                />
              )}
              {symptomsError ? <Text style={styles.errorText}>{symptomsError}</Text> : null}
            </View>
            
            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={[styles.passwordContainer, passwordError ? styles.inputError : null]}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) setPasswordError('');
                  }}
                  secureTextEntry={!showPassword}
                  placeholderTextColor={ZEN_HEALING.COLORS.TEXT.TERTIARY}
                  editable={!loading}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={22}
                    color={ZEN_HEALING.COLORS.TEXT.SECONDARY}
                  />
                </TouchableOpacity>
              </View>
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>
            
            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={[styles.passwordContainer, confirmPasswordError ? styles.inputError : null]}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (confirmPasswordError) setConfirmPasswordError('');
                  }}
                  secureTextEntry={!showConfirmPassword}
                  placeholderTextColor={ZEN_HEALING.COLORS.TEXT.TERTIARY}
                  editable={!loading}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={22}
                    color={ZEN_HEALING.COLORS.TEXT.SECONDARY}
                  />
                </TouchableOpacity>
              </View>
              {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
            </View>
            
            {/* Register Button */}
            <TouchableOpacity
              style={[styles.registerButton, loading && styles.disabledButton]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.registerButtonText}>Register</Text>
              )}
            </TouchableOpacity>
            
            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={handleLoginPress}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
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
  formSection: {
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    marginBottom: 24,
    textAlign: 'center',
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
  inputError: {
    borderColor: ZEN_HEALING.COLORS.ERROR,
  },
  errorText: {
    color: ZEN_HEALING.COLORS.ERROR,
    fontSize: 12,
    marginTop: 4,
  },
  pickerContainer: {
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    borderWidth: 1,
    borderColor: ZEN_HEALING.COLORS.BORDER,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    height: 50,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  loadingText: {
    marginLeft: 8,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    borderWidth: 1,
    borderColor: ZEN_HEALING.COLORS.BORDER,
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  passwordToggle: {
    padding: 10,
  },
  registerButton: {
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 16,
  },
  disabledButton: {
    backgroundColor: `${ZEN_HEALING.COLORS.PRIMARY}80`,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginText: {
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    fontSize: 14,
  },
  loginLink: {
    color: ZEN_HEALING.COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DoctorRegisterScreen; 