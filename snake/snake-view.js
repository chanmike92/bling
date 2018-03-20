const Board = require('./board.js');
import $b from '../lib/main.js';

class View {
  constructor($b(el)) {
    this.$b(el) = $b(el);

    this.board = new Board(20);
    this.setupGrid();

    this.intervalId = window.setInterval(
      this.step.bind(this),
      View.STEP_MILLIS
    );

    $b(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  handleKeyEvent(event) {
    if (View.KEYS[event.keyCode]) {
      this.board.snake.turn(View.KEYS[event.keyCode]);
    }
  }

  render() {
    this.updateClasses(this.board.snake.segments, "snake");
    this.updateClasses([this.board.apple.position], "apple");
  }

  updateClasses(coords, className) {
    this.$b(li).filter(`.${className}`).removeClass();

    coords.forEach( coord => {
      const flatCoord = (coord.i * this.board.dimensions) + coord.j;
      this.$b(li).eq(flatCoord).addClass(className);
    });
  }

  setupGrid() {
    let html = "";

    for (let i = 0; i < this.board.dimensions; i++) {
      html += "<ul>";
      for (let j = 0; j < this.board.dimensions; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }

    this.$el.html(html);
    this.$li = this.$el.find("li");
  }

  step() {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.render();
    } else {
      alert("You lose!");
      window.clearInterval(this.intervalId);
    }
  }

}

View.KEYS = {
  38: "N",
  39: "E",
  40: "S",
  37: "W"
};

View.STEP_MILLIS = 100;

module.exports = View;
