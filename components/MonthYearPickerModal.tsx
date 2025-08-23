// FIXED: Smooth iOS-like Wheel Picker without flickering
// /components/MonthYearPickerModal.tsx

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, Modal, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type MonthYearPickerProps = {
  visible: boolean;
  initialDate: Date;
  onClose: () => void;
  onSelect: (date: Date) => void;
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const { height: screenHeight } = Dimensions.get('window');
const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;
const WHEEL_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
const PADDING_COUNT = Math.floor(VISIBLE_ITEMS / 2);

const getCurrentYearRange = () => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 15;
  const endYear = currentYear + 5;
  return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
};

// Optimized Wheel Picker Component
const WheelPicker = ({ 
  data, 
  selectedIndex, 
  onValueChange, 
  label 
}: {
  data: (string | number)[];
  selectedIndex: number;
  onValueChange: (index: number) => void;
  label: string;
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const isScrollingRef = useRef(false);
  const lastSelectedIndexRef = useRef(selectedIndex);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize the padded data to prevent re-renders
  const paddedData = React.useMemo(() => [
    ...Array(PADDING_COUNT).fill(''),
    ...data,
    ...Array(PADDING_COUNT).fill('')
  ], [data]);

  // Initialize scroll position only once
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollViewRef.current && selectedIndex >= 0) {
        const initialOffset = selectedIndex * ITEM_HEIGHT;
        scrollViewRef.current.scrollTo({
          y: initialOffset,
          animated: false,
        });
        lastSelectedIndexRef.current = selectedIndex;
      }
    }, 50);

    return () => clearTimeout(timer);
  }, []); // Only run on mount

  // Update scroll position when selectedIndex changes externally
  useEffect(() => {
    if (selectedIndex !== lastSelectedIndexRef.current && !isScrollingRef.current) {
      const timer = setTimeout(() => {
        if (scrollViewRef.current) {
          const offset = selectedIndex * ITEM_HEIGHT;
          scrollViewRef.current.scrollTo({
            y: offset,
            animated: true,
          });
          lastSelectedIndexRef.current = selectedIndex;
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [selectedIndex]);

  // Debounced value change handler
  const debouncedValueChange = useCallback((index: number) => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      if (index !== lastSelectedIndexRef.current && index >= 0 && index < data.length) {
        lastSelectedIndexRef.current = index;
        onValueChange(index);
      }
    }, 50);
  }, [data.length, onValueChange]);

  const handleScrollBeginDrag = useCallback(() => {
    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
  }, []);

  const handleMomentumScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(index, data.length - 1));
    
    // Ensure perfect alignment
    const snapOffset = clampedIndex * ITEM_HEIGHT;
    if (Math.abs(offsetY - snapOffset) > 1) {
      scrollViewRef.current?.scrollTo({
        y: snapOffset,
        animated: true,
      });
    }
    
    isScrollingRef.current = false;
    debouncedValueChange(clampedIndex);
  }, [data.length, debouncedValueChange]);

  const handleScrollEndDrag = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(index, data.length - 1));
    
    // Snap to the nearest item
    const snapOffset = clampedIndex * ITEM_HEIGHT;
    scrollViewRef.current?.scrollTo({
      y: snapOffset,
      animated: true,
    });
    
    debouncedValueChange(clampedIndex);
  }, [data.length, debouncedValueChange]);

  // Render items with memoization
  const renderItems = useMemo(() => {
    return paddedData.map((item, index) => {
      if (item === '') {
        return <View key={`empty-${index}`} style={styles.wheelItem} />;
      }
      
      const actualIndex = index - PADDING_COUNT;
      const isSelected = actualIndex === selectedIndex;
      const distance = Math.abs(actualIndex - selectedIndex);
      
      // Calculate opacity and scale based on distance from center
      let opacity = 1;
      let scale = 1;
      
      if (distance === 1) {
        opacity = 0.6;
        scale = 0.9;
      } else if (distance === 2) {
        opacity = 0.3;
        scale = 0.8;
      } else if (distance > 2) {
        opacity = 0.1;
        scale = 0.7;
      }

      return (
        <View
          key={`${item}-${actualIndex}`}
          style={[
            styles.wheelItem,
            {
              opacity,
              transform: [{ scale }],
            }
          ]}
        >
          <Text style={[
            styles.wheelItemText,
            isSelected && styles.wheelItemTextSelected
          ]}>
            {item}
          </Text>
        </View>
      );
    });
  }, [paddedData, selectedIndex]);

  return (
    <View style={styles.wheelSection}>
      <Text style={styles.wheelLabel}>{label}</Text>
      <View style={styles.wheelContainer}>
        {/* Selection indicator overlay */}
        <View style={styles.selectionIndicator} />
        
        <ScrollView 
          ref={scrollViewRef}
          style={styles.wheel}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          snapToAlignment="start"
          decelerationRate="fast"
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={32} // Higher value for smoother performance
          bounces={false}
          overScrollMode="never"
          contentContainerStyle={styles.scrollContent}
        >
          {renderItems}
        </ScrollView>
      </View>
    </View>
  );
};

