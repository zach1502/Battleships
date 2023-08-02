const INITIAL_GAME_STATE = {
  playerTurn: true,
  gameOver: false,
  playerWon: null,
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
  masterVolume: 50,
  musicVolume: 30,
  sfxVolume: 30,
  gridHitColor: "#ff0000",
  gridMissColor: "#ffffff",
  gridBlankColor: "#add8e6",
  enableAnimation: true,
  difficulty: null,
};


// AI related constants
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

const NATURAL_BIAS_GRID = [
  [5, 4, 3, 2, 2, 2, 2, 3, 4, 5],
  [4, 3, 2, 1, 1, 1, 1, 2, 3, 4],
  [3, 2, 1, 0, 0, 0, 0, 1, 2, 3],
  [2, 1, 0, 0, 0, 0, 0, 0, 1, 2],
  [2, 1, 0, 0, 0, 0, 0, 0, 1, 2],
  [2, 1, 0, 0, 0, 0, 0, 0, 1, 2],
  [2, 1, 0, 0, 0, 0, 0, 0, 1, 2],
  [3, 2, 1, 0, 0, 0, 0, 1, 2, 3],
  [4, 3, 2, 1, 1, 1, 1, 2, 3, 4],
  [5, 4, 3, 2, 2, 2, 2, 3, 4, 5]
];

const TIPS = [
  "Tip: Try to spread your ships out in the game grid.",
  "Tip: Don't forget you can place your ships vertically.",
  "Tip: Remember the sizes of each ship type! Bigger ships are easier to hit.",
  "Tip: Try to make your ship placement unpredictable. Don't cluster your ships too close together.",
  "Tip: Pay attention to the patterns of your opponent's moves.",
  "Tip: Try to cover the maximum area with your shots.",
  "Tip: Save your shots once you've found a ship, and try to determine its direction.",
  "Tip: Smaller ships are harder to find, consider taking them out first.",
  "Tip: If you're unsure where to shoot next, try to hit the center of the board. It's the most likely spot to hit a ship.",
  "Tip: Use a random strategy at the beginning of the game and switch to a systematic one once you've found a ship.",
  "Tip: Be aware of the 'hit and miss' data. This can guide you where to place your shots.",
  "Tip: Practice makes perfect - play often to improve your strategic thinking.",
  "Tip: Learn from your losses. Analyzing what went wrong can help you improve for the next game.",
  "Tip: The corners are often the least hit spots, consider placing a ship there.",
  "Tip: Don't place too many of your ships at the edges of the board.",
  "Easter Egg: CLICK ME FOR AN ACHIEVEMENT!",
];

const STATUS_MESSAGES = [
  "Buying ships...",
  "Preparing crew...",
  "Loading cannons...",
  "Hoisting sails...",
  "Raising anchor...",
  "Almost there...",
  "Ready to set sail!"
];


export {
  INITIAL_GAME_STATE,
  DEFAULT_SETTINGS,
  AI_STATES,
  DEFAULT_SEEK_AND_HUNT_STATE,
  NATURAL_BIAS_GRID,
  TIPS,
  STATUS_MESSAGES
};
