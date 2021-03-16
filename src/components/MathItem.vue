<template>
  <span class="math" :id="staticMathId">{{ math }}</span>
  <div v-if="!isEditing">
    <div v-if="isErrorNoMatch" class="editable" @click="toggleToRuleSelect">
      <span :id="errorRule" v-html="onShowRule(errorNewRule)"></span>
    </div>
    <div
      v-else-if="rule.matched"
      :class="isLast ? 'editable' : ''"
      @click="toggleToRuleSelect"
    >
      <span :id="editRule" v-html="onShowRule(rule.matched)"></span>
    </div>
    <div v-else class="editable" @click="toggleToRuleSelect">
      {{ locale.selectRule }}
    </div>
    <div class="isError" v-if="isErrorNoMatch">
      {{ locale.noMatch }}
    </div>
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
    :math="math"
    @itemedited="itemEdited"
    @editcancelled="editCancelled"
  ></rule-select>
</template>

<script>
import RuleSelectVue from "./RuleSelect.vue";
import { showRule } from "../libs/rule.js";
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
  emits: ["itemedited", "itemdeleted"],
  data: function () {
    return {
      isEditing: false,
      isLast: this.last,
      isErrorNoMatch: false,
      staticMathMQ: {},
      locale: this.gLocale,
      errorNewRule: {},
    };
  },
  computed: {
    staticMathId() {
      return "static-math-" + this.id;
    },
    editRule() {
      return "edit-rule-" + this.id;
    },
    errorRule() {
      return "error-rule-" + this.id;
    },
  },
  methods: {
    onShowRule(rule) {
      return showRule(rule);
    },
    deleteStep() {
      this.$emit("itemdeleted");
    },
    toggleToRuleSelect() {
      //console.log(this.$refs.editButton);
      if (this.isLast) this.isEditing = true;
    },
    itemEdited(newRule, newMath) {
      console.log("MathItem: itemEdited: newRule: ", newRule);
      console.log("MathItem: itemEdited: newMath: ", newMath);
      this.isEditing = false;
      if (newMath === this.math) {
        this.isErrorNoMatch = true;
        this.errorNewRule = newRule;
      } else {
        this.isErrorNoMatch = false;
        this.$emit("itemedited", { rule: newRule, math: newMath });
      }
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
  },
  mounted() {
    let el = document.getElementById(this.staticMathId);
    this.staticMathMQ = MQ.StaticMath(el);
    el = document.getElementById(this.editRule);
    MQ.StaticMath(el);
    el = document.getElementById(this.errorRule);
    MQ.StaticMath(el);
  },
  updated() {
    let el = document.getElementById(this.editRule);
    MQ.StaticMath(el);
    el = document.getElementById(this.errorRule);
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