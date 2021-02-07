<template>
  <label :for="varName">{{ varName }} = </label>
  <span :id="varName" @click="onEdit"></span>
</template>
  
<script>
import { createMQEditField } from "../libs/mq.js";
export default {
  components: {},
  emits: ["varedited"],
  props: {
    varName: { type: String, required: true },
    varValue: { required: true },
  },
  data() {
    return {
      varNewValue: this.varValue,
      MQMathField: {},
      locale: this.gLocale,
    };
  },
  computed: {
    init() {
      return this.varValue !== "" ? this.varValue : "?";
    },
  },
  watch: {
    varValue(newValue) {
      // console.log("RuleVarEdit: watch: varValue: newValue: ", newValue);
      // reinit on changes of varValue
      this.onInit();
    },
  },
  methods: {
    onInit() {
      // init MQMathField
      this.MQMathField.latex(this.init);
      // console.log("RuleVarEdit: onInit: init: ", this.init);
    },
    onEdit() {
      if (setMQref(this.gFocusMQref, this.MQMathField)) {
        // selected MQMathField
        this.MQMathField.focus();
        // clear default text
        const latex = this.MQMathField.latex();
        if (latex === "?") {
          this.MQMathField.select();
          this.MQMathField.keystroke("Del");
          this.varNewValue = "";
        }
      } else {
        // no focus on unselected MQMathField
        // first hit Enter on selected MQMathField to quit edit
        this.MQMathField.blur();
      }
    },
    onChange(newValue) {
      // get input from user
      this.varNewValue = newValue;
    },
    onEnter() {
      // clear focus on MQMathField
      this.MQMathField.blur();
      // clear Keypad
      this.gFocusMQref.value = {};
      // send input from user
      this.$emit(
        "varedited",
        this.varName,
        this.varNewValue.replace(/\s+/g, "")
      );
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