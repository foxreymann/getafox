import contract from "@truffle/contract";
import getWeb3 from "utils/getWeb3";
import AuctionArtifact from "contracts/Auction.json";
import addresses from "../addresses";


export default async function getAuctionContractInstance() {
  const { auctionAddress } = await addresses()
  const auctionContract = contract(AuctionArtifact);
  auctionContract.setProvider(getWeb3().currentProvider);
  const auctionInstance = await auctionContract.at(auctionAddress);
  return auctionInstance;
}
