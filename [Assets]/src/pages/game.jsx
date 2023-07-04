import React from 'react';

import createGrid from '../utils/create_grid';

import BattleGrid from '../scenes/game/battle_grid';
import GameLogDisplay from '../scenes/game/game_log_display';
import ShipGrid from '../scenes/game/ship_grid';
import PlaceShips from '../scenes/game/place_ships';

const Game = (props) => {
  const setStats = props.setStats;

  const retrieveStateFromLocalStorage = (key, fallbackValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallbackValue;
  };

  // grid you click on to shoot and get hit/miss reports
  const [playerBattleGrid, setPlayerBattleGrid] = React.useState(retrieveStateFromLocalStorage('playerBattleGrid', createGrid(10)));
  const [enemyBattleGrid, setEnemyBattleGrid] = React.useState(retrieveStateFromLocalStorage('enemyBattleGrid', createGrid(10)));

  // grid you have your ships on and see where the enemy has hit/missed
  const [playerShipGrid, setPlayerShipGrid] = React.useState(retrieveStateFromLocalStorage('playerShipGrid', createGrid(10)));
  const [enemyShipGrid, setEnemyShipGrid] = React.useState(retrieveStateFromLocalStorage('enemyShipGrid', createGrid(10)));

  // game log of all the actions that have happened
  const [gameLog, setGameLog] = React.useState(retrieveStateFromLocalStorage('gameLog', []));

  // game state
  const [gameState, setGameState] = React.useState(retrieveStateFromLocalStorage('gameState', {
    playerTurn: true,
    gameOver: false,
    winner: null,
    allPlayerShipsPlaced: false,
    playerReadyToPlay: false,
    shipsPlaced: {
      carrier: false,
      battleship: false,
      cruiser: false,
      submarine: false,
      destroyer: false
    }
  }));

  // Save state to local storage whenever state changes
  React.useEffect(() => {
    localStorage.setItem('playerBattleGrid', JSON.stringify(playerBattleGrid));
    localStorage.setItem('enemyBattleGrid', JSON.stringify(enemyBattleGrid));
    localStorage.setItem('playerShipGrid', JSON.stringify(playerShipGrid));
    localStorage.setItem('enemyShipGrid', JSON.stringify(enemyShipGrid));
    localStorage.setItem('gameLog', JSON.stringify(gameLog));
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [playerBattleGrid, enemyBattleGrid, playerShipGrid, enemyShipGrid, gameLog, gameState]);
  
  console.log(gameState)

  if (gameState.allPlayerShipsPlaced && gameState.playerReadyToPlay) {
    if (gameState.playerTurn) {
      return (
        <>
          <ShipGrid
            gameState={gameState}
            playerShipGrid={playerShipGrid}
            setPlayerShipGrid={setPlayerShipGrid}
            enemyBattleGrid={enemyBattleGrid}
            setGameLog={setGameLog}
            gameLog={gameLog}
          />

          <GameLogDisplay
            gameLog={gameLog}
          />

          <BattleGrid
            gameState={gameState}
            playerBattleGrid={playerBattleGrid}
            setPlayerBattleGrid={setPlayerBattleGrid}
            enemyShipGrid={enemyShipGrid}
            setGameLog={setGameLog}
            gameLog={gameLog}
          />
        </>
      );
    } else {
      // INSERT AI LOGIC... SHOULD FAKE THINK. make a shot. flip the playerTurn bool
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