const Api = require('./Api');
const Player = require('./Player');
const chalk = require('chalk');

let api = new Api();

class Client {
  constructor(props) {
    this.api = api;
    this.apiKey = props.apiKey;
  }

  async validateKey() {
    api
      .get({
        base_url: process.env.BASE_URL,
        endpoint: `/key?key=${this.apiKey}`,
      })
      .then(res => {
        console.log(
          chalk.green.bold(`Looks like your key `) +
            chalk.green.underline(res.record.key) +
            chalk.green.bold(` is valid.`)
        );
      })
      .catch(err => {
        console.error(chalk.red(err.response.data.cause));
      });
  }

  async getPlayerByUuid(uuid) {
    let { player } = await api.get({
      base_url: process.env.BASE_URL,
      endpoint: `/player?key=${this.apiKey}&uuid=${uuid}`,
    });

    if (!player || player == null)
      return console.error(chalk.red('An invalid UUID was provided.'));

    return new Player(
      { uuid: player.uuid, username: player.displayname, apiKey: this.apiKey },
      player
    );
  }

  async getPlayerByUsername(username) {
    let playerData = await api
      .get({
        base_url: process.env.BASE_URL_MOJANG,
        endpoint: `/users/profiles/minecraft/${username}`,
      })
      .catch(err => {
        console.log(err);
      });

    return this.getPlayerByUuid(playerData.id);
  }
}

module.exports = Client;
