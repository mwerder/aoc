import fs from 'fs';

const input = fs.readFileSync('./data/day04.txt', 'utf-8').trim().split('\n');

const games = input.map((line) => line.split(': ')[1].split(' | '));

const getMatchingWinningNumbers = (game: string[]) => {
  const winnigNumbers = game[0].split(' ').filter((n) => n !== '');
  const numbers = game[1].split(' ').filter((n) => n !== '');
  const matching = winnigNumbers.filter((n) => numbers.includes(n));
  return matching;
};

let result = 0;
games.forEach((game) => {
  const matchingNumbers = getMatchingWinningNumbers(game);
  result += matchingNumbers.length > 0 ? Math.pow(2, matchingNumbers.length - 1) : 0;
});

console.log('result part 1: ', result);

// part 2
const cards = Array(input.length).fill(1);
games.forEach((game, idx) => {
  const matchingNumbers = getMatchingWinningNumbers(game);
  if (matchingNumbers.length > 0) {
    matchingNumbers.forEach((n, j) => {
      const amount = cards.at(idx)!; // number of hands (original card + copeis)
      const prev = cards.at(idx + j + 1);
      cards[idx + j + 1] = prev + amount;
    });
  }
});
const sum = cards.reduce((acc, curr) => acc + curr, 0);
console.log('result part 2: ', sum);
