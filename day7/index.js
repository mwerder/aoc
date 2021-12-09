const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8')
	.trim()
	.split(',').map(Number);
// DAY 7

function getMedian(crabs) {

	return crabs[crabs.length/2];
}

function calculateFuel(crabs, median) {

	const fuel = crabs.reduce((prev, curr) => {
		const fuelCost = Math.abs(curr - median);
		return prev + fuelCost;
	},0);

	return fuel;
}

function getFuelByDistance(distance) {

	let sum = 0;
	for (let i=0; i<=distance; i++) {

		sum += i;
	}
	return sum;
}

function calculateFuelBruteForce(crabs, max) {

	const fuelAll = [];

	for (let i=0; i<max; i++) {

		const fuel = crabs.reduce((prev, curr) => {

			return prev + getFuelByDistance(Math.abs(curr - i));
		},0);
		fuelAll.push(fuel);
	}
	return Math.min(...fuelAll);

}

const crabs = input.sort((a, b) => a - b);
// part 1
console.log('PART 1');
const median = getMedian(crabs);
console.log('median:', median);
const result = calculateFuel(crabs, median);
console.log('result:', result);


// part 2
console.log('PART 2');
const max = Math.max(...crabs);
console.log('max:', max);
const result2 = calculateFuelBruteForce(crabs, max);
console.log('result2:', result2);
