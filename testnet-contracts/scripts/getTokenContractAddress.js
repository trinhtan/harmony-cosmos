module.exports = async () => {
  try {
    const bridgeTokenContractJson = require('../build/contracts/BridgeToken.json');
    const tokenContractAddress = bridgeTokenContractJson.networks['2'].address;
    console.log(tokenContractAddress);
    return tokenContractAddress;
  } catch (error) {
    console.log(error);
    return;
  }
};
