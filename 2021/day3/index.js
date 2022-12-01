const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8')
	.trim()
	.split('\n');

// DAY 3

function getPowerConsumption() {

	let gamma = '';
	let epsilon = '';
	for (let n = 0; n<input[0].length; n++) {

		let ones = 0;
		input.forEach(number => {
			if (number[n] === '1') {

				ones++;
			}
		});

		gamma = ones > input.length / 2 ? gamma.concat('1') : gamma.concat('0');
		epsilon = ones > input.length / 2 ? epsilon.concat('0') : epsilon.concat('1');
	}

	return parseInt(gamma,2) * parseInt(epsilon,2);
}

function getGasRating(values, doGetOxygen, depth = 0) {

	if (values.length === 1) {

		return parseInt(values[0],2);
	} else {

		let filtered = [];
		let ones = 0;
		values.forEach(number => {
			if (number[depth] === '1') {

				ones++;
			}
		});
		if (doGetOxygen) {

			filtered = ones >= values.length / 2 ? values.filter(el => el[depth] === '1') : values.filter(el => el[depth] === '0');
		} else {

			filtered = ones < values.length / 2 ? values.filter(el => el[depth] === '1') : values.filter(el => el[depth] === '0');
		}

		return getGasRating(filtered, doGetOxygen, ++depth);
	}
}

console.log('result1: ', getPowerConsumption());
console.log('result2: ', getGasRating(input, true) * getGasRating(input, false));
