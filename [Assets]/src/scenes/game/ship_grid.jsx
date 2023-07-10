import React from 'react';
import propTypes from 'prop-types';

import SelectionGrid from "../../components/game/selection_grid";
import {shipGridLegend} from "../../utils/grid_legends";

const ShipGrid = (props) => {
  const playerShipGrid = props.playerShipGrid;
  const enemyBattleGrid = props.enemyBattleGrid;
  const settings = props.settings;

  React.useMemo(() => {
    shipGridLegend['null']['color'] = settings.gridBlankColor;
    shipGridLegend['miss']['color'] = settings.gridMissColor;
    shipGridLegend['hit']['color'] = settings.gridHitColor;
  }, [settings.gridBlankColor, settings.gridMissColor, settings.gridHitColor]);

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
        grid={mergeGrids(enemyBattleGrid, playerShipGrid)}
        legend={shipGridLegend}
        squareSize={2}
        squareSpacing={0.5}
        disableGridMarkers={false}
        disableClick={true}
        onClick={() => {}}
      />
    </>
  )
};

ShipGrid.propTypes = {
  playerShipGrid: propTypes.array.isRequired,
  enemyBattleGrid: propTypes.array.isRequired,
};

export default ShipGrid;