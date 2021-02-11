<template>
  <div>
    <div v-if="isSelected">
      <span
        id="selectedRule"
        class="editable"
        @click="onSelect(selectedRule)"
        v-html="onShowRule(selectedRule)"
      ></span>
      <div id="adaptVar">{{ locale.setVarToAdapt }}</div>
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
    <div class="isError" v-if="isErrorNotAllVarsFilled">
      {{ locale.isErrorNotAllVarsFilled }}
    </div>
    <div class="isError" v-if="isErrorQuitEditMqFirst">
      {{ locale.isErrorQuitEditMqFirst }}
    </div>
    <div class="btn-group btn__top">
      <button type="button" class="btn btn__primary" @click="onSave">
        {{ locale.save }}
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
  isAllVarsFilled,
  fillRule,
  mqifyRules,
  showRuleName,
  showRule,
} from "../libs/rule.js";
export default {
  components: {
    RuleVarEdit: RuleVarEditVue,
    RuleSwapEdit: RuleSwapEditVue,
  },
  emits: ["editcancelled", "itemedited"],
  props: {
    rule: { type: Object, required: true },
    id: { type: String, required: true },
  },
  data() {
    return {
      selectedRule: this.rule,
      rules: addFrontRule(this.rule, this.gRulesJSONref.value),
      isSelected: false,
      isErrorNotAllVarsFilled: false,
      isErrorQuitEditMqFirst: false,
      locale: this.gLocale,
    };
  },
  methods: {
    onShowRuleName(rule) {
      return showRuleName(rule, this.locale);
    },
    onShowRule(rule) {
      return showRule(rule);
    },
    onVarEdited(varName, varValue) {
      this.isErrorQuitEditMqFirst = false;
      //console.log("onVarEdited: ", varName, ":", varValue);
      this.selectedRule[varName] = varValue;
    },
    onSwapEdited() {
      const left = this.selectedRule.left;
      this.selectedRule.left = this.selectedRule.right;
      this.selectedRule.right = left;
    },
    // onRuleAdded(enlargedRules) {
    //   this.rules = enlargedRules;
    //   this.isAdding = false;
    // },
    // onAddCancelled() {
    //   this.isAdding = false;
    // },
    onSelect(selRule) {
      // quit current rule edit first
      if (this.gFocusMQref.value.id) {
        this.isErrorQuitEditMqFirst = true;
        return;
      }
      if (!selRule.vars) return;
      if (this.isSelected) {
        this.selectedRule = {};
        this.isSelected = false;
      } else {
        // copy selected rule
        this.selectedRule = JSON.parse(JSON.stringify(selRule));
        this.isSelected = true;
      }
    },
    onSave() {
      // quit current rule edit first
      if (this.gFocusMQref.value.id) {
        this.isErrorQuitEditMqFirst = true;
        return;
      }
      if (!this.selectedRule.vars) return;
      if (isAllVarsFilled(this.selectedRule)) {
        this.selectedRule = fillRule(this.selectedRule);
      } else {
        this.isErrorNotAllVarsFilled = true;
        return;
      }
      this.$emit("itemedited", this.selectedRule);
    },
    onCancel() {
      // quit current rule edit first
      if (this.gFocusMQref.value.id) {
        this.isErrorQuitEditMqFirst = true;
        return;
      }
      this.$emit("editcancelled");
    },
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