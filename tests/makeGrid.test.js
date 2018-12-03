const makeGrid = require("../src/index.js");

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
