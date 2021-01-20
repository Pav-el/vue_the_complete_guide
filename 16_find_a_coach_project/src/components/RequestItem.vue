<template>
  <BaseCard>
    <li>
      <div>
        <h4>{{ name }}</h4>
        <a :href="emailLink">{{ email }}</a>
      </div>
      <p>{{ message }}</p>
    </li>
  </BaseCard>
</template>

<script>
export default {
  props: ["name", "email", "message"],
  computed: {
    emailLink() {
      return "mailto:" + this.email;
    },
  },
};
</script>

<style scoped>
li {
  margin: 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
  font-size: 10pt;
}

a:hover,
a:active {
  color: #8d007a;
}

h4 {
  margin: 0.5rem 0 0;
}

p {
  margin: 1rem 0 0 0;
}
</style>