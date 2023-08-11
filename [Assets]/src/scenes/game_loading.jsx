import React from 'react';
import propTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, Typography, Box, CircularProgress } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';

import { STATUS_MESSAGES, TIPS } from '../utils/constants';

const GameLoading = (props) => {
  const setGameState = props.setGameState;
  const setStats = props.setStats;

  const [statusMessage, setStatusMessage] = React.useState(STATUS_MESSAGES[0]);
  const [countdown, setCountdown] = React.useState(STATUS_MESSAGES.length);

  const [tipIndex, setTipIndex] = React.useState(0);

  const getNextTipIndex = (currentIndex) => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * TIPS.length);
    } while (nextIndex === currentIndex);
    return nextIndex;
  };

  React.useEffect(() => {
    if (countdown > -1) {
      const countdownTimer = setTimeout(() => {
        setCountdown(countdown - 1);
        setStatusMessage(STATUS_MESSAGES[STATUS_MESSAGES.length - countdown]);
      }, 2000);

      return () => clearTimeout(countdownTimer);
    } else {
      setGameState(prevState => ({ ...prevState, gameLoaded: true }));
    }
  }, [countdown, setGameState]);

  React.useEffect(() => {
    const tipTimer = setTimeout(() => {
      setTipIndex(getNextTipIndex);
    }, 5000);

    return () => clearTimeout(tipTimer);
  }, [tipIndex]);

  const handleTipClick = () => {
    if(tipIndex === TIPS.length - 1){
      setStats(prevStats => ({ ...prevStats, tipEasterEggFound: true }));
    }
    setTipIndex(getNextTipIndex);
  };

  const variants = {
    enter: () => {
      return {
        x: -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: () => {
      return {
        zIndex: 0,
        x: 1000,
        opacity: 0
      };
    }
  };

  const transition = {
    x: { type: 'spring', stiffness: 300, damping: 30 },
    opacity: { duration: 0.5 }
  };

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      style={{ minHeight: '100vh' }}
      sx={{overflow: 'hidden'}}
    >
      <CircularProgress color='primary' style={{ marginBottom: '20px' }} />
      <Typography variant='h5' style={{ marginBottom: '20px' }}>
        {statusMessage}
      </Typography>
      <AnimatePresence mode='wait'>
        <motion.div
          key={tipIndex}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          onClick={handleTipClick}
          transition={transition}
          style={{cursor: 'pointer'}}
        >
          <Typography variant='subtitle1' style={{ marginBottom: '10px' }}>
            {TIPS[tipIndex]}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <KeyboardArrowDown fontSize='small' />
          </Box>
        </motion.div>
      </AnimatePresence>
    </Grid>
  );
};

GameLoading.propTypes = {
  setGameState: propTypes.func.isRequired,
  setStats: propTypes.func.isRequired
};

export default GameLoading;
