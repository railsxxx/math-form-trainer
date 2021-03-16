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
    editItem(mathId, obj) {
      const itemToEdit = this.MathItems.find((item) => item.id === mathId);
      itemToEdit.rule = obj.rule;
      this.addItem(obj.math);
    },
  },
};
function setLast(itemList) {
  let lastIndex = itemList.length - 1;
  if (lastIndex >= 0) itemList[lastIndex].last = true;
  if (lastIndex > 0) itemList[lastIndex - 1].last = false;
}
</script>
 