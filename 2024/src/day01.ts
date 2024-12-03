import fs from 'fs';

const input = fs.readFileSync('./2024/data/day01.txt', 'utf-8').trim().split('\n');

const d1: number[] = [];
const d2: number[] = [];

input.forEach((line) => {
  const [a, b] = line.split('   ').map((n) => parseInt(n, 10));
  d1.push(a);
  d2.push(b);
});

// part 1
let distance = 0;
d1.sort();
d2.sort();

for (let i = 0; i < d1.length; i++) {
  distance += Math.abs(d1[i] - d2[i]);
}

console.log(`🚀 ~ distance:`, distance);

// part 2
let sum = 0;
d1.forEach((n) => {
  let count = 0;
  d2.forEach((m) => {
    if (n === m) {
      count++;
    }
  });
  sum += count * n;
});

console.log(`🚀 ~ sum:`, sum);
