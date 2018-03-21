function parse(file) {
	const data = file.split('\n');
	const object = {
		size: 0,
		grid: [],
	}
	for (var i = data.length - 1; i >= 0; i--) {
		if (!data[i])
			data.splice(i, 1);
		else if (data[i].charAt(0) == '#')
			data.splice(i, 1);
	}
	object.size = Number(data[0]);
	data.splice(0, 1);
	data.forEach(line => {
		numbers = line.split(' ');
		for (var i = numbers.length - 1; i >= 0; i--) {
			if (!numbers[i])
				numbers.splice(i, 1);
		}
		object.grid.push(numbers);
	});
	return object;
}

module.exports = parse;