import fs from 'fs';

const input = fs.readFileSync('./2022/day1/input.txt', 'utf-8')
	.trim()
	.split('\n');

let elveCalories: number[] = [0];

input.forEach((el: string) => {
	
	if (el !== '') {
		elveCalories[elveCalories.length-1] += parseInt(el);
	} else {
		elveCalories.push(0);
	}
});

// part 1
// find the max value in elveCalories
const maxCalories = Math.max(...elveCalories);
console.log(`Result part 1`, maxCalories);

// part 2
// get the sum of the top three carriers
const caloriesTopThreeElves = elveCalories.sort((a,b)=>b-a).slice(0,3).reduce((a,b)=>a+b);

console.log(`Result part 2`, caloriesTopThreeElves);

