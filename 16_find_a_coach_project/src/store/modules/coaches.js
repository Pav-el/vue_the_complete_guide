import DataService from "../../services/dataService.js";

const dataService = new DataService();

const coachesStore = {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
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
    setFecthTimestamp(state) {
      state.lastFetch = new Date().getTime();
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
    async updateStore(context, forcedRefresh) {
      if (!context.getters.shouldUpdate && !forcedRefresh) {
        return;
      }
      context.commit("setLoadingToTrue");
      context.commit("cleanStore");
      const coachList = await dataService.getCoaches();
      if (coachList) {
        Object.keys(coachList).forEach((key) =>
          context.commit("addCoachToStore", { ...coachList[key], id: key })
        );
      }
      context.commit("setLoadingToFalse");
      context.commit("setFecthTimestamp");
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
    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        return true;
      }
      const currentTimestamp = new Date().getTime();
      return (currentTimestamp - lastFetch) / 1000 > 60;
    },
  },
};

export default coachesStore;
