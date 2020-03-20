import Web3 from "web3";

const getProvider = () => {
  if (window.ethereum) {
    window.ethereum.enable()
    return new Web3(window.ethereum).currentProvider
  }
  else if (window.web3) {
    return new Web3(window.web3.currentProvider)
  }
  else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
};

export default getProvider;
