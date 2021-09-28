'use strict';

const createTabletop = () => {
  const tableSurface = document.querySelector('#table-surface');
  const tableTopDimensionUnits = [];
  for (let r = 4; r >= 0; r--) {
    tableTopDimensionUnits[r] = [];
    for (let c = 0; c < 5; c++) {
      const unit = document.createElement('div');
      tableTopDimensionUnits[r][c] = new Array(`${[c, r]}`);

      unit.classList = 'unit';
      unit.id = tableTopDimensionUnits[r][c];
      tableSurface.appendChild(unit);
      unit.textContent = tableTopDimensionUnits[r][c]
    }
  }
}
createTabletop();


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

    switch (this.f) {
      case this.facingDirectionsOptions[0]: // SOUTH (0 DEGREES - ALWAYS)
        this.degrees = this.degreesOptions[0];
        break;
      case this.facingDirectionsOptions[1]: // WEST (90 DEGREES - ALWAYS)
        this.degrees = this.degreesOptions[1];
        break;
      case this.facingDirectionsOptions[2]: // NORTH (180 DEGREES - ALWAYS)
        this.degrees = this.degreesOptions[2];
        break;
      case this.facingDirectionsOptions[3]: // EAST (270 DEGREES - ALWAYS)
        this.degrees = this.degreesOptions[3];
        break;
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


let allRobots = [];
let robotChosen = 0;

const createRobot = () => {
  let xInput = document.querySelector('.x');
  let yInput = document.querySelector('.y');
  let fInput = document.querySelector('.f');
  console.log(allRobots)

  if (fInput.value === 'NORTH' || fInput.value === 'SOUTH' || fInput.value === 'EAST' || fInput.value === 'WEST') {
    if ((xInput.value >= 0 && xInput.value <= 4) && (yInput.value >= 0 && yInput.value <= 4)) {
      let robot = new Robot // CREATE NEW ROBOT
      robot.place(xInput.value, yInput.value, fInput.value); // ROBOT TO BE PLACED IN GIVEN COORDINATES
      document.querySelector('.robotNumInput').value = robotChosen
      allRobots.push(robot) // ADD ROBOT TO THE ALL ROBOTS ARRAY
      xInput.value = ''
      yInput.value = ''
      fInput.value = '';
      document.querySelector('.extra-buttons').style.display = 'block';
    }
  }
}
const moveRobot = (robotNum = robotChosen) => {
  allRobots[robotNum].move();
}
const rotateRobotLeft = (robotNum = robotChosen) => {
  allRobots[robotNum].left();
}
const rotateRobotRight = (robotNum = robotChosen) => {
  allRobots[robotNum].right();
}


const switchRobot = () => {
  const robotNumInput = document.querySelector('.robotNumInput').value;

  if (robotNumInput <= (allRobots.length - 1)) {
    robotChosen = robotNumInput;
    allRobots[robotChosen]
  } else {
    document.querySelector('.robotNumInput').value = robotChosen;
  }
}

const reportRobotPosition = () => {
  allRobots[robotChosen].report();
}



document.querySelector('.place').addEventListener('click', () => createRobot());
document.querySelector('.move').addEventListener('click', () => moveRobot());
document.querySelector('.left').addEventListener('click', () => rotateRobotLeft());
document.querySelector('.right').addEventListener('click', () => rotateRobotRight());
document.querySelector('.robot').addEventListener('click', () => switchRobot());
document.querySelector('.report').addEventListener('click', () => reportRobotPosition());