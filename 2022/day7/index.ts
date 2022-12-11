import fs from 'fs';

const input = fs.readFileSync('./2022/day7/input.txt', 'utf-8')
	.trim()
	.split('\n');


type Node = {
	parent?: Node,
	files: {
		[key: string]: number,
	}
	dirs: {
		[key: string]: Node,
	}
}

const head: Node = { files: {}, dirs: {} };
const dirSizes: number[] = []

let currentNode = head;

// craete tree
input.forEach((line: string) => {
	const instructions = line.split(' ');
	if (instructions[0] === '$') {
		// instruction
		if (instructions[1] === 'cd') {
			const dir = instructions[2];
			if (dir === '/') {
				currentNode = head;
			} else if (dir === '..') {
				currentNode = currentNode.parent ?? head;
			} else {
				if (!currentNode.dirs[dir]) {
					currentNode.dirs[dir] = { parent: currentNode ,files: {}, dirs: {} };
					currentNode = currentNode.dirs[dir];
				} else {
					currentNode = currentNode.dirs[dir];
				}
			}
		}
	} else if (instructions[0] !== 'dir') {
		// file
		currentNode.files[instructions[1]] = parseInt(instructions[0])
	}
});

const calculateDirSize = (node: Node): number => {

	let size = 0;
	for (let file in node.files) {
		size += node.files[file]
	}

	for (let dir in node.dirs) {
		const dirSize = calculateDirSize(node.dirs[dir])
		size += dirSize;
		dirSizes.push(dirSize)
	}

	return size;
};

const total = calculateDirSize(head);
const result = dirSizes.filter(size => size <= 100000).reduce((acc, size) => acc + size, 0);
console.log(`result part1:`, result);

// part 2

const DISK_SIZE = 70000000;
const UPDATE_SIZE = 30000000;
const used = DISK_SIZE - total;
const needed = UPDATE_SIZE - used;

const possibleDirs = dirSizes.filter(size => size >= needed);
console.log(`result part2:`, Math.min(...possibleDirs));
