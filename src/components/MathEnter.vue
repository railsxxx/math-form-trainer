<template>
  <span
    v-if="isEditing"
    class="input__lg"
    id="enter-math-field"
    @click="onEdit"
    >{{ init }}</span
  >
  <span v-else class="input__lg editable" @click="onClick">{{
    locale.enterMath
  }}</span>
  <button
    type="button"
    @click="onStart"
    class="btn btn__primary btn__lg btn__top"
  >
    Start
  </button>
</template>

<script>
import { createMQEditField } from "../assets/lib.js";
export default {
  emits: ["newmath"],
  data() {
    return {
      init: "(a-(b+5))^2",
      input: "(a-(b+5))^2",
      isEditing: false,
      locale: this.gLocale,
    };
  },
  computed: {
    MQMathField() {
      return createMQEditField("enter-math-field", this.onInput, this.onStart);
    },
  },
  methods: {
    onClick() {
      this.isEditing = true;
    },
    onEdit() {
      this.MQMathField.focus();
      // this.gFocusMQobj.set(this.MQMathField);
      // this.gForceRerender += 1;
      // console.log("onClick: gFocusMQobj: ", this.gFocusMQobj.get());
      // console.log("onClick: gForceRerender: ", this.gForceRerender);
      this.gFocusMQref.value = this.MQMathField;
      // console.log("onClick: gFocusMQref.value: ", this.gFocusMQref.value);
    },
    onInput(inp) {
      this.input = inp;
      // console.log("onInput: " + this.input);
    },
    onStart() {
      if (this.input === "") return;
      this.$emit("newmath", this.input.replace(/\s+/g, ""));
      this.input = "";
      // this.MQMathField.blur();
      // this.gFocusMQobj.clear();
      this.gFocusMQref.value = {};
      this.isEditing = false;
    },
  },
  mounted() {
    // console.log("mounted:");
  },
  updated() {
    // console.log("updated:");
    createMQEditField("enter-math-field", this.onInput, this.onStart);
  },
};
</script>