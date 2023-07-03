import React from "react";

import { Grid, Button, Box, Typography } from "@mui/material";
import RotateRightIcon from '@mui/icons-material/RotateRight';
import DeleteIcon from '@mui/icons-material/Delete';

import DropdownSelect from "../../components/general/dropdown_select";
import SelectionGrid from "../../components/game/selection_grid";

import createGrid from "../../utils/create_grid";

const PlaceShips = (props) => {
  const [selectedShip, setSelectedShip] = React.useState('carrier');
  const [shipOrientation, setShipOrientation] = React.useState('horizontal');
  const [selectedSquare, setSelectedSquare] = React.useState(null); // [row, col]

  const gameState = props.gameState;
  const playerShipGrid = props.playerShipGrid;
  const setPlayerShipGrid = props.setPlayerShipGrid;

  console.log(gameState);

  const legend = {
    null: {
      displayType: "color",
      color: "lightblue",
      image: null,
      icon: null,
    },
    "carrier": {
      displayType: "color",
      color: "green",
      image: null,
      icon: <Typography>C</Typography>, 
    }
  };

  const ships = [
    'carrier',
    'battleship',
    'cruiser',
    'submarine',
    'destroyer'
  ];

  return (
    <>
      <Grid 
        container 
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <SelectionGrid
            grid={playerShipGrid}
            onClick={()=>{
              // Ship placing logic here
            }}
            selectedSquare={selectedSquare}
            setSelectedSquare={setSelectedSquare}
            legend={legend}
            squareSize={4}
            squareSpacing={0.5}
          />
        </Grid>

        <Grid item xs={4}>
          <DropdownSelect
            value={selectedShip}
            setValue={setSelectedShip}
            label="Ship"
            helperText="Select a ship to place"
            values={ships}
          />
        </Grid>
        <Grid item xs={4}>
            <Button
              variant="contained"
              startIcon={<RotateRightIcon />}
              onClick={() => setShipOrientation(shipOrientation === "horizontal" ? "vertical" : "horizontal")}
            >
              {shipOrientation}
            </Button>
        </Grid>
        <Grid item xs={4}>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={() => {
                setPlayerShipGrid(createGrid(8));
                setSelectedSquare(null);
              }}
            >
              {"Clear Ships"}
            </Button>
        </Grid>
      </Grid>
    </>
  )
};

export default PlaceShips;