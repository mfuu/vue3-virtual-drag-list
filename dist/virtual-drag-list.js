/*!
 * vue-virtual-draglist v3.1.3
 * open source under the MIT license
 * https://github.com/mfuu/vue3-virtual-drag-list#readme
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VirtualDragList = factory(global.Vue));
})(this, (function (vue) { 'use strict';

  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return exports;
    };
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      defineProperty = Object.defineProperty || function (obj, key, desc) {
        obj[key] = desc.value;
      },
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function (method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method,
        method = delegate.iterator[methodName];
      if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
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

  function debounce(fn) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
    var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var timer;
    var result;
    var debounced = function debounced() {
      var _this = this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (timer) clearTimeout(timer);
      if (immediate) {
        var callNow = !timer;
        timer = setTimeout(function () {
          timer = null;
        }, delay);
        if (callNow) result = fn.apply(this, args);
      } else {
        timer = setTimeout(function () {
          fn.apply(_this, args);
        }, delay);
      }
      return result;
    };
    debounced.prototype.cancel = function () {
      clearTimeout(timer);
      timer = null;
    };
    return debounced;
  }
  function throttle(fn) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
    var timer;
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      if (!timer) {
        timer = setTimeout(function () {
          timer = null;
          fn.apply(this, args);
        }, delay);
      }
    };
  }
  function getDataKey(item, dataKey) {
    return (!Array.isArray(dataKey) ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : dataKey).reduce(function (o, k) {
      return (o || {})[k];
    }, item);
  }

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var sortableDnd_min = {exports: {}};

  (function (module, exports) {
    !function (t, e) {
      module.exports = e() ;
    }(commonjsGlobal, function () {

      function B(e, t) {
        var n,
          o = Object.keys(e);
        return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(e), t && (n = n.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), o.push.apply(o, n)), o;
      }
      function l(o) {
        for (var t = 1; t < arguments.length; t++) {
          var i = null != arguments[t] ? arguments[t] : {};
          t % 2 ? B(Object(i), !0).forEach(function (t) {
            var e, n;
            e = o, n = i[t = t], (t = function (t) {
              t = function (t, e) {
                if ("object" != typeof t || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 === n) return ("string" === e ? String : Number)(t);
                n = n.call(t, e || "default");
                if ("object" != typeof n) return n;
                throw new TypeError("@@toPrimitive must return a primitive value.");
              }(t, "string");
              return "symbol" == typeof t ? t : String(t);
            }(t)) in e ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0
            }) : e[t] = n;
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(i)) : B(Object(i)).forEach(function (t) {
            Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(i, t));
          });
        }
        return o;
      }
      function R(t) {
        return (R = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
          return typeof t;
        } : function (t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        })(t);
      }
      var F = {
          capture: !1,
          passive: !1
        },
        H = /\s+/g,
        c = {
          start: ["touchstart", "mousedown"],
          move: ["touchmove", "mousemove"],
          end: ["touchend", "touchcancel", "mouseup"]
        };
      function t(t) {
        if ("undefined" != typeof window && window.navigator) return !!navigator.userAgent.match(t);
      }
      var e,
        d = t(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
        L = t(/Edge/i),
        a = t(/safari/i) && !t(/chrome/i) && !t(/android/i),
        k = (e = !1, document.addEventListener("checkIfSupportPassive", null, {
          get passive() {
            return e = !0;
          }
        }), e),
        u = "undefined" == typeof window || "undefined" == typeof document ? "" : (o = window.getComputedStyle(document.documentElement, "") || ["-moz-hidden-iframe"], "ms" !== (o = (Array.prototype.slice.call(o).join("").match(/-(moz|webkit|ms)-/) || "" === o.OLink && ["", "o"])[1]) ? o && o.length ? o[0].toUpperCase() + o.substr(1) : "" : "ms");
      function i(t, e) {
        t.style["".concat(u, "TransitionDuration")] = null == e ? "" : "".concat(e, "ms");
      }
      function h(t, e) {
        t.style["".concat(u, "Transform")] = e ? "".concat(e) : "";
      }
      function p(t, e, n) {
        window.addEventListener ? t.addEventListener(e, n, !(!k && d) && F) : window.attachEvent && t.attachEvent("on" + e, n);
      }
      function n(t, e, n) {
        window.removeEventListener ? t.removeEventListener(e, n, !(!k && d) && F) : window.detachEvent && t.detachEvent("on" + e, n);
      }
      function I(t) {
        var e = t,
          n = t.touches && t.touches[0] || t.changedTouches && t.changedTouches[0],
          t = n ? document.elementFromPoint(n.clientX, n.clientY) : t.target;
        return !n || "clientX" in e || (e.clientX = n.clientX, e.clientY = n.clientY, e.pageX = n.pageX, e.pageY = n.pageY, e.screenX = n.screenX, e.screenY = n.screenY), {
          touch: n,
          event: e,
          target: t
        };
      }
      function f(t, e) {
        for (var n = {
          top: 0,
          left: 0,
          height: t.offsetHeight,
          width: t.offsetWidth
        }; n.top += t.offsetTop, n.left += t.offsetLeft, (t = t.parentNode) && t !== e;);
        return n;
      }
      function m() {
        var t = document.scrollingElement;
        return t || document.documentElement;
      }
      function g(t) {
        var e,
          n,
          o,
          i,
          r,
          a,
          s,
          l = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
          c = 2 < arguments.length ? arguments[2] : void 0;
        if (t.getBoundingClientRect || t === window) {
          if (t !== window && t.parentNode && t !== m()) {
            if (n = (e = t.getBoundingClientRect()).top, o = e.left, i = e.bottom, r = e.right, a = e.height, s = e.width, l.parent && t.parentNode !== t.ownerDocument.body) for (var u, h = t.parentNode; h && h.getBoundingClientRect && h !== t.ownerDocument.body;) {
              if ((u = h.getBoundingClientRect()).height < a) return n = u.top, o = u.left, i = u.bottom, r = u.right, a = u.height, {
                top: n,
                left: o,
                bottom: i,
                right: r,
                width: s = u.width,
                height: a
              };
              h = h.parentNode;
            }
          } else o = n = 0, i = window.innerHeight, r = window.innerWidth, a = window.innerHeight, s = window.innerWidth;
          if ((l.block || l.relative) && t !== window && (c = c || t.parentNode, !d)) do {
            if (c && c.getBoundingClientRect && ("none" !== b(c, "transform") || l.relative && "static" !== b(c, "position"))) {
              var p = c.getBoundingClientRect();
              n -= p.top + parseInt(b(c, "border-top-width")), o -= p.left + parseInt(b(c, "border-left-width")), i = n + e.height, r = o + e.width;
              break;
            }
          } while (c = c.parentNode);
          return {
            top: n,
            left: o,
            bottom: i,
            right: r,
            width: s,
            height: a
          };
        }
      }
      function W(t, e, n, o) {
        if (t) {
          n = n || document;
          do {
            if (null == e) {
              var i = Array.prototype.slice.call(n.children),
                r = i.indexOf(t);
              if (-1 < r) return i[r];
              for (var a = 0; a < i.length; a++) if (z(t, i[a])) return i[a];
            } else if ((">" !== e[0] || t.parentNode === n) && s(t, e) || o && t === n) return t;
          } while (t = t.parentNode);
        }
        return null;
      }
      function z(t, e) {
        if (t && e) {
          if (e.compareDocumentPosition) return e === t || 16 & e.compareDocumentPosition(t);
          if (e.contains && 1 === t.nodeType) return e.contains(t) && e !== t;
          for (; t = t.parentNode;) if (t === e) return 1;
        }
      }
      function v(t, e, n) {
        var o;
        t && e && (t.classList ? t.classList[n ? "add" : "remove"](e) : (o = (" " + t.className + " ").replace(H, " ").replace(" " + e + " ", " "), t.className = (o + (n ? " " + e : "")).replace(H, " ")));
      }
      function s(t, e) {
        if (e && (">" === e[0] && (e = e.substring(1)), t)) try {
          if (t.matches) return t.matches(e);
          if (t.msMatchesSelector) return t.msMatchesSelector(e);
          if (t.webkitMatchesSelector) return t.webkitMatchesSelector(e);
        } catch (t) {
          return;
        }
      }
      function q(t, e) {
        return t.top !== e.top || t.left !== e.left;
      }
      function b(t, e, n) {
        var o = t && t.style;
        if (o) {
          if (void 0 === n) return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), void 0 === e ? n : n[e];
          o[e = e in o || -1 !== e.indexOf("webkit") ? e : "-webkit-" + e] = n + ("string" == typeof n ? "" : "px");
        }
      }
      var y = "Sortable" + Date.now(),
        o = {
          sortable: null,
          nodes: []
        },
        w = l({}, o),
        _ = l({}, o),
        S = {};
      function V(t) {
        this.options = t || {}, this.groupName = t.group.name || "group_" + Number(Math.random().toString().slice(-3) + Date.now()).toString(32);
      }
      function U() {
        this.autoScrollAnimationFrame = null, this.speed = {
          x: 10,
          y: 10
        };
      }
      function Z(t) {
        this.options = t, this.animations = [];
      }
      function G() {
        this.helper = null, this.distance = {
          x: 0,
          y: 0
        };
      }
      V.prototype = {
        allowDrag: function (t) {
          return this.options.multiple && S[this.groupName] && S[this.groupName].length && -1 < S[this.groupName].indexOf(t);
        },
        getHelper: function () {
          var n = document.createElement("div");
          return S[this.groupName].forEach(function (t, e) {
            t = t.cloneNode(!0);
            t.style = "\n        opacity: ".concat(0 === e ? 1 : .5, ";\n        position: absolute;\n        z-index: ").concat(e, ";\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n      "), n.appendChild(t);
          }), n;
        },
        select: function (t, e, n, o) {
          var i;
          e && (S[this.groupName] || (S[this.groupName] = []), i = S[this.groupName].indexOf(e), v(e, this.options.selectedClass, i < 0), t = l(l({}, o), {}, {
            event: t
          }), i < 0 ? (S[this.groupName].push(e), o.sortable._dispatchEvent("onSelect", t)) : (S[this.groupName].splice(i, 1), o.sortable._dispatchEvent("onDeselect", t)), S[this.groupName].sort(function (t, e) {
            return t = f(t, n), e = f(e, n), t.top == e.top ? t.left - e.left : t.top - e.top;
          }));
        },
        onDrag: function (e, t) {
          w.sortable = t, w.nodes = S[this.groupName].map(function (t) {
            return {
              node: t,
              rect: g(t),
              offset: f(t, e)
            };
          }), _.sortable = t;
        },
        onTrulyStarted: function (e, t) {
          t.animator.collect(e, null, e.parentNode), S[this.groupName].forEach(function (t) {
            t != e && t.parentNode.removeChild(t);
          }), t.animator.animate();
        },
        onChange: function (t, e) {
          var n = g(t),
            o = f(t, e.el);
          _.sortable = e, _.nodes = S[this.groupName].map(function (t) {
            return {
              node: t,
              rect: n,
              offset: o
            };
          });
        },
        onDrop: function (t, n, e, o, i) {
          var r = this,
            a = (_.sortable.animator.collect(n, null, n.parentNode), S[this.groupName].indexOf(n)),
            o = (S[this.groupName].forEach(function (t, e) {
              e < a ? n.parentNode.insertBefore(t, n) : (e = 0 < e ? S[r.groupName][e - 1] : n, n.parentNode.insertBefore(t, e.nextSibling));
            }), w.sortable = o.sortable, _.nodes = S[this.groupName].map(function (t) {
              return {
                node: t,
                rect: g(t),
                offset: f(t, e)
              };
            }), _.sortable.el != w.sortable.el || this._offsetChanged(w.nodes, _.nodes)),
            i = l(l({}, i()), {}, {
              changed: o,
              event: t
            });
          _.sortable.el != w.sortable.el && w.sortable._dispatchEvent("onDrop", i), _.sortable._dispatchEvent("onDrop", i), _.sortable.animator.animate();
        },
        _offsetChanged: function (t, n) {
          return !!t.find(function (e) {
            return q(n.find(function (t) {
              return t.node === e.node;
            }).offset, e.offset);
          });
        }
      }, window.requestAnimationFrame || (window.requestAnimationFrame = function (t) {
        return setTimeout(t, 17);
      }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
        clearTimeout(t);
      }), U.prototype = {
        clear: function () {
          null != this.autoScrollAnimationFrame && (cancelAnimationFrame(this.autoScrollAnimationFrame), this.autoScrollAnimationFrame = null);
        },
        update: function (t, e, n, o) {
          var i = this;
          cancelAnimationFrame(this.autoScrollAnimationFrame), this.autoScrollAnimationFrame = requestAnimationFrame(function () {
            n && o && i.autoScroll(t, e, o), i.update(t, e, n, o);
          });
        },
        autoScroll: function (t, e, n) {
          var o, i, r, a, s, l, c, u, h, p, d, f;
          t && (o = n.clientX, n = n.clientY, void 0 !== o) && void 0 !== n && (h = g(t)) && (d = t.scrollTop, i = t.scrollLeft, r = t.scrollHeight, p = t.scrollWidth, a = h.top, s = h.right, l = h.bottom, c = h.left, f = h.height, h = h.width, n < a || s < o || l < n || o < c || (u = 0 < d && a <= n && n <= a + e, h = i + h < p && o <= s && s - e <= o, p = d + f < r && n <= l && l - e <= n, (f = d = 0) < i && c <= o && o <= c + e && (d = Math.floor(Math.max(-1, (o - c) / e - 1) * this.speed.x)), h && (d = Math.ceil(Math.min(1, (o - s) / e + 1) * this.speed.x)), u && (f = Math.floor(Math.max(-1, (n - a) / e - 1) * this.speed.y)), (f = p ? Math.ceil(Math.min(1, (n - l) / e + 1) * this.speed.y) : f) && (t.scrollTop += f), d && (t.scrollLeft += d)));
        }
      }, Z.prototype = {
        collect: function (t, e, n, o) {
          var i = this;
          n && (n = Array.prototype.slice.call(n.children), e = (t = this._getRange(n, t, e, o)).start, t = t.end, this.animations.length = 0, n.slice(e, t + 1).forEach(function (t) {
            t !== o && t !== Y.helper && i.animations.push({
              node: t,
              rect: g(t)
            });
          }));
        },
        animate: function () {
          var n = this;
          this.animations.forEach(function (t) {
            var e = t.node,
              t = t.rect;
            n._excute(e, t);
          });
        },
        _excute: function (t, e) {
          var n = e.left,
            e = e.top,
            o = g(t),
            e = e - o.top,
            n = n - o.left,
            o = (i(t), h(t, "translate3d(".concat(n, "px, ").concat(e, "px, 0)")), t.offsetWidth, this.options.animation);
          i(t, o), h(t, "translate3d(0px, 0px, 0px)"), clearTimeout(t.animated), t.animated = setTimeout(function () {
            i(t), h(t, ""), t.animated = null;
          }, o);
        },
        _getRange: function (t, e, n) {
          var o,
            e = t.indexOf(e),
            n = t.indexOf(n);
          return n < e && (e = (o = [n, e])[0], n = o[1]), e < 0 && (e = n, n = t.length - 1), {
            start: e,
            end: n = n < 0 ? t.length - 1 : n
          };
        }
      }, G.prototype = {
        get node() {
          return this.helper;
        },
        destroy: function () {
          this.helper && this.helper.parentNode && this.helper.parentNode.removeChild(this.helper), this.helper = null, this.distance = {
            x: 0,
            y: 0
          };
        },
        move: function (t, e) {
          this.helper && h(this.helper, "translate3d(".concat(t, "px, ").concat(e, "px, 0)"));
        },
        init: function (t, e, n, o) {
          if (!this.helper) {
            var i,
              r = o.fallbackOnBody,
              a = o.ghostClass,
              o = o.ghostStyle,
              o = void 0 === o ? {} : o,
              r = r ? document.body : n,
              s = (this.helper = e.cloneNode(!0), v(this.helper, a, !0), l({
                "box-sizing": "border-box",
                top: t.top,
                left: t.left,
                width: t.width,
                height: t.height,
                position: "fixed",
                opacity: "0.8",
                "z-index": 1e5,
                "pointer-events": "none"
              }, o));
            for (i in s) b(this.helper, i, s[i]);
            n = this.helper, e = "none", n.style["".concat(u, "Transition")] = e ? "none" === e ? "none" : "".concat(e) : "", h(this.helper, "translate3d(0px, 0px, 0px)"), r.appendChild(this.helper);
            a = this.distance.x / parseInt(this.helper.style.width) * 100, t = this.distance.y / parseInt(this.helper.style.height) * 100;
            b(this.helper, "transform-origin", "".concat(a, "% ").concat(t, "%")), b(this.helper, "transform", "translateZ(0)"), b(this.helper, "will-change", "transform");
          }
        }
      };
      function r() {
        var t,
          e = {
            from: l({}, A),
            to: l({}, j)
          };
        return T && (t = {
          from: l({}, w),
          to: l({}, _)
        }, e.from = l(l({}, t.from), e.from), e.to = l(l({}, t.to), e.to)), e;
      }
      var N,
        E,
        x,
        D,
        C,
        T,
        O,
        J,
        K = {
          sortable: null,
          group: null,
          node: null,
          rect: {},
          offset: {}
        },
        M = [],
        P = new G(),
        Q = new U(),
        A = l({}, K),
        j = l({}, K),
        X = {
          x: 0,
          y: 0
        },
        $ = function (t) {
          var e = {},
            n = t.group;
          n && "object" == R(n) || (n = {
            name: n,
            pull: !0,
            put: !0
          }), e.name = n.name, e.pull = n.pull, e.put = n.put, t.group = e;
        };
      function Y(t, e) {
        if (!t || !t.nodeType || 1 !== t.nodeType) throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
        (t[y] = this).el = t, this.ownerDocument = t.ownerDocument, this.options = e = Object.assign({}, e);
        var n,
          o,
          i = {
            disabled: !1,
            group: "",
            animation: 150,
            multiple: !1,
            draggable: null,
            handle: null,
            onDrag: null,
            onMove: null,
            onDrop: null,
            onChange: null,
            autoScroll: !0,
            scrollThreshold: 25,
            delay: 0,
            delayOnTouchOnly: !1,
            touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
            ghostClass: "",
            ghostStyle: {},
            chosenClass: "",
            selectedClass: "",
            fallbackOnBody: !1,
            stopPropagation: !1,
            supportTouch: "ontouchstart" in window,
            emptyInsertThreshold: 5
          };
        for (n in i) n in this.options || (this.options[n] = i[n]);
        for (o in $(e), this) "_" === o.charAt(0) && "function" == typeof this[o] && (this[o] = this[o].bind(this));
        p(t, this.options.supportTouch ? "touchstart" : "mousedown", this._onDrag), M.push(t), this.multiplayer = new V(this.options), this.animator = new Z(this.options);
      }
      return (Y.prototype = {
        constructor: Y,
        destroy: function () {
          this._dispatchEvent("destroy", this), this.el[y] = null;
          for (var t = 0; t < c.start.length; t++) n(this.el, c.start[t], this._onDrag);
          this._clearState(), M.splice(M.indexOf(this.el), 1), this.el = null;
        },
        option: function (t, e) {
          var n = this.options;
          if (void 0 === e) return n[t];
          n[t] = e, "group" === t && $(n);
        },
        _onDrag: function (t) {
          if (!this.options.disabled && this.options.group.pull && (!/mousedown|pointerdown/.test(t.type) || 0 === t.button)) {
            var e = I(t),
              n = e.touch,
              o = e.event,
              e = e.target;
            if (!(a && e && "SELECT" === e.tagName.toUpperCase() || e === this.el)) {
              var i = this.options,
                r = i.draggable,
                i = i.handle;
              if (("function" != typeof i || i(t)) && ("string" != typeof i || s(e, i))) {
                if ("function" == typeof r) {
                  i = r(t);
                  if (!i) return;
                  !function (e) {
                    if (e) {
                      var t = document.createElement("div");
                      try {
                        return t.appendChild(e.cloneNode(!0)), 1 == e.nodeType;
                      } catch (t) {
                        return e == window || e == document;
                      }
                    }
                  }(i) || (E = i);
                } else E = W(e, r, this.el, !1);
                E && !E.animated && this._prepareStart(n, o);
              }
            }
          }
        },
        _prepareStart: function (t, e) {
          var n = this,
            o = E.parentNode,
            i = ((D = e).sortable = this, D.group = E.parentNode, (T = this.options.multiple && this.multiplayer.allowDrag(E)) && this.multiplayer.onDrag(this.el, this), g(E)),
            r = f(E, this.el),
            r = (A = {
              sortable: this,
              group: o,
              node: E,
              rect: i,
              offset: r
            }, j.group = o, j.sortable = this, P.distance = {
              x: e.clientX - i.left,
              y: e.clientY - i.top
            }, p(document, "touchend", this._onDrop), p(document, "touchcancel", this._onDrop), p(document, "mouseup", this._onDrop), this.options),
            o = r.delay,
            e = r.delayOnTouchOnly;
          if (!o || e && !t || L || d) this._onStart(t);else {
            for (var a = 0; a < c.end.length; a++) p(this.ownerDocument, c.end[a], this._cancelStart);
            for (var s = 0; s < c.move.length; s++) p(this.ownerDocument, c.move[s], this._delayMoveHandler);
            J = setTimeout(function () {
              return n._onStart(t);
            }, o);
          }
        },
        _delayMoveHandler: function (t) {
          t = t.touches ? t.touches[0] : t;
          Math.max(Math.abs(t.clientX - D.clientX), Math.abs(t.clientY - D.clientY)) >= Math.floor(this.options.touchStartThreshold / (window.devicePixelRatio || 1)) && this._cancelStart();
        },
        _cancelStart: function () {
          clearTimeout(J);
          for (var t = 0; t < c.end.length; t++) n(this.ownerDocument, c.end[t], this._cancelStart);
          for (var e = 0; e < c.move.length; e++) n(this.ownerDocument, c.move[e], this._delayMoveHandler);
        },
        _onStart: function (t) {
          N = this.el, p(document, t ? "touchmove" : "mousemove", this._nearestSortable);
          try {
            document.selection ? setTimeout(function () {
              document.selection.empty();
            }, 0) : window.getSelection().removeAllRanges();
          } catch (t) {}
        },
        _onTrulyStarted: function () {
          var t;
          C || (this._dispatchEvent("onDrag", l(l({}, r()), {}, {
            event: D
          })), T && this.multiplayer.onTrulyStarted(E, this), t = T ? this.multiplayer.getHelper() : E, P.init(A.rect, t, this.el, this.options), Y.helper = P.node, v(E, this.options.chosenClass, !0), a && b(document.body, "user-select", "none"));
        },
        _nearestSortable: function (t) {
          var e, n, o, i, r, a, s;
          this._preventEvent(t), D && E && (e = (n = t).clientX, n = n.clientY, o = e - X.x, i = n - X.y, X.x = e, X.y = n, void 0 !== e && void 0 !== n && Math.abs(o) <= 0 && Math.abs(i) <= 0 || (n = (e = I(t)).event, o = e.target, r = n.clientX, a = n.clientY, M.some(function (t) {
            var e,
              n,
              o = t[y].options.emptyInsertThreshold;
            if (o) return n = g(t, {
              parent: !0
            }), e = r >= n.left - o && r <= n.right + o, n = a >= n.top - o && a <= n.bottom + o, e && n ? s = t : void 0;
          }), i = s, this._onTrulyStarted(), C = n, P.move(n.clientX - D.clientX, n.clientY - D.clientY), this._autoScroll(o), i && (N = i)[y]._onMove(n, o)));
        },
        _allowPut: function () {
          var t, e;
          return D.sortable.el === this.el || !!this.options.group.put && (t = this.options.group.name, (e = D.sortable.options.group).name) && t && e.name === t;
        },
        _onMove: function (t, e) {
          if (this._dispatchEvent("onMove", l(l({}, r()), {}, {
            event: t
          })), this._allowPut()) {
            if (x = W(e, this.options.draggable, N, !1)) {
              if (x === O) return;
              if ((O = x) === E) return;
              if (x.animated || z(x, E)) return;
            }
            N !== A.sortable.el ? e !== N && function (t, e, n) {
              for (var o = t.lastElementChild; o && (o === e || "none" === b(o, "display") || n && !s(o, n));) o = o.previousElementSibling;
              return o;
            }(N, P.node) ? x && this._onInsert(t, !1) : this._onInsert(t, !0) : x && this._onChange(t);
          }
        },
        _autoScroll: function (t) {
          var t = function (t, e) {
              if (t && t.getBoundingClientRect) {
                var n = t,
                  o = !1;
                do {
                  if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
                    var i = b(n);
                    if (n.clientWidth < n.scrollWidth && ("auto" == i.overflowX || "scroll" == i.overflowX) || n.clientHeight < n.scrollHeight && ("auto" == i.overflowY || "scroll" == i.overflowY)) {
                      if (!n.getBoundingClientRect || n === document.body) return m();
                      if (o || e) return n;
                      o = !0;
                    }
                  }
                } while (n = n.parentNode);
              }
              return m();
            }(t, !0),
            e = this.options,
            n = e.autoScroll,
            e = e.scrollThreshold;
          n && Q.update(t, e, D, C);
        },
        _onInsert: function (t, e) {
          var n = e ? E : x,
            o = e ? N : x.parentNode;
          A.sortable.animator.collect(E, null, E.parentNode, E), this.animator.collect(null, n, o, E), T && this.multiplayer.onChange(E, this), j = {
            sortable: this,
            group: o,
            node: n,
            rect: g(n),
            offset: f(n, N)
          }, A.sortable._dispatchEvent("onRemove", l(l({}, r()), {}, {
            event: t
          })), e ? o.appendChild(E) : o.insertBefore(E, x), this._dispatchEvent("onAdd", l(l({}, r()), {}, {
            event: t
          })), A.sortable.animator.animate(), this.animator.animate(), A.group = o, A.sortable = this;
        },
        _onChange: function (t) {
          var e = x.parentNode,
            t = (this.animator.collect(E, x, e), T && this.multiplayer.onChange(E, this), j = {
              sortable: this,
              group: e,
              node: x,
              rect: g(x),
              offset: f(x, N)
            }, this._dispatchEvent("onChange", l(l({}, r()), {}, {
              event: t
            })), f(E, N)),
            n = null,
            n = t.top === j.offset.top ? t.left < j.offset.left ? x.nextSibling : x : t.top < j.offset.top ? x.nextSibling : x;
          e.insertBefore(E, n), this.animator.animate(), A.group = e, A.sortable = this;
        },
        _onDrop: function (t) {
          this._unbindMoveEvents(), this._unbindDropEvents(), this._preventEvent(t), this._cancelStart(), Q.clear(), E && v(E, this.options.chosenClass, !1), E && D && C ? this._onEnd(t) : this.options.multiple && this.multiplayer.select(t, E, N, l({}, A)), this._clearState();
        },
        _onEnd: function (t) {
          var e;
          A.group = D.group, A.sortable = D.sortable, T ? this.multiplayer.onDrop(t, E, N, D, r) : (j.rect = g(E), j.offset = f(E, N), e = j.sortable.el !== A.sortable.el || q(A.offset, j.offset), e = l(l({}, r()), {}, {
            changed: e,
            event: t
          }), j.sortable.el !== A.sortable.el && A.sortable._dispatchEvent("onDrop", e), j.sortable._dispatchEvent("onDrop", e)), a && b(document.body, "user-select", "");
        },
        _preventEvent: function (t) {
          void 0 !== t.preventDefault && t.cancelable && t.preventDefault(), this.options.stopPropagation && (t && t.stopPropagation ? t.stopPropagation() : window.event.cancelBubble = !0);
        },
        _dispatchEvent: function (t, e) {
          t = this.options[t];
          "function" == typeof t && t(e);
        },
        _clearState: function () {
          E = x = D = C = T = O = J = Y.helper = null, X = {
            x: 0,
            y: 0
          }, A = j = l({}, K), P.destroy();
        },
        _unbindMoveEvents: function () {
          for (var t = 0; t < c.move.length; t++) n(document, c.move[t], this._nearestSortable);
        },
        _unbindDropEvents: function () {
          for (var t = 0; t < c.end.length; t++) n(document, c.end[t], this._onDrop);
        }
      }).utils = {
        getRect: g,
        getOffset: f
      }, Y.get = function (t) {
        return t[y];
      }, Y.create = function (t, e) {
        return new Y(t, e);
      }, Y;
    });
  })(sortableDnd_min);
  var SortableDnd = sortableDnd_min.exports;

  var storeKey = 'virtualSortableState';
  var defaultStore = {
    from: {},
    to: {}
  };
  var Storage = /*#__PURE__*/function () {
    function Storage() {
      _classCallCheck(this, Storage);
    }
    _createClass(Storage, [{
      key: "clear",
      value: function clear() {
        localStorage.removeItem(storeKey);
      }
      /**
       * Obtaining Synchronization Data
       * @returns states: { from, to }
       */
    }, {
      key: "getStore",
      value: function getStore() {
        try {
          var result = JSON.parse(localStorage.getItem(storeKey));
          return result || defaultStore;
        } catch (e) {
          return defaultStore;
        }
      }
      /**
       * @returns states: { from, to }
       */
    }, {
      key: "getValue",
      value: function getValue() {
        return new Promise(function (resolve, reject) {
          try {
            var result = JSON.parse(localStorage.getItem(storeKey));
            resolve(result || defaultStore);
          } catch (e) {
            reject(defaultStore);
          }
        });
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        return new Promise(function (resolve, reject) {
          try {
            var store = JSON.parse(localStorage.getItem(storeKey));
            var result = JSON.stringify(Object.assign(Object.assign({}, store), value));
            localStorage.setItem(storeKey, result);
            resolve(result);
          } catch (e) {
            reject('{}');
          }
        });
      }
    }]);
    return Storage;
  }();
  var Store = new Storage();

  var attributes = ['group', 'handle', 'disabled', 'draggable', 'ghostClass', 'ghostStyle', 'chosenClass', 'animation', 'autoScroll', 'scrollThreshold', 'fallbackOnBody', 'pressDelay', 'pressDelayOnTouchOnly'];
  var dragEl = null;
  var Sortable = /*#__PURE__*/function () {
    function Sortable(context, callback) {
      _classCallCheck(this, Sortable);
      this.context = context;
      this.callback = callback;
      this.initialList = _toConsumableArray(context.list);
      this.dynamicList = _toConsumableArray(context.list);
      this.sortable = null;
      this.rangeChanged = false;
      this._init();
    }
    _createClass(Sortable, [{
      key: "destroy",
      value: function destroy() {
        this.sortable && this.sortable.destroy();
        this.sortable = null;
      }
    }, {
      key: "setValue",
      value: function setValue(key, value) {
        if (key === 'list') {
          this.initialList = _toConsumableArray(value);
          // When the list data changes when dragging, need to execute onDrag function
          if (dragEl) this._onDrag(dragEl, false);
        } else {
          this.context[key] = value;
          if (this.sortable) this.sortable.option(key, value);
        }
      }
    }, {
      key: "_init",
      value: function _init() {
        var _this = this;
        var props = attributes.reduce(function (res, key) {
          var name = key;
          if (key === 'pressDelay') name = 'delay';
          if (key === 'pressDelayOnTouchOnly') name = 'delayOnTouchOnly';
          res[name] = _this.context[key];
          return res;
        }, {});
        this.sortable = new SortableDnd(this.context.container, Object.assign(Object.assign({}, props), {
          list: this.dynamicList,
          onDrag: function onDrag(_ref) {
            var from = _ref.from;
            return _this._onDrag(from.node);
          },
          onAdd: function onAdd(_ref2) {
            var from = _ref2.from,
              to = _ref2.to;
            return _this._onAdd(from, to);
          },
          onRemove: function onRemove(_ref3) {
            var from = _ref3.from,
              to = _ref3.to;
            return _this._onRemove(from, to);
          },
          onChange: function onChange(_ref4) {
            var from = _ref4.from,
              to = _ref4.to;
            return _this._onChange(from, to);
          },
          onDrop: function onDrop(_ref5) {
            var from = _ref5.from,
              to = _ref5.to,
              changed = _ref5.changed;
            return _this._onDrop(from, to, changed);
          }
        }));
      }
    }, {
      key: "_onDrag",
      value: function _onDrag(node) {
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var fromList, fromState, store;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                dragEl = node;
                this.dynamicList = _toConsumableArray(this.initialList);
                fromList = _toConsumableArray(this.initialList);
                fromState = this._getFromTo({
                  node: node
                }, fromList);
                _context.next = 6;
                return Store.setValue({
                  from: Object.assign({
                    list: fromList
                  }, fromState)
                });
              case 6:
                if (!callback) {
                  _context.next = 14;
                  break;
                }
                this.rangeChanged = false;
                _context.next = 10;
                return Store.getValue();
              case 10:
                store = _context.sent;
                this.context.emit('drag', Object.assign({
                  list: fromList
                }, store));
                _context.next = 15;
                break;
              case 14:
                this.rangeChanged = true;
              case 15:
              case "end":
                return _context.stop();
            }
          }, _callee, this);
        }));
      }
    }, {
      key: "_onAdd",
      value: function _onAdd(from, to) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var store, list, index, params;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Store.getValue();
              case 2:
                store = _context2.sent;
                list = _toConsumableArray(this.dynamicList);
                index = this._getIndex(list, to.node.dataset.key);
                params = Object.assign(Object.assign({}, store.from), {
                  index: index
                });
                if (from.node === to.node) {
                  // insert to end of list
                  params.index = this.dynamicList.length;
                  this.dynamicList.push((_a = store.from) === null || _a === void 0 ? void 0 : _a.item);
                } else {
                  this.dynamicList.splice(index, 0, (_b = store.from) === null || _b === void 0 ? void 0 : _b.item);
                }
                delete params.list;
                this.context.emit('add', Object.assign({}, params));
              case 9:
              case "end":
                return _context2.stop();
            }
          }, _callee2, this);
        }));
      }
    }, {
      key: "_onRemove",
      value: function _onRemove(from) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var list, state;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                list = _toConsumableArray(this.dynamicList);
                state = this._getFromTo(from, list);
                this.dynamicList.splice(state.index, 1);
                this.context.emit('remove', Object.assign({}, state));
              case 4:
              case "end":
                return _context3.stop();
            }
          }, _callee3, this);
        }));
      }
    }, {
      key: "_onChange",
      value: function _onChange(from, to) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          var fromList, toList, fromState, toState;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                fromList = _toConsumableArray(this.dynamicList);
                toList = _toConsumableArray(this.dynamicList);
                fromState = this._getFromTo(from, fromList);
                toState = this._getFromTo(to, toList);
                this.dynamicList.splice(fromState.index, 1);
                this.dynamicList.splice(toState.index, 0, fromState.item);
              case 6:
              case "end":
                return _context4.stop();
            }
          }, _callee4, this);
        }));
      }
    }, {
      key: "_onDrop",
      value: function _onDrop(from, to, changed) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          var list, index, item, key, store, params;
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                if (this.rangeChanged || from.sortable !== to.sortable) {
                  dragEl && dragEl.remove();
                }
                list = _toConsumableArray(this.dynamicList);
                index = this._getIndex(list, from.node.dataset.key);
                item = this.initialList[index];
                key = getDataKey(item, this.context.dataKey);
                _context5.next = 7;
                return Store.setValue({
                  to: {
                    list: _toConsumableArray(this.initialList),
                    index: index,
                    item: item,
                    key: key
                  }
                });
              case 7:
                _context5.next = 9;
                return Store.getValue();
              case 9:
                store = _context5.sent;
                params = Object.assign(Object.assign({
                  list: list
                }, store), {
                  changed: changed
                });
                this.context.emit('drop', params);
                this.callback && this.callback(params);
                this.initialList = _toConsumableArray(list);
                this._clear();
              case 15:
              case "end":
                return _context5.stop();
            }
          }, _callee5, this);
        }));
      }
    }, {
      key: "_getFromTo",
      value: function _getFromTo(fromTo, list) {
        var key = fromTo.node.dataset.key;
        var index = this._getIndex(list, key);
        var item = list[index];
        return {
          key: key,
          item: item,
          index: index
        };
      }
    }, {
      key: "_getIndex",
      value: function _getIndex(list, key) {
        var _this2 = this;
        return list.findIndex(function (item) {
          return getDataKey(item, _this2.context.dataKey) == key;
        });
      }
    }, {
      key: "_clear",
      value: function _clear() {
        dragEl = null;
        Store.clear();
        this.rangeChanged = false;
      }
    }]);
    return Sortable;
  }();

  var CACLTYPE = {
    INIT: 'INIT',
    FIXED: 'FIXED',
    DYNAMIC: 'DYNAMIC'
  };
  var DIRECTION = {
    FRONT: 'FRONT',
    BEHIND: 'BEHIND'
  };
  var LEADING_BUFFER = 2;
  var Virtual = /*#__PURE__*/function () {
    function Virtual(options, callback) {
      _classCallCheck(this, Virtual);
      this.options = Object.assign({}, options);
      this.callback = callback;
      this.sizes = new Map();
      this.calcIndex = 0;
      this.calcType = CACLTYPE.INIT;
      this.calcSize = Object.create(null);
      this.direction = '';
      this.offset = 0;
      this.range = Object.create(null);
      if (options) this.checkIfUpdate(0, options.keeps - 1);
    }
    _createClass(Virtual, [{
      key: "updateUniqueKeys",
      value: function updateUniqueKeys(value) {
        this.options.uniqueKeys = value;
      }
    }, {
      key: "updateSizes",
      value: function updateSizes(uniqueKeys) {
        var _this = this;
        this.sizes.forEach(function (v, k) {
          if (!uniqueKeys.includes(k)) _this.sizes["delete"](k);
        });
      }
    }, {
      key: "updateRange",
      value: function updateRange() {
        var _this2 = this;
        var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        if (n > 10) return;
        // check if need to update until loaded enough list item
        var start = this.range.start;
        if (this.isFront()) {
          start -= LEADING_BUFFER;
        } else if (this.isBehind()) {
          start += LEADING_BUFFER;
        }
        start = Math.max(start, 0);
        var length = Math.min(this.options.keeps, this.options.uniqueKeys.length);
        if (this.sizes.size >= length - LEADING_BUFFER) {
          this.handleUpdate(start, this.getEndByStart(start));
        } else {
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(function () {
              return _this2.updateRange(n++);
            });
          } else {
            setTimeout(function () {
              return _this2.updateRange(n++);
            }, 3);
          }
        }
      }
    }, {
      key: "handleScroll",
      value: function handleScroll(offset) {
        this.direction = offset < this.offset ? DIRECTION.FRONT : DIRECTION.BEHIND;
        this.offset = offset;
        var scrolls = this.getScrollItems(offset);
        if (this.isFront()) {
          this.handleScrollFront(scrolls);
        } else if (this.isBehind()) {
          this.handleScrollBehind(scrolls);
        }
      }
    }, {
      key: "isFront",
      value: function isFront() {
        return this.direction === DIRECTION.FRONT;
      }
    }, {
      key: "isBehind",
      value: function isBehind() {
        return this.direction === DIRECTION.BEHIND;
      }
    }, {
      key: "isFixed",
      value: function isFixed() {
        return this.calcType === CACLTYPE.FIXED;
      }
    }, {
      key: "getScrollItems",
      value: function getScrollItems(offset) {
        var _this$calcSize = this.calcSize,
          fixed = _this$calcSize.fixed,
          header = _this$calcSize.header;
        if (header) offset -= header;
        if (offset <= 0) return 0;
        if (this.isFixed()) return Math.floor(offset / fixed);
        var low = 0,
          high = this.options.uniqueKeys.length;
        var middle = 0,
          middleOffset = 0;
        while (low <= high) {
          middle = low + Math.floor((high - low) / 2);
          middleOffset = this.getOffsetByIndex(middle);
          if (middleOffset === offset) return middle;else if (middleOffset < offset) low = middle + 1;else if (middleOffset > offset) high = middle - 1;
        }
        return low > 0 ? --low : 0;
      }
    }, {
      key: "handleScrollFront",
      value: function handleScrollFront(scrolls) {
        if (scrolls > this.range.start) return;
        var start = Math.max(scrolls - Math.round(this.options.keeps / 3), 0);
        this.checkIfUpdate(start, this.getEndByStart(start));
      }
    }, {
      key: "handleScrollBehind",
      value: function handleScrollBehind(scrolls) {
        if (scrolls < this.range.start + Math.round(this.options.keeps / 3)) return;
        this.checkIfUpdate(scrolls, this.getEndByStart(scrolls));
      }
    }, {
      key: "checkIfUpdate",
      value: function checkIfUpdate(start, end) {
        var _this$options = this.options,
          uniqueKeys = _this$options.uniqueKeys,
          keeps = _this$options.keeps;
        if (uniqueKeys.length && uniqueKeys.length <= keeps) {
          start = 0;
          end = uniqueKeys.length - 1;
        } else if (end - start < keeps - 1) {
          start = end - keeps + 1;
        }
        if (this.range.start !== start) this.handleUpdate(start, end);
      }
    }, {
      key: "handleUpdate",
      value: function handleUpdate(start, end) {
        this.range.start = start;
        this.range.end = end;
        this.range.front = this.getFrontOffset();
        this.range.behind = this.getBehindOffset();
        this.callback(Object.assign({}, this.range));
      }
    }, {
      key: "getFrontOffset",
      value: function getFrontOffset() {
        if (this.isFixed()) {
          return this.calcSize.fixed * this.range.start;
        } else {
          return this.getOffsetByIndex(this.range.start);
        }
      }
    }, {
      key: "getBehindOffset",
      value: function getBehindOffset() {
        var last = this.getLastIndex();
        if (this.isFixed()) {
          return (last - this.range.end) * this.calcSize.fixed;
        }
        if (this.calcIndex === last) {
          return this.getOffsetByIndex(last) - this.getOffsetByIndex(this.range.end);
        }
        return (last - this.range.end) * this.getItemSize();
      }
    }, {
      key: "getOffsetByIndex",
      value: function getOffsetByIndex(index) {
        if (!index) return 0;
        var offset = 0;
        for (var i = 0; i < index; i++) {
          var size = this.sizes.get(this.options.uniqueKeys[i]);
          offset = offset + (typeof size === 'number' ? size : this.getItemSize());
        }
        this.calcIndex = Math.max(this.calcIndex, index - 1);
        this.calcIndex = Math.min(this.calcIndex, this.getLastIndex());
        return offset;
      }
    }, {
      key: "getEndByStart",
      value: function getEndByStart(start) {
        return Math.min(start + this.options.keeps - 1, this.getLastIndex());
      }
    }, {
      key: "getLastIndex",
      value: function getLastIndex() {
        var _this$options2 = this.options,
          uniqueKeys = _this$options2.uniqueKeys,
          keeps = _this$options2.keeps;
        return uniqueKeys.length > 0 ? uniqueKeys.length - 1 : keeps - 1;
      }
    }, {
      key: "getItemSize",
      value: function getItemSize() {
        return this.isFixed() ? this.calcSize.fixed : this.calcSize.average || this.options.size;
      }
    }, {
      key: "handleItemSizeChange",
      value: function handleItemSizeChange(key, size) {
        this.sizes.set(key, size);
        if (this.calcType === CACLTYPE.INIT) {
          this.calcType = CACLTYPE.FIXED;
          this.calcSize.fixed = size;
        } else if (this.isFixed() && this.calcSize.fixed !== size) {
          this.calcType = CACLTYPE.DYNAMIC;
          this.calcSize.fixed = 0;
        }
        if (this.calcType !== CACLTYPE.FIXED) {
          this.calcSize.total = _toConsumableArray(this.sizes.values()).reduce(function (t, i) {
            return t + i;
          }, 0);
          this.calcSize.average = Math.round(this.calcSize.total / this.sizes.size);
        }
      }
    }, {
      key: "handleSlotSizeChange",
      value: function handleSlotSizeChange(key, size) {
        this.calcSize[key] = size;
      }
    }]);
    return Virtual;
  }();

  var VirtualProps = {
    dataSource: {},
    dataKey: {
      type: String,
      "default": '',
      required: true
    },
    draggable: {
      type: [Function, String]
    },
    handle: {
      type: [Function, String]
    },
    group: {
      type: [Object, String]
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
    delay: {
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
    pressDelay: {
      type: Number,
      "default": 0
    },
    pressDelayOnTouchOnly: {
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
    isHorizontal: {
      type: Boolean
    }
  };

  var useObserver = function useObserver(props, aRef, emit) {
    var observer = null;
    var sizeKey = vue.computed(function () {
      return props.isHorizontal ? 'offsetWidth' : 'offsetHeight';
    });
    var getCurrentSize = function getCurrentSize() {
      return aRef.value ? aRef.value[sizeKey.value] : 0;
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

  var getList = function getList(source) {
    return vue.isRef(source) ? source.value : source;
  };
  var VirtualDragList = vue.defineComponent({
    props: VirtualProps,
    emits: ['update:dataSource', 'top', 'bottom', 'drag', 'drop', 'add', 'remove'],
    setup: function setup(props, _ref) {
      var emit = _ref.emit,
        slots = _ref.slots,
        expose = _ref.expose;
      var range = vue.ref(Object.create(null));
      var rootRef = vue.ref(null);
      var groupRef = vue.ref(null);
      var lastRef = vue.ref(null);
      var viewlist = vue.ref([]);
      var uniqueKeys = vue.ref([]);
      var lastItem = null;
      var isHorizontal = props.direction !== 'vertical';
      var scrollSizeKey = isHorizontal ? 'scrollWidth' : 'scrollHeight';
      var scrollDirectionKey = isHorizontal ? 'scrollLeft' : 'scrollTop';
      var offsetSizeKey = isHorizontal ? 'offsetLeft' : 'offsetTop';
      var clientSizeKey = isHorizontal ? 'clientWidth' : 'clientHeight';
      var sortable;
      var virtual;
      /**
       * reset component
       */
      function reset() {
        scrollToTop();
        init(props.dataSource);
      }
      /**
       * git item size by data-key
       */
      function getSize(key) {
        return virtual.sizes.get(key);
      }
      /**
       * Get the current scroll height
       */
      function getOffset() {
        return rootRef.value ? Math.ceil(rootRef.value[scrollDirectionKey]) : 0;
      }
      /**
       * Scroll to top of list
       */
      function scrollToTop() {
        if (rootRef.value) rootRef.value[scrollDirectionKey] = 0;
      }
      /**
       * Scroll to bottom of list
       */
      function scrollToBottom() {
        if (lastRef.value) {
          var bottom = lastRef.value[offsetSizeKey];
          scrollToOffset(bottom);
          // The first scroll height may change, if the bottom is not reached, execute the scroll method again
          setTimeout(function () {
            if (!rootRef.value) return;
            var offset = getOffset();
            var clientSize = Math.ceil(rootRef.value[clientSizeKey]);
            var scrollSize = Math.ceil(rootRef.value[scrollSizeKey]);
            if (offset + clientSize + 1 < scrollSize) scrollToBottom();
          }, 5);
        }
      }
      /**
       * Scroll to the specified index position
       */
      function scrollToIndex(index) {
        if (index >= viewlist.value.length - 1) {
          scrollToBottom();
        } else {
          var indexOffset = virtual.getOffsetByIndex(index);
          if (indexOffset === undefined) return;
          scrollToOffset(indexOffset);
          setTimeout(function () {
            var offset = getOffset();
            var indexOffset = virtual.getOffsetByIndex(index);
            if (offset !== indexOffset) scrollToIndex(index);
          }, 5);
        }
      }
      /**
       * Scroll to the specified offset
       */
      function scrollToOffset(offset) {
        if (rootRef.value) rootRef.value[scrollDirectionKey] = offset;
      }
      var init = function init(source) {
        var list = getList(source);
        if (!list) return;
        viewlist.value = _toConsumableArray(list);
        updateUniqueKeys();
        console.log(virtual);
        virtual.updateUniqueKeys(uniqueKeys.value);
        virtual.updateSizes(uniqueKeys.value);
        vue.nextTick(function () {
          return virtual.updateRange();
        });
        if (!sortable) {
          vue.nextTick(function () {
            return initSortable();
          });
        } else {
          sortable.setValue('list', _toConsumableArray(list));
        }
        // if auto scroll to the last offset
        if (lastItem && props.keepOffset) {
          var index = getItemIndex(lastItem);
          scrollToIndex(index);
          lastItem = null;
        }
      };
      var updateUniqueKeys = function updateUniqueKeys() {
        uniqueKeys.value = viewlist.value.map(function (item) {
          return getDataKey(item, props.dataKey);
        });
      };
      var initVirtual = function initVirtual() {
        virtual = new Virtual({
          size: props.size,
          keeps: props.keeps,
          uniqueKeys: uniqueKeys.value
        }, function (newRange) {
          range.value = newRange;
          if (!sortable) return;
          var state = Store.getStore();
          var _range$value = range.value,
            start = _range$value.start,
            end = _range$value.end;
          var index = state.from.index;
          if (index > -1 && !(index >= start && index <= end)) {
            sortable.rangeChanged = true;
          }
        });
      };
      var initSortable = function initSortable() {
        sortable = new Sortable(Object.assign({
          container: groupRef.value,
          list: viewlist.value,
          emit: emit
        }, props), function (_ref2) {
          var list = _ref2.list,
            changed = _ref2.changed;
          if (!changed) return;
          // recalculate the range once when scrolling down
          if (sortable.rangeChanged && virtual.direction && range.value.start > 0) {
            var index = list.indexOf(viewlist.value[range.value.start]);
            if (index > -1) {
              range.value.start = index;
              range.value.end = index + props.keeps - 1;
            }
          }
          viewlist.value = _toConsumableArray(list);
          updateUniqueKeys();
          virtual.updateUniqueKeys(uniqueKeys.value);
          emit('update:dataSource', _toConsumableArray(list));
        });
      };
      var handleScroll = debounce(function () {
        if (!rootRef.value) return;
        var offset = getOffset();
        var clientSize = Math.ceil(rootRef.value[clientSizeKey]);
        var scrollSize = Math.ceil(rootRef.value[scrollSizeKey]);
        if (!virtual || !scrollSize || offset < 0 || offset + clientSize > scrollSize + 1) {
          return;
        }
        virtual.handleScroll(offset);
        if (virtual.isFront()) {
          if (!!viewlist.value.length && offset <= 0) handleToTop();
        } else if (virtual.isBehind()) {
          if (clientSize + offset >= scrollSize) handleToBottom();
        }
      }, props.delay);
      var handleToTop = throttle(function () {
        emit('top');
        lastItem = viewlist.value[0];
      });
      var handleToBottom = throttle(function () {
        emit('bottom');
      });
      var onItemResized = function onItemResized(size, key) {
        virtual.handleItemSizeChange(key, size);
      };
      var onSlotsResized = function onSlotsResized(size, key) {
        virtual.handleSlotSizeChange(key, size);
      };
      var getItemIndex = function getItemIndex(item) {
        return viewlist.value.findIndex(function (el) {
          return getDataKey(item, props.dataKey) == getDataKey(el, props.dataKey);
        });
      };
      var getItemStyle = function getItemStyle(dataKey) {
        if (!sortable) return {};
        var state = Store.getStore();
        var fromKey = state.from.key;
        if (sortable.rangeChanged && dataKey == fromKey) {
          return {
            display: 'none'
          };
        }
        return {};
      };
      vue.watch(function () {
        return props.dataSource;
      }, function (newVal) {
        init(newVal);
      }, {
        deep: true
      });
      vue.watch(function () {
        return props.disabled;
      }, function (newVal) {
        sortable && sortable.setValue('disabled', newVal);
      }, {
        immediate: true
      });
      // init range
      vue.onBeforeMount(function () {
        initVirtual();
        init(props.dataSource);
      });
      // set back offset when awake from keep-alive
      vue.onActivated(function () {
        virtual && scrollToOffset(virtual.offset);
      });
      vue.onUnmounted(function () {
        sortable && sortable.destroy();
      });
      var renderSlots = function renderSlots(key, TagName) {
        var slot = slots[key];
        return slot ? vue.h(Slots, {
          key: key,
          tag: TagName,
          dataKey: key,
          event: 'resize',
          onResize: onSlotsResized
        }, {
          "default": function _default() {
            return slot === null || slot === void 0 ? void 0 : slot();
          }
        }) : null;
      };
      var renderItems = function renderItems() {
        var _range$value2 = range.value,
          start = _range$value2.start,
          end = _range$value2.end;
        return viewlist.value.slice(start, end + 1).map(function (item) {
          var index = getItemIndex(item);
          var dataKey = getDataKey(item, props.dataKey);
          var itemStyle = Object.assign(Object.assign({}, props.itemStyle), getItemStyle(dataKey));
          return slots.item ? vue.h(Items, {
            key: dataKey,
            tag: props.itemTag,
            "class": props.itemClass,
            style: itemStyle,
            event: 'resize',
            dataKey: dataKey,
            isHorizontal: isHorizontal,
            onResize: onItemResized
          }, {
            "default": function _default() {
              var _a;
              return (_a = slots.item) === null || _a === void 0 ? void 0 : _a.call(slots, {
                record: item,
                index: index,
                dataKey: dataKey
              });
            }
          }) : null;
        });
      };
      expose({
        reset: reset,
        getSize: getSize,
        getOffset: getOffset,
        scrollToTop: scrollToTop,
        scrollToBottom: scrollToBottom,
        scrollToIndex: scrollToIndex,
        scrollToOffset: scrollToOffset
      });
      return function () {
        var RootTag = props.rootTag,
          WrapTag = props.wrapTag;
        var _range$value3 = range.value,
          front = _range$value3.front,
          behind = _range$value3.behind;
        var wrapStyle = Object.assign(Object.assign({}, props.wrapStyle), {
          padding: isHorizontal ? "0px ".concat(behind, "px 0px ").concat(front, "px") : "".concat(front, "px 0px ").concat(behind, "px")
        });
        return vue.h(RootTag, {
          ref: rootRef,
          style: {
            overflow: isHorizontal ? 'auto hidden' : 'hidden auto'
          },
          onScroll: handleScroll
        }, {
          "default": function _default() {
            return [renderSlots('header', props.headerTag), vue.h(WrapTag, {
              ref: groupRef,
              role: 'group',
              "class": props.wrapClass,
              style: wrapStyle
            }, {
              "default": function _default() {
                return renderItems();
              }
            }), renderSlots('footer', props.footerTag),
            // last el
            vue.h('div', {
              ref: lastRef,
              style: {
                width: isHorizontal ? '0px' : '100%',
                height: isHorizontal ? '100%' : '0px'
              }
            })];
          }
        });
      };
    }
  });

  return VirtualDragList;

}));
