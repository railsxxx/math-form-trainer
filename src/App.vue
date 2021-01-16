<template>
  <router-view />
  <math-keypad
    :mqmathfieldref="this.gFocusMQref.value"
    :mqmathfield="this.gFocusMQobj.get()"
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