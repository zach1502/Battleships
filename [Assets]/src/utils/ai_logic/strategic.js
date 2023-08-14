// DIFFICULTY: MEDIUM

// Initialize the direction as "up"
let direction = "up";

const makeStrategicShot = (enemyBattleGrid, setEnemyBattleGrid, playerShipGrid) => {
    let possibleShots = [];
    for (let i = 0; i < enemyBattleGrid.length; i++) {
        for (let j = 0; j < enemyBattleGrid[i].length; j++) {
            // If a position is empty (not shot before), add it to the possibleShots array
            if (enemyBattleGrid[i][j] === null) {
                possibleShots.push([i, j]);
            }
        }
    }
    let row, col;
    // Check if there is a previously hit block
    const previousHit = findPreviousHit(enemyBattleGrid, direction);
    if (previousHit) {
        // If there is a previous hit, set the row and column to continue in the same direction
        row = previousHit[0];
        col = previousHit[1];
    } else { // If no previous hit in the current direction, choose a random position from possibleShots
         // Enhancing AI's random shots
         const MAX_ITER = 3000;
         let iter = 0;
         let isABadAttempt = true;
         let randomIndex;
         while(iter < MAX_ITER && isABadAttempt){
            iter++;
            randomIndex = Math.floor(Math.random() * possibleShots.length);
            row = possibleShots[randomIndex][0];
            col = possibleShots[randomIndex][1];
            let score = 0;
            // Before iter <= 1000, prioritize attacking grids with no "miss" nearby to speed up the search for ships.
            // After iter > 2000, prevent attacking grids that are completely surrounded by "hit" blocks.
            if(iter < 1000 || iter >= 2000){
                if (row === 0 || (row > 0 && (upBlock(row, col, enemyBattleGrid) === null || upBlock(row, col, enemyBattleGrid) === "hit"))){
                    score++;
                }
                if (row === enemyBattleGrid.length - 1 || (row < enemyBattleGrid.length - 1 && (downBlock(row, col, enemyBattleGrid) === null || downBlock(row, col, enemyBattleGrid) === "hit"))){
                    score++;
                }
                if (col === 0 || (col > 0 && (leftBlock(row, col, enemyBattleGrid) === null || leftBlock(row, col, enemyBattleGrid) === "hit"))){
                    score++;
                }
                if (col === enemyBattleGrid[row].length - 1 || (col < enemyBattleGrid[row].length - 1 && (rightBlock(row, col, enemyBattleGrid) === null || rightBlock(row, col, enemyBattleGrid) === "hit"))){
                    score++;
                }
            }
            // After iter > 1000, prioritize attacking grids surrounding "hit" positions to handle the special case of multiple adjacent ships.
            if(iter >= 1000){
                if(row > 0 && upBlock(row, col, enemyBattleGrid) === "hit"){
                    if ((col > 0 && upLeftBlock(row, col, enemyBattleGrid) === "hit" && col < enemyBattleGrid[row].length - 1 && upRightBlock(row, col, enemyBattleGrid) !== "hit") ||
                    (col < enemyBattleGrid[row].length - 1 && upRightBlock(row, col, enemyBattleGrid) === "hit" && col > 0 && upLeftBlock(row, col, enemyBattleGrid) !== "hit")){
                        score++;
                    }
                }
                if(row < enemyBattleGrid.length - 1 && downBlock(row, col, enemyBattleGrid) === "hit"){
                    if ((col > 0 && downLeftBlock(row, col, enemyBattleGrid) === "hit" && col < enemyBattleGrid[row].length - 1 && downRightBlock(row, col, enemyBattleGrid) !== "hit") ||
                    (col < enemyBattleGrid[row].length - 1 && downRightBlock(row, col, enemyBattleGrid) === "hit" && col > 0 && downLeftBlock(row, col, enemyBattleGrid) !== "hit")){
                        score++;
                    }
                }
                if(col > 0 && leftBlock(row, col, enemyBattleGrid) === "hit"){
                    if ((row > 0 && upLeftBlock(row, col, enemyBattleGrid) === "hit" && row < enemyBattleGrid.length - 1 && downLeftBlock(row, col, enemyBattleGrid) !== "hit") ||
                    (row < enemyBattleGrid.length - 1 && downLeftBlock(row, col, enemyBattleGrid) === "hit" && row > 0 && upLeftBlock(row, col, enemyBattleGrid) !== "hit")){
                        score++;
                    }
                }
                if(col < enemyBattleGrid[row].length - 1 && rightBlock(row, col, enemyBattleGrid) === "hit"){
                    if ((row > 0 && upRightBlock(row, col, enemyBattleGrid) === "hit" && row < enemyBattleGrid.length - 1 && downRightBlock(row, col, enemyBattleGrid) !== "hit") ||
                    (row < enemyBattleGrid.length - 1 && downRightBlock(row, col, enemyBattleGrid) === "hit" && row > 0 && upRightBlock(row, col, enemyBattleGrid) !== "hit")){
                        score++;
                    }
                }
            }
            if (iter < 1000 && score < 4) {
                continue;
            }
            if (iter >= 1000 && score < 1) {
                continue;
            }
            if (iter >= 2000 && score === 4) {
                continue;
            }
            isABadAttempt = false;
         }
        // Remove the selected position from possibleShots array
        possibleShots.splice(randomIndex, 1);
        // Change direction for the next shot
        direction = getNextDirection();
    }

    // Determine if the shot is a "hit" or "miss" on the player's ship grid
    const shotResult = playerShipGrid[row][col] !== null ? "hit" : "miss";

    // Update enemy battle grid
    const newEnemyBattleGrid = [...enemyBattleGrid];
    newEnemyBattleGrid[row][col] = shotResult;
    setEnemyBattleGrid(newEnemyBattleGrid);

    return {shotResult, row, col};
}

