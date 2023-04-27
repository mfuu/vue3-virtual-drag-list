/*!
 * vue-virtual-draglist v3.1.0
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
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var sortable = {exports: {}};

  /*!
   * sortable-dnd v0.4.11
   * open source under the MIT license
   * https://github.com/mfuu/sortable-dnd#readme
   */
  (function (module, exports) {
    (function (global, factory) {
      module.exports = factory() ;
    })(commonjsGlobal, function () {

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
      function _typeof(obj) {
        "@babel/helpers - typeof";

        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
          return typeof obj;
        } : function (obj) {
          return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, _typeof(obj);
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
      var captureMode = {
        capture: false,
        passive: false
      };
      var R_SPACE = /\s+/g;
      var events = {
        start: ['pointerdown', 'touchstart', 'mousedown'],
        move: ['pointermove', 'touchmove', 'mousemove'],
        end: ['pointerup', 'pointercancel', 'touchend', 'touchcancel', 'mouseup']
      };
      function userAgent(pattern) {
        if (typeof window !== 'undefined' && window.navigator) {
          return !! /*@__PURE__*/navigator.userAgent.match(pattern);
        }
      }
      var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
      var Edge = userAgent(/Edge/i);
      var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);

      /**
       * detect passive event support
       */
      var supportPassive = function () {
        // https://github.com/Modernizr/Modernizr/issues/1894
        var supportPassive = false;
        document.addEventListener('checkIfSupportPassive', null, {
          get passive() {
            supportPassive = true;
            return true;
          }
        });
        return supportPassive;
      }();
      var vendorPrefix = function () {
        if (typeof window === 'undefined' || typeof document === 'undefined') {
          // Server environment
          return '';
        }

        // window.getComputedStyle() returns null inside an iframe with display: none
        // in this case return an array with a fake mozilla style in it.
        var styles = window.getComputedStyle(document.documentElement, '') || ['-moz-hidden-iframe'];
        var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];
        switch (pre) {
          case 'ms':
            return 'ms';
          default:
            return pre && pre.length ? pre[0].toUpperCase() + pre.substr(1) : '';
        }
      }();

      /**
       * check if is HTMLElement
       */
      function isHTMLElement(node) {
        if (!node) return false;
        var ctx = document.createElement('div');
        try {
          ctx.appendChild(node.cloneNode(true));
          return node.nodeType == 1 ? true : false;
        } catch (e) {
          return node == window || node == document;
        }
      }
      function setTransition(el, transition) {
        el.style["".concat(vendorPrefix, "Transition")] = transition ? transition === 'none' ? 'none' : "".concat(transition) : '';
      }
      function setTransitionDuration(el, duration) {
        el.style["".concat(vendorPrefix, "TransitionDuration")] = duration == null ? '' : "".concat(duration, "ms");
      }
      function setTransform(el, transform) {
        el.style["".concat(vendorPrefix, "Transform")] = transform ? "".concat(transform) : '';
      }

      /**
       * add specified event listener
       * @param {HTMLElement} el
       * @param {String} event
       * @param {Function} fn
       */
      function on(el, event, fn) {
        if (window.addEventListener) {
          el.addEventListener(event, fn, supportPassive || !IE11OrLess ? captureMode : false);
        } else if (window.attachEvent) {
          el.attachEvent('on' + event, fn);
        }
      }

      /**
       * remove specified event listener
       * @param {HTMLElement} el
       * @param {String} event
       * @param {Function} fn
       */
      function off(el, event, fn) {
        if (window.removeEventListener) {
          el.removeEventListener(event, fn, supportPassive || !IE11OrLess ? captureMode : false);
        } else if (window.detachEvent) {
          el.detachEvent('on' + event, fn);
        }
      }

      /**
       * get touch event and current event
       * @param {Event|TouchEvent} evt
       */
      function getEvent(evt) {
        var event = evt;
        var touch = evt.touches && evt.touches[0] || evt.changedTouches && evt.changedTouches[0] || evt.pointerType && evt.pointerType === 'touch' && evt;
        var target = touch ? document.elementFromPoint(touch.clientX, touch.clientY) : evt.target;
        if (touch) {
          event.clientX = touch.clientX;
          event.clientY = touch.clientY;
          event.pageX = touch.pageX;
          event.pageY = touch.pageY;
          event.screenX = touch.screenX;
          event.screenY = touch.screenY;
        }
        return {
          touch: touch,
          event: event,
          target: target
        };
      }

      /**
       * get element's offetTop
       * @param {HTMLElement} el
       */
      function getOffset(el) {
        var offset = {
          top: 0,
          left: 0,
          height: el.offsetHeight,
          width: el.offsetWidth
        };
        var winScroller = getWindowScrollingElement();
        do {
          offset.top += el.offsetTop;
          offset.left += el.offsetLeft;
        } while (el !== winScroller && (el = el.offsetParent));
        return offset;
      }

      /**
       * get scroll element
       * @param {HTMLElement} el
       * @param {Boolean} includeSelf whether to include the passed element
       * @returns {HTMLElement} scroll element
       */
      function getParentAutoScrollElement(el, includeSelf) {
        // skip to window
        if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
        var elem = el;
        var gotSelf = false;
        do {
          // we don't need to get elem css if it isn't even overflowing in the first place (performance)
          if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
            var elemCSS = css(elem);
            if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')) {
              if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
              if (gotSelf || includeSelf) return elem;
              gotSelf = true;
            }
          }
        } while (elem = elem.parentNode);
        return getWindowScrollingElement();
      }
      function getWindowScrollingElement() {
        var scrollingElement = document.scrollingElement;
        if (scrollingElement) {
          return scrollingElement.contains(document.body) ? document : scrollingElement;
        } else {
          return document;
        }
      }

      /**
       * Returns the "bounding client rect" of given element
       * @param  {HTMLElement} el                       The element whose boundingClientRect is wanted
       * @param  {Object} check
       * @example - {
       * -   parent: true | false, 'check if parentNode.height < el.height'
       * -   block: true | false, 'Whether the rect should be relative to the containing block of (including) the container'
       * -   relative: true | false, 'Whether the rect should be relative to the relative parent of (including) the contaienr'
       * - }
       * @param  {HTMLElement} container              The parent the element will be placed in
       * @return {Object}                               The boundingClientRect of el, with specified adjustments
       */
      function getRect(el) {
        var check = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var container = arguments.length > 2 ? arguments[2] : undefined;
        if (!el.getBoundingClientRect && el !== window) return;
        var elRect, top, left, bottom, right, height, width;
        if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
          elRect = el.getBoundingClientRect();
          top = elRect.top;
          left = elRect.left;
          bottom = elRect.bottom;
          right = elRect.right;
          height = elRect.height;
          width = elRect.width;
          if (check.parent && el.parentNode !== el.ownerDocument.body) {
            var parentRect,
              parentNode = el.parentNode;
            while (parentNode && parentNode.getBoundingClientRect && parentNode !== el.ownerDocument.body) {
              parentRect = parentNode.getBoundingClientRect();
              if (parentRect.height < height) {
                top = parentRect.top;
                left = parentRect.left;
                bottom = parentRect.bottom;
                right = parentRect.right;
                height = parentRect.height;
                width = parentRect.width;
                return {
                  top: top,
                  left: left,
                  bottom: bottom,
                  right: right,
                  width: width,
                  height: height
                };
              }
              parentNode = parentNode.parentNode;
            }
          }
        } else {
          top = 0;
          left = 0;
          bottom = window.innerHeight;
          right = window.innerWidth;
          height = window.innerHeight;
          width = window.innerWidth;
        }
        if ((check.block || check.relative) && el !== window) {
          // Adjust for translate()
          container = container || el.parentNode;

          // Not needed on <= IE11
          if (!IE11OrLess) {
            do {
              if (container && container.getBoundingClientRect && (css(container, 'transform') !== 'none' || check.relative && css(container, 'position') !== 'static')) {
                var containerRect = container.getBoundingClientRect();

                // Set relative to edges of padding box of container
                top -= containerRect.top + parseInt(css(container, 'border-top-width'));
                left -= containerRect.left + parseInt(css(container, 'border-left-width'));
                bottom = top + elRect.height;
                right = left + elRect.width;
                break;
              }
              /* jshint boss:true */
            } while (container = container.parentNode);
          }
        }
        return {
          top: top,
          left: left,
          bottom: bottom,
          right: right,
          width: width,
          height: height
        };
      }
      function closest(el, selector, ctx, includeCTX) {
        if (el) {
          ctx = ctx || document;
          do {
            if (selector == null) {
              var children = Array.prototype.slice.call(ctx.children);

              // If it can be found directly in the child element, return
              var index = children.indexOf(el);
              if (index > -1) return children[index];

              // When the dom cannot be found directly in children, need to look down
              for (var i = 0; i < children.length; i++) {
                if (containes(el, children[i])) return children[i];
              }
            } else if (selector[0] === '>' ? el.parentNode === ctx && matches(el, selector) : matches(el, selector) || includeCTX && el === ctx) {
              return el;
            }
          } while (el = el.parentNode);
        }
        return null;
      }

      /**
       * Check if child element is contained in parent element
       * @param {HTMLElement} el
       * @param {HTMLElement} root
       */
      function containes(el, root) {
        if (root.compareDocumentPosition) {
          return root === el || !!(root.compareDocumentPosition(el) & 16);
        }
        if (root.contains && el.nodeType === 1) {
          return root.contains(el) && root !== el;
        }
        while (el = el.parentNode) if (el === root) return true;
        return false;
      }

      /**
       * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
       * @param  {HTMLElement} el       Parent element
       * @param  {selector} selector    Any other elements that should be ignored
       * @return {HTMLElement}          The last child, ignoring ghostEl
       */
      function lastChild(el, helper, selector) {
        var last = el.lastElementChild;
        while (last && (last === helper || css(last, 'display') === 'none' || selector && !matches(last, selector))) {
          last = last.previousElementSibling;
        }
        return last || null;
      }

      /**
       * add or remove element's class
       * @param {HTMLElement} el element
       * @param {String} name class name
       * @param {Boolean} state true: add, false: remove
       */
      function toggleClass(el, name, state) {
        if (el && name) {
          if (el.classList) {
            el.classList[state ? 'add' : 'remove'](name);
          } else {
            var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
            el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
          }
        }
      }

      /**
       * Check if a DOM element matches a given selector
       * @param {HTMLElement} el
       * @param {String} selector
       * @returns
       */
      function matches(el, selector) {
        if (!selector) return;
        selector[0] === '>' && (selector = selector.substring(1));
        if (el) {
          try {
            if (el.matches) {
              return el.matches(selector);
            } else if (el.msMatchesSelector) {
              return el.msMatchesSelector(selector);
            } else if (el.webkitMatchesSelector) {
              return el.webkitMatchesSelector(selector);
            }
          } catch (error) {
            return false;
          }
        }
        return false;
      }

      /**
       * Check whether the front and rear positions are consistent
       */
      function offsetChanged(o1, o2) {
        return o1.top !== o2.top || o1.left !== o2.left;
      }
      function sortByOffset(o1, o2) {
        return o1.top == o2.top ? o1.left - o2.left : o1.top - o2.top;
      }
      function css(el, prop, val) {
        var style = el && el.style;
        if (style) {
          if (val === void 0) {
            if (document.defaultView && document.defaultView.getComputedStyle) {
              val = document.defaultView.getComputedStyle(el, '');
            } else if (el.currentStyle) {
              val = el.currentStyle;
            }
            return prop === void 0 ? val : val[prop];
          } else {
            if (!(prop in style) && prop.indexOf('webkit') === -1) {
              prop = '-webkit-' + prop;
            }
            style[prop] = val + (typeof val === 'string' ? '' : 'px');
          }
        }
      }
      function _nextTick(fn) {
        return setTimeout(fn, 0);
      }
      function randomCode() {
        return Number(Math.random().toString().slice(-3) + Date.now()).toString(32);
      }
      var expando = 'Sortable' + Date.now();
      var multiFromTo = {
        sortable: null,
        nodes: []
      };
      var multiFrom = _objectSpread2({}, multiFromTo),
        multiTo = _objectSpread2({}, multiFromTo),
        selectedElements = {};
      var getMultiDiffer = function getMultiDiffer() {
        return {
          from: _objectSpread2({}, multiFrom),
          to: _objectSpread2({}, multiTo)
        };
      };
      function Multiple(options) {
        this.options = options || {};
        this.groupName = options.group.name;
      }
      Multiple.prototype = {
        /**
         * Indicates whether the multi-drag mode is used
         * @returns {boolean}
         */
        allowDrag: function allowDrag(dragEl) {
          return this.options.multiple && selectedElements[this.groupName] && selectedElements[this.groupName].length && selectedElements[this.groupName].indexOf(dragEl) > -1;
        },
        getHelper: function getHelper() {
          var container = document.createElement('div');
          selectedElements[this.groupName].forEach(function (node, index) {
            var clone = node.cloneNode(true);
            var opacity = index === 0 ? 1 : 0.5;
            clone.style = "\n        opacity: ".concat(opacity, ";\n        position: absolute;\n        z-index: ").concat(index, ";\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n      ");
            container.appendChild(clone);
          });
          return container;
        },
        /**
         * Collecting Multi-Drag Elements
         */
        select: function select(event, dragEl, from) {
          if (!dragEl) return;
          if (!selectedElements[this.groupName]) {
            selectedElements[this.groupName] = [];
          }
          var index = selectedElements[this.groupName].indexOf(dragEl);
          toggleClass(dragEl, this.options.selectedClass, index < 0);
          var params = _objectSpread2(_objectSpread2({}, from), {}, {
            event: event
          });
          if (index < 0) {
            selectedElements[this.groupName].push(dragEl);
            from.sortable._dispatchEvent('onSelect', params);
          } else {
            selectedElements[this.groupName].splice(index, 1);
            from.sortable._dispatchEvent('onDeselect', params);
          }
          selectedElements[this.groupName].sort(function (a, b) {
            return sortByOffset(getOffset(a), getOffset(b));
          });
        },
        onDrag: function onDrag(sortable) {
          multiFrom.sortable = sortable;
          multiFrom.nodes = selectedElements[this.groupName].map(function (node) {
            return {
              node: node,
              rect: getRect(node),
              offset: getOffset(node)
            };
          });
          multiTo.sortable = sortable;
        },
        onTrulyStarted: function onTrulyStarted(dragEl, sortable) {
          sortable.animator.collect(dragEl, null, dragEl.parentNode);
          selectedElements[this.groupName].forEach(function (node) {
            if (node == dragEl) return;
            node.parentNode.removeChild(node);
          });
          sortable.animator.animate();
        },
        onChange: function onChange(dragEl, sortable) {
          var rect = getRect(dragEl);
          var offset = getOffset(dragEl);
          multiTo.sortable = sortable;
          multiTo.nodes = selectedElements[this.groupName].map(function (node) {
            return {
              node: node,
              rect: rect,
              offset: offset
            };
          });
        },
        onDrop: function onDrop(event, dragEl, downEvent, _emits) {
          var _this = this;
          multiTo.sortable.animator.collect(dragEl, null, dragEl.parentNode);
          var index = selectedElements[this.groupName].indexOf(dragEl);
          selectedElements[this.groupName].forEach(function (node, i) {
            if (i < index) {
              dragEl.parentNode.insertBefore(node, dragEl);
            } else {
              var dropEl = i > 0 ? selectedElements[_this.groupName][i - 1] : dragEl;
              dragEl.parentNode.insertBefore(node, dropEl.nextSibling);
            }
          });
          multiFrom.sortable = downEvent.sortable;
          multiTo.nodes = selectedElements[this.groupName].map(function (node) {
            return {
              node: node,
              rect: getRect(node),
              offset: getOffset(node)
            };
          });
          var changed = this._offsetChanged(multiFrom.nodes, multiTo.nodes);
          var params = _objectSpread2(_objectSpread2({}, _emits()), {}, {
            changed: changed,
            event: event
          });
          if (multiTo.sortable.el != multiFrom.sortable.el) {
            multiFrom.sortable._dispatchEvent('onDrop', params);
          }
          multiTo.sortable._dispatchEvent('onDrop', params);
          multiTo.sortable.animator.animate();
        },
        _offsetChanged: function _offsetChanged(ns1, ns2) {
          return !!ns1.find(function (node) {
            var n = ns2.find(function (n) {
              return n.node === node.node;
            });
            return offsetChanged(n.offset, node.offset);
          });
        }
      };
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
          return setTimeout(callback, 17);
        };
      }
      if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
          clearTimeout(id);
        };
      }
      function AutoScroll() {
        this.autoScrollAnimationFrame = null;
        this.speed = {
          x: 10,
          y: 10
        };
      }
      AutoScroll.prototype = {
        clear: function clear() {
          if (this.autoScrollAnimationFrame == null) {
            return;
          }
          cancelAnimationFrame(this.autoScrollAnimationFrame);
          this.autoScrollAnimationFrame = null;
        },
        update: function update(scrollEl, scrollThreshold, downEvent, moveEvent) {
          var _this = this;
          cancelAnimationFrame(this.autoScrollAnimationFrame);
          this.autoScrollAnimationFrame = requestAnimationFrame(function () {
            if (downEvent && moveEvent) {
              _this.autoScroll(scrollEl, scrollThreshold, moveEvent);
            }
            _this.update(scrollEl, scrollThreshold, downEvent, moveEvent);
          });
        },
        autoScroll: function autoScroll(scrollEl, scrollThreshold, evt) {
          if (!scrollEl) return;
          var clientX = evt.clientX,
            clientY = evt.clientY;
          if (clientX === void 0 || clientY === void 0) return;
          var rect = getRect(scrollEl);
          if (!rect) return;
          var scrollTop = scrollEl.scrollTop,
            scrollLeft = scrollEl.scrollLeft,
            scrollHeight = scrollEl.scrollHeight,
            scrollWidth = scrollEl.scrollWidth;
          var top = rect.top,
            right = rect.right,
            bottom = rect.bottom,
            left = rect.left,
            height = rect.height,
            width = rect.width;
          if (clientY < top || clientX > right || clientY > bottom || clientX < left) {
            return;
          }

          // check direction
          var toTop = scrollTop > 0 && clientY >= top && clientY <= top + scrollThreshold;
          var toLeft = scrollLeft > 0 && clientX >= left && clientX <= left + scrollThreshold;
          var toRight = scrollLeft + width < scrollWidth && clientX <= right && clientX >= right - scrollThreshold;
          var toBottom = scrollTop + height < scrollHeight && clientY <= bottom && clientY >= bottom - scrollThreshold;
          var scrollx = 0,
            scrolly = 0;
          if (toLeft) {
            scrollx = Math.floor(Math.max(-1, (clientX - left) / scrollThreshold - 1) * this.speed.x);
          } else if (toRight) {
            scrollx = Math.ceil(Math.min(1, (clientX - right) / scrollThreshold + 1) * this.speed.x);
          } else {
            scrollx = 0;
          }
          if (toTop) {
            scrolly = Math.floor(Math.max(-1, (clientY - top) / scrollThreshold - 1) * this.speed.y);
          } else if (toBottom) {
            scrolly = Math.ceil(Math.min(1, (clientY - bottom) / scrollThreshold + 1) * this.speed.y);
          } else {
            scrolly = 0;
          }
          if (scrolly) {
            scrollEl.scrollTop += scrolly;
          }
          if (scrollx) {
            scrollEl.scrollLeft += scrollx;
          }
        }
      };
      function Animation(options) {
        this.options = options;
        this.animations = [];
      }
      Animation.prototype = {
        collect: function collect(dragEl, dropEl, container, except) {
          var _this = this;
          if (!container) return;
          var children = Array.prototype.slice.call(container.children);
          var _this$_getRange = this._getRange(children, dragEl, dropEl, except),
            start = _this$_getRange.start,
            end = _this$_getRange.end;
          this.animations.length = 0;
          children.slice(start, end + 1).forEach(function (node) {
            if (node === except || node === Sortable.helper) return;
            _this.animations.push({
              node: node,
              rect: getRect(node)
            });
          });
        },
        animate: function animate() {
          var _this2 = this;
          this.animations.forEach(function (state) {
            var node = state.node,
              rect = state.rect;
            _this2._excute(node, rect);
          });
        },
        _excute: function _excute(el, _ref) {
          var left = _ref.left,
            top = _ref.top;
          var rect = getRect(el);
          var ot = top - rect.top;
          var ol = left - rect.left;
          setTransitionDuration(el);
          setTransform(el, "translate3d(".concat(ol, "px, ").concat(ot, "px, 0)"));

          // repaint
          el.offsetWidth;
          var duration = this.options.animation;
          setTransitionDuration(el, duration);
          setTransform(el, 'translate3d(0px, 0px, 0px)');
          clearTimeout(el.animated);
          el.animated = setTimeout(function () {
            setTransitionDuration(el);
            setTransform(el, '');
            el.animated = null;
          }, duration);
        },
        _getRange: function _getRange(children, dragEl, dropEl) {
          var start = children.indexOf(dragEl);
          var end = children.indexOf(dropEl);
          if (start > end) {
            var _ref2 = [end, start];
            start = _ref2[0];
            end = _ref2[1];
          }
          if (start < 0) {
            start = end;
            end = children.length - 1;
          }
          if (end < 0) end = children.length - 1;
          return {
            start: start,
            end: end
          };
        }
      };
      function Helper() {
        this.helper = null;
      }
      Helper.prototype = {
        get node() {
          return this.helper;
        },
        destroy: function destroy() {
          if (this.helper && this.helper.parentNode) {
            this.helper.parentNode.removeChild(this.helper);
          }
          this.helper = null;
        },
        move: function move(x, y) {
          setTransform(this.helper, "translate3d(".concat(x, "px, ").concat(y, "px, 0)"));
        },
        init: function init(rect, element, container, options, distance) {
          if (this.helper) return;
          var fallbackOnBody = options.fallbackOnBody,
            ghostClass = options.ghostClass,
            _options$ghostStyle = options.ghostStyle,
            ghostStyle = _options$ghostStyle === void 0 ? {} : _options$ghostStyle;
          var helperContainer = fallbackOnBody ? document.body : container;
          this.helper = element.cloneNode(true);
          toggleClass(this.helper, ghostClass, true);
          var helperStyle = _objectSpread2({
            'box-sizing': 'border-box',
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            position: 'fixed',
            opacity: '0.8',
            'z-index': 100000,
            'pointer-events': 'none'
          }, ghostStyle);
          for (var key in helperStyle) {
            css(this.helper, key, helperStyle[key]);
          }
          setTransition(this.helper, 'none');
          setTransform(this.helper, 'translate3d(0px, 0px, 0px)');
          helperContainer.appendChild(this.helper);
          var ox = distance.x / parseInt(this.helper.style.width) * 100;
          var oy = distance.y / parseInt(this.helper.style.height) * 100;
          css(this.helper, 'transform-origin', "".concat(ox, "% ").concat(oy, "%"));
          css(this.helper, 'transform', 'translateZ(0)');
        }
      };
      var FromTo = {
        sortable: null,
        group: null,
        node: null,
        rect: {},
        offset: {}
      };

      // -------------------------------- Sortable ----------------------------------
      var sortables = [];
      var rootEl,
        dragEl,
        dropEl,
        downEvent,
        moveEvent,
        touchEvent,
        isMultiple,
        lastDropEl,
        autoScroller,
        dragStartTimer,
        // timer for start to drag
        helper = new Helper();
      var from = _objectSpread2({}, FromTo);
      var to = _objectSpread2({}, FromTo);
      var distance = {
        x: 0,
        y: 0
      };
      var lastPosition = {
        x: 0,
        y: 0
      };
      var _prepareGroup = function _prepareGroup(options, uniqueId) {
        var group = {};
        var originalGroup = options.group;
        if (!originalGroup || _typeof(originalGroup) != 'object') {
          originalGroup = {
            name: originalGroup,
            pull: true,
            put: true
          };
        }
        group.name = originalGroup.name || uniqueId;
        group.pull = originalGroup.pull;
        group.put = originalGroup.put;
        options.group = group;
      };

      /**
       * get nearest Sortable
       */
      var _nearestSortable = function _nearestSortable(evt) {
        if (dragEl) {
          var e = evt.touches ? evt.touches[0] : evt;
          var nearest = _detectNearestSortable(e.clientX, e.clientY);
          if (nearest) {
            rootEl = nearest;
            if (rootEl === downEvent.sortable.el) return;
            nearest[expando]._onMove(evt);
          }
        }
      };
      /**
       * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
       * @param  {Number} x      X position
       * @param  {Number} y      Y position
       * @return {HTMLElement}   Element of the first found nearest Sortable
       */
      var _detectNearestSortable = function _detectNearestSortable(x, y) {
        var result;
        sortables.some(function (sortable) {
          var threshold = sortable[expando].options.emptyInsertThreshold;
          if (!threshold) return;
          var rect = getRect(sortable, {
              parent: true
            }),
            insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold,
            insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;
          if (insideHorizontally && insideVertically) {
            return result = sortable;
          }
        });
        return result;
      };
      var _positionChanged = function _positionChanged(evt) {
        var clientX = evt.clientX,
          clientY = evt.clientY;
        var distanceX = clientX - lastPosition.x;
        var distanceY = clientY - lastPosition.y;
        lastPosition.x = clientX;
        lastPosition.y = clientY;
        if (clientX !== void 0 && clientY !== void 0 && Math.abs(distanceX) <= 0 && Math.abs(distanceY) <= 0) {
          return false;
        }
        return true;
      };
      var _emits = function _emits() {
        var result = {
          from: _objectSpread2({}, from),
          to: _objectSpread2({}, to)
        };
        if (isMultiple) {
          var ft = getMultiDiffer();
          result.from = _objectSpread2(_objectSpread2({}, ft.from), result.from);
          result.to = _objectSpread2(_objectSpread2({}, ft.to), result.to);
        }
        return result;
      };

      /**
       * @class  Sortable
       * @param  {HTMLElement}  el group element
       * @param  {Object}       options
       */
      function Sortable(el, options) {
        if (!(el && el.nodeType && el.nodeType === 1)) {
          throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
        }
        el[expando] = this;
        this.el = el;
        this.ownerDocument = el.ownerDocument;
        this.options = options = Object.assign({}, options);
        var defaults = {
          group: '',
          animation: 150,
          multiple: false,
          draggable: null,
          handle: null,
          onDrag: null,
          onMove: null,
          onDrop: null,
          onChange: null,
          autoScroll: true,
          scrollThreshold: 25,
          delay: 0,
          delayOnTouchOnly: false,
          disabled: false,
          ghostClass: '',
          ghostStyle: {},
          chosenClass: '',
          selectedClass: '',
          fallbackOnBody: false,
          stopPropagation: false,
          supportPointer: 'onpointerdown' in window && !Safari,
          supportTouch: 'ontouchstart' in window,
          emptyInsertThreshold: 5
        };

        // Set default options
        for (var name in defaults) {
          !(name in this.options) && (this.options[name] = defaults[name]);
        }
        _prepareGroup(options, 'group_' + randomCode());

        // Bind all private methods
        for (var fn in this) {
          if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
            this[fn] = this[fn].bind(this);
          }
        }
        var _this$options = this.options,
          supportPointer = _this$options.supportPointer,
          supportTouch = _this$options.supportTouch;
        if (supportPointer) {
          on(el, 'pointerdown', this._onDrag);
        } else if (supportTouch) {
          on(el, 'touchstart', this._onDrag);
        } else {
          on(el, 'mousedown', this._onDrag);
        }
        sortables.push(el);
        this.multiplayer = new Multiple(this.options);
        this.animator = new Animation(this.options);
        autoScroller = new AutoScroll();
      }
      Sortable.prototype = {
        constructor: Sortable,
        get helper() {
          return helper.node;
        },
        /**
         * Destroy
         */
        destroy: function destroy() {
          this._dispatchEvent('destroy', this);
          this.el[expando] = null;
          for (var i = 0; i < events.start.length; i++) {
            off(this.el, events.start[i], this._onDrag);
          }

          // clear status
          this._clearState();
          sortables.splice(sortables.indexOf(this.el), 1);
          if (sortables.length == 0) autoScroller = null;
          this.el = null;
        },
        _onDrag: function _onDrag( /** Event|TouchEvent */evt) {
          var _this = this;
          if (this.options.disabled || !this.options.group.pull) return;
          if (/mousedown|pointerdown/.test(evt.type) && evt.button !== 0) return; // only left button and enabled

          var _getEvent = getEvent(evt),
            touch = _getEvent.touch,
            event = _getEvent.event,
            target = _getEvent.target;

          // Safari ignores further event handling after mousedown
          if (Safari && target && target.tagName.toUpperCase() === 'SELECT') return;
          if (target === this.el) return;
          var _this$options2 = this.options,
            draggable = _this$options2.draggable,
            handle = _this$options2.handle;
          if (typeof handle === 'function' && !handle(evt)) return;
          if (typeof handle === 'string' && !matches(target, handle)) return;
          if (typeof draggable === 'function') {
            // Function type must return a HTMLElement if used to specifies the drag el
            var element = draggable(evt);
            if (!element) return;
            // set drag element
            if (isHTMLElement(element)) dragEl = element;
          } else {
            // String use as 'TagName' or '.class' or '#id'
            dragEl = closest(target, draggable, this.el, false);
          }

          // No dragging is allowed when there is no dragging element
          if (!dragEl || dragEl.animated) return;

          // solve the problem that the mobile cannot be dragged
          if (touch) css(dragEl, 'touch-action', 'none');
          var parentEl = dragEl.parentNode;
          touchEvent = touch;
          downEvent = event;
          downEvent.sortable = this;
          downEvent.group = parentEl;
          isMultiple = this.options.multiple && this.multiplayer.allowDrag(dragEl);
          // multi-drag
          isMultiple && this.multiplayer.onDrag(this);

          // get the position of the dragEl
          var rect = getRect(dragEl);
          var offset = getOffset(dragEl);
          from = {
            sortable: this,
            group: parentEl,
            node: dragEl,
            rect: rect,
            offset: offset
          };
          to.group = parentEl;
          to.sortable = this;
          distance = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
          };

          // enable drag between groups
          if (this.options.supportPointer) {
            on(this.ownerDocument, 'pointermove', _nearestSortable);
          } else if (touch) {
            on(this.ownerDocument, 'touchmove', _nearestSortable);
          } else {
            on(this.ownerDocument, 'mousemove', _nearestSortable);
          }
          var _this$options3 = this.options,
            delay = _this$options3.delay,
            delayOnTouchOnly = _this$options3.delayOnTouchOnly;
          if (delay && (!delayOnTouchOnly || touch) && !(Edge || IE11OrLess)) {
            if (this.options.supportPointer) {
              on(this.ownerDocument, 'pointerup', this._onDrop);
            } else if (touchEvent) {
              on(this.ownerDocument, 'touchend', this._onDrop);
            } else {
              on(this.ownerDocument, 'mouseup', this._onDrop);
            }
            clearTimeout(dragStartTimer);
            // delay to start
            dragStartTimer = setTimeout(function () {
              return _this._onStart();
            }, delay);
          } else {
            this._onStart();
          }
        },
        _onStart: function _onStart() {
          rootEl = this.el;
          if (this.options.supportPointer) {
            on(this.ownerDocument, 'pointermove', this._onMove);
            on(this.ownerDocument, 'pointerup', this._onDrop);
            on(this.ownerDocument, 'pointercancel', this._onDrop);
          } else if (touchEvent) {
            on(this.ownerDocument, 'touchmove', this._onMove);
            on(this.ownerDocument, 'touchend', this._onDrop);
            on(this.ownerDocument, 'touchcancel', this._onDrop);
          } else {
            on(this.ownerDocument, 'mousemove', this._onMove);
            on(this.ownerDocument, 'mouseup', this._onDrop);
          }

          // clear selection
          try {
            if (document.selection) {
              // Timeout neccessary for IE9
              _nextTick(function () {
                document.selection.empty();
              });
            } else {
              window.getSelection().removeAllRanges();
            }
          } catch (error) {}
        },
        _onTrulyStarted: function _onTrulyStarted() {
          if (!moveEvent) {
            // on-drag
            this._dispatchEvent('onDrag', _objectSpread2(_objectSpread2({}, _emits()), {}, {
              event: downEvent
            }));
            // on-multi-drag
            isMultiple && this.multiplayer.onTrulyStarted(dragEl, this);

            // Init in the move event to prevent conflict with the click event
            var element = isMultiple ? this.multiplayer.getHelper() : dragEl;
            helper.init(from.rect, element, this.el, this.options, distance);
            Sortable.helper = helper.node;

            // add class for drag element
            toggleClass(dragEl, this.options.chosenClass, true);
            css(dragEl, 'will-change', 'transform');
            Safari && css(document.body, 'user-select', 'none');
          }
        },
        _allowPut: function _allowPut() {
          if (downEvent.group === this.el) {
            return true;
          } else if (!this.options.group.put) {
            return false;
          } else {
            var name = this.options.group.name;
            var fromGroup = downEvent.sortable.options.group;
            return fromGroup.name && name && fromGroup.name === name;
          }
        },
        _onMove: function _onMove( /** Event|TouchEvent */evt) {
          this._preventEvent(evt);
          if (!downEvent || !dragEl) return;
          if (!_positionChanged(evt)) return;
          var _getEvent2 = getEvent(evt),
            event = _getEvent2.event,
            target = _getEvent2.target;
          // truly started
          this._onTrulyStarted();
          moveEvent = event; // sortable state move is active

          var x = evt.clientX - downEvent.clientX;
          var y = evt.clientY - downEvent.clientY;
          helper.move(x, y);

          // on-move
          this._dispatchEvent('onMove', _objectSpread2(_objectSpread2({}, _emits()), {}, {
            event: event
          }));
          if (!this.scrollEl) {
            // get the scroll element, fix display 'none' to 'block'
            this.scrollEl = getParentAutoScrollElement(this.el, true);
          }

          // auto scroll
          var _this$options4 = this.options,
            autoScroll = _this$options4.autoScroll,
            scrollThreshold = _this$options4.scrollThreshold;
          if (autoScroll) {
            autoScroller.update(this.scrollEl, scrollThreshold, downEvent, moveEvent);
          }
          if (!this._allowPut()) return;
          dropEl = closest(target, this.options.draggable, rootEl, false);
          if (dropEl) {
            if (dropEl === lastDropEl) return;
            lastDropEl = dropEl;
            if (dropEl.animated || containes(dropEl, dragEl)) return;
          }
          if (dropEl === dragEl) return;
          if (rootEl !== from.sortable.el) {
            if (target === rootEl || !lastChild(rootEl, helper.node)) {
              this._onInsert(event, true);
            } else if (dropEl) {
              this._onInsert(event, false);
            }
          } else if (dropEl) {
            this._onChange(event);
          }
        },
        _onInsert: function _onInsert( /** Event|TouchEvent */event, insert) {
          var target = insert ? dragEl : dropEl;
          var parentEl = insert ? rootEl : dropEl.parentNode;
          from.sortable.animator.collect(dragEl, null, dragEl.parentNode, dragEl);
          this.animator.collect(null, target, parentEl, dragEl);
          isMultiple && this.multiplayer.onChange(dragEl, this);
          to = {
            sortable: this,
            group: parentEl,
            node: target,
            rect: getRect(dragEl),
            offset: getOffset(dragEl)
          };
          from.sortable._dispatchEvent('onRemove', _objectSpread2(_objectSpread2({}, _emits()), {}, {
            event: event
          }));
          if (insert) {
            parentEl.appendChild(dragEl);
          } else {
            parentEl.insertBefore(dragEl, target);
          }
          this._dispatchEvent('onAdd', _objectSpread2(_objectSpread2({}, _emits()), {}, {
            event: event
          }));
          from.sortable.animator.animate();
          this.animator.animate();
          from.group = parentEl;
          from.sortable = this;
        },
        _onChange: function _onChange( /** Event|TouchEvent */event) {
          var parentEl = dropEl.parentNode;
          this.animator.collect(dragEl, dropEl, parentEl);
          isMultiple && this.multiplayer.onChange(dragEl, this);
          to = {
            sortable: this,
            group: parentEl,
            node: dropEl,
            rect: getRect(dropEl),
            offset: getOffset(dropEl)
          };
          this._dispatchEvent('onChange', _objectSpread2(_objectSpread2({}, _emits()), {}, {
            event: event
          }));

          // the top value is compared first, and the left is compared if the top value is the same
          var offset = getOffset(dragEl);
          var nextEl = null;
          if (offset.top === to.offset.top) {
            nextEl = offset.left < to.offset.left ? dropEl.nextSibling : dropEl;
          } else {
            nextEl = offset.top < to.offset.top ? dropEl.nextSibling : dropEl;
          }
          parentEl.insertBefore(dragEl, nextEl);
          this.animator.animate();
          from.group = parentEl;
          from.sortable = this;
        },
        _onDrop: function _onDrop( /** Event|TouchEvent */evt) {
          this._unbindMoveEvents();
          this._unbindDropEvents();
          this._preventEvent(evt);
          autoScroller.clear();
          clearTimeout(dragStartTimer);

          // clear style, attrs and class
          if (dragEl) {
            toggleClass(dragEl, this.options.chosenClass, false);
            touchEvent && css(dragEl, 'touch-action', '');
            css(dragEl, 'will-change', '');
          }

          // drag and drop done
          if (dragEl && downEvent && moveEvent) {
            this._onEnd(evt);
          } else if (this.options.multiple) {
            // click event
            this.multiplayer.select(evt, dragEl, _objectSpread2({}, from));
          }
          this._clearState();
        },
        _onEnd: function _onEnd( /** Event|TouchEvent */evt) {
          from.group = downEvent.group;
          from.sortable = downEvent.sortable;
          if (isMultiple) {
            this.multiplayer.onDrop(evt, dragEl, downEvent, _emits);
          } else {
            // re-acquire the offset and rect values of the dragged element as the value after the drag is completed
            to.rect = getRect(dragEl);
            to.offset = getOffset(dragEl);
            var changed = offsetChanged(from.offset, to.offset);
            var params = _objectSpread2(_objectSpread2({}, _emits()), {}, {
              changed: changed,
              event: evt
            });
            // on-drop
            if (to.sortable.el !== from.sortable.el) {
              from.sortable._dispatchEvent('onDrop', params);
            }
            to.sortable._dispatchEvent('onDrop', params);
          }
          Safari && css(document.body, 'user-select', '');
        },
        _preventEvent: function _preventEvent(evt) {
          evt.preventDefault !== void 0 && evt.cancelable && evt.preventDefault();
          if (this.options.stopPropagation) {
            if (evt && evt.stopPropagation) {
              evt.stopPropagation();
            } else {
              window.event.cancelBubble = true;
            }
          }
        },
        _dispatchEvent: function _dispatchEvent(event, params) {
          var callback = this.options[event];
          if (typeof callback === 'function') callback(params);
        },
        _clearState: function _clearState() {
          dragEl = dropEl = downEvent = moveEvent = touchEvent = isMultiple = lastDropEl = dragStartTimer = Sortable.ghost = null;
          distance = lastPosition = {
            x: 0,
            y: 0
          };
          from = to = _objectSpread2({}, FromTo);
          helper.destroy();
        },
        _unbindMoveEvents: function _unbindMoveEvents() {
          for (var i = 0; i < events.move.length; i++) {
            off(this.ownerDocument, events.move[i], this._onMove);
            off(this.ownerDocument, events.move[i], _nearestSortable);
          }
        },
        _unbindDropEvents: function _unbindDropEvents() {
          for (var i = 0; i < events.end.length; i++) {
            off(this.ownerDocument, events.end[i], this._onDrop);
          }
        }
      };
      Sortable.prototype.utils = {
        getRect: getRect,
        getOffset: getOffset
      };
      return Sortable;
    });
  })(sortable);
  var SortableDnd = sortable.exports;

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
            var result = JSON.stringify(_objectSpread2(_objectSpread2({}, store), value));
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

  var attributes = ['group', 'handle', 'disabled', 'draggable', 'ghostClass', 'ghostStyle', 'chosenClass', 'animation', 'autoScroll', 'scrollThreshold'];
  var dragEl = null;
  var Sortable = /*#__PURE__*/function () {
    function Sortable(context, callback) {
      _classCallCheck(this, Sortable);
      _defineProperty(this, "context", void 0);
      _defineProperty(this, "callback", void 0);
      _defineProperty(this, "initialList", void 0);
      _defineProperty(this, "dynamicList", void 0);
      _defineProperty(this, "sortable", void 0);
      _defineProperty(this, "rangeChanged", void 0);
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
          if (this.sortable) this.sortable.options[key] = value;
        }
      }
    }, {
      key: "_init",
      value: function _init() {
        var _this = this;
        var props = attributes.reduce(function (res, key) {
          res[key] = _this.context[key];
          return res;
        }, {});
        this.sortable = new SortableDnd(this.context.container, _objectSpread2(_objectSpread2({}, props), {}, {
          fallbackOnBody: true,
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
      value: function () {
        var _onDrag2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(node) {
          var callback,
            fromList,
            fromState,
            store,
            _args = arguments;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                callback = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
                dragEl = node;
                this.dynamicList = _toConsumableArray(this.initialList);
                fromList = _toConsumableArray(this.initialList);
                fromState = this._getFromTo({
                  node: node
                }, fromList);
                _context.next = 7;
                return Store.setValue({
                  from: _objectSpread2({
                    list: fromList
                  }, fromState)
                });
              case 7:
                if (!callback) {
                  _context.next = 15;
                  break;
                }
                this.rangeChanged = false;
                _context.next = 11;
                return Store.getValue();
              case 11:
                store = _context.sent;
                this.context.emit('drag', _objectSpread2({
                  list: fromList
                }, store));
                _context.next = 16;
                break;
              case 15:
                this.rangeChanged = true;
              case 16:
              case "end":
                return _context.stop();
            }
          }, _callee, this);
        }));
        function _onDrag(_x) {
          return _onDrag2.apply(this, arguments);
        }
        return _onDrag;
      }()
    }, {
      key: "_onAdd",
      value: function () {
        var _onAdd2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(from, to) {
          var store, list, index, params, _store$from, _store$from2;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Store.getValue();
              case 2:
                store = _context2.sent;
                list = _toConsumableArray(this.dynamicList);
                index = this._getIndex(list, to.node.dataset.key);
                params = _objectSpread2(_objectSpread2({}, store.from), {}, {
                  index: index
                });
                if (from.node === to.node) {
                  // insert to end of list
                  params.index = this.dynamicList.length;
                  this.dynamicList.push((_store$from = store.from) === null || _store$from === void 0 ? void 0 : _store$from.item);
                } else {
                  this.dynamicList.splice(index, 0, (_store$from2 = store.from) === null || _store$from2 === void 0 ? void 0 : _store$from2.item);
                }
                this.context.emit('add', _objectSpread2({}, params));
              case 8:
              case "end":
                return _context2.stop();
            }
          }, _callee2, this);
        }));
        function _onAdd(_x2, _x3) {
          return _onAdd2.apply(this, arguments);
        }
        return _onAdd;
      }()
    }, {
      key: "_onRemove",
      value: function () {
        var _onRemove2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(from, to) {
          var list, state;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                list = _toConsumableArray(this.dynamicList);
                state = this._getFromTo(from, list);
                this.dynamicList.splice(state.index, 1);
                this.context.emit('remove', _objectSpread2({}, state));
              case 4:
              case "end":
                return _context3.stop();
            }
          }, _callee3, this);
        }));
        function _onRemove(_x4, _x5) {
          return _onRemove2.apply(this, arguments);
        }
        return _onRemove;
      }()
    }, {
      key: "_onChange",
      value: function () {
        var _onChange2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(from, to) {
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
        function _onChange(_x6, _x7) {
          return _onChange2.apply(this, arguments);
        }
        return _onChange;
      }()
    }, {
      key: "_onDrop",
      value: function () {
        var _onDrop2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(from, to, changed) {
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
                params = _objectSpread2(_objectSpread2({
                  list: list
                }, store), {}, {
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
        function _onDrop(_x8, _x9, _x10) {
          return _onDrop2.apply(this, arguments);
        }
        return _onDrop;
      }()
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

  var Range = /*#__PURE__*/_createClass(function Range() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Range);
    _defineProperty(this, "start", void 0);
    _defineProperty(this, "end", void 0);
    _defineProperty(this, "front", void 0);
    _defineProperty(this, "behind", void 0);
    this.start = options.start || 0;
    this.end = options.end || 0;
    this.front = options.front || 0;
    this.behind = options.behind || 0;
  });
  var CalcSize = /*#__PURE__*/_createClass(function CalcSize() {
    _classCallCheck(this, CalcSize);
    _defineProperty(this, "average", void 0);
    _defineProperty(this, "total", void 0);
    _defineProperty(this, "fixed", void 0);
    _defineProperty(this, "header", void 0);
    _defineProperty(this, "footer", void 0);
    this.average = 0;
    this.total = 0;
    this.fixed = 0;
    this.header = 0;
    this.footer = 0;
  });
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
      _defineProperty(this, "options", void 0);
      _defineProperty(this, "callback", void 0);
      _defineProperty(this, "sizes", void 0);
      _defineProperty(this, "isHorizontal", void 0);
      _defineProperty(this, "calcIndex", void 0);
      _defineProperty(this, "calcType", void 0);
      _defineProperty(this, "calcSize", void 0);
      _defineProperty(this, "range", void 0);
      _defineProperty(this, "direction", void 0);
      _defineProperty(this, "offset", void 0);
      this.options = _objectSpread2({}, options);
      this.callback = callback;
      this.sizes = new Map();
      this.isHorizontal = options.isHorizontal;
      this.calcIndex = 0;
      this.calcType = CACLTYPE.INIT;
      this.calcSize = new CalcSize();
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
              return _this2.updateRange();
            });
          } else {
            setTimeout(function () {
              return _this2.updateRange();
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
        if (uniqueKeys.length <= keeps) {
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
        this.callback(_objectSpread2({}, this.range));
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
      key: "handleHeaderSizeChange",
      value: function handleHeaderSizeChange(size) {
        this.calcSize.header = size;
      }
    }, {
      key: "handleFooterSizeChange",
      value: function handleFooterSizeChange(size) {
        this.calcSize.footer = size;
      }
    }]);
    return Virtual;
  }();

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
      emit(event, dataKey, getCurrentSize());
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

  var VirtualProps = {
    dataSource: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    dataKey: {
      type: String,
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
      "default": 25
    },
    keepOffset: {
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
    disabled: {
      type: Boolean,
      "default": false
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
            var _slots$default;
            return (_slots$default = slots["default"]) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots);
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
            var _slots$default2;
            return (_slots$default2 = slots["default"]) === null || _slots$default2 === void 0 ? void 0 : _slots$default2.call(slots);
          }
        });
      };
    }
  });

  var VirtualDragList = vue.defineComponent({
    props: VirtualProps,
    emits: ['top', 'bottom', 'drag', 'drop', 'add', 'remove'],
    setup: function setup(props, _ref) {
      var emit = _ref.emit,
        slots = _ref.slots,
        expose = _ref.expose;
      var range = vue.ref(new Range());
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
            if (offset + clientSize < scrollSize) scrollToBottom();
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
      var init = function init(list) {
        viewlist.value = _toConsumableArray(list);
        updateUniqueKeys();
        if (virtual) {
          virtual.updateUniqueKeys(uniqueKeys.value);
          virtual.updateSizes(uniqueKeys.value);
          virtual.updateRange();
        }
        if (sortable) sortable.setValue('dataSource', _toConsumableArray(list));else vue.nextTick(function () {
          return initSortable();
        });
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
          uniqueKeys: uniqueKeys.value,
          isHorizontal: isHorizontal
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
        sortable = new Sortable(_objectSpread2({
          container: groupRef.value,
          list: viewlist.value,
          emit: emit
        }, props), function (_ref2) {
          var list = _ref2.list,
            changed = _ref2.changed;
          // on drop
          if (!changed) return;
          // recalculate the range once when scrolling down
          if (sortable.rangeChanged && virtual.direction && range.value.start > 0) {
            var index = list.indexOf(viewlist.value[range.value.start]);
            if (index > -1) {
              range.value.start = index;
              range.value.end = index + props.keeps - 1;
            }
          }
          // fix error with vue: Failed to execute 'insertBefore' on 'Node'
          viewlist.value = [];
          vue.nextTick(function () {
            viewlist.value = _toConsumableArray(list);
            updateUniqueKeys();
            virtual.updateUniqueKeys(uniqueKeys.value);
          });
        });
      };
      var handleScroll = debounce(function () {
        if (!rootRef.value) return;
        var offset = getOffset();
        var clientSize = Math.ceil(rootRef.value[clientSizeKey]);
        var scrollSize = Math.ceil(rootRef.value[scrollSizeKey]);
        if (!virtual || !scrollSize || offset < 0 || offset + clientSize > scrollSize + 1) return;
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
      var onItemResized = function onItemResized(key, size) {
        virtual.handleItemSizeChange(key, size);
      };
      var onHeaderResized = function onHeaderResized(key, size) {
        virtual.handleHeaderSizeChange(size);
      };
      var onFooterResized = function onFooterResized(key, size) {
        virtual.handleFooterSizeChange(size);
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
        deep: true,
        immediate: true
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
      });
      // set back offset when awake from keep-alive
      vue.onActivated(function () {
        virtual && scrollToOffset(virtual.offset);
      });
      vue.onUnmounted(function () {
        sortable && sortable.destroy();
      });
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
          WrapTag = props.wrapTag,
          ItemTag = props.itemTag,
          HeaderTag = props.headerTag,
          FooterTag = props.footerTag;
        var _range$value2 = range.value,
          start = _range$value2.start,
          end = _range$value2.end,
          front = _range$value2.front,
          behind = _range$value2.behind;
        var wrapStyle = _objectSpread2(_objectSpread2({}, props.wrapStyle), {}, {
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
            return [
            // header
            slots.header ? vue.h(Slots, {
              key: 'header',
              tag: HeaderTag,
              dataKey: 'header',
              event: 'resize',
              onResize: onHeaderResized
            }, {
              "default": function _default() {
                return slots.header();
              }
            }) : null,
            // list
            vue.h(WrapTag, {
              ref: groupRef,
              role: 'group',
              "class": props.wrapClass,
              style: wrapStyle
            }, {
              "default": function _default() {
                return viewlist.value.slice(start, end + 1).map(function (item) {
                  var index = getItemIndex(item);
                  var dataKey = getDataKey(item, props.dataKey);
                  var itemStyle = _objectSpread2(_objectSpread2({}, props.itemStyle), getItemStyle(dataKey));
                  return slots.item ? vue.h(Items, {
                    key: dataKey,
                    tag: ItemTag,
                    "class": props.itemClass,
                    style: itemStyle,
                    event: 'resize',
                    dataKey: dataKey,
                    isHorizontal: isHorizontal,
                    onResize: onItemResized
                  }, {
                    "default": function _default() {
                      return slots.item({
                        record: item,
                        index: index,
                        dataKey: dataKey
                      });
                    }
                  }) : null;
                });
              }
            }),
            // footer
            slots.footer ? vue.h(Slots, {
              key: 'footer',
              tag: FooterTag,
              dataKey: 'footer',
              event: 'resize',
              onResize: onFooterResized
            }, {
              "default": function _default() {
                return slots.footer();
              }
            }) : null,
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
