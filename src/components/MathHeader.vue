<template>
  <h1>{{ locale.title }}</h1>
  <p>{{ locale.subtitle }}</p>
  <br />
  <p>{{ locale.example }}:</p>
  <div>
    <span>{{ locale.example1 }}:</span>
    <span id="example1">(a-3)^2</span>
  </div>
  <div>
    <span>{{ locale.example2 }}:</span>
    <span id="example2">(a-b)^2&rArr;a^2-2ab+b^2</span>
  </div>
  <div>
    <span>{{ locale.example3 }}:</span>
    <span id="example3">b=3</span>
  </div>
  <div>
    <span>{{ locale.example4 }}:</span>
    <span id="example4">a^2-2a3+3^2</span>
  </div>
  <br />
</template>

<style scoped>
</style>

<script>
let MQ = window.MQ;
export default {
  data() {
    return {
      locale: this.gLocale,
    };
  },
  mounted() {
    MQ.StaticMath(document.getElementById("example1"));
    MQ.StaticMath(document.getElementById("example2"));
    MQ.StaticMath(document.getElementById("example3"));
    MQ.StaticMath(document.getElementById("example4"));
  },
};
</script>