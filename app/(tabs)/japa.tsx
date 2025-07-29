/*
 * =================================================================
 * FILE TO UPDATE: /app/(tabs)/japa.tsx
 * The styles have been updated to correctly center the "No history yet"
 * message when the list is empty, fixing the layout issue.
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
      <View style={japaScreenStyles.topContainer}>
        <JapaCounter onJapaSaved={loadHistory} />
      </View>
      
      <View style={japaScreenStyles.bottomContainer}>
        <Text style={japaScreenStyles.historyTitle}>Recent Sādhanā</Text>
        <FlatList 
          data={history} 
          keyExtractor={(item) => item.date}
          // This combination of styles ensures the empty message is centered
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            <View style={japaScreenStyles.emptyContainer}>
              <Text style={japaScreenStyles.emptyText}>No history yet.</Text>
            </View>
          } 
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
  container: { 
    flex: 1, 
    backgroundColor: '#121212' 
  },
  topContainer: {
    // This container just holds the counter at the top
  },
  bottomContainer: {
    flex: 1, // This makes the history section expand
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
  // New container style to center the empty message
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: { 
    color: '#A0A0A0', 
    fontStyle: 'italic',
  },
});