const Token = artifacts.require("Token");
const Auction = artifacts.require("Auction");

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
});
