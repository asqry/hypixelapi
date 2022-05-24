const GuildRank = require('./GuildRank');

class Guild {
  constructor(data = {}) {
    this.id = data._id;
    this.name = data.name || 'NONE';
    this.description = data.description || 'NONE';
    this.members = data.members || [];
    this.coins = data.coins || 0;
    this.createdDate = data.created;
    this.tag = data.tag || 'NONE';
    this.tagColor = data.tagColor || 'NONE';
    this.public = data.publiclyListed || false;
    this.ranks = data.ranks || [];
  }

  getMembers() {
    return this.members;
  }

  getRanks() {
    var ranks = [];
    this.ranks.forEach(rank => {
      let newRank = new GuildRank(rank);
      ranks.push(newRank);
    });

    return ranks.sort((a, b) => a.priority - b.priority);
  }

  getTag() {
    return this.tag;
  }

  getTagColor() {
    return this.tagColor;
  }

  isPubliclyListed() {
    return this.public;
  }

  getCoins() {
    return this.coins;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this._id;
  }

  getDescription() {
    return this.description;
  }

  getCreatedDate() {
    return this.createdDate;
  }
}

module.exports = Guild;
