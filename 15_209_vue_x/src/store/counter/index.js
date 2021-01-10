import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const counterModule = {
  namespaced: true, //флаг разделения хранилищ, доступ по
  state() {
    return {
      counter: 0
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters
};

export default counterModule;
