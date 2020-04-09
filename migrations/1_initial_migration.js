var Migrations = artifacts.require("Migrations");
const Token = artifacts.require("Token");
const Auction = artifacts.require("Auction");

const util = require("util");
const fs = require("fs");
const path = require("path");
const writeFile = util.promisify(fs.writeFile);

module.exports = async function(deployer) {

console.log(deployer)

  await deployer.deploy(Migrations);

  const token = await deployer.deploy(Token);

console.log(token.address)

  const auction = await deployer.deploy(
    Auction,
    token.address
  );

  const addresses = {
    tokenAddress: token.address,
    auctionAddress: auction.address
  };

  let addressesFilename

  switch (deployer.network_id) {
    case 3:
      if (deployer.network !== 'ropsten') { return }
      addressesFilename = 'addresses.ropsten.json'
      break;
    case 5777:
      addressesFilename = 'addresses.json'
      break;
    default:
      throw 'unknown network'
  }

  await writeFile(
    path.join(__dirname, "..", "app", "src", addressesFilename),
    JSON.stringify(addresses)
  );
}
