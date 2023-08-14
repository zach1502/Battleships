import React, { useState, useCallback, useContext, createContext, useMemo } from 'react';
import propTypes from 'prop-types';
import { Grid, Button, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import SeaWaterLevel from '../components/animations/pick_difficulty_animation'

const DifficultyContext = createContext();

const DifficultyButton = ({ option }) => {
  const { tempDifficulty, setTempDifficulty } = useContext(DifficultyContext);
  return (
    <Grid item xs={12} container justifyContent='center'>
      <Button
        variant='contained'
        color={(tempDifficulty === option.value) ? 'success' : 'primary'}
        onClick={() => setTempDifficulty(option.value)}
        sx={{
          width: '140px',
          boxShadow: '0 0 10px #FFFFFF',
        }}
      >
        {option.name}
      </Button>
    </Grid>
  );
};

const StartGameButton = ({ setSelectedDifficulty, tempDifficulty }) => (
  <Button
    variant='contained'
    color='success'
    startIcon={<PlayArrowIcon />}
    onClick={() => {
      if (tempDifficulty) {
        setSelectedDifficulty(tempDifficulty);
      }
    }}
    sx={{
      boxShadow: '0 0 10px #FFFFFF',
    }}
  >
    Start Game
  </Button>
);

const MainMenuButton = () => (
  <Button
    variant='contained'
    color='primary'
    href='/'
    startIcon={<MenuIcon />}
    sx={{
      boxShadow: '0 0 10px #FFFFFF',
    }}
  >
    Main Menu
  </Button>
);

const PickDifficulty = (props) => {
  const selectedDifficulty = props.selectedDifficulty;
  const setSelectedDifficulty = props.setSelectedDifficulty;
  const minimizeAnimations = props.minimizeAnimations;

  const [tempDifficulty, setTempDifficulty] = useState(selectedDifficulty);

  const difficultyOptions = useMemo(() => [
    { name: 'Easy', value: 'easy' },
    { name: 'Medium', value: 'medium' },
    { name: 'Hard', value: 'hard' },
    { name: 'Impossible', value: 'impossible' }
  ], []);

  const selectedDifficultyName = useCallback(() =>
    difficultyOptions.find((option) => option.value === tempDifficulty)?.name || 'None',
    [tempDifficulty, difficultyOptions]
  );

  const DifficultyOptions = useMemo(() => ({ options }) => (
    <Grid item xs={12} container spacing={2} alignItems='center'>
      {options.map((option) => <DifficultyButton key={option.value} option={option} />)}
    </Grid>
  ), []);

  return (
    <DifficultyContext.Provider value={{ tempDifficulty, setTempDifficulty }}>
      <SeaWaterLevel difficulty={tempDifficulty} minimizeAnimations={minimizeAnimations}/>

      <Grid container spacing={2}>
        <Grid item xs={12} container justifyContent='center' alignItems='center'>
          <Box display='flex' flexDirection='column' alignItems='center'>
            <Typography variant='h2'>
              Pick a Difficulty Level
            </Typography>
            <Typography variant='h3'>
              Selected: {selectedDifficultyName()}
            </Typography>
          </Box>
        </Grid>

        <DifficultyOptions options={difficultyOptions} />

        <Grid item xs={6} container justifyContent='center' alignItems='center'>
          <StartGameButton setSelectedDifficulty={setSelectedDifficulty} tempDifficulty={tempDifficulty} />
        </Grid>
        <Grid item xs={6} container justifyContent='center' alignItems='center'>
          <MainMenuButton />
        </Grid>
      </Grid>
    </DifficultyContext.Provider>
  );
};

PickDifficulty.propTypes = {
  selectedDifficulty: propTypes.string,
  setSelectedDifficulty: propTypes.func.isRequired,
};

export default PickDifficulty;
