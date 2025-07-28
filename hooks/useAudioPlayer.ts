/*
 * =================================================================
 * FILE TO UPDATE: /hooks/useAudioPlayer.ts
 * This is the robust audio hook using `expo-audio`. It now returns
 * the raw player instance so the UI component can control it directly,
 * which is essential for lifecycle management.
 * =================================================================
 */
import { Stotra } from '@/data/stotras';
import { AudioPlayer, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

const resolveAudioSource = (fileName: Stotra['audio']) => {
  switch (fileName) {
    case 'kal_bhairav.mp3': return require('../assets/audio/kal_bhairav.mp3');
    case 'bhairava_stotra.mp3': return require('../assets/audio/bhairava_stotra.mp3');
    case 'hanuman_chalisa.mp3': return require('../assets/audio/hanuman_chalisa.mp3');
    case 'Ashtottara_bhairav.mp3': return require('../assets/audio/Ashtottara_bhairav.mp3');
    default: throw new Error(`Unknown audio file: ${fileName}`);
  }
};

// The hook now returns the player instance itself
export const useSadhanaAudioPlayer = (audioFile: Stotra['audio']): { player: AudioPlayer | null; status: any } => {
  const source = resolveAudioSource(audioFile);
  const player = useAudioPlayer(source);
  const status = useAudioPlayerStatus(player);

  return { player, status };
};