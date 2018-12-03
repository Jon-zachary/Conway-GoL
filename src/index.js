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

*/

module.exports = {
  makeGrid,

}
