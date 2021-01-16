<template>
  <router-view />
  <math-keypad
    :mqmathfield="this.gFocusMQobj.get()"
    :mqmathfieldref="this.gFocusMQref.value"
  ></math-keypad>
  <app-navigation></app-navigation>
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