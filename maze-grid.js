class MazeGrid {
    constructor(rows, cols) {
        this._rows = rows;
        this._cols = cols;
        this._cells = [[], []];

        this.reset();
    }

    reset() {
        for(let row = 0; row < this._rows; row++) {
            this._cells[row] = [];
            for(let col = 0; col < this._cols; col++){
                this._cells[row][col] = 0b1111;
            }
        }
    }

    get rows() {
        return this._rows;
    }

    get cols() {
        return this._cols;
    }

    get cells() {
        return this._cells;
    }

    isValid(row, col) {
        return row >= 0 && row < this._rows && col >= 0 && col < this._cols;
    }

    hasMask(row, col, mask) {
        return (this._cells[row][col] & mask) === mask;
    }

    mask(row, col, mask) {
        this._cells[row][col] |= mask;
    }

    clear(row, col, mask) {
        this._cells[row][col] &= ~mask;
    }
}

module.exports = {
    MazeGrid
};