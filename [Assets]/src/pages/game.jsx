import React from 'react';

import { Grid, Button } from '@mui/material';

import createGrid from '../utils/create_grid';
import BattleGrid from '../scenes/game/battle_grid';
import GameLogDisplay from '../scenes/game/game_log_display';
import ShipGrid from '../scenes/game/ship_grid';
import PlaceShips from '../scenes/game/place_ships';

import { useLocalStorage } from '../utils/hooks/use_local_storage';
import { placeEnemyShips } from '../utils/ship_placement';
import { makeRandomShot } from '../utils/ai_logic/random';
import { INITIAL_GAME_STATE } from '../utils/constants';

const Game = (props) => {
  const setStats = props.setStats;

  const [playerBattleGrid, setPlayerBattleGrid] = useLocalStorage('playerBattleGrid', createGrid(10));
  const [enemyBattleGrid, setEnemyBattleGrid] = useLocalStorage('enemyBattleGrid', createGrid(10));
  const [playerShipGrid, setPlayerShipGrid] = useLocalStorage('playerShipGrid', createGrid(10));
  const [enemyShipGrid, setEnemyShipGrid] = useLocalStorage('enemyShipGrid', createGrid(10));
  const [gameLog, setGameLog] = useLocalStorage('gameLog', []);
  const [gameState, setGameState] = useLocalStorage('gameState', INITIAL_GAME_STATE);

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
      makeRandomShot(enemyBattleGrid, setEnemyBattleGrid, playerBattleGrid, playerShipGrid, setGameState, gameState);
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