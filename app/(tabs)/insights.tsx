/*
 * =================================================================
 * NEW FILE: /app/(tabs)/insights.tsx
 * This is the screen for the weekly insights report.
 * =================================================================
 */
import { JapaSession, RecitationLog, StorageService } from '@/services/StorageService';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function InsightsScreen() {
    const [totalMalas, setTotalMalas] = useState(0);
    const [recitationSummary, setRecitationSummary] = useState<{[key: string]: number}>({});
    const [practiceDays, setPracticeDays] = useState(0);

    const calculateInsights = async () => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        // Calculate Japa Insights
        const japaHistory: JapaSession[] = await StorageService.getJapaHistory();
        const weeklyJapa = japaHistory.filter(j => new Date(j.date) >= oneWeekAgo);
        const total = weeklyJapa.reduce((sum, item) => sum + item.malas, 0);
        setTotalMalas(total);

        // Calculate Recitation Insights
        const recitationLogs: RecitationLog[] = await StorageService.getRecitationLogs();
        const weeklyRecitations = recitationLogs.filter(r => new Date(r.date) >= oneWeekAgo);
        const summary: {[key: string]: number} = {};
        weeklyRecitations.forEach(log => {
            summary[log.stotraTitle] = (summary[log.stotraTitle] || 0) + log.count;
        });
        setRecitationSummary(summary);
        
        // Calculate Practice Days
        const practiceDates = new Set([
            ...weeklyJapa.map(j => new Date(j.date).toISOString().split('T')[0]),
            ...weeklyRecitations.map(r => new Date(r.date).toISOString().split('T')[0])
        ]);
        setPracticeDays(practiceDates.size);
    };

    useFocusEffect(useCallback(() => {
        calculateInsights();
    }, []));

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.header}>Weekly Sādhanā Insights</Text>
                
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Japa Practice</Text>
                    <Text style={styles.metric}>{totalMalas}</Text>
                    <Text style={styles.metricLabel}>Total Mālās Completed</Text>
                </View>

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

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Consistency</Text>
                    <Text style={styles.metric}>{practiceDays} / 7</Text>
                    <Text style={styles.metricLabel}>Days of Practice</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212' },
    scrollContainer: { padding: 20 },
    header: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center', marginBottom: 30 },
    card: { backgroundColor: '#1E1E1E', borderRadius: 15, padding: 20, marginBottom: 20 },
    cardTitle: { fontSize: 22, fontWeight: '600', color: '#FF6D00', marginBottom: 15 },
    metric: { fontSize: 48, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center' },
    metricLabel: { fontSize: 16, color: '#A0A0A0', textAlign: 'center', marginTop: 5 },
    recitationRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
    recitationTitle: { fontSize: 16, color: '#E0E0E0', flex: 1 },
    recitationCount: { fontSize: 16, color: '#FFFFFF', fontWeight: 'bold' },
    noDataText: { fontSize: 16, color: '#A0A0A0', textAlign: 'center', fontStyle: 'italic' },
});