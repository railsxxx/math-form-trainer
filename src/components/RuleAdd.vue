<template>
  <div id="newRule">
    {{
      (rule.vars ? rule.vars : "vars") +
      " :: " +
      (rule.left ? rule.left : "left") +
      "&rarr;" +
      (rule.right ? rule.right : "right")
    }}
  </div>
  <br />
  <rule-var-edit
    varName="left"
    varValue=""
    @varedited="onVarEdited"
  ></rule-var-edit>
  <rule-var-edit
    varName="right"
    varValue=""
    @varedited="onVarEdited"
  ></rule-var-edit>
  <rule-var-edit
    varName="vars"
    varValue=""
    @varedited="onVarEdited"
  ></rule-var-edit>
  <div class="btn-group">
    <button type="button" class="btn" @click="onCancel">Cancel</button>
    <button type="button" class="btn btn__primary" @click="onSave">Save</button>
  </div>
</template>

<script>
import RuleVarEditVue from "./RuleVarEdit.vue";
import { addRule, downloadRules } from "../libs/rule.js";
let MQ = window.MQ;
export default {
  components: {
    RuleVarEdit: RuleVarEditVue,
  },
  emits: ["ruleadded", "addcancelled"],
  props: {
    rules: { type: Object, required: true },
  },
  data() {
    return {
      rule: {},
      enlargedRules: this.rules,
      hasChanged: false,
    };
  },
  computed: {},
  methods: {
    onVarEdited(varName, varValue) {
      this.hasChanged = true;
      switch (varName) {
        case "left":
          this.rule.left = varValue;
          break;
        case "right":
          this.rule.right = varValue;
          break;
        case "vars":
          this.rule.vars = varValue.split(",");
          break;
        default:
      }
      // console.log("onVarEdited: rule:", this.rule);
    },
    onSave() {
      if (!this.rule.vars) return;
      if (this.hasChanged) {
        this.hasChanged = false;
        this.enlargedRules = addRule(this.rule, this.enlargedRules);
        downloadRules(this.enlargedRules, "rules.json");
        this.$emit("ruleadded", this.enlargedRules);
        this.gFocusMQobj.clear();
        this.gFocusMQref.value = {};
      }
    },
    onCancel() {
      this.$emit("addcancelled");
      this.gFocusMQobj.clear();
      this.gFocusMQref.value = {};
    },
  },
  mounted() {
    MQ.StaticMath(document.getElementById("newRule"));
  },
  updated() {
    MQ.StaticMath(document.getElementById("newRule"));
  },
};
</script>

<style scoped>
</style>