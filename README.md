[![hypixel logo](https://hypixel.net/styles/hypixel-v2/images/header-logo.png)](https://hypixel.net)

A simple API Wrapper for the [Hypixel API](https://api.hypixel.net)

[![Npm package version](https://img.shields.io/npm/v/hypixel-api-client)](https://npmjs.com/package/hypixel-api-client) [![GitHub commits](https://img.shields.io/github/last-commit/asqry/hypixelapi)](https://GitHub.com/asqry/hypixelapi/commit/) [![Npm license](https://img.shields.io/npm/l/hypixel-api-client)](https://GitHub.com/asqry/hypixelapi/commit/)

## Example Client:

```js
const HypixelAPI = require('hypixel-api-client').init('YOUR_API_KEY_HERE');

HypixelAPI.validateKey();

(async () => {
  const rugs = await HypixelAPI.getPlayerByUsername('rugs');

  console.log('MVP++:', rugs.isPlusPlus());
  console.log('Rank:', rugs.());
  console.log('Special Rank:', rugs.getRank());
})();
```

## Output:

```shell
Looks like your API key ________ is valid.
MVP++: false
Rank: MVP_PLUS
Special Rank: NORMAL
```
