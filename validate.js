const log = require('./logs.js');
const utility = require('./utility.js');

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}

function getRightTab(size) {
	const maxNum = size * size;
	const arr = [];
	for(var i = 0; i < maxNum; i++) {
		arr.push(i);
	}
	return arr;
}

function findAllNumbers(data) {
	var flat = [].concat(...data.grid);
	flat.sort(function compareNumbers(a, b) {
  		return a - b;
	});
	const rightOne = getRightTab(data.size);
	return flat.equals(rightOne);
	
}

function validate(data) {
	let len = true;
	if (isNaN(data.size)) {
		log.err("La taille n'est pas un nombre");
		return false;
	}
	data.grid.forEach(line => {
		if (line.length != data.size)
			len = false;
	});

	if (!len) {
		log.err("Une ligne ne fait pas la bonne taille");
		return false;
	}

	if (!findAllNumbers(data)) {
		log.err("Il manque un ou plusieurs nombres dans la grille");
		return false;
	}

	let i = 0;
	data.grid.forEach(line => {
		let j = 0;
		line.forEach(nb => {
			if (nb == '0') {
				empty = { row: i, col: j };	
			}
			j++;
		})
		i++;
	})

	for (var k = 0; k < data.grid.length; k++) {
		for (var j = 0; j < data.grid[k].length; j++) {
			data.grid[k][j] = Number(data.grid[k][j])
		}
	}

	data.goal = utility.fillGoal(data.size);
	data.empty = empty;
	if (!utility.solvable(data.grid, data.goal, data.size)) {
		log.err("La grille n'est pas solvable");
		return false;
	}
	return true;
}

module.exports = validate;