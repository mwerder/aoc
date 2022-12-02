import fs from 'fs';

const input = fs.readFileSync('./2022/day2/input.txt', 'utf-8')
	.trim()
	.split('\n');

// remove all whitespace from the input
input.forEach((el: string, i: number) => {
	input[i] = el.replace(/\s/g, '');
});

type Move = 'A' | 'B' | 'C';

const moveScorePart1 = {
	'X': 1,
	'Y': 2,
	'Z': 3
}

const moveScorePart2 = {
	'A': 1,
	'B': 2,
	'C': 3
}

const moves:Move[] = ['A', 'B', 'C'];

// calculate score for part 1
let score = 0;
input.forEach((el: string, i: number) => {
	if ((el[0] === 'A' || el[0] === 'B' || el[0] === 'C') && (el[1] === 'X' || el[1] === 'Y' || el[1] === 'Z')) {

	score += moveScorePart1[el[1]]; // add score for played move

	// get score for win/draw/loss
	if (el[1] === 'X') {
		if (el[0] === 'A') {
			score += 3;
		} else if (el[0] === 'B') {
			score += 0;
		} else if (el[0] === 'C') {
			score += 6;
		}
	} else if (el[1] === 'Y') {
		if (el[0] === 'A') {
			score += 6;
		} else if (el[0] === 'B') {
			score += 3;
		} else if (el[0] === 'C') {
			score += 0;
		}
	} else if (el[1] === 'Z') {
		if (el[0] === 'A') {
			score += 0;
		} else if (el[0] === 'B') {
			score += 6;
		} else if (el[0] === 'C') {
			score += 3;
		}
	}
}
});
console.log(`Result part 1`, score);

// PART 2
score = 0;
input.forEach((el: string, i: number) => {
	
	if (el[0] === 'A' || el[0] === 'B' || el[0] === 'C') {
		if (el[1] === 'X') {
			// we need to lose, play his move -1, check bounds
			const position = moves.indexOf(el[0]);
			const newPosition = position === 0 ? moves.length -1 : (position - 1) % moves.length;
			score += moveScorePart2[moves[newPosition]];
	
		} else if (el[1] === 'Y') {
			// we need a draw, play his move
			score += 3;
			score += moveScorePart2[el[0]];
	
		} else if (el[1] === 'Z') {
			// we need to win, play his move +1, check bounds
			score += 6;
			const position = moves.indexOf(el[0]);
			const newPosition = position === moves.length -1 ? 0 : position + 1
			score += moveScorePart2[moves[newPosition]];
		}
	}
});

console.log(`Result part 2`, score);
