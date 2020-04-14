import contract from "@truffle/contract";
import getWeb3 from "utils/getWeb3";
import TokenArtifact from "contracts/Token.json";
import addresses from "../addresses";


export default async function getGradientContractInstance() {
  const { tokenAddress } = await addresses()
  const tokenContract = contract(TokenArtifact);
  tokenContract.setProvider(getWeb3().currentProvider);
  const tokenInstance = await tokenContract.at(tokenAddress);
  return tokenInstance;
}
