<template>
  <!-- <div class="container">
    <ListData />
  </div>
  <div class="container">

    <div
      class="block"
      :class="{animate: animatedBlock}"
    ></div>
    <button @click="animateBlock">Animate</button>
  </div>
  <div class="container">
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @enter-cancelled="enterCancelled"
      @leave-cancelled="leaveCancelled"
    >
      <p v-if="paraIsVisible">This is only sometimes visible</p>
    </transition>
    <button @click="toggleParagraphVisibility">Toggle Paragraph</button>
  </div>
  <div class="container">
    <transition
      name="fade-button"
      mode="out-in"
    >
      <button
        @click="showUsers"
        v-if="!usersAreVisible"
      >Show Users</button>
      <button
        @click="hideUsers"
        v-else
      >Hide Users</button>
    </transition>
  </div>

  <base-modal
    @close="hideDialog"
    :open="dialogIsVisible"
  >
    <p>This is a test dialog!</p>
    <button @click="hideDialog">Close it!</button>
  </base-modal>

  <div class="container">
    <button @click="showDialog">Show Dialog</button>
  </div> -->

  <router-view v-slot="slotProps">
    <transition
      name='fade-button'
      mode="out-in"
    >
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>

</template>  

<script>
// import ListData from './components/ListData.vue';
export default {
  // components: { ListData },
  data() {
    return {
      animatedBlock: false,
      dialogIsVisible: false,
      paraIsVisible: false,
      usersAreVisible: false,
      enterInterval: null,
      leaveInterval: null,
    };
  },
  methods: {
    enterCancelled() {
      clearInterval(this.enterInterval);
    },
    leaveCancelled() {
      clearInterval(this.leaveInterval);
    },
    beforeEnter(el) {
      console.log('before enter');
      el.style.opacity = 0;
    },
    enter(el, done) {
      console.log('enter');
      let round = 1;
      this.enterInterval = setInterval(() => {
        el.style.opacity = round * 0.01;
        round++;
        if (round > 100) {
          clearInterval(this.enterInterval);
          done();
        }
      }, 20);
    },
    afterEnter() {
      console.log('afterEnter');
    },
    beforeLeave() {},
    leave(el, done) {
      console.log('leave');
      let round = 100;
      this.leaveInterval = setInterval(() => {
        el.style.opacity = round * 0.01;
        round--;
        if (round === 0) {
          clearInterval(this.leaveInterval);
          done();
        }
      }, 20);
    },
    afterLeave() {
      console.log('afterLeave');
    },
    showUsers() {
      this.usersAreVisible = true;
    },
    hideUsers() {
      this.usersAreVisible = false;
    },
    animateBlock() {
      this.animatedBlock = true;
    },
    toggleParagraphVisibility() {
      this.paraIsVisible = !this.paraIsVisible;
    },
    showDialog() {
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  outline: none;
}
html {
  font-family: sans-serif;
}
body {
  margin: 0;
}
button {
  font: inherit;
  padding: 0.5rem 2rem;
  border: 1px solid #810032;
  border-radius: 30px;
  background-color: #810032;
  color: white;
  cursor: pointer;
}
button:hover,
button:active {
  background-color: #a80b48;
  border-color: #a80b48;
}
.block {
  width: 8rem;
  height: 8rem;
  background-color: #290033;
  margin-bottom: 2rem;
  /* transition: transform 0.5s ease-out; */
}
.container {
  max-width: 40rem;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  border: 2px solid #ccc;
  border-radius: 12px;
}

.animate {
  /* transform: translateX(100px); */
  animation: slide-fade 1s ease-out forwards;
}

.fade-button-enter-from,
.fade-button-leave-to {
  opacity: 0;
}

.fade-button-enter-active {
  transition: opacity 1s ease-out;
}
.fade-button-enter-active {
  transition: opacity 1s ease-in;
}

.fade-button-enter-to,
.fade-button-leave-from {
  opacity: 1;
}

@keyframes slide-fade {
  0% {
    transform: translateX(0) scale(1);
  }
  10% {
    transform: translateX(-100px) scale(3);
  }
  70% {
    transform: translateX(50px) scale(1.5);
  }
  100% {
    transform: translateX(-120px) scale(0.5);
  }
}

.route-enter-from {
}
.route-enter-active {
  animation: fade-button 0.54s ease-out;
}
.route-enter-to {
}

.router-leave-active {
  animation: fade-button 0.54s ease-in;
}
</style>