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
    this.fetchTokens();
  };

  putOnAuction = async ({ tokenId, price }) => {
    const { auctionInstance, tokenInstance } = this.contractsStore

    await tokenInstance.approve(auctionInstance.address, tokenId.toNumber(), {
      from: this.user
    });

    let subscription = this.web3.eth.subscribe('logs', {}, function(error, result){
    //    if (!error)
    //        console.log(result);
    })


console.log(auctionInstance.address)
    // https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html
    tokenInstance.contract.events.Approval({
        filter: {
          owner: this.user,
          tokenId: tokenId.toString(),
          approved: auctionInstance.address
          },
          fromBlock: 0
    }, function(error, event){ })
    .on("connected", function(subscriptionId){
        console.log(`subscribed to Approval event: ${subscriptionId}`);
    })
    .on('data', async event => {
      console.log(event);
console.log(tokenId.toNumber())
console.log(price)
console.log(this.user)
console.log(auctionInstance)
      await auctionInstance.createAuction(tokenId.toNumber(), price, {
        from: this.user
      });
    })
    .on('error', function(error, receipt) {
        console.log(error);
        console.log(receipt)
    });

//    this.fetchTokens();
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
