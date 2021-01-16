<template>
  <h1>{{ locale.ruleEditor }}</h1>
  <div>
    <div>{{ locale.clickRuleToEdit }}</div>
    <div>{{ locale.clickRuleToNew }}</div>
    <div>{{ locale.clickRuleToDelete }}</div>
    <div>{{ locale.clickRuleToSave }}</div>
    <div>{{ locale.clickRuleToCancel }}</div>
    <div class="scrolldown">
      <span
        v-for="(optRule, index) in rules"
        :key="index"
        @click="onSelect(optRule, index)"
      >
        <div>{{ index }}.</div>
        <div>{{ onShowRuleName(optRule) }}</div>
        <span :id="'rule_' + index" v-html="onShowRule(optRule)"></span>
      </span>
    </div>
    <br />
  </div>
  <div id="newRule">
    {{
      (selectedRule.left ? selectedRule.left : "left") +
      "&rArr;" +
      (selectedRule.right ? selectedRule.right : "right")
    }}
  </div>
  <br />
  <div>
    <rule-var-edit
      varName="left"
      :varValue="selectedRuleLeft"
      :initEdit="true"
      @varedited="onVarEdited"
    ></rule-var-edit>
  </div>
  <div>
    <rule-var-edit
      varName="right"
      :varValue="selectedRuleRight"
      :initEdit="true"
      @varedited="onVarEdited"
    ></rule-var-edit>
  </div>
  <div>
    <rule-var-edit
      varName="vars"
      :varValue="selectedRuleVars"
      :initEdit="true"
      @varedited="onVarEdited"
    ></rule-var-edit>
  </div>
  <div>
    <label for="swap">swap</label>
    <span id="swap">
      <input
        type="radio"
        id="swaptrue"
        name="swap"
        :checked="selectedRuleSwap"
        @click="onVarEdited('swaptrue', '')"
      />
      <label for="true">true</label><br />
      <input
        type="radio"
        id="swapfalse"
        name="swap"
        :checked="selectedRuleSwap"
        @click="onVarEdited('swapfalse', '')"
      />
      <label for="false">false</label>
    </span>
  </div>
  <div>
    <label for="name">name</label>
    <input
      type="text"
      id="name"
      v-model="newRuleName"
      @input="onVarEdited('name', '')"
    />
  </div>
  <div>
    <label for="index">index</label>
    <input
      type="text"
      id="index"
      v-model="newRuleIndex"
      @input="onVarEdited('index', '')"
    />
  </div>
  <br />
  <div>
    <label for="json">json</label>
    <span id="json">{{ jsonRule }}</span>
  </div>
  <div>
    <span v-if="isErrorIllegalRuleNeiterVarsNorName">{{
      locale.isErrorIllegalRuleNeiterVarsNorName
    }}</span>
    <span v-if="isErrorIllegalIndex">{{ locale.isErrorIllegalIndex }}</span>
  </div>

  <div class="btn-group">
    <button type="button" class="btn btn__primary" @click="onNew">
      {{ locale.new }}
    </button>
    <button type="button" class="btn btn__primary" @click="onDelete">
      {{ locale.delete }}
    </button>
    <button type="button" class="btn btn__primary" @click="onSave">
      {{ locale.save }}
    </button>
    <button type="button" class="btn" @click="onCancel">
      {{ locale.cancel }}
    </button>
  </div>
</template>

