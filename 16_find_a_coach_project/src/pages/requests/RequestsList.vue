<template>
  <BaseSpinner v-if="isLoading" />
  <section v-else>
    <BaseCard>
      <ul v-if="hasRequests">
        <RequestItem
          v-for="request in receivedRequests"
          :key="request.id"
          :name="request.userName"
          :email="request.userEmail"
          :message="request.userMessage"
        />
      </ul>
      <h3 v-else>You haven't received any requests yet.</h3>
    </BaseCard>
  </section>
</template>


<script>
import RequestItem from "../../components/RequestItem.vue";
export default {
  components: { RequestItem },
  computed: {
    receivedRequests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
    isLoading() {
      return this.$store.getters["requests/isLoading"];
    },
  },
  created() {
    this.$store.dispatch("requests/updateStore");
  },
};
</script>


<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>