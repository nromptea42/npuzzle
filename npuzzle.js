const argv = process.argv.splice(2);
const fs = require('fs');
const parse = require('./parse.js');
const validate = require('./validate.js');
const moves = require('./moves.js');
const log = require('./logs.js');
const utility = require('./utility.js');
const solve = require('./algo.js');
const heuristic = require('./heuristic.js');

let data = {};
let parseArg = {};

for (var i = 0; i < argv.length; i++) {
	if (argv[i] == "-h" && !parseArg.heuristic) {
		if (argv[i + 1] == "manhattan" || argv[i + 1] == "xy" || argv[i + 1] == "misplaced_tiles")
			parseArg.heuristic = argv[i + 1];
	} else if (argv[i] == "-f" && !parseArg.file) {
		try {
			fs.accessSync(argv[i + 1], fs.constants.F_OK);
			parseArg.file = argv[i + 1];
		} catch (err) {
			log.warn("Le fichier n'est pas disponible");
		}
	} else if (argv[i] == "--help") {
		console.log("Comment utiliser :\nnode npuzzle.js [-f + filename] [-h + heuristic (manhattan | xy | misplaced_tiles)]");
		console.log("Si pas de fichier une grille sera générée aléatoirement.\nHeuristic par défaut = manhattan");
		console.log("Example : node npuzzle.js -f solvable -h xy");
		return;
	}
}

if (!parseArg.heuristic)
	parseArg.heuristic = heuristic.manhattan;
else if (parseArg.heuristic == "manhattan")
	parseArg.heuristic = heuristic.manhattan;
else if (parseArg.heuristic == "xy")
	parseArg.heuristic = heuristic.xy;
else if (parseArg.heuristic == "misplaced_tiles")
	parseArg.heuristic = heuristic.misplaced_tiles;

if (parseArg.file) {
	fs.readFile(parseArg.file, (err, filestr) => {
		if (err !== null)
		{
			console.log(err);
			return;
		}
		data = parse(filestr.toString('utf8'));
		if (!validate(data))
			return;
		let t = new Date().getTime();
		if(!solve(data, parseArg.heuristic)) {
			log.err("La grille n'est pas solvable");
			return
		}
		let newT = new Date().getTime();
		let test = newT - t;
		console.log("Solved in", newT - t, "milliseconds");
	});
} else {
	data.size = 3;
	data.grid = utility.fillGoal(data.size);
	if (!validate(data))
		return;
	utility.generator(data);
	let t = new Date().getTime();
	if(!solve(data, parseArg.heuristic)) {
		log.err("La grille n'est pas solvable");
		return
	}
	let newT = new Date().getTime();
	console.log("Solved in", newT - t, "milliseconds");
}