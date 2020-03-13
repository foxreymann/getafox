const KittensToken = artifacts.require("KittensToken");

contract("Kittens token", accounts => {
  it("Should make first account an owner", async () => {
    let instance = await KittensToken.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });
});
