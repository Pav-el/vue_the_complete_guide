<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ hourlyRate }}/hour</h4>
    <div>
      <BaseBadge
        v-for="area in areas"
        :key="area+fullName"
        :title="area"
        :type="area"
      />
    </div>
    <div class="actions">
      <BaseButton
        mode="outline"
        link
        :to="coachContactLink"
      >
        Contact
      </BaseButton>
      <BaseButton
        link
        :to="coachDetailLink"
      >
        View Details
      </BaseButton>
    </div>
  </li>
</template>

<script>
export default {
  props: ["id", "firstName", "lastName", "hourlyRate", "areas"],
  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    },
    coachContactLink() {
      return `${this.$route.path}/${this.id}/contact`;
    },
    coachDetailLink() {
      return `${this.$route.path}/${this.id}`;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>