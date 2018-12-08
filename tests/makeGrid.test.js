import {
  makeGrid,
  setGridValue,
  getGridValue,
  checkNeighbors,
  isLive,
  nextGrid,
  flatten,
  isEqual
} from "../src/index.js";

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

describe("isLive", () => {
  test("if cell is live and has less that 2 live neighbors returns false", () => {
    const grid = makeGrid(5).map(el => el.map(el => false));
    setGridValue(2, 1, true, grid);
    setGridValue(2, 2, true, grid);
    setGridValue(2, 3, true, grid);
    expect(isLive(2, 0, grid)).toBe(false);
    expect(isLive(2, 1, grid)).toBe(false);
    expect(isLive(2, 4, grid)).toBe(false);
    expect(isLive(0, 0, grid)).toBe(false);
  });
  test("if cell is live and has two or three neighbors it lives on", () => {
    const grid = makeGrid(5).map(el => el.map(el => false));
    setGridValue(2, 1, true, grid);
    setGridValue(2, 2, true, grid);
    setGridValue(2, 3, true, grid);
    expect(isLive(2, 2, grid)).toBe(true);
    setGridValue(1, 2, true, grid);
    expect(isLive(1, 2, grid)).toBe(true);
  });
  test("if cell is live and has more than three neighbors it dies", () => {
    const grid = makeGrid(5).map(el => el.map(el => true));
    expect(isLive(0, 0, grid)).toBe(true);
    expect(isLive(0, 1, grid)).toBe(false);
    expect(isLive(2, 2, grid)).toBe(false);
  });
  test("if cell is dead and has exactly three live neighbors it becomes live", () => {
    const grid = makeGrid(5).map(el => el.map(el => false));
    setGridValue(2, 1, true, grid);
    setGridValue(2, 2, true, grid);
    setGridValue(2, 3, true, grid);
    expect(isLive(1, 2, grid)).toBe(true);
    expect(isLive(3, 2, grid)).toBe(true);
    setGridValue(0, 2, true, grid);
    expect(isLive(1, 2, grid)).toBe(false);
  });
});

describe("nextGrid", () => {
  test("should return an array", () => {
    const grid = makeGrid(5).map(el => el.map(el => false));
    const newGrid = nextGrid(grid);
    expect(newGrid).toBeInstanceOf(Array);
  });
  test("three cell row should become three cel column", () => {
    const grid = makeGrid(5).map(el => el.map(el => false));
    setGridValue(2, 1, true, grid);
    setGridValue(2, 2, true, grid);
    setGridValue(2, 3, true, grid);
    const newGrid = nextGrid(grid);
    expect(getGridValue(1, 2, newGrid)).toBe(true);
    expect(getGridValue(2, 2, newGrid)).toBe(true);
    expect(getGridValue(3, 2, newGrid)).toBe(true);
    expect(getGridValue(2, 1, newGrid)).toBe(false);
    expect(getGridValue(2, 3, newGrid)).toBe(false);
  });
});

describe("flatten", () => {
  test("should return flat array", () => {
    const grid = makeGrid(5).map(el => el.map(el => false));
    const flat = flatten(grid);
    expect(flat).toHaveLength(25);
    flat.forEach(el => {
      expect(el).toBe(false);
    });
  });
});

describe("isEqual", () => {
  test("should return true if elements of grid are same", () => {
    const grid1 = makeGrid(5).map(el => el.map(el => false));
    const grid2 = makeGrid(5).map(el => el.map(el => false));
    expect(isEqual(grid1, grid2)).toBe(true);
  });
  test("should return false if elements of grid are not the same", () => {
    const grid1 = makeGrid(5).map(el => el.map(el => false));
    const grid2 = makeGrid(5).map(el => el.map(el => true));
    expect(isEqual(grid1, grid2)).toBe(false);
  });
});
