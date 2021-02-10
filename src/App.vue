<template>
  <router-view />
  <math-keypad
    class="keypad"
    :mqmathfieldref:="this.gFocusMQref.value"
  ></math-keypad>
  <app-navigation class="nav"></app-navigation>
</template>

<script>
import AppNavigationVue from "./components/AppNavigation.vue";
import MathKeypadVue from "./components/MathKeypad.vue";

export default {
  name: "App",
  components: {
    AppNavigation: AppNavigationVue,
    MathKeypad: MathKeypadVue,
  },
};
</script>

<style>
/* Global styles */
* {
  box-sizing: border-box;
}
.editable {
  border: 1px solid gray;
  width: 100%;
  cursor: pointer;
}
.btn {
  padding: 0.8rem 1rem 0.7rem;
  border: 0.2rem solid #4d4d4d;
  cursor: pointer;
  text-transform: capitalize;
  text-align: center;
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

<style scoped>
.nav {
  padding-bottom: 24rem;
}
.keypad {
  position: fixed;
  bottom: 0px;
  width: 100%;
  max-width: 68rem;
  background: lightgray;
}
</style>