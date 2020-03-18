import { observable, action, decorate, computed, when } from "mobx";
import randomColor from "utils/randomColor";

class TokenStore {
  tokens = [];
  owner = null;
  isLoading = true;
  owner = null;


  constructor(contractsStore) {
    this.contractsStore = contractsStore;
    when(() => this.tokenInstance, this.setup);
  }

  get tokenInstance() {
    return this.contractsStore && this.contractsStore.tokenInstance;
  }

  setup = async () => {
    const owner = await this.tokenInstance.owner();
    this.setOwner(owner);
  }

  setOwner(owner) {
    this.owner = owner;
  }

  fetchTokens = async () => {
    const tokens = await this.tokenInstance.tokensOf(this.owner);
    const gradients = await Promise.all(
      tokens.map(async token => {
        return this.tokenInstance.getGradient(token);
      })
    );
    this.setIsLoading(false);
    if (!gradients.length) {
      return;
    }
    this.setTokens(this.indexedTokens(gradients));
  };

  setTokens(tokens) {
    this.tokens.replace(tokens);
  }

  indexedTokens(gradients) {
    return gradients.map(gradient => {
      return {
        gradient,
        index: this.tokenIndex++
      };
    });
  }

  mintToken = async () => {
    const gradient = ['#fff', '#000'];
    await this.tokenInstance.mint(gradient[0], gradient[1], {
      from: this.owner,
      gas: 170000
    });
    this.appendToken({ gradient, index: this.tokenIndex++ });
  };
}

export default decorate(TokenStore, {
  owner: observable,
  tokens: observable,
  isLoading: observable,
  tokenInstance: computed
});
