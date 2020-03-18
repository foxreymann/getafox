import { observable, decorate, action } from "mobx";
import getGradientContractInstance from "utils/getGradientContractInstance";

class ContractsStore {
  tokenInstance = null;

  async setup() {
    this.setTokenInstance(await getGradientContractInstance());
  }

  setTokenInstance(tokenInstance) {
    this.tokenInstance = tokenInstance;
  }
}

export default decorate(ContractsStore, {
  tokenInstance: observable,
  setTokenInstance: action
});
