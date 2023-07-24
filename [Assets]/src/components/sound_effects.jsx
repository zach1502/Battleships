import React from 'react';
import { Howl } from 'howler';
import { useLocation} from 'react-router-dom';

const SoundEffects = (props) => {
  const settings = props.settings;

  let location = useLocation();
  const playSound = (src) => {
    const sound = new Howl({
      src: [src],
      volume: settings.sfxVolume / 100,
    });
    sound.play();
  };


  // FOR DEBUG/TESTING ONLY
  if (location.pathname === '/settings') {
    return (
      <div>
        <h2>Test Sound Effects:</h2>
        <ul>
          <li>
            <button onClick={() => playSound('/sound/Hit.mp3')}>Hit</button>
          </li>
          <li>
            <button onClick={() => playSound('/sound/Miss.mp3')}>Miss</button>
          </li>
        </ul>
      </div>
    );
  }
};

export default SoundEffects;
