const Api = require('./Api');
const Player = require('./Player');
const chalk = require('chalk');
const Guild = require('./Guild');

let api = new Api();

const { error } = new (require('./Util'))();

var count = 0;

class Client {
  constructor(props) {
    this.api = api;
    this.apiKey = props.apiKey;
  }

  get key() {
    return this.apiKey;
  }

  async validateKey() {
    api
      .get({
        base_url: process.env.BASE_URL,
        endpoint: `/key?key=${this.apiKey}`,
      })
      .then(res => {
        console.log(
          chalk.green.bold(`Looks like your API key `) +
            chalk.bgGreen.gray.bold(res.record.key) +
            chalk.green.bold(` is valid.`)
        );
      })
      .catch(err => {
        return error(err.response.data.cause);
      });
  }

  // players

  async getPlayerByUuid(uuid) {
    let playerData =
      (await api
        .get({
          base_url: process.env.BASE_URL,
          endpoint: `/player?key=${this.apiKey}&uuid=${uuid}`,
        })
        .catch(err => {
          error(
            'An invalid UUID was provided, or that player has never joined the server.'
          );

          return null;
        })) || null;

    if (playerData == null) return error('Invalid UUID provided.');

    return new Player({
      ...playerData,
      uuid: playerData.player.uuid,
      username: playerData.player.displayname,
      apiKey: this.apiKey,
    });
  }

  async getPlayerByUsername(username) {
    let playerData =
      (await api
        .get({
          endpoint: `/users/profiles/minecraft/${username.trim()}`,
          mojang: true,
        })
        .catch(err => {
          return null;
        })) || null;

    if (playerData == null) return error('Invalid username provided.');

    return this.getPlayerByUuid(playerData.id);
  }

  // guilds

  async getGuildByPlayerUuid(uuid) {
    let guildData =
      (await api
        .get({
          base_url: process.env.BASE_URL,
          endpoint: `/guild?key=${this.apiKey}&player=${uuid}`,
        })
        .catch(() => {
          error(
            'An invalid UUID was provided, or that player is not in a guild.'
          );
          return null;
        })) || null;

    if (guildData == null)
      return error(
        'An invalid UUID was provided, or that player is not in a guild.'
      );

    return new Guild(guildData.guild);
  }

  async getGuildByGuildId(id) {
    let guildData = await api
      .get({
        base_url: process.env.BASE_URL,
        endpoint: `/guild?key=${this.apiKey}&id=${id}`,
      })
      .catch(() => {
        throw new Error(
          chalk.red.bold(
            'An invalid guild ID was provided. The suggested method is ' +
              chalk.bgRed.gray.bold('Client#getGuildByPlayerUuid()')
          )
        );
      });

    return new Guild(guildData.guild);
  }

  async getGuildByGuildName(name) {
    let guildData = await api
      .get({
        base_url: process.env.BASE_URL,
        endpoint: `/guild?key=${this.apiKey}&name=${name}`,
      })
      .catch(() => {
        throw new Error(
          chalk.red.bold(
            'An invalid guild name was provided. The suggested method is ' +
              chalk.bgRed.gray.bold('Client#getGuildByPlayerUuid()')
          )
        );
      });

    return new Guild(guildData.guild);
  }

  // achievements/challenges/quests

