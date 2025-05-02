import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Chip
} from 'react-native';
import { ZEN_HEALING } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useDoctors from '../hooks/useDoctors';
import DoctorDetailsModal from '../components/DoctorDetailsModal';

// Doctor list item component for the full screen list
const DoctorListItem = ({ doctor, onPress, specialityName }) => {
  // Format status for display if needed
  const statusText = doctor.status ? 
    doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1) : 
    null;
    
  return (
    <TouchableOpacity style={styles.doctorCard} onPress={onPress}>
      {/* Doctor Image */}
      <View style={styles.doctorImageContainer}>
        {doctor.image_url ? (
          <Image source={{ uri: doctor.image_url }} style={styles.doctorImage} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={40} color={ZEN_HEALING.COLORS.PRIMARY} />
          </View>
        )}
      </View>
      
      {/* Doctor Info */}
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctorSpeciality}>{specialityName}</Text>
        
        {statusText && (
          <View style={[
            styles.statusBadge, 
            doctor.status === 'accepted' && styles.statusAccepted,
            doctor.status === 'pending' && styles.statusPending
          ]}>
            <Text style={styles.statusText}>{statusText}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const PractitionersScreen = ({ navigation, route }) => {
  const { 
    allDoctors, 
    loading, 
    errors, 
    getSpecialityById,
    getLocationById,
    getSymptomById,
    filterDoctors,
    getDoctorsBySpeciality,
    getDoctorsBySymptom
  } = useDoctors();
  
  // State for doctor details modal
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  // State for filtered doctors
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  
  // State for active filter
  const [activeFilter, setActiveFilter] = useState(null);
  
  // Check if there's a filter or search query in route params
  useEffect(() => {
    if (route.params?.filter) {
      const { filter } = route.params;
      setActiveFilter(filter);
    }
    
    if (route.params?.searchQuery) {
      setSearchQuery(route.params.searchQuery);
    }
  }, [route.params]);
  
  // Filter doctors with status 'accepted' and apply any additional filters
  useEffect(() => {
    if (allDoctors.length > 0) {
      let acceptedDoctors = allDoctors.filter(
        doctor => doctor.status === 'accepted'
      );
      
      // Apply active filter if exists
      if (activeFilter) {
        if (activeFilter.type === 'specialty') {
          acceptedDoctors = acceptedDoctors.filter(
            doctor => doctor.speciality_id === activeFilter.id
          );
        } else if (activeFilter.type === 'symptom') {
          acceptedDoctors = acceptedDoctors.filter(
            doctor => doctor.symptoms && doctor.symptoms.some(s => s.id === activeFilter.id)
          );
        }
      }
      
      // Apply search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        acceptedDoctors = acceptedDoctors.filter(doctor => 
          doctor.name.toLowerCase().includes(query) ||
          (doctor.speciality && doctor.speciality.name && 
            doctor.speciality.name.toLowerCase().includes(query))
        );
      }
      
      setFilteredDoctors(acceptedDoctors);
    }
  }, [allDoctors, searchQuery, activeFilter]);
  
  // Clear active filter
  const handleClearFilter = () => {
    setActiveFilter(null);
    // Update navigation params to reflect filter removal
    navigation.setParams({ filter: null });
  };
  
  // Modal handlers
  const handleOpenModal = (doctor) => {
    setSelectedDoctor(doctor);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  
  // Handle booking appointment
  const handleBookAppointment = (doctor) => {
    setModalVisible(false);
    navigation.navigate('BookAppointmentScreen', { doctor });
  };
  
  // Go back to previous screen
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Render empty state
  const renderEmptyState = () => {
    if (loading.doctors) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={ZEN_HEALING.COLORS.PRIMARY} />
          <Text style={styles.emptyText}>Loading practitioners...</Text>
        </View>
      );
    }
    
    if (errors.doctors) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="alert-circle" size={64} color={ZEN_HEALING.COLORS.ERROR} />
          <Text style={styles.emptyText}>Failed to load practitioners</Text>
          <Text style={styles.errorText}>{errors.doctors}</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="people" size={64} color={ZEN_HEALING.COLORS.TEXT.SECONDARY} />
        <Text style={styles.emptyText}>No practitioners found</Text>
        {(searchQuery.trim() !== '' || activeFilter) && (
          <Text style={styles.emptySubtext}>
            Try adjusting your search criteria or removing filters
          </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={ZEN_HEALING.COLORS.TEXT.PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Our Practitioners</Text>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons 
          name="search" 
          size={20} 
          color={ZEN_HEALING.COLORS.TEXT.SECONDARY} 
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or speciality"
          placeholderTextColor={ZEN_HEALING.COLORS.TEXT.SECONDARY}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.trim() !== '' && (
          <TouchableOpacity 
            style={styles.clearSearch} 
            onPress={() => setSearchQuery('')}
          >
            <Ionicons name="close-circle" size={20} color={ZEN_HEALING.COLORS.TEXT.SECONDARY} />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Active Filter */}
      {activeFilter && (
        <View style={styles.filterContainer}>
          <View style={styles.activeFilterChip}>
            <Text style={styles.activeFilterText}>
              {activeFilter.type === 'specialty' ? 'Specialty: ' : 'Symptom: '}
              {activeFilter.name}
            </Text>
            <TouchableOpacity onPress={handleClearFilter}>
              <Ionicons name="close-circle" size={20} color={ZEN_HEALING.COLORS.PRIMARY} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {/* Results Count */}
      {filteredDoctors.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsCount}>
            {filteredDoctors.length} {filteredDoctors.length === 1 ? 'practitioner' : 'practitioners'} found
          </Text>
        </View>
      )}
      
      {/* Doctors List */}
      <FlatList
        data={filteredDoctors}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <DoctorListItem 
            doctor={item} 
            onPress={() => handleOpenModal(item)}
            specialityName={item.speciality ? item.speciality.name : getSpecialityById(item.speciality_id)}
          />
        )}
        contentContainerStyle={styles.doctorsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
      
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: ZEN_HEALING.COLORS.BORDER,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginLeft: 8,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    borderRadius: 12,
    paddingHorizontal: 16,
    margin: 16,
    marginBottom: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    fontSize: 16,
  },
  clearSearch: {
    padding: 4,
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  activeFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY + '20', // With opacity
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  activeFilterText: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.PRIMARY,
    fontWeight: '500',
    marginRight: 4,
  },
  resultsContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  resultsCount: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    fontWeight: '500',
  },
  doctorsList: {
    padding: 16,
    paddingTop: 8,
    flexGrow: 1,
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  doctorImageContainer: {
    width: 70,
    height: 70,
    marginRight: 16,
  },
  doctorImage: {
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
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 4,
  },
  doctorSpeciality: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    marginBottom: 8,
  },
  statusBadge: {
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    marginTop: 8,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.ERROR,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default PractitionersScreen; 