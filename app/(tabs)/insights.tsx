/*
 * =================================================================
 * FILE: /app/(tabs)/insights.tsx
 * This is the final version with the notification functionality removed
 * to ensure stability in the Expo Go environment.
 * =================================================================
 */
import { JapaSession, RecitationLog, StorageService } from '@/services/StorageService';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const Achievement = ({ title, unlocked }: { title: string, unlocked: boolean }) => (
    <View style={styles.achievement}>
        <Ionicons name={unlocked ? "trophy" : "lock-closed"} size={24} color={unlocked ? "#FFD700" : "#555"} />
        <Text style={[styles.achievementTitle, !unlocked && styles.achievementLocked]}>{title}</Text>
    </View>
);

export default function InsightsScreen() {
    const [totalMalas, setTotalMalas] = useState(0);
    const [recitationSummary, setRecitationSummary] = useState<{[key: string]: number}>({});
    const [practiceDays, setPracticeDays] = useState(0);
    const [streak, setStreak] = useState(0);
    const [totalJapa, setTotalJapa] = useState(0);

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
        
        const practiceDates = new Set([...weeklyJapa.map(j => new Date(j.date).toISOString().split('T')[0]), ...weeklyRecitations.map(r => new Date(r.date).toISOString().split('T')[0])]);
        setPracticeDays(practiceDates.size);

        // All-Time Calculations for Achievements
        setTotalJapa(japaHistory.reduce((sum, item) => sum + item.malas, 0));
        
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
                    <Text style={styles.metricLabel}>Total Mālās This Week</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Achievements</Text>
                    <Achievement title="Sadhana Starter (7 day streak)" unlocked={streak >= 7} />
                    <Achievement title="Mala Master (108 total malas)" unlocked={totalJapa >= 108} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212' },
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
    achievement: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
    achievementTitle: { fontSize: 16, color: '#E0E0E0', marginLeft: 10 },
    achievementLocked: { color: '#555', fontStyle: 'italic' },
});