  async getAchievementList() {
    let achievementData = await api
      .get({
        endpoint: `/resources/achievements`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return achievementData;
  }

  async getChallengeList() {
    let challengeData = await api
      .get({
        endpoint: `/resources/challenges`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return challengeData;
  }

  async getQuestList() {
    let questData = await api
      .get({
        endpoint: `/resources/quests`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return questData;
  }

  async getGuildAchievementList() {
    let achievementData = await api
      .get({
        endpoint: `/resources/guilds/achievements`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return achievementData;
  }

  // cosmetics

  async getVanityPetList() {
    let petData = await api
      .get({
        endpoint: `/resources/vanity/pets`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return petData;
  }

  async getVanityCompanionList() {
    let companionData = await api
      .get({
        endpoint: `/resources/vanity/companions`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return companionData;
  }

  // skyblock

  async getSkyBlockCollectionList() {
    let collectionData = await api
      .get({
        endpoint: `/resources/skyblock/collections`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return collectionData;
  }

  async getSkyBlockSkillList() {
    let skillData = await api
      .get({
        endpoint: `/resources/skyblock/skills`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return skillData;
  }

  async getSkyBlockItemList() {
    let itemData = await api
      .get({
        endpoint: `/resources/skyblock/items`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return itemData;
  }

  async getSkyBlockElectionData() {
    let collectionData = await api
      .get({
        endpoint: `/resources/skyblock/election`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return collectionData;
  }

  async getSkyBlockBingoGoalList() {
    let bingoData = await api
      .get({
        endpoint: `/resources/skyblock/bingo`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return bingoData;
  }

  async getSkyBlockRecentlyEndedAuctionList() {
    let auctionData = await api
      .get({
        endpoint: `/skyblock/auctions`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return auctionData;
  }

  async getSkyBlockRecentlyEndedAuctionList() {
    let auctionData = await api
      .get({
        endpoint: `/skyblock/auctions_ended`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return auctionData;
  }

  async getSkyBlockBazaarData() {
    let bazaarData = await api
      .get({
        endpoint: `/skyblock/bazaar`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return bazaarData;
  }

  async getSkyBlockNews() {
    let newsData = await api
      .get({
        endpoint: `/skyblock/news?key=${this.apiKey}`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return newsData;
  }

  async getSkyBlockAuctionById(uuid) {
    let auctionData = await api
      .get({
        endpoint: `/skyblock/auction?key=${this.apiKey}&uuid=${uuid}`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return auctionData.auctions;
  }

  async getSkyBlockAuctionByPlayerUuid(uuid) {
    let auctionData = await api
      .get({
        endpoint: `/skyblock/auction?key=${this.apiKey}&player=${uuid}`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return auctionData.auctions;
  }

  async getSkyBlockAuctionByProfileId(uuid) {
    let auctionData = await api
      .get({
        endpoint: `/skyblock/auction?key=${this.apiKey}&profile=${uuid}`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return auctionData.auctions;
  }

  // skyblock profile

  async getSkyBlockProfileByProfileId(uuid) {
    let profileData = await api
      .get({
        endpoint: `/skyblock/profile?key=${this.apiKey}&profile=${uuid}`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return profileData.profile;
  }

  async getSkyBlockProfileListByPlayerUuid(uuid) {
    let profileData = await api
      .get({
        endpoint: `/skyblock/profiles?key=${this.apiKey}&uuid=${uuid}`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return profileData.profiles;
  }

  // skyblock bingo data
  async getSkyBlockBingoDataByPlayerUuid(uuid) {
    let bingoData = await api
      .get({
        endpoint: `/skyblock/bingo?key=${this.apiKey}&uuid=${uuid}`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return bingoData.events;
  }

  // misc network info

  async getActiveNetworkBoosters() {
    let boosterData = await api
      .get({
        endpoint: `/boosters?key=${this.apiKey}`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return boosterData.boosters;
  }

  async getCurrentPlayerCountList() {
    let countData = await api
      .get({
        endpoint: `/counts?key=${this.apiKey}`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return countData.games;
  }

  async getCurrentGameLeaderboardData() {
    let leaderboardData = await api
      .get({
        endpoint: `/leaderboards?key=${this.apiKey}`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return leaderboardData.leaderboards;
  }

  async getCurrentPunishmentStatistics() {
    let punishmentData = await api
      .get({
        endpoint: `/punishmentstats?key=${this.apiKey}`,
      })
      .catch(err => {
        return error(err.response.data.cause);
      });

    return punishmentData;
  }
}

module.exports = Client;
