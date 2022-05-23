class Game {
  constructor(data = {}) {
    this.gameType = data.gameType;
    this.gameStartedDate = data.date;
    this.gameMode = data.mode;
    this.mapName = !data.map || data.map == undefined ? null : data.map;
    this.gameEndedDate = data.ended;
  }

  getGameType() {
    return this.gameType;
  }

  getGameStartedDate() {
    return this.gameStartedDate;
  }

  getGamemode() {
    return this.gameMode;
  }

  getMapName() {
    return this.mapName;
  }

  getGameEndedDate() {
    return this.gameEndedDate;
  }
}

module.exports = Game;
