let MQ = window.MQ;

export function initRules(arrRules) {
  let arrInit = [];
  arrRules.forEach((item) => {
    if (item.vars) item = compressRule(item);
    arrInit.push(item);
  });
  return arrInit;
}
export function addFrontRule(initRule, arrRules) {
  let arrInit = [];
  if (initRule && initRule.vars) {
    initRule = compressRule(initRule);
    arrInit.push(initRule);
  }
  return arrInit.concat(arrRules);
}
function compressRule(rule) {
  // rule.left = rule.left.replace(/\s+/g, "");
  // rule.right = rule.right.replace(/\s+/g, "");
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
// export function fillRule(selectedRule) {
//   console.log("fillRule: ", JSON.stringify(selectedRule));
//   let filled = {};
//   filled.left = selectedRule.left;
//   filled.right = selectedRule.right;
//   let rx;
//   let vars$ = {};
//   let v1 = "";
//   for (let v of selectedRule.vars) {
//     v1 = "ö" + v;
//     //v$ = v;
//     vars$[v1] = selectedRule[v];
//     rx = new RegExp(v, "g");
//     filled.left = filled.left.replace(rx, v1); // replace v with v1
//     filled.right = filled.right.replace(rx, v1);
//   }
//   for (let v1 in vars$) {
//     // console.log("fillRule: ", v, ":", vars$[v]);
//     rx = new RegExp(v1, "g");
//     filled.left = filled.left.replace(rx, vars$[v1]); // replace v1 with value of v
//     filled.right = filled.right.replace(rx, vars$[v1]);
//   }
//   console.log("fillRule: filled: ", filled);
//   selectedRule.filled = filled;
//   return selectedRule;
// }
// export function matchRule(math, ruleFilled) {
//   console.log("matchRule: math:", math);
//   console.log("matchRule: rule:", ruleFilled);
//   if (!ruleFilled.left || !ruleFilled.right) return;
//   const newMath = math.replace(ruleFilled.left, ruleFilled.right);
//   if (newMath === math) return "";
//   else return newMath;
// }
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
}
export function matchRule(math, ruleFilled) {
  // console.log("matchRule: math:", math);
  // console.log("matchRule: rule:", ruleFilled);
  if (!ruleFilled.left || !ruleFilled.right) return;
  return match0(math, ruleFilled.left, ruleFilled.right);
  // return replacePos(math, ruleFilled.left, ruleFilled.right);
  // return replacePos("4\\cdot 5 + 4d + b\\cdot 5 + b\\cdot d", "\\cdot ", "",17);
}
function match0(string, pattern, conclusion) {
  // console.log("string: ", string);
  // console.log("pattern: ", pattern);
  // console.log("conclusion: ", conclusion);
  let result = replacePos(string, pattern, conclusion); // find pattern and replace by conclusion
  // console.log("match0: result: ", result);
  if (result.strResult !== string) {
    // match success
    return result.strResult;
  } else if (result.posSearchFailMax) {
    // remove cdot from pattern and retry match
    let maxPos = result.posSearchFailMax;
    const maxPosChar = result.posSearchFailChar;
    // console.log("maxPos: ", maxPos, ", maxPosChar: ", maxPosChar);
    let cdotPat = "\\cdot ";
    switch (maxPosChar) {
      case "c":
        maxPos -= 1;
        cdotPat = "\\cdot";
        break;
      default:
    }
    // console.log("maxPos adjusted: ", maxPos);
    result = replacePos(pattern, cdotPat, "", maxPos); // remove cdot from pattern at maxPos
    const newpattern = result.strResult;
    // console.log("newpattern: ", newpattern);
    if (newpattern !== pattern) {
      return match0(string, newpattern, conclusion); // recurse with modified pattern
    } else {
      // no match
      return "";
    }
  } else {
    // no match
    return "";
  }
}
/**
 * returns new string with either strInput having all strSearch replaced by strReplace,
 * or empty string and strSearch first position of missmath to strInput
 */
