        import React from "react";
        import { Grid, Button, Typography, Slider, Box} from "@mui/material";

        function valuetext(value) {
            return `${value}°C`;
        }

        const Settings = (props) => {
            const [checked, setChecked] = React.useState(false); 
            function handleChange(e) {
                setChecked(e.target.checked);
            }
            return (
                <>
                <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
                    <Typography variant="h2" component="div" gutterBottom>
                        Settings
                    </Typography>

                    <Typography variant="h5" component="div" align='center'>
                        Master Volume
                    </Typography>

                    <Box sx={{ width: 300}}>
                        <Slider
                            aria-label="Master Volume"
                            defaultValue={30}
                            getAriaValueText={valuetext}
                            step={1}
                            marks
                            min={0}
                            max={100}
                            valueLabelDisplay="auto"
                        />
                    </Box>
                        
                    <Typography variant="h5" component="div" align='center'>
                        Music
                    </Typography>

                    <Box sx={{ width: 300}}>
                    <Slider
                        aria-label="Music"
                        defaultValue={30}
                        getAriaValueText={valuetext}
                        step={1}
                        marks
                        min={0}
                        max={100}
                        valueLabelDisplay="auto"
                    />
                    </Box>

                    <Typography variant="h5" component="div" align='center'>
                        Effects
                    </Typography>

                    <Box sx={{ width: 300}}>
                    <Slider
                        aria-label="Effects"
                        defaultValue={30}
                        getAriaValueText={valuetext}
                        step={1}
                        marks
                        min={0}
                        max={100}
                        valueLabelDisplay="auto"
                    />
                    </Box>   

                    <Typography variant="h5" component="div" align='center'>
                        Gameplay 
                    </Typography> 

                    <Typography variant="body1" component="div" align='center'>
                        Grid Hit: 'red' Grid Miss: 'white' Grid Blank: 'blue'
                    </Typography> 

                    <Typography variant="body1" component="div" align='center'>
                        Autosave? <input value = "test" type = "checkbox" onChange = {handleChange} /> Enable Animation?   <input value = "test" type = "checkbox" onChange = {handleChange}/>
                    </Typography>

                    <Button variant="contained"  align='center' href="/">Back to main menu</Button>

                </Grid>
                </>
            );
        };

        export default Settings;
