const log = require('./logs.js');
const moves = require('./moves.js');

module.exports = {
	
	manhattan: function manhattan_distance(data) {
		const current = [].concat(...data.grid);
		const goal = [].concat(...data.goal);
		let distance = 0;

		current.forEach(nb => {
			if (nb != 0) {
				const g_i = goal.indexOf(nb);
				const c_i = current.indexOf(nb);
				const res_x = Math.round(Math.abs(g_i % data.size - c_i % data.size));
				const res_y = Math.round(Math.abs(g_i / data.size - c_i / data.size));
				distance += res_x + res_y;
			}
		})
		return distance;
	},

	xy: function xy(data) {
		const current = [].concat(...data.grid);
		const goal = [].concat(...data.goal);
		let distance = 0;
		const g_i = goal.indexOf(0);
		const c_i = current.indexOf(0);

		// Horizontal
		distance += Math.round(Math.abs(g_i % data.size - c_i % data.size));
		// Vertical
		distance += Math.round(Math.abs(g_i / data.size - c_i / data.size));
		return distance;
	},

	misplaced_tiles: function misplaced_tiles(data) {
		const current = [].concat(...data.grid);
		const goal = [].concat(...data.goal);
		let distance = 0;

		current.forEach(nb => {
			if (nb != 0) {
				if (goal.indexOf(nb) != current.indexOf(nb))
					distance += 1;
			}
		})
		return distance;
	},
};