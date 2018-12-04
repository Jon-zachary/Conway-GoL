import {
  initGrid,
  nextGrid,
  isLive,
  makeGrid,
  setGridValue,
  getGridValue,
  checkNeighbors
} from "./index.js";

// Global objects to be refrenced throughout script.
const globals = {
  size: 10,
  grid: initGrid(10),
  intId: null,
  speed: 500,
}

/**
Applies next grid function to current grid in global, removes current dom grid
and replaces it with rendred new grid.
@function updateDom
*/

const updateDom = () => {
  const newGrid = nextGrid(globals.grid);
  globals.grid = newGrid;
  document.querySelector('.grid-wrapper').remove();
  const newDomGrid = renderGrid(newGrid);
  document.body.appendChild(newDomGrid);
}

/**
Click handler that clears both the global grid array and it's dom representation
@function handleClearClick
@param e {Event}
*/

const handleClearClick = (e) => {
  e.preventDefault();
  const newGrid = initGrid(globals.size);
  globals.grid = newGrid;
  document.querySelector('.grid-wrapper').remove();
  const newDomGrid = renderGrid(newGrid);
  document.body.appendChild(newDomGrid);
}

/**
Click handler that calls updateDom in a setInterval and sets the intervalId to
a global so that it can be stopped later. The interval timeout is set to a global
@function handleStartClick
@param e {Event}
*/

const handleStartClick = (e) => {
  e.preventDefault();
  let loop = globals.loop
  globals.intId = window.setInterval(updateDom, globals.speed);
}

/**
Click handler that clears the interval from the handleStartClick
@function handleStopClick
@param e {Event}
*/

const handleStopClick = (e) => {
  window.clearInterval(globals.intId);
}

/**
Click handler that changes the state of a cell both in the grid object in globals
and in the dom by toggling a live class.
@function handleCellClick
@param e {Event}
*/

const handleCellClick = (e) => {
  e.preventDefault();
  const {row, col} = e.target.dataset;
  setGridValue(row, col, true, globals.grid);
  e.target.classList.toggle('live')
}

/**
Click handler that applies a single update to the grid.
@handleNextClick
@param e {Event}
*/

const handleNextClick = (e) => {
  e.preventDefault();
  updateDom();
}

/**
Event handler that gets the value of the range slider and sets the resolution of
the grid accordingly. It also set's the size to global so it can be used by CSS
@function handleRange
@param e {Event}
*/

const handleRange = (e) => {
  e.preventDefault();
  globals.size = e.target.value;
  document.querySelector('.grid-wrapper').remove();
  const grid = initGrid(e.target.value);
  globals.grid = grid;
  const domGrid = renderGrid(grid);
  document.body.appendChild(domGrid);
}

/**
Renders a grid from the make makeGrid function with cells given class live or dead
sets the propert '--size' on html so that it can be used as a CSS variable. creates
data attributes row and col on each cell and uses them to get the value of the cell
and add the class live if needed.
@function renderGrid
@param grid {Array} - a grid from etiher the makeGrid or nextGrid functions.
@return {HTMLnodeList} - div containg the children divs from the grid.
*/

const renderGrid = grid => {
  const size = grid.length;
  document.querySelector("html").style.setProperty("--size", size);
  const parent = document.createElement("div");
  parent.className = "grid-wrapper";
  grid.forEach((row, i) => {
    row.forEach((col, j) => {
      const cell = document.createElement("div");
      cell.className = "grid-cell";
      cell.dataset.row = i;
      cell.dataset.col = j;
      if (getGridValue(cell.dataset.row, cell.dataset.col, grid)) {
        cell.classList.add('live');
      }
      parent.appendChild(cell);
    });
  });
  parent.onclick = handleCellClick;
  return parent;
};

/**
Creates a range slider for the Resolution
@function renderSizeSlider
@param max {Integer} - maximum value the slider can take.
@returns {Dom element}
*/
const renderSizeSlider = (max) => {
  const sliderWrapper = document.createElement("div");
  const slider = document.createElement("input");
  const label = document.createElement("label");
  label.setAttribute("for", "resolution");
  label.textContent = "Resolution";
  slider.setAttribute("type", "range");
  slider.setAttribute("name", "resolution");
  slider.setAttribute("min", "5");
  slider.setAttribute("max", `${max}`);
  slider.setAttribute("value", "5");
  slider.onchange = handleRange;
  sliderWrapper.appendChild(slider);
  sliderWrapper.appendChild(label);
  return sliderWrapper;
};

/**
Creates next button
@function renderNextButton
@return {Dom element}
*/

const renderNextButton = () => {
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.onclick = handleNextClick;
  return nextButton;
}

/**
Creates start button
@function renderStartButton
@return {Dom element}
*/

const renderStartButton = () => {
  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.onclick = handleStartClick;
  return startButton;
}

/**
Creates stop button
@function renderStopButton
@return {Dom element}
*/

const renderStopButton = () => {
  const stopButton = document.createElement("button");
  stopButton.textContent = "Stop";
  stopButton.onclick = handleStopClick;
  return stopButton;
}

/**
Creates clear button
@function renderClearButton
@return {Dom element}
*/

const renderClearButton = () => {
  const clearButton = document.createElement("button");
  clearButton.textContent = "Clear";
  clearButton.onclick = handleClearClick;
  return clearButton;
}


// appends Dom nodes to body.
document.body.appendChild(renderSizeSlider(30));
document.body.appendChild(renderStartButton());
document.body.appendChild(renderClearButton());
document.body.appendChild(renderStopButton());
document.body.appendChild(renderNextButton());
document.body.appendChild(renderGrid(initGrid(globals.size)));
