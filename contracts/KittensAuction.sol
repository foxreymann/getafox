pragma solidity >=0.6.4 <0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract KittensAuction {

  ERC721Full public nonFungibleContract;

  constructor(address _nftAddress) public {
    nonFungibleContract = ERC721Full(_nftAddress);
  }
}
