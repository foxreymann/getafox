import ContractsStore from "./ContractsStore";
import TokenStore from "./TokenStore";

const contractsStore = new ContractsStore();
contractsStore.setup();

const tokenStore = new TokenStore(contractsStore);

export default {
  contractsStore,
  tokenStore
};
