<template>
  <math-header></math-header>
  <math-enter v-if="MathItems.length == 0" @newmath="newMath"></math-enter>
  <h2
    id="list-summary"
    ref="listSummary"
    tabindex="-1"
    v-if="MathItems.length > 0"
  >
    {{ listSummary }}
  </h2>
  <ul aria-labelledby="list-summary" class="stack-large">
    <li v-for="item in MathItems" :key="item.id">
      <math-item
        :id="item.id"
        :last="item.last"
        :math="item.label"
        :rule="item.rule"
        @itemedited="editItem(item.id, $event)"
        @itemdeleted="deleteItem(item.id)"
        @ruleapplied="addItem"
      ></math-item>
    </li>
  </ul>
  <math-keypad
    v-if="isTyping"
    :mqmathfieldref="MQMathField"
    :mqmathfield="gFocusMQobj.get()"
  ></math-keypad>
</template>

<script>
import MathHeaderVue from "./MathHeader.vue";
import MathItemVue from "./MathItem.vue";
import MathEnterVue from "./MathEnter.vue";
import MathKeypadVue from "./MathKeypad.vue";
import uniqueId from "lodash.uniqueid";
export default {
  components: {
    MathHeader: MathHeaderVue,
    MathItem: MathItemVue,
    MathEnter: MathEnterVue,
    MathKeypad: MathKeypadVue,
  },
  data() {
    return {
      MathItems: [],
    };
  },
  computed: {
    listSummary: function () {
      return `Schritt ${this.MathItems.length}`;
    },
    isTyping() {
      return Object.entries(this.gFocusMQref.value).length > 0;
    },
    MQMathField() {
      // console.log("computed gFocusMQobj.get(): ", this.gFocusMQobj.get());
      // console.log("computed gFocusMQref.value: ", this.gFocusMQref.value);
      return this.gFocusMQref.value;
    },
  },
  methods: {
    newMath: function (math) {
      this.MathItems = [];
      this.addItem(math);
    },
    addItem: function (math) {
      this.MathItems.push({
        id: uniqueId("item-"),
        label: math,
        rule: { left: "", right: "" },
      });
      setLast(this.MathItems);
    },
    updateDoneStatus: function (mathId) {
      const toDoToUpdate = this.MathItems.find((item) => item.id === mathId);
      toDoToUpdate.done = !toDoToUpdate.done;
    },
    deleteItem() {
      this.MathItems.pop();
      setLast(this.MathItems);
      this.$refs.listSummary.focus();
    },
    editItem(mathId, newRule) {
      const itemToEdit = this.MathItems.find((item) => item.id === mathId);
      itemToEdit.rule = newRule;
    },
  },
};
function setLast(itemList) {
  let lastIndex = itemList.length - 1;
  if (lastIndex >= 0) itemList[lastIndex].last = true;
  if (lastIndex > 0) itemList[lastIndex - 1].last = false;
}
</script>

<style>
/* Global styles */
.btn {
  padding: 0.8rem 1rem 0.7rem;
  border: 0.2rem solid #4d4d4d;
  cursor: pointer;
  text-transform: capitalize;
}
.btn__danger {
  color: #fff;
  background-color: #ca3c3c;
  border-color: #bd2130;
}
.btn__filter {
  border-color: lightgrey;
}
.btn__danger:focus {
  outline-color: #c82333;
}
.btn__primary {
  color: #fff;
  background-color: #000;
}
.btn-group {
  display: flex;
  justify-content: space-between;
}
.btn-group > * {
  flex: 1 1 auto;
}
.btn-group > * + * {
  margin-left: 0.8rem;
}
.label-wrapper {
  margin: 0;
  flex: 0 0 100%;
  text-align: center;
}
[class*="__lg"] {
  display: inline-block;
  width: 100%;
  font-size: 1.9rem;
}
[class*="__lg"]:not(:last-child) {
  margin-bottom: 0rem;
}
@media screen and (min-width: 620px) {
  [class*="__lg"] {
    font-size: 2.4rem;
  }
}
.visually-hidden {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
[class*="stack"] > * {
  margin-top: 0;
  margin-bottom: 0;
}
.stack-small > * + * {
  margin-top: 1.25rem;
}
.stack-large > * + * {
  margin-top: 2.5rem;
}
@media screen and (min-width: 550px) {
  .stack-small > * + * {
    margin-top: 1.4rem;
  }
  .stack-large > * + * {
    margin-top: 0;
  }
}
/* End global styles */
#app {
  background: #fff;
  margin: 2rem 0 4rem 0;
  padding: 1rem;
  padding-top: 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);
}
@media screen and (min-width: 550px) {
  #app {
    padding: 4rem;
  }
}
#app > * {
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
}
#app > form {
  max-width: 100%;
}
#app h1 {
  display: block;
  min-width: 100%;
  width: 100%;
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
}
</style>