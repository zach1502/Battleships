import React from 'react';
import { useLocalStorage } from './use_local_storage';
import { listOfAllAchievements } from '../achievements_list';

const useAchievements = (playerData) => {
  const [obtainedAchievements, setObtainedAchievements] = useLocalStorage("obtainedAchievements", []);

  React.useEffect(() => {
    listOfAllAchievements.forEach((achievement) => {
      if (achievement.condition(playerData)) {
        setObtainedAchievements(prev => [...prev, achievement.name]);
      }
    });
  }, [playerData]);

  return obtainedAchievements;
};

export {
    useAchievements,
};