import React from "react";
import propTypes from "prop-types";

import { Grid, Button } from "@mui/material";
import RotateRightIcon from '@mui/icons-material/RotateRight';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import DropdownSelect from "../components/general/dropdown_select";
import PlaceShipGrid from "../modules/place_ship_grid";

import createGrid from "../utils/create_grid";
import {shipNames } from "../utils/ship_details";
import useNewGridColors from "../utils/hooks/use_new_grid_colors";

const PlaceShips = (props) => {
  const [selectedShip, setSelectedShip] = React.useState('carrier');
  const [shipOrientation, setShipOrientation] = React.useState('horizontal');
  const [selectedSquare, setSelectedSquare] = React.useState(null); // [row, col]

  const settings = props.settings;
  const gameState = props.gameState;
  const setGameState = props.setGameState;
  const playerShipGrid = props.playerShipGrid;
  const setPlayerShipGrid = props.setPlayerShipGrid;

  useNewGridColors(settings);

  // Clear board handler
  const handleClearBoard = () => {
    setPlayerShipGrid(createGrid(settings.gridSize));
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
          <PlaceShipGrid
            playerShipGrid={playerShipGrid}
            setPlayerShipGrid={setPlayerShipGrid}
            selectedSquare={selectedSquare}
            setSelectedSquare={setSelectedSquare}
            shipOrientation={shipOrientation}
            selectedShip={selectedShip}
            gameState={gameState}
            setGameState={setGameState}
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
              color='error'
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