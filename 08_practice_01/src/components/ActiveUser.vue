<template>
  <div>
    <p>UserName: {{ user.username }}</p>
    <p>UserAge: {{ user.userAge }}</p>
  </div>
</template>

<script>
export default {
  props: ["user"],
};
</script>