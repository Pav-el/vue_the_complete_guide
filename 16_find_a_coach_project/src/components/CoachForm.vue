<template>
  <form>
    <div
      class="form-control"
      :class="{invalid: !firstName.isValid}"
    >
      <label for="firstName">Firstname</label>
      <input
        type="text"
        id="firstName"
        v-model.trim="firstName.val"
        @blur="clearValidity"
      />
      <p v-if="!firstName.isValid">First name must not be empty</p>
    </div>
    <div
      class="form-control"
      :class="{invalid: !lastName.isValid}"
    >
      <label for="lastName">Lastname</label>
      <input
        type="text"
        id="lastName"
        v-model.trim="lastName.val"
        @blur="clearValidity"
      />
      <p v-if="!lastName.isValid">Last name must not be empty</p>
    </div>
    <div
      class="form-control"
      :class="{invalid: !description.isValid}"
    >
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidity"
      />
      <p v-if="!description.isValid">Description must not be empty</p>
    </div>
    <div
      class="form-control"
      :class="{invalid: !hourlyRate.isValid}"
    >
      <label for="hourlyRate">Hourly Rate, $</label>
      <input
        type="number"
        id="hourlyRate"
        v-model.number="hourlyRate.val"
        @blur="clearValidity"
      />
      <p v-if="!hourlyRate.isValid">Hourly Rate must be greather than 0</p>
    </div>
    <div
      class="form-control"
      :class="{invalid: !areas.isValid}"
    >
      <h3>Areas of experetise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
        />
        <label for="frontend">Frontend</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
        />
        <label for="backend">Backend</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.val"
        />
        <label for="career">Career</label>
      </div>
      <p v-if="!areas.isValid">Must be checked at least one area</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors and submit again</p>
    <BaseButton @click.prevent="submitForm">
      Register
    </BaseButton>
  </form>
</template>

<script>
export default {
  emits: ["save-data"],
  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
      },
      lastName: {
        val: "",
        isValid: true,
      },
      description: {
        val: "",
        isValid: true,
      },
      hourlyRate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(event) {
      this[event.target.id].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.val === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }

      if (this.lastName.val === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }

      if (this.description.val === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }

      if (!this.hourlyRate.val || this.hourlyRate.val < 0) {
        this.hourlyRate.isValid = false;
        this.formIsValid = false;
      }

      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const data = {
        id: this.$store.getters.userId,
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        description: this.description.val,
        hourlyRate: this.hourlyRate.val,
        areas: this.areas.val,
      };
      this.$emit("save-data", { ...data });
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

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
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

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

p,
.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>