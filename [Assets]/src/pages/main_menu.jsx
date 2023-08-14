import React from 'react';
import { Button, Grid, Typography } from '@mui/material';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsIcon from '@mui/icons-material/Settings';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import MainMenuAnimatedBackground from '../components/animations/main_menu_animation';

const Menu = (props) => {
  const setSelectedTrack = props.setSelectedTrack;

  React.useEffect(() => {
    setSelectedTrack('menu');
  }, [setSelectedTrack]);

  return (
    <>
      <MainMenuAnimatedBackground />

      <Grid container direction='column' justifyContent='space-evenly' alignItems='center'>
        <Grid item container direction='column' alignItems='center'>
          <Typography variant='h1' component='div'>
            Battleship
          </Typography>
          <Typography variant='h4' component='div'>
            Set Sail for Battle!
          </Typography>
        </Grid>
        <Grid container spacing={2} direction='row' justifyContent='center' alignItems='center'>
          <Grid item>
            <Button variant='contained' href='/game'color='success' startIcon={<PlayArrowIcon />}>Play</Button>
          </Grid>
          <Grid item>
            <Button variant='contained' href='/settings' startIcon={<SettingsIcon />}>Settings</Button>
          </Grid>
          <Grid item>
            <Button variant='contained' href='/achievements' startIcon={<EmojiEventsIcon />}>Achievements</Button>
          </Grid>
          <Grid item>
            <Button variant='contained' href='/profile' startIcon={<AccountCircleIcon />}>Profile</Button>
          </Grid>
          <Grid item>
            <Button variant='contained' href='/credits' startIcon={<Diversity1Icon />}>Credits</Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Menu;
