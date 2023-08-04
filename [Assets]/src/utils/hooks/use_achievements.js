import React, { useCallback } from 'react';
import useLocalStorage from './use_local_storage';
import { Howl } from 'howler';
import { listOfAllAchievements } from '../achievements_list';

const useAchievements = (playerData, settings) => {
  const [obtainedAchievements, setObtainedAchievements] = useLocalStorage("obtainedAchievements", [], true);
  const [theNewAchievement, setTheNewAchievement] = React.useState(null);

  const calculateVolume = (sfxVolume, masterVolume) => sfxVolume * masterVolume / 10000 || 0.3;

  const playAchievementSound = React.useCallback(() => {
    const sound = new Howl({ src: ['/sound/achievementGet.mp3'], volume: calculateVolume(settings.sfxVolume, settings.masterVolume) });
    sound.play();
  }, [settings.sfxVolume, settings.masterVolume]);

  React.useEffect(() => {
    const newAchievements = listOfAllAchievements.filter(achievement =>
      achievement.condition(playerData) && !obtainedAchievements.includes(achievement.name)
    );

    newAchievements.forEach((achievement) => {
      setObtainedAchievements(prev => [...prev, achievement.name]);
      setTheNewAchievement(achievement);
      playAchievementSound();
    });
  }, [playerData, setObtainedAchievements, playAchievementSound]);

  const clearNewAchievements = () => {
    setTheNewAchievement(null);
  };

  return [obtainedAchievements, theNewAchievement, clearNewAchievements];
};

export default useAchievements;
