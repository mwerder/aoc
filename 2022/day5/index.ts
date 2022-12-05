import fs from 'fs';

const input = fs.readFileSync('./2022/day5/input.txt', 'utf-8')
	//.trim()
	.split('\n');


const border = input.indexOf('');
const stackInput = input.slice(0, border);
const movesInput = input.slice(border+1, input.length);
const stackSize = stackInput[stackInput.length-1].trim().split(' ').pop(); // get the last number from the stack size line
if (!stackSize) {
	// if we don't have stackSize, we're in trouble
	throw new Error('stackSize is undefined');
};
let stacks: string[][] = []

const moveCrate = (_amount: string, _from: string, _to: string, stacks: string[][]) => {

	const amount = parseInt(_amount);
	const from = parseInt(_from)-1;
	const to = parseInt(_to)-1;

	for (let i = 0; i < amount; i++) {
		const crate = stacks[from].pop();
		if (crate) {
			stacks[to].push(crate);
		}
	}
};

// CrateMover9001 can move multiple crates at once
const moveCrate9001 = (_amount: string, _from: string, _to: string, stacks: string[][]) => {

	const amount = parseInt(_amount);
	const from = parseInt(_from)-1;
	const to = parseInt(_to)-1;
	const movingCrates = stacks[from].splice(stacks[from].length-amount, amount);
	stacks[to] = [...stacks[to], ...movingCrates];
};

// init stack
for (let i = 0; i < stackInput.length-1; i++) {
	for (let j = 0; j < parseInt(stackSize); j++) {
		if (stackInput[i][j * 4 + 1] !== ' ') { // the character is at position j*4+1
			if (!stacks[j]) {
				stacks[j] = [];
			}
			stacks[j].splice(0, 0, stackInput[i][j * 4 + 1]); // insert at the beginning
		}
	}
}

const stackPart1 = JSON.parse(JSON.stringify(stacks));
const stackPart2 = JSON.parse(JSON.stringify(stacks));

// part 1
movesInput.forEach(move => {
	const [amount, from, to] = move.replace('move', '').replace('from', '').replace('to', '').trim().split('  ');
	moveCrate(amount, from, to, stackPart1);
})

let result = '';
stackPart1.forEach((stack: string[]) => {
	result += stack.pop();
})
console.log('result part1: ', result);

// part 2
movesInput.forEach(move => {
	const [amount, from, to] = move.replace('move', '').replace('from', '').replace('to', '').trim().split('  ');
	moveCrate9001(amount, from, to, stackPart2);
})

let result2 = '';
stackPart2.forEach((stack: string[]) => {
	result2 += stack.pop();
})
console.log('result part2: ', result2);

