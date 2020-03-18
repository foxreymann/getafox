import { observable, decorate, action } from "mobx";
import getTokenContractInstance from "utils/getTokenContractInstance";

class ContractsStore {
  tokenInstance = null;

  async setup() {
    this.setTokenInstance(await getTokenContractInstance());
  }

  setTokenInstance(tokenTokenInstance) {
    this.tokenInstance = tokenTokenInstance;
  }
}

export default decorate(ContractsStore, {
  tokenInstance: observable,
  setTokenInstance: action
});
