import React from 'react';
import propTypes from 'prop-types';

import { useLocalStorage } from '../utils/hooks';

import { Typography, Button, Grid } from '@mui/material';
import { StatsTable } from '../components';
import { UserCard } from '../modules';

import MainMenuAnimatedBackground from '../components/animations/main_menu_animation';

const UserStats = (props) => {
  const [username, setUsername] = useLocalStorage('username', 'Player');
  const [image, setImage] = useLocalStorage('profile_image', '');

  const stats = props.stats;
  const enableAnimation = props.enableAnimation;

  return (
    <>
      <MainMenuAnimatedBackground enableAnimation={enableAnimation}/>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h3' align='center'>User Profile</Typography>
        </Grid>
        <Grid item container xs={12} justifyContent={'center'} alignItems={'center'}>
          <UserCard username={username} setUsername={setUsername} image={image} setImage={setImage} />
        </Grid>
        <Grid item container direction='column' xs={12} justifyContent={'center'} alignItems={'center'}>
          <Typography variant='h3' align='center'>User Stats</Typography>
          <StatsTable stats={stats} />
        </Grid>

        <Grid item xs={12}>
          <Grid container justifyContent='center' alignItems='center'>
            <Button variant='contained' color='primary' href='/' sx={{
              boxShadow: '0 0 10px #FFFFFF',
            }}>
              Return to Main Page
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

UserStats.propTypes = {
  stats: propTypes.object.isRequired,
};

export default UserStats;