function replacePos(strInput, strSearch, strReplace, startPosInput = 0) {
  // console.log("strInput: ", strInput);
  // console.log("strSearch: ", strSearch);
  // console.log("strReplace: ", strReplace);

  let indexInput = 0,
    indexSearch = 0;
  let charInput = "";
  let matched = false;
  let result = [];
  let posFail = [];

  // init result
  while (indexInput < startPosInput) {
    result.push(advanceInput());
  }
  // find match
  while (!eOfInput()) {
    charInput = advanceInput();
    if (!matched && match()) {
      // first match only
      result = result.concat(strReplace.split(""));
      matched = true;
    } else {
      result.push(charInput);
    }
  }
  // return object with replace and fail information
  if (matched) {
    return { strResult: result.join("") };
  } else {
    const max = Math.max(...posFail.map((o) => o.posSearch), 0);
    return {
      strResult: result.join(""),
      posSearchFailMax: max,
      posSearchFailChar: strSearch.charAt(max)
    };
  }
  function match() {
    let indexInputStart = indexInput;
    let charInputStart = charInput;
    let charSearch = advanceSearch();
    if (charInput !== charSearch) {
      indexSearch = 0;
      return false;
    } else {
      while (!eOfSearch()) {
        charSearch = advanceSearch();
        if (!eOfInput()) {
          charInput = advanceInput();
        } else {
          indexInput = indexInputStart;
          charInput = charInputStart;
          return false;
        }
        // console.log(
        //   "indexInput: ",
        //   indexInput,
        //   ", charInput: ",
        //   charInput,
        //   ", charSearch: ",
        //   charSearch,
        //   ", indexSearch: ",
        //   indexSearch
        // );
        if (charInput !== charSearch) {
          posFail.push({
            posInput: indexInput - 1,
            posSearch: indexSearch - 1
          });
          indexInput = indexInputStart;
          charInput = charInputStart;
          indexSearch = 0;
          return false;
        }
      }
      return true;
    }
  }
  function eOfInput() {
    if (indexInput < strInput.length) return false;
    return true;
  }
  function advanceInput() {
    indexInput++;
    return strInput.charAt(indexInput - 1);
  }
  function eOfSearch() {
    if (indexSearch < strSearch.length) return false;
    return true;
  }
  function advanceSearch() {
    indexSearch++;
    return strSearch.charAt(indexSearch - 1);
  }
}
export function fillRule(selectedRule) {
  let filled = {};
  filled.left = selectedRule.left;
  filled.right = selectedRule.right;

  let rx;
  let latexCmds = {};
  replaceLatexCmds();
  // console.log("fillRule: filled replace: ", filled);

  let vars$ = {};
  let v1 = "";
  for (let v of selectedRule.vars) {
    v1 = "ö" + v;
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
  restoreLatexCmds();
  // console.log("fillRule: filled restore: ", filled);
  // skip space follwed by non-char, (e.g. after cdot char)
  filled.left = filled.left.replace(/\s(?![a-z,A-Z])/g, "");
  filled.right = filled.right.replace(/\s(?![a-z,A-Z])/g, "");
  console.log("fillRule: filled cdot space skipped: ", filled);
  // store filled in selectedRule
  selectedRule.filled = filled;
  return selectedRule;
  // helper -----------------------------------------------------------
  function replaceLatexCmds() {
    // extract latex commands from rule
    const patt1 = /\\[a-z]+/g;
    latexCmds.left = filled.left.match(patt1) || [];
    latexCmds.left = latexCmds.left.map((item) => item.match(/[a-z]+/));
    latexCmds.right = filled.right.match(patt1) || [];
    latexCmds.right = latexCmds.right.map((item) => item.match(/[a-z]+/));
    // console.log("fillRule: latexCmds: ", latexCmds);
    // replace latexCmds
    filled.left = replace(filled.left, latexCmds.left);
    filled.right = replace(filled.right, latexCmds.right);
    // helper -----------------------------------------------------------
    function replace(arr, arrCmds) {
      // replace latexCmds[i] with öi
      for (let i = 0; i < arrCmds.length; i++) {
        rx = new RegExp(arrCmds[i], "g");
        arr = arr.replace(rx, "ö" + i);
      }
      return arr;
    }
  }
  function restoreLatexCmds() {
    filled.left = restore(filled.left, latexCmds.left);
    filled.right = restore(filled.right, latexCmds.right);
    // helper -----------------------------------------------------------
    function restore(arr, arrCmds) {
      // restore latexCmds[i] for öi
      for (let i = 0; i < arrCmds.length; i++) {
        rx = new RegExp("ö" + i, "g");
        arr = arr.replace(rx, arrCmds[i]);
      }
      return arr;
    }
  }
}
