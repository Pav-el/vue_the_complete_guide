const app = Vue.createApp({
  data() {
    return {
      courseGoal: "get a job!",
      vueLink: "https://vuejs.org/"
    };
  },
  methods: {
    outputGoal() {
      const num = Math.random();
      return num < 0.5 ? "Learn Vue" : "Learn React"
    }
  }
});

app.mount("#user-goal");
