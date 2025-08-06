/*
 * =================================================================
 * NEW FILE: /app/(tabs)/journal.tsx
 * This is the screen for the gratitude journal.
 * =================================================================
 */
import { GratitudeNote, StorageService } from '@/services/StorageService';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, Keyboard, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function JournalScreen() {
    const [note, setNote] = useState('');
    const [pastNotes, setPastNotes] = useState<GratitudeNote[]>([]);

    const loadNotes = async () => {
        const allNotes = await StorageService.getGratitudeNotes();
        setPastNotes(allNotes);
    };

    useFocusEffect(useCallback(() => {
        loadNotes();
    }, []));

    const handleSave = async () => {
        if (note.trim().length === 0) return;
        const newNote: GratitudeNote = {
            note: note,
            date: new Date().toISOString(),
        };
        await StorageService.saveGratitudeNote(newNote);
        setNote(''); // Clear the input after saving
        Keyboard.dismiss();
        await loadNotes(); // Reload to show the updated list
    };

    const handleDelete = async (noteDate: string) => {
        Alert.alert(
            "Delete Note",
            "Are you sure you want to delete this gratitude note?",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Delete", 
                    style: "destructive", 
                    onPress: async () => {
                        await StorageService.deleteGratitudeNote(noteDate);
                        await loadNotes(); // Reload to show the updated list
                    }
                },
            ]
        );
    };

    return (
        <SafeAreaView style={journalStyles.container}>
            <StatusBar 
                barStyle="light-content" 
                backgroundColor="#121212" 
                translucent={false}
            />
            <Text style={journalStyles.header}>Gratitude Journal</Text>
            <Text style={journalStyles.prompt}>What are you grateful for today?</Text>
            <TextInput
                style={journalStyles.input}
                multiline
                placeholder="Write your thoughts here..."
                placeholderTextColor="#666"
                value={note}
                onChangeText={setNote}
            />
            <TouchableOpacity style={journalStyles.saveButton} onPress={handleSave}>
                <Text style={journalStyles.saveButtonText}>Save Today's Note</Text>
            </TouchableOpacity>

            <Text style={journalStyles.historyHeader}>Past Reflections</Text>
            <FlatList
                data={pastNotes}
                keyExtractor={(item) => item.date}
                renderItem={({ item }) => (
                    <View style={journalStyles.noteCard}>
                        <View style={journalStyles.noteHeader}>
                            <Text style={journalStyles.noteDate}>{new Date(item.date).toLocaleDateString()}</Text>
                            <TouchableOpacity 
                                style={journalStyles.deleteButton}
                                onPress={() => handleDelete(item.date)}
                            >
                                <Ionicons name="trash-bin-outline" size={20} color="#FF4444" />
                            </TouchableOpacity>
                        </View>
                        <Text style={journalStyles.noteText}>{item.note}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const journalStyles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#121212', 
        padding: 20,
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 20 : 20,
    },
    header: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center', marginBottom: 10 },
    prompt: { fontSize: 16, color: '#A0A0A0', textAlign: 'center', marginBottom: 20 },
    input: {
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        padding: 15,
        color: '#FFFFFF',
        fontSize: 16,
        minHeight: 120,
        textAlignVertical: 'top',
    },
    saveButton: { backgroundColor: '#FF6D00', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 20 },
    saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
    historyHeader: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10, marginBottom: 10, borderTopColor: '#333', borderTopWidth: 1, paddingTop: 20 },
    noteCard: { backgroundColor: '#1E1E1E', borderRadius: 10, padding: 15, marginBottom: 10 },
    noteHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
    noteDate: { color: '#A0A0A0', fontSize: 12 },
    deleteButton: { padding: 5 },
    noteText: { color: '#E0E0E0', fontSize: 16 },
});