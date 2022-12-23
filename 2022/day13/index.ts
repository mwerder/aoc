import fs from 'fs';

const input = fs.readFileSync('./2022/day13/input.txt', 'utf-8')
	.split('\n\n');

const isOrderCorrect = (left: number[]|number, right: number[]|number) : boolean|undefined => {

	if (Array.isArray(left) && Array.isArray(right)) {
		for (let i = 0; i < left.length && i < right.length; i++) {
			const leftItem = left[i];
			const rightItem = right[i];
			const result = isOrderCorrect(leftItem, rightItem);
			if (result !== undefined) {
				
				return result;
			}
		}
		if (left.length > right.length) return false;
		if (left.length < right.length) return true;
		return undefined;
	} else if (typeof left === 'number' && typeof right === 'number') {
		if (left > right) return false;
		if (left < right) return true;
		return undefined;
	} else {

		const leftNew = typeof left === 'number' ? [left] : left;
		const rightNew = typeof right === 'number' ? [right] : right;
		return isOrderCorrect(leftNew, rightNew);
	}
}

//part 1
const results: number[] = [];
input.forEach((line: string, idx: number) => {
	const [leftRaw, rightRaw] = line.split('\n');
	const left = JSON.parse(leftRaw);
	const right = JSON.parse(rightRaw);
	// console.log('+++++++++++++++++++++++++++++', idx);
	// console.log(`compare ${leftRaw} with ${rightRaw}`);
	if (isOrderCorrect(left, right)) {
		
		results.push(idx + 1);
	}
})	
console.log(`result part1:`, results.reduce((a,b) => a + b));

// part 2
// sort list
const i2 = fs.readFileSync('./2022/day13/input.txt', 'utf-8')
.trim()
.split('\n');

//remove all empty lines
let input2 = i2.filter((line: string) => line !== '');

// add required divider packages 
input2.push('[[2]]');
input2.push('[[6]]');

// sort list
input2.sort((a,b) => {
	const left = JSON.parse(a);
	const right = JSON.parse(b);
	if (isOrderCorrect(left, right)) return -1;
	if (isOrderCorrect(right, left)) return 1;
	return 0;
})

// find indexes
const idx = input2.findIndex(el => el === '[[6]]');
const idx2 = input2.findIndex(el => el === '[[2]]');
console.log('result part2:', (idx + 1) * (idx2 + 1));

