import getWeb3 from "utils/getWeb3";

const addresses = {
  private: require('./addresses.json'),
  ropsten: require('./addresses.ropsten.json'),
  rinkeby: require('./addresses.rinkeby.json'),
  main: require('./addresses.mainnet.json')
}

export default async () => {
  try {
    const web3 = getWeb3()
    const networkType = await web3.eth.net.getNetworkType()
    return addresses[networkType]
  } catch (err) {
    console.log(err)
  }
}
