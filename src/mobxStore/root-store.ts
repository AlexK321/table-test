import { userStore } from './subStores/userStore';

class RootStore {
  userStore = userStore;
}

export default RootStore;
