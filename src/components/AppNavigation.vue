<template>
  <div id="nav">
    <router-link :to="{ name: 'Trainer' }">{{ locale.navTrainer }}</router-link>
    |
    <router-link :to="{ name: 'Editor' }">{{ locale.navEditor }}</router-link>
    |
    <router-link :to="{ name: 'File' }">{{ locale.navFile }}</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locale: this.gLocale,
    };
  },
};
</script>

<style scoped>
#nav {
  margin-top: 1rem;
}
</style>