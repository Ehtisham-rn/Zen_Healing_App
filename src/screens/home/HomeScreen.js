import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ZEN_HEALING } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import useDoctors from '../../hooks/useDoctors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../constants';
import { updateOnboarding } from '../../state/slices/appSlice';
import GradientView from '../../components/GradientView';

// Import our custom components
import CardSection from '../../components/CardSection';
import CategoryCard from '../../components/CategoryCard';
import PractitionerCard from '../../components/PractitionerCard';
import AppointmentCard from '../../components/AppointmentCard';
import ArticleCard from '../../components/ArticleCard';
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
    getLocationById
  } = useDoctors();
  
  // State for doctor details modal
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Initialize data on first render
  useEffect(() => {
    if (!isInitialized) {
      initializeData();
    }
  }, [isInitialized, initializeData]);

  // Function to reset onboarding state and return to onboarding screens
  const resetOnboarding = async () => {
    try {
      // Clear the onboarding completed flag from AsyncStorage
      await AsyncStorage.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
      
      // Update Redux state to mark onboarding as not completed
      dispatch(updateOnboarding({ completed: false }));
      
      // Navigate to the onboarding stack
      navigation.reset({
        index: 0,
        routes: [{ name: 'OnboardingStack' }],
      });
    } catch (error) {
      console.error('Failed to reset onboarding:', error);
    }
  };

  // Modal handlers
  const handleOpenModal = (doctor) => {
    setSelectedDoctor(doctor);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Navigation handlers
  const handleSeeAllAppointments = () => {
    // Navigate to appointments screen
    navigation.navigate('AppointmentsScreen');
  };

  const handleSeeAllPractitioners = () => {
    // Navigate to practitioners screen
    navigation.navigate('PractitionersScreen');
  };

  const handleSeeAllArticles = () => {
    // Navigate to articles screen
    navigation.navigate('ArticlesScreen');
  };

  const handleCategoryPress = (category) => {
    // Navigate to category details
    navigation.navigate('CategoryScreen', { category });
  };

  const handleAppointmentPress = (appointment) => {
    // Navigate to appointment details
    navigation.navigate('AppointmentDetailScreen', { appointment });
  };

  const handlePractitionerPress = (practitioner) => {
    // Open modal with doctor details
    handleOpenModal(practitioner);
  };

  const handleBookAppointment = (doctor) => {
    // Navigate to booking screen with selected doctor
    setModalVisible(false);
    navigation.navigate('BookAppointmentScreen', { doctor });
  };

  const handleArticlePress = (article) => {
    // Navigate to article details
    navigation.navigate('ArticleDetailScreen', { article });
  };

  const handleQuickBookPress = () => {
    // Navigate to quick booking screen
    navigation.navigate('BookAppointmentScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appName}>Zen Healing Hub</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle" size={40} color={ZEN_HEALING.COLORS.PRIMARY} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Reset Onboarding Button */}
        {/* <GradientView
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
        </GradientView> */}

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar}>
          <Ionicons 
            name="search" 
            size={20} 
            color={ZEN_HEALING.COLORS.TEXT.SECONDARY} 
            style={styles.searchIcon}
          />
          <Text style={styles.searchPlaceholder}>Search for practitioners...</Text>
        </TouchableOpacity>

        {/* Categories Section */}
        <CardSection 
          title="Find by Category" 
          showSeeAll={false}
        >
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            <CategoryCard 
              title="Yoga" 
              iconName="body-outline" 
              backgroundColor="#E3F2FD"
              onPress={() => handleCategoryPress('Yoga')}
            />
            <CategoryCard 
              title="Meditation" 
              iconName="medkit-outline" 
              backgroundColor="#E8F5E9"
              onPress={() => handleCategoryPress('Meditation')}
            />
            <CategoryCard 
              title="Acupuncture" 
              iconName="fitness-outline" 
              backgroundColor="#FFF3E0"
              onPress={() => handleCategoryPress('Acupuncture')}
            />
            <CategoryCard 
              title="Nutrition" 
              iconName="nutrition-outline" 
              backgroundColor="#F3E5F5"
              onPress={() => handleCategoryPress('Nutrition')}
            />
          </ScrollView>
        </CardSection>

        {/* Upcoming Appointments Section */}
        <CardSection 
          title="Upcoming Appointments" 
          showSeeAll={true}
          onSeeAllPress={handleSeeAllAppointments}
        >
          <AppointmentCard
            practitionerName="Dr. Sarah Johnson"
            speciality="Holistic Nutrition"
            date="Today"
            time="2:00 PM"
            status="upcoming"
            onPress={() => handleAppointmentPress({
              id: '1',
              practitionerName: 'Dr. Sarah Johnson',
              speciality: 'Holistic Nutrition',
              date: 'Today',
              time: '2:00 PM',
              status: 'upcoming'
            })}
          />

          <View style={styles.noAppointments}>
            <Text style={styles.noAppointmentsText}>No other upcoming appointments</Text>
          </View>
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
                  rating="4.8"
                  imageUri={doctor.image_url}
                  status={doctor.status}
                  onPress={() => handlePractitionerPress(doctor)}
                  onBookPress={() => handleBookAppointment(doctor)}
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
  },
  welcomeText: {
    fontSize: 16,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.PRIMARY,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingBottom: 70,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    fontSize: 14,
  },
  categoriesContainer: {
    paddingVertical: 8,
    paddingRight: 24,
  },
  practitionersContainer: {
    paddingVertical: 8,
    paddingRight: 16,
  },
  noAppointments: {
    alignItems: 'center',
    padding: 16,
  },
  noAppointmentsText: {
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    fontSize: 14,
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
});

export default HomeScreen; 