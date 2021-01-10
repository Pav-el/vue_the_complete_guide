<template>
  <button
    @click="logIn"
    v-if="!isLoggedIn"
  >Login</button>
  <button
    @click="logOut"
    v-else
  >Logout</button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    ...mapActions(['logIn', 'logOut']),
  },
};
</script>