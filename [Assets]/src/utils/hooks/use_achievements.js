import React, { useState } from 'react';
import { useLocalStorage } from './use_local_storage';
import { Howl } from 'howler';
import { listOfAllAchievements } from '../achievements_list';

const useAchievements = (playerData) => {
  const [obtainedAchievements, setObtainedAchievements] = useLocalStorage("obtainedAchievements", []);
  const [theNewAchievement, setTheNewAchievement] = useState(null);
  const sound = new Howl({ src: ['/sound/achievementGet.mp3'], volume: 0.2 });

  React.useEffect(() => {
    console.log("checking for achievements");
    console.log(playerData);
    console.log(obtainedAchievements);
    listOfAllAchievements.forEach((achievement) => {
      if (achievement.condition(playerData)) {
        if (!obtainedAchievements.includes(achievement.name)) {
          setObtainedAchievements(prev => [...prev, achievement.name]);
          setTheNewAchievement(achievement);
          sound.play();
          console.log("playing sound")
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