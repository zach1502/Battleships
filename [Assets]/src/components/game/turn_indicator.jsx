import React from 'react';
import propTypes from 'prop-types';
import { Typography } from '@mui/material';

const TurnIndicator = (props) => {
  const { playerTurn } = props;

  return (
    <Typography
      variant='h4'
      component='h2'
      gutterBottom
      sx={{
        border: '2px solid',
        padding: '1rem',
        borderRadius: '5px',
        backgroundColor: playerTurn ? '#388e3c' : '#d32f2f',
        color: 'white',
      }}
    >
      {`Turn: ${playerTurn ? 'Player' : 'Enemy'}`}
    </Typography>
  );
}

TurnIndicator.propTypes = {
  playerTurn: propTypes.bool.isRequired,
};

export default TurnIndicator;
