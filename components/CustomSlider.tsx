import React, { useEffect, useRef, useState } from 'react';
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
  const pan = useRef(new Animated.Value(0)).current;
  const isSliding = useRef(false);

  const THUMB_SIZE = 20;
  const TRACK_HEIGHT = 6;

  // Calculate the usable track width (excluding thumb radius on both sides)
  const getUsableTrackWidth = (): number => {
    return Math.max(0, trackWidth - THUMB_SIZE);
  };

  const valueToPosition = (currentValue: number): number => {
    if (!trackWidth || maximumValue === minimumValue) return 0;
    const usableWidth = getUsableTrackWidth();
    if (usableWidth <= 0) return 0;
    
    const percentage = Math.max(0, Math.min(1, (currentValue - minimumValue) / (maximumValue - minimumValue)));
    return percentage * usableWidth;
  };

  const positionToValue = (position: number): number => {
    if (!trackWidth) return minimumValue;
    const usableWidth = getUsableTrackWidth();
    if (usableWidth <= 0) return minimumValue;
    
    const clampedPosition = Math.max(0, Math.min(position, usableWidth));
    const percentage = clampedPosition / usableWidth;
    const newValue = percentage * (maximumValue - minimumValue) + minimumValue;
    
    return Math.max(minimumValue, Math.min(newValue, maximumValue));
  };

  // Update pan position when value changes externally (only if not sliding)
  useEffect(() => {
    if (!isSliding.current && trackWidth > THUMB_SIZE) {
      const newPosition = valueToPosition(value);
      pan.setValue(newPosition);
    }
  }, [value, trackWidth]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled && trackWidth > THUMB_SIZE,
      onMoveShouldSetPanResponder: () => !disabled && trackWidth > THUMB_SIZE,
      
      onPanResponderGrant: (evt) => {
        if (disabled) return;
        
        isSliding.current = true;
        onSlidingStart?.();
        
        // CRITICAL FIX: Set the offset to current position
        pan.setOffset(pan._value);
        pan.setValue(0);
        
        // Get the touch position relative to the container
        const touchX = evt.nativeEvent.locationX - (THUMB_SIZE / 2);
        const usableWidth = getUsableTrackWidth();
        const newPosition = Math.max(0, Math.min(touchX, usableWidth));
        
        // Calculate the difference from current position
        const currentPosition = valueToPosition(value);
        const deltaX = newPosition - currentPosition;
        
        pan.setValue(deltaX);
        
        const newValue = positionToValue(newPosition);
        onValueChange?.(newValue);
      },
      
      onPanResponderMove: Animated.event(
        [null, { dx: pan }],
        { 
          useNativeDriver: false,
          listener: (evt, gestureState) => {
            if (disabled) return;
            
            // Calculate the new position based on offset + gesture
            const currentOffset = pan._offset;
            const newPosition = currentOffset + gestureState.dx;
            const clampedPosition = Math.max(0, Math.min(newPosition, getUsableTrackWidth()));
            
            const newValue = positionToValue(clampedPosition);
            onValueChange?.(newValue);
          }
        }
      ),
      
      onPanResponderRelease: (evt, gestureState) => {
        if (disabled) return;
        
        // CRITICAL FIX: Flatten the offset to merge it with the value
        pan.flattenOffset();
        
        const finalPosition = Math.max(0, Math.min(pan._value, getUsableTrackWidth()));
        pan.setValue(finalPosition);
        
        const finalValue = positionToValue(finalPosition);
        onSlidingComplete(finalValue);
        isSliding.current = false;
      },
    })
  ).current;

  // Don't render if track is too small
  if (trackWidth <= THUMB_SIZE) {
    return (
      <View 
        style={[styles.container, style]} 
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setTrackWidth(width);
        }} 
      />
    );
  }

  const usableWidth = getUsableTrackWidth();

  return (
    <View 
      style={[styles.container, style]} 
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setTrackWidth(width);
      }}
      {...panResponder.panHandlers}
    >
      {/* Background track */}
      <View 
        style={[
          styles.track, 
          { 
            backgroundColor: maximumTrackTintColor,
            left: THUMB_SIZE / 2,
            right: THUMB_SIZE / 2,
            height: TRACK_HEIGHT,
          }
        ]} 
      />
      
      {/* Progress track */}
      <Animated.View 
        style={[
          styles.progressTrack, 
          { 
            backgroundColor: minimumTrackTintColor, 
            left: THUMB_SIZE / 2,
            height: TRACK_HEIGHT,
            width: pan.interpolate({
              inputRange: [0, usableWidth || 1],
              outputRange: [THUMB_SIZE / 2, trackWidth - (THUMB_SIZE / 2)],
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
              translateX: pan.interpolate({
                inputRange: [0, usableWidth || 1],
                outputRange: [0, usableWidth || 0],
                extrapolate: 'clamp'
              })
            }] 
          }
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    justifyContent: 'center', 
    height: 40, 
    paddingVertical: 10,
    position: 'relative',
  },
  track: { 
    position: 'absolute', 
    borderRadius: 3, 
    top: '50%',
    marginTop: -3,
  },
  progressTrack: { 
    position: 'absolute', 
    borderRadius: 3, 
    top: '50%',
    marginTop: -3,
  },
  thumb: { 
    position: 'absolute', 
    borderWidth: 2, 
    borderColor: 'white',
    top: '50%',
    marginTop: -10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});