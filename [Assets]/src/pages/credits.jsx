import React from 'react';
import { Button, Typography } from '@mui/material';

const Credits = (props) => {
    const setStats = props.setStats;
    return (
        <>
            <Typography variant="h1" component="div" gutterBottom>
                Credits
            </Typography>

            <Typography variant="body1" component="div" gutterBottom>
                This game was made by Team Badger. Evidently the best damn team in the world. 100% deserving of an A++.
            </Typography>

            <Button color="primary" variant="contained" href="/" onClick={
                () => {
                    setStats((prevState) => ({...prevState, credits: true}));
                }
            }>
                Back to main menu
            </Button>
        </>
    );
};

export default Credits;