export default function MonthYearPickerModal({ visible, initialDate, onClose, onSelect }: MonthYearPickerProps) {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(initialDate.getMonth());
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  
  const years = useMemo(() => getCurrentYearRange(), []);
  
  // Initialize year index
  useEffect(() => {
    if (visible) {
      const monthIndex = initialDate.getMonth();
      const yearIndex = years.findIndex(year => year === initialDate.getFullYear());
      
      setSelectedMonthIndex(monthIndex);
      if (yearIndex !== -1) {
        setSelectedYearIndex(yearIndex);
      }
    }
  }, [visible, initialDate, years]);

  const handleConfirm = useCallback(() => {
    const selectedYear = years[selectedYearIndex];
    const newDate = new Date(selectedYear, selectedMonthIndex, 1);
    onSelect(newDate);
    onClose();
  }, [years, selectedYearIndex, selectedMonthIndex, onSelect, onClose]);

  const handleCancel = useCallback(() => {
    const monthIndex = initialDate.getMonth();
    const yearIndex = years.findIndex(year => year === initialDate.getFullYear());
    
    setSelectedMonthIndex(monthIndex);
    if (yearIndex !== -1) {
      setSelectedYearIndex(yearIndex);
    }
    onClose();
  }, [initialDate, years, onClose]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Month & Year</Text>
            <Text style={styles.selectedDisplay}>
              {MONTHS[selectedMonthIndex]} {years[selectedYearIndex]}
            </Text>
          </View>
          
          <View style={styles.pickersContainer}>
            <WheelPicker
              data={MONTHS}
              selectedIndex={selectedMonthIndex}
              onValueChange={setSelectedMonthIndex}
              label="Month"
            />
            
            <WheelPicker
              data={years}
              selectedIndex={selectedYearIndex}
              onValueChange={setSelectedYearIndex}
              label="Year"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={handleCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.confirmButton]} 
              onPress={handleConfirm}
              activeOpacity={0.7}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  header: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  selectedDisplay: {
    fontSize: 18,
    color: '#FF6D00',
    fontWeight: '600',
  },
  pickersContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 10,
  },
  wheelSection: {
    flex: 1,
    alignItems: 'center',
  },
  wheelLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#CCCCCC',
    marginBottom: 12,
    textAlign: 'center',
  },
  wheelContainer: {
    position: 'relative',
    height: WHEEL_HEIGHT,
    width: '100%',
  },
  wheel: {
    height: WHEEL_HEIGHT,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingVertical: 0,
  },
  selectionIndicator: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    left: 10,
    right: 10,
    height: ITEM_HEIGHT,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 109, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 109, 0, 0.3)',
    zIndex: 1,
    pointerEvents: 'none',
  },
  wheelItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  wheelItemText: {
    fontSize: 18,
    color: '#CCCCCC',
    fontWeight: '500',
    textAlign: 'center',
  },
  wheelItemTextSelected: {
    color: '#FF6D00',
    fontWeight: 'bold',
    fontSize: 19,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 10,
    gap: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#404040',
    borderWidth: 1,
    borderColor: '#555',
  },
  confirmButton: {
    backgroundColor: '#FF6D00',
    elevation: 3,
    shadowColor: '#FF6D00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cancelButtonText: {
    color: '#CCCCCC',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});