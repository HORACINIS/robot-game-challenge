'use strict';



// creating 2d array
const createTabletop = () => {
  const tableSurface = document.querySelector('#table-surface');
  const tableTopDimensionUnits = [];
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


class Robot {
  constructor() {
    this.robot = document.createElement('img');
    // this.degrees = 0;
    this.facingDirectionsOptions = ['SOUTH', 'WEST', 'NORTH', 'EAST']; //CLOCKWISE (RIGHT)
    this.degreesOptions = [0, 90, 180, 270];
  };

  place(x, y, f) {
    this.robot.src = './robot/robot.png';
    this.x = x;
    this.y = y;
    this.f = f;
    this.degrees = 0;
    this.coordinates = `${this.x},${this.y}`;
    document.querySelectorAll('.unit').forEach(dimensionUnit => {
      if (dimensionUnit.id === this.coordinates) dimensionUnit.appendChild(this.robot);
    });

    switch (this.f) {
      case this.facingDirectionsOptions[0]: // SOUTH (0 DEGREES - ALWAYS)
        this.degrees = this.degreesOptions[0];
        // this.f = this.facingDirectionsOptions[0]
        break;
      case this.facingDirectionsOptions[1]: // WEST (90 DEGREES - ALWAYS)
        this.degrees = this.degreesOptions[1];
        // this.f = this.facingDirectionsOptions[1]
        break;
      case this.facingDirectionsOptions[2]: // NORTH (180 DEGREES - ALWAYS)
        this.degrees = this.degreesOptions[2];
        // this.f = this.facingDirectionsOptions[3]
        break;
      case this.facingDirectionsOptions[3]: // EAST (270 DEGREES - ALWAYS)
        this.degrees = this.degreesOptions[3];
        // this.f = this.facingDirectionsOptions[2]
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
    const filtering = this.facingDirectionsOptions.find(filter => filter === this.f)
    console.log(index)
    index += 1;
    if (index > 3) index = 0;


    this.f = this.facingDirectionsOptions[index]
    this.robot.style.transform = `rotate(${this.degreesOptions[index]}deg)`;

    console.log('------------- RIGHT() ------------')
    console.log('index ', index)
    console.log(this.degrees + ' degrees')
    console.log(this.f)
    console.log('filtering ', filtering)
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
    if (this.f === 'NORTH') {
      this.y += 1;
      document.querySelector(`[id='${this.x},${this.y}']`).appendChild(this.robot);
    }
    if (this.f === 'SOUTH') {
      this.y -= 1;
      document.querySelector(`[id='${this.x},${this.y}']`).appendChild(this.robot);
    }
    if (this.f === 'EAST') {
      this.x += 1;
      document.querySelector(`[id='${this.x},${this.y}']`).appendChild(this.robot);
    }
    if (this.f === 'WEST') {
      this.x -= 1;
      document.querySelector(`[id='${this.x},${this.y}']`).appendChild(this.robot);
    }
    console.log('------------- MOVE() After ------------')
    console.log(this.x, this.y)
    console.log(this.degrees + ' degrees')
    console.log(this.f)
    console.log('****************************************')
  }
  report() {
    console.log(`Current position X${this.x}, Y${this.y}, ${this.f}`);
  }
}

const robot1 = new Robot();
robot1.place(2, 3, 'NORTH');
robot1.move()
robot1.report()
robot1.right()
robot1.report()
robot1.right()

// const robot2 = new Robot();
// robot2.place(0, 3, 'EAST');
// robot2.move()
// robot1.report()






