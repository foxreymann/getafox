import Web3 from "web3";

const getProvider = () => {
  if (window.ethereum) {
    window.ethereum.enable()
    return new Web3(window.ethereum).currentProvider
  } else {
    return new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'))
  }
};

export default getProvider;
