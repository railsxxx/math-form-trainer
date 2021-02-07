<template>
  <h1>{{ locale.ruleEditor }}</h1>
  <div>
    <div>{{ locale.clickRuleToEdit }}</div>
    <div>{{ locale.clickRuleToNew }}</div>
    <div>{{ locale.clickRuleToDelete }}</div>
    <div>{{ locale.clickRuleToSave }}</div>
    <div>{{ locale.clickRuleToCancel }}</div>
    <div id="scroll" class="scrolldown">
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
  </div>
  <div id="showRule">
    <span id="editRule" v-html="onShowRule(editRule)"></span>
  </div>
  <div>
    <rule-var-edit
      varName="indx"
      :varValue="editRuleIndex"
      :key="forceRerender"
      @varedited="onVarEdited"
    ></rule-var-edit>
  </div>
  <div>
    <rule-var-edit
      varName="left"
      :varValue="editRuleLeft"
      :key="forceRerender"
      @varedited="onVarEdited"
    ></rule-var-edit>
  </div>
  <div>
    <rule-var-edit
      varName="right"
      :varValue="editRuleRight"
      :key="forceRerender"
      @varedited="onVarEdited"
    ></rule-var-edit>
  </div>
  <div>
    <rule-var-edit
      varName="vars"
      :varValue="editRuleVars"
      :key="forceRerender"
      @varedited="onVarEdited"
    ></rule-var-edit>
  </div>
  <div>
    <label class="varLabel" for="swap">swap</label>
    <span class="varInput" id="swap">
      <label class="radioLabel" for="swaptrue"
        >true
        <input
          type="radio"
          name="swap"
          id="swaptrue"
          :checked="editRuleSwap === 'true'"
          @click="onVarEdited('swap', 'true')"
        />
      </label>
      <label class="radioLabel" for="swapfalse"
        >false
        <input
          type="radio"
          name="swap"
          id="swapfalse"
          :checked="editRuleSwap === 'false'"
          @click="onVarEdited('swap', 'false')"
        />
      </label>
    </span>
  </div>
  <div>
    <label class="varLabel" for="name">name</label>
    <input
      type="text"
      id="name"
      class="varInput"
      v-model="editRuleName"
      @input="onVarEdited('name', '')"
    />
  </div>
  <div id="showJson">
    <label class="varLabel" for="json">json</label>
    <span class="varInput" id="json">{{ jsonRule }}</span>
  </div>
  <div>
    <span class="isError" v-if="isErrorIllegalRuleNeitherVarsNorName">{{
      locale.isErrorIllegalRuleNeitherVarsNorName
    }}</span>
    <span class="isError" v-if="isErrorIllegalIndex">{{
      locale.isErrorIllegalIndex
    }}</span>
    <span class="isError" v-if="isErrorQuitEditMqFirst">
      {{ locale.isErrorQuitEditMqFirst }}
    </span>
  </div>

  <div class="btn-group btn__top">
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
  stringifyRule,
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
      editRuleSwap: false,
      editRuleName: "",
      deletedRule: {},
      deletedRuleIndex: -1,
      newRuleIndex: -1,
      hasChanged: false,
      isNew: false,
      forceRerender: 0,
      locale: this.gLocale,
      isErrorIllegalRuleNeitherVarsNorName: false,
      isErrorIllegalIndex: false,
      isErrorQuitEditMqFirst: false,
    };
  },
  computed: {
    jsonRule() {
      // return JSON.stringify(this.editRule);
      return stringifyRule(this.editRule);
    },
  },
  watch: {
    editRule(rule) {
      // update edit
      this.editRuleLeft = rule.left ? rule.left : "";
      this.editRuleRight = rule.right ? rule.right : "";
      this.editRuleVars = rule.vars ? rule.vars.join().replace(/,/g, "") : "";
      this.editRuleSwap = rule.swap ? rule.swap : "false";
      this.editRuleName = rule.name ? rule.name : "";
      // console.log("RuleEditor: watch: editRule: rule: ", rule);
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
      // quit current rule edit first
      if (this.gFocusMQref.value.id) {
        this.isErrorQuitEditMqFirst = true;
        return;
      }
      // clear errors
      this.isErrorIllegalIndex = false;
      this.isErrorIllegalRuleNeihterVarsNorName = false;
      // copy selected rule to init editRule
      this.editRule = JSON.parse(JSON.stringify(rule));
      this.editRuleIndex = index;
      // forcererender to clear MQmathEdit
      this.forceRerender += 1;
    },
    onVarEdited(varName, varValue) {
      // clear error flag
      this.isErrorQuitEditMqFirst = false;
      // set change flag
      this.hasChanged = true;
      // set value for rule variable
      switch (varName) {
        case "left":
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
            this.isErrorIllegalRuleNeitherVarsNorName = false;
            this.editRule.vars = varValue.split("");
          }
          break;
        case "swap":
          this.editRuleSwap = varValue;
          if (varValue === "true") this.editRule.swap = "true";
          else delete this.editRule.swap;
          break;
        case "name":
          varValue = this.editRuleName;
          if (varValue === "") delete this.editRule.name;
          else {
            this.isErrorIllegalRuleNeitherVarsNorName = false;
            this.editRule.name = varValue;
          }
          break;
        case "indx":
          // console.log("RuleEditor: onVarEdited index varValue: ", varValue);
          this.editRuleIndex = varValue;
          this.isErrorIllegalIndex = false;
          break;
        default:
      }
    },
    onNew() {
      // quit current rule edit
      if (this.gFocusMQref.value.id) {
        this.isErrorQuitEditMqFirst = true;
        return;
      }
      // clear errors
      this.isErrorIllegalRuleNeitherVarsNorName = false;
      this.isErrorIllegalIndex = false;
      // check index for new
      if (this.editRuleIndex < 0 || this.editRuleIndex > this.rules.length) {
        this.isErrorIllegalIndex = true;
        return;
      }
      // save newRuleIndex for remove onCancel
      this.newRuleIndex = this.editRuleIndex;
      // confirm new, insert editRule
      this.rules.splice(this.editRuleIndex, 0, this.editRule);
    },
    onDelete() {
      // quit current rule edit
      if (this.gFocusMQref.value.id) {
        this.isErrorQuitEditMqFirst = true;
        return;
      }
      // clear errors
      this.isErrorIllegalRuleNeitherVarsNorName = false;
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
      // save deleted rule for restore onCancel
      this.deletedRuleIndex = this.editRuleIndex;
      this.deletedRule = this.rules.splice(this.deletedRuleIndex, 1)[0];
      // console.log("onDelete: deletedRule: ", this.deletedRule);
      // console.log("onDelete: rules: ", this.rules);
      // clear editRule
      this.editRule = {};
      this.editRuleIndex = -1;
    },
    onSave() {
      // quit current rule edit
      if (this.gFocusMQref.value.id) {
        this.isErrorQuitEditMqFirst = true;
        return;
      }
      // save changes on editRule
      // clear errors
      this.isErrorIllegalRuleNeitherVarsNorName = false;
      this.isErrorIllegalIndex = false;
      // no legal rule
      if (!this.editRule.vars && !this.editRule.name) {
        this.isErrorIllegalRuleNeitherVarsNorName = true;
        return;
      }
      if (this.hasChanged) {
        // check index for edit
        if (
          this.editRuleIndex < 0 ||
          this.editRuleIndex > this.rules.length - 1
        ) {
          this.isErrorIllegalIndex = true;
          return;
        }
        // save replaced rule for restore onCancel
        this.deletedRule = this.rules[this.editRuleIndex];
        this.deletedRuleIndex = this.editRuleIndex;
        // confirm edit, replace with editRule
        this.rules.splice(this.editRuleIndex, 1, this.editRule);

        // clear change
        this.hasChanged = false;
        // offer store of rules in file
        downloadRules(this.rules, "rules.json");
        // clear keypad
        this.gFocusMQref.value = {};
        // check rules
        // console.log("onSave: rules: ", this.rules);
        // forcererender to clear MQmathEdit
        this.forceRerender += 1;
      } else console.log("onSave: nothing saved");
    },
    onCancel() {
      // quit current rule edit
      if (this.gFocusMQref.value.id) {
        this.isErrorQuitEditMqFirst = true;
        return;
      }
      // clear errors
      this.isErrorIllegalRuleNeitherVarsNorName = false;
      this.isErrorIllegalIndex = false;
      // clear edit
      this.hasChanged = false;
      this.editRule = {};
      this.editRuleIndex = -1;
      // clear delete
      if (this.deletedRuleIndex >= 0)
        this.rules.splice(this.deletedRuleIndex, 0, this.deletedRule);
      // console.log("onCancel: deletedRuleIndex: ", this.deletedRuleIndex);
      // console.log("onCancel: rules: ", this.rules);
      this.deletedRule = {};
      this.deletedRuleIndex = -1;
      // clear new
      if (this.newRuleIndex >= 0) this.rules.splice(this.newRuleIndex, 1);
      this.newRuleIndex = -1;
      // clear keypad
      this.gFocusMQref.value = {};
    },
  },
  mounted() {
    MQ.StaticMath(document.getElementById("editRule"));
    mqifyRules(this.rules, false);
  },
  updated() {
    MQ.StaticMath(document.getElementById("editRule"));
    mqifyRules(this.rules, false);
  },
};
</script>

<style scoped>
#showRule,
#showJson,
#scroll {
  margin-top: 2rem;
  margin-bottom: 1rem;
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
.radioLabel {
  display: inline-block;
  position: relative;
  padding-left: 17px;
  margin-right: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.radioLabel input {
  position: absolute;
  left: 0px;
  top: 4px;
}
.varInput {
  display: inline-block;
  padding-left: 8px;
  width: 92%;
}
.varLabel {
  display: inline-block;
  width: 8%;
}
</style>