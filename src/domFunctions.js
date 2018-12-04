import {
  initGrid,
  nextGrid,
  isLive,
  makeGrid,
  setGridValue,
  getGridValue,
  checkNeighbors
} from "./index.js";

console.log("is this thing on?");
/**
Renders a grid from the make makeGrid function with cells given class live or dead
@function renderGrid
@param grid {Array} - a grid from etiher the makeGrid or nextGrid functions.
@return {HTMLnode} - div containg the children divs from the grid.
*/
const renderGrid = grid => {
  const size = grid.length;
  const parent = document.createElement("div");
  parent.dataset.size = size;
  parent.className = "grid-wrapper";
  grid.forEach((row, i) => {
    row.forEach((col, j) => {
      const cell = document.createElement("div");
      cell.className = "grid-cell";
      cell.dataset.row = i;
      cell.dataset.col = j;
      parent.appendChild(cell);
    });
  });
  return parent;
};

const grid = initGrid(10);

document.body.appendChild(renderGrid(grid));
