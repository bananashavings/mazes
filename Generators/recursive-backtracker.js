const Generator = require("../maze-generator");

class RecursiveBacktrackerGenerator extends Generator.MazeGenerator {
    constructor(grid) {
        super(grid);

        this._stack = [];
        this.initialize();
    }

    initialize() {
        const startRow = Math.floor(Math.random() * this._grid.rows);
        const startCol = Math.floor(Math.random() * this._grid.cols);

        this.appendStack(startRow, startCol);
    }

    generate() {
        if(this._stack.length > 0) {
            const current = this._stack[this._stack.length - 1];
            const dir = current.dirs.pop();

            if(dir) {
                const rx = current.row + Generator.Directions[dir][0];
                const cx = current.col + Generator.Directions[dir][1];

                if (this._grid.isValid(rx, cx)) {
                    if (!this._grid.hasMask(rx, cx, Generator.Mask.V)) {
                        this.join(current.row, current.col, dir);
                        this.appendStack(rx, cx);
                    }
                }
            } else {
                this._stack.pop();
            }

            return true;
        } else {
            return false;
        }
    }

    appendStack(row, col) {
        let dirs = ["N", "E", "S", "W"];
        this.shuffle(dirs);
        this._stack.push({
            row: row,
            col: col,
            dirs: dirs
        });

        this._grid.mask(row, col, Generator.Mask.V);
    }
}

module.exports = {
    RecursiveBacktrackerGenerator
};