<template>
  <div>
    <BaseDialog
      :show="!!error"
      title="An error occurred"
      @close="handleError"
    >
      <p>{{error}}</p>
    </BaseDialog>
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
  </div>
</template>


<script>
import RequestItem from "../../components/RequestItem.vue";
export default {
  components: { RequestItem },
  data() {
    return {
      error: null,
    };
  },
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
    token() {
      return this.$store.getters.token
    }
  },
  created() {
    this.updateStore();
  },
  methods: {
    async updateStore() {
      try {
        await this.$store.dispatch("requests/updateStore", this.token);
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    },
    handleError() {
      this.error = null;
    },
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