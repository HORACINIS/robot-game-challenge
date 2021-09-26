'use strict'


const tableSurface = document.querySelector('#table-surface');

const robot = document.createElement('img');
robot.src = './robot/robot_right.png'; //robot facing will be dynamic



// creating 2d array

function createTabletop() {
  const tableTopDimensionUnits = [];
  // const rows = 0;
  // const cols = 5;

  for (let r = 4; r >= 0; r--) {
    tableTopDimensionUnits[r] = [];
    for (let c = 0; c < 5; c++) {
      const unit = document.createElement('div');

      // tableTopDimensionUnits[r][c] = `${c}, ${r}`;
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
console.log(tableUnits[20].id)


tableUnits[20].appendChild(robot);

// tableUnits.forEach(i => console.log(i))

const moveRobot = (x, y) => {
  tableUnits.forEach(divElement => {
    if (divElement.id === `${x},${y}`) {
      console.log('YES!!')
      console.log(divElement)
      divElement.appendChild(robot)
    } else {
      console.log('no')
    }
  });
};
moveRobot(4, 3);









