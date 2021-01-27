import { createApp, ref } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/reset.css";

// import { focusMQ } from "./assets/lib.js";
import locale from "./assets/locales/deutsch.json";

// const app = createApp(App);
const app = createApp(App).use(router);

app.config.globalProperties.gClipboard = "clip";
app.config.globalProperties.gFocusMQref = ref({});
// app.config.globalProperties.gFocusMQobj = focusMQ();
// app.config.globalProperties.gForceRerender = 0;
app.config.globalProperties.gLocale = locale;

app.mount("#app");
