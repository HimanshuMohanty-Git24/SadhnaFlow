import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  State,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Optimized dimensions for better visual balance
const ITEM_WIDTH = screenWidth * 0.65; // Slightly larger but not overwhelming
const ITEM_HEIGHT = ITEM_WIDTH * 1.2; // Better aspect ratio
const ITEM_SPACING = 20;

// Enhanced data with proper image paths and content
const images = [
  { 
    id: '1', 
    source: require('@/assets/images/Ganesha_Ji.jpeg'), 
    name: 'Ganesha Ji', 
    hindiName: 'विघ्नहर्ता गणेश जी', 
    description: 'The remover of obstacles and lord of new beginnings.' 
  },
  { 
    id: '2', 
    source: require('@/assets/images/Aghor_Ganapati_Ji.jpeg'), 
    name: 'Aghor Ganapati Ji', 
    hindiName: 'अघोर गणपति जी', 
    description: 'A fierce and powerful form of Lord Ganesha, protector from all evils.' 
  },
  { 
    id: '3', 
    source: require('@/assets/images/Kal_Bhairav.jpg'), 
    name: 'Kal Bhairav', 
    hindiName: 'श्री काल भैरव', 
    description: 'The fierce manifestation of Lord Shiva associated with annihilation.' 
  },
  { 
    id: '4', 
    source: require('@/assets/images/Batuka_Bhairva.jpeg'), 
    name: 'Batuka Bhairva', 
    hindiName: 'बटुक भैरव', 
    description: 'The gentle, child form of Lord Bhairava who protects his devotees.' 
  },
  { 
    id: '5', 
    source: require('@/assets/images/Bhairva_Ji.jpeg'), 
    name: 'Bhairva Ji', 
    hindiName: 'भैरव जी', 
    description: 'The divine guardian deity, a powerful form of Shiva.' 
  },
  { 
    id: '6', 
    source: require('@/assets/images/Batuka_Bhairav_meditative.jpg'), 
    name: 'Meditating Bhairav', 
    hindiName: 'ध्यानस्थ भैरव', 
    description: 'Lord Bhairava in a deep state of meditation, radiating peace.' 
  },
  { 
    id: '7', 
    source: require('@/assets/images/Panchmukhi_Hanuman_Ji.jpeg'), 
    name: 'Panchmukhi Hanuman', 
    hindiName: 'पंचमुखी हनुमान जी', 
    description: 'The five-faced form of Hanuman, protector from all directions.' 
  },
];

