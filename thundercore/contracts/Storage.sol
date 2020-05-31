pragma solidity >=0.5.17 <0.6.0;

import '@openzeppelin/contracts/ownership/Ownable.sol';
import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract Storage is ERC721Full('GetAFox', 'GETAFOX'), Ownable {
    struct Crate {
      mapping(bytes32 => uint256) uint256s;
      mapping(bytes32 => uint128) uint128s;
      mapping(bytes32 => uint8) uint8s;
      mapping(bytes32 => address) addresses;
      mapping(bytes32 => address payable) addressesPayable;
      mapping(bytes32 => bytes32) bytes32s;
    }

    mapping(bytes32 => Crate) crates;

    mapping (address => bool) Managers;

    function addManager(address _manager) external onlyOwner {
        Managers[_manager] = true;
    }

    modifier onlyManager() {
      if (!Managers[msg.sender]) {
        revert("Access to the storage is not allowed");
      }
      _;
    }

    function mint(address to, uint256 tokenId) onlyManager() external {
      _mint(to, tokenId);
    }

    function setUint256(bytes32 _crate, bytes32 _key, uint256 _value) onlyManager() external {
        crates[_crate].uint256s[_key] = _value;
    }

    function getUint256(bytes32 _crate, bytes32 _key) external view returns (uint256) {
        return crates[_crate].uint256s[_key];
    }

    function deleteUint256(bytes32 _crate, bytes32 _key) onlyManager() external {
      delete  crates[_crate].uint256s[_key];
    }

    function setUint128(bytes32 _crate, bytes32 _key, uint128 _value) onlyManager() external {
        crates[_crate].uint128s[_key] = _value;
    }

    function getUint128(bytes32 _crate, bytes32 _key) external view returns (uint128) {
        return crates[_crate].uint128s[_key];
    }

    function deleteUint128(bytes32 _crate, bytes32 _key) onlyManager() external {
      delete  crates[_crate].uint128s[_key];
    }

    function setUint8(bytes32 _crate, bytes32 _key, uint8 _value) onlyManager() external {
        crates[_crate].uint8s[_key] = _value;
    }

    function getUint8(bytes32 _crate, bytes32 _key) external view returns (uint8) {
        return crates[_crate].uint8s[_key];
    }

    function deleteUint8(bytes32 _crate, bytes32 _key) onlyManager() external {
      delete  crates[_crate].uint8s[_key];
    }

    function setAddress(bytes32 _crate, bytes32 _key, address _value) onlyManager() external {
        crates[_crate].addresses[_key] = _value;
    }

    function getAddress(bytes32 _crate, bytes32 _key) external view returns (address) {
        return crates[_crate].addresses[_key];
    }

    function deleteAddress(bytes32 _crate, bytes32 _key) onlyManager() external {
      delete  crates[_crate].addresses[_key];
    }

    function setAddressPayable(bytes32 _crate, bytes32 _key, address payable _value) onlyManager() external {
        crates[_crate].addressesPayable[_key] = _value;
    }

    function getAddressPayable(bytes32 _crate, bytes32 _key) external view returns (address payable) {
        return crates[_crate].addressesPayable[_key];
    }

    function deleteAddressPayable(bytes32 _crate, bytes32 _key) onlyManager() external {
      delete  crates[_crate].addressesPayable[_key];
    }

    function setBytes32(bytes32 _crate, bytes32 _key, bytes32 _value) onlyManager() external {
        crates[_crate].bytes32s[_key] = _value;
    }

    function getBytes32(bytes32 _crate, bytes32 _key) external view returns (bytes32) {
        return crates[_crate].bytes32s[_key];
    }

    function deleteBytes32(bytes32 _crate, bytes32 _key) onlyManager() external {
      delete  crates[_crate].bytes32s[_key];
    }

}
