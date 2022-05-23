const Client = require('./Classes/Client');

module.exports = {
  init: key => {
    return new Client({ apiKey: key });
  },
};
