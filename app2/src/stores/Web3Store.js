import Web3 from "web3";
import { observable, action, decorate, when, toJS } from "mobx";
// import prefillWithZeros from "utils/prefillWithZeros";
// import randomGenes from "utils/randomGenes";

class Web3Store {
  tokens = [1,2,3]
  tokensLoading = true
  web3
  web3Type

  constructor() {

  }

  getWeb3 = () => {
    if (window.ethereum) {
      window.ethereum.enable()
      this.web3 = new Web3(window.ethereum)
    } else {
      const wsProvider = 'ws://localhost:8545'
      // const wsProvider = 'wss://mainnet.infura.io/ws/v3/a72989064dba446e833e67c44f566420'
      this.web3 = new Web3(new Web3.providers.WebsocketProvider(wsProvider))
    }
  }
}

export default decorate(Web3Store, {
  tokens: observable,
  tokensLoading: observable

/*
  owner: observable,
  tokensForSale: observable,
  tokensForSaleLoading: observable,
  user: observable,
  setOwner: action,
  setTokens: action,
  setIsLoading: action
*/
});
