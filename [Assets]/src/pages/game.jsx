import React from 'react';
import propTypes from 'prop-types';

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

const GameContent = (props) => {
  const playerBattleGrid = props.playerBattleGrid;
  const setPlayerBattleGrid = props.setPlayerBattleGrid;
  const enemyShipGrid = props.enemyShipGrid;
  const setGameLog = props.setGameLog;
  const gameLog = props.gameLog;
  const gameState = props.gameState;
  const setGameState = props.setGameState;
  const playerShipGrid = props.playerShipGrid;
  const enemyBattleGrid = props.enemyBattleGrid;
  const handleForfeit = props.handleForfeit;

  return (
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
  );
}

GameContent.propTypes = {
  playerShipGrid: propTypes.array.isRequired,
  enemyBattleGrid: propTypes.array.isRequired,
  gameState: propTypes.object.isRequired,
  setGameState: propTypes.func.isRequired,
  playerBattleGrid: propTypes.array.isRequired,
  setPlayerBattleGrid: propTypes.func.isRequired,
  enemyShipGrid: propTypes.array.isRequired,
  setGameLog: propTypes.func.isRequired,
  gameLog: propTypes.array.isRequired,
  handleForfeit: propTypes.func.isRequired,
};

const Game = (props) => {
  const setStats = props.setStats;
  const settings = props.settings;

  const [playerBattleGrid, setPlayerBattleGrid] = useLocalStorage('playerBattleGrid', createGrid(settings.gridSize));
  const [enemyBattleGrid, setEnemyBattleGrid] = useLocalStorage('enemyBattleGrid', createGrid(settings.gridSize));
  const [playerShipGrid, setPlayerShipGrid] = useLocalStorage('playerShipGrid', createGrid(settings.gridSize));
  const [enemyShipGrid, setEnemyShipGrid] = useLocalStorage('enemyShipGrid', createGrid(settings.gridSize));
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
      placeEnemyShips(createGrid(settings.gridSize), setEnemyShipGrid);
    }
  }, [gameState, setEnemyShipGrid]);

  // place enemy ships randomly
  React.useEffect(placeEnemyShipsIfNeeded, [gameState]);

  // AI Logic, triggered when it's the AI's turn
  React.useEffect(() => {
    let timeoutId;
    let thinkingTimeoutId;
    if (!gameState.playerTurn) {

      // AI is thinking
      timeoutId = setTimeout(() => {
        // AI makes a shot

        makeRandomShot(enemyBattleGrid, setEnemyBattleGrid, playerShipGrid);
        setGameState({...gameState, playerTurn: true});
      }, 500);
    }

    return () => {
      // Cleanup function: if the component is unmounted before the delay, the timeout is cleared
      clearTimeout(timeoutId);
      clearTimeout(thinkingTimeoutId);
    }
  }, [gameState.playerTurn]);

  if (gameState.allPlayerShipsPlaced && gameState.playerReadyToPlay) {
    return (
      <>
        <GameContent
          gameState={gameState}
          setGameState={setGameState}
          playerBattleGrid={playerBattleGrid}
          setPlayerBattleGrid={setPlayerBattleGrid}
          enemyBattleGrid={enemyBattleGrid}
          setEnemyBattleGrid={setEnemyBattleGrid}
          playerShipGrid={playerShipGrid}
          setPlayerShipGrid={setPlayerShipGrid}
          enemyShipGrid={enemyShipGrid}
          setEnemyShipGrid={setEnemyShipGrid}
          gameLog={gameLog}
          setGameLog={setGameLog}
          handleForfeit={handleForfeit}
        />
      </>
    );
  } else {
    return (
      <PlaceShips
        settings={settings}
        gameState={gameState}
        playerShipGrid={playerShipGrid}
        setPlayerShipGrid={setPlayerShipGrid}
        setGameState={setGameState}
      />
    );
  }
};

Game.propTypes = {
  setStats: propTypes.func.isRequired,
};

export default Game;