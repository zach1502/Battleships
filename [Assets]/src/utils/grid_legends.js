import {Typography} from "@mui/material";

const shipPlacingLegend = {
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
  },
  "battleship": {
    displayType: "color",
    color: "blue",
    image: null,
    icon: <Typography>B</Typography>,
  },
  "cruiser": {
    displayType: "color",
    color: "purple",
    image: null,
    icon: <Typography>Cr</Typography>,
  },
  "submarine": {
    displayType: "color",
    color: "indigo",
    image: null,
    icon: <Typography>S</Typography>,
  },
  "destroyer": {
    displayType: "color",
    color: "black",
    image: null,
    icon: <Typography>D</Typography>,
  },
};

const battleGridLegend = {
  null: {
    displayType: "color",
    color: "lightblue",
    image: null,
    icon: null,
  },
  "miss": {
    displayType: "color",
    color: "white",
    image: null,
    icon: <Typography color={'black'}>M</Typography>,
  },
  "hit": {
    displayType: "color",
    color: "red",
    image: null,
    icon: <Typography>H</Typography>,
  },
};

const shipGridLegend = {
  ...shipPlacingLegend,
  ...battleGridLegend,
};

export {
  shipPlacingLegend,
  battleGridLegend,
  shipGridLegend,
};