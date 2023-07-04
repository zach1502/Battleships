import React from "react";

import { Grid } from "@mui/material";

import SelectionGrid from "../../components/game/selection_grid";
import { playShipGridLegend } from "../../utils/grid_legends";

const ShipGrid = (props) => {
  const playerShipGrid = props.playerShipGrid;
  const enemyBattleGrid = props.enemyBattleGrid;

  const mergeGrids = (onTop, onBottom) => {
    const mergedGrid = [...onBottom];
    for (let i = 0; i < onTop.length; i++) {
      for (let j = 0; j < onTop[i].length; j++) {
        if (onTop[i][j] !== null) {
          mergedGrid[i][j] = onTop[i][j];
        }
      }
    }

    return mergedGrid;
  };

  return (
    <>
      <SelectionGrid
        grid={mergeGrids(playerShipGrid, enemyBattleGrid)}
        legend={playShipGridLegend}
        squareSize={2}
        squareSpacing={0.5}
        disableGridMarkers={false}
        disableClick={true}
        onClick={() => {}}
      />
    </>
  )
};

export default ShipGrid;