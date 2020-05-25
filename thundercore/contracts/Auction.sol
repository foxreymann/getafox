pragma solidity >=0.5.17 <0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import '@openzeppelin/contracts/ownership/Ownable.sol';

contract Auction is IERC721Receiver, Ownable {

  ERC721Full public TokenContract;

  struct AuctionDetails {
    address payable seller;
    uint128 price;
  }

  mapping (uint256 => AuctionDetails) public tokenIdToAuctionDetails;

  uint256[] public tokenIds;

  constructor(address _nftAddress) public {
    TokenContract = ERC721Full(_nftAddress);
  }

  function createAuction( uint256 _tokenId, uint128 _price ) public {
    TokenContract.safeTransferFrom(msg.sender, address(this), _tokenId);
    AuctionDetails memory auction = AuctionDetails({
       seller: msg.sender,
       price: uint128(_price)
    });
    tokenIdToAuctionDetails[_tokenId] = auction;
    tokenIds.push(_tokenId);
  }

  function onERC721Received(address, address, uint256, bytes memory) public returns (bytes4) {
    // confirm reception of the token
    return this.onERC721Received.selector;
  }

  function _updateTokenIds(uint _tokenId) internal {
    uint len = tokenIds.length;
    if(len == 1) {
      delete tokenIds[0];
    } else {
      for(uint256 i = 0; i < len; i++) {
        if(_tokenId == tokenIds[i]) {
          tokenIds[i] = tokenIds[len - 1];
          break;
        }
      }
    }
    tokenIds.pop();
  }

  function bid( uint256 _tokenId ) public payable {
    AuctionDetails memory auction = tokenIdToAuctionDetails[_tokenId];
    require(auction.seller != address(0), "auction doesn't exists");
    require(msg.value >= auction.price);

    address payable seller = auction.seller;
    uint128 price = auction.price;

    delete tokenIdToAuctionDetails[_tokenId];
    _updateTokenIds(_tokenId);

    seller.transfer(price);
    TokenContract.safeTransferFrom(address(this), msg.sender, _tokenId);
  }

  function getTokenIds() public view returns (uint256[] memory) {
    return tokenIds;
  }

  function cancel( uint256 _tokenId) public {
    AuctionDetails memory auction = tokenIdToAuctionDetails[_tokenId];

    if(msg.sender != owner()) {
      require(auction.seller == msg.sender);
    }

    delete tokenIdToAuctionDetails[_tokenId];
    _updateTokenIds(_tokenId);

    TokenContract.safeTransferFrom(address(this), auction.seller, _tokenId);
  }

  function cancelAll() public onlyOwner {
    while(tokenIds.length > 0) {
      cancel(tokenIds[0]);
    }
  }


}
