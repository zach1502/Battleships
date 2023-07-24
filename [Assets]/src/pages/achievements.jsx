import React from 'react';
import { Button, Grid, Typography, Box, Paper } from '@mui/material';

import { listOfAllAchievements } from '../utils/achievements_list';

const Achievements = (props) => {
  const obtainedAchievements = props.obtainedAchievements; // array of achievements earnt by the player
  /*
      obtainedAchievements should be an array of objects, each object containing:
      {
          name: "Achievement Name",
          time: "Time of achievement",
      }

      for each achievement in listOfAllAchievements, create a grid item with the achievement name and image
      if the achievement is in obtainedAchievements, add a checkmark to the grid item

      listOfAllAchievements is an array of objects, each object containing:
      {
          name: "Achievement Name",
          description: "Achievement Description",
          image: "Image of achievement",
          condition: "Lambda function to unlock achievement",
      }
  */
  console.log(obtainedAchievements)
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1" component="div" gutterBottom>
            Achievements
          </Typography>
        </Grid>
        {
          listOfAllAchievements.map((achievement, index) => {
            const isUnlocked = obtainedAchievements.includes(achievement.name);

            if (!isUnlocked && achievement.isHidden) return null; // skip hidden achievements

            const name = achievement.name;
            const image = achievement.image;
            const description = achievement.description;

            const checkmark = isUnlocked ? "✓ Obtained" : "✗ Not Obtained";
            return (
              <Grid item key={index} xs={4}>
                <Box
                  component="img"
                  alt={description}
                  src={image}
                  sx={{ width: 128, height: 128 }}
                />
                <Box>
                  <Typography variant="h5" component="div" gutterBottom>
                    {name}
                  </Typography>
                  <Typography variant="body1" component="div" gutterBottom>
                    {description}
                  </Typography>
                  <Typography variant="body1" component="div" gutterBottom>
                    <b>Status: </b>
                    {checkmark}
                  </Typography>
                </Box>
              </Grid>
            );
          })
        }
      </Grid>

      <Button color="primary" variant="contained" href="/">
        Back to main menu
      </Button>
    </>
  );
};

export default Achievements;