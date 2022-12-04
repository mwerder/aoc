import fs from 'fs';

const input = fs.readFileSync('./2022/day4/input.txt', 'utf-8')
	.trim()
	.split('\n');

type Section = {
	length: number,
	min: number,
	max: number
}

const hasFullOverlap = (elve1: string, elve2: string) => {

	const s1 = elve1.split('-');
	const s2 = elve2.split('-');

	const section1: Section = {

		length: parseInt(s1[1]) - parseInt(s1[0]),
		min: parseInt(s1[0]),
		max: parseInt(s1[1]),
	}

	const section2: Section = {
		length: parseInt(s2[1]) - parseInt(s2[0]),
		min: parseInt(s2[0]),
		max: parseInt(s2[1]),
	}

	if (section1.length > section2.length) {
		if ((section2.min >= section1.min) && (section2.max <= section1.max)) {
			// overlap
			return true;
		}
	} else {
		if (section1.min >= section2.min && section1.max <= section2.max) {
			// overlap
			return true;
		}
	}

	return false;
}

const hasOverlap = (elve1: string, elve2: string) => {

	const s1 = elve1.split('-');
	const s2 = elve2.split('-');

	const section1: number[] = [];
	const section2: number[] = [];
	
	for (let i = parseInt(s1[0]); i <= parseInt(s1[1]); i++) {
		section1.push(i);
	}
	for (let i = parseInt(s2[0]); i <= parseInt(s2[1]); i++) {
		section2.push(i);
	}
	
	if (section1.length < section2.length) {
		return checkOverlap(section1, section2);
	} else {
		return checkOverlap(section2, section1);
	}
}

const checkOverlap = (arr1: number[], arr2: number[]) => {

	for (let i = 0; i < arr1.length; i++) {
		if (arr2.includes(arr1[i])) {
			return true;
		}
	}
	return false;
}

let fulloverlapCount = 0;
let overlapCount = 0;
input.forEach(line => {

	const [elve1, elve2] = line.split(',');
	if (hasFullOverlap(elve1, elve2)) {
		fulloverlapCount++;
	}
	if (hasOverlap(elve1, elve2)) {
		overlapCount++;
	}
})

console.log('result part1: ', fulloverlapCount);
console.log('result part2 ', overlapCount);