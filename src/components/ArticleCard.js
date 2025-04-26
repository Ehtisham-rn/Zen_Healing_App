import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ZEN_HEALING } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * A component for displaying wellness article information
 * @param {Object} props
 * @param {string} props.title - Article title
 * @param {string} props.excerpt - Brief description of the article
 * @param {string} props.date - Publication date
 * @param {string} props.imageUri - Image URI for the article
 * @param {string} props.category - Article category
 * @param {number} props.readTime - Estimated read time in minutes
 * @param {function} props.onPress - Function to call when the article is pressed
 */
const ArticleCard = ({
  title,
  excerpt,
  date,
  imageUri,
  category = 'Wellness',
  readTime = 5,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image 
          source={imageUri ? { uri: imageUri } : require('../../assets/welcome.png')} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.excerpt} numberOfLines={2}>{excerpt}</Text>
        
        <View style={styles.metaContainer}>
          <Text style={styles.date}>{date}</Text>
          <View style={styles.readTimeContainer}>
            <Ionicons name="time-outline" size={12} color={ZEN_HEALING.COLORS.TEXT.SECONDARY} />
            <Text style={styles.readTime}>{readTime} min read</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: ZEN_HEALING.COLORS.PRIMARY,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 8,
  },
  excerpt: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    marginBottom: 16,
    lineHeight: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: ZEN_HEALING.COLORS.TEXT.DISABLED,
  },
  readTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTime: {
    fontSize: 12,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    marginLeft: 4,
  }
});

export default ArticleCard; 