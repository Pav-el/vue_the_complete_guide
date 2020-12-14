<template>
  <section>
    <base-card>
      <h2>Submitted Experiences</h2>
      <div>
        <base-button @click="loadExperiences">Load Submitted Experiences</base-button>
      </div>
      <p v-if="loading">Loading...</p>
      <p v-else-if="!loading && error">{{ error }}</p>
      <p v-else-if="!loading && (!results || results.length === 0)">No stored experiences.</p>

      <ul v-else>
        <survey-result
          v-for="result in results"
          :key="result.id"
          :name="result.name"
          :rating="result.rating"
        ></survey-result>
      </ul>
    </base-card>
  </section>
</template>

<script>
import SurveyResult from './SurveyResult.vue';

export default {
  components: {
    SurveyResult,
  },
  data() {
    return {
      results: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    loadExperiences() {
      this.loading = true;
      this.error = null;
      fetch('https://httprequesttraining-default-rtdb.firebaseio.com/surveys.json')
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          const results = [];
          for (const id in data) {
            results.push({ id, name: data[id].name, rating: data[id].rating });
          }
          this.results = results;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.error = 'Failed to fetch data.';
        });
    },
  },
  mounted() {
    this.loadExperiences();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>