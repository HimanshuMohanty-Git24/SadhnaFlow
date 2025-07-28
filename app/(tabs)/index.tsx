/*
 * =================================================================
 * File: /app/(tabs)/index.tsx (Create this file)
 * This handles the default redirection to the Japa screen.
 * =================================================================
 */
import { Redirect } from 'expo-router';
export default function TabIndex() {
  return <Redirect href={'/(tabs)/japa'} />;
}