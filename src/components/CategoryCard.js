import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ZEN_HEALING } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * A component for displaying wellness category options
 * @param {Object} props
 * @param {string} props.title - The category title
 * @param {string} props.iconName - The Ionicons name for the category
 * @param {string} props.backgroundColor - Optional background color for the category
 * @param {function} props.onPress - Function to call when the category is pressed
 */
const CategoryCard = ({
  title,
  iconName,
  backgroundColor,
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        { backgroundColor: backgroundColor || ZEN_HEALING.COLORS.PRIMARY_LIGHT }
      ]} 
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Ionicons 
          name={iconName || 'leaf'} 
          size={24} 
          color={ZEN_HEALING.COLORS.PRIMARY} 
        />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 110,
    height: 110,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  }
});

export default CategoryCard; 