import fs from 'fs';

const input = fs.readFileSync('./2024/data/day02.txt', 'utf-8').trim().split('\n');

const nums = input.map((r) => r.split(' ').map((n) => parseInt(n, 10)));

const isSafeLine = (line: number[]) => {
  const diffs = [];

  for (let i = 0; i < line.length - 1; i++) {
    const n1 = line[i];
    const n2 = line[i + 1];
    diffs.push(n1 - n2);
  }
  if (diffs.every((d) => d > 0 && d <= 3)) {
    return true;
  }

  if (diffs.every((d) => d < 0 && d >= -3)) {
    return true;
  }
  return false;
};

// part1
let safeCount = 0;
nums.forEach((line) => {
  if (isSafeLine(line)) {
    safeCount++;
  }
});
console.log('part1', safeCount);

// part2

let safeCount2 = 0;
nums.forEach((line) => {
  if (isSafeLine(line)) {
    safeCount2++;
  } else {
    const isSafeNow = line.some((n, idx) => {
      // Create a new array without the element at idx
      const newArray = Array.from(line);
      newArray.splice(idx, 1);
      return isSafeLine(newArray);
    });
    if (isSafeNow) {
      safeCount2++;
    }
  }
});
console.log('part2', safeCount2);
