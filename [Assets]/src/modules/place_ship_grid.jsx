import React from 'react'
import { SelectionGrid } from "../components/";
import { shipGridLegend } from "../utils/grid_legends";
import { shipLengths} from "../utils/ship_details";

const PlaceShipGrid = (props) => {
  const playerShipGrid = props.playerShipGrid;
  const selectedShip = props.selectedShip;
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
    // If ship has already been placed, return false
    if (gameState.playerShipsPlaced[ship]) return false;
  
    // Checks if the ship can be placed based on the orientation
    return orientation === "horizontal" ? fitsHorizontally(row, col, ship, direction) : fitsVertically(row, col, ship, direction);
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

    setPlayerShipGrid(newGrid);
    // Update game state
    setGameState(prevState => ({
      ...prevState,
      playerShipsPlaced: newShipsPlaced,
      allPlayerShipsPlaced: Object.values(newShipsPlaced).every(val => val)
    }));
  };

  return (
    <SelectionGrid
      grid={playerShipGrid}
      onClick={(row, col)=>{
        // try placing the ship up/right
        if (canPlaceShip(row, col, selectedShip, shipOrientation, 1)) {
          placeShip(row, col, selectedShip, shipOrientation, 1);
          setSelectedSquare(null);
        // try place the ship down/left
        } else if (canPlaceShip(row, col, selectedShip, shipOrientation, -1)) {
          placeShip(row, col, selectedShip, shipOrientation, -1);
          setSelectedSquare(null);
        } else {
          console.log("Can't place ship here")
        }
      }}
      selectedSquare={selectedSquare}
      setSelectedSquare={setSelectedSquare}
      legend={shipGridLegend}
      squareSize={3}
      squareSpacing={0.5}
    />
  );
}

export default PlaceShipGrid;