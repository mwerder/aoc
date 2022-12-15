import fs from 'fs';

const input = fs.readFileSync('./2022/day12/input.txt', 'utf-8')
	.trim()
	.split('\n');
	

type Coords = {
	x: number;
	y: number;
}

const fields:string[][] = [[]];

for (let i = 0; i<input.length; i++) {

	input[i].split('').forEach((char, index) => {
		if (!fields[i]) {
			fields[i] = [];
		}
		fields[i].push(char);
	});
}

const getCoordinatesOfChar= (c: string, doGetAll: boolean): Coords[] => {
	const coords: Coords[] = [];
	for (let i = 0; i<fields.length; i++) {
		for (let j = 0; j<fields[i].length; j++) {
			if (fields[i][j] === c) {
				if (!doGetAll) {

					return [{x: j, y: i}];
				}
				coords.push({x: j, y: i});
			}
		}
	}
	return coords;
	
}

const getAllCoordinatesOfChar= (c: string): Coords[] => {
	const coords: Coords[] = [];
	for (let i = 0; i<fields.length; i++) {
		for (let j = 0; j<fields[i].length; j++) {
			if (fields[i][j] === c) {
				coords.push({x: j, y: i});
			}
		}
	}
	return coords;
}

const isNeighbourReachable = (x: number, y: number, x2: number, y2: number) => {

	const currentLevel =  fields[y][x] === 'S' ? 'a' : fields[y][x];
	const neighbourLevel = fields[y2][x2] === 'E' ? 'z' : fields[y2][x2]; // '{' is one after 'y' in ascii table

	// char to ansii
	const currentLevelNumber = currentLevel.charCodeAt(0);
	const neighbourLevelNumber = neighbourLevel.charCodeAt(0);
	return (neighbourLevelNumber - currentLevelNumber) <= 1
	//return Math.abs(currentLevelNumber - neighbourLevelNumber) <= 1;
}

const calcNeighbours = (x: number, y: number, newFields: Coords[]) => {

	const current = pathMap[y][x];
	if (current === '.') {
		throw new Error('pathMap is not initialized');
		return;
	}
	if (y > 0 && isNeighbourReachable(x,y, x, y-1)) {
		const neighbour = pathMap[y-1][x];
		if (neighbour === '.') {

			pathMap[y-1][x] = current + 1;
			directions[y-1][x] = directions[y-1][x].toUpperCase();
			newFields.push({x, y: y-1});
		} else {

			pathMap[y-1][x] = Math.min(current + 1, neighbour);
		}
	}
	if (x > 0 && isNeighbourReachable(x,y, x-1, y)) {
		const neighbour = pathMap[y][x-1];
		if (neighbour === '.') {
			// @ts-ignore
			pathMap[y][x-1] = pathMap[y][x] + 1;
			directions[y][x-1] = directions[y][x-1].toUpperCase();

			newFields.push({x: x-1, y});
		}
	}
	if (x < pathMap[0].length - 1 && isNeighbourReachable(x,y, x+1, y)) {
		const neighbour = pathMap[y][x+1];
		if (neighbour === '.') {
			// @ts-ignore
			pathMap[y][x+1] = pathMap[y][x] + 1;
			directions[y][x+1] = directions[y][x+1].toUpperCase();
			newFields.push({x: x+1, y});
		}
	}
	if (y < pathMap.length - 1 && isNeighbourReachable(x,y, x, y+1)) {
		const neighbour = pathMap[y+1][x];
		if (neighbour === '.') {
			// @ts-ignore
			pathMap[y+1][x] = pathMap[y][x] + 1;
			directions[y+1][x] = directions[y+1][x].toUpperCase();
			newFields.push({x, y: y+1});
		}
	}
}

const getShortestPath = (coords: Coords) => {
	let goalReached = false;
	
	pathMap[coords.y][coords.x] = 0;
	const newFields: Coords[] = [coords];
	while(!goalReached) {
		const fieldsToCheck = [...newFields];
		newFields.length = 0;
		for (let i = 0; i<fieldsToCheck.length; i++) {
			// sleep 500ms
			// uncomment to see the path being calculated in the console
			//await new Promise(resolve => setTimeout(resolve, 10));
			calcNeighbours(fieldsToCheck[i].x, fieldsToCheck[i].y, newFields);
			// console.clear();
			// pathMap.forEach(v=>console.log(...v));
			// directions.forEach(v=>console.log(...v));
		}
		if (newFields.length === 0) {
			goalReached = true;
		}
	}
	const endCoordinates = getCoordinatesOfChar('E', false);
	return pathMap[endCoordinates[0].y][endCoordinates[0].x];
}

// part 1();
// fill two dimensional array with null
let pathMap: (number|'.')[][] = Array.from({length: input.length}, () => Array.from({length: input[0].length}, () => '.'));
let directions = JSON.parse(JSON.stringify(fields)) as string[][]; // only used to visualize the path

const startCoordinates = getCoordinatesOfChar('S', false);
const result1 = getShortestPath(startCoordinates[0]);
console.log('result part1:', result1);

// part 2();
// get all elevations 'a'
const lowestElevations = getCoordinatesOfChar('a', true);
const results: Set<number> = new Set();
lowestElevations.forEach(coords => {
	const result = getShortestPath(coords);
	if (result !== '.') {
		// skip if no path found
		results.add(result);
	}
	pathMap = Array.from({length: input.length}, () => Array.from({length: input[0].length}, () => '.'));
	directions = JSON.parse(JSON.stringify(fields)) as string[][];
});
// get smallest number from set
console.log(`Result part2:`, Array.from(results).sort()[0]);
