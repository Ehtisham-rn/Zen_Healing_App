import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ZEN_HEALING } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * A component for displaying appointment information
 * @param {Object} props
 * @param {string} props.practitionerName - Name of the practitioner
 * @param {string} props.practitionerImage - Image URI of the practitioner
 * @param {string} props.speciality - Practitioner's speciality
 * @param {string} props.date - Appointment date
 * @param {string} props.time - Appointment time
 * @param {string} props.status - Appointment status (upcoming, completed, cancelled)
 * @param {function} props.onPress - Function to call when the card is pressed
 */
const AppointmentCard = ({
  practitionerName,
  practitionerImage,
  speciality,
  date,
  time,
  status = 'upcoming',
  onPress
}) => {
  // Determine status color
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'upcoming':
        return ZEN_HEALING.COLORS.SUCCESS;
      case 'completed':
        return ZEN_HEALING.COLORS.PRIMARY;
      case 'cancelled':
        return ZEN_HEALING.COLORS.DANGER;
      default:
        return ZEN_HEALING.COLORS.SUCCESS;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        {practitionerImage ? (
          <Image 
            source={{ uri: practitionerImage }} 
            style={styles.image} 
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons 
              name="person" 
              size={24} 
              color={ZEN_HEALING.COLORS.PRIMARY} 
            />
          </View>
        )}
        
        <View style={styles.infoContainer}>
          <Text style={styles.practitionerName}>{practitionerName}</Text>
          <Text style={styles.speciality}>{speciality}</Text>
          
          <View style={styles.appointmentDetails}>
            <View style={styles.detailItem}>
              <Ionicons 
                name="calendar-outline" 
                size={14} 
                color={ZEN_HEALING.COLORS.TEXT.SECONDARY} 
              />
              <Text style={styles.detailText}>{date}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Ionicons 
                name="time-outline" 
                size={14} 
                color={ZEN_HEALING.COLORS.TEXT.SECONDARY} 
              />
              <Text style={styles.detailText}>{time}</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  practitionerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  speciality: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    marginBottom: 8,
  },
  appointmentDetails: {
    flexDirection: 'row',
    marginTop: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 12,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    marginLeft: 4,
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
    textTransform: 'capitalize',
  }
});

export default AppointmentCard; 