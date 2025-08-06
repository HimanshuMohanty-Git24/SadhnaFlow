import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

const bhairavImages = [
  {
    id: 1,
    title: 'Bhairav in Meditation',
    source: require('@/assets/images/Batuka_Bhairav.jpg'),
    description: 'Lord Bhairav in peaceful meditation posture'
  },
  {
    id: 2,
    title: 'Bhairav with Divine Aura',
    source: require('@/assets/images/Kal_Bhairav.jpg'),
    description: 'Lord Bhairav with his divine companion and sacred symbols'
  }
];

export default function VigrahaScreen() {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#121212" 
        translucent={false}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bhairav Vigraha</Text>
          <Text style={styles.headerSubtitle}>Divine Form for Sadhana</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image 
            source={bhairavImages[selectedImage].source}
            style={styles.mainImage}
            resizeMode="contain"
          />
          
          <View style={styles.imageInfo}>
            <Text style={styles.imageTitle}>
              {bhairavImages[selectedImage].title}
            </Text>
            <Text style={styles.imageDescription}>
              {bhairavImages[selectedImage].description}
            </Text>
          </View>
        </View>

        <View style={styles.thumbnailContainer}>
          <Text style={styles.sectionTitle}>Select Vigraha</Text>
          <View style={styles.thumbnailRow}>
            {bhairavImages.map((image, index) => (
              <TouchableOpacity 
                key={image.id}
                style={[
                  styles.thumbnail,
                  selectedImage === index && styles.selectedThumbnail
                ]}
                onPress={() => setSelectedImage(index)}
              >
                <Image 
                  source={image.source}
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Sadhana Instructions</Text>
          <Text style={styles.instructionsText}>
            • Sit comfortably in a quiet space facing east or north{'\n'}
            • Gaze upon the divine form with devotion and concentration{'\n'}
            • Recite Bhairav mantras while maintaining visual focus{'\n'}
            • Allow the divine energy to flow through meditation{'\n'}
            • Practice regularly for spiritual growth and protection
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ...existing styles...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  imageContainer: {
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  mainImage: {
    width: '100%',
    height: screenHeight * 0.5,
    borderRadius: 15,
    marginBottom: 15,
  },
  imageInfo: {
    backgroundColor: '#2C2C2C',
    padding: 16,
    borderRadius: 10,
  },
  imageTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFD700',
    marginBottom: 8,
    textAlign: 'center',
  },
  imageDescription: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 20,
  },
  thumbnailContainer: {
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  thumbnailRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnail: {
    borderColor: '#FFD700',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  instructionsContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#2C2C2C',
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 15,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'center',
  },
  instructionsText: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 22,
  },
});