/*
 * =================================================================
 * FILE TO UPDATE: /components/AudioPlayer.tsx
 * Added error handling to prevent crashes when player is released.
 * =================================================================
 */
import { Ionicons } from '@expo/vector-icons';
import { AudioPlayer as PlayerInstance } from 'expo-audio'; // Type for the player
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomSlider from './CustomSlider';

type AudioPlayerProps = {
  player: PlayerInstance | null;
  status: any;
};

const formatTime = (millis: number | null) => {
    if (millis === null || isNaN(millis)) return '00:00';
    const totalSeconds = Math.floor(millis / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default function AudioPlayer({ player, status }: AudioPlayerProps) {
  const [wasPlayingBeforeSeek, setWasPlayingBeforeSeek] = useState(false);

  const togglePlayback = () => {
    if (!player) return;
    try {
      if (status?.playing) {
        player.pause();
      } else {
        player.play();
      }
    } catch (error) {
      console.log('Audio player operation failed - player may have been released');
    }
  };

  const changeRate = (rate: number) => {
    if (!player) return;
    try {
      player.setPlaybackRate(rate);
    } catch (error) {
      console.log('Failed to change playback rate - player may have been released');
    }
  };

  const handleSeekStart = () => {
    if (!player) return;
    try {
      setWasPlayingBeforeSeek(status?.playing || false);
      if (status?.playing) {
        player.pause();
      }
    } catch (error) {
      console.log('Failed to pause for seeking - player may have been released');
    }
  };

  const handleSeekComplete = (positionMillis: number) => {
    if (!player) return;
    try {
      player.seekTo(positionMillis / 1000); // convert ms to seconds for the player
      if (wasPlayingBeforeSeek) {
        player.play();
      }
    } catch (error) {
      console.log('Failed to seek - player may have been released');
    }
  };

  const playbackRates = [1.0, 1.25, 1.5, 2.0];
  const isLoading = !status?.isLoaded;
  const isPlaying = status?.playing || false;
  const positionMillis = (status?.currentTime || 0) * 1000;
  const durationMillis = status?.duration ? status.duration * 1000 : null;
  const playbackRate = player?.playbackRate ?? 1.0;

  return (
    <View style={audioStyles.container}>
      <TouchableOpacity style={audioStyles.playButton} onPress={togglePlayback} disabled={isLoading}>
        {isLoading ? <ActivityIndicator size="large" color="#FFFFFF" /> : <Ionicons name={isPlaying ? 'pause' : 'play'} size={40} color="white" />}
      </TouchableOpacity>

      <View style={audioStyles.progressContainer}>
        <Text style={audioStyles.timeText}>{formatTime(positionMillis)}</Text>
        <CustomSlider
          style={audioStyles.slider}
          minimumValue={0}
          maximumValue={durationMillis || 1}
          value={positionMillis}
          onSlidingStart={handleSeekStart}
          onSlidingComplete={handleSeekComplete}
          minimumTrackTintColor="#FF6D00"
          maximumTrackTintColor="#555"
          thumbTintColor="#FF6D00"
          disabled={isLoading}
        />
        <Text style={audioStyles.timeText}>{formatTime(durationMillis)}</Text>
      </View>

      <View style={audioStyles.speedContainer}>
        {playbackRates.map((rate) => (
            <TouchableOpacity key={rate} onPress={() => changeRate(rate)} style={[audioStyles.speedButton, playbackRate === rate && audioStyles.speedButtonActive]}>
                <Text style={[audioStyles.speedButtonText, playbackRate === rate && audioStyles.speedButtonTextActive]}>{rate}x</Text>
            </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const audioStyles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#1E1E1E', borderRadius: 15, marginHorizontal: 10, alignItems: 'center' },
  playButton: { backgroundColor: '#FF6D00', width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  progressContainer: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  slider: { flex: 1, marginHorizontal: 10 },
  timeText: { color: '#AAA', fontSize: 12, width: 45, textAlign: 'center' },
  speedContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingHorizontal: 20 },
  speedButton: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#333' },
  speedButtonActive: { backgroundColor: '#FF6D00' },
  speedButtonText: { color: '#FFF', fontWeight: 'bold' },
  speedButtonTextActive: { color: '#FFF' }
});