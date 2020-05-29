pragma solidity >=0.5.17 <0.6.0;

contract Data {

    mapping(bytes32 => uint256) uint256s;
    mapping(bytes32 => uint128) uint128s;
    mapping(bytes32 => uint8) uint8s;
    mapping(bytes32 => address) addresses;
    mapping(bytes32 => address payable) addressesPayable;

    struct AddrUint128Struct {
      address payable addr;
      uint128 val;
    }
    mapping (uint256 => AddrUnit128Struct) public AddrUnit128s;



    function setUint(bytes32 _key , uint256 _newScore) external {
        uints[_key] = _newScore;
    }

    function getUint(bytes32 _key) external returns(uint256) {
        return uints[_key];
    }

}

/*
contract Score {

    ScoreStorage ss;
    bytes32 public constant SCORE = keccak256("score");

    constructor(address scoreStorage) {
        ss = ScoreStorage(scoreStorage);
    }

    function setScore(uint256 _score) external {
        ss.setUint(SCORE,_score);
    }

}



contract ScoreV2 {

    ScoreStorage ss;
    bytes32 public constant SCORE = keccak256("score");

    constructor(address scoreStorage) {
        ss = ScoreStorage(scoreStorage);
    }

    function setScore(uint256 _score) external {
        ss.setUint(SCORE,_score + 1);
    }

}
*/
