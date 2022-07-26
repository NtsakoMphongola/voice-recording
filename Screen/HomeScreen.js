import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { Audio } from 'expo-av';


const HomeScreen = () => {
    const [recording, setRecording] = React.useState();
    async function startRecording() {
        try {
            console.log('Requesting submission...');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Start recording...');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
            console.log('Recordig started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('stop recording...');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Recording Stopped and srore as', uri)
    }

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title={recording ? 'Stop Recording' : 'Start Recording'} onPress={recording ? stopRecording : startRecording} />

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})