<template>
  <div id="nav">
    <router-link :to="{ name: 'Home' }">{{ locale.navHome }}</router-link> |
    <router-link :to="{ name: 'Rules' }">{{ locale.navRules }}</router-link>
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