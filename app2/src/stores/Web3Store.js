import Web3 from "web3";
import { observable, action, decorate, when, toJS } from "mobx";
import contract from "@truffle/contract";
import TokenArtifact from "../contracts/Token.json";
import AuctionArtifact from "../contracts/Auction.json";
import prefillWithZeros from "../utils/prefillWithZeros";
// import randomGenes from "utils/randomGenes";

const config = {
  genesLength: 77
}

class Web3Store {
  tokens
  tokensLoading = true

  tokensForSale
  tokensForSaleLoading = true

  web3
  web3User
  web3NetworkType = null

  contractAddresses
  tokenInstance
  auctionInstance

  constructor() {
    this.setWeb3()
    when(() => this.web3NetworkType, () => this.setAddresses())
    when(() => this.contractAddresses, () => this.setTokenInstance())
    when(() => this.contractAddresses, () => this.setAuctionInstance())
    when(() => this.tokenInstance, () => this.setTokens());
    when(() => this.tokenInstance && this.auctionInstance, () => this.setTokensForSale());
  }

  setWeb3 = async () => {
    try {
      if (window.ethereum) {
        window.ethereum.autoRefreshOnNetworkChange = false
        this.web3User = (await window.ethereum.enable())[0]
        this.web3 = new Web3(window.ethereum)
      } else {
        const wsProvider = 'ws://localhost:8545'
        // const wsProvider = 'wss://mainnet.infura.io/ws/v3/a72989064dba446e833e67c44f566420'
        this.web3 = new Web3(new Web3.providers.WebsocketProvider(wsProvider))
      }
      this.web3NetworkType = await this.web3.eth.net.getNetworkType()
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  setAddresses = () => {
    this.contractAddresses = require(`../addresses/addresses.${this.web3NetworkType}`)
  }

  setTokenInstance = async () => {
    const tokenContract = contract(TokenArtifact);
    tokenContract.setProvider(this.web3.currentProvider);
    this.tokenInstance = await tokenContract.at(this.contractAddresses.tokenAddress);
  }

  setAuctionInstance = async () => {
    const auctionContract = contract(AuctionArtifact);
    auctionContract.setProvider(this.web3.currentProvider);
    this.auctionInstance = await auctionContract.at(this.contractAddresses.auctionAddress);
  }

  setTokens = async () => {
    const noOfTokens = (await this.tokenInstance.balanceOf(this.web3User)).toNumber()

    this.tokens = await Promise.all(
     [...Array(noOfTokens).keys()].map(async idx => {
        const tokenId = (await this.tokenInstance.tokenOfOwnerByIndex(this.web3User, idx)).toString()
        return {
          genes: await this.getGenes(tokenId),
          tokenId,
          owner: this.web3User
        }
      })
    )

    this.tokensLoading = false
  }

  setTokensForSale = async () => {
    const tokenIds = (await this.auctionInstance.getTokenIds())

    this.tokensForSale = await Promise.all(
     tokenIds.map(async tokenId => {
        tokenId = tokenId.toString()
        const [genes, auction] = await Promise.all([
          await this.getGenes(tokenId),
          await this.auctionInstance.tokenIdToAuctionDetails(tokenId)
        ])
        return {
          genes: await this.getGenes(tokenId),
          tokenId,
          owner: this.auctionInstance.address,
          price: auction.price.toString()
        }
      })
    )

    this.tokensForSaleLoading = false
console.log(this.tokensForSale)
  }

  getGenes = async (tokenId) => prefillWithZeros({
    desiredLength: config.genesLength,
    str: (await this.tokenInstance.getGenes(tokenId)).toString()
  })
}

export default decorate(Web3Store, {
  tokens: observable,
  tokensLoading: observable,
  web3NetworkType: observable,
  contractAddresses: observable,
  tokenInstance: observable,
  auctionInstance: observable,

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
