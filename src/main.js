const canvasElement = document.querySelector("canvas");
const canvasContext = canvasElement.getContext("2d");

const gapX = 10;

const mouse = {
  xPosition: 0,
  yPosition: 0,
};

const field = {
  width: window.innerWidth,
  height: window.innerHeight,

  draw: function () {
    canvasContext.fillStyle = "#286047";
    canvasContext.fillRect(0, 0, this.width, this.height);
  },
};

const line = {
  width: 15,
  height: field.height,

  draw: function () {
    canvasContext.fillStyle = "#eee";
    canvasContext.fillRect(
      field.width / 2 - this.width / 2,
      0,
      this.width,
      field.height
    );
  },
};

const leftPaddle = {
  xPosition: gapX,
  yPosition: 100,
  width: line.width,
  height: 200,

  _move: function () {
    const smoothFactor = 0.1;

    const deltaY = mouse.yPosition - (this.yPosition + this.height / 2);
    this.yPosition += deltaY * smoothFactor;

    this.yPosition = Math.max(
      0,
      Math.min(field.height - this.height, this.yPosition)
    );
  },

  draw: function () {
    canvasContext.fillStyle = "#eee";
    canvasContext.fillRect(
      this.xPosition,
      this.yPosition,
      this.width,
      this.height
    );

    this._move();
  },
};

const rightPaddle = {
  xPosition: field.width - line.width - gapX,
  yPosition: 160,
  width: leftPaddle.width,
  height: leftPaddle.height,
  speed: 5,

  _move: function () {
    const smoothFactor = 0.1;
    const errorFactor = Math.random() > 0.95 ? 0.5 : 1;

    const deltaY = ball.yPosition - (this.yPosition + this.height / 2);
    this.yPosition += deltaY * smoothFactor * errorFactor;

    this.yPosition = Math.max(
      0,
      Math.min(field.height - this.height, this.yPosition)
    );

    this._accelerate();
  },

  _accelerate: function () {
    const accelerationFactor = 0.1;

    this.speed += ball.speed * accelerationFactor;

    const maxSpeed = 15;
    this.speed = Math.min(maxSpeed, this.speed);
  },

  draw: function () {
    canvasContext.fillStyle = "#eee";
    canvasContext.fillRect(
      this.xPosition,
      this.yPosition,
      this.width,
      this.height
    );

    this._move();
  },
};

const score = {
  player: 0,
  computer: 0,

  increasePlayer: function () {
    this.player++;
  },

  increaseComputer: function () {
    this.computer++;
  },

  draw: function () {
    canvasContext.fillStyle = "#eee";
    canvasContext.font = "bold 72px Arial";
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "top";
    canvasContext.fillStyle = "#01341d";
    canvasContext.fillText(this.player, field.width / 4, 50);
    canvasContext.fillText(
      this.computer,
      field.width / 4 + field.width / 2,
      50
    );
  },
};

const ball = {
  xPosition: 300,
  yPosition: 200,
  radius: 20,
  speed: 7,
  directionX: 1,
  directionY: -1,

  _calculatePosition: function () {
    if (
      (this.yPosition < 0 + this.radius && this.directionY < 0) ||
      (this.yPosition > field.height - this.radius && this.directionY > 0)
    ) {
      this._reverseY();
    }

    if (this.xPosition > field.width - this.radius - rightPaddle.width - gapX) {
      if (
        this.yPosition + this.radius > rightPaddle.yPosition &&
        this.yPosition - this.radius <
          rightPaddle.yPosition + rightPaddle.height
      ) {
        this._reverseX();
      } else {
        score.increasePlayer();
        this._scoreChange();
      }
    }

    if (this.xPosition < this.radius + leftPaddle.width + gapX) {
      if (
        this.yPosition + this.radius > leftPaddle.yPosition &&
        this.yPosition - this.radius < leftPaddle.yPosition + leftPaddle.height
      ) {
        this._reverseX();
      } else {
        score.increaseComputer();
        this._scoreChange();
      }
    }
  },

  _reverseX: function () {
    this.directionX *= -1;
  },

  _reverseY: function () {
    this.directionY *= -1;
  },

  _speedUp: function () {
    this.speed += 2;
  },

  _scoreChange: function () {
    this._speedUp();
    this._reverseX();

    this.xPosition = field.width / 2;
    this.yPosition = field.height / 2;

    if (score.player == 5 || score.computer == 5) {
      score.computer = 0;
      score.player = 0;

      this.speed = 5;
    }
  },

  _move: function () {
    this.xPosition += this.directionX * this.speed;
    this.yPosition += this.directionY * this.speed;
  },

  draw: function () {
    canvasContext.fillStyle = "#eee";
    canvasContext.beginPath();
    canvasContext.arc(
      this.xPosition,
      this.yPosition,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    canvasContext.fill();

    this._move();

    this._calculatePosition();
  },
};

function setup() {
  canvasElement.width = canvasContext.width = field.width;
  canvasElement.height = canvasContext.height = field.height;
}

function draw() {
  field.draw();

  line.draw();

  leftPaddle.draw();
  rightPaddle.draw();

  score.draw();

  ball.draw();
}

window.animateFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    }
  );
})();

function main() {
  animateFrame(main);
  draw();
}

setup();
main();

canvasElement.addEventListener("mousemove", function (e) {
  mouse.xPosition = e.pageX;
  mouse.yPosition = e.pageY;
});

canvasElement.addEventListener("touchmove", function (e) {
  const touch = e.touches[0];

  mouse.xPosition = touch.pageX;
  mouse.yPosition = touch.pageY;
});

window.addEventListener("orientationchange", function () {
  setup();
});
