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
};

export { 
    INITIAL_GAME_STATE,
    DEFAULT_SETTINGS,
};
  