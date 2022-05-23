const axios = require('axios');
require('dotenv/config');

class Api {
  constructor(props) {}

  async get(request) {
    let url = request.base_url + request.endpoint;

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
