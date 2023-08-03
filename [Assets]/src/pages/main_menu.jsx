import React from 'react';
import { Button, Grid, Typography } from '@mui/material';

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SettingsIcon from '@mui/icons-material/Settings';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Menu = (props) => {
  return (
    <>
      {/* <Typography variant="h1" component="div">
                    Menu
            </Typography> */}
      <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
        <Typography variant="h1" component="div">
          Menu
        </Typography>
        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
          <Grid item>
            {(localStorage.gameState)
              ? <Button variant="contained" color='success' href="/game" startIcon={<PlayArrowIcon/>}>Continue</Button> :
              <Button variant="contained" color='success' href="/game" startIcon={<PlayArrowIcon/>}>Play</Button>}
          </Grid>
          <Grid item>
            <Button variant="contained" href="/settings" startIcon={<SettingsIcon/>}>Settings</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" href="/achievements" startIcon={<EmojiEventsIcon/>}>Achievements</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" href="/profile" startIcon={<AccountCircleIcon/>}>Profile</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" href="/credits" startIcon={<Diversity1Icon/>}>Credits</Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Menu;