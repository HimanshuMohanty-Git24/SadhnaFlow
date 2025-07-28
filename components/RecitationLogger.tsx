
/*
 * =================================================================
 * NEW FILE: /components/RecitationLogger.tsx
 * This component handles logging recitations.
 * =================================================================
 */
import { Stotra } from '@/data/stotras';
import { StorageService } from '@/services/StorageService';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RecitationLoggerProps = {
    stotra: Stotra;
};

export default function RecitationLogger({ stotra }: RecitationLoggerProps) {
    const [count, setCount] = useState(1);

    const handleLogRecitation = () => {
        Alert.alert(
            "Log Recitation",
            `Confirm logging ${count} recitation(s) of "${stotra.title}"?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Log",
                    onPress: async () => {
                        const log = {
                            stotraId: stotra.id,
                            stotraTitle: stotra.title,
                            count: count,
                            date: new Date().toISOString(),
                        };
                        await StorageService.saveRecitationLog(log);
                        Alert.alert("Success", "Recitation logged successfully!");
                    },
                },
            ]
        );
    };

    return (
        <View style={loggerStyles.container}>
            <Text style={loggerStyles.title}>Log Your Recitation</Text>
            <View style={loggerStyles.controls}>
                <TouchableOpacity onPress={() => setCount(c => Math.max(1, c - 1))} style={loggerStyles.button}>
                    <Ionicons name="remove" size={24} color="#FF6D00" />
                </TouchableOpacity>
                <Text style={loggerStyles.count}>{count}</Text>
                <TouchableOpacity onPress={() => setCount(c => c + 1)} style={loggerStyles.button}>
                    <Ionicons name="add" size={24} color="#FF6D00" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={loggerStyles.logButton} onPress={handleLogRecitation}>
                <Text style={loggerStyles.logButtonText}>Log {count} Recitation{count > 1 ? 's' : ''}</Text>
            </TouchableOpacity>
        </View>
    );
}

const loggerStyles = StyleSheet.create({
    container: { backgroundColor: '#1E1E1E', marginHorizontal: 16, marginTop: 20, padding: 20, borderRadius: 12, alignItems: 'center' },
    title: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 15 },
    controls: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    button: { backgroundColor: '#333', padding: 10, borderRadius: 20 },
    count: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginHorizontal: 20 },
    logButton: { backgroundColor: '#FF6D00', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
    logButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});