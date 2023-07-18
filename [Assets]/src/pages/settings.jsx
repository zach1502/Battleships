import React from "react";
import { Grid, Button, Typography, Checkbox} from "@mui/material";
import { Slider, ColorPicker } from "../components/general";

const Settings = (props) => {
  const settings = props.settings;
  const setSettings = props.setSettings;

  return (
    <>
      <Grid container direction="row" justifyContent="flex-start" alignItems="center">
        <Grid item xs={12} align='center'>
          <Typography variant="h2" component="div">
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
        
        {/* color pickers */}
        <Grid item xs={4} align='center'>
          <ColorPicker
            color={settings.gridHitColor}
            setColor={(color) => {
              setSettings({
                ...settings,
                gridHitColor: color,
              });
            }}
            label={"  Grid Hit Color"}
          />
        </Grid>
        <Grid item xs={4} align='center'>
          <ColorPicker
            color={settings.gridMissColor}
            setColor={(color) => {
              setSettings({
                ...settings,
                gridMissColor: color,
              });
            }}
            label={" Grid Miss Color"}
          />
        </Grid>
        <Grid item xs={4} align='center'>
          <ColorPicker
            color={settings.gridBlankColor}
            setColor={(color) => {
              setSettings({
                ...settings,
                gridBlankColor: color,
              });
            }}
            label={"Grid Blank Color"}
          />
        </Grid>

        <Grid item xs={12} align='center'>
          <Typography variant="body1" component="div" align='center'>
            Enable Animation?
            <Checkbox
              checked={settings.enableAnimation}
              onChange={(event) => {
                setSettings({
                  ...settings,
                  enableAnimation: event.target.checked,
                });
              }}
              inputProps={{ 'aria-label': 'controlled' }}
            />
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