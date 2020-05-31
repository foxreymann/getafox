const TokenV2 = artifacts.require("TokenV2");
const Auction = artifacts.require("Auction");
const Storage = artifacts.require("Storage");

const util = require("util");
const fs = require("fs");
const path = require("path");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

module.exports = async function(deployer) {
/*
  try {

    const addressesPath = path.join(__dirname, "..", "..", "app", "src", "addresses", `addresses.${deployer.network_id}.json`)

    let addresses = (JSON.parse(await readFile(addressesPath)))

    const token = await deployer.deploy(
      TokenV2,
      addresses.storageAddress
    )

console.log(token.address)

    // import storage from address
    let storage = await Storage.at(addresses.storageAddress);

    // add storage contract managers
    await storage.addManager(token.address);

    // update token contract in auction
    let auction = await Auction.at(addresses.auctionAddress);
    await auction.setTokenContract(token.address)

    addresses = {
      ...addresses,
      tokenAddress: token.address
    };

    console.log(addresses)

  console.log(deployer.network_id)
  console.log(deployer.network)

    if(
      (deployer.network_id === 1 && deployer.network !== 'mainnet') ||
      (deployer.network_id === 3 && deployer.network !== 'ropsten')
    ) {
      return
    }

    await writeFile(
      addressesPath,
      JSON.stringify(addresses)
    );
  } catch (err) {
    console.error(err)
    throw err
  }
*/
}
