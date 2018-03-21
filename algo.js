const heuristic = require('./heuristic.js');
const utility = require('./utility.js');
const moves = require('./moves.js');
const log = require('./logs.js');
const Heap = require('heap');
const _ = require('lodash');

const opened = new Heap(function(a, b) {
	return a.score - b.score;
});
const closed = {};

function printResult(data, maxSet, totalSet) {
	console.log("Complexity in time : ", totalSet);
	console.log("Complexity in size : ", maxSet);
	console.log("Nombre de mouvements requis : ", closed[JSON.stringify(data.grid)]);
	data.listOfMoves.forEach(move => {
		if (move == moves.right)
			console.log("Deplacement droite");
		else if (move == moves.left)
			console.log("Deplacement gauche");
		else if (move == moves.up)
			console.log("Deplacement haut");
		else if (move == moves.down)
			console.log("Deplacement bas");
	})
	utility.printTaquin(data);
}

function getMoveList(data) {
	const movePossible = [];
	if (data.empty.row < data.size - 1)
		movePossible.push(moves.up);
	if (data.empty.row != 0)
		movePossible.push(moves.down);
	if (data.empty.col < data.size - 1)
		movePossible.push(moves.left);
	if (data.empty.col != 0)
		movePossible.push(moves.right);
	return movePossible;
}

function isInClose(data) {
	if (closed[JSON.stringify(data.grid)] != undefined) {
		return true;
	}
	return false;
}

function isInOpen(data) {
	let ret = false;
	opened.nodes.forEach(node => {
		if (utility.equal(data.grid, node.grid))
			ret = true;
	})
	return ret;
}

function aStarSolve(data, choseHeuristic) {
	utility.printTaquin(data);
	data.score = choseHeuristic(data);
	data.listOfMoves = [];
	opened.push(data);
	closed[JSON.stringify(data.grid)] = 0;
	let totalSet = 0;
	let maxSet = 0;
	while (!opened.empty()) {
		const current = opened.pop()
		if (utility.equal(current.grid, current.goal)) {
			printResult(current, maxSet, totalSet);
			return true;
		}
		const moveList = getMoveList(current);
		moveList.forEach(move => {
			const new_cost = closed[JSON.stringify(current.grid)] + 1;
			const newMove = _.cloneDeep(current);
			move(newMove);
			if(!isInClose(newMove) || new_cost < closed[JSON.stringify(newMove.grid)]) {
				closed[JSON.stringify(newMove.grid)] = new_cost;
				newMove.listOfMoves.push(move);
				newMove.score = new_cost + choseHeuristic(newMove);
				opened.push(newMove);
				totalSet++;
				if (maxSet < opened.size())
					maxSet = opened.size();
			}
		})
	}
	return false;
}

module.exports = aStarSolve;