import React from 'react';
import propTypes from 'prop-types';

import createGrid from '../utils/create_grid';

import PlaceShips from '../scenes/place_ships';
import PickDifficulty from '../scenes/pick_difficulty';
import GameContent from '../scenes/game_content';
import WinScreen from '../scenes/win_screen';
import GameLoading from '../scenes/game_loading';

// Hooks
import { useLocalStorage, useSoundEffect } from '../utils/hooks/';

// AI Logic options
import { makeRandomShot, makeHuntAndSeekShot, makeHeatMapShot, makeBestShot } from '../utils/ai_logic/index';

import { achievementsCheck } from '../utils/achievements_checks';
import { placeEnemyShips } from '../utils/ship_placement';
import { INITIAL_GAME_STATE, SHOT_RESULT_MESSAGES } from '../utils/constants';

const AI_LOGIC_OPTIONS = {
  'easy': makeRandomShot,
  'medium': makeHuntAndSeekShot,
  'hard': makeHeatMapShot,
  'impossible': makeBestShot,
};

const Game = (props) => {
  const setStats = props.setStats;
  const settings = props.settings;
  const setSelectedTrack = props.setSelectedTrack;
  const enableAnimation = props.enableAnimation;

  const [playerBattleGrid, setPlayerBattleGrid] = useLocalStorage('playerBattleGrid', createGrid(settings.gridSize), true);
  const [enemyBattleGrid, setEnemyBattleGrid] = useLocalStorage('enemyBattleGrid', createGrid(settings.gridSize), true);
  const [playerShipGrid, setPlayerShipGrid] = useLocalStorage('playerShipGrid', createGrid(settings.gridSize), true);
  const [enemyShipGrid, setEnemyShipGrid] = useLocalStorage('enemyShipGrid', createGrid(settings.gridSize), true);
  const [gameLog, setGameLog] = useLocalStorage('gameLog', [], true);
  const [gameState, setGameState] = useLocalStorage('gameState', INITIAL_GAME_STATE, true);
  const [selectedDifficulty, setSelectedDifficulty] = useLocalStorage('selectedDifficulty', null);
  const [statsUpdated, setStatsUpdated] = useLocalStorage('statsUpdated', false);

  const [currentHeatMap, setCurrentHeatMap] = React.useState([]);

  const playHitSoundEffect = useSoundEffect('/sound/Hit.mp3', settings);
  const playMissSoundEffect = useSoundEffect('/sound/Miss.mp3', settings);
  const SHOT_RESULT_SOUNDS = React.useMemo(() => ({
    'hit': playHitSoundEffect,
    'miss': playMissSoundEffect,
  }), [playHitSoundEffect, playMissSoundEffect]);

  // Play music
  React.useEffect(() => {
    setSelectedTrack(1);
  }, [setSelectedTrack]);

  // place enemy ships randomly
  const placeEnemyShipsIfNeeded = React.useCallback(() => {
    if (gameState.allPlayerShipsPlaced && !gameState.playerReadyToPlay) {
      placeEnemyShips(createGrid(settings.gridSize), setEnemyShipGrid);
    }
  }, [gameState, setEnemyShipGrid, settings.gridSize]);
  React.useEffect(placeEnemyShipsIfNeeded, [gameState, placeEnemyShipsIfNeeded]);

  const convertXYToGridIndex = React.useCallback((y, x) => {
    const letter = String.fromCharCode(65 + x);
    const number = y + 1;

    return `${letter}${number}`;
  }, []);

  // Game end condition
  React.useEffect(() => {
    const MAX_HITS = 17;
    const enemyHitCount = enemyBattleGrid.flat().filter((shot) => shot === 'hit').length;
    const playerHitCount = playerBattleGrid.flat().filter((shot) => shot === 'hit').length;

    if (!statsUpdated && (playerHitCount === MAX_HITS || enemyHitCount === MAX_HITS)) {
      const objOfAchievementsUpdates = achievementsCheck(enemyBattleGrid, playerBattleGrid, gameLog)
  
      const won = playerHitCount === MAX_HITS;
      setGameState((prevState) => ({ ...prevState, gameOver: true, playerWon: won }));
  
      setStats((prevState) => {
        let newState = { ...prevState };
        for (const [key, value] of Object.entries(objOfAchievementsUpdates)) {
          newState[key] = value || newState[key];
        }
  
        const resultKey = `${selectedDifficulty}${won ? 'Wins' : 'Losses'}`;
        newState[resultKey] = (newState[resultKey] || 0) + 1;
        newState[won ? 'wins' : 'losses'] = (newState[won ? 'wins' : 'losses'] || 0) + 1;
        newState.gamesPlayed = (newState.gamesPlayed || 0) + 1;
  
        return newState;
      });

      setStatsUpdated(true);
    }

  }, [enemyBattleGrid, playerShipGrid, statsUpdated, gameLog, setStats, setStatsUpdated, gameState, setGameState, selectedDifficulty, playerBattleGrid]);

  // AI Logic
  const executeAILogic = React.useCallback(() => {
    const shotLogic = AI_LOGIC_OPTIONS[selectedDifficulty];
    const { shotResult, row, col } = shotLogic(enemyBattleGrid, setEnemyBattleGrid, playerShipGrid, setCurrentHeatMap);
    SHOT_RESULT_SOUNDS[shotResult]();
    
    setGameLog((prevLog) => [
      ...prevLog, 
      `${SHOT_RESULT_MESSAGES[shotResult]} ${convertXYToGridIndex(row, col)}`
    ]);
    
    setGameState((prevState) => ({ ...prevState, playerTurn: true }));
  }, [selectedDifficulty, enemyBattleGrid, playerShipGrid, convertXYToGridIndex, setEnemyBattleGrid, setGameLog, setGameState, SHOT_RESULT_SOUNDS]);

  React.useEffect(() => {
    let timeoutId = null;
  
    if (!gameState.playerTurn) {
      timeoutId = setTimeout(executeAILogic, 1500);
    }

    return () => {
      clearTimeout(timeoutId);
    }
  }, [gameState.playerTurn, executeAILogic]);


  if (gameState.gameOver) {
    return (
      <WinScreen
        gameState={gameState}
      />
    )
  }

  if (!selectedDifficulty) {
    return (
      <PickDifficulty
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
        enableAnimation={enableAnimation}
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
        setSelectedDifficulty={setSelectedDifficulty}
      />
    );
  }

  if (!gameState.gameLoaded) {
    return (
      <GameLoading
        setGameState={setGameState}
        setStats={setStats}
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
        setStats={setStats}

        currentHeatMap={currentHeatMap}
      />
    </>
  );
};

Game.propTypes = {
  setStats: propTypes.func.isRequired,
};

export default Game;