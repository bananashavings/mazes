const { MazeGrid } = require("./maze-grid");

class Maze {
    constructor(rows, cols, generator) {
        this._grid = new MazeGrid(rows, cols);
        this._generator = new generator(this._grid);
    }

    get grid() {
        return this._grid.cells;
    }

    step() {
        this._generator.generate();
    }

    run() {
        while(this._generator.generate()) {}
    }

    reset() {
        this._generator.reset();
    }
}

module.exports = {
    Maze
};