import Web3 from "web3";
import { observable, action, decorate, when, toJS } from "mobx";
import contract from "@truffle/contract";
import TokenArtifact from "../contracts/Token.json";
import AuctionArtifact from "../contracts/Auction.json";
import prefillWithZeros from "../utils/prefillWithZeros";
import randomGenes from "../utils/randomGenes";

const config = {
  genesLength: 77,
  noWalletWsProvider: 'wss://mainnet-ws.thundercore.com'
}


class Web3Store {
  tokens
  tokensLoading = true
  tokenPrices = new Map()

  tokensForSale
  tokensForSaleLoading = true

  web3
  web3User
  web3NetworkId = null
  web3EventsClient

  contractAddresses
  tokenInstance
  auctionInstance
  tokenEventsInstance

  owner

  tokenIdOfLastAuction

  constructor() {
    this.setWeb3()
    when(() => this.web3NetworkId, () => this.setAddresses())
    when(() => this.web3NetworkId, () => this.setWeb3EventsClient())
    when(() => this.contractAddresses, () => this.setTokenInstance())
    when(() => this.contractAddresses, () => this.setAuctionInstance())
    when(() => this.contractAddresses && this.web3EventsClient, () => this.setTokenEventsInstance())
    when(() => this.tokenInstance, () => {
      this.setOwner()
      if(this.web3User) {
        this.setTokens()
      } else {
        this.tokensLoading = false
      }
    })
    when(() => this.tokenInstance && this.auctionInstance, () => this.setTokensForSale());
    when(() => this.tokenEventsInstance, () => {
      this.handleTokenEvents()
    })
  }

  handleTokenEvents = async () => {
    try {
      // listening to Transfer
      this.tokenEventsInstance.Transfer({}, (error, event) => {
        if (error) {
          throw error
        }
        this.tokenInstanceHandleTransfer(error, event)
      })

      // listening to Approve
      this.tokenEventsInstance.Approval({}, (error, event) => {
        if (error) {
          throw error
        }
        this.tokenInstanceHandleApproval(error, event)
      })
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  tokenInstanceHandleTransfer = async (error, event) => {
    try {
      console.log({event})

      if(event.args.from === '0x0000000000000000000000000000000000000000') {
        console.log('token minted')
        return await this.setTokens()
      }

      if(event.returnValues.to === this.web3User) {
        console.log('token transfered to current user')
        await this.setTokens()
        await this.setTokensForSale()
      }

      // @todo: handle other options
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  tokenInstanceHandleApproval = async (error, event) => {
    try {
      console.log(event)
      if(
        event.returnValues.approved === this.auctionInstance.address &&
        event.returnValues.owner === this.web3User
      ) {
        await this.setAuctionInstance()
        await this.createAuction({tokenId: event.returnValues.tokenId})
      }
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  createAuction = async ({tokenId}) => {
    try {
      if(this.tokenIdOfLastAuction !== tokenId) {
        this.tokenIdOfLastAuction = tokenId
        await this.auctionInstance.createAuction(tokenId, this.tokenPrices.get(tokenId), {
          from: this.web3User
        })
        await this.setTokens()
        await this.setTokensForSale()
      }
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  putOnAuction = async ({ tokenId, price, unit }) => {
    try {
      await this.tokenInstance.approve(this.auctionInstance.address, tokenId, {
        from: this.web3User
      })

      this.tokenPrices.set(tokenId, this.web3.utils.toWei(price,unit))

      // interval when event fails
      let approvedCheckInterval = setInterval(async () => {
        console.log(approvedCheckInterval)

        let approvedFor = await this.tokenInstance.getApproved(tokenId)

        if(approvedFor === this.auctionInstance.address) {
          clearInterval(approvedCheckInterval)
          await this.createAuction({tokenId})
        }
      }, 2000)

    } catch (err) {
      console.error(err)
      throw err
    }
  }

  buy = async({ tokenId }) => {
    try {
      const balanceOfUser = (await this.tokenInstance.balanceOf(this.web3User)).toNumber()

      await this.auctionInstance.bid(tokenId, {
        from: this.web3User,
        value: (toJS(this.tokensForSale).filter(token => token.tokenId === tokenId))[0].price
      });

      let boughtCheckInterval = setInterval(async() => {
        console.log(boughtCheckInterval)

        const newBalanceOfUser = (await this.tokenInstance.balanceOf(this.web3User)).toNumber()

        if(toJS(this.tokens).find(token => token.tokenId === tokenId)) {
          clearInterval(boughtCheckInterval)
        }

        if (newBalanceOfUser > balanceOfUser) {
          clearInterval(boughtCheckInterval)
          await this.setTokens()
          await this.setTokensForSale()
        }

      }, 2000)
    } catch (err) {
      console.error(err)
    }
  }

  setOwner = async () => {
    try {
      this.owner = await this.tokenInstance.owner()
    } catch (err) {
      console.error(err)
      throw err
    }
  }


  mint = async () => {
    console.log('minting')
    try {
      const genes = randomGenes()
      await this.tokenInstance.mint(genes, {
        from: this.owner
      })
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  setWeb3 = async () => {
    try {
      if (window.ethereum) {
        window.ethereum.autoRefreshOnNetworkChange = false
        this.web3 = new Web3(window.ethereum)
        this.web3User = this.web3.utils.toChecksumAddress(
          (await window.ethereum.enable())[0]
        )
      } else {
        this.web3 = new Web3(new Web3.providers.WebsocketProvider(config.noWalletWsProvider))
        this.tokensLoading = false
      }
      this.web3NetworkId = await this.web3.eth.net.getId()
    } catch (err) {
      console.error(err)
      throw err
    }
  }


  setAddresses = () => {
    try {
      this.contractAddresses = require(`../addresses/addresses.${this.web3NetworkId}`)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  setWeb3EventsClient = () => {
    try {
      const wsProvider = this.web3NetworkId === 108 ? config.noWalletWsProvider : 'ws://localhost:8545'
      this.web3EventsClient = new Web3(new Web3.providers.WebsocketProvider(wsProvider))
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  setTokenInstance = async () => {
    const tokenContract = contract(TokenArtifact);
    tokenContract.setProvider(this.web3.currentProvider);
    this.tokenInstance = await tokenContract.at(this.contractAddresses.tokenAddress);
  }

  setTokenEventsInstance = async () => {
    const tokenContract = contract(TokenArtifact);
    tokenContract.setProvider(this.web3EventsClient.currentProvider);
    this.tokenEventsInstance = await tokenContract.at(this.contractAddresses.tokenAddress);
  }

  setAuctionInstance = async () => {
    const auctionContract = contract(AuctionArtifact);
    auctionContract.setProvider(this.web3.currentProvider);
    this.auctionInstance = await auctionContract.at(this.contractAddresses.auctionAddress);
  }

  setTokens = async () => {
    try {
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
    } catch (err) {
      console.error(err)
      throw err
    }
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
          genes,
          tokenId,
          owner: this.auctionInstance.address,
          price: auction.price.toString()
        }
      })
    )

    this.tokensForSaleLoading = false
  }

  getGenes = async (tokenId) => prefillWithZeros({
    desiredLength: config.genesLength,
    str: (await this.tokenInstance.getGenes(tokenId)).toString()
  })
}

export default decorate(Web3Store, {
  tokens: observable,
  tokensLoading: observable,
  tokensForSale: observable,
  tokensForSaleLoading: observable,
  web3NetworkId: observable,
  contractAddresses: observable,
  tokenInstance: observable,
  tokenEventsInstance: observable,
  auctionInstance: observable,
  web3User: observable,
  owner: observable,
  mint: action
});
