import { observable, action, decorate, when } from "mobx";
import randomColor from "utils/randomColor";
import Web3 from "web3";

class TokenStore {
  tokens = [];
  owner = null;
  user = null
  isLoading = true;
  tokenIndex = 0;

  constructor(contractsStore) {
    this.contractsStore = contractsStore;
    when(() => this.contractsStore.tokenInstance, this.setup);
    this.userSetup()
  }

  setup = async () => {
    const { tokenInstance } = this.contractsStore;
    const owner = await tokenInstance.owner();
    this.setOwner(owner);
    this.fetchTokens();
  };

  async userSetup() {
    try {
      const account = await window.ethereum.enable()
      const web3 = new Web3(window.ethereum)
      const defaultAccount = account[0]
      web3.eth.defaultAccount = defaultAccount
      this.user = web3.utils.toChecksumAddress(defaultAccount)
    } catch (err) {
      console.error(err)
    }
  }


  fetchTokens = async () => {
    const { tokenInstance } = this.contractsStore;

/*
    const tokens = await tokenInstance.tokensOf(this.owner);
    const gradients = await Promise.all(
      tokens.map(async token => {
        return tokenInstance.getGradient(token);
      })
    );
    await tokenInstance.mint('#f00', '#00f', { from: this.owner })
*/

    const noOfTokens = (await tokenInstance.balanceOf(this.user)).valueOf().words[0]

    const gradients = await Promise.all(
      [...Array(noOfTokens).keys()].map(async idx => {
        const token = await tokenInstance.tokenOfOwnerByIndex(this.user, idx)
        return {
          gradient: await tokenInstance.getGradient(token),
          tokenId: token
        }
      })
    )

    this.setIsLoading(false);

    if (!gradients.length) {
      return;
    }
    this.setTokens(this.indexedTokens(gradients));
  };

  indexedTokens(gradients) {
    return gradients.map(gradient => {
console.log(gradient)
      const tokenId = gradient.tokenId
      gradient = [ gradient.gradient.outer, gradient.gradient.inner ]
      return {
        gradient,
        tokenId,
        owner: this.user,
        index: this.tokenIndex++ // just for React
      };
    });
  }

  mintToken = async () => {
    const { tokenInstance } = this.contractsStore;
    const gradient = [randomColor(), randomColor()];
    await tokenInstance.mint(gradient[0], gradient[1], {
      from: this.owner,
      gas: 300000
    });
    this.appendToken({ gradient, index: this.tokenIndex++ });
  };

  putOnAuction = async ({ tokenId, price }) => {
console.log(tokenId, price)
  }

  setTokens(tokens) {
    this.tokens.replace(tokens);
  }

  appendToken(token) {
    this.tokens.push(token);
  }

  setOwner(owner) {
    this.owner = owner;
  }

  setIsLoading(value) {
    this.isLoading = value;
  }
}

export default decorate(TokenStore, {
  owner: observable,
  tokens: observable,
  isLoading: observable,
  user: observable,
  setOwner: action,
  setTokens: action,
  setIsLoading: action,
  appendToken: action
});
