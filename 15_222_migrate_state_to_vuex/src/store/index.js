import { createStore } from 'vuex';
import productStore from '../store/modules/productStore/index.js';
import cartStore from '../store/modules/cartStore/index.js';
import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const store = createStore({
  modules: {
    productStore: productStore,
    cartStore: cartStore
  },
  state() {
    return {};
  },
  mutations: mutations,
  actions: actions,
  getters: getters
});

export default store;
