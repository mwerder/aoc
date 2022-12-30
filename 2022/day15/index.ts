import fs from 'fs';

const input = fs.readFileSync('./2022/day15/input.txt', 'utf-8')
	.trim()
	.split('\n');

console.log(input);

type Coords = {
	x: number;
	y: number;
}

const sensors: Coords[] = [];
const beacons: Coords[] = [];

input.forEach(line => {

	const sensorX = parseInt(line.split('x=')[1].split(',')[0]);
	const sensorY = parseInt(line.split('y=')[1].split(':')[0]);
	const sensor = {
		x: sensorX,
		y: sensorY
	}
	sensors.push(sensor);

	const beaconX = parseInt(line.split('x=')[2].split(',')[0]);
	const beaconY = parseInt(line.split('y=')[2]);

	const beacon = {
		x: beaconX,
		y: beaconY
	}
	beacons.push(beacon);

})

const tryAdd = (y: number, x: number, sensor: Coords, beacon: Coords, emptyPositions: Set<number>, row: number) => {
	
	if (x === sensor.x && y === sensor.y || x === beacon.x && y === beacon.y) {
		return;
	}

	emptyPositions.add(x);
}

const addEmptyPositions = (sensor: Coords, beacon: Coords, emptyPositions: Set<number>, row: number) => {
	
	const distance = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
	const distanceY = Math.abs(sensor.y - beacon.y);
	if (sensor.y <= row && sensor.y + distance >= row || sensor.y >= row && sensor.y - distance <= row) {

		for (let j = 0; j<=distance - Math.abs(sensor.y - row); j++) {
			
			tryAdd(row, sensor.x + j, sensor, beacon, emptyPositions, row);
			tryAdd(row, sensor.x - j, sensor, beacon, emptyPositions, row);
		}
	}
}

const getEmptyPositionsCount = (sensors: Coords[], beacons: Coords[], rowOfInterest: number) => {

	// use a set to remember all the empty positions.
	// using a 2d array resulted in a runtime exception as it is too large.
	const emptyPositions = new Set<number>();

	for (let i = 0; i<sensors.length; i++) {
		
		addEmptyPositions(sensors[i], beacons[i], emptyPositions, rowOfInterest);
	};

	return emptyPositions;
}

const getTuningFrequencyPosition = (sensors: Coords[], beacons: Coords[], max: number) => {

	for (let i = 0; i<max; i++) {
		
		const emptyPositions = getEmptyPositionsCount(sensors, beacons, i);
		const emptyPositionsFiltered = [...emptyPositions].filter(e => e >= 0 && e <= max);
		if (emptyPositionsFiltered.length < max) {
			return i;
		}
	}
	return 0;
}

const rowOfInterest = 2000000;
const result = getEmptyPositionsCount(sensors, beacons, rowOfInterest);
console.log(`🚀 ~ file: index.ts:157 ~ result`, result.size);

// part 2

// needs performance improvment....
const max = 4000000;
const position = getTuningFrequencyPosition(sensors, beacons, max);
console.log(`🚀 ~ file: index.ts:94 ~ frequency`, position * 400000 + position);
