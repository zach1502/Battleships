import React from 'react';
import propTypes from 'prop-types';

import createGrid from '../utils/create_grid';

import PlaceShips from '../scenes/place_ships';
import PickDifficulty from '../scenes/pick_difficulty';
import GameContent from '../scenes/game_content';

// Hooks
import { useLocalStorage } from '../utils/hooks/use_local_storage';
import { useSoundEffect } from '../utils/hooks/use_sound_effect';

// AI Logic options
import { makeRandomShot, makeSmartShot, makeSmarterShot } from '../utils/ai_logic/index';

import { placeEnemyShips } from '../utils/ship_placement';
import { INITIAL_GAME_STATE } from '../utils/constants';

const AI_LOGIC_OPTIONS = {
  'easy': makeRandomShot,
  'medium': makeSmartShot,
  'hard': makeSmarterShot,
  'impossible': makeSmarterShot, // TEMP: use the same logic as hard for now
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
  const [selectedDifficulty, setSelectedDifficulty] = useLocalStorage('selectedDifficulty', null);

  const [currentHeatMap, setCurrentHeatMap] = React.useState([]);

  const playHitSoundEffect = useSoundEffect('/sound/Hit.mp3');
  const playMissSoundEffect = useSoundEffect('/sound/Miss.mp3');

  React.useEffect(() => {
    setSelectedTrack(1);  // Play the first track when the game starts
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
        const shotLogic = AI_LOGIC_OPTIONS[selectedDifficulty];
        const shotResult = shotLogic(enemyBattleGrid, setEnemyBattleGrid, playerShipGrid, setCurrentHeatMap);
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

  if (!selectedDifficulty) {
    return (
      <PickDifficulty
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
      />
    )
  }

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