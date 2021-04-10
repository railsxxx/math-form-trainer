<template>
  <div>
    <div v-if="isSelected">
      <span
        id="selectedRule"
        class="editable"
        @click="onSelect(selectedRule)"
        v-html="onShowRuleNoMatch(selectedRule)"
      ></span>
      <div id="adaptVar">{{ varMessage }}</div>
    </div>
    <div v-else>
      <span>{{ locale.clickRuleToSelect }}</span>
      <div class="scrolldown">
        <span
          v-once
          v-for="(optRule, index) in rules"
          :key="index"
          @click="onSelect(optRule)"
        >
          <div>{{ onShowRuleName(optRule) }}</div>
          <span :id="'rule_' + index" v-html="onShowRule(optRule)"></span>
        </span>
      </div>
    </div>
    <div v-for="(varName, index) in selectedRule.vars" :key="index">
      <rule-var-edit
        v-if="isSelected && selectedRule.vars && selectedRule.vars.length > 0"
        :varName="varName"
        :varValue="selectedRule[varName] ? selectedRule[varName] : ''"
        @varedited="onVarEdited"
      ></rule-var-edit>
    </div>
    <div v-if="selectedRule.swap">
      <rule-swap-edit @swapedited="onSwapEdited"> </rule-swap-edit>
    </div>
    <div class="isError" v-if="isErrorQuitEditMqFirst">
      {{ locale.isErrorQuitEditMqFirst }}
    </div>
    <div class="btn-group btn__top">
      <button type="button" class="btn btn__primary" @click="onApply">
        {{ locale.apply }}
      </button>
      <button type="button" class="btn" @click="onCancel">
        {{ locale.cancel }}
      </button>
    </div>
  </div>
</template>

<script>
import RuleVarEditVue from "./RuleVarEdit.vue";
import RuleSwapEditVue from "./RuleSwapEdit.vue";
import {
  addFrontRule,
  matchRule,
  isAllVarsFilled,
  mqifyRules,
  showRuleName,
  showRule,
  showRuleNoMatch,
} from "../libs/rule.js";
// import evaluatex from "../libs/evaluatex/evaluatex.js";
export default {
  components: {
    RuleVarEdit: RuleVarEditVue,
    RuleSwapEdit: RuleSwapEditVue,
  },
  emits: ["editcancelled", "itemedited"],
  props: {
    math: { type: String, required: true },
    rule: { type: Object, required: true },
    id: { type: String, required: true },
  },
  data() {
    return {
      selectedRule: this.rule,
      rules: addFrontRule(this.rule, this.gRulesJSONref.value),
      isSelected: false,
      isErrorQuitEditMqFirst: false,
      locale: this.gLocale,
      varMessage: "",
    };
  },
  computed: {},
  methods: {
    onShowRuleName(rule) {
      return showRuleName(rule, this.locale);
    },
    onShowRule(rule) {
      return showRule(rule);
    },
    onShowRuleNoMatch(rule) {
      return showRuleNoMatch(rule);
    },
    onVarEdited(varName, varValue) {
      this.isErrorQuitEditMqFirst = false;
      // save varValue in property of selectedRule
      if (varValue !== "") this.selectedRule[varName] = varValue;
      else {
        // empty varValue deletes property
        delete this.selectedRule[varName];
        this.varMessage = this.locale.setVarToAdaptNotAll;
        return;
      }
      // match rule to math
      let match, newMath;
      ({ match, newMath } = matchRule(this.math, this.selectedRule));
      if (match === 0) this.varMessage = this.locale.setVarToAdaptNoMatch;
      else if (match === 1)
        if (isAllVarsFilled(this.selectedRule)) {
          this.varMessage = this.locale.setVarToAdaptAll;
        } else {
          this.varMessage = this.locale.setVarToAdaptOK;
        }
      else this.varMessage = this.locale.setVarToAdapt;
      this.doNothing(newMath);
      // update varValue from match if any
      if (varValue !== "") varValue = this.selectedRule[varName];
    },
    onSwapEdited() {
      const left = this.selectedRule.left;
      this.selectedRule.left = this.selectedRule.right;
      this.selectedRule.right = left;
      // reselect selectedRule
      this.isSelected = false;
      this.onSelect(this.selectedRule);
    },
    onSelect(selRule) {
      // first quit current rule edit
      if (this.gFocusMQref.value.id) {
        this.isErrorQuitEditMqFirst = true;
        return;
      }
      // skip selected rule without vars
      if (!selRule.vars) return;
      // toggle flag
      if (this.isSelected) {
        // clear selected rule
        this.selectedRule = {};
        this.isSelected = false;
      } else {
        // copy selected rule
        this.selectedRule = JSON.parse(JSON.stringify(selRule));
        this.isSelected = true;
        // check selectedRule for any matches and inform user
        let match, newMath;
        ({ match, newMath } = matchRule(this.math, this.selectedRule));
        if (match === 0) this.varMessage = this.locale.setVarToAdaptWrongRule;
        else this.varMessage = this.locale.setVarToAdapt;
        this.doNothing(newMath);
      }
    },
    onApply() {
      // first quit current rule edit
      if (this.gFocusMQref.value.id) {
        this.isErrorQuitEditMqFirst = true;
        return;
      }
      // skip selected rule without vars
      if (!this.selectedRule.vars) return;
      if (!isAllVarsFilled(this.selectedRule)) {
        this.varMessage = this.locale.setVarToAdaptNotAll;
        return;
      }
      // match rule to math
      const obj = matchRule(this.math, this.selectedRule);
      const match = obj.match;
      const newMath = obj.math;
      // console.log("RuleSelect:onApply: match: ", match);
      // console.log("RuleSelect:onApply: newMath: ", newMath);
      if (match === 1)
        this.$emit("itemedited", { rule: this.selectedRule, math: newMath });
      else if (match === 0) this.varMessage = this.locale.setVarToAdaptNoMatch;
      else this.varMessage = this.locale.setVarToAdapt;
    },
    onCancel() {
      // quit current rule edit first
      if (this.gFocusMQref.value.id) {
        this.isErrorQuitEditMqFirst = true;
        return;
      }
      // reset varMessage
      this.varMessage = this.locale.setVarToAdapt;
      // notify
      this.$emit("editcancelled");
    },
    doNothing() {},
  },
  mounted: function () {
    mqifyRules(this.rules, this.isSelected);
  },
  updated: function () {
    mqifyRules(this.rules, this.isSelected);
  },
};
</script>

<style scoped>
#adaptVar {
  margin-top: 1rem;
}
.scrolldown {
  display: block;
  width: 100%;
  height: 20rem;
  border-spacing: 0;
  border: 1px solid gray;
  text-align: left;
  /* Set vertical scroll */
  overflow-y: auto;
  /* Hide the horizontal scroll */
  overflow-x: hidden;
}
.scrolldown span {
  display: block;
  width: 100%;
  border-bottom: 1px solid gray;
}
</style>