/*
 * =================================================================
 * File: /services/StorageService.ts (Create this file)
 * =================================================================
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const StorageService = {
  saveJapaSession,
  getJapaHistory,
};