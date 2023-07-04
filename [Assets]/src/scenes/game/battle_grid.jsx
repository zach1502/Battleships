import React from "react";

import SelectionGrid from "../../components/game/selection_grid";

import { battleGridLegend } from "../../utils/grid_legends";

const BattleGrid = (props) => {
  const gameState = props.gameState;
  const playerBattleGrid = props.playerBattleGrid;
  const setPlayerBattleGrid = props.setPlayerBattleGrid;
  const enemyShipGrid = props.enemyShipGrid;
  const setGameLog = props.setGameLog;
  const gameLog = props.gameLog;

  return (
    <>
      <SelectionGrid
        grid={playerBattleGrid}
        legend={battleGridLegend}
        squareSize={2}
        squareSpacing={0.5}
        disableGridMarkers={false}
        disableClick={gameState !== "playerTurn"}
        onClick={(row, col) => {
          if (gameState === "playerTurn") {
            const newGrid = [...playerBattleGrid];
            if (enemyShipGrid[row][col] !== null) {
              newGrid[row][col] = "hit";
              setGameLog([...gameLog, "You hit a ship!"]);
            } else {
              newGrid[row][col] = "miss";
              setGameLog([...gameLog, "You missed!"]);
            }
            setPlayerBattleGrid(newGrid);
          }
        }}
      />
    </>
  )
};

export default BattleGrid;