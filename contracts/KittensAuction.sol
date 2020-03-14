pragma solidity >=0.6.4 <0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract KittensAuction is IERC721Receiver {

  ERC721Full public KittensTokenContract;

  struct Auction {
    address seller;
    uint128 price;
  }

  mapping (uint256 => Auction) public tokenIdToAuction;

  constructor(address _nftAddress) public {
    KittensTokenContract = ERC721Full(_nftAddress);
  }

  function createAuction( uint256 _tokenId, uint128 _price ) public {
    KittensTokenContract.safeTransferFrom(msg.sender, address(this), _tokenId);
    Auction memory auction = Auction({
       seller: msg.sender,
       price: uint128(_price)
    });
    tokenIdToAuction[_tokenId] = auction;
  }

  function onERC721Received(address, address, uint256, bytes memory) public override returns (bytes4) {
    // confirm reception of the token
    return this.onERC721Received.selector;
    //return ERC721_RECEIVED;
  }



}
