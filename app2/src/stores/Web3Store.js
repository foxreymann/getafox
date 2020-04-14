// ;import Web3 from "web3";
import { observable, action, decorate, when, toJS } from "mobx";
// import prefillWithZeros from "utils/prefillWithZeros";
// import randomGenes from "utils/randomGenes";

class Web3Store {
  tokens = [1,2,3]
  tokensLoading = true

  constructor() {

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
