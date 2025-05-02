import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Linking
} from 'react-native';
import { ZEN_HEALING } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import zenHealingApi from '../../services/zenHealingApi';
import { logError } from '../../utils/errorHandler';

const DoctorDashboardScreen = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Get doctor data from Redux store
  const doctorInfo = useSelector(state => state.doctor?.currentDoctor);
  const dispatch = useDispatch();
  
  // Fetch doctor's appointments
  const fetchAppointments = async () => {
    if (!doctorInfo?.id) return;
    
    // If we already have appointments from the login response, use those first
    if (doctorInfo.doctor_appointments && Array.isArray(doctorInfo.doctor_appointments) && doctorInfo.doctor_appointments.length > 0) {
      console.log('Using doctor_appointments from login response:', doctorInfo.doctor_appointments);
      setAppointments(doctorInfo.doctor_appointments);
      setLoading(false);
      setRefreshing(false);
      return;
    }
    
    // Otherwise, fetch appointments from the API
    setLoading(true);
    try {
      const response = await zenHealingApi.appointments.getForDoctor(doctorInfo.id);
      if (response && Array.isArray(response)) {
        setAppointments(response);
      }
    } catch (error) {
      logError('Error fetching appointments', error);
      Alert.alert('Error', 'Failed to load appointments. Please try again later.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  // Initial data fetch
  useEffect(() => {
    fetchAppointments();
  }, [doctorInfo]);
  
  // Handle pull-to-refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchAppointments();
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Format time for display
  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    return timeString;
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return ZEN_HEALING.COLORS.SUCCESS;
      case 'pending':
        return ZEN_HEALING.COLORS.WARNING;
      case 'cancelled':
        return ZEN_HEALING.COLORS.ERROR;
      default:
        return ZEN_HEALING.COLORS.TEXT.SECONDARY;
    }
  };
  
  // Handle opening website
  const handleOpenWebsite = (url) => {
    if (url) {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      Linking.openURL(url);
    }
  };
  
  // Render appointment card
  const renderAppointmentCard = (appointment) => {
    return (
      <View key={appointment.id} style={styles.appointmentCard}>
        <View style={styles.appointmentHeader}>
          <Text style={styles.appointmentDate}>
            {formatDate(appointment.booking_date || appointment.date)}
          </Text>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: getStatusColor(appointment.status) + '20' }
          ]}>
            <Text style={[
              styles.statusText,
              { color: getStatusColor(appointment.status) }
            ]}>
              {appointment.status}
            </Text>
          </View>
        </View>
        
        <View style={styles.appointmentDetails}>
          <View style={styles.appointmentDetail}>
            <Ionicons name="time-outline" size={16} color={ZEN_HEALING.COLORS.TEXT.SECONDARY} />
            <Text style={styles.appointmentDetailText}>
              {formatTime(appointment.booking_time || appointment.time)}
            </Text>
          </View>
          
          <View style={styles.appointmentDetail}>
            <Ionicons name="person-outline" size={16} color={ZEN_HEALING.COLORS.TEXT.SECONDARY} />
            <Text style={styles.appointmentDetailText}>
              {appointment.name || (appointment.patient && appointment.patient.name) || 'Unknown Patient'}
            </Text>
          </View>
          
          {appointment.message && (
            <View style={styles.appointmentDetail}>
              <Ionicons name="chatbubble-outline" size={16} color={ZEN_HEALING.COLORS.TEXT.SECONDARY} />
              <Text style={styles.appointmentDetailText} numberOfLines={2}>
                {appointment.message}
              </Text>
            </View>
          )}
          
          {appointment.symptoms && (
            <View style={styles.appointmentDetail}>
              <Ionicons name="medical-outline" size={16} color={ZEN_HEALING.COLORS.TEXT.SECONDARY} />
              <Text style={styles.appointmentDetailText} numberOfLines={1}>
                {Array.isArray(appointment.symptoms) 
                  ? appointment.symptoms.map(s => s.name).join(', ')
                  : appointment.symptoms || 'No symptoms specified'}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };
  
  // If no doctor info, redirect to login
  if (!doctorInfo) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Please log in to access your dashboard
          </Text>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('DoctorLoginScreen')}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Doctor Dashboard</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[ZEN_HEALING.COLORS.PRIMARY]}
          />
        }
      >
        {/* Doctor Complete Profile */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              {doctorInfo.image_url ? (
                <Image 
                  source={{ uri: doctorInfo.image_url }} 
                  style={styles.profileImage} 
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person" size={40} color={ZEN_HEALING.COLORS.PRIMARY} />
                </View>
              )}
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.doctorName}>{doctorInfo.name}</Text>
              <Text style={styles.doctorEmail}>{doctorInfo.email}</Text>
              <View style={[
                styles.statusBadge,
                doctorInfo.status === 'accepted' || doctorInfo.status === 'active' ? styles.statusAccepted : styles.statusPending
              ]}>
                <Text style={styles.statusText}>
                  {doctorInfo.status?.charAt(0).toUpperCase() + doctorInfo.status?.slice(1) || 'Unknown'}
                </Text>
              </View>
            </View>
          </View>
          
          {/* Doctor Extended Information */}
          <View style={styles.profileExtended}>
            {doctorInfo.speciality_id && (
              <View style={styles.profileDetailItem}>
                <View style={styles.profileDetailIcon}>
                  <Ionicons name="medical-outline" size={20} color={ZEN_HEALING.COLORS.PRIMARY} />
                </View>
                <View style={styles.profileDetailContent}>
                  <Text style={styles.profileDetailLabel}>Speciality</Text>
                  <Text style={styles.profileDetailValue}>
                    {doctorInfo.speciality?.name || doctorInfo.speciality_name || 'Specialist'}
                  </Text>
                </View>
              </View>
            )}
            
            {doctorInfo.location_id && (
              <View style={styles.profileDetailItem}>
                <View style={styles.profileDetailIcon}>
                  <Ionicons name="location-outline" size={20} color={ZEN_HEALING.COLORS.PRIMARY} />
                </View>
                <View style={styles.profileDetailContent}>
                  <Text style={styles.profileDetailLabel}>Location</Text>
                  <Text style={styles.profileDetailValue}>
                    {doctorInfo.location?.name || doctorInfo.location_name || doctorInfo.address || 'Not specified'}
                  </Text>
                </View>
              </View>
            )}
            
            {doctorInfo.phone && (
              <View style={styles.profileDetailItem}>
                <View style={styles.profileDetailIcon}>
                  <Ionicons name="call-outline" size={20} color={ZEN_HEALING.COLORS.PRIMARY} />
                </View>
                <View style={styles.profileDetailContent}>
                  <Text style={styles.profileDetailLabel}>Phone</Text>
                  <Text style={styles.profileDetailValue}>{doctorInfo.phone}</Text>
                </View>
              </View>
            )}
            
            {doctorInfo.website && (
              <TouchableOpacity 
                style={styles.profileDetailItem}
                onPress={() => handleOpenWebsite(doctorInfo.website)}
              >
                <View style={styles.profileDetailIcon}>
                  <Ionicons name="globe-outline" size={20} color={ZEN_HEALING.COLORS.PRIMARY} />
                </View>
                <View style={styles.profileDetailContent}>
                  <Text style={styles.profileDetailLabel}>Website</Text>
                  <Text style={[styles.profileDetailValue, styles.websiteText]}>{doctorInfo.website}</Text>
                </View>
              </TouchableOpacity>
            )}
            
            {doctorInfo.bio && (
              <View style={styles.bioContainer}>
                <Text style={styles.bioLabel}>About</Text>
                <Text style={styles.bioText}>{doctorInfo.bio}</Text>
              </View>
            )}
            
            {/* Social Media Links */}
            {(doctorInfo.facebook || doctorInfo.twitter || doctorInfo.instagram || doctorInfo.linkedin) && (
              <View style={styles.socialMediaContainer}>
                {doctorInfo.facebook && (
                  <TouchableOpacity 
                    style={styles.socialMediaIcon}
                    onPress={() => handleOpenWebsite(doctorInfo.facebook)}
                  >
                    <FontAwesome name="facebook" size={20} color={ZEN_HEALING.COLORS.PRIMARY} />
                  </TouchableOpacity>
                )}
                {doctorInfo.twitter && (
                  <TouchableOpacity 
                    style={styles.socialMediaIcon}
                    onPress={() => handleOpenWebsite(doctorInfo.twitter)}
                  >
                    <FontAwesome name="twitter" size={20} color={ZEN_HEALING.COLORS.PRIMARY} />
                  </TouchableOpacity>
                )}
                {doctorInfo.instagram && (
                  <TouchableOpacity 
                    style={styles.socialMediaIcon}
                    onPress={() => handleOpenWebsite(doctorInfo.instagram)}
                  >
                    <FontAwesome name="instagram" size={20} color={ZEN_HEALING.COLORS.PRIMARY} />
                  </TouchableOpacity>
                )}
                {doctorInfo.linkedin && (
                  <TouchableOpacity 
                    style={styles.socialMediaIcon}
                    onPress={() => handleOpenWebsite(doctorInfo.linkedin)}
                  >
                    <FontAwesome name="linkedin" size={20} color={ZEN_HEALING.COLORS.PRIMARY} />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
        
        {/* All Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Appointments</Text>
          </View>
          
          {loading ? (
            <ActivityIndicator 
              size="large" 
              color={ZEN_HEALING.COLORS.PRIMARY} 
              style={styles.loader} 
            />
          ) : appointments.length > 0 ? (
            appointments.map(appointment => renderAppointmentCard(appointment))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                You have no appointments
              </Text>
            </View>
          )}
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
  scrollContent: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  profileImageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.TERTIARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
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
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.TERTIARY,
  },
  statusAccepted: {
    backgroundColor: ZEN_HEALING.COLORS.SUCCESS + '33', // With opacity
  },
  statusPending: {
    backgroundColor: ZEN_HEALING.COLORS.WARNING + '33', // With opacity
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  profileExtended: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: ZEN_HEALING.COLORS.BORDER,
    paddingTop: 16,
  },
  profileDetailItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  profileDetailIcon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  profileDetailContent: {
    flex: 1,
  },
  profileDetailLabel: {
    fontSize: 12,
    color: ZEN_HEALING.COLORS.TEXT.TERTIARY,
    marginBottom: 2,
  },
  profileDetailValue: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  websiteText: {
    color: ZEN_HEALING.COLORS.PRIMARY,
  },
  bioContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  bioLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 8,
  },
  bioText: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    lineHeight: 20,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  socialMediaIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.TERTIARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  section: {
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  loader: {
    marginVertical: 20,
  },
  appointmentCard: {
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.PRIMARY,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: ZEN_HEALING.COLORS.BORDER,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  appointmentDate: {
    fontSize: 14,
    fontWeight: '600',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  appointmentDetails: {
    gap: 8,
  },
  appointmentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appointmentDetailText: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyStateText: {
    fontSize: 16,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    textAlign: 'center',
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DoctorDashboardScreen; 