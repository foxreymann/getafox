import contract from "@truffle/contract";
import getProvider from "utils/getProvider";
import TokenArtifact from "contracts/Token.json";
import addresses from "../addresses.js";

const { tokenAddress } = addresses;

export default async function getGradientContractInstance() {
  const tokenContract = contract(TokenArtifact);
  tokenContract.setProvider(getProvider());
  const tokenInstance = await tokenContract.at(tokenAddress);
  return tokenInstance;
}
