import MonthYearPickerModal from '@/components/MonthYearPickerModal';
import { GratitudeNote, StorageService } from '@/services/StorageService';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { Alert, FlatList, Keyboard, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function JournalScreen() {
    const [note, setNote] = useState('');
    const [allNotes, setAllNotes] = useState<GratitudeNote[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isPickerVisible, setIsPickerVisible] = useState(false);

    const loadNotes = async () => {
        const notes = await StorageService.getGratitudeNotes();
        setAllNotes(notes);
    };

    useFocusEffect(useCallback(() => {
        loadNotes();
    }, []));

    // Filter notes by current month/year
    const filteredNotes = useMemo(() => {
        const targetMonth = currentDate.getMonth();
        const targetYear = currentDate.getFullYear();

        return allNotes.filter(note => {
            const noteDate = new Date(note.date);
            return noteDate.getMonth() === targetMonth && noteDate.getFullYear() === targetYear;
        });
    }, [currentDate, allNotes]);

    const handleMonthChange = (direction: 'prev' | 'next') => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(1);
            newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1));
            return newDate;
        });
    };

    const handleDateSelect = (newDate: Date) => {
        setCurrentDate(newDate);
    };

    const handleSave = async () => {
        if (note.trim().length === 0) return;
        const newNote: GratitudeNote = {
            note: note.trim(),
            date: new Date().toISOString(),
        };
        await StorageService.saveGratitudeNote(newNote);
        setNote('');
        Keyboard.dismiss();
        await loadNotes();
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
                        await loadNotes();
                    }
                },
            ]
        );
    };

    const formattedDate = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar 
                barStyle="light-content" 
                backgroundColor="#121212" 
                translucent={false}
            />
            
            {/* Header Section */}
            <View style={styles.headerSection}>
                <Text style={styles.header}>Gratitude Journal</Text>
                <Text style={styles.prompt}>What are you grateful for today?</Text>
                
                <TextInput
                    style={styles.input}
                    multiline
                    placeholder="Write your thoughts here..."
                    placeholderTextColor="#666"
                    value={note}
                    onChangeText={setNote}
                />
                
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Ionicons name="heart" size={20} color="#FFFFFF" style={styles.saveButtonIcon} />
                    <Text style={styles.saveButtonText}>Save Today's Note</Text>
                </TouchableOpacity>
            </View>

            {/* History Section with Month Navigation */}
            <View style={styles.historySection}>
                <View style={styles.historyHeader}>
                    <Text style={styles.historyTitle}>Past Reflections</Text>
                </View>

                <View style={styles.monthNavigator}>
                    <TouchableOpacity onPress={() => handleMonthChange('prev')} style={styles.arrowButton}>
                        <Ionicons name="chevron-back" size={24} color="#FF6D00" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsPickerVisible(true)}>
                        <Text style={styles.monthText}>{formattedDate}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleMonthChange('next')} style={styles.arrowButton}>
                        <Ionicons name="chevron-forward" size={24} color="#FF6D00" />
                    </TouchableOpacity>
                </View>

                {/* Notes List */}
                <FlatList
                    data={filteredNotes}
                    keyExtractor={(item) => item.date}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Ionicons name="book-outline" size={48} color="#444" />
                            <Text style={styles.emptyText}>
                                No reflections for {formattedDate}.
                            </Text>
                            <Text style={styles.emptySubtext}>
                                Start writing to capture your gratitude.
                            </Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <View style={styles.noteCard}>
                            <View style={styles.noteHeader}>
                                <View style={styles.dateContainer}>
                                    <Ionicons name="calendar-outline" size={16} color="#A0A0A0" />
                                    <Text style={styles.noteDate}>
                                        {new Date(item.date).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </Text>
                                </View>
                                <TouchableOpacity 
                                    style={styles.deleteButton}
                                    onPress={() => handleDelete(item.date)}
                                >
                                    <Ionicons name="trash-bin-outline" size={18} color="#888" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.noteText} numberOfLines={5} ellipsizeMode="tail">
                                {item.note}
                            </Text>
                        </View>
                    )}
                />
            </View>

            <MonthYearPickerModal 
                visible={isPickerVisible}
                initialDate={currentDate}
                onClose={() => setIsPickerVisible(false)}
                onSelect={handleDateSelect}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#121212',
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0,
    },
    
    // Header section for writing new notes
    headerSection: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    
    header: { 
        fontSize: 28, 
        fontWeight: 'bold', 
        color: '#FFFFFF', 
        textAlign: 'center', 
        marginBottom: 8 
    },
    
    prompt: { 
        fontSize: 16, 
        color: '#A0A0A0', 
        textAlign: 'center', 
        marginBottom: 20 
    },
    
    input: {
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        padding: 15,
        color: '#FFFFFF',
        fontSize: 16,
        minHeight: 100,
        maxHeight: 120,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: '#333',
    },
    
    saveButton: { 
        flexDirection: 'row',
        backgroundColor: '#FF6D00', 
        padding: 15, 
        borderRadius: 12, 
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 15,
        elevation: 4,
        shadowColor: '#FF6D00',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    
    saveButtonIcon: {
        marginRight: 8,
    },
    
    saveButtonText: { 
        color: '#FFFFFF', 
        fontSize: 16, 
        fontWeight: 'bold' 
    },
    
    // History section
    historySection: {
        flex: 1,
        paddingTop: 15,
    },
    
    historyHeader: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    
    historyTitle: { 
        fontSize: 22, 
        fontWeight: 'bold', 
        color: '#FFFFFF',
    },
    
    monthNavigator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 15,
    },
    
    arrowButton: {
        padding: 8,
        borderRadius: 8,
    },
    
    monthText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        textDecorationLine: 'underline',
        textDecorationStyle: 'dotted',
    },
    
    listContent: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    
    noteCard: { 
        backgroundColor: '#1E1E1E', 
        borderRadius: 12, 
        padding: 16, 
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#2A2A2A',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    
    noteHeader: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 10 
    },
    
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    noteDate: { 
        color: '#A0A0A0', 
        fontSize: 13,
        marginLeft: 6,
    },
    
    deleteButton: { 
        padding: 6,
        borderRadius: 6,
    },
    
    noteText: { 
        color: '#E0E0E0', 
        fontSize: 15,
        lineHeight: 22,
    },
    
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    
    emptyText: { 
        color: '#A0A0A0', 
        fontSize: 16,
        textAlign: 'center',
        marginTop: 16,
        fontWeight: '500',
    },
    
    emptySubtext: {
        color: '#666',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
        fontStyle: 'italic',
    },
});