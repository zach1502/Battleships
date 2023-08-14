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

const DIRECTIONS = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};

const DEFAULT_SETTINGS = {
  gridSize: 10,
  masterVolume: 50,
  musicVolume: 30,
  sfxVolume: 30,
  gridHitColor: '#ff0000',
  gridMissColor: '#ffffff',
  gridBlankColor: '#add8e6',
  minimizeAnimations: false,
  difficulty: null,
};


// AI related constants
const AI_STATES = {
  seek: 'seek',
  hunt: 'hunt',
};

const DEFAULT_SEEK_AND_HUNT_STATE = {
  currentAIState: AI_STATES.seek,
  lastHitPosition: null,
  targetDirections: [[-1, 0], [1, 0], [0, -1], [0, 1]],  // Up, Down, Left, Right
  toTryPositions: [],
  smallestShipSize: 2,
  remainingShipLengths: {
    'carrier': 5,
    'battleship': 4,
    'cruiser': 3,
    'submarine': 3,
    'destroyer': 2,
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
  'Tip: Try to spread your ships out in the game grid.',
  'Tip: Don\'t forget you can place your ships vertically.',
  'Tip: Remember the sizes of each ship type! Bigger ships are easier to hit.',
  'Tip: Try to make your ship placement unpredictable. Don\'t cluster your ships too close together.',
  'Tip: Pay attention to the patterns of your opponent\'s moves.',
  'Tip: Try to cover the maximum area with your shots.',
  'Tip: Save your shots once you\'ve found a ship, and try to determine its direction.',
  'Tip: Smaller ships are harder to find, consider taking them out first.',
  'Tip: If you\'re unsure where to shoot next, try to hit the center of the board. It\'s the most likely spot to hit a ship.',
  'Tip: Use a random strategy at the beginning of the game and switch to a systematic one once you\'ve found a ship.',
  'Tip: Be aware of the \'hit and miss\' data. This can guide you where to place your shots.',
  'Tip: Practice makes perfect - play often to improve your strategic thinking.',
  'Tip: Learn from your losses. Analyzing what went wrong can help you improve for the next game.',
  'Tip: The corners are often the least hit spots, consider placing a ship there.',
  'Tip: Don\'t place too many of your ships at the edges of the board.',
  'Easter Egg: CLICK ME FOR AN ACHIEVEMENT!',
];

const STATUS_MESSAGES = [
  'Buying ships...',
  'Preparing crew...',
  'Loading cannons...',
  'Hoisting sails...',
  'Raising anchor...',
  'Almost there...',
  'Ready to set sail!'
];

const SHIP_PLACING_HELP = [
  {
    title: 'Select A Ship',
    content: `Use the 'Ship' dropdown to select the type of ship you want to place on the grid. The ships are the same as the original 1990 version of the game.`,
  },
  {
    title: 'Rotate Ship',
    content: `Use the 'Rotate' button to change the orientation of the ship. The default orientation is horizontal.`,
  },
  {
    title: 'Select A Square',
    content: `Click on a square in the grid where you want to place the selected ship. The ship will take up a number of squares extending from the selected square in the chosen orientation. \n\nIf a ship is already placed and you click on a square, it will attempt to move the ship to that square.`
  },
  {
    title: 'Place Ship',
    content: `If the ship fits in the chosen location without overlapping another ship or going outside the grid, it will appear on the grid. If it doesn't fit, try selecting a different square or changing the ship's orientation.`
  },
  {
    title: 'Clear Placement',
    content: `If you want to clear the placement of your ships, click the 'Clear Ships' button to remove all ships from the grid and start over.`
  },
  {
    title: 'Ready To Play?',
    content: `Once you are satisfied with the placement of all your ships, click the 'Ready?' button to start the game.`,
  },
];

const GAMEPLAY_HELP = [
  {
    title: 'Goal of the Game',
    content: `The goal of the game is to destroy all enemy ships before your opponent does the same to you. Each player starts with a fleet of ships placed on their own grid. On each turn, a player can launch an attack on the opponent's grid, aiming to hit and sink their ships. The game continues until one player's entire fleet is sunk.`,
  },
  {
    title: 'Ships Grid (Left)',
    content: 'The Ships Grid on the left side of the screen represents your fleet. It displays the position of your ships and the status of each ship segment (either intact or hit). Your opponent\'s attacks will be marked on this grid so you can see all their shots.',
  },
  {
    title: 'Attack Grid (Right)',
    content: 'The Attack Grid on the right side of the screen represents your opponent\'s grid where you launch your attacks. It shows the result of your past attacks (hits or misses) and helps you strategize your future moves. When you hit an enemy ship, it will be marked on this grid.',
  },
  {
    title: 'Game Log',
    content: 'The Game Log at the bottom of the screen displays the history of your attacks and your opponent\'s attacks. It shows the result of each attack (hit or miss) and the position of the attack on the grid.',
  },
  {
    title: 'Forfeit',
    content: 'If you wish to forfeit the game, you can click the Forfeit button at the bottom of the screen. This will end the game and return you to the Main Menu. The game will be counted as a loss.',
  },
  {
    title: 'Saving and Loading',
    content: 'This is done automatically. You can close the game at any time and your progress will be saved. When you return to the game, you will be able to continue where you left off.'
  }
];

const SHOT_RESULT_MESSAGES = {
  'hit': 'Hit!',
  'miss': 'Miss!'
};


export {
  INITIAL_GAME_STATE,
  DEFAULT_SETTINGS,
  AI_STATES,
  DEFAULT_SEEK_AND_HUNT_STATE,
  NATURAL_BIAS_GRID,
  TIPS,
  STATUS_MESSAGES,
  SHIP_PLACING_HELP,
  GAMEPLAY_HELP,
  SHOT_RESULT_MESSAGES,
  DIRECTIONS,
};
