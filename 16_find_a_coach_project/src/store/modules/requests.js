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
    async updateStore(context) {
      context.dispatch("setLoadingToTrue");
      context.dispatch("cleanStore");
      const requestsList = await dataService.getData("requests");
      Object.keys(requestsList).forEach((key) =>
        context.dispatch("addRequestToStore", { ...requestsList[key], id: key })
      );
      context.dispatch("setLoadingToFalse");
    },
  },
  getters: {
    requests(state) {
      return state.requests;
    },
    hasRequestes(state) {
      return state.requests && state.requests.length > 0;
    },
    isRequest(_, getters, _2, rootGetters) {
      const requests = getters.requests;
      const userId = rootGetters.userId;
      return requests.some((request) => request.id === userId);
    },
    isLoading(state) {
      return state.isLoading;
    },
  },
};

export default requestsStore;
