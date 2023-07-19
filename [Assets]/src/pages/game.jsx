import React from 'react';
import propTypes from 'prop-types';

import { Grid, Button } from '@mui/material';

import createGrid from '../utils/create_grid';
import PlaceShips from '../scenes/place_ships';

import { BattleGrid, GameLogDisplay, ShipGrid } from '../modules';

// Hooks
import { useLocalStorage } from '../utils/hooks/use_local_storage';
import { useSoundEffect } from '../utils/hooks/use_sound_effect';

// AI Logic options
import { makeRandomShot, makeSmartShot, makeSmarterShot } from '../utils/ai_logic/index';

import Heatmap from '../utils/ai_logic/heat_map_debug';

import { placeEnemyShips } from '../utils/ship_placement';
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
  const settings = props.settings;

  const currentHeatMap = props.currentHeatMap;

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={6}>
        <ShipGrid
          playerShipGrid={playerShipGrid}
          enemyBattleGrid={enemyBattleGrid}
          settings={settings}
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
          settings={settings}
        />
      </Grid>
      <Grid item xs={2}>
        <GameLogDisplay
          gameLog={gameLog}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          color='error'
          variant='contained'
          onClick={handleForfeit}
        >
          Forfeit
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant='contained'
          href="/"
        >
          Menu
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant='contained'
          href="/help"
        >
          Help
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Heatmap currentHeatMap={currentHeatMap} />
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
  const setSelectedTrack = props.setSelectedTrack;

  const [playerBattleGrid, setPlayerBattleGrid] = useLocalStorage('playerBattleGrid', createGrid(settings.gridSize));
  const [enemyBattleGrid, setEnemyBattleGrid] = useLocalStorage('enemyBattleGrid', createGrid(settings.gridSize));
  const [playerShipGrid, setPlayerShipGrid] = useLocalStorage('playerShipGrid', createGrid(settings.gridSize));
  const [enemyShipGrid, setEnemyShipGrid] = useLocalStorage('enemyShipGrid', createGrid(settings.gridSize));
  const [gameLog, setGameLog] = useLocalStorage('gameLog', []);
  const [gameState, setGameState] = useLocalStorage('gameState', INITIAL_GAME_STATE);

  const [currentHeatMap, setCurrentHeatMap] = React.useState([]);

  const playHitSoundEffect = useSoundEffect('/sound/Hit.mp3');
  const playMissSoundEffect = useSoundEffect('/sound/Miss.mp3');

  React.useEffect(() => {
    setSelectedTrack(1);  // Play the first track when the game starts
  }, []);

  const handleForfeit = React.useCallback(() => {
    // remove specific local storage items
    localStorage.removeItem('playerBattleGrid');
    localStorage.removeItem('enemyBattleGrid');
    localStorage.removeItem('playerShipGrid');
    localStorage.removeItem('enemyShipGrid');
    localStorage.removeItem('gameLog');
    localStorage.removeItem('gameState');
    localStorage.removeItem('hunt_and_seek_state');

    // refresh page
    window.location.reload();
  }, []);

  // place enemy ships randomly
  const placeEnemyShipsIfNeeded = React.useCallback(() => {
    if (gameState.allPlayerShipsPlaced && !gameState.playerReadyToPlay) {
      placeEnemyShips(createGrid(settings.gridSize), setEnemyShipGrid);
    }
  }, [gameState, setEnemyShipGrid, settings.gridSize]);

  // place enemy ships randomly
  React.useEffect(placeEnemyShipsIfNeeded, [gameState, placeEnemyShipsIfNeeded]);

  // AI Logic, triggered when it's the AI's turn
  React.useEffect(() => {
    let timeoutId = null;

    if (!gameState.playerTurn) {
      timeoutId = setTimeout(() => {
        const shotResult = makeSmartShot(enemyBattleGrid, setEnemyBattleGrid, playerShipGrid, setCurrentHeatMap);
        (shotResult === 'hit') ? playHitSoundEffect() : playMissSoundEffect();
        setGameLog([...gameLog, shotResult]);
        setGameState((prevState)=> ({...prevState, playerTurn: true}));
      }, 1000);
    }

    return () => {
      // Cleanup function: if the component is unmounted before the delay, the timeout is cleared
      clearTimeout(timeoutId);
    }
  }, [gameState, enemyBattleGrid, setEnemyBattleGrid, playerShipGrid, setGameState]);

  if (!gameState.allPlayerShipsPlaced || !gameState.playerReadyToPlay) {
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
        enemyShipGrid={enemyShipGrid}
        setEnemyShipGrid={setEnemyShipGrid}
        gameLog={gameLog}
        setGameLog={setGameLog}
        handleForfeit={handleForfeit}
        settings={settings}

        currentHeatMap={currentHeatMap}
      />
    </>
  );
};

Game.propTypes = {
  setStats: propTypes.func.isRequired,
};

export default Game;