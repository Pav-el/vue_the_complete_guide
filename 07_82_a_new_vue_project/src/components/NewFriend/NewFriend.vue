<template>
  <form @submit.prevent="sendFormData">
    <div>
      <label for="name">Name</label>
      <input name="name" v-model="nameInput"/>
    </div>
    <div>
      <label for="phone">Phone</label>
      <input name="phone" v-model="phoneInput"/>
    </div>
    <div>
      <label for="email">E-mail</label>
      <input name="email" v-model="emailInput"/>
    </div>
    
    <button>
      Send
    </button>
  </form>  
</template>

<script>
export default {
  emits: {
    'send-form-data': function(nameInput, phoneInput, emailInput) {
      if (nameInput && phoneInput && emailInput) {
        return true
      } else {
        console.log('some data is missing');
        return false
      }
    }
  },
  data() {
    return {
      nameInput: "",
      phoneInput: "",
      emailInput: ""
    }
  },
  methods: {
    sendFormData() {
      this.$emit('send-form-data', this.nameInput, this.phoneInput, this.emailInput)
    }
  }
}
</script>
