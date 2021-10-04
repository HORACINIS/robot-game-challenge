## ✨ ***Live site [Here!](https://robot-challenge-horacio.netlify.app/)***

## Description

The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units.

There are no obstructions on the table surface.

The robot is free to roam around the surface of the table, and it is prevented from falling to destruction. 

> **PLACE** will put the toy robot on the table in position **X**,**Y** and facing **NORTH**, **SOUTH**, **EAST** or **WEST**.

*The application will discard all commands in the sequence until a valid PLACE command has been executed*.

**MOVE** will move the toy robot one unit forward in the direction it is currently facing.

**LEFT** and **RIGHT** will rotate the robot 90 degrees in the specified direction without changing the position of the robot.

**REPORT** will announce the X,Y and facing of the robot.

Multiple robots can operate on the table.

***PLACE** will add a new robot to the table with incrementing number identifier.

A **ROBOT < number >** command will make the robot identified by active i.e. subsequent commands will affect that robot's position/direction. Any command that affects position/direction (e.g. MOVE, LEFT, RIGHT...) will affect only the active robot.

By default the first robot placed will become the active robot.

Any movement that would result in the robot falling from the table is prevented, however further valid movement commands will still be allowed.

## Example Input and Output:
a)

PLACE 0, 0, NORTH

MOVE

REPORT

*Output: 0, 1, NORTH*


b)

PLACE 0, 0, NORTH

LEFT

REPORT

*Output: 0, 0, WEST*

c)

PLACE 1, 2 , EAST

MOVE 

MOVE

LEFT

MOVE

REPORT

*Output: 3, 3, NORTH*


