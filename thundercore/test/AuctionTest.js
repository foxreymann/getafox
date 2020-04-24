const Token = artifacts.require("Token");
const Auction = artifacts.require("Auction");
const truffleAssert = require('truffle-assertions');


contract("Auction", accounts => {
  it("Should accept nft on creation", async () => {
    let nft = await Token.new();
    let auction = await Auction.new(nft.address);
    const nftAddr = await auction.TokenContract();
    assert.equal(nftAddr, nft.address);
  });

  describe("createAuction", () => {
    let nft, auctionContract, token;

    before(async () => {
      nft = await Token.new();
      auctionContract = await Auction.new(nft.address);

      await nft.mint("1133333");
      token = await nft.tokenOfOwnerByIndex(accounts[0], 0);

      await nft.approve(auctionContract.address, token);
      await auctionContract.createAuction(token, 100);
    });

    it("Should take ownership of a token", async () => {
      const tokenOwner = await nft.ownerOf(token);
      assert.equal(tokenOwner, auctionContract.address);
    });

    it("Should create new auction", async () => {
      const auction = await auctionContract.tokenIdToAuctionDetails(token);
      assert.equal(auction[0], accounts[0]);
      assert.equal(auction[1].toNumber(), 100);
    });
  });

  it('should throw error when bidding for non existing token', async () => {
    let nft = await Token.new();
    let auctionContract = await Auction.new(nft.address);

    await truffleAssert.reverts(
      auctionContract.bid(777, {
        from: accounts[0],
        value: 200
      }),
      "auction doesn't exists"
    );
  });

  describe("should return tokens for sale", () => {
    before(async () => {
      nft = await Token.new();
      auctionContract = await Auction.new(nft.address);

      await nft.mint("3333");
      token = await nft.tokenOfOwnerByIndex(accounts[0], 0);
      await nft.approve(auctionContract.address, token);
      await auctionContract.createAuction(token, 200);

      await nft.mint("444444");
      token = await nft.tokenOfOwnerByIndex(accounts[0], 0);
      await nft.approve(auctionContract.address, token);
      await auctionContract.createAuction(token, 300);

      await nft.mint("44444");
      token = await nft.tokenOfOwnerByIndex(accounts[0], 0);
      await nft.transferFrom(accounts[0], accounts[1], token);
      await nft.approve(auctionContract.address, token, {
        from: accounts[1]
      })
      await auctionContract.createAuction(token, 400, {
        from: accounts[1]
      })
    });

    it("Should return all tokens", async () => {
      const tokensForSale = await auctionContract.getTokenIds()
      assert.equal(tokensForSale.length, 3)
      assert.equal(tokensForSale[0], 0)
      assert.equal(tokensForSale[1], 1)
      assert.equal(tokensForSale[2], 2)
    });

    it("Should retrun no tokens for sale when all tokens have been sold", async () => {
      await auctionContract.bid(0, {
        from: accounts[0],
        value: 200
      })

      await auctionContract.bid(1, {
        from: accounts[0],
        value: 300
      })

      await auctionContract.bid(2, {
        from: accounts[1],
        value: 400
      })

      const tokensForSale = await auctionContract.getTokenIds()
      assert.equal(tokensForSale.length, 0)
    });

  });

  describe("allow to cancel auctions", () => {
    before(async () => {
      nft = await Token.new();
      auctionContract = await Auction.new(nft.address);

      await nft.mint("33333");
      token = await nft.tokenOfOwnerByIndex(accounts[0], 0);
      await nft.approve(auctionContract.address, token);
      await auctionContract.createAuction(token, 200);

      await nft.mint("111222");
      token = await nft.tokenOfOwnerByIndex(accounts[0], 0);
      await nft.approve(auctionContract.address, token);
      await auctionContract.createAuction(token, 300);

      // put token on auction as account[1]
      await nft.mint("44444");
      token = await nft.tokenOfOwnerByIndex(accounts[0], 0);
      await nft.transferFrom(accounts[0], accounts[1], token);
      await nft.approve(auctionContract.address, token, {
        from: accounts[1]
      })
      await auctionContract.createAuction(token, 400, {
        from: accounts[1]
      })

      await nft.mint("55444");
      token = await nft.tokenOfOwnerByIndex(accounts[0], 0);
      await nft.transferFrom(accounts[0], accounts[1], token);
      await nft.approve(auctionContract.address, token, {
        from: accounts[1]
      })
      await auctionContract.createAuction(token, 500, {
        from: accounts[1]
      })
    });

    it("Cancel all auctions", async () => {
      await auctionContract.cancelAll() // cancel all auctions
      const tokensForSale = await auctionContract.getTokenIds()
console.log(tokensForSale)
      assert.equal(tokensForSale.length, 0)
    });

    it("Cancel all auctions should still work if there were no auctions", async () => {
      await auctionContract.cancelAll() // not fail when there are no auctions
      const tokensForSale = await auctionContract.getTokenIds()
console.log(tokensForSale)
      assert.equal(tokensForSale.length, 0)
    });
  });

});
