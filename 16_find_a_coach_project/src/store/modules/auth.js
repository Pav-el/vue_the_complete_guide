import DataService from "../../services/dataService.js";

const dataService = new DataService();

let timer = null;

const authStore = {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false,
    };
  },
  mutations: {
    setUserId(state, payload) {
      state.userId = payload.userId;
      state.token = payload.token;
      state.didAutoLogout = false;
    },
    setAutoLogout(state) {
      state.didAutoLogout = true;
    },
  },
  actions: {
    async signIn(context, payload) {
      return context.dispatch("auth", { ...payload, mode: "signIn" });
    },
    async signUp(context, payload) {
      return context.dispatch("auth", { ...payload, mode: "signUp" });
    },
    async auth(context, payload) {
      const mode = payload.mode;
      const requestData = { ...payload, returnSecureToken: true };
      const data =
        mode === "signIn"
          ? await dataService.signIn(requestData)
          : await dataService.signUp(requestData);

      const expiresIn = +data.expiresIn * 1000;
      // const expiresIn = 5000
      const expirationDate = new Date().getTime() + expiresIn;
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("userId", data.localId);
      localStorage.setItem("tokenExpiration", expirationDate);

      timer = setTimeout(() => context.dispatch("autoLogOut"), expiresIn);

      context.commit("setUserId", {
        token: data.idToken,
        userId: data.localId,
      });
    },
    tryLogin(context) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const tokenExpiration = localStorage.getItem("tokenExpiration");
      const expiresIn = +tokenExpiration - new Date().getTime();
      if (expiresIn < 0) {
        return;
      }
      timer = setTimeout(() => context.dispatch("autoLogOut"), expiresIn);
      if (token && userId) {
        context.commit("setUserId", {
          token,
          userId,
        });
      }
    },
    logOut(context) {
      context.commit("setUserId", {
        token: null,
        userId: null,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("tokenExpiration");
      clearTimeout(timer);
    },
    autoLogOut(context) {
      context.dispatch("logOut");
      context.commit("setAutoLogout");
    },
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
    },
  },
};

export default authStore;
