import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ZEN_HEALING } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import useDoctors from '../../hooks/useDoctors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { 
    allDoctors, 
    specialities, 
    symptoms,
    locations,
    initializeData, 
    isInitialized 
  } = useDoctors();

  // Initialize data on first render
  useEffect(() => {
    if (!isInitialized) {
      initializeData();
    }
  }, [isInitialized, initializeData]);

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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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

        {/* Quick Categories */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Find by Category</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            <TouchableOpacity style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: '#E3F2FD' }]}>
                <MaterialCommunityIcons 
                  name="yoga" 
                  size={30} 
                  color={ZEN_HEALING.COLORS.PRIMARY} 
                />
              </View>
              <Text style={styles.categoryName}>Yoga</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: '#E8F5E9' }]}>
                <MaterialCommunityIcons 
                  name="meditation" 
                  size={30} 
                  color={ZEN_HEALING.COLORS.PRIMARY} 
                />
              </View>
              <Text style={styles.categoryName}>Meditation</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: '#FFF3E0' }]}>
                <FontAwesome5 
                  name="hands" 
                  size={30} 
                  color={ZEN_HEALING.COLORS.PRIMARY} 
                />
              </View>
              <Text style={styles.categoryName}>Acupuncture</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: '#F3E5F5' }]}>
                <MaterialCommunityIcons 
                  name="food-apple" 
                  size={30} 
                  color={ZEN_HEALING.COLORS.PRIMARY} 
                />
              </View>
              <Text style={styles.categoryName}>Nutrition</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.appointmentCard}>
            <View style={styles.appointmentCardHeader}>
              <Text style={styles.appointmentDate}>Today, 2:00 PM</Text>
              <View style={styles.appointmentStatusBadge}>
                <Text style={styles.appointmentStatusText}>Confirmed</Text>
              </View>
            </View>
            <View style={styles.appointmentDetails}>
              <View style={styles.doctorAvatarContainer}>
                <Ionicons name="person" size={30} color="#fff" style={styles.doctorAvatar} />
              </View>
              <View style={styles.appointmentInfo}>
                <Text style={styles.doctorName}>Dr. Sarah Johnson</Text>
                <Text style={styles.speciality}>Holistic Nutrition</Text>
              </View>
            </View>
            <View style={styles.appointmentActions}>
              <TouchableOpacity style={styles.rescheduleButton}>
                <Text style={styles.rescheduleText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View style={styles.noAppointments}>
            <Text style={styles.noAppointmentsText}>No other upcoming appointments</Text>
          </View>
        </View>

        {/* Featured Practitioners */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Practitioners</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.practitionersContainer}
          >
            <TouchableOpacity style={styles.practitionerCard}>
              <Image 
                source={require('../../../assets/welcome.png')} 
                style={styles.practitionerImage}
              />
              <Text style={styles.practitionerName}>Dr. Mark Wilson</Text>
              <Text style={styles.practitionerSpeciality}>Acupuncture</Text>
              <View style={styles.practitionerRating}>
                <FontAwesome 
                  name="star" 
                  size={12} 
                  color={ZEN_HEALING.COLORS.ACCENT} 
                  style={styles.starIcon}
                />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.practitionerCard}>
              <Image 
                source={require('../../../assets/welcome.png')} 
                style={styles.practitionerImage}
              />
              <Text style={styles.practitionerName}>Dr. Amelia Chen</Text>
              <Text style={styles.practitionerSpeciality}>Yoga Therapy</Text>
              <View style={styles.practitionerRating}>
                <FontAwesome 
                  name="star" 
                  size={12} 
                  color={ZEN_HEALING.COLORS.ACCENT} 
                  style={styles.starIcon}
                />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.practitionerCard}>
              <Image 
                source={require('../../../assets/welcome.png')} 
                style={styles.practitionerImage}
              />
              <Text style={styles.practitionerName}>Dr. John Davis</Text>
              <Text style={styles.practitionerSpeciality}>Meditation</Text>
              <View style={styles.practitionerRating}>
                <FontAwesome 
                  name="star" 
                  size={12} 
                  color={ZEN_HEALING.COLORS.ACCENT} 
                  style={styles.starIcon}
                />
                <Text style={styles.ratingText}>4.7</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Wellness Articles */}
        <View style={[styles.sectionContainer, { marginBottom: 20 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Wellness Articles</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.articleCard}>
            <Image 
              source={require('../../../assets/welcome.png')}
              style={styles.articleImage}
            />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>Benefits of Mindfulness Meditation</Text>
              <Text style={styles.articleExcerpt}>
                Discover how daily mindfulness practice can reduce stress and improve overall well-being.
              </Text>
              <Text style={styles.articleDate}>June 15, 2023</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.articleCard}>
            <Image 
              source={require('../../../assets/welcome.png')}
              style={styles.articleImage}
            />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>Holistic Approaches to Stress Management</Text>
              <Text style={styles.articleExcerpt}>
                Learn about natural techniques to manage stress and anxiety without medication.
              </Text>
              <Text style={styles.articleDate}>June 10, 2023</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  sectionContainer: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  seeAllText: {
    color: ZEN_HEALING.COLORS.PRIMARY,
    fontSize: 14,
  },
  categoriesContainer: {
    paddingVertical: 8,
    paddingRight: 24,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 24,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  appointmentCard: {
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  appointmentCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  appointmentDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  appointmentStatusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  appointmentStatusText: {
    fontSize: 12,
    color: ZEN_HEALING.COLORS.SUCCESS,
    fontWeight: 'bold',
  },
  appointmentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorAvatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  doctorAvatar: {
    width: 30,
    height: 30,
  },
  appointmentInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 4,
  },
  speciality: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
  },
  appointmentActions: {
    flexDirection: 'row',
  },
  rescheduleButton: {
    flex: 1,
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  rescheduleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ZEN_HEALING.COLORS.TEXT.SECONDARY,
  },
  cancelText: {
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    fontWeight: 'bold',
    fontSize: 14,
  },
  noAppointments: {
    alignItems: 'center',
    padding: 16,
  },
  noAppointmentsText: {
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    fontSize: 14,
  },
  practitionersContainer: {
    paddingVertical: 8,
    paddingRight: 16,
  },
  practitionerCard: {
    width: 150,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    marginRight: 16,
  },
  practitionerImage: {
    width: '100%',
    height: 120,
  },
  practitionerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginTop: 8,
    marginHorizontal: 8,
  },
  practitionerSpeciality: {
    fontSize: 12,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    marginHorizontal: 8,
  },
  practitionerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
  },
  starIcon: {
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  articleCard: {
    flexDirection: 'row',
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  articleImage: {
    width: 100,
    height: '100%',
  },
  articleContent: {
    flex: 1,
    padding: 16,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 4,
  },
  articleExcerpt: {
    fontSize: 12,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    marginBottom: 8,
  },
  articleDate: {
    fontSize: 10,
    color: ZEN_HEALING.COLORS.TEXT.DISABLED,
  },
});

export default HomeScreen; 