<template>
  <TheHeader />

  <router-view v-slot="{ Component }">
    <transition
      name="routesTransition"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </router-view>

</template>

<script>
import TheHeader from "./layouts/TheHeader.vue";
export default {
  components: { TheHeader },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.routesTransition-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.routesTransition-enter-active {
  transition: all 0.3s ease-out;
}

.routesTransition-enter-to,
.routesTransition-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.routesTransition-leave-active {
  transition: all 0.3s ease-in;
}

.routesTransition-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>