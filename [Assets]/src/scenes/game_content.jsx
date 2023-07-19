import React from 'react';
import propTypes from 'prop-types';

import { Grid, Button } from '@mui/material';
import { BattleGrid, GameLogDisplay, ShipGrid } from '../modules';

import Heatmap from '../utils/ai_logic/heat_map_debug';

const GameContent = (props) => {
  const playerBattleGrid = props.playerBattleGrid;
  const setPlayerBattleGrid = props.setPlayerBattleGrid;
  const enemyShipGrid = props.enemyShipGrid;
  const setGameLog = props.setGameLog;
  const gameLog = props.gameLog;
  const gameState = props.gameState;
  const setGameState = props.setGameState;
  const playerShipGrid = props.playerShipGrid;
  const enemyBattleGrid = props.enemyBattleGrid;
  const handleForfeit = props.handleForfeit;
  const settings = props.settings;

  const currentHeatMap = props.currentHeatMap;

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={6}>
        <ShipGrid
          playerShipGrid={playerShipGrid}
          enemyBattleGrid={enemyBattleGrid}
          settings={settings}
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
          settings={settings}
        />
      </Grid>
      <Grid item xs={2}>
        <GameLogDisplay
          gameLog={gameLog}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          color='error'
          variant='contained'
          onClick={handleForfeit}
        >
          Forfeit
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant='contained'
          href="/"
        >
          Menu
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant='contained'
          href="/help"
        >
          Help
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Heatmap currentHeatMap={currentHeatMap} />
      </Grid>
    </Grid>
  );
}

GameContent.propTypes = {
  playerShipGrid: propTypes.array.isRequired,
  enemyBattleGrid: propTypes.array.isRequired,
  gameState: propTypes.object.isRequired,
  setGameState: propTypes.func.isRequired,
  playerBattleGrid: propTypes.array.isRequired,
  setPlayerBattleGrid: propTypes.func.isRequired,
  enemyShipGrid: propTypes.array.isRequired,
  setGameLog: propTypes.func.isRequired,
  gameLog: propTypes.array.isRequired,
  handleForfeit: propTypes.func.isRequired,
};

export default GameContent;