const getNextDirection = () => {
    if (direction === "up") {
        return "left";
    } else if (direction === "left") {
        return "down";
    } else if (direction === "down") {
        return "right";
    } else if (direction === "right") {
        return "up";
    }
};

// Helper function to find the previous hit block based on the current direction
const findPreviousHit = (enemyBattleGrid, direction) => {
    for (let i = 0; i < enemyBattleGrid.length; i++) {
        for (let j = 0; j < enemyBattleGrid[i].length; j++) {
            if (enemyBattleGrid[i][j] === "hit") {
                // Check if the previous block exists and is within the grid based on the direction (up)
                if (direction === "up" && i > 0 && upBlock(i, j, enemyBattleGrid) === null) {
                    // Detecte ship's direction to prevent the AI from firing in the wrong direction (left or right)
                    // Also handling situations where multiple warships are positioned adjacent to each other.
                    if ((j > 0 && leftBlock(i, j, enemyBattleGrid) === "hit" && upLeftBlock(i, j, enemyBattleGrid) !== "hit") ||
                        (j < enemyBattleGrid[i].length - 1 && rightBlock(i, j, enemyBattleGrid) === "hit" && upRightBlock(i, j, enemyBattleGrid) !== "hit")) {
                        continue;
                    }
                    return [i - 1, j]; // Return the position of the previous block
                } else if (direction === "down" && i < enemyBattleGrid.length - 1 && downBlock(i, j, enemyBattleGrid) === null) {
                    if (((j > 0 && leftBlock === "hit" && downLeftBlock(i, j, enemyBattleGrid) !== "hit") ||
                        (j < enemyBattleGrid[i].length - 1 && rightBlock(i, j, enemyBattleGrid) === "hit" && downRightBlock(i, j, enemyBattleGrid) !== "hit"))) {
                        continue;
                    }
                    return [i + 1, j];
                } else if (direction === "left" && j > 0 && leftBlock(i, j, enemyBattleGrid) === null) {
                    if (((i > 0 && upBlock(i, j, enemyBattleGrid) === "hit" && upLeftBlock(i, j, enemyBattleGrid) !== "hit") ||
                        (i < enemyBattleGrid.length - 1 && downBlock(i, j, enemyBattleGrid) === "hit" && downLeftBlock(i, j, enemyBattleGrid) !== "hit"))) {
                        continue;
                    }
                    return [i, j - 1];
                } else if (direction === "right" && j < enemyBattleGrid[i].length - 1 && rightBlock(i, j, enemyBattleGrid) === null) {
                    if (((i > 0 && upBlock(i, j, enemyBattleGrid) === "hit" && upRightBlock(i, j, enemyBattleGrid) !== "hit") ||
                        (i < enemyBattleGrid.length - 1 && downBlock(i, j, enemyBattleGrid) === "hit" && downRightBlock(i, j, enemyBattleGrid) !== "hit"))) {
                        continue;
                    }
                    return [i, j + 1];
                }
            }
        }
    }
    // Return null if no previous hit block found
    return null;
};

const upBlock = (i, j, enemyBattleGrid) => {
    return i > 0 ? enemyBattleGrid[i - 1][j] : null; 
}

const downBlock = (i, j, enemyBattleGrid) => {
    return i < enemyBattleGrid.length - 1 ? enemyBattleGrid[i + 1][j] : null;
}

const leftBlock = (i, j, enemyBattleGrid) => {
    return j > 0 ? enemyBattleGrid[i][j - 1] : null;
}

const rightBlock = (i, j, enemyBattleGrid) => {
    return j < enemyBattleGrid[i].length - 1 ? enemyBattleGrid[i][j + 1] : null;
}

const upLeftBlock = (i, j, enemyBattleGrid) => {
    return i > 0 && j > 0 ? enemyBattleGrid[i - 1][j - 1] : null; 
}

const upRightBlock = (i, j, enemyBattleGrid) => {
    return i > 0 && j < enemyBattleGrid[i].length - 1 ? enemyBattleGrid[i - 1][j + 1] : null;
}

const downLeftBlock = (i, j, enemyBattleGrid) => {
    return i < enemyBattleGrid.length - 1 && j > 0 ? enemyBattleGrid[i + 1][j - 1] : null;
}

const downRightBlock = (i, j, enemyBattleGrid) => {
    return i < enemyBattleGrid.length - 1 && j < enemyBattleGrid[i].length - 1 ? enemyBattleGrid[i + 1][j + 1] : null; 
}


export default makeStrategicShot;
