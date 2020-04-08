import { observable, action, decorate, when, toJS } from "mobx";
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
  tokenForSaleIndex = 0;

  constructor(contractsStore) {
    this.contractsStore = contractsStore;
    when(() => this.contractsStore.tokenInstance, this.setup);
    when(() => this.contractsStore.auctionInstance, this.auctionSetup);
    this.web3 = new Web3(window.ethereum)
    this.userSetup()
  }

  setup = async () => {
    const { tokenInstance } = this.contractsStore;
    const owner = await tokenInstance.owner();
    this.setOwner(owner);
    this.fetchTokens();
  };

  auctionSetup = async () => {
    this.fetchTokensForSale();
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
          gradient: await tokenInstance.getGradient(token.toString()),
          tokenId: token
        }
      })
    )

    this.setIsLoading(false);

    this.setTokens(this.indexedTokens(gradients));
  };

  fetchTokensForSale = async () => {
    const { auctionInstance, tokenInstance } = this.contractsStore;

    const tokenIds = (await auctionInstance.getTokenIds())

    const tokens = await Promise.all(
      tokenIds.map(async tokenId => {
        tokenId = tokenId.toString()
        const [gradient, auction] = await Promise.all([
          await tokenInstance.getGradient(tokenId),
          await auctionInstance.tokenIdToAuction(tokenId)
        ])
        return {
          gradient: gradient,
          tokenId: tokenId,
          price: auction.price.toString()
        }
      })
    )

    this.tokensForSaleLoading = false;

    this.tokensForSale = this.indexedTokensForSale(tokens);
  }

  indexedTokensForSale(tokens) {
    const { auctionInstance } = this.contractsStore;

    return tokens.map(token => {
      const tokenId = token.tokenId
      const gradient = [ token.gradient.outer, token.gradient.inner ]
      return {
        gradient,
        tokenId,
        owner: auctionInstance.address,
        index: this.tokenIndex++,
        price: token.price
      };
    });
  }

  indexedTokens(gradients) {
    return gradients.map(gradient => {
      const tokenId = gradient.tokenId
      gradient = [ gradient.gradient.outer, gradient.gradient.inner ]
      return {
        gradient,
        tokenId,
        owner: this.user,
        index: this.tokenIndex++, // just for React
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

  buy = async({ tokenId }) => {
    try {
      const { auctionInstance } = this.contractsStore

      await auctionInstance.bid(tokenId, {
        from: this.user,
        value: (toJS(this.tokensForSale).filter(token => token.tokenId === tokenId))[0].price
      });

      await this.fetchTokens();
      await this.fetchTokensForSale();
    } catch (err) {
      console.error(err)
    }
  }

  putOnAuction = async ({ tokenId, price, unit }) => {
console.log(typeof price)
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
          await auctionInstance.createAuction(tokenId.toNumber(), this.web3.utils.toWei(price,unit), {
            from: this.user
          });
          await this.fetchTokens();
          await this.fetchTokensForSale();
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
  tokensForSale: observable,
  tokensForSaleLoading: observable,
  user: observable,
  setOwner: action,
  setTokens: action,
  setIsLoading: action
});
