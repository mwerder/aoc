const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8')
	.trim()
	.split('\n');

// DAY 4

function validateCard(card, numbers) {

	let hasBingo = card.some((row) => {

		const hasBingo = row.every((number)=> numbers.includes(number));
		return hasBingo;
	});

	if (!hasBingo) {
		// try find bingo with columns
		const columns = [];
		for (let i = 0; i<card.length; i++) {
			const column = [];
			card.forEach(row => {
				column.push(row[i]);
			});
			columns.push(column);
		}

		hasBingo = columns.some((column) => {

			const hasBingo = column.every((number) => numbers.includes(number));
			return hasBingo;
		});
	}
	return hasBingo;
}

function calculateBingoScore(card, numbers) {

	const cardNumbers = [];
	card.forEach(row => {
		row.forEach(number => {
			cardNumbers.push(number);
		});
	});
	const unmarkedNumbers = cardNumbers.filter(number => !numbers.includes(number));
	const sumOfUnmarked = unmarkedNumbers.reduce((a,b) => {return a+b;}, 0);
	return sumOfUnmarked * numbers[numbers.length-1];
}

// init cards
const drawedNumbers = input[0].split(',').map(e => parseInt(e));
const cardsUnformatted = input.slice(2);
const cards = [];
let card = [];
let row = [];

for (let i = 0; i<cardsUnformatted.length; i++) {

	if(cardsUnformatted[i] === '') {
		// new card begins
		cards.push(card);
		card = []; // reset card obj
	} else {

		row = cardsUnformatted[i].split(' ').filter(e => e !== '').map(e => parseInt(e));
		card.push(row); // add row to card
	}
}
cards.push(card); // add card


// validate cards
// part 1 , find first bingo card
for (let i = 0; i<drawedNumbers.length; i++) {

	const numbers = drawedNumbers.slice(0, i);
	let bingoCard;
	// find first bingo card
	const firstBingo = cards.some(card => {

		const firstBingo = validateCard(card, numbers);
		bingoCard = card;
		return firstBingo;
	});

	if (firstBingo) {

		console.log('BINGO card:', bingoCard);
		const resultPart1 = calculateBingoScore(bingoCard, numbers);
		console.log('resultPart1:', resultPart1);
		break;
	}
}

// part 2 , find last bingo card
const bingoIndex = []; // cards with bingo
let bingoCard;
for (let i = 0; i<drawedNumbers.length; i++) {

	const numbers = drawedNumbers.slice(0, i);
	// find first bingo card

	const lastBingo = cards.some((card, i) => {
		bingoCard = card;
		if (bingoIndex.includes(i)) {
			// ignore that card, already has bingo
		} else {

			const hasBingo = validateCard(card, numbers);
			if (hasBingo) {

				bingoIndex.push(i); // add index to array of completed bingo cards to ingore them next time.

				if (bingoIndex.length === cards.length) {

					// found the last card to have bingo
					return true;
				}
			}
		}
		return false;
	});

	if (lastBingo) {

		const result = calculateBingoScore(bingoCard, numbers);
		console.log('result2:', result);
		break;
	}
}
