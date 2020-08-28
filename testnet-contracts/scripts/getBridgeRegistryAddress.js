module.exports = async () => {
  try {
    const bridgeRegistryJson = require('../build/contracts/BridgeRegistry.json');
    const address = bridgeRegistryJson.networks['2'].address;
    console.log(address);
    return address;
  } catch (error) {
    console.error({ error });
    return;
  }
};
