const axios = require('axios');

class Api {
  constructor(props) {}

  async get(request) {
    let base_url = request.mojang
      ? 'https://api.mojang.com'
      : 'https://api.hypixel.net';
    let url = base_url + request.endpoint;

    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = Api;
