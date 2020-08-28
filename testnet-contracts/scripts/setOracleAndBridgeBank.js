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

const cosmosBridgeJson = require('../build/contracts/CosmosBridge.json');
const oracleJson = require('../build/contracts/Oracle.json');
const bridgeBankJson = require('../build/contracts/BridgeBank.json');

const cosmosBridgeAddress = cosmosBridgeJson.networks['2'].address;
const oracleJsonAddress = oracleJson.networks['2'].address;
const bridgeBankAddress = bridgeBankJson.networks['2'].address;

module.exports = async () => {
  /*******************************************
   *** Set up
   ******************************************/
  try {
    const cosmosBridge = hmy.contracts.createContract(cosmosBridgeJson.abi, cosmosBridgeAddress);
    cosmosBridge.wallet.addByPrivateKey(process.env.OPERATOR_PRIVATE_KEY);

    // Set Oracle
    const txnSetupOracle = hmy.transactions.newTx({
      to: cosmosBridgeAddress
    });

    await cosmosBridge.wallet.signTransaction(txnSetupOracle);

    await cosmosBridge.methods
      .setOracle(oracleJsonAddress)
      .send(options)
      .then(result => {
        // console.log(result);
        console.log('Setup Oracle successfully!');
      })
      .catch(error => {
        console.log('Setup Oracle error', error);
      });

    // Set BridgeBank
    const txnSetBridgeBank = hmy.transactions.newTx({
      to: cosmosBridgeJson.networks['2'].address
    });

    await cosmosBridge.wallet.signTransaction(txnSetBridgeBank);
    await cosmosBridge.methods
      .setBridgeBank(bridgeBankAddress)
      .send(options)
      .then(result => {
        // console.log(result);
        console.log('Setup BridgeBank successfully!');
      })
      .catch(error => {
        console.log('Setup BridgeBank error', error);
      });

    process.exit();
  } catch (error) {
    console.error({ error });
    console.log('ERROR:', error);
    process.exit();
  }
};
