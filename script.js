'use strict'





const robot = document.createElement('img');
robot.src = './robot/robot_right.png'; //robot facing will be dynamic

// document.querySelector('form').appendChild(robot)




// creating 2d array

const myArray = [];
const rows = 0;
const cols = 5;

for (let r = 4; r >= rows; r--) {
  myArray[r] = [];
  for (let c = 0; c < cols; c++) {
    myArray[r][c] = `${c}, ${r}`;
    let surface = document.querySelector('#table-surface')
    let unit = document.createElement('div');
    unit.classList = 'unit';
    unit.id = myArray[r][c];
    surface.appendChild(unit);
    unit.textContent = myArray[r][c]

    // console.log(surface)
    // console.log(myArray[r][c])

    // console.log(c)
    // console.log(r)
  }
}
console.log(myArray);
















