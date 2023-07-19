// DIFFICULTY: EASY

const AIStates = {
  seek: "seek",
  hunt: "hunt",
};

const DEFAULT_STATE = {
  currentAIState: AIStates.seek,
  lastHitPosition: null,
  targetDirections: [[-1, 0], [1, 0], [0, -1], [0, 1]],  // Up, Down, Left, Right
  toTryPositions: [],
  smallestShipSize: 2,
  remainingShipLengths: {
    "carrier": 5,
    "battleship": 4,
    "cruiser": 3,
    "submarine": 3,
    "destroyer": 2,
  }
};

const saveStateToLocalStorage = (state) => {
  localStorage.setItem('hunt_and_seek_state', JSON.stringify(state));
}

const getStateFromLocalStorage = () => {
  const savedState = localStorage.getItem('hunt_and_seek_state');
  return savedState ? JSON.parse(savedState) : null;
}

let state = getStateFromLocalStorage() || DEFAULT_STATE;

const makeSmartShot = (enemyBattleGrid, setEnemyBattleGrid, playerShipGrid) => {
  console.time("makeSmartShot");
  let shotPosition = null;
  let shotResult = null;

  if (state.currentAIState === AIStates.seek) {
    shotPosition = getRandomShotPosition(enemyBattleGrid);
    shotResult = performShot(shotPosition, enemyBattleGrid, setEnemyBattleGrid, playerShipGrid);

    if (shotResult === "hit") {
      state.currentAIState = AIStates.hunt;
      state.lastHitPosition = shotPosition;
      state.toTryPositions = getSurroundingPositions(state.lastHitPosition, enemyBattleGrid);
      saveStateToLocalStorage(state);
    }
  } else if (state.currentAIState === AIStates.hunt) {
    if (state.toTryPositions.length === 0) {
      state.currentAIState = AIStates.seek;
      state.lastHitPosition = null;
      return makeSmartShot(enemyBattleGrid, setEnemyBattleGrid, playerShipGrid); // revert back to seek
    } else {
      shotPosition = state.toTryPositions.pop();
      shotResult = performShot(shotPosition, enemyBattleGrid, setEnemyBattleGrid, playerShipGrid);
      if (shotResult === "hit") {
        state.lastHitPosition = shotPosition;
        state.toTryPositions = state.toTryPositions.concat(getSurroundingPositions(state.lastHitPosition, enemyBattleGrid));
        saveStateToLocalStorage(state);
      }
    }
  }

  updateSmallShipSize(playerShipGrid, enemyBattleGrid);
  saveStateToLocalStorage(state);

  console.timeEnd("makeSmartShot");

  return shotResult;
};

const updateSmallShipSize = (playerShipGrid, enemyBattleGrid) => {
  // iterate through enemyBattleGrid, 
  // if there is a hit, check the respective square in playerShipGrid. tick down the ship size of the respective ship

  enemyBattleGrid.forEach((row, rowIndex) => {
    row.forEach((square, colIndex) => {
      if (square === "hit") {
        const tile = playerShipGrid[rowIndex][colIndex];
        if (tile !== "hit") {
          const remainingShipLengths = { ...state.remainingShipLengths };
          remainingShipLengths[tile]--;
          state.remainingShipLengths = remainingShipLengths;
        }
      }
    });
  });

  const originalLengths = {
    "carrier": 5,
    "battleship": 4,
    "cruiser": 3,
    "submarine": 3,
    "destroyer": 2,
  };

  // find the smallest surviving ship
  let smallestShip = null;
  let smallestShipLength = 100;
  for (const [ship, length] of Object.entries(state.remainingShipLengths)) {
    if (length > 0 && originalLengths[ship] < smallestShipLength) {
      smallestShip = ship;
      smallestShipLength = length;
    }
  }

  state.smallestShipSize = smallestShipLength;
};

const getSurroundingPositions = (position, grid) => {
  const surroundingPositions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
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

    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] === "miss") {
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

const performShot = (shotPosition, enemyBattleGrid, setEnemyBattleGrid, playerShipGrid) => {
  const [row, col] = shotPosition;
  const shotResult = playerShipGrid[row][col] !== null ? "hit" : "miss";

  // Update enemy battle grid
  const newEnemyBattleGrid = [...enemyBattleGrid];
  newEnemyBattleGrid[row][col] = shotResult;
  setEnemyBattleGrid(newEnemyBattleGrid);

  return shotResult;
};

export default makeSmartShot;
