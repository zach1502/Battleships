import React from 'react';
import propTypes from 'prop-types';
import { Grid, Button } from '@mui/material';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MenuIcon from '@mui/icons-material/Menu';
import HelpIcon from '@mui/icons-material/Help';

import { PlaceShipGrid } from '../modules/';
import { GuideDialog, DropdownSelect } from '../components/';

import createGrid from '../utils/create_grid';
import { shipNames } from '../utils/ship_details';
import { useNewGridColors } from '../utils/hooks/';
import { SHIP_PLACING_HELP, DIRECTIONS } from '../utils/constants';

import { motion } from 'framer-motion';

const pulseAnimation = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

const PlaceShips = (props) => {
  const [selectedShip, setSelectedShip] = React.useState('carrier');
  const [shipOrientation, setShipOrientation] = React.useState(DIRECTIONS.HORIZONTAL);
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
      <Grid container direction='row'>
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

        <Grid item xs={4} container justifyContent='center' alignItems='center'>
          <DropdownSelect
            value={selectedShip}
            setValue={setSelectedShip}
            label='Ship'
            helperText='Select a ship to place'
            values={shipNames}
          />
        </Grid>
        <Grid item xs={4} container justifyContent='center' alignItems='center'>
          <Button
            variant='contained'
            startIcon={<RotateRightIcon />}
            onClick={() => setShipOrientation(shipOrientation === DIRECTIONS.HORIZONTAL ? DIRECTIONS.VERTICAL : DIRECTIONS.HORIZONTAL)}
          >
            {shipOrientation}
          </Button>
        </Grid>
        <Grid item xs={4} container justifyContent='center' alignItems='center'>
          <Button
            variant='contained'
            startIcon={<DeleteIcon />}
            color='error'
            onClick={handleClearBoard}
          >
            {'Clear Ships'}
          </Button>
        </Grid>
        <Grid item xs={4} container justifyContent='center' alignItems='center'>
          <Button
            variant='contained'
            startIcon={<MenuIcon />}
            color='primary'
            disabled={false}
            onClick={() => {
              setSelectedDifficulty(null);
            }}
          >
            {'Main Menu'}
          </Button>
        </Grid>
        <Grid item xs={4} container justifyContent='center' alignItems='center'>
          <Button
            variant='contained'
            startIcon={<HelpIcon />}
            onClick={handleOpenHelp}
          >
            {'Help'}
          </Button>
          <GuideDialog
            open={openHelp}
            handleClose={handleCloseHelp}
            titleContentPairs={SHIP_PLACING_HELP}
            buttonText={'Close'}
          />
        </Grid>
        <Grid item xs={4} container justifyContent='center' alignItems='center'>
          <motion.div
            initial={{ scale: 1, opacity: 1 }} // Initial state
            animate={gameState.allPlayerShipsPlaced ? pulseAnimation.animate : {}}  // If all ships are placed, apply the pulse animation, else don't
          >
            <Button
              variant='contained'
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
              {'Ready?'}
            </Button>
          </motion.div>
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
