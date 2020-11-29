const app = Vue.createApp({
  data() {
    return {
      result: 0,
      timer: ""
    };
  },
  computed: {
    showStatus() {
      return this.result < 37 ? "Not there yet" : "Too much!";
    },
  },
  methods: {
    increaseBy5() {
      this.result += 5;
    },
    increaseBy1() {
      this.result += 1;
    },
  },
  watch: {
    result() {
      if (this.result !== 0) {
        that = this;
        this.timer = setTimeout(function () {
          that.result = 0;
        }, 5000);
      }
    },
  },
});

app.mount("#assignment");
