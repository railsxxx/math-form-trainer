<template>
  <div>
    <p :id="staticMathId">{{ math }}</p>
  </div>
  <div class="stack-small" v-if="!isEditing">
    <div
      :id="editRule"
      class="checkbox-label"
      v-if="rule.filled"
      @click="toggleToRuleSelect"
    >
      {{ rule.filled ? rule.filled.left + " &rArr; " + rule.filled.right : "" }}
    </div>
    <div v-else @click="toggleToRuleSelect">{{ locale.selectRule }}</div>
    <div class="btn-group" v-if="isLast">
      <button type="button" class="btn btn__danger" @click="deleteStep">
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
let MQ = window.MQ;
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
      newMath: this.math,
      staticMathMQ: {},
      locale: this.gLocale,
    };
  },
  computed: {
    staticMathId() {
      return "static-math-" + this.id;
    },
    editRule() {
      return "edit-rule-" + this.id;
    },
  },
  methods: {
    rewriteMath() {
      console.log("rewriteMath: rule: ", this.rule);
      if (!this.rule.filled) return;
      this.newMath = matchRule(this.math, this.rule.filled);
      // console.log("rewriteMath: this.newMath: ", this.newMath);
      this.$emit("ruleapplied", this.newMath);
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
    },
    editCancelled() {
      // console.log("ToDoItem: editCancelled: ");
      this.isEditing = false;
    },
    onStaticMathClick() {
      this.gFocusMQobj.set(this.staticMathMQ);
      console.log("onStaticMathClick: gFocusMQobj: ", this.gFocusMQobj.get());
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
function matchRule(math, ruleFilled) {
  console.log("matchRule: rule:", ruleFilled);
  if (!ruleFilled.left || !ruleFilled.right) return;
  const newMath = math.replace(ruleFilled.left, ruleFilled.right);
  return newMath;
}
</script>

<style scoped>
label {
  display: block;
  text-align: right;
}
p {
  margin-bottom: 0px;
  background-color: #d7f8bb;
}
.custom-checkbox > .checkbox-label {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  font-size: 16px;
  font-size: 1rem;
  line-height: 1.25;
  color: #0b0c0c;
  margin-bottom: 5px;
  display: block;
}
.custom-checkbox > .checkbox {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  font-size: 16px;
  font-size: 1rem;
  line-height: 1.25;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  height: 2.5rem;
  margin-top: 0;
  padding: 5px;
  border: 2px solid #0b0c0c;
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.custom-checkbox > input:focus {
  outline: 3px dashed #fd0;
  outline-offset: 0;
  box-shadow: inset 0 0 0 2px;
}
.custom-checkbox {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.25;
  display: block;
  position: relative;
  min-height: 40px;
  margin-bottom: 10px;
  padding-left: 40px;
  clear: left;
}
.custom-checkbox > input[type="checkbox"] {
  -webkit-font-smoothing: antialiased;
  cursor: pointer;
  position: absolute;
  z-index: 1;
  top: -2px;
  left: -2px;
  width: 44px;
  height: 44px;
  margin: 0;
  opacity: 0;
}
.custom-checkbox > .checkbox-label {
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  display: inline-block;
  margin-bottom: 0;
  padding: 8px 15px 5px;
  cursor: pointer;
  touch-action: manipulation;
}
.custom-checkbox > label::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 2px solid currentColor;
  background: transparent;
}
.custom-checkbox > input[type="checkbox"]:focus + label::before {
  border-width: 4px;
  outline: 3px dashed #228bec;
}
.custom-checkbox > label::after {
  box-sizing: content-box;
  content: "";
  position: absolute;
  top: 11px;
  left: 9px;
  width: 18px;
  height: 7px;
  transform: rotate(-45deg);
  border: solid;
  border-width: 0 0 5px 5px;
  border-top-color: transparent;
  opacity: 0;
  background: transparent;
}
.custom-checkbox > input[type="checkbox"]:checked + label::after {
  opacity: 1;
}
@media only screen and (min-width: 40rem) {
  label,
  input,
  .custom-checkbox {
    font-size: 19px;
    font-size: 1.9rem;
    line-height: 1.31579;
  }
}
</style>


    font-size: 1.9rem;