/*  
 * FILE: /app/(tabs)/library.tsx  
 * Updated to replace Bhairav Vigraha with Reddit community link
 * The Reddit section has an attractive, small yet tempting design to join the community
 * ================================================================= 
 */ 
import { STOTRAS, Stotra } from '@/data/stotras';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, Image, Linking, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LibraryScreen() {
  const handleRedditPress = async () => {
    const url = 'https://www.reddit.com/r/TantraUncensored/';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Failed to open Reddit link:', error);
    }
  };

  return (
    <SafeAreaView style={libStyles.container}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="#121212"
        translucent={false}
      />
            
      {/* Reddit Community Section */}
      <View style={libStyles.specialSection}>
        <TouchableOpacity style={libStyles.redditItem} onPress={handleRedditPress}>
          <View style={libStyles.redditHeader}>
            <Image 
              source={require('@/assets/images/reddit_logo.jpg')} 
              style={libStyles.redditLogo}
              resizeMode="contain"
            />
            <View style={libStyles.redditTextContainer}>
              <Text style={libStyles.redditTitle}>Join Our Community</Text>
              <Text style={libStyles.redditSubtitle}>r/TantraUncensored</Text>
            </View>
          </View>
          <Text style={libStyles.redditDescription}>
            Have doubts? Want to learn? Join fellow sadhaks to ask questions and share insights
          </Text>
          <View style={libStyles.redditCTA}>
            <Text style={libStyles.redditCTAText}>Tap to Join →</Text>
          </View>
        </TouchableOpacity>
      </View>
       
      <FlatList 
        data={STOTRAS}
        keyExtractor={(item) => item.id}
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
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  
  // Special section for Reddit community
  specialSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  
  redditItem: {
    backgroundColor: '#1A1A1B',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FF4500',
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  
  redditHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  redditLogo: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  
  redditTextContainer: {
    flex: 1,
  },
  
  redditTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  
  redditSubtitle: {
    fontSize: 14,
    color: '#FF4500',
    fontWeight: '600',
  },
  
  redditDescription: {
    fontSize: 12,
    color: '#CCCCCC',
    lineHeight: 16,
    marginBottom: 8,
  },
  
  redditCTA: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF4500',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  
  redditCTAText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  // List styles remain the same
  listContentContainer: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  
  listItem: {
    backgroundColor: '#2C2C2C',
    padding: 25,
    marginVertical: 8,
    marginHorizontal: 0,
    borderRadius: 10,
    alignItems: 'center',
    minHeight: 60,
  },
  
  title: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
});