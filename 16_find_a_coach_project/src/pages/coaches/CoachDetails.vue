<template>
  <section v-if="isLoading">
    <BaseCard>
      Loading
    </BaseCard>
  </section>
  <section v-else>
    <section>
      <BaseCard>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <BaseBadge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></BaseBadge>
        <p>{{ description }}</p>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <header>
          <h2>Interested? Reach out now!</h2>
          <BaseButton
            link
            :to="contactLink"
          >Contact</BaseButton>
        </header>
      </BaseCard>
    </section>
  </section>
  <section>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedCoach: null,
    };
  },
  watch: {
    isLoading(value) {
      if (value === false) {
        this.selectCoach();
      }
    },
  },
  created() {
    if (!this.isLoading) {
      this.selectCoach();
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    fullName() {
      return this.selectedCoach.firstName + " " + this.selectedCoach.lastName;
    },
    contactLink() {
      return `${this.id}/contact`;
    },
  },
  methods: {
    selectCoach() {
      this.selectedCoach = this.$store.getters.coaches.find(
        (coach) => coach.id === this.id
      );
    },
  },
};
</script>