<template>
  <span class="math" :id="staticMathId">{{ math }}</span>
  <div v-if="!isEditing">
    <div
      v-if="rule.filled"
      :class="isLast ? 'editable' : ''"
      @click="toggleToRuleSelect"
    >
      <span :id="editRule" v-html="onShowRule(rule.filled)"></span>
    </div>
    <div v-else class="editable" @click="toggleToRuleSelect">
      {{ locale.selectRule }}
    </div>
    <div class="isError" v-if="isErrorNoMatch">{{ locale.noMatch }}</div>
    <div class="btn-group btn__top" v-if="isLast">
      <button type="button" class="btn btn__primary" @click="deleteStep">
        {{ locale.back }}
      </button>
    </div>
  </div>
  <rule-select
    v-else
    :id="id"
    :rule="rule"
    @itemedited="itemEdited"
    @editcancelled="editCancelled"
  ></rule-select>
</template>

<script>
import RuleSelectVue from "./RuleSelect.vue";
import { matchRule, showRule } from "../libs/rule.js";
let MQ = window.MQ;
//   :class="isLast ? 'editable' : ''"

export default {
  components: {
    RuleSelect: RuleSelectVue,
  },
  props: {
    id: String,
    last: Boolean,
    math: String,
    rule: Object,
  },
  emits: ["itemedited", "itemdeleted", "ruleapplied"],
  data: function () {
    return {
      isEditing: false,
      isLast: this.last,
      isErrorNoMatch: false,
      //newMath: this.math,
      staticMathMQ: {},
      locale: this.gLocale,
    };
  },
  // {{ rule.filled ? rule.filled.left + " &rArr; " + rule.filled.right : "" }}
  computed: {
    staticMathId() {
      return "static-math-" + this.id;
    },
    editRule() {
      return "edit-rule-" + this.id;
    },
  },
  methods: {
    onShowRule(rule) {
      return showRule(rule);
    },
    rewriteMath() {
      // console.log("rewriteMath: math: ", this.math);
      // console.log("rewriteMath: rule: ", this.rule);
      if (!this.rule.filled) return;
      const newMath = matchRule(this.math, this.rule.filled);
      // console.log("rewriteMath: newMath: ", newMath);
      if (newMath === "") this.isErrorNoMatch = true;
      else this.$emit("ruleapplied", newMath);
    },
    deleteStep() {
      this.$emit("itemdeleted");
    },
    toggleToRuleSelect() {
      //console.log(this.$refs.editButton);
      if (this.isLast) this.isEditing = true;
    },
    itemEdited(newRule) {
      // console.log("ToDoItem: itemEdited: ", newRule);
      this.$emit("itemedited", newRule);
      this.isEditing = false;
      this.isErrorNoMatch = false;
    },
    editCancelled() {
      // console.log("ToDoItem: editCancelled: ");
      this.isEditing = false;
    },
    onStaticMathClick() {
      //   this.gFocusMQobj.set(this.staticMathMQ);
      //   console.log("onStaticMathClick: gFocusMQobj: ", this.gFocusMQobj.get());
      this.gFocusMQref.value = this.staticMathMQ;
      console.log(
        "onStaticMathClick: gFocusMQref.value: ",
        this.gFocusMQref.value
      );
    },
  },
  watch: {
    last: function (newVal) {
      this.isLast = newVal;
    },
    rule() {
      this.rewriteMath();
    },
  },
  mounted() {
    let el = document.getElementById(this.staticMathId);
    this.staticMathMQ = MQ.StaticMath(el);
    el = document.getElementById(this.editRule);
    MQ.StaticMath(el);
  },
  updated() {
    const el = document.getElementById(this.editRule);
    MQ.StaticMath(el);
  },
};
</script>

<style scoped>
.math {
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: #d7f8bb;
}
</style>