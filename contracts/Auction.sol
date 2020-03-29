pragma solidity >=0.6.4 <0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract Auction is IERC721Receiver {

  ERC721Full public TokenContract;

  struct Auction {
    address payable seller;
    uint128 price;
  }

  mapping (uint256 => Auction) public tokenIdToAuction;

  uint256[] public tokenIds;

  constructor(address _nftAddress) public {
    TokenContract = ERC721Full(_nftAddress);
  }

  function createAuction( uint256 _tokenId, uint128 _price ) public {
    TokenContract.safeTransferFrom(msg.sender, address(this), _tokenId);
    Auction memory auction = Auction({
       seller: msg.sender,
       price: uint128(_price)
    });
    tokenIdToAuction[_tokenId] = auction;
    tokenIds.push(_tokenId);
  }

  function onERC721Received(address, address, uint256, bytes memory) public override returns (bytes4) {
    // confirm reception of the token
    return this.onERC721Received.selector;
    //return ERC721_RECEIVED;
  }

  function bid( uint256 _tokenId ) public payable {
    Auction memory auction = tokenIdToAuction[_tokenId];
    require(auction.seller != address(0));
    require(msg.value >= auction.price);

    address payable seller = auction.seller;
    uint128 price = auction.price;

    delete tokenIdToAuction[_tokenId];

    for(uint256 i = 0; i < tokenIds.length; i++) {
      if(_tokenId == tokenIds[i]) {
        if(tokenIds.length == 1) {
          delete tokenIds[i];
        } else {
          tokenIds[i] = tokenIds[tokenIds.length - 1];
          tokenIds.pop();
        }
      }
    }

    seller.transfer(price);
    TokenContract.safeTransferFrom(address(this), msg.sender, _tokenId);
  }

  function cancel( uint256 _tokenId ) public {
    Auction memory auction = tokenIdToAuction[_tokenId];
    require(auction.seller == msg.sender);

    delete tokenIdToAuction[_tokenId];

    TokenContract.safeTransferFrom(address(this), msg.sender, _tokenId);
  }

  function getTokenIds() public view returns (uint256[] memory) {
    return tokenIds;
  }

}
