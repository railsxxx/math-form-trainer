let MQ = window.MQ;

export function initRules(arrRules, initRule) {
  let arrInit = [];
  if (initRule && initRule.vars) {
    initRule = compressRule(initRule);
    arrInit.push(initRule);
  }
  arrRules.forEach((item) => {
    if (item.vars) item = compressRule(item);
    arrInit.push(item);
  });
  return arrInit;
}
// export function initRulesArr(arrRules) {
//   let arrInit = [];
//   arrRules.forEach((item) => {
//     if (item.vars) item = compressRule(item);
//     arrInit.push(item);
//   });
//   return arrInit;
// }
function compressRule(rule) {
  rule.left = rule.left.replace(/\s+/g, "");
  rule.right = rule.right.replace(/\s+/g, "");
  return rule;
}
// function compressRules(arrRules) {
//   arrRules.forEach((item, index, arr) => {
//     arr[index].left = item.left.replace(/\s+/g, "");
//     arr[index].right = item.right.replace(/\s+/g, "");
//   });
//   return arrRules;
// }
export function isAllVarsFilled(selectedRule) {
  for (let v of selectedRule.vars) {
    if (!selectedRule[v]) return false;
  }
  return true;
}
export function fillRule(selectedRule) {
  //console.log("fillRule: ", selectedRule);
  let filled = {};
  filled.left = selectedRule.left;
  filled.right = selectedRule.right;
  let rx;
  let vars$ = {};
  let v1 = "";
  for (let v of selectedRule.vars) {
    v1 = "ö" + v;
    //v$ = v;
    vars$[v1] = selectedRule[v];
    rx = new RegExp(v, "g");
    filled.left = filled.left.replace(rx, v1); // replace v with v1
    filled.right = filled.right.replace(rx, v1);
  }
  for (let v1 in vars$) {
    // console.log("fillRule: ", v, ":", vars$[v]);
    rx = new RegExp(v1, "g");
    filled.left = filled.left.replace(rx, vars$[v1]); // replace v1 with value of v
    filled.right = filled.right.replace(rx, vars$[v1]);
  }
  // console.log("fillRule: filled: ", filled);
  selectedRule.filled = filled;
  return selectedRule;
}
// export function fillRule(selectedRule) {
//   //console.log("fillRule: ", selectedRule);
//   let filled = {};
//   filled.left = selectedRule.left;
//   filled.right = selectedRule.right;
//   let rx;
//   for (let v of selectedRule.vars) {
//     console.log("fillRule: ", v, ":", selectedRule[v]);
//     rx = new RegExp(v, "g");
//     filled.left = filled.left.replace(rx, selectedRule[v]); // replace v$ with value of v
//     filled.right = filled.right.replace(rx, selectedRule[v]);
//   }
//   console.log("fillRule: filled: ", filled);
//   selectedRule.filled = filled;
//   return selectedRule;
// }
export function matchRule(math, ruleFilled) {
  //console.log("matchRule: rule:", ruleFilled);
  if (!ruleFilled.left || !ruleFilled.right) return;
  const newMath = math.replace(ruleFilled.left, ruleFilled.right);
  if (newMath === math) return "";
  else return newMath;
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
export function showRuleName(rule, locale) {
  return rule.name ? (locale[rule.name] ? locale[rule.name] : rule.name) : "";
}
export function showRule(rule) {
  return rule.filled
    ? rule.filled.left + " \\<space> &rArr; \\<space> " + rule.filled.right
    : rule.left
    ? rule.left + " \\<space> &rArr; \\<space> " + rule.right
    : "";
}
export function stringifyRule(rule) {
  const sortedObj = {};
  const arrKeys = Object.keys(rule);
  if (arrKeys.length === 1 && arrKeys[0] === "name")
    sortedObj["name"] = rule["name"];
  else {
    if (arrKeys.includes("left")) sortedObj["left"] = rule["left"];
    if (arrKeys.includes("right")) sortedObj["right"] = rule["right"];
    if (arrKeys.includes("vars")) sortedObj["vars"] = rule["vars"];
    if (arrKeys.includes("swap")) sortedObj["swap"] = rule["swap"];
    if (arrKeys.includes("name")) sortedObj["name"] = rule["name"];
  }
  return JSON.stringify(sortedObj);

  // if (arr.length === 1 && arr[0] === "name")
  //   return '"{name":"' + rule.name + '"}';
  // if (arr.length > 1 && arr.includes("left"))
  //   return (
  //     "{" +
  //     (rule.left ? '"left":"' + rule.left + '"' : "") +
  //     (rule.right ? ',"right":"' + rule.right + '"' : "") +
  //     (rule.vars ? ',"vars":[' + rule.vars.map(stringifyVar) + "]" : "") +
  //     (rule.swap ? ',"swap":"true"' : "") +
  //     (rule.name ? ',"name":"' + rule.name + '"' : "") +
  //     "}"
  //   );
  // return "{}";
}
// function stringifyVar(v) {
//   return '"' + v + '"';
// }
