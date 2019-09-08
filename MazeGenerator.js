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

class MazeGenerator extends MazeGrid {
    constructor(rows, cols) {
        super(rows, cols);
    }

    generate() {};

    join(row, col, dir, reflection = false) {
        if (reflection) {
            this.clear(row, col, Mask[dir]);
            // } else if (this.isValid(row + Directions[dir][0], col + Directions[dir][1])) {
        } else {
            this.clear(row, col, Mask[dir]);
            this.join(row + Directions[dir][0], col + Directions[dir][1], Opposites[dir], true);
        }
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
}

const Directions = {
    N: [-1,  0], // North
    E: [ 0,  1], // East
    S: [ 1,  0], // South
    W: [ 0, -1]  // West
};

const Opposites = {
    N: 'S', // Opposite Of North
    E: 'W', // Opposite Of East
    S: 'N', // Opposite Of South
    W: 'E'  // Opposite Of West
};

const Mask = {
    N: 0b00001,
    E: 0b00010,
    S: 0b00100,
    W: 0b01000,
    V: 0b10000
};

module.exports = {
    MazeGenerator,
    Directions,
    Mask
};