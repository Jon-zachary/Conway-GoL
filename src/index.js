// import "./styles.css";

/**
Create an array of arrays each of equal length that mirrors a matrix.
@function makeGrid
@param {Integer} size - Size of the grid.
@returns {Array} - Each element of the array will be an array of size size.
*/

const makeGrid = (n, inf) => {
  if (inf) {
    const arr = Array.from({ length: n + 2}, () => Array.from({ length: n + 2}));
    return arr;
  }
  const arr = Array.from({ length: n }, () => Array.from({ length: n }));
  return arr;
};

/**
Create a grid of all false values for the initial setup
@function initGrid
@param {Integer} size - Size of the grid.
@returns {Array} - Each element of the array will be an array of size size. Each
element of that array will be false.
*/

const initGrid = (n, inf) => {
  if (inf) {
    const arr = Array.from({ length: n + 2}, () =>
      Array.from({ length: n + 2}, () => false)
    );
    return arr;
  }
  const arr = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => false)
  );
  return arr;
};

/**
Set the value of an element in a grid.
@function setGridValue
@param {Integer} row - The row of the element to be set.
@param {Integer} col - The column of the element to be set.
@param {Boolean} val - The value of the element.
@param {Array} grid - The grid to alter.
*/

const setGridValue = (row, col, val, grid) => {
  grid[row][col] = val;
};

/**
Read the value of an element in a grid. If the value is out of bounds returns undefined.
@function getGridValue
@param {integer} row - The row of the element to be read.
@param {integer} col - The column of the element to be read.
@param {Array} grid - the grid containing the element to be read.
@returns {Boolean|undefined} - Each element of a gid will be true or false or undefined.
*/

const getGridValue = (row, col, grid) => {
  const val = grid[row] ? grid[row][col] : undefined;
  return val;
};

/**
Check the eight immediate neighbors of a cell and return the number of true cells
@function checkNeighbors
@param {Integer} row - The row of the element to check.
@param {Integer} col - The col of the element to check.
@param {Array} grid - The grid containing the cell.
@returns {Integer} - The number of true neighbors.
*/

const checkNeighbors = (row, col, grid) => {
  const neighbors = [
    getGridValue(row - 1, col - 1, grid),
    getGridValue(row - 1, col, grid),
    getGridValue(row - 1, col + 1, grid),
    getGridValue(row, col - 1, grid),
    getGridValue(row, col + 1, grid),
    getGridValue(row + 1, col - 1, grid),
    getGridValue(row + 1, col, grid),
    getGridValue(row + 1, col + 1, grid)
  ]
    .filter(el => el)
    .reduce((a, b) => a + b, 0);

  return neighbors;
};

/**
Takes a cell and returnd true if it's next state is alive and false otherwise.
@function isLive
@param row {Integer} - row of element.
@param col {Integer} - col of element.
@param grid {Array} - grid containing element.
@return val {Boolean} - the value of the cell in the next state.
*/

const isLive = (row, col, grid) => {
  const currentVal = getGridValue(row, col, grid);
  const neighborVal = checkNeighbors(row, col, grid);
  if (currentVal) {
    if (neighborVal < 2) return false;
    if (neighborVal === 2 || neighborVal === 3) return true;
    if (neighborVal > 3) return false;
  } else {
    if (neighborVal === 3) return true;
    else return false;
  }
};

/**
map through the current grid applying isLive and return the new grid.
@function nextGrid
@param grid {Array} - the current grid
@return {Array} - the new grid
*/

const nextGrid = grid => {
  const newGrid = grid.map((row, i) => {
    return row.map((col, j) => {
      return isLive(i, j, grid);
    });
  });
  return newGrid;
};

/**
Flatten grid. Non-recursively flatten 2D array. Assumes all els are arrays and
no nested arrays inside.
@function flattenGrid
@param grid {Array} - the grid to be flattend.
@return {Array} - Array of non-array values.
*/

const flatten = arr => {
  const res = arr.reduce((a, b) => {
    return [...a, ...b];
  }, []);
  return res;
};

/**
Check to see if two grids are equal
@function isEqual
@param grid1 {Array} - first grid to compare.
@param grid2 {Array} - other grid to compare.
@return {Boolean} - true iff all elements of grid 1 equal all elements of grid 2
*/

const isEqual = (grid1, grid2) => {
  const flatGrid1 = flatten(grid1);
  const flatGrid2 = flatten(grid2);
  let res = true;
  flatGrid1.forEach((el, i) => {
    if (el !== flatGrid2[i]) res = false;
  });
  return res;
};

/**
Checks to see if a cell is on an edge. Returns true if it is, false otherwise.
@function isEdge
@param row {Integer} - cell row.
@param col {Integer} - cell col.
@param grid {Array} - grid of cell.
@return {Boolean} - true if cell is on an edge false otherwise.
*/

const isEdge = (row, col, grid) => {
  const size = grid.length - 1;
  return (row > size - 2 || col > size - 2 || row < 0 + 2 || col < 0 + 2);
}

export {
  isEqual,
  flatten,
  initGrid,
  nextGrid,
  isLive,
  makeGrid,
  setGridValue,
  getGridValue,
  checkNeighbors,
  isEdge,
};
