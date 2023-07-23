import React from 'react'
import { CompactPicker  } from 'react-color';
import { Button, Grid } from "@mui/material";

const ColorPicker = (props) => {
  const color = props.color;
  const setColor = props.setColor;

  const label = props.label || "Color Picker";

  function getTextColor(color) {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} align='center'>
        {label + ": "}
        <Button
          style={{ backgroundColor: color }}
          sx={{
            color: getTextColor(color),
            border: 1,
          }}
        >
          {color}
        </Button>
      </Grid>
      <Grid item xs={12} align='center'>
        <CompactPicker
          color={color}
          onChange={
            (color) => setColor(color.hex)
          }
        />
      </Grid>
    </Grid>
  );
}

export default ColorPicker;