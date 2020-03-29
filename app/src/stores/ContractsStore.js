import { observable, decorate, action } from "mobx";
import getTokenContractInstance from "utils/getTokenContractInstance";
import getAuctionContractInstance from "utils/getAuctionContractInstance";

class ContractsStore {
  tokenInstance = null;
  auctionInstance = null;

  async setup() {
    this.setTokenInstance(await getTokenContractInstance());
    this.setAuctionInstance(await getAuctionContractInstance());
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
  setAuctionInstance: action
});
