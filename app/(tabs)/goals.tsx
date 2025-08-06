/*
 * =================================================================
 * NEW FILE: /app/(tabs)/goals.tsx
 * The main screen for displaying and managing goals.
 * =================================================================
 */
import AddGoalModal from '@/components/AddGoalModal';
import { Goal, StorageService } from '@/services/StorageService';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const GoalItem = ({ item, onToggle, onDelete }: { item: Goal, onToggle: (id: string, status: boolean) => void, onDelete: (id: string) => void }) => (
    <View style={goalStyles.goalItem}>
        <TouchableOpacity onPress={() => onToggle(item.id, !item.isCompleted)} style={goalStyles.checkbox}>
            {item.isCompleted && <Ionicons name="checkmark" size={20} color="#FF6D00" />}
        </TouchableOpacity>
        <Text style={[goalStyles.goalTitle, item.isCompleted && goalStyles.goalTitleCompleted]}>{item.title}</Text>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
            <Ionicons name="trash-outline" size={24} color="#555" />
        </TouchableOpacity>
    </View>
);

export default function GoalsScreen() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    const loadGoals = async () => {
        const storedGoals = await StorageService.getGoals();
        setGoals(storedGoals);
    };

    useFocusEffect(useCallback(() => {
        loadGoals();
    }, []));

    const handleToggleGoal = async (id: string, status: boolean) => {
        await StorageService.updateGoalStatus(id, status);
        loadGoals();
    };

    const handleDeleteGoal = (id: string) => {
        Alert.alert("Delete Goal", "Are you sure you want to delete this goal?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: async () => {
                await StorageService.deleteGoal(id);
                loadGoals();
            }},
        ]);
    };

    const handleSaveGoal = async (goal: Goal) => {
        await StorageService.saveGoal(goal);
        loadGoals();
    };

    const spiritualGoals = goals.filter(g => g.type === 'spiritual');
    const materialGoals = goals.filter(g => g.type === 'material');

    return (
        <SafeAreaView style={goalStyles.container}>
            <StatusBar 
                barStyle="light-content" 
                backgroundColor="#121212" 
                translucent={false}
            />
            <AddGoalModal visible={modalVisible} onClose={() => setModalVisible(false)} onSave={handleSaveGoal} />
            <View style={goalStyles.header}>
                <Text style={goalStyles.headerTitle}>My Saṅkalpas</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name="add-circle" size={32} color="#FF6D00" />
                </TouchableOpacity>
            </View>

            <Text style={goalStyles.sectionTitle}>Spiritual Goals</Text>
            <FlatList
                data={spiritualGoals}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <GoalItem item={item} onToggle={handleToggleGoal} onDelete={handleDeleteGoal} />}
                ListEmptyComponent={<Text style={goalStyles.emptyText}>No spiritual goals set.</Text>}
            />

            <Text style={goalStyles.sectionTitle}>Material Goals</Text>
            <FlatList
                data={materialGoals}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <GoalItem item={item} onToggle={handleToggleGoal} onDelete={handleDeleteGoal} />}
                ListEmptyComponent={<Text style={goalStyles.emptyText}>No material goals set.</Text>}
            />
        </SafeAreaView>
    );
}

const goalStyles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#121212', 
        padding: 20,
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 20 : 20,
    },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' },
    sectionTitle: { fontSize: 22, fontWeight: '600', color: '#FF6D00', marginTop: 20, marginBottom: 10, borderBottomColor: '#333', borderBottomWidth: 1, paddingBottom: 5 },
    goalItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E', padding: 15, borderRadius: 10, marginVertical: 5 },
    checkbox: { width: 28, height: 28, borderRadius: 5, borderWidth: 2, borderColor: '#555', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    goalTitle: { flex: 1, fontSize: 16, color: '#FFFFFF' },
    goalTitleCompleted: { textDecorationLine: 'line-through', color: '#666' },
    emptyText: { color: '#666', fontStyle: 'italic', textAlign: 'center', marginTop: 10 },
});