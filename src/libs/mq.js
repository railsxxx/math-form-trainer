let MQ = window.MQ;

export function createMQEditField(elID, onEdit, onEnter) {
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
export function isMQEditField(id) {
  return id instanceof MQ.EditableField;
}

export function createMQStaticField(elID) {
  const staticEl = document.getElementById(elID);
  const staticField = MQ.StaticMath(staticEl);
  return staticField;
}

export function mqifyRules(rules, isSelected) {
  if (isSelected) {
    MQ.StaticMath(document.getElementById("selectedRule"));
  } else {
    let ruleId = "";
    rules.forEach((item, index) => {
      if (item.vars) {
        ruleId = "rule_" + index;
        MQ.StaticMath(document.getElementById(ruleId));
      }
    });
  }
}
