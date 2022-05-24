class Util {
  constructor(data) {
    this.colorSymbol = '§';
  }

  normalizeColorText(text) {
    let symbolRegex = new RegExp(this.colorSymbol, 'gmi');
    return text.replace(symbolRegex, '&');
  }
}

module.exports = Util;
