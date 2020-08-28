const { Harmony } = require('@harmony-js/core');
const { ChainID, ChainType } = require('@harmony-js/utils');
const GAS_LIMIT = 6721900;
const GAS_PRICE = 1000000000;

const options = {
  gasLimit: GAS_LIMIT,
  gasPrice: GAS_PRICE
};

const hmy = new Harmony(process.env.TESTNET_0_URL, {
  chainID: ChainID.HmyTestnet,
  chainType: ChainType.Harmony
});
const bridgeContractJson = require('../build/contracts/BridgeBank.json');
const tokenContractJson = require('../build/contracts/BridgeToken.json');
const tokenAmount = 1000000000000000000n;
const tokenContractAddress = tokenContractJson.networks['2'].address;
const bridgeContractAddress = bridgeContractJson.networks['2'].address;

module.exports = async () => {
  try {
    const tokenContract = hmy.contracts.createContract(tokenContractJson.abi, tokenContractAddress);
    tokenContract.wallet.addByPrivateKey(process.env.OPERATOR_PRIVATE_KEY);

    const txnApprove = hmy.transactions.newTx({
      to: tokenContractAddress
    });

    await tokenContract.wallet.signTransaction(txnApprove);

    await tokenContract.methods
      .approve(bridgeContractAddress, tokenAmount)
      .send(options)
      .then(result => {
        // console.log(result);
        console.log('Approve successfully!');
      })
      .catch(error => {
        console.log('Approve token error', error);
      });

    process.exit();
  } catch (error) {
    console.error({ error });
    process.exit();
  }
};
