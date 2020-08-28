module.exports = async () => {
  try {
    const bridgeBankJson = require('../build/contracts/BridgeBank.json');
    const address = bridgeBankJson.networks['2'].address;
    console.log(address);
    return address;
  } catch (error) {
    console.error({ error });
    return;
  }
};
