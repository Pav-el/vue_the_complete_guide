<template>
  <BaseCard>
    <BaseDialog
      :show="!!error"
      title="An error occurred"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </BaseDialog>
    <BaseSpinner v-if="isLoading&&!error" />
    <form
      @submit.prevent="submitForm"
      v-else-if="!error"
    >
      <div class="form-control">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model.trim="email"
        />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model.trim="password"
        />
      </div>
      <p v-if="!formIsValid">Check input data!</p>
      <BaseButton>{{ submitButtonCaption }}</BaseButton>
      <BaseButton
        type="button"
        mode="flat"
        @click="switchAuthMode"
      >{{ switchButtonCaption }}</BaseButton>
    </form>
  </BaseCard>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "signIn",
      isLoading: null,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode === "signIn" ? "Login" : "Signup";
    },
    switchButtonCaption() {
      return this.mode === "signIn" ? "Signup instead" : "Login instead";
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
  },
  methods: {
    async submitForm() {
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.formIsValid = true;
      this.isLoading = true;
      const actionPayload = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch(this.mode, actionPayload);
        const redirectUrl = this.isCoach
          ? "/" + "requests"
          : "/" + (this.$route.query.redirect || "coaches");
        this.$router.replace(redirectUrl);
      } catch (error) {
        this.error = "Error: " + error.message;
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      this.mode = this.mode === "signIn" ? "signUp" : "signIn";
    },
    handleError() {
      this.error = null;
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
</style>