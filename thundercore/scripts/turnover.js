const Token = artifacts.require("Token");

const Web3 = require('web3')

const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = require('../../.mnemonic')
const provider = new HDWalletProvider(mnemonic, "https://mainnet-rpc.thundercore.com");

var web3 = new Web3(provider)

module.exports = async callback => {
  try {
    const instance = await Token.deployed();

    let turnover = 0

    const events = await instance.getPastEvents('Transfer', {
        fromBlock: 39063414,
        toBlock: 'latest'
    })

    await Promise.all(events.map(async e => {
      const tx = await web3.eth.getTransaction(e.transactionHash)
      turnover += +web3.utils.fromWei(tx.value)
    }))

    console.log({turnover})

    callback()

  } catch (err) {
    console.error(err)
    throw err
  }
}
