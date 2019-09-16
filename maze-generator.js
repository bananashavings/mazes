/**
 * Class representing a maze generator.
 *
 * @abstract
 */
class MazeGenerator {
  /**
   * Creates a new maze generator.
   *
   * @constructor
   * @param {Object} maze - Maze object to manipulate.
   * @param {Object} [cellData] - Additional data to store in each cell.
   * @param {function} [callback] - Function to be executed when a cell is initialized.
   */
  constructor(maze, cellData = {}, callback) {
    this.maze = maze;
    this.cellData = {
      N: true,
      E: true,
      S: true,
      W: true,
      ...cellData
    };

    this.callback = callback;
    /**
     * TODO:
     * Work on callback shit
     */
  }

  /**
   * Performed once before any generation has occurred.
   *
   * @abstract
   */
  init() {
    throw "Abstract method init not implemented";
  }

  /**
   * Performs a single step of maze generation.
   *
   * @abstract
   */
  step() {
    throw "Abstract method generate not implemented";
  };

  /**
   * Joins two adjacent cells.
   *
   * @param {number} row - Row of the cell.
   * @param {number} col - Column of the cell.
   * @param {string} dir - Direction of the wall to remove.
   * @param {boolean} [reflection=false] - Specifies if the adjacent cell's wall needs to be removed
   */
  join(row, col, dir, reflection = false) {
    if (reflection) {
      this.getCell(row, col)[dir] = false;
    } else {
      this.getCell(row, col)[dir] = false;
      this.join(row + Directions[dir][0], col + Directions[dir][1], Opposites[dir], true);
    }
  }

  /**
   * Returns whether a cell at given coordinates is within the maze's bounds.
   *
   * @param {number} row - Row of the cell.
   * @param {number} col - Column of the cell.
   * @returns {boolean} - If the cell is within the maze's bounds.
   */
  isValid(row, col) {
    return row >= 0 && row < this.maze.rows && col >= 0 && col < this.maze.cols;
  }

  /**
   * Returns the cell at given coordinates.
   *
   * @param {number} row - Row of the cell.
   * @param {number} col - Column of the cell.
   * @returns {Object} - The cell at given coordinates.
   */
  getCell(row, col) {
    return this.maze.grid[row][col];
  }

  /**
   * Shuffles an array.
   *
   * @param {[]} array - Array to shuffle
   */
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
}

/**
 * An object which contains the possible directions for a maze cell.
 * Each direction contains its corresponding coordinate offset.
 */
const Directions = {
  N: [-1, 0], // North
  E: [0, 1],  // East
  S: [1, 0],  // South
  W: [0, -1]  // West
};

/*
 * An object which contains the opposites direction of each direction.
 * Each direction contains the {string} value of its opposite.
 */
const Opposites = {
  N: "S", // Opposite Of North
  E: "W", // Opposite Of East
  S: "N", // Opposite Of South
  W: "E"  // Opposite Of West
};

module.exports = {
  MazeGenerator,
  Directions,
  Opposites
};