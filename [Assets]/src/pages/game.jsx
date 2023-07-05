import React from 'react';

import createGrid from '../utils/create_grid';

import BattleGrid from '../scenes/game/battle_grid';
import GameLogDisplay from '../scenes/game/game_log_display';
import ShipGrid from '../scenes/game/ship_grid';
import PlaceShips from '../scenes/game/place_ships';

import { retrieveFromLocalStorage, storeInLocalStorage } from '../utils/local_storage_manager';
import { Grid, Button } from '@mui/material';
import { shipLengths, shipNames } from "../utils/ship_details";

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

  // place enemy ships randomly
  React.useEffect(() => {
    if (gameState.allPlayerShipsPlaced && !gameState.playerReadyToPlay) { // gets triggered once
      placeEnemyShips(createGrid(10), setEnemyShipGrid);
    }
  }, [gameState]);

  // Save state to local storage whenever state changes
  React.useEffect(() => {
    storeInLocalStorage('playerBattleGrid', playerBattleGrid);
    storeInLocalStorage('enemyBattleGrid', enemyBattleGrid);
    storeInLocalStorage('playerShipGrid', playerShipGrid);
    storeInLocalStorage('enemyShipGrid', enemyShipGrid);
    storeInLocalStorage('gameLog', gameLog);
    storeInLocalStorage('gameState', gameState);
  }, [playerBattleGrid, enemyBattleGrid, playerShipGrid, enemyShipGrid, gameLog, gameState]);

  // probs gonna need to refactor this out into a separate file
  const placeEnemyShips = (grid, setGrid) => {
    let newGrid = [...grid];

    shipNames.forEach(ship => {
      let placed = false;

      while (!placed) {
        const orientation = Math.random() > 0.5 ? "horizontal" : "vertical";
        const direction = Math.random() > 0.5 ? 1 : -1;
        const shipLength = shipLengths[ship];

        let startRow = Math.floor(Math.random() * newGrid.length);
        let startCol = Math.floor(Math.random() * newGrid[0].length);

        if (orientation === "horizontal") {
          if (direction === 1 && startCol + shipLength <= newGrid[0].length) {
            let canPlace = true;
            for (let i = 0; i < shipLength; i++) {
              if (newGrid[startRow][startCol + i] !== null) {
                canPlace = false;
                break;
              }
            }
            if (canPlace) {
              for (let i = 0; i < shipLength; i++) {
                newGrid[startRow][startCol + i] = ship;
              }
              placed = true;
            }
          } else if (direction === -1 && startCol - shipLength >= -1) {
            let canPlace = true;
            for (let i = 0; i < shipLength; i++) {
              if (newGrid[startRow][startCol - i] !== null) {
                canPlace = false;
                break;
              }
            }
            if (canPlace) {
              for (let i = 0; i < shipLength; i++) {
                newGrid[startRow][startCol - i] = ship;
              }
              placed = true;
            }
          }
        } else {
          if (direction === 1 && startRow + shipLength <= newGrid.length) {
            let canPlace = true;
            for (let i = 0; i < shipLength; i++) {
              if (newGrid[startRow + i][startCol] !== null) {
                canPlace = false;
                break;
              }
            }
            if (canPlace) {
              for (let i = 0; i < shipLength; i++) {
                newGrid[startRow + i][startCol] = ship;
              }
              placed = true;
            }
          } else if (direction === -1 && startRow - shipLength >= -1) {
            let canPlace = true;
            for (let i = 0; i < shipLength; i++) {
              if (newGrid[startRow - i][startCol] !== null) {
                canPlace = false;
                break;
              }
            }
            if (canPlace) {
              for (let i = 0; i < shipLength; i++) {
                newGrid[startRow - i][startCol] = ship;
              }
              placed = true;
            }
          }
        }
      }
    });
    setGrid(newGrid);
  };

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
                onClick={() => {
                  // clear local storage
                  localStorage.clear();

                  // refresh page
                  window.location.reload();
                }}
              >
                Forfeit
              </Button>
            </Grid>
          </Grid>
        </>
      );
    } else {
      // INSERT AI LOGIC... SHOULD FAKE THINK. make a shot. flip the playerTurn bool
      // then wait a second and then flip it back
      // RANDOM SHOT FOR NOW

      // random row and col
      let row;
      let col;
      do {
        row = Math.floor(Math.random() * playerBattleGrid.length);
        col = Math.floor(Math.random() * playerBattleGrid[0].length);
      } while (enemyBattleGrid[row][col] !== null);

      enemyBattleGrid[row][col] = playerShipGrid[row][col] !== null ? "hit" : "miss";

      gameState.playerTurn = true;
      setGameState(gameState);
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