const Api = require('./Api');
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

  getUuid() {
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
      endpoint: `/friends?key=${this.requestKey}&uuid=${this.getUuid()}`,
    });

    return playerData.records;
  }
}

module.exports = Player;
