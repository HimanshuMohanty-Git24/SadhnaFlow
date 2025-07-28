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


// --- Export all functions ---
export const StorageService = {
  saveJapaSession,
  getJapaHistory,
  saveRecitationLog,
  getRecitationLogs,
  saveGratitudeNote,
  getGratitudeNotes,
};