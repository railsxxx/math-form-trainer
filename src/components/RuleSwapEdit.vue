<template>
  <span class="editable" @click="onChange">{{ locale.swapSides }}</span>
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
    onChange() {
      this.$emit("swapedited");
    },
  },
};
</script>

<style scoped>
span {
  display: inline-block;
  padding-left: 8px;
  margin-left: 8%;
  width: 92%;
}
</style>