import contract from "@truffle/contract";
import getProvider from "utils/getProvider";
import AuctionArtifact from "contracts/Auction.json";
import addresses from "../addresses.json";

const { auctionAddress } = addresses;

export default async function getAuctionContractInstance() {

console.log(auctionAddress)

  const auctionContract = contract(AuctionArtifact);
  auctionContract.setProvider(getProvider());
  const auctionInstance = await auctionContract.at(auctionAddress);
  return auctionInstance;
}
