<template>
  <div>
    <BaseDialog
      :show="!!error"
      title="An error occurred"
      @close="handleError"
    >
      <p>{{error}}</p>
    </BaseDialog>
    <CoachFilter @change-filter="setFilters" />
    <section v-if="!error">
      <BaseCard>
        <div class="controls">
          <BaseButton
            mode="outline"
            @click="updateStore(true)"
          >
            Refresh
          </BaseButton>
          <BaseButton
            v-if="!isCoach"
            link
            to="/register"
          >
            Register as a Coach
          </BaseButton>
        </div>
        <ul v-if="hasCoaches">
          <CoachItem
            v-for="item in filteredCoaches"
            :key="item.id"
            :id="item.id"
            :firstName="item.firstName"
            :lastName="item.lastName"
            :areas="item.areas"
            :hourlyRate="item.hourlyRate"
          />
        </ul>
        <BaseSpinner v-else-if="isLoading" />
        <h3 v-else>No coaches found.</h3>
      </BaseCard>
    </section>
  </div>
</template>

<script>
import CoachItem from "../../components/CoachItem.vue";
import CoachFilter from "../../components/CoachFilter.vue";
export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      error: null,
      filteredList: [],
    };
  },
  computed: {
    coaches() {
      return this.$store.getters["coaches/coaches"];
    },
    filteredCoaches() {
      return this.filteredList.length > 0 ? this.filteredList : this.coaches;
    },
    hasCoaches() {
      return this.$store.getters["coaches/hasCoaches"];
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
    isLoading() {
      return this.$store.getters["coaches/isLoading"];
    },
  },
  created() {
    this.updateStore();
  },
  methods: {
    setFilters(filters) {
      const activeFilters = Object.keys(filters).filter(
        (key) => filters[key] === true
      );
      this.filteredList = this.coaches.filter((coach) => {
        for (let i = 0; i < activeFilters.length; i++) {
          if (!coach.areas.includes(activeFilters[i])) {
            return false;
          }
        }
        return true;
      });
    },
    async updateStore(forced = false) {
      try {
        await this.$store.dispatch("coaches/updateStore", forced);
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
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>