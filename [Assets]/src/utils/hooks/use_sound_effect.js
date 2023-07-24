import React from 'react';
import { Howl } from 'howler';

const useSoundEffect = (src, settings) => {
  // Define a function to play the sound that can be memoized
  const play = React.useCallback(() => {
    const sound = new Howl({ src: [src], volume: settings.sfxVolume * settings.masterVolume / 10000});
    sound.play();
  }, []);

  // Return the 'play' function to be used by the component
  return play;
};

export {
  useSoundEffect
};
