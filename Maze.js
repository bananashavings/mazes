const RecursiveBacktrackerGenerator = require('./Generators/RecursiveBacktracker');

class Maze {
    constructor(rows, cols, generator) {
        this._generator = new generator(rows, cols);
        this._running = false;

        this.run();

        const cells = this._generator.cells;

        // cells.forEach(row => {
        //     let formatted = '';
        //     row.forEach(col => {
        //         formatted += col.toString(2);
        //         if(!((col & 1) === 1)) {
        //             formatted += 'N';
        //         }
        //         if(!((col & 2) === 2)) {
        //             formatted += 'E';
        //         }
        //         if(!((col & 4) === 4)) {
        //             formatted += 'S';
        //         }
        //         if(!((col & 8) === 8)) {
        //             formatted += 'W';
        //         }
        //         formatted += "|";
        //     });
        //     console.log(formatted)
        // })
    }

    step() {
        this._generator.generate();
    }

    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    run() {
        while(this._generator.generate()) {}
    }

    reset() {
        this._generator.reset();
    }
}

let m = new Maze(3000, 3000, RecursiveBacktrackerGenerator);