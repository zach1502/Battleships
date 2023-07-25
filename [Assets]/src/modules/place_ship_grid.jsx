import React from 'react'
import { SelectionGrid } from "../components/";
import { shipGridLegend } from "../utils/grid_legends";
import { shipLengths } from "../utils/ship_details";

const PlaceShipGrid = (props) => {
  const playerShipGrid = props.playerShipGrid;
  const selectedShip = props.selectedShip;
  const setSelectedShip = props.setSelectedShip;
  const shipOrientation = props.shipOrientation;
  const selectedSquare = props.selectedSquare;
  const setSelectedSquare = props.setSelectedSquare;
  const setPlayerShipGrid = props.setPlayerShipGrid;
  const gameState = props.gameState;
  const setGameState = props.setGameState;

  // These checks cn probably be refactored out into a separate file
  // Checks if the ship fits within the grid vertically
  const fitsVertically = (row, col, ship, direction) => {
    const shipLength = shipLengths[ship];
    if (direction === 1 && row + shipLength > playerShipGrid.length) return false;
    if (direction === -1 && row - shipLength < 0) return false;

    for (let i = 0; i < shipLength; i++) {
      if (playerShipGrid[row + (i * direction)][col] !== null) return false;
    }

    return true;
  };

  // Checks if the ship fits within the grid horizontally
  const fitsHorizontally = (row, col, ship, direction) => {
    const shipLength = shipLengths[ship];
    if (direction === 1 && col + shipLength > playerShipGrid[0].length) return false;
    if (direction === -1 && col - shipLength < 0) return false;

    for (let i = 0; i < shipLength; i++) {
      if (playerShipGrid[row][col + (i * direction)] !== null) return false;
    }

    return true;
  };

  // Function to check if a ship can be placed at a position
  const canPlaceShip = (row, col, ship, orientation, direction = 1) => {

    // Checks if the ship can be placed based on the orientation
    return orientation === "horizontal" ? fitsHorizontally(row, col, ship, direction) : fitsVertically(row, col, ship, direction);
  };

  // Function to get the next ship to be selected
  const getNextShip = (currentShip, placedShips) => {
    const shipOrder = ["carrier", "battleship", "cruiser", "submarine", "destroyer"];
    const currentIndex = shipOrder.indexOf(currentShip);

    for (let i = currentIndex + 1; i < shipOrder.length; i++) {
      if (!placedShips[shipOrder[i]]) {
        return shipOrder[i];
      }
    }

    // If all the next ships are placed, start again from the first ship
    for (let i = 0; i < currentIndex; i++) {
      if (!placedShips[shipOrder[i]]) {
        return shipOrder[i];
      }
    }

    // If all ships are placed, return the current ship
    return currentShip;
  };

  // Function to place a ship at a position
  const placeShip = (row, col, ship, orientation, direction = 1) => {
    const shipLength = shipLengths[ship];
    const newGrid = [...playerShipGrid]; // make a copy of the current grid

    if (orientation === "horizontal") {
      for (let i = 0; i < shipLength; i++) {
        newGrid[row][col + (i * direction)] = ship;
      }
    } else { // orientation is "vertical"
      for (let i = 0; i < shipLength; i++) {
        newGrid[row + (i * direction)][col] = ship;
      }
    }

    const newShipsPlaced = {
      ...gameState.playerShipsPlaced,
      [ship]: true,
    };

    const nextShip = getNextShip(ship, newShipsPlaced);
    setSelectedShip(nextShip);

    setPlayerShipGrid(newGrid);
    // Update game state
    setGameState(prevState => ({
      ...prevState,
      playerShipsPlaced: newShipsPlaced,
      allPlayerShipsPlaced: Object.values(newShipsPlaced).every(val => val)
    }));
  };

  // Function to remove a ship from the grid
  const removeShip = (ship) => {
    const shipPositions = [];

    // Remember the ship's positions
    playerShipGrid.forEach((row, i) => {
      row.forEach((value, j) => {
        if (value === ship) {
          shipPositions.push([i, j]);
        }
      });
    });

    // Remove the ship from the grid
    shipPositions.forEach(([i, j]) => {
      playerShipGrid[i][j] = null;
    });

    return shipPositions;
  };

  // Function to place the ship back to the grid
  const placeShipBack = (ship, shipPositions) => {
    shipPositions.forEach(([i, j]) => {
      playerShipGrid[i][j] = ship;
    });
  };

  // Function to handle onClick
  const handleOnClick = (row, col) => {
    let shipPositions = [];

    // If the ship is already placed
    if (gameState.playerShipsPlaced[selectedShip]) {
      console.log("Already placed this ship");
      shipPositions = removeShip(selectedShip);
    }

    // Try to place the ship in both directions
    const directions = [1, -1];
    const placed = directions.find(direction => {
      if (canPlaceShip(row, col, selectedShip, shipOrientation, direction)) {
        placeShip(row, col, selectedShip, shipOrientation, direction);
        setSelectedSquare(null);
        return true;
      }
    });

    // If the ship couldn't be placed, put it back
    if (!placed) {
      placeShipBack(selectedShip, shipPositions);
    }
  };

  return (
    <SelectionGrid
      grid={playerShipGrid}
      onClick={handleOnClick}
      selectedSquare={selectedSquare}
      setSelectedSquare={setSelectedSquare}
      legend={shipGridLegend}
      squareSize={3}
      squareSpacing={0.5}
    />
  );
}

export default PlaceShipGrid;