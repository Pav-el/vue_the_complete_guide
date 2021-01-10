import { createStore } from 'vuex';
import counterModule from './counter/index.js';
import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const store = createStore({
  modules: {
    counter: counterModule
  },
  state() {
    return {
      isLoggedIn: false
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters
});

export default store;