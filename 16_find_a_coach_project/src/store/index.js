import { createStore } from "vuex";
import coachesStore from "./modules/coaches.js";
import requestsStore from "./modules/requests.js";

const store = createStore({
  modules: {
    coachesStore,
    requestsStore,
  },
  state() {
    return {
      userId: "c6",
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
});

export default store;
