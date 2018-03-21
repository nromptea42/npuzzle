const log = require('./logs.js');
const moves = require('./moves.js');

module.exports = {
	equal: function is_equal(grid, goal) {
		for (var i = 0; i < grid.length; i++) {
			for (var j = 0; j < grid[i].length; j++) {
				if (grid[i][j] != goal[i][j])
					return false;
			}
		}
		return true;
	},

	solvable: function is_solvable(grid, but, size) {
		let inversions = 0;
		let blank_row = 0;
		const puzzle = [].concat(...grid);
		const goal = [].concat(...but);

		for (var n = 0; n < puzzle.length; n++) {
			var i = puzzle[n];
			for (var k = puzzle.indexOf(i) + 1; k < puzzle.length; k++) {
				var j = puzzle[k];
				if (goal.indexOf(i) > goal.indexOf(j) && i != 0 && j != 0)
					inversions += 1;
			}
		}

		if (size % 2 == 0) {
			blank_row = Math.floor(puzzle.indexOf(0) / size + (goal.indexOf(0) / size));
		}

		if ((inversions + blank_row) % 2 == 0)
			return true;
		return false;
	},

	fillGoal: function fillGoal(size) {
		const totalSize = size * size;
		const goal = [];
		const ret = [];
		for (var i = 0; i < size * size; i++) {
			goal[i] = -1;
	 	}
		let current = 1;
		let x = 0;
		let i_x = 1;
		let y = 0;
		let i_y = 0;
		while (42) {
			goal[x + y * size] = current;
			if (current == 0)
				break;
			current += 1;
			if (x + i_x == size || x + i_x < 0 || (i_x != 0 && goal[x + i_x + y * size] != -1)) {
				i_y = i_x;
				i_x = 0;
			} else if (y + i_y == size || y + i_y < 0 || (i_y != 0 && goal[x + (y + i_y) * size] != -1)) {
				i_x = -i_y;
				i_y = 0;
			}
			x += i_x;
			y += i_y
			if (current == size * size)
				current = 0;
		}
		let slice = 0;
		for(var j = 0; j < size; j++) {
			ret.push(goal.slice(slice, slice + size));
			slice += size;
		}
		return ret;
	},

	printTaquin: function printTaquin(data) {
		data.grid.forEach(line => {
			console.log(line);
		})
	},

	generator: function generate_grid(data) {
		let it = 0;
		let prev_swp = -1;

		while (it < 50) {
			const movePossible = [];
			if (data.empty.row < data.size - 1 && prev_swp != "down")
				movePossible.push({func: moves.up, str: "up"});
			if (data.empty.row != 0 && prev_swp != "up")
				movePossible.push({func: moves.down, str: "down"});
			if (data.empty.col < data.size - 1 && prev_swp != "right")
				movePossible.push({func: moves.left, str: "left"});
			if (data.empty.col != 0 && prev_swp != "left")
				movePossible.push({func: moves.right, str: "right"});
			rand = Math.floor(Math.random() * movePossible.length);
			prev_swp = movePossible[rand].str;
			movePossible[rand].func(data);
			it++;
		}
	},

}