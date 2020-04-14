import { observable, action, decorate, when, toJS } from "mobx";
import randomGenes from "utils/randomGenes";
import Web3 from "web3";
import getWeb3 from "utils/getWeb3";
import prefillWithZeros from "utils/prefillWithZeros";

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
    this.web3 = getWeb3()
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

    const tokens = await Promise.all(
      [...Array(noOfTokens).keys()].map(async idx => {
        const tokenId = (await tokenInstance.tokenOfOwnerByIndex(this.user, idx)).toString()
        return {
          genes : await this.getGenes(tokenId),
          tokenId
        }
      })
    )

    this.setIsLoading(false);

    this.setTokens(this.indexedTokens(tokens));
  };

  getGenes = async (tokenId) => {
    const { tokenInstance } = this.contractsStore
    let zero = '0'
    let genes = prefillWithZeros({
      desiredLength: 77,
      str: (await tokenInstance.getGenes(tokenId)).toString()
    })
    return genes
  }

  fetchTokensForSale = async () => {
    const { auctionInstance, tokenInstance } = this.contractsStore;

    const tokenIds = (await auctionInstance.getTokenIds())

    const tokens = await Promise.all(
      tokenIds.map(async tokenId => {
        tokenId = tokenId.toString()
        const [genes, auction] = await Promise.all([
          await this.getGenes(tokenId),
          await auctionInstance.tokenIdToAuctionDetails(tokenId)
        ])
        return {
          genes,
          tokenId,
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
      return {
        ...token,
        owner: auctionInstance.address,
        index: this.tokenIndex++
      };
    });
  }

  indexedTokens(tokens) {
    return tokens.map(token => {
      return {
        ...token,
        owner: this.user,
        index: this.tokenIndex++
      }
    })
  }

  mintToken = async () => {
    const { tokenInstance } = this.contractsStore;
    const genes = randomGenes()
    await tokenInstance.mint(genes, {
      from: this.owner
    });
    // TODO: wait for minted event
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
    try {
      const { auctionInstance, tokenInstance } = this.contractsStore
      const subscription = this.web3.eth.subscribe('logs', {}, (error, result) => {})
      let transferApproved = false

      await tokenInstance.approve(auctionInstance.address, tokenId, {
        from: this.user
      });

      let approvedCheckInterval = setInterval(async () => {
        console.log(approvedCheckInterval)

        let approvedFor = await tokenInstance.getApproved(tokenId)

        if(approvedFor === auctionInstance.address) {
          clearInterval(approvedCheckInterval)
          await auctionInstance.createAuction(tokenId, this.web3.utils.toWei(price,unit), {
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
