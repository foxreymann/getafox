import contract from "@truffle/contract";
import getProvider from "utils/getProvider";
import TokenArtifact from "contracts/Token.json";
import addresses from "../addresses";


export default async function getGradientContractInstance() {
  const { tokenAddress } = await addresses()
  const tokenContract = contract(TokenArtifact);
  tokenContract.setProvider(getProvider());
  const tokenInstance = await tokenContract.at(tokenAddress);
  return tokenInstance;
}
