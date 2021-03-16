/**
 * Node represents a node in an abstract syntax tree. Nodes have the following properties:
 *  - A type, which determines how it is evaluated;
 *  - A value, such as a number or function; and
 *  - An ordered list of children.
 */
export default class Node {
  constructor(type, value = "") {
    this.type = type;
    this.value = value;
    this.name = null; // Used in function and command nodes to retain the fn name when minified
    this.children = [];
    this.id = getID.next();
  }

  /**
   * Adds a node to the list of children and returns this Node.
   * @param node Child node to addChild.
   * @returns {Node} This node.
   */
  addChild(node) {
    this.children.push(node);
    return this;
  }
  /**
   * Returns this Node's first child.
   */
  get child() {
    return this.children[0];
  }
  /**
   * Returns number of children.
   */
  get childrenCount() {
    return this.children.length;
  }

  /**
   * Evaluates this Node and all child nodes recursively, returning the numerical result of this Node.
   */
  evaluate(vars) {
    let result = 0;

    switch (this.type) {
      case Node.TYPE_FUNCTION:
        const evaluatedChildren = this.children.map((childNode) =>
          childNode.evaluate(vars)
        );
        result = this.value.apply(this, evaluatedChildren);
        break;
      case Node.TYPE_INVERSE:
        result = 1.0 / this.child.evaluate(vars);
        break;
      case Node.TYPE_NEGATE:
        result = -this.child.evaluate(vars);
        break;
      case Node.TYPE_NUMBER:
        result = this.value;
        break;
      case Node.TYPE_POWER:
        result = Math.pow(
          this.children[0].evaluate(vars),
          this.children[1].evaluate(vars)
        );
        break;
      case Node.TYPE_PRODUCT:
        result = this.children.reduce(
          (product, child) => product * child.evaluate(vars),
          1
        );
        break;
      case Node.TYPE_SUM:
        result = this.children.reduce(
          (sum, child) => sum + child.evaluate(vars),
          0
        );
        break;
      case Node.TYPE_SYMBOL:
        if (isFinite(vars[this.value])) {
          return vars[this.value];
        }
        throw "Symbol " + this.value + " is undefined or not a number";
    }

    return result;
  }

  /**
   * Prints a tree-like representation of this Node and all child Nodes to the console.
   * Useful for debugging parser problems.
   * If printTree() is called on the root node, it prints the whole AST!
   * @param level (Integer, Optional) Initial level of indentation. You shouldn't need to use this.
   */
  printTree(level = 0) {
    // Generate the indent string from the current `level`.
    // Child nodes will have a greater `level` and will appear indented.
    let indent = "  ".repeat(level);

    let str = "\n" + indent + this.toString();
    // Print each child.
    for (let i in this.children) {
      str += this.children[i].printTree(level + 1);
    }
    return str;
  }

  toString() {
    const val = typeof this.value === "function" ? this.name : this.value;
    return `${this.children.length} ${this.type} [${val}]`;
  }

  toLaTeX() {
    let str = "";
    switch (this.type) {
      case Node.TYPE_NUMBER:
      case Node.TYPE_SYMBOL:
        str += this.value;
        break;
      case Node.TYPE_SUM:
        str += toLaTeXSum(this);
        break;
      case Node.TYPE_PRODUCT:
        str += toLaTeXProduct(this);
        break;
      case Node.TYPE_POWER:
        str += toLaTeXPower(this);
        break;
      // case Node.TYPE_INVERSE:
      //   str += "1/ " + this.child.toLaTeX();
      //   break;
      case Node.TYPE_NEGATE:
        str += toLaTeXNegate(this);
        break;
      case Node.TYPE_FUNCTION:
        str += toLaTeXFunction(this);
        break;
    }
    return str;

    function toLaTeXPower(node) {
      let str = "";
      for (let i in node.children) {
        if (i == 0) {
          str += checkChild(node.children[i]);
        } else {
          str += "^" + checkChild(node.children[i]);
        }
      }
      return str;

      function checkChild(child) {
        let str = "";
        if (
          child.type === Node.TYPE_NEGATE ||
          child.type === Node.TYPE_SUM ||
          child.type === Node.TYPE_PRODUCT ||
          child.type === Node.TYPE_POWER
        )
          str += "\\left(" + child.toLaTeX() + "\\right)";
        else {
          str += child.toLaTeX();
        }
        return str;
      }
    }
    function toLaTeXProduct(node) {
      let str = "";
      for (let i in node.children) {
        if (i == 0) {
          str += checkChild(node.children[i]);
        } else {
          str += "\\cdot " + checkChild(node.children[i]);
        }
      }
      return str;

      function checkChild(child) {
        let str = "";
        if (child.type === Node.TYPE_NEGATE || child.type === Node.TYPE_SUM)
          str += "\\left(" + child.toLaTeX() + "\\right)";
        else {
          str += child.toLaTeX();
        }
        return str;
      }
    }
    function toLaTeXSum(node) {
      let str = "";
      for (let i in node.children) {
        if (node.children[i].type === Node.TYPE_NEGATE)
          str += node.children[i].toLaTeX();
        else {
          if (i == 0) {
            str += node.children[i].toLaTeX();
          } else {
            str += "+" + node.children[i].toLaTeX();
          }
        }
      }
      return str;
    }
    function toLaTeXNegate(node) {
      let str = "-";
      if (node.child.type === Node.TYPE_SUM)
        str += "\\left(" + node.child.toLaTeX() + "\\right)";
      else str += node.child.toLaTeX();
      return str;
    }
    function toLaTeXFunction(node) {
      let str = "\\" + node.name;
      for (const i in node.children) {
        str += "{" + node.children[i].toLaTeX() + "}";
      }
      return str;
    }
  }

