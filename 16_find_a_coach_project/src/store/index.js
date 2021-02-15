import { createStore } from "vuex";
import coachesStore from "./modules/coaches.js";
import requestsStore from "./modules/requests.js";
import authStore from "./modules/auth.js";

const store = createStore({
  modules: {
    auth: authStore,
    coaches: coachesStore,
    requests: requestsStore,
  },
  state() {
    return {};
  },
  getters: {},
});

export default store;
