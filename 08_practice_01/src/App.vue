<template>
  <section>
    <active-user :user="user"></active-user>
    <user-data @update-user-data="updateUserData"></user-data>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        userAge: ''
      }
    }
  },
  methods: {
    updateUserData(name, age) {
      console.log(name, age)
      this.user.username = name;
      this.user.userAge = age;
    }
  }
}
</script>

<style scoped>

</style>