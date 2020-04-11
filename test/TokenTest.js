const Token = artifacts.require("Token");

const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');

contract("Token", accounts => {
  it("Should make first account an owner", async () => {
    let instance = await Token.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });

  describe("mint", () => {
    it("creates token with specified genes", async () => {
      let instance = await Token.deployed();
      let owner = await instance.owner();

      await instance.mint("#ff00dd,#ddddff");

      let token = await instance.tokenOfOwnerByIndex(owner, 0);
      let genes = await instance.getGenes(token);

      assert.equal(genes, "#ff00dd,#ddddff");
    });

    it("allows to mint only to owner", async () => {
      let instance = await Token.deployed();
      let other = accounts[1];

      await instance.transferOwnership(other);
      await expectRevert(instance.mint("#ff00dd,#ddddff"), 'Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.');
    });
  });

});
