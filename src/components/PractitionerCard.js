import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ZEN_HEALING } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * A simplified component for displaying practitioner information
 * @param {Object} props
 * @param {string} props.name - The name of the practitioner
 * @param {string} props.speciality - The practitioner's speciality
 * @param {string} props.imageUri - The URI for the practitioner's image
 * @param {string} props.status - The practitioner's status (active, pending, etc.)
 * @param {function} props.onPress - Function to call when the card is pressed
 */
const PractitionerCard = ({ 
  name, 
  speciality, 
  imageUri,
  status,
  onPress
}) => {
  // Format status for display if needed
  const statusText = status ? 
    status.charAt(0).toUpperCase() + status.slice(1) : 
    null;
    
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={40} color={ZEN_HEALING.COLORS.PRIMARY} />
          </View>
        )}
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.speciality}>{speciality}</Text>
        
        {statusText && (
          <View style={[
            styles.statusContainer, 
            status === 'accepted' && styles.statusAccepted,
            status === 'pending' && styles.statusPending
          ]}>
            <Text style={styles.statusText}>{statusText}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 260,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  imageContainer: {
    width: 70,
    height: 70,
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 4,
  },
  speciality: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    marginBottom: 8,
  },
  statusContainer: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
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
    fontSize: 10,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
});

export default PractitionerCard; 