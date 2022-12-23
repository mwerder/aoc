import fs from 'fs';

const input = fs.readFileSync('./2022/day14/input.txt', 'utf-8')
	.trim()
	.split('\n');

console.log(input);

// get min/max x and y
let minX = 1000;
let maxX = 0;
let minY = 0;
let maxY = 0;

input.forEach(line => {
	
	const steps = line.split(' -> ');
	steps.forEach(step => {
		
		const [steX, stepY] = step.split(',');
		minX = Math.min(minX, parseInt(steX));
		maxX = Math.max(maxX, parseInt(steX));
		maxY = Math.max(maxY, parseInt(stepY));
	})
})
const xOffset = 400; // quick & dirty, just add some offset
const map = new Array(maxY - minY + 1 + 1).fill(0).map(() => new Array(maxX - minX + 1 + xOffset).fill('.'));
const infiniteFloor = new Array(maxX - minX + 1 + 20).fill('#');
map.push(infiniteFloor)

const drawLine = (map: string[][] ,_x1: number, y1: number, _x2: number, y2: number) => {

	// add 1 as offset to have space for the sandcorn falling down the void
	const x1 = _x1 + (xOffset/2);
	const x2 = _x2 + (xOffset/2);

	if ((x1 === x2) && y1 !== y2) {
		// vertical line
		const [_y1,_y2] = [y1,y2].sort((a,b) => a-b);
		for (let i = _y1; i <= _y2; i++) {
			map[i][x1] = '#';
		}
	} else if ((y1 === y2) && x1 !== x2) {
		// horizontal line
		const [_x1,_x2] = [x1,x2].sort((a,b) => a-b);
		for (let i = _x1; i <= _x2; i++) {
			map[y1][i] = '#';
		}
	} else {
		// should not happen
		throw new Error('Invalid line');
	}
}
const test = 1000;

const tick = async (map: string[][], sandCornCoords: {x: number, y: number}) => {

	// wait 500 ms
	//await new Promise(resolve => setTimeout(resolve, 30));

	// case 1, sandcorn can fall one down
	if (map[sandCornCoords.y+1][sandCornCoords.x] === '.') {
		map[sandCornCoords.y][sandCornCoords.x] = '.';
		map[sandCornCoords.y+1][sandCornCoords.x] = 'O';
		sandCornCoords.y++;
		return true;
	}

	// case 2, sandcorn can move left/down
	if (map[sandCornCoords.y+1][sandCornCoords.x-1] === '.') {

		map[sandCornCoords.y][sandCornCoords.x] = '.';
		map[sandCornCoords.y+1][sandCornCoords.x-1] = 'O';
		sandCornCoords.x--;
		sandCornCoords.y++;
		return true;
	}

	// case 3, sandcorn can move right/down
	if (map[sandCornCoords.y+1][sandCornCoords.x+1] === '.') {
		map[sandCornCoords.y][sandCornCoords.x] = '.';
		map[sandCornCoords.y+1][sandCornCoords.x+1] = 'O';
		sandCornCoords.x++;
		sandCornCoords.y++;
		return true;
	}
	// sandcorn can not move
	return false;
}

map.forEach(v=>console.log(...v));

// draw map
for (let j = 0; j < input.length; j++) {
	console.log('j',j);
	const steps = input[j].split(' -> ');
	console.log(`🚀 ~ file: index.ts:13 ~ steps`, steps);
	for (let i = 0; i < steps.length - 1; i++) {
		
		const [steX1, stepY1] = steps[i].split(',');
		const [steX2, stepY2] = steps[i+1].split(',');
		drawLine(map, parseInt(steX1)-minX, parseInt(stepY1)-minY, parseInt(steX2)-minX, parseInt(stepY2)-minY);
	}
};

map.forEach(v=>console.log(...v));

let sandCornCount = 0;
let isExitBlocked = false;

do {
	++sandCornCount;
	const sandCornCoords = {
		x: 500 - minX + (xOffset/2), // offset for the x axis infnite floor
		y: 0,
	}
	if (map[sandCornCoords.y][sandCornCoords.x] !== '.') {
		console.log('no sandcorn');
		isExitBlocked = true;
	} else {
		map[sandCornCoords.y][sandCornCoords.x] = 'O';
		let isSandcornMoving = true;
		do {
			//console.clear();
			//map.forEach(v=>console.log(...v));
			//console.log('sandorn #', sandCornCount);
			isSandcornMoving = await tick(map, sandCornCoords)
		} while (isSandcornMoving)
	}
} while (!isExitBlocked);

map.forEach(v=>console.log(...v));

console.log('result part1: ', sandCornCount-1);
