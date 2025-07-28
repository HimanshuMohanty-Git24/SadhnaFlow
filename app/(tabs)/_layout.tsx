/*
 * =================================================================
 * File: /app/(tabs)/_layout.tsx (Replace contents)
 * =================================================================
 */
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#FF6D00', tabBarInactiveTintColor: 'gray', headerShown: false, tabBarStyle: { backgroundColor: '#1E1E1E', borderTopColor: '#333' } }}>
      <Tabs.Screen name="japa" options={{ title: 'Jāpa', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'sync-circle' : 'sync-circle-outline'} size={28} color={color} /> }} />
      <Tabs.Screen name="library" options={{ title: 'Library', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'book' : 'book-outline'} size={28} color={color} /> }} />
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}