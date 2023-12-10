import fs from 'fs';

const input = fs.readFileSync('./data/day03.txt', 'utf-8').trim().split('\n');

type Number = {
  x: number;
  y: number;
  length: number;
  value: number;
};

console.log(input);

// day1

// find all numbers
const getNumbers = (lines: string[]) => {
  let numbers: Number[] = [];
  // loop over each line:
  for (let i = 0; i < input.length; i++) {
    // loop over all lines
    const line = input[i];
    let start = -1;
    let length = 0;

    for (let j = 0; j < line.length; j++) {
      // loop over all chars
      const char = line[j];
      if (isDigit(char)) {
        if (start === -1) {
          start = j;
          length = 1;
        } else {
          length++;
        }
        if (j === line.length - 1) {
          // last char of line
          // we were parsing, stop it
          const number = parseInt(line.slice(start, start + length));
          numbers.push({ x: j - length + 1, y: i, length, value: number });
          start = -1;
          length = 0;
        }
      } else {
        if (start !== -1) {
          // we were parsing, stop it
          const number = parseInt(line.slice(start, start + length));
          numbers.push({ x: j - length, y: i, length, value: number });
          start = -1;
          length = 0;
        }
      }
    }
  }
  return numbers;
};
const isDigit = (char: string) => /[0-9]/.test(char);
const isNumberAdjacent = (number: Number, lines: string[]) => {
  for (let y = number.y - 1; y <= number.y + 1; y++) {
    for (let x = number.x - 1; x <= number.x + number.length; x++) {
      if (x < 0 || y < 0 || x >= lines[0].length - 1 || y >= lines.length - 1 || (y === number.y && x >= number.x && x < number.x + number.length)) {
        continue;
      }
      if (lines[y][x] !== '.' && !isDigit(lines[y][x])) {
        return true;
      }
    }
  }
};

const numbers = getNumbers(input);

const adjacentNumbers = numbers.filter((n) => isNumberAdjacent(n, input));
const result = adjacentNumbers.reduce((acc, n) => acc + n.value, 0);
console.log(`🚀 ~ file: day03.ts:75 ~ result:`, result);

// part2

const getGearRatio = (lines: string[], coords: { x: number; y: number }) => {
  const gears = [];

  for (let y = coords.y - 1; y <= coords.y + 1; y++) {
    for (let x = coords.x + 1; x >= coords.x - 1; x--) {
      if (x < 0 || y < 0 || x > lines[0].length - 1 || y > lines.length - 1) {
        continue;
      }
      if (isDigit(lines[y][x])) {
        // find start of number
        while (isDigit(lines[y][x])) {
          x--;
        }
        // start of number has to be corrected by adding 1
        const num = numbers.find((n) => n.x === x + 1 && n.y === y);
        gears.push(num);
      }
    }
  }
  return gears.length === 2 ? gears[0]?.value! * gears[1]?.value! : 0;
};

let result2 = 0;
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] === '*') {
      // is gear
      const gearRatio = getGearRatio(input, { x: j, y: i });
      result2 += gearRatio;
    }
  }
}
console.log(`🚀 ~ file: day03.ts:118 ~ result2:`, result2);
