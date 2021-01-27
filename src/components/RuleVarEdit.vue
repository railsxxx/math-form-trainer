<template>
  <label :for="varName">{{ varName }} = </label>
  <span :id="varName" @click="onEdit">{{
    varNewValue ? varNewValue : "?"
  }}</span>
</template>

<script>
let MQ = window.MQ;
export default {
  components: {},
  emits: ["varedited"],
  props: {
    varName: { type: String, required: true },
    varValue: { required: true },
  },
  data() {
    return {
      locale: this.gLocale,
    };
  },
  computed: {
    varNewValue() {
      // console.log("RuleVarEdit: computed: varValue", this.varValue);
      return this.varValue;
    },
    MQMathField() {
      return MQ.MathField(document.getElementById(this.varName));
    },
  },
  methods: {
    onChange(newValue) {
      //console.log("onChange: newValue", newValue);
      this.$emit("varedited", this.varName, newValue.replace(/\s+/g, ""));
    },
    onEdit() {
      this.MQMathField.focus();
      // clear default text
      if (this.MQMathField.latex() === "?") {
        this.MQMathField.select();
        this.MQMathField.keystroke("Del");
      }
      // this.gFocusMQobj.mq = this.MQMathField;
      this.gFocusMQobj.set(this.MQMathField);
      this.gFocusMQref.value = this.MQMathField;
      // console.log("onClick: MQMathField: ", this.MQMathField);
      // console.log("onClick: gFocusMQobj: ", this.gFocusMQobj.get());
      // console.log("onClick: gFocusMQref.value: ", this.gFocusMQref.value);
    },
  },
  mounted: function () {
    const changeOn = this.onChange;
    const editMathField = MQ.MathField(document.getElementById(this.varName), {
      spaceBehavesLikeTab: true,
      supSubsRequireOperand: true,
      substituteTextarea: function () {
        return document.createElement("SPAN");
      },
      handlers: {
        edit: function () {
          // retrieve, in LaTeX format, the math that was typed:
          const valueMQ = editMathField.latex();
          changeOn(valueMQ);
          //console.log("editMathField: valueMQ", valueMQ);
        },
      },
    });
    // console.log("RuleVarEdit: mounted");
  },
  updated() {
    const changeOn = this.onChange;
    const editMathField = MQ.MathField(document.getElementById(this.varName), {
      spaceBehavesLikeTab: true,
      supSubsRequireOperand: true,
      substituteTextarea: function () {
        return document.createElement("SPAN");
      },
      handlers: {
        edit: function () {
          // retrieve, in LaTeX format, the math that was typed:
          const valueMQ = editMathField.latex();
          changeOn(valueMQ);
          //console.log("editMathField: valueMQ", valueMQ);
        },
      },
    });
  },
};
</script>

<style scoped>
span {
  display: inline-block;
  padding-left: 8px;
  width: 92%;
}
label {
  display: inline-block;
  width: 8%;
}
</style>