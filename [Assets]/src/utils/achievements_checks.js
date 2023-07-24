const achievementsCheck = (enemyBattleGrid, playerBattleGrid, gameLog) => {
    const enemyHitCount = enemyBattleGrid.flat().filter((shot) => shot === 'hit').length;
    const playerHitCount = playerBattleGrid.flat().filter((shot) => shot === 'hit').length;

    const achievements = {};

    // game log contents is an array of strings "Hit! E4" or "Miss! E4". every 2nd element is the Ai's move
    // find the longest streak of hits of the player in the game log
    const playerHitStreak = gameLog.reduce((acc, curr, index) => {
        if (index % 2 === 0 && curr.includes('Hit!')) {
            acc += 1;
        } else {
            acc = 0;
        }
        return acc;
    }, 0);
    const playerMissStreak = gameLog.reduce((acc, curr, index) => {
        if (index % 2 === 0 && curr.includes('Miss!')) {
            acc += 1;
        } else {
            acc = 0;
        }
        return acc;
    }, 0);

    // Win a game without any of your ships getting hit
    if (enemyHitCount === 0 && playerHitCount === 17) {
        achievements.cantTouchThis = true;
    }

    // Lose a game without hitting any of the enemy's ships
    if (enemyHitCount === 17 && playerHitCount === 0) {
        achievements.battleIsnt = true;
    }

    // miss at least n times in a row
    if (playerMissStreak >= 10) {
        achievements.areYouEvenTrying = true;
    }
    if (playerMissStreak >= 20) {
        achievements.stormtrooper = true;
    }

    // hit at least n times in a row
    if (playerHitStreak >= 10) {
        achievements.cantStopWontStop = true;
    }
    if (playerHitStreak >= 17) {
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