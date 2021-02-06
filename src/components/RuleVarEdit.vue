<template>
  <label :for="varName">{{ varName }} = </label>
  <span :id="varName" @click="onEdit"></span>
</template>
 
<script>
import { createMQEditField } from "../assets/mq.js";
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
      MQMathField: {},
      locale: this.gLocale,
    };
  },
  computed: {},
  watch: {},
  methods: {
    onInit() {
      this.MQMathField.latex(this.init);
    },
    onChange(newValue) {
      this.varNewValue = newValue;
    },
    onEnter() {
      this.MQMathField.blur();
      this.gFocusMQref.value = {};
      this.$emit(
        "varedited",
        this.varName,
        this.varNewValue.replace(/\s+/g, "")
      );
    },
    onEdit() {
      if (setMQref(this.gFocusMQref, this.MQMathField)) {
        this.MQMathField.focus();
        // clear default text
        const latex = this.MQMathField.latex();
        if (latex === "?") {
          this.MQMathField.select();
          this.MQMathField.keystroke("Del");
          this.varNewValue = "";
        }
      } else {
        this.MQMathField.blur();
      }
    },
  },
  mounted: function () {
    this.MQMathField = createMQEditField(
      this.varName,
      this.onChange,
      this.onEnter
    );
    this.onInit();
    // console.log("RuleVarEdit: mounted");
  },
  updated() {
    // console.log("RuleVarEdit: updated");
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