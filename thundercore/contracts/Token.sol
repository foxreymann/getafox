pragma solidity >=0.5.17 <0.6.0;

import '@openzeppelin/contracts/ownership/Ownable.sol';
import './Storage.sol';

contract Token is Ownable {
  Storage sstorage;

  constructor (address _storage) public {
    sstorage = Storage(_storage);
  }

  bytes32 public constant TOKENS_CRATE = "tokens";

  function mint(uint _genes) public onlyOwner {
    uint tokenId = totalSupply();
    sstorage.setUint256(TOKENS_CRATE, keccak256(abi.encodePacked(tokenId)), _genes);
    sstorage.mint(msg.sender, tokenId);
  }

  function getGenes( uint _tokenId ) public view returns(uint genes) {
    genes = sstorage.getUint256(TOKENS_CRATE, keccak256(abi.encodePacked(_tokenId)));
  }

  function balanceOf(address owner) public view returns (uint256) {
    return sstorage.balanceOf(owner);
  }

  function ownerOf(uint256 tokenId) public view returns (address) {
      return sstorage.ownerOf(tokenId);
  }

  function approve(address to, uint256 tokenId) public {
    sstorage.approve(to, tokenId);
  }

  function getApproved(uint256 tokenId) public view returns (address) {
      return sstorage.getApproved(tokenId);
  }

  function setApprovalForAll(address to, bool approved) public {
    sstorage.setApprovalForAll(to, approved);
  }

  function isApprovedForAll(address owner, address operator) public view returns (bool) {
      return sstorage.isApprovedForAll(owner, operator);
  }

  function transferFrom(address from, address to, uint256 tokenId) public {
    sstorage.transferFrom(from, to, tokenId);
  }

  function safeTransferFrom(address from, address to, uint256 tokenId) public {
      sstorage.safeTransferFrom(from, to, tokenId, "");
  }

  function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public {
      sstorage.safeTransferFrom(from, to, tokenId, _data);
  }

  function totalSupply() public view returns (uint256) {
    return sstorage.totalSupply();
  }

  function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256 tokenId) {
    return sstorage.tokenOfOwnerByIndex(owner, index);
  }

  function tokenByIndex(uint256 index) public view returns (uint256) {
    return sstorage.tokenByIndex(index);
  }

  function name() external view returns (string memory) {
    return sstorage.name();
  }

  function symbol() external view returns (string memory) {
    return sstorage.symbol();
  }

  function tokenURI(uint256 tokenId) external view returns (string memory) {
    return sstorage.tokenURI(tokenId);
  }
}
