pragma solidity 0.5.16;

import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract GradientToken is ERC721Token, Ownable {
  string public constant name = "KittensToken";
  string public constant symbol = "TRUFFLE_KITTENS";
}
