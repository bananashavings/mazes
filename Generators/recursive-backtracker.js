const {MazeGenerator, Directions} = require("../maze-generator");

class RecursiveBacktrackerGenerator extends MazeGenerator {
  constructor(maze) {
    super(maze, {
      visited: false,
    });

    this.stack = [];
  }

  init() {
    const startRow = Math.floor(Math.random() * this.maze.rows);
    const startCol = Math.floor(Math.random() * this.maze.cols);

    this.appendStack(startRow, startCol);
  }

  step() {
    if (this.stack.length > 0) {
      const current = this.stack[this.stack.length - 1];
      const dir = current.dirs.pop();

      if (dir) {
        const rx = current.row + Directions[dir][0];
        const cx = current.col + Directions[dir][1];

        if (this.isValid(rx, cx)) {
          if (!this.getCell(rx, cx)["visited"]) {
            this.join(current.row, current.col, dir);
            this.appendStack(rx, cx);
          }
        }
      } else {
        this.stack.pop();
      }

      return false;
    } else {
      return true;
    }
  }

  appendStack(row, col) {
    let dirs = ["N", "E", "S", "W"];
    this.shuffle(dirs);

    this.stack.push({
      row: row,
      col: col,
      dirs: dirs
    });

    this.getCell(row, col).visited = true;
  }
}

module.exports = {
  RecursiveBacktrackerGenerator
};