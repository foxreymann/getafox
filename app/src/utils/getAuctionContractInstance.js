import contract from "@truffle/contract";
import getProvider from "utils/getProvider";
import AuctionArtifact from "contracts/Auction.json";
import addresses from "../addresses";


export default async function getAuctionContractInstance() {
  const { auctionAddress } = await addresses()
  const auctionContract = contract(AuctionArtifact);
  auctionContract.setProvider(getProvider());
  const auctionInstance = await auctionContract.at(auctionAddress);
  return auctionInstance;
}
