const ComplexStorage = artifacts.require("ComplexStorage");
const KittensToken = artifacts.require("KittensToken");
const KittensAuction = artifacts.require("KittensAuction");

const util = require("util");
const fs = require("fs");
const path = require("path");
const writeFile = util.promisify(fs.writeFile);

module.exports = async function(deployer) {
  await deployer.deploy(ComplexStorage);
  const kittensToken = await deployer.deploy(KittensToken);
console.log('DEPLOYED:')
console.log(kittensToken)
  const kittensAuction = await deployer.deploy(
    KittensAuction,
    kittensToken.address
  );

  const addresses = {
    tokenAddress: kittensToken.address,
    auctionAddress: kittensAuction.address
  };

  await writeFile(
    path.join(__dirname, "..", "app", "src", "addresses.json"),
    JSON.stringify(addresses)
  );
};
