/*
 * =================================================================
 * NEW FILE: /components/AddGoalModal.tsx
 * A modal form for creating new spiritual or material goals.
 * =================================================================
 */
import { Goal, GoalType } from '@/services/StorageService';
import React, { useState } from 'react';
import { Modal, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

type AddGoalModalProps = {
    visible: boolean;
    onClose: () => void;
    onSave: (goal: Goal) => void;
};

export default function AddGoalModal({ visible, onClose, onSave }: AddGoalModalProps) {
    const [title, setTitle] = useState('');
    const [goalType, setGoalType] = useState<GoalType>('spiritual');

    const handleSave = () => {
        if (title.trim().length === 0) {
            Alert.alert("Title Required", "Please enter a title for your goal.");
            return;
        }
        const newGoal: Goal = {
            id: Date.now().toString(),
            title: title.trim(),
            type: goalType,
            isCompleted: false,
        };
        onSave(newGoal);
        setTitle('');
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Set a New Saṅkalpa</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="What is your intention?"
                        placeholderTextColor="#666"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <View style={styles.switchContainer}>
                        <Text style={styles.switchLabel}>Material</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#FF6D00" }}
                            thumbColor={goalType === 'spiritual' ? "#f4f3f4" : "#f4f3f4"}
                            onValueChange={() => setGoalType(prev => prev === 'spiritual' ? 'material' : 'spiritual')}
                            value={goalType === 'spiritual'}
                        />
                        <Text style={styles.switchLabel}>Spiritual</Text>
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleSave}>
                            <Text style={styles.buttonText}>Save Goal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)' },
    modalView: { width: '90%', backgroundColor: '#1E1E1E', borderRadius: 20, padding: 25, alignItems: 'center' },
    modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 20 },
    input: { backgroundColor: '#333', color: '#FFFFFF', width: '100%', borderRadius: 10, padding: 15, fontSize: 16, marginBottom: 20 },
    switchContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
    switchLabel: { color: '#FFFFFF', fontSize: 16, marginHorizontal: 10 },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
    button: { borderRadius: 10, padding: 12, elevation: 2, flex: 1, marginHorizontal: 5 },
    buttonClose: { backgroundColor: '#555' },
    buttonSave: { backgroundColor: '#FF6D00' },
    buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 16 },
});