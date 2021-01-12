import { createApp, ref } from "vue";
import App from "./App.vue";
import "./assets/reset.css";

import { focusMQ } from "./assets/lib.js";
import locale from "./assets/locales/deutsch.json";

const app = createApp(App);

app.config.globalProperties.gClipboard = "clip";
app.config.globalProperties.gFocusMQref = ref({});
app.config.globalProperties.gFocusMQobj = focusMQ();
app.config.globalProperties.gLocale = locale;

app.mount("#app");
