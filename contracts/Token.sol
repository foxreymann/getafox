pragma solidity >=0.6.4 <0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import '@openzeppelin/contracts/ownership/Ownable.sol';

contract Token is ERC721Full('Token', 'TKN'), Ownable {

  struct Gradient {
    string outer;
    string inner;
  }

  Gradient[] gradients;

  function mint(string memory _outer, string memory _inner) public onlyOwner {
    Gradient memory _gradient = Gradient({ outer: _outer, inner: _inner });

    gradients.push(_gradient);
    uint _gradientId = gradients.length - 1;
    _mint(msg.sender, _gradientId);
  }

  function getGradient( uint _gradientId ) public view returns(string memory outer, string memory inner) {
    Gradient memory _grad = gradients[_gradientId];

    outer = _grad.outer;
    inner = _grad.inner;
  }
}
