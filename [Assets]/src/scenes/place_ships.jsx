import React from "react";
import propTypes from "prop-types";
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import RotateRightIcon from '@mui/icons-material/RotateRight';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MenuIcon from '@mui/icons-material/Menu';
import HelpIcon from '@mui/icons-material/Help';
import CloseIcon from '@mui/icons-material/Close';

import DropdownSelect from "../components/general/dropdown_select";
import PlaceShipGrid from "../modules/place_ship_grid";

import createGrid from "../utils/create_grid";
import {shipNames} from "../utils/ship_details";
import useNewGridColors from "../utils/hooks/use_new_grid_colors";

const PlaceShips = (props) => {
  const [selectedShip, setSelectedShip] = React.useState('carrier');
  const [shipOrientation, setShipOrientation] = React.useState('horizontal');
  const [selectedSquare, setSelectedSquare] = React.useState(null);
  const [openHelp, setOpenHelp] = React.useState(false);

  const settings = props.settings;
  const gameState = props.gameState;
  const setGameState = props.setGameState;
  const playerShipGrid = props.playerShipGrid;
  const setPlayerShipGrid = props.setPlayerShipGrid;
  const setSelectedDifficulty = props.setSelectedDifficulty;

  useNewGridColors(settings);

  const handleClearBoard = () => {
    setPlayerShipGrid(createGrid(settings.gridSize));
    setSelectedSquare(null);
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

  const handleOpenHelp = () => {
    setOpenHelp(true);
  };

  const handleCloseHelp = () => {
    setOpenHelp(false);
  };

  return (
    <>
      <Grid container direction="row">
        <Grid item xs={12}>
          <PlaceShipGrid
            playerShipGrid={playerShipGrid}
            setPlayerShipGrid={setPlayerShipGrid}
            selectedSquare={selectedSquare}
            setSelectedSquare={setSelectedSquare}
            shipOrientation={shipOrientation}
            selectedShip={selectedShip}
            setSelectedShip={setSelectedShip}
            gameState={gameState}
            setGameState={setGameState}
          />
        </Grid>

        <Grid item xs={4} container justifyContent="center" alignItems="center">
          <DropdownSelect
            value={selectedShip}
            setValue={setSelectedShip}
            label="Ship"
            helperText="Select a ship to place"
            values={shipNames}
          />
        </Grid>
        <Grid item xs={4} container justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            startIcon={<RotateRightIcon />}
            onClick={() => setShipOrientation(shipOrientation === "horizontal" ? "vertical" : "horizontal")}
          >
            {shipOrientation}
          </Button>
        </Grid>
        <Grid item xs={4} container justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            color='error'
            onClick={handleClearBoard}
          >
            {"Clear Ships"}
          </Button>
        </Grid>
        <Grid item xs={4} container justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            startIcon={<MenuIcon />}
            color='primary'
            disabled={false}
            onClick={() => {
              setSelectedDifficulty(null);
            }}
          >
            {"Main Menu"}
          </Button>
        </Grid>
        <Grid item xs={4} container justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            startIcon={<HelpIcon />}
            onClick={handleOpenHelp}
          >
            {"Help"}
          </Button>
        </Grid>
        <Grid item xs={4} container justifyContent="center" alignItems="center">
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

      <Dialog open={openHelp} onClose={handleCloseHelp}>
        <DialogTitle>
          {"How to Play"}
          <Button onClick={handleCloseHelp} style={{float: 'right'}}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Select a ship from the dropdown menu, then choose its orientation. Click on the grid to place the ship. A ship can't be placed if it overlaps with another ship or goes outside the grid. Continue placing all ships until you're ready to play. Click on 'Ready?' to start the game when all ships are placed."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHelp}>
            {"Close"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

PlaceShips.propTypes = {
  gameState: propTypes.object.isRequired,
  setGameState: propTypes.func.isRequired,
  playerShipGrid: propTypes.array.isRequired,
  setPlayerShipGrid: propTypes.func.isRequired,
  settings: propTypes.object.isRequired,
  setSelectedDifficulty: propTypes.func.isRequired,
};

export default PlaceShips;
