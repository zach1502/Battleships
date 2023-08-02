import React from "react";
import { Typography, Slider, Grid } from "@mui/material";

const CustomSlider = (props) => {
  const value = props.value;
  const setValue = props.setValue;

  const label = props.label || "Slider";

  const min = props.min || 0;
  const max = props.max || 100;
  const step = props.step || 1;
  const defaultValue = props.defaultValue || 30;

  return (
    <>
      <Grid container spacing={2} justifyContent="flex-start" alignItems="center">
        <Grid item xs={12} align='center'>
          <Typography variant="h5" component="div" align='center'>
            {label + ": " + value}
          </Typography>
        </Grid>
        
        <Grid item xs={12} align='center'>
          <Slider sx={{width: 300}}
            value={value}
            onChange={(_, newValue) => {
              setValue(newValue);
            }}
            defaultValue={defaultValue}
            step={step}
            min={min}
            max={max}
            valueLabelDisplay="auto"
            aria-label={label}
            getAriaValueText={(value) => value}
          />
        </Grid>
      </Grid>
    </>
  );

};

export default CustomSlider;