const ComplexStorage = artifacts.require("ComplexStorage");
const Token = artifacts.require("Token");
const Auction = artifacts.require("Auction");

const util = require("util");
const fs = require("fs");
const path = require("path");
const writeFile = util.promisify(fs.writeFile);

module.exports = async function(deployer) {
  const complexStorage = await deployer.deploy(ComplexStorage);
  const token = await deployer.deploy(Token);

  const auction = await deployer.deploy(
    Auction,
    token.address
  );

  const addresses = {
    tokenAddress: token.address,
    auctionAddress: auction.address
  };

  await writeFile(
    path.join(__dirname, "..", "app", "src", "addresses.json"),
    JSON.stringify(addresses)
  );
};
