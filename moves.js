var log = require('./logs.js');

module.exports = {
	up: function move_up(data) {
		if (data.empty.row === data.size - 1)
			log.err("Impossible de bouger vers le haut")
		else {
			data.empty = { row: data.empty.row + 1, col: data.empty.col};
			let replace = data.grid[data.empty.row][data.empty.col];
			data.grid[data.empty.row][data.empty.col] = 0;
			data.grid[data.empty.row - 1][data.empty.col] = replace;
		}
	},

	down: function move_down(data) {
		if (data.empty.row === 0)
			log.err("Impossible de bouger vers le bas")
		else {
			data.empty = { row: data.empty.row - 1, col: data.empty.col};
			let replace = data.grid[data.empty.row][data.empty.col];
			data.grid[data.empty.row][data.empty.col] = 0;
			data.grid[data.empty.row + 1][data.empty.col] = replace;
		}
	},

	left: function move_left(data) {
		if (data.empty.col === data.size - 1)
			log.err("Impossible de bouger vers la gauche")
		else {
			data.empty = { row: data.empty.row, col: data.empty.col + 1};
			let replace = data.grid[data.empty.row][data.empty.col];
			data.grid[data.empty.row][data.empty.col] = 0;
			data.grid[data.empty.row][data.empty.col - 1] = replace;
		}
	},

	right: function move_right(data) {
		if (data.empty.col === 0)
			log.err("Impossible de bouger vers la droite")
		else {
			data.empty = { row: data.empty.row, col: data.empty.col - 1};
			let replace = data.grid[data.empty.row][data.empty.col];
			data.grid[data.empty.row][data.empty.col] = 0;
			data.grid[data.empty.row][data.empty.col + 1] = replace;
		}
	},
}