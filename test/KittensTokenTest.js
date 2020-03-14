const KittensToken = artifacts.require("KittensToken");

contract("Kittens token", accounts => {
  it("Should make first account an owner", async () => {
    let instance = await KittensToken.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });
});
/*
describe("mint", () => {
  it("creates token with specified outer and inner colors", async () => {
    let instance = await GradientToken.deployed();
    let owner = await instance.owner();

    let token = await instance.mint("#ff00dd", "#ddddff");

    let tokens = await instance.tokensOf(owner);
    let gradients = await instance.getGradient(tokens[0]);
    assert.deepEqual(gradients, ["#ff00dd", "#ddddff"]);
  });
});
*/
