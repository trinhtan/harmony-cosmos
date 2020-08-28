require('dotenv').config();

const { TruffleProvider } = require('@harmony-js/core');

const operator_private_key = process.env.OPERATOR_PRIVATE_KEY;
const operator_meemonic = process.env.OPERATOR_MNEMONIC;
const testnet_url = process.env.TESTNET_0_URL;
//Mainnet
const mainnet_mnemonic = process.env.MAINNET_MNEMONIC;
const mainnet_private_key = process.env.MAINNET_PRIVATE_KEY;
const mainnet_url = process.env.MAINNET_0_URL;

//GAS - Currently using same GAS accross all environments
gasLimit = process.env.GAS_LIMIT;
gasPrice = process.env.GAS_PRICE;

module.exports = {
  // contracts_build_directory: '/build/contracts',
  networks: {
    testnet: {
      network_id: '2', // Any network (default: none)
      provider: () => {
        const truffleProvider = new TruffleProvider(
          testnet_url,
          { memonic: operator_meemonic },
          { shardID: 0, chainId: 2 },
          { gasLimit: gasLimit, gasPrice: gasPrice }
        );
        const newAcc = truffleProvider.addByPrivateKey(operator_private_key);
        truffleProvider.setSigner(newAcc);
        return truffleProvider;
      }
    },
    mainnet0: {
      network_id: '1', // Any network (default: none)
      provider: () => {
        const truffleProvider = new TruffleProvider(
          mainnet_url,
          { memonic: mainnet_mnemonic },
          { shardID: 0, chainId: 1 },
          { gasLimit: gasLimit, gasPrice: gasPrice }
        );
        const newAcc = truffleProvider.addByPrivateKey(mainnet_private_key);
        truffleProvider.setSigner(newAcc);
        return truffleProvider;
      }
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
    useColors: true
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.5.8'
    }
  }
};
