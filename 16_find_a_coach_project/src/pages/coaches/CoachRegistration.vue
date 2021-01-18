<template>
  <section>
    <BaseCard>
      <h2>Register as a Coach now!</h2>
      <CoachForm @save-data="saveData" />
    </BaseCard>
  </section>
</template>

<script>
import CoachForm from "../../components/CoachForm.vue";
import DataService from "../../services/dataService.js";
const dataService = new DataService();
export default {
  components: { CoachForm },
  methods: {
    saveData(data) {
      dataService
        .sendData(data, "coaches")
        .then(() => this.$store.dispatch("coaches/updateStore"))
        .then(() => this.$router.replace("/coaches"));
    },
  },
};
</script>