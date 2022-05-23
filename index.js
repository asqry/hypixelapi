const Client = require('./Classes/Client');
require('dotenv/config');
const client = new Client({ apiKey: process.env.TEST_API_KEY });

(async () => {
  // client.validateKey();

  let player = await client.getPlayerByUsername('rugs');

  console.log('RANK:', player.getPaidRank());
  console.log(`STAFF: ${player.getRank() !== 'NORMAL' ? 'yes' : 'no'}`);
  console.log(`MVP++: ${player.isPlusPlus() ? 'yes' : 'no'}`);

  (await player.getFriends()).forEach(async p => {
    let id = p.uuidSender == player.uuid ? p.uuidReceiver : p.uuidSender;
    let pl = await client.getPlayerByUuid(id);

    console.log(pl.getUsername());
  });
})();
