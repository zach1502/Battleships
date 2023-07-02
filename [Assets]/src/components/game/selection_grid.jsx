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
    legend should be an object of objects with the following properties:
    {
      "key": {
        displayType: "what to show in the square when the key matches" -> "color" | "image"
        color: "iff displayType is color" -> "some color"
        image: "iff displayType is image" -> "some image link"
      }
    }
  */

  return (
    <>
      <Grid container spacing={0}>
        {
          grid.map((row, rowIndex) => {
            return (
              <Grid item xs={12} key={rowIndex}>
                {row.map((gridItem, colIndex) => {
                  // look ups
                  // const legendItem = legend.find((item) => item.key === col);
                  const legendItem = legend[gridItem];

                  const color = legendItem.color;
                  const image = legendItem.image;
                  const displayType = legendItem.displayType;

                  return (
                  <GridTile
                    displayType={displayType}
                    color={color}
                    image={image}
                    setSelectedSquare={setSelectedSquare}
                    row={rowIndex}
                    col={colIndex}
                    size={2}
                  />);
                })}
              </Grid>
            );
          })
        }
      </Grid>
    </>
  );
};

export default SelectionGrid;