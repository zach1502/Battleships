import React from "react";
import { Grid, Button, Typography, Slider } from "@mui/material";

function valuetext(value) {
  return `${value}°C`;
}

const Settings = (props) => {

  const [checked, setChecked] = React.useState(false);

  const settings = props.settings;
  const setSettings = props.setSettings;

  function handleChange(e) {
    setChecked(e.target.checked);
  }
  return (
    <>
      <Grid container direction="row" justifyContent="flex-start" alignItems="center">
        <Grid item xs={12} align='center'>
          <Typography variant="h2" component="div" gutterBottom>
            Settings
          </Typography>
        </Grid>

        <Grid item xs={12} align='center'>
          <Typography variant="h5" component="div" align='center'>
            Master Volume
          </Typography>
          <Slider sx={{width: 300}}
            aria-label="Master Volume"
            defaultValue={30}
            getAriaValueText={valuetext}
            step={1}
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />
        </Grid>

        <Grid item xs={12} align='center'>
          <Typography variant="h5" component="div" align='center'>
            Music
          </Typography>

          <Slider sx={{width: 300}}
            aria-label="Music"
            defaultValue={30}
            getAriaValueText={valuetext}
            step={1}
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />
        </Grid>

        <Grid item xs={12} align='center'>
          <Typography variant="h5" component="div" align='center'>
            Effects
          </Typography>
          <Slider sx={{width: 300}}
            aria-label="Effects"
            defaultValue={30}
            getAriaValueText={valuetext}
            step={1}
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />
        </Grid>

        <Grid item xs={12} align='center'>
          <Typography variant="h5" component="div" align='center'>
            Gameplay
          </Typography>

          <Typography variant="body1" component="div" align='center'>
            Grid Hit: 'red' Grid Miss: 'white' Grid Blank: 'blue'
          </Typography>
        </Grid>

        <Grid item xs={12} align='center'>
          <Typography variant="body1" component="div" align='center'>
            Autosave? <input value="test" type="checkbox" onChange={handleChange} /> Enable Animation?   <input value="test" type="checkbox" onChange={handleChange} />
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Button variant="contained" align='center' href="/">Back to main menu</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Settings;