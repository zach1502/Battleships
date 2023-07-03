import React from "react";
import { Button } from "@mui/material";

const GridTile = (props) => {
  const displayType = props.displayType;
  const color = props.color;
  const image = props.image;
  const icon = props.icon;
  const size = props.size;
  const onClick = props.onClick;

  switch (displayType) {
    case "color":
      return (
        <Button
          variant="contained"
          style={{backgroundColor: color}}
          onClick={onClick}
          sx={{
            width: `${size}rem`,
            height: `${size}rem`,
            padding: 0,
            minWidth: 0,
            borderRadius: 0,
          }}
        >
          {icon}
        </Button>
      );
    case "image":
      return (
        <Button
          variant="contained"
          style={{backgroundImage: `url(${image})`}}
          onClick={onClick}
        />
      );
    default:
      return null;
  }
};

export default GridTile;