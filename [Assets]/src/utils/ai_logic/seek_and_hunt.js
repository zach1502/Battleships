// DIFFICULTY: EASY
import { AI_STATES, DEFAULT_SEEK_AND_HUNT_STATE } from '../constants';
import { performShot, CONFIG } from './ai_utils';

const saveStateToLocalStorage = (state) => {
  localStorage.setItem('hunt_and_seek_state', JSON.stringify(state));
}

const getStateFromLocalStorage = () => {
  const savedState = localStorage.getItem('hunt_and_seek_state');
  return savedState ? JSON.parse(savedState) : null;
}

let state = getStateFromLocalStorage() || DEFAULT_SEEK_AND_HUNT_STATE;

const makeHuntAndSeekShot = (enemyBattleGrid, setEnemyBattleGrid, playerShipGrid) => {
  let shotPosition = null;
  let shotResult = null;

  if (state.currentAIState === AI_STATES.seek) {
    shotPosition = getRandomShotPosition(enemyBattleGrid);
    const shotObj = performShot(shotPosition, enemyBattleGrid, setEnemyBattleGrid, playerShipGrid);
    shotResult = shotObj.shotResult;

    if (shotResult === CONFIG.CELL_HIT) {
      state.currentAIState = AI_STATES.hunt;
      state.lastHitPosition = shotPosition;
      state.toTryPositions = getSurroundingPositions(state.lastHitPosition, enemyBattleGrid);
      saveStateToLocalStorage(state);
    }
  } else if (state.currentAIState === AI_STATES.hunt) {
    if (state.toTryPositions.length === 0) {
      state.currentAIState = AI_STATES.seek;
      state.lastHitPosition = null;
      return makeHuntAndSeekShot(enemyBattleGrid, setEnemyBattleGrid, playerShipGrid); // revert back to seek
    } else {
      shotPosition = state.toTryPositions.pop();
      const shotObj = performShot(shotPosition, enemyBattleGrid, setEnemyBattleGrid, playerShipGrid);
      shotResult = shotObj.shotResult;
      if (shotResult === CONFIG.CELL_HIT) {
        state.lastHitPosition = shotPosition;
        state.toTryPositions = state.toTryPositions.concat(getSurroundingPositions(state.lastHitPosition, enemyBattleGrid));
        saveStateToLocalStorage(state);
      }
    }
  }

  updateSmallShipSize(playerShipGrid, enemyBattleGrid);
  saveStateToLocalStorage(state);

  return {
    shotResult,
    row: shotPosition[0],
    col: shotPosition[1],
  };
};

const updateSmallShipSize = (playerShipGrid, enemyBattleGrid) => {
  // iterate through enemyBattleGrid, 
  // if there is a hit, check the respective square in playerShipGrid. tick down the ship size of the respective ship

  enemyBattleGrid.forEach((row, rowIndex) => {
    row.forEach((square, colIndex) => {
      if (square === CONFIG.CELL_HIT) {
        const tile = playerShipGrid[rowIndex][colIndex];
        if (tile !== CONFIG.CELL_HIT) {
          const remainingShipLengths = { ...state.remainingShipLengths };
          remainingShipLengths[tile]--;
          state.remainingShipLengths = remainingShipLengths;
        }
      }
    });
  });

  // find the smallest surviving ship
  let smallestShipLength = 100;
  for (const [ship, length] of Object.entries(state.remainingShipLengths)) {
    if (length > 0 && CONFIG.ORIGINAL_SHIP_SIZES[ship] < smallestShipLength) {
      smallestShipLength = length;
    }
  }

  state.smallestShipSize = smallestShipLength;
};

const getSurroundingPositions = (position, grid) => {
  const surroundingPositions = JSON.parse(JSON.stringify(CONFIG.DIRECTIONS))
    .map(([dirRow, dirCol]) => [position[0] + dirRow, position[1] + dirCol])
    .filter(([row, col]) => row >= 0 && row < grid.length && col >= 0 && col < grid[0].length && grid[row][col] === null);

  return surroundingPositions;
};

const getRandomShotPosition = (grid) => {
  let possibleShots = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === null) {
        const canFitSmallestShip =
          canFitShipInDirection([i, j], [0, 1], grid) || // Check horizontally
          canFitShipInDirection([i, j], [1, 0], grid); // Check vertically
        if (canFitSmallestShip) {
          possibleShots.push([i, j]);
        }
      }
    }
  }

  if (possibleShots.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * possibleShots.length);
  return possibleShots[randomIndex];
};

const canFitShipInDirection = (startPos, direction, grid) => {
  const maxIndex = state.smallestShipSize;
  
  for (let i = 0; i < maxIndex; i++) {
    const row = startPos[0] + direction[0] * i;
    const col = startPos[1] + direction[1] * i;

    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] === CONFIG.CELL_MISS) {
      return false;
    }
  }

  const nextRow = startPos[0] + direction[0] * maxIndex;
  const nextCol = startPos[1] + direction[1] * maxIndex;

  if (nextRow >= 0 && nextRow < grid.length && nextCol >= 0 && nextCol < grid[0].length && grid[nextRow][nextCol] !== null) {
    return false;
  }

  return true;
};

export default makeHuntAndSeekShot;
