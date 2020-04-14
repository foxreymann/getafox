import Web3 from "web3";

const getWeb3 = () => {
  if (window.ethereum) {
    window.ethereum.enable()
    return new Web3(window.ethereum)
  } else {
    // const wsProvider = 'ws://localhost:8545'
    const wsProvider = 'wss://mainnet.infura.io/ws/v3/a72989064dba446e833e67c44f566420'
    return new Web3(new Web3.providers.WebsocketProvider(wsProvider))
  }
};

export default getWeb3;
