import { StorageService } from '@/services/StorageService';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {

  const handleExport = async () => {
    try {
      const data = await StorageService.exportAllData();
      const jsonString = JSON.stringify(data, null, 2);
      const filename = `SadhnaFlow_Backup_${new Date().toISOString().split('T')[0]}.json`;
      const uri = FileSystem.cacheDirectory + filename;
      await FileSystem.writeAsStringAsync(uri, jsonString);
      await Sharing.shareAsync(uri, { mimeType: 'application/json', dialogTitle: 'Save your SadhnaFlow progress' });
    } catch (error) {
      Alert.alert("Export Failed", "Could not export your progress. Please try again.");
    }
  };

  const handleImport = async () => {
    Alert.alert(
      "Import Progress",
      "This will overwrite all current progress in the app. This action cannot be undone. Are you sure you want to continue?",
      [{ text: "Cancel", style: "cancel" }, { text: "Import", style: "destructive", onPress: async () => {
        try {
          const result = await DocumentPicker.getDocumentAsync({ type: 'application/json' });
          if (!result.canceled && result.assets && result.assets[0].uri) {
            const jsonString = await FileSystem.readAsStringAsync(result.assets[0].uri);
            const data = JSON.parse(jsonString);
            await StorageService.importAllData(data);
            Alert.alert("Import Successful", "Your progress has been restored. Please restart the app to see the changes.");
          }
        } catch (error) {
          Alert.alert("Import Failed", "The file was invalid or corrupted. Please make sure you are using a valid backup file.");
        }
      }}]
    );
  };

  const handleWipeData = () => {
    Alert.alert(
      "⚠️ Wipe All Data?",
      "This will permanently delete all your Japa history, recitations, goals, and journal entries. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Continue", style: "destructive", onPress: () => {
          Alert.alert(
            "Final Confirmation",
            "Please confirm you want to delete all data. This is your last chance to cancel.",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Wipe All Data", style: "destructive", onPress: async () => {
                await StorageService.wipeAllData();
                Alert.alert("Data Wiped", "All your app data has been successfully deleted. The app will now be in a fresh state.");
              }}
            ]
          );
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Settings</Text>
          <Text style={styles.subHeader}>Manage your app data</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data Management</Text>
          <Text style={styles.dataManagementText}>
            Save your progress to a file to restore it on a new device, or start fresh by wiping all data.
          </Text>
          
          <TouchableOpacity style={styles.dataButton} onPress={handleExport}>
            <Ionicons name="cloud-upload-outline" size={22} color="#81C784" />
            <Text style={styles.dataButtonText}>Export Progress</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dataButton} onPress={handleImport}>
            <Ionicons name="cloud-download-outline" size={22} color="#64B5F6" />
            <Text style={styles.dataButtonText}>Import Progress</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.dataButton, styles.wipeButton]} onPress={handleWipeData}>
            <Ionicons name="trash-bin-outline" size={22} color="#FF6B6B" />
            <Text style={[styles.dataButtonText, styles.wipeButtonText]}>Wipe All Data</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212' },
    scrollContainer: { padding: 20, paddingTop: 40 },
    headerContainer: { alignItems: 'center', marginBottom: 30 },
    header: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF' },
    subHeader: { fontSize: 16, color: '#A0A0A0', marginTop: 4 },
    card: { backgroundColor: '#1E1E1E', borderRadius: 15, padding: 20, marginBottom: 20 },
    cardTitle: { fontSize: 20, fontWeight: '600', color: '#FFD700', marginBottom: 15, textAlign: 'center' },
    dataManagementText: { color: '#A0A0A0', textAlign: 'center', fontSize: 14, marginBottom: 25, lineHeight: 20 },
    dataButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', paddingVertical: 16, paddingHorizontal: 20, borderRadius: 12, marginBottom: 15 },
    dataButtonText: { color: '#FFFFFF', fontWeight: '600', marginLeft: 15, fontSize: 16 },
    wipeButton: { backgroundColor: 'rgba(255, 107, 107, 0.1)', borderColor: '#FF6B6B', borderWidth: 1 },
    wipeButtonText: { color: '#FF6B6B' },
});