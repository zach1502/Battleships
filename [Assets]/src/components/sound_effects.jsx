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

  return null;
};

export default SoundEffects;
