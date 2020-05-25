pragma solidity >=0.5.17 <0.6.0;

import '@openzeppelin/contracts/ownership/Ownable.sol';
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Token is ERC721, Ownable {
  string public constant name = "GetAFox";
  string public constant symbol = "GETAFOX";

  uint[] tokens;

  function mint(uint _genes) public onlyOwner {
    tokens.push(_genes);
    uint _tokenId = tokens.length -1;
    _mint(msg.sender, _tokenId);
  }

  function getGenes( uint _tokenId ) public view returns(uint genes) {
    genes = tokens[_tokenId];
  }
}
