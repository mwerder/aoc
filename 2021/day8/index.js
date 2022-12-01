const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8')
	.trim()
	.split('\n');
// DAY 8

console.log('input:', input);

function getUniqueDigits(lines) {

	const outputValues = lines.map(e => e.split(' | ')[1]);
	console.log('outputValues:', outputValues);
	const outputValueArray = [];
	outputValues.forEach(el => {

		const lineArray = el.split(' ');
		lineArray.forEach(e => {
			outputValueArray.push(e);
		});
	});

	return outputValueArray.filter(el => el.length === 2 | el.length === 3 | el.length === 4 | el.length === 7).length;
}

// part 1
console.log('PART 1');
const result = getUniqueDigits(input);
console.log('result:', result);
