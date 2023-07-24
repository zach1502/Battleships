import React from 'react';
import propTypes from 'prop-types';

import { Grid, Button, Typography } from '@mui/material';

const PickDifficulty = (props) => {
    const selectedDifficulty = props.selectedDifficulty;
    const setSelectedDifficulty = props.setSelectedDifficulty;

    const [tempDifficulty, setTempDifficulty] = React.useState(selectedDifficulty);

    const difficultyOptions = [
        {
            name: 'Easy',
            value: 'easy',
        },
        {
            name: 'Medium',
            value: 'medium',
        },
        {
            name: 'Hard',
            value: 'hard',
        },
        {
            name: 'Impossible',
            value: 'impossible',
        }
    ];

    const renderDifficultyOptions = React.useCallback(() => {
        return difficultyOptions.map((option) => {
            return (
                <Grid item xs={12/difficultyOptions.length} key={option.value}>
                    <Button
                        variant="contained"
                        color={(tempDifficulty === option.value)? 'success' : 'primary'}
                        value={option.value}
                        onClick={() => setTempDifficulty(option.value)}
                    >
                        {option.name}
                    </Button>
                </Grid>
            );
        });
    }, [tempDifficulty]);

    return (
        <Grid container spacing={2} justifyContent='center' alignItems="center" >
            <Grid item xs={12}>
                <Typography variant="h3">
                    Pick a difficulty level
                </Typography>
                <Typography variant="h4">
                    Selected: {difficultyOptions.find((option) => option.value === tempDifficulty)?.name || 'None'}
                </Typography>
            </Grid>
            {renderDifficultyOptions()}

            <Grid item xs={6}>
                <Button
                    variant="contained"
                    color="success"
                    href="/game"
                    onClick={() => {
                        if (tempDifficulty) {
                            setSelectedDifficulty(tempDifficulty);
                        }
                    }}
                >
                    Start Game
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button
                    variant="contained"
                    color="primary"
                    href="/"
                >
                    Main Menu
                </Button>
            </Grid>
        </Grid>
    );
};

PickDifficulty.propTypes = {
    selectedDifficulty: propTypes.string,
    setSelectedDifficulty: propTypes.func.isRequired,
};

export default PickDifficulty;