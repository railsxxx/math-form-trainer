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
  <div id="editRule">
    {{
      (editRule.left ? editRule.left : "left") +
      "&rArr;" +
      (editRule.right ? editRule.right : "right")
    }}
  </div>
  <br />
    <div>
      <rule-var-edit
        varName="left"
        :varValue="editRuleLeft"
        :initEdit="true"
        :key="forceRerender"
        @varedited="onVarEdited"
      ></rule-var-edit>
    </div>
    <div>
      <rule-var-edit
        varName="right"
        :varValue="editRuleRight"
        :initEdit="true"
        :key="forceRerender"
        @varedited="onVarEdited"
      ></rule-var-edit>
    </div>
    <div>
      <rule-var-edit
        varName="vars"
        :varValue="editRuleVars"
        :initEdit="true"
        :key="forceRerender"
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
        :checked="editRuleSwapTrue"
        @click="onVarEdited('swaptrue', '')"
      />
      <label for="true">true</label><br />
      <input
        type="radio"
        id="swapfalse"
        name="swap"
        :checked="editRuleSwapFalse"
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
      v-model="editRuleName"
      @input="onVarEdited('name', '')"
    />
  </div>
  <div>
    <label for="index">index</label>
    <input
      type="text"
      id="index"
      v-model="editRuleIndex"
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
      editRule: {},
      editRuleIndex: -1,
      editRuleLeft: "",
      editRuleRight: "",
      editRuleVars: "",
      editRuleSwapTrue: false,
      editRuleSwapFalse: false,
      editRuleName: "",
      deletedRuleArr: [],
      deletedRuleIndex: -1,
      hasChanged: false,
      isNew: false,
      forceRerender: 0,
      locale: this.gLocale,
      isErrorIllegalRuleNeiterVarsNorName: false,
      isErrorIllegalIndex: false,
    };
  },
  computed: {
    jsonRule() {
      return JSON.stringify(this.editRule);
    },
  },
  watch: {
    editRule(rule) {
      // update edit
      this.editRuleLeft = rule.left ? rule.left : "";
      this.editRuleRight = rule.right ? rule.right : "";
      this.editRuleVars = rule.vars ? rule.vars.join().replace(/,/g, "") : "";
      this.editRuleSwapTrue = rule.swap ? true : false;
      this.editRuleSwapFalse = rule.swap ? false : true;
      this.editRuleName = rule.name ? rule.name : "";
      console.log("watch: editRule: ", rule);
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
      // copy selected rule to init editRule
      this.editRule = JSON.parse(JSON.stringify(rule));
      this.editRuleIndex = index;
      // forcererender to clear MQmathEdit
      this.forceRerender +=1;
    },
    onVarEdited(varName, varValue) {
      this.hasChanged = true;
      switch (varName) {
        case "left":
          console.log("RuleEditor: onVarEdited left varValue: ", varValue);
          this.editRuleLeft = varValue;
          if (varValue === "") delete this.editRule.left;
          else this.editRule.left = varValue;
          break;
        case "right":
          this.editRuleRight = varValue;
          if (varValue === "") delete this.editRule.right;
          else this.editRule.right = varValue;
          break;
        case "vars":
          this.editRuleVars = varValue;
          if (varValue === "") delete this.editRule.vars;
          else {
            this.isErrorIllegalRuleNeiterVarsNorName = false;
            this.editRule.vars = varValue.split("");
          }
          break;
        case "swaptrue":
          this.editRule.swap = "true";
          break;
        case "swapfalse":
          delete this.editRule.swap;
          break;
        case "name":
          varValue = this.editRuleName;
          if (varValue === "") delete this.editRule.name;
          else {
            this.isErrorIllegalRuleNeiterVarsNorName = false;
            this.editRule.name = varValue;
          }
          break;
        case "index":
          this.isErrorIllegalIndex = false;
          break;
        default:
      }
    },
    onNew() {
      this.isNew = true;
    },
    onDelete() {
      // clear errors
      this.isErrorIllegalRuleNeiterVarsNorName = false;
      this.isErrorIllegalIndex = false;
      // check index for existing rule to be deleted
      if (
        this.editRuleIndex < 0 ||
        this.editRuleIndex > this.rules.length - 1
      ) {
        this.isErrorIllegalIndex = true;
        return;
      }
      // delete selected rule
      this.deletedRuleIndex = this.editRuleIndex;
      this.deletedRuleArr = this.rules.splice(this.deletedRuleIndex, 1);
      // console.log("onDelete: deletedRuleArr: ", this.deletedRuleArr);
      // console.log("onDelete: rules: ", this.rules);
      // clear new
      this.isNew = false;
      this.editRule = {};
      this.editRuleIndex = -1;
    },
    onSave() {
      // clear errors
      this.isErrorIllegalRuleNeiterVarsNorName = false;
      this.isErrorIllegalIndex = false;
      // no legal rule
      if (!this.editRule.vars && !this.editRule.name) {
        this.isErrorIllegalRuleNeiterVarsNorName = true;
        return;
      }
      if (this.hasChanged) {
        if (this.isNew) {
          // check index for new
          if (
            this.editRuleIndex < 0 ||
            this.editRuleIndex > this.rules.length
          ) {
            this.isErrorIllegalIndex = true;
            return;
          }
          // confirm new, insert editRule
          this.rules.splice(this.editRuleIndex, 0, this.editRule);
        } else {
          // check index for edit
          if (
            this.editRuleIndex < 0 ||
            this.editRuleIndex > this.rules.length - 1
          ) {
            this.isErrorIllegalIndex = true;
            return;
          }
          // confirm edit, replace with editRule
          this.rules.splice(this.editRuleIndex, 1, this.editRule);
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
      // clear edit
      this.hasChanged = false;
      // clear new
      this.isNew = false;
      this.editRule = {};
      this.neditRuleIndex = -1;
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