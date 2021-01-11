import cartStoreActions from './actions.js';
import cartStoreMutations from './mutations.js';
import cartStoreGetters from './getters.js';
const cartStore = {
  state() {
    return {
      cart: { items: [], total: 0, qty: 0 },
    };
  },
  mutations: cartStoreMutations,
  actions: cartStoreActions,
  getters: cartStoreGetters,
};

export default cartStore;