export default function VigrahaScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [viewMode, setViewMode] = useState('gallery');
  const lastTap = useRef<number | null>(null);

  // Handle pan gesture for swiping down to close fullscreen
  const handlePanGesture = (event: any) => {
    const { translationY, velocityY, state } = event.nativeEvent;
    
    // If user swipes down with enough velocity or distance
    if (state === State.END && (translationY > 100 || velocityY > 1000)) {
      setViewMode('gallery');
    }
  };

  // Handle scroll to update current index
  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (ITEM_WIDTH + ITEM_SPACING));
    const clampedIndex = Math.max(0, Math.min(index, images.length - 1));
    setCurrentIndex(clampedIndex);
  };

  // Scroll to specific index
  const scrollToIndex = (index: number) => {
    if (flatListRef.current && index >= 0 && index < images.length) {
      flatListRef.current.scrollToOffset({
        offset: index * (ITEM_WIDTH + ITEM_SPACING),
        animated: true,
      });
    }
  };

  const handleImagePress = () => {
    setExpandedIndex(currentIndex);
    setViewMode('expanded');
  };

  const handleExitFullscreen = () => {
    setViewMode('gallery');
    setTimeout(() => {
      scrollToIndex(expandedIndex);
      setCurrentIndex(expandedIndex);
    }, 100);
  };

  // Handle double tap to exit full-screen mode
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap.current && now - lastTap.current < DOUBLE_PRESS_DELAY) {
      handleExitFullscreen();
    } else {
      lastTap.current = now;
    }
  };

  // Initialize scroll position when returning to gallery
  useEffect(() => {
    if (viewMode === 'gallery' && flatListRef.current) {
      setTimeout(() => {
        scrollToIndex(expandedIndex);
      }, 50);
    }
  }, [viewMode, expandedIndex]);

  // Render expanded view
  if (viewMode === 'expanded') {
    const currentImage = images[expandedIndex];
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: 'black' }]}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        
        {/* Close button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleExitFullscreen}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>

        <View style={styles.fullScreenContainer}>
          <TouchableOpacity
            style={styles.fullScreenImageContainer}
            onPress={handleDoubleTap}
            onLongPress={handleExitFullscreen}
            activeOpacity={1}
          >
            <Image 
              source={currentImage.source} 
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <View style={styles.fullScreenTextContainer}>
            <Text style={styles.fullScreenName}>{currentImage.name}</Text>
            <Text style={styles.fullScreenHindiName}>{currentImage.hindiName}</Text>
            <Text style={styles.fullScreenDescription}>{currentImage.description}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Render Gallery View
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <View style={styles.container}>
        
        {/* Main Gallery */}
        <View style={styles.galleryContainer}>
          <Animated.FlatList
            ref={flatListRef}
            data={images}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_WIDTH + ITEM_SPACING}
            snapToAlignment="start"
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: (screenWidth - ITEM_WIDTH) / 2 - ITEM_SPACING / 2,
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
                listener: handleScroll,
              }
            )}
            scrollEventThrottle={16}
            initialScrollIndex={currentIndex}
            getItemLayout={(data, index) => ({
              length: ITEM_WIDTH + ITEM_SPACING,
              offset: (ITEM_WIDTH + ITEM_SPACING) * index,
              index,
            })}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * (ITEM_WIDTH + ITEM_SPACING),
                index * (ITEM_WIDTH + ITEM_SPACING),
                (index + 1) * (ITEM_WIDTH + ITEM_SPACING),
              ];

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.75, 1.15, 0.75],
                extrapolate: 'clamp',
              });

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.5, 1, 0.5],
                extrapolate: 'clamp',
              });

              const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [30, 0, 30],
                extrapolate: 'clamp',
              });

              const glowOpacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 0.8, 0],
                extrapolate: 'clamp',
              });

              const isInFocus = index === currentIndex;

              return (
                <View style={styles.itemWrapper}>
                  {/* Divine Glow Effect */}
                  <Animated.View 
                    style={[
                      styles.glowEffect, 
                      { 
                        opacity: glowOpacity,
                        transform: [{ scale }] 
                      }
                    ]} 
                  />
                  
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => isInFocus && handleImagePress()}
                    style={styles.touchableContainer}
                  >
                    <Animated.View
                      style={[
                        styles.imageContainer,
                        {
                          transform: [{ scale }, { translateY }],
                          opacity,
                        },
                      ]}
                    >
                      <Image 
                        source={item.source} 
                        style={styles.image}
                        resizeMode="cover"
                      />
                    </Animated.View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>

        {/* Bottom Content */}
        <View style={styles.bottomContainer}>
          {/* Name Display */}
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{images[currentIndex]?.name}</Text>
            <Text style={styles.hindiNameText}>{images[currentIndex]?.hindiName}</Text>
          </View>

          {/* Indicators */}
          <View style={styles.indicatorContainer}>
            {images.map((_, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.indicator,
                  {
                    backgroundColor: index === currentIndex ? '#FFD700' : 'rgba(255,255,255,0.3)',
                    transform: [{ scale: index === currentIndex ? 1.3 : 1 }],
                  },
                ]}
              />
            ))}
          </View>

          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionText}>Tap focused image to expand</Text>
            <Text style={styles.instructionText}>Long press or double tap to return</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  galleryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemWrapper: {
    width: ITEM_WIDTH + ITEM_SPACING,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  touchableContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.6)',
    backgroundColor: '#333',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  glowEffect: {
    position: 'absolute',
    width: ITEM_WIDTH + 10,
    height: ITEM_HEIGHT + 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 5,
  },
  bottomContainer: {
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
    paddingHorizontal: 20,
    backgroundColor: '#1a1a1a',
  },
  nameContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  nameText: {
    color: '#FFD700',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  hindiNameText: {
    color: 'rgba(255, 215, 0, 0.8)',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  instructionsContainer: {
    alignItems: 'center',
  },
  instructionText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 1,
  },
  
  // Fullscreen Styles
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  fullScreenImageContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 80,
    paddingBottom: 120, // More space for text at bottom
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    maxWidth: screenWidth - 20,
    maxHeight: screenHeight * 0.65, // Reduced height to make room for text
  },
  fullScreenTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)', // Darker background for better text visibility
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  fullScreenName: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  fullScreenHindiName: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  fullScreenDescription: {
    color: '#CCCCCC',
    fontSize: 15,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 50 : 60,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 10,
  },
});