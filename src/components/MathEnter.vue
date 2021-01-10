<template>
  <span
    v-if="isEditing"
    class="input__lg"
    id="enter-math-field"
    ref="editMathFieldRef"
    @click="onEdit"
    >{{ init }}</span
  >
  <span v-else class="input__lg" @click="onClick">{{ locale.enterMath }}</span>
  <button type="button" @click="onStart" class="btn btn__primary btn__lg">
    Start
  </button>
</template>

<script>
const MQ = window.MQ;
export default {
  components: {},
  emits: ["newmath"],
  data() {
    return {
      init: "(a-3)^2",
      input: "(a-3)^2",
      isEditing: false,
      locale: this.gLocale,
    };
  },
  computed: {
    MQMathField() {
      return MQ.MathField(this.$refs.editMathFieldRef);
    },
  },
  methods: {
    onClick() {
      this.isEditing = true;
    },
    onEdit() {
      this.MQMathField.focus();
      this.gFocusMQobj.set(this.MQMathField);
      // console.log("onClick: gFocusMQobj: ", this.gFocusMQobj.get());
      this.gFocusMQref.value = this.MQMathField;
      // console.log("onClick: gFocusMQref.value: ", this.gFocusMQref.value);
    },
    onInput(inp) {
      this.input = inp;
    },
    onStart() {
      if (this.input === "") return;
      this.$emit("newmath", this.input.replace(/\s+/g, ""));
      this.input = "";
      this.gFocusMQobj.clear();
      this.gFocusMQref.value = {};
      this.isEditing = false;
    },
  },
  updated() {
    const inputOn = this.onInput;
    const enterOn = this.onStart;
    const editMathField = MQ.MathField(this.$refs.editMathFieldRef, {
      spaceBehavesLikeTab: true,
      supSubsRequireOperand: true,
      substituteTextarea: function () {
        return document.createElement("SPAN");
      },
      handlers: {
        edit: function () {
          // retrieve, in LaTeX format, the math that was typed:
          inputOn(editMathField.latex());
        },
        enter: function () {
          enterOn();
        },
      },
    });
  },
};
</script>