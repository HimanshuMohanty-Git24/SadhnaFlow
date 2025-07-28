/*
 * =================================================================
 * FILE TO UPDATE: /app/(tabs)/japa.tsx
 * The styles have been updated to use Flexbox to distribute space
 * vertically, ensuring the UI fills the screen on any device.
 * =================================================================
 */
import JapaCounter from '@/components/JapaCounter';
import { JapaSession, StorageService } from '@/services/StorageService';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function JapaScreen() {
  const [history, setHistory] = useState<JapaSession[]>([]);

  const loadHistory = async () => {
    const data = await StorageService.getJapaHistory();
    setHistory(data);
  };

  useFocusEffect(useCallback(() => { loadHistory(); }, []));

  return (
    <SafeAreaView style={japaScreenStyles.container}>
      {/* The JapaCounter is now wrapped in a view to control its layout */}
      <View style={japaScreenStyles.topContainer}>
        <JapaCounter onJapaSaved={loadHistory} />
      </View>
      
      {/* The history section will now expand to fill the remaining space */}
      <View style={japaScreenStyles.bottomContainer}>
        <Text style={japaScreenStyles.historyTitle}>Recent Sādhanā</Text>
        <FlatList 
          data={history} 
          keyExtractor={(item) => item.date} 
          ListEmptyComponent={<Text style={japaScreenStyles.emptyText}>No history yet.</Text>} 
          renderItem={({ item }: { item: JapaSession }) => (
            <View style={japaScreenStyles.historyItem}>
              <Text style={japaScreenStyles.historyText}>{item.malas} mālā(s)</Text>
              <Text style={japaScreenStyles.historyDate}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
          )} 
        />
      </View>
    </SafeAreaView>
  );
}

const japaScreenStyles = StyleSheet.create({
  // The main container now uses flex: 1 to take up the full screen height
  container: { 
    flex: 1, 
    backgroundColor: '#121212' 
  },
  // This container holds the Japa counter at the top
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20, // Add some space from the top
  },
  // This container holds the history and is set to expand
  bottomContainer: {
    flex: 1, // This is the key change: it makes the container grow
    marginTop: 20,
  },
  historyTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#FFFFFF', 
    marginLeft: 20, 
    marginBottom: 10 
  },
  historyItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: '#1E1E1E', 
    padding: 15, 
    marginVertical: 4, 
    marginHorizontal: 20, 
    borderRadius: 10 
  },
  historyText: { 
    color: '#E0E0E0', 
    fontSize: 16 
  },
  historyDate: { 
    color: '#A0A0A0', 
    fontSize: 14 
  },
  emptyText: { 
    textAlign: 'center', 
    color: '#A0A0A0', 
    marginTop: 20 
  },
});