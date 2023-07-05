const makeRandomShot = (enemyBattleGrid, setEnemyBattleGrid, playerBattleGrid, playerShipGrid, setGameState, gameState) => {
  let row;
  let col;

  // terrible random shot logic, but simple.
  do {
    row = Math.floor(Math.random() * playerBattleGrid.length);
    col = Math.floor(Math.random() * playerBattleGrid[0].length);
  } while (enemyBattleGrid[row][col] !== null);

  const shotResult = playerShipGrid[row][col] !== null ? "hit" : "miss";

  // update enemy battle grid
  const newEnemyBattleGrid = [...enemyBattleGrid];
  newEnemyBattleGrid[row][col] = shotResult;
  setEnemyBattleGrid(newEnemyBattleGrid);

  // flip turn
  const newState = { ...gameState, playerTurn: true };
  setGameState(newState);
}

export {
  makeRandomShot,
};
