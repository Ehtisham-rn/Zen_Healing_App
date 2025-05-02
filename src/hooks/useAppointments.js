/**
 * useAppointments hook
 * Custom hook for working with appointments
 */
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllAppointments,
  fetchUserAppointments,
  fetchDoctorAppointments,
  createAppointment,
  updateAppointmentStatus,
  filterAppointmentsByStatus,
  filterAppointmentsByDate,
  selectAllAppointments,
  selectUserAppointments,
  selectDoctorAppointments,
  selectAppointmentLoading,
  selectAppointmentErrors,
} from '../state/slices/appointmentSlice';
import { selectCurrentDoctor } from '../state/slices/doctorSlice';
import { ZEN_HEALING } from '../constants';

/**
 * Hook for managing appointments in the application
 * Provides functions to interact with appointments state
 */
export const useAppointments = () => {
  const dispatch = useDispatch();
  
  // Select data from Redux store
  const allAppointments = useSelector(selectAllAppointments);
  const userAppointments = useSelector(selectUserAppointments);
  const doctorAppointments = useSelector(selectDoctorAppointments);
  const loading = useSelector(selectAppointmentLoading);
  const errors = useSelector(selectAppointmentErrors);
  const currentDoctor = useSelector(selectCurrentDoctor);
  
  // Local state
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize doctor's appointments if logged in as doctor
  useEffect(() => {
    if (currentDoctor && !isInitialized && doctorAppointments.length === 0) {
      dispatch(fetchDoctorAppointments(currentDoctor.id));
      setIsInitialized(true);
    }
  }, [currentDoctor, isInitialized, doctorAppointments, dispatch]);
  
  // Load all appointments (admin or staff role)
  const loadAllAppointments = useCallback(() => {
    return dispatch(fetchAllAppointments());
  }, [dispatch]);
  
  // Load user appointments
  const loadUserAppointments = useCallback((userId) => {
    return dispatch(fetchUserAppointments(userId));
  }, [dispatch]);
  
  // Load doctor appointments
  const loadDoctorAppointments = useCallback((doctorId) => {
    return dispatch(fetchDoctorAppointments(doctorId));
  }, [dispatch]);
  
  // Book a new appointment
  const bookAppointment = useCallback((appointmentData) => {
    return dispatch(createAppointment(appointmentData));
  }, [dispatch]);
  
  // Update appointment status
  const changeAppointmentStatus = useCallback((appointmentId, status) => {
    return dispatch(updateAppointmentStatus({ appointmentId, status }));
  }, [dispatch]);
  
  // Filter appointments by status
  const filterByStatus = useCallback((status) => {
    dispatch(filterAppointmentsByStatus(status));
  }, [dispatch]);
  
  // Filter appointments by date range
  const filterByDateRange = useCallback((startDate, endDate) => {
    dispatch(filterAppointmentsByDate({ startDate, endDate }));
  }, [dispatch]);
  
  // Get pending appointments
  const getPendingAppointments = useCallback(() => {
    return doctorAppointments.filter(
      appointment => appointment.status === ZEN_HEALING.APPOINTMENT_STATUS.PENDING
    );
  }, [doctorAppointments]);
  
  // Get confirmed appointments
  const getConfirmedAppointments = useCallback(() => {
    return doctorAppointments.filter(
      appointment => appointment.status === ZEN_HEALING.APPOINTMENT_STATUS.CONFIRMED
    );
  }, [doctorAppointments]);
  
  // Get completed appointments
  const getCompletedAppointments = useCallback(() => {
    return doctorAppointments.filter(
      appointment => appointment.status === ZEN_HEALING.APPOINTMENT_STATUS.COMPLETED
    );
  }, [doctorAppointments]);
  
  // Get cancelled appointments
  const getCancelledAppointments = useCallback(() => {
    return doctorAppointments.filter(
      appointment => appointment.status === ZEN_HEALING.APPOINTMENT_STATUS.CANCELLED
    );
  }, [doctorAppointments]);
  
  // Get today's appointments
  const getTodayAppointments = useCallback(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    return doctorAppointments.filter(
      appointment => appointment.booking_date === todayStr
    );
  }, [doctorAppointments]);
  
  // Get upcoming appointments (future dates)
  const getUpcomingAppointments = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    return doctorAppointments.filter(appointment => {
      const appointmentDate = new Date(appointment.booking_date);
      return appointmentDate > today;
    });
  }, [doctorAppointments]);
  
  return {
    // Data
    allAppointments,
    userAppointments,
    doctorAppointments,
    loading,
    errors,
    
    // Actions
    loadAllAppointments,
    loadUserAppointments,
    loadDoctorAppointments,
    bookAppointment,
    changeAppointmentStatus,
    filterByStatus,
    filterByDateRange,
    
    // Helper methods
    getPendingAppointments,
    getConfirmedAppointments,
    getCompletedAppointments,
    getCancelledAppointments,
    getTodayAppointments,
    getUpcomingAppointments,
  };
};

export default useAppointments; 