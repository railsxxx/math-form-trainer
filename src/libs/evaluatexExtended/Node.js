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
    this.id = getID();
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
    // return `${this.children.length} ${this.type} [${val}] id ${this.id}`;
    return `${this.children.length} ${this.type} [${val}] ${this.id}`;
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
          str += parensChild(node.children[i]);
        } else {
          str += "^" + parensChild(node.children[i]);
        }
      }
      return str;

      function parensChild(child) {
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
          str += parensChild(node.children[i]);
        } else {
          str += "\\cdot " + parensChild(node.children[i]);
        }
      }
      return str;

      function parensChild(child) {
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
      let str = "",
        childStr = "";
      for (let i in node.children) {
        childStr = node.children[i].toLaTeX();
        if (i == 0) {
          str += childStr;
        } else {
          if (childStr.charAt(0) === "-") str += childStr;
          else str += "+" + childStr;
        }
      }
      return str;
    }
    function toLaTeXNegate(node) {
      let str = "-";
      if (
        node.child.type === Node.TYPE_SUM ||
        // node.child.type === Node.TYPE_PRODUCT ||
        node.child.type === Node.TYPE_NEGATE
      )
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
    let node, childIndex, nodeStack;
    reinit();

    return {
      stack: nodeStackToString,
      next: nextChild,
      leap: nextSiblings,
      reinit: reinit,
      restartAt: restartAt,
      replace: replace,
      replaceChildren: replaceChildren
    };

    function reinit() {
      node = nodeStart;
      childIndex = -1;
      nodeStack = [];
    }

    function nextChild() {
      if (childIndex >= 0)
        if (childIndex < node.children.length) {
          // index points to next child
          // current node is parent of next child
          const next = node.children[childIndex];
          // for next child save its parent node and its child index
          nodeStack.push({ node: node, childIndex: childIndex });
          // init iterator for next node
          node = next;
          childIndex = 0;
          return node;
        } else {
          // no more children on this parent node
          return nextSiblings();
        }
      else {
        // set index for first child of nodestart
        childIndex = 0;
        // first time return nodeStart
        return node;
      }
    }
    function nextSiblings() {
      // no next child
      if (nodeStack.length > 0) {
        // get previous from stack
        ({ node, childIndex } = nodeStack.pop());
        // continue with previous
        // console.log("iterator:nextSiblings: node: ", node.toString());
        // set index for next child
        childIndex++;
        return nextChild();
      } else {
        // console.log("iterator: EndOfStack: node: ", node.toString());
        return new Node(Node.TYPE_EOS, "EndOfStack");
      }
    }
    function restartAt(oldNodeID) {
      reinit();
      // set index for first child of nodeStart after reinit
      childIndex = 0;
      let next;
      while (node.id !== oldNodeID) {
        next = nextChild();
        if (next.type === Node.TYPE_EOS) {
          console.log("Iterator:restartAt: nodeID not found: ", oldNodeID);
          throw "";
        }
      }
    }
    function replace(oldNode, newNode) {
      if (nodeStack.length > 0) {
        // get parent of oldNode back from stack
        ({ node, childIndex } = nodeStack.pop());
        if (childIndex >= 0 && childIndex < node.children.length) {
          // if parent child is oldNode
          if (node.children[childIndex].id === oldNode.id) {
            // replace oldNode with newNode as parent child
            node.children[childIndex] = newNode;
          } else {
            return false;
          }
        } else {
          console.log("ERROR: Node:iterator:replace: index out of bound");
          return false;
        }
        // push back updated parent
        nodeStack.push({ node, childIndex });
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
    function nodeStackToString() {
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
  // return { next: () => id++ }
  return () => id++;
})();
