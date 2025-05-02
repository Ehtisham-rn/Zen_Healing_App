# Zen Healing Hub App

A React Native mobile application for connecting patients with holistic health practitioners through the Zen Healing Hub platform.

## Overview

The Zen Healing Hub app provides a platform for users to browse holistic healthcare providers by speciality, symptom, or location, and book appointments with their preferred practitioners. Doctors can register, manage their profiles, and handle appointment requests through the app.

## Features

- **For Patients:**
  - Browse doctors by speciality, symptom, or location
  - Book appointments with preferred healthcare providers
  - Manage and track appointment status
  - Read health and wellness articles

- **For Doctors:**
  - Create and manage professional profiles
  - Accept or decline appointment requests
  - Manage appointment schedule
  - Update availability

## Project Structure

```
src/
├── app.js              # Main application component
├── config/
│   └── environment.js  # Environment-specific configurations
├── constants/
│   └── index.js        # App-wide constants
├── hooks/
│   ├── useApi.js       # Custom hook for API calls
│   ├── useAppointments.js # Custom hook for appointments
│   └── useDoctors.js   # Custom hook for doctors data
├── services/
│   ├── api.js          # Base API service
│   └── zenHealingApi.js # Zen Healing Hub specific API
├── state/
│   ├── store.js        # Redux store configuration
│   └── slices/
│       ├── appSlice.js        # General app state
│       ├── authSlice.js       # Authentication state
│       ├── doctorSlice.js     # Doctor-related state
│       └── appointmentSlice.js # Appointment-related state
└── utils/
    ├── errorHandler.js   # Error handling utilities
    ├── helpers.js        # General helper functions
    ├── networkMonitor.js # Network monitoring
    └── storage.js        # Storage utilities
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/zen-healing-hub-app.git
   cd zen-healing-hub-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Follow the instructions in the terminal to open the app on your device or emulator.

## API Integration

The app connects to the Zen Healing Hub REST API at `https://backend.zenhealinghub.com/api` with endpoints for:

- **Doctors**: Fetch, create, update doctor profiles
- **Appointments**: Book, manage, and update appointments
- **Specialities**: Fetch available medical specialities
- **Symptoms**: Fetch common symptoms
- **Locations**: Fetch available locations
- **Articles**: Fetch health and wellness articles
- **Contact**: Submit contact form inquiries

## State Management

The app uses Redux with Redux Toolkit for state management:

- **authSlice**: Manages user authentication
- **appSlice**: Manages general app state and settings
- **doctorSlice**: Manages doctor-related state
- **appointmentSlice**: Manages appointment-related state

## Custom Hooks

- **useApi**: Simplifies API calls with loading and error states
- **useDoctors**: Manages doctor-related operations and filtering
- **useAppointments**: Manages appointment booking and calendar management

## Theme and Styling

The app uses a consistent color scheme defined in constants:

- **Primary Color**: Green (#4CAF50) for healing/health themes
- **Secondary Color**: Blue (#2196F3) for calm/peace themes
- **Accent Color**: Orange (#FF9800) for energy/vitality

## Environment Configuration

The app is already configured to connect to the Zen Healing Hub backend:

```javascript
// src/config/environment.js
const config = {
  [ENV.dev]: {
    apiUrl: 'https://backend.zenhealinghub.com/api',
    // ...
  },
  // ...
};
```

## Deployment

### Android

```bash
expo build:android
```

### iOS

```bash
expo build:ios
```

Follow the Expo instructions to complete the build process.

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

[MIT License](LICENSE) 