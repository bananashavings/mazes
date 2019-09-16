const {MazeGenerator, Directions} = require("../maze-generator");

class KruskalGenerator extends MazeGenerator {
  constructor(maze) {
    super(maze, {}, (cell) => {
      cell["group"] = new Group();
    });

    this.cells = [];
  }

  init() {
    for (let row = 0; row < this.maze.rows; row++) {
      for (let col = 0; col < this.maze.cols; col++) {
        let dirs = ["E", "S"];
        this.shuffle(dirs);

        this.cells[row * this.maze.cols + col] = {
          row: row,
          col: col,
          dirs: dirs,
        };
      }
    }

    this.shuffle(this.cells);
  }

  step() {
    if (this.cells.length > 0) {
      const current = this.cells.pop();
      const dir = current.dirs.pop();

      if (dir) {
        const rx = current.row + Directions[dir][0];
        const cx = current.col + Directions[dir][1];

        if (this.isValid(rx, cx)) {
          if (!this.getCell(current.row, current.col)["group"].equals(this.getCell(rx, cx)["group"])) {
            this.getCell(rx, cx)["group"].parent = this.getCell(current.row, current.col)["group"];
            this.join(current.row, current.col, dir);
          }
        }
      }

      return false;
    } else {
      return true;
    }
  }
}

class Group {
  constructor() {
    this.parent = null;
  }

  get masterGroup() {
    return this.parent ? this.parent.masterGroup : this;
  }

  equals(group) {
    return this.masterGroup === group.masterGroup;
  }
}

module.exports = {
  KruskalGenerator
};