let currentHeatMap = null;

const originalShipSizes = {
  "carrier": 5,
  "battleship": 4,
  "cruiser": 3,
  "submarine": 3,
  "destroyer": 2,
};

let previousRemainingShips = null;

const makeSmarterShot = (enemyBattleGrid, setEnemyBattleGrid, playerShipGrid, setDebugState = ()=>null) => {
  const remainingShips = getRemainingShips(playerShipGrid);

  if (!currentHeatMap) {
    currentHeatMap = createProbabilityGrid(enemyBattleGrid, remainingShips);
  }

  const shotPosition = getNextShotPosition(enemyBattleGrid, currentHeatMap);
  
  const {shotResult, newEnemyBattleGrid} = performShot(shotPosition, enemyBattleGrid, setEnemyBattleGrid, playerShipGrid);

  // update heat map
  currentHeatMap = updateHeatMap(shotPosition, shotResult, newEnemyBattleGrid, playerShipGrid, remainingShips, currentHeatMap);

  setDebugState(currentHeatMap);
  previousRemainingShips = remainingShips;

  console.log("currentHeatMap", currentHeatMap);

  return shotResult;
};

const getRemainingShips = (playerShipGrid) => {
  // set
  const remainingShips = new Set();
  playerShipGrid.forEach(row => 
    row.forEach(cell => {
      if(cell !== null && cell !== "hit" && cell !== "miss") {
        remainingShips.add(cell);
      }
    })
  );
  
  // convert to array
  const remainingShipsArray = Array.from(remainingShips);
  return remainingShipsArray;
};

const createProbabilityGrid = (playerShipGrid, remainingShips) => {
  const baseGrid = getBaseProbability(playerShipGrid, remainingShips);
  const trackingGrid = getTrackingModifiers(playerShipGrid);

  const probabilityGrid = baseGrid.map((row, i) => row.map((cell, j) => ({
    base: cell,
    tracking: trackingGrid[i][j],
  })));

  return probabilityGrid;
};

const getNextShotPosition = (enemyBattleGrid, currentHeatMap) => {
  let bestPositions = [];
  let maxProbability = 0;

  for(let i = 0; i < enemyBattleGrid.length; i++) {
    for(let j = 0; j < enemyBattleGrid[i].length; j++) {
      if(enemyBattleGrid[i][j] !== null) continue; // Skip cells that have already been shot

      const cellProbability = currentHeatMap[i][j].base + currentHeatMap[i][j].tracking;
      
      if(cellProbability > maxProbability) {
        bestPositions = [i, j];
        maxProbability = cellProbability;
      }
      else if (cellProbability === maxProbability) {
        bestPositions.push([i, j]);
      }
    }
  }

  return bestPositions;
};

const performShot = (shotPosition, enemyBattleGrid, setEnemyBattleGrid, playerShipGrid) => {
  const [row, col] = shotPosition;

  const shotResult = playerShipGrid[row][col] !== null ? "hit" : "miss";

  // Update enemy battle grid
  const newEnemyBattleGrid = [...enemyBattleGrid];
  newEnemyBattleGrid[row][col] = shotResult;
  setEnemyBattleGrid(newEnemyBattleGrid);

  return { shotResult, newEnemyBattleGrid };
};

