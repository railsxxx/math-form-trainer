function manageCharInterception(e, t, n) {
  switch ((e.preventDefault(), t)) {
    case 1:
      (incommingString = $("#char_" + n).val()),
        manageBtnLooks(t, n),
        "vi" == keyboardLanguage
          ? "1" == keyboardMode
            ? 53 == n
              ? (manageBtnLooks(0, n),
                $("#char_" + n).css("background-position", "0px 0px"),
                manageVietAccent(1))
              : 54 == n
              ? (manageBtnLooks(0, n),
                $("#char_" + n).css("background-position", "-30px 0px"),
                manageVietAccent(2))
              : 55 == n
              ? (manageBtnLooks(0, n),
                $("#char_" + n).css("background-position", "-60px 0px"),
                manageVietAccent(3))
              : 56 == n
              ? (manageBtnLooks(0, n),
                $("#char_" + n).css("background-position", "-90px 0px"),
                manageVietAccent(4))
              : 57 == n
              ? (manageBtnLooks(0, n),
                $("#char_" + n).css("background-position", "-120px 0px"),
                manageVietAccent(5))
              : insertString(incommingString)
            : "2" == keyboardMode &&
              (49 == n
                ? (manageBtnLooks(0, n),
                  $("#char_" + n).css("background-position", "0px 0px"),
                  manageVietAccent(1))
                : 50 == n
                ? (manageBtnLooks(0, n),
                  $("#char_" + n).css("background-position", "-30px 0px"),
                  manageVietAccent(2))
                : 51 == n
                ? (manageBtnLooks(0, n),
                  $("#char_" + n).css("background-position", "-60px 0px"),
                  manageVietAccent(3))
                : 52 == n
                ? (manageBtnLooks(0, n),
                  $("#char_" + n).css("background-position", "-90px 0px"),
                  manageVietAccent(4))
                : 53 == n
                ? (manageBtnLooks(0, n),
                  $("#char_" + n).css("background-position", "-120px 0px"),
                  manageVietAccent(5))
                : 54 == n
                ? (manageBtnLooks(0, n),
                  $("#char_" + n).css("background-position", "-150px 0px"),
                  manageVietAccent(6))
                : 55 == n
                ? (manageBtnLooks(0, n),
                  $("#char_" + n).css("background-position", "-180px 0px"),
                  manageVietAccent(7))
                : 56 == n
                ? (manageBtnLooks(0, n),
                  $("#char_" + n).css("background-position", "-210px 0px"),
                  manageVietAccent(8))
                : 57 == n
                ? (manageBtnLooks(1, n), manageVietAccent(9))
                : ((doubleTapped = manageDoubleTap(incommingString)),
                  0 == doubleTapped && insertString(incommingString)))
          : insertString(incommingString);
      break;
    case 0:
      manageBtnLooks(t, n);
  }
}
function manageBtnLooks(e, t) {
  switch (e) {
    case 1:
      $("#char_" + t).css("background", "#1A8BA9"),
        $("#char_" + t).css("font-weight", "bold"),
        $("#char_" + t).css("color", "#fff"),
        $("#char_" + t).css("border-color", "#fff"),
        $("#char_" + t).css("border-width", "1px");
      break;
    case 0:
      $("#char_" + t).css("background", ""),
        $("#char_" + t).css("font-weight", "normal"),
        $("#char_" + t).css("color", "#525252"),
        $("#char_" + t).css("border-color", ""),
        $("#char_" + t).css("border-width", "");
  }
}
function refocus() {
  $("#canvasId").focus();
}
function insertString(e) {
  if (
    ((canvas = document.getElementById("canvasId")),
    void 0 !== document.selection)
  ) {
    for (
      caret = getCaret(),
        -1 == caret && (caret = canvas.value.length),
        begining = canvas.value.substr(0, caret),
        ending = canvas.value.substr(caret, canvas.value.length),
        canvas.value = begining + e + ending,
        cptr = 0,
        k = 0;
      k < caret;
      k++
    )
      "\n" == canvas.value[k] && 1 != ie9 && cptr++;
    setCaretToPos(caret - (cptr - 1));
  } else
    void 0 !== canvas.selectionStart
      ? ((begining = canvas.selectionStart),
        (ending = canvas.selectionEnd),
        (canvas.value =
          canvas.value.substr(0, begining) + e + canvas.value.substr(ending)),
        (pos = begining + e.length),
        (canvas.selectionStart = pos),
        (canvas.selectionEnd = pos),
        (canvas.scrollTop = canvas.scrollHeight))
      : (canvas.value = canvas.value + e);
}
function getCaret() {
  canvas = document.getElementById("canvasId");
  return (
    (sel = document.selection.createRange()),
    (dul = sel.duplicate()),
    (len = 0),
    dul.moveToElementText(canvas),
    (sel.text = ""),
    (len = dul.text.indexOf("")),
    sel.moveStart("character", -1),
    (sel.text = ""),
    len
  );
}
function setSelectionRange(e, t, n) {
  var r = e.createTextRange();
  r.collapse(!0),
    r.moveEnd("character", n),
    r.moveStart("character", t),
    r.select();
}
function setCaretToPos(e) {
  (canvas = document.getElementById("canvasId")),
    setSelectionRange(canvas, e, e);
}
function manageBackspace() {
  if (
    ((canvas = document.getElementById("canvasId")),
    canvas.focus(),
    void 0 !== document.selection)
  ) {
    for (
      caret = getCaret(),
        -1 == caret && (caret = canvas.value.length),
        erace = "\n" == canvas.value.substr(caret - 1, 1) ? 2 : 1,
        begining = canvas.value.substr(0, caret - erace),
        ending = canvas.value.substr(caret, canvas.value.length),
        canvas.value = begining + ending,
        cptr = 0,
        k = 0;
      k < caret - 1;
      k++
    )
      "\n" == canvas.value[k] && cptr++;
    setCaretToPos(caret - (erace + cptr));
  } else
    void 0 !== canvas.selectionStart
      ? ((begining = canvas.selectionStart),
        (ending = canvas.selectionEnd),
        (canvas.value =
          canvas.value.substr(0, begining - 1) + canvas.value.substr(ending)),
        (pos = begining - 1),
        (canvas.selectionStart = pos),
        (canvas.selectionEnd = pos))
      : (canvas.value = canvas.value.substr(0, canvas.value.length - 1));
  canvas.focus();
}
function manageChar(e) {
  (incommingString = e.value),
    "vi" == keyboardLanguage && "2" == keyboardMode
      ? ((doubleTapped = manageDoubleTap(incommingString)),
        0 == doubleTapped && insertString(incommingString))
      : insertString(incommingString);
}
function manageEnter() {
  insertString("\n");
}
function manageSpace() {
  insertString(" ");
}
function manageCaps() {
  switch (capsMode) {
    case 0:
      (capsMode = 1), manageKeyboard(1);
      break;
    case 1:
      (capsMode = 0), manageKeyboard(0);
  }
  manageCapsBtnLooks();
}
function manageCapsBtnLooks() {
  switch (capsMode) {
    case 1:
      $("#btn_caps").css("color", "#1A8BA9");
      break;
    case 0:
      $("#btn_caps").css("color", "#525252");
  }
}
function manageFont(e) {
  (e = parseInt(e, 10)),
    (canvas = document.getElementById("canvasId")),
    (currentFont = parseInt(canvas.style.fontSize, 10)),
    (currentHeight = parseInt(canvas.style.lineHeight, 10)),
    currentFont + e < 30 &&
      8 < currentFont + e &&
      ((canvas.style.fontSize = currentFont + e + "px"),
      (canvas.style.lineHeight = currentHeight + e + "px"));
}
function defaultFont() {
  (canvas = document.getElementById("canvasId")),
    (canvas.style.fontSize = textareaFontSize + "px"),
    (canvas.style.lineHeight = textareaLineHeight + "px");
}
function manageSelect() {
  document.getElementById("canvasId").select();
}
function manageInterception(e) {
  (interceptKey = e), refocus();
}
!(function (m, T) {
  function u(e, t, n) {
    if (n === T && 1 === e.nodeType) {
      var r = "data-" + t.replace(se, "-$1").toLowerCase();
      if ("string" == typeof (n = e.getAttribute(r))) {
        try {
          n =
            "true" === n ||
            ("false" !== n &&
              ("null" === n
                ? null
                : +n + "" === n
                ? +n
                : ae.test(n)
                ? me.parseJSON(n)
                : n));
        } catch (e) {}
        me.data(e, t, n);
      } else n = T;
    }
    return n;
  }
  function l(e) {
    var t;
    for (t in e)
      if (("data" !== t || !me.isEmptyObject(e[t])) && "toJSON" !== t)
        return !1;
    return !0;
  }
  function s() {
    return !1;
  }
  function n() {
    return !0;
  }
  function i(e) {
    return !e || !e.parentNode || 11 === e.parentNode.nodeType;
  }
  function t(e, t) {
    for (; (e = e[t]) && 1 !== e.nodeType; );
    return e;
  }
  function r(e, n, r) {
    if (((n = n || 0), me.isFunction(n)))
      return me.grep(e, function (e, t) {
        return !!n.call(e, t, e) === r;
      });
    if (n.nodeType)
      return me.grep(e, function (e, t) {
        return (e === n) === r;
      });
    if ("string" == typeof n) {
      var t = me.grep(e, function (e) {
        return 1 === e.nodeType;
      });
      if (Ie.test(n)) return me.filter(n, t, !r);
      n = me.filter(n, t);
    }
    return me.grep(e, function (e, t) {
      return 0 <= me.inArray(e, n) === r;
    });
  }
  function y(e) {
    var t = He.split("|"),
      n = e.createDocumentFragment();
    if (n.createElement) for (; t.length; ) n.createElement(t.pop());
    return n;
  }
  function c(e, t) {
    if (1 === t.nodeType && me.hasData(e)) {
      var n,
        r,
        i,
        o = me._data(e),
        a = me._data(t, o),
        s = o.events;
      if (s)
        for (n in (delete a.handle, (a.events = {}), s))
          for (r = 0, i = s[n].length; r < i; r++) me.event.add(t, n, s[n][r]);
      a.data && (a.data = me.extend({}, a.data));
    }
  }
  function p(e, t) {
    var n;
    1 === t.nodeType &&
      (t.clearAttributes && t.clearAttributes(),
      t.mergeAttributes && t.mergeAttributes(e),
      "object" === (n = t.nodeName.toLowerCase())
        ? (t.parentNode && (t.outerHTML = e.outerHTML),
          me.support.html5Clone &&
            e.innerHTML &&
            !me.trim(t.innerHTML) &&
            (t.innerHTML = e.innerHTML))
        : "input" === n && We.test(e.type)
        ? ((t.defaultChecked = t.checked = e.checked),
          t.value !== e.value && (t.value = e.value))
        : "option" === n
        ? (t.selected = e.defaultSelected)
        : "input" === n || "textarea" === n
        ? (t.defaultValue = e.defaultValue)
        : "script" === n && t.text !== e.text && (t.text = e.text),
      t.removeAttribute(me.expando));
  }
  function d(e) {
    return void 0 !== e.getElementsByTagName
      ? e.getElementsByTagName("*")
      : void 0 !== e.querySelectorAll
      ? e.querySelectorAll("*")
      : [];
  }
  function v(e) {
    We.test(e.type) && (e.defaultChecked = e.checked);
  }
  function f(e, t) {
    if (t in e) return t;
    for (
      var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = pt.length;
      i--;

    )
      if ((t = pt[i] + n) in e) return t;
    return r;
  }
  function b(e, t) {
    return (
      (e = t || e),
      "none" === me.css(e, "display") || !me.contains(e.ownerDocument, e)
    );
  }
  function e(e, t) {
    for (var n, r, i = [], o = 0, a = e.length; o < a; o++)
      (n = e[o]).style &&
        ((i[o] = me._data(n, "olddisplay")),
        t
          ? (i[o] || "none" !== n.style.display || (n.style.display = ""),
            "" === n.style.display &&
              b(n) &&
              (i[o] = me._data(n, "olddisplay", x(n.nodeName))))
          : ((r = Je(n, "display")),
            i[o] || "none" === r || me._data(n, "olddisplay", r)));
    for (o = 0; o < a; o++)
      (n = e[o]).style &&
        ((t && "none" !== n.style.display && "" !== n.style.display) ||
          (n.style.display = t ? i[o] || "" : "none"));
    return e;
  }
  function a(e, t, n) {
    var r = it.exec(t);
    return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t;
  }
  function h(e, t, n, r) {
    for (
      var i = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0,
        o = 0;
      i < 4;
      i += 2
    )
      "margin" === n && (o += me.css(e, n + ut[i], !0)),
        r
          ? ("content" === n &&
              (o -= parseFloat(Je(e, "padding" + ut[i])) || 0),
            "margin" !== n &&
              (o -= parseFloat(Je(e, "border" + ut[i] + "Width")) || 0))
          : ((o += parseFloat(Je(e, "padding" + ut[i])) || 0),
            "padding" !== n &&
              (o += parseFloat(Je(e, "border" + ut[i] + "Width")) || 0));
    return o;
  }
  function o(e, t, n) {
    var r = "width" === t ? e.offsetWidth : e.offsetHeight,
      i = !0,
      o = me.support.boxSizing && "border-box" === me.css(e, "boxSizing");
    if (r <= 0 || null == r) {
      if ((((r = Je(e, t)) < 0 || null == r) && (r = e.style[t]), ot.test(r)))
        return r;
      (i = o && (me.support.boxSizingReliable || r === e.style[t])),
        (r = parseFloat(r) || 0);
    }
    return r + h(e, t, n || (o ? "border" : "content"), i) + "px";
  }
  function x(e) {
    if (st[e]) return st[e];
    var t = me("<" + e + ">").appendTo(_.body),
      n = t.css("display");
    return (
      t.remove(),
      ("none" !== n && "" !== n) ||
        ((Ge = _.body.appendChild(
          Ge ||
            me.extend(_.createElement("iframe"), {
              frameBorder: 0,
              width: 0,
              height: 0
            })
        )),
        (Qe && Ge.createElement) ||
          ((Qe = (Ge.contentWindow || Ge.contentDocument).document).write(
            "<!doctype html><html><body>"
          ),
          Qe.close()),
        (t = Qe.body.appendChild(Qe.createElement(e))),
        (n = Je(t, "display")),
        _.body.removeChild(Ge)),
      (st[e] = n)
    );
  }
  function g(n, e, r, i) {
    var t;
    if (me.isArray(e))
      me.each(e, function (e, t) {
        r || ht.test(n)
          ? i(n, t)
          : g(n + "[" + ("object" == typeof t ? e : "") + "]", t, r, i);
      });
    else if (r || "object" !== me.type(e)) i(n, e);
    else for (t in e) g(n + "[" + t + "]", e[t], r, i);
  }
  function C(s) {
    return function (e, t) {
      "string" != typeof e && ((t = e), (e = "*"));
      var n,
        r,
        i = e.toLowerCase().split(K),
        o = 0,
        a = i.length;
      if (me.isFunction(t))
        for (; o < a; o++)
          (n = i[o]),
            (r = /^\+/.test(n)) && (n = n.substr(1) || "*"),
            (s[n] = s[n] || [])[r ? "unshift" : "push"](t);
    };
  }
  function N(e, t, n, r, i, o) {
    (o = o || {})[(i = i || t.dataTypes[0])] = !0;
    for (
      var a, s = e[i], c = 0, l = s ? s.length : 0, u = e === At;
      c < l && (u || !a);
      c++
    )
      "string" == typeof (a = s[c](t, n, r)) &&
        (a = !u || o[a] ? T : (t.dataTypes.unshift(a), N(e, t, n, r, a, o)));
    return (!u && a) || o["*"] || (a = N(e, t, n, r, "*", o)), a;
  }
  function k(e, t) {
    var n,
      r,
      i = me.ajaxSettings.flatOptions || {};
    for (n in t) t[n] !== T && ((i[n] ? e : (r = r || {}))[n] = t[n]);
    r && me.extend(!0, e, r);
  }
  function w() {
    try {
      return new m.XMLHttpRequest();
    } catch (e) {}
  }
  function E() {
    return (
      setTimeout(function () {
        qt = T;
      }, 0),
      (qt = me.now())
    );
  }
  function S(o, e, t) {
    var n,
      a,
      r,
      i = 0,
      s = Xt.length,
      c = me.Deferred().always(function () {
        delete l.elem;
      }),
      l = function () {
        for (
          var e = qt || E(),
            t = Math.max(0, u.startTime + u.duration - e),
            n = 1 - (t / u.duration || 0),
            r = 0,
            i = u.tweens.length;
          r < i;
          r++
        )
          u.tweens[r].run(n);
        return (
          c.notifyWith(o, [u, n, t]),
          n < 1 && i ? t : (c.resolveWith(o, [u]), !1)
        );
      },
      u = c.promise({
        elem: o,
        props: me.extend({}, e),
        opts: me.extend(!0, { specialEasing: {} }, t),
        originalProperties: e,
        originalOptions: t,
        startTime: qt || E(),
        duration: t.duration,
        tweens: [],
        createTween: function (e, t, n) {
          var r = me.Tween(
            o,
            u.opts,
            e,
            t,
            u.opts.specialEasing[e] || u.opts.easing
          );
          return u.tweens.push(r), r;
        },
        stop: function (e) {
          for (var t = 0, n = e ? u.tweens.length : 0; t < n; t++)
            u.tweens[t].run(1);
          return e ? c.resolveWith(o, [u, e]) : c.rejectWith(o, [u, e]), this;
        }
      }),
      p = u.props;
    for (
      !(function (e, t) {
        var n, r, i, o, a;
        for (n in e)
          if (
            ((r = me.camelCase(n)),
            (i = t[r]),
            (o = e[n]),
            me.isArray(o) && ((i = o[1]), (o = e[n] = o[0])),
            n !== r && ((e[r] = o), delete e[n]),
            (a = me.cssHooks[r]) && ("expand" in a))
          )
            for (n in ((o = a.expand(o)), delete e[r], o))
              (n in e) || ((e[n] = o[n]), (t[n] = i));
          else t[r] = i;
      })(p, u.opts.specialEasing);
      i < s;
      i++
    )
      if ((n = Xt[i].call(u, o, p, u.opts))) return n;
    return (
      (a = u),
      (r = p),
      me.each(r, function (e, t) {
        for (
          var n = (Vt[e] || []).concat(Vt["*"]), r = 0, i = n.length;
          r < i;
          r++
        )
          if (n[r].call(a, e, t)) return;
      }),
      me.isFunction(u.opts.start) && u.opts.start.call(o, u),
      me.fx.timer(me.extend(l, { anim: u, queue: u.opts.queue, elem: o })),
      u
        .progress(u.opts.progress)
        .done(u.opts.done, u.opts.complete)
        .fail(u.opts.fail)
        .always(u.opts.always)
    );
  }
  function I(e, t, n, r, i) {
    return new I.prototype.init(e, t, n, r, i);
  }
  function A(e, t) {
    var n,
      r = { height: e },
      i = 0;
    for (t = t ? 1 : 0; i < 4; i += 2 - t)
      r["margin" + (n = ut[i])] = r["padding" + n] = e;
    return t && (r.opacity = r.width = e), r;
  }
  function L(e) {
    return me.isWindow(e)
      ? e
      : 9 === e.nodeType && (e.defaultView || e.parentWindow);
  }
  function j(e, t) {
    return (t + "").toUpperCase();
  }
  var D,
    H,
    _ = m.document,
    B = m.location,
    F = m.navigator,
    M = m.jQuery,
    $ = m.$,
    O = Array.prototype.push,
    q = Array.prototype.slice,
    P = Array.prototype.indexOf,
    R = Object.prototype.toString,
    W = Object.prototype.hasOwnProperty,
    z = String.prototype.trim,
    me = function (e, t) {
      return new me.fn.init(e, t, D);
    },
    X = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
    V = /\S/,
    K = /\s+/,
    U = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    Y = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
    J = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    G = /^[\],:{}\s]*$/,
    Q = /(?:^|:|,)(?:\s*\[)+/g,
    Z = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
    ee = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
    te = /^-ms-/,
    ne = /-([\da-z])/gi,
    re = function () {
      _.addEventListener
        ? (_.removeEventListener("DOMContentLoaded", re, !1), me.ready())
        : "complete" === _.readyState &&
          (_.detachEvent("onreadystatechange", re), me.ready());
    },
    ie = {};
  (me.fn = me.prototype = {
    constructor: me,
    init: function (e, t, n) {
      var r, i, o;
      if (!e) return this;
      if (e.nodeType)
        return (this.context = this[0] = e), (this.length = 1), this;
      if ("string" != typeof e)
        return me.isFunction(e)
          ? n.ready(e)
          : (e.selector !== T &&
              ((this.selector = e.selector), (this.context = e.context)),
            me.makeArray(e, this));
      if (
        !(r =
          "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && 3 <= e.length
            ? [null, e, null]
            : Y.exec(e)) ||
        (!r[1] && t)
      )
        return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
      if (r[1])
        return (
          (o =
            (t = t instanceof me ? t[0] : t) && t.nodeType
              ? t.ownerDocument || t
              : _),
          (e = me.parseHTML(r[1], o, !0)),
          J.test(r[1]) && me.isPlainObject(t) && this.attr.call(e, t, !0),
          me.merge(this, e)
        );
      if ((i = _.getElementById(r[2])) && i.parentNode) {
        if (i.id !== r[2]) return n.find(e);
        (this.length = 1), (this[0] = i);
      }
      return (this.context = _), (this.selector = e), this;
    },
    selector: "",
    jquery: "1.8.3",
    length: 0,
    size: function () {
      return this.length;
    },
    toArray: function () {
      return q.call(this);
    },
    get: function (e) {
      return null == e
        ? this.toArray()
        : e < 0
        ? this[this.length + e]
        : this[e];
    },
    pushStack: function (e, t, n) {
      var r = me.merge(this.constructor(), e);
      return (
        (r.prevObject = this),
        (r.context = this.context),
        "find" === t
          ? (r.selector = this.selector + (this.selector ? " " : "") + n)
          : t && (r.selector = this.selector + "." + t + "(" + n + ")"),
        r
      );
    },
    each: function (e, t) {
      return me.each(this, e, t);
    },
    ready: function (e) {
      return me.ready.promise().done(e), this;
    },
    eq: function (e) {
      return -1 === (e = +e) ? this.slice(e) : this.slice(e, e + 1);
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    slice: function () {
      return this.pushStack(
        q.apply(this, arguments),
        "slice",
        q.call(arguments).join(",")
      );
    },
    map: function (n) {
      return this.pushStack(
        me.map(this, function (e, t) {
          return n.call(e, t, e);
        })
      );
    },
    end: function () {
      return this.prevObject || this.constructor(null);
    },
    push: O,
    sort: [].sort,
    splice: [].splice
  }),
    (me.fn.init.prototype = me.fn),
    (me.extend = me.fn.extend = function () {
      var e,
        t,
        n,
        r,
        i,
        o,
        a = arguments[0] || {},
        s = 1,
        c = arguments.length,
        l = !1;
      for (
        "boolean" == typeof a && ((l = a), (a = arguments[1] || {}), (s = 2)),
          "object" == typeof a || me.isFunction(a) || (a = {}),
          c === s && ((a = this), --s);
        s < c;
        s++
      )
        if (null != (e = arguments[s]))
          for (t in e)
            (n = a[t]),
              a !== (r = e[t]) &&
                (l && r && (me.isPlainObject(r) || (i = me.isArray(r)))
                  ? ((o = i
                      ? ((i = !1), n && me.isArray(n) ? n : [])
                      : n && me.isPlainObject(n)
                      ? n
                      : {}),
                    (a[t] = me.extend(l, o, r)))
                  : r !== T && (a[t] = r));
      return a;
    }),
    me.extend({
      noConflict: function (e) {
        return (
          m.$ === me && (m.$ = $), e && m.jQuery === me && (m.jQuery = M), me
        );
      },
      isReady: !1,
      readyWait: 1,
      holdReady: function (e) {
        e ? me.readyWait++ : me.ready(!0);
      },
      ready: function (e) {
        if (!0 === e ? !--me.readyWait : !me.isReady) {
          if (!_.body) return setTimeout(me.ready, 1);
          ((me.isReady = !0) !== e && 0 < --me.readyWait) ||
            (H.resolveWith(_, [me]),
            me.fn.trigger && me(_).trigger("ready").off("ready"));
        }
      },
      isFunction: function (e) {
        return "function" === me.type(e);
      },
      isArray:
        Array.isArray ||
        function (e) {
          return "array" === me.type(e);
        },
      isWindow: function (e) {
        return null != e && e == e.window;
      },
      isNumeric: function (e) {
        return !isNaN(parseFloat(e)) && isFinite(e);
      },
      type: function (e) {
        return null == e ? String(e) : ie[R.call(e)] || "object";
      },
      isPlainObject: function (e) {
        if (!e || "object" !== me.type(e) || e.nodeType || me.isWindow(e))
          return !1;
        try {
          if (
            e.constructor &&
            !W.call(e, "constructor") &&
            !W.call(e.constructor.prototype, "isPrototypeOf")
          )
            return !1;
        } catch (e) {
          return !1;
        }
        var t;
        for (t in e);
        return t === T || W.call(e, t);
      },
      isEmptyObject: function (e) {
        var t;
        for (t in e) return !1;
        return !0;
      },
      error: function (e) {
        throw new Error(e);
      },
      parseHTML: function (e, t, n) {
        var r;
        return e && "string" == typeof e
          ? ("boolean" == typeof t && ((n = t), (t = 0)),
            (t = t || _),
            (r = J.exec(e))
              ? [t.createElement(r[1])]
              : ((r = me.buildFragment([e], t, n ? null : [])),
                me.merge(
                  [],
                  (r.cacheable ? me.clone(r.fragment) : r.fragment).childNodes
                )))
          : null;
      },
      parseJSON: function (e) {
        return e && "string" == typeof e
          ? ((e = me.trim(e)),
            m.JSON && m.JSON.parse
              ? m.JSON.parse(e)
              : G.test(e.replace(Z, "@").replace(ee, "]").replace(Q, ""))
              ? new Function("return " + e)()
              : void me.error("Invalid JSON: " + e))
          : null;
      },
      parseXML: function (e) {
        var t;
        if (!e || "string" != typeof e) return null;
        try {
          m.DOMParser
            ? (t = new DOMParser().parseFromString(e, "text/xml"))
            : (((t = new ActiveXObject("Microsoft.XMLDOM")).async = "false"),
              t.loadXML(e));
        } catch (e) {
          t = T;
        }
        return (
          (t &&
            t.documentElement &&
            !t.getElementsByTagName("parsererror").length) ||
            me.error("Invalid XML: " + e),
          t
        );
      },
      noop: function () {},
      globalEval: function (e) {
        e &&
          V.test(e) &&
          (
            m.execScript ||
            function (e) {
              m.eval.call(m, e);
            }
          )(e);
      },
      camelCase: function (e) {
        return e.replace(te, "ms-").replace(ne, j);
      },
      nodeName: function (e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
      },
      each: function (e, t, n) {
        var r,
          i = 0,
          o = e.length,
          a = o === T || me.isFunction(e);
        if (n)
          if (a) {
            for (r in e) if (!1 === t.apply(e[r], n)) break;
          } else for (; i < o && !1 !== t.apply(e[i++], n); );
        else if (a) {
          for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
        } else for (; i < o && !1 !== t.call(e[i], i, e[i++]); );
        return e;
      },
      trim:
        z && !z.call("\ufeff ")
          ? function (e) {
              return null == e ? "" : z.call(e);
            }
          : function (e) {
              return null == e ? "" : (e + "").replace(U, "");
            },
      makeArray: function (e, t) {
        var n,
          r = t || [];
        return (
          null != e &&
            ((n = me.type(e)),
            null == e.length ||
            "string" === n ||
            "function" === n ||
            "regexp" === n ||
            me.isWindow(e)
              ? O.call(r, e)
              : me.merge(r, e)),
          r
        );
      },
      inArray: function (e, t, n) {
        var r;
        if (t) {
          if (P) return P.call(t, e, n);
          for (
            r = t.length, n = n ? (n < 0 ? Math.max(0, r + n) : n) : 0;
            n < r;
            n++
          )
            if (n in t && t[n] === e) return n;
        }
        return -1;
      },
      merge: function (e, t) {
        var n = t.length,
          r = e.length,
          i = 0;
        if ("number" == typeof n) for (; i < n; i++) e[r++] = t[i];
        else for (; t[i] !== T; ) e[r++] = t[i++];
        return (e.length = r), e;
      },
      grep: function (e, t, n) {
        var r = [],
          i = 0,
          o = e.length;
        for (n = !!n; i < o; i++) n !== !!t(e[i], i) && r.push(e[i]);
        return r;
      },
      map: function (e, t, n) {
        var r,
          i,
          o = [],
          a = 0,
          s = e.length;
        if (
          e instanceof me ||
          (s !== T &&
            "number" == typeof s &&
            ((0 < s && e[0] && e[s - 1]) || 0 === s || me.isArray(e)))
        )
          for (; a < s; a++) null != (r = t(e[a], a, n)) && (o[o.length] = r);
        else for (i in e) null != (r = t(e[i], i, n)) && (o[o.length] = r);
        return o.concat.apply([], o);
      },
      guid: 1,
      proxy: function (e, t) {
        var n, r, i;
        return (
          "string" == typeof t && ((n = e[t]), (t = e), (e = n)),
          me.isFunction(e)
            ? ((r = q.call(arguments, 2)),
              ((i = function () {
                return e.apply(t, r.concat(q.call(arguments)));
              }).guid = e.guid = e.guid || me.guid++),
              i)
            : T
        );
      },
      access: function (e, t, n, r, i, o, a) {
        var s,
          c = null == n,
          l = 0,
          u = e.length;
        if (n && "object" == typeof n) {
          for (l in n) me.access(e, t, l, n[l], 1, o, r);
          i = 1;
        } else if (r !== T) {
          if (
            ((s = a === T && me.isFunction(r)),
            c &&
              (t = s
                ? ((s = t),
                  function (e, t, n) {
                    return s.call(me(e), n);
                  })
                : (t.call(e, r), null)),
            t)
          )
            for (; l < u; l++)
              t(e[l], n, s ? r.call(e[l], l, t(e[l], n)) : r, a);
          i = 1;
        }
        return i ? e : c ? t.call(e) : u ? t(e[0], n) : o;
      },
      now: function () {
        return new Date().getTime();
      }
    }),
    (me.ready.promise = function (e) {
      if (!H)
        if (((H = me.Deferred()), "complete" === _.readyState))
          setTimeout(me.ready, 1);
        else if (_.addEventListener)
          _.addEventListener("DOMContentLoaded", re, !1),
            m.addEventListener("load", me.ready, !1);
        else {
          _.attachEvent("onreadystatechange", re),
            m.attachEvent("onload", me.ready);
          var n = !1;
          try {
            n = null == m.frameElement && _.documentElement;
          } catch (e) {}
          n &&
            n.doScroll &&
            (function t() {
              if (!me.isReady) {
                try {
                  n.doScroll("left");
                } catch (e) {
                  return setTimeout(t, 50);
                }
                me.ready();
              }
            })();
        }
      return H.promise(e);
    }),
    me.each(
      "Boolean Number String Function Array Date RegExp Object".split(" "),
      function (e, t) {
        ie["[object " + t + "]"] = t.toLowerCase();
      }
    ),
    (D = me(_));
  var oe = {};
  (me.Callbacks = function (i) {
    var e, n;
    i =
      "string" == typeof i
        ? oe[i] ||
          ((n = oe[(e = i)] = {}),
          me.each(e.split(K), function (e, t) {
            n[t] = !0;
          }),
          n)
        : me.extend({}, i);
    var t,
      r,
      o,
      a,
      s,
      c,
      l = [],
      u = !i.once && [],
      p = function (e) {
        for (
          t = i.memory && e, r = !0, c = a || 0, a = 0, s = l.length, o = !0;
          l && c < s;
          c++
        )
          if (!1 === l[c].apply(e[0], e[1]) && i.stopOnFalse) {
            t = !1;
            break;
          }
        (o = !1),
          l && (u ? u.length && p(u.shift()) : t ? (l = []) : d.disable());
      },
      d = {
        add: function () {
          if (l) {
            var e = l.length;
            (function r(e) {
              me.each(e, function (e, t) {
                var n = me.type(t);
                "function" === n
                  ? (i.unique && d.has(t)) || l.push(t)
                  : t && t.length && "string" !== n && r(t);
              });
            })(arguments),
              o ? (s = l.length) : t && ((a = e), p(t));
          }
          return this;
        },
        remove: function () {
          return (
            l &&
              me.each(arguments, function (e, t) {
                for (var n; -1 < (n = me.inArray(t, l, n)); )
                  l.splice(n, 1), o && (n <= s && s--, n <= c && c--);
              }),
            this
          );
        },
        has: function (e) {
          return -1 < me.inArray(e, l);
        },
        empty: function () {
          return (l = []), this;
        },
        disable: function () {
          return (l = u = t = T), this;
        },
        disabled: function () {
          return !l;
        },
        lock: function () {
          return (u = T), t || d.disable(), this;
        },
        locked: function () {
          return !u;
        },
        fireWith: function (e, t) {
          return (
            (t = [e, (t = t || []).slice ? t.slice() : t]),
            !l || (r && !u) || (o ? u.push(t) : p(t)),
            this
          );
        },
        fire: function () {
          return d.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!r;
        }
      };
    return d;
  }),
    me.extend({
      Deferred: function (e) {
        var a = [
            ["resolve", "done", me.Callbacks("once memory"), "resolved"],
            ["reject", "fail", me.Callbacks("once memory"), "rejected"],
            ["notify", "progress", me.Callbacks("memory")]
          ],
          i = "pending",
          o = {
            state: function () {
              return i;
            },
            always: function () {
              return s.done(arguments).fail(arguments), this;
            },
            then: function () {
              var o = arguments;
              return me
                .Deferred(function (i) {
                  me.each(a, function (e, t) {
                    var n = t[0],
                      r = o[e];
                    s[t[1]](
                      me.isFunction(r)
                        ? function () {
                            var e = r.apply(this, arguments);
                            e && me.isFunction(e.promise)
                              ? e
                                  .promise()
                                  .done(i.resolve)
                                  .fail(i.reject)
                                  .progress(i.notify)
                              : i[n + "With"](this === s ? i : this, [e]);
                          }
                        : i[n]
                    );
                  }),
                    (o = null);
                })
                .promise();
            },
            promise: function (e) {
              return null != e ? me.extend(e, o) : o;
            }
          },
          s = {};
        return (
          (o.pipe = o.then),
          me.each(a, function (e, t) {
            var n = t[2],
              r = t[3];
            (o[t[1]] = n.add),
              r &&
                n.add(
                  function () {
                    i = r;
                  },
                  a[1 ^ e][2].disable,
                  a[2][2].lock
                ),
              (s[t[0]] = n.fire),
              (s[t[0] + "With"] = n.fireWith);
          }),
          o.promise(s),
          e && e.call(s, s),
          s
        );
      },
      when: function (e) {
        function t(t, n, r) {
          return function (e) {
            (n[t] = this),
              (r[t] = 1 < arguments.length ? q.call(arguments) : e),
              r === i ? l.notifyWith(n, r) : --c || l.resolveWith(n, r);
          };
        }
        var i,
          n,
          r,
          o = 0,
          a = q.call(arguments),
          s = a.length,
          c = 1 !== s || (e && me.isFunction(e.promise)) ? s : 0,
          l = 1 === c ? e : me.Deferred();
        if (1 < s)
          for (i = new Array(s), n = new Array(s), r = new Array(s); o < s; o++)
            a[o] && me.isFunction(a[o].promise)
              ? a[o]
                  .promise()
                  .done(t(o, r, a))
                  .fail(l.reject)
                  .progress(t(o, n, i))
              : --c;
        return c || l.resolveWith(r, a), l.promise();
      }
    }),
    (me.support = (function () {
      var a,
        e,
        t,
        n,
        r,
        i,
        o,
        s,
        c,
        l,
        u,
        p = _.createElement("div");
      if (
        (p.setAttribute("className", "t"),
        (p.innerHTML =
          "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
        (e = p.getElementsByTagName("*")),
        (t = p.getElementsByTagName("a")[0]),
        !e || !t || !e.length)
      )
        return {};
      (r = (n = _.createElement("select")).appendChild(
        _.createElement("option")
      )),
        (i = p.getElementsByTagName("input")[0]),
        (t.style.cssText = "top:1px;float:left;opacity:.5"),
        (a = {
          leadingWhitespace: 3 === p.firstChild.nodeType,
          tbody: !p.getElementsByTagName("tbody").length,
          htmlSerialize: !!p.getElementsByTagName("link").length,
          style: /top/.test(t.getAttribute("style")),
          hrefNormalized: "/a" === t.getAttribute("href"),
          opacity: /^0.5/.test(t.style.opacity),
          cssFloat: !!t.style.cssFloat,
          checkOn: "on" === i.value,
          optSelected: r.selected,
          getSetAttribute: "t" !== p.className,
          enctype: !!_.createElement("form").enctype,
          html5Clone:
            "<:nav></:nav>" !== _.createElement("nav").cloneNode(!0).outerHTML,
          boxModel: "CSS1Compat" === _.compatMode,
          submitBubbles: !0,
          changeBubbles: !0,
          focusinBubbles: !1,
          deleteExpando: !0,
          noCloneEvent: !0,
          inlineBlockNeedsLayout: !1,
          shrinkWrapBlocks: !1,
          reliableMarginRight: !0,
          boxSizingReliable: !0,
          pixelPosition: !1
        }),
        (i.checked = !0),
        (a.noCloneChecked = i.cloneNode(!0).checked),
        (n.disabled = !0),
        (a.optDisabled = !r.disabled);
      try {
        delete p.test;
      } catch (e) {
        a.deleteExpando = !1;
      }
      if (
        (!p.addEventListener &&
          p.attachEvent &&
          p.fireEvent &&
          (p.attachEvent(
            "onclick",
            (u = function () {
              a.noCloneEvent = !1;
            })
          ),
          p.cloneNode(!0).fireEvent("onclick"),
          p.detachEvent("onclick", u)),
        ((i = _.createElement("input")).value = "t"),
        i.setAttribute("type", "radio"),
        (a.radioValue = "t" === i.value),
        i.setAttribute("checked", "checked"),
        i.setAttribute("name", "t"),
        p.appendChild(i),
        (o = _.createDocumentFragment()).appendChild(p.lastChild),
        (a.checkClone = o.cloneNode(!0).cloneNode(!0).lastChild.checked),
        (a.appendChecked = i.checked),
        o.removeChild(i),
        o.appendChild(p),
        p.attachEvent)
      )
        for (c in { submit: !0, change: !0, focusin: !0 })
          (l = (s = "on" + c) in p) ||
            (p.setAttribute(s, "return;"), (l = "function" == typeof p[s])),
            (a[c + "Bubbles"] = l);
      return (
        me(function () {
          var e,
            t,
            n,
            r,
            i = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
            o = _.getElementsByTagName("body")[0];
          o &&
            (((e = _.createElement("div")).style.cssText =
              "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px"),
            o.insertBefore(e, o.firstChild),
            (t = _.createElement("div")),
            e.appendChild(t),
            (t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
            ((n = t.getElementsByTagName("td"))[0].style.cssText =
              "padding:0;margin:0;border:0;display:none"),
            (l = 0 === n[0].offsetHeight),
            (n[0].style.display = ""),
            (n[1].style.display = "none"),
            (a.reliableHiddenOffsets = l && 0 === n[0].offsetHeight),
            (t.innerHTML = ""),
            (t.style.cssText =
              "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;"),
            (a.boxSizing = 4 === t.offsetWidth),
            (a.doesNotIncludeMarginInBodyOffset = 1 !== o.offsetTop),
            m.getComputedStyle &&
              ((a.pixelPosition =
                "1%" !== (m.getComputedStyle(t, null) || {}).top),
              (a.boxSizingReliable =
                "4px" ===
                (m.getComputedStyle(t, null) || { width: "4px" }).width),
              ((r = _.createElement(
                "div"
              )).style.cssText = t.style.cssText = i),
              (r.style.marginRight = r.style.width = "0"),
              (t.style.width = "1px"),
              t.appendChild(r),
              (a.reliableMarginRight = !parseFloat(
                (m.getComputedStyle(r, null) || {}).marginRight
              ))),
            void 0 !== t.style.zoom &&
              ((t.innerHTML = ""),
              (t.style.cssText =
                i + "width:1px;padding:1px;display:inline;zoom:1"),
              (a.inlineBlockNeedsLayout = 3 === t.offsetWidth),
              (t.style.display = "block"),
              (t.style.overflow = "visible"),
              (t.innerHTML = "<div></div>"),
              (t.firstChild.style.width = "5px"),
              (a.shrinkWrapBlocks = 3 !== t.offsetWidth),
              (e.style.zoom = 1)),
            o.removeChild(e),
            (e = t = n = r = null));
        }),
        o.removeChild(p),
        (e = t = n = r = i = o = p = null),
        a
      );
    })());
  var ae = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
    se = /([A-Z])/g;
  me.extend({
    cache: {},
    deletedIds: [],
    uuid: 0,
    expando: "jQuery" + (me.fn.jquery + Math.random()).replace(/\D/g, ""),
    noData: {
      embed: !0,
      object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      applet: !0
    },
    hasData: function (e) {
      return (
        !!(e = e.nodeType ? me.cache[e[me.expando]] : e[me.expando]) && !l(e)
      );
    },
    data: function (e, t, n, r) {
      if (me.acceptData(e)) {
        var i,
          o,
          a = me.expando,
          s = "string" == typeof t,
          c = e.nodeType,
          l = c ? me.cache : e,
          u = c ? e[a] : e[a] && a;
        if ((u && l[u] && (r || l[u].data)) || !s || n !== T)
          return (
            u || (c ? (e[a] = u = me.deletedIds.pop() || me.guid++) : (u = a)),
            l[u] || ((l[u] = {}), c || (l[u].toJSON = me.noop)),
            ("object" != typeof t && "function" != typeof t) ||
              (r
                ? (l[u] = me.extend(l[u], t))
                : (l[u].data = me.extend(l[u].data, t))),
            (i = l[u]),
            r || (i.data || (i.data = {}), (i = i.data)),
            n !== T && (i[me.camelCase(t)] = n),
            s ? null == (o = i[t]) && (o = i[me.camelCase(t)]) : (o = i),
            o
          );
      }
    },
    removeData: function (e, t, n) {
      if (me.acceptData(e)) {
        var r,
          i,
          o,
          a = e.nodeType,
          s = a ? me.cache : e,
          c = a ? e[me.expando] : me.expando;
        if (s[c]) {
          if (t && (r = n ? s[c] : s[c].data)) {
            me.isArray(t) ||
              (t =
                t in r ? [t] : (t = me.camelCase(t)) in r ? [t] : t.split(" "));
            for (i = 0, o = t.length; i < o; i++) delete r[t[i]];
            if (!(n ? l : me.isEmptyObject)(r)) return;
          }
          (n || (delete s[c].data, l(s[c]))) &&
            (a
              ? me.cleanData([e], !0)
              : me.support.deleteExpando || s != s.window
              ? delete s[c]
              : (s[c] = null));
        }
      }
    },
    _data: function (e, t, n) {
      return me.data(e, t, n, !0);
    },
    acceptData: function (e) {
      var t = e.nodeName && me.noData[e.nodeName.toLowerCase()];
      return !t || (!0 !== t && e.getAttribute("classid") === t);
    }
  }),
    me.fn.extend({
      data: function (n, e) {
        var r,
          i,
          t,
          o,
          a,
          s = this[0],
          c = 0,
          l = null;
        if (n !== T)
          return "object" == typeof n
            ? this.each(function () {
                me.data(this, n);
              })
            : (((r = n.split(".", 2))[1] = r[1] ? "." + r[1] : ""),
              (i = r[1] + "!"),
              me.access(
                this,
                function (t) {
                  if (t === T)
                    return (
                      (l = this.triggerHandler("getData" + i, [r[0]])) === T &&
                        s &&
                        ((l = me.data(s, n)), (l = u(s, n, l))),
                      l === T && r[1] ? this.data(r[0]) : l
                    );
                  (r[1] = t),
                    this.each(function () {
                      var e = me(this);
                      e.triggerHandler("setData" + i, r),
                        me.data(this, n, t),
                        e.triggerHandler("changeData" + i, r);
                    });
                },
                null,
                e,
                1 < arguments.length,
                null,
                !1
              ));
        if (
          this.length &&
          ((l = me.data(s)), 1 === s.nodeType && !me._data(s, "parsedAttrs"))
        ) {
          for (a = (t = s.attributes).length; c < a; c++)
            (o = t[c].name).indexOf("data-") ||
              ((o = me.camelCase(o.substring(5))), u(s, o, l[o]));
          me._data(s, "parsedAttrs", !0);
        }
        return l;
      },
      removeData: function (e) {
        return this.each(function () {
          me.removeData(this, e);
        });
      }
    }),
    me.extend({
      queue: function (e, t, n) {
        var r;
        if (e)
          return (
            (t = (t || "fx") + "queue"),
            (r = me._data(e, t)),
            n &&
              (!r || me.isArray(n)
                ? (r = me._data(e, t, me.makeArray(n)))
                : r.push(n)),
            r || []
          );
      },
      dequeue: function (e, t) {
        t = t || "fx";
        var n = me.queue(e, t),
          r = n.length,
          i = n.shift(),
          o = me._queueHooks(e, t);
        "inprogress" === i && ((i = n.shift()), r--),
          i &&
            ("fx" === t && n.unshift("inprogress"),
            delete o.stop,
            i.call(
              e,
              function () {
                me.dequeue(e, t);
              },
              o
            )),
          !r && o && o.empty.fire();
      },
      _queueHooks: function (e, t) {
        var n = t + "queueHooks";
        return (
          me._data(e, n) ||
          me._data(e, n, {
            empty: me.Callbacks("once memory").add(function () {
              me.removeData(e, t + "queue", !0), me.removeData(e, n, !0);
            })
          })
        );
      }
    }),
    me.fn.extend({
      queue: function (t, n) {
        var e = 2;
        return (
          "string" != typeof t && ((n = t), (t = "fx"), e--),
          arguments.length < e
            ? me.queue(this[0], t)
            : n === T
            ? this
            : this.each(function () {
                var e = me.queue(this, t, n);
                me._queueHooks(this, t),
                  "fx" === t && "inprogress" !== e[0] && me.dequeue(this, t);
              })
        );
      },
      dequeue: function (e) {
        return this.each(function () {
          me.dequeue(this, e);
        });
      },
      delay: function (r, e) {
        return (
          (r = (me.fx && me.fx.speeds[r]) || r),
          (e = e || "fx"),
          this.queue(e, function (e, t) {
            var n = setTimeout(e, r);
            t.stop = function () {
              clearTimeout(n);
            };
          })
        );
      },
      clearQueue: function (e) {
        return this.queue(e || "fx", []);
      },
      promise: function (e, t) {
        function n() {
          --i || o.resolveWith(a, [a]);
        }
        var r,
          i = 1,
          o = me.Deferred(),
          a = this,
          s = this.length;
        for ("string" != typeof e && ((t = e), (e = T)), e = e || "fx"; s--; )
          (r = me._data(a[s], e + "queueHooks")) &&
            r.empty &&
            (i++, r.empty.add(n));
        return n(), o.promise(t);
      }
    });
  var ce,
    le,
    ue,
    pe = /[\t\r\n]/g,
    de = /\r/g,
    fe = /^(?:button|input)$/i,
    he = /^(?:button|input|object|select|textarea)$/i,
    ge = /^a(?:rea|)$/i,
    ye = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
    ve = me.support.getSetAttribute;
  me.fn.extend({
    attr: function (e, t) {
      return me.access(this, me.attr, e, t, 1 < arguments.length);
    },
    removeAttr: function (e) {
      return this.each(function () {
        me.removeAttr(this, e);
      });
    },
    prop: function (e, t) {
      return me.access(this, me.prop, e, t, 1 < arguments.length);
    },
    removeProp: function (e) {
      return (
        (e = me.propFix[e] || e),
        this.each(function () {
          try {
            (this[e] = T), delete this[e];
          } catch (e) {}
        })
      );
    },
    addClass: function (t) {
      var e, n, r, i, o, a, s;
      if (me.isFunction(t))
        return this.each(function (e) {
          me(this).addClass(t.call(this, e, this.className));
        });
      if (t && "string" == typeof t)
        for (e = t.split(K), n = 0, r = this.length; n < r; n++)
          if (1 === (i = this[n]).nodeType)
            if (i.className || 1 !== e.length) {
              for (o = " " + i.className + " ", a = 0, s = e.length; a < s; a++)
                o.indexOf(" " + e[a] + " ") < 0 && (o += e[a] + " ");
              i.className = me.trim(o);
            } else i.className = t;
      return this;
    },
    removeClass: function (t) {
      var e, n, r, i, o, a, s;
      if (me.isFunction(t))
        return this.each(function (e) {
          me(this).removeClass(t.call(this, e, this.className));
        });
      if ((t && "string" == typeof t) || t === T)
        for (e = (t || "").split(K), a = 0, s = this.length; a < s; a++)
          if (1 === (r = this[a]).nodeType && r.className) {
            for (
              n = (" " + r.className + " ").replace(pe, " "),
                i = 0,
                o = e.length;
              i < o;
              i++
            )
              for (; 0 <= n.indexOf(" " + e[i] + " "); )
                n = n.replace(" " + e[i] + " ", " ");
            r.className = t ? me.trim(n) : "";
          }
      return this;
    },
    toggleClass: function (o, a) {
      var s = typeof o,
        c = "boolean" == typeof a;
      return me.isFunction(o)
        ? this.each(function (e) {
            me(this).toggleClass(o.call(this, e, this.className, a), a);
          })
        : this.each(function () {
            if ("string" == s)
              for (
                var e, t = 0, n = me(this), r = a, i = o.split(K);
                (e = i[t++]);

              )
                (r = c ? r : !n.hasClass(e)),
                  n[r ? "addClass" : "removeClass"](e);
            else
              ("undefined" != s && "boolean" != s) ||
                (this.className &&
                  me._data(this, "__className__", this.className),
                (this.className =
                  (!this.className &&
                    !1 !== o &&
                    me._data(this, "__className__")) ||
                  ""));
          });
    },
    hasClass: function (e) {
      for (var t = " " + e + " ", n = 0, r = this.length; n < r; n++)
        if (
          1 === this[n].nodeType &&
          0 <= (" " + this[n].className + " ").replace(pe, " ").indexOf(t)
        )
          return !0;
      return !1;
    },
    val: function (r) {
      var i,
        e,
        o,
        t = this[0];
      return arguments.length
        ? ((o = me.isFunction(r)),
          this.each(function (e) {
            var t,
              n = me(this);
            1 === this.nodeType &&
              (null == (t = o ? r.call(this, e, n.val()) : r)
                ? (t = "")
                : "number" == typeof t
                ? (t += "")
                : me.isArray(t) &&
                  (t = me.map(t, function (e) {
                    return null == e ? "" : e + "";
                  })),
              ((i =
                me.valHooks[this.type] ||
                me.valHooks[this.nodeName.toLowerCase()]) &&
                "set" in i &&
                i.set(this, t, "value") !== T) ||
                (this.value = t));
          }))
        : t
        ? (i = me.valHooks[t.type] || me.valHooks[t.nodeName.toLowerCase()]) &&
          "get" in i &&
          (e = i.get(t, "value")) !== T
          ? e
          : "string" == typeof (e = t.value)
          ? e.replace(de, "")
          : null == e
          ? ""
          : e
        : void 0;
    }
  }),
    me.extend({
      valHooks: {
        option: {
          get: function (e) {
            var t = e.attributes.value;
            return !t || t.specified ? e.value : e.text;
          }
        },
        select: {
          get: function (e) {
            for (
              var t,
                n,
                r = e.options,
                i = e.selectedIndex,
                o = "select-one" === e.type || i < 0,
                a = o ? null : [],
                s = o ? i + 1 : r.length,
                c = i < 0 ? s : o ? i : 0;
              c < s;
              c++
            )
              if (
                ((n = r[c]).selected || c === i) &&
                (me.support.optDisabled
                  ? !n.disabled
                  : null === n.getAttribute("disabled")) &&
                (!n.parentNode.disabled ||
                  !me.nodeName(n.parentNode, "optgroup"))
              ) {
                if (((t = me(n).val()), o)) return t;
                a.push(t);
              }
            return a;
          },
          set: function (e, t) {
            var n = me.makeArray(t);
            return (
              me(e)
                .find("option")
                .each(function () {
                  this.selected = 0 <= me.inArray(me(this).val(), n);
                }),
              n.length || (e.selectedIndex = -1),
              n
            );
          }
        }
      },
      attrFn: {},
      attr: function (e, t, n, r) {
        var i,
          o,
          a,
          s = e.nodeType;
        if (e && 3 !== s && 8 !== s && 2 !== s)
          return r && me.isFunction(me.fn[t])
            ? me(e)[t](n)
            : void 0 === e.getAttribute
            ? me.prop(e, t, n)
            : ((a = 1 !== s || !me.isXMLDoc(e)) &&
                ((t = t.toLowerCase()),
                (o = me.attrHooks[t] || (ye.test(t) ? le : ce))),
              n !== T
                ? null === n
                  ? void me.removeAttr(e, t)
                  : o && "set" in o && a && (i = o.set(e, n, t)) !== T
                  ? i
                  : (e.setAttribute(t, n + ""), n)
                : o && "get" in o && a && null !== (i = o.get(e, t))
                ? i
                : null === (i = e.getAttribute(t))
                ? T
                : i);
      },
      removeAttr: function (e, t) {
        var n,
          r,
          i,
          o,
          a = 0;
        if (t && 1 === e.nodeType)
          for (r = t.split(K); a < r.length; a++)
            (i = r[a]) &&
              ((n = me.propFix[i] || i),
              (o = ye.test(i)) || me.attr(e, i, ""),
              e.removeAttribute(ve ? i : n),
              o && n in e && (e[n] = !1));
      },
      attrHooks: {
        type: {
          set: function (e, t) {
            if (fe.test(e.nodeName) && e.parentNode)
              me.error("type property can't be changed");
            else if (
              !me.support.radioValue &&
              "radio" === t &&
              me.nodeName(e, "input")
            ) {
              var n = e.value;
              return e.setAttribute("type", t), n && (e.value = n), t;
            }
          }
        },
        value: {
          get: function (e, t) {
            return ce && me.nodeName(e, "button")
              ? ce.get(e, t)
              : t in e
              ? e.value
              : null;
          },
          set: function (e, t, n) {
            if (ce && me.nodeName(e, "button")) return ce.set(e, t, n);
            e.value = t;
          }
        }
      },
      propFix: {
        tabindex: "tabIndex",
        readonly: "readOnly",
        for: "htmlFor",
        class: "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
      },
      prop: function (e, t, n) {
        var r,
          i,
          o = e.nodeType;
        if (e && 3 !== o && 8 !== o && 2 !== o)
          return (
            (1 !== o || !me.isXMLDoc(e)) &&
              ((t = me.propFix[t] || t), (i = me.propHooks[t])),
            n !== T
              ? i && "set" in i && (r = i.set(e, n, t)) !== T
                ? r
                : (e[t] = n)
              : i && "get" in i && null !== (r = i.get(e, t))
              ? r
              : e[t]
          );
      },
      propHooks: {
        tabIndex: {
          get: function (e) {
            var t = e.getAttributeNode("tabindex");
            return t && t.specified
              ? parseInt(t.value, 10)
              : he.test(e.nodeName) || (ge.test(e.nodeName) && e.href)
              ? 0
              : T;
          }
        }
      }
    }),
    (le = {
      get: function (e, t) {
        var n,
          r = me.prop(e, t);
        return !0 === r ||
          ("boolean" != typeof r &&
            (n = e.getAttributeNode(t)) &&
            !1 !== n.nodeValue)
          ? t.toLowerCase()
          : T;
      },
      set: function (e, t, n) {
        var r;
        return (
          !1 === t
            ? me.removeAttr(e, n)
            : ((r = me.propFix[n] || n) in e && (e[r] = !0),
              e.setAttribute(n, n.toLowerCase())),
          n
        );
      }
    }),
    ve ||
      ((ue = { name: !0, id: !0, coords: !0 }),
      (ce = me.valHooks.button = {
        get: function (e, t) {
          var n;
          return (n = e.getAttributeNode(t)) &&
            (ue[t] ? "" !== n.value : n.specified)
            ? n.value
            : T;
        },
        set: function (e, t, n) {
          var r = e.getAttributeNode(n);
          return (
            r || ((r = _.createAttribute(n)), e.setAttributeNode(r)),
            (r.value = t + "")
          );
        }
      }),
      me.each(["width", "height"], function (e, n) {
        me.attrHooks[n] = me.extend(me.attrHooks[n], {
          set: function (e, t) {
            if ("" === t) return e.setAttribute(n, "auto"), t;
          }
        });
      }),
      (me.attrHooks.contenteditable = {
        get: ce.get,
        set: function (e, t, n) {
          "" === t && (t = "false"), ce.set(e, t, n);
        }
      })),
    me.support.hrefNormalized ||
      me.each(["href", "src", "width", "height"], function (e, n) {
        me.attrHooks[n] = me.extend(me.attrHooks[n], {
          get: function (e) {
            var t = e.getAttribute(n, 2);
            return null === t ? T : t;
          }
        });
      }),
    me.support.style ||
      (me.attrHooks.style = {
        get: function (e) {
          return e.style.cssText.toLowerCase() || T;
        },
        set: function (e, t) {
          return (e.style.cssText = t + "");
        }
      }),
    me.support.optSelected ||
      (me.propHooks.selected = me.extend(me.propHooks.selected, {
        get: function (e) {
          var t = e.parentNode;
          return (
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex),
            null
          );
        }
      })),
    me.support.enctype || (me.propFix.enctype = "encoding"),
    me.support.checkOn ||
      me.each(["radio", "checkbox"], function () {
        me.valHooks[this] = {
          get: function (e) {
            return null === e.getAttribute("value") ? "on" : e.value;
          }
        };
      }),
    me.each(["radio", "checkbox"], function () {
      me.valHooks[this] = me.extend(me.valHooks[this], {
        set: function (e, t) {
          if (me.isArray(t))
            return (e.checked = 0 <= me.inArray(me(e).val(), t));
        }
      });
    });
  function be(e) {
    return me.event.special.hover
      ? e
      : e.replace(ke, "mouseenter$1 mouseleave$1");
  }
  var xe = /^(?:textarea|input|select)$/i,
    Ce = /^([^\.]*|)(?:\.(.+)|)$/,
    ke = /(?:^|\s)hover(\.\S+|)\b/,
    we = /^key/,
    Te = /^(?:mouse|contextmenu)|click/,
    Ne = /^(?:focusinfocus|focusoutblur)$/;
  (me.event = {
    add: function (e, t, n, r, i) {
      var o, a, s, c, l, u, p, d, f, h, g;
      if (3 !== e.nodeType && 8 !== e.nodeType && t && n && (o = me._data(e))) {
        for (
          n.handler && ((n = (f = n).handler), (i = f.selector)),
            n.guid || (n.guid = me.guid++),
            (s = o.events) || (o.events = s = {}),
            (a = o.handle) ||
              ((o.handle = a = function (e) {
                return void 0 === me || (e && me.event.triggered === e.type)
                  ? T
                  : me.event.dispatch.apply(a.elem, arguments);
              }),
              (a.elem = e)),
            t = me.trim(be(t)).split(" "),
            c = 0;
          c < t.length;
          c++
        )
          (u = (l = Ce.exec(t[c]) || [])[1]),
            (p = (l[2] || "").split(".").sort()),
            (g = me.event.special[u] || {}),
            (u = (i ? g.delegateType : g.bindType) || u),
            (g = me.event.special[u] || {}),
            (d = me.extend(
              {
                type: u,
                origType: l[1],
                data: r,
                handler: n,
                guid: n.guid,
                selector: i,
                needsContext: i && me.expr.match.needsContext.test(i),
                namespace: p.join(".")
              },
              f
            )),
            (h = s[u]) ||
              (((h = s[u] = []).delegateCount = 0),
              (g.setup && !1 !== g.setup.call(e, r, p, a)) ||
                (e.addEventListener
                  ? e.addEventListener(u, a, !1)
                  : e.attachEvent && e.attachEvent("on" + u, a))),
            g.add &&
              (g.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)),
            i ? h.splice(h.delegateCount++, 0, d) : h.push(d),
            (me.event.global[u] = !0);
        e = null;
      }
    },
    global: {},
    remove: function (e, t, n, r, i) {
      var o,
        a,
        s,
        c,
        l,
        u,
        p,
        d,
        f,
        h,
        g,
        m = me.hasData(e) && me._data(e);
      if (m && (d = m.events)) {
        for (t = me.trim(be(t || "")).split(" "), o = 0; o < t.length; o++)
          if (((s = c = (a = Ce.exec(t[o]) || [])[1]), (l = a[2]), s)) {
            for (
              f = me.event.special[s] || {},
                u = (h = d[(s = (r ? f.delegateType : f.bindType) || s)] || [])
                  .length,
                l = l
                  ? new RegExp(
                      "(^|\\.)" +
                        l.split(".").sort().join("\\.(?:.*\\.|)") +
                        "(\\.|$)"
                    )
                  : null,
                p = 0;
              p < h.length;
              p++
            )
              (g = h[p]),
                (!i && c !== g.origType) ||
                  (n && n.guid !== g.guid) ||
                  (l && !l.test(g.namespace)) ||
                  (r && r !== g.selector && ("**" !== r || !g.selector)) ||
                  (h.splice(p--, 1),
                  g.selector && h.delegateCount--,
                  f.remove && f.remove.call(e, g));
            0 === h.length &&
              u !== h.length &&
              ((f.teardown && !1 !== f.teardown.call(e, l, m.handle)) ||
                me.removeEvent(e, s, m.handle),
              delete d[s]);
          } else for (s in d) me.event.remove(e, s + t[o], n, r, !0);
        me.isEmptyObject(d) &&
          (delete m.handle, me.removeData(e, "events", !0));
      }
    },
    customEvent: { getData: !0, setData: !0, changeData: !0 },
    trigger: function (e, t, n, r) {
      if (!n || (3 !== n.nodeType && 8 !== n.nodeType)) {
        var i,
          o,
          a,
          s,
          c,
          l,
          u,
          p,
          d,
          f,
          h = e.type || e,
          g = [];
        if (Ne.test(h + me.event.triggered)) return;
        if (
          (0 <= h.indexOf("!") && ((h = h.slice(0, -1)), (o = !0)),
          0 <= h.indexOf(".") && ((h = (g = h.split(".")).shift()), g.sort()),
          (!n || me.event.customEvent[h]) && !me.event.global[h])
        )
          return;
        if (
          (((e =
            "object" == typeof e
              ? e[me.expando]
                ? e
                : new me.Event(h, e)
              : new me.Event(h)).type = h),
          (e.isTrigger = !0),
          (e.exclusive = o),
          (e.namespace = g.join(".")),
          (e.namespace_re = e.namespace
            ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)")
            : null),
          (l = h.indexOf(":") < 0 ? "on" + h : ""),
          !n)
        ) {
          for (a in (i = me.cache))
            i[a].events &&
              i[a].events[h] &&
              me.event.trigger(e, t, i[a].handle.elem, !0);
          return;
        }
        if (
          ((e.result = T),
          e.target || (e.target = n),
          (t = null != t ? me.makeArray(t) : []).unshift(e),
          (u = me.event.special[h] || {}).trigger &&
            !1 === u.trigger.apply(n, t))
        )
          return;
        if (
          ((d = [[n, u.bindType || h]]), !r && !u.noBubble && !me.isWindow(n))
        ) {
          for (
            f = u.delegateType || h,
              s = Ne.test(f + h) ? n : n.parentNode,
              c = n;
            s;
            s = s.parentNode
          )
            d.push([s, f]), (c = s);
          c === (n.ownerDocument || _) &&
            d.push([c.defaultView || c.parentWindow || m, f]);
        }
        for (a = 0; a < d.length && !e.isPropagationStopped(); a++)
          (s = d[a][0]),
            (e.type = d[a][1]),
            (p =
              (me._data(s, "events") || {})[e.type] && me._data(s, "handle")) &&
              p.apply(s, t),
            (p = l && s[l]) &&
              me.acceptData(s) &&
              p.apply &&
              !1 === p.apply(s, t) &&
              e.preventDefault();
        return (
          (e.type = h),
          r ||
            e.isDefaultPrevented() ||
            (u._default && !1 !== u._default.apply(n.ownerDocument, t)) ||
            ("click" === h && me.nodeName(n, "a")) ||
            !me.acceptData(n) ||
            !l ||
            !n[h] ||
            (("focus" === h || "blur" === h) && 0 === e.target.offsetWidth) ||
            me.isWindow(n) ||
            ((c = n[l]) && (n[l] = null),
            n[(me.event.triggered = h)](),
            (me.event.triggered = T),
            c && (n[l] = c)),
          e.result
        );
      }
    },
    dispatch: function (e) {
      e = me.event.fix(e || m.event);
      var t,
        n,
        r,
        i,
        o,
        a,
        s,
        c,
        l,
        u = (me._data(this, "events") || {})[e.type] || [],
        p = u.delegateCount,
        d = q.call(arguments),
        f = !e.exclusive && !e.namespace,
        h = me.event.special[e.type] || {},
        g = [];
      if (
        (((d[0] = e).delegateTarget = this),
        !h.preDispatch || !1 !== h.preDispatch.call(this, e))
      ) {
        if (p && (!e.button || "click" !== e.type))
          for (r = e.target; r != this; r = r.parentNode || this)
            if (!0 !== r.disabled || "click" !== e.type) {
              for (o = {}, s = [], t = 0; t < p; t++)
                o[(l = (c = u[t]).selector)] === T &&
                  (o[l] = c.needsContext
                    ? 0 <= me(l, this).index(r)
                    : me.find(l, this, null, [r]).length),
                  o[l] && s.push(c);
              s.length && g.push({ elem: r, matches: s });
            }
        for (
          u.length > p && g.push({ elem: this, matches: u.slice(p) }), t = 0;
          t < g.length && !e.isPropagationStopped();
          t++
        )
          for (
            a = g[t], e.currentTarget = a.elem, n = 0;
            n < a.matches.length && !e.isImmediatePropagationStopped();
            n++
          )
            (c = a.matches[n]),
              (f ||
                (!e.namespace && !c.namespace) ||
                (e.namespace_re && e.namespace_re.test(c.namespace))) &&
                ((e.data = c.data),
                (e.handleObj = c),
                (i = (
                  (me.event.special[c.origType] || {}).handle || c.handler
                ).apply(a.elem, d)) !== T &&
                  !1 === (e.result = i) &&
                  (e.preventDefault(), e.stopPropagation()));
        return h.postDispatch && h.postDispatch.call(this, e), e.result;
      }
    },
    props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
      " "
    ),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function (e, t) {
        return (
          null == e.which &&
            (e.which = null != t.charCode ? t.charCode : t.keyCode),
          e
        );
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
        " "
      ),
      filter: function (e, t) {
        var n,
          r,
          i,
          o = t.button,
          a = t.fromElement;
        return (
          null == e.pageX &&
            null != t.clientX &&
            ((r = (n = e.target.ownerDocument || _).documentElement),
            (i = n.body),
            (e.pageX =
              t.clientX +
              ((r && r.scrollLeft) || (i && i.scrollLeft) || 0) -
              ((r && r.clientLeft) || (i && i.clientLeft) || 0)),
            (e.pageY =
              t.clientY +
              ((r && r.scrollTop) || (i && i.scrollTop) || 0) -
              ((r && r.clientTop) || (i && i.clientTop) || 0))),
          !e.relatedTarget &&
            a &&
            (e.relatedTarget = a === e.target ? t.toElement : a),
          e.which ||
            o === T ||
            (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0),
          e
        );
      }
    },
    fix: function (e) {
      if (e[me.expando]) return e;
      var t,
        n,
        r = e,
        i = me.event.fixHooks[e.type] || {},
        o = i.props ? this.props.concat(i.props) : this.props;
      for (e = me.Event(r), t = o.length; t; ) e[(n = o[--t])] = r[n];
      return (
        e.target || (e.target = r.srcElement || _),
        3 === e.target.nodeType && (e.target = e.target.parentNode),
        (e.metaKey = !!e.metaKey),
        i.filter ? i.filter(e, r) : e
      );
    },
    special: {
      load: { noBubble: !0 },
      focus: { delegateType: "focusin" },
      blur: { delegateType: "focusout" },
      beforeunload: {
        setup: function (e, t, n) {
          me.isWindow(this) && (this.onbeforeunload = n);
        },
        teardown: function (e, t) {
          this.onbeforeunload === t && (this.onbeforeunload = null);
        }
      }
    },
    simulate: function (e, t, n, r) {
      var i = me.extend(new me.Event(), n, {
        type: e,
        isSimulated: !0,
        originalEvent: {}
      });
      r ? me.event.trigger(i, null, t) : me.event.dispatch.call(t, i),
        i.isDefaultPrevented() && n.preventDefault();
    }
  }),
    (me.event.handle = me.event.dispatch),
    (me.removeEvent = _.removeEventListener
      ? function (e, t, n) {
          e.removeEventListener && e.removeEventListener(t, n, !1);
        }
      : function (e, t, n) {
          var r = "on" + t;
          e.detachEvent &&
            (void 0 === e[r] && (e[r] = null), e.detachEvent(r, n));
        }),
    (me.Event = function (e, t) {
      if (!(this instanceof me.Event)) return new me.Event(e, t);
      e && e.type
        ? ((this.originalEvent = e),
          (this.type = e.type),
          (this.isDefaultPrevented =
            e.defaultPrevented ||
            !1 === e.returnValue ||
            (e.getPreventDefault && e.getPreventDefault())
              ? n
              : s))
        : (this.type = e),
        t && me.extend(this, t),
        (this.timeStamp = (e && e.timeStamp) || me.now()),
        (this[me.expando] = !0);
    }),
    (me.Event.prototype = {
      preventDefault: function () {
        this.isDefaultPrevented = n;
        var e = this.originalEvent;
        e && (e.preventDefault ? e.preventDefault() : (e.returnValue = !1));
      },
      stopPropagation: function () {
        this.isPropagationStopped = n;
        var e = this.originalEvent;
        e && (e.stopPropagation && e.stopPropagation(), (e.cancelBubble = !0));
      },
      stopImmediatePropagation: function () {
        (this.isImmediatePropagationStopped = n), this.stopPropagation();
      },
      isDefaultPrevented: s,
      isPropagationStopped: s,
      isImmediatePropagationStopped: s
    }),
    me.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (
      e,
      i
    ) {
      me.event.special[e] = {
        delegateType: i,
        bindType: i,
        handle: function (e) {
          var t,
            n = e.relatedTarget,
            r = e.handleObj;
          r.selector;
          return (
            (n && (n === this || me.contains(this, n))) ||
              ((e.type = r.origType),
              (t = r.handler.apply(this, arguments)),
              (e.type = i)),
            t
          );
        }
      };
    }),
    me.support.submitBubbles ||
      (me.event.special.submit = {
        setup: function () {
          if (me.nodeName(this, "form")) return !1;
          me.event.add(this, "click._submit keypress._submit", function (e) {
            var t = e.target,
              n =
                me.nodeName(t, "input") || me.nodeName(t, "button")
                  ? t.form
                  : T;
            n &&
              !me._data(n, "_submit_attached") &&
              (me.event.add(n, "submit._submit", function (e) {
                e._submit_bubble = !0;
              }),
              me._data(n, "_submit_attached", !0));
          });
        },
        postDispatch: function (e) {
          e._submit_bubble &&
            (delete e._submit_bubble,
            this.parentNode &&
              !e.isTrigger &&
              me.event.simulate("submit", this.parentNode, e, !0));
        },
        teardown: function () {
          if (me.nodeName(this, "form")) return !1;
          me.event.remove(this, "._submit");
        }
      }),
    me.support.changeBubbles ||
      (me.event.special.change = {
        setup: function () {
          if (xe.test(this.nodeName))
            return (
              ("checkbox" !== this.type && "radio" !== this.type) ||
                (me.event.add(this, "propertychange._change", function (e) {
                  "checked" === e.originalEvent.propertyName &&
                    (this._just_changed = !0);
                }),
                me.event.add(this, "click._change", function (e) {
                  this._just_changed &&
                    !e.isTrigger &&
                    (this._just_changed = !1),
                    me.event.simulate("change", this, e, !0);
                })),
              !1
            );
          me.event.add(this, "beforeactivate._change", function (e) {
            var t = e.target;
            xe.test(t.nodeName) &&
              !me._data(t, "_change_attached") &&
              (me.event.add(t, "change._change", function (e) {
                !this.parentNode ||
                  e.isSimulated ||
                  e.isTrigger ||
                  me.event.simulate("change", this.parentNode, e, !0);
              }),
              me._data(t, "_change_attached", !0));
          });
        },
        handle: function (e) {
          var t = e.target;
          if (
            this !== t ||
            e.isSimulated ||
            e.isTrigger ||
            ("radio" !== t.type && "checkbox" !== t.type)
          )
            return e.handleObj.handler.apply(this, arguments);
        },
        teardown: function () {
          return me.event.remove(this, "._change"), !xe.test(this.nodeName);
        }
      }),
    me.support.focusinBubbles ||
      me.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
        function n(e) {
          me.event.simulate(t, e.target, me.event.fix(e), !0);
        }
        var r = 0;
        me.event.special[t] = {
          setup: function () {
            0 == r++ && _.addEventListener(e, n, !0);
          },
          teardown: function () {
            0 == --r && _.removeEventListener(e, n, !0);
          }
        };
      }),
    me.fn.extend({
      on: function (e, t, n, r, i) {
        var o, a;
        if ("object" == typeof e) {
          for (a in ("string" != typeof t && ((n = n || t), (t = T)), e))
            this.on(a, t, n, e[a], i);
          return this;
        }
        if (
          (null == n && null == r
            ? ((r = t), (n = t = T))
            : null == r &&
              ("string" == typeof t
                ? ((r = n), (n = T))
                : ((r = n), (n = t), (t = T))),
          !1 === r)
        )
          r = s;
        else if (!r) return this;
        return (
          1 === i &&
            ((o = r),
            ((r = function (e) {
              return me().off(e), o.apply(this, arguments);
            }).guid = o.guid || (o.guid = me.guid++))),
          this.each(function () {
            me.event.add(this, e, r, n, t);
          })
        );
      },
      one: function (e, t, n, r) {
        return this.on(e, t, n, r, 1);
      },
      off: function (e, t, n) {
        var r, i;
        if (e && e.preventDefault && e.handleObj)
          return (
            (r = e.handleObj),
            me(e.delegateTarget).off(
              r.namespace ? r.origType + "." + r.namespace : r.origType,
              r.selector,
              r.handler
            ),
            this
          );
        if ("object" != typeof e)
          return (
            (!1 !== t && "function" != typeof t) || ((n = t), (t = T)),
            !1 === n && (n = s),
            this.each(function () {
              me.event.remove(this, e, n, t);
            })
          );
        for (i in e) this.off(i, t, e[i]);
        return this;
      },
      bind: function (e, t, n) {
        return this.on(e, null, t, n);
      },
      unbind: function (e, t) {
        return this.off(e, null, t);
      },
      live: function (e, t, n) {
        return me(this.context).on(e, this.selector, t, n), this;
      },
      die: function (e, t) {
        return me(this.context).off(e, this.selector || "**", t), this;
      },
      delegate: function (e, t, n, r) {
        return this.on(t, e, n, r);
      },
      undelegate: function (e, t, n) {
        return 1 === arguments.length
          ? this.off(e, "**")
          : this.off(t, e || "**", n);
      },
      trigger: function (e, t) {
        return this.each(function () {
          me.event.trigger(e, t, this);
        });
      },
      triggerHandler: function (e, t) {
        if (this[0]) return me.event.trigger(e, t, this[0], !0);
      },
      toggle: function (n) {
        function e(e) {
          var t = (me._data(this, "lastToggle" + n.guid) || 0) % i;
          return (
            me._data(this, "lastToggle" + n.guid, 1 + t),
            e.preventDefault(),
            r[t].apply(this, arguments) || !1
          );
        }
        var r = arguments,
          t = n.guid || me.guid++,
          i = 0;
        for (e.guid = t; i < r.length; ) r[i++].guid = t;
        return this.click(e);
      },
      hover: function (e, t) {
        return this.mouseenter(e).mouseleave(t || e);
      }
    }),
    me.each(
      "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
        " "
      ),
      function (e, n) {
        (me.fn[n] = function (e, t) {
          return (
            null == t && ((t = e), (e = null)),
            0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
          );
        }),
          we.test(n) && (me.event.fixHooks[n] = me.event.keyHooks),
          Te.test(n) && (me.event.fixHooks[n] = me.event.mouseHooks);
      }
    ),
    (function (e) {
      function C(e, t, n, r) {
        n = n || [];
        var i,
          o,
          a,
          s,
          c = (t = t || M).nodeType;
        if (!e || "string" != typeof e) return n;
        if (1 !== c && 9 !== c) return [];
        if (!(a = g(t)) && !r && (i = oe.exec(e)))
          if ((s = i[1])) {
            if (9 === c) {
              if (!(o = t.getElementById(s)) || !o.parentNode) return n;
              if (o.id === s) return n.push(o), n;
            } else if (
              t.ownerDocument &&
              (o = t.ownerDocument.getElementById(s)) &&
              m(t, o) &&
              o.id === s
            )
              return n.push(o), n;
          } else {
            if (i[2])
              return R.apply(n, W.call(t.getElementsByTagName(e), 0)), n;
            if ((s = i[3]) && he && t.getElementsByClassName)
              return R.apply(n, W.call(t.getElementsByClassName(s), 0)), n;
          }
        return l(e.replace(te, "$1"), t, n, r, a);
      }
      function t(t) {
        return function (e) {
          return "input" === e.nodeName.toLowerCase() && e.type === t;
        };
      }
      function n(n) {
        return function (e) {
          var t = e.nodeName.toLowerCase();
          return ("input" === t || "button" === t) && e.type === n;
        };
      }
      function r(a) {
        return X(function (o) {
          return (
            (o = +o),
            X(function (e, t) {
              for (var n, r = a([], e.length, o), i = r.length; i--; )
                e[(n = r[i])] && (e[n] = !(t[n] = e[n]));
            })
          );
        });
      }
      function u(e, t, n) {
        if (e === t) return n;
        for (var r = e.nextSibling; r; ) {
          if (r === t) return -1;
          r = r.nextSibling;
        }
        return 1;
      }
      function p(e, t) {
        var n,
          r,
          i,
          o,
          a,
          s,
          c,
          l = K[B][e + " "];
        if (l) return t ? 0 : l.slice(0);
        for (a = e, s = [], c = T.preFilter; a; ) {
          for (o in ((n && !(r = ne.exec(a))) ||
            (r && (a = a.slice(r[0].length) || a), s.push((i = []))),
          (n = !1),
          (r = re.exec(a)) &&
            (i.push((n = new F(r.shift()))),
            (a = a.slice(n.length)),
            (n.type = r[0].replace(te, " "))),
          T.filter))
            !(r = ue[o].exec(a)) ||
              (c[o] && !(r = c[o](r))) ||
              (i.push((n = new F(r.shift()))),
              (a = a.slice(n.length)),
              (n.type = o),
              (n.matches = r));
          if (!n) break;
        }
        return t ? a.length : a ? C.error(e) : K(e, s).slice(0);
      }
      function d(a, e, t) {
        var s = e.dir,
          c = t && "parentNode" === e.dir,
          l = q++;
        return e.first
          ? function (e, t, n) {
              for (; (e = e[s]); ) if (c || 1 === e.nodeType) return a(e, t, n);
            }
          : function (e, t, n) {
              if (n) {
                for (; (e = e[s]); )
                  if ((c || 1 === e.nodeType) && a(e, t, n)) return e;
              } else
                for (var r, i = O + " " + l + " ", o = i + w; (e = e[s]); )
                  if (c || 1 === e.nodeType) {
                    if ((r = e[B]) === o) return e.sizset;
                    if ("string" == typeof r && 0 === r.indexOf(i)) {
                      if (e.sizset) return e;
                    } else {
                      if (((e[B] = o), a(e, t, n))) return (e.sizset = !0), e;
                      e.sizset = !1;
                    }
                  }
            };
      }
      function f(i) {
        return 1 < i.length
          ? function (e, t, n) {
              for (var r = i.length; r--; ) if (!i[r](e, t, n)) return !1;
              return !0;
            }
          : i[0];
      }
      function k(e, t, n, r, i) {
        for (var o, a = [], s = 0, c = e.length, l = null != t; s < c; s++)
          (o = e[s]) && ((n && !n(o, r, i)) || (a.push(o), l && t.push(s)));
        return a;
      }
      function v(f, h, g, m, y, e) {
        return (
          m && !m[B] && (m = v(m)),
          y && !y[B] && (y = v(y, e)),
          X(function (e, t, n, r) {
            var i,
              o,
              a,
              s = [],
              c = [],
              l = t.length,
              u =
                e ||
                (function (e, t, n) {
                  for (var r = 0, i = t.length; r < i; r++) C(e, t[r], n);
                  return n;
                })(h || "*", n.nodeType ? [n] : n, []),
              p = !f || (!e && h) ? u : k(u, s, f, n, r),
              d = g ? (y || (e ? f : l || m) ? [] : t) : p;
            if ((g && g(p, d, n, r), m))
              for (i = k(d, c), m(i, [], n, r), o = i.length; o--; )
                (a = i[o]) && (d[c[o]] = !(p[c[o]] = a));
            if (e) {
              if (y || f) {
                if (y) {
                  for (i = [], o = d.length; o--; )
                    (a = d[o]) && i.push((p[o] = a));
                  y(null, (d = []), i, r);
                }
                for (o = d.length; o--; )
                  (a = d[o]) &&
                    -1 < (i = y ? z.call(e, a) : s[o]) &&
                    (e[i] = !(t[i] = a));
              }
            } else (d = k(d === t ? d.splice(l, d.length) : d)), y ? y(null, t, d, r) : R.apply(t, d);
          })
        );
      }
      function h(e) {
        for (
          var r,
            t,
            n,
            i = e.length,
            o = T.relative[e[0].type],
            a = o || T.relative[" "],
            s = o ? 1 : 0,
            c = d(
              function (e) {
                return e === r;
              },
              a,
              !0
            ),
            l = d(
              function (e) {
                return -1 < z.call(r, e);
              },
              a,
              !0
            ),
            u = [
              function (e, t, n) {
                return (
                  (!o && (n || t !== N)) || ((r = t).nodeType ? c : l)(e, t, n)
                );
              }
            ];
          s < i;
          s++
        )
          if ((t = T.relative[e[s].type])) u = [d(f(u), t)];
          else {
            if ((t = T.filter[e[s].type].apply(null, e[s].matches))[B]) {
              for (n = ++s; n < i && !T.relative[e[n].type]; n++);
              return v(
                1 < s && f(u),
                1 < s &&
                  e
                    .slice(0, s - 1)
                    .join("")
                    .replace(te, "$1"),
                t,
                s < n && h(e.slice(s, n)),
                n < i && h((e = e.slice(n))),
                n < i && e.join("")
              );
            }
            u.push(t);
          }
        return f(u);
      }
      function l(e, t, n, r, i) {
        var o,
          a,
          s,
          c,
          l,
          u = p(e);
        u.length;
        if (!r && 1 === u.length) {
          if (
            2 < (a = u[0] = u[0].slice(0)).length &&
            "ID" === (s = a[0]).type &&
            9 === t.nodeType &&
            !i &&
            T.relative[a[1].type]
          ) {
            if (!(t = T.find.ID(s.matches[0].replace(le, ""), t, i)[0]))
              return n;
            e = e.slice(a.shift().length);
          }
          for (
            o = ue.POS.test(e) ? -1 : a.length - 1;
            0 <= o && ((s = a[o]), !T.relative[(c = s.type)]);
            o--
          )
            if (
              (l = T.find[c]) &&
              (r = l(
                s.matches[0].replace(le, ""),
                (ae.test(a[0].type) && t.parentNode) || t,
                i
              ))
            ) {
              if ((a.splice(o, 1), !(e = r.length && a.join(""))))
                return R.apply(n, W.call(r, 0)), n;
              break;
            }
        }
        return y(e, u)(r, t, i, n, ae.test(e)), n;
      }
      function i() {}
      function o() {
        var n = {},
          r = [];
        return X(function (e, t) {
          return (
            r.push(e) > T.cacheLength && delete n[r.shift()], (n[e + " "] = t)
          );
        }, n);
      }
      function a(e) {
        var t = M.createElement("div");
        try {
          return e(t);
        } catch (e) {
          return !1;
        } finally {
          t = null;
        }
      }
      var w,
        s,
        T,
        c,
        g,
        m,
        y,
        b,
        x,
        N,
        E,
        S,
        I,
        A,
        L,
        j,
        D,
        H,
        _ = "undefined",
        B = ("sizcache" + Math.random()).replace(".", ""),
        F = String,
        M = e.document,
        $ = M.documentElement,
        O = 0,
        q = 0,
        P = [].pop,
        R = [].push,
        W = [].slice,
        z =
          [].indexOf ||
          function (e) {
            for (var t = 0, n = this.length; t < n; t++)
              if (this[t] === e) return t;
            return -1;
          },
        X = function (e, t) {
          return (e[B] = null == t || t), e;
        },
        V = o(),
        K = o(),
        U = o(),
        Y = "[\\x20\\t\\r\\n\\f]",
        J = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
        G = J.replace("w", "w#"),
        Q =
          "\\[" +
          Y +
          "*(" +
          J +
          ")" +
          Y +
          "*(?:([*^$|!~]?=)" +
          Y +
          "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" +
          G +
          ")|)|)" +
          Y +
          "*\\]",
        Z =
          ":(" +
          J +
          ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" +
          Q +
          ")|[^:]|\\\\.)*|.*))\\)|)",
        ee =
          ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
          Y +
          "*((?:-\\d)?\\d*)" +
          Y +
          "*\\)|)(?=[^-]|$)",
        te = new RegExp(
          "^" + Y + "+|((?:^|[^\\\\])(?:\\\\.)*)" + Y + "+$",
          "g"
        ),
        ne = new RegExp("^" + Y + "*," + Y + "*"),
        re = new RegExp("^" + Y + "*([\\x20\\t\\r\\n\\f>+~])" + Y + "*"),
        ie = new RegExp(Z),
        oe = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
        ae = /[\x20\t\r\n\f]*[+~]/,
        se = /h\d/i,
        ce = /input|select|textarea|button/i,
        le = /\\(?!\\)/g,
        ue = {
          ID: new RegExp("^#(" + J + ")"),
          CLASS: new RegExp("^\\.(" + J + ")"),
          NAME: new RegExp("^\\[name=['\"]?(" + J + ")['\"]?\\]"),
          TAG: new RegExp("^(" + J.replace("w", "w*") + ")"),
          ATTR: new RegExp("^" + Q),
          PSEUDO: new RegExp("^" + Z),
          POS: new RegExp(ee, "i"),
          CHILD: new RegExp(
            "^:(only|nth|first|last)-child(?:\\(" +
              Y +
              "*(even|odd|(([+-]|)(\\d*)n|)" +
              Y +
              "*(?:([+-]|)" +
              Y +
              "*(\\d+)|))" +
              Y +
              "*\\)|)",
            "i"
          ),
          needsContext: new RegExp("^" + Y + "*[>+~]|" + ee, "i")
        },
        pe = a(function (e) {
          return (
            e.appendChild(M.createComment("")),
            !e.getElementsByTagName("*").length
          );
        }),
        de = a(function (e) {
          return (
            (e.innerHTML = "<a href='#'></a>"),
            e.firstChild &&
              typeof e.firstChild.getAttribute != _ &&
              "#" === e.firstChild.getAttribute("href")
          );
        }),
        fe = a(function (e) {
          e.innerHTML = "<select></select>";
          var t = typeof e.lastChild.getAttribute("multiple");
          return "boolean" != t && "string" != t;
        }),
        he = a(function (e) {
          return (
            (e.innerHTML =
              "<div class='hidden e'></div><div class='hidden'></div>"),
            !(
              !e.getElementsByClassName || !e.getElementsByClassName("e").length
            ) &&
              ((e.lastChild.className = "e"),
              2 === e.getElementsByClassName("e").length)
          );
        }),
        ge = a(function (e) {
          (e.id = B + 0),
            (e.innerHTML =
              "<a name='" + B + "'></a><div name='" + B + "'></div>"),
            $.insertBefore(e, $.firstChild);
          var t =
            M.getElementsByName &&
            M.getElementsByName(B).length ===
              2 + M.getElementsByName(B + 0).length;
          return (s = !M.getElementById(B)), $.removeChild(e), t;
        });
      try {
        W.call($.childNodes, 0)[0].nodeType;
      } catch (e) {
        W = function (e) {
          for (var t, n = []; (t = this[e]); e++) n.push(t);
          return n;
        };
      }
      (C.matches = function (e, t) {
        return C(e, null, null, t);
      }),
        (C.matchesSelector = function (e, t) {
          return 0 < C(t, null, null, [e]).length;
        }),
        (c = C.getText = function (e) {
          var t,
            n = "",
            r = 0,
            i = e.nodeType;
          if (i) {
            if (1 === i || 9 === i || 11 === i) {
              if ("string" == typeof e.textContent) return e.textContent;
              for (e = e.firstChild; e; e = e.nextSibling) n += c(e);
            } else if (3 === i || 4 === i) return e.nodeValue;
          } else for (; (t = e[r]); r++) n += c(t);
          return n;
        }),
        (g = C.isXML = function (e) {
          var t = e && (e.ownerDocument || e).documentElement;
          return !!t && "HTML" !== t.nodeName;
        }),
        (m = C.contains = $.contains
          ? function (e, t) {
              var n = 9 === e.nodeType ? e.documentElement : e,
                r = t && t.parentNode;
              return (
                e === r ||
                !!(r && 1 === r.nodeType && n.contains && n.contains(r))
              );
            }
          : $.compareDocumentPosition
          ? function (e, t) {
              return t && !!(16 & e.compareDocumentPosition(t));
            }
          : function (e, t) {
              for (; (t = t.parentNode); ) if (t === e) return !0;
              return !1;
            }),
        (C.attr = function (e, t) {
          var n,
            r = g(e);
          return (
            r || (t = t.toLowerCase()),
            (n = T.attrHandle[t])
              ? n(e)
              : r || fe
              ? e.getAttribute(t)
              : (n = e.getAttributeNode(t))
              ? "boolean" == typeof e[t]
                ? e[t]
                  ? t
                  : null
                : n.specified
                ? n.value
                : null
              : null
          );
        }),
        (T = C.selectors = {
          cacheLength: 50,
          createPseudo: X,
          match: ue,
          attrHandle: de
            ? {}
            : {
                href: function (e) {
                  return e.getAttribute("href", 2);
                },
                type: function (e) {
                  return e.getAttribute("type");
                }
              },
          find: {
            ID: s
              ? function (e, t, n) {
                  if (typeof t.getElementById != _ && !n) {
                    var r = t.getElementById(e);
                    return r && r.parentNode ? [r] : [];
                  }
                }
              : function (e, t, n) {
                  if (typeof t.getElementById != _ && !n) {
                    var r = t.getElementById(e);
                    return r
                      ? r.id === e ||
                        (typeof r.getAttributeNode != _ &&
                          r.getAttributeNode("id").value === e)
                        ? [r]
                        : void 0
                      : [];
                  }
                },
            TAG: pe
              ? function (e, t) {
                  if (typeof t.getElementsByTagName != _)
                    return t.getElementsByTagName(e);
                }
              : function (e, t) {
                  var n = t.getElementsByTagName(e);
                  if ("*" !== e) return n;
                  for (var r, i = [], o = 0; (r = n[o]); o++)
                    1 === r.nodeType && i.push(r);
                  return i;
                },
            NAME:
              ge &&
              function (e, t) {
                if (typeof t.getElementsByName != _)
                  return t.getElementsByName(name);
              },
            CLASS:
              he &&
              function (e, t, n) {
                if (typeof t.getElementsByClassName != _ && !n)
                  return t.getElementsByClassName(e);
              }
          },
          relative: {
            ">": { dir: "parentNode", first: !0 },
            " ": { dir: "parentNode" },
            "+": { dir: "previousSibling", first: !0 },
            "~": { dir: "previousSibling" }
          },
          preFilter: {
            ATTR: function (e) {
              return (
                (e[1] = e[1].replace(le, "")),
                (e[3] = (e[4] || e[5] || "").replace(le, "")),
                "~=" === e[2] && (e[3] = " " + e[3] + " "),
                e.slice(0, 4)
              );
            },
            CHILD: function (e) {
              return (
                (e[1] = e[1].toLowerCase()),
                "nth" === e[1]
                  ? (e[2] || C.error(e[0]),
                    (e[3] = +(e[3]
                      ? e[4] + (e[5] || 1)
                      : 2 * ("even" === e[2] || "odd" === e[2]))),
                    (e[4] = +(e[6] + e[7] || "odd" === e[2])))
                  : e[2] && C.error(e[0]),
                e
              );
            },
            PSEUDO: function (e) {
              var t, n;
              return ue.CHILD.test(e[0])
                ? null
                : (e[3]
                    ? (e[2] = e[3])
                    : (t = e[4]) &&
                      (ie.test(t) &&
                        (n = p(t, !0)) &&
                        (n = t.indexOf(")", t.length - n) - t.length) &&
                        ((t = t.slice(0, n)), (e[0] = e[0].slice(0, n))),
                      (e[2] = t)),
                  e.slice(0, 3));
            }
          },
          filter: {
            ID: s
              ? function (t) {
                  return (
                    (t = t.replace(le, "")),
                    function (e) {
                      return e.getAttribute("id") === t;
                    }
                  );
                }
              : function (n) {
                  return (
                    (n = n.replace(le, "")),
                    function (e) {
                      var t =
                        typeof e.getAttributeNode != _ &&
                        e.getAttributeNode("id");
                      return t && t.value === n;
                    }
                  );
                },
            TAG: function (t) {
              return "*" === t
                ? function () {
                    return !0;
                  }
                : ((t = t.replace(le, "").toLowerCase()),
                  function (e) {
                    return e.nodeName && e.nodeName.toLowerCase() === t;
                  });
            },
            CLASS: function (e) {
              var t = V[B][e + " "];
              return (
                t ||
                ((t = new RegExp("(^|" + Y + ")" + e + "(" + Y + "|$)")) &&
                  V(e, function (e) {
                    return t.test(
                      e.className ||
                        (typeof e.getAttribute != _ &&
                          e.getAttribute("class")) ||
                        ""
                    );
                  }))
              );
            },
            ATTR: function (r, i, o) {
              return function (e, t) {
                var n = C.attr(e, r);
                return null == n
                  ? "!=" === i
                  : !i ||
                      ((n += ""),
                      "=" === i
                        ? n === o
                        : "!=" === i
                        ? n !== o
                        : "^=" === i
                        ? o && 0 === n.indexOf(o)
                        : "*=" === i
                        ? o && -1 < n.indexOf(o)
                        : "$=" === i
                        ? o && n.substr(n.length - o.length) === o
                        : "~=" === i
                        ? -1 < (" " + n + " ").indexOf(o)
                        : "|=" === i &&
                          (n === o || n.substr(0, o.length + 1) === o + "-"));
              };
            },
            CHILD: function (n, e, i, o) {
              return "nth" === n
                ? function (e) {
                    var t,
                      n,
                      r = e.parentNode;
                    if (1 === i && 0 === o) return !0;
                    if (r)
                      for (
                        n = 0, t = r.firstChild;
                        t && (1 !== t.nodeType || (n++, e !== t));
                        t = t.nextSibling
                      );
                    return (n -= o) === i || (n % i == 0 && 0 <= n / i);
                  }
                : function (e) {
                    var t = e;
                    switch (n) {
                      case "only":
                      case "first":
                        for (; (t = t.previousSibling); )
                          if (1 === t.nodeType) return !1;
                        if ("first" === n) return !0;
                        t = e;
                      case "last":
                        for (; (t = t.nextSibling); )
                          if (1 === t.nodeType) return !1;
                        return !0;
                    }
                  };
            },
            PSEUDO: function (e, o) {
              var t,
                a =
                  T.pseudos[e] ||
                  T.setFilters[e.toLowerCase()] ||
                  C.error("unsupported pseudo: " + e);
              return a[B]
                ? a(o)
                : 1 < a.length
                ? ((t = [e, e, "", o]),
                  T.setFilters.hasOwnProperty(e.toLowerCase())
                    ? X(function (e, t) {
                        for (var n, r = a(e, o), i = r.length; i--; )
                          e[(n = z.call(e, r[i]))] = !(t[n] = r[i]);
                      })
                    : function (e) {
                        return a(e, 0, t);
                      })
                : a;
            }
          },
          pseudos: {
            not: X(function (e) {
              var r = [],
                i = [],
                s = y(e.replace(te, "$1"));
              return s[B]
                ? X(function (e, t, n, r) {
                    for (var i, o = s(e, null, r, []), a = e.length; a--; )
                      (i = o[a]) && (e[a] = !(t[a] = i));
                  })
                : function (e, t, n) {
                    return (r[0] = e), s(r, null, n, i), !i.pop();
                  };
            }),
            has: X(function (t) {
              return function (e) {
                return 0 < C(t, e).length;
              };
            }),
            contains: X(function (t) {
              return function (e) {
                return -1 < (e.textContent || e.innerText || c(e)).indexOf(t);
              };
            }),
            enabled: function (e) {
              return !1 === e.disabled;
            },
            disabled: function (e) {
              return !0 === e.disabled;
            },
            checked: function (e) {
              var t = e.nodeName.toLowerCase();
              return (
                ("input" === t && !!e.checked) ||
                ("option" === t && !!e.selected)
              );
            },
            selected: function (e) {
              return (
                e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
              );
            },
            parent: function (e) {
              return !T.pseudos.empty(e);
            },
            empty: function (e) {
              var t;
              for (e = e.firstChild; e; ) {
                if ("@" < e.nodeName || 3 === (t = e.nodeType) || 4 === t)
                  return !1;
                e = e.nextSibling;
              }
              return !0;
            },
            header: function (e) {
              return se.test(e.nodeName);
            },
            text: function (e) {
              var t, n;
              return (
                "input" === e.nodeName.toLowerCase() &&
                "text" === (t = e.type) &&
                (null == (n = e.getAttribute("type")) || n.toLowerCase() === t)
              );
            },
            radio: t("radio"),
            checkbox: t("checkbox"),
            file: t("file"),
            password: t("password"),
            image: t("image"),
            submit: n("submit"),
            reset: n("reset"),
            button: function (e) {
              var t = e.nodeName.toLowerCase();
              return ("input" === t && "button" === e.type) || "button" === t;
            },
            input: function (e) {
              return ce.test(e.nodeName);
            },
            focus: function (e) {
              var t = e.ownerDocument;
              return (
                e === t.activeElement &&
                (!t.hasFocus || t.hasFocus()) &&
                !!(e.type || e.href || ~e.tabIndex)
              );
            },
            active: function (e) {
              return e === e.ownerDocument.activeElement;
            },
            first: r(function () {
              return [0];
            }),
            last: r(function (e, t) {
              return [t - 1];
            }),
            eq: r(function (e, t, n) {
              return [n < 0 ? n + t : n];
            }),
            even: r(function (e, t) {
              for (var n = 0; n < t; n += 2) e.push(n);
              return e;
            }),
            odd: r(function (e, t) {
              for (var n = 1; n < t; n += 2) e.push(n);
              return e;
            }),
            lt: r(function (e, t, n) {
              for (var r = n < 0 ? n + t : n; 0 <= --r; ) e.push(r);
              return e;
            }),
            gt: r(function (e, t, n) {
              for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
              return e;
            })
          }
        }),
        (b = $.compareDocumentPosition
          ? function (e, t) {
              return e === t
                ? ((x = !0), 0)
                : (
                    e.compareDocumentPosition && t.compareDocumentPosition
                      ? 4 & e.compareDocumentPosition(t)
                      : e.compareDocumentPosition
                  )
                ? -1
                : 1;
            }
          : function (e, t) {
              if (e === t) return (x = !0), 0;
              if (e.sourceIndex && t.sourceIndex)
                return e.sourceIndex - t.sourceIndex;
              var n,
                r,
                i = [],
                o = [],
                a = e.parentNode,
                s = t.parentNode,
                c = a;
              if (a === s) return u(e, t);
              if (!a) return -1;
              if (!s) return 1;
              for (; c; ) i.unshift(c), (c = c.parentNode);
              for (c = s; c; ) o.unshift(c), (c = c.parentNode);
              (n = i.length), (r = o.length);
              for (var l = 0; l < n && l < r; l++)
                if (i[l] !== o[l]) return u(i[l], o[l]);
              return l === n ? u(e, o[l], -1) : u(i[l], t, 1);
            }),
        [0, 0].sort(b),
        (E = !x),
        (C.uniqueSort = function (e) {
          var t,
            n = [],
            r = 1,
            i = 0;
          if (((x = E), e.sort(b), x)) {
            for (; (t = e[r]); r++) t === e[r - 1] && (i = n.push(r));
            for (; i--; ) e.splice(n[i], 1);
          }
          return e;
        }),
        (C.error = function (e) {
          throw new Error("Syntax error, unrecognized expression: " + e);
        }),
        (y = C.compile = function (e, t) {
          var n,
            m,
            y,
            v,
            b,
            x,
            r = [],
            i = [],
            o = U[B][e + " "];
          if (!o) {
            for (n = (t = t || p(e)).length; n--; )
              (o = h(t[n]))[B] ? r.push(o) : i.push(o);
            o = U(
              e,
              ((m = i),
              (v = 0 < (y = r).length),
              (b = 0 < m.length),
              ((x = function (e, t, n, r, i) {
                var o,
                  a,
                  s,
                  c = [],
                  l = 0,
                  u = "0",
                  p = e && [],
                  d = null != i,
                  f = N,
                  h = e || (b && T.find.TAG("*", (i && t.parentNode) || t)),
                  g = (O += null == f ? 1 : Math.E);
                for (
                  d && ((N = t !== M && t), (w = x.el));
                  null != (o = h[u]);
                  u++
                ) {
                  if (b && o) {
                    for (a = 0; (s = m[a]); a++)
                      if (s(o, t, n)) {
                        r.push(o);
                        break;
                      }
                    d && ((O = g), (w = ++x.el));
                  }
                  v && ((o = !s && o) && l--, e && p.push(o));
                }
                if (((l += u), v && u !== l)) {
                  for (a = 0; (s = y[a]); a++) s(p, c, t, n);
                  if (e) {
                    if (0 < l) for (; u--; ) p[u] || c[u] || (c[u] = P.call(r));
                    c = k(c);
                  }
                  R.apply(r, c),
                    d &&
                      !e &&
                      0 < c.length &&
                      1 < l + y.length &&
                      C.uniqueSort(r);
                }
                return d && ((O = g), (N = f)), p;
              }).el = 0),
              v ? X(x) : x)
            );
          }
          return o;
        }),
        M.querySelectorAll &&
          ((I = l),
          (A = /'|\\/g),
          (L = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g),
          (j = [":focus"]),
          (D = [":active"]),
          (H =
            $.matchesSelector ||
            $.mozMatchesSelector ||
            $.webkitMatchesSelector ||
            $.oMatchesSelector ||
            $.msMatchesSelector),
          a(function (e) {
            (e.innerHTML = "<select><option selected=''></option></select>"),
              e.querySelectorAll("[selected]").length ||
                j.push(
                  "\\[" +
                    Y +
                    "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"
                ),
              e.querySelectorAll(":checked").length || j.push(":checked");
          }),
          a(function (e) {
            (e.innerHTML = "<p test=''></p>"),
              e.querySelectorAll("[test^='']").length &&
                j.push("[*^$]=" + Y + "*(?:\"\"|'')"),
              (e.innerHTML = "<input type='hidden'/>"),
              e.querySelectorAll(":enabled").length ||
                j.push(":enabled", ":disabled");
          }),
          (j = new RegExp(j.join("|"))),
          (l = function (e, t, n, r, i) {
            if (!r && !i && !j.test(e)) {
              var o,
                a,
                s = !0,
                c = B,
                l = t,
                u = 9 === t.nodeType && e;
              if (1 === t.nodeType && "object" !== t.nodeName.toLowerCase()) {
                for (
                  o = p(e),
                    (s = t.getAttribute("id"))
                      ? (c = s.replace(A, "\\$&"))
                      : t.setAttribute("id", c),
                    c = "[id='" + c + "'] ",
                    a = o.length;
                  a--;

                )
                  o[a] = c + o[a].join("");
                (l = (ae.test(e) && t.parentNode) || t), (u = o.join(","));
              }
              if (u)
                try {
                  return R.apply(n, W.call(l.querySelectorAll(u), 0)), n;
                } catch (e) {
                } finally {
                  s || t.removeAttribute("id");
                }
            }
            return I(e, t, n, r, i);
          }),
          H &&
            (a(function (e) {
              S = H.call(e, "div");
              try {
                H.call(e, "[test!='']:sizzle"), D.push("!=", Z);
              } catch (e) {}
            }),
            (D = new RegExp(D.join("|"))),
            (C.matchesSelector = function (e, t) {
              if (
                ((t = t.replace(L, "='$1']")),
                !g(e) && !D.test(t) && !j.test(t))
              )
                try {
                  var n = H.call(e, t);
                  if (n || S || (e.document && 11 !== e.document.nodeType))
                    return n;
                } catch (e) {}
              return 0 < C(t, null, null, [e]).length;
            }))),
        (T.pseudos.nth = T.pseudos.eq),
        (T.filters = i.prototype = T.pseudos),
        (T.setFilters = new i()),
        (C.attr = me.attr),
        (me.find = C),
        (me.expr = C.selectors),
        (me.expr[":"] = me.expr.pseudos),
        (me.unique = C.uniqueSort),
        (me.text = C.getText),
        (me.isXMLDoc = C.isXML),
        (me.contains = C.contains);
    })(m);
  var Ee = /Until$/,
    Se = /^(?:parents|prev(?:Until|All))/,
    Ie = /^.[^:#\[\.,]*$/,
    Ae = me.expr.match.needsContext,
    Le = { children: !0, contents: !0, next: !0, prev: !0 };
  me.fn.extend({
    find: function (e) {
      var t,
        n,
        r,
        i,
        o,
        a,
        s = this;
      if ("string" != typeof e)
        return me(e).filter(function () {
          for (t = 0, n = s.length; t < n; t++)
            if (me.contains(s[t], this)) return !0;
        });
      for (
        a = this.pushStack("", "find", e), t = 0, n = this.length;
        t < n;
        t++
      )
        if (((r = a.length), me.find(e, this[t], a), 0 < t))
          for (i = r; i < a.length; i++)
            for (o = 0; o < r; o++)
              if (a[o] === a[i]) {
                a.splice(i--, 1);
                break;
              }
      return a;
    },
    has: function (e) {
      var t,
        n = me(e, this),
        r = n.length;
      return this.filter(function () {
        for (t = 0; t < r; t++) if (me.contains(this, n[t])) return !0;
      });
    },
    not: function (e) {
      return this.pushStack(r(this, e, !1), "not", e);
    },
    filter: function (e) {
      return this.pushStack(r(this, e, !0), "filter", e);
    },
    is: function (e) {
      return (
        !!e &&
        ("string" == typeof e
          ? Ae.test(e)
            ? 0 <= me(e, this.context).index(this[0])
            : 0 < me.filter(e, this).length
          : 0 < this.filter(e).length)
      );
    },
    closest: function (e, t) {
      for (
        var n,
          r = 0,
          i = this.length,
          o = [],
          a = Ae.test(e) || "string" != typeof e ? me(e, t || this.context) : 0;
        r < i;
        r++
      )
        for (
          n = this[r];
          n && n.ownerDocument && n !== t && 11 !== n.nodeType;

        ) {
          if (a ? -1 < a.index(n) : me.find.matchesSelector(n, e)) {
            o.push(n);
            break;
          }
          n = n.parentNode;
        }
      return (
        (o = 1 < o.length ? me.unique(o) : o), this.pushStack(o, "closest", e)
      );
    },
    index: function (e) {
      return e
        ? "string" == typeof e
          ? me.inArray(this[0], me(e))
          : me.inArray(e.jquery ? e[0] : e, this)
        : this[0] && this[0].parentNode
        ? this.prevAll().length
        : -1;
    },
    add: function (e, t) {
      var n =
          "string" == typeof e
            ? me(e, t)
            : me.makeArray(e && e.nodeType ? [e] : e),
        r = me.merge(this.get(), n);
      return this.pushStack(i(n[0]) || i(r[0]) ? r : me.unique(r));
    },
    addBack: function (e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    }
  }),
    (me.fn.andSelf = me.fn.addBack),
    me.each(
      {
        parent: function (e) {
          var t = e.parentNode;
          return t && 11 !== t.nodeType ? t : null;
        },
        parents: function (e) {
          return me.dir(e, "parentNode");
        },
        parentsUntil: function (e, t, n) {
          return me.dir(e, "parentNode", n);
        },
        next: function (e) {
          return t(e, "nextSibling");
        },
        prev: function (e) {
          return t(e, "previousSibling");
        },
        nextAll: function (e) {
          return me.dir(e, "nextSibling");
        },
        prevAll: function (e) {
          return me.dir(e, "previousSibling");
        },
        nextUntil: function (e, t, n) {
          return me.dir(e, "nextSibling", n);
        },
        prevUntil: function (e, t, n) {
          return me.dir(e, "previousSibling", n);
        },
        siblings: function (e) {
          return me.sibling((e.parentNode || {}).firstChild, e);
        },
        children: function (e) {
          return me.sibling(e.firstChild);
        },
        contents: function (e) {
          return me.nodeName(e, "iframe")
            ? e.contentDocument || e.contentWindow.document
            : me.merge([], e.childNodes);
        }
      },
      function (r, i) {
        me.fn[r] = function (e, t) {
          var n = me.map(this, i, e);
          return (
            Ee.test(r) || (t = e),
            t && "string" == typeof t && (n = me.filter(t, n)),
            (n = 1 < this.length && !Le[r] ? me.unique(n) : n),
            1 < this.length && Se.test(r) && (n = n.reverse()),
            this.pushStack(n, r, q.call(arguments).join(","))
          );
        };
      }
    ),
    me.extend({
      filter: function (e, t, n) {
        return (
          n && (e = ":not(" + e + ")"),
          1 === t.length
            ? me.find.matchesSelector(t[0], e)
              ? [t[0]]
              : []
            : me.find.matches(e, t)
        );
      },
      dir: function (e, t, n) {
        for (
          var r = [], i = e[t];
          i &&
          9 !== i.nodeType &&
          (n === T || 1 !== i.nodeType || !me(i).is(n));

        )
          1 === i.nodeType && r.push(i), (i = i[t]);
        return r;
      },
      sibling: function (e, t) {
        for (var n = []; e; e = e.nextSibling)
          1 === e.nodeType && e !== t && n.push(e);
        return n;
      }
    });
  var je,
    De,
    He =
      "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    _e = / jQuery\d+="(?:null|\d+)"/g,
    Be = /^\s+/,
    Fe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    Me = /<([\w:]+)/,
    $e = /<tbody/i,
    Oe = /<|&#?\w+;/,
    qe = /<(?:script|style|link)/i,
    Pe = /<(?:script|object|embed|option|style)/i,
    Re = new RegExp("<(?:" + He + ")[\\s/>]", "i"),
    We = /^(?:checkbox|radio)$/,
    ze = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Xe = /\/(java|ecma)script/i,
    Ve = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
    Ke = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      area: [1, "<map>", "</map>"],
      _default: [0, "", ""]
    },
    Ue = y(_),
    Ye = Ue.appendChild(_.createElement("div"));
  (Ke.optgroup = Ke.option),
    (Ke.tbody = Ke.tfoot = Ke.colgroup = Ke.caption = Ke.thead),
    (Ke.th = Ke.td),
    me.support.htmlSerialize || (Ke._default = [1, "X<div>", "</div>"]),
    me.fn.extend({
      text: function (e) {
        return me.access(
          this,
          function (e) {
            return e === T
              ? me.text(this)
              : this.empty().append(
                  ((this[0] && this[0].ownerDocument) || _).createTextNode(e)
                );
          },
          null,
          e,
          arguments.length
        );
      },
      wrapAll: function (t) {
        if (me.isFunction(t))
          return this.each(function (e) {
            me(this).wrapAll(t.call(this, e));
          });
        if (this[0]) {
          var e = me(t, this[0].ownerDocument).eq(0).clone(!0);
          this[0].parentNode && e.insertBefore(this[0]),
            e
              .map(function () {
                for (
                  var e = this;
                  e.firstChild && 1 === e.firstChild.nodeType;

                )
                  e = e.firstChild;
                return e;
              })
              .append(this);
        }
        return this;
      },
      wrapInner: function (n) {
        return me.isFunction(n)
          ? this.each(function (e) {
              me(this).wrapInner(n.call(this, e));
            })
          : this.each(function () {
              var e = me(this),
                t = e.contents();
              t.length ? t.wrapAll(n) : e.append(n);
            });
      },
      wrap: function (t) {
        var n = me.isFunction(t);
        return this.each(function (e) {
          me(this).wrapAll(n ? t.call(this, e) : t);
        });
      },
      unwrap: function () {
        return this.parent()
          .each(function () {
            me.nodeName(this, "body") || me(this).replaceWith(this.childNodes);
          })
          .end();
      },
      append: function () {
        return this.domManip(arguments, !0, function (e) {
          (1 !== this.nodeType && 11 !== this.nodeType) || this.appendChild(e);
        });
      },
      prepend: function () {
        return this.domManip(arguments, !0, function (e) {
          (1 !== this.nodeType && 11 !== this.nodeType) ||
            this.insertBefore(e, this.firstChild);
        });
      },
      before: function () {
        if (!i(this[0]))
          return this.domManip(arguments, !1, function (e) {
            this.parentNode.insertBefore(e, this);
          });
        if (arguments.length) {
          var e = me.clean(arguments);
          return this.pushStack(me.merge(e, this), "before", this.selector);
        }
      },
      after: function () {
        if (!i(this[0]))
          return this.domManip(arguments, !1, function (e) {
            this.parentNode.insertBefore(e, this.nextSibling);
          });
        if (arguments.length) {
          var e = me.clean(arguments);
          return this.pushStack(me.merge(this, e), "after", this.selector);
        }
      },
      remove: function (e, t) {
        for (var n, r = 0; null != (n = this[r]); r++)
          (e && !me.filter(e, [n]).length) ||
            (t ||
              1 !== n.nodeType ||
              (me.cleanData(n.getElementsByTagName("*")), me.cleanData([n])),
            n.parentNode && n.parentNode.removeChild(n));
        return this;
      },
      empty: function () {
        for (var e, t = 0; null != (e = this[t]); t++)
          for (
            1 === e.nodeType && me.cleanData(e.getElementsByTagName("*"));
            e.firstChild;

          )
            e.removeChild(e.firstChild);
        return this;
      },
      clone: function (e, t) {
        return (
          (e = null != e && e),
          (t = null == t ? e : t),
          this.map(function () {
            return me.clone(this, e, t);
          })
        );
      },
      html: function (e) {
        return me.access(
          this,
          function (e) {
            var t = this[0] || {},
              n = 0,
              r = this.length;
            if (e === T)
              return 1 === t.nodeType ? t.innerHTML.replace(_e, "") : T;
            if (
              "string" == typeof e &&
              !qe.test(e) &&
              (me.support.htmlSerialize || !Re.test(e)) &&
              (me.support.leadingWhitespace || !Be.test(e)) &&
              !Ke[(Me.exec(e) || ["", ""])[1].toLowerCase()]
            ) {
              e = e.replace(Fe, "<$1></$2>");
              try {
                for (; n < r; n++)
                  1 === (t = this[n] || {}).nodeType &&
                    (me.cleanData(t.getElementsByTagName("*")),
                    (t.innerHTML = e));
                t = 0;
              } catch (e) {}
            }
            t && this.empty().append(e);
          },
          null,
          e,
          arguments.length
        );
      },
      replaceWith: function (r) {
        return i(this[0])
          ? this.length
            ? this.pushStack(me(me.isFunction(r) ? r() : r), "replaceWith", r)
            : this
          : me.isFunction(r)
          ? this.each(function (e) {
              var t = me(this),
                n = t.html();
              t.replaceWith(r.call(this, e, n));
            })
          : ("string" != typeof r && (r = me(r).detach()),
            this.each(function () {
              var e = this.nextSibling,
                t = this.parentNode;
              me(this).remove(), e ? me(e).before(r) : me(t).append(r);
            }));
      },
      detach: function (e) {
        return this.remove(e, !0);
      },
      domManip: function (n, r, i) {
        var e,
          t,
          o,
          a,
          s,
          c,
          l = 0,
          u = (n = [].concat.apply([], n))[0],
          p = [],
          d = this.length;
        if (
          !me.support.checkClone &&
          1 < d &&
          "string" == typeof u &&
          ze.test(u)
        )
          return this.each(function () {
            me(this).domManip(n, r, i);
          });
        if (me.isFunction(u))
          return this.each(function (e) {
            var t = me(this);
            (n[0] = u.call(this, e, r ? t.html() : T)), t.domManip(n, r, i);
          });
        if (this[0]) {
          if (
            ((t = (o = (e = me.buildFragment(n, this, p)).fragment).firstChild),
            1 === o.childNodes.length && (o = t),
            t)
          )
            for (
              r = r && me.nodeName(t, "tr"), a = e.cacheable || d - 1;
              l < d;
              l++
            )
              i.call(
                r && me.nodeName(this[l], "table")
                  ? ((s = this[l]),
                    (c = "tbody"),
                    s.getElementsByTagName(c)[0] ||
                      s.appendChild(s.ownerDocument.createElement(c)))
                  : this[l],
                l === a ? o : me.clone(o, !0, !0)
              );
          (o = t = null),
            p.length &&
              me.each(p, function (e, t) {
                t.src
                  ? me.ajax
                    ? me.ajax({
                        url: t.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        throws: !0
                      })
                    : me.error("no ajax")
                  : me.globalEval(
                      (t.text || t.textContent || t.innerHTML || "").replace(
                        Ve,
                        ""
                      )
                    ),
                  t.parentNode && t.parentNode.removeChild(t);
              });
        }
        return this;
      }
    }),
    (me.buildFragment = function (e, t, n) {
      var r,
        i,
        o,
        a = e[0];
      return (
        (t = (t = (!(t = t || _).nodeType && t[0]) || t).ownerDocument || t),
        !(
          1 === e.length &&
          "string" == typeof a &&
          a.length < 512 &&
          t === _ &&
          "<" === a.charAt(0)
        ) ||
          Pe.test(a) ||
          (!me.support.checkClone && ze.test(a)) ||
          (!me.support.html5Clone && Re.test(a)) ||
          ((i = !0), (o = (r = me.fragments[a]) !== T)),
        r ||
          ((r = t.createDocumentFragment()),
          me.clean(e, t, r, n),
          i && (me.fragments[a] = o && r)),
        { fragment: r, cacheable: i }
      );
    }),
    (me.fragments = {}),
    me.each(
      {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
      },
      function (s, c) {
        me.fn[s] = function (e) {
          var t,
            n = 0,
            r = [],
            i = me(e),
            o = i.length,
            a = 1 === this.length && this[0].parentNode;
          if (
            (null == a ||
              (a && 11 === a.nodeType && 1 === a.childNodes.length)) &&
            1 === o
          )
            return i[c](this[0]), this;
          for (; n < o; n++)
            (t = (0 < n ? this.clone(!0) : this).get()),
              me(i[n])[c](t),
              (r = r.concat(t));
          return this.pushStack(r, s, i.selector);
        };
      }
    ),
    me.extend({
      clone: function (e, t, n) {
        var r, i, o, a;
        if (
          (me.support.html5Clone ||
          me.isXMLDoc(e) ||
          !Re.test("<" + e.nodeName + ">")
            ? (a = e.cloneNode(!0))
            : ((Ye.innerHTML = e.outerHTML),
              Ye.removeChild((a = Ye.firstChild))),
          !(
            (me.support.noCloneEvent && me.support.noCloneChecked) ||
            (1 !== e.nodeType && 11 !== e.nodeType) ||
            me.isXMLDoc(e)
          ))
        )
          for (p(e, a), r = d(e), i = d(a), o = 0; r[o]; ++o)
            i[o] && p(r[o], i[o]);
        if (t && (c(e, a), n))
          for (r = d(e), i = d(a), o = 0; r[o]; ++o) c(r[o], i[o]);
        return (r = i = null), a;
      },
      clean: function (e, t, n, r) {
        var i,
          o,
          a,
          s,
          c,
          l,
          u,
          p,
          d,
          f,
          h,
          g = t === _ && Ue,
          m = [];
        for (
          (t && void 0 !== t.createDocumentFragment) || (t = _), i = 0;
          null != (a = e[i]);
          i++
        )
          if (("number" == typeof a && (a += ""), a)) {
            if ("string" == typeof a)
              if (Oe.test(a)) {
                for (
                  g = g || y(t),
                    u = t.createElement("div"),
                    g.appendChild(u),
                    a = a.replace(Fe, "<$1></$2>"),
                    s = (Me.exec(a) || ["", ""])[1].toLowerCase(),
                    l = (c = Ke[s] || Ke._default)[0],
                    u.innerHTML = c[1] + a + c[2];
                  l--;

                )
                  u = u.lastChild;
                if (!me.support.tbody)
                  for (
                    p = $e.test(a),
                      o =
                        (d =
                          "table" !== s || p
                            ? "<table>" !== c[1] || p
                              ? []
                              : u.childNodes
                            : u.firstChild && u.firstChild.childNodes).length -
                        1;
                    0 <= o;
                    --o
                  )
                    me.nodeName(d[o], "tbody") &&
                      !d[o].childNodes.length &&
                      d[o].parentNode.removeChild(d[o]);
                !me.support.leadingWhitespace &&
                  Be.test(a) &&
                  u.insertBefore(t.createTextNode(Be.exec(a)[0]), u.firstChild),
                  (a = u.childNodes),
                  u.parentNode.removeChild(u);
              } else a = t.createTextNode(a);
            a.nodeType ? m.push(a) : me.merge(m, a);
          }
        if ((u && (a = u = g = null), !me.support.appendChecked))
          for (i = 0; null != (a = m[i]); i++)
            me.nodeName(a, "input")
              ? v(a)
              : void 0 !== a.getElementsByTagName &&
                me.grep(a.getElementsByTagName("input"), v);
        if (n)
          for (
            f = function (e) {
              if (!e.type || Xe.test(e.type))
                return r
                  ? r.push(e.parentNode ? e.parentNode.removeChild(e) : e)
                  : n.appendChild(e);
            },
              i = 0;
            null != (a = m[i]);
            i++
          )
            (me.nodeName(a, "script") && f(a)) ||
              (n.appendChild(a),
              void 0 !== a.getElementsByTagName &&
                ((h = me.grep(
                  me.merge([], a.getElementsByTagName("script")),
                  f
                )),
                m.splice.apply(m, [i + 1, 0].concat(h)),
                (i += h.length)));
        return m;
      },
      cleanData: function (e, t) {
        for (
          var n,
            r,
            i,
            o,
            a = 0,
            s = me.expando,
            c = me.cache,
            l = me.support.deleteExpando,
            u = me.event.special;
          null != (i = e[a]);
          a++
        )
          if ((t || me.acceptData(i)) && (n = (r = i[s]) && c[r])) {
            if (n.events)
              for (o in n.events)
                u[o] ? me.event.remove(i, o) : me.removeEvent(i, o, n.handle);
            c[r] &&
              (delete c[r],
              l
                ? delete i[s]
                : i.removeAttribute
                ? i.removeAttribute(s)
                : (i[s] = null),
              me.deletedIds.push(r));
          }
      }
    }),
    (me.uaMatch = function (e) {
      e = e.toLowerCase();
      var t =
        /(chrome)[ \/]([\w.]+)/.exec(e) ||
        /(webkit)[ \/]([\w.]+)/.exec(e) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) ||
        /(msie) ([\w.]+)/.exec(e) ||
        (e.indexOf("compatible") < 0 &&
          /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)) ||
        [];
      return { browser: t[1] || "", version: t[2] || "0" };
    }),
    (De = {}),
    (je = me.uaMatch(F.userAgent)).browser &&
      ((De[je.browser] = !0), (De.version = je.version)),
    De.chrome ? (De.webkit = !0) : De.webkit && (De.safari = !0),
    (me.browser = De),
    (me.sub = function () {
      function n(e, t) {
        return new n.fn.init(e, t);
      }
      me.extend(!0, n, this),
        (n.superclass = this),
        (((n.fn = n.prototype = this()).constructor = n).sub = this.sub),
        (n.fn.init = function (e, t) {
          return (
            t && t instanceof me && !(t instanceof n) && (t = n(t)),
            me.fn.init.call(this, e, t, r)
          );
        }),
        (n.fn.init.prototype = n.fn);
      var r = n(_);
      return n;
    });
  var Je,
    Ge,
    Qe,
    Ze = /alpha\([^)]*\)/i,
    et = /opacity=([^)]*)/,
    tt = /^(top|right|bottom|left)$/,
    nt = /^(none|table(?!-c[ea]).+)/,
    rt = /^margin/,
    it = new RegExp("^(" + X + ")(.*)$", "i"),
    ot = new RegExp("^(" + X + ")(?!px)[a-z%]+$", "i"),
    at = new RegExp("^([-+])=(" + X + ")", "i"),
    st = { BODY: "block" },
    ct = { position: "absolute", visibility: "hidden", display: "block" },
    lt = { letterSpacing: 0, fontWeight: 400 },
    ut = ["Top", "Right", "Bottom", "Left"],
    pt = ["Webkit", "O", "Moz", "ms"],
    dt = me.fn.toggle;
  me.fn.extend({
    css: function (e, t) {
      return me.access(
        this,
        function (e, t, n) {
          return n !== T ? me.style(e, t, n) : me.css(e, t);
        },
        e,
        t,
        1 < arguments.length
      );
    },
    show: function () {
      return e(this, !0);
    },
    hide: function () {
      return e(this);
    },
    toggle: function (e, t) {
      var n = "boolean" == typeof e;
      return me.isFunction(e) && me.isFunction(t)
        ? dt.apply(this, arguments)
        : this.each(function () {
            (n ? e : b(this)) ? me(this).show() : me(this).hide();
          });
    }
  }),
    me.extend({
      cssHooks: {
        opacity: {
          get: function (e, t) {
            if (t) {
              var n = Je(e, "opacity");
              return "" === n ? "1" : n;
            }
          }
        }
      },
      cssNumber: {
        fillOpacity: !0,
        fontWeight: !0,
        lineHeight: !0,
        opacity: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0
      },
      cssProps: { float: me.support.cssFloat ? "cssFloat" : "styleFloat" },
      style: function (e, t, n, r) {
        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
          var i,
            o,
            a,
            s = me.camelCase(t),
            c = e.style;
          if (
            ((t = me.cssProps[s] || (me.cssProps[s] = f(c, s))),
            (a = me.cssHooks[t] || me.cssHooks[s]),
            n === T)
          )
            return a && "get" in a && (i = a.get(e, !1, r)) !== T ? i : c[t];
          if (
            ("string" === (o = typeof n) &&
              (i = at.exec(n)) &&
              ((n = (i[1] + 1) * i[2] + parseFloat(me.css(e, t))),
              (o = "number")),
            !(
              null == n ||
              ("number" === o && isNaN(n)) ||
              ("number" !== o || me.cssNumber[s] || (n += "px"),
              a && "set" in a && (n = a.set(e, n, r)) === T)
            ))
          )
            try {
              c[t] = n;
            } catch (e) {}
        }
      },
      css: function (e, t, n, r) {
        var i,
          o,
          a,
          s = me.camelCase(t);
        return (
          (t = me.cssProps[s] || (me.cssProps[s] = f(e.style, s))),
          (a = me.cssHooks[t] || me.cssHooks[s]) &&
            "get" in a &&
            (i = a.get(e, !0, r)),
          i === T && (i = Je(e, t)),
          "normal" === i && t in lt && (i = lt[t]),
          n || r !== T
            ? ((o = parseFloat(i)), n || me.isNumeric(o) ? o || 0 : i)
            : i
        );
      },
      swap: function (e, t, n) {
        var r,
          i,
          o = {};
        for (i in t) (o[i] = e.style[i]), (e.style[i] = t[i]);
        for (i in ((r = n.call(e)), t)) e.style[i] = o[i];
        return r;
      }
    }),
    m.getComputedStyle
      ? (Je = function (e, t) {
          var n,
            r,
            i,
            o,
            a = m.getComputedStyle(e, null),
            s = e.style;
          return (
            a &&
              ("" !== (n = a.getPropertyValue(t) || a[t]) ||
                me.contains(e.ownerDocument, e) ||
                (n = me.style(e, t)),
              ot.test(n) &&
                rt.test(t) &&
                ((r = s.width),
                (i = s.minWidth),
                (o = s.maxWidth),
                (s.minWidth = s.maxWidth = s.width = n),
                (n = a.width),
                (s.width = r),
                (s.minWidth = i),
                (s.maxWidth = o))),
            n
          );
        })
      : _.documentElement.currentStyle &&
        (Je = function (e, t) {
          var n,
            r,
            i = e.currentStyle && e.currentStyle[t],
            o = e.style;
          return (
            null == i && o && o[t] && (i = o[t]),
            ot.test(i) &&
              !tt.test(t) &&
              ((n = o.left),
              (r = e.runtimeStyle && e.runtimeStyle.left) &&
                (e.runtimeStyle.left = e.currentStyle.left),
              (o.left = "fontSize" === t ? "1em" : i),
              (i = o.pixelLeft + "px"),
              (o.left = n),
              r && (e.runtimeStyle.left = r)),
            "" === i ? "auto" : i
          );
        }),
    me.each(["height", "width"], function (e, r) {
      me.cssHooks[r] = {
        get: function (e, t, n) {
          if (t)
            return 0 === e.offsetWidth && nt.test(Je(e, "display"))
              ? me.swap(e, ct, function () {
                  return o(e, r, n);
                })
              : o(e, r, n);
        },
        set: function (e, t, n) {
          return a(
            0,
            t,
            n
              ? h(
                  e,
                  r,
                  n,
                  me.support.boxSizing &&
                    "border-box" === me.css(e, "boxSizing")
                )
              : 0
          );
        }
      };
    }),
    me.support.opacity ||
      (me.cssHooks.opacity = {
        get: function (e, t) {
          return et.test(
            (t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || ""
          )
            ? 0.01 * parseFloat(RegExp.$1) + ""
            : t
            ? "1"
            : "";
        },
        set: function (e, t) {
          var n = e.style,
            r = e.currentStyle,
            i = me.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
            o = (r && r.filter) || n.filter || "";
          ((n.zoom = 1) <= t &&
            "" === me.trim(o.replace(Ze, "")) &&
            n.removeAttribute &&
            (n.removeAttribute("filter"), r && !r.filter)) ||
            (n.filter = Ze.test(o) ? o.replace(Ze, i) : o + " " + i);
        }
      }),
    me(function () {
      me.support.reliableMarginRight ||
        (me.cssHooks.marginRight = {
          get: function (e, t) {
            return me.swap(e, { display: "inline-block" }, function () {
              if (t) return Je(e, "marginRight");
            });
          }
        }),
        !me.support.pixelPosition &&
          me.fn.position &&
          me.each(["top", "left"], function (e, r) {
            me.cssHooks[r] = {
              get: function (e, t) {
                if (t) {
                  var n = Je(e, r);
                  return ot.test(n) ? me(e).position()[r] + "px" : n;
                }
              }
            };
          });
    }),
    me.expr &&
      me.expr.filters &&
      ((me.expr.filters.hidden = function (e) {
        return (
          (0 === e.offsetWidth && 0 === e.offsetHeight) ||
          (!me.support.reliableHiddenOffsets &&
            "none" === ((e.style && e.style.display) || Je(e, "display")))
        );
      }),
      (me.expr.filters.visible = function (e) {
        return !me.expr.filters.hidden(e);
      })),
    me.each({ margin: "", padding: "", border: "Width" }, function (i, o) {
      (me.cssHooks[i + o] = {
        expand: function (e) {
          var t,
            n = "string" == typeof e ? e.split(" ") : [e],
            r = {};
          for (t = 0; t < 4; t++) r[i + ut[t] + o] = n[t] || n[t - 2] || n[0];
          return r;
        }
      }),
        rt.test(i) || (me.cssHooks[i + o].set = a);
    });
  var ft = /%20/g,
    ht = /\[\]$/,
    gt = /\r?\n/g,
    mt = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
    yt = /^(?:select|textarea)/i;
  me.fn.extend({
    serialize: function () {
      return me.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        return this.elements ? me.makeArray(this.elements) : this;
      })
        .filter(function () {
          return (
            this.name &&
            !this.disabled &&
            (this.checked || yt.test(this.nodeName) || mt.test(this.type))
          );
        })
        .map(function (e, n) {
          var t = me(this).val();
          return null == t
            ? null
            : me.isArray(t)
            ? me.map(t, function (e, t) {
                return { name: n.name, value: e.replace(gt, "\r\n") };
              })
            : { name: n.name, value: t.replace(gt, "\r\n") };
        })
        .get();
    }
  }),
    (me.param = function (e, t) {
      function n(e, t) {
        (t = me.isFunction(t) ? t() : null == t ? "" : t),
          (i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t));
      }
      var r,
        i = [];
      if (
        (t === T && (t = me.ajaxSettings && me.ajaxSettings.traditional),
        me.isArray(e) || (e.jquery && !me.isPlainObject(e)))
      )
        me.each(e, function () {
          n(this.name, this.value);
        });
      else for (r in e) g(r, e[r], t, n);
      return i.join("&").replace(ft, "+");
    });
  var vt,
    bt,
    xt = /#.*$/,
    Ct = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    kt = /^(?:GET|HEAD)$/,
    wt = /^\/\//,
    Tt = /\?/,
    Nt = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    Et = /([?&])_=[^&]*/,
    St = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
    It = me.fn.load,
    At = {},
    Lt = {},
    jt = ["*/"] + ["*"];
  try {
    bt = B.href;
  } catch (e) {
    ((bt = _.createElement("a")).href = ""), (bt = bt.href);
  }
  (vt = St.exec(bt.toLowerCase()) || []),
    (me.fn.load = function (e, t, n) {
      if ("string" != typeof e && It) return It.apply(this, arguments);
      if (!this.length) return this;
      var r,
        i,
        o,
        a = this,
        s = e.indexOf(" ");
      return (
        0 <= s && ((r = e.slice(s, e.length)), (e = e.slice(0, s))),
        me.isFunction(t)
          ? ((n = t), (t = T))
          : t && "object" == typeof t && (i = "POST"),
        me
          .ajax({
            url: e,
            type: i,
            dataType: "html",
            data: t,
            complete: function (e, t) {
              n && a.each(n, o || [e.responseText, t, e]);
            }
          })
          .done(function (e) {
            (o = arguments),
              a.html(r ? me("<div>").append(e.replace(Nt, "")).find(r) : e);
          }),
        this
      );
    }),
    me.each(
      "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(
        " "
      ),
      function (e, t) {
        me.fn[t] = function (e) {
          return this.on(t, e);
        };
      }
    ),
    me.each(["get", "post"], function (e, i) {
      me[i] = function (e, t, n, r) {
        return (
          me.isFunction(t) && ((r = r || n), (n = t), (t = T)),
          me.ajax({ type: i, url: e, data: t, success: n, dataType: r })
        );
      };
    }),
    me.extend({
      getScript: function (e, t) {
        return me.get(e, T, t, "script");
      },
      getJSON: function (e, t, n) {
        return me.get(e, t, n, "json");
      },
      ajaxSetup: function (e, t) {
        return (
          t ? k(e, me.ajaxSettings) : ((t = e), (e = me.ajaxSettings)),
          k(e, t),
          e
        );
      },
      ajaxSettings: {
        url: bt,
        isLocal: /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(
          vt[1]
        ),
        global: !0,
        type: "GET",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        processData: !0,
        async: !0,
        accepts: {
          xml: "application/xml, text/xml",
          html: "text/html",
          text: "text/plain",
          json: "application/json, text/javascript",
          "*": jt
        },
        contents: { xml: /xml/, html: /html/, json: /json/ },
        responseFields: { xml: "responseXML", text: "responseText" },
        converters: {
          "* text": m.String,
          "text html": !0,
          "text json": me.parseJSON,
          "text xml": me.parseXML
        },
        flatOptions: { context: !0, url: !0 }
      },
      ajaxPrefilter: C(At),
      ajaxTransport: C(Lt),
      ajax: function (e, t) {
        function n(e, t, n, r) {
          var i,
            o,
            a,
            s,
            c,
            l = t;
          2 !== C &&
            ((C = 2),
            f && clearTimeout(f),
            (d = T),
            (p = r || ""),
            (k.readyState = 0 < e ? 4 : 0),
            n &&
              (s = (function (e, t, n) {
                var r,
                  i,
                  o,
                  a,
                  s = e.contents,
                  c = e.dataTypes,
                  l = e.responseFields;
                for (i in l) i in n && (t[l[i]] = n[i]);
                for (; "*" === c[0]; )
                  c.shift(),
                    r === T &&
                      (r = e.mimeType || t.getResponseHeader("content-type"));
                if (r)
                  for (i in s)
                    if (s[i] && s[i].test(r)) {
                      c.unshift(i);
                      break;
                    }
                if (c[0] in n) o = c[0];
                else {
                  for (i in n) {
                    if (!c[0] || e.converters[i + " " + c[0]]) {
                      o = i;
                      break;
                    }
                    a = a || i;
                  }
                  o = o || a;
                }
                if (o) return o !== c[0] && c.unshift(o), n[o];
              })(g, k, n)),
            (200 <= e && e < 300) || 304 === e
              ? (g.ifModified &&
                  ((c = k.getResponseHeader("Last-Modified")) &&
                    (me.lastModified[u] = c),
                  (c = k.getResponseHeader("Etag")) && (me.etag[u] = c)),
                (i =
                  304 === e
                    ? ((l = "notmodified"), !0)
                    : ((l = (i = (function (e, t) {
                        var n,
                          r,
                          i,
                          o,
                          a = e.dataTypes.slice(),
                          s = a[0],
                          c = {},
                          l = 0;
                        if (
                          (e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                          a[1])
                        )
                          for (n in e.converters)
                            c[n.toLowerCase()] = e.converters[n];
                        for (; (i = a[++l]); )
                          if ("*" !== i) {
                            if ("*" !== s && s !== i) {
                              if (!(n = c[s + " " + i] || c["* " + i]))
                                for (r in c)
                                  if (
                                    (o = r.split(" "))[1] === i &&
                                    (n = c[s + " " + o[0]] || c["* " + o[0]])
                                  ) {
                                    !0 === n
                                      ? (n = c[r])
                                      : !0 !== c[r] &&
                                        ((i = o[0]), a.splice(l--, 0, i));
                                    break;
                                  }
                              if (!0 !== n)
                                if (n && e.throws) t = n(t);
                                else
                                  try {
                                    t = n(t);
                                  } catch (e) {
                                    return {
                                      state: "parsererror",
                                      error: n
                                        ? e
                                        : "No conversion from " + s + " to " + i
                                    };
                                  }
                            }
                            s = i;
                          }
                        return { state: "success", data: t };
                      })(g, s)).state),
                      (o = i.data),
                      !(a = i.error))))
              : ((a = l) && !e) || ((l = "error"), e < 0 && (e = 0)),
            (k.status = e),
            (k.statusText = (t || l) + ""),
            i ? v.resolveWith(m, [o, l, k]) : v.rejectWith(m, [k, l, a]),
            k.statusCode(x),
            (x = T),
            h &&
              y.trigger("ajax" + (i ? "Success" : "Error"), [k, g, i ? o : a]),
            b.fireWith(m, [k, l]),
            h &&
              (y.trigger("ajaxComplete", [k, g]),
              --me.active || me.event.trigger("ajaxStop")));
        }
        "object" == typeof e && ((t = e), (e = T)), (t = t || {});
        var u,
          p,
          r,
          d,
          f,
          i,
          h,
          o,
          g = me.ajaxSetup({}, t),
          m = g.context || g,
          y = m !== g && (m.nodeType || m instanceof me) ? me(m) : me.event,
          v = me.Deferred(),
          b = me.Callbacks("once memory"),
          x = g.statusCode || {},
          a = {},
          s = {},
          C = 0,
          c = "canceled",
          k = {
            readyState: 0,
            setRequestHeader: function (e, t) {
              if (!C) {
                var n = e.toLowerCase();
                (e = s[n] = s[n] || e), (a[e] = t);
              }
              return this;
            },
            getAllResponseHeaders: function () {
              return 2 === C ? p : null;
            },
            getResponseHeader: function (e) {
              var t;
              if (2 === C) {
                if (!r)
                  for (r = {}; (t = Ct.exec(p)); ) r[t[1].toLowerCase()] = t[2];
                t = r[e.toLowerCase()];
              }
              return t === T ? null : t;
            },
            overrideMimeType: function (e) {
              return C || (g.mimeType = e), this;
            },
            abort: function (e) {
              return (e = e || c), d && d.abort(e), n(0, e), this;
            }
          };
        if (
          (v.promise(k),
          (k.success = k.done),
          (k.error = k.fail),
          (k.complete = b.add),
          (k.statusCode = function (e) {
            var t;
            if (e)
              if (C < 2) for (t in e) x[t] = [x[t], e[t]];
              else (t = e[k.status]), k.always(t);
            return this;
          }),
          (g.url = ((e || g.url) + "")
            .replace(xt, "")
            .replace(wt, vt[1] + "//")),
          (g.dataTypes = me
            .trim(g.dataType || "*")
            .toLowerCase()
            .split(K)),
          null == g.crossDomain &&
            ((i = St.exec(g.url.toLowerCase())),
            (g.crossDomain = !(
              !i ||
              (i[1] === vt[1] &&
                i[2] === vt[2] &&
                (i[3] || ("http:" === i[1] ? 80 : 443)) ==
                  (vt[3] || ("http:" === vt[1] ? 80 : 443)))
            ))),
          g.data &&
            g.processData &&
            "string" != typeof g.data &&
            (g.data = me.param(g.data, g.traditional)),
          N(At, g, t, k),
          2 === C)
        )
          return k;
        if (
          ((h = g.global),
          (g.type = g.type.toUpperCase()),
          (g.hasContent = !kt.test(g.type)),
          h && 0 == me.active++ && me.event.trigger("ajaxStart"),
          !g.hasContent &&
            (g.data &&
              ((g.url += (Tt.test(g.url) ? "&" : "?") + g.data), delete g.data),
            (u = g.url),
            !1 === g.cache))
        ) {
          var l = me.now(),
            w = g.url.replace(Et, "$1_=" + l);
          g.url =
            w + (w === g.url ? (Tt.test(g.url) ? "&" : "?") + "_=" + l : "");
        }
        for (o in (((g.data && g.hasContent && !1 !== g.contentType) ||
          t.contentType) &&
          k.setRequestHeader("Content-Type", g.contentType),
        g.ifModified &&
          ((u = u || g.url),
          me.lastModified[u] &&
            k.setRequestHeader("If-Modified-Since", me.lastModified[u]),
          me.etag[u] && k.setRequestHeader("If-None-Match", me.etag[u])),
        k.setRequestHeader(
          "Accept",
          g.dataTypes[0] && g.accepts[g.dataTypes[0]]
            ? g.accepts[g.dataTypes[0]] +
                ("*" !== g.dataTypes[0] ? ", " + jt + "; q=0.01" : "")
            : g.accepts["*"]
        ),
        g.headers))
          k.setRequestHeader(o, g.headers[o]);
        if (!g.beforeSend || (!1 !== g.beforeSend.call(m, k, g) && 2 !== C)) {
          for (o in ((c = "abort"), { success: 1, error: 1, complete: 1 }))
            k[o](g[o]);
          if ((d = N(Lt, g, t, k))) {
            (k.readyState = 1),
              h && y.trigger("ajaxSend", [k, g]),
              g.async &&
                0 < g.timeout &&
                (f = setTimeout(function () {
                  k.abort("timeout");
                }, g.timeout));
            try {
              (C = 1), d.send(a, n);
            } catch (e) {
              if (!(C < 2)) throw e;
              n(-1, e);
            }
          } else n(-1, "No Transport");
          return k;
        }
        return k.abort();
      },
      active: 0,
      lastModified: {},
      etag: {}
    });
  var Dt = [],
    Ht = /\?/,
    _t = /(=)\?(?=&|$)|\?\?/,
    Bt = me.now();
  me.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var e = Dt.pop() || me.expando + "_" + Bt++;
      return (this[e] = !0), e;
    }
  }),
    me.ajaxPrefilter("json jsonp", function (e, t, n) {
      var r,
        i,
        o,
        a = e.data,
        s = e.url,
        c = !1 !== e.jsonp,
        l = c && _t.test(s),
        u =
          c &&
          !l &&
          "string" == typeof a &&
          !(e.contentType || "").indexOf("application/x-www-form-urlencoded") &&
          _t.test(a);
      if ("jsonp" === e.dataTypes[0] || l || u)
        return (
          (r = e.jsonpCallback = me.isFunction(e.jsonpCallback)
            ? e.jsonpCallback()
            : e.jsonpCallback),
          (i = m[r]),
          l
            ? (e.url = s.replace(_t, "$1" + r))
            : u
            ? (e.data = a.replace(_t, "$1" + r))
            : c && (e.url += (Ht.test(s) ? "&" : "?") + e.jsonp + "=" + r),
          (e.converters["script json"] = function () {
            return o || me.error(r + " was not called"), o[0];
          }),
          (e.dataTypes[0] = "json"),
          (m[r] = function () {
            o = arguments;
          }),
          n.always(function () {
            (m[r] = i),
              e[r] && ((e.jsonpCallback = t.jsonpCallback), Dt.push(r)),
              o && me.isFunction(i) && i(o[0]),
              (o = i = T);
          }),
          "script"
        );
    }),
    me.ajaxSetup({
      accepts: {
        script:
          "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
      },
      contents: { script: /javascript|ecmascript/ },
      converters: {
        "text script": function (e) {
          return me.globalEval(e), e;
        }
      }
    }),
    me.ajaxPrefilter("script", function (e) {
      e.cache === T && (e.cache = !1),
        e.crossDomain && ((e.type = "GET"), (e.global = !1));
    }),
    me.ajaxTransport("script", function (t) {
      if (t.crossDomain) {
        var r,
          i = _.head || _.getElementsByTagName("head")[0] || _.documentElement;
        return {
          send: function (e, n) {
            ((r = _.createElement("script")).async = "async"),
              t.scriptCharset && (r.charset = t.scriptCharset),
              (r.src = t.url),
              (r.onload = r.onreadystatechange = function (e, t) {
                (!t && r.readyState && !/loaded|complete/.test(r.readyState)) ||
                  ((r.onload = r.onreadystatechange = null),
                  i && r.parentNode && i.removeChild(r),
                  (r = T),
                  t || n(200, "success"));
              }),
              i.insertBefore(r, i.firstChild);
          },
          abort: function () {
            r && r.onload(0, 1);
          }
        };
      }
    });
  var Ft,
    Mt,
    $t =
      !!m.ActiveXObject &&
      function () {
        for (var e in Ft) Ft[e](0, 1);
      },
    Ot = 0;
  (me.ajaxSettings.xhr = m.ActiveXObject
    ? function () {
        return (
          (!this.isLocal && w()) ||
          (function () {
            try {
              return new m.ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
          })()
        );
      }
    : w),
    (Mt = me.ajaxSettings.xhr()),
    me.extend(me.support, {
      ajax: !!Mt,
      cors: !!Mt && "withCredentials" in Mt
    }),
    me.support.ajax &&
      me.ajaxTransport(function (u) {
        var p;
        if (!u.crossDomain || me.support.cors)
          return {
            send: function (e, s) {
              var c,
                t,
                l = u.xhr();
              if (
                (u.username
                  ? l.open(u.type, u.url, u.async, u.username, u.password)
                  : l.open(u.type, u.url, u.async),
                u.xhrFields)
              )
                for (t in u.xhrFields) l[t] = u.xhrFields[t];
              u.mimeType &&
                l.overrideMimeType &&
                l.overrideMimeType(u.mimeType),
                u.crossDomain ||
                  e["X-Requested-With"] ||
                  (e["X-Requested-With"] = "XMLHttpRequest");
              try {
                for (t in e) l.setRequestHeader(t, e[t]);
              } catch (e) {}
              l.send((u.hasContent && u.data) || null),
                (p = function (e, t) {
                  var n, r, i, o, a;
                  try {
                    if (p && (t || 4 === l.readyState))
                      if (
                        ((p = T),
                        c &&
                          ((l.onreadystatechange = me.noop),
                          $t && delete Ft[c]),
                        t)
                      )
                        4 !== l.readyState && l.abort();
                      else {
                        (n = l.status),
                          (i = l.getAllResponseHeaders()),
                          (o = {}),
                          (a = l.responseXML) &&
                            a.documentElement &&
                            (o.xml = a);
                        try {
                          o.text = l.responseText;
                        } catch (e) {}
                        try {
                          r = l.statusText;
                        } catch (e) {
                          r = "";
                        }
                        n || !u.isLocal || u.crossDomain
                          ? 1223 === n && (n = 204)
                          : (n = o.text ? 200 : 404);
                      }
                  } catch (e) {
                    t || s(-1, e);
                  }
                  o && s(n, r, o, i);
                }),
                u.async
                  ? 4 === l.readyState
                    ? setTimeout(p, 0)
                    : ((c = ++Ot),
                      $t && (Ft || ((Ft = {}), me(m).unload($t)), (Ft[c] = p)),
                      (l.onreadystatechange = p))
                  : p();
            },
            abort: function () {
              p && p(0, 1);
            }
          };
      });
  var qt,
    Pt,
    Rt = /^(?:toggle|show|hide)$/,
    Wt = new RegExp("^(?:([-+])=|)(" + X + ")([a-z%]*)$", "i"),
    zt = /queueHooks$/,
    Xt = [
      function (t, e, n) {
        var r,
          i,
          o,
          a,
          s,
          c,
          l,
          u,
          p,
          d = this,
          f = t.style,
          h = {},
          g = [],
          m = t.nodeType && b(t);
        for (r in (n.queue ||
          (null == (u = me._queueHooks(t, "fx")).unqueued &&
            ((u.unqueued = 0),
            (p = u.empty.fire),
            (u.empty.fire = function () {
              u.unqueued || p();
            })),
          u.unqueued++,
          d.always(function () {
            d.always(function () {
              u.unqueued--, me.queue(t, "fx").length || u.empty.fire();
            });
          })),
        1 === t.nodeType &&
          ("height" in e || "width" in e) &&
          ((n.overflow = [f.overflow, f.overflowX, f.overflowY]),
          "inline" === me.css(t, "display") &&
            "none" === me.css(t, "float") &&
            (me.support.inlineBlockNeedsLayout && "inline" !== x(t.nodeName)
              ? (f.zoom = 1)
              : (f.display = "inline-block"))),
        n.overflow &&
          ((f.overflow = "hidden"),
          me.support.shrinkWrapBlocks ||
            d.done(function () {
              (f.overflow = n.overflow[0]),
                (f.overflowX = n.overflow[1]),
                (f.overflowY = n.overflow[2]);
            })),
        e))
          if (((o = e[r]), Rt.exec(o))) {
            if (
              (delete e[r],
              (c = c || "toggle" === o),
              o === (m ? "hide" : "show"))
            )
              continue;
            g.push(r);
          }
        if ((a = g.length)) {
          "hidden" in
            (s = me._data(t, "fxshow") || me._data(t, "fxshow", {})) &&
            (m = s.hidden),
            c && (s.hidden = !m),
            m
              ? me(t).show()
              : d.done(function () {
                  me(t).hide();
                }),
            d.done(function () {
              var e;
              for (e in (me.removeData(t, "fxshow", !0), h))
                me.style(t, e, h[e]);
            });
          for (r = 0; r < a; r++)
            (i = g[r]),
              (l = d.createTween(i, m ? s[i] : 0)),
              (h[i] = s[i] || me.style(t, i)),
              i in s ||
                ((s[i] = l.start),
                m &&
                  ((l.end = l.start),
                  (l.start = "width" === i || "height" === i ? 1 : 0)));
        }
      }
    ],
    Vt = {
      "*": [
        function (e, t) {
          var n,
            r,
            i = this.createTween(e, t),
            o = Wt.exec(t),
            a = i.cur(),
            s = +a || 0,
            c = 1,
            l = 20;
          if (o) {
            if (
              ((n = +o[2]),
              "px" !== (r = o[3] || (me.cssNumber[e] ? "" : "px")) && s)
            )
              for (
                s = me.css(i.elem, e, !0) || n || 1;
                (s /= c = c || ".5"),
                  me.style(i.elem, e, s + r),
                  c !== (c = i.cur() / a) && 1 !== c && --l;

              );
            (i.unit = r),
              (i.start = s),
              (i.end = o[1] ? s + (o[1] + 1) * n : n);
          }
          return i;
        }
      ]
    };
  (me.Animation = me.extend(S, {
    tweener: function (e, t) {
      for (
        var n,
          r = 0,
          i = (e = me.isFunction(e) ? ((t = e), ["*"]) : e.split(" ")).length;
        r < i;
        r++
      )
        (n = e[r]), (Vt[n] = Vt[n] || []), Vt[n].unshift(t);
    },
    prefilter: function (e, t) {
      t ? Xt.unshift(e) : Xt.push(e);
    }
  })),
    (((me.Tween = I).prototype = {
      constructor: I,
      init: function (e, t, n, r, i, o) {
        (this.elem = e),
          (this.prop = n),
          (this.easing = i || "swing"),
          (this.options = t),
          (this.start = this.now = this.cur()),
          (this.end = r),
          (this.unit = o || (me.cssNumber[n] ? "" : "px"));
      },
      cur: function () {
        var e = I.propHooks[this.prop];
        return e && e.get ? e.get(this) : I.propHooks._default.get(this);
      },
      run: function (e) {
        var t,
          n = I.propHooks[this.prop];
        return (
          this.options.duration
            ? (this.pos = t = me.easing[this.easing](
                e,
                this.options.duration * e,
                0,
                1,
                this.options.duration
              ))
            : (this.pos = t = e),
          (this.now = (this.end - this.start) * t + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          n && n.set ? n.set(this) : I.propHooks._default.set(this),
          this
        );
      }
    }).init.prototype = I.prototype),
    ((I.propHooks = {
      _default: {
        get: function (e) {
          var t;
          return null == e.elem[e.prop] ||
            (e.elem.style && null != e.elem.style[e.prop])
            ? (t = me.css(e.elem, e.prop, !1, "")) && "auto" !== t
              ? t
              : 0
            : e.elem[e.prop];
        },
        set: function (e) {
          me.fx.step[e.prop]
            ? me.fx.step[e.prop](e)
            : e.elem.style &&
              (null != e.elem.style[me.cssProps[e.prop]] || me.cssHooks[e.prop])
            ? me.style(e.elem, e.prop, e.now + e.unit)
            : (e.elem[e.prop] = e.now);
        }
      }
    }).scrollTop = I.propHooks.scrollLeft = {
      set: function (e) {
        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
      }
    }),
    me.each(["toggle", "show", "hide"], function (r, i) {
      var o = me.fn[i];
      me.fn[i] = function (e, t, n) {
        return null == e ||
          "boolean" == typeof e ||
          (!r && me.isFunction(e) && me.isFunction(t))
          ? o.apply(this, arguments)
          : this.animate(A(i, !0), e, t, n);
      };
    }),
    me.fn.extend({
      fadeTo: function (e, t, n, r) {
        return this.filter(b)
          .css("opacity", 0)
          .show()
          .end()
          .animate({ opacity: t }, e, n, r);
      },
      animate: function (t, e, n, r) {
        function i() {
          var e = S(this, me.extend({}, t), a);
          o && e.stop(!0);
        }
        var o = me.isEmptyObject(t),
          a = me.speed(e, n, r);
        return o || !1 === a.queue ? this.each(i) : this.queue(a.queue, i);
      },
      stop: function (i, e, o) {
        function a(e) {
          var t = e.stop;
          delete e.stop, t(o);
        }
        return (
          "string" != typeof i && ((o = e), (e = i), (i = T)),
          e && !1 !== i && this.queue(i || "fx", []),
          this.each(function () {
            var e = !0,
              t = null != i && i + "queueHooks",
              n = me.timers,
              r = me._data(this);
            if (t) r[t] && r[t].stop && a(r[t]);
            else for (t in r) r[t] && r[t].stop && zt.test(t) && a(r[t]);
            for (t = n.length; t--; )
              n[t].elem !== this ||
                (null != i && n[t].queue !== i) ||
                (n[t].anim.stop(o), (e = !1), n.splice(t, 1));
            (!e && o) || me.dequeue(this, i);
          })
        );
      }
    }),
    me.each(
      {
        slideDown: A("show"),
        slideUp: A("hide"),
        slideToggle: A("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
      },
      function (e, r) {
        me.fn[e] = function (e, t, n) {
          return this.animate(r, e, t, n);
        };
      }
    ),
    (me.speed = function (e, t, n) {
      var r =
        e && "object" == typeof e
          ? me.extend({}, e)
          : {
              complete: n || (!n && t) || (me.isFunction(e) && e),
              duration: e,
              easing: (n && t) || (t && !me.isFunction(t) && t)
            };
      return (
        (r.duration = me.fx.off
          ? 0
          : "number" == typeof r.duration
          ? r.duration
          : r.duration in me.fx.speeds
          ? me.fx.speeds[r.duration]
          : me.fx.speeds._default),
        (null != r.queue && !0 !== r.queue) || (r.queue = "fx"),
        (r.old = r.complete),
        (r.complete = function () {
          me.isFunction(r.old) && r.old.call(this),
            r.queue && me.dequeue(this, r.queue);
        }),
        r
      );
    }),
    (me.easing = {
      linear: function (e) {
        return e;
      },
      swing: function (e) {
        return 0.5 - Math.cos(e * Math.PI) / 2;
      }
    }),
    (me.timers = []),
    (me.fx = I.prototype.init),
    (me.fx.tick = function () {
      var e,
        t = me.timers,
        n = 0;
      for (qt = me.now(); n < t.length; n++)
        (e = t[n])() || t[n] !== e || t.splice(n--, 1);
      t.length || me.fx.stop(), (qt = T);
    }),
    (me.fx.timer = function (e) {
      e() &&
        me.timers.push(e) &&
        !Pt &&
        (Pt = setInterval(me.fx.tick, me.fx.interval));
    }),
    (me.fx.interval = 13),
    (me.fx.stop = function () {
      clearInterval(Pt), (Pt = null);
    }),
    (me.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (me.fx.step = {}),
    me.expr &&
      me.expr.filters &&
      (me.expr.filters.animated = function (t) {
        return me.grep(me.timers, function (e) {
          return t === e.elem;
        }).length;
      });
  var Kt = /^(?:body|html)$/i;
  (me.fn.offset = function (t) {
    if (arguments.length)
      return t === T
        ? this
        : this.each(function (e) {
            me.offset.setOffset(this, t, e);
          });
    var e,
      n,
      r,
      i,
      o,
      a,
      s,
      c = { top: 0, left: 0 },
      l = this[0],
      u = l && l.ownerDocument;
    return u
      ? (n = u.body) === l
        ? me.offset.bodyOffset(l)
        : ((e = u.documentElement),
          me.contains(e, l)
            ? (void 0 !== l.getBoundingClientRect &&
                (c = l.getBoundingClientRect()),
              (r = L(u)),
              (i = e.clientTop || n.clientTop || 0),
              (o = e.clientLeft || n.clientLeft || 0),
              (a = r.pageYOffset || e.scrollTop),
              (s = r.pageXOffset || e.scrollLeft),
              { top: c.top + a - i, left: c.left + s - o })
            : c)
      : void 0;
  }),
    (me.offset = {
      bodyOffset: function (e) {
        var t = e.offsetTop,
          n = e.offsetLeft;
        return (
          me.support.doesNotIncludeMarginInBodyOffset &&
            ((t += parseFloat(me.css(e, "marginTop")) || 0),
            (n += parseFloat(me.css(e, "marginLeft")) || 0)),
          { top: t, left: n }
        );
      },
      setOffset: function (e, t, n) {
        var r = me.css(e, "position");
        "static" === r && (e.style.position = "relative");
        var i,
          o,
          a = me(e),
          s = a.offset(),
          c = me.css(e, "top"),
          l = me.css(e, "left"),
          u = {},
          p = {};
        (o =
          ("absolute" === r || "fixed" === r) && -1 < me.inArray("auto", [c, l])
            ? ((i = (p = a.position()).top), p.left)
            : ((i = parseFloat(c) || 0), parseFloat(l) || 0)),
          me.isFunction(t) && (t = t.call(e, n, s)),
          null != t.top && (u.top = t.top - s.top + i),
          null != t.left && (u.left = t.left - s.left + o),
          "using" in t ? t.using.call(e, u) : a.css(u);
      }
    }),
    me.fn.extend({
      position: function () {
        if (this[0]) {
          var e = this[0],
            t = this.offsetParent(),
            n = this.offset(),
            r = Kt.test(t[0].nodeName) ? { top: 0, left: 0 } : t.offset();
          return (
            (n.top -= parseFloat(me.css(e, "marginTop")) || 0),
            (n.left -= parseFloat(me.css(e, "marginLeft")) || 0),
            (r.top += parseFloat(me.css(t[0], "borderTopWidth")) || 0),
            (r.left += parseFloat(me.css(t[0], "borderLeftWidth")) || 0),
            { top: n.top - r.top, left: n.left - r.left }
          );
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (
            var e = this.offsetParent || _.body;
            e && !Kt.test(e.nodeName) && "static" === me.css(e, "position");

          )
            e = e.offsetParent;
          return e || _.body;
        });
      }
    }),
    me.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (
      t,
      i
    ) {
      var o = /Y/.test(i);
      me.fn[t] = function (e) {
        return me.access(
          this,
          function (e, t, n) {
            var r = L(e);
            if (n === T)
              return r ? (i in r ? r[i] : r.document.documentElement[t]) : e[t];
            r
              ? r.scrollTo(
                  o ? me(r).scrollLeft() : n,
                  o ? n : me(r).scrollTop()
                )
              : (e[t] = n);
          },
          t,
          e,
          arguments.length,
          null
        );
      };
    }),
    me.each({ Height: "height", Width: "width" }, function (o, a) {
      me.each({ padding: "inner" + o, content: a, "": "outer" + o }, function (
        r,
        e
      ) {
        me.fn[e] = function (e, t) {
          var n = arguments.length && (r || "boolean" != typeof e),
            i = r || (!0 === e || !0 === t ? "margin" : "border");
          return me.access(
            this,
            function (e, t, n) {
              var r;
              return me.isWindow(e)
                ? e.document.documentElement["client" + o]
                : 9 === e.nodeType
                ? ((r = e.documentElement),
                  Math.max(
                    e.body["scroll" + o],
                    r["scroll" + o],
                    e.body["offset" + o],
                    r["offset" + o],
                    r["client" + o]
                  ))
                : n === T
                ? me.css(e, t, n, i)
                : me.style(e, t, n, i);
            },
            a,
            n ? e : T,
            n,
            null
          );
        };
      });
    }),
    (m.jQuery = m.$ = me),
    "function" == typeof define &&
      define.amd &&
      define.amd.jQuery &&
      define("jquery", [], function () {
        return me;
      });
})(window),
  $(document).ready(function () {
    (shiftIsPressed = !1),
      (ctrlIsPressed = !1),
      (capsMode = 0),
      (ie9 = !1),
      (safari = !1),
      $.browser.msie && "9.0" == $.browser.version && (ie9 = !0),
      $.browser.safari && (safari = !0);
  }),
  $(document).keydown(function (e) {
    if (16 == e.keyCode && 0 == shiftIsPressed)
      switch (((shiftIsPressed = !0), capsMode)) {
        case 0:
          manageKeyboard(1);
          break;
        case 1:
          manageKeyboard(0);
      }
    17 == e.keyCode && (ctrlIsPressed = !0),
      1 == interceptKey &&
        0 == ctrlIsPressed &&
        (1 == safari
          ? 192 == e.keyCode && manageCharInterception(e, 1, 222)
          : 192 == e.keyCode && manageCharInterception(e, 1, 192),
        163 == e.keyCode && manageCharInterception(e, 1, 192),
        49 == e.keyCode && manageCharInterception(e, 1, 49),
        50 == e.keyCode && manageCharInterception(e, 1, 50),
        51 == e.keyCode && manageCharInterception(e, 1, 51),
        52 == e.keyCode && manageCharInterception(e, 1, 52),
        53 == e.keyCode && manageCharInterception(e, 1, 53),
        54 == e.keyCode && manageCharInterception(e, 1, 54),
        55 == e.keyCode && manageCharInterception(e, 1, 55),
        56 == e.keyCode && manageCharInterception(e, 1, 56),
        57 == e.keyCode && manageCharInterception(e, 1, 57),
        48 == e.keyCode && manageCharInterception(e, 1, 48),
        173 == e.keyCode && manageCharInterception(e, 1, 173),
        189 == e.keyCode && manageCharInterception(e, 1, 173),
        61 == e.keyCode && manageCharInterception(e, 1, 61),
        187 == e.keyCode && manageCharInterception(e, 1, 61),
        81 == e.keyCode && manageCharInterception(e, 1, 81),
        87 == e.keyCode && manageCharInterception(e, 1, 87),
        69 == e.keyCode && manageCharInterception(e, 1, 69),
        82 == e.keyCode && manageCharInterception(e, 1, 82),
        84 == e.keyCode && manageCharInterception(e, 1, 84),
        89 == e.keyCode && manageCharInterception(e, 1, 89),
        85 == e.keyCode && manageCharInterception(e, 1, 85),
        73 == e.keyCode && manageCharInterception(e, 1, 73),
        79 == e.keyCode && manageCharInterception(e, 1, 79),
        80 == e.keyCode && manageCharInterception(e, 1, 80),
        160 == e.keyCode && manageCharInterception(e, 1, 160),
        219 == e.keyCode && manageCharInterception(e, 1, 160),
        221 == e.keyCode && manageCharInterception(e, 1, 221),
        220 == e.keyCode && manageCharInterception(e, 1, 220),
        65 == e.keyCode && manageCharInterception(e, 1, 65),
        83 == e.keyCode && manageCharInterception(e, 1, 83),
        68 == e.keyCode && manageCharInterception(e, 1, 68),
        70 == e.keyCode && manageCharInterception(e, 1, 70),
        71 == e.keyCode && manageCharInterception(e, 1, 71),
        72 == e.keyCode && manageCharInterception(e, 1, 72),
        74 == e.keyCode && manageCharInterception(e, 1, 74),
        75 == e.keyCode && manageCharInterception(e, 1, 75),
        76 == e.keyCode && manageCharInterception(e, 1, 76),
        59 == e.keyCode && manageCharInterception(e, 1, 59),
        186 == e.keyCode && manageCharInterception(e, 1, 59),
        1 == safari
          ? 222 == e.keyCode && manageCharInterception(e, 1, 192)
          : 222 == e.keyCode && manageCharInterception(e, 1, 222),
        90 == e.keyCode && manageCharInterception(e, 1, 90),
        88 == e.keyCode && manageCharInterception(e, 1, 88),
        67 == e.keyCode && manageCharInterception(e, 1, 67),
        86 == e.keyCode && manageCharInterception(e, 1, 86),
        66 == e.keyCode && manageCharInterception(e, 1, 66),
        78 == e.keyCode && manageCharInterception(e, 1, 78),
        77 == e.keyCode && manageCharInterception(e, 1, 77),
        188 == e.keyCode && manageCharInterception(e, 1, 188),
        190 == e.keyCode && manageCharInterception(e, 1, 190),
        191 == e.keyCode && manageCharInterception(e, 1, 191));
  }),
  $(document).keyup(function (e) {
    if (16 == e.keyCode)
      switch (((shiftIsPressed = !1), capsMode)) {
        case 0:
          manageKeyboard(0);
          break;
        case 1:
          manageKeyboard(1);
      }
    17 == e.keyCode && (ctrlIsPressed = !1),
      1 == interceptKey &&
        (1 == safari
          ? 192 == e.keyCode && manageCharInterception(e, 0, 222)
          : 192 == e.keyCode && manageCharInterception(e, 0, 192),
        163 == e.keyCode && manageCharInterception(e, 0, 192),
        49 == e.keyCode && manageCharInterception(e, 0, 49),
        50 == e.keyCode && manageCharInterception(e, 0, 50),
        51 == e.keyCode && manageCharInterception(e, 0, 51),
        52 == e.keyCode && manageCharInterception(e, 0, 52),
        53 == e.keyCode && manageCharInterception(e, 0, 53),
        54 == e.keyCode && manageCharInterception(e, 0, 54),
        55 == e.keyCode && manageCharInterception(e, 0, 55),
        56 == e.keyCode && manageCharInterception(e, 0, 56),
        57 == e.keyCode && manageCharInterception(e, 0, 57),
        48 == e.keyCode && manageCharInterception(e, 0, 48),
        173 == e.keyCode && manageCharInterception(e, 0, 173),
        189 == e.keyCode && manageCharInterception(e, 0, 173),
        187 == e.keyCode && manageCharInterception(e, 0, 61),
        61 == e.keyCode && manageCharInterception(e, 0, 61),
        81 == e.keyCode && manageCharInterception(e, 0, 81),
        87 == e.keyCode && manageCharInterception(e, 0, 87),
        69 == e.keyCode && manageCharInterception(e, 0, 69),
        82 == e.keyCode && manageCharInterception(e, 0, 82),
        84 == e.keyCode && manageCharInterception(e, 0, 84),
        89 == e.keyCode && manageCharInterception(e, 0, 89),
        85 == e.keyCode && manageCharInterception(e, 0, 85),
        73 == e.keyCode && manageCharInterception(e, 0, 73),
        79 == e.keyCode && manageCharInterception(e, 0, 79),
        80 == e.keyCode && manageCharInterception(e, 0, 80),
        160 == e.keyCode && manageCharInterception(e, 0, 160),
        219 == e.keyCode && manageCharInterception(e, 0, 160),
        221 == e.keyCode && manageCharInterception(e, 0, 221),
        220 == e.keyCode && manageCharInterception(e, 0, 220),
        65 == e.keyCode && manageCharInterception(e, 0, 65),
        83 == e.keyCode && manageCharInterception(e, 0, 83),
        68 == e.keyCode && manageCharInterception(e, 0, 68),
        70 == e.keyCode && manageCharInterception(e, 0, 70),
        71 == e.keyCode && manageCharInterception(e, 0, 71),
        72 == e.keyCode && manageCharInterception(e, 0, 72),
        74 == e.keyCode && manageCharInterception(e, 0, 74),
        75 == e.keyCode && manageCharInterception(e, 0, 75),
        76 == e.keyCode && manageCharInterception(e, 0, 76),
        59 == e.keyCode && manageCharInterception(e, 0, 59),
        186 == e.keyCode && manageCharInterception(e, 0, 59),
        1 == safari
          ? 222 == e.keyCode && manageCharInterception(e, 0, 192)
          : 222 == e.keyCode && manageCharInterception(e, 0, 222),
        90 == e.keyCode && manageCharInterception(e, 0, 90),
        88 == e.keyCode && manageCharInterception(e, 0, 88),
        67 == e.keyCode && manageCharInterception(e, 0, 67),
        86 == e.keyCode && manageCharInterception(e, 0, 86),
        66 == e.keyCode && manageCharInterception(e, 0, 66),
        78 == e.keyCode && manageCharInterception(e, 0, 78),
        77 == e.keyCode && manageCharInterception(e, 0, 77),
        188 == e.keyCode && manageCharInterception(e, 0, 188),
        190 == e.keyCode && manageCharInterception(e, 0, 190),
        191 == e.keyCode && manageCharInterception(e, 0, 191));
  });
