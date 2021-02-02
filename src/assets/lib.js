// export function focusMQ() {
//   let MQ = window.MQ;
//   let mq = undefined;
//   return {
//     set: function (mqn) {
//       // console.log("clicked: ", mqn);
//       if (mq && mq instanceof MQ.MathField) mq.blur();
//       mq = mqn;
//     },
//     get: function () {
//       return mq;
//     },
//     clear: function () {
//       if (mq) mq.blur();
//       mq = undefined;
//     }
//   };
// }

export function createMQEditField(el, onEdit, onEnter) {
  let MQ = window.MQ;
  const editEl = document.getElementById(el);
  const editField = MQ.MathField(editEl, {
    spaceBehavesLikeTab: true,
    supSubsRequireOperand: true,
    substituteTextarea: function () {
      return document.createElement("SPAN");
    },
    handlers: {
      edit: function (mathField) {
        // retrieve, in LaTeX format, the math that was typed:
        const val = mathField.latex();
        onEdit(val);
      },
      enter: function () {
        // console.log("MQ: enter:");
        onEnter();
      }
    }
  });
  // console.log("mqfield running singleMQ: ", singleMQ);
  // console.log("mqfield running singleEl: ", singleEl);
  // console.log("mqfield running inputOn: ", inputOn);
  // console.log("mqfield running enterOn: ", enterOn);
  return editField;
}
