<template>
  <div v-if="isTyping">
    <br />
    <div class="btn-group">
      <span id="enter" class="btn" @click="onEnter()"> Enter </span>
      <span id="cancel" class="btn" @click="onCancel()"> Cancel </span>
    </div>
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
      <span id="plus" class="btn" @click="onCmd('+')"> + </span>
      <span id="minus" class="btn" @click="onCmd('-')"> - </span>
      <span id="mult" class="btn" @click="onCmd('*')"> * </span>
      <span id="divide" class="btn" @click="onCmd('/')"> / </span>
      <span id="equal" class="btn" @click="onCmd('=')"> = </span>
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
  </div>
</template>

<script>
const MQ = window.MQ;
export default {
  props: {
    mqmathfieldref: Object, //triggering update of Keypad
  },
  data() {
    return {
      initContent: "",
    };
  },
  computed: {
    isTyping() {
      if (this.mqmathfield) return true;
      return false;
    },
    mqmathfield() {
      const refVal = this.gFocusMQref.value;
      if (refVal instanceof MQ.EditableField && Object.keys(refVal).length > 0)
        return refVal;
      return undefined;
    },
  },
  watch: {
    mqmathfield() {
      if (this.mqmathfield) this.initContent = this.mqmathfield.latex();
    },
  },
  methods: {
    onEnter() {
      // exit mqmathfield calling mqmathfield.options.handlers.enter
      this.mqmathfield.typedText("\n");
    },
    onCancel() {
      // console.log("Keypad: onCancel: initContent: ", this.initContent);
      // restore initContent in mqmathfield.latex
      this.mqmathfield.latex(this.initContent);
      this.onEnter();
    },
    onCmd(latexCmd) {
      this.mqmathfield.cmd(latexCmd);
      this.mqmathfield.focus();
    },
    onWrite(latexWrite) {
      this.mqmathfield.write(latexWrite);
      this.mqmathfield.focus();
    },
    onKey(keyString) {
      this.mqmathfield.keystroke(keyString);
      this.mqmathfield.focus();
    },
    onDelete() {
      const sel = this.mqmathfield.__controller.textarea.val();
      if (!sel) this.mqmathfield.keystroke("Shift-Left");
      this.mqmathfield.keystroke("Del");
      this.mqmathfield.focus();
    },
    onCopy() {
      if (!this.mqmathfield) return;
      const ctrlr = this.mqmathfield.__controller;
      const text = ctrlr.textarea.val();
      ctrlr.textarea.val("");
      if (text) {
        this.gClipboard = text;
      }
      this.mqmathfield.focus();
    },
    onCut() {
      const ctrlr = this.mqmathfield.__controller;
      const text = ctrlr.textarea.val();
      ctrlr.textarea.val("");
      if (text) {
        this.gClipboard = text;
        ctrlr.deleteForward();
      }
      this.mqmathfield.focus();
    },
    onPaste() {
      const ctrlr = this.mqmathfield.__controller;
      const text = this.gClipboard;
      if (text !== "") {
        ctrlr.paste(text);
      }
      this.mqmathfield.focus();
    },
  },
  mounted() {
    // console.log("keypad: mounted ");
  },
  updated() {
    MQ.StaticMath(document.getElementById("power2"));
    MQ.StaticMath(document.getElementById("powerN"));
    MQ.StaticMath(document.getElementById("sqrt"));
    MQ.StaticMath(document.getElementById("sqrtN"));
    // console.log("keypad: updated ");
  },
};
</script>

<style scoped>
</style>