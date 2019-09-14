class MazeGenerator {
    constructor(grid) {
        this._grid = grid;
    }

    generate() {
        throw "Abstract method generate not implemented";
    };

    join(row, col, dir, reflection = false) {
        if (reflection) {
            this._grid.clear(row, col, Mask[dir]);
        } else {
            this._grid.clear(row, col, Mask[dir]);
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
    N: "S", // Opposite Of North
    E: "W", // Opposite Of East
    S: "N", // Opposite Of South
    W: "E"  // Opposite Of West
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