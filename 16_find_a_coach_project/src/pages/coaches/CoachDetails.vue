<template>
  <BaseSpinner v-if="isLoading" />
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
    <section v-if="!contactDialogIsOpen">
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
  <section v-if="contactDialogIsOpen">
    <router-view></router-view>
  </section>
</template>

<script>
import DataService from "../../services/dataService.js";
const dataService = new DataService();

export default {
  props: ["id"],
  data() {
    return {
      isLoading: true,
      selectedCoach: null,
      contactDialogIsOpen: false,
    };
  },
  created() {
    dataService
      .getDataById("coaches", this.id)
      .then((res) => (this.selectedCoach = res))
      .then(() => (this.isLoading = false));
  },
  beforeUpdate() {
    this.contactDialogIsOpen =
      this.$route.path === "/coaches/" + this.id + "/contact";
  },
  computed: {
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
};
</script>