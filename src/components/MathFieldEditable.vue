<template>
  <span id="mathfield">{{ latex }}</span>
</template>

<script>
let MQ = window.MQ;
export default {
  emits: ["latextyped"],
  props: {
    latex: { type: String, required: true },
  },
  methods: {
    onChange(newLatex) {
      this.$emit("latextyped", this.varName, newLatex.replace(/\s+/g, ""));
    },
  },
};
</script>