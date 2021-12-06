const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8')
	.trim()
	.split('\n');

// DAY 5

function getBoardSize(lines) {

	let max = 0;
	lines.forEach(line => {

		const coordinates = line.split(' -> ');
		max = Math.max(max, parseInt(coordinates[0]), parseInt(coordinates[1]));
	});

	return max + 1;
}


function initBoard(boardSize){
	const board = [];
	for (let i = 0; i<boardSize; i++) {
		board[i] = new Array(boardSize).fill(0);
	}

	return board;
}

function addHorizontalLine(board, start, end) {

	const y1 = start[1];
	const x1 = Math.min(start[0], end[0]);
	const x2 = Math.max(start[0], end[0]);
	for (let i = x1; i<=x2; i++) {
		board[y1][i] = board[y1][i] + 1;
	}
	return board;
}

function addVerticalLine(board, start, end) {

	const x1 = start[0];
	const y1 = Math.min(start[1], end[1]);
	const y2 = Math.max(start[1], end[1]);
	for (let i = y1; i<=y2; i++) {
		board[i][x1] = board[i][x1] + 1;
	}
	return board;
}

function addDiagonalLine(board, start, end) {

	const xDirection = end[0] - start[0] > 0 ? 1 : -1;
	const yDirection = end[1] - start[1] > 0 ? 1 : -1;
	let x1 = parseInt(start[0]);
	let x2 = parseInt(end[0]);
	let y1 = parseInt(start[1]);

	const distance = Math.abs(x1-x2);
	for (let i =0; i<=distance; i++) {

		board[y1][x1] = board[y1][x1] + 1;
		x1 += xDirection;
		y1 += yDirection;
	}
	return board;
}

function drawBoard(board, lines, drawDiagonal) {
	let _board = JSON.parse(JSON.stringify(board));
	lines.forEach(line => {

		const coordinates = line.split(' -> ');
		const start = coordinates[0].split(',');
		const end = coordinates[1].split(',');
		if (start[1] === end[1]) {

			_board = addHorizontalLine(_board, start, end);
		} else if (start[0] === end[0]){

			_board = addVerticalLine(_board, start, end);
		} else {
			// ignore diagonal lines for part 1 of riddle
			if (drawDiagonal) {
				_board = addDiagonalLine(_board, start, end);
			}
		}
	});

	return _board;
}

function calculateDangerAreas(board) {

	let max = 0;
	board.forEach(line => {
		max += line.filter(num => num >=2).length;
	});

	return max;
}

// debugging
// function printBoard(board) {

// 	board.forEach(row => {
// 		console.log(JSON.stringify(row));
// 	});
// }

// part 1
console.log('PART 1');
const boardSize = getBoardSize(input);
const board = initBoard(boardSize);
const drawedBoard = drawBoard(board, input, false);
const result = calculateDangerAreas(drawedBoard);

// part 2
console.log('PART 2');
const drawedBoard2 = drawBoard(board, input, true);
const result2 = calculateDangerAreas(drawedBoard2);

// results
console.log('result1:', result);
console.log('result2:', result2);