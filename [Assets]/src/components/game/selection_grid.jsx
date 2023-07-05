import React from "react";
import propTypes from "prop-types";

import { Button, Typography, Grid } from "@mui/material";
import GridTile from "./grid_tile.jsx";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const PlaceholderMarker = ({ squareSize }) => (
  <Grid item>
    <Typography sx={{fontSize: `${squareSize}rem`,textAlign: "center",width: `${squareSize}rem`,marginRight: '1rem'}}>
      {" "}
    </Typography>
  </Grid>
)

const ColumnMarker = ({ index, squareSize }) => (
  <Grid item key={`col${index}`}>
    <Typography
      sx={{fontSize: `${squareSize}rem`,textAlign: "center",width: `${squareSize}rem`}}
    >
      {String.fromCharCode(65 + index)}
    </Typography>
  </Grid>
)

const RowMarker = ({ index, squareSize }) => (
  <Grid item key={`row${index}`}>
    <Typography
      sx={{fontSize: `${squareSize}rem`,textAlign: "center",width: `${squareSize}rem`,height: `${squareSize}rem`,lineHeight: 1,marginRight: '1rem'}}
    >
      {index + 1}
    </Typography>
  </Grid>
)

const SelectionGrid = (props) => {
  const { grid, legend, selectedSquare, setSelectedSquare, squareSize, squareSpacing, disableGridMarkers, disableClick, onClick } = props;
  
  const placeholderMarker = <PlaceholderMarker squareSize={squareSize} />
  const columnMarkers = !disableGridMarkers ? [placeholderMarker, ...grid[0].map((_, i) => <ColumnMarker index={i} squareSize={squareSize} />)] : [];
  const rowMarkers = !disableGridMarkers ? grid.map((_, i) => <RowMarker index={i} squareSize={squareSize} />) : [];

  return (
    <>
      <Grid container spacing={squareSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={squareSpacing}>
            {columnMarkers}
          </Grid>
        </Grid>
        {
          grid.map((row, rowIndex) => (
            <Grid item xs={12} key={rowIndex}>
              <Grid container spacing={squareSpacing}>
                {rowMarkers[rowIndex]}
                {row.map((gridItem, colIndex) => {
                  const legendItem = legend[gridItem];
                  const isSelectedSquare = selectedSquare && (selectedSquare.row === rowIndex && selectedSquare.col === colIndex);
                  const color = isSelectedSquare ? 'orange' : legendItem.color;
                  const icon = isSelectedSquare ? <CheckBoxOutlineBlankIcon/> : legendItem.icon;
                  
                  return (
                    <Grid item key={colIndex}>
                      <GridTile
                        displayType={legendItem.displayType}
                        color={color}
                        image={legendItem.image}
                        icon={icon}
                        size={squareSize}
                        onClick={() => {
                          if (disableClick) return;

                          isSelectedSquare ? setSelectedSquare(null) : setSelectedSquare({ row: rowIndex, col: colIndex });
                          onClick(rowIndex, colIndex);
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          ))
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
