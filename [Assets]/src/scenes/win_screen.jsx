import React from 'react';
import propTypes from 'prop-types';

import { Grid, Button, Typography } from '@mui/material';

const WinScreen = (props) => {
  const gameState = props.gameState;

  const handleReturnToMenu = React.useCallback(() => {
    // remove specific local storage items
    localStorage.removeItem('playerBattleGrid');
    localStorage.removeItem('enemyBattleGrid');
    localStorage.removeItem('playerShipGrid');
    localStorage.removeItem('enemyShipGrid');
    localStorage.removeItem('gameLog');
    localStorage.removeItem('gameState');
    localStorage.removeItem('hunt_and_seek_state');
    localStorage.removeItem('selectedDifficulty');

    // go to the main menu
    window.location.href = '/';
  }, []);

  const handlePlayAgain = React.useCallback(() => {
    localStorage.removeItem('playerBattleGrid');
    localStorage.removeItem('enemyBattleGrid');
    localStorage.removeItem('playerShipGrid');
    localStorage.removeItem('enemyShipGrid');
    localStorage.removeItem('gameLog');
    localStorage.removeItem('gameState');
    localStorage.removeItem('hunt_and_seek_state');
    localStorage.removeItem('selectedDifficulty');

    // go to the main menu
    window.location.href = '/game';
  }, []);

  return (
    <Grid container spacing={2} justifyContent='center' alignItems="center" >
      <Grid item xs={12}>
        <Typography variant="h3">
          {gameState.playerWon ? 'You Won!' : 'The AI has Won!'}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color='primary'
          onClick={handleReturnToMenu}
        >
          Return to Menu
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color='success'
          onClick={handlePlayAgain}
        >
          Play Again
        </Button>
      </Grid>
    </Grid>
  );
};

WinScreen.propTypes = {
  gameState: propTypes.object.isRequired,
};

export default WinScreen;