import { createWebHistory, createRouter } from "vue-router";
import MathList from "@/components/MathList.vue";
import Editor from "@/components/Editor.vue";
import File from "@/components/File.vue";

const routes = [
  {
    path: "/",
    name: "Trainer",
    component: MathList
  },
  {
    path: "/editor",
    name: "Editor",
    component: Editor
  },
  {
    path: "/file",
    name: "File",
    component: File
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
