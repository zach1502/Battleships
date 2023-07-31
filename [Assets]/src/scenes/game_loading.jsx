import React from 'react';
import propTypes from 'prop-types';

import { Grid, Typography } from '@mui/material';

const GameLoading = (props) => {
  const gameState = props.gameState;
  const setGameState = props.setGameState;
  const [statusMessage, setStatusMessage] = React.useState('Connecting to matchmaking server...');
  const [onlineCount, setOnlineCount] = React.useState(Math.floor(Math.random() * 100) + 200);
  const [playingCount, setPlayingCount] = React.useState(Math.floor(Math.random() * 25) *2 + 10);
  const [countdown, setCountdown] = React.useState(null);

  React.useEffect(() => {
    const updateStatus = setTimeout(() => {
      setStatusMessage('Searching for a match...');
    }, 2000);

    const findMatch = setTimeout(() => {
      setStatusMessage('Match found!');
      setCountdown(3);
    }, 7000);

    const updateCounts = setInterval(() => {
      setOnlineCount((prevCount) => prevCount + Math.floor(Math.random() * 10) - 5);
      setPlayingCount((prevCount) => prevCount + Math.floor(Math.random() * 2)*2 - 2);
    }, 1500);

    return () => {
      clearTimeout(updateStatus);
      clearTimeout(findMatch);
      clearInterval(updateCounts);
    };
  }, []);

  React.useEffect(() => {
    let countdownTimer = null;
    if (countdown > 0) {
      countdownTimer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      countdownTimer = setTimeout(() => {
        setGameState((prevState) => ({ ...prevState, gameLoaded: true }));
      }, 1000);
    }

    return () => countdownTimer && clearTimeout(countdownTimer);
  }, [countdown]);

  return (
    <Grid 
        container 
        direction="column" 
        justifyContent="center" 
        alignItems="center"
        style={{ minHeight: '100vh' }}
    >
      <Typography variant="h1" style={{ marginBottom: '20px' }}>
        {countdown !== null ? countdown : ""}
      </Typography>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>
        {statusMessage}
      </Typography>
      <Typography variant="subtitle1">
        Online players: {onlineCount}
      </Typography>
      <Typography variant="subtitle1">
        Currently playing: {playingCount}
      </Typography>
    </Grid>
  );
};

GameLoading.propTypes = {
  gameState: propTypes.object.isRequired,
};

export default GameLoading;
