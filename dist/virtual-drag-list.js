/*!
 * vue-virtual-draglist v3.2.1
 * open source under the MIT license
 * https://github.com/mfuu/vue3-virtual-drag-list#readme
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VirtualDragList = factory(global.Vue));
})(this, (function (vue) { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var sortableDnd_min = {exports: {}};

  (function (module, exports) {
    !function (t, e) {
      module.exports = e() ;
    }(commonjsGlobal, function () {

      function L(t) {
        return (L = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
          return typeof t;
        } : function (t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        })(t);
      }
      function l() {
        return (l = Object.assign ? Object.assign.bind() : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var n,
              o = arguments[e];
            for (n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n]);
          }
          return t;
        }).apply(this, arguments);
      }
      var W = {
          capture: !1,
          passive: !1
        },
        R = /\s+/g;
      function t(t) {
        if ("undefined" != typeof window && window.navigator) return !!navigator.userAgent.match(t);
      }
      var n,
        e,
        h = t(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
        B = t(/Edge/i),
        F = t(/safari/i) && !t(/chrome/i) && !t(/android/i),
        k = (n = !1, document.addEventListener("checkIfSupportPassive", null, {
          get passive() {
            return n = !0;
          }
        }), n),
        z = "undefined" == typeof window || "undefined" == typeof document ? {} : (e = window.getComputedStyle(document.documentElement, "") || ["-moz-hidden-iframe"], e = (Array.prototype.slice.call(e).join("").match(/-(moz|webkit|ms)-/) || "" === e.OLink && ["", "o"])[1], {
          dom: "WebKit|Moz|MS|O".match(new RegExp("(" + e + ")", "i"))[1],
          lowercase: e,
          css: "-" + e + "-",
          js: e[0].toUpperCase() + e.substr(1)
        });
      function j(t, e) {
        t.style["".concat(z.css, "transition-duration")] = null == e ? "" : "".concat(e, "ms");
      }
      function a(t, e) {
        t.style["".concat(z.css, "transform")] = e ? "".concat(e) : "";
      }
      function r(t, e, n) {
        window.addEventListener ? t.addEventListener(e, n, !(!k && h) && W) : window.attachEvent ? t.attachEvent("on" + e, n) : t["on" + e] = n;
      }
      function o(t, e, n) {
        window.removeEventListener ? t.removeEventListener(e, n, !(!k && h) && W) : window.detachEvent ? t.detachEvent("on" + e, n) : t["on" + e] = null;
      }
      function G() {
        return document.scrollingElement || document.documentElement;
      }
      function f(t, e, n) {
        if (t.getBoundingClientRect || t === window) {
          var o,
            i,
            s,
            l,
            r,
            a,
            c = t !== window && t.parentNode && t !== G() ? (i = (o = t.getBoundingClientRect()).top, s = o.left, l = o.bottom, r = o.right, a = o.height, o.width) : (s = i = 0, l = window.innerHeight, r = window.innerWidth, a = window.innerHeight, window.innerWidth);
          if (e && t !== window) {
            n = n || t.parentNode;
            do {
              if (n && n.getBoundingClientRect) {
                var h = n.getBoundingClientRect();
                i -= h.top + parseInt(p(n, "border-top-width")), s -= h.left + parseInt(p(n, "border-left-width")), l = i + o.height, r = s + o.width;
                break;
              }
            } while (n = n.parentNode);
          }
          return {
            top: i,
            left: s,
            bottom: l,
            right: r,
            width: c,
            height: a
          };
        }
      }
      function c(t, e, n, o) {
        if (t) {
          n = n || document;
          do {
            if (null == e) {
              var i = Array.prototype.slice.call(n.children),
                s = i.indexOf(t);
              if (-1 < s) return i[s];
              for (var l = 0; l < i.length; l++) if (V(t, i[l])) return i[l];
            } else if ((">" !== e[0] || t.parentNode === n) && d(t, e) || o && t === n) return t;
          } while (t = t.parentNode);
        }
        return null;
      }
      function V(t, e) {
        if (t && e) {
          if (e.compareDocumentPosition) return e === t || 16 & e.compareDocumentPosition(t);
          if (e.contains && 1 === t.nodeType) return e.contains(t) && e !== t;
          for (; t = t.parentNode;) if (t === e) return 1;
        }
      }
      function i(t, e) {
        var n = 0;
        if (!t || !t.parentNode) return -1;
        for (; t = t.previousElementSibling;) "TEMPLATE" === t.nodeName.toUpperCase() || e && !d(t, e) || "none" === p(t, "display") || n++;
        return n;
      }
      function q(t, e, n, o) {
        for (var i = 0, s = 0, l = t.children; i < l.length;) {
          if (l[i] !== H.ghost && "none" !== p(l[i], "display") && c(l[i], n, t, !1) && (o || l[i] !== H.dragged)) {
            if (s === e) return l[i];
            s++;
          }
          i++;
        }
        return null;
      }
      function U(t, e) {
        var n,
          o = p(t),
          i = parseInt(o.width) - parseInt(o.paddingLeft) - parseInt(o.paddingRight) - parseInt(o.borderLeftWidth) - parseInt(o.borderRightWidth),
          s = q(t, 0, e),
          t = q(t, 1, e),
          e = s && p(s),
          l = t && p(t),
          r = e && parseInt(e.marginLeft) + parseInt(e.marginRight) + f(s).width,
          a = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + f(t).width,
          c = B || h ? "cssFloat" : "float";
        return "flex" === o.display ? "column" === o.flexDirection || "column-reverse" === o.flexDirection ? "vertical" : "horizontal" : "grid" === o.display ? o.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal" : s && e.float && "none" !== e.float ? (n = "left" === e.float ? "left" : "right", !t || "both" !== l.clear && l.clear !== n ? "horizontal" : "vertical") : s && ("block" === e.display || "flex" === e.display || "table" === e.display || "grid" === e.display || i <= r && "none" === o[c] || t && "none" === o[c] && i < r + a) ? "vertical" : "horizontal";
      }
      function u(t, e, n) {
        var o;
        t && e && (t.classList ? t.classList[n ? "add" : "remove"](e) : (o = (" " + t.className + " ").replace(R, " ").replace(" " + e + " ", " "), t.className = (o + (n ? " " + e : "")).replace(R, " ")));
      }
      function d(t, e) {
        if (e && (">" === e[0] && (e = e.substring(1)), t)) try {
          if (t.matches) return t.matches(e);
          if (t.msMatchesSelector) return t.msMatchesSelector(e);
          if (t.webkitMatchesSelector) return t.webkitMatchesSelector(e);
        } catch (t) {
          return;
        }
      }
      function p(t, e, n) {
        var o = t && t.style;
        if (o) {
          if (void 0 === n) return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), void 0 === e ? n : n[e];
          o[e = e in o || -1 !== e.indexOf("webkit") ? e : "-webkit-" + e] = n + ("string" == typeof n ? "" : "px");
        }
      }
      function s(t, e) {
        e = e;
        t = (t = t).compareDocumentPosition ? t.compareDocumentPosition(e) : t.contains ? (t != e && t.contains(e) && 16) + (t != e && e.contains(t) && 8) + (0 <= t.sourceIndex && 0 <= e.sourceIndex ? (t.sourceIndex < e.sourceIndex && 4) + (t.sourceIndex > e.sourceIndex && 2) : 1) + 0 : 0;
        return 2 === t ? 1 : 4 === t ? -1 : 0;
      }
      function K(t) {
        void 0 !== t.preventDefault && t.cancelable && t.preventDefault();
      }
      function m(t) {
        var e = t.sortable,
          n = t.name,
          t = t.params,
          e = e.options[n];
        "function" == typeof e && e(l({}, t));
      }
      var g,
        v,
        y = "Sortable" + Date.now();
      function Z(t) {
        this.options = t, this.autoScrollAnimationFrame = null;
      }
      function J(t) {
        this.options = t, this.animations = [];
      }
      function Q(t) {
        this.options = t || {}, this.selectedElements = [];
      }
      window.requestAnimationFrame || (window.requestAnimationFrame = function (t) {
        return setTimeout(t, 17);
      }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
        clearTimeout(t);
      }), Z.prototype = {
        destroy: function () {
          null != this.autoScrollAnimationFrame && (cancelAnimationFrame(this.autoScrollAnimationFrame), this.autoScrollAnimationFrame = null);
        },
        update: function (t, e, n) {
          var o = this;
          cancelAnimationFrame(this.autoScrollAnimationFrame), this.autoScrollAnimationFrame = requestAnimationFrame(function () {
            e && n && o.autoScroll(t, n), o.update(t, e, n);
          });
        },
        autoScroll: function (t, e) {
          var n, o, i, s, l, r, a, c, h, u, d, p, m;
          t && void 0 !== e.clientX && void 0 !== e.clientY && (u = f(t)) && (n = e.clientX, e = e.clientY, o = u.top, i = u.right, s = u.bottom, l = u.left, p = u.height, u = u.width, e < o || i < n || s < e || n < l || (r = (a = this.options).scrollThreshold, a = a.scrollSpeed, d = t.scrollTop, c = t.scrollLeft, m = t.scrollHeight, h = 0 < d && o <= e && e <= o + r, u = c + u < t.scrollWidth && n <= i && i - r <= n, d = d + p < m && e <= s && s - r <= e, (m = p = 0) < c && l <= n && n <= l + r && (p = Math.floor(Math.max(-1, (n - l) / r - 1) * a.x)), u && (p = Math.ceil(Math.min(1, (n - i) / r + 1) * a.x)), h && (m = Math.floor(Math.max(-1, (e - o) / r - 1) * a.y)), (m = d ? Math.ceil(Math.min(1, (e - s) / r + 1) * a.y) : m) && (t.scrollTop += m), p && (t.scrollLeft += p)));
        }
      }, J.prototype = {
        collect: function (t) {
          if (t) {
            for (var e = f(t), n = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, o = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, i = Math.min(e.right, n), s = Math.min(e.bottom, o), l = Array.prototype.slice.call(t.children), r = [], a = 0; a <= l.length; a++) {
              var c = l[a];
              if (c && c !== H.ghost && "none" !== p(c, "display")) {
                var h = f(c);
                if (!(h.bottom < 0 || h.right < 0)) {
                  if (h.top - h.height > s || h.left - h.width > i) break;
                  r.push({
                    node: c,
                    rect: h
                  });
                }
              }
            }
            this.animations.push(r);
          }
        },
        animate: function () {
          for (var t = this.animations.pop(), e = 0, n = t.length; e < n; e++) {
            var o = t[e],
              i = o.node,
              o = o.rect;
            this._excute(i, o);
          }
        },
        _excute: function (t, e) {
          var n = e.left,
            e = e.top,
            o = f(t);
          o.top === e && o.left === n || (e = e - o.top, n = n - o.left, j(t), a(t, "translate3d(".concat(n, "px, ").concat(e, "px, 0)")), t.offsetWidth, j(t, this.options.animation), a(t, "translate3d(0px, 0px, 0px)"), clearTimeout(t.animated), t.animated = setTimeout(function () {
            j(t), a(t, ""), t.animated = null;
          }, this.options.animation));
        }
      }, Q.prototype = {
        destroy: function () {
          g = v = null;
        },
        active: function () {
          return !!g;
        },
        setParams: function (t) {
          t.nodes = g || [], t.clones = v || [];
        },
        select: function (t) {
          u(t, this.options.selectedClass, !0), this.selectedElements.push(t), this.selectedElements.sort(s);
        },
        deselect: function (t) {
          var e = this.selectedElements.indexOf(t);
          -1 < e && (u(t, this.options.selectedClass, !1), this.selectedElements.splice(e, 1));
        },
        getGhostElement: function () {
          var n;
          return g ? (n = document.createElement("div"), this.selectedElements.forEach(function (t, e) {
            t = t.cloneNode(!0);
            t.style = "position: absolute;left: 0;top: 0;bottom: 0;right: 0;opacity: ".concat(0 === e ? 1 : .5, ";z-index: ").concat(e, ";"), n.appendChild(t);
          }), n) : null;
        },
        toggleSelected: function (e, t) {
          var n = this;
          t ? e.forEach(function (t) {
            return n.selectedElements.push(t);
          }) : this.selectedElements = this.selectedElements.filter(function (t) {
            return e.indexOf(t) < 0;
          });
        },
        toggleClass: function (t) {
          if (g) for (var e = 0; e < g.length; e++) u(g[e], this.options.chosenClass, t);
        },
        toggleVisible: function (t) {
          g && (t ? (t = g.indexOf(H.dragged), this._viewElements(g, t, H.dragged)) : this._hideElements(g));
        },
        onChoose: function () {
          !this.options.multiple || !this.selectedElements.length || this.selectedElements.indexOf(H.dragged) < 0 || (this.selectedElements.sort(s), g = this.selectedElements, this.toggleClass(!0));
        },
        onDrag: function (t) {
          g && (t.animator.collect(H.dragged.parentNode), this._hideElements(g), t.animator.animate(), this.toggleClass(!1));
        },
        onDrop: function (t, e, n) {
          var o, i, s;
          g && (i = H.clone, s = g.indexOf(o = H.dragged), e[y].animator.collect(i.parentNode), t !== e && "clone" === n ? (p(i, "display", "none"), v = g.map(function (t) {
            return t.cloneNode(!0);
          }), this._viewElements(v, s, i), this._viewElements(g, s, o)) : this._viewElements(g, s, i), e[y].animator.animate(), t !== e) && (e[y].multiplayer.toggleSelected(v || g, !0), "clone" !== n) && t[y].multiplayer.toggleSelected(g, !1);
        },
        onSelect: function (t, e, n) {
          var o = this.selectedElements.indexOf(e),
            t = (u(e, this.options.selectedClass, o < 0), {
              from: n.el,
              event: t,
              node: e,
              index: i(e)
            });
          o < 0 ? (this.selectedElements.push(e), m({
            sortable: n,
            name: "onSelect",
            params: t
          })) : (this.selectedElements.splice(o, 1), m({
            sortable: n,
            name: "onDeselect",
            params: t
          })), this.selectedElements.sort(s);
        },
        _viewElements: function (t, e, n) {
          for (var o, i = 0; i < t.length; i++) p(t[i], "display", ""), i < e ? n.parentNode.insertBefore(t[i], n) : (o = 0 < i ? t[i - 1] : n, n.parentNode.insertBefore(t[i], o.nextSibling));
        },
        _hideElements: function (t) {
          for (var e = 0; e < t.length; e++) t[e] != H.dragged && p(t[e], "display", "none");
        }
      };
      var w,
        b,
        _,
        $,
        S,
        E,
        x,
        D,
        C,
        M,
        N,
        T,
        tt,
        I,
        P,
        O,
        X,
        Y,
        et,
        A,
        nt = [],
        ot = function (t) {
          var e = {},
            n = t.group;
          n && "object" == L(n) || (n = {
            name: n,
            pull: !0,
            put: !0,
            revertDrag: !0
          }), e.name = n.name, e.pull = n.pull, e.put = n.put, e.revertDrag = n.revertDrag, t.group = e;
        };
      function H(t, e) {
        if (!t || !t.nodeType || 1 !== t.nodeType) throw "Sortable-dnd: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
        (t[y] = this).el = t, this.options = e = l({}, e);
        var n,
          o,
          i = {
            store: null,
            disabled: !1,
            group: "",
            animation: 150,
            draggable: null,
            handle: null,
            multiple: !1,
            selectHandle: null,
            customGhost: null,
            direction: function () {
              return U(t, e.draggable);
            },
            autoScroll: !0,
            scrollThreshold: 55,
            scrollSpeed: {
              x: 10,
              y: 10
            },
            delay: 0,
            delayOnTouchOnly: !1,
            touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
            ghostClass: "",
            ghostStyle: {},
            chosenClass: "",
            selectedClass: "",
            swapOnDrop: !0,
            fallbackOnBody: !1,
            supportTouch: "ontouchstart" in window,
            emptyInsertThreshold: -5
          };
        for (n in i) n in this.options || (this.options[n] = i[n]);
        for (o in ot(e), this) "_" === o.charAt(0) && "function" == typeof this[o] && (this[o] = this[o].bind(this));
        var s = this.options.supportTouch;
        r(t, s ? "touchstart" : "mousedown", this._onDrag), nt.push(t), this.autoScroller = new Z(this.options), this.multiplayer = new Q(this.options), this.animator = new J(this.options);
      }
      return H.prototype = {
        constructor: H,
        _onDrag: function (t) {
          var e,
            n,
            o,
            i,
            s = this;
          b || this.options.disabled || !this.options.group.pull || /mousedown|pointerdown/.test(t.type) && 0 !== t.button || (o = ((e = t.touches && t.touches[0]) || t).target, F && o && "SELECT" === o.tagName.toUpperCase()) || !(n = c(o, this.options.draggable, this.el)) || n.animated || (D = {
            original: t,
            clientX: (e || t).clientX,
            clientY: (e || t).clientY
          }, b = n, r(N = e ? b : document, "mouseup", this._onDrop), r(N, "touchend", this._onDrop), r(N, "touchcancel", this._onDrop), i = (n = this.options).handle, "function" == typeof (n = n.selectHandle) && n(t)) || "string" == typeof n && d(o, n) || "function" == typeof i && !i(t) || "string" == typeof i && !d(o, i) || (o = (n = this.options).delay, i = n.delayOnTouchOnly, !o || i && !e || B || h ? this._onStart(e, t) : (r(this.el.ownerDocument, "touchmove", this._delayMoveHandler), r(this.el.ownerDocument, "mousemove", this._delayMoveHandler), r(this.el.ownerDocument, "mouseup", this._cancelStart), r(this.el.ownerDocument, "touchend", this._cancelStart), r(this.el.ownerDocument, "touchcancel", this._cancelStart), tt = setTimeout(function () {
            return s._onStart(e, t);
          }, o)));
        },
        _delayMoveHandler: function (t) {
          t = t.touches ? t.touches[0] : t;
          Math.max(Math.abs(t.clientX - D.clientX), Math.abs(t.clientY - D.clientY)) >= Math.floor(this.options.touchStartThreshold / (window.devicePixelRatio || 1)) && this._cancelStart();
        },
        _cancelStart: function () {
          clearTimeout(tt), o(this.el.ownerDocument, "touchmove", this._delayMoveHandler), o(this.el.ownerDocument, "mousemove", this._delayMoveHandler), o(this.el.ownerDocument, "mouseup", this._cancelStart), o(this.el.ownerDocument, "touchend", this._cancelStart), o(this.el.ownerDocument, "touchcancel", this._cancelStart);
        },
        _onStart: function (t, e) {
          var n = i(b);
          I = this.el, P = this.el, et = Y = X = n, A = b, w = this.el, S = b.cloneNode(!0), x = b.parentNode, O = this.options.group.pull, H.clone = S, H.active = this, u(H.dragged = b, this.options.chosenClass, !0), this.multiplayer.onChoose(), m({
            sortable: this,
            name: "onChoose",
            params: this._getParams(e)
          }), r(N, t ? "touchmove" : "mousemove", this._nearestSortable);
          try {
            document.selection ? setTimeout(function () {
              return document.selection.empty();
            }, 0) : window.getSelection().removeAllRanges();
          } catch (t) {}
        },
        _onStarted: function () {
          u(S, this.options.chosenClass, !0), this._appendGhost(), this.multiplayer.onDrag(this), m({
            sortable: this,
            name: "onDrag",
            params: this._getParams(D.original)
          }), p(b, "display", "none"), u(b, this.options.chosenClass, !1), b.parentNode.insertBefore(S, b), F && p(document.body, "user-select", "none");
        },
        _getGhostElement: function () {
          var t = this.options.customGhost;
          return "function" == typeof t ? t((t = this.multiplayer.selectedElements).length ? t : [b]) : this.multiplayer.getGhostElement() || b;
        },
        _appendGhost: function () {
          if (!E) {
            var t,
              e = this.options,
              n = e.fallbackOnBody,
              o = e.ghostClass,
              e = e.ghostStyle,
              n = n ? document.body : this.el,
              i = this._getGhostElement(),
              i = (u(E = i.cloneNode(!0), o, !0), f(b)),
              s = l({
                position: "fixed",
                top: i.top,
                left: i.left,
                width: i.width,
                height: i.height,
                minWidth: i.width,
                minHeight: i.height,
                opacity: "0.8",
                overflow: "hidden",
                "z-index": "100000",
                "box-sizing": "border-box",
                "pointer-events": "none"
              }, e);
            for (t in s) p(E, t, s[t]);
            o = "none", E.style["".concat(z.css, "transition")] = o ? "none" === o ? "none" : "".concat(o) : "", a(E, "translate3d(0px, 0px, 0px)"), H.ghost = E, n.appendChild(E);
            e = (D.clientX - i.left) / parseInt(E.style.width) * 100, o = (D.clientY - i.top) / parseInt(E.style.height) * 100;
            p(E, "transform-origin", "".concat(e, "% ").concat(o, "%")), p(E, "transform", "translateZ(0)"), p(E, "will-change", "transform");
          }
        },
        _nearestSortable: function (t) {
          K(t);
          var e,
            n,
            i,
            s,
            l,
            o = t.touches && t.touches[0],
            r = o || t;
          !D || !b || (n = C || D, void 0 !== (e = r).clientX && void 0 !== e.clientY && Math.abs(e.clientX - n.clientX) <= 0 && Math.abs(e.clientY - n.clientY) <= 0) || (C || this._onStarted(), C = {
            original: t,
            clientX: r.clientX,
            clientY: r.clientY
          }, e = o ? document.elementFromPoint(r.clientX, r.clientY) : r.target, n = r.clientX - D.clientX, o = r.clientY - D.clientY, a(E, "translate3d(".concat(n, "px, ").concat(o, "px, 0)")), this.options.autoScroll && (n = function (t, e) {
            if (t && t.getBoundingClientRect) {
              var n = t,
                o = !1;
              do {
                if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
                  var i = p(n);
                  if (n.clientWidth < n.scrollWidth && ("auto" == i.overflowX || "scroll" == i.overflowX) || n.clientHeight < n.scrollHeight && ("auto" == i.overflowY || "scroll" == i.overflowY)) {
                    if (!n.getBoundingClientRect || n === document.body) return G();
                    if (o || e) return n;
                    o = !0;
                  }
                }
              } while (n = n.parentNode);
            }
            return G();
          }(e, !0), this.autoScroller.update(n, D, C)), i = r.clientX, s = r.clientY, nt.some(function (t) {
            var e,
              n,
              o = t[y].options.emptyInsertThreshold;
            if (null != o) return n = f(t), e = i >= n.left - o && i <= n.right + o, n = s >= n.top - o && s <= n.bottom + o, e && n ? l = t : void 0;
          }), l && l[y]._onMove(t, e));
        },
        _allowPut: function () {
          var t, e, n;
          return w === this.el || !!this.options.group.put && (t = (e = this.options.group).name, e = e.put, n = w[y].options.group, e.join && -1 < e.indexOf(n.name) || n.name && t && n.name === t);
        },
        _allowSwap: function () {
          var t = s(S, _),
            e = ($ = t < 0 ? _.nextSibling : _, f(_)),
            n = "function" == typeof this.options.direction ? this.options.direction.call(C.original, b, this) : this.options.direction,
            o = "vertical" === n,
            i = o ? C.clientY : C.clientX,
            n = _["vertical" === n ? "offsetHeight" : "offsetWidth"],
            i = i >= (o ? e.top : e.left) && i < (o ? e.bottom : e.right) - n / 2 ? -1 : 1;
          return M !== _ ? (T = i, !0) : T !== i && ((T = i) < 0 ? 0 < t : t < 0);
        },
        _onMove: function (t, e) {
          var n, o, i;
          this._allowPut() && (m({
            sortable: this,
            name: "onMove",
            params: this._getParams(t)
          }), this.el === P || e !== this.el && function (t, e) {
            for (var n = t.lastElementChild; n && (n === H.ghost || "none" === p(n, "display") || e && !d(n, e));) n = n.previousElementSibling;
            return n;
          }(this.el) ? (_ = c(e, this.options.draggable, this.el)) && !_.animated && this._allowSwap() && (M = (_ === S || V(_, S) || (this.el !== P ? this._onInsert(t) : (n = t, o = x, i = i || f(o), n.clientX <= i.right && n.clientX >= i.left && n.clientY >= i.top && n.clientY <= i.bottom && e === x || this._onChange(t))), _)) : (_ = M = null, this._onInsert(t)));
        },
        _onInsert: function (t) {
          var e = _ || S,
            n = "clone" === O && this.el !== w && P === w,
            o = "clone" === O && this.el === w && P !== w;
          I = this.el, X = i(S), A = e, x = _ ? _.parentNode : this.el, P[y].animator.collect(S.parentNode), this.animator.collect(x), n && (p(b, "display", ""), w[y].multiplayer.toggleVisible(!0), w[y].options.group.revertDrag || P.insertBefore(b, S)), o && (X = i(b), p(b, "display", "none"), this.multiplayer.toggleVisible(!1)), _ ? x.insertBefore(S, T < 0 ? _ : _.nextSibling) : x.appendChild(S), Y = i(S), n && w[y].options.group.revertDrag && m({
            sortable: w[y],
            name: "onChange",
            params: this._getParams(t, {
              to: w,
              target: b,
              newIndex: et,
              revertDrag: !0
            })
          }), n || m({
            sortable: P[y],
            name: "onRemove",
            params: this._getParams(t)
          }), o && _ !== b && m({
            sortable: this,
            name: "onChange",
            params: this._getParams(t, {
              from: w,
              backToOrigin: !0
            })
          }), o || m({
            sortable: this,
            name: "onAdd",
            params: this._getParams(t)
          }), P[y].animator.animate(), this.animator.animate(), P = this.el;
        },
        _onChange: function (t) {
          _ !== b && (x = _.parentNode, X = i(S), A = _, this.animator.collect(x), x.insertBefore(S, $), Y = i(S), m({
            sortable: this,
            name: "onChange",
            params: this._getParams(t)
          }), this.animator.animate(), P = this.el);
        },
        _onDrop: function (t) {
          var e, n;
          K(t), this._cancelStart(), o(N, "touchmove", this._nearestSortable), o(N, "mousemove", this._nearestSortable), o(N, "mouseup", this._onDrop), o(N, "touchend", this._onDrop), o(N, "touchcancel", this._onDrop), u(b, this.options.chosenClass, !1), w && (P = w, X = et, A === S && (A = b), this.multiplayer.toggleClass(!1), m({
            sortable: this,
            name: "onUnchoose",
            params: this._getParams(t)
          }), C) && this._onEnd(t), w || C || !this.options.multiple || (n = (e = t.changedTouches ? t.changedTouches[0] : t).clientX - D.clientX, e = e.clientY - D.clientY, 0 <= (n = Math.sqrt(n * n + e * e)) && n <= 1 && this.multiplayer.onSelect(t, b, this)), E && E.parentNode && E.parentNode.removeChild(E), this.multiplayer.destroy(), this.autoScroller.destroy(), this._nulling();
        },
        _onEnd: function (t) {
          var t = this._getParams(t),
            e = (this.multiplayer.onDrop(P, I, O), this.options.swapOnDrop);
          ("clone" !== O || P === I) && ("function" == typeof e ? e(t) : e) && x.insertBefore(b, S), "clone" !== O || P === I || this.multiplayer.active() ? S && S.parentNode && S.parentNode.removeChild(S) : u(S, this.options.chosenClass, !1), p(b, "display", ""), F && p(document.body, "user-select", ""), P !== I && m({
            sortable: P[y],
            name: "onDrop",
            params: t
          }), m({
            sortable: I[y],
            name: "onDrop",
            params: t
          });
        },
        _getParams: function (t) {
          var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
            n = {};
          return n.event = t, n.to = I, n.from = P, n.node = b, n.clone = S, n.target = A, n.oldIndex = X, n.newIndex = Y, n.pullMode = O, this.multiplayer.setParams(n), l(n, e), n.relative = n.target === b ? 0 : s(n.target, S), n;
        },
        _nulling: function () {
          I = P = w = b = _ = $ = S = E = x = O = X = Y = et = D = C = A = M = N = T = tt = H.clone = H.ghost = H.active = H.dragged = null;
        },
        destroy: function () {
          this._nulling(), this._cancelStart(), o(this.el, "touchstart", this._onDrag), o(this.el, "mousedown", this._onDrag), nt.splice(nt.indexOf(this.el), 1), this.el[y] = this.animator = this.multiplayer = this.autoScroller = null;
        },
        option: function (t, e) {
          if (void 0 === e) return this.options[t];
          this.options[t] = e, this.animator.options[t] = e, this.multiplayer.options[t] = e, this.autoScroller.options[t] = e, "group" === t && ot(this.options);
        },
        select: function (t) {
          this.multiplayer.select(t);
        },
        deselect: function (t) {
          this.multiplayer.deselect(t);
        },
        getSelectedElements: function () {
          return this.multiplayer.selectedElements;
        }
      }, H.utils = {
        on: r,
        off: o,
        css: p,
        index: i,
        closest: c,
        getRect: f,
        toggleClass: u,
        detectDirection: U
      }, H.get = function (t) {
        return t[y];
      }, H.create = function (t, e) {
        return new H(t, e);
      }, H;
    });
  })(sortableDnd_min);
  var Dnd = sortableDnd_min.exports;

  var VirtualProps = {
    dataSource: {
      "default": [],
      required: true
    },
    dataKey: {
      type: String,
      "default": '',
      required: true
    },
    draggable: {
      type: [String]
    },
    handle: {
      type: [Function, String]
    },
    group: {
      type: [Object, String]
    },
    scroller: {},
    direction: {
      type: String,
      "default": 'vertical'
    },
    keeps: {
      type: Number,
      "default": 30
    },
    size: {
      type: Number
    },
    debounceTime: {
      type: Number,
      "default": 0
    },
    throttleTime: {
      type: Number,
      "default": 0
    },
    animation: {
      type: Number,
      "default": 150
    },
    autoScroll: {
      type: Boolean,
      "default": true
    },
    scrollThreshold: {
      type: Number,
      "default": 55
    },
    keepOffset: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    fallbackOnBody: {
      type: Boolean,
      "default": false
    },
    delay: {
      type: Number,
      "default": 0
    },
    delayOnTouchOnly: {
      type: Boolean,
      "default": false
    },
    rootTag: {
      type: String,
      "default": 'div'
    },
    wrapTag: {
      type: String,
      "default": 'div'
    },
    headerTag: {
      type: String,
      "default": 'div'
    },
    footerTag: {
      type: String,
      "default": 'div'
    },
    itemTag: {
      type: String,
      "default": 'div'
    },
    wrapClass: {
      type: String,
      "default": ''
    },
    wrapStyle: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    itemStyle: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    itemClass: {
      type: String,
      "default": ''
    },
    ghostClass: {
      type: String,
      "default": ''
    },
    ghostStyle: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    chosenClass: {
      type: String,
      "default": ''
    },
    headerStyle: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    footerStyle: {
      type: Object,
      "default": function _default() {
        return {};
      }
    }
  };
  var SlotsProps = {
    tag: {
      type: String,
      "default": 'div'
    },
    event: {
      type: String
    },
    dataKey: {
      type: [String, Number]
    },
    sizeKey: {
      type: String
    }
  };

  var useObserver = function useObserver(props, aRef, emit) {
    var observer = null;
    var getCurrentSize = function getCurrentSize() {
      return aRef.value ? aRef.value[props.sizeKey] : 0;
    };
    var onSizeChange = function onSizeChange() {
      var event = props.event,
        dataKey = props.dataKey;
      emit(event, getCurrentSize(), dataKey);
    };
    vue.onMounted(function () {
      if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(function () {
          onSizeChange();
        });
        aRef.value && observer.observe(aRef.value);
      }
    });
    vue.onUpdated(function () {
      onSizeChange();
    });
    vue.onUnmounted(function () {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    });
  };
  var Items = vue.defineComponent({
    name: 'VirtualDraglistItems',
    props: SlotsProps,
    emits: ['resize'],
    setup: function setup(props, _ref) {
      var emit = _ref.emit,
        slots = _ref.slots;
      var itemRef = vue.ref(null);
      useObserver(props, itemRef, emit);
      return function () {
        var Tag = props.tag,
          dataKey = props.dataKey;
        return vue.h(Tag, {
          ref: itemRef,
          key: dataKey,
          'data-key': dataKey
        }, {
          "default": function _default() {
            var _a;
            return (_a = slots["default"]) === null || _a === void 0 ? void 0 : _a.call(slots);
          }
        });
      };
    }
  });
  var Slots = vue.defineComponent({
    name: 'VirtualDraglistSlots',
    props: SlotsProps,
    emits: ['resize'],
    setup: function setup(props, _ref2) {
      var emit = _ref2.emit,
        slots = _ref2.slots;
      var slotRef = vue.ref(null);
      useObserver(props, slotRef, emit);
      return function () {
        var Tag = props.tag,
          dataKey = props.dataKey;
        return vue.h(Tag, {
          ref: slotRef,
          key: dataKey,
          'data-key': dataKey
        }, {
          "default": function _default() {
            var _a;
            return (_a = slots["default"]) === null || _a === void 0 ? void 0 : _a.call(slots);
          }
        });
      };
    }
  });

  function throttle(fn, wait) {
    var timer = null;
    var result = function result() {
      var _this = this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (timer) return;
      if (wait <= 0) {
        fn.apply(this, args);
      } else {
        timer = setTimeout(function () {
          timer = undefined;
          fn.apply(_this, args);
        }, wait);
      }
    };
    result['cancel'] = function () {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
    return result;
  }
  function debounce(fn, wait) {
    var throttled = throttle(fn, wait);
    var result = function result() {
      throttled['cancel']();
      throttled.apply(this, arguments);
    };
    result['cancel'] = function () {
      throttled['cancel']();
    };
    return result;
  }
  function getDataKey(item, dataKey) {
    return (!Array.isArray(dataKey) ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : dataKey).reduce(function (o, k) {
      return (o || {})[k];
    }, item);
  }

  var SortableAttrs = ['delay', 'group', 'handle', 'disabled', 'draggable', 'animation', 'autoScroll', 'ghostClass', 'ghostStyle', 'chosenClass', 'fallbackOnBody', 'scrollThreshold', 'delayOnTouchOnly'];
  function Sortable(el, options) {
    this.el = el;
    this.options = options;
    this.list = [];
    this.store = {};
    this.reRendered = false;
    this.attrs = SortableAttrs;
    this.init();
  }
  Sortable.prototype = {
    constructor: Sortable,
    destroy: function destroy() {
      this.sortable && this.sortable.destroy();
      this.sortable = this.store = this.reRendered = null;
    },
    option: function option(key, value) {
      if (key === 'list') {
        this.list = _toConsumableArray(value);
      } else {
        this.sortable.option(key, value);
      }
    },
    // ========================================= Properties =========================================
    init: function init() {
      var _this = this;
      var props = {};
      for (var i = 0; i < SortableAttrs.length; i++) {
        var key = SortableAttrs[i];
        props[key] = this.options[key];
      }
      this.sortable = new Dnd(this.el, _objectSpread2(_objectSpread2({}, props), {}, {
        swapOnDrop: function swapOnDrop(params) {
          return params.from === params.to;
        },
        onDrag: function onDrag(params) {
          return _this.onDrag(params);
        },
        onAdd: function onAdd(params) {
          return _this.onAdd(params);
        },
        onRemove: function onRemove(params) {
          return _this.onRemove(params);
        },
        onChange: function onChange(params) {
          return _this.onChange(params);
        },
        onDrop: function onDrop(params) {
          return _this.onDrop(params);
        }
      }));
      this.list = _toConsumableArray(this.options.list);
    },
    onDrag: function onDrag(params) {
      var key = params.node.dataset.key;
      var index = this.getIndex(this.list, key);
      var item = this.list[index];

      // store the drag item
      this.store = {
        item: item,
        key: key,
        origin: {
          index: index,
          list: this.list
        },
        from: {
          index: index,
          list: this.list
        },
        to: {
          index: index,
          list: this.list
        }
      };
      this.sortable.option('store', this.store);
      this.dispatchEvent('onDrag', {
        item: item,
        key: key,
        index: index
      });
    },
    onRemove: function onRemove(params) {
      var key = params.node.dataset.key;
      var index = this.getIndex(this.list, key);
      var item = this.list[index];
      this.list.splice(index, 1);
      Object.assign(this.store, {
        key: key,
        item: item
      });
      this.sortable.option('store', this.store);
      this.dispatchEvent('onRemove', {
        item: item,
        key: key,
        index: index
      });
    },
    onAdd: function onAdd(params) {
      var from = params.from,
        target = params.target,
        relative = params.relative;
      var _Dnd$get$option = Dnd.get(from).option('store'),
        key = _Dnd$get$option.key,
        item = _Dnd$get$option.item;
      var index = this.getIndex(this.list, target.dataset.key);
      if (relative === 0) {
        index = this.list.length;
      } else if (relative === -1) {
        index += 1;
      }
      this.list.splice(index, 0, item);
      Object.assign(this.store, {
        to: {
          index: index,
          list: this.list
        }
      });
      this.sortable.option('store', this.store);
      this.dispatchEvent('onAdd', {
        item: item,
        key: key,
        index: index
      });
    },
    onChange: function onChange(params) {
      var store = Dnd.get(params.from).option('store');
      if (params.revertDrag) {
        this.list = _toConsumableArray(this.options.list);
        Object.assign(this.store, {
          from: store.origin
        });
        return;
      }
      var node = params.node,
        target = params.target,
        relative = params.relative,
        backToOrigin = params.backToOrigin;
      var fromIndex = this.getIndex(this.list, node.dataset.key);
      var fromItem = this.list[fromIndex];
      var toIndex = this.getIndex(this.list, target.dataset.key);
      if (backToOrigin) {
        if (relative === 1 && store.from.index < toIndex) {
          toIndex -= 1;
        }
        if (relative === -1 && store.from.index > toIndex) {
          toIndex += 1;
        }
      }
      this.list.splice(fromIndex, 1);
      this.list.splice(toIndex, 0, fromItem);
      Object.assign(this.store, {
        from: {
          index: toIndex,
          list: this.list
        },
        to: {
          index: toIndex,
          list: this.list
        }
      });
    },
    onDrop: function onDrop(params) {
      var _this$getStore = this.getStore(params),
        from = _this$getStore.from,
        to = _this$getStore.to;
      var changed = params.from !== params.to || from.origin.index !== to.to.index;
      this.dispatchEvent('onDrop', {
        changed: changed,
        list: this.list,
        item: from.item,
        key: from.key,
        from: from.origin,
        to: to.to
      });
      if (params.from === this.el && this.reRendered) {
        var _Dnd$dragged;
        (_Dnd$dragged = Dnd.dragged) === null || _Dnd$dragged === void 0 ? void 0 : _Dnd$dragged.remove();
      }
      if (params.from !== params.to && params.pullMode === 'clone') {
        var _Dnd$clone;
        (_Dnd$clone = Dnd.clone) === null || _Dnd$clone === void 0 ? void 0 : _Dnd$clone.remove();
      }
      this.reRendered = false;
    },
    getIndex: function getIndex(list, key) {
      for (var i = 0; i < list.length; i++) {
        if (getDataKey(list[i], this.options.dataKey) == key) {
          return i;
        }
      }
      return -1;
    },
    getStore: function getStore(params) {
      return {
        from: Dnd.get(params.from).option('store'),
        to: Dnd.get(params.to).option('store')
      };
    },
    dispatchEvent: function dispatchEvent(name, params) {
      var cb = this.options[name];
      if (cb) cb(params);
    }
  };

  var _scrollDir, _offsetDir, _scrollSize, _offsetSize;
  var VirtualAttrs = ['size', 'keeps', 'scroller', 'direction', 'debounceTime', 'throttleTime'];
  var CACLTYPE = {
    INIT: 'INIT',
    FIXED: 'FIXED',
    DYNAMIC: 'DYNAMIC'
  };
  var SCROLL_DIRECTION = {
    FRONT: 'FRONT',
    BEHIND: 'BEHIND',
    STATIONARY: 'STATIONARY'
  };
  var DIRECTION = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
  };
  var scrollDir = (_scrollDir = {}, _defineProperty(_scrollDir, DIRECTION.VERTICAL, 'scrollTop'), _defineProperty(_scrollDir, DIRECTION.HORIZONTAL, 'scrollLeft'), _scrollDir);
  var offsetDir = (_offsetDir = {}, _defineProperty(_offsetDir, DIRECTION.VERTICAL, 'offsetTop'), _defineProperty(_offsetDir, DIRECTION.HORIZONTAL, 'offsetLeft'), _offsetDir);
  var scrollSize = (_scrollSize = {}, _defineProperty(_scrollSize, DIRECTION.VERTICAL, 'scrollHeight'), _defineProperty(_scrollSize, DIRECTION.HORIZONTAL, 'scrollWidth'), _scrollSize);
  var offsetSize = (_offsetSize = {}, _defineProperty(_offsetSize, DIRECTION.VERTICAL, 'offsetHeight'), _defineProperty(_offsetSize, DIRECTION.HORIZONTAL, 'offsetWidth'), _offsetSize);
  function Virtual(options) {
    this.options = options;
    var defaults = {
      size: 0,
      keeps: 0,
      buffer: 0,
      wrapper: null,
      scroller: null,
      direction: 'vertical',
      uniqueKeys: [],
      debounceTime: null,
      throttleTime: null
    };
    for (var name in defaults) {
      !(name in this.options) && (this.options[name] = defaults[name]);
    }
    this.sizes = new Map(); // store item size
    this.range = {
      start: 0,
      end: 0,
      front: 0,
      behind: 0
    };
    this.offset = 0;
    this.calcType = CACLTYPE.INIT;
    this.calcSize = {
      average: 0,
      total: 0,
      fixed: 0,
      header: 0
    };
    this.scrollEl = this.getScrollElement(options.scroller);
    this.direction = '';
    this.useWindowScroll = null;
    this.onScroll = null;
    this.updateOnScrollFunction();
    this.addScrollEventListener();
    this.checkIfUpdate(0, options.keeps - 1);
  }
  Virtual.prototype = {
    constructor: Virtual,
    isFront: function isFront() {
      return this.direction === SCROLL_DIRECTION.FRONT;
    },
    isBehind: function isBehind() {
      return this.direction === SCROLL_DIRECTION.BEHIND;
    },
    isFixed: function isFixed() {
      return this.calcType === CACLTYPE.FIXED;
    },
    getSize: function getSize(key) {
      return this.sizes.get(key) || this.getItemSize();
    },
    getOffset: function getOffset() {
      return this.scrollEl[scrollDir[this.options.direction]];
    },
    getScrollSize: function getScrollSize() {
      return this.scrollEl[scrollSize[this.options.direction]];
    },
    getClientSize: function getClientSize() {
      return this.scrollEl[offsetSize[this.options.direction]];
    },
    scrollToOffset: function scrollToOffset(offset) {
      this.scrollEl[scrollDir[this.options.direction]] = offset;
    },
    scrollToIndex: function scrollToIndex(index) {
      if (index >= this.options.uniqueKeys.length - 1) {
        this.scrollToBottom();
      } else {
        var indexOffset = this.getOffsetByIndex(index);
        this.scrollToOffset(indexOffset);
      }
    },
    scrollToBottom: function scrollToBottom() {
      var _this = this;
      var offset = this.getScrollSize();
      this.scrollToOffset(offset);

      // if the bottom is not reached, execute the scroll method again
      setTimeout(function () {
        var clientSize = _this.getClientSize();
        var scrollSize = _this.getScrollSize();
        var scrollOffset = _this.getOffset();
        if (scrollOffset + clientSize + 1 < scrollSize) {
          _this.scrollToBottom();
        }
      }, 5);
    },
    option: function option(key, value) {
      var _this2 = this;
      var oldValue = this.options[key];
      this.options[key] = value;
      if (key === 'uniqueKeys') {
        this.sizes.forEach(function (v, k) {
          if (!value.includes(k)) {
            _this2.sizes["delete"](k);
          }
        });
      }
      if (key === 'scroller') {
        oldValue && Dnd.utils.off(oldValue, 'scroll', this.onScroll);
        this.scrollEl = this.getScrollElement(value);
        this.addScrollEventListener();
      }
    },
    updateRange: function updateRange(range) {
      if (range) {
        this.handleUpdate(range.start, range.end);
        return;
      }
      var start = this.range.start;
      start = Math.max(start, 0);
      this.handleUpdate(start, this.getEndByStart(start));
    },
    onItemResized: function onItemResized(key, size) {
      this.sizes.set(key, size);
      if (this.calcType === CACLTYPE.INIT) {
        this.calcType = CACLTYPE.FIXED;
        this.calcSize.fixed = size;
      } else if (this.isFixed() && this.calcSize.fixed !== size) {
        this.calcType = CACLTYPE.DYNAMIC;
        this.calcSize.fixed = undefined;
      }
      // In the case of non-fixed heights, the average height and the total height are calculated
      if (this.calcType !== CACLTYPE.FIXED) {
        this.calcSize.total = _toConsumableArray(this.sizes.values()).reduce(function (t, i) {
          return t + i;
        }, 0);
        this.calcSize.average = Math.round(this.calcSize.total / this.sizes.size);
      }
    },
    onSlotResized: function onSlotResized(key, size) {
      this.calcSize[key] = size;
    },
    addScrollEventListener: function addScrollEventListener() {
      if (this.options.scroller) {
        Dnd.utils.on(this.options.scroller, 'scroll', this.onScroll);
      }
    },
    removeScrollEventListener: function removeScrollEventListener() {
      if (this.options.scroller) {
        Dnd.utils.off(this.options.scroller, 'scroll', this.onScroll);
      }
    },
    // ========================================= Properties =========================================
    updateOnScrollFunction: function updateOnScrollFunction() {
      var _this3 = this;
      var _this$options = this.options,
        debounceTime = _this$options.debounceTime,
        throttleTime = _this$options.throttleTime;
      if (debounceTime) {
        this.onScroll = debounce(function () {
          return _this3.handleScroll();
        }, debounceTime);
      } else if (throttleTime) {
        this.onScroll = throttle(function () {
          return _this3.handleScroll();
        }, throttleTime);
      } else {
        this.onScroll = function () {
          return _this3.handleScroll();
        };
      }
    },
    handleScroll: function handleScroll() {
      var offset = this.getOffset();
      var clientSize = this.getClientSize();
      var scrollSize = this.getScrollSize();
      if (offset === this.offset) {
        this.direction = SCROLL_DIRECTION.STATIONARY;
      } else {
        this.direction = offset < this.offset ? SCROLL_DIRECTION.FRONT : SCROLL_DIRECTION.BEHIND;
      }
      this.offset = offset;
      var top = this.isFront() && offset <= 0;
      var bottom = this.isBehind() && clientSize + offset >= scrollSize;
      this.options.onScroll({
        top: top,
        bottom: bottom,
        offset: offset,
        direction: this.direction
      });
      if (this.isFront()) {
        this.handleScrollFront();
      } else if (this.isBehind()) {
        this.handleScrollBehind();
      }
    },
    handleScrollFront: function handleScrollFront() {
      var scrolls = this.getScrollItems();
      if (scrolls > this.range.start) {
        return;
      }
      var start = Math.max(scrolls - this.options.buffer, 0);
      this.checkIfUpdate(start, this.getEndByStart(start));
    },
    handleScrollBehind: function handleScrollBehind() {
      var scrolls = this.getScrollItems();
      if (scrolls < this.range.start + this.options.buffer) {
        return;
      }
      this.checkIfUpdate(scrolls, this.getEndByStart(scrolls));
    },
    getScrollItems: function getScrollItems() {
      var offset = this.offset - this.getScrollStartOffset();
      if (offset <= 0) {
        return 0;
      }
      if (this.isFixed()) {
        return Math.floor(offset / this.calcSize.fixed);
      }
      var low = 0;
      var high = this.options.uniqueKeys.length;
      var middle = 0;
      var middleOffset = 0;
      while (low <= high) {
        middle = low + Math.floor((high - low) / 2);
        middleOffset = this.getOffsetByIndex(middle);
        if (middleOffset === offset) {
          return middle;
        } else if (middleOffset < offset) {
          low = middle + 1;
        } else if (middleOffset > offset) {
          high = middle - 1;
        }
      }
      return low > 0 ? --low : 0;
    },
    checkIfUpdate: function checkIfUpdate(start, end) {
      var keeps = this.options.keeps;
      var total = this.options.uniqueKeys.length;
      if (total <= keeps) {
        start = 0;
        end = this.getLastIndex();
      } else if (end - start < keeps - 1) {
        start = end - keeps + 1;
      }
      if (this.range.start !== start) {
        this.handleUpdate(start, end);
      }
    },
    handleUpdate: function handleUpdate(start, end) {
      this.range.start = start;
      this.range.end = end;
      this.range.front = this.getFrontOffset();
      this.range.behind = this.getBehindOffset();
      this.options.onUpdate(_objectSpread2({}, this.range));
    },
    getFrontOffset: function getFrontOffset() {
      if (this.isFixed()) {
        return this.calcSize.fixed * this.range.start;
      } else {
        return this.getOffsetByIndex(this.range.start);
      }
    },
    getBehindOffset: function getBehindOffset() {
      var end = this.range.end;
      var last = this.getLastIndex();
      if (this.isFixed()) {
        return (last - end) * this.calcSize.fixed;
      }
      return (last - end) * this.getItemSize();
    },
    getOffsetByIndex: function getOffsetByIndex(index) {
      if (!index) return 0;
      var offset = 0;
      for (var i = 0; i < index; i++) {
        var size = this.sizes.get(this.options.uniqueKeys[i]);
        offset = offset + (typeof size === 'number' ? size : this.getItemSize());
      }
      return offset;
    },
    getEndByStart: function getEndByStart(start) {
      return Math.min(start + this.options.keeps - 1, this.getLastIndex());
    },
    getLastIndex: function getLastIndex() {
      var _this$options2 = this.options,
        uniqueKeys = _this$options2.uniqueKeys,
        keeps = _this$options2.keeps;
      return uniqueKeys.length > 0 ? uniqueKeys.length - 1 : keeps - 1;
    },
    getItemSize: function getItemSize() {
      return this.isFixed() ? this.calcSize.fixed : this.calcSize.average || this.options.size;
    },
    getScrollElement: function getScrollElement(scroller) {
      if (scroller instanceof Document && scroller.nodeType === 9 || scroller instanceof Window) {
        this.useWindowScroll = true;
        return document.scrollingElement || document.documentElement || document.body;
      }
      this.useWindowScroll = false;
      return scroller;
    },
    getScrollStartOffset: function getScrollStartOffset() {
      var offset = this.calcSize.header;
      if (this.useWindowScroll && this.options.wrapper) {
        var el = this.options.wrapper;
        do {
          offset += el[offsetDir[this.options.direction]];
        } while ((el = el.offsetParent) && el !== this.options.wrapper.ownerDocument);
      }
      return offset;
    }
  };

  var getList = function getList(source) {
    return vue.isRef(source) ? source.value : source;
  };
  var VirtualDragList = vue.defineComponent({
    props: VirtualProps,
    emits: ['update:dataSource', 'top', 'bottom', 'drag', 'drop', 'add', 'remove'],
    setup: function setup(props, _ref) {
      var _this = this;
      var emit = _ref.emit,
        slots = _ref.slots,
        expose = _ref.expose;
      var range = vue.ref({
        start: 0,
        end: props.keeps,
        front: 0,
        behind: 0
      });
      var rootRef = vue.ref(null);
      var groupRef = vue.ref(null);
      var viewlist = vue.ref([]);
      var uniqueKeys = vue.ref([]);
      var isHorizontal = vue.computed(function () {
        return props.direction !== 'vertical';
      });
      var itemSizeKey = vue.computed(function () {
        return props.direction !== 'vertical' ? 'offsetWidth' : 'offsetHeight';
      });
      var virtualAttributes = vue.computed(function () {
        return VirtualAttrs.reduce(function (res, key) {
          res[key] = props[key];
          return res;
        }, {});
      });
      var sortableAttributes = vue.computed(function () {
        return SortableAttrs.reduce(function (res, key) {
          res[key] = _this[key];
          return res;
        }, {});
      });
      var lastLength = null;
      var start = 0;
      var sortable;
      var virtual;
      // git item size by data-key
      function getSize(key) {
        return virtual.getSize(key);
      }
      // Get the current scroll height
      function getOffset() {
        return virtual.getOffset();
      }
      // Get client viewport size
      function getClientSize() {
        return virtual.getClientSize();
      }
      // Get all scroll size
      function getScrollSize() {
        return virtual.getScrollSize();
      }
      function scrollToKey(key) {
        var index = uniqueKeys.value.indexOf(key);
        if (index > -1) {
          virtual.scrollToIndex(index);
        }
      }
      // Scroll to the specified offset
      function scrollToOffset(offset) {
        virtual.scrollToOffset(offset);
      }
      // Scroll to the specified index position
      function scrollToIndex(index) {
        virtual.scrollToIndex(index);
      }
      // Scroll to top of list
      function scrollToTop() {
        scrollToOffset(0);
      }
      // Scroll to bottom of list
      function scrollToBottom() {
        virtual.scrollToBottom();
      }
      expose({
        getSize: getSize,
        getOffset: getOffset,
        getClientSize: getClientSize,
        getScrollSize: getScrollSize,
        scrollToTop: scrollToTop,
        scrollToBottom: scrollToBottom,
        scrollToKey: scrollToKey,
        scrollToIndex: scrollToIndex,
        scrollToOffset: scrollToOffset
      });
      vue.watch(function () {
        return props.dataSource;
      }, function () {
        onUpdate();
      }, {
        deep: true
      });
      vue.watch(function () {
        return virtualAttributes;
      }, function (newVal, oldVal) {
        if (!virtual) return;
        for (var key in newVal) {
          if (newVal[key] != oldVal[key]) {
            virtual.option(key, newVal[key]);
          }
        }
      });
      vue.watch(function () {
        return sortableAttributes;
      }, function (newVal, oldVal) {
        if (!virtual) return;
        for (var key in newVal) {
          if (newVal[key] != oldVal[key]) {
            sortable.option(key, newVal[key]);
          }
        }
      });
      // init range
      vue.onBeforeMount(function () {
        initVirtual();
        onUpdate();
      });
      // set back offset when awake from keep-alive
      vue.onActivated(function () {
        virtual && scrollToOffset(virtual.offset);
        virtual.addScrollEventListener();
      });
      vue.onDeactivated(function () {
        virtual.removeScrollEventListener();
      });
      vue.onMounted(function () {
        virtual.option('wrapper', groupRef.value);
        if (!props.scroller) {
          virtual.option('scroller', rootRef.value);
        }
      });
      vue.onUnmounted(function () {
        sortable && sortable.destroy();
        virtual.removeScrollEventListener();
      });
      var onUpdate = function onUpdate() {
        var list = getList(props.dataSource);
        if (!list) return;
        var oldList = _toConsumableArray(viewlist.value);
        viewlist.value = list;
        updateUniqueKeys();
        updateRange(oldList, list);
        if (!sortable) {
          vue.nextTick(function () {
            return initSortable();
          });
        } else {
          sortable.option('list', list);
        }
        // if auto scroll to the last offset
        if (lastLength && props.keepOffset) {
          var index = list.length - lastLength;
          if (index > 0) {
            scrollToIndex(index);
          }
          lastLength = null;
        }
      };
      var updateUniqueKeys = function updateUniqueKeys() {
        uniqueKeys.value = viewlist.value.map(function (item) {
          return getDataKey(item, props.dataKey);
        });
        virtual.option('uniqueKeys', uniqueKeys.value);
      };
      var initVirtual = function initVirtual() {
        virtual = new Virtual({
          size: props.size,
          keeps: props.keeps,
          buffer: Math.round(props.keeps / 3),
          scroller: props.scroller,
          direction: props.direction,
          uniqueKeys: uniqueKeys.value,
          debounceTime: props.debounceTime,
          throttleTime: props.throttleTime,
          onScroll: function onScroll(params) {
            lastLength = null;
            if (!!viewlist.value.length && params.top) {
              handleToTop();
            } else if (params.bottom) {
              handleToBottom();
            }
          },
          onUpdate: function onUpdate(newRange) {
            if (Dnd.dragged && sortable && newRange.start !== range.value.start) {
              sortable.reRendered = true;
            }
            range.value = newRange;
          }
        });
      };
      var initSortable = function initSortable() {
        sortable = new Sortable(groupRef.value, Object.assign(Object.assign({
          list: viewlist.value
        }, props), {
          onDrag: function onDrag(params) {
            start = range.value.start;
            emit('drag', params);
          },
          onAdd: function onAdd(params) {
            emit('add', params);
          },
          onRemove: function onRemove(params) {
            emit('remove', params);
          },
          onDrop: function onDrop(params) {
            var _a;
            if (params.list.length === viewlist.value.length && start < range.value.start) {
              range.value.front += ((_a = Dnd.clone) === null || _a === void 0 ? void 0 : _a[itemSizeKey.value]) || 0;
              start = range.value.start;
            }
            emit('update:dataSource', params.list);
            emit('drop', params);
          }
        }));
      };
      var updateRange = function updateRange(oldList, newList) {
        var newRange = Object.assign({}, range.value);
        if (newList.length > oldList.length && newRange.end === oldList.length - 1 && scrolledToBottom()) {
          newRange.end++;
          newRange.start = Math.max(0, newRange.end - props.keeps);
        }
        virtual.updateRange(newRange);
      };
      var scrolledToBottom = function scrolledToBottom() {
        var offset = getOffset();
        var clientSize = getClientSize();
        var scrollSize = getScrollSize();
        return offset + clientSize + 1 >= scrollSize;
      };
      var handleToTop = throttle(function () {
        emit('top');
        lastLength = viewlist.value.length;
      }, 50);
      var handleToBottom = throttle(function () {
        emit('bottom');
      }, 50);
      var onItemResized = function onItemResized(size, key) {
        var renders = virtual.sizes.size;
        virtual.onItemResized(key, size);
        if (renders === 0) {
          updateRange(viewlist.value, viewlist.value);
        }
      };
      var onSlotsResized = function onSlotsResized(size, key) {
        virtual.onSlotResized(key, size);
      };
      var getItemStyle = function getItemStyle(dataKey) {
        var _a;
        var fromKey = (_a = Dnd.dragged) === null || _a === void 0 ? void 0 : _a.dataset.key;
        if (dataKey == fromKey) {
          return {
            display: 'none'
          };
        }
        return {};
      };
      var renderSlots = function renderSlots(key, TagName) {
        var slot = slots[key];
        return slot ? vue.h(Slots, {
          key: key,
          tag: TagName,
          style: props["".concat(key, "Style")],
          dataKey: key,
          event: 'resize',
          sizeKey: itemSizeKey.value,
          onResize: onSlotsResized
        }, {
          "default": function _default() {
            return slot === null || slot === void 0 ? void 0 : slot();
          }
        }) : null;
      };
      var renderItems = function renderItems() {
        var renders = [];
        var _range$value = range.value,
          start = _range$value.start,
          end = _range$value.end;
        var _loop = function _loop(index) {
          var record = viewlist.value[index];
          if (record) {
            var dataKey = getDataKey(record, props.dataKey);
            var itemStyle = Object.assign(Object.assign({}, props.itemStyle), getItemStyle(dataKey));
            renders.push(slots.item ? vue.h(Items, {
              key: dataKey,
              tag: props.itemTag,
              "class": props.itemClass,
              style: itemStyle,
              event: 'resize',
              dataKey: dataKey,
              sizeKey: itemSizeKey.value,
              onResize: onItemResized
            }, {
              "default": function _default() {
                var _a;
                return (_a = slots.item) === null || _a === void 0 ? void 0 : _a.call(slots, {
                  record: record,
                  index: index,
                  dataKey: dataKey
                });
              }
            }) : null);
          }
        };
        for (var index = start; index <= end; index++) {
          _loop(index);
        }
        return renders;
      };
      return function () {
        var pageMode = virtual.useWindowScroll;
        var rootTag = props.rootTag,
          wrapTag = props.wrapTag,
          wrapClass = props.wrapClass,
          headerTag = props.headerTag,
          footerTag = props.footerTag;
        var _range$value2 = range.value,
          front = _range$value2.front,
          behind = _range$value2.behind;
        var wrapStyle = Object.assign(Object.assign({}, props.wrapStyle), {
          padding: isHorizontal.value ? "0px ".concat(behind, "px 0px ").concat(front, "px") : "".concat(front, "px 0px ").concat(behind, "px")
        });
        return vue.h(rootTag, {
          ref: rootRef,
          style: !pageMode && {
            overflow: isHorizontal.value ? 'auto hidden' : 'hidden auto'
          }
        }, {
          "default": function _default() {
            return [renderSlots('header', headerTag), vue.h(wrapTag, {
              ref: groupRef,
              "class": wrapClass,
              style: wrapStyle
            }, {
              "default": function _default() {
                return renderItems();
              }
            }), renderSlots('footer', footerTag)];
          }
        });
      };
    }
  });

  return VirtualDragList;

}));
