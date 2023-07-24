import React from 'react';
import { Howl } from 'howler';

const useSoundEffect = (src, settings) => {
  // Initialize a Howl object with the given source
  const sound = new Howl({ src: [src], volume: settings.sfxVolume * settings.masterVolume / 10000});

  // Define a function to play the sound that can be memoized
  const play = React.useCallback(() => {
    sound.play();
  }, [sound]);

  // Return the 'play' function to be used by the component
  return play;
};

export {
  useSoundEffect
};
