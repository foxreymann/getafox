mport { observable, decorate, action } from "mobx";
import getContractInstance from "utils/getTokenContractInstance";

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
