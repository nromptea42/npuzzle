var chalk = require('chalk');

module.exports = {
	succ : function(str) {
		console.log(chalk.green('[SUCC] : ' + str));
	},
	err : function(str) {
		console.log(chalk.white(chalk.bgRed('[ERR] : ' + str)));
	},
	warn : function(str) {
		console.log(chalk.black(chalk.bgYellow('[WARN] : ' + str)));
	},
	info : function(str) {
		console.log(chalk.bgBlue(chalk.white('[INFO]')) + ' ' + str);
	}
}