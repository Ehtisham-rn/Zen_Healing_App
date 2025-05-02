import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { ZEN_HEALING } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * TagCard Component
 * Displays a tag/card for specialties or symptoms with an icon
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Name to display on the tag
 * @param {string} props.iconName - Name of the icon to display (Ionicons)
 * @param {string} props.iconType - Type of icon (Ionicons, FontAwesome5, MaterialCommunityIcons)
 * @param {string} props.backgroundColor - Background color of the tag
 * @param {Function} props.onPress - Function to call when tag is pressed
 * @param {number} props.id - ID of the item (specialty/symptom) for filtering
 * @param {string} props.type - Type of tag (specialty/symptom)
 */
const TagCard = ({
  name,
  iconName = 'medical',
  iconType = 'Ionicons',
  backgroundColor = ZEN_HEALING.COLORS.BACKGROUND.TERTIARY,
  onPress,
  id,
  type
}) => {
  // Render the appropriate icon based on iconType
  const renderIcon = () => {
    const iconSize = 20;
    const iconColor = ZEN_HEALING.COLORS.PRIMARY;
    
    switch (iconType) {
      case 'FontAwesome5':
        return <FontAwesome5 name={iconName} size={iconSize} color={iconColor} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} />;
      case 'Ionicons':
      default:
        return <Ionicons name={iconName} size={iconSize} color={iconColor} />;
    }
  };
  
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={() => onPress && onPress({ id, name, type })}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <Text style={styles.name}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: ZEN_HEALING.COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 150,
    width: 'auto',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
});

export default TagCard; 