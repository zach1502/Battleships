const initializeGrid = (rows, cols, defaultValue = 0) => Array(rows).fill().map(() => Array(cols).fill(defaultValue));
const isValidCoordinate = (x, y, grid) => x >= 0 && y >= 0 && x < grid.length && y < grid[0].length;
const getRemainingShips = (grid) => {
  const remainingShips = new Set();
  grid.forEach(row => 
    row.forEach(cell => {
      if(cell && cell !== CONFIG.CELL_HIT && cell !== CONFIG.CELL_MISS) {
        remainingShips.add(cell);
      }
    })
  );
  return Array.from(remainingShips);
};

const performShot = (shotPosition, enemyBattleGrid, setEnemyBattleGrid, playerShipGrid) => {
  if (!shotPosition) return {shotResult: CONFIG.CELL_MISS, newEnemyBattleGrid: enemyBattleGrid};
  const row = shotPosition[0];
  const col = shotPosition[1];

  const shotResult = playerShipGrid[row][col] !== null ? CONFIG.CELL_HIT : CONFIG.CELL_MISS;

  // Update enemy battle grid
  const newEnemyBattleGrid = [...enemyBattleGrid];
  newEnemyBattleGrid[row][col] = shotResult;
  setEnemyBattleGrid(newEnemyBattleGrid);

  return { shotResult, newEnemyBattleGrid };
};

const CONFIG = {
  DIRECTIONS: [[0, 1], [1, 0], [0, -1], [-1, 0]], // Right, Down, Left, Up
  HORIZONTAL: [[0, 1], [0, -1]], // Right, Left
  VERTICAL: [[1, 0], [-1, 0]], // Down, Up
  CELL_HIT: 'hit',
  CELL_MISS: 'miss',
  DEFAULT_MODIFIER: 0,
  HIT_MODIFIER: 10,
  ADJACENT_HIT_MODIFIER: 20,
  ODDS_OF_CHEATING: 0.10,
  ORIGINAL_SHIP_SIZES: {
    'carrier': 5,
    'battleship': 4,
    'cruiser': 3,
    'submarine': 3,
    'destroyer': 2,
  }
};

export {
  initializeGrid,
  isValidCoordinate,
  getRemainingShips,
  CONFIG,
  performShot
}
