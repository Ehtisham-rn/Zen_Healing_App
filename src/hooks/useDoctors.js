/**
 * useDoctors hook
 * Custom hook for working with doctors, specialties, and locations
 */
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDoctors,
  fetchSpecialities,
  fetchSymptoms,
  fetchLocations,
  applyFilters,
  resetFilters,
  selectAllDoctors,
  selectFilteredDoctors,
  selectSpecialities,
  selectSymptoms,
  selectLocations,
  selectDoctorFilters,
  selectDoctorLoading,
  selectDoctorErrors,
} from '../state/slices/doctorSlice';

/**
 * Custom hook for working with doctors
 * @returns {Object} - Methods and data for working with doctors
 */
const useDoctors = () => {
  const dispatch = useDispatch();
  
  // Select data from Redux store
  const allDoctors = useSelector(selectAllDoctors);
  const filteredDoctors = useSelector(selectFilteredDoctors);
  const specialities = useSelector(selectSpecialities);
  const symptoms = useSelector(selectSymptoms);
  const locations = useSelector(selectLocations);
  const filters = useSelector(selectDoctorFilters);
  const loading = useSelector(selectDoctorLoading);
  const errors = useSelector(selectDoctorErrors);
  
  // Local loading state for initialization
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize data
  const initializeData = useCallback(async () => {
    // Fetch all needed data in parallel
    await Promise.all([
      dispatch(fetchDoctors()),
      dispatch(fetchSpecialities()),
      dispatch(fetchSymptoms()),
      dispatch(fetchLocations()),
    ]);
    
    setIsInitialized(true);
  }, [dispatch]);
  
  // Auto-initialize on first render
  useEffect(() => {
    if (!isInitialized && 
        allDoctors.length === 0 && 
        specialities.length === 0 && 
        symptoms.length === 0 && 
        locations.length === 0) {
      initializeData();
    }
  }, [isInitialized, allDoctors, specialities, symptoms, locations, initializeData]);
  
  // Filter doctors
  const filterDoctors = useCallback((filterOptions) => {
    dispatch(applyFilters(filterOptions));
  }, [dispatch]);
  
  // Reset filters
  const clearFilters = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);
  
  // Get speciality name by ID
  const getSpecialityById = useCallback((specialityId) => {
    const speciality = specialities.find(s => s.id === specialityId);
    return speciality ? speciality.name : 'Unknown Speciality';
  }, [specialities]);
  
  // Get location name by ID
  const getLocationById = useCallback((locationId) => {
    const location = locations.find(l => l.id === locationId);
    return location ? location.name : 'Unknown Location';
  }, [locations]);
  
  // Get symptom name by ID
  const getSymptomById = useCallback((symptomId) => {
    const symptom = symptoms.find(s => s.id === symptomId);
    return symptom ? symptom.name : 'Unknown Symptom';
  }, [symptoms]);
  
  // Get doctors by speciality
  const getDoctorsBySpeciality = useCallback((specialityId) => {
    return allDoctors.filter(doctor => doctor.speciality_id === specialityId);
  }, [allDoctors]);
  
  // Get doctors by location
  const getDoctorsByLocation = useCallback((locationId) => {
    return allDoctors.filter(doctor => doctor.location_id === locationId);
  }, [allDoctors]);
  
  // Get doctors by symptom
  const getDoctorsBySymptom = useCallback((symptomId) => {
    return allDoctors.filter(doctor => 
      doctor.symptoms && doctor.symptoms.includes(symptomId)
    );
  }, [allDoctors]);
  
  // Search doctors
  const searchDoctors = useCallback((query) => {
    dispatch(applyFilters({ searchQuery: query }));
  }, [dispatch]);
  
  return {
    // Data
    allDoctors,
    filteredDoctors,
    specialities,
    symptoms,
    locations,
    filters,
    loading,
    errors,
    isInitialized,
    
    // Actions
    initializeData,
    filterDoctors,
    clearFilters,
    searchDoctors,
    
    // Helper functions
    getSpecialityById,
    getLocationById,
    getSymptomById,
    getDoctorsBySpeciality,
    getDoctorsByLocation,
    getDoctorsBySymptom,
  };
};

export default useDoctors; 