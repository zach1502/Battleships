import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    tracks.forEach(track => {
      track.sound.on('end', () => setSelectedTrack(Math.ceil(Math.random() * tracks.length)));
    });
  }, [setSelectedTrack]);

  useEffect(() => {
    tracks.forEach(track => track.sound.volume((settings.musicVolume * settings.masterVolume) / 10000));
  }, [settings.musicVolume, settings.masterVolume, tracks]);

  useEffect(() => {
    tracks.forEach(track =>
      (track.id === selectedTrack) ?
        track.sound.play() : track.sound.stop()
    );

    // Cleanup function to stop all sounds when the component is unmounted
    return () => tracks.forEach(track => track.sound.stop());
  }, [selectedTrack, tracks]);

  // FOR DEBUG/TESTING ONLY
  // Check if the user is within the "settings" view to add buttons
  const location = useLocation();
  const handleTrackSelection = (trackId) => setSelectedTrack(trackId);
  if (location.pathname === '/settings') {
    return (
      <div>
        <h2>Choose Background Music:</h2>
        <ul>
          {tracks.map(track => <li key={track.id}><button onClick={() => handleTrackSelection(track.id)}>{track.title}</button></li>)}
          <li><button onClick={() => handleTrackSelection(0)}>Stop Music</button></li>
        </ul>
      </div>
    )
  }

  // Return null when not in the "/settings" path
  return null;
};

export default BackgroundMusic;
