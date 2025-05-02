import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Alert,
  SafeAreaView
} from 'react-native';
import { ZEN_HEALING, STORAGE_KEYS } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import * as storage from '../utils/storage';

// Menu item component for profile options
const ProfileMenuItem = ({ icon, iconType = 'Ionicons', title, subtitle, onPress, showChevron = true }) => {
  const renderIcon = () => {
    if (iconType === 'Ionicons') {
      return <Ionicons name={icon} size={24} color={ZEN_HEALING.COLORS.PRIMARY} />;
    } else if (iconType === 'MaterialIcons') {
      return <MaterialIcons name={icon} size={24} color={ZEN_HEALING.COLORS.PRIMARY} />;
    } else if (iconType === 'FontAwesome') {
      return <FontAwesome name={icon} size={24} color={ZEN_HEALING.COLORS.PRIMARY} />;
    }
    return null;
  };

  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIconContainer}>
        {renderIcon()}
      </View>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {showChevron && (
        <Ionicons name="chevron-forward" size={20} color={ZEN_HEALING.COLORS.TEXT.TERTIARY} />
      )}
    </TouchableOpacity>
  );
};

const ProfileScreen = ({ navigation }) => {
  // Get current user state
  const doctorInfo = useSelector(state => state.doctor?.currentDoctor);
  const isLoggedIn = !!doctorInfo;
  
  // Navigation handlers
  const handleDoctorLogin = () => {
    navigation.navigate('DoctorLoginScreen');
  };
  
  const handleDoctorRegister = () => {
    navigation.navigate('DoctorRegisterScreen');
  };
  
  const handlePrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicyScreen');
  };
  
  const handleTermsOfService = () => {
    navigation.navigate('TermsOfServiceScreen');
  };
  
  const handleAboutUs = () => {
    navigation.navigate('AboutScreen');
  };
  
  const handleContactSupport = () => {
    navigation.navigate('ContactSupportScreen');
  };
  
  const handleFAQ = () => {
    navigation.navigate('FAQScreen');
  };
  
  const handleDoctorProfile = () => {
    navigation.navigate('DoctorProfileScreen');
  };
  
  const handleDoctorAppointments = () => {
    navigation.navigate('DoctorAppointmentsScreen');
  };
  
  // Handle doctor logout
  const handleLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              // Remove stored credentials
              await storage.removeData(STORAGE_KEYS.DOCTOR_INFO);
              await storage.removeData(STORAGE_KEYS.AUTH_TOKEN);
              await storage.removeData(STORAGE_KEYS.DOCTOR_APPOINTMENTS);
              
              // Dispatch logout action
              // You would need to uncomment this if using Redux
              // dispatch(doctorLogout());
              
              Alert.alert('Success', 'You have been logged out successfully.');
              
              // You could also navigate to a specific screen after logout if needed
              // navigation.navigate('HomeScreen');
            } catch (error) {
              Alert.alert('Error', 'An error occurred while logging out.');
              console.error('Logout error:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Doctor Info or Login Options */}
        <View style={styles.section}>
          {isLoggedIn ? (
            // Doctor logged in view
            <View style={styles.doctorInfoContainer}>
              <View style={styles.doctorAvatarContainer}>
                <Image
                  source={{ uri: doctorInfo.image_url || 'https://via.placeholder.com/100' }}
                  style={styles.doctorAvatar}
                />
              </View>
              <View style={styles.doctorDetails}>
                <Text style={styles.doctorName}>{doctorInfo.name}</Text>
                <Text style={styles.doctorEmail}>{doctorInfo.email}</Text>
                <Text style={styles.doctorStatus}>
                  Status: <Text style={styles.statusText}>{doctorInfo.status}</Text>
                </Text>
              </View>
            </View>
          ) : (
            // Doctor login/register options
            <View style={styles.loginOptionsContainer}>
              <Text style={styles.loginTitle}>Are you a practitioner?</Text>
              <Text style={styles.loginSubtitle}>Login or register to manage your profile and appointments</Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.authButton, styles.loginButton]} 
                  onPress={handleDoctorLogin}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.authButton, styles.registerButton]} 
                  onPress={handleDoctorRegister}
                >
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        
        {/* Doctor-specific options (when logged in) */}
        {isLoggedIn && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Doctor Portal</Text>
            <ProfileMenuItem 
              icon="person" 
              title="My Profile" 
              subtitle="Manage your doctor profile information" 
              onPress={handleDoctorProfile}
            />
            <ProfileMenuItem 
              icon="calendar" 
              title="My Appointments" 
              subtitle="View and manage your appointments" 
              onPress={handleDoctorAppointments}
            />
            <ProfileMenuItem 
              icon="log-out-outline" 
              title="Logout" 
              subtitle="Sign out from your doctor account" 
              onPress={handleLogout}
            />
          </View>
        )}
        
        {/* Help & Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help & Support</Text>
          <ProfileMenuItem 
            icon="help-circle-outline" 
            title="FAQs" 
            subtitle="Frequently asked questions" 
            onPress={handleFAQ}
          />
          <ProfileMenuItem 
            icon="mail-outline" 
            title="Contact Support" 
            subtitle="Get help with using the app" 
            onPress={handleContactSupport}
          />
        </View>
        
        {/* About & Legal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About & Legal</Text>
          <ProfileMenuItem 
            icon="information-circle-outline" 
            title="About Us" 
            subtitle="Learn about Zen Healing" 
            onPress={handleAboutUs}
          />
          <ProfileMenuItem 
            icon="document-text-outline" 
            title="Privacy Policy" 
            subtitle="How we handle your data" 
            onPress={handlePrivacyPolicy}
          />
          <ProfileMenuItem 
            icon="document-text-outline" 
            title="Terms of Service" 
            subtitle="Legal agreements for using our app" 
            onPress={handleTermsOfService}
          />
        </View>
        
        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Zen Healing v1.0.0</Text>
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
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: ZEN_HEALING.COLORS.BORDER,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  content: {
    flex: 1,
  },
  section: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    marginVertical: 12,
    marginHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: ZEN_HEALING.COLORS.BORDER,
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    fontWeight: '500',
  },
  menuSubtitle: {
    fontSize: 13,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    marginTop: 4,
  },
  doctorInfoContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  doctorAvatarContainer: {
    marginRight: 16,
  },
  doctorAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.TERTIARY,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 4,
  },
  doctorEmail: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    marginBottom: 6,
  },
  doctorStatus: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
  },
  statusText: {
    fontWeight: '600',
    color: ZEN_HEALING.COLORS.PRIMARY,
  },
  loginOptionsContainer: {
    padding: 16,
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  authButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  loginButton: {
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY,
  },
  registerButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: ZEN_HEALING.COLORS.PRIMARY,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButtonText: {
    color: ZEN_HEALING.COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionContainer: {
    padding: 24,
    alignItems: 'center',
  },
  versionText: {
    color: ZEN_HEALING.COLORS.TEXT.TERTIARY,
    fontSize: 14,
  },
});

export default ProfileScreen; 