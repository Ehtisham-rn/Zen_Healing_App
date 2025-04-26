import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { ZEN_HEALING } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { updateOnboarding } from '../../state/slices/appSlice';

const { width } = Dimensions.get('window');

// Onboarding steps data
const onboardingSteps = [
  {
    id: '1',
    title: 'Find Your Practitioner',
    description: 'Browse our extensive network of holistic health practitioners by specialty, symptom, or location.',
    image: require('../../../assets/welcome.png'),
  },
  {
    id: '2',
    title: 'Book Appointments',
    description: 'Schedule appointments with your preferred practitioners at times that work for you.',
    image: require('../../../assets/welcome.png'),
  },
  {
    id: '3',
    title: 'Track Your Wellness',
    description: 'Keep track of your appointments, receive reminders, and manage your wellness journey all in one place.',
    image: require('../../../assets/welcome.png'),
  },
];

const OnboardingStepsScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  // Handler for when slides change
  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  // Move to next slide
  const goToNextSlide = () => {
    if (currentIndex < onboardingSteps.length - 1) {
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      // Mark onboarding as completed
      dispatch(updateOnboarding({ completed: true }));
      
      // Navigate to home screen
      navigation.replace('Home');
    }
  };

  // Render each onboarding slide
  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  // Render pagination dots
  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        <View style={styles.dotsContainer}>
          {onboardingSteps.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: 'clamp',
            });
            
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            
            return (
              <Animated.View
                key={index.toString()}
                style={[
                  styles.dot,
                  {
                    width: dotWidth,
                    opacity,
                    backgroundColor:
                      index === currentIndex
                        ? ZEN_HEALING.COLORS.PRIMARY
                        : ZEN_HEALING.COLORS.TEXT.DISABLED,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={onboardingSteps}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        scrollEventThrottle={16}
      />
      
      {renderPagination()}
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => {
            dispatch(updateOnboarding({ completed: true }));
            navigation.replace('Home');
          }}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={goToNextSlide}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>
            {currentIndex === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.PRIMARY,
  },
  slide: {
    width,
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: ZEN_HEALING.COLORS.PRIMARY,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    lineHeight: 24,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 130,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  footer: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  skipText: {
    fontSize: 16,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
  },
  nextButton: {
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY,
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnboardingStepsScreen; 