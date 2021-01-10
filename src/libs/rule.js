let MQ = window.MQ;
export function addRule(newRule, arrRules) {
  let arrNew = [];
  arrNew.push(newRule);
  arrNew = arrRules.concat(arrNew);
  return arrNew;
}
export function initRules(initRule, arrRules) {
  let arrInit = [];
  if (initRule.vars) arrInit.push(initRule);
  arrInit = arrInit.concat(arrRules);
  return compressRules(arrInit);
}
function compressRules(arrRules) {
  arrRules.forEach((item, index, arr) => {
    arr[index].left = item.left.replace(/\s+/g, "");
    arr[index].right = item.right.replace(/\s+/g, "");
  });
  return arrRules;
}
export function fillRule(selectedRule) {
  //console.log("fillRule: ", selectedRule);
  let filled = {};
  filled.left = selectedRule.left;
  filled.right = selectedRule.right;
  let rx;
  for (let v of selectedRule.vars) {
    if (selectedRule[v]) {
      //console.log("fillRule: ", v, ":", selectedRule[v]);
      rx = new RegExp(v, "g");
      filled.left = filled.left.replace(rx, selectedRule[v]);
      filled.right = filled.right.replace(rx, selectedRule[v]);
    }
  }
  selectedRule.filled = filled;
  return selectedRule;
}
export function mqifyRules(rules, isSelected) {
  if (isSelected) {
    MQ.StaticMath(document.getElementById("selectedRule"));
  } else {
    let ruleId = "";
    for (let r = 0; r < rules.length; r++) {
      ruleId = "rule_" + r;
      MQ.StaticMath(document.getElementById(ruleId));
    }
  }
}
export function downloadRules(obj, filename) {
  const json = JSON.stringify(obj);
  const element = document.createElement("a");
  // element.setAttribute(
  //   "href",
  //   "data:application/json," + encodeURIComponent(json)
  // );
  // element.setAttribute("download", filename);
  element.href = "data:application/json," + encodeURIComponent(json);
  element.download = filename;
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
