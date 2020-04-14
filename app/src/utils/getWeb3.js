import Web3 from "web3";

const getWeb3 = () => {
  if (window.ethereum) {
    window.ethereum.enable()
    return new Web3(window.ethereum)
  } else {
    return new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'))
  }
};

export default getWeb3;
