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

  const [selectedSquare, setSelectedSquare] = React.useState(null);

  return (
    <>
      <SelectionGrid
        grid={playerBattleGrid}
        legend={battleGridLegend}
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
        }}
      />
    </>
  )
};

export default BattleGrid;