pragma solidity >=0.5.17 <0.6.0;

import '@openzeppelin/contracts/ownership/Ownable.sol';

contract Storage is Ownable {
    // crate[0] - any mappings
    // crate[string] -> structs
    struct Crate {
      mapping(bytes32 => uint256) uint256s;
      mapping(bytes32 => uint128) uint128s;
      mapping(bytes32 => uint8) uint8s;
      mapping(bytes32 => address) addresses;
      mapping(bytes32 => address payable) addressesPayable;
      mapping(bytes32 => bytes32) bytes32s;
    }

    mapping(bytes32 => Crate) internal crates;

    mapping (address => bool) external Managers;

    function addManager(address _manager) external onlyOwner {
        Managers[_manager] = true;
    }

    modifier onlyManager() {
      if (!Managers[msg.sender]) {
        revert("Access to the storage is not allowed");
      }
      _;
    }

    function setUint256(bytes32 _crate, bytes32 _key, uint256 _value) onlyManager() external {
        crates[_crate].uint256s[_key] = _value;
    }

    function getUint256(bytes32 _crate, bytes32 _key) external view returns (uint256) {
        return crates[_crate].uint256s[_key];
    }

    function deleteUint256(bytes32 _crate, bytes32 _key, uint256 _value) onlyManager() external {
      delete  crates[_crate].uint256s[_key];
    }


/*
    function setAddress(bytes32 _crate, bytes32 _key, address _value) onlyManager() external {
        crates[_crate].addresses[_key] = _value;
    }

    function getAddress(bytes32 _crate, bytes32 _key) external view returns (address) {
        return crates[_crate].addresses[_key];
    }

    function setBool(bytes32 _crate, bytes32 _key, bool _value) onlyManager() external {
        crates[_crate].bools[_key] = _value;
    }

    function getBool(bytes32 _crate, bytes32 _key) external view returns (bool) {
        return crates[_crate].bools[_key];
    }

    function setInt(bytes32 _crate, bytes32 _key, int _value) onlyManager() external {
        crates[_crate].ints[_key] = _value;
    }

    function getInt(bytes32 _crate, bytes32 _key) external view returns (int) {
        return crates[_crate].ints[_key];
    }

    function setUInt8(bytes32 _crate, bytes32 _key, uint8 _value) onlyManager() external {
        crates[_crate].uint8s[_key] = _value;
    }

    function getUInt8(bytes32 _crate, bytes32 _key) external view returns (uint8) {
        return crates[_crate].uint8s[_key];
    }

    function setBytes32(bytes32 _crate, bytes32 _key, bytes32 _value) onlyManager() external {
        crates[_crate].bytes32s[_key] = _value;
    }

    function getBytes32(bytes32 _crate, bytes32 _key) external view returns (bytes32) {
        return crates[_crate].bytes32s[_key];
    }
*/

}
