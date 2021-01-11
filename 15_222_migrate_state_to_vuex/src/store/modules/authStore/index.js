import authStoreActions from './actions.js';
import authStoreMutations from './mutations.js';
import authStoreGetters from './getters.js';

const authStore = {
  state() {
    return {
      isLoggedIn: false
    };
  },
  mutations: authStoreMutations,
  actions: authStoreActions,
  getters: authStoreGetters
};

export default authStore;
