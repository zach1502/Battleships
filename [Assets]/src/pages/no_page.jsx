import React from 'react';
import { Button, Typography } from '@mui/material';

const NoPage = (props) => {
    return (
        <>
            <Typography variant="h1" component="div" gutterBottom>
                404
            </Typography>
            <Typography variant="h2" component="div" gutterBottom>
                Page not found
            </Typography>
            <Typography variant="body1" component="div" gutterBottom>
                The page you are looking for does not exist.
                That leads to the question of how the hell did you get here?
            </Typography>

            <Button variant="contained" href="/">
                Take me to somewhere safe!
            </Button>
        </>
    );
};

export default NoPage;