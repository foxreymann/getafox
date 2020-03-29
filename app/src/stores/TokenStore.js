import { observable, action, decorate, when } from "mobx";
import randomColor from "utils/randomColor";
import Web3 from "web3";

class TokenStore {
  tokens = [];
  owner = null;
  user = null
  isLoading = true;
  tokenIndex = 0;
  web3 = null;
  tokensForSale = [];
  tokensForSaleLoading = true;

  constructor(contractsStore) {
    this.contractsStore = contractsStore;
    when(() => this.contractsStore.tokenInstance, this.setup);
    this.web3 = new Web3(window.ethereum)
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
      const defaultAccount = account[0]
      this.web3.eth.defaultAccount = defaultAccount
      this.user = this.web3.utils.toChecksumAddress(defaultAccount)
    } catch (err) {
      console.error(err)
    }
  }


  fetchTokens = async () => {
    const { tokenInstance } = this.contractsStore;

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

  fetchTokensForSale = async () => {
    const { tokenInstance } = this.contractsStore;

  }

  indexedTokens(gradients) {
    return gradients.map(gradient => {
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
    // wait for minted event
    await this.fetchTokens();
  };

  putOnAuction = async ({ tokenId, price }) => {
    try {
      const { auctionInstance, tokenInstance } = this.contractsStore
      const subscription = this.web3.eth.subscribe('logs', {}, (error, result) => {})
      let transferApproved = false

      await tokenInstance.approve(auctionInstance.address, tokenId.toNumber(), {
        from: this.user
      });

      let approvedCheckInterval = setInterval(async () => {
        console.log(approvedCheckInterval)

        let approvedFor = await tokenInstance.getApproved(tokenId.toNumber())

        if(approvedFor === auctionInstance.address) {
          clearInterval(approvedCheckInterval)
          await auctionInstance.createAuction(tokenId.toNumber(), price, {
            from: this.user
          });
          await this.fetchTokens();
        }
      }, 2000)
    } catch (err) {
      console.error(err)
    }
  }

  setTokens(tokens) {
    this.tokens.replace(tokens);
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
  setIsLoading: action
});
