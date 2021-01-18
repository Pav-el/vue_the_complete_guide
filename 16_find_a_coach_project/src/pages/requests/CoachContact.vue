<template>
  <BaseCard>
    <h1>Coach Contact</h1>
    <form
      @submit.prevent="submitData"
      v-if="!submitted"
    >
      <div class="form-control">
        <input
          type="text"
          placeholder="Your Name"
          v-model.trim="userName"
        />
      </div>
      <div class="form-control">
        <input
          type="email"
          placeholder="Your Email"
          v-model.trim="userEmail"
        />
      </div>
      <div class="form-control">
        <textarea
          rows="5"
          placeholder="Your Message"
          v-model.trim="userMessage"
        />
      </div>
      <BaseButton>Submit</BaseButton>
    </form>
    <div v-else>
      Submitted
    </div>
  </BaseCard>
</template>

<script>
import DataService from "../../services/dataService.js";
const dataService = new DataService();
export default {
  props: ["id"],
  data() {
    return {
      submitted: false,
      userName: "",
      userEmail: "",
      userMessage: "",
    };
  },
  methods: {
    submitData() {
      const data = {
        coachId: this.id,
        userName: this.userName,
        userEmail: this.userEmail,
        userMessage: this.userMessage,
      };
      dataService
        .sendData(data, "requests")
        .then(() => {
          this.submitted = true;
          this.resetState();
          setTimeout(() => (this.submitted = false), 2000);
          this.$store.dispatch("requests/updateStore");
        })
        .then(() => this.$router.replace("/coaches"));
    },
    resetState() {
      this.userName = "";
      this.userEmail = "";
      this.userMessage = "";
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
  resize: none;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>