import fs from 'fs';

const input = fs.readFileSync('./2022/day6/input.txt', 'utf-8')
	.trim()
	.split('\n');

const hasDuplicate = ((arr: string[]) => {
	// check if there is a duplicate
	return arr.length !== new Set(arr).size;
});

const checkMessage = (message: string, packageSize: number) => {

	const size = packageSize-1;
	for (let i = size; i<=message.length-1; i++) {

		// take substring at position i
		const substring = message.slice(i-size, i+1);
		if (!hasDuplicate(substring.split(''))) {
			console.log(`🚀 ~ file: index.ts:15 ~ result`, i+1);
			break;
		}
	}
};

const string = input[0];
// part 1
checkMessage(string, 4);
// part 2
checkMessage(string, 14);