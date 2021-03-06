import evaluatex from "./evaluatexExtended/evaluatex.js";
import Node from "./evaluatexExtended/Node.js";

// let MQ = window.MQ;

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
export function isAllVarsFilled(selectedRule) {
  for (let v of selectedRule.vars) {
    if (!selectedRule[v]) return false;
    if (selectedRule[v].value === "") return false;
  }
  return true;
}
// export function mqifyRules(rules, isSelected) {
//   if (isSelected) {
//     MQ.StaticMath(document.getElementById("selectedRule"));
//   } else {
//     let ruleId = "";
//     rules.forEach((item, index) => {
//       if (item.vars) {
//         ruleId = "rule_" + index;
//         MQ.StaticMath(document.getElementById(ruleId));
//       }
//     });
//   }
// }
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
  return rule.matched
    ? rule.matched.left + " \\<space> &rArr; \\<space> " + rule.matched.right
    : rule.left
    ? rule.left + " \\<space> &rArr; \\<space> " + rule.right
    : "";
}
export function showRuleNoMatch(rule) {
  return rule.left
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

export function matchRule(math, selectedRule) {
  // console.log("matchRule: math: ", math);
  // console.log("matchRule: selectedRule: ", selectedRule);
  const mathAst = evaluatex(math, {}, { latex: true }).ast;
  const leftAst = evaluatex(selectedRule.left, {}, { latex: true }).ast;
  const rightAst = evaluatex(selectedRule.right, {}, { latex: true }).ast;
  // console.log("matchRule: before: mathAst: ", mathAst.printTree());
  // convert bindings in selectedRule to ast nodes
  const prebindings = {};
  for (let v of selectedRule.vars) {
    // console.log("v: ", v, ", selectedRule[v]: ", selectedRule[v]);
    if (selectedRule[v] !== undefined) {
      prebindings[v] = evaluatex(selectedRule[v], {}, { latex: true }).ast;
      // update selectedRule with latex for vars
      selectedRule[v] = prebindings[v].toLaTeX();
    }
  }
  // console.log("matchRule: prebindings: ", prebindings);
  // compute newMath
  const outbindings = [];
  if (!match_bind(mathAst, leftAst, prebindings, outbindings, -1)) {
    // no match
    return { match: 0, math: math };
  } else if (outbindings.length > 1) {
    // more than 1 match
    // console.log("matchRule: after: outbindings: ", outbindings);
    return { match: outbindings.length, math: math };
  } else {
    // only 1 match
    unify(rightAst, outbindings[0]);
    replace(mathAst, leftAst, rightAst, outbindings[0]);
    unify(leftAst, outbindings[0]);
    // console.log("matchRule: after: outbindings: ", outbindings);
    // console.log("matchRule: after: mathAst: ", mathAst.printTree());
    // console.log("matchRule: after: leftAst: ", leftAst.printTree());
    // console.log("matchRule: after: rightAst: ", rightAst.printTree());
    // map return values
    let matched = {};
    matched.left = leftAst.toLaTeX();
    matched.right = rightAst.toLaTeX();
    selectedRule.matched = matched;
    // rewrite math to newMath
    const newMath = evaluatex(
      mathAst.toLaTeX(),
      {},
      { latex: true }
    ).ast.toLaTeX();
    // const newMath = mathAst.toLaTeX();
    // console.log("matchRule: newMath: ", newMath);
    return { match: 1, math: newMath };
  }
}

/**
 * @param: count: number of matches: 1 default, < 0 all matches
 **/
function match_bind(
  astNode,
  patNode,
  inbindings = {},
  outbindings = [],
  count = 5
) {
  console.log("match_bind: inbindings: ", inbindings);
  // init bindings
  let bindings = {};
  // init iterators
  const astNodeIter = astNode.iterator();
  const patNodeIter = patNode.iterator();
  // run matches with no inbindings
  while (match_bind_aux(astNodeIter.next(), patNodeIter.next())) {
    // match complete
    // save bindings into outbindings
    const outbind = {};
    insertBindings(bindings, outbind);
    outbindings.push(outbind);
    // check count
    count--;
    console.log("match_bind: count: ", count);
    if (count === 0) break;
    // restart match
    resetMatch();
  }
  // seledt matches by inbindings
  match_select(inbindings, outbindings);
  console.log("match_bind: outbindings: ", outbindings);
  // no more natches, either end of ast or end of count
  return outbindings.length > 0;

  function match_select(inbindings, outbindings) {
    // no inbindings
    if (Object.keys(inbindings).length === 0) return;
    // copy outbinding to new array temp
    const temp = outbindings.slice(0);
    // clear outbindings
    outbindings.splice(0, outbindings.length);
    // copy outbindings matching inbindings
    // console.log("match_select: inbindings: ", inbindings);
    // console.log("match_select: temp: ", temp);
    let match;
    for (let bind of temp) {
      match = true;
      for (let key in inbindings) {
        if (bind[key] !== undefined) {
          // key exists in outbindings,
          // must be the same as in inbindings or match fails
          if (
            bind[key].type !== inbindings[key].type ||
            bind[key].value !== inbindings[key].value
          )
            match = false;
        }
        // complete outbindings
        else bind[key] = inbindings[key];
      }
      if (match) outbindings.push(bind);
    }
    // console.log("match_select: outbindings: ", outbindings);
  }

  function match_bind_aux(astNode, patNode) {
    // console.log("match_bind_aux astNode: ", astNode.toString(), ", patNode: ", patNode.toString(), ", bindings: ", bindings);
    // matchComplete
    if (patNode.type === Node.TYPE_EOS) {
      console.log("Match Complete!");
      return true;
    }
    // End of ast
    if (astNode.type === Node.TYPE_EOS) {
      console.log("End of ast");
      return false;
    }
    // match type
    if (astNode.type === patNode.type) {
      // same type
      // store start node of match to bindings.start
      if (bindings.start === undefined) bindings.start = astNode.id;
      // track match in bindings
      bindings[patNode.id] = astNode.id;
      // check equal types
      let countDiff;
      switch (astNode.type) {
        case Node.TYPE_NUMBER:
          if (astNode.value !== patNode.value) {
            // values do not match, match fails,
            resetMatch();
          }
          // return match_bind_aux(astNodeIter.next(), patNodeIter.next());
          break;
        case Node.TYPE_SYMBOL:
          if (bindings[patNode.value]) {
            // binding with this key already exists
            if (bindings[patNode.value].value !== astNode.value) {
              // values do not match, match fails,
              resetMatch();
            }
          } else {
            // binding with this key does not exists
            // set binding and match ok
            bindings[patNode.value] = astNode;
          }
          // return match_bind_aux(astNodeIter.next(), patNodeIter.next());
          break;
        case Node.TYPE_SUM:
        case Node.TYPE_PRODUCT:
          countDiff = astNode.childrenCount - patNode.childrenCount;
          if (astNode.childrenCount > 2 && countDiff > 0) {
            // more children in astNode than in patNode, check additional matches
            let astNext = astNodeIter.next();
            const patNext = patNodeIter.next();
            const bind = {};
            insertBindings(bindings, bind);
            for (let i = 0; i <= countDiff; i++) {
              // skip first child of astNode
              // restart with next children of astNode
              astNext = astNodeIter.leap();
              if (match_bind_aux(astNext, patNext)) {
                // save bindigs in global outbindings
                outbindings.push(bindings);
                // console.log("more children: outbindings: ", outbindings)
              }
              // reset iter to astNext and patNext
              astNodeIter.restartAt(astNext.id);
              patNodeIter.restartAt(patNext.id);
              // reset bindings
              bindings = {};
              insertBindings(bind, bindings);
            }
            // reset to astNode and patNode and contunue as usual using first child
            astNodeIter.restartAt(astNode.id);
            patNodeIter.restartAt(patNode.id);
            // return match_bind_aux(astNodeIter.next(), patNodeIter.next());
          } else {
            // return match_bind_aux(astNodeIter.next(), patNodeIter.next());
          }
          break;
        default:
          break;
      }
      return match_bind_aux(astNodeIter.next(), patNodeIter.next());
    } else if (patNode.type === Node.TYPE_SYMBOL) {
      // different types and patNode is symbol
      // bind patNode symbol to astNode and all its children
      if (bindings[patNode.value] !== undefined) {
        // binding for patNode already exists
        // console.log("differnt but symbol: bindings exist: ", bindings, "\n astNode: ", astNode);
        // start new match from this astnode and binding
        const bindMatch = match_strict(astNode, bindings[patNode.value]);
        // console.log("differnt but symbol: bindings exist: bindMatch: ", bindMatch);
        if (bindMatch === false) {
          // values do not match, match fails,
          resetMatch();
        } else {
          // track match in bindings
          if (bindings.start === undefined) bindings.start = astNode.id;
          bindings[patNode.id] = astNode.id;
        }
        // console.log("match_bind_aux: differnt but symbol: bindings exist: astNodeIter.stack(): ", astNodeIter.stack());
        return match_bind_aux(astNodeIter.leap(), patNodeIter.next());
      } else {
        // no binding for patNode
        // set binding and match ok
        bindings[patNode.value] = astNode;
        // track match in bindings
        if (bindings.start === undefined) bindings.start = astNode.id;
        bindings[patNode.id] = astNode.id;
        // leap to next astNode
        return match_bind_aux(astNodeIter.leap(), patNodeIter.next());
      }
    } else {
      // different types, match fails
      resetMatch();
      return match_bind_aux(astNodeIter.next(), patNodeIter.next());
    }
  }
  function match_strict(astNode, patNode) {
    const astNodeIter = astNode.iterator();
    const patNodeIter = patNode.iterator();
    return match_strict_aux(astNodeIter.next(), patNodeIter.next());

    function match_strict_aux(astNode, patNode) {
      // console.log("match_strict_aux astNode: ", astNode.toString(), ", patNode: ", patNode.toString());
      if (patNode.type === Node.TYPE_EOS) return true;
      if (astNode.type === Node.TYPE_EOS) return false;
      if (astNode.type === patNode.type) {
        // console.log("match_strict_aux:sameType: astNode.value: ", astNode.value, ", patNode.value: ", patNode.value);
        if (
          astNode.type === Node.TYPE_NUMBER &&
          astNode.value !== patNode.value
        )
          return false;
        if (
          astNode.type === Node.TYPE_SYMBOL &&
          astNode.value !== patNode.value
        )
          return false;
        return match_strict_aux(astNodeIter.next(), patNodeIter.next());
      }
      // console.log("match_strict_aux:return last: false");
      return false;
    }
  }
  function resetMatch() {
    // rewind astNode, reinit patNode and clear bindings
    if (bindings.start !== undefined) {
      // console.log("resetMatch: bindings.start: ", bindings.start);
      // console.log("resetMatch: astNodeIter.stack(): ", astNodeIter.stack());
      astNodeIter.restartAt(bindings.start);
    } else {
      // continue astNode
    }
    patNodeIter.reinit();
    // clear bindings
    bindings = {};
  }
  function insertBindings(newBind, oldBind) {
    // console.log("before oldBind: ", oldBind, ", newBind: ", newBind);
    for (let key in newBind) {
      // binding with this key already exists and has different values
      if (oldBind[key] && oldBind[key] !== newBind[key]) {
        // do not touch oldBind
        return false;
      }
    }
    for (let key in newBind) {
      // update oldBind wirh newBind
      oldBind[key] = newBind[key];
    }
    // console.log("after oldBind: ", oldBind, ", newBind: ", newBind);
    return true;
  }
}

function unify(rightAst, bindings) {
  const rightAstIter = rightAst.iterator();
  let rightAstNode = rightAstIter.next();
  let success = false;
  // run down rightAst
  while (rightAstNode.type !== Node.TYPE_EOS) {
    success = false;
    // console.log("unify: rightAstNode: ", rightAstNode);
    // console.log("unify: nodeStack: ", rightAstIter.stack());
    // if symbol node
    if (rightAstNode.type === Node.TYPE_SYMBOL) {
      // if binding for symbol
      if (bindings[rightAstNode.value] !== undefined)
        // replace symbol node with binding node
        // [success, newRightAst] = rightAstIter.replace(rightAstNode, bindings[rightAstNode.value]);
        success = rightAstIter.replace(
          rightAstNode,
          bindings[rightAstNode.value]
        );
    }
    if (success)
      // leap over replaced binding node
      rightAstNode = rightAstIter.leap();
    // check next node
    else rightAstNode = rightAstIter.next();
  }
}

function replace(exprAst, leftAst, rightAst, bindings) {
  const exprAstIter = exprAst.iterator();
  let exprAstNode = exprAstIter.next();
  let success = false;

  while (exprAstNode.type !== Node.TYPE_EOS) {
    // go to matching node in exprAst
    if (exprAstNode.id === bindings[leftAst.id]) {
      // console.log("rulejs: replace before: exprAstNode: ", exprAstNode.printTree());
      if (exprAstNode.children.length === leftAst.children.length) {
        // matching nodes have same children
        // replace rightAst in exprAst
        success = exprAstIter.replace(exprAstNode, rightAst);
        break;
      } else {
        // exprAst node has matching and unmatching children
        if (
          exprAstNode.type === Node.TYPE_SUM ||
          exprAstNode.type === Node.TYPE_PRODUCT
        ) {
          // replace matching children with rightAst and add unmatching children
          const newChildren = replaceMatchingChildren(
            exprAstNode.children,
            leftAst,
            rightAst,
            bindings
          );
          // console.log("rulejs: replace: newChildren: ", newChildren);
          // replace children of exprAst with newChildren
          success = exprAstIter.replaceChildren(exprAstNode, newChildren);
          // console.log("rulejs: replace after: exprAstNode: ", exprAstNode.printTree());
          break;
        }
      }
    }
    exprAstNode = exprAstIter.next();
  }
  if (!success) console.log("No replace !!!! ");

  return;

  function replaceMatchingChildren(children, leftAst, rightAst, bindings) {
    let newChildren = [];
    // get ids of matching children
    const ids = leftAst.children.map((child) =>
      bindings[child.id] ? bindings[child.id] : -1
    );
    // unmatching children are newChildren
    let pushedRight = false;
    for (let child of children) {
      if (ids.indexOf(child.id) === -1) newChildren.push(child);
      else if (!pushedRight) {
        // rightAst is newChildren
        newChildren.push(rightAst);
        pushedRight = true;
      }
    }
    // console.log("rulejs: replaceMatchingChildren: newChildren: ", newChildren);
    return newChildren;
  }
}
