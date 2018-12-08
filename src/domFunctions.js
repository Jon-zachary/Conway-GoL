import {
  initGrid,
  nextGrid,
  isLive,
  makeGrid,
  setGridValue,
  getGridValue,
  checkNeighbors,
  flatten,
  isEqual,
} from "./index.js";
import "./styles.css";

// Global objects to be refrenced throughout script.
const globals = {
  size: 10,
  grid: initGrid(10),
  intId: null,
  speed: 200,
  iterations: 0
};

/**
Checks to see if the current grid is the same as the previous grid if so, stops
@function isFinished
@param grid {Array}
@return {Boolean} - true if the grid is unchanged under transformation.
*/

const isFinished = grid => {
  if (isEqual(grid, nextGrid(grid))) {
    window.clearInterval(globals.intId);
  }
};

/**
Applies next grid function to current grid in global, removes current dom grid
and replaces it with rendred new grid.
@function updateDom
*/

const updateDom = () => {
  isFinished(globals.grid);
  const newGrid = nextGrid(globals.grid);
  globals.grid = newGrid;
  document.querySelector(".grid-wrapper").remove();
  const iter = document.querySelector("iter-counter");
  document.querySelector(".iter-counter").innerHTML = `${globals.iterations}
  <p class="iter-title">Generations</p>`;
  const newDomGrid = renderGrid(newGrid);
  document.body.appendChild(newDomGrid);
  globals.iterations += 1;
};

/**
Click handler that clears both the global grid array and it's dom representation
@function handleClearClick
@param e {Event}
*/

const handleClearClick = e => {
  e.preventDefault();
  window.clearInterval(globals.intId);
  const newGrid = initGrid(globals.size);
  globals.grid = newGrid;
  document.querySelector(".grid-wrapper").remove();
  globals.iterations = 0;
  document.querySelector(".iter-counter").innerHTML = `${globals.iterations}`+ '<p class="iter-title">Generations</p>'
  const newDomGrid = renderGrid(newGrid);
  document.body.appendChild(newDomGrid);
};

/**
Click handler that calls updateDom in a setInterval and sets the intervalId to
a global so that it can be stopped later. The interval timeout is set to a global
@function handleStartClick
@param e {Event}
*/

const handleStartClick = e => {
  e.preventDefault();
  globals.intId = window.setInterval(updateDom, globals.speed);
};

/**
Click handler that clears the interval from the handleStartClick
@function handleStopClick
@param e {Event}
*/

const handleStopClick = e => {
  window.clearInterval(globals.intId);
};

/**
Click handler that changes the state of a cell both in the grid object in globals
and in the dom by toggling a live class.
@function handleCellClick
@param e {Event}
*/

const handleCellClick = e => {
  e.preventDefault();
  const { row, col } = e.target.dataset;
  const val = getGridValue(row, col, globals.grid);
  setGridValue(row, col, !val, globals.grid);
  e.target.classList.toggle("live");
};

/**
Click handler that applies a single update to the grid.
@handleNextClick
@param e {Event}
*/

const handleNextClick = e => {
  e.preventDefault();
  updateDom();
};

/**
Event handler that gets the value of the range slider and sets the resolution of
the grid accordingly. It also set's the size to global so it can be used by CSS
@function handleResRange
@param e {Event}
*/

const handleResRange = e => {
  e.preventDefault();
  globals.size = e.target.value;
  document.querySelector(".grid-wrapper").remove();
  const grid = initGrid(e.target.value);
  globals.grid = grid;
  const domGrid = renderGrid(grid);
  document.body.appendChild(domGrid);
};

/**
Event handler that handles the speed slider. Sets the global speed which is used
in the set interval.
@function handleSpeedRange
@param e {Event}
*/

const handleSpeedRange = e => {
  e.preventDefault();
  window.clearInterval(globals.intId);
  globals.speed = e.target.value;
  if (globals.iterations > 0) {
    globals.intId = window.setInterval(updateDom, globals.speed);
  }
};

