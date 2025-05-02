import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import SplashScreen from '../screens/onboarding/SplashScreen';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import OnboardingStepsScreen from '../screens/onboarding/OnboardingStepsScreen';
import HomeScreen from '../screens/home/HomeScreen';
import PractitionersScreen from '../screens/PractitionersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from '../screens/TermsOfServiceScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactSupportScreen from '../screens/ContactSupportScreen';
import FAQScreen from '../screens/FAQScreen';
import DoctorLoginScreen from '../screens/auth/DoctorLoginScreen';
import DoctorRegisterScreen from '../screens/auth/DoctorRegisterScreen';
import BookAppointmentScreen from '../screens/BookAppointmentScreen';
import ArticlesScreen from '../screens/ArticlesScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';

// Import navigation theme and colors
import { ZEN_HEALING } from '../constants';

// Create navigation stacks
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Home stack
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PractitionersScreen" component={PractitionersScreen} />
      <Stack.Screen name="BookAppointmentScreen" component={BookAppointmentScreen} />
      <Stack.Screen name="ArticlesScreen" component={ArticlesScreen} />
      <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} />
    </Stack.Navigator>
  );
};

// Profile stack
const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
      <Stack.Screen name="TermsOfServiceScreen" component={TermsOfServiceScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="ContactSupportScreen" component={ContactSupportScreen} />
      <Stack.Screen name="FAQScreen" component={FAQScreen} />
      <Stack.Screen name="DoctorLoginScreen" component={DoctorLoginScreen} />
      <Stack.Screen name="DoctorRegisterScreen" component={DoctorRegisterScreen} />
    </Stack.Navigator>
  );
};

// Main Tab Navigation
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ZEN_HEALING.COLORS.PRIMARY,
        tabBarInactiveTintColor: ZEN_HEALING.COLORS.TEXT.DISABLED,
        tabBarStyle: {
          backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.PRIMARY,
          borderTopColor: ZEN_HEALING.COLORS.BORDER,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Appointments" 
        component={HomeScreen} // Replace with actual Appointments screen when created
        options={{
          tabBarLabel: 'Appointments',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Practitioners" 
        component={PractitionersScreen}
        options={{
          tabBarLabel: 'Practitioners',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="doctor" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Onboarding Stack
const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={WelcomeScreen} />
      <Stack.Screen name="OnboardingSteps" component={OnboardingStepsScreen} />
      <Stack.Screen name="Home" component={MainTabNavigator} />
    </Stack.Navigator>
  );
};

// Main App Navigator
const AppNavigator = () => {
  const dispatch = useDispatch();
  const onboardingCompleted = useSelector(state => state.app?.onboarding?.completed);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!onboardingCompleted ? (
          <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
        ) : (
          <Stack.Screen name="MainApp" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 