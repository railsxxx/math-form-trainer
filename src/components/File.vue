<template>
  <h1>{{ locale.fileTitle }}</h1>
  <p>
    {{ locale.fileEdit }}<br />
    {{ locale.fileSave }}<br />
    {{ locale.fileOpen }}<br />
    {{ locale.fileReset }}
  </p>
  <input type="file" class="file_select" id="myRules" @change="onOpen" />
  <div class="btn-group btn__top">
    <button
      type="button"
      class="btn btn__primary"
      @click="this.$router.push({ name: 'Editor' })"
    >
      {{ locale.fileEditButton }}
    </button>
    <button type="button" class="btn btn__primary" @click="onSave">
      {{ locale.fileSaveButton }}
    </button>
    <label for="myRules" class="btn btn__primary">{{ locale.open }}</label>
    <button type="button" class="btn" @click="onReset">
      {{ locale.fileResetButton }}
    </button>
  </div>
</template>

<script>
import { downloadRules } from "../libs/rule.js";
import rulesJSON from "../assets/rules.json";
import { initRules } from "../libs/rule.js";
export default {
  data() {
    return {
      locale: this.gLocale,
    };
  },
  methods: {
    onOpen() {
      // select and load local rules.json file
      const el = document.getElementById("myRules");
      if ("files" in el) {
        if (el.files[0].type === "application/json") {
          const loadOn = this.onLoad;
          const fr = new FileReader();
          fr.readAsText(el.files[0]);
          // fr.onload = function (e) {
          fr.onload = function () {
            try {
              // console.log(e.target.result, JSON.parse(fr.result));
              loadOn(initRules(JSON.parse(fr.result)), el.files[0].name);
            } catch (ex) {
              alert("ex when trying to parse json = " + ex);
            }
          };
        } else {
          alert("File: onOpen: file is no JSON!");
          return;
        }
      } else {
        alert("File: onOpen: No files found!");
        return;
      }
    },
    onLoad(loadedRules, fileName) {
      this.gRulesJSONref.value = loadedRules;
      alert("new rules loaded from file: " + fileName);
    },
    onSave() {
      // offer store of rules to file
      downloadRules(this.gRulesJSONref.value, "rules.json");
    },
    onReset() {
      // load rules from built in rules.json
      this.gRulesJSONref.value = initRules(rulesJSON);
    },
  },
};
</script>

<style scoped>
/* hide file_select element, access by its label element*/
.file_select {
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
}
</style>