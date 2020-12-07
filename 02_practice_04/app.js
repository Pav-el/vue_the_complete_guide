const app = Vue.createApp({
  data() {
    return {
      inputValue: "",
      isVisible: true,
    }
  },
  methods: {
    visibilityToggler() {
      this.isVisible = !this.isVisible
    }
  }
})

app.mount('#assignment')
