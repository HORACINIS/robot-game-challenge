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
    console.log('this.f coming from place: ', this.f)
  }


  left() {
    let index = this.facingDirectionsOptions.indexOf(this.f);
    const filtering = this.facingDirectionsOptions.find(filter => filter === this.f)
    console.log(index)
    index -= 1;
    if (index < 0) index = 3;


    this.f = this.facingDirectionsOptions[index]
    this.robot.style.transform = `rotate(${this.degreesOptions[index]}deg)`;

    console.log('------------- LEFT() ------------')
    console.log('index ', index)
    console.log(this.degrees + ' degrees')
    console.log(this.f)
    console.log('filtering ', filtering)
    console.log('facing direction ', this.facingDirectionsOptions[index])
    // console.log('cordinadas left() ', this.coordinates)
    console.log('**********************************')

  }

  right() {
    let index = this.facingDirectionsOptions.indexOf(this.f);
    console.log(index)
    index += 1;
    if (index > 3) index = 0;

    this.f = this.facingDirectionsOptions[index]
    this.robot.style.transform = `rotate(${this.degreesOptions[index]}deg)`;

    console.log('------------- RIGHT() ------------')
    console.log('index ', index)
    console.log(this.degrees + ' degrees')
    console.log(this.f)
    console.log('facing direction ', this.facingDirectionsOptions[index])
    // console.log('cordinadas right() ', this.coordinates)
    console.log('**********************************')

  }

  move() {
    console.log('------------- MOVE() Before ------------')
    console.log(this.x, this.y)
    console.log(this.degrees)
    console.log(this.f)
    console.log('*****************************************')
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

    console.log('------------- MOVE() After ------------')
    console.log(this.x, this.y)
    console.log(this.degrees + ' degrees')
    console.log(this.f)
    console.log('****************************************')
  }

  report() {
    console.log(`Current position X${this.x}, Y${this.y}, ${this.f}`);
    alert(`Current position X${this.x}, Y${this.y}, ${this.f}`);
  }
  get numOfRobotsCreated() {
    return this.numRobotsCreated += 1;
  }
}


let allRobots = [];
let robotChosen = 0;

const createRobot = (x, y, f) => {
  let robot = new Robot // CREATE NEW ROBOT
  robot.place(x, y, f); // ROBOT TO BE PLACED IN GIVEN COORDINATES
  document.querySelector('.robotNumInput').value = robotChosen
  allRobots.push(robot) // ADD ROBOT TO THE ALL ROBOTS ARRAY
  console.log(allRobots)
}
const moveRobot = (robotNum = robotChosen) => {
  console.log(robotNum)
  allRobots[robotNum].move(); // MOVE ROBOT, ROBOT ZERO WILL BE THE DEFAULT IF NO ROBOT NUMBER IS GIVEN
}
const rotateRobotLeft = (robotNum = robotChosen) => {
  allRobots[robotNum].left();
}
const rotateRobotRight = (robotNum = robotChosen) => {
  allRobots[robotNum].right();
}
const switchRobot = (robotNum = 0) => {
  console.log(robotNum)
  robotChosen = robotNum
  allRobots[robotChosen]
}
const reportRobotCoordinates = (robotNum = robotChosen) => {
  allRobots[robotNum].report();
}


document.querySelector('.controllers').addEventListener('click', (e) => {
  let xInput = document.querySelector('.x');
  let yInput = document.querySelector('.y');
  let fInput = document.querySelector('.f');
  const robotNumInput = document.querySelector('.robotNumInput').value;

  console.log(e)
  if (e.target.className === 'place') {     // PLACE button
    if (fInput.value === 'NORTH' || fInput.value === 'SOUTH' || fInput.value === 'EAST' || fInput.value === 'WEST') {
      if ((xInput.value >= 0 && xInput.value <= 4) && (yInput.value >= 0 && yInput.value <= 4)) {
        console.log(xInput.value)
        console.log(yInput.value)
        console.log(fInput.value)
        createRobot(xInput.value, yInput.value, fInput.value)
        console.log(Robot)
        xInput.value = ''
        yInput.value = ''
        fInput.value = '';
        document.querySelector('.extra-buttons').style.display = 'block';
      }
    }
  }

  if (e.target.className === 'move') {       // MOVE button
    moveRobot();
  }

  if (e.target.className === 'left') {      // LEFT turn
    rotateRobotLeft();
  }
  if (e.target.className === 'right') {     // RIGHT turn
    rotateRobotRight();
  }

  if (e.target.className === 'robot') {    // ROBOT switch button
    if (robotNumInput <= (allRobots.length - 1)) {
      switchRobot(+robotNumInput)
    } else {
      robotChosen = allRobots.length - 1;
      document.querySelector('.robotNumInput').value = allRobots.length - 1;
    }
  }
  if (e.target.className === 'report') {  // REPORT button
    reportRobotCoordinates();
  }
});