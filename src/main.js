import { createApp, ref } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/reset.css";

import locale from "./assets/locales/deutsch.json";
import rulesJSON from "./assets/rules.json";

const app = createApp(App).use(router);

app.config.globalProperties.gRulesJSON = rulesJSON;
app.config.globalProperties.gClipboard = "clip";
app.config.globalProperties.gFocusMQref = ref({});
app.config.globalProperties.gLocale = locale;

app.mount("#app");
