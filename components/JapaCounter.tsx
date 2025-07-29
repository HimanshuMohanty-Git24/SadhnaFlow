/*
 * =================================================================
 * FILE TO UPDATE: /components/JapaCounter.tsx
 * The "Save & Reset" button logic has been updated as requested.
 * For stability with the simple tick sound, this version uses expo-av.
 * =================================================================
 */
import { StorageService } from '@/services/StorageService';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type JapaCounterProps = { onJapaSaved: () => void; };

export default function JapaCounter({ onJapaSaved }: JapaCounterProps) {
  const [count, setCount] = useState<number>(0);
  const [malas, setMalas] = useState<number>(0);
  const [isFeedbackEnabled, setIsFeedbackEnabled] = useState(true);
  const tickSound = useRef<Audio.Sound | null>(null);

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
    const session = { malas: malasToSave, date: new Date().toISOString() };
    await StorageService.saveJapaSession(session);
    setCount(0);
    setMalas(0);
    onJapaSaved();
  };

  const handleSave = () => {
    // If user has completed mālās, prompt to save them.
    if (malas > 0) {
      Alert.alert("Confirm Save", `This will save your completed ${malas} mālā(s) and reset the counter. Continue?`, [
        { text: "Cancel", style: "cancel" },
        { text: "Save", onPress: () => saveAndReset(malas) },
      ]);
    } 
    // If no mālās are complete, but there's a partial count, prompt to reset.
    else if (count > 0) {
      Alert.alert("Reset Progress?", "You have not completed a full mālā. Would you like to reset your current count to 0?", [
        { text: "Cancel", style: "cancel" },
        { text: "Reset", style: "destructive", onPress: () => setCount(0) },
      ]);
    }
    // If both are 0, do nothing.
  };

  const handleLogOneMala = () => {
    const totalMalasToLog = malas + 1;
    Alert.alert("Log 1 Full Mālā", `This will add 1 full mālā to your current count of ${malas} and save a total of ${totalMalasToLog} mālā(s). Continue?`, [
        { text: "Cancel", style: "cancel" },
        { text: "Log Mālā", onPress: () => saveAndReset(totalMalasToLog) },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.feedbackToggle} 
        onPress={() => setIsFeedbackEnabled(!isFeedbackEnabled)}
      >
        <Ionicons 
          name={isFeedbackEnabled ? "volume-high" : "volume-mute"} 
          size={24} 
          color="#888" 
        />
      </TouchableOpacity>

      <Text style={styles.malaCount}>{malas} Mālā{malas !== 1 ? 's' : ''}</Text>
      
      <TouchableOpacity style={styles.mainButton} onPress={handlePress} activeOpacity={0.7}>
        <Text style={styles.countText}>{count}</Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
            <Text style={styles.actionButtonText}>Save & Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleLogOneMala}>
            <Text style={styles.actionButtonText}>+1 Mālā & Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
      alignItems: 'center', 
      padding: 20, 
      backgroundColor: '#1E1E1E', 
      borderRadius: 20, 
      margin: 20,
      position: 'relative',
    },
    feedbackToggle: {
      position: 'absolute',
      top: 15,
      right: 15,
      padding: 5,
      zIndex: 1,
    },
    malaCount: { 
      fontSize: 32, 
      fontWeight: '300', 
      color: '#E0E0E0', 
      marginBottom: 20,
      marginTop: 20,
    },
    mainButton: { 
        width: 220, 
        height: 220, 
        borderRadius: 110, 
        backgroundColor: '#FF6D00', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderWidth: 5, 
        borderColor: 'rgba(255, 255, 255, 0.2)',
        ...Platform.select({
            android: {
                elevation: 8,
            },
        }),
    },
    countText: { fontSize: 80, fontWeight: 'bold', color: '#FFFFFF' },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 30 },
    actionButton: { backgroundColor: '#333333', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 30 },
    actionButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});