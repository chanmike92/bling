import Snake from './snake.js';

class Board {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.snake = new Snake(this);
  }

  static blankGrid(dimensions) {
    const grid = [];

    for (let i = 0; i < dimensions; i++) {
      const row = [];
      for (let j = 0; j < dimensions; j++) {
        row.push(Board.BLANK_SYMBOL);
      }
      grid.push(row);
    }

    return grid;
  }

  render() {
    const grid = Board.blankGrid(this.dimensions);

    this.snake.segments.forEach( segment => {
      grid[segment.i][segment.j] = Snake.SYMBOL;
    });

    grid[this.apple.position.i][this.apple.position.j] = Apple.SYMBOL;

    const rowStrs = [];
    grid.map( row => row.join("") ).join("\n");
  }

  validPosition(coord) {
    return (coord.i >= 0) && (coord.i < this.dimensions) &&
      (coord.j >= 0) && (coord.j < this.dimensions);
  }
}

Board.BLANK_SYMBOL = ".";

module.exports = Board;
