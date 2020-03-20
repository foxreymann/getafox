import ContractsStore from "./ContractsStore";
import TokenStore from "./TokenStore";
import ModalStore from "./ModalStore";
import UserStore from "./UserStore";

const modalStore = new ModalStore();

const contractsStore = new ContractsStore();
contractsStore.setup();

const userStore = new UserStore();
userStore.setup();

const tokenStore = new TokenStore(contractsStore);

export default {
  modalStore,
  contractsStore,
  tokenStore,
  userStore
};
