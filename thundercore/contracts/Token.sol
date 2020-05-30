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

}
