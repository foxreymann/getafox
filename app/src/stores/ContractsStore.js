import { observable, decorate, action } from "mobx";
import getTokenContractInstance from "utils/getTokenContractInstance";
import getAuctionContractInstance from "utils/getAuctionContractInstance";
import Web3 from "web3";

class ContractsStore {
  tokenInstance = null;
  auctionInstance = null;
  networkType = null;
  web3 = null;

  constructor(contractsStore) {
    this.web3 = new Web3(window.ethereum)
  }

  async setup() {
    this.setTokenInstance(await getTokenContractInstance());
    this.setAuctionInstance(await getAuctionContractInstance());
    this.networkType = await this.web3.eth.net.getNetworkType()
console.log(this.networkType)
  }

  setTokenInstance(tokenInstance) {
    this.tokenInstance = tokenInstance;
  }

  setAuctionInstance(auctionInstance) {
    this.auctionInstance = auctionInstance;
  }
}

export default decorate(ContractsStore, {
  tokenInstance: observable,
  setTokenInstance: action,
  auctionInstance: observable,
  setAuctionInstance: action,
  networkType: observable
});
