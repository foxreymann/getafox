pragma solidity >=0.6.4 <0.7.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Token is ERC721('GetAFox', 'GETAFOX'), Ownable {
  string[] tokens;

  function mint(string memory _genes) public onlyOwner {
    tokens.push(_genes);
    uint _tokenId = tokens.length -1;
    _mint(msg.sender, _tokenId);
  }

  function getGenes( uint _tokenId ) public view returns(string memory genes) {
    genes = tokens[_tokenId];
  }
}
