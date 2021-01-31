<template>
  <router-view />
  <math-keypad
    class="keypad"
    :mqmathfieldref:="this.gFocusMQref.value"
  ></math-keypad>
  <app-navigation class="nav"></app-navigation>
</template>

<script>
import AppNavigationVue from "./components/AppNavigation.vue";
import MathKeypadVue from "./components/MathKeypad.vue";

export default {
  name: "App",
  components: {
    AppNavigation: AppNavigationVue,
    MathKeypad: MathKeypadVue,
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.nav {
  padding-bottom: 24rem;
}
.keypad {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background: lightgray;
}
</style>