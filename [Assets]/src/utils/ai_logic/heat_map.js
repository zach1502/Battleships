// DIFFICULTY: Impossible
import { initializeGrid, isValidCoordinate, getRemainingShips, CONFIG } from './ai_utils';
import { NATURAL_BIAS_GRID } from '../constants';

let currentHeatMap = null;

const makeHeatMapShot = (enemyBattleGrid, setEnemyBattleGrid, playerShipGrid, setDebugState = ()=>null) => {
  const remainingShips = getRemainingShips(playerShipGrid);

  if (!currentHeatMap) {
    currentHeatMap = createProbabilityGrid(enemyBattleGrid, remainingShips);
  }

  const shotPosition = getNextShotPosition(enemyBattleGrid, currentHeatMap);
  
  const {shotResult, newEnemyBattleGrid} = performShot(shotPosition, enemyBattleGrid, setEnemyBattleGrid, playerShipGrid);

  // update heat map
  currentHeatMap = updateHeatMap(shotPosition, shotResult, newEnemyBattleGrid, playerShipGrid, remainingShips, currentHeatMap);

  setDebugState(currentHeatMap);
  return {
    shotResult,
    row: shotPosition[0],
    col: shotPosition[1],
  }
};

const createProbabilityGrid = (playerShipGrid, remainingShips) => {
  const baseGrid = getBaseProbability(playerShipGrid, remainingShips);
  const trackingGrid = getTrackingModifiers(playerShipGrid);

  const probabilityGrid = baseGrid.map((row, i) => row.map((cell, j) => ({
    base: cell,
    tracking: trackingGrid[i][j],
    bias: NATURAL_BIAS_GRID[i][j],
  })));

  return probabilityGrid;
};

const getNextShotPosition = (enemyBattleGrid, currentHeatMap) => {
  let bestPositions = [];
  let maxProbability = -1;

  for(let i = 0; i < enemyBattleGrid.length; i++) {
    for(let j = 0; j < enemyBattleGrid[i].length; j++) {
      if(enemyBattleGrid[i][j] !== null) continue; // Skip cells that have already been shot

      const cellProbability = currentHeatMap[i][j].base + currentHeatMap[i][j].tracking + currentHeatMap[i][j].bias;
      
      if(cellProbability > maxProbability) {
        bestPositions = [[i, j]];
        maxProbability = cellProbability;
      }
      else if (cellProbability === maxProbability) {
        bestPositions.push([i, j]);
      }
    }
  }

  return bestPositions[Math.floor(Math.random() * bestPositions.length)];
};

const performShot = (shotPosition, enemyBattleGrid, setEnemyBattleGrid, playerShipGrid) => {
  if (!shotPosition) return {shotResult: CONFIG.CELL_MISS, newEnemyBattleGrid: enemyBattleGrid};
  const row = shotPosition[0];
  const col = shotPosition[1];

  const shotResult = playerShipGrid[row][col] !== null ? CONFIG.CELL_HIT : CONFIG.CELL_MISS;

  // Update enemy battle grid
  const newEnemyBattleGrid = [...enemyBattleGrid];
  newEnemyBattleGrid[row][col] = shotResult;
  setEnemyBattleGrid(newEnemyBattleGrid);

  return { shotResult, newEnemyBattleGrid };
};

const updateHeatMap = (shotPosition, shotResult, enemyBattleGrid, playerShipGrid, remainingShips, currentHeatMap) => {
  const row = shotPosition[0];
  const col = shotPosition[1];
  
  if (shotResult === CONFIG.CELL_HIT) {
    // increase tracking in the 4 CONFIG.DIRECTIONS around the hit
    for(let i = 0; i < 4; i++) {
      CONFIG.DIRECTIONS.forEach(([rowDir, colDir]) => {
        let i = row + rowDir;
        let j = col + colDir;
        while(isValidCoordinate(i, j, enemyBattleGrid) && enemyBattleGrid[i][j] === CONFIG.CELL_HIT) {
          currentHeatMap[i][j].tracking++;
          i += rowDir;
          j += colDir;
        }
      });
    }
  }
  
  // Recalculate base probabilities since a ship could have been sunk
  const baseGrid = getBaseProbability(enemyBattleGrid, remainingShips);

  // Calculate tracking modifiers
  const trackingGrid = getTrackingModifiers(enemyBattleGrid, playerShipGrid, baseGrid);

  // Update current heat map
  for(let i = 0; i < enemyBattleGrid.length; i++) {
    for(let j = 0; j < enemyBattleGrid[i].length; j++) {
      currentHeatMap[i][j].base = baseGrid[i][j];
      currentHeatMap[i][j].tracking = trackingGrid[i][j];
      currentHeatMap[i][j].bias = NATURAL_BIAS_GRID[i][j];
    }
  }

  return currentHeatMap;
};

