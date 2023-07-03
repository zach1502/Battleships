import React from 'react';

import createGrid from '../utils/create_grid';

import BattleGrid from '../scenes/game/battle_grid';
import GameLogDisplay from '../scenes/game/game_log_display';
import ShipGrid from '../scenes/game/ship_grid';
import PlaceShips from '../scenes/game/place_ships';

const Game = (props) => {
    const setStats = props.setStats;

    // grid you click on to shoot and get hit/miss reports
    const [playerBattleGrid, setPlayerBattleGrid] = React.useState(createGrid(8));
    const [enemyBattleGrid, setEnemyBattleGrid] = React.useState(createGrid(8));

    // grid you have your ships on and see where the enemy has hit/missed
    const [playerShipGrid, setPlayerShipGrid] = React.useState(createGrid(8));
    const [enemyShipGrid, setEnemyShipGrid] = React.useState(createGrid(8));

    // game log of all the actions that have happened
    const [gameLog, setGameLog] = React.useState([]);

    // game state
    const [gameState, setGameState] = React.useState({
        playerTurn: true,
        gameOver: false,
        winner: null,
        allShipsPlaced: false,
        shipsPlaced: {
            carrier: false,
            battleship: false,
            cruiser: false,
            submarine: false,
            destroyer: false
        }
    });

    if (gameState.allShipsPlaced) {
        if (gameState.playerTurn) {
            return (
                <>
                    <BattleGrid
                        gameState={gameState}
                        playerBattleGrid={playerBattleGrid}
                        setPlayerBattleGrid={setPlayerBattleGrid}
                        enemyShipGrid={enemyShipGrid}
                        setGameLog={setGameLog}
                        gameLog={gameLog}
                    />

                    <GameLogDisplay
                        gameLog={gameLog}
                    />

                    <ShipGrid
                        gameState={gameState}
                        playerShipGrid={playerShipGrid}
                        setPlayerShipGrid={setPlayerShipGrid}
                        enemyBattleGrid={enemyBattleGrid}
                        setGameLog={setGameLog}
                        gameLog={gameLog}
                    />
                </>
            );
        } else {
            // INSERT AI LOGIC... SHOULD FAKE THINK. make a shot then flip the playerTurn bool
        }
    } else {
        return(
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