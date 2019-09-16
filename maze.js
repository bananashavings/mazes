const {MazeGenerator} = require("./maze-generator");
const {RecursiveBacktrackerGenerator} = require("./Generators/recursive-backtracker");
const {KruskalGenerator} = require("./Generators/kruskal");
const fs = require("fs");

/**
 * Class representing a maze.
 */
class Maze {
  /**
   * Creates a new maze object.
   *
   * @constructor
   * @param {number=10} [rows] - Maze row count.
   * @param {number=10} [cols] - Maze column count.
   * @param {Class} [generator] - Maze generator class.
   */
  constructor(rows = 10, cols = 10, generator) {
    this.rows = rows;
    this.cols = cols;
    this.grid = [[], []];

    if (MazeGenerator.isPrototypeOf(generator)) {
      this.generator = new generator(this);
      this.reset();
      this.generator.init();
    }
  }

  /**
   * Repopulates the grid with default cell objects.
   */
  reset() {
    for (let row = 0; row < this.rows; row++) {
      this.grid[row] = [];
      for (let col = 0; col < this.cols; col++) {
        this.grid[row][col] = {
          ...this.generator.cellData
        };

        if(this.generator.callback) {
          this.generator.callback(this.grid[row][col]);
        }
      }
    }
  }

  /**
   * Runs a single step of the maze generation.
   */
  step() {
    this.generator.step();
  }

  /**
   * Continuously runs the maze generation.
   */
  run() {
    while (!this.generator.step()) ;
  }

  /**
   * Imports a pre-generated maze.
   *
   * @param {string} path - Path to export JSON file to.
   */
  import(path) {
    const json = JSON.parse(fs.readFileSync(path).toString());

    this.rows = json.rows;
    this.cols = json.cols;
    this.grid = json.grid;
  }

  /**
   * Exports the current maze.
   *
   * @param {string} path - Path to import JSON file from.
   */
  export(path) {
    fs.writeFileSync(path, JSON.stringify({
      rows: this.rows,
      cols: this.cols,
      grid: this.grid,
    }, null, 4));
  }
}

module.exports = {
  Maze
};