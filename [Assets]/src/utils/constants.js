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
};

export { 
    INITIAL_GAME_STATE,
    DEFAULT_SETTINGS,
};
  