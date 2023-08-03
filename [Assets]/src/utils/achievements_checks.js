const achievementsCheck = (enemyBattleGrid, playerBattleGrid, gameLog) => {
  const enemyHitCount = enemyBattleGrid.flat().filter((shot) => shot === 'hit').length;
  const playerHitCount = playerBattleGrid.flat().filter((shot) => shot === 'hit').length;

  const achievements = {};

  // game log contents is an array of strings "Hit! E4" or "Miss! E4". every 2nd element is the Ai's move
  // find the longest streak of hits of the player in the game log

  let maxPlayerHitStreak = 0;
  let maxPlayerMissStreak = 0;

  let playerHitStreak = 0;
  let playerMissStreak = 0;

  for (let i = 0; i < gameLog.length; i++) {
    if (i % 2 === 0 && gameLog[i].includes('Hit!')) {
      playerHitStreak++;
      playerMissStreak = 0;
    }
    if (i % 2 === 0 && gameLog[i].includes('Miss!')) {
      playerMissStreak++;
      playerHitStreak = 0;
    }
    if (playerHitStreak > maxPlayerHitStreak) {
      maxPlayerHitStreak = playerHitStreak;
    }
    if (playerMissStreak > maxPlayerMissStreak) {
      maxPlayerMissStreak = playerMissStreak;
    }
  }

  // Win a game without any of your ships getting hit
  if (enemyHitCount === 0 && playerHitCount === 17) {
    achievements.cantTouchThis = true;
  }

  // Lose a game without hitting any of the enemy's ships
  if (enemyHitCount === 17 && playerHitCount === 0) {
    achievements.battleIsnt = true;
  }

  // miss at least n times in a row
  if (maxPlayerMissStreak >= 10) {
    achievements.areYouEvenTrying = true;
  }
  if (maxPlayerMissStreak >= 20) {
    achievements.stormtrooper = true;
  }

  // hit at least n times in a row
  if (maxPlayerHitStreak >= 10) {
    achievements.cantStopWontStop = true;
  }
  if (maxPlayerHitStreak >= 17) {
    achievements.hawkeye = true;
  }


  // I thought this was chess?
  const first = playerBattleGrid[0][0];
  const second = playerBattleGrid[0][1];
  let areEvensSame = true;
  let areOddsSame = true;

  // Loop over the grid and check the even and odd positioned elements
  for (let i = 0; i < playerBattleGrid.length; i++) {
    for (let j = 0; j < playerBattleGrid[i].length; j++) {
      // Even positioned elements (0-based)
      if ((i + j) % 2 === 0) {
        if (playerBattleGrid[i][j] !== first) {
          areEvensSame = false;
        }
      }
      // Odd positioned elements
      else {
        if (playerBattleGrid[i][j] !== second) {
          areOddsSame = false;
        }
      }
      // If both conditions are not satisfied, break from the loop early
      if (!areEvensSame && !areOddsSame) {
        break;
      }
    }
    // If both conditions are not satisfied, break from the outer loop as well
    if (!areEvensSame && !areOddsSame) {
      break;
    }
  }

  // If either condition is satisfied, award the achievement
  if (areEvensSame || areOddsSame) {
    achievements.iThoughtThisWasChess = true;
  }



  // patience is a virtue, longer than 100 moves/50 turns
  achievements.patienceIsAVirtue = gameLog.length >= 140;

  return achievements;
};

export {
  achievementsCheck,
};