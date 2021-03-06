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
        str += this.toLaTeXSum();
        break;
      case Node.TYPE_PRODUCT:
        str += this.toLaTeXProduct();
        break;
      case Node.TYPE_POWER:
        str += this.toLaTeXPower();
        break;
      // case Node.TYPE_INVERSE:
      //   str += "1/ " + this.child.toLaTeX();
      //   break;
      case Node.TYPE_NEGATE:
        str += this.toLaTeXNegate();
        break;
      case Node.TYPE_FUNCTION:
        str += this.toLaTeXFunction(this.name);
        break;
    }
    return str;
  }
  // toLaTeXInfix(op) {
  //   let str = "";
  //   // Print each child.
  //   for (let i in this.children) {
  //     str += this.children[i].toLaTeX();
  //     // not last child
  //     if (i < this.children.length - 1) {
  //       str += op;
  //     }
  //   }
  //   return str;
  // }
  toLaTeXPower() {
    let str = "";
    for (let i in this.children) {
      if (i == 0) {
        str += checkChild(this.children[i]);
      } else {
        str += "^" + checkChild(this.children[i]);
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
  toLaTeXProduct() {
    let str = "";
    for (let i in this.children) {
      if (i == 0) {
        str += checkChild(this.children[i]);
      } else {
        str += "\\cdot " + checkChild(this.children[i]);
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
  toLaTeXSum() {
    let str = "";
    for (let i in this.children) {
      if (this.children[i].type === Node.TYPE_NEGATE)
        str += this.children[i].toLaTeX();
      else {
        if (i == 0) {
          str += this.children[i].toLaTeX();
        } else {
          str += "+" + this.children[i].toLaTeX();
        }
      }
    }
    return str;
  }
  toLaTeXNegate() {
    let str = "-";
    if (this.child.type === Node.TYPE_SUM)
      str += "\\left(" + this.child.toLaTeX() + "\\right)";
    else str += this.child.toLaTeX();
    return str;
  }
  toLaTeXFunction(name) {
    let str = "\\" + name;
    for (const i in this.children) {
      str += "{" + this.children[i].toLaTeX() + "}";
    }
    return str;
  }

  static TYPE_FUNCTION = "FUNCTION";
  static TYPE_INVERSE = "INVERSE";
  static TYPE_NEGATE = "NEGATE";
  static TYPE_NUMBER = "NUMBER";
  static TYPE_POWER = "POWER";
  static TYPE_PRODUCT = "PRODUCT";
  static TYPE_SUM = "SUM";
  static TYPE_SYMBOL = "SYMBOL";
}

const UNARY_NODES = ["FACTORIAL", "FUNCTION", "INVERSE", "NEGATE"];
