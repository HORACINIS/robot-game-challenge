'use strict';

const robots = [];
let robotSelected = 0;

(function () {
  const tableSurface = document.querySelector('#table-surface');
  const tableTopDimensionUnits = [];
  for (let i = 4; i >= 0; i--) {
    tableTopDimensionUnits[i] = [];
    for (let j = 0; j < 5; j++) {
      const unit = document.createElement('div');
      tableTopDimensionUnits[i][j] = new Array(`${[j, i]}`);
      unit.classList = 'unit';
      unit.id = tableTopDimensionUnits[i][j];
      tableSurface.appendChild(unit);
      unit.textContent = tableTopDimensionUnits[i][j]
    }
  }
})();


class Robot {
  constructor() {
    this.robot = document.createElement('img');
    this.facingDirectionsOptions = ['SOUTH', 'WEST', 'NORTH', 'EAST'];
    this.degreesOptions = [0, 90, 180, 270];
  };

  place(x, y, f) {
    this.robot.src = './robot/robot.png';
    this.x = +x;
    this.y = +y;
    this.f = f;
    this.degrees = 0;
    this.coordinates = `${this.x},${this.y}`;

    document.querySelectorAll('.unit').forEach(dimensionUnit => {
      if (dimensionUnit.id === this.coordinates) dimensionUnit.appendChild(this.robot);
    });

    for (let i = 0; i < this.facingDirectionsOptions.length; i++) {
      switch (this.f) {
        case this.facingDirectionsOptions[i]:
          this.degrees = this.degreesOptions[i];
          break;
      }
    }
    this.robot.style.transform = `rotate(${this.degrees}deg)`
  }

  left() {
    let index = this.facingDirectionsOptions.indexOf(this.f);
    index -= 1;
    if (index < 0) index = 3;
    this.f = this.facingDirectionsOptions[index]
    this.robot.style.transform = `rotate(${this.degreesOptions[index]}deg)`;
  }

  right() {
    let index = this.facingDirectionsOptions.indexOf(this.f);
    index += 1;
    if (index > 3) index = 0;
    this.f = this.facingDirectionsOptions[index]
    this.robot.style.transform = `rotate(${this.degreesOptions[index]}deg)`;
  }

  move() {
    if (this.f === 'NORTH' && this.y < 4) {
      this.y += 1;
    }
    if (this.f === 'SOUTH' && this.y > 0) {
      this.y -= 1;
    }
    if (this.f === 'EAST' && this.x < 4) {
      this.x += 1;
    }
    if (this.f === 'WEST' && this.x > 0) {
      this.x -= 1;
    }
    document.querySelector(`[id='${this.x},${this.y}']`).appendChild(this.robot);
  }

  report() {
    console.log(`Current position X${this.x}, Y${this.y}, ${this.f}`);
    alert(`Current position X${this.x}, Y${this.y}, ${this.f}`);
  }
}


const createRobot = () => {
  const xInput = document.querySelector('.x');
  const yInput = document.querySelector('.y');
  const fInput = document.querySelector('.f');

  if (fInput.value === 'NORTH' || fInput.value === 'SOUTH' || fInput.value === 'EAST' || fInput.value === 'WEST') {
    if ((xInput.value >= 0 && xInput.value <= 4) && (yInput.value >= 0 && yInput.value <= 4)) {
      const robot = new Robot
      robot.place(xInput.value, yInput.value, fInput.value);
      document.querySelector('.robotNumInput').value = robotSelected;
      robots.push(robot)
      xInput.value = ''
      yInput.value = ''
      fInput.value = '';
      document.querySelector('.extra-buttons').style.display = 'block';
    }
  }
}
const moveRobot = () => {
  robots[robotSelected].move();
}
const rotateRobotLeft = () => {
  robots[robotSelected].left();
}
const rotateRobotRight = () => {
  robots[robotSelected].right();
}
const switchRobot = () => {
  const robotNumInput = document.querySelector('.robotNumInput').value;
  if (robotNumInput <= (robots.length - 1)) {
    robotSelected = robotNumInput;
  } else {
    document.querySelector('.robotNumInput').value = robotSelected;
  }
}

const reportRobotPosition = () => {
  robots[robotSelected].report();
}

document.querySelector('.place').addEventListener('click', () => createRobot());
document.querySelector('.move').addEventListener('click', () => moveRobot());
document.querySelector('.left').addEventListener('click', () => rotateRobotLeft());
document.querySelector('.right').addEventListener('click', () => rotateRobotRight());
document.querySelector('.robot').addEventListener('click', () => switchRobot());
document.querySelector('.report').addEventListener('click', () => reportRobotPosition());