const updateHeatMap = (shotPosition, shotResult, enemyBattleGrid, playerShipGrid, remainingShips, currentHeatMap) => {
  const [row, col] = shotPosition;
  
  if (shotResult === "hit") {
    // Increase tracking around the hit
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // Right, Down, Left, Up

    // increase tracking in the 4 directions around the hit
    for(let i = 0; i < 4; i++) {
      directions.forEach(([rowDir, colDir]) => {
        let i = row + rowDir;
        let j = col + colDir;
        while(i >= 0 && i < enemyBattleGrid.length && j >= 0 && j < enemyBattleGrid[i].length && enemyBattleGrid[i][j] === "hit") {
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

  // decrease tracking around a sunk ship
  if (shotResult === "hit") {
    // Horizontal check

    // Check left
    let i = row;
    let j = col - 1;
    while(j >= 0 && enemyBattleGrid[i][j] === "hit") {
      j--;
    }
    if(j >= 0 && enemyBattleGrid[i][j] === null) {
      j++;
      while(j < enemyBattleGrid[i].length && enemyBattleGrid[i][j] === "hit") {
        currentHeatMap[i][j].tracking--;
        j++;
      }
    }

    // Check right
    i = row;
    j = col + 1;
    while(j < enemyBattleGrid[i].length && enemyBattleGrid[i][j] === "hit") {
      j++;
    }
    if(j < enemyBattleGrid[i].length && enemyBattleGrid[i][j] === null) {
      j--;
      while(j >= 0 && enemyBattleGrid[i][j] === "hit") {
        currentHeatMap[i][j].tracking--;
        j--;
      }
    }

    // Vertical check

    // Check up
    i = row - 1;
    j = col;
    while(i >= 0 && enemyBattleGrid[i][j] === "hit") {
      i--;
    }
    if(i >= 0 && enemyBattleGrid[i][j] === null) {
      i++;
      while(i < enemyBattleGrid.length && enemyBattleGrid[i][j] === "hit") {
        currentHeatMap[i][j].tracking--;
        i++;
      }
    }

    // Check down
    i = row + 1;
    j = col;
    while(i < enemyBattleGrid.length && enemyBattleGrid[i][j] === "hit") {
      i++;
    }
    if(i < enemyBattleGrid.length && enemyBattleGrid[i][j] === null) {
      i--;
      while(i >= 0 && enemyBattleGrid[i][j] === "hit") {
        currentHeatMap[i][j].tracking--;
        i--;
      }
    }
  }

  // Update current heat map

  for(let i = 0; i < enemyBattleGrid.length; i++) {
    for(let j = 0; j < enemyBattleGrid[i].length; j++) {
      currentHeatMap[i][j].base = baseGrid[i][j];
      currentHeatMap[i][j].tracking = trackingGrid[i][j];
    }
  }

  return currentHeatMap;
};

// function to get the base probability
const getBaseProbability = (playerShipGrid, remainingShips) => {
  const baseGrid = Array(playerShipGrid.length).fill().map(() => Array(playerShipGrid[0].length).fill(0));

  remainingShips.forEach(ship => {
    const shipSize = originalShipSizes[ship];

    // Horizontal check
    for(let i = 0; i < playerShipGrid.length; i++) {
      for(let j = 0; j <= playerShipGrid[i].length - shipSize; j++) {
        let potentialSpot = true;
        for(let k = 0; k < shipSize; k++) {
          if(playerShipGrid[i][j+k] === "miss") {
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

    // Vertical check
    for(let i = 0; i <= playerShipGrid.length - shipSize; i++) {
      for(let j = 0; j < playerShipGrid[0].length; j++) {
        let potentialSpot = true;
        for(let k = 0; k < shipSize; k++) {
          if(playerShipGrid[i+k][j] === "miss") {
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
  const trackingGrid = Array(enemyBattleGrid.length).fill().map(() => Array(enemyBattleGrid[0].length).fill(0));

  if (!baseGrid) return trackingGrid;

  const remainingShipLengths = JSON.parse(JSON.stringify(originalShipSizes));
  playerShipGrid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell !== null && enemyBattleGrid[i][j] === "hit") {
        remainingShipLengths[cell]--;
      }
    });
  });
  const sunkShips = Object.keys(remainingShipLengths).filter(ship => remainingShipLengths[ship] === 0);
  
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // Right, Down, Left, Up
  const horizontal = [[0, 1], [0, -1]];
  const vertical = [[1, 0], [-1, 0]];

  for(let i = 0; i < enemyBattleGrid.length; i++) {
    for(let j = 0; j < enemyBattleGrid[i].length; j++) {
      if(enemyBattleGrid[i][j] === 'hit') {
        const shipName = playerShipGrid[i][j];
        if(sunkShips.find((val) => val === shipName)) {
          directions.forEach(([dx, dy]) => {
            // set the tracking modifier to 0 for all cells around the sunk ship
            const x = i + dx, y = j + dy;
            if(x >= 0 && y >= 0 && x < enemyBattleGrid.length && y < enemyBattleGrid[0].length) {
              trackingGrid[x][y] = 0;
            }
          });

          trackingGrid[i][j] = 0;
          continue;
        }

        let horizontalHit = false;
        let verticalHit = false;
        let adjacentHits = [];
        directions.forEach(([dx, dy]) => {
          const x = i + dx, y = j + dy;
          if(x >= 0 && y >= 0 && x < enemyBattleGrid.length && y < enemyBattleGrid[0].length) {
            if(enemyBattleGrid[x][y] === "hit") {
              adjacentHits.push([dx, dy]); // This direction has a hit
              horizontalHit = horizontalHit || horizontal.includes([dx, dy]);
              verticalHit = verticalHit || vertical.includes([dx, dy]);
            } else if(enemyBattleGrid[x][y] === null) {
              trackingGrid[x][y] += 10; // Increase the modifier around the 'hit' cell
            }
          }
        });
        
        // If there are adjacent hits, increase the modifier in those directions
        if(adjacentHits.length > 0) {
          adjacentHits.forEach(([dx, dy]) => {
            let x = i + dx
            let y = j + dy;
            while(x >= 0 && y >= 0 && x < enemyBattleGrid.length && y < enemyBattleGrid[0].length && enemyBattleGrid[x][y] === null) {
              // Increase the modifier in the direction of hits
              if(horizontalHit && horizontal.includes([dx, dy]) || verticalHit && vertical.includes([dx, dy])){
                trackingGrid[x][y] += 20;
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

export default makeSmarterShot;
