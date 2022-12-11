import fs from 'fs';

const input = fs.readFileSync('./2022/day8/input.txt', 'utf-8')
	.trim()
	.split('\n');

const checkHorizontalVisibility = (row: number[], tree: number): boolean => {

	return(row.every((value) => value < tree))
}

const checkVisibility = (x: number, y: number, treeMap: number[][]): boolean => {

	// get the affected row from the edge to our tree of interest
	const row = treeMap[y].slice(0, x);
	if(checkHorizontalVisibility(row, treeMap[y][x])) {
		return true;
	}
	// get the affected row after the tree to the edge
	const row2 = treeMap[y].slice(x+1, treeMap[y].length);
	if(checkHorizontalVisibility(row2, treeMap[y][x])) {
		return true;
	}

	// get the affected column
	const col = treeMap.map((row) => row[x]);
	const col1 = col.slice(0, y);
	if(checkHorizontalVisibility(col1, treeMap[y][x])) {
		return true;
	}

	const col2 = col.slice(y+1, col.length);
	if(checkHorizontalVisibility(col2, treeMap[y][x])) {
		return true;
	}
	return false;
}

const treeMap: number[][] = input.map((line) => line.split('').map((char) => parseInt(char)));

// part 1
let treeCounter = 2*(treeMap.length) + 2*(treeMap[0].length-2); // trees on the edges
for (let y = 1; y<treeMap.length-1; y++) {
	for (let x = 1; x<treeMap[0].length-1; x++) {
		if(checkVisibility(x, y, treeMap)) {
			treeCounter++;
		}
	}	
}
console.log('result part1: ', treeCounter);


// part 2

const calculateScore = (row: number[], tree: number): number => {

	let distance = 0;
	for (let i = 0; i<row.length; i++) {
		if(row[i] < tree) {
			distance++
		} else {
			distance++
			break;
		}
	}
	return distance;
}

const getVisibilityScore = (x: number, y: number, treeMap: number[][]): number => {

	let score = 1;
	// get the affected row from the edge to our tree of interest
	const row = treeMap[y].slice(0, x);
	score *= calculateScore(row.reverse(), treeMap[y][x]);
	// get the affected row after the tree to the edge
	const row2 = treeMap[y].slice(x+1, treeMap[y].length);
	score *= calculateScore(row2, treeMap[y][x]);

	// get the affected column
	const col = treeMap.map((row) => row[x]);
	const col1 = col.slice(0, y);
	score *= calculateScore(col1.reverse(), treeMap[y][x]);

	const col2 = col.slice(y+1, col.length);
	score *= calculateScore(col2, treeMap[y][x]);

	return score;
}

let visibilityScore = 0;
for (let y = 1; y<treeMap.length-1; y++) {
	for (let x = 1; x<treeMap[0].length-1; x++) {
		const newScore = getVisibilityScore(x, y, treeMap);
		visibilityScore = Math.max(visibilityScore, newScore);
	}	
}

console.log(`result part2:`, visibilityScore);