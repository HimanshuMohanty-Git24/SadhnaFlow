/*
 * =================================================================
 * File: /app/(tabs)/library.tsx (Create this file)
 * Improved with centered text.
 * =================================================================
 */
import { STOTRAS, Stotra } from '@/data/stotras';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function LibraryScreen() {
  return (
    <SafeAreaView style={libStyles.container}>
      <FlatList data={STOTRAS} keyExtractor={(item) => item.id} renderItem={({ item }: { item: Stotra }) => (
        <Link href={`/stotra/${item.id}`} asChild>
          <TouchableOpacity style={libStyles.listItem}>
            <Text style={libStyles.title}>{item.title}</Text>
          </TouchableOpacity>
        </Link>
      )} />
    </SafeAreaView>
  );
}

const libStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingTop: 10 },
  listItem: { backgroundColor: '#2C2C2C', padding: 25, marginVertical: 8, marginHorizontal: 16, borderRadius: 10, alignItems: 'center' },
  title: { fontSize: 18, color: '#FFFFFF', fontWeight: '600' },
});
