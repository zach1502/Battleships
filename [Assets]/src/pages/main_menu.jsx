import React from 'react';
import { Button, Grid, Typography } from '@mui/material';

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

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
          {/* <Typography variant="h1" component="div">
                        Menu
                    </Typography> */}
          <Grid item>
            {(localStorage.gameState)
              ? <Button variant="contained" color='success' href="/game" startIcon={<PlayArrowIcon/>}>Continue</Button> :
              <Button variant="contained" color='success' href="/game" startIcon={<PlayArrowIcon/>}>Play</Button>}
          </Grid>
          <Grid item>
            <Button variant="contained" href="/settings">Settings</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" href="/achievements">Achievements</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" href="/credits">Credits</Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Menu;