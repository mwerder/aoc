import fs from 'fs';

const input = fs.readFileSync('./2022/day3/input.txt', 'utf-8')
	.trim()
	.split('\n');

const getPriorities = (priorities: string[]) => {

	let sum = 0;
	priorities.forEach((p: string) => {

		// get unicode from character
		const unicode = p.charCodeAt(0);
		// unicode numbers:
		// A - Z = 65 - 90
		// a - z = 97 - 122
		const priority = unicode <= 90 ? unicode - 64 + 26 : unicode - 96;
		sum += priority;
	})

	return sum;
}

const duplicates: string[] = [];
input.forEach((line: string) => {
	
	// get left and right compartments
	const leftC = line.slice(0, line.length / 2);
	const rightC = line.slice(leftC.length, line.length);
	
	// find duplicate letters
	// compare strings and find duplicates
	for (let i = 0; i < leftC.length; i++) {
		
		if (rightC.includes(leftC[i])) {
			duplicates.push(leftC[i]);
			break;
		}
	}
})
const sum = getPriorities(duplicates);
console.log('Result part1:', sum);

// part 2
const groups: string[][] = [];
let i = 0;

input.forEach((line: string, idx: number) => {

	if (!groups[i]) {
		groups[i] = [line];
	}
	else if (groups[i].length < 3) {
		groups[i].push(line);
	} else {
		groups[++i] = [line];
	}
})

const badges: string[] = [];
groups.forEach((group: string[]) => {

	const sorted = group.sort((a: string, b: string) => a.length - b.length);
	// loop over the smallest group and find duplicates
	for (let i = 0; i < sorted[0].length; i++) {
	
		if (sorted[1].includes(sorted[0][i]) && group[2].includes(sorted[0][i])) {
			badges.push(sorted[0][i]);
			break;
		}
	}
});

const sum2 = getPriorities(badges);
console.log('Result part 2', sum2);
