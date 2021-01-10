<template>
  <br />
  <div class="btn-group">
    <span id="digit1" class="btn" @click="onWrite('1')"> 1 </span>
    <span id="digit2" class="btn" @click="onWrite('2')"> 2 </span>
    <span id="digit3" class="btn" @click="onWrite('3')"> 3 </span>
    <span id="digit4" class="btn" @click="onWrite('4')"> 4 </span>
    <span id="digit5" class="btn" @click="onWrite('5')"> 5 </span>
    <span id="digit6" class="btn" @click="onWrite('6')"> 6 </span>
    <span id="digit7" class="btn" @click="onWrite('7')"> 7 </span>
    <span id="digit8" class="btn" @click="onWrite('8')"> 8 </span>
    <span id="digit9" class="btn" @click="onWrite('9')"> 9 </span>
    <span id="digit0" class="btn" @click="onWrite('0')"> 0 </span>
  </div>
  <div class="btn-group">
    <span id="chara" class="btn" @click="onWrite('a')"> a </span>
    <span id="charb" class="btn" @click="onWrite('b')"> b </span>
    <span id="charc" class="btn" @click="onWrite('c')"> c </span>
    <span id="charm" class="btn" @click="onWrite('m')"> m </span>
    <span id="charn" class="btn" @click="onWrite('n')"> n </span>
    <span id="charx" class="btn" @click="onWrite('x')"> x </span>
    <span id="comma" class="btn" @click="onWrite(',')"> , </span>
  </div>
  <div class="btn-group">
    <span id="plus" class="btn" @click="onWrite('+')"> + </span>
    <span id="minus" class="btn" @click="onWrite('-')"> - </span>
    <span id="mult" class="btn" @click="onCmd('\\cdot')"> * </span>
    <span id="divide" class="btn" @click="onFrac()"> / </span>
    <span id="divide" class="btn" @click="onWrite('=')"> = </span>
    <span id="pm" class="btn" @click="onCmd('\\pm')"> &plusmn; </span>
    <span
      id="brackets()"
      class="btn"
      @click="
        onWrite('\\left(\\right)');
        onKey('Left');
      "
    >
      ( )
    </span>
    <span
      id="brackets[]"
      class="btn"
      @click="
        onWrite('\\left[\\right]');
        onKey('Left');
      "
    >
      [ ]
    </span>
  </div>
  <div class="btn-group">
    <span id="power2" class="btn" @click="onWrite('^{2}')">a^2</span>
    <span id="sqrt" class="btn" @click="onCmd('\\sqrt')">\sqrt{a}</span>
    <span
      id="powerN"
      class="btn"
      @click="
        onWrite('^{}');
        onKey('Left');
      "
      >a^n</span
    >
    <span
      id="sqrtN"
      class="btn"
      @click="
        onWrite('\\sqrt[]{}');
        onKey('Left Left');
      "
      >\sqrt[n]{a}</span
    >
  </div>
  <div class="btn-group">
    <span id="keyLeft" class="btn" @click="onKey('Left')"> &larr; </span>
    <span id="keyRight" class="btn" @click="onKey('Right')"> &rarr; </span>
    <span id="keyDelete" class="btn" @click="onDelete()"> DEL </span>
    <span id="keySelect" class="btn" @click="onKey('Shift-Left')"> SEL </span>
    <span id="keyCopy" class="btn" @click="onCopy()"> CPY </span>
    <span id="keyCopy" class="btn" @click="onCut()"> CUT </span>
    <span id="keyPaste" class="btn" @click="onPaste()"> PST </span>
  </div>
  <br />
</template>

<script>
const MQ = window.MQ;
export default {
  props: {
    mqmathfieldref: Object,
    mqmathfield: Object,
  },
  methods: {
    onCmd(latexCmd) {
      if (!this.mqmathfield || !(this.mqmathfield instanceof MQ.MathField))
        return;
      this.mqmathfield.cmd(latexCmd);
    },
    onWrite(latexWrite) {
      if (!this.mqmathfield || !(this.mqmathfield instanceof MQ.MathField))
        return;
      this.mqmathfield.write(latexWrite);
    },
    onKey(keyString) {
      if (!this.mqmathfield || !(this.mqmathfield instanceof MQ.MathField))
        return;
      this.mqmathfield.keystroke(keyString);
    },
    onFrac() {
      if (!this.mqmathfield || !(this.mqmathfield instanceof MQ.MathField))
        return;
      const sel = this.mqmathfield.__controller.textarea.val();
      if (!sel) this.mqmathfield.keystroke("Shift-Left");
      this.mqmathfield.cmd("\\frac");
    },
    onDelete() {
      if (!this.mqmathfield || !(this.mqmathfield instanceof MQ.MathField))
        return;
      const sel = this.mqmathfield.__controller.textarea.val();
      if (!sel) this.mqmathfield.keystroke("Shift-Left");
      this.mqmathfield.keystroke("Del");
    },
    onCopy() {
      if (!this.mqmathfield) return;
      const ctrlr = this.mqmathfield.__controller;
      const text = ctrlr.textarea.val();
      ctrlr.textarea.val("");
      if (text) {
        this.gClipboard = text;
      }
    },
    onCut() {
      if (!this.mqmathfield || !(this.mqmathfield instanceof MQ.MathField))
        return;
      const ctrlr = this.mqmathfield.__controller;
      const text = ctrlr.textarea.val();
      ctrlr.textarea.val("");
      if (text) {
        this.gClipboard = text;
        ctrlr.deleteForward();
      }
    },
    onPaste() {
      if (!this.mqmathfield || !(this.mqmathfield instanceof MQ.MathField))
        return;
      const ctrlr = this.mqmathfield.__controller;
      const text = this.gClipboard;
      if (text !== "") {
        ctrlr.paste(text);
      }
    },
  },
  mounted() {
    MQ.StaticMath(document.getElementById("power2"));
    MQ.StaticMath(document.getElementById("powerN"));
    MQ.StaticMath(document.getElementById("sqrt"));
    MQ.StaticMath(document.getElementById("sqrtN"));
  },
};
</script>
<style scoped>
</style>