// function to get the base probability
const getBaseProbability = (playerShipGrid, remainingShips) => {
  const baseGrid = initializeGrid(playerShipGrid.length, playerShipGrid[0].length, CONFIG.DEFAULT_MODIFIER);

  remainingShips.forEach(ship => {
    const shipSize = CONFIG.ORIGINAL_SHIP_SIZES[ship];

    // CONFIG.HORIZONTAL check
    for(let i = 0; i < playerShipGrid.length; i++) {
      for(let j = 0; j <= playerShipGrid[i].length - shipSize; j++) {
        let potentialSpot = true;
        for(let k = 0; k < shipSize; k++) {
          if(playerShipGrid[i][j+k] === CONFIG.CELL_MISS) {
            potentialSpot = false;
            break;
          }
        }
        if(potentialSpot) {
          for(let k = 0; k < shipSize; k++) {
            baseGrid[i][j+k]++;
          }
        }
      }
    }

    // CONFIG.VERTICAL check
    for(let i = 0; i <= playerShipGrid.length - shipSize; i++) {
      for(let j = 0; j < playerShipGrid[0].length; j++) {
        let potentialSpot = true;
        for(let k = 0; k < shipSize; k++) {
          if(playerShipGrid[i+k][j] === CONFIG.CELL_MISS) {
            potentialSpot = false;
            break;
          }
        }
        if(potentialSpot) {
          for(let k = 0; k < shipSize; k++) {
            baseGrid[i+k][j]++;
          }
        }
      }
    }
  });

  return baseGrid;
};

// Function to get the tracking modifiers
const getTrackingModifiers = (enemyBattleGrid, playerShipGrid, baseGrid) => {
  const trackingGrid = initializeGrid(enemyBattleGrid.length, enemyBattleGrid[0].length, CONFIG.DEFAULT_MODIFIER);

  if (!baseGrid) return trackingGrid;

  const remainingShipLengths = JSON.parse(JSON.stringify(CONFIG.ORIGINAL_SHIP_SIZES));
  playerShipGrid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell !== null && enemyBattleGrid[i][j] === CONFIG.CELL_HIT) {
        remainingShipLengths[cell]--;
      }
    });
  });
  const sunkShips = Object.keys(remainingShipLengths).filter(ship => remainingShipLengths[ship] === 0);

  for(let i = 0; i < enemyBattleGrid.length; i++) {
    for(let j = 0; j < enemyBattleGrid[i].length; j++) {
      if(enemyBattleGrid[i][j] === CONFIG.CELL_HIT) {
        const shipName = playerShipGrid[i][j];
        if(sunkShips.find((val) => val === shipName)) {
          CONFIG.DIRECTIONS.forEach(([dx, dy]) => {
            // set the tracking modifier to 0 for all cells around the sunk ship
            const x = i + dx, y = j + dy;
            if(isValidCoordinate(x, y, enemyBattleGrid)) {
              trackingGrid[x][y] = 0;
            }
          });

          trackingGrid[i][j] = CONFIG.DEFAULT_MODIFIER; // Set the tracking modifier to the default value for the sunk ship
          continue;
        }

        let horizontalHit = false;
        let verticalHit = false;
        let adjacentHits = [];
        CONFIG.DIRECTIONS.forEach(([dx, dy]) => {
          const x = i + dx, y = j + dy;
          if(isValidCoordinate(x, y, enemyBattleGrid)) {
            if(enemyBattleGrid[x][y] === CONFIG.CELL_HIT) {
              adjacentHits.push([dx, dy]); // This direction has a hit
              horizontalHit = horizontalHit || CONFIG.HORIZONTAL.includes([dx, dy]);
              verticalHit = verticalHit || CONFIG.VERTICAL.includes([dx, dy]);
            } else if(enemyBattleGrid[x][y] === null) {
              trackingGrid[x][y] += CONFIG.HIT_MODIFIER; // Increase the modifier around the 'hit' cell
            }
          }
        });
        
        // If there are adjacent hits, increase the modifier in those CONFIG.DIRECTIONS
        if(adjacentHits.length > 0) {
          adjacentHits.forEach(([dx, dy]) => {
            let x = i + dx
            let y = j + dy;
            while(isValidCoordinate(x, y, enemyBattleGrid) && enemyBattleGrid[x][y] === null) {
              // Increase the modifier in the direction of hits
              if((horizontalHit && CONFIG.HORIZONTAL.includes([dx, dy])) || (verticalHit && CONFIG.VERTICAL.includes([dx, dy]))){
                trackingGrid[x][y] += CONFIG.ADJACENT_HIT_MODIFIER;
              }
              x += dx;
              y += dy;
            }
          });
        }
      }
    }
  }

  return trackingGrid;
};

export default makeHeatMapShot;
