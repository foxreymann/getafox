import Web3 from "web3";

const addresses = {
  private: require('./addresses.json'),
  ropsten: require('./addresses.ropsten.json'),
  rinkeby: require('./addresses.rinkeby.json'),
  mainnet: require('./addresses.mainnet.json')
}

export default async () => {
  const web3 = new Web3(window.ethereum)
  const networkType = await web3.eth.net.getNetworkType()
  return addresses[networkType]
}
