import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ZEN_HEALING } from '../constants';

/**
 * A reusable section component with a title, optional "See All" button, and content
 * @param {Object} props
 * @param {string} props.title - The section title
 * @param {boolean} props.showSeeAll - Whether to show the "See All" button
 * @param {function} props.onSeeAllPress - Function to call when "See All" is pressed
 * @param {React.ReactNode} props.children - The content of the section
 * @param {Object} props.style - Additional styles for the container
 */
const CardSection = ({ 
  title, 
  showSeeAll = true, 
  onSeeAllPress, 
  children, 
  style 
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {showSeeAll && (
          <TouchableOpacity onPress={onSeeAllPress}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  seeAllText: {
    color: ZEN_HEALING.COLORS.PRIMARY,
    fontSize: 14,
  },
});

export default CardSection; 