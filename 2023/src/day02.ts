import fs from 'fs';
const input = fs.readFileSync('./data/day02.txt', 'utf-8').trim().split('\n');

type Colors = 'red' | 'green' | 'blue';
type Set = {
  [K in Colors]?: number;
};

const bag: Record<Colors, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

const getColorsFromSet = (sets: string[]) => {
  let result: Set = {};
  for (let set of sets) {
    const colors = set.split(' ');
    const color = colors[1] as Colors;
    const num = parseInt(colors[0]);
    result[color] = num;
  }
  return result;
};

const parseSets = (sets: string[]) => {
  const parsedSets: Set[] = [];
  for (let set of sets) {
    const parsed = getColorsFromSet(set.split(', '));
    parsedSets.push(parsed);
  }
  return parsedSets;
};

const isGamePossible = (set: Set[]) => {
  const isPossible = set.every((s) => {
    return Object.keys(s).every((color) => {
      if (bag[color as Colors] < s[color as Colors]!) {
        return false;
      }
      return true;
    });
  });
  return isPossible;
};

const getPowerOfGame = (set: Set[]) => {
  const colors: Record<Colors, number> = {
    red: 0,
    green: 0,
    blue: 0,
  };

  set.forEach((s) => {
    Object.keys(s).forEach((color) => {
      colors[color as Colors] = Math.max(s[color as Colors]!, colors[color as Colors]!);
    });
  });
  if (colors.red === 0 || colors.green === 0 || colors.blue === 0) {
    console.log('this should not happen, I guess...');
  }
  return colors.red! * colors.green! * colors.blue!;
};

let result = 0;
let power = 0;
input.forEach((line, idx) => {
  const gameId = idx + 1;
  const sets = line.split(': ')[1].split('; ');
  const parsedSets = parseSets(sets);
  // part 1: check if the game is possible
  if (isGamePossible(parsedSets)) {
    result += gameId;
  }
  // for part 2: get the power of min needed cubes to make the game possible
  power += getPowerOfGame(parsedSets);
});
console.log('result 1', result);
console.log('result 2:', power);
