const app = Vue.createApp({
  data() {
    return {
      username: "",
      confirmedName: "",
    };
  },
  methods: {
    showAlert() {
      alert("КАВАБАНГА!!11");
    },
    setConfirmedName() {
        this.confirmedName = this.username;
    },
    setName() {
        this.username = event.target.value;
    }

  },
});
app.mount("#assignment");
