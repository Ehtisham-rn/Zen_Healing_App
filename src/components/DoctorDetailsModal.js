import React from 'react';
import { 
  View, 
  Text, 
  Modal, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Linking,
  Platform,
  Alert
} from 'react-native';
import { ZEN_HEALING } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

/**
 * A modal component to display complete doctor details
 * @param {Object} props
 * @param {boolean} props.visible - Whether the modal is visible
 * @param {function} props.onClose - Function to call when closing the modal
 * @param {Object} props.doctor - The doctor object with all details
 * @param {function} props.onBookPress - Function to call when booking button is pressed
 * @param {function} props.getSpecialityById - Function to get speciality name by ID
 * @param {function} props.getLocationById - Function to get location name by ID
 */
const DoctorDetailsModal = ({ 
  visible, 
  onClose, 
  doctor, 
  onBookPress,
  getSpecialityById,
  getLocationById
}) => {
  if (!doctor) return null;

  const specialityName = doctor.speciality ? doctor.speciality.name : getSpecialityById(doctor.speciality_id);
  const locationName = doctor.location ? doctor.location.name : getLocationById(doctor.location_id);
  
  // Status formatting
  const statusText = doctor.status ? 
    doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1) : 
    null;
  
  // Handle making a phone call
  const handleCall = () => {
    if (doctor.phone) {
      const phoneUrl = Platform.OS === 'android' 
        ? `tel:${doctor.phone}` 
        : `telprompt:${doctor.phone}`;
      Linking.openURL(phoneUrl).catch(err => console.error('Could not open phone app:', err));
    }
  };
  
  // Handle sending an email
  const handleEmail = () => {
    if (doctor.email) {
      Linking.openURL(`mailto:${doctor.email}`).catch(err => 
        console.error('Could not open email app:', err)
      );
    }
  };
  
  // Handle opening maps for address
  const handleAddress = () => {
    if (doctor.address) {
      const query = encodeURIComponent(doctor.address);
      const mapsUrl = Platform.OS === 'ios' 
        ? `maps://app?q=${query}` 
        : `geo:0,0?q=${query}`;
      Linking.openURL(mapsUrl).catch(err => 
        console.error('Could not open maps app:', err)
      );
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header with close button */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Doctor Profile</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color={ZEN_HEALING.COLORS.TEXT.PRIMARY} />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            style={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Doctor Profile Section */}
            <View style={styles.profileSection}>
              <View style={styles.avatarContainer}>
                {doctor.image_url ? (
                  <Image source={{ uri: doctor.image_url }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Ionicons name="person" size={60} color={ZEN_HEALING.COLORS.PRIMARY} />
                  </View>
                )}
              </View>
              
              <View style={styles.nameContainer}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <Text style={styles.speciality}>{specialityName}</Text>
                
                {/* Status Badge */}
                {statusText && (
                  <View style={[
                    styles.statusBadge,
                    doctor.status === 'accepted' && styles.statusAccepted,
                    doctor.status === 'pending' && styles.statusPending
                  ]}>
                    <Text style={styles.statusText}>{statusText}</Text>
                  </View>
                )}
              </View>
            </View>
            
            {/* Rating section - Only show if reviews are available */}
            {doctor.rating && (
              <View style={styles.ratingSection}>
                <View style={styles.ratingStars}>
                  <Ionicons name="star" size={20} color={ZEN_HEALING.COLORS.WARNING} />
                  <Ionicons name="star" size={20} color={ZEN_HEALING.COLORS.WARNING} />
                  <Ionicons name="star" size={20} color={ZEN_HEALING.COLORS.WARNING} />
                  <Ionicons name="star" size={20} color={ZEN_HEALING.COLORS.WARNING} />
                  <Ionicons name="star-half" size={20} color={ZEN_HEALING.COLORS.WARNING} />
                </View>
                <Text style={styles.ratingText}>{doctor.rating} {doctor.reviews_count ? `(${doctor.reviews_count} reviews)` : ''}</Text>
              </View>
            )}
            
            {/* Contact Info Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              
              <TouchableOpacity 
                style={styles.contactItem}
                onPress={handleEmail}
                disabled={!doctor.email}
              >
                <View style={styles.contactIconContainer}>
                  <Ionicons name="mail" size={20} color={ZEN_HEALING.COLORS.PRIMARY} />
                </View>
                <Text style={styles.contactText}>{doctor.email || 'No email available'}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.contactItem}
                onPress={handleCall}
                disabled={!doctor.phone}
              >
                <View style={styles.contactIconContainer}>
                  <Ionicons name="call" size={20} color={ZEN_HEALING.COLORS.PRIMARY} />
                </View>
                <Text style={styles.contactText}>{doctor.phone || 'No phone available'}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.contactItem}
                onPress={handleAddress}
                disabled={!doctor.address}
              >
                <View style={styles.contactIconContainer}>
                  <Ionicons name="location" size={20} color={ZEN_HEALING.COLORS.PRIMARY} />
                </View>
                <Text style={styles.contactText}>{doctor.address || 'No address available'}</Text>
              </TouchableOpacity>
              
              {locationName && (
                <View style={styles.contactItem}>
                  <View style={styles.contactIconContainer}>
                    <MaterialIcons name="location-city" size={20} color={ZEN_HEALING.COLORS.PRIMARY} />
                  </View>
                  <Text style={styles.contactText}>{locationName}</Text>
                </View>
              )}
            </View>
            
            {/* Symptoms Section */}
            {doctor.symptoms && doctor.symptoms.length > 0 && (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Specializes In</Text>
                <View style={styles.symptomsContainer}>
                  {doctor.symptoms.map((symptom, index) => (
                    <View key={index} style={styles.symptomTag}>
                      <Text style={styles.symptomText}>{symptom.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            
            {/* Description Section */}
            {doctor.description && (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.descriptionText}>{doctor.description}</Text>
              </View>
            )}
          </ScrollView>
          
          {/* Book Appointment Button */}
          <View style={styles.bookButtonContainer}>
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => {
                if (doctor && doctor.id) {
                  // Create a deep clone of the doctor object to avoid reference issues
                  const doctorData = JSON.parse(JSON.stringify(doctor));
                  onBookPress(doctorData);
                } else {
                  Alert.alert(
                    'Error',
                    'Cannot book appointment. Doctor information is incomplete.',
                    [{ text: 'OK' }]
                  );
                }
              }}
            >
              <Ionicons name="calendar-outline" size={20} color="white" style={styles.bookButtonIcon} />
              <Text style={styles.bookButtonText}>Book Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.PRIMARY,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    height: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: ZEN_HEALING.COLORS.BORDER,
    paddingVertical: 16,
    position: 'relative',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  scrollContent: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 4,
  },
  speciality: {
    fontSize: 16,
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
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  ratingStars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.TERTIARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactText: {
    flex: 1,
    fontSize: 16,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  symptomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  symptomTag: {
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY + '22', // Primary color with opacity
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  symptomText: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.PRIMARY,
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  bookButtonContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: ZEN_HEALING.COLORS.BORDER,
  },
  bookButton: {
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookButtonIcon: {
    marginRight: 8,
  },
});

export default DoctorDetailsModal; 