import React from 'react';
import propTypes from 'prop-types';

import SelectionGrid from "../../components/game/selection_grid";

import { shipGridLegend } from "../../utils/grid_legends";
import useNewGridColors from "../../utils/hooks/use_new_grid_colors";

const BattleGrid = (props) => {
  const gameState = props.gameState;
  const setGameState = props.setGameState;
  const playerBattleGrid = props.playerBattleGrid;
  const setPlayerBattleGrid = props.setPlayerBattleGrid;
  const enemyShipGrid = props.enemyShipGrid;
  const setGameLog = props.setGameLog;
  const gameLog = props.gameLog;
  const settings = props.settings;

  const [selectedSquare, setSelectedSquare] = React.useState(null);

  useNewGridColors(settings);

  return (
    <>
      <SelectionGrid
        grid={playerBattleGrid}
        legend={shipGridLegend}
        squareSize={2}
        squareSpacing={0.5}
        selectedSquare={selectedSquare}
        setSelectedSquare={setSelectedSquare}
        disableGridMarkers={false}
        disableClick={!gameState.playerTurn}
        onClick={(row, col) => {
          if(playerBattleGrid[row][col] !== null) return;

          const newGrid = [...playerBattleGrid];
          if (enemyShipGrid[row][col] !== null) {
            newGrid[row][col] = "hit";
            setGameLog([...gameLog, "You Hit!"]);
          } else {
            newGrid[row][col] = "miss";
            setGameLog([...gameLog, "You missed!"]);
          }
          setPlayerBattleGrid(newGrid);
          
          console.log("You clicked on: " + row + ", " + col);
          setSelectedSquare(null);

          // flip game state
          gameState.playerTurn = false;
          setGameState(gameState);
        }}
      />
    </>
  )
};

BattleGrid.propTypes = {
  gameState: propTypes.object.isRequired,
  setGameState: propTypes.func.isRequired,
  playerBattleGrid: propTypes.array.isRequired,
  setPlayerBattleGrid: propTypes.func.isRequired,
  enemyShipGrid: propTypes.array.isRequired,
  setGameLog: propTypes.func.isRequired,
  gameLog: propTypes.array.isRequired,
};

export default BattleGrid;