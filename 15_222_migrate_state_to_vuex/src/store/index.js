import { createStore } from 'vuex';
import authStore from '../store/modules/authStore/index.js';
import productStore from '../store/modules/productStore/index.js';
import cartStore from '../store/modules/cartStore/index.js';

const store = createStore({
  modules: {
    authStore,
    productStore,
    cartStore
  },
  state() {
    return {};
  },
});

export default store;
