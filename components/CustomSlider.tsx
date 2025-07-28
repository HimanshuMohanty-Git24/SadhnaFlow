/*
 * =================================================================
 * FILE TO UPDATE: /components/CustomSlider.tsx
 * This version has the corrected PanResponder logic for smooth seeking.
 * =================================================================
 */
import React, { useRef, useState } from 'react';
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

export default function CustomSlider({ style, minimumValue, maximumValue, value, onSlidingStart, onValueChange, onSlidingComplete, minimumTrackTintColor, maximumTrackTintColor, thumbTintColor, disabled = false }: CustomSliderProps) {
  const [trackWidth, setTrackWidth] = useState(0);
  const pan = useRef(new Animated.Value(0)).current;
  const isSliding = useRef(false);

  const valueToX = (currentValue: number): number => {
    if (!trackWidth || maximumValue === minimumValue) return 0;
    const percentage = (currentValue - minimumValue) / (maximumValue - minimumValue);
    return percentage * trackWidth;
  };

  const xToValue = (x: number): number => {
    if (!trackWidth) return minimumValue;
    const percentage = x / trackWidth;
    const newValue = percentage * (maximumValue - minimumValue) + minimumValue;
    return Math.max(minimumValue, Math.min(newValue, maximumValue));
  };
  
  if (!isSliding.current) {
    pan.setValue(valueToX(value));
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: () => {
        isSliding.current = true;
        pan.setOffset(pan._value);
        pan.setValue(0);
        onSlidingStart?.();
      },
      onPanResponderMove: (e, gestureState) => {
        const newX = pan._offset + gestureState.dx;
        const clampedX = Math.max(0, Math.min(newX, trackWidth));
        pan.setValue(clampedX - pan._offset);
        if (onValueChange) {
          onValueChange(xToValue(clampedX));
        }
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
        const finalValue = xToValue(pan._value);
        onSlidingComplete(finalValue);
        isSliding.current = false;
      },
    })
  ).current;

  return (
    <View style={[styles.container, style]} onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}>
      <View style={[styles.track, { backgroundColor: maximumTrackTintColor }]} />
      <Animated.View style={[styles.track, { backgroundColor: minimumTrackTintColor, width: pan }]} />
      <Animated.View {...panResponder.panHandlers} style={[styles.thumb, { backgroundColor: thumbTintColor, transform: [{ translateX: pan }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { justifyContent: 'center', height: 40, paddingVertical: 15 },
    track: { position: 'absolute', height: 6, borderRadius: 3, width: '100%' },
    thumb: { position: 'absolute', width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: 'white', left: -10 },
});