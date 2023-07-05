import React from "react";
import propTypes from "prop-types";

import { Button, Typography, Grid } from "@mui/material";
import GridTile from "./grid_tile.jsx";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const SelectionGrid = (props) => {
  const grid = props.grid;
  const legend = props.legend;
  const selectedSquare = props.selectedSquare;
  const setSelectedSquare = props.setSelectedSquare;
  const squareSize = props.squareSize;
  const squareSpacing = props.squareSpacing;
  
  const disableGridMarkers = props.disableGridMarkers;
  const disableClick = props.disableClick;
  const onClick = props.onClick;

  const placeholderMarker = (
    <Grid item>
      <Typography
        sx={{fontSize: `${squareSize}rem`,textAlign: "center",width: `${squareSize}rem`,marginRight: '1rem'}}>
        {" "}
      </Typography>
    </Grid>
  )

  const columnMarkers = [placeholderMarker];
  const rowMarkers = [];
  if (!disableGridMarkers) {
    for (let i = 0; i < grid[0].length; i++) {
      columnMarkers.push(
        <Grid item key={'col'+i}>
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
    for (let i = 0; i < grid.length; i++) {
      rowMarkers.push(
        <Grid item key={'row'+i}>
          <Typography
            sx={{
              fontSize: `${squareSize}rem`,
              textAlign: "center",
              width: `${squareSize}rem`,
              height: `${squareSize}rem`,
              lineHeight: 1,
              marginRight: '1rem',
            }}
          >
            {i + 1}
          </Typography>
        </Grid>
      );
    }
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
        icon:  "iff displayType is color" -> "add some icon"
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
                  <Grid item key={item.key}>
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

                    const isSelectedSquare = selectedSquare && (selectedSquare.row === rowIndex && selectedSquare.col === colIndex);

                    const color = (isSelectedSquare) ? 'orange' : legendItem.color;
                    const image = legendItem.image;
                    const displayType = legendItem.displayType;
                    const icon = (isSelectedSquare) ? <CheckBoxOutlineBlankIcon/>: legendItem.icon;

                    return (
                      <Grid item key={colIndex}>
                        <GridTile
                          displayType={displayType}
                          color={color}
                          image={image}
                          icon={icon}
                          size={squareSize}
                          onClick={() => {
                            if (disableClick) return;

                            // deselect if already selected
                            if (isSelectedSquare) {
                              setSelectedSquare(null);
                            } else {
                              setSelectedSquare({
                                row: rowIndex,
                                col: colIndex,
                              });

                              onClick(rowIndex, colIndex);
                            }
                          }}
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

SelectionGrid.propTypes = {
  grid: propTypes.arrayOf(propTypes.arrayOf(propTypes.string)).isRequired,
  legend: propTypes.object.isRequired,
  selectedSquare: propTypes.object,
  setSelectedSquare: propTypes.func,
  squareSize: propTypes.number.isRequired,
  squareSpacing: propTypes.number.isRequired,
  disableGridMarkers: propTypes.bool,
  disableClick: propTypes.bool,
  onClick: propTypes.func,
};

export default SelectionGrid;