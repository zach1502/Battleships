import React from "react";
import { Button, Typography } from "@mui/material";

const Settings = (props) => {
    return (
        <>
            <Typography variant="h2" component="div" gutterBottom>
                Settings
            </Typography>

            <Typography variant="body1" component="div" gutterBottom>
                This is the settings page.
            </Typography>
            <Typography variant="body1" component="div" gutterBottom>
                Insert settings here. Make sure it auto saves or something.
            </Typography>

            <Button variant="contained" href="/">Back to main menu</Button>
        </>
    );
};

export default Settings;