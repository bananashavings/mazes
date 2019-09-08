const Generator = require('../MazeGenerator');

module.exports = class RecursiveBacktrackerGenerator extends Generator.MazeGenerator {
    constructor(rows, cols) {
        super(rows, cols);

        this._stack = [];
        this.initialize();
    }

    initialize() {
        const startRow = Math.floor(Math.random() * this._rows);
        const startCol = Math.floor(Math.random() * this._cols);

        this.appendStack(startRow, startCol);
    }

    generate() {
        if(this._stack.length > 0) {
            const current = this._stack[this._stack.length - 1];
            const dir = current.dirs.pop();

            if(!dir) {
                this._stack.pop();
                return true;
            }

            const rx = current.row + Generator.Directions[dir][0];
            const cx = current.col + Generator.Directions[dir][1];

            if(this.isValid(rx, cx)) {
                if(!this.hasMask(rx, cx, Generator.Mask.V)) {
                    this.join(current.row, current.col, dir);
                    this.appendStack(rx, cx);
                }
            }

            return true;
        } else {
            return false;
        }
    }

    appendStack(row, col) {
        let dirs = ['N', 'E', 'S', 'W'];
        this.shuffle(dirs);
        this._stack.push({
            row: row,
            col: col,
            dirs: dirs
        });

        this.mask(row, col, Generator.Mask.V);
    }
};