/*
 * =================================================================
 * FILE TO UPDATE: /services/StorageService.ts
 * Added the deleteRecitationLog function to manage individual log entries.
 * =================================================================
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Japa Session Types and Functions ---
export interface JapaSession {
  malas: number;
  date: string; // ISO String format
}
const JAPA_HISTORY_KEY = 'japa_history';

// --- Recitation Log Types and Functions ---
export interface RecitationLog {
  stotraId: string;
  stotraTitle: string;
  count: number;
  date: string; // ISO String format
}
const RECITATION_LOG_KEY = 'recitation_log';

// --- Gratitude Note Types and Functions ---
export interface GratitudeNote {
  note: string;
  date: string; // ISO String format
}
const GRATITUDE_NOTES_KEY = 'gratitude_notes';

// --- Goal Types and Functions ---
export type GoalType = 'spiritual' | 'material';
export interface Goal {
  id: string; // Unique ID, e.g., timestamp
  type: GoalType;
  title: string;
  isCompleted: boolean;
}
const GOALS_KEY = 'goals_list';

// A map of all keys for easier management
const ALL_KEYS = {
    japaHistory: JAPA_HISTORY_KEY,
    recitationLogs: RECITATION_LOG_KEY,
    gratitudeNotes: GRATITUDE_NOTES_KEY,
    goals: GOALS_KEY,
};

// --- Existing Functions (Unchanged) ---

const saveJapaSession = async (session: JapaSession): Promise<void> => {
  try {
    const history = await getJapaHistory();
    const updatedHistory = [session, ...history];
    const jsonValue = JSON.stringify(updatedHistory);
    await AsyncStorage.setItem(JAPA_HISTORY_KEY, jsonValue);
  } catch (e) {
    console.error("Error saving japa session", e);
  }
};

const getJapaHistory = async (): Promise<JapaSession[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(JAPA_HISTORY_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error fetching japa history", e);
    return [];
  }
};

const deleteJapaSession = async (dateId: string): Promise<void> => {
    try {
        const history = await getJapaHistory();
        const updatedHistory = history.filter(session => session.date !== dateId);
        const jsonValue = JSON.stringify(updatedHistory);
        await AsyncStorage.setItem(JAPA_HISTORY_KEY, jsonValue);
    } catch (e) {
        console.error("Error deleting japa session", e);
    }
};

const saveRecitationLog = async (log: RecitationLog): Promise<void> => {
    try {
        const history = await getRecitationLogs();
        const today = new Date().toISOString().split('T')[0];
        const existingLogIndex = history.findIndex(
            (item) => item.stotraId === log.stotraId && item.date.startsWith(today)
        );

        if (existingLogIndex > -1) {
            history[existingLogIndex].count += log.count;
        } else {
            history.unshift(log);
        }
        
        const jsonValue = JSON.stringify(history);
        await AsyncStorage.setItem(RECITATION_LOG_KEY, jsonValue);
    } catch (e) {
        console.error("Error saving recitation log", e);
    }
};

const getRecitationLogs = async (): Promise<RecitationLog[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(RECITATION_LOG_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Error fetching recitation logs", e);
        return [];
    }
};

const deleteRecitationLog = async (dateId: string): Promise<void> => {
    try {
        const history = await getRecitationLogs();
        const updatedHistory = history.filter(log => log.date !== dateId);
        const jsonValue = JSON.stringify(updatedHistory);
        await AsyncStorage.setItem(RECITATION_LOG_KEY, jsonValue);
    } catch (e) {
        console.error("Error deleting recitation log", e);
    }
};

const saveGratitudeNote = async (note: GratitudeNote): Promise<void> => {
    try {
        const notes = await getGratitudeNotes();
        notes.unshift(note);
        const jsonValue = JSON.stringify(notes);
        await AsyncStorage.setItem(GRATITUDE_NOTES_KEY, jsonValue);
    } catch (e) {
        console.error("Error saving gratitude note", e);
    }
};

const getGratitudeNotes = async (): Promise<GratitudeNote[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(GRATITUDE_NOTES_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Error fetching gratitude notes", e);
        return [];
    }
};

const deleteGratitudeNote = async (noteDate: string): Promise<void> => {
    try {
        const notes = await getGratitudeNotes();
        const updatedNotes = notes.filter(note => note.date !== noteDate);
        const jsonValue = JSON.stringify(updatedNotes);
        await AsyncStorage.setItem(GRATITUDE_NOTES_KEY, jsonValue);
    } catch (e) {
        console.error("Error deleting gratitude note", e);
    }
};

const getGoals = async (): Promise<Goal[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(GOALS_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Error fetching goals", e);
        return [];
    }
};

const saveGoal = async (newGoal: Goal): Promise<void> => {
    try {
        const goals = await getGoals();
        goals.unshift(newGoal);
        const jsonValue = JSON.stringify(goals);
        await AsyncStorage.setItem(GOALS_KEY, jsonValue);
    } catch (e) {
        console.error("Error saving goal", e);
    }
};

const updateGoalStatus = async (goalId: string, isCompleted: boolean): Promise<void> => {
    try {
        const goals = await getGoals();
        const goalIndex = goals.findIndex(g => g.id === goalId);
        if (goalIndex > -1) {
            goals[goalIndex].isCompleted = isCompleted;
            const jsonValue = JSON.stringify(goals);
            await AsyncStorage.setItem(GOALS_KEY, jsonValue);
        }
    } catch (e) {
        console.error("Error updating goal status", e);
    }
};

const deleteGoal = async (goalId: string): Promise<void> => {
    try {
        const goals = await getGoals();
        const updatedGoals = goals.filter(g => g.id !== goalId);
        const jsonValue = JSON.stringify(updatedGoals);
        await AsyncStorage.setItem(GOALS_KEY, jsonValue);
    } catch (e) {
        console.error("Error deleting goal", e);
    }
};

// --- NEW: Export/Import Functions ---
const exportAllData = async (): Promise<object> => {
    const dataToExport = {
        [ALL_KEYS.japaHistory]: await getJapaHistory(),
        [ALL_KEYS.recitationLogs]: await getRecitationLogs(),
        [ALL_KEYS.gratitudeNotes]: await getGratitudeNotes(),
        [ALL_KEYS.goals]: await getGoals(),
    };
    return dataToExport;
};

const importAllData = async (data: any): Promise<void> => {
    // Validate that the imported data has the keys we expect
    for (const key of Object.values(ALL_KEYS)) {
        if (data[key] && Array.isArray(data[key])) {
            const jsonValue = JSON.stringify(data[key]);
            await AsyncStorage.setItem(key, jsonValue);
        } else {
            console.warn(`Skipping import for key "${key}" due to missing or invalid data.`);
        }
    }
};

// --- Export all functions ---
export const StorageService = {
  saveJapaSession, getJapaHistory, deleteJapaSession,
  saveRecitationLog, getRecitationLogs, deleteRecitationLog, // Added deleteRecitationLog
  saveGratitudeNote, getGratitudeNotes, deleteGratitudeNote,
  getGoals, saveGoal, updateGoalStatus, deleteGoal,
  exportAllData, importAllData, // Add new functions here
};