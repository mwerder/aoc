import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n');

// part 1
// find the calibration values
const numbers = input.map((line) => line.replace(/\D/g, ''));
const sum = numbers.reduce((a, b) => a + parseInt(b[0] + b[b.length - 1]), 0);

console.log('result part1: ', sum);

// part 2
const wordToNumberMap: Record<string, string> = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

const findMatches = (input: string) => {
  let matches = [];
  for (let i = 0; i < input.length; i++) {
    // if the character is a digit, add it to the matches, otherwise check if its a word
    if (isDigit(input[i])) {
      matches.push(input[i]);
      continue;
    }
    for (let word in wordToNumberMap) {
      if (input.startsWith(word, i)) {
        matches.push(wordToNumberMap[word]);
      }
    }
  }
  return matches;
};

const isDigit = (character: string) => {
  return /^\d$/.test(character);
};

const nums = input.map((line) => findMatches(line));
const sum2 = nums.reduce((a, b) => a + parseInt(b[0] + b[b.length - 1]), 0);
console.log('result part2', sum2);