<script>
import RuleVarEditVue from "./RuleVarEdit.vue";
import rulesJSON from "../assets/rules.json";
import {
  initRulesArr,
  showRule,
  showRuleName,
  mqifyRules,
  downloadRules,
} from "../libs/rule.js";
let MQ = window.MQ;
export default {
  components: {
    RuleVarEdit: RuleVarEditVue,
  },
  emits: ["ruleadded", "addcancelled"],
  data() {
    return {
      rules: initRulesArr(rulesJSON),
      newRule: {},
      newRuleName: this.selectedRuleName,
      newRuleIndex: this.selectedRuleIndex,
      isNew: false,
      deletedRuleArr: [],
      deletedRuleIndex: -1,
      selectedRule: {},
      selectedRuleIndex: -1,
      hasChanged: false,
      locale: this.gLocale,
      isErrorIllegalRuleNeiterVarsNorName: false,
      isErrorIllegalIndex: false,
      // selectedRuleLeft: "",
      // selectedRuleRight: "",
      // selectedRuleVars: "",
      // selectedRuleSwap: "",
      // selectedRuleName: "",
    };
  },
  computed: {
    // update edit
    selectedRuleLeft() {
      return this.selectedRule.left ? this.selectedRule.left : "";
    },
    selectedRuleRight() {
      return this.selectedRule.right ? this.selectedRule.right : "";
    },
    selectedRuleVars() {
      return this.selectedRule.vars
        ? this.selectedRule.vars.join().replace(/,/g, "")
        : "";
    },
    selectedRuleSwap() {
      return this.selectedRule.swap ? this.selectedRule.swap : "";
    },
    selectedRuleName() {
      return this.selectedRule.name ? this.selectedRule.name : "";
    },
    jsonRule() {
      return JSON.stringify(this.newRule);
    },
  },
  methods: {
    onShowRuleName(rule) {
      return showRuleName(rule, this.locale);
    },
    onShowRule(rule) {
      return showRule(rule);
    },
    onSelect(rule, index) {
      // clear errors
      this.isErrorIllegalIndex = false;
      this.isErrorIllegalRuleNeiterVarsNorName = false;
      // clear new
      this.isNew = false;
      // console.log("onSelect: rule: ", rule);
      this.selectedRule = rule;
      this.selectedRuleIndex = index;
      // copy selected rule for init newRule
      this.newRule = JSON.parse(JSON.stringify(rule));
      this.newRuleName = this.selectedRuleName;
      this.newRuleIndex = this.selectedRuleIndex;
      // // update edit
      // this.selectedRuleLeft = rule.left ? rule.left : "";
      // this.selectedRuleRight = rule.right ? rule.right : "";
      // this.selectedRuleVars = rule.vars
      //   ? rule.vars.join().replace(/,/g, "")
      //   : "";
      // this.selectedRuleSwap = rule.swap ? rule.swap : "";
      // this.selectedRuleName = rule.name ? rule.name : "";
    },
    onVarEdited(varName, varValue) {
      this.hasChanged = true;
      switch (varName) {
        case "left":
          if (varValue === "") delete this.newRule.left;
          else this.newRule.left = varValue;
          break;
        case "right":
          if (varValue === "") delete this.newRule.right;
          else this.newRule.right = varValue;
          break;
        case "vars":
          if (varValue === "") delete this.newRule.vars;
          else {
            this.isErrorIllegalRuleNeiterVarsNorName = false;
            this.newRule.vars = varValue.split(",");
          }
          break;
        case "swaptrue":
          this.newRule.swap = "true";
          break;
        case "swapfalse":
          delete this.newRule.swap;
          break;
        case "name":
          varValue = this.newRuleName;
          if (varValue === "") delete this.newRule.name;
          else {
            this.isErrorIllegalRuleNeiterVarsNorName = false;
            this.newRule.name = varValue;
          }
          break;
        case "index":
          this.isErrorIllegalIndex = false;
          this.selectedRuleIndex = this.newRuleIndex;
          break;
        default:
      }
      this.selectedRule = this.newRule;
    },
    onNew() {
      // set for new rule at selectedIndex
      this.isNew = true;
      // this.jsonRule = {};
      // this.selectedRule = {};
      // this.selectedRuleIndex = this.rules.length;
      //console.log("onNew: selectedRuleIndex: ", this.selectedRuleIndex);
    },
    onDelete() {
      // clear errors
      this.isErrorIllegalRuleNeiterVarsNorName = false;
      this.isErrorIllegalIndex = false;
      // check index for existing rule to be deleted
      if (
        this.selectedRuleIndex < 0 ||
        this.selectedRuleIndex > this.rules.length - 1
      ) {
        this.isErrorIllegalIndex = true;
        return;
      }
      // delete selected rule
      this.deletedRuleIndex = this.selectedRuleIndex;
      this.deletedRuleArr = this.rules.splice(this.deletedRuleIndex, 1);
      // console.log("onDelete: deletedRuleArr: ", this.deletedRuleArr);
      console.log("onDelete: rules: ", this.rules);
      // clear selectedRule
      this.selectedRule = [];
      this.selectedRuleIndex = -1;
      // clear new
      this.isNew = false;
      this.newRule = {};
      this.newRuleName = "";
      this.newRuleIndex = -1;
    },
    onSave() {
      // clear errors
      this.isErrorIllegalRuleNeiterVarsNorName = false;
      this.isErrorIllegalIndex = false;
      // no legal rule
      if (!this.newRule.vars && !this.newRule.name) {
        this.isErrorIllegalRuleNeiterVarsNorName = true;
        return;
      }
      console.log("onSave: hasChanged: ", this.hasChanged);
      console.log("onSave: selectedRuleIndex: ", this.selectedRuleIndex);
      if (this.hasChanged) {
        if (this.isNew) {
          // check index for new
          if (
            this.selectedRuleIndex < 0 ||
            this.selectedRuleIndex > this.rules.length
          ) {
            this.isErrorIllegalIndex = true;
            return;
          }
          // confirm new, insert newRule
          this.rules.splice(this.selectedRuleIndex, 0, this.newRule);
        } else {
          // check index for edit
          if (
            this.selectedRuleIndex < 0 ||
            this.selectedRuleIndex > this.rules.length - 1
          ) {
            this.isErrorIllegalIndex = true;
            return;
          }
          // confirm edit, replace with newRule
          this.rules.splice(this.selectedRuleIndex, 1, this.newRule);
        }
        // clear new
        this.isNew = false;
        // clear change
        this.hasChanged = false;
        // offer store of rules in file
        downloadRules(this.rules, "rules.json");
        // clear keypad
        this.gFocusMQobj.clear();
        this.gFocusMQref.value = {};
        // check rules
        console.log("onSave: rules: ", this.rules);
      } else console.log("onSave: nothing saved");
    },
    onCancel() {
      // clear errors
      this.isErrorIllegalRuleNeiterVarsNorName = false;
      this.isErrorIllegalIndex = false;
      // clear selection
      this.hasChanged = false;
      this.selectedRule = {};
      this.selectedRuleIndex = -1;
      // clear new
      this.isNew = false;
      this.newRule = {};
      this.newRuleName = "";
      this.newRuleIndex = -1;
      // clear delete
      if (this.deletedRuleIndex >= 0)
        this.rules.splice(this.deletedRuleIndex, 0, this.deletedRuleArr[0]);
      // console.log("onCancel: deletedRuleIndex: ", this.deletedRuleIndex);
      // console.log("onCancel: rules: ", this.rules);
      this.deletedRuleArr = [];
      this.deletedRuleIndex = -1;
      // clear keypad
      this.gFocusMQobj.clear();
      this.gFocusMQref.value = {};
    },
  },
  mounted() {
    //MQ.StaticMath(document.getElementById("newRule"));
    mqifyRules(this.rules, false);
  },
  updated() {
    //MQ.StaticMath(document.getElementById("newRule"));
    mqifyRules(this.rules, false);
  },
};
</script>

<style scoped>
/* ***select style*** */
.scrolldown {
  display: block;
  width: 100%;
  height: 200px;
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