import { StorageService } from '@/services/StorageService';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

type JapaCounterProps = { 
  onJapaSaved: () => void; 
  isCompact?: boolean; 
};

export default function JapaCounter({ onJapaSaved, isCompact = false }: JapaCounterProps) {
  const [count, setCount] = useState<number>(0);
  const [malas, setMalas] = useState<number>(0);
  const [isFeedbackEnabled, setIsFeedbackEnabled] = useState(true);
  const tickSound = useRef<Audio.Sound | null>(null);
  const [isLoggingMode, setIsLoggingMode] = useState(false);
  const [malasToLog, setMalasToLog] = useState(1);

  useEffect(() => {
    let isMounted = true;
    const loadSound = async () => {
      try {
        if (isMounted) {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audio/Effect_Tick.mp3')
          );
          tickSound.current = sound;
        }
      } catch (error) {
        console.error("Failed to load tick sound:", error);
      }
    };
    loadSound();
    return () => {
      isMounted = false;
      tickSound.current?.unloadAsync();
    };
  }, []);

  const playFeedback = async () => {
    if (isFeedbackEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      try {
        await tickSound.current?.replayAsync();
      } catch (error) {
        console.error("Failed to play tick sound", error);
      }
    }
  };

  const handlePress = () => {
    playFeedback();
    if (count === 107) {
      setCount(0);
      setMalas(prevMalas => prevMalas + 1);
    } else {
      setCount(prevCount => prevCount + 1);
    }
  };

  const saveAndReset = async (malasToSave: number) => {
    if (malasToSave <= 0) return;
    const session = { malas: malasToSave, date: new Date().toISOString() };
    await StorageService.saveJapaSession(session);
    setCount(0);
    setMalas(0);
    onJapaSaved();
  };

  const handleSave = () => {
    if (malas > 0) {
      Alert.alert("Confirm Save", `This will save your completed ${malas} mālā(s) and reset the counter. Continue?`, [
        { text: "Cancel", style: "cancel" },
        { text: "Save", onPress: () => saveAndReset(malas) },
      ]);
    } else if (count > 0) {
      Alert.alert("Reset Progress?", "You have not completed a full mālā. Would you like to reset your current count to 0?", [
        { text: "Cancel", style: "cancel" },
        { text: "Reset", style: "destructive", onPress: () => { setCount(0); setMalas(0); } },
      ]);
    }
  };

  const handleLogMalaPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsLoggingMode(true);
  };

  const handleConfirmLog = () => {
    const totalMalasToLog = malas + malasToLog;
    Alert.alert(`Log ${malasToLog} Mālā(s)`, `This will save a total of ${totalMalasToLog} mālā(s) and reset the counter. Continue?`, [
        { text: "Cancel", style: "cancel" },
        { text: "Log Mālā", onPress: () => {
            saveAndReset(totalMalasToLog);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setIsLoggingMode(false);
            setMalasToLog(1);
        }},
    ]);
  };

  const handleCancelLog = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsLoggingMode(false);
    setMalasToLog(1);
  };

  // Dynamic styles based on compact mode
  const containerStyle = isCompact ? styles.containerCompact : styles.containerExpanded;
  const buttonStyle = isCompact ? styles.mainButtonCompact : styles.mainButtonExpanded;
  const countTextStyle = isCompact ? styles.countTextCompact : styles.countTextExpanded;
  const malaCountStyle = isCompact ? styles.malaCountCompact : styles.malaCountExpanded;

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity 
        style={styles.feedbackToggle} 
        onPress={() => setIsFeedbackEnabled(!isFeedbackEnabled)}
      >
        <Ionicons name={isFeedbackEnabled ? "volume-high" : "volume-mute"} size={20} color="#888" />
      </TouchableOpacity>

      <Text style={[styles.malaCount, malaCountStyle]}>{malas} Mālā{malas !== 1 ? 's' : ''}</Text>
      
      <TouchableOpacity style={[styles.mainButton, buttonStyle]} onPress={handlePress} activeOpacity={0.7}>
        <Text style={[styles.countText, countTextStyle]}>{count}</Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        {!isLoggingMode ? (
          <>
            <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
              <Text style={styles.actionButtonText}>Save & Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleLogMalaPress}>
              <Text style={styles.actionButtonText}>Log Mālās</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.loggingContainer}>
            <TouchableOpacity onPress={handleCancelLog} style={styles.cancelButton}>
                <Ionicons name="close" size={20} color="#FF6B6B" />
            </TouchableOpacity>
            <View style={styles.stepper}>
                <TouchableOpacity onPress={() => setMalasToLog(c => Math.max(1, c - 1))} style={styles.stepperButton}>
                    <Ionicons name="remove" size={24} color="#FF6D00" />
                </TouchableOpacity>
                <Text style={styles.stepperCount}>{malasToLog}</Text>
                <TouchableOpacity onPress={() => setMalasToLog(c => c + 1)} style={styles.stepperButton}>
                    <Ionicons name="add" size={24} color="#FF6D00" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleConfirmLog} style={styles.confirmButton}>
                <Ionicons name="checkmark" size={20} color="#81C784" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
      alignItems: 'center', 
      backgroundColor: '#1E1E1E', 
      borderRadius: 20, 
      position: 'relative',
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    
    // Expanded mode (when history is collapsed)
    containerExpanded: {
      padding: 40,
      marginHorizontal: 20,
      marginVertical: 20,
    },
    
    // Compact mode (when history is expanded)
    containerCompact: {
      padding: 15,
      marginHorizontal: 15,
      marginVertical: 15,
    },
    
    feedbackToggle: { 
      position: 'absolute', 
      top: 12, 
      right: 12, 
      padding: 5, 
      zIndex: 1 
    },
    
    malaCount: { 
      fontWeight: '300', 
      color: '#E0E0E0', 
      marginBottom: 12, 
      marginTop: 8 
    },
    
    malaCountExpanded: {
      fontSize: 32,
      marginBottom: 20,
    },
    
    malaCountCompact: {
      fontSize: 24,
      marginBottom: 12,
    },
    
    mainButton: { 
      backgroundColor: '#FF6D00', 
      alignItems: 'center', 
      justifyContent: 'center', 
      borderWidth: 6, 
      borderColor: 'rgba(255, 255, 255, 0.15)', 
      elevation: 12,
      shadowColor: '#FF6D00',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
    },
    
    // Expanded button (when history is collapsed)
    mainButtonExpanded: {
      width: 280,
      height: 280,
      borderRadius: 140, // Perfect circle
    },
    
    // Compact button (when history is expanded)  
    mainButtonCompact: {
      width: 180,
      height: 180,
      borderRadius: 90, // Perfect circle
    },
    
    countText: { 
      fontWeight: 'bold', 
      color: '#FFFFFF' 
    },
    
    countTextExpanded: {
      fontSize: 100,
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 4,
    },
    
    countTextCompact: {
      fontSize: 72,
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    
    buttonRow: { 
      flexDirection: 'row', 
      justifyContent: 'space-around', 
      width: '100%', 
      marginTop: 30, 
      minHeight: 50 
    },
    
    actionButton: { 
      backgroundColor: '#333333', 
      paddingVertical: 12, 
      paddingHorizontal: 24, 
      borderRadius: 30, 
      alignItems: 'center', 
      justifyContent: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    
    actionButtonText: { 
      color: '#FFFFFF', 
      fontSize: 15, 
      fontWeight: 'bold' 
    },
    
    // Compact logging styles
    loggingContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#333',
        borderRadius: 25,
        paddingHorizontal: 8,
    },
    stepper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepperButton: {
        padding: 8,
    },
    stepperCount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginHorizontal: 15,
        minWidth: 30,
        textAlign: 'center',
    },
    cancelButton: {
        padding: 8,
        borderRadius: 15,
    },
    confirmButton: {
        padding: 8,
        borderRadius: 15,
    },
});