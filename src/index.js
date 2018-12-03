// import "./styles.css";

/**
Create an array of arrays each of equal length that mirrors a matrix.
@function makeGrid
@param {Integer} size - Size of the grid.
@returns {Array} Each element of the array will be an array of size size.
*/
const makeGrid = (n) => {
  const arr = Array.from({ length: n}, () => Array.from({ length: n}));
  return arr;
}

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
}

/**
Read the value of an element in a grid. If the value is out of bounds returns undefined.
@function getGridValue
@param {integer} row - The row of the element to be read.
@param {integer} col - The column of the element to be read.
@param {Array} grid - the grid to read.
@returns {Boolean|undefined} Each element of a gid will be true or false or undefined.
*/
const getGridValue = (row, col, grid) => {
  const val = (grid[row]) ? grid[row][col] : undefined;
  return val;
}


module.exports = {
  makeGrid,
  setGridValue,
  getGridValue,
}
