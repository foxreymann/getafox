pragma solidity >=0.5.17 <0.6.0;

import '@openzeppelin/contracts/ownership/Ownable.sol';
import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import './Storage.sol'

contract Token is ERC721Full('GetAFox', 'GETAFOX'), Ownable {
  Storage storage;

  constructor(address _storage) {
    storage = Storage(_storage)
  }

  bytes32 public constant TOKENS_CRATE = "tokens"

  function mint(uint _genes) public onlyOwner {
    uint tokenId = totalSupply();
    storage.setUint256(TOKENS_CRATE, keccak256(tokenId), _genes);
    _mint(msg.sender, tokenId);
  }

  function getGenes( uint _tokenId ) public view returns(uint genes) {
    genes = tokens[_tokenId];
  }

  function getGenes( uint _tokenId ) public view returns(uint genes) {
    genes = storage.getUint256(TOKENS_CRATE, keccak256(tokenId));
  }
}
