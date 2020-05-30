pragma solidity >=0.5.17 <0.6.0;

import '@openzeppelin/contracts/ownership/Ownable.sol';
import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import './Storage.sol';

contract TokenV2 is ERC721Full('GetAFox', 'GETAFOX'), Ownable {
  Storage sstorage;

  constructor (address _storage) public {
    sstorage = Storage(_storage);
  }

  bytes32 public constant TOKENS_CRATE = "tokens";

  function mint(uint _genes) public onlyOwner {
    uint tokenId = totalSupply();
    sstorage.setUint256(TOKENS_CRATE, keccak256(abi.encodePacked(tokenId)), _genes);
    _mint(msg.sender, tokenId);
  }

  function getGenes( uint _tokenId ) public view returns(uint genes) {
    genes = sstorage.getUint256(TOKENS_CRATE, keccak256(abi.encodePacked(_tokenId)));
  }
}
