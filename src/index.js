// import "./styles.css";

/**
Create an array of arrays each of equal length that mirrors a matrix.
@function makeGrid
@param {Integer} size - Size of the grid.
@returns {Array} - Each element of the array will be an array of size size.
*/
const makeGrid = n => {
  const arr = Array.from({ length: n }, () => Array.from({ length: n }));
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

module.exports = {
  makeGrid,
  setGridValue,
  getGridValue,
  checkNeighbors
};
