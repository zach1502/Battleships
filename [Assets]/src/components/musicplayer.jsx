import React, { useEffect, useState } from 'react';
import {Howl, Howeler} from 'howler';
import { useLocation, useHistory } from 'react-router-dom';


const BackgroundMusic = () => {
  let location = useLocation(); 
  let defaultSong = 0;
  const [selectedTrack, setSelectedTrack] = useState(defaultSong);
  

  useEffect(() => {
    const tracks = [
      { id: 1, title: 'Music 1', src: '/sound/1.mp3' },
      { id: 2, title: 'Music 2', src: '/sound/2.mp3' },
      { id: 3, title: 'Music 3', src: '/sound/3.mp3' },
    ];

    const selectedTrackObj = tracks.find((track) => track.id === selectedTrack);

    if (selectedTrackObj) {
      const sound = new Howl({
        src: [selectedTrackObj.src],
        loop: true,
        volume: 0.5,
      });

      sound.play();

      return () => {
        sound.stop();
      };
    }
  }, [selectedTrack]);

  const handleTrackSelection = (trackId) => {
    setSelectedTrack(trackId);
  };

  // Check if the user is within the "settings" view to add buttons
  if(location.pathname === '/settings'){
    return (
      <div>
        <h2>Choose Background Music:</h2>
        <ul>
          <li>
            <button onClick={() => handleTrackSelection(1)}>Music 1</button>
          </li>
          <li>
            <button onClick={() => handleTrackSelection(2)}>Music 2</button>
          </li>
          <li>
            <button onClick={() => handleTrackSelection(3)}>Music 3</button>
          </li>
          <li>
           <button onClick={() => handleTrackSelection(0)}>Stop Music</button>
          </li>
        </ul>
      </div>
    )
  };
};

export default BackgroundMusic;
