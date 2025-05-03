import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import { ZEN_HEALING } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import useDoctors from '../../hooks/useDoctors';
import useArticles from '../../hooks/useArticles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../constants';
import { updateOnboarding } from '../../state/slices/appSlice';
import GradientView from '../../components/GradientView';
import * as storage from '../../utils/storage';

// Import our custom components
import CardSection from '../../components/CardSection';
import CategoryCard from '../../components/CategoryCard';
import PractitionerCard from '../../components/PractitionerCard';
import ArticleCard from '../../components/ArticleCard';
import TagCard from '../../components/TagCard';
import FloatingActionButton from '../../components/FloatingActionButton';
import DoctorDetailsModal from '../../components/DoctorDetailsModal';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { 
    allDoctors, 
    featuredDoctors,
    specialities, 
    symptoms,
    locations,
    initializeData, 
    isInitialized,
    getSpecialityById,
    getLocationById,
    getSymptomById,
    filterDoctors
  } = useDoctors();
  
  // Add articles hook
  const { featuredArticles, loading: loadingArticles } = useArticles();
  
  // State for doctor details modal
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Add state for search input
  const [searchInput, setSearchInput] = useState('');

  // Initialize data on first render
  useEffect(() => {
    if (!isInitialized) {
      initializeData();
    }
  }, [isInitialized, initializeData]);

  // Reset onboarding
  const resetOnboarding = async () => {
    try {
      await storage.storeData(STORAGE_KEYS.ONBOARDING_COMPLETED, 'false');
      dispatch(updateOnboarding({ completed: false }));
      navigation.replace('OnboardingStack');
    } catch (error) {
      console.error('Failed to reset onboarding:', error);
    }
  };

  // Open doctor details modal
  const handleOpenModal = (doctor) => {
    setSelectedDoctor(doctor);
    setModalVisible(true);
  };

  // Close doctor details modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedDoctor(null);
  };

  // Navigate to practitioners screen
  const handleSeeAllPractitioners = () => {
    // Navigate to practitioners screen
    navigation.navigate('PractitionersScreen');
  };

  // Handle search submit
  const handleSearchSubmit = () => {
    // Navigate to practitioners screen with search query if not empty
    if (searchInput.trim()) {
      navigation.navigate('PractitionersScreen', { searchQuery: searchInput.trim() });
    } else {
      navigation.navigate('PractitionersScreen');
    }
  };

  // Navigate to articles screen
  const handleSeeAllArticles = () => {
    // Navigate to articles screen
    navigation.navigate('ArticlesScreen');
  };

  // Navigate to specialities screen
  const handleSeeAllSpecialities = () => {
    // Navigate to practitioners screen with speciality filter
    navigation.navigate('PractitionersScreen', { filter: { type: 'speciality' } });
  };

  // Navigate to symptoms screen
  const handleSeeAllSymptoms = () => {
    // Navigate to practitioners screen with symptom filter
    navigation.navigate('PractitionersScreen', { filter: { type: 'symptom' } });
  };

  // Handle category card press
  const handleCategoryPress = (category) => {
    // Navigate to practitioners screen with category filter
    navigation.navigate('PractitionersScreen', { filter: { type: 'category', value: category } });
  };

  // Handle practitioner card press
  const handlePractitionerPress = (practitioner) => {
    // Open practitioner details modal
    handleOpenModal(practitioner);
  };

  // Navigate to book appointment screen
  const handleBookAppointment = (doctor) => {
    // Close modal
    handleCloseModal();
    // Navigate to book appointment screen
    navigation.navigate('BookAppointmentScreen', { doctor });
  };

  // Navigate to article details
  const handleArticlePress = (article) => {
    navigation.navigate('ArticleDetailScreen', { articleId: article.id });
  };

  // Quick book appointment button
  const handleQuickBookPress = () => {
    // Navigate to practitioners screen
    navigation.navigate('PractitionersScreen');
  };

  // Handle specialty or symptom tag press
  const handleTagPress = (item) => {
    if (item.type === 'specialty') {
      // Navigate to practitioners screen with specialty filter
      navigation.navigate('PractitionersScreen', { 
        filter: { type: 'specialty', id: item.id, name: item.name }
      });
    } else if (item.type === 'symptom') {
      // Navigate to practitioners screen with symptom filter
      navigation.navigate('PractitionersScreen', { 
        filter: { type: 'symptom', id: item.id, name: item.name }
      });
    }
  };

  // Get icon name for specialty based on name
  const getSpecialtyIconName = (name) => {
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('yoga')) return 'body-outline';
    if (lowercaseName.includes('meditation')) return 'brain'; 
    if (lowercaseName.includes('massage')) return 'hand-left-outline';
    if (lowercaseName.includes('nutrition')) return 'nutrition-outline';
    if (lowercaseName.includes('acupuncture')) return 'fitness-outline';
    if (lowercaseName.includes('therapy')) return 'heart-outline';
    if (lowercaseName.includes('coach')) return 'people-outline';
    return 'medkit-outline';
  };

  // Get icon type for specialty
  const getSpecialtyIconType = (name) => {
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('brain')) return 'FontAwesome5';
    return 'Ionicons';
  };

  // Get icon name for symptom based on name
  const getSymptomIconName = (name) => {
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('stress')) return 'head-outline';
    if (lowercaseName.includes('pain')) return 'bandage-outline';
    if (lowercaseName.includes('anxiety')) return 'pulse-outline';
    if (lowercaseName.includes('sleep')) return 'bed-outline';
    if (lowercaseName.includes('digestive')) return 'nutrition-outline';
    if (lowercaseName.includes('energy')) return 'battery-charging-outline';
    if (lowercaseName.includes('fitness')) return 'fitness-outline';
    return 'medical-outline';
  };

  // Get background color in pastel tones
  const getTagBackgroundColor = (index, type) => {
    const pastelColors = [
      '#E3F2FD', // Light Blue
      '#E8F5E9', // Light Green
      '#FFF3E0', // Light Orange
      '#F3E5F5', // Light Purple
      '#E1F5FE', // Lighter Blue
      '#E0F2F1', // Light Teal
      '#FFF9C4', // Light Yellow
      '#F8BBD0', // Light Pink
    ];

    // Use different color schemes for specialties and symptoms
    const colorOffset = type === 'specialty' ? 0 : 4;
    const colorIndex = (index + colorOffset) % pastelColors.length;
    
    return pastelColors[colorIndex];
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <View style={styles.appNameContainer}>
            <Text style={styles.appName}>Zen Healing</Text>
            <View style={styles.appNameUnderline} />
          </View>
          <Text style={styles.tagline}>Your path to wellness & balance</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle" size={40} color={ZEN_HEALING.COLORS.PRIMARY} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Reset Onboarding Button */}
        <GradientView
          colors={[ZEN_HEALING.COLORS.PRIMARY, ZEN_HEALING.COLORS.SECONDARY]}
          style={styles.resetOnboardingButton}
        >
          <TouchableOpacity 
            style={styles.resetOnboardingContent}
            onPress={resetOnboarding}
          >
            <Text style={styles.resetOnboardingText}>View Onboarding Screens</Text>
            <Ionicons name="chevron-forward" size={18} color="white" style={styles.resetOnboardingIcon} />
          </TouchableOpacity>
        </GradientView>

        {/* Beautiful Search Card */}
        <View style={styles.searchCardContainer}>
          <GradientView
            colors={[ZEN_HEALING.COLORS.PRIMARY, ZEN_HEALING.COLORS.SECONDARY]}
            style={styles.searchCard}
          >
            <Text style={styles.searchCardTitle}>Let's Find Your Doctor</Text>
            
            <View style={styles.searchCardIconsRow}>
              <View style={styles.searchCardIconContainer}>
                <Ionicons name="medical" size={24} color="#fff" />
              </View>
              <View style={styles.searchCardIconContainer}>
                <Ionicons name="heart" size={24} color="#fff" />
              </View>
              <View style={styles.searchCardIconContainer}>
                <FontAwesome5 name="user-md" size={22} color="#fff" />
              </View>
              <View style={styles.searchCardIconContainer}>
                <Ionicons name="fitness" size={24} color="#fff" />
              </View>
            </View>
            
            <View style={styles.searchCardInputContainer}>
              <Ionicons 
                name="search" 
                size={20} 
                color={ZEN_HEALING.COLORS.TEXT.SECONDARY} 
                style={styles.searchCardInputIcon}
              />
              <TextInput
                style={styles.searchCardInput}
                placeholder="Search for practitioners..."
                placeholderTextColor={ZEN_HEALING.COLORS.TEXT.SECONDARY}
                value={searchInput}
                onChangeText={setSearchInput}
                onSubmitEditing={handleSearchSubmit}
                returnKeyType="search"
              />
              {searchInput.length > 0 && (
                <TouchableOpacity onPress={() => setSearchInput('')}>
                  <Ionicons 
                    name="close-circle" 
                    size={20} 
                    color={ZEN_HEALING.COLORS.TEXT.SECONDARY}
                  />
                </TouchableOpacity>
              )}
            </View>
          </GradientView>
        </View>

        {/* Specialties Section */}
        <CardSection 
          title="Browse by Specialty" 
          showSeeAll={true}
          onSeeAllPress={handleSeeAllSpecialities}
        >
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tagsContainer}
          >
            {specialities.length > 0 ? (
              specialities.map((speciality, index) => (
                <TagCard
                  key={speciality.id}
                  id={speciality.id}
                  name={speciality.name}
                  iconName={getSpecialtyIconName(speciality.name)}
                  iconType={getSpecialtyIconType(speciality.name)}
                  backgroundColor={getTagBackgroundColor(index, 'specialty')}
                  onPress={() => handleTagPress({ id: speciality.id, name: speciality.name, type: 'specialty' })}
                  type="specialty"
                />
              ))
            ) : (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading specialties...</Text>
              </View>
            )}
          </ScrollView>
        </CardSection>

        {/* Common Symptoms Section */}
        <CardSection 
          title="Common Symptoms" 
          showSeeAll={true}
          onSeeAllPress={handleSeeAllSymptoms}
        >
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tagsContainer}
          >
            {symptoms.length > 0 ? (
              symptoms.slice(0, 8).map((symptom, index) => (
                <TagCard
                  key={symptom.id}
                  id={symptom.id}
                  name={symptom.name}
                  iconName={getSymptomIconName(symptom.name)}
                  backgroundColor={getTagBackgroundColor(index, 'symptom')}
                  onPress={() => handleTagPress({ id: symptom.id, name: symptom.name, type: 'symptom' })}
                  type="symptom"
                />
              ))
            ) : (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading symptoms...</Text>
              </View>
            )}
          </ScrollView>
        </CardSection>

        {/* Featured Practitioners Section */}
        <CardSection 
          title="Featured Practitioners" 
          showSeeAll={true}
          onSeeAllPress={handleSeeAllPractitioners}
        >
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.practitionersContainer}
          >
            {featuredDoctors.length > 0 ? (
              featuredDoctors.map((doctor) => (
                <PractitionerCard
                  key={doctor.id}
                  name={doctor.name}
                  speciality={doctor.speciality ? doctor.speciality.name : getSpecialityById(doctor.speciality_id)}
                  imageUri={doctor.image_url}
                  status={doctor.status}
                  onPress={() => handlePractitionerPress(doctor)}
                />
              ))
            ) : (
              <View style={styles.noFeaturedDoctors}>
                <Text style={styles.noFeaturedDoctorsText}>No featured practitioners available</Text>
              </View>
            )}
          </ScrollView>
        </CardSection>

        {/* Wellness Articles */}
        <CardSection 
          title="Wellness Articles" 
          showSeeAll={true}
          onSeeAllPress={handleSeeAllArticles}
          style={{ marginBottom: 75 }}
        >
          {loadingArticles ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={ZEN_HEALING.COLORS.PRIMARY} />
              <Text style={styles.loadingText}>Loading articles...</Text>
            </View>
          ) : featuredArticles.length > 0 ? (
            featuredArticles.map((article, index) => (
              <ArticleCard
                key={article.id || index}
                title={article.title}
                excerpt={article.excerpt}
                date={article.date || article.published_at}
                imageUri={article.image_url}
                category={article.category}
                readTime={article.read_time || 5}
                onPress={() => handleArticlePress(article)}
              />
            ))
          ) : (
            <>
              <ArticleCard
                title="Benefits of Mindfulness Meditation"
                excerpt="Discover how daily mindfulness practice can reduce stress and improve overall well-being."
                date="June 15, 2023"
                category="Meditation"
                readTime={5}
                onPress={() => handleArticlePress({
                  id: '1',
                  title: 'Benefits of Mindfulness Meditation',
                  excerpt: 'Discover how daily mindfulness practice can reduce stress and improve overall well-being.',
                  date: 'June 15, 2023',
                  category: 'Meditation',
                  readTime: 5
                })}
              />

              <ArticleCard
                title="Holistic Approaches to Stress Management"
                excerpt="Learn about natural techniques to manage stress and anxiety without medication."
                date="June 10, 2023"
                category="Wellness"
                readTime={7}
                onPress={() => handleArticlePress({
                  id: '2',
                  title: 'Holistic Approaches to Stress Management',
                  excerpt: 'Learn about natural techniques to manage stress and anxiety without medication.',
                  date: 'June 10, 2023',
                  category: 'Wellness',
                  readTime: 7
                })}
              />
            </>
          )}
        </CardSection>
      </ScrollView>

      {/* Doctor Details Modal */}
      <DoctorDetailsModal
        visible={modalVisible}
        onClose={handleCloseModal}
        doctor={selectedDoctor}
        onBookPress={handleBookAppointment}
        getSpecialityById={getSpecialityById}
        getLocationById={getLocationById}
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: ZEN_HEALING.COLORS.BORDER + '40', // Translucent border
  },
  headerTextContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    fontWeight: '500',
  },
  appNameContainer: {
    marginTop: 4,
    marginBottom: 4,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.PRIMARY,
    letterSpacing: 0.5,
  },
  appNameUnderline: {
    height: 3,
    width: 60,
    backgroundColor: ZEN_HEALING.COLORS.ACCENT,
    marginTop: 4,
    borderRadius: 2,
  },
  tagline: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.TERTIARY,
    fontStyle: 'italic',
    marginTop: 2,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.TERTIARY,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingBottom: 70,
  },
  searchCardContainer: {
    marginVertical: 16,
  },
  searchCard: {
    borderRadius: 16,
    padding: 20,
    overflow: 'hidden',
  },
  searchCardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  searchCardIconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  searchCardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchCardInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchCardInputIcon: {
    marginRight: 8,
  },
  searchCardInputPlaceholder: {
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    fontSize: 14,
  },
  searchCardInput: {
    flex: 1,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    fontSize: 14,
    paddingVertical: 6,
    height: 40,
  },
  tagsContainer: {
    paddingVertical: 8,
    paddingRight: 24,
    flexWrap: 'wrap',
  },
  practitionersContainer: {
    paddingVertical: 8,
    paddingRight: 16,
  },
  noFeaturedDoctors: {
    alignItems: 'center',
    padding: 16,
    width: 260, // Match the width of PractitionerCard
  },
  noFeaturedDoctorsText: {
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    fontSize: 14,
  },
  resetOnboardingButton: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  resetOnboardingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  resetOnboardingText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resetOnboardingIcon: {
    marginLeft: 8,
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
  },
  loadingText: {
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    fontSize: 14,
  },
});

export default HomeScreen; 