import fs from 'fs';

const input = fs.readFileSync('./2022/day10/input.txt', 'utf-8')
	.trim()
	.split('\n');
	

	
	let instructions: number[] = [];
	
	for (let i = 0; i < input.length; i++) {
		const l = input[i];
		
		const [ins, amount] = l.split(" ");
		
		if (ins === "noop") {
			instructions.push(0);
		}
		if (ins === "addx") {
			instructions.push(0);
			instructions.push(parseInt(amount));
		}
	}
	
	const totals: number[] = [];
	let valX = 1;
	
	instructions.forEach((instruction, index) => {
		const tick = index + 1;
		if ([20, 60, 100, 140, 180, 220].includes(tick)) {
			totals.push(valX * tick);
	}
	valX += instruction;
});

const sum = totals.reduce((a, b) => a + b, 0);

console.log('result part1: ', sum);

// part 2
// 40x6 grid
const grid: string[][] = Array.from({ length: 6 }, () =>
	new Array(40).fill(" ")
);

let valX2 = 1;

instructions.forEach((instruction, index) => {
	const [dx, dy] = [index % 40, Math.floor(index / 40)];
	const shouldPaint = dx === valX2 || dx === valX2 - 1 || dx === valX2 + 1;
	grid[dy][dx] = shouldPaint ? "#" : " ";
	valX2 += instruction;
});

grid.forEach((row) => {
	console.log(row.join(""));
});