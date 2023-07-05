import { shipNames, shipLengths } from "./ship_details";

const placeEnemyShips = (grid, setGrid) => {
    let newGrid = [...grid];

    shipNames.forEach(ship => {
      let placed = false;

      while (!placed) {
        const orientation = Math.random() > 0.5 ? "horizontal" : "vertical";
        const direction = Math.random() > 0.5 ? 1 : -1;
        const shipLength = shipLengths[ship];

        let startRow = Math.floor(Math.random() * newGrid.length);
        let startCol = Math.floor(Math.random() * newGrid[0].length);

        if (orientation === "horizontal") {
          if (direction === 1 && startCol + shipLength <= newGrid[0].length) {
            let canPlace = true;
            for (let i = 0; i < shipLength; i++) {
              if (newGrid[startRow][startCol + i] !== null) {
                canPlace = false;
                break;
              }
            }
            if (canPlace) {
              for (let i = 0; i < shipLength; i++) {
                newGrid[startRow][startCol + i] = ship;
              }
              placed = true;
            }
          } else if (direction === -1 && startCol - shipLength >= -1) {
            let canPlace = true;
            for (let i = 0; i < shipLength; i++) {
              if (newGrid[startRow][startCol - i] !== null) {
                canPlace = false;
                break;
              }
            }
            if (canPlace) {
              for (let i = 0; i < shipLength; i++) {
                newGrid[startRow][startCol - i] = ship;
              }
              placed = true;
            }
          }
        } else {
          if (direction === 1 && startRow + shipLength <= newGrid.length) {
            let canPlace = true;
            for (let i = 0; i < shipLength; i++) {
              if (newGrid[startRow + i][startCol] !== null) {
                canPlace = false;
                break;
              }
            }
            if (canPlace) {
              for (let i = 0; i < shipLength; i++) {
                newGrid[startRow + i][startCol] = ship;
              }
              placed = true;
            }
          } else if (direction === -1 && startRow - shipLength >= -1) {
            let canPlace = true;
            for (let i = 0; i < shipLength; i++) {
              if (newGrid[startRow - i][startCol] !== null) {
                canPlace = false;
                break;
              }
            }
            if (canPlace) {
              for (let i = 0; i < shipLength; i++) {
                newGrid[startRow - i][startCol] = ship;
              }
              placed = true;
            }
          }
        }
      }
    });

    setGrid(newGrid);
  };
  
export { placeEnemyShips };