/*
 * =================================================================
 * NEW FILE: /app/(tabs)/journal.tsx
 * This is the screen for the gratitude journal.
 * =================================================================
 */
import { GratitudeNote, StorageService } from '@/services/StorageService';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function JournalScreen() {
    const [note, setNote] = useState('');
    const [pastNotes, setPastNotes] = useState<GratitudeNote[]>([]);

    const loadNotes = async () => {
        const allNotes = await StorageService.getGratitudeNotes();
        const today = new Date().toISOString().split('T')[0];
        const todaysNote = allNotes.find(n => n.date.startsWith(today));
        
        setNote(todaysNote?.note || '');
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
        Keyboard.dismiss();
        await loadNotes(); // Reload to show the updated list
    };

    return (
        <SafeAreaView style={journalStyles.container}>
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
                        <Text style={journalStyles.noteDate}>{new Date(item.date).toLocaleDateString()}</Text>
                        <Text style={journalStyles.noteText}>{item.note}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const journalStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212', padding: 20 },
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
    noteDate: { color: '#A0A0A0', fontSize: 12, marginBottom: 5 },
    noteText: { color: '#E0E0E0', fontSize: 16 },
});