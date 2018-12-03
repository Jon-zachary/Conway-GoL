const {
  makeGrid,
  setGridValue,
  getGridValue,
  checkNeighbors
} = require("../src/index.js");

describe("makeGrid", () => {
  test("makeGrid returns an array", () => {
    const grid = makeGrid(2);
    expect(grid).toBeInstanceOf(Array);
  });

  test("makeGrid returns an array of length n", () => {
    const grid = makeGrid(2);
    expect(grid).toHaveLength(2);
  });

  test("makeGrid returns array of arrays of length n", () => {
    const grid = makeGrid(2);
    grid.forEach(el => {
      expect(el).toBeInstanceOf(Array);
      expect(el).toHaveLength(2);
    });
  });
});

describe("setGridValue", () => {
  test("sets the grid value given coordinates", () => {
    const grid = makeGrid(2);
    setGridValue(0, 0, false, grid);
    expect(grid[0][0]).toBe(false);
  });
});

describe("getGridValue", () => {
  test("returns grid val at coords", () => {
    const grid = makeGrid(2);
    setGridValue(0, 0, false, grid);
    setGridValue(1, 1, true, grid);
    expect(getGridValue(0, 0, grid)).toBe(false);
    expect(getGridValue(1, 1, grid)).toBe(true);
    expect(getGridValue(0, 1, grid)).toBe(undefined);
  });
  test("returns undefined if either index is out of range", () => {
    const grid = makeGrid(2);
    expect(getGridValue(2, 0, grid)).toBe(undefined);
    expect(getGridValue(0, 2, grid)).toBe(undefined);
  });
});

describe("checkNeighbors", () => {
  test("returns number of live neighbors", () => {
    let grid = makeGrid(3).map(el => el.map(el => false));
    expect(checkNeighbors(1, 1, grid)).toBe(0);
    expect(checkNeighbors(2, 1, grid)).toBe(0);
    grid = makeGrid(3).map(el => el.map(el => true));
    expect(checkNeighbors(1, 1, grid)).toBe(8);
    expect(checkNeighbors(0, 0, grid)).toBe(3);
    expect(checkNeighbors(2, 1, grid)).toBe(5);
  });
});
