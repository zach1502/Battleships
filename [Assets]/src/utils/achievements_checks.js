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
    const flattenedPlayerBattleGrid = playerBattleGrid.flat();
    const first = flattenedPlayerBattleGrid[0];
    const second = flattenedPlayerBattleGrid[1];
    for(let i = 0; i < flattenedPlayerBattleGrid.length; i++) {
        if (i % 2 === 0 && flattenedPlayerBattleGrid[i] !== first) {
            break;
        }
        if (i % 2 === 1 && flattenedPlayerBattleGrid[i] !== second) {
            break;
        }
        if (i === flattenedPlayerBattleGrid.length - 1) {
            achievements.iThoughtThisWasChess = true;
        }
    }

    // patience is a virtue, longer than 100 moves/50 turns
    achievements.patienceIsAVirtue = gameLog.length >= 140;

    return achievements;
};

export {
    achievementsCheck,
};