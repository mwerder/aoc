const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf-8')
.trim()
.split('\n');

// DAY 2

function calcPositionDepth() {

  let forward = 0;
  let up = 0;
  let down = 0;
  input.filter(el => el.includes('forward')).forEach(el=> {forward += parseInt(el.split(' ')[1])})
  input.filter(el => el.includes('down')).forEach(el=> {down += parseInt(el.split(' ')[1])})
  input.filter(el => el.includes('up')).forEach(el=> {up += parseInt(el.split(' ')[1])})

  return forward * (down - up)
}

function calcPositionDepthAim() {

  forward = 0;
  let depth = 0;
  let aim = 0;
  input.forEach(el => {

    const value = parseInt(el.split(' ')[1]);
    if (el.includes('forward')) {

      forward += value;
      depth += aim * value;

    } else if (el.includes('down')) {

      aim += value;
    } else {

      aim -= value;
    }
  })
  return forward * depth
}

console.log('result: ', calcPositionDepth())
console.log('result2: ', calcPositionDepthAim())
