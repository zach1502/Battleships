// DIFFICULTY: Impossible
import { CONFIG, performShot } from "./ai_utils";
import makeSmarterShot from "./heat_map";

const makeCheatingShot = (enemyBattleGrid, setEnemyBattleGrid, playerShipGrid, setDebugState = ()=>null) => {

  if (Math.random() < CONFIG.ODDS_OF_CHEATING){
    const shotPosition = cheatAndGetNextShotPosition(playerShipGrid, enemyBattleGrid);
    const {shotResult} = performShot(shotPosition, enemyBattleGrid, setEnemyBattleGrid, playerShipGrid);
    return {
      shotResult,
      row: shotPosition[0],
      col: shotPosition[1],
    }
  }
  else {
    return makeSmarterShot(enemyBattleGrid, setEnemyBattleGrid, playerShipGrid, setDebugState);
  }
};

const cheatAndGetNextShotPosition = (playerShipGrid, enemyBattleGrid) => {
    // find all tiles where playerShipGrid is not null and enemyBattleGrid is null
    const possiblePositions = [];

    playerShipGrid.forEach((row, rowIndex) => {
        row.forEach((square, colIndex) => {
            if (square !== null && enemyBattleGrid[rowIndex][colIndex] === null) {
              possiblePositions.push([rowIndex, colIndex]);
            }
        });
    });

    return possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
};

export default makeCheatingShot;
