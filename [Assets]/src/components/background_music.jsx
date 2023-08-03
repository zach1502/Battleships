import React from 'react';
import { Howl } from 'howler';
import { useLocation } from 'react-router-dom';

const tracks = [
  { id: 1, title: 'Music 1', src: '/sound/1.mp3', html5: false, sound: new Howl({ src: ['/sound/1.mp3'], loop: true}) },
  { id: 2, title: 'Music 2', src: '/sound/2.mp3', html5: false, sound: new Howl({ src: ['/sound/2.mp3'], loop: true}) },
  { id: 3, title: 'Music 3', src: '/sound/3.mp3', html5: false, sound: new Howl({ src: ['/sound/3.mp3'], loop: true}) },
];

const BackgroundMusic = (props) => {
  const selectedTrack = props.selectedTrack;
  const setSelectedTrack = props.setSelectedTrack;
  const settings = props.settings;

  React.useEffect(() => {
    tracks.forEach(track => {
      track.sound.on('end', () => setSelectedTrack(Math.ceil(Math.random() * tracks.length)));
    });
  }, [setSelectedTrack]);

  React.useEffect(() => {
    tracks.forEach(track => track.sound.volume((settings.musicVolume * settings.masterVolume) / 10000));
  }, [settings.musicVolume, settings.masterVolume]);

  React.useEffect(() => {
    tracks.forEach(track =>
      (track.id === selectedTrack) ?
        track.sound.play() : track.sound.stop()
    );

    // Cleanup function to stop all sounds when the component is unmounted
    return () => tracks.forEach(track => track.sound.stop());
  }, [selectedTrack]);

  return null;
};

export default BackgroundMusic;
