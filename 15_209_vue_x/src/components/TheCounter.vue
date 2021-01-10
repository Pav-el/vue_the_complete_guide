<template>
  <h3>{{ finalCounter }}</h3>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    //   counter() {
    //     return this.$store.getters.finalCounter;
    //   },
    ...mapGetters('counter', ['finalCounter']), //namespace передается как 1 аргумент, либо см. FavoriteValue
  },
};
</script>