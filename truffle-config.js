const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = require('./.mnemonic')

module.exports = {
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  compilers: {
    solc: {
      version: "0.6.4"
    }
  },
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/a72989064dba446e833e67c44f566420")
      },
      network_id: 3,
      gasPrice: 100000000000 // 100 gwei
    }
  }
};
