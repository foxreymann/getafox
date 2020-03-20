import { observable, decorate } from "mobx";
import Web3 from "web3";

class UserStore {
  user = null

  async setup() {
    try {
      const account = await window.ethereum.enable()
      const web3 = new Web3(window.ethereum)
      const defaultAccount = account[0]
      web3.eth.defaultAccount = defaultAccount
      this.user = defaultAccount
    } catch (err) {
      console.error(err)
    }
  }

}

export default decorate(UserStore, {
  user: observable
})
