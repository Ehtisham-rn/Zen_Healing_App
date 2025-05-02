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
  useWindowDimensions,
} from 'react-native';
import { ZEN_HEALING } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { updateOnboarding } from '../../state/slices/appSlice';
import GradientView from '../../components/GradientView';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Onboarding steps data
const onboardingSteps = [
  {
    id: '1',
    title: 'Find Your Practitioner',
    description: 'Browse our extensive network of holistic health practitioners by specialty, symptom, or location.',
    image: require('../../../assets/welcome.png'),
    iconName: 'search',
    backgroundColor: '#EAF6FC',
  },
  {
    id: '2',
    title: 'Book Appointments',
    description: 'Schedule appointments with your preferred practitioners at times that work for you.',
    image: require('../../../assets/welcome.png'),
    iconName: 'calendar',
    backgroundColor: '#E0F2F7',
  },
  {
    id: '3',
    title: 'Track Your Wellness',
    description: 'Keep track of your appointments, receive reminders, and manage your wellness journey all in one place.',
    image: require('../../../assets/welcome.png'),
    iconName: 'pulse',
    backgroundColor: '#D5EDF3',
  },
];

const OnboardingStepsScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
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

  // Skip onboarding and go to home
  const skipOnboarding = () => {
    dispatch(updateOnboarding({ completed: true }));
    navigation.replace('Home');
  };

  // Interpolate background color
  const backgroundColor = scrollX.interpolate({
    inputRange: onboardingSteps.map((_, i) => i * width),
    outputRange: onboardingSteps.map(step => step.backgroundColor),
  });

  // Render each onboarding slide
  const renderItem = ({ item, index }) => {
    // Calculate input range for animation
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    
    // Define animations
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [width * 0.2, 0, -width * 0.2],
      extrapolate: 'clamp',
    });
    
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });
    
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    // Calculate dynamic sizes based on screen dimensions
    const iconSize = Math.min(width, height) * 0.12;
    const iconFontSize = Math.min(width, height) * 0.06;
    const imageSize = Math.min(width * 0.7, height * 0.35);

    return (
      <View style={[styles.slide, { width }]}>
        <Animated.View 
          style={[
            styles.imageContainer,
            { 
              transform: [{ translateX }, { scale }],
              opacity,
            }
          ]}
        >
          <View 
            style={[
              styles.iconCircle,
              { 
                width: iconSize, 
                height: iconSize, 
                borderRadius: iconSize / 2,
                marginBottom: height * 0.02,
              }
            ]}
          >
            <Ionicons 
              name={item.iconName} 
              size={iconFontSize} 
              color={ZEN_HEALING.COLORS.PRIMARY}
            />
          </View>
          <Image 
            source={item.image} 
            style={{ width: imageSize, height: imageSize }} 
            resizeMode="contain"
          />
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.textContainer,
            { 
              opacity,
              transform: [{ translateX }],
            }
          ]}
        >
          <Text style={[styles.title, { fontSize: Math.min(28, width * 0.07) }]}>
            {item.title}
          </Text>
          <Text style={[styles.description, { fontSize: Math.min(16, width * 0.04) }]}>
            {item.description}
          </Text>
        </Animated.View>
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
        
        <Text style={styles.stepCounter}>
          Step {currentIndex + 1} of {onboardingSteps.length}
        </Text>
      </View>
    );
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={skipOnboarding}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      
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
          <GradientView
            colors={[ZEN_HEALING.COLORS.PRIMARY, ZEN_HEALING.COLORS.SECONDARY]}
            style={[styles.nextButton, { width: width * 0.8 }]}
          >
            <TouchableOpacity 
              onPress={goToNextSlide}
              activeOpacity={0.8}
              style={styles.nextButtonContent}
            >
              <Text style={styles.nextButtonText}>
                {currentIndex === onboardingSteps.length - 1 ? 'Get Started' : 'Continue'}
              </Text>
              <Ionicons 
                name={currentIndex === onboardingSteps.length - 1 ? 'checkmark' : 'arrow-forward'} 
                size={20} 
                color="white"
                style={styles.nextButtonIcon}
              />
            </TouchableOpacity>
          </GradientView>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    fontSize: 16,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    fontWeight: '500',
  },
  slide: {
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8%',
    width: '100%',
  },
  iconCircle: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: ZEN_HEALING.COLORS.SHADOW,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  textContainer: {
    alignItems: 'center',
    width: '85%',
    paddingHorizontal: '3%',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '4%',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    lineHeight: 24,
  },
  paginationContainer: {
    alignItems: 'center',
    paddingVertical: '4%',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  stepCounter: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.TERTIARY,
    marginTop: 8,
  },
  footer: {
    padding: '5%',
    paddingBottom: '7%',
    alignItems: 'center',
  },
  nextButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  nextButtonContent: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButtonIcon: {
    marginLeft: 8,
  },
});

export default OnboardingStepsScreen; 