<template>
  <h1>{{ locale.title }}</h1>
  <p>{{ locale.subtitle }}</p>
  <p class="exp-top">{{ locale.example }}:</p>
  <div>
    <span class="exp-label">{{ locale.example1 }}:</span>
    <span class="exp-value">
      <span class="math" id="example1">(x-3)^2</span>
    </span>
  </div>
  <div>
    <span class="exp-label">{{ locale.example2 }}:</span>
    <span
      class="exp-value"
      id="example2"
      v-html="'(a-b)^2 \\<space> &rArr; \\<space> a^2-2ab+b^2'"
    ></span>
  </div>
  <div>
    <span class="exp-label">{{ locale.example3 }}:</span>
    <span
      class="exp-value"
      style="vertical-align: 0.3rem"
      id="example3"
      v-html="'a=x, \\<space> b=3'"
    ></span>
  </div>
  <div class="exp-bottom">
    <span class="exp-label">{{ locale.example4 }}:</span>
    <span class="exp-value">
      <span class="math" id="example4">x^2-2x3+3^2</span>
    </span>
  </div>
</template>

<script>
import { createMQStaticField } from "../libs/mq.js";
// let MQ = window.MQ;
export default {
  data() {
    return {
      locale: this.gLocale,
    };
  },
  mounted() {
    // MQ.StaticMath(document.getElementById("example1"));
    // MQ.StaticMath(document.getElementById("example2"));
    // MQ.StaticMath(document.getElementById("example3"));
    // MQ.StaticMath(document.getElementById("example4"));
    createMQStaticField("example1");
    createMQStaticField("example2");
    createMQStaticField("example3");
    createMQStaticField("example4");
  },
};
</script>

<style scoped>
.exp-top {
  margin-top: 1.2rem;
}
.exp-bottom {
  margin-bottom: 1.2rem;
}
.exp-label {
  display: inline-block;
  width: 20%;
  margin-top: 1rem;
  /* border: 1px solid gray; */
}
.exp-value {
  display: inline-block;
  width: 80%;
  vertical-align: 0.6rem;
  /* border: 1px solid gray; */
}
</style>
