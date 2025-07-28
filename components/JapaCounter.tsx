/*
 * =================================================================
 * FILE TO UPDATE: /components/JapaCounter.tsx
 * Removed the deprecated `shadow*` props to fix the warning.
 * The functionality remains the same.
 * =================================================================
 */
import { StorageService } from '@/services/StorageService';
import React, { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type JapaCounterProps = { onJapaSaved: () => void; };

export default function JapaCounter({ onJapaSaved }: JapaCounterProps) {
  const [count, setCount] = useState<number>(0);
  const [malas, setMalas] = useState<number>(0);

  const handlePress = () => {
    if (count === 107) {
      setCount(0);
      setMalas(prevMalas => prevMalas + 1);
    } else {
      setCount(prevCount => prevCount + 1);
    }
  };

  const saveAndReset = async (malasToSave: number) => {
    if (malasToSave <= 0) {
        Alert.alert("No Mālās", "There are no completed mālās to save.");
        return;
    }
    const session = { malas: malasToSave, date: new Date().toISOString() };
    await StorageService.saveJapaSession(session);
    setCount(0);
    setMalas(0);
    onJapaSaved();
  };

  const handleSave = () => {
    Alert.alert("Confirm Save", `This will save your completed ${malas} mālā(s) and reset the counter. Continue?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Save", onPress: () => saveAndReset(malas) },
    ]);
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
    container: { alignItems: 'center', padding: 20, backgroundColor: '#1E1E1E', borderRadius: 20, margin: 20 },
    malaCount: { fontSize: 32, fontWeight: '300', color: '#E0E0E0', marginBottom: 20 },
    // Removed shadow properties and added elevation for Android for a similar effect without warnings.
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
    actionButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});