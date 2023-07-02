const createGrid = (size) => {
    const grid = [];
    for (let i = 0; i < size; i++) {
        grid.push([]);
        for (let j = 0; j < size; j++) {
            grid[i].push(null);
        }
    }
    return grid;
};

export default createGrid;