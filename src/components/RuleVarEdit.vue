<template>
  <label :for="varName">{{ varName }} = </label>
  <span :id="varName" @click="onEdit">{{ init }}</span>
</template>

<script>
import { createMQEditField } from "../assets/lib.js";
// let MQ = window.MQ;
export default {
  components: {},
  emits: ["varedited"],
  props: {
    varName: { type: String, required: true },
    varValue: { required: true },
  },
  data() {
    return {
      init: this.varValue !== "" ? this.varValue : "?",
      varNewValue: this.varValue,
      locale: this.gLocale,
    };
  },
  computed: {
    // varNewValue() {
    //   // console.log("RuleVarEdit: computed: varValue", this.varValue);
    //   return this.varValue;
    // },
    MQMathField() {
      return createMQEditField(this.varName, this.onChange, this.onEnter);
      //return MQ.MathField(document.getElementById(this.varName));
    },
  },
  methods: {
    onChange(newValue) {
      // console.log("onChange: newValue", newValue);
      this.varNewValue = newValue;
    },
    onEnter() {
      // console.log("RuleVarEdited: onEnter");
      this.$emit(
        "varedited",
        this.varName,
        this.varNewValue.replace(/\s+/g, "")
      );
      this.MQMathField.blur();
      this.gFocusMQref.value = {};
    },
    onEdit() {
      console.log("onEdit");
      if (setMQref(this.gFocusMQref, this.MQMathField)) {
        this.MQMathField.focus();
        // clear default text
        if (this.MQMathField.latex() === "?") {
          this.MQMathField.select();
          this.MQMathField.keystroke("Del");
          this.varNewValue = "";
        }
      } else {
        this.MQMathField.blur();
        // message to user to hit Enter first
        // console.log("Hit enter to finish editing");
      }
    },
  },
  mounted: function () {
    createMQEditField(this.varName, this.onChange, this.onEnter);
    // console.log("RuleVarEdit: mounted");
  },
  updated() {
    createMQEditField(this.varName, this.onChange, this.onEnter);
  },
};
function setMQref(mqref, mqobj) {
  if (!mqref.value.id) mqref.value = mqobj;
  else if (mqref.value.id !== mqobj.id) {
    return false;
  }
  return true;
}
// function clearMQref(mqref) {
//   mqref.value = {};
// }
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