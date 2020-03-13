pragma solidity >=0.6.4 <0.7.0;

import './openzeppelin-contracts/contracts/token/ERC721/ERC721.sol';
import './openzeppelin-contracts/contracts/ownership/Ownable.sol';

contract KittensToken is ERC721, Ownable {
  string public constant name = "KittensToken";
  string public constant symbol = "TRUFFLE_KITTENS";
}
