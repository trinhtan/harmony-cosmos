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

const tokenContractJson = require('../build/contracts/BridgeToken.json');
const tokenContractAddress = tokenContractJson.networks['2'].address;
const TOKEN_AMOUNT = (1).toString().padEnd(20, '0');

module.exports = async () => {
  try {
    // Send mint transaction
    const tokenContract = hmy.contracts.createContract(tokenContractJson.abi, tokenContractAddress);
    tokenContract.wallet.addByPrivateKey(process.env.OPERATOR_PRIVATE_KEY);

    const txnMint = hmy.transactions.newTx({
      to: tokenContractAddress
    });

    await tokenContract.wallet.signTransaction(txnMint);

    await tokenContract.methods
      .mint(process.env.OPERATOR_ADDRESS, TOKEN_AMOUNT)
      .send(options)
      .then(result => {
        // console.log(result);
        console.log('Mint token successfully!');
      })
      .catch(error => {
        console.log('Mint token error', error);
      });

    process.exit();
  } catch (error) {
    console.error({ error });
    process.exit();
  }
};
