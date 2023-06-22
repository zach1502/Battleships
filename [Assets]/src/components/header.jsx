import React from "react";
import { Typography, Toolbar, Grid} from "@mui/material";

const Header = (props) => {
    return (
        <>
            <Toolbar disableGutters>
                <Grid container spacing={2} justifyContent="flex-start" alignItems="center">
                    <Grid item>
                        <Typography variant="h2" component="div">
                            LOGO
                        </Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </>
    );
};

export default Header;