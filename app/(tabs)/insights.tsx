import { JapaSession, RecitationLog, StorageService } from '@/services/StorageService';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useFocusEffect } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React, { useCallback, useState } from 'react';
import { Alert, LayoutAnimation, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- Types for our state ---
type Timeframe = 'weekly' | 'lifetime';
type PracticeType = 'japa' | 'recitations';

interface JapaData {
    total: number;
    dailyCounts: number[]; // For the weekly chart
}
interface RecitationData {
    summary: { [key: string]: number };
}

// --- A Simple Bar Chart Component ---
const SimpleBarChart = ({ data, color }: { data: number[], color: string }) => {
    const maxValue = Math.max(...data, 1); // Avoid division by zero
    return (
        <View style={styles.chartContainer}>
            {data.map((value, index) => (
                <View key={index} style={styles.barWrapper}>
                    <View style={[styles.bar, { height: `${(value / maxValue) * 100}%`, backgroundColor: color }]} />
                </View>
            ))}
        </View>
    );
};

export default function InsightsScreen() {
    // --- State Management ---
    const [timeframe, setTimeframe] = useState<Timeframe>('weekly');
    const [practiceType, setPracticeType] = useState<PracticeType>('japa');
    const [streak, setStreak] = useState(0);

    // State to hold all calculated data
    const [weeklyJapa, setWeeklyJapa] = useState<JapaData>({ total: 0, dailyCounts: [] });
    const [lifetimeJapa, setLifetimeJapa] = useState<JapaData>({ total: 0, dailyCounts: [] });
    const [weeklyRecitations, setWeeklyRecitations] = useState<RecitationData>({ summary: {} });
    const [lifetimeRecitations, setLifetimeRecitations] = useState<RecitationData>({ summary: {} });
    
    // --- Data Calculation Logic ---
    const calculateInsights = async () => {
        const japaHistory: JapaSession[] = await StorageService.getJapaHistory();
        const recitationLogs: RecitationLog[] = await StorageService.getRecitationLogs();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        // --- Lifetime Calculations ---
        const lifeJapaTotal = japaHistory.reduce((sum, item) => sum + item.malas, 0);
        const lifeRecitationSummary: { [key: string]: number } = {};
        recitationLogs.forEach(log => { lifeRecitationSummary[log.stotraTitle] = (lifeRecitationSummary[log.stotraTitle] || 0) + log.count; });

        setLifetimeJapa({ total: lifeJapaTotal, dailyCounts: [] });
        setLifetimeRecitations({ summary: lifeRecitationSummary });

        // --- Weekly Calculations ---
        const weeklyJapaLogs = japaHistory.filter(j => new Date(j.date) >= oneWeekAgo);
        const weeklyRecitationLogs = recitationLogs.filter(r => new Date(r.date) >= oneWeekAgo);
        
        // Weekly Japa total and chart data
        const weekJapaTotal = weeklyJapaLogs.reduce((sum, item) => sum + item.malas, 0);
        const dailyJapaCounts = Array(7).fill(0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        weeklyJapaLogs.forEach(log => {
            const logDate = new Date(log.date);
            logDate.setHours(0, 0, 0, 0);
            const diffDays = Math.round((today.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays >= 0 && diffDays < 7) {
                dailyJapaCounts[6 - diffDays] += log.malas;
            }
        });
        setWeeklyJapa({ total: weekJapaTotal, dailyCounts: dailyJapaCounts });

        // Weekly Recitation summary
        const weekRecitationSummary: { [key: string]: number } = {};
        weeklyRecitationLogs.forEach(log => { weekRecitationSummary[log.stotraTitle] = (weekRecitationSummary[log.stotraTitle] || 0) + log.count; });
        setWeeklyRecitations({ summary: weekRecitationSummary });
        
        // --- Streak Calculation ---
        const allPracticeDates = new Set(japaHistory.map(j => new Date(j.date).toISOString().split('T')[0]));
        recitationLogs.forEach(r => allPracticeDates.add(new Date(r.date).toISOString().split('T')[0]));
        let currentStreak = 0;
        let checkDate = new Date();
        while (allPracticeDates.has(checkDate.toISOString().split('T')[0])) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
        }
        setStreak(currentStreak);
    };

    useFocusEffect(useCallback(() => { calculateInsights(); }, []));

    // --- NEW: Export/Import Handlers ---
    const handleExport = async () => {
        try {
            const data = await StorageService.exportAllData();
            const jsonString = JSON.stringify(data, null, 2); // Pretty print JSON
            const filename = `SadhnaFlow_Backup_${new Date().toISOString().split('T')[0]}.json`;
            const uri = FileSystem.cacheDirectory + filename;

            await FileSystem.writeAsStringAsync(uri, jsonString);
            await Sharing.shareAsync(uri, { mimeType: 'application/json', dialogTitle: 'Save your SadhnaFlow progress' });
            
        } catch (error) {
            console.error(error);
            Alert.alert("Export Failed", "Could not export your progress. Please try again.");
        }
    };

    const handleImport = async () => {
        Alert.alert(
            "Import Progress",
            "This will overwrite all current progress in the app. This action cannot be undone. Are you sure you want to continue?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Import", style: "destructive", onPress: async () => {
                    try {
                        const result = await DocumentPicker.getDocumentAsync({ type: 'application/json' });
                        if (result.canceled === false && result.assets && result.assets[0].uri) {
                            const jsonString = await FileSystem.readAsStringAsync(result.assets[0].uri);
                            const data = JSON.parse(jsonString);

                            await StorageService.importAllData(data);
                            
                            // Refresh the screen with new data
                            await calculateInsights();
                            Alert.alert("Import Successful", "Your progress has been restored.");
                        }
                    } catch (error) {
                        console.error(error);
                        Alert.alert("Import Failed", "The file was invalid or corrupted. Please make sure you are using a valid backup file.");
                    }
                }},
            ]
        );
    };

    const handleTimeframeChange = (newTimeframe: Timeframe) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setTimeframe(newTimeframe);
    };

    const handlePracticeTypeChange = (newType: PracticeType) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setPracticeType(newType);
    };

    const renderContent = () => {
        if (timeframe === 'weekly') {
            if (practiceType === 'japa') {
                return (
                    <View style={styles.metricContainer}>
                        <Text style={[styles.metricValue, { color: '#FF8A65' }]}>{weeklyJapa.total}</Text>
                        <Text style={styles.metricLabel}>Total Mālās Recited This Week</Text>
                        <SimpleBarChart data={weeklyJapa.dailyCounts} color="#FF8A65" />
                        <Text style={styles.chartLabel}>Last 7 Days</Text>
                    </View>
                );
            } else { // Recitations
                const recitations = Object.entries(weeklyRecitations.summary);
                return (
                    <View style={styles.metricContainer}>
                        {recitations.length > 0 ? (
                            recitations.map(([title, count]) => (
                                <View key={title} style={styles.recitationRow}>
                                    {/* FIX: Truncate long text */}
                                    <Text style={styles.recitationTitle} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                                    <Text style={[styles.recitationCount, { color: '#4DB6AC' }]}>{count} times</Text>
                                </View>
                            ))
                        ) : <Text style={styles.noDataText}>No recitations logged this week.</Text>}
                    </View>
                );
            }
        } else { // Lifetime
            if (practiceType === 'japa') {
                return (
                    <View style={styles.metricContainer}>
                        <Text style={[styles.metricValue, { color: '#FF8A65' }]}>{lifetimeJapa.total}</Text>
                        <Text style={styles.metricLabel}>Total Mālās Recited All Time</Text>
                    </View>
                );
            } else { // Recitations
                 const recitations = Object.entries(lifetimeRecitations.summary)
                    .sort(([, a], [, b]) => b - a).slice(0, 5);
                return (
                    <View style={styles.metricContainer}>
                        {recitations.length > 0 ? (
                            <>
                                <Text style={styles.topStotrasLabel}>Top Recitations All Time</Text>
                                {recitations.map(([title, count]) => (
                                    <View key={title} style={styles.recitationRow}>
                                        <Text style={styles.recitationTitle} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                                        <Text style={[styles.recitationCount, { color: '#4DB6AC' }]}>{count} times</Text>
                                    </View>
                                ))}
                            </>
                        ) : <Text style={styles.noDataText}>No recitations logged yet.</Text>}
                    </View>
                );
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#121212" />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Insights</Text>
                    <Text style={styles.subHeader}>Your journey so far</Text>
                </View>
                
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Current Streak</Text>
                    <View style={styles.streakContainer}>
                        <View style={styles.streakCircle}>
                            <Ionicons name="flame" size={40} color="#FFB74D" />
                            <Text style={styles.streakNumber}>{streak}</Text>
                        </View>
                    </View>
                    <Text style={styles.streakLabel}>Consecutive days of practice</Text>
                </View>
                
                <View style={styles.card}>
                    <View style={styles.toggleContainer}>
                        <TouchableOpacity onPress={() => handleTimeframeChange('weekly')} style={[styles.toggleButton, timeframe === 'weekly' && styles.toggleButtonActive]}>
                            <Text style={[styles.toggleButtonText, timeframe === 'weekly' && styles.toggleButtonTextActive]}>Weekly</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleTimeframeChange('lifetime')} style={[styles.toggleButton, timeframe === 'lifetime' && styles.toggleButtonActive]}>
                            <Text style={[styles.toggleButtonText, timeframe === 'lifetime' && styles.toggleButtonTextActive]}>Lifetime</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={[styles.tabsContainer, practiceType === 'japa' ? styles.japaTabBackground : styles.recitationTabBackground]}>
                        <TouchableOpacity onPress={() => handlePracticeTypeChange('japa')} style={[styles.tabButton, practiceType === 'japa' && styles.tabButtonActive]}>
                            <Ionicons name="sync-circle-outline" size={18} color={practiceType === 'japa' ? '#FF8A65' : '#FFF'} style={{marginRight: 5}}/>
                            <Text style={[styles.tabButtonText, practiceType === 'japa' && { color: '#FF8A65'}]}>Japa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlePracticeTypeChange('recitations')} style={[styles.tabButton, practiceType === 'recitations' && styles.tabButtonActive]}>
                            <Ionicons name="book-outline" size={18} color={practiceType === 'recitations' ? '#4DB6AC' : '#FFF'} style={{marginRight: 5}}/>
                            <Text style={[styles.tabButtonText, practiceType === 'recitations' && { color: '#4DB6AC'}]}>Recitations</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {renderContent()}
                    
                    <Text style={styles.cardFooterText}>Switch above to compare Japa and Recitations over time.</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Data Management</Text>
                    <Text style={styles.dataManagementText}>
                        Save your progress to a file to restore it on a new device.
                    </Text>
                    <View style={styles.dataButtonsContainer}>
                        <TouchableOpacity style={styles.dataButton} onPress={handleExport}>
                            <Ionicons name="cloud-upload-outline" size={18} color="#81C784" />
                            <Text style={styles.dataButtonText}>Export Progress</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dataButton} onPress={handleImport}>
                            <Ionicons name="cloud-download-outline" size={18} color="#64B5F6" />
                            <Text style={styles.dataButtonText}>Import Progress</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212' },
    scrollContainer: { padding: 20, paddingBottom: 40 },
    headerContainer: { alignItems: 'center', marginBottom: 20 },
    header: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF' },
    subHeader: { fontSize: 16, color: '#A0A0A0', marginTop: 4 },
    card: { backgroundColor: '#1E1E1E', borderRadius: 15, padding: 20, marginBottom: 20 },
    cardTitle: { fontSize: 20, fontWeight: '600', color: '#FFD700', marginBottom: 15, textAlign: 'center' },
    streakContainer: { alignItems: 'center', marginVertical: 10 },
    streakCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#2C2C2C', justifyContent: 'center', alignItems: 'center', position: 'relative' },
    streakNumber: { fontSize: 48, fontWeight: 'bold', color: '#FFFFFF' },
    streakLabel: { fontSize: 16, color: '#A0A0A0', textAlign: 'center', marginTop: 10 },
    toggleContainer: { flexDirection: 'row', backgroundColor: '#333', borderRadius: 20, padding: 4, marginBottom: 15 },
    toggleButton: { flex: 1, paddingVertical: 8, borderRadius: 16, alignItems: 'center' },
    toggleButtonActive: { backgroundColor: '#555' },
    toggleButtonText: { color: '#A0A0A0', fontWeight: '600' },
    toggleButtonTextActive: { color: '#FFFFFF' },
    tabsContainer: { flexDirection: 'row', borderRadius: 10, padding: 4, marginBottom: 20 },
    japaTabBackground: { backgroundColor: 'rgba(255, 138, 101, 0.1)' },
    recitationTabBackground: { backgroundColor: 'rgba(77, 182, 172, 0.1)' },
    tabButton: { flex: 1, flexDirection: 'row', paddingVertical: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    tabButtonActive: { backgroundColor: '#1E1E1E' },
    tabButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
    metricContainer: { minHeight: 150, justifyContent: 'center', alignItems: 'center' },
    metricValue: { fontSize: 48, fontWeight: 'bold', textAlign: 'center' },
    metricLabel: { fontSize: 16, color: '#A0A0A0', textAlign: 'center', marginTop: 5, marginBottom: 15 },
    recitationRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#333' },
    recitationTitle: { fontSize: 16, color: '#E0E0E0', flexShrink: 1, marginRight: 10 }, // flexShrink allows text to shrink
    recitationCount: { fontSize: 16, fontWeight: 'bold' },
    topStotrasLabel: { fontSize: 16, color: '#A0A0A0', marginBottom: 10 },
    noDataText: { fontSize: 16, color: '#A0A0A0', textAlign: 'center', fontStyle: 'italic', paddingVertical: 20 },
    cardFooterText: { fontSize: 12, color: '#666', textAlign: 'center', marginTop: 20, fontStyle: 'italic' },
    chartContainer: { flexDirection: 'row', height: 80, width: '90%', justifyContent: 'center', alignItems: 'flex-end', marginTop: 10, gap: 8 },
    barWrapper: { flex: 1, height: '100%', justifyContent: 'flex-end' },
    bar: { width: '100%', borderTopLeftRadius: 4, borderTopRightRadius: 4 },
    chartLabel: { fontSize: 12, color: '#666', marginTop: 5 },
    dataManagementText: { color: '#A0A0A0', textAlign: 'center', fontSize: 14, marginBottom: 20, lineHeight: 20 },
    dataButtonsContainer: { flexDirection: 'row', justifyContent: 'center', gap: 15 },
    dataButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10 },
    dataButtonText: { color: '#FFFFFF', fontWeight: '600', marginLeft: 12, fontSize: 14 },
});