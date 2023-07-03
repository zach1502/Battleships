import React from "react";
import { Button } from "@mui/material";

const GridTile = (props) => {
  const displayType = props.displayType;
  const color = props.color;
  const image = props.image;
  const setSelectedSquare = props.setSelectedSquare;
  const row = props.row;
  const col = props.col;
  const size = props.size;

  switch (displayType) {
    case "color":
      return (
        <Button
          variant="contained"
          style={{backgroundColor: color}}
          onClick={() => setSelectedSquare({
            row: row,
            col: col,
          })}
          sx={{
            width: `${size}rem`,
            height: `${size}rem`,
            padding: 0,
            minWidth: 0,
            borderRadius: 0,
          }}
        />
      );
    case "image":
      return (
        <Button
          variant="contained"
          style={{backgroundImage: `url(${image})`}}
          onClick={() => setSelectedSquare({
            row: row,
            col: col,
          })}
        />
      );
    default:
      return null;
  }
};

export default GridTile;