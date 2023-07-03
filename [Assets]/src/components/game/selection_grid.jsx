import React from "react";
import { Button, Typography, Grid } from "@mui/material";
import GridTile from "./grid_tile.jsx";

const SelectionGrid = (props) => {
  const grid = props.grid;
  const legend = props.legend;
  const selectedSquare = props.selectedSquare;
  const setSelectedSquare = props.setSelectedSquare;
  const squareSize = props.squareSize;
  const squareSpacing = props.squareSpacing;

  console.log(selectedSquare)

  const placeholderMarker = (
    <Grid item key={0}>
      <Typography
        sx={{fontSize: `${squareSize}rem`,textAlign: "center",width: `${squareSize}rem`}}>
        {" "}
      </Typography>
    </Grid>
  )

  const columnMarkers = [placeholderMarker];
  for (let i = 0; i < grid[0].length; i++) {
    columnMarkers.push(
      <Grid item key={i+1}>
        <Typography
          sx={{
            fontSize: `${squareSize}rem`,
            textAlign: "center",
            width: `${squareSize}rem`,
          }}
        >
          {String.fromCharCode(65 + i)}
        </Typography>
      </Grid>
    );
  }

  const rowMarkers = [];
  for (let i = 0; i < grid.length; i++) {
    rowMarkers.push(
      <Grid item key={i}>
        <Typography
          sx={{
            fontSize: `${squareSize}rem`,
            textAlign: "center",
            width: `${squareSize}rem`,
            height: `${squareSize}rem`,
            lineHeight: 1,
          }}
        >
          {i + 1}
        </Typography>
      </Grid>
    );
  }


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
      <Grid container spacing={squareSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={squareSpacing}>
            {columnMarkers.map((item) => {
                return (
                  <Grid item key={item}>
                    {item}
                  </Grid>
                );
            })}
          </Grid>
        </Grid>

        {
          grid.map((row, rowIndex) => {
            return (
              <Grid item xs={12} key={rowIndex}>
                <Grid container spacing={squareSpacing}>
                  <Grid item>
                    {rowMarkers[rowIndex]}
                  </Grid>
                  {row.map((gridItem, colIndex) => {
                    // look ups
                    // const legendItem = legend.find((item) => item.key === col);
                    const legendItem = legend[gridItem];

                    const color = legendItem.color;
                    const image = legendItem.image;
                    const displayType = legendItem.displayType;

                    return (
                      <Grid item key={colIndex}>
                        <GridTile
                          displayType={displayType}
                          color={color}
                          image={image}
                          setSelectedSquare={setSelectedSquare}
                          row={rowIndex}
                          col={colIndex}
                          size={squareSize}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            );
          })
        }
      </Grid>
    </>
  );
};

export default SelectionGrid;