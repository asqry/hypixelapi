const Api = require('./Api');
const Game = require('./Game');
let api = new Api();

class Player {
  constructor(data = {}, rawData, apiKey) {
    this.username = data.username;
    this.uuid = data.uuid;
    this.data = rawData;
    this.requestKey = data.apiKey;
  }

  getUsername() {
    return this.username;
  }

  getUUID() {
    return this.uuid;
  }

  getRank() {
    return this.data.rank || 'NORMAL';
  }

  getPaidRank() {
    return this.data.newPackageRank;
  }

  isPlusPlus() {
    return this.data.monthlyPackageRank == 'SUPERSTAR';
  }

  async getFriends() {
    let playerData = await api.get({
      base_url: process.env.BASE_URL,
      endpoint: `/friends?key=${this.requestKey}&uuid=${this.getUUID()}`,
    });

    return playerData.records;
  }

  async getRecentGames() {
    let playerData = await api.get({
      base_url: process.env.BASE_URL,
      endpoint: `/recentgames?key=${this.requestKey}&uuid=${this.getUUID()}`,
    });

    var games = [];

    playerData.games.forEach(game => {
      let newGame = new Game(game);

      games.push(newGame);
    });

    return games;
  }

  async getStatus() {
    let playerData = await api.get({
      base_url: process.env.BASE_URL,
      endpoint: `/status?key=${this.requestKey}&uuid=${this.getUUID()}`,
    });

    return playerData.session;
  }
}

module.exports = Player;
