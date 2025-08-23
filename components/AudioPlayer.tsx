/*
 * =================================================================
 * FILE TO UPDATE: /components/AudioPlayer.tsx
 * Using community slider for reliability
 * =================================================================
 */
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { AudioPlayer as PlayerInstance } from 'expo-audio';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  const [isChangingRate, setIsChangingRate] = useState(false);

  const togglePlayback = useCallback(() => {
    if (!player || isChangingRate) return;
    try {
      if (status?.playing) {
        player.pause();
      } else {
        player.play();
      }
    } catch (error) {
      console.log('Audio player operation failed - player may have been released');
    }
  }, [player, status?.playing, isChangingRate]);

  const changeRate = useCallback(async (rate: number) => {
    if (!player || isChangingRate) return;
    
    setIsChangingRate(true);
    const wasPlaying = status?.playing || false;
    
    try {
      if (wasPlaying) {
        await player.pause();
      }
      
      await new Promise(resolve => setTimeout(resolve, 50));
      await player.setPlaybackRate(rate);
      
      if (wasPlaying) {
        await new Promise(resolve => setTimeout(resolve, 100));
        await player.play();
      }
    } catch (error) {
      console.log('Failed to change playback rate:', error);
    } finally {
      setIsChangingRate(false);
    }
  }, [player, status?.playing, isChangingRate]);

  const handleSeekStart = useCallback(() => {
    if (!player) return;
    try {
      setWasPlayingBeforeSeek(status?.playing || false);
      if (status?.playing) {
        player.pause();
      }
    } catch (error) {
      console.log('Failed to pause for seeking');
    }
  }, [player, status?.playing]);

  const handleSeekComplete = useCallback(async (positionSeconds: number) => {
    if (!player) return;
    try {
      await player.seekTo(Math.max(0, positionSeconds));
      
      if (wasPlayingBeforeSeek) {
        setTimeout(async () => {
          try {
            await player.play();
          } catch (error) {
            console.log('Failed to resume playback after seek');
          }
        }, 150);
      }
    } catch (error) {
      console.log('Failed to seek');
    }
  }, [player, wasPlayingBeforeSeek]);

  const playbackRates = [1.0, 1.25, 1.5, 2.0];
  const isLoading = !status?.isLoaded;
  const isPlaying = status?.playing || false;
  
  // Use seconds for the community slider
  const positionSeconds = status?.currentTime || 0;
  const durationSeconds = status?.duration || 0;
  const playbackRate = player?.playbackRate ?? 1.0;

  const shouldShowSlider = durationSeconds && durationSeconds > 0;

  return (
    <View style={audioStyles.container}>
      <TouchableOpacity 
        style={[
          audioStyles.playButton,
          (isLoading || isChangingRate) && audioStyles.playButtonDisabled
        ]} 
        onPress={togglePlayback} 
        disabled={isLoading || isChangingRate}
      >
        {isLoading || isChangingRate ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <Ionicons 
            name={isPlaying ? 'pause' : 'play'} 
            size={40} 
            color="white" 
          />
        )}
      </TouchableOpacity>

      <View style={audioStyles.progressContainer}>
        <Text style={audioStyles.timeText}>
          {formatTime(positionSeconds * 1000)}
        </Text>
        
        {shouldShowSlider ? (
          <Slider
            style={audioStyles.slider}
            minimumValue={0}
            maximumValue={durationSeconds}
            value={positionSeconds}
            onSlidingStart={handleSeekStart}
            onSlidingComplete={handleSeekComplete}
            minimumTrackTintColor="#FF6D00"
            maximumTrackTintColor="#555"
            thumbTintColor="#FF6D00"
            disabled={isLoading || isChangingRate}
          />
        ) : (
          <View style={audioStyles.slider} />
        )}
        
        <Text style={audioStyles.timeText}>
          {formatTime(durationSeconds * 1000)}
        </Text>
      </View>

      <View style={audioStyles.speedContainer}>
        {playbackRates.map((rate) => (
          <TouchableOpacity 
            key={rate} 
            onPress={() => changeRate(rate)} 
            style={[
              audioStyles.speedButton, 
              playbackRate === rate && audioStyles.speedButtonActive,
              isChangingRate && audioStyles.speedButtonDisabled
            ]}
            disabled={isChangingRate}
          >
            <Text 
              style={[
                audioStyles.speedButtonText, 
                playbackRate === rate && audioStyles.speedButtonTextActive,
                isChangingRate && audioStyles.speedButtonTextDisabled
              ]}
            >
              {rate}x
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const audioStyles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: '#1E1E1E', 
    borderRadius: 15, 
    marginHorizontal: 10, 
    alignItems: 'center' 
  },
  playButton: { 
    backgroundColor: '#FF6D00', 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 20 
  },
  playButtonDisabled: {
    backgroundColor: '#FF6D00AA',
  },
  progressContainer: { 
    width: '100%', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 15 
  },
  slider: { 
    flex: 1, 
    marginHorizontal: 10,
    height: 40,
  },
  timeText: { 
    color: '#AAA', 
    fontSize: 12, 
    width: 45, 
    textAlign: 'center' 
  },
  speedContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%', 
    paddingHorizontal: 20,
  },
  speedButton: { 
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    borderRadius: 20, 
    backgroundColor: '#333',
    marginHorizontal: 4,
  },
  speedButtonActive: { 
    backgroundColor: '#FF6D00' 
  },
  speedButtonDisabled: {
    backgroundColor: '#333333AA',
  },
  speedButtonText: { 
    color: '#FFF', 
    fontWeight: 'bold',
    fontSize: 14
  },
  speedButtonTextActive: { 
    color: '#FFF' 
  },
  speedButtonTextDisabled: {
    color: '#FFFFFF66',
  }
});