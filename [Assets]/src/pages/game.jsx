import React from 'react';
import propTypes from 'prop-types';

import createGrid from '../utils/create_grid';

import PlaceShips from '../scenes/place_ships';
import PickDifficulty from '../scenes/pick_difficulty';
import GameContent from '../scenes/game_content';
import WinScreen from '../scenes/win_screen';
import GameLoading from '../scenes/game_loading';

// Hooks
import { useLocalStorage } from '../utils/hooks/use_local_storage';
import { useSoundEffect } from '../utils/hooks/use_sound_effect';

// AI Logic options
import { makeRandomShot, makeSmartShot, makeSmarterShot, makeCheatingShot } from '../utils/ai_logic/index';

import { achievementsCheck } from '../utils/achievements_checks';

import { placeEnemyShips } from '../utils/ship_placement';
import { INITIAL_GAME_STATE } from '../utils/constants';

const AI_LOGIC_OPTIONS = {
  'easy': makeRandomShot,
  'medium': makeSmartShot,
  'hard': makeSmarterShot,
  'impossible': makeCheatingShot,
};

const Game = (props) => {
  const setStats = props.setStats;
  const settings = props.settings;
  const setSelectedTrack = props.setSelectedTrack;

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

  React.useEffect(() => {
    setSelectedTrack(1);  // Play the first track when the game starts
  }, [setSelectedTrack]);

  // place enemy ships randomly
  const placeEnemyShipsIfNeeded = React.useCallback(() => {
    if (gameState.allPlayerShipsPlaced && !gameState.playerReadyToPlay) {
      placeEnemyShips(createGrid(settings.gridSize), setEnemyShipGrid);
    }
  }, [gameState, setEnemyShipGrid, settings.gridSize]);

  // place enemy ships randomly
  React.useEffect(placeEnemyShipsIfNeeded, [gameState, placeEnemyShipsIfNeeded]);

  const convertXYToGridIndex = React.useCallback((y, x) => {
    const letter = String.fromCharCode(65 + x);
    const number = y + 1;

    return `${letter}${number}`;
  }, []);

  // Game end condition
  React.useEffect(() => {
    const maxHits = 17;

    const enemyHitCount = enemyBattleGrid.flat().filter((shot) => shot === 'hit').length;
    const playerHitCount = playerBattleGrid.flat().filter((shot) => shot === 'hit').length;

    console.log(gameLog)

    if (!statsUpdated && (playerHitCount === maxHits || enemyHitCount === maxHits)) {

      // Check for achievements
      const {
        cantTouchThis,
        battleIsnt,
        areYouEvenTrying,
        stormtrooper,
        cantStopWontStop,
        hawkeye,
        iThoughtThisWasChess,
        patienceIsAVirtue,
      } = achievementsCheck(enemyBattleGrid, playerBattleGrid, gameLog)

      if (playerHitCount === maxHits) {
        setGameState((prevState) => ({ ...prevState, gameOver: true, playerWon: true }));
        setStats((prevState) => ({
          ...prevState,
          wins: prevState.wins + 1 || 1,
          gamesPlayed: prevState.gamesPlayed + 1 || 1,
          [`${selectedDifficulty}Wins`]: prevState[`${selectedDifficulty}Wins`] + 1 || 1,
          cantTouchThis: cantTouchThis || prevState.cantTouchThis,
          battleIsnt: battleIsnt || prevState.battleIsnt,
          areYouEvenTrying: areYouEvenTrying || prevState.areYouEvenTrying,
          stormtrooper: stormtrooper || prevState.stormtrooper,
          cantStopWontStop: cantStopWontStop || prevState.cantStopWontStop,
          hawkeye: hawkeye || prevState.hawkeye,
          iThoughtThisWasChess: iThoughtThisWasChess || prevState.iThoughtThisWasChess,
          patienceIsAVirtue: patienceIsAVirtue || prevState.patienceIsAVirtue,
        }));
      }

      if (enemyHitCount === maxHits) {
        setGameState((prevState) => ({ ...prevState, gameOver: true, playerWon: false }));
        setStats((prevState) => ({
          ...prevState,
          losses: prevState.losses + 1 || 1,
          gamesPlayed: prevState.gamesPlayed + 1 || 1,
          [`${selectedDifficulty}Losses`]: prevState[`${selectedDifficulty}Losses`] + 1 || 1,
          battleIsnt: battleIsnt || prevState.battleIsnt,
          areYouEvenTrying: areYouEvenTrying || prevState.areYouEvenTrying,
          stormtrooper: stormtrooper || prevState.stormtrooper,
          cantStopWontStop: cantStopWontStop || prevState.cantStopWontStop,
          iThoughtThisWasChess: iThoughtThisWasChess || prevState.iThoughtThisWasChess,
          patienceIsAVirtue: patienceIsAVirtue || prevState.patienceIsAVirtue,
        }));
      }

      setStatsUpdated(true);
    }

  }, [enemyBattleGrid, playerShipGrid, statsUpdated, gameLog, setStats, setStatsUpdated, gameState, setGameState, selectedDifficulty, playerBattleGrid]);

  // AI Logic, triggered when it's the AI's turn
  React.useEffect(() => {
    let timeoutId = null;

    if (!gameState.playerTurn) {
      timeoutId = setTimeout(() => {
        const shotLogic = AI_LOGIC_OPTIONS[selectedDifficulty];
        const { shotResult, row, col } = shotLogic(enemyBattleGrid, setEnemyBattleGrid, playerShipGrid, setCurrentHeatMap);
        (shotResult === 'hit') ? playHitSoundEffect() : playMissSoundEffect();
        const shotResultMessage = (shotResult === 'hit') ? 'Hit!' : 'Miss!';
        setGameLog([...gameLog, `${shotResultMessage} ${convertXYToGridIndex(row, col)}`]);
        setGameState((prevState) => ({ ...prevState, playerTurn: true }));
      }, 1500);
    }

    return () => {
      // Cleanup function: if the component is unmounted before the delay, the timeout is cleared
      clearTimeout(timeoutId);
    }
  }, [gameState, enemyBattleGrid, setEnemyBattleGrid, playerShipGrid, setGameState, gameLog, setGameLog, selectedDifficulty, playHitSoundEffect, playMissSoundEffect, convertXYToGridIndex]);


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