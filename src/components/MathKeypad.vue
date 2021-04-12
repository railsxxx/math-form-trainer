<template>
  <div v-if="isTyping">
    <br />
    <div class="btn-group">
      <span id="enter" class="btn" @click="onEnter()"> Enter </span>
      <span id="cancel" class="btn" @click="onCancel()"> Cancel </span>
    </div>
    <div class="btn-group">
      <span id="digit1" class="key" @click="onWrite('1')"> 1 </span>
      <span id="digit2" class="key" @click="onWrite('2')"> 2 </span>
      <span id="digit3" class="key" @click="onWrite('3')"> 3 </span>
      <span id="digit4" class="key" @click="onWrite('4')"> 4 </span>
      <span id="digit5" class="key" @click="onWrite('5')"> 5 </span>
      <span id="digit6" class="key" @click="onWrite('6')"> 6 </span>
      <span id="digit7" class="key" @click="onWrite('7')"> 7 </span>
      <span id="digit8" class="key" @click="onWrite('8')"> 8 </span>
      <span id="digit9" class="key" @click="onWrite('9')"> 9 </span>
      <span id="digit0" class="key" @click="onWrite('0')"> 0 </span>
      <span id="digitPi" class="key" @click="onWrite('\\pi ')">
        &#x1D745;
      </span>
    </div>
    <div class="btn-group">
      <span id="chara" class="key" @click="onWrite('a')"> a </span>
      <span id="charb" class="key" @click="onWrite('b')"> b </span>
      <span id="charc" class="key" @click="onWrite('c')"> c </span>
      <span id="chard" class="key" @click="onWrite('d')"> d </span>
      <span id="chare" class="key" @click="onWrite('e')"> e </span>
      <span id="charf" class="key" @click="onWrite('f')"> f </span>
      <span id="charg" class="key" @click="onWrite('g')"> g </span>
      <span id="charh" class="key" @click="onWrite('h')"> h </span>
      <span id="charm" class="key" @click="onWrite('m')"> m </span>
      <span id="charn" class="key" @click="onWrite('n')"> n </span>
      <span id="charx" class="key" @click="onWrite('x')"> x </span>
      <span id="chary" class="key" @click="onWrite('y')"> y </span>
      <span id="charz" class="key" @click="onWrite('z')"> z </span>
      <span id="comma" class="key" @click="onWrite(',')"> , </span>
    </div>
    <div class="btn-group">
      <span id="plus" class="key" @click="onCmd('+')"> + </span>
      <span id="minus" class="key" @click="onCmd('-')"> - </span>
      <span id="mult" class="key" @click="onCmd('*')"> * </span>
      <span id="divide" class="key" @click="onCmd('/')"> / </span>
      <span id="equal" class="key" @click="onCmd('=')"> = </span>
      <span id="pm" class="key" @click="onCmd('\\pm')"> &plusmn; </span>
      <span
        id="brackets()"
        class="key"
        @click="
          onWrite('\\left(\\right)');
          onKey('Left');
        "
      >
        ( )
      </span>
      <span
        id="brackets[]"
        class="key"
        @click="
          onWrite('\\left[\\right]');
          onKey('Left');
        "
      >
        [ ]
      </span>
    </div>
    <div class="btn-group">
      <span id="power2" class="key" @click="onWrite('^{2}')">a^2</span>
      <span id="sqrt" class="key" @click="onCmd('\\sqrt')">\sqrt{a}</span>
      <span
        id="powerN"
        class="key"
        @click="
          onWrite('^{}');
          onKey('Left');
        "
        >a^n</span
      >
      <span
        id="sqrtN"
        class="key"
        @click="
          onWrite('\\sqrt[]{}');
          onKey('Left Left');
        "
        >\sqrt[n]{a}</span
      >
      <span id="fOfX" class="key" @click="onTypedText('f(x)')">f(x)</span>
      <span id="ePowerX" class="key" @click="onTypedText('e^x')">e^x</span>
      <span
        id="ln"
        class="key"
        @click="
          onCmd('\\ln');
          onWrite('\\left(\\right)');
          onKey('Left');
        "
        >\ln</span
      >
      <span
        id="sin"
        class="key"
        @click="
          onCmd('\\sin');
          onWrite('\\left(\\right)');
          onKey('Left');
        "
        >\sin</span
      >
      <span
        id="cos"
        class="key"
        @click="
          onCmd('\\cos');
          onWrite('\\left(\\right)');
          onKey('Left');
        "
        >\cos</span
      >
    </div>
    <div class="btn-group">
      <span id="keyLeft" class="key" @click="onKey('Left')"> &larr; </span>
      <span id="keyRight" class="key" @click="onKey('Right')"> &rarr; </span>
      <span id="keyDelete" class="key" @click="onDelete()"> DEL </span>
      <span id="keySelect" class="key" @click="onKey('Shift-Left')"> SEL </span>
      <span id="keyCopy" class="key" @click="onCopy()"> CPY </span>
      <span id="keyCopy" class="key" @click="onCut()"> CUT </span>
      <span id="keyPaste" class="key" @click="onPaste()"> PST </span>
    </div>
    <br />
  </div>
</template>

<script>
import { isMQEditField, createMQStaticField } from "../libs/mq.js";
// const MQ = window.MQ;
export default {
  props: {
    //mqmathfieldref: Object, //triggering update of Keypad
    // call from App.vue: :mqmathfieldref:="this.gFocusMQref.value"
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
      // if (refVal instanceof MQ.EditableField && Object.keys(refVal).length > 0)
      if (isMQEditField(refVal) && Object.keys(refVal).length > 0)
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
    onTypedText(text) {
      this.mqmathfield.typedText(text);
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
    // MQ.StaticMath(document.getElementById("power2"));
    // MQ.StaticMath(document.getElementById("powerN"));
    // MQ.StaticMath(document.getElementById("sqrt"));
    // MQ.StaticMath(document.getElementById("sqrtN"));
    // MQ.StaticMath(document.getElementById("fOfX"));
    // MQ.StaticMath(document.getElementById("ePowerX"));
    // MQ.StaticMath(document.getElementById("ln"));
    // MQ.StaticMath(document.getElementById("sin"));
    // MQ.StaticMath(document.getElementById("cos"));
    createMQStaticField("power2");
    createMQStaticField("powerN");
    createMQStaticField("sqrt");
    createMQStaticField("sqrtN");
    createMQStaticField("fOfX");
    createMQStaticField("ePowerX");
    createMQStaticField("ln");
    createMQStaticField("sin");
    createMQStaticField("cos");
    // console.log("keypad: updated ");
  },
};
</script>

<style scoped>
.key {
  padding: 0.8rem 1rem 0.7rem;
  border: 0.2rem solid #4d4d4d;
  cursor: pointer;
}
</style>