  iterator() {
    let nodeStart = this;
    let node, index, nodeStack;
    reset();

    return {
      stack: printNodeStack,
      next: nextChild,
      leap: nextSiblings,
      reset: reset,
      isReset: () => node === nodeStart,
      replace: replace,
      replaceChildren: replaceChildren
    };

    function reset() {
      node = nodeStart;
      index = -1;
      nodeStack = [];
    }

    function nextChild() {
      if (index >= 0)
        if (index < node.children.length) {
          // check children
          // get next child
          const next = node.children[index];
          // save this node and index of its next child
          nodeStack.push({ node: node, index: ++index });
          // init iterator for next node
          node = next;
          index = 0;
          // console.log("iterator: next: node: ", node.toString());
          return node;
        } else {
          return nextSiblings();
        }
      else {
        // increment index for first child
        index = 0;
        // first time return this
        // console.log("iterator: first: node: ", node.toString());
        return node;
      }
    }
    function nextSiblings() {
      // no next child
      if (nodeStack.length > 0) {
        // get previous back from stack
        ({ node, index } = nodeStack.pop());
        // continue with previous
        // console.log("iterator: continue: node: ", node.toString());
        return nextChild();
      } else {
        // console.log("iterator: EndOfStack: node: ", node.toString());
        return new Node(Node.TYPE_EOS, "EndOfStack");
      }
    }
    function replace(oldNode, newNode) {
      if (nodeStack.length > 0) {
        // get previous back from stack
        ({ node, index } = nodeStack.pop());
        // console.log("replace: pop: node: ", node);
        index = index - 1;
        if (index >= 0 && index < node.children.length) {
          // if node from stack ist oldNode
          if (node.children[index].id === oldNode.id) {
            // replace stack node3 with newNode
            node.children[index] = newNode;
          } else {
            return false;
          }
        } else {
          console.log("ERROR: Node: iterator: replace: index out of bound");
          return false;
        }
        // push back updated node
        index = index + 1;
        nodeStack.push({ node, index });
      } else {
        // stack empty, so nodeStart itself gets changed
        if (node.id === oldNode.id) {
          // replace nodeStart props from newNode
          for (let prop in nodeStart) {
            nodeStart[prop] = newNode[prop];
          }
          node = nodeStart;
        } else return false;
      }
      // return success
      return true;
    }
    function replaceChildren(oldNode, newChildren) {
      // if this node is oldNode
      if (node.id === oldNode.id) {
        // replace this node children with newChildren
        node.children = newChildren;
      } else {
        return false;
      }
      // return success
      return true;
    }
    function printNodeStack() {
      let str = "";
      for (let item of nodeStack) {
        str += "\n" + item.node.toString() + " @ " + item.index;
      }
      // console.log("iterator: nodeStack: ", str);
      return str;
    }
  }

  static TYPE_SYMBOL = "SYMBOL";
  static TYPE_NUMBER = "NUMBER";
  static TYPE_SUM = "SUM";
  static TYPE_PRODUCT = "PRODUCT";
  static TYPE_POWER = "POWER";
  static TYPE_NEGATE = "NEGATE";
  static TYPE_FUNCTION = "FUNCTION";
  static TYPE_INVERSE = "INVERSE";

  static TYPE_EOS = "EOS"; // end of iterator stack
}

const UNARY_NODES = ["FACTORIAL", "FUNCTION", "INVERSE", "NEGATE"];

const getID = (function () {
  let id = 1;
  return { next: () => id++ };
})();
