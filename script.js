'use strict'

console.log('Conected')

const robot = document.createElement('img');
robot.src = './robot/robot_right.png'; //robot facing will be dynamic

// document.querySelector('form').appendChild(robot)


let tableUnits = document.querySelectorAll('.unit')
console.log(tableUnits)
tableUnits[20].appendChild(robot);