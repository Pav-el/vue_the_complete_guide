<template>
  <form
    @submit.prevent="
      this.$emit(
        'update-user-data',
        this.$refs.username.value,
        this.$refs.userAge.value
      )
    "
  >
    <div>
      <label for="usernameInput">User name: </label>
      <input type="text" ref="username" id="usernameInput" />
    </div>
    <div>
      <label for="userAgeInput">User age: </label>
      <input type="text" ref="userAge" id="usernAgeInput" />
    </div>
    <button>Submit</button>
  </form>
</template>

<style scoped>

  div {
    margin-bottom: 10px ;
  }

</style>