const SimpleStorage = artifacts.require("SimpleStorage");
const TutorialToken = artifacts.require("TutorialToken");
const ComplexStorage = artifacts.require("ComplexStorage");
const KittensToken = artifacts.require("KittensToken");
const KittensAuction = artifacts.require("KittensAuction");

module.exports = async deployer => {
  await deployer.deploy(SimpleStorage);
  await deployer.deploy(TutorialToken);
  await deployer.deploy(ComplexStorage);
  const KittensTokenDeploy = await deployer.deploy(KittensToken);
  await deployer.deploy(KittensAuction, KittensTokenDeploy.address);
};
