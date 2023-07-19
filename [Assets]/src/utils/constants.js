const INITIAL_GAME_STATE = {
  playerTurn: true,
  gameOver: false,
  winner: null,
  playerReadyToPlay: false,
  allPlayerShipsPlaced: false,
  playerShipsPlaced: {
    carrier: false,
    battleship: false,
    cruiser: false,
    submarine: false,
    destroyer: false,
  },
};

const DEFAULT_SETTINGS = {
  gridSize: 10,
  masterVolume: 30,
  musicVolume: 30,
  sfxVolume: 30,
  gridHitColor: "#ff0000",
  gridMissColor: "#ffffff",
  gridBlankColor: "#add8e6",
  enableAnimation: true,
  difficulty: null,
};

const AI_STATES = {
  seek: "seek",
  hunt: "hunt",
};

const DEFAULT_SEEK_AND_HUNT_STATE = {
  currentAIState: AI_STATES.seek,
  lastHitPosition: null,
  targetDirections: [[-1, 0], [1, 0], [0, -1], [0, 1]],  // Up, Down, Left, Right
  toTryPositions: [],
  smallestShipSize: 2,
  remainingShipLengths: {
    "carrier": 5,
    "battleship": 4,
    "cruiser": 3,
    "submarine": 3,
    "destroyer": 2,
  }
};


export {
  INITIAL_GAME_STATE,
  DEFAULT_SETTINGS,
  AI_STATES,
  DEFAULT_SEEK_AND_HUNT_STATE,
};
