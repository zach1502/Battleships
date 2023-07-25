import React, { useState } from 'react';
import { useLocalStorage } from './use_local_storage';
import { Howl } from 'howler';
import { listOfAllAchievements } from '../achievements_list';

const useAchievements = (playerData, settings) => {
  const [obtainedAchievements, setObtainedAchievements] = useLocalStorage("obtainedAchievements", [], true);
  const [theNewAchievement, setTheNewAchievement] = useState(null);
  const sound = new Howl({ src: ['/sound/achievementGet.mp3'], volume: settings.sfxVolume * settings.masterVolume / 10000});

  React.useEffect(() => {
    listOfAllAchievements.forEach((achievement) => {
      if (achievement.condition(playerData)) {
        if (!obtainedAchievements.includes(achievement.name)) {
          setObtainedAchievements(prev => [...prev, achievement.name]);
          setTheNewAchievement(achievement);
          sound.play();
        }
      }
    });
  }, [playerData]);

  const clearNewAchievements = () => {
    setTheNewAchievement(null);
  };

  return [obtainedAchievements, theNewAchievement, clearNewAchievements];
};

export {
  useAchievements,
};