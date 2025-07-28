import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Page Not Found' }} />
      <View style={styles.container}>
        <Ionicons name="alert-circle-outline" size={80} color="#FF6B6B" />
        <Text style={styles.title}>404</Text>
        <Text style={styles.message}>The page you&apos;re looking for doesn&apos;t exist</Text>
        <TouchableOpacity>
          <Link href="/" style={styles.link}>
            <View style={styles.buttonContainer}>
              <Ionicons name="home-outline" size={20} color="white" />
              <Text style={styles.buttonText}>Return to Home</Text>
            </View>
          </Link>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 72,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#343a40',
  },
  message: {
    fontSize: 18,
    marginBottom: 30,
    color: '#6c757d',
    textAlign: 'center',
  },
  link: {
    marginTop: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4263EB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
