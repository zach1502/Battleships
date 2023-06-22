import React from "react";
import { Button, Typography, Grid } from "@mui/material";
import GridTile from "./grid_tile.jsx";

const SelectionGrid = (props) => {
  const grid = props.grid;
  const legend = props.legend;
  const selectedSquare = props.selectedSquare;
  const setSelectedSquare = props.setSelectedSquare;

  console.log(selectedSquare)

  /*
    grid should be an array of arrays of strings, where each string is a key in the legend
  */

  /*
    legend should be an array of objects with the following properties:
    {
      key: ""
      displayType: "what to show in the square when the key matches" -> "color" | "image"
      color: "iff displayType is color" -> "some color"
      image: "iff displayType is image" -> "some image link"
    }
  */

  return (
    <>
      <Typography variant="h2" component="div" gutterBottom>
        Selection Grid
      </Typography>

      <GridTile
        displayType={"color"}
        color={"red"}
        image={undefined}
        setSelectedSquare={setSelectedSquare}
        row={0}
        col={0}
        size={1}
      />
    </>
  );
};

export default SelectionGrid;