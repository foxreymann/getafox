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

      await nft.mint("#ff00dd", "#ddddff");
      token = await nft.tokenOfOwnerByIndex(accounts[0], 0);

      await nft.approve(auctionContract.address, token);
      await auctionContract.createAuction(token, 100);
    });

    it("Should take ownership of a token", async () => {
      const tokenOwner = await nft.ownerOf(token);
      assert.equal(tokenOwner, auctionContract.address);
    });

    it("Should create new auction", async () => {
      const auction = await auctionContract.tokenIdToAuction(token);
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

      await nft.mint("#aaa", "#bbb");
      token = await nft.tokenOfOwnerByIndex(accounts[0], 0);
      await nft.approve(auctionContract.address, token);
      await auctionContract.createAuction(token, 200);

      await nft.mint("#eaa", "#fox");
      token = await nft.tokenOfOwnerByIndex(accounts[0], 0);
      await nft.approve(auctionContract.address, token);
      await auctionContract.createAuction(token, 300);
    });

    it("Should return all tokens", async () => {
      const tokensForSale = await auctionContract.getTokenIds()
      assert.equal(tokensForSale.length, 2)
      assert.equal(tokensForSale[0], 0)
      assert.equal(tokensForSale[1], 1)
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

      const tokensForSale = await auctionContract.getTokenIds()
      assert.equal(tokensForSale.length, 0)
    });

  });
});
