/*
 * =================================================================
 * FILE TO UPDATE: /app/(tabs)/insights.tsx
 * This version fixes the bug by adding the missing UI section
 * to display the recitation summary.
 * =================================================================
 */
import { JapaSession, RecitationLog, StorageService } from '@/services/StorageService';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function InsightsScreen() {
    const [totalMalas, setTotalMalas] = useState(0);
    const [recitationSummary, setRecitationSummary] = useState<{[key: string]: number}>({});
    const [streak, setStreak] = useState(0);

    const calculateInsights = async () => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const japaHistory: JapaSession[] = await StorageService.getJapaHistory();
        const recitationLogs: RecitationLog[] = await StorageService.getRecitationLogs();

        // Weekly Calculations
        const weeklyJapa = japaHistory.filter(j => new Date(j.date) >= oneWeekAgo);
        const weeklyRecitations = recitationLogs.filter(r => new Date(r.date) >= oneWeekAgo);
        
        setTotalMalas(weeklyJapa.reduce((sum, item) => sum + item.malas, 0));
        
        const summary: {[key: string]: number} = {};
        weeklyRecitations.forEach(log => { summary[log.stotraTitle] = (summary[log.stotraTitle] || 0) + log.count; });
        setRecitationSummary(summary);
        
        // Streak Calculation
        const allPracticeDates = new Set(japaHistory.map(j => new Date(j.date).toISOString().split('T')[0]));
        let currentStreak = 0;
        let today = new Date();
        while (allPracticeDates.has(today.toISOString().split('T')[0])) {
            currentStreak++;
            today.setDate(today.getDate() - 1);
        }
        setStreak(currentStreak);
    };

    useFocusEffect(useCallback(() => { calculateInsights(); }, []));

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar 
                barStyle="light-content" 
                backgroundColor="#121212" 
                translucent={false}
            />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Weekly Insights</Text>
                </View>
                
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Current Streak</Text>
                    <Text style={styles.metric}>{streak}</Text>
                    <Text style={styles.metricLabel}>Consecutive Days of Practice</Text>
                </View>
                
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Japa Practice</Text>
                    <Text style={styles.metric}>{totalMalas}</Text>
                    <Text style={styles.metricLabel}>Total Mālās Recited</Text>
                </View>

                {/* THIS IS THE CORRECTED/ADDED SECTION */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Recitation Practice</Text>
                    {Object.keys(recitationSummary).length > 0 ? (
                        Object.entries(recitationSummary).map(([title, count]) => (
                            <View key={title} style={styles.recitationRow}>
                                <Text style={styles.recitationTitle}>{title}</Text>
                                <Text style={styles.recitationCount}>{count} times</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noDataText}>No recitations logged this week.</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#121212',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    scrollContainer: { padding: 20 },
    headerContainer: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 30 
    },
    header: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' },
    card: { backgroundColor: '#1E1E1E', borderRadius: 15, padding: 20, marginBottom: 20 },
    cardTitle: { fontSize: 22, fontWeight: '600', color: '#FF6D00', marginBottom: 15 },
    metric: { fontSize: 48, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center' },
    metricLabel: { fontSize: 16, color: '#A0A0A0', textAlign: 'center', marginTop: 5 },
    // Styles for the new recitation section
    recitationRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
    recitationTitle: { fontSize: 16, color: '#E0E0E0', flex: 1, marginRight: 10 },
    recitationCount: { fontSize: 16, color: '#FFFFFF', fontWeight: 'bold' },
    noDataText: { fontSize: 16, color: '#A0A0A0', textAlign: 'center', fontStyle: 'italic' },
});