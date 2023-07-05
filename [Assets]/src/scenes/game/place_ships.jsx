import React from "react";
import propTypes from "prop-types";

import { Grid, Button, Box, Typography } from "@mui/material";
import RotateRightIcon from '@mui/icons-material/RotateRight';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import DropdownSelect from "../../components/general/dropdown_select";
import SelectionGrid from "../../components/game/selection_grid";

import createGrid from "../../utils/create_grid";
import { shipLengths, shipNames } from "../../utils/ship_details";
import { shipPlacingLegend } from "../../utils/grid_legends";

const PlaceShips = (props) => {
  const [selectedShip, setSelectedShip] = React.useState('carrier');
  const [shipOrientation, setShipOrientation] = React.useState('horizontal');
  const [selectedSquare, setSelectedSquare] = React.useState(null); // [row, col]

  const gameState = props.gameState;
  const setGameState = props.setGameState;
  const playerShipGrid = props.playerShipGrid;
  const setPlayerShipGrid = props.setPlayerShipGrid;

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

  // Clear board handler
  const handleClearBoard = () => {
    setPlayerShipGrid(createGrid(10));
    setSelectedSquare(null);
    
    // Reset playerShipsPlaced in game state
    setGameState(prevState => ({
      ...prevState,
      playerShipsPlaced: {
        carrier: false,
        battleship: false,
        cruiser: false,
        submarine: false,
        destroyer: false
      },
      allPlayerShipsPlaced: false,
    }));
  };

  return (
    <>
      <Grid 
        container 
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <SelectionGrid
            grid={playerShipGrid}
            onClick={(row, col)=>{
              // try placing the ship up/right
              if (canPlaceShip(row, col, selectedShip, shipOrientation, 1)) {
                placeShip(row, col, selectedShip, shipOrientation, 1);
                setSelectedSquare([row, col]);
              // try place the ship down/left
              } else if (canPlaceShip(row, col, selectedShip, shipOrientation, -1)) {
                placeShip(row, col, selectedShip, shipOrientation, -1);
                setSelectedSquare([row, col]);
              }

              // add error message later
              console.log("can not place ship");
            }}
            selectedSquare={selectedSquare}
            setSelectedSquare={setSelectedSquare}
            legend={shipPlacingLegend}
            squareSize={3}
            squareSpacing={0.5}
          />
        </Grid>

        <Grid item xs={3}>
          <DropdownSelect
            value={selectedShip}
            setValue={setSelectedShip}
            label="Ship"
            helperText="Select a ship to place"
            values={shipNames}
          />
        </Grid>
        <Grid item xs={3}>
            <Button
              variant="contained"
              startIcon={<RotateRightIcon />}
              onClick={() => setShipOrientation(shipOrientation === "horizontal" ? "vertical" : "horizontal")}
            >
              {shipOrientation}
            </Button>
        </Grid>
        <Grid item xs={3}>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={handleClearBoard}
            >
              {"Clear Ships"}
            </Button>
        </Grid>
        <Grid item xs={3}>
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              color='success'
              disabled={!gameState.allPlayerShipsPlaced}
              onClick={() => {
                setGameState(prevState => ({
                  ...prevState,
                  playerReadyToPlay: true,
                }));
              }}
            >
              {"Ready?"}
            </Button>
        </Grid>
      </Grid>
    </>
  )
};

PlaceShips.propTypes = {
  gameState: propTypes.object.isRequired,
  setGameState: propTypes.func.isRequired,
  playerShipGrid: propTypes.array.isRequired,
  setPlayerShipGrid: propTypes.func.isRequired,
};

export default PlaceShips;