/**
Renders a grid from the make makeGrid function with cells given class live or dead
sets the propert '--res' on html so that it can be used as a CSS variable. creates
data attributes row and col on each cell and uses them to get the value of the cell
and add the class live if needed.
@function renderGrid
@param grid {Array} - a grid from etiher the makeGrid or nextGrid functions.
@return {HTMLnodeList} - div containg the children divs from the grid.
*/

const renderGrid = grid => {
  const res = grid.length;
  document.querySelector("html").style.setProperty("--res", res);
  const parent = document.createElement("div");
  parent.className = "grid-wrapper";
  grid.forEach((row, i) => {
    row.forEach((col, j) => {
      const cell = document.createElement("div");
      cell.className = "grid-cell";
      cell.dataset.row = i;
      cell.dataset.col = j;
      if (getGridValue(cell.dataset.row, cell.dataset.col, grid)) {
        cell.classList.add("live");
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
@returns {HTMLElement}
*/

const renderSizeSlider = max => {
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
  slider.onchange = handleResRange;
  sliderWrapper.appendChild(slider);
  sliderWrapper.appendChild(label);
  sliderWrapper.className = "size-slider";
  return sliderWrapper;
};
/**
Creates a speed slider that controls the delay in the set interval
@function renderSpeedSlider
@param max {Integer} - maximum value the slider can take.
@returns {HTMLElement}
*/
const renderSpeedSlider = max => {
  const speedSliderWrapper = document.createElement("div");
  const slider = document.createElement("input");
  const label = document.createElement("label");
  label.setAttribute("for", "speed");
  label.textContent = "Speed";
  slider.setAttribute("type", "range");
  slider.setAttribute("name", "speed");
  slider.setAttribute("min", `${max}`);
  slider.setAttribute("max", "1000");
  slider.setAttribute("value", "500");
  slider.style.direction = "rtl";
  slider.onchange = handleSpeedRange;
  speedSliderWrapper.appendChild(slider);
  speedSliderWrapper.appendChild(label);
  speedSliderWrapper.className = "speed-slider";
  return speedSliderWrapper;
};

/**
Creates next button
@function renderNextButton
@return {HTMLElement}
*/

const renderNextButton = () => {
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.onclick = handleNextClick;
  return nextButton;
};

/**
Creates start button
@function renderStartButton
@return {HTMLElement}
*/

const renderStartButton = () => {
  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.onclick = handleStartClick;
  return startButton;
};

/**
Creates stop button
@function renderStopButton
@return {HTMLElement}
*/

const renderStopButton = () => {
  const stopButton = document.createElement("button");
  stopButton.textContent = "Stop";
  stopButton.onclick = handleStopClick;
  return stopButton;
};

/**
Creates clear button
@function renderClearButton
@return {HTMLElement}
*/

const renderClearButton = () => {
  const clearButton = document.createElement("button");
  clearButton.textContent = "Clear";
  clearButton.onclick = handleClearClick;
  return clearButton;
};

const renderIterCounter = () => {
  const iterTitle = document.createElement("p");
  const iterCounter = document.createElement("div");
  iterTitle.className = "iter-title";
  iterTitle.textContent = "Generations";
  iterCounter.className = "iter-counter";
  iterCounter.textContent = globals.iterations;
  iterCounter.appendChild(iterTitle);
  return iterCounter;
};

const renderHeader = () => {
  const header = document.createElement("header");
  header.className = "header";
  header.textContent = "Conway's Game Of Life";
  return header;
};

// appends Dom nodes to body.
const buttonWrapper = document.createElement("div");
buttonWrapper.className = "button-wrapper";
const sliderWrapper = document.createElement("div");
sliderWrapper.className = "slider-wrapper";
// sliders
sliderWrapper.appendChild(renderSpeedSlider(50));
sliderWrapper.appendChild(renderSizeSlider(30));
// buttons
buttonWrapper.appendChild(renderStartButton());
buttonWrapper.appendChild(renderStopButton());
buttonWrapper.appendChild(renderNextButton());
buttonWrapper.appendChild(renderClearButton());
// main grid
document.body.appendChild(renderHeader());
document.body.appendChild(renderIterCounter());
document.body.appendChild(renderGrid(initGrid(globals.size)));
document.body.appendChild(buttonWrapper);
document.body.appendChild(sliderWrapper);
