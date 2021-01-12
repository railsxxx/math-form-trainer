<template>
  <app-navigation></app-navigation>
</template>

<script>
import AppNavigationVue from "./components/AppNavigation.vue";

export default {
  name: "App",
  components: {
    AppNavigation: AppNavigationVue,
  },
};
</script>