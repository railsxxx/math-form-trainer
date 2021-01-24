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
  <ul>
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
</template>

<script>
import MathHeaderVue from "./MathHeader.vue";
import MathItemVue from "./MathItem.vue";
import MathEnterVue from "./MathEnter.vue";
import uniqueId from "lodash.uniqueid";
export default {
  components: {
    MathHeader: MathHeaderVue,
    MathItem: MathItemVue,
    MathEnter: MathEnterVue,
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
        rule: {},
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
.editable {
  border: 1px solid gray;
  width: 100%;
}
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
.btn__danger:focus {
  outline-color: #c82333;
}
.btn__filter {
  border-color: lightgrey;
}
.btn__primary {
  color: #fff;
  background-color: #000;
}
.btn__top {
  margin-top: 1rem;
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
.isError {
  color: #c82333;
  margin-top: 1rem;
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
/* .stack-large > * + * {
  margin-top: 2.5rem;
}
@media screen and (min-width: 550px) {
  .stack-small > * + * {
    margin-top: 1.4rem;
  }
  .stack-large > * + * {
    margin-top: 0;
  }
} */
/* End global styles */
</style>