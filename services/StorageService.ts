/*
 * =================================================================
 * FILE TO UPDATE: /services/StorageService.ts
 * We are adding new functions to handle saving and retrieving
 * recitation logs and gratitude notes.
 * =================================================================
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Japa Session Types and Functions (Existing) ---
export interface JapaSession {
  malas: number;
  date: string; // ISO String format
}
const JAPA_HISTORY_KEY = 'japa_history';

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

// --- NEW: Function to delete a Japa session ---
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


// --- NEW: Recitation Log Types and Functions ---
export interface RecitationLog {
  stotraId: string;
  stotraTitle: string;
  count: number;
  date: string; // ISO String format
}
const RECITATION_LOG_KEY = 'recitation_log';

const saveRecitationLog = async (log: RecitationLog): Promise<void> => {
    try {
        const history = await getRecitationLogs();
        // Check if a log for the same stotra exists for today
        const today = new Date().toISOString().split('T')[0];
        const existingLogIndex = history.findIndex(
            (item) => item.stotraId === log.stotraId && item.date.startsWith(today)
        );

        if (existingLogIndex > -1) {
            // If it exists, update the count
            history[existingLogIndex].count += log.count;
        } else {
            // Otherwise, add a new log entry
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


// --- NEW: Gratitude Note Types and Functions ---
export interface GratitudeNote {
  note: string;
  date: string; // ISO String format
}
const GRATITUDE_NOTES_KEY = 'gratitude_notes';


// --- NEW: Goal Types and Functions ---
export type GoalType = 'spiritual' | 'material';
export interface Goal {
  id: string; // Unique ID, e.g., timestamp
  type: GoalType;
  title: string;
  isCompleted: boolean;
}
const GOALS_KEY = 'goals_list';

const saveGratitudeNote = async (note: GratitudeNote): Promise<void> => {
    try {
        const notes = await getGratitudeNotes();
        const today = new Date().toISOString().split('T')[0];
        const existingNoteIndex = notes.findIndex((item) => item.date.startsWith(today));

        if (existingNoteIndex > -1) {
            // Update today's note
            notes[existingNoteIndex].note = note.note;
        } else {
            // Add a new note for today
            notes.unshift(note);
        }
        
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
        goals.unshift(newGoal); // Add to the beginning
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


// --- Export all functions ---
export const StorageService = {
  saveJapaSession,
  getJapaHistory,
  deleteJapaSession,
  saveRecitationLog,
  getRecitationLogs,
  saveGratitudeNote,
  getGratitudeNotes,
  getGoals,
  saveGoal,
  updateGoalStatus,
  deleteGoal,
};