import React from "react";
import propTypes from "prop-types";
import { Grid, Button} from "@mui/material";
import RotateRightIcon from '@mui/icons-material/RotateRight';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MenuIcon from '@mui/icons-material/Menu';
import HelpIcon from '@mui/icons-material/Help';

import {PlaceShipGrid} from "../modules/";
import {DialogBox, DropdownSelect} from "../components/";

import createGrid from "../utils/create_grid";
import {shipNames} from "../utils/ship_details";
import {useNewGridColors} from "../utils/hooks/";

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
          <DialogBox
            open={openHelp}
            handleClose={handleCloseHelp}
            titleContentPairs={[
              {
                title: "Select A Ship",
                content: `Use the 'Ship' dropdown to select the type of ship you want to place on the grid. The ships are the same as the original 1990 version of the game.`,
              },
              {
                title: "Rotate Ship",
                content: `Use the 'Rotate' button to change the orientation of the ship. The default orientation is horizontal.`,
              },
              {
                title: "Select A Square",
                content: `Click on a square in the grid where you want to place the selected ship. The ship will take up a number of squares extending from the selected square in the chosen orientation. \n\nIf a ship is already placed and you click on a square, it will attempt to move the ship to that square.`
              },
              {
                title: "Place Ship",
                content: `If the ship fits in the chosen location without overlapping another ship or going outside the grid, it will appear on the grid. If it doesn't fit, try selecting a different square or changing the ship's orientation.`
              },
              {
                title: "Clear Placement",
                content: `If you want to clear the placement of your ships, click the 'Clear Ships' button to remove all ships from the grid and start over.`
              },
              {
                title: "Ready To Play?",
                content: `Once you are satisfied with the placement of all your ships, click the 'Ready?' button to start the game.`,
              },
            ]}
            buttonText={"Close"} 
          />
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
