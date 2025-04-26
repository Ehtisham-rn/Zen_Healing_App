import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ZEN_HEALING } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * A component for displaying practitioner information
 * @param {Object} props
 * @param {string} props.name - The name of the practitioner
 * @param {string} props.speciality - The practitioner's speciality
 * @param {string} props.rating - The practitioner's rating
 * @param {string} props.imageUri - The URI for the practitioner's image
 * @param {string} props.status - The practitioner's status (active, pending, etc.)
 * @param {function} props.onPress - Function to call when the card is pressed
 * @param {function} props.onBookPress - Function to call when the book button is pressed
 */
const PractitionerCard = ({ 
  name, 
  speciality, 
  rating = "4.5", 
  imageUri,
  status,
  onPress,
  onBookPress
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
        
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color={ZEN_HEALING.COLORS.WARNING} />
          <Text style={styles.rating}>{rating}</Text>
        </View>
        
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
      
      <TouchableOpacity 
        style={styles.bookButton}
        onPress={(e) => {
          e.stopPropagation(); // Prevent triggering the card's onPress
          onBookPress ? onBookPress() : onPress();
        }}
      >
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
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
  bookButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 1,  // Ensure button is above other elements
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default PractitionerCard; 