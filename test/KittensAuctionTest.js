const KittensToken = artifacts.require("KittensToken");
const KittensAuction = artifacts.require("KittensAuction");

contract("Auction", accounts => {
  it("Should accept nft on creation", async () => {
    let nft = await KittensToken.new();
    let auction = await KittensAuction.new(nft.address);
    const nftAddr = await auction.nonFungibleContract();
    assert.equal(nftAddr, nft.address);
  });
});
