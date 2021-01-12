<template>
  <button type="button" @click="onChange">{{ locale.swapSides }}</button>
</template>

<script>
export default {
  components: {},
  emits: ["swapedited"],
  data() {
    return {
      locale: this.gLocale,
    };
  },
  methods: {
    onChange(newValue) {
      this.$emit("swapedited");
    },
  },
};
</script>

<style scoped>
</style>