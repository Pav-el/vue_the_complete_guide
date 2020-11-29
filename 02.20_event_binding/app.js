const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      username: "",
    };
  },
  methods: {
    increase() {
      this.counter++;
    },
    decrease() {
      this.counter--;
    },
    submitForm() {
      alert("e")
    },
  }
});

app.mount('#events');
