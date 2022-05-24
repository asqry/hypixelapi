const Api = require('./Api');
const Game = require('./Game');
const chalk = require('chalk');
let api = new Api();

class Player {
  constructor(data) {
    this.username = data.username;
    this.uuid = data.uuid;
    this.data = data;
    this.requestKey = data.apiKey;
    this.newPackageRank = data.player.newPackageRank || 'NONE';
    this.specialPrefix = data.prefix || 'NONE';
    this.monthlyRankColor = data.monthlyRankColor;
    this.karma = data.karma;
  }

  // player info

  getUsername() {
    return this.username;
  }

  getUUID() {
    return this.uuid;
  }

  getKarma() {
    return this.data.player.karma;
  }

  getOneTimeAchievments() {
    return this.data.player.achievementsOneTime;
  }

  async getStatus() {
    let playerData = await api.get({
      base_url: process.env.BASE_URL,
      endpoint: `/status?key=${this.requestKey}&uuid=${this.getUUID()}`,
    });

    return playerData.session;
  }

  // player ranks

  getSpecialPrefix() {
    return this.specialPrefix;
  }

  getRank() {
    return this.data.rank || 'NORMAL';
  }

  getPaidRank() {
    return this.newPackageRank;
  }

  isPlusPlus() {
    return this.data.monthlyPackageRank == 'SUPERSTAR';
  }

  async getMonthlyRankColor() {
    let isPlusPlus = await this.isPlusPlus();
    if (!isPlusPlus) return 'NONE';
    return this.monthlyRankColor;
  }

  // player friends

  async getFriends() {
    let playerData = await api.get({
      base_url: process.env.BASE_URL,
      endpoint: `/friends?key=${this.requestKey}&uuid=${this.getUUID()}`,
    });

    var friends = [];

    playerData.records.forEach(friend => {
      let newPlayer = new Player(friend);

      friends.push(newPlayer);
    });

    return friends;
  }

  // player game data

  async getRecentGames() {
    let playerData = await api.get({
      endpoint: `/recentgames?key=${this.requestKey}&uuid=${this.getUUID()}`,
    });

    var games = [];

    playerData.games.forEach(game => {
      let newGame = new Game(game);

      games.push(newGame);
    });

    return games;
  }

  async getRankedSkywarsData() {
    let gameData = await api
      .get({
        endpoint: `/player/ranked/skywars?key=${
          this.requestKey
        }&uuid=${this.getUUID()}`,
      })
      .catch(err => {
        throw new Error(console.error(chalk.red.bold(err.response.data.cause)));
      });

    return gameData.result;
  }

  getGameStatsByName(name) {
    let stats = Object.entries(this.data.player.stats).filter(
      x => x[0].toLowerCase() === name.toLowerCase()
    );
    if (!stats[0]) throw new Error(chalk.red.bold('Invalid game provided.'));
    return stats[0][1];
  }

  // player guilds

  async getGuild() {
    let guildData = await api.get({
      endpoint: `/guild?key=${this.requestKey}&player=${this.getUUID()}`,
    });

    return new Guild(guildData.guild);
  }
}

module.exports = Player;
