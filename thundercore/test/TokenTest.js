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

  describe("allows owner to send promo token", async () => {
    it("send token 0 to address 1", async () => {
      const arg = '123456'
      let instance = await Token.deployed();
      let owner = await instance.owner();
      let receiver = accounts[1];
      await instance.mint(arg);
console.log({instance})
      let token = (await instance.tokensOfOwner(owner))[0]

      await instance.safeTransferFrom(owner, receiver, token)


      let receivedToken = (await instance.tokensOf(receiver))[0];

console.log({token})
console.log({receivedToken})

      assert.equal(token, receivedToken);
    })
  });

  describe("mint", () => {
    it("creates token with specified genes", async () => {
      const arg = '123456'

      let instance = await Token.deployed();
      let owner = await instance.owner();

      await instance.mint(arg);

      let token = await instance.tokenOfOwnerByIndex(owner, 0);
      let genes = await instance.getGenes(token);

      assert.equal(genes, arg);
    });

    it("creates token with specified genes when number is 77 9 digits", async () => {
      const arg = '9'.repeat(77)

      let instance = await Token.deployed();
      let owner = await instance.owner();

      await instance.mint(arg);

      let token = await instance.tokenOfOwnerByIndex(owner, 1);
      let genes = await instance.getGenes(token);

      genes = (new BN(genes)).toString()

      assert.equal(genes, arg);
    });


    it("allows to mint only to owner", async () => {
      let instance = await Token.deployed();
      let other = accounts[1];

      await instance.transferOwnership(other);
      await expectRevert(instance.mint('22222'), 'Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.');
    });
  });

});
