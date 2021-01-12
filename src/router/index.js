import { createWebHistory, createRouter } from "vue-router";
import MathList from "@/components/MathList.vue";
import RuleAdd from "@/components/RuleAdd.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: MathList
  },
  {
    path: "/rules",
    name: "Rules",
    component: RuleAdd
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
