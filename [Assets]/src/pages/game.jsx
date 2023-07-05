import React from 'react';

import { Grid, Button } from '@mui/material';

import createGrid from '../utils/create_grid';
import BattleGrid from '../scenes/game/battle_grid';
import GameLogDisplay from '../scenes/game/game_log_display';
import ShipGrid from '../scenes/game/ship_grid';
import PlaceShips from '../scenes/game/place_ships';

import { retrieveFromLocalStorage, storeInLocalStorage } from '../utils/local_storage_manager';
import { placeEnemyShips } from '../utils/ship_placement';
import { makeRandomShot } from '../utils/ai_logic/random';

const Game = (props) => {
  const setStats = props.setStats;

  // grid you click on to shoot and get hit/miss reports
  const [playerBattleGrid, setPlayerBattleGrid] = React.useState(retrieveFromLocalStorage('playerBattleGrid', createGrid(10)));
  const [enemyBattleGrid, setEnemyBattleGrid] = React.useState(retrieveFromLocalStorage('enemyBattleGrid', createGrid(10)));

  // grid you have your ships on and see where the enemy has hit/missed
  const [playerShipGrid, setPlayerShipGrid] = React.useState(retrieveFromLocalStorage('playerShipGrid', createGrid(10)));
  const [enemyShipGrid, setEnemyShipGrid] = React.useState(retrieveFromLocalStorage('enemyShipGrid', createGrid(10)));

  // game log of all the actions that have happened
  const [gameLog, setGameLog] = React.useState(retrieveFromLocalStorage('gameLog', []));

  // game state
  const [gameState, setGameState] = React.useState(retrieveFromLocalStorage('gameState', {
    playerTurn: true,
    gameOver: false,
    winner: null,
    playerReadyToPlay: false,
    allPlayerShipsPlaced: false,
    playerShipsPlaced: {
      carrier: false,
      battleship: false,
      cruiser: false,
      submarine: false,
      destroyer: false
    },
  }));

  const handleForfeit = React.useCallback(() => {
    // clear local storage
    localStorage.clear();

    // refresh page
    window.location.reload();
  }, []);

  // place enemy ships randomly
  const placeEnemyShipsIfNeeded = React.useCallback(() => {
    if (gameState.allPlayerShipsPlaced && !gameState.playerReadyToPlay) {
      placeEnemyShips(createGrid(10), setEnemyShipGrid);
    }
  }, [gameState, setEnemyShipGrid]);

  // place enemy ships randomly
  React.useEffect(placeEnemyShipsIfNeeded, [gameState]);

  // Save state to local storage whenever state changes
  React.useEffect(() => {
    storeInLocalStorage('playerBattleGrid', playerBattleGrid);
    storeInLocalStorage('enemyBattleGrid', enemyBattleGrid);
    storeInLocalStorage('playerShipGrid', playerShipGrid);
    storeInLocalStorage('enemyShipGrid', enemyShipGrid);
    storeInLocalStorage('gameLog', gameLog);
    storeInLocalStorage('gameState', gameState);
  }, [playerBattleGrid, enemyBattleGrid, playerShipGrid, enemyShipGrid, gameLog, gameState]);

  // Note: add an reset game option
  console.log(gameState)

  if (gameState.allPlayerShipsPlaced && gameState.playerReadyToPlay) {
    if (gameState.playerTurn) {
      return (
        <>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={6}>
              <ShipGrid
                playerShipGrid={playerShipGrid}
                enemyBattleGrid={enemyBattleGrid}
              />
            </Grid>
            <Grid item xs={6}>
              <BattleGrid
                gameState={gameState}
                setGameState={setGameState}
                playerBattleGrid={playerBattleGrid}
                setPlayerBattleGrid={setPlayerBattleGrid}
                enemyShipGrid={enemyShipGrid}
                setGameLog={setGameLog}
                gameLog={gameLog}
              />
            </Grid>
            <Grid item xs={6}>
              <GameLogDisplay
                gameLog={gameLog}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                color='error'
                variant='contained'
                onClick={handleForfeit}
              >
                Forfeit
              </Button>
            </Grid>
          </Grid>
        </>
      );
    } else {
      // INSERT AI LOGIC... SHOULD FAKE THINK. make a shot. flip the playerTurn bool
      // then wait a bit and then flip it back
      // RANDOM SHOT FOR NOW

      // More interesting AI logic => have it call a passed in shooting-logic function based on the settings
      makeRandomShot(enemyBattleGrid, playerBattleGrid, playerShipGrid, setGameState, gameState);
    }
  } else {
    return (
      <PlaceShips
        gameState={gameState}
        playerShipGrid={playerShipGrid}
        setPlayerShipGrid={setPlayerShipGrid}
        setGameState={setGameState}
      />
    );
  }
};

export default Game;