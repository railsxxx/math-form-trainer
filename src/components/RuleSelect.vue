<template>
  <div v-if="isAdding">
    <rule-add
      :rules="rules"
      @ruleadded="onRuleAdded"
      @addcancelled="onAddCancelled"
    ></rule-add>
  </div>
  <div v-else-if="isEditing">isEditing</div>
  <div v-else>
    <div v-if="isSelected">
      <span
        id="selectedRule"
        @click="onSelect(selectedRule)"
        v-html="showRule(selectedRule)"
      ></span>
      <br />
      <span>{{ locale.setVarToAdapt }}</span>
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
          <div>{{ showRuleName(optRule) }}</div>
          <span :id="'rule_' + index" v-html="showRule(optRule)"></span>
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
    <div v-if="isErrorNotAllVarsFilled">
      {{ locale.isErrorNotAllVarsFilled }}
    </div>
    <div class="btn-group">
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
import RuleAddVue from "./RuleAdd.vue";
import rulesJSON from "../assets/rules.json";
import {
  initRules,
  isAllVarsFilled,
  fillRule,
  mqifyRules,
} from "../libs/rule.js";
export default {
  components: {
    RuleVarEdit: RuleVarEditVue,
    RuleSwapEdit: RuleSwapEditVue,
    RuleAdd: RuleAddVue,
  },
  emits: ["editcancelled", "itemedited"],
  props: {
    rule: { type: Object, required: true },
    id: { type: String, required: true },
  },
  data() {
    return {
      selectedRule: this.rule,
      rules: initRules(this.rule, rulesJSON),
      isSelected: false,
      // isSelecting: true,
      isAdding: false,
      isEditing: false,
      isErrorNotAllVarsFilled: false,
      locale: this.gLocale,
    };
  },
  methods: {
    showRuleName(rule) {
      return rule.name
        ? this.locale[rule.name]
          ? this.locale[rule.name]
          : rule.name
        : "";
    },
    showRule(rule) {
      return rule.label
        ? this.locale[rule.label]
          ? this.locale[rule.label]
          : rule.label
        : rule.filled
        ? rule.filled.left + "&rArr;" + rule.filled.right
        : rule.left
        ? rule.left + "&rArr;" + rule.right
        : "";
    },
    onVarEdited(varName, varValue) {
      //console.log("onVarEdited: ", varName, ":", varValue);
      this.selectedRule[varName] = varValue;
    },
    onSwapEdited() {
      const left = this.selectedRule.left;
      this.selectedRule.left = this.selectedRule.right;
      this.selectedRule.right = left;
    },
    onRuleAdded(enlargedRules) {
      this.rules = enlargedRules;
      this.isAdding = false;
    },
    onAddCancelled() {
      this.isAdding = false;
    },
    onSelect(selRule) {
      if (!selRule.vars) return;
      if (this.isSelected) {
        this.isSelected = false;
      } else {
        // copy selected rule
        this.selectedRule = JSON.parse(JSON.stringify(selRule));
        this.isSelected = true;
      }
    },
    onSave() {
      if (!this.selectedRule.vars) return;
      if (isAllVarsFilled(this.selectedRule)) {
        this.selectedRule = fillRule(this.selectedRule);
      } else {
        this.isErrorNotAllVarsFilled = true;
        return;
      }
      this.$emit("itemedited", this.selectedRule);
      this.gFocusMQobj.clear();
      this.gFocusMQref.value = {};
    },
    onCancel() {
      this.$emit("editcancelled");
      this.gFocusMQobj.clear();
      this.gFocusMQref.value = {};
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
.edit-label {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #0b0c0c;
  display: block;
  margin-bottom: 5px;
}
input,
select {
  margin-top: 0.4rem;
  width: 100%;
  min-height: 4.4rem;
  padding: 0.4rem 0.8rem;
  border: 2px solid #565656;
}
option {
  display: block;
  text-align: right;
}
form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
form > * {
  flex: 0 0 100%;
}
/* ***select style*** */
.scrolldown {
  display: block;
  width: 100%;
  height: 100px;
  border-spacing: 0;
  border: 1px solid black;
  /* Set vertical scroll */
  overflow-y: auto;
  /* Hide the horizontal scroll */
  overflow-x: hidden;
  text-align: left;
}
.scrolldown span {
  display: block;
  width: 100%;
  border-bottom: 1px solid black;
}
</style>