import React from 'react';
import { Button, Grid, Typography, Box} from '@mui/material';

import { listOfAllAchievements } from '../utils/achievements_list';

import MenuIcon from '@mui/icons-material/Menu';

const Achievements = (props) => {
  const obtainedAchievements = props.obtainedAchievements;
  return (
    <Box sx={{ maxHeight: '100%', overflowY: 'auto' }}>
      <Grid container spacing={2} alignContent={'center'}>
        <Grid item xs={12} container justifyContent='center' alignItems='center'>
          <Typography variant='h2' component='div' gutterBottom>
            Achievements
          </Typography>
        </Grid>
        <Grid item xs={12} container justifyContent='center' alignItems='center'>
          <Button color='primary' variant='contained' href='/' startIcon={<MenuIcon/>}>
            Back to main menu
          </Button>
        </Grid>
        <Grid item xs={12} container justifyContent='center' alignItems='center'>
          <Typography variant='subtitle1' component='div' gutterBottom>
            Obtained Achievements
          </Typography>
          <Grid item xs={12} container justifyContent='center' alignContent='center'>
            {obtainedAchievements.length} / {listOfAllAchievements.length}
          </Grid>
        </Grid>
        {
          listOfAllAchievements.map((achievement, index) => {
            const isUnlocked = obtainedAchievements.includes(achievement.name);

            if (!isUnlocked && achievement.isHidden) return null; // skip hidden achievements

            const name = achievement.name;
            const image = achievement.image;
            const description = achievement.description;

            const checkmark = isUnlocked ? '✓ Obtained' : '✗ Not Obtained';
            return (
              <Grid item key={index} xs={4}>
                <Box
                  component='img'
                  alt={description}
                  src={image}
                  sx={{ width: 128, height: 128 }}
                />
                <Box>
                  <Typography variant='h5' component='div' gutterBottom>
                    {name}
                  </Typography>
                  <Typography variant='body1' component='div' gutterBottom>
                    {description}
                  </Typography>
                  <Typography variant='body1' component='div' gutterBottom
                  color={(isUnlocked)?'success':'error'}>
                    <b>Status: </b>
                    {checkmark}
                  </Typography>
                </Box>
              </Grid>
            );
          })
        }
        <Grid item xs={12} container justifyContent='center' alignItems='center'>
          <Button color='primary' variant='contained' href='/' startIcon={<MenuIcon/>}>
            Back to main menu
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Achievements;