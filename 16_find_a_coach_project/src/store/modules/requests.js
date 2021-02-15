import DataService from "../../services/dataService.js";

const dataService = new DataService();

const requestsStore = {
  namespaced: true,
  state() {
    return {
      requests: [],
      isLoading: false,
    };
  },
  mutations: {
    addRequestToStore(state, payload) {
      state.requests.push(payload);
    },
    cleanStore(state) {
      state.requests = [];
    },
    setLoadingToTrue(state) {
      state.isLoading = true;
    },
    setLoadingToFalse(state) {
      state.isLoading = false;
    },
  },
  actions: {
    addRequestToStore(context, data) {
      context.commit("addRequestToStore", { ...data });
    },
    cleanStore(context) {
      context.commit("cleanStore");
    },
    setLoadingToTrue(context) {
      context.commit("setLoadingToTrue");
    },
    setLoadingToFalse(context) {
      context.commit("setLoadingToFalse");
    },
    async updateStore(context, token) {
      context.commit("setLoadingToTrue");
      context.commit("cleanStore");
      const id = context.rootGetters.userId;
      console.log('id is :', id);
      const requestsList = await dataService.getRequests(id, token);
      if (requestsList) {
        Object.keys(requestsList).forEach((key) =>
          context.commit("addRequestToStore", {
            ...requestsList[key],
            id: key,
          })
        );
      }
      context.commit("setLoadingToFalse");
    },
  },
  getters: {
    requests(state) {
      return state.requests;
    },
    hasRequests(state) {
      return state.requests && state.requests.length > 0;
    },
    isLoading(state) {
      return state.isLoading;
    },
  },
};

export default requestsStore;
