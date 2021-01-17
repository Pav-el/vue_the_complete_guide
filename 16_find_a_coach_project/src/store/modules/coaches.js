import DataService from "../../services/dataService.js";

const dataService = new DataService();

const coachesStore = {
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
    setloadingToTrue(state) {
      state.isLoading = true;
    },
    setloadingToFalse(state) {
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
    setloadingToTrue(context) {
      context.commit("setloadingToTrue");
    },
    setloadingToFalse(context) {
      context.commit("setloadingToFalse");
    },
    async updateStore(context) {
      context.dispatch("setloadingToTrue");
      console.log('Coaches store loading is', context.state.isLoading)
      context.dispatch("cleanStore");
      const coachList = await dataService.getData();
      Object.keys(coachList).forEach((key) =>
        context.dispatch("addCoachToStore", { ...coachList[key], id: key })
      );
      console.log("Coaches store coachList is: ",coachList);
      context.dispatch("setloadingToFalse");
      console.log('Coaches store loading is', context.state.isLoading)
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
