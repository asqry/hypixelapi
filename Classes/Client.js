const Api = require('./Api');
const Player = require('./Player');
const chalk = require('chalk');

let api = new Api();

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
            chalk.bgGreen.black.bold(res.record.key) +
            chalk.green.bold(` is valid.`)
        );
      })
      .catch(err => {
        console.error(chalk.red.bold(err.response.data.cause));
      });
  }

  async getPlayerByUuid(uuid) {
    let { player } = await api.get({
      base_url: process.env.BASE_URL,
      endpoint: `/player?key=${this.apiKey}&uuid=${uuid}`,
    });

    if (player == null) {
      console.error(
        chalk.red.bold(
          'An invalid UUID was provided, or that player has never joined the server.'
        )
      );
    } else {
      return new Player(
        {
          uuid: player.uuid,
          username: player.displayname,
          apiKey: this.apiKey,
        },
        player
      );
    }
  }

  async getPlayerByUsername(username) {
    let playerData = await api
      .get({
        base_url: process.env.BASE_URL_MOJANG,
        endpoint: `/users/profiles/minecraft/${username}`,
      })
      .catch(err => {
        console.error(err);
      });

    return this.getPlayerByUuid(playerData.id);
  }
}

module.exports = Client;
