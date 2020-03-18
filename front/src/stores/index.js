import ContractsStore from "./ContractsStore";
import TokenStore from "./TokenStore";
import ModalStore from "./ModalStore";

const modalStore = new ModalStore();

const contractsStore = new ContractsStore();
contractsStore.setup();

const tokenStore = new TokenStore(contractsStore);

export default {
  modalStore,
  contractsStore,
  tokenStore
};
