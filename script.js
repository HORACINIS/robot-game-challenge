'use strict'

const tableSurface = document.querySelector('#table-surface');

// creating 2d array

function createTabletop() {
  const tableTopDimensionUnits = [];
  // const rows = 0;
  // const cols = 5;

  for (let r = 4; r >= 0; r--) {
    tableTopDimensionUnits[r] = [];
    for (let c = 0; c < 5; c++) {
      const unit = document.createElement('div');

      // tableTopDimensionUnits[r][c] = `${c},${r}`;
      tableTopDimensionUnits[r][c] = new Array(`${[c, r]}`);

      unit.classList = 'unit';
      unit.id = tableTopDimensionUnits[r][c];
      tableSurface.appendChild(unit);
      unit.textContent = tableTopDimensionUnits[r][c]
    }
  }
  console.log(tableTopDimensionUnits);
}
createTabletop();




// THIS WILL ATTACH THE ROBOT 

let tableUnits = document.querySelectorAll('.unit')
// console.log(tableUnits[20].id)


// tableUnits[20].appendChild(robot);



class RobotActions {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.robot = document.createElement('img');
    this.coordinatesGiven = `${this.x},${this.y}`;
    this.degrees = 0;
  };
  placeXandY() {
    this.robot.src = './robot/robot.png';
    tableUnits.forEach(element => {
      if (element.id === this.coordinatesGiven) {
        element.appendChild(this.robot)
      }
    });
  }
  facingDirection(direction) {
    switch (direction) {
      case 'NORTH':
        this.degrees = 180;
        break;
      case 'SOUTH':
        this.degrees = 0;
        break;
      case 'EAST':
        this.degrees = 270;
        break;
      case 'WEST':
        this.degrees = -270;
        break;
    }
    this.robot.style.transform = `rotate(${this.degrees}deg)`
  }
  rotateLeft() {
    this.degrees -= 90;
    console.log(this.degrees)
    this.robot.style.transform = `rotate(${this.degrees}deg)`;
  }
  rotateRight() {
    this.degrees += 90;
    this.robot.style.transform = `rotate(${this.degrees}deg)`;
  }
}

const robotOne = new RobotActions(4, 3);
robotOne.placeXandY()
robotOne.facingDirection('EAST');

// robotOne.rotateLeft();
// robotOne.rotateLeft();
// robotOne.rotateRight();
// robotOne.rotateLeft();


// const robotTwo = new RobotActions(1, 2);
// robotTwo.placeXandY()






