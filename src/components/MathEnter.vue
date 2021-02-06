<template>
  <span
    v-if="isEditing"
    class="input__lg"
    id="enter-math-field"
    @click="onEdit"
  ></span>
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
import { createMQEditField } from "../libs/mq.js";
export default {
  emits: ["newmath"],
  data() {
    return {
      init: "(a-(b+5))^2",
      input: "(a-(b+5))^2",
      MQMathField: {},
      isEditing: false,
      locale: this.gLocale,
    };
  },
  computed: {},
  methods: {
    onInit() {
      this.MQMathField.latex(this.init);
    },
    onClick() {
      this.isEditing = true;
    },
    onEdit() {
      this.MQMathField.focus();
      this.gFocusMQref.value = this.MQMathField;
      // console.log("onClick: gFocusMQref.value: ", this.gFocusMQref.value);
    },
    onInput(inp) {
      this.input = inp;
      // console.log("MathEnter: onInput: latex: " + this.input);
    },
    onStart() {
      if (this.input === "") return;
      this.$emit("newmath", this.input.replace(/\s+/g, ""));
      this.input = "";
      this.gFocusMQref.value = {};
      this.isEditing = false;
    },
  },
  mounted() {
    // console.log("MathEnter mounted:");
  },
  updated() {
    // console.log("MathEnter updated:");
    this.MQMathField = createMQEditField(
      "enter-math-field",
      this.onInput,
      this.onStart
    );
    this.onInit();
  },
};
</script>