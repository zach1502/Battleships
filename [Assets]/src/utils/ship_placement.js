import { shipNames, shipLengths } from './ship_details';
import { DIRECTIONS } from '../utils/constants';

const getInitialPosition = (grid) => {
  return {
    startRow: Math.floor(Math.random() * grid.length),
    startCol: Math.floor(Math.random() * grid[0].length),
  }
}

const canPlaceShip = (grid, shipLength, orientation, direction, startRow, startCol) => {
  for(let i = 0; i < shipLength; i++) {
    const row = orientation === DIRECTIONS.HORIZONTAL ? startRow : startRow + direction * i;
    const col = orientation === DIRECTIONS.HORIZONTAL ? startCol + direction * i : startCol;
    if(row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || grid[row][col] !== null) {
      return false;
    }
  }
  return true;
}

const updateGridWithShip = (grid, ship, shipLength, orientation, direction, startRow, startCol) => {
  for(let i = 0; i < shipLength; i++) {
    const row = orientation === DIRECTIONS.HORIZONTAL ? startRow : startRow + direction * i;
    const col = orientation === DIRECTIONS.HORIZONTAL ? startCol + direction * i : startCol;
    grid[row][col] = ship;
  }
}

const placeEnemyShips = (grid, setGrid) => {
  let newGrid = [...grid];

  shipNames.forEach((ship) => {
    const shipLength = shipLengths[ship];
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 1000) {
      const orientation = Math.random() > 0.5 ? DIRECTIONS.HORIZONTAL : DIRECTIONS.VERTICAL;
      const direction = Math.random() > 0.5 ? 1 : -1;
      const { startRow, startCol } = getInitialPosition(newGrid);
      
      if (canPlaceShip(newGrid, shipLength, orientation, direction, startRow, startCol)) {
        updateGridWithShip(newGrid, ship, shipLength, orientation, direction, startRow, startCol);
        placed = true;
      }

      attempts++;
    }

    if (attempts >= 1000) {
      throw new Error('Couldn\'t place all the ships after 1000 attempts.');
    }
  });

  setGrid(newGrid);
};

export { placeEnemyShips };
