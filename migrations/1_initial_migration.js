var Migrations = artifacts.require("Migrations");
const Token = artifacts.require("Token");
const Auction = artifacts.require("Auction");

const util = require("util");
const fs = require("fs");
const path = require("path");
const writeFile = util.promisify(fs.writeFile);

module.exports = async function(deployer) {

  await deployer.deploy(Migrations);

  const token = await deployer.deploy(Token);

  const auction = await deployer.deploy(
    Auction,
    token.address
  );

  const addresses = {
    tokenAddress: token.address,
    auctionAddress: auction.address
  };

  console.log(addresses)

  let addressesFilename

console.log(deployer.network_id)
console.log(deployer.network)

  if(
    (deployer.network_id === 1 && deployer.network !== 'mainnet') ||
    (deployer.network_id === 3 && deployer.network !== 'ropsten')
  ) {
    return
  }

  await writeFile(
    path.join(__dirname, "..", "app", "src", "addresses", `addresses.${deployer.network_id}.json`),
    JSON.stringify(addresses)
  );
}
