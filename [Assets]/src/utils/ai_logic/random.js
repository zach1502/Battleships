// DIFFICULTY: SUPER EASY
import { performShot } from './ai_utils';

const makeRandomShot = (enemyBattleGrid, setEnemyBattleGrid, playerShipGrid) => {
  const possibleShots = getAvailableShots(enemyBattleGrid);
  
  if (possibleShots.length === 0) return;

  const shotIndex = Math.floor(Math.random() * possibleShots.length);
  const shotPosition = possibleShots[shotIndex];

  // eslint-disable-next-line no-unused-vars
  const { shotResult } = performShot(shotPosition, enemyBattleGrid, setEnemyBattleGrid, playerShipGrid);
  
  return {
    shotResult,
    row: shotPosition[0],
    col: shotPosition[1],
  };
}

const getAvailableShots = (enemyBattleGrid) => {
  const availableShots = [];
  enemyBattleGrid.forEach((row, rowIndex) => {
    row.forEach((square, colIndex) => {
      if (square === null) {
        availableShots.push([rowIndex, colIndex]);
      }
    });
  });
  return availableShots;
};

export default makeRandomShot;
