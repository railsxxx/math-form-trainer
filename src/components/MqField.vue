<template>
  <p>Editable math field: <span id="math-field"></span></p>
  <p>LaTeX of what you typed: <code id="latex"></code></p>
  <button @click="onKey">Click me</button>
</template>

<script>
import { createMQEditField } from "../assets/mq.js";
// const MQ = window.MQ;
export default {
  data() {
    return {
      init: "(a-(b+5))^2",
      input: "(a-(b+5))^2",
      isEditing: false,
      mqField: {},
    };
  },
  methods: {
    onInit() {
      console.log("MQ onInit");
      this.mqField.latex(this.init);
    },
    onKey() {
      this.mqField.write("3");
      this.mqField.write("5");
      this.mqField.typedText("\n");
    },
    onEdit(latex) {
      console.log("MQ onEdit: latex: ", latex);
      document.getElementById("latex").textContent = latex;
    },
    onEnter() {
      console.log("MQ onEnter");
    },
  },
  mounted() {
    // const mathFieldSpan = document.getElementById("math-field");
    // const latexSpan = document.getElementById("latex");
    // const mathField = MQ.MathField(mathFieldSpan, {
    //   spaceBehavesLikeTab: true, // an example config option, for more see:
    //   //   http://docs.mathquill.com/en/latest/Config/
    //   handlers: {
    //     edit: function () {
    //       // retrieve, in LaTeX format, the math that was typed:
    //       latexSpan.textContent = mathField.latex();
    //     },
    //     enter: function () {
    //       console.log("MQ enter");
    //       mathField.blur();
    //     },
    //   },
    // });
    //mathField.latex(this.init);
    // mathField.write("3");
    // mathField.write("5");
    // mathField.typedText("\n");
    this.mqField = createMQEditField("math-field", this.onEdit, this.onEnter);
    this.onInit();
  },
};
</script>