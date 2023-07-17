const makeRandomShot = (enemyBattleGrid, setEnemyBattleGrid, playerShipGrid) => {
  let possibleShots = [];

  for(let i = 0; i < enemyBattleGrid.length; i++) {
    for(let j = 0; j < enemyBattleGrid[i].length; j++) {
      if (enemyBattleGrid[i][j] === null) {
        possibleShots.push([i, j]);
      }
    }
  }

  if (possibleShots.length === 0) return;
  
  const randomIndex = Math.floor(Math.random() * possibleShots.length);
  const [row, col] = possibleShots[randomIndex];

  possibleShots.splice(randomIndex, 1);

  const shotResult = playerShipGrid[row][col] !== null ? "hit" : "miss";

  // Update enemy battle grid
  const newEnemyBattleGrid = [...enemyBattleGrid];
  newEnemyBattleGrid[row][col] = shotResult;
  setEnemyBattleGrid(newEnemyBattleGrid);

  return shotResult;
}

export default makeRandomShot;
