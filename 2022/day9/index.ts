import fs from 'fs';

const input = fs.readFileSync('./2022/day9/input.txt', 'utf-8')
	.trim()
	.split('\n');


console.log(input);
type Coordinates = {
	x: number;
	y: number;
}
// let fields: string[][] = new Array(26)
// 	.fill(false)
// 	.map(() => 
// 		new Array(26).fill('.')
// 	);
let head: Coordinates = {x: 0, y: 0};
let tail: Coordinates = {x: 0, y: 0};
let visitedPoints: Set<string> = new Set();
let visitedPoints2: Set<string>[] = [];

const move = (command: string[]) => {
	const [instruction, amount] = command;
	for (let i = 0; i<parseInt(amount); i++) {

		moveHead(head, instruction);
		moveTail();
	}
}

const movePart2 = (command: string[]) => {
	const [instruction, amount] = command;
	for (let i = 0; i<parseInt(amount); i++) {

		knots.forEach((knot, idx) => {
			if (idx === 0) {
				moveHead(knot, instruction);
			} else {
				moveTailPart2(idx)
			}
		})
		
	}
	// console.log('fields', fields);
}

const moveHead = (head: Coordinates, instruction: string) => {

	if (instruction === 'R') {
		head.x += 1;
	} else if (instruction === 'L') {
		head.x -= 1;
	} else if (instruction === 'U') {
		head.y += 1;
	} else if (instruction === 'D') {
		head.y -= 1;
	}
}
const moveTail = () => {

	// get the distance form tail to head
	const distanceX = Math.abs(head.x - tail.x);
	const distanceY = Math.abs(head.y - tail.y);
	if ((distanceX > 0 && distanceY > 1) || (distanceX > 1 && distanceY > 0)) {
		// we need to move diagonally
		tail.x = head.x > tail.x ? tail.x + 1 : tail.x - 1;
		tail.y = head.y > tail.y ? tail.y + 1 : tail.y - 1;
		markPosition(visitedPoints, tail.x, tail.y);
	} else if (distanceX > 1) {
		// move horizontally
		tail.x = head.x > tail.x ? tail.x + 1 : tail.x - 1;
		markPosition(visitedPoints, tail.x, tail.y)
	} else if (distanceY > 1) {
		// move vertically
		tail.y = head.y > tail.y ? tail.y + 1 : tail.y - 1;
		markPosition(visitedPoints, tail.x, tail.y)
	}
}

const moveTailPart2 = (idx: number) => {
	// get the distance form tail to head
	const distanceX = Math.abs(knots[idx-1].x - knots[idx].x);
	const distanceY = Math.abs(knots[idx-1].y - knots[idx].y);
	if ((distanceX > 0 && distanceY > 1) || (distanceX > 1 && distanceY > 0)) {
		// we need to move diagonally
		knots[idx].x = knots[idx-1].x > knots[idx].x ? knots[idx].x + 1 : knots[idx].x - 1;
		knots[idx].y = knots[idx-1].y > knots[idx].y ? knots[idx].y + 1 : knots[idx].y - 1;
		markPosition(visitedPoints2[idx], knots[idx].x, knots[idx].y, idx.toString());
	} else if (distanceX > 1) {
		// move horizontally
		knots[idx].x = knots[idx-1].x > knots[idx].x ? knots[idx].x + 1 : knots[idx].x - 1;
		markPosition(visitedPoints2[idx], knots[idx].x, knots[idx].y, idx.toString());
	} else if (distanceY > 1) {
		// move vertically
		knots[idx].y = knots[idx-1].y > knots[idx].y ? knots[idx].y + 1 : knots[idx].y - 1;
		markPosition(visitedPoints2[idx], knots[idx].x, knots[idx].y, idx.toString());
	}
}

const markPosition = (points: Set<string>, x: number, y: number, identifier?: string) => {

	points.add(`${x}:${y}`);
	// if (identifier) {
	// 	if (!fields[y]) {
	// 		fields[y] = [];
	// 	}
	// 	fields[y][x] = identifier;
	// }
}

// part 1
//fields[100][100] = 1; // START Position Marked
visitedPoints.add('0:0'); // START Position Marked
input.forEach((line) => {

	const command = line.split(' ');

	move(command);
});

// fields.forEach(r => {
// 	// get the sum
// 	total += r.reduce((a, b) => a + b, 0);
// })
//console.log(`🚀 ~ file: index.ts:92 ~ fields`, fields);
console.log('result part1', visitedPoints.size);

// part 2
const knots: Coordinates[] = [];
for (let i = 0; i < 10; i++) {
	knots.push({x: 0, y: 0});
	visitedPoints2.push(new Set());
	visitedPoints2[i].add('0:0');
}

input.forEach((line) => {

	const command = line.split(' ');

	movePart2(command);
});
console.log('result part2', visitedPoints2[9].size);