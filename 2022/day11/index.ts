import fs from 'fs';

const input = fs.readFileSync('./2022/day11/input.txt', 'utf-8')
	.trim()
	.split('\n');
	

type Monkey = {
	items: number[];
	operation(arg0: number): number;
	test(arg0: number): number;
	inspectCount: number;
	divisor: number;
}

// parse monkeys
let currentMonkey = 0;
let monkeysRaw = [];
for (let i = 0; i<input.length; i++) {
	console.log(`${i}: ${input[i]}`)
}

const monkeys: Monkey[] = [];

for (let i = 0; i<input.length-5; i+=7) {
	// forgive me for this
	// i + 1 items
	let itemsString = input[i+1].split('Starting items: ');
	// convert comma separated string to array of numbers
	let items = itemsString[1].split(',').map((item) => parseInt(item));

	// i + 2 operation
	const operationRaw = input[i+2].split('Operation: new = old ')[1];
	console.log(`🚀 ~ file: index.ts:28 ~ operationRaw`, operationRaw);
	let operation;
	if (operationRaw === '* old') {
		operation = (x: number) => x * x;
	} else {
		const op = operationRaw.split(' ');
		switch (op[0]) {
			case '+':
				operation = (x: number) => x + parseInt(op[1]);
				
			break;
			case '/':
				operation = (x: number) => x / parseInt(op[1]);
			
			break;
			case '-':
				operation = (x: number) => x / parseInt(op[1]);
			break;
			case '*':
				operation = (x: number) => x * parseInt(op[1]);
			break;
			default:
				operation = (x: number) => x;
				break;
		}
	}
	// i + 3 test
	const divisor = parseInt(input[i+3].split('Test: divisible by ')[1]);
	const monkey1 = parseInt(input[i+4].split('If true: throw to monkey ')[1]);;
	const monkey2 = parseInt(input[i+5].split('If false: throw to monkey ')[1]);;
	const test = (x: number) => x % divisor === 0 ? monkey1 : monkey2;

	const monkey: Monkey = {
		items,
		operation,
		test,
		inspectCount: 0,
		divisor,
	}
	monkeys.push(monkey);
}

const globalMod = monkeys.reduce((a, b) => a * b.divisor, 1); // global modula to reduce numbers which are getting too big.

const monkeyProcessItem = (monkey: Monkey, item: number, isPart1: boolean) => {

	monkey.inspectCount++;
	const worryLevel = monkey.operation(item);
	const newWorryLevel = isPart1 ? Math.floor(worryLevel / 3) : worryLevel % globalMod;
	const targetMonkey = monkey.test(newWorryLevel);
	monkeys[targetMonkey].items.push(newWorryLevel);
}

const printItems = () => {
	for (let i = 0; i < monkeys.length; i++) {
		const monkey = monkeys[i];
		//console.log(`Monkey ${i} has ${monkey.items}`);
	}
}
// play for 20 rounds for part 1, 10000 for part 2
//for (let i = 0; i < 20; i++) {
for (let i = 0; i < 10000; i++) {

	// for each monkey
	for (let j = 0; j < monkeys.length; j++) {
		const monkey = monkeys[j];
		// for each item
		for (let k = 0; k < monkey.items.length; k++) {
			const item = monkey.items[k];
			// true => part1
			// false => part2
			monkeyProcessItem(monkey, item, false);
		}
		// monkey processed all his items
		monkey.items = [];
	}
	printItems();
}

const inspectedCount: number[] = [];
monkeys.forEach((monkey, idx) => {

	console.log(`monkey ${idx} inspected ${monkey.inspectCount} times`);
	inspectedCount.push(monkey.inspectCount);
});
// sort array of numbers


// results, change lines 94 and 105 to true/false to get part 1 or 2
const result = inspectedCount.sort((a,b)=>b-a);
console.log('result part: ',result[0] * result[1]);