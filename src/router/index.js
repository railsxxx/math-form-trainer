import { createWebHistory, createRouter } from "vue-router";
import MathList from "@/components/MathList.vue";
import RulEditor from "@/components/RuleEditor.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: MathList
  },
  {
    path: "/rules",
    name: "Rules",
    component: RulEditor
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
