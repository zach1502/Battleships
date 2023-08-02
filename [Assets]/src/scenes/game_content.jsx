import React, { useState } from 'react';
import propTypes from 'prop-types';

import { Grid, Button } from '@mui/material';
import { BattleGrid, GameLogDisplay, ShipGrid } from '../modules';
import { TurnIndicator, DialogBox } from '../components';

// import Heatmap from '../utils/ai_logic/heat_map_debug';

import FlagIcon from '@mui/icons-material/Flag';
import MenuIcon from '@mui/icons-material/Menu';
import HelpIcon from '@mui/icons-material/Help';

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
  const settings = props.settings;
  const setStats = props.setStats;

  // const currentHeatMap = props.currentHeatMap;

  const handleForfeit = React.useCallback(() => {
    // remove specific local storage items
    localStorage.removeItem('playerBattleGrid');
    localStorage.removeItem('enemyBattleGrid');
    localStorage.removeItem('playerShipGrid');
    localStorage.removeItem('enemyShipGrid');
    localStorage.removeItem('gameLog');
    localStorage.removeItem('gameState');
    localStorage.removeItem('hunt_and_seek_state');
    localStorage.removeItem('selectedDifficulty');
    localStorage.removeItem('statsUpdated');

    setStats((prevState) => ({
      ...prevState,
      forfeits: prevState.forfeits + 1 || 1,
      losses: prevState.losses + 1 || 1,
    }));
  }, [setStats]);

  const [openHelp, setOpenHelp] = useState(false);

  const handleOpenHelp = () => {
    setOpenHelp(true);
  };

  const handleCloseHelp = () => {
    setOpenHelp(false);
  };

  return (
    <Grid direction="row" container justifyContent="center" alignItems="center">
      <Grid item xs={12} container justifyContent="center" alignItems="center">
        <TurnIndicator
          playerTurn={gameState.playerTurn}
        />
      </Grid>
      <Grid item xs={6} container justifyContent="center" alignItems="center" sx={{ marginLeft: '-3rem' }}>
        <ShipGrid
          playerShipGrid={playerShipGrid}
          enemyBattleGrid={enemyBattleGrid}
          settings={settings}
        />
      </Grid>
      <Grid item xs={6} container justifyContent="center" alignItems="center" sx={{ marginLeft: '-3rem' }}>
        <BattleGrid
          gameState={gameState}
          setGameState={setGameState}
          playerBattleGrid={playerBattleGrid}
          setPlayerBattleGrid={setPlayerBattleGrid}
          enemyShipGrid={enemyShipGrid}
          setGameLog={setGameLog}
          gameLog={gameLog}
          settings={settings}
          setStats={setStats}
        />
      </Grid>
      <Grid item xs={3} container justifyContent="center" alignItems="center">
        <GameLogDisplay
          gameLog={gameLog}
        />
      </Grid>
      <Grid item xs={3} container justifyContent="center" alignItems="center">
        <Button
          color='error'
          variant='contained'
          startIcon={<FlagIcon />}
          onClick={handleForfeit}
          href='/'
        >
          Forfeit
        </Button>
      </Grid>
      <Grid item xs={3} container justifyContent="center" alignItems="center">
        <Button
          variant='contained'
          startIcon={<MenuIcon />}
          href="/"
        >
          Menu
        </Button>
      </Grid>
      <Grid item xs={3} container justifyContent="center" alignItems="center">
        <Button
          variant='contained'
          startIcon={<HelpIcon />}
          onClick={handleOpenHelp}
        >
          Help
        </Button>
        <DialogBox
          open={openHelp}
          handleClose={handleCloseHelp}
          titleContentPairs={[
            {
              title: "Goal of the Game",
              content: `The goal of the game is to destroy all enemy ships before your opponent does the same to you. Each player starts with a fleet of ships placed on their own grid. On each turn, a player can launch an attack on the opponent's grid, aiming to hit and sink their ships. The game continues until one player's entire fleet is sunk.`,
            },
            {
              title: "Ships Grid (Left)",
              content: "The Ships Grid on the left side of the screen represents your fleet. It displays the position of your ships and the status of each ship segment (either intact or hit). Your opponent's attacks will be marked on this grid so you can see all their shots.",
            },
            {
              title: "Attack Grid (Right)",
              content: "The Attack Grid on the right side of the screen represents your opponent's grid where you launch your attacks. It shows the result of your past attacks (hits or misses) and helps you strategize your future moves. When you hit an enemy ship, it will be marked on this grid.",
            },
            {
              title: "Game Log",
              content: "The Game Log at the bottom of the screen displays the history of your attacks and your opponent's attacks. It shows the result of each attack (hit or miss) and the position of the attack on the grid.",
            },
            {
              title: "Forfeit",
              content: "If you wish to forfeit the game, you can click the Forfeit button at the bottom of the screen. This will end the game and return you to the Main Menu. The game will be counted as a loss.",
            },
            {
              title: "Saving and Loading",
              content: "This is done automatically. You can close the game at any time and your progress will be saved. When you return to the game, you will be able to continue where you left off."
            }
          ]}
          buttonText={"Close"} 
        />
      </Grid>

      {/* <Grid item xs={12}>
        <Heatmap currentHeatMap={currentHeatMap} />
      </Grid> */}
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
  settings: propTypes.object.isRequired,
  setStats: propTypes.func.isRequired,
};

export default GameContent;
