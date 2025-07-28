/*
 * =================================================================
 * FILE TO UPDATE: /app/stotra/[id].tsx
 * Fixed version with proper error handling to prevent crashes
 * when navigating away while audio is playing.
 * =================================================================
 */
import AudioPlayer from '@/components/AudioPlayer';
import { STOTRAS, Stanza } from '@/data/stotras';
import { useSadhanaAudioPlayer } from '@/hooks/useAudioPlayer';
import { Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const StanzaItem = ({ item }: { item: Stanza }) => (
    <View style={detailStyles.stanzaContainer}>
        <Text style={detailStyles.sanskritText}>{item.sanskrit}</Text>
        <Text style={detailStyles.transliterationText}>{item.transliteration}</Text>
        <Text style={detailStyles.translationText}>{item.translation}</Text>
    </View>
);

export default function StotraDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const stotra = STOTRAS.find((s) => s.id === id);

  // The hook is now called at the top level of the screen component
  const { player, status } = useSadhanaAudioPlayer(stotra?.audio || 'kal_bhairav.mp3');

  // FIXED: Added proper error handling and null checks
  useFocusEffect(
    React.useCallback(() => {
      // This runs when the screen comes into focus
      return () => {
        // This cleanup function runs when the screen goes out of focus
        try {
          if (player && status?.playing) {
            // Check if player is still valid before calling pause
            if (typeof player.pause === 'function') {
              player.pause();
            }
          }
        } catch (error) {
          // Silently handle the error - this is expected when the player is already released
          console.log('Audio player already released - this is normal when navigating away');
        }
      };
    }, [player, status?.playing]) // Added optional chaining for status
  );

  if (!stotra) {
    return (
      <SafeAreaView style={detailStyles.container}><Text style={detailStyles.title}>Stotra not found</Text></SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={detailStyles.container}>
      <Stack.Screen options={{ title: stotra.title }} />
      <FlatList
        data={stotra.stanzas}
        keyExtractor={(item, index) => `${stotra.id}-stanza-${index}`}
        renderItem={({ item }) => <StanzaItem item={item} />}
        ListHeaderComponent={
          <>
            <Text style={detailStyles.title}>{stotra.title}</Text>
            {/* We pass the player and status down to the UI component */}
            <AudioPlayer player={player} status={status} />
          </>
        }
        contentContainerStyle={detailStyles.scrollContent}
      />
    </SafeAreaView>
  );
}

const detailStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  scrollContent: { paddingBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center', marginVertical: 20, paddingHorizontal: 10 },
  stanzaContainer: { backgroundColor: '#1E1E1E', marginHorizontal: 16, marginVertical: 8, padding: 20, borderRadius: 12 },
  sanskritText: { fontSize: 22, color: '#FFFFFF', lineHeight: 36, marginBottom: 15, textAlign: 'center' },
  transliterationText: { fontSize: 16, color: '#B0B0B0', fontStyle: 'italic', lineHeight: 26, marginBottom: 15, textAlign: 'center' },
  translationText: { fontSize: 16, color: '#E0E0E0', lineHeight: 24, textAlign: 'center' },
});