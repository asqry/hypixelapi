class GuildRank {
  constructor(data) {
    this.priority = data.priority;
    this.name = data.name;
    this.createdDate = data.created;
    this.defaultRank = data.default;
  }

  getPriority() {
    return this.priority;
  }

  getName() {
    return this.name;
  }

  getCreatedDate() {
    return this.createdDate;
  }

  isDefaultRank() {
    return this.defaultRank;
  }
}

module.exports = GuildRank;
