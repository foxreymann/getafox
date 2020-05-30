const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = require('../.mnemonic')

module.exports = {
  migrations_directory: path.join(__dirname, "./migrations"),
  contracts_build_directory: path.join(__dirname, "../app/src/contracts"),
  compilers: {
    solc: {
      version: "0.5.17",
      settings: {
        // see the solidity docs for advice about optimization and evmversion
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "byzantium" // Current EVM on ThunderCore is fixed to "byzantium"
      }
    }
  },
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      websockets: true
    },
    'thunder-mainnet': {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://mainnet-rpc.thundercore.com");
      },
      network_id: '108',
    },
    'thunder-testnet': {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://testnet-rpc.thundercore.com");
      },
      network_id: '18',
    }
  }
};
