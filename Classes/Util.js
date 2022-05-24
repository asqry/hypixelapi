const chalk = require('chalk');

class Util {
  constructor(data) {
    this.colorSymbol = '§';
  }

  normalizeColorText(text) {
    let symbolRegex = new RegExp(this.colorSymbol, 'gmi');
    return text.replace(symbolRegex, '&');
  }

  error(text) {
    return console.log(chalk.red.bold(text));
  }
}

module.exports = Util;
