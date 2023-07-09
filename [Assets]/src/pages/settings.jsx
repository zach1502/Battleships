import React from "react";
import { Grid, Button, Typography} from "@mui/material";
import { Slider } from "../components/general/slider";

function valuetext(value) {
  return `${value}°C`;
}

const Settings = (props) => {

  const [checked, setChecked] = React.useState(false);

  const settings = props.settings;
  const setSettings = props.setSettings;

  console.log("Settings:", settings);

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
          <Slider
            label="Master Volume"
            value={settings.masterVolume}
            setValue={(value) => {
              setSettings({
                ...settings,
                masterVolume: value,
              });
            }}
            min={0}
            max={100}
            step={1}
            defaultValue={30}
          />
        </Grid>

        <Grid item xs={12} align='center'>
          <Slider
            label="Music Volume"
            value={settings.musicVolume}
            setValue={(value) => {
              setSettings({
                ...settings,
                musicVolume: value,
              });
            }}
            min={0}
            max={100}
            step={1}
            defaultValue={30}
          />
        </Grid>

        <Grid item xs={12} align='center'>
          <Slider
            label="Effects Volume"
            value={settings.sfxVolume}
            setValue={(value) => {
              setSettings({
                ...settings,
                sfxVolume: value,
              });
            }}
            min={0}
            max={100}
            step={1}
            defaultValue={30}
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