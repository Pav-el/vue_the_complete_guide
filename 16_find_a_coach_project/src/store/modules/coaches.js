import DataService from "../../services/dataService.js";

const dataService = new DataService();

const coachesStore = {
  namespaced: true,
  state() {
    return {
      coaches: [],
      isLoading: true,
    };
  },
  mutations: {
    addCoachToStore(state, payload) {
      state.coaches.push(payload);
    },
    cleanStore(state) {
      state.coaches = [];
    },
    setLoadingToTrue(state) {
      state.isLoading = true;
    },
    setLoadingToFalse(state) {
      state.isLoading = false;
    },
  },
  actions: {
    addCoachToStore(context, data) {
      context.commit("addCoachToStore", { ...data });
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
      const coachList = await dataService.getData("coaches");
      Object.keys(coachList).forEach((key) =>
        context.dispatch("addCoachToStore", { ...coachList[key], id: key })
      );
      context.dispatch("setLoadingToFalse");
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
    isCoach(_, getters, _2, rootGetters) {
      const coaches = getters.coaches;
      const userId = rootGetters.userId;
      return coaches.some((coach) => coach.id === userId);
    },
    isLoading(state) {
      return state.isLoading;
    },
  },
};

export default coachesStore;
