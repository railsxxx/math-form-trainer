<template>
  <math-header></math-header>
  <math-enter
    v-if="mathItems.length == 0"
    :initMath="initMath"
    @newmath="newMath"
  ></math-enter>
  <h2 v-else id="list-summary" ref="listSummary" tabindex="-1">
    {{ listSummary }}
  </h2>
  <ul>
    <li v-for="item in mathItems" :key="item.id">
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
export default {
  components: {
    MathHeader: MathHeaderVue,
    MathItem: MathItemVue,
    MathEnter: MathEnterVue,
  },
  data() {
    return {
      initMath: localStorage.initMath ? localStorage.initMath : "(x-3)^2",
      mathItems: localStorage.mathItems
        ? JSON.parse(localStorage.mathItems)
        : [],
    };
  },
  computed: {
    listSummary: function () {
      return `Schritt ${this.mathItems.length}`;
    },
  },
  methods: {
    newMath: function (math) {
      // clear previous work
      this.mathItems = [];
      localStorage.mathItems = "";
      // start new work
      this.addItem(math);
      // permanently store newMath
      this.initMath = math;
      localStorage.initMath = math;
    },
    addItem: function (math) {
      this.mathItems.push({
        id: uniqueId("item-"),
        label: math,
        rule: {},
      });
      setLast(this.mathItems);
      // permanently store mathItems
      localStorage.mathItems = JSON.stringify(this.mathItems);
    },
    deleteItem() {
      this.mathItems.pop();
      setLast(this.mathItems);
      this.$refs.listSummary.focus();
      // permanently store mathItems
      localStorage.mathItems = JSON.stringify(this.mathItems);
    },
    editItem(mathId, obj) {
      const itemToEdit = this.mathItems.find((item) => item.id === mathId);
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
const uniqueId = (function () {
  let id = 1;
  return (str) => str + id++;
})();
</script>
 