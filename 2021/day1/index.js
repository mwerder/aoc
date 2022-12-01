const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8')
	.trim()
	.split('\n');

// DAY 1

function getIncreases(arr) {

	let count = 0;
	for (let i = 1; i<arr.length; i++) {

		if (arr[i] > arr[i-1]) {
			count++;
		}
	}
	return count;
}

function getIncreases2(arr) {

	let increases = 0;

	for (let i = 3; i<arr.length; i++) {
		const prev = arr[i-3] + arr[i-2] + arr[i-1];
		const current = arr[i-2] + arr[i-1] + arr[i];
		if (current > prev) {
			increases++;
		}
	}

	return increases;
}

const numbers = input.map(el => parseInt(el));

console.log('result1:', getIncreases(numbers));
console.log('result2:', getIncreases2(numbers));