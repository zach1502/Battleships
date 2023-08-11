import React from 'react';
import useLocalStorage from './use_local_storage';
import useSoundEffect from './use_sound_effect';
import { listOfAllAchievements } from '../achievements_list';

const useAchievements = (playerData, settings) => {
  const [obtainedAchievements, setObtainedAchievements] = useLocalStorage('obtainedAchievements', [], true);
  const [theNewAchievement, setTheNewAchievement] = React.useState(null);

  const playAchievementSound = useSoundEffect('/sound/achievementGet.mp3', settings)
  
  React.useEffect(() => {
    const newAchievements = listOfAllAchievements.filter(achievement =>
      achievement.condition(playerData) && !obtainedAchievements.includes(achievement.name)
    );

    newAchievements.forEach((achievement) => {
      setObtainedAchievements(prev => [...prev, achievement.name]);
      setTheNewAchievement(achievement);
      playAchievementSound();
    });
  }, [playerData, setObtainedAchievements, obtainedAchievements, playAchievementSound]);

  const clearNewAchievements = () => {
    setTheNewAchievement(null);
  };

  return {obtainedAchievements, theNewAchievement, clearNewAchievements};
};

export default useAchievements;
