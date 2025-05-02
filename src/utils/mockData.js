/**
 * Mock data for development and testing
 * Provides sample data that matches API structure
 */

// Sample specialities
export const mockSpecialities = [
  { id: 1, name: 'Cardiology' },
  { id: 2, name: 'Dermatology' },
  { id: 3, name: 'Neurology' },
  { id: 4, name: 'Oncology' },
  { id: 5, name: 'Pediatrics' },
  { id: 6, name: 'Psychiatry' },
  { id: 7, name: 'Orthopedics' },
  { id: 8, name: 'Gynecology' },
  { id: 9, name: 'Urology' },
  { id: 10, name: 'Endocrinology' }
];

// Sample locations
export const mockLocations = [
  { id: 1, name: 'New York' },
  { id: 2, name: 'Los Angeles' },
  { id: 3, name: 'Chicago' },
  { id: 4, name: 'Houston' },
  { id: 5, name: 'Phoenix' },
  { id: 6, name: 'Philadelphia' },
  { id: 7, name: 'San Antonio' },
  { id: 8, name: 'San Diego' },
  { id: 9, name: 'Dallas' },
  { id: 10, name: 'San Jose' }
];

// Sample symptoms
export const mockSymptoms = [
  { id: 1, name: 'Fever' },
  { id: 2, name: 'Headache' },
  { id: 3, name: 'Nausea' },
  { id: 4, name: 'Fatigue' },
  { id: 5, name: 'Dizziness' },
  { id: 6, name: 'Chest Pain' },
  { id: 7, name: 'Shortness of Breath' },
  { id: 8, name: 'Abdominal Pain' },
  { id: 9, name: 'Joint Pain' },
  { id: 10, name: 'Rash' },
  { id: 11, name: 'Cough' },
  { id: 12, name: 'Sore Throat' },
  { id: 13, name: 'Muscle Aches' },
  { id: 14, name: 'Back Pain' },
  { id: 15, name: 'Anxiety' },
  { id: 16, name: 'Depression' },
  { id: 17, name: 'Insomnia' },
  { id: 18, name: 'Loss of Appetite' },
  { id: 19, name: 'Weight Loss' },
  { id: 20, name: 'High Blood Pressure' }
];

// Sample doctors
export const mockDoctors = [
  {
    id: 1,
    name: 'Dr. John Smith',
    email: 'john.smith@example.com',
    phone: '123-456-7890',
    address: '123 Main St, New York, NY',
    speciality_id: 1,
    location_id: 1,
    symptoms: [1, 4, 6, 7],
    feature: 1,
    image_url: 'https://example.com/doctor1.jpg',
    rating: 4.8,
    status: 'active'
  },
  {
    id: 2,
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '987-654-3210',
    address: '456 Oak St, Los Angeles, CA',
    speciality_id: 2,
    location_id: 2,
    symptoms: [5, 10, 14],
    feature: 1,
    image_url: 'https://example.com/doctor2.jpg',
    rating: 4.9,
    status: 'active'
  },
  {
    id: 3,
    name: 'Dr. Michael Davis',
    email: 'michael.davis@example.com',
    phone: '555-123-4567',
    address: '789 Elm St, Chicago, IL',
    speciality_id: 3,
    location_id: 3,
    symptoms: [2, 5, 17],
    feature: 0,
    image_url: 'https://example.com/doctor3.jpg',
    rating: 4.6,
    status: 'active'
  }
];

// Export combined mock data object
export const mockData = {
  specialities: mockSpecialities,
  locations: mockLocations,
  symptoms: mockSymptoms,
  doctors: mockDoctors
};

export default mockData; 