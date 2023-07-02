import React from "react";

import { Select, MenuItem, FormHelperText, FormControl, InputLabel } from "@mui/material";

const DropdownSelect = (props) => {
  const value = props.value;
  const setValue = props.setValue;
  const helperText = props.helperText;
  const label = props.label;

  const values = props.values;

  return (
    <FormControl>
      <InputLabel>
        {label}
      </InputLabel>
      <Select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label={label}
      >
        {values.map((value) => {
          return (
            <MenuItem value={value} key={value}> {value} </MenuItem>
          )
        })}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
};

export default DropdownSelect;