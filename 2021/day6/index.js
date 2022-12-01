const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8')
	.trim()
	.split(',');
// DAY 6

function addFish(arr, count) {

	for(let i = 0; i<count; i++) {
		arr.push(8);
	}
	return arr;
}

function populateFish(input, days) {

	let fish = input;
	for (let i=0; i<days; i++) {
		let _localFish = [];
		let newFishCount = 0;

		fish.forEach(fish => {
			if (fish > 0) {

				_localFish.push(fish-1);
			} else {

				_localFish.push(6);
				newFishCount++;
			}
		});
		_localFish = addFish(_localFish, newFishCount);
		fish = _localFish;
	}

	return fish.length;
}

function populateFish2(input, days) {

	const population = new Array(9).fill(0);
	for (let i=0; i<input.length; i++) {
		let state = input[i];
		population[state] += 1;//parseInt(state);
	}

	for (let i=0; i<days; i++) {

		const previousFishPopulation = [...population];

		for (let age=0; age<population.length-1; age++) {
			population[age] = previousFishPopulation[age+1];
		}
		population[6] += parseInt(previousFishPopulation[0]);
		population[8] = parseInt(previousFishPopulation[0]);
	}

	const fishCount = population.reduce((previous, current) => {

		return previous + current;
	},0);

	return fishCount;
}

// part 1
console.log('PART 1');
const days = 80;
const result = populateFish(input, days);
console.log('result:', result);

// part 2
console.log('PART 2');

// results
const days2 = 256;
const result2 = populateFish2(input, days2);
console.log('result2:', result2);
