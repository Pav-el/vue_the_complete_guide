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
  </div>
</template>

<script>
import DataService from "../../services/dataService.js";
const dataService = new DataService();

export default {
  props: ["id"],
  data() {
    return {
      error: null,
      isLoading: true,
      selectedCoach: null,
      contactDialogIsOpen: false,
    };
  },
  created() {
    this.getSelectedCoachDetails(this.id);
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
  methods: {
    async getSelectedCoachDetails(id) {
      try {
        this.selectedCoach = await dataService.getDataById("coaches", id);
        this.isLoading = false;
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