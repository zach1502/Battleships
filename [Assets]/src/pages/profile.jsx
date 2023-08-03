import React from 'react';
import propTypes from 'prop-types';

import { useLocalStorage } from '../utils/hooks';

import { Typography, Button, Grid, Box } from '@mui/material';
import { StatsTable } from '../components';
import { UserCard } from '../modules';

const UserStats = ({ stats }) => {
  const [username, setUsername] = useLocalStorage('username', 'Player');
  const [image, setImage] = useLocalStorage('profile_image', '');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">User Profile</Typography>
      </Grid>
      <Grid item container xs={12} justifyContent={'center'} alignItems={'center'}>
        <UserCard username={username} setUsername={setUsername} image={image} setImage={setImage} />
      </Grid>
      <Grid item container direction='column' xs={12} justifyContent={'center'} alignItems={'center'}>
        <Typography variant="h4" align="center">User Stats</Typography>
        <StatsTable stats={stats} />
      </Grid>

      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          <Button variant="contained" color="primary" href='/'>
            Return to Main Page
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

UserStats.propTypes = {
  stats: propTypes.object.isRequired,
};

export default UserStats;
