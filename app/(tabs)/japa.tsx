/*
 * =================================================================
 * File: /app/(tabs)/japa.tsx (Replace contents)
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
      <JapaCounter onJapaSaved={loadHistory} />
      <Text style={japaScreenStyles.historyTitle}>Recent Sādhanā</Text>
      <FlatList data={history} keyExtractor={(item) => item.date} ListEmptyComponent={<Text style={japaScreenStyles.emptyText}>No history yet.</Text>} renderItem={({ item }: { item: JapaSession }) => (
        <View style={japaScreenStyles.historyItem}>
          <Text style={japaScreenStyles.historyText}>{item.malas} mālā(s)</Text>
          <Text style={japaScreenStyles.historyDate}>{new Date(item.date).toLocaleDateString()}</Text>
        </View>
      )} />
    </SafeAreaView>
  );
}

const japaScreenStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  historyTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', marginLeft: 20, marginTop: 10, marginBottom: 10 },
  historyItem: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1E1E1E', padding: 15, marginVertical: 4, marginHorizontal: 20, borderRadius: 10 },
  historyText: { color: '#E0E0E0', fontSize: 16 },
  historyDate: { color: '#A0A0A0', fontSize: 14 },
  emptyText: { textAlign: 'center', color: '#A0A0A0', marginTop: 20 },
});