import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, StyleSheet, View } from 'react-native';

interface CustomSliderProps {
  style?: object;
  minimumValue: number;
  maximumValue: number;
  value: number;
  onSlidingStart?: () => void;
  onValueChange?: (value: number) => void;
  onSlidingComplete: (value: number) => void;
  minimumTrackTintColor: string;
  maximumTrackTintColor: string;
  thumbTintColor: string;
  disabled?: boolean;
}

export default function CustomSlider({ 
  style, 
  minimumValue, 
  maximumValue, 
  value, 
  onSlidingStart, 
  onValueChange, 
  onSlidingComplete, 
  minimumTrackTintColor, 
  maximumTrackTintColor, 
  thumbTintColor, 
  disabled = false 
}: CustomSliderProps) {
  const [trackWidth, setTrackWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const thumbPosition = useRef(new Animated.Value(0)).current;

  const THUMB_SIZE = 24;
  const TRACK_HEIGHT = 4;

  // Calculate progress percentage
  const getProgressPercentage = (currentValue: number): number => {
    if (maximumValue === minimumValue) return 0;
    return Math.max(0, Math.min(1, (currentValue - minimumValue) / (maximumValue - minimumValue)));
  };

  // Convert percentage to position
  const percentageToPosition = (percentage: number): number => {
    const availableWidth = trackWidth - THUMB_SIZE;
    return Math.max(0, Math.min(percentage * availableWidth, availableWidth));
  };

  // Convert position to value
  const positionToValue = (position: number): number => {
    const availableWidth = trackWidth - THUMB_SIZE;
    if (availableWidth <= 0) return minimumValue;
    
    const percentage = Math.max(0, Math.min(1, position / availableWidth));
    return minimumValue + (percentage * (maximumValue - minimumValue));
  };

  // Update thumb position when value changes externally (only if not dragging)
  useEffect(() => {
    if (!isDragging && trackWidth > 0) {
      const percentage = getProgressPercentage(value);
      const newPosition = percentageToPosition(percentage);
      thumbPosition.setValue(newPosition);
    }
  }, [value, trackWidth, isDragging]);

  // FIXED: Use useCallback to prevent onLayout infinite loop
  const handleLayout = useCallback((event: any) => {
    const { width } = event.nativeEvent.layout;
    // Only update if width actually changed
    if (width !== trackWidth && width > 0) {
      setTrackWidth(width);
    }
  }, [trackWidth]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled && trackWidth > 0,
      onMoveShouldSetPanResponder: () => !disabled && trackWidth > 0,
      
      onPanResponderGrant: (evt) => {
        if (disabled || trackWidth <= 0) return;
        
        console.log('Slider: Starting drag');
        setIsDragging(true);
        onSlidingStart?.();
        
        // Calculate position from touch location
        const touchX = evt.nativeEvent.locationX - (THUMB_SIZE / 2);
        const availableWidth = trackWidth - THUMB_SIZE;
        const clampedPosition = Math.max(0, Math.min(touchX, availableWidth));
        
        thumbPosition.setValue(clampedPosition);
        
        const newValue = positionToValue(clampedPosition);
        console.log('Slider: New value on grant:', newValue);
        onValueChange?.(newValue);
      },
      
      onPanResponderMove: (evt, gestureState) => {
        if (disabled || trackWidth <= 0) return;
        
        // Calculate new position based on gesture
        const startTouchX = evt.nativeEvent.locationX - gestureState.dx - (THUMB_SIZE / 2);
        const currentTouchX = startTouchX + gestureState.dx;
        const availableWidth = trackWidth - THUMB_SIZE;
        const clampedPosition = Math.max(0, Math.min(currentTouchX, availableWidth));
        
        thumbPosition.setValue(clampedPosition);
        
        const newValue = positionToValue(clampedPosition);
        onValueChange?.(newValue);
      },
      
      onPanResponderRelease: (evt, gestureState) => {
        if (disabled || trackWidth <= 0) return;
        
        console.log('Slider: Ending drag');
        
        // Calculate final position
        const startTouchX = evt.nativeEvent.locationX - gestureState.dx - (THUMB_SIZE / 2);
        const finalTouchX = startTouchX + gestureState.dx;
        const availableWidth = trackWidth - THUMB_SIZE;
        const finalPosition = Math.max(0, Math.min(finalTouchX, availableWidth));
        
        thumbPosition.setValue(finalPosition);
        
        const finalValue = positionToValue(finalPosition);
        console.log('Slider: Final value:', finalValue);
        onSlidingComplete(finalValue);
        setIsDragging(false);
      },
      
      onPanResponderTerminate: () => {
        console.log('Slider: Drag terminated');
        setIsDragging(false);
      },
    })
  ).current;

  // Don't render if track is too small
  if (trackWidth <= THUMB_SIZE) {
    return (
      <View 
        style={[styles.container, style]} 
        onLayout={handleLayout}
      />
    );
  }

  const availableWidth = trackWidth - THUMB_SIZE;

  return (
    <View 
      style={[styles.container, style]} 
      onLayout={handleLayout}
    >
      {/* Touch area - separate from visual elements */}
      <View 
        style={[styles.touchArea, { width: trackWidth }]}
        {...panResponder.panHandlers}
      />
      
      {/* Visual elements */}
      <View style={styles.visualContainer}>
        {/* Background track */}
        <View 
          style={[
            styles.track, 
            { 
              backgroundColor: maximumTrackTintColor,
              height: TRACK_HEIGHT,
              width: trackWidth - THUMB_SIZE,
              left: THUMB_SIZE / 2,
            }
          ]} 
        />
        
        {/* Progress track */}
        <Animated.View 
          style={[
            styles.progressTrack, 
            { 
              backgroundColor: minimumTrackTintColor, 
              height: TRACK_HEIGHT,
              left: THUMB_SIZE / 2,
              width: thumbPosition.interpolate({
                inputRange: [0, availableWidth || 1],
                outputRange: [0, availableWidth || 1],
                extrapolate: 'clamp'
              })
            }
          ]} 
        />
        
        {/* Thumb */}
        <Animated.View 
          style={[
            styles.thumb, 
            { 
              backgroundColor: thumbTintColor,
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              borderRadius: THUMB_SIZE / 2,
              transform: [{ 
                translateX: thumbPosition.interpolate({
                  inputRange: [0, availableWidth || 1],
                  outputRange: [0, availableWidth || 0],
                  extrapolate: 'clamp'
                })
              }] 
            }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    height: 40, 
    justifyContent: 'center',
    position: 'relative',
  },
  touchArea: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 10, // Make sure it's on top
  },
  visualContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  track: { 
    position: 'absolute', 
    borderRadius: 2, 
    top: '50%',
    marginTop: -2,
  },
  progressTrack: { 
    position: 'absolute', 
    borderRadius: 2, 
    top: '50%',
    marginTop: -2,
  },
  thumb: { 
    position: 'absolute', 
    borderWidth: 3, 
    borderColor: 'white',
    top: '50%',
    marginTop: -12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    zIndex: 5,
  },
});