const KittensToken = artifacts.require("KittensToken");

contract("Kittens token", accounts => {
  it("Should make first account an owner", async () => {
    let instance = await KittensToken.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });

  describe("mint", () => {
    it("creates token with specified outer and inner colors", async () => {
      let instance = await KittensToken.deployed();
      let owner = await instance.owner();

      await instance.mint("#ff00dd", "#ddddff");

      let token = await instance.tokenOfOwnerByIndex(owner, 0);
      let gradients = await instance.getGradient(token);

      assert.equal(gradients.outer, "#ff00dd");
      assert.equal(gradients.inner, "#ddddff");
    });
  });

});
