import React from 'react';
import { Button, Typography, Box, Container, Grid } from '@mui/material';

const Credits = (props) => {
    const setStats = props.setStats;

    React.useEffect(() => {
        setStats((prevState) => ({...prevState, credits: true}));
    }, []);

    return (
        <Container maxWidth="sm">
            <Box my={4} textAlign="center">
                <Typography variant="h2" component="h1" gutterBottom>
                    Credits
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom>
                    <Box fontWeight="fontWeightBold">
                        Team Badger
                    </Box>
                </Typography>

                <Typography variant="body1" gutterBottom>
                    <Box fontStyle="italic">
                        Evidently the best damn team in the world. 100% deserving of an A++.
                    </Box>
                </Typography>

                <Grid container>
                    {['Zachary Chan', 'Curtis Huang', 'Kyle Mollard', 'Mark He', 'Angela Yung'].map(name => (
                        <Grid item key={name} sx={12} container justifyContent='center' alignContent='center'>
                            <Typography variant="body1" gutterBottom>
                                <Box fontWeight="fontWeightBold">Team Member:</Box> {name}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h4" gutterBottom>
                    We hope you enjoyed our game!
                </Typography>

                <Box mt={4}>
                    <Button color="primary" variant="contained" href="/">
                        Back to main menu
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Credits;
