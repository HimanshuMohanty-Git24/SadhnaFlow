/*
 * =================================================================
 * FILE TO UPDATE: /app/(tabs)/library.tsx
 * The styles are updated to ensure the list is centered and has
 * appropriate padding, making it look better on all screen sizes.
 * =================================================================
 */
import { STOTRAS, Stotra } from '@/data/stotras';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LibraryScreen() {
  return (
    <SafeAreaView style={libStyles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#121212" 
        translucent={false}
      />
      
      {/* Bhairav Vigraha Section */}
      <View style={libStyles.specialSection}>
        <Link href="/vigraha" asChild>
          <TouchableOpacity style={libStyles.vigrahaItem}>
            <Text style={libStyles.vigrahaTitle}>🕉️ Bhairav Vigraha</Text>
            <Text style={libStyles.vigrahaSubtitle}>Divine Form for Sadhana</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <FlatList 
        data={STOTRAS} 
        keyExtractor={(item) => item.id} 
        // contentContainerStyle adds padding inside the scrollable area
        contentContainerStyle={libStyles.listContentContainer}
        renderItem={({ item }: { item: Stotra }) => (
          <Link href={`/stotra/${item.id}`} asChild>
            <TouchableOpacity style={libStyles.listItem}>
              <Text style={libStyles.title}>{item.title}</Text>
            </TouchableOpacity>
          </Link>
        )} 
      />
    </SafeAreaView>
  );
}

const libStyles = StyleSheet.create({
  // The main container takes up the full screen and respects safe areas
  container: { 
    flex: 1, 
    backgroundColor: '#121212',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Add padding for Android status bar
  },
  // Special section for Bhairav Vigraha
  specialSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  vigrahaItem: {
    backgroundColor: '#8B4513',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  vigrahaTitle: {
    fontSize: 22,
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  vigrahaSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  // This style applies to the content within the list itself
  listContentContainer: {
    paddingTop: 20, // Adds space at the top of the list
    paddingBottom: 40, // Adds space at the bottom of the list
    paddingHorizontal: 16, // Add horizontal padding for better edge spacing
  },
  listItem: { 
    backgroundColor: '#2C2C2C', 
    padding: 25, 
    marginVertical: 8, 
    marginHorizontal: 0, // Remove horizontal margin since we have padding in container
    borderRadius: 10, 
    alignItems: 'center',
    minHeight: 60, // Ensure consistent minimum height
  },
  title: { 
    fontSize: 18, 
    color: '#FFFFFF', 
    fontWeight: '600',
    textAlign: 'center' // Ensures text is centered if it wraps to a new line
  },
});