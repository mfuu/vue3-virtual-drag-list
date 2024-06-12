/*!
 * vue-virtual-draglist v3.3.1
 * open source under the MIT license
 * https://github.com/mfuu/vue3-virtual-drag-list#readme
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VirtualList = factory(global.Vue));
})(this, (function (vue) { 'use strict';

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
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
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
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
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

  /*!
   * sortable-dnd v0.6.15
   * open source under the MIT license
   * https://github.com/mfuu/sortable-dnd#readme
   */
  (function (module, exports) {
    !function (t, e) {
      module.exports = e() ;
    }(commonjsGlobal, function () {

      function t(e) {
        return t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
          return typeof t;
        } : function (t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, t(e);
      }
      function e() {
        return e = Object.assign ? Object.assign.bind() : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
          }
          return t;
        }, e.apply(this, arguments);
      }
      var n = {
          capture: !1,
          passive: !1
        },
        o = /\s+/g;
      function i(t) {
        if ("undefined" != typeof window && window.navigator) return !!navigator.userAgent.match(t);
      }
      var r = i(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
        s = i(/Edge/i),
        l = i(/safari/i) && !i(/chrome/i) && !i(/android/i),
        a = function () {
          var t = !1;
          return document.addEventListener("checkIfSupportPassive", null, {
            get passive() {
              return t = !0, !0;
            }
          }), t;
        }();
      function c(t, e, o) {
        window.addEventListener ? t.addEventListener(e, o, !(!a && r) && n) : window.attachEvent ? t.attachEvent("on" + e, o) : t["on" + e] = o;
      }
      function h(t, e, o) {
        window.removeEventListener ? t.removeEventListener(e, o, !(!a && r) && n) : window.detachEvent ? t.detachEvent("on" + e, o) : t["on" + e] = null;
      }
      function u() {
        return document.scrollingElement || document.documentElement;
      }
      function d(t, e, n) {
        if (t.getBoundingClientRect || t === window) {
          var o, i, r, s, l, a, c;
          if (t !== window && t.parentNode && t !== u() ? (i = (o = t.getBoundingClientRect()).top, r = o.left, s = o.bottom, l = o.right, a = o.height, c = o.width) : (i = 0, r = 0, s = window.innerHeight, l = window.innerWidth, a = window.innerHeight, c = window.innerWidth), e && t !== window) {
            n = n || t.parentNode;
            do {
              if (n && n.getBoundingClientRect) {
                var h = n.getBoundingClientRect();
                i -= h.top + parseInt(_(n, "border-top-width")), r -= h.left + parseInt(_(n, "border-left-width")), s = i + o.height, l = r + o.width;
                break;
              }
            } while (n = n.parentNode);
          }
          return {
            top: i,
            left: r,
            bottom: s,
            right: l,
            width: c,
            height: a
          };
        }
      }
      function p(t, e, n, o) {
        if (t) {
          if (n && !e) for (var i = Array.prototype.slice.call(n.children), r = 0, s = i.length; r < s; r++) if (i[r] === t || m(t, i[r])) return i[r];
          n = n || document;
          do {
            if (null != e && (">" === e[0] ? t.parentNode === n && b(t, e) : b(t, e)) || o && t === n) return t;
            if (t === n) break;
          } while (t = t.parentNode);
          return null;
        }
      }
      function m(t, e) {
        if (!t || !e) return !1;
        if (e.compareDocumentPosition) return !!(16 & e.compareDocumentPosition(t));
        if (e.contains && 1 === t.nodeType) return e.contains(t) && e !== t;
        for (; t = t.parentNode;) if (t === e) return !0;
        return !1;
      }
      function f(t, e) {
        for (var n = t.lastElementChild; n && (n === ot.ghost || "none" === _(n, "display") || e && !b(n, e));) n = n.previousElementSibling;
        return n || null;
      }
      function g(t, e) {
        if (!t || !t.parentNode) return -1;
        for (var n = 0; t = t.previousElementSibling;) "TEMPLATE" === t.nodeName.toUpperCase() || e && !b(t, e) || "none" === _(t, "display") || n++;
        return n;
      }
      function v(t, e, n, o) {
        for (var i = 0, r = 0, s = t.children; i < s.length;) {
          if (s[i] !== ot.ghost && "none" !== _(s[i], "display") && p(s[i], n, t, !1) && (o || s[i] !== ot.dragged)) {
            if (r === e) return s[i];
            r++;
          }
          i++;
        }
        return null;
      }
      function y(t, e) {
        var n = _(t),
          o = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth),
          i = v(t, 0, e),
          l = v(t, 1, e),
          a = i && _(i),
          c = l && _(l),
          h = a && parseInt(a.marginLeft) + parseInt(a.marginRight) + d(i).width,
          u = c && parseInt(c.marginLeft) + parseInt(c.marginRight) + d(l).width,
          p = s || r ? "cssFloat" : "float";
        if ("flex" === n.display) return "column" === n.flexDirection || "column-reverse" === n.flexDirection ? "vertical" : "horizontal";
        if ("grid" === n.display) return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
        if (i && a.float && "none" !== a.float) {
          var m = "left" === a.float ? "left" : "right";
          return !l || "both" !== c.clear && c.clear !== m ? "horizontal" : "vertical";
        }
        return i && ("block" === a.display || "flex" === a.display || "table" === a.display || "grid" === a.display || h >= o && "none" === n[p] || l && "none" === n[p] && h + u > o) ? "vertical" : "horizontal";
      }
      function w(t, e, n) {
        if (t && e) if (t.classList) t.classList[n ? "add" : "remove"](e);else {
          var i = (" " + t.className + " ").replace(o, " ").replace(" " + e + " ", " ");
          t.className = (i + (n ? " " + e : "")).replace(o, " ");
        }
      }
      function b(t, e) {
        if (e) {
          if (">" === e[0] && (e = e.substring(1)), t) try {
            if (t.matches) return t.matches(e);
            if (t.msMatchesSelector) return t.msMatchesSelector(e);
            if (t.webkitMatchesSelector) return t.webkitMatchesSelector(e);
          } catch (t) {
            return !1;
          }
          return !1;
        }
      }
      function _(t, e, n) {
        var o = t && t.style;
        if (o) {
          if (void 0 === n) return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), void 0 === e ? n : n[e];
          e in o || -1 !== e.indexOf("webkit") || (e = "-webkit-" + e), o[e] = n + ("string" == typeof n ? "" : "px");
        }
      }
      function S(t, e) {
        var n,
          o,
          i = (o = e, (n = t).compareDocumentPosition ? n.compareDocumentPosition(o) : n.contains ? (n != o && n.contains(o) && 16) + (n != o && o.contains(n) && 8) + (n.sourceIndex >= 0 && o.sourceIndex >= 0 ? (n.sourceIndex < o.sourceIndex && 4) + (n.sourceIndex > o.sourceIndex && 2) : 1) : 0);
        return 2 === i ? 1 : 4 === i ? -1 : 0;
      }
      function x(t) {
        void 0 !== t.preventDefault && t.cancelable && t.preventDefault();
      }
      function E(t) {
        var n = t.sortable,
          o = t.name,
          i = t.params,
          r = n.options[o];
        "function" == typeof r && r(e({}, i));
      }
      !function () {
        if ("undefined" == typeof window || "undefined" == typeof document) return "";
        var t = window.getComputedStyle(document.documentElement, "") || ["-moz-hidden-iframe"];
          (Array.prototype.slice.call(t).join("").match(/-(moz|webkit|ms)-/) || "" === t.OLink && ["", "o"])[1];
      }();
      var D,
        C,
        I = "Sortable" + Date.now();
      function T(t) {
        this.options = t, this.autoScrollAnimationFrame = null;
      }
      function N(t) {
        this.options = t, this.stack = [];
      }
      function M(t) {
        this.options = t || {}, this.selectedElements = [];
      }
      window.requestAnimationFrame || (window.requestAnimationFrame = function (t) {
        return setTimeout(t, 17);
      }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
        clearTimeout(t);
      }), T.prototype = {
        destroy: function () {
          this.autoScrollAnimationFrame && (cancelAnimationFrame(this.autoScrollAnimationFrame), this.autoScrollAnimationFrame = null);
        },
        update: function (t, e, n) {
          var o = this;
          cancelAnimationFrame(this.autoScrollAnimationFrame), this.autoScrollAnimationFrame = requestAnimationFrame(function () {
            e && n && o.autoScroll(t, n), o.update(t, e, n);
          });
        },
        autoScroll: function (t, e) {
          if (t && void 0 !== e.clientX && void 0 !== e.clientY) {
            var n = d(t);
            if (n) {
              var o = e.clientX,
                i = e.clientY,
                r = n.top,
                s = n.right,
                l = n.bottom,
                a = n.left,
                c = n.height,
                h = n.width;
              if (!(i < r || o > s || i > l || o < a)) {
                var u = this.options,
                  p = u.scrollThreshold,
                  m = u.scrollSpeed,
                  f = t.scrollTop,
                  g = t.scrollLeft,
                  v = t.scrollHeight,
                  y = f > 0 && i >= r && i <= r + p,
                  w = g + h < t.scrollWidth && o <= s && o >= s - p,
                  b = f + c < v && i <= l && i >= l - p;
                g > 0 && o >= a && o <= a + p && (t.scrollLeft += Math.floor(Math.max(-1, (o - a) / p - 1) * m.x)), w && (t.scrollLeft += Math.ceil(Math.min(1, (o - s) / p + 1) * m.x)), y && (t.scrollTop += Math.floor(Math.max(-1, (i - r) / p - 1) * m.y)), b && (t.scrollTop += Math.ceil(Math.min(1, (i - l) / p + 1) * m.y));
              }
            }
          }
        }
      }, N.prototype = {
        collect: function (t) {
          if (t) {
            for (var e = d(t), n = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, o = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, i = Math.min(e.right, n), r = Math.min(e.bottom, o), s = Array.prototype.slice.call(t.children), l = [], a = 0, c = s.length; a <= c; a++) {
              var h = s[a];
              if (h && h !== ot.ghost && "none" !== _(h, "display")) {
                var u = d(h);
                if (!(u.bottom < 0 || u.right < 0)) {
                  if (u.top - u.height > r || u.left - u.width > i) break;
                  l.push({
                    el: h,
                    rect: u
                  });
                }
              }
            }
            this.stack.push(l);
          }
        },
        animate: function () {
          for (var t = this.stack.pop(), e = 0, n = t.length; e < n; e++) {
            var o = t[e],
              i = o.el,
              r = o.rect;
            this.options.animation && this._excute(i, r);
          }
        },
        _excute: function (t, e) {
          var n = d(t);
          if (n.top !== e.top || n.left !== e.left) {
            var o = e.left - n.left,
              i = e.top - n.top;
            _(t, "transition", ""), _(t, "transform", "translate3d(" + o + "px, " + i + "px, 0)"), t.offsetWidth;
            var r = this.options,
              s = r.animation,
              l = r.easing;
            _(t, "transition", "transform " + s + "ms" + (l ? " " + l : "")), _(t, "transform", "translate3d(0px, 0px, 0px)"), "number" == typeof t.animated && clearTimeout(t.animated), t.animated = setTimeout(function () {
              _(t, "transition", ""), _(t, "transform", ""), t.animated = null;
            }, s);
          }
        }
      }, M.prototype = {
        destroy: function () {
          D = C = null;
        },
        active: function () {
          return !!D;
        },
        setParams: function (t) {
          t.nodes = D || [], t.clones = C || [];
        },
        select: function (t) {
          w(t, this.options.selectedClass, !0), this.selectedElements.push(t), this.selectedElements.sort(function (t, e) {
            return S(t, e);
          });
        },
        deselect: function (t) {
          var e = this.selectedElements.indexOf(t);
          e > -1 && (w(t, this.options.selectedClass, !1), this.selectedElements.splice(e, 1));
        },
        getGhostElement: function () {
          if (!D) return null;
          var t = document.createElement("div");
          return this.selectedElements.forEach(function (e, n) {
            var o = e.cloneNode(!0),
              i = 0 === n ? 1 : .5;
            o.style = "position: absolute;left: 0;top: 0;bottom: 0;right: 0;opacity: ".concat(i, ";z-index: ").concat(n, ";"), t.appendChild(o);
          }), t;
        },
        toggleSelected: function (t, e) {
          var n = this;
          e ? t.forEach(function (t) {
            return n.selectedElements.push(t);
          }) : this.selectedElements = this.selectedElements.filter(function (e) {
            return t.indexOf(e) < 0;
          });
        },
        toggleClass: function (t) {
          if (D) for (var e = 0; e < D.length; e++) w(D[e], this.options.chosenClass, t);
        },
        toggleVisible: function (t) {
          if (D) if (t) {
            var e = D.indexOf(ot.dragged);
            this._viewElements(D, e, ot.dragged);
          } else this._hideElements(D);
        },
        onChoose: function () {
          !this.options.multiple || !this.selectedElements.length || this.selectedElements.indexOf(ot.dragged) < 0 || (this.selectedElements.sort(function (t, e) {
            return S(t, e);
          }), D = this.selectedElements, this.toggleClass(!0));
        },
        onDrag: function (t) {
          D && (t.animator.collect(ot.dragged.parentNode), this._hideElements(D), t.animator.animate(), this.toggleClass(!1));
        },
        onDrop: function (t, e, n) {
          if (D) {
            var o = ot.dragged,
              i = ot.clone,
              r = D.indexOf(o);
            e[I].animator.collect(i.parentNode), t !== e && "clone" === n ? (_(i, "display", "none"), C = D.map(function (t) {
              return t.cloneNode(!0);
            }), this._viewElements(C, r, i), this._viewElements(D, r, o)) : this._viewElements(D, r, i), e[I].animator.animate(), t !== e && (e[I].multiplayer.toggleSelected(C || D, !0), "clone" !== n && t[I].multiplayer.toggleSelected(D, !1));
          }
        },
        onSelect: function (t, e, n) {
          var o = this.selectedElements.indexOf(e);
          w(e, this.options.selectedClass, o < 0);
          var i = {
            from: n.el,
            event: t,
            node: e,
            index: g(e)
          };
          o < 0 ? (this.selectedElements.push(e), E({
            sortable: n,
            name: "onSelect",
            params: i
          })) : (this.selectedElements.splice(o, 1), E({
            sortable: n,
            name: "onDeselect",
            params: i
          })), this.selectedElements.sort(function (t, e) {
            return S(t, e);
          });
        },
        _viewElements: function (t, e, n) {
          for (var o = 0; o < t.length; o++) if (_(t[o], "display", ""), o < e) n.parentNode.insertBefore(t[o], n);else {
            var i = o > 0 ? t[o - 1] : n;
            n.parentNode.insertBefore(t[o], i.nextSibling);
          }
        },
        _hideElements: function (t) {
          for (var e = 0; e < t.length; e++) t[e] != ot.dragged && _(t[e], "display", "none");
        }
      };
      var P,
        A,
        O,
        H,
        k,
        L,
        X,
        Y,
        B,
        F,
        R,
        W,
        z,
        G,
        j,
        V,
        q,
        U,
        J,
        K,
        Q,
        Z,
        $,
        tt = [];
      function et(e) {
        var n = {},
          o = e.group;
        o && "object" == t(o) || (o = {
          name: o,
          pull: !0,
          put: !0,
          revertDrag: !0
        }), n.name = o.name, n.pull = o.pull, n.put = o.put, n.revertDrag = o.revertDrag, e.group = n;
      }
      function nt(t) {
        var e = V || j;
        return !(void 0 !== t.clientX && void 0 !== t.clientY && Math.abs(t.clientX - e.clientX) <= 0 && Math.abs(t.clientY - e.clientY) <= 0);
      }
      function ot(t, n) {
        if (!t || !t.nodeType || 1 !== t.nodeType) throw "Sortable-dnd: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
        t[I] = this, this.el = t, this.options = n = e({}, n);
        var o = {
          store: null,
          group: "",
          handle: null,
          sortable: !0,
          disabled: !1,
          multiple: !1,
          lockAxis: "",
          direction: "",
          animation: 150,
          easing: "",
          draggable: null,
          selectHandle: null,
          customGhost: null,
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
          emptyInsertThreshold: -1
        };
        for (var i in o) !(i in this.options) && (this.options[i] = o[i]);
        for (var r in et(n), this) "_" === r.charAt(0) && "function" == typeof this[r] && (this[r] = this[r].bind(this));
        c(t, this.options.supportTouch ? "touchstart" : "mousedown", this._onDrag), tt.push(t), this.autoScroller = new T(this.options), this.multiplayer = new M(this.options), this.animator = new N(this.options);
      }
      return ot.prototype = {
        constructor: ot,
        destroy: function () {
          this._cancelStart(), this._nulling(), h(this.el, "touchstart", this._onDrag), h(this.el, "mousedown", this._onDrag);
          var t = tt.indexOf(this.el);
          t > -1 && tt.splice(t, 1), this.el[I] = this.animator = this.multiplayer = this.autoScroller = null;
        },
        option: function (t, e) {
          if (void 0 === e) return this.options[t];
          this.options[t] = e, this.animator.options[t] = e, this.multiplayer.options[t] = e, this.autoScroller.options[t] = e, "group" === t && et(this.options);
        },
        select: function (t) {
          this.multiplayer.select(t);
        },
        deselect: function (t) {
          this.multiplayer.deselect(t);
        },
        getSelectedElements: function () {
          return this.multiplayer.selectedElements;
        },
        _onDrag: function (t) {
          var e = this;
          if (!H && !this.options.disabled && this.options.group.pull && (!/mousedown|pointerdown/.test(t.type) || 0 === t.button)) {
            var n = t.touches && t.touches[0],
              o = (n || t).target;
            if (!l || !o || "SELECT" !== o.tagName.toUpperCase()) {
              var i = p(o, this.options.draggable, this.el);
              if (i && !i.animated) {
                j = {
                  origin: t,
                  clientX: (n || t).clientX,
                  clientY: (n || t).clientY
                }, H = i, c(K = n ? H : document, "mouseup", this._onDrop), c(K, "touchend", this._onDrop), c(K, "touchcancel", this._onDrop);
                var a = this.options,
                  h = a.handle,
                  u = a.selectHandle;
                if ("function" == typeof u && u(t) || "string" == typeof u && b(o, u)) $ = !0;else if (("function" != typeof h || h(t)) && ("string" != typeof h || b(o, h))) {
                  var d = this.options,
                    m = d.delay,
                    f = d.delayOnTouchOnly;
                  !m || f && !n || s || r ? this._onStart(n, t) : (c(this.el.ownerDocument, "touchmove", this._delayMoveHandler), c(this.el.ownerDocument, "mousemove", this._delayMoveHandler), c(this.el.ownerDocument, "mouseup", this._cancelStart), c(this.el.ownerDocument, "touchend", this._cancelStart), c(this.el.ownerDocument, "touchcancel", this._cancelStart), Z = setTimeout(function () {
                    return e._onStart(n, t);
                  }, m)), c(document, "selectstart", x), l && _(document.body, "user-select", "none");
                }
              }
            }
          }
        },
        _delayMoveHandler: function (t) {
          var e = t.touches ? t.touches[0] : t;
          Math.max(Math.abs(e.clientX - j.clientX), Math.abs(e.clientY - j.clientY)) >= Math.floor(this.options.touchStartThreshold / (window.devicePixelRatio || 1)) && this._cancelStart();
        },
        _cancelStart: function () {
          clearTimeout(Z), h(this.el.ownerDocument, "touchmove", this._delayMoveHandler), h(this.el.ownerDocument, "mousemove", this._delayMoveHandler), h(this.el.ownerDocument, "mouseup", this._cancelStart), h(this.el.ownerDocument, "touchend", this._cancelStart), h(this.el.ownerDocument, "touchcancel", this._cancelStart), h(document, "selectstart", x), l && _(document.body, "user-select", "");
        },
        _onStart: function (t, e) {
          var n = g(H);
          P = this.el, A = this.el, B = H, W = n, z = n, G = n, U = {
            to: this.el,
            target: H,
            newIndex: n,
            relative: 0
          }, J = H, O = this.el, X = H.cloneNode(!0), F = H.parentNode, R = this.options.group.pull, ot.clone = X, ot.active = this, ot.dragged = H, w(H, this.options.chosenClass, !0), this.multiplayer.onChoose(), E({
            sortable: this,
            name: "onChoose",
            params: this._getParams(e)
          }), c(K, t ? "touchmove" : "mousemove", this._nearestSortable);
          try {
            document.selection ? setTimeout(function () {
              return document.selection.empty();
            }, 0) : window.getSelection().removeAllRanges();
          } catch (t) {}
        },
        _onStarted: function () {
          w(X, this.options.chosenClass, !0), this._appendGhost(), this.multiplayer.onDrag(this), E({
            sortable: this,
            name: "onDrag",
            params: this._getParams(j.origin)
          }), _(H, "display", "none"), w(H, this.options.chosenClass, !1), H.parentNode.insertBefore(X, H);
        },
        _getGhostElement: function () {
          var t = this.options.customGhost;
          if ("function" == typeof t) {
            var e = this.multiplayer.selectedElements;
            return t(e.length ? e : [H]);
          }
          return this.multiplayer.getGhostElement() || H;
        },
        _appendGhost: function () {
          if (!Y) {
            var t = this.options.fallbackOnBody ? document.body : this.el,
              n = this._getGhostElement();
            w(Y = n.cloneNode(!0), this.options.ghostClass, !0);
            var o = d(H),
              i = e({
                position: "fixed",
                top: o.top,
                left: o.left,
                width: o.width,
                height: o.height,
                zIndex: "100000",
                opacity: "0.8",
                overflow: "hidden",
                boxSizing: "border-box",
                transform: "translate3d(0px, 0px, 0px)",
                transition: "none",
                pointerEvents: "none"
              }, this.options.ghostStyle);
            for (var r in i) _(Y, r, i[r]);
            ot.ghost = Y, t.appendChild(Y);
            var s = (j.clientX - o.left) / parseInt(Y.style.width) * 100,
              l = (j.clientY - o.top) / parseInt(Y.style.height) * 100;
            _(Y, "transform-origin", s + "% " + l + "%"), _(Y, "will-change", "transform");
          }
        },
        _nearestSortable: function (t) {
          x(t);
          var e = t.touches && t.touches[0] || t;
          if (H && nt(e)) {
            !V && this._onStarted();
            var n = this.options.lockAxis,
              o = "x" === n ? j.clientX : e.clientX,
              i = "y" === n ? j.clientY : e.clientY,
              r = document.elementFromPoint(o, i),
              s = o - j.clientX,
              l = i - j.clientY;
            V = {
              origin: t,
              clientX: o,
              clientY: i
            }, _(Y, "transform", "translate3d(" + s + "px, " + l + "px, 0)");
            var a,
              c,
              h,
              p = (a = o, c = i, tt.reduce(function (t, e) {
                var n = e[I].options.emptyInsertThreshold;
                if (null != n) {
                  var o = d(e),
                    i = a >= o.left - n && a <= o.right + n,
                    r = c >= o.top - n && c <= o.bottom + n;
                  return i && r && (!h || h && o.left >= h.left && o.right <= h.right && o.top >= h.top && o.bottom <= h.bottom) && (t = e, h = o), t;
                }
              }, null));
            if (p && p[I]._onMove(t, r), !p || p[I].options.autoScroll) {
              var m = function (t, e) {
                if (!t || !t.getBoundingClientRect) return u();
                var n = t,
                  o = !1;
                do {
                  if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
                    var i = _(n);
                    if (n.clientWidth < n.scrollWidth && ("auto" == i.overflowX || "scroll" == i.overflowX) || n.clientHeight < n.scrollHeight && ("auto" == i.overflowY || "scroll" == i.overflowY)) {
                      if (!n.getBoundingClientRect || n === document.body) return u();
                      if (o || e) return n;
                      o = !0;
                    }
                  }
                } while (n = n.parentNode);
                return u();
              }(r, !0);
              this.autoScroller.update(m, j, V);
            } else this.autoScroller.destroy();
          }
        },
        _allowPut: function () {
          if (O === this.el) return !0;
          if (this.options.group.put) {
            var t = this.options.group,
              e = t.name,
              n = t.put,
              o = O[I].options.group;
            return n.join && n.indexOf(o.name) > -1 || o.name && e && o.name === e;
          }
          return !1;
        },
        _getDirection: function () {
          var t = this.options,
            e = t.draggable,
            n = t.direction;
          return n ? "function" == typeof n ? n.call(V.origin, H, this) : n : y(F, e);
        },
        _allowSwap: function () {
          var t = d(k),
            e = "vertical" === this._getDirection(),
            n = e ? "top" : "left",
            o = e ? "bottom" : "right",
            i = k[e ? "offsetHeight" : "offsetWidth"],
            r = e ? V.clientY : V.clientX,
            s = r >= t[n] && r < t[o] - i / 2 ? -1 : 1,
            l = v(F, 0, this.options.draggable),
            a = f(F),
            c = d(l),
            h = d(a);
          if (k === F || m(F, k)) return X === l && r < c[n] ? (L = k, !0) : X === a && r > h[o] && (L = k.nextSibling, !0);
          var u = S(X, k);
          return L = u < 0 ? k.nextSibling : k, q !== k ? (Q = s, !0) : Q !== s && (Q = s, s < 0 ? u > 0 : u < 0);
        },
        _onMove: function (t, e) {
          if (!this.options.disabled && this._allowPut()) {
            if (k = p(e, this.options.draggable, this.el), E({
              sortable: this,
              name: "onMove",
              params: this._getParams(t, {
                target: k
              })
            }), this.options.sortable || this.el !== O) return this.el === A || e !== this.el && f(this.el) ? void (k && !k.animated && !m(k, X) && this._allowSwap() && (k !== X && L !== X ? (this.el !== A ? this._onInsert(t) : k !== H && this._onChange(t), q = k) : q = k)) : (k = q = null, void this._onInsert(t));
            A !== O && (k = q = H, Q = 0, this._onInsert(t));
          }
        },
        _onInsert: function (t) {
          var e = k || X,
            n = "clone" === R && this.el !== O && A === O,
            o = "clone" === R && this.el === O && A !== O,
            i = m(k, document),
            r = k === H && !i;
          P = this.el, W = g(X), B = e, F = i ? k.parentNode : this.el, A[I].animator.collect(X.parentNode), this.animator.collect(F), n && (U.target = J, U.newIndex = W, U.relative = J === H ? 0 : S(X, J), _(H, "display", ""), O[I].multiplayer.toggleVisible(!0), O[I].options.group.revertDrag || X.parentNode.insertBefore(H, X)), o && (W = g(H), _(H, "display", "none"), this.multiplayer.toggleVisible(!1)), _(X, "display", r ? "none" : ""), k && i ? F.insertBefore(X, Q < 0 ? k : k.nextSibling) : F.appendChild(X), z = r ? G : g(X), n && O[I].options.group.revertDrag && (U.target = H, U.newIndex = G, U.relative = 0, E({
            sortable: O[I],
            name: "onChange",
            params: this._getParams(t, {
              to: O,
              target: H,
              newIndex: G,
              revertDrag: !0
            })
          })), n || E({
            sortable: A[I],
            name: "onRemove",
            params: this._getParams(t, {
              newIndex: -1
            })
          }), o && e !== H && (J = e, E({
            sortable: this,
            name: "onChange",
            params: this._getParams(t, {
              from: O,
              backToOrigin: !0
            })
          })), o || E({
            sortable: this,
            name: "onAdd",
            params: this._getParams(t, {
              oldIndex: -1
            })
          }), A[I].animator.animate(), this.animator.animate(), A = this.el;
        },
        _onChange: function (t) {
          W = g(X), F = k.parentNode, B = k, this.el === O && (J = k), this.animator.collect(F), F.insertBefore(X, L), z = g(X), E({
            sortable: this,
            name: "onChange",
            params: this._getParams(t)
          }), this.animator.animate(), A = this.el;
        },
        _onDrop: function (t) {
          this._cancelStart(), h(K, "touchmove", this._nearestSortable), h(K, "mousemove", this._nearestSortable), h(K, "mouseup", this._onDrop), h(K, "touchend", this._onDrop), h(K, "touchcancel", this._onDrop), w(H, this.options.chosenClass, !1), O && (A = O, W = G, B === X && (B = H), this.multiplayer.toggleClass(!1), E({
            sortable: this,
            name: "onUnchoose",
            params: this._getParams(t)
          }), V && this._onEnd(t));
          var e = this.options,
            n = e.multiple,
            o = e.selectHandle;
          n && (o && $ || !o && !O) && !nt(t.changedTouches ? t.changedTouches[0] : t) && this.multiplayer.onSelect(t, H, this);
          Y && Y.parentNode && Y.parentNode.removeChild(Y), this.autoScroller.destroy(), this.multiplayer.destroy(), this._nulling();
        },
        _onEnd: function (t) {
          var n = this._getParams(t);
          this.multiplayer.onDrop(A, P, R);
          var o = this.options.swapOnDrop;
          "clone" === R && A !== P || !("function" == typeof o ? o(n) : o) || F.insertBefore(H, X), "clone" !== R || A === P || this.multiplayer.active() ? X && X.parentNode && X.parentNode.removeChild(X) : w(X, this.options.chosenClass, !1), _(H, "display", ""), A !== P && E({
            sortable: A[I],
            name: "onDrop",
            params: e({}, n, "clone" === R ? U : {
              newIndex: -1
            })
          }), E({
            sortable: P[I],
            name: "onDrop",
            params: e({}, n, A === P ? {} : {
              oldIndex: -1
            })
          });
        },
        _getParams: function (t) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            o = {};
          return o.event = t, o.to = P, o.from = A, o.node = H, o.clone = X, o.target = B, o.oldIndex = W, o.newIndex = z, o.pullMode = R, this.multiplayer.setParams(o), e(o, n), o.relative = B === H ? 0 : S(X, B), o;
        },
        _nulling: function () {
          P = A = O = H = k = L = X = Y = B = F = R = W = z = G = j = V = q = U = J = K = Q = Z = $ = ot.clone = ot.ghost = ot.active = ot.dragged = null;
        }
      }, ot.utils = {
        on: c,
        off: h,
        css: _,
        index: g,
        closest: p,
        getRect: d,
        toggleClass: w,
        detectDirection: y
      }, ot.get = function (t) {
        return t[I];
      }, ot.create = function (t, e) {
        return new ot(t, e);
      }, ot;
    });
  })(sortableDnd_min);
  var Dnd = sortableDnd_min.exports;

  var SortableAttrs = ['delay', 'group', 'handle', 'lockAxis', 'disabled', 'sortable', 'draggable', 'animation', 'autoScroll', 'ghostClass', 'ghostStyle', 'chosenClass', 'fallbackOnBody', 'scrollThreshold', 'delayOnTouchOnly'];
  function Sortable(el, options) {
    this.el = el;
    this.options = options;
    this.reRendered = false;
    this.installSortable();
  }
  Sortable.prototype = {
    constructor: Sortable,
    destroy: function destroy() {
      this.sortable && this.sortable.destroy();
      this.sortable = this.reRendered = null;
    },
    option: function option(key, value) {
      this.options[key] = value;
      if (SortableAttrs.includes(key)) {
        this.sortable.option(key, value);
      }
    },
    installSortable: function installSortable() {
      var _this = this;
      var props = SortableAttrs.reduce(function (res, key) {
        res[key] = _this.options[key];
        return res;
      }, {});
      this.sortable = new Dnd(this.el, _objectSpread2(_objectSpread2({}, props), {}, {
        emptyInsertThreshold: 0,
        swapOnDrop: function swapOnDrop(event) {
          return event.from === event.to;
        },
        onDrag: function onDrag(event) {
          return _this.onDrag(event);
        },
        onDrop: function onDrop(event) {
          return _this.onDrop(event);
        },
        onAdd: function onAdd(event) {
          return _this.onAdd(event);
        },
        onRemove: function onRemove(event) {
          return _this.onRemove(event);
        }
      }));
    },
    onAdd: function onAdd(event) {
      var _Dnd$get$option = Dnd.get(event.from).option('store'),
        item = _Dnd$get$option.item,
        key = _Dnd$get$option.key;

      // store the dragged item
      this.sortable.option('store', {
        item: item,
        key: key
      });
      this.dispatchEvent('onAdd', {
        item: item,
        key: key,
        event: event
      });
    },
    onRemove: function onRemove(event) {
      var _Dnd$get$option2 = Dnd.get(event.from).option('store'),
        item = _Dnd$get$option2.item,
        key = _Dnd$get$option2.key;
      this.dispatchEvent('onRemove', {
        item: item,
        key: key,
        event: event
      });
    },
    onDrag: function onDrag(event) {
      var key = event.node.getAttribute('data-key');
      var index = this.getIndex(key);
      var item = this.options.list[index];

      // store the dragged item
      this.sortable.option('store', {
        item: item,
        key: key,
        index: index
      });
      this.dispatchEvent('onDrag', {
        item: item,
        key: key,
        index: index,
        event: event
      });
    },
    onDrop: function onDrop(event) {
      var _Dnd$get$option3 = Dnd.get(event.from).option('store'),
        item = _Dnd$get$option3.item,
        key = _Dnd$get$option3.key,
        index = _Dnd$get$option3.index;
      var list = this.options.list;
      var params = {
        key: key,
        item: item,
        list: list,
        event: event,
        changed: false,
        oldList: _toConsumableArray(list),
        oldIndex: index,
        newIndex: index
      };
      if (!(event.from === event.to && event.node === event.target)) {
        this.getDropParams(params, event, item, key, index, list);
      }
      this.dispatchEvent('onDrop', params);
      if (event.from === this.el && this.reRendered) {
        var _Dnd$dragged;
        (_Dnd$dragged = Dnd.dragged) === null || _Dnd$dragged === void 0 ? void 0 : _Dnd$dragged.remove();
      }
      if (event.from !== event.to && event.pullMode === 'clone') {
        var _Dnd$clone;
        (_Dnd$clone = Dnd.clone) === null || _Dnd$clone === void 0 ? void 0 : _Dnd$clone.remove();
      }
      this.reRendered = false;
    },
    getDropParams: function getDropParams(params, event, item, key, index, list) {
      var targetKey = event.target.getAttribute('data-key');
      var newIndex = -1;
      var oldIndex = index;

      // changes position in current list
      if (event.from === event.to) {
        // re-get the dragged element's index
        oldIndex = this.getIndex(key);
        newIndex = this.getIndex(targetKey);
        if (oldIndex < newIndex && event.relative === -1 || oldIndex > newIndex && event.relative === 1) {
          newIndex += event.relative;
        }
        if (newIndex !== oldIndex) {
          list.splice(oldIndex, 1);
          list.splice(newIndex, 0, item);
        }
      } else {
        // remove from
        if (event.from === this.el) {
          oldIndex = this.getIndex(key);
          list.splice(oldIndex, 1);
        }

        // added to
        if (event.to === this.el) {
          oldIndex = -1;
          newIndex = this.getIndex(targetKey);
          if (event.relative === 0) {
            // added to last
            newIndex = list.length;
          } else if (event.relative === 1) {
            newIndex += event.relative;
          }
          list.splice(newIndex, 0, item);
        }
      }
      params.changed = event.from !== event.to || newIndex !== oldIndex;
      params.list = list;
      params.oldIndex = oldIndex;
      params.newIndex = newIndex;
    },
    getIndex: function getIndex(key) {
      return this.options.uniqueKeys.indexOf(key);
    },
    dispatchEvent: function dispatchEvent(name, params) {
      var cb = this.options[name];
      cb && cb(params);
    }
  };

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

  var VirtualAttrs = ['size', 'keeps', 'scroller', 'direction', 'debounceTime', 'throttleTime'];
  var CACLTYPE = {
    INIT: 'INIT',
    FIXED: 'FIXED',
    DYNAMIC: 'DYNAMIC'
  };
  var DIRECTION = {
    FRONT: 'FRONT',
    BEHIND: 'BEHIND',
    STATIONARY: 'STATIONARY'
  };
  var rectDir = {
    vertical: 'top',
    horizontal: 'left'
  };
  var scrollDir = {
    vertical: 'scrollTop',
    horizontal: 'scrollLeft'
  };
  var scrollSize = {
    vertical: 'scrollHeight',
    horizontal: 'scrollWidth'
  };
  var offsetSize = {
    vertical: 'offsetHeight',
    horizontal: 'offsetWidth'
  };
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
      fixed: 0
    };
    this.scrollDirection = '';
    this.updateScrollElement();
    this.updateOnScrollFunction();
    this.addScrollEventListener();
    this.checkIfUpdate(0, options.keeps - 1);
  }
  Virtual.prototype = {
    constructor: Virtual,
    isFront: function isFront() {
      return this.scrollDirection === DIRECTION.FRONT;
    },
    isBehind: function isBehind() {
      return this.scrollDirection === DIRECTION.BEHIND;
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
        var startOffset = this.getScrollStartOffset();
        this.scrollToOffset(indexOffset + startOffset);
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
        this.updateScrollElement();
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
    enableScroll: function enableScroll(enable) {
      var scroller = this.options.scroller;
      var event = enable ? Dnd.utils.off : Dnd.utils.on;
      var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
      event(scroller, 'DOMMouseScroll', this.preventDefault);
      event(scroller, wheelEvent, this.preventDefault);
      event(scroller, 'touchmove', this.preventDefault);
      event(scroller, 'keydown', this.preventDefaultForKeyDown);
    },
    // ========================================= Properties =========================================
    preventDefault: function preventDefault(e) {
      e.preventDefault();
    },
    preventDefaultForKeyDown: function preventDefaultForKeyDown(e) {
      var keys = {
        37: 1,
        38: 1,
        39: 1,
        40: 1
      };
      if (keys[e.keyCode]) {
        this.preventDefault(e);
        return false;
      }
    },
    updateScrollElement: function updateScrollElement() {
      var scroller = this.options.scroller;
      if (scroller instanceof Document && scroller.nodeType === 9 || scroller instanceof Window) {
        this.scrollEl = document.scrollingElement || document.documentElement || document.body;
      } else {
        this.scrollEl = scroller;
      }
    },
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
        this.scrollDirection = DIRECTION.STATIONARY;
      } else {
        this.scrollDirection = offset < this.offset ? DIRECTION.FRONT : DIRECTION.BEHIND;
      }
      this.offset = offset;
      var top = this.isFront() && offset <= 0;
      var bottom = this.isBehind() && clientSize + offset >= scrollSize;
      this.options.onScroll({
        top: top,
        bottom: bottom,
        offset: offset,
        direction: this.scrollDirection
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
      return this.isFixed() ? this.calcSize.fixed : this.options.size || this.calcSize.average;
    },
    getScrollStartOffset: function getScrollStartOffset() {
      var offset = 0;
      var _this$options3 = this.options,
        wrapper = _this$options3.wrapper,
        scroller = _this$options3.scroller,
        direction = _this$options3.direction;
      if (scroller && wrapper) {
        var rect = scroller instanceof Window ? Dnd.utils.getRect(wrapper) : Dnd.utils.getRect(wrapper, true, scroller);
        offset = this.offset + rect[rectDir[direction]];
      }
      return offset;
    }
  };

  var VirtualProps = {
    dataSource: {},
    modelValue: {},
    dataKey: {
      type: String,
      "default": '',
      required: true
    },
    tableMode: {
      type: Boolean,
      "default": false
    },
    draggable: {
      type: String,
      "default": '.virtual-dnd-list-item'
    },
    itemClass: {
      type: String,
      "default": 'virtual-dnd-list-item'
    },
    sortable: {
      type: Boolean,
      "default": true
    },
    handle: {
      type: [Function, String]
    },
    group: {
      type: [Object, String]
    },
    scroller: {
      type: [Document, HTMLElement]
    },
    lockAxis: {
      type: String,
      "default": ''
    },
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
    }
  };
  var SlotsProps = {
    dataKey: {
      type: [String, Number]
    },
    sizeKey: {
      type: String,
      "default": 'offsetHeight'
    },
    itemClass: {
      type: String
    }
  };

  var createSlot = function createSlot(_ref) {
    var _mounted = _ref.mounted,
      updated = _ref.updated,
      unmounted = _ref.unmounted;
    return vue.defineComponent({
      props: ['vnode'],
      mounted: function mounted() {
        _mounted(this.$el);
      },
      onUpdated: function onUpdated() {
        updated(this.$el);
      },
      onUnmounted: function onUnmounted() {
        unmounted(this.$el);
      },
      render: function render(props) {
        return props.vnode;
      }
    });
  };
  var Item = vue.defineComponent({
    props: SlotsProps,
    emits: ['resize'],
    setup: function setup(props, _ref2) {
      var emit = _ref2.emit,
        slots = _ref2.slots;
      var observer = null;
      var onSizeChange = function onSizeChange(el) {
        var size = el ? el[props.sizeKey] : 0;
        emit('resize', size, props.dataKey);
      };
      var mounted = function mounted(el) {
        if (typeof ResizeObserver !== 'undefined') {
          observer = new ResizeObserver(function () {
            onSizeChange(el);
          });
          el && observer.observe(el);
        }
      };
      var updated = function updated(el) {
        onSizeChange(el);
      };
      var unmounted = function unmounted() {
        if (observer) {
          observer.disconnect();
          observer = null;
        }
      };
      var customSlot = createSlot({
        mounted: mounted,
        updated: updated,
        unmounted: unmounted
      });
      return function () {
        var _a;
        var dataKey = props.dataKey,
          itemClass = props.itemClass;
        var _ref3 = ((_a = slots["default"]) === null || _a === void 0 ? void 0 : _a.call(slots)) || [],
          _ref4 = _slicedToArray(_ref3, 1),
          defaultSlot = _ref4[0];
        return vue.h(customSlot, {
          key: dataKey,
          "class": itemClass,
          vnode: defaultSlot,
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

  var getList = function getList(source) {
    return vue.isRef(source) ? source.value : source;
  };
  var VirtualList = vue.defineComponent({
    props: VirtualProps,
    emits: ['update:dataSource', 'update:modelValue', 'top', 'bottom', 'drag', 'drop', 'rangeChange'],
    setup: function setup(props, _ref) {
      var emit = _ref.emit,
        slots = _ref.slots,
        expose = _ref.expose;
      var rangeRef = vue.ref({
        start: 0,
        end: props.keeps - 1,
        front: 0,
        behind: 0
      });
      var rootRef = vue.ref(null);
      var wrapRef = vue.ref(null);
      var listRef = vue.ref([]);
      var dragging = vue.ref();
      var lastList = vue.ref([]);
      var horizontal = vue.computed(function () {
        return props.direction !== 'vertical';
      });
      var virtualAttributes = vue.computed(function () {
        return VirtualAttrs.reduce(function (res, key) {
          res[key] = props[key];
          return res;
        }, {});
      });
      var sortableAttributes = vue.computed(function () {
        return SortableAttrs.reduce(function (res, key) {
          res[key] = props[key];
          return res;
        }, {});
      });
      var virtual;
      var sortable;
      var uniqueKeys = [];
      var lastLength = 0;
      function getSize(key) {
        return virtual.getSize(key);
      }
      function getOffset() {
        return virtual.getOffset();
      }
      function getClientSize() {
        return virtual.getClientSize();
      }
      function getScrollSize() {
        return virtual.getScrollSize();
      }
      function scrollToKey(key) {
        var index = uniqueKeys.indexOf(key);
        if (index > -1) {
          virtual.scrollToIndex(index);
        }
      }
      function scrollToOffset(offset) {
        virtual.scrollToOffset(offset);
      }
      function scrollToIndex(index) {
        virtual.scrollToIndex(index);
      }
      function scrollToTop() {
        scrollToOffset(0);
      }
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
        return [props.dataSource, props.modelValue];
      }, function () {
        onUpdate();
      }, {
        deep: true
      });
      vue.watch(virtualAttributes, function (newVal, oldVal) {
        if (!virtual) return;
        for (var key in newVal) {
          if (newVal[key] != oldVal[key]) {
            virtual.option(key, newVal[key]);
          }
        }
      });
      vue.watch(sortableAttributes, function (newVal, oldVal) {
        if (!sortable) return;
        for (var key in newVal) {
          if (newVal[key] != oldVal[key]) {
            sortable.option(key, newVal[key]);
          }
        }
      });
      vue.onBeforeMount(function () {
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
        installVirtual();
        installSortable();
      });
      vue.onUnmounted(function () {
        sortable === null || sortable === void 0 ? void 0 : sortable.destroy();
        virtual === null || virtual === void 0 ? void 0 : virtual.removeScrollEventListener();
      });
      var onUpdate = function onUpdate() {
        var list = getList(props.modelValue || props.dataSource);
        if (!list) return;
        listRef.value = list;
        updateUniqueKeys();
        updateRange(lastList.value, list);
        sortable === null || sortable === void 0 ? void 0 : sortable.option('list', list);
        // if auto scroll to the last offset
        if (lastLength && props.keepOffset) {
          var index = list.length - lastLength;
          if (index > 0) {
            scrollToIndex(index);
          }
          lastLength = 0;
        }
        lastList.value = _toConsumableArray(listRef.value);
      };
      var updateUniqueKeys = function updateUniqueKeys() {
        uniqueKeys = listRef.value.map(function (item) {
          return getDataKey(item, props.dataKey);
        });
        virtual === null || virtual === void 0 ? void 0 : virtual.option('uniqueKeys', uniqueKeys);
        sortable === null || sortable === void 0 ? void 0 : sortable.option('uniqueKeys', uniqueKeys);
      };
      var installVirtual = function installVirtual() {
        virtual = new Virtual(Object.assign(Object.assign({}, virtualAttributes.value), {
          buffer: Math.round(props.keeps / 3),
          wrapper: wrapRef.value,
          scroller: props.scroller || rootRef.value,
          uniqueKeys: uniqueKeys,
          onScroll: function onScroll(event) {
            lastLength = 0;
            if (!!listRef.value.length && event.top) {
              handleToTop();
            } else if (event.bottom) {
              handleToBottom();
            }
          },
          onUpdate: function onUpdate(range) {
            var rangeChanged = range.start !== rangeRef.value.start;
            if (dragging.value && rangeChanged) {
              sortable && (sortable.reRendered = true);
            }
            rangeRef.value = range;
            rangeChanged && emit('rangeChange', range);
          }
        }));
      };
      var installSortable = function installSortable() {
        sortable = new Sortable(rootRef.value, Object.assign(Object.assign({}, sortableAttributes.value), {
          list: listRef.value,
          uniqueKeys: uniqueKeys,
          onDrag: function onDrag(event) {
            dragging.value = event.key;
            if (!props.sortable) {
              virtual.enableScroll(false);
              sortable.option('autoScroll', false);
            }
            emit('drag', event);
          },
          onDrop: function onDrop(event) {
            dragging.value = '';
            virtual.enableScroll(true);
            sortable.option('autoScroll', props.autoScroll);
            if (event.changed) {
              emit('update:dataSource', event.list);
              emit('update:modelValue', event.list);
            }
            emit('drop', event);
          }
        }));
      };
      var updateRange = function updateRange(oldList, newList) {
        var newRange = Object.assign({}, rangeRef.value);
        if (newList.length > oldList.length && newRange.end === oldList.length - 1 && scrolledToBottom()) {
          newRange.end++;
          newRange.start = Math.max(0, newRange.end - props.keeps);
        }
        virtual === null || virtual === void 0 ? void 0 : virtual.updateRange(newRange);
      };
      var scrolledToBottom = function scrolledToBottom() {
        var offset = getOffset();
        var clientSize = getClientSize();
        var scrollSize = getScrollSize();
        return offset + clientSize + 1 >= scrollSize;
      };
      var handleToTop = throttle(function () {
        emit('top');
        lastLength = listRef.value.length;
      }, 50);
      var handleToBottom = throttle(function () {
        emit('bottom');
      }, 50);
      var onItemResized = function onItemResized(size, key) {
        var sizes = virtual.sizes.size;
        var renders = Math.min(props.keeps, listRef.value.length);
        virtual.onItemResized(key, size);
        if (sizes === renders - 1) {
          updateRange(listRef.value, listRef.value);
        }
      };
      var renderSpacer = function renderSpacer(offset) {
        if (props.tableMode) {
          var tdStyle = {
            padding: 0,
            margin: 0,
            border: 0,
            height: "".concat(offset, "px")
          };
          return vue.h('tr', {}, [vue.h('td', {
            style: tdStyle
          })]);
        }
        return null;
      };
      var renderItems = function renderItems() {
        var renders = [];
        var _rangeRef$value = rangeRef.value,
          start = _rangeRef$value.start,
          end = _rangeRef$value.end,
          front = _rangeRef$value.front,
          behind = _rangeRef$value.behind;
        var sizeKey = horizontal.value ? 'offsetWidth' : 'offsetHeight';
        renders.push(renderSpacer(front));
        var _loop = function _loop(index) {
          var record = listRef.value[index];
          if (record) {
            var dataKey = getDataKey(record, props.dataKey);
            renders.push(slots.item ? vue.h(Item, {
              key: dataKey,
              "class": props.itemClass,
              style: dataKey == dragging.value && {
                display: 'none'
              },
              dataKey: dataKey,
              sizeKey: sizeKey,
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
        renders.push(renderSpacer(behind));
        return renders;
      };
      return function () {
        var _rangeRef$value2 = rangeRef.value,
          front = _rangeRef$value2.front,
          behind = _rangeRef$value2.behind;
        var tableMode = props.tableMode,
          rootTag = props.rootTag,
          wrapTag = props.wrapTag,
          scroller = props.scroller,
          wrapClass = props.wrapClass,
          wrapStyle = props.wrapStyle;
        var padding = horizontal.value ? "0 ".concat(behind, "px 0 ").concat(front, "px") : "".concat(front, "px 0 ").concat(behind, "px");
        var overflow = horizontal.value ? 'auto hidden' : 'hidden auto';
        var container = tableMode ? 'table' : rootTag;
        var wrapper = tableMode ? 'tbody' : wrapTag;
        return vue.h(container, {
          ref: rootRef,
          style: !scroller && !tableMode && {
            overflow: overflow
          }
        }, {
          "default": function _default() {
            var _a, _b;
            return [(_a = slots.header) === null || _a === void 0 ? void 0 : _a.call(slots), vue.h(wrapper, {
              ref: wrapRef,
              "class": wrapClass,
              style: Object.assign(Object.assign({}, wrapStyle), {
                padding: !tableMode && padding
              })
            }, {
              "default": function _default() {
                return renderItems();
              }
            }), (_b = slots.footer) === null || _b === void 0 ? void 0 : _b.call(slots)];
          }
        });
      };
    }
  });

  return VirtualList;

}));
