export function createMQEditField(elID, onEdit, onEnter) {
  let MQ = window.MQ;
  const editEl = document.getElementById(elID);
  const editField = MQ.MathField(editEl, {
    spaceBehavesLikeTab: true,
    supSubsRequireOperand: true,
    substituteTextarea: function () {
      return document.createElement("SPAN");
    },
    handlers: {
      edit: function (mathField) {
        // retrieve, in LaTeX format, the math that was typed:
        onEdit(mathField.latex());
      },
      enter: function () {
        // console.log("MQ: enter:");
        onEnter();
      }
    }
  });
  return editField;
}
