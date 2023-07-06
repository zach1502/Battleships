import React from 'react';
import { Button, Grid, Typography } from '@mui/material';

const Menu = (props) => {
    return (
        <>
            <Typography variant="h1" component="div" gutterBottom>
                Menu
            </Typography>

            <Grid container spacing={2} justifyContent="flex-start" alignItems="center">
                <Grid item>
                    <Button variant="contained" color='success' href="/game">Play</Button>
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
        </>
    );
};

export default Menu;