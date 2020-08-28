const { toWei } = require('web3-utils');

require('dotenv').config();

const Valset = artifacts.require('Valset');
const CosmosBridge = artifacts.require('CosmosBridge');
const Oracle = artifacts.require('Oracle');
const BridgeBank = artifacts.require('BridgeBank');
const BridgeRegistry = artifacts.require('BridgeRegistry');
const BridgeToken = artifacts.require('BridgeToken');

module.exports = function (deployer) {
  /*******************************************
   *** Input validation of contract params
   ******************************************/
  let operator;
  let initialValidators = [];
  let initialPowers = [];
  let consensusThreshold;

  consensusThreshold = process.env.CONSENSUS_THRESHOLD;

  operator = process.env.OPERATOR_ADDRESS;
  initialValidators.push(process.env.VALIDATOR1_ADDRESS);
  initialValidators.push(process.env.VALIDATOR2_ADDRESS);
  initialPowers = process.env.INITIAL_VALIDATOR_POWERS.split(',');

  /*******************************************************
   *** Contract deployment summary
   ***
   *** Total deployments:       7 (includes Migrations.sol)
   *** Gas price (default):                       20.0 Gwei
   *** Final cost:                         0.25369878 Ether
   *******************************************************/
  deployer.then(async () => {
    // 1. Deploy BridgeToken contract
    //    Gas used:        1,884,394 Gwei
    //    Total cost:    0.03768788 Ether
    await deployer.deploy(BridgeToken, 'TEST');

    // 2. Deploy Valset contract:
    //    Gas used:          909,879 Gwei
    //    Total cost:    0.01819758 Ether
    await deployer.deploy(Valset, operator.toString(), initialValidators, initialPowers);

    // 3. Deploy CosmosBridge contract:
    //    Gas used:       2,649,300 Gwei
    //    Total cost:     0.052986 Ether
    await deployer.deploy(CosmosBridge, operator, Valset.address);

    // 4. Deploy Oracle contract:
    //    Gas used:        1,769,740 Gwei
    //    Total cost:     0.0353948 Ether
    await deployer.deploy(
      Oracle,
      operator,
      Valset.address,
      CosmosBridge.address,
      consensusThreshold
    );

    // 5. Deploy BridgeBank contract:
    //    Gas used:        4,823,348 Gwei
    //    Total cost:    0.09646696 Ether
    await deployer.deploy(BridgeBank, operator, Oracle.address, CosmosBridge.address);

    // 6. Deploy BridgeRegistry contract:
    //    Gas used:          363,370 Gwei
    //    Total cost:     0.0072674 Ether
    return deployer.deploy(
      BridgeRegistry,
      CosmosBridge.address,
      BridgeBank.address,
      Oracle.address,
      Valset.address
    );
  });
};
