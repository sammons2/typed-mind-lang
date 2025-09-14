#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/utils/is.js
var require_is = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/utils/is.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.thenable = exports2.typedArray = exports2.stringArray = exports2.array = exports2.func = exports2.error = exports2.number = exports2.string = exports2.boolean = void 0;
    function boolean(value) {
      return value === true || value === false;
    }
    exports2.boolean = boolean;
    function string(value) {
      return typeof value === "string" || value instanceof String;
    }
    exports2.string = string;
    function number(value) {
      return typeof value === "number" || value instanceof Number;
    }
    exports2.number = number;
    function error(value) {
      return value instanceof Error;
    }
    exports2.error = error;
    function func(value) {
      return typeof value === "function";
    }
    exports2.func = func;
    function array(value) {
      return Array.isArray(value);
    }
    exports2.array = array;
    function stringArray(value) {
      return array(value) && value.every((elem) => string(elem));
    }
    exports2.stringArray = stringArray;
    function typedArray(value, check) {
      return Array.isArray(value) && value.every(check);
    }
    exports2.typedArray = typedArray;
    function thenable(value) {
      return value && func(value.then);
    }
    exports2.thenable = thenable;
  }
});

// ../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/is.js
var require_is2 = __commonJS({
  "../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/is.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.stringArray = exports2.array = exports2.func = exports2.error = exports2.number = exports2.string = exports2.boolean = void 0;
    function boolean(value) {
      return value === true || value === false;
    }
    exports2.boolean = boolean;
    function string(value) {
      return typeof value === "string" || value instanceof String;
    }
    exports2.string = string;
    function number(value) {
      return typeof value === "number" || value instanceof Number;
    }
    exports2.number = number;
    function error(value) {
      return value instanceof Error;
    }
    exports2.error = error;
    function func(value) {
      return typeof value === "function";
    }
    exports2.func = func;
    function array(value) {
      return Array.isArray(value);
    }
    exports2.array = array;
    function stringArray(value) {
      return array(value) && value.every((elem) => string(elem));
    }
    exports2.stringArray = stringArray;
  }
});

// ../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/messages.js
var require_messages = __commonJS({
  "../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/messages.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Message = exports2.NotificationType9 = exports2.NotificationType8 = exports2.NotificationType7 = exports2.NotificationType6 = exports2.NotificationType5 = exports2.NotificationType4 = exports2.NotificationType3 = exports2.NotificationType2 = exports2.NotificationType1 = exports2.NotificationType0 = exports2.NotificationType = exports2.RequestType9 = exports2.RequestType8 = exports2.RequestType7 = exports2.RequestType6 = exports2.RequestType5 = exports2.RequestType4 = exports2.RequestType3 = exports2.RequestType2 = exports2.RequestType1 = exports2.RequestType = exports2.RequestType0 = exports2.AbstractMessageSignature = exports2.ParameterStructures = exports2.ResponseError = exports2.ErrorCodes = void 0;
    var is = require_is2();
    var ErrorCodes;
    (function(ErrorCodes2) {
      ErrorCodes2.ParseError = -32700;
      ErrorCodes2.InvalidRequest = -32600;
      ErrorCodes2.MethodNotFound = -32601;
      ErrorCodes2.InvalidParams = -32602;
      ErrorCodes2.InternalError = -32603;
      ErrorCodes2.jsonrpcReservedErrorRangeStart = -32099;
      ErrorCodes2.serverErrorStart = -32099;
      ErrorCodes2.MessageWriteError = -32099;
      ErrorCodes2.MessageReadError = -32098;
      ErrorCodes2.PendingResponseRejected = -32097;
      ErrorCodes2.ConnectionInactive = -32096;
      ErrorCodes2.ServerNotInitialized = -32002;
      ErrorCodes2.UnknownErrorCode = -32001;
      ErrorCodes2.jsonrpcReservedErrorRangeEnd = -32e3;
      ErrorCodes2.serverErrorEnd = -32e3;
    })(ErrorCodes || (exports2.ErrorCodes = ErrorCodes = {}));
    var ResponseError = class _ResponseError extends Error {
      constructor(code, message, data) {
        super(message);
        this.code = is.number(code) ? code : ErrorCodes.UnknownErrorCode;
        this.data = data;
        Object.setPrototypeOf(this, _ResponseError.prototype);
      }
      toJson() {
        const result = {
          code: this.code,
          message: this.message
        };
        if (this.data !== void 0) {
          result.data = this.data;
        }
        return result;
      }
    };
    exports2.ResponseError = ResponseError;
    var ParameterStructures = class _ParameterStructures {
      constructor(kind) {
        this.kind = kind;
      }
      static is(value) {
        return value === _ParameterStructures.auto || value === _ParameterStructures.byName || value === _ParameterStructures.byPosition;
      }
      toString() {
        return this.kind;
      }
    };
    exports2.ParameterStructures = ParameterStructures;
    ParameterStructures.auto = new ParameterStructures("auto");
    ParameterStructures.byPosition = new ParameterStructures("byPosition");
    ParameterStructures.byName = new ParameterStructures("byName");
    var AbstractMessageSignature = class {
      constructor(method, numberOfParams) {
        this.method = method;
        this.numberOfParams = numberOfParams;
      }
      get parameterStructures() {
        return ParameterStructures.auto;
      }
    };
    exports2.AbstractMessageSignature = AbstractMessageSignature;
    var RequestType0 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 0);
      }
    };
    exports2.RequestType0 = RequestType0;
    var RequestType = class extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports2.RequestType = RequestType;
    var RequestType1 = class extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports2.RequestType1 = RequestType1;
    var RequestType2 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 2);
      }
    };
    exports2.RequestType2 = RequestType2;
    var RequestType3 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 3);
      }
    };
    exports2.RequestType3 = RequestType3;
    var RequestType4 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 4);
      }
    };
    exports2.RequestType4 = RequestType4;
    var RequestType5 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 5);
      }
    };
    exports2.RequestType5 = RequestType5;
    var RequestType6 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 6);
      }
    };
    exports2.RequestType6 = RequestType6;
    var RequestType7 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 7);
      }
    };
    exports2.RequestType7 = RequestType7;
    var RequestType8 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 8);
      }
    };
    exports2.RequestType8 = RequestType8;
    var RequestType9 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 9);
      }
    };
    exports2.RequestType9 = RequestType9;
    var NotificationType = class extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports2.NotificationType = NotificationType;
    var NotificationType0 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 0);
      }
    };
    exports2.NotificationType0 = NotificationType0;
    var NotificationType1 = class extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports2.NotificationType1 = NotificationType1;
    var NotificationType2 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 2);
      }
    };
    exports2.NotificationType2 = NotificationType2;
    var NotificationType3 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 3);
      }
    };
    exports2.NotificationType3 = NotificationType3;
    var NotificationType4 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 4);
      }
    };
    exports2.NotificationType4 = NotificationType4;
    var NotificationType5 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 5);
      }
    };
    exports2.NotificationType5 = NotificationType5;
    var NotificationType6 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 6);
      }
    };
    exports2.NotificationType6 = NotificationType6;
    var NotificationType7 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 7);
      }
    };
    exports2.NotificationType7 = NotificationType7;
    var NotificationType8 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 8);
      }
    };
    exports2.NotificationType8 = NotificationType8;
    var NotificationType9 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 9);
      }
    };
    exports2.NotificationType9 = NotificationType9;
    var Message;
    (function(Message2) {
      function isRequest(message) {
        const candidate = message;
        return candidate && is.string(candidate.method) && (is.string(candidate.id) || is.number(candidate.id));
      }
      Message2.isRequest = isRequest;
      function isNotification(message) {
        const candidate = message;
        return candidate && is.string(candidate.method) && message.id === void 0;
      }
      Message2.isNotification = isNotification;
      function isResponse(message) {
        const candidate = message;
        return candidate && (candidate.result !== void 0 || !!candidate.error) && (is.string(candidate.id) || is.number(candidate.id) || candidate.id === null);
      }
      Message2.isResponse = isResponse;
    })(Message || (exports2.Message = Message = {}));
  }
});

// ../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/linkedMap.js
var require_linkedMap = __commonJS({
  "../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/linkedMap.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LRUCache = exports2.LinkedMap = exports2.Touch = void 0;
    var Touch;
    (function(Touch2) {
      Touch2.None = 0;
      Touch2.First = 1;
      Touch2.AsOld = Touch2.First;
      Touch2.Last = 2;
      Touch2.AsNew = Touch2.Last;
    })(Touch || (exports2.Touch = Touch = {}));
    var LinkedMap = class {
      constructor() {
        this[_a] = "LinkedMap";
        this._map = /* @__PURE__ */ new Map();
        this._head = void 0;
        this._tail = void 0;
        this._size = 0;
        this._state = 0;
      }
      clear() {
        this._map.clear();
        this._head = void 0;
        this._tail = void 0;
        this._size = 0;
        this._state++;
      }
      isEmpty() {
        return !this._head && !this._tail;
      }
      get size() {
        return this._size;
      }
      get first() {
        return this._head?.value;
      }
      get last() {
        return this._tail?.value;
      }
      has(key) {
        return this._map.has(key);
      }
      get(key, touch = Touch.None) {
        const item = this._map.get(key);
        if (!item) {
          return void 0;
        }
        if (touch !== Touch.None) {
          this.touch(item, touch);
        }
        return item.value;
      }
      set(key, value, touch = Touch.None) {
        let item = this._map.get(key);
        if (item) {
          item.value = value;
          if (touch !== Touch.None) {
            this.touch(item, touch);
          }
        } else {
          item = { key, value, next: void 0, previous: void 0 };
          switch (touch) {
            case Touch.None:
              this.addItemLast(item);
              break;
            case Touch.First:
              this.addItemFirst(item);
              break;
            case Touch.Last:
              this.addItemLast(item);
              break;
            default:
              this.addItemLast(item);
              break;
          }
          this._map.set(key, item);
          this._size++;
        }
        return this;
      }
      delete(key) {
        return !!this.remove(key);
      }
      remove(key) {
        const item = this._map.get(key);
        if (!item) {
          return void 0;
        }
        this._map.delete(key);
        this.removeItem(item);
        this._size--;
        return item.value;
      }
      shift() {
        if (!this._head && !this._tail) {
          return void 0;
        }
        if (!this._head || !this._tail) {
          throw new Error("Invalid list");
        }
        const item = this._head;
        this._map.delete(item.key);
        this.removeItem(item);
        this._size--;
        return item.value;
      }
      forEach(callbackfn, thisArg) {
        const state = this._state;
        let current = this._head;
        while (current) {
          if (thisArg) {
            callbackfn.bind(thisArg)(current.value, current.key, this);
          } else {
            callbackfn(current.value, current.key, this);
          }
          if (this._state !== state) {
            throw new Error(`LinkedMap got modified during iteration.`);
          }
          current = current.next;
        }
      }
      keys() {
        const state = this._state;
        let current = this._head;
        const iterator = {
          [Symbol.iterator]: () => {
            return iterator;
          },
          next: () => {
            if (this._state !== state) {
              throw new Error(`LinkedMap got modified during iteration.`);
            }
            if (current) {
              const result = { value: current.key, done: false };
              current = current.next;
              return result;
            } else {
              return { value: void 0, done: true };
            }
          }
        };
        return iterator;
      }
      values() {
        const state = this._state;
        let current = this._head;
        const iterator = {
          [Symbol.iterator]: () => {
            return iterator;
          },
          next: () => {
            if (this._state !== state) {
              throw new Error(`LinkedMap got modified during iteration.`);
            }
            if (current) {
              const result = { value: current.value, done: false };
              current = current.next;
              return result;
            } else {
              return { value: void 0, done: true };
            }
          }
        };
        return iterator;
      }
      entries() {
        const state = this._state;
        let current = this._head;
        const iterator = {
          [Symbol.iterator]: () => {
            return iterator;
          },
          next: () => {
            if (this._state !== state) {
              throw new Error(`LinkedMap got modified during iteration.`);
            }
            if (current) {
              const result = { value: [current.key, current.value], done: false };
              current = current.next;
              return result;
            } else {
              return { value: void 0, done: true };
            }
          }
        };
        return iterator;
      }
      [(_a = Symbol.toStringTag, Symbol.iterator)]() {
        return this.entries();
      }
      trimOld(newSize) {
        if (newSize >= this.size) {
          return;
        }
        if (newSize === 0) {
          this.clear();
          return;
        }
        let current = this._head;
        let currentSize = this.size;
        while (current && currentSize > newSize) {
          this._map.delete(current.key);
          current = current.next;
          currentSize--;
        }
        this._head = current;
        this._size = currentSize;
        if (current) {
          current.previous = void 0;
        }
        this._state++;
      }
      addItemFirst(item) {
        if (!this._head && !this._tail) {
          this._tail = item;
        } else if (!this._head) {
          throw new Error("Invalid list");
        } else {
          item.next = this._head;
          this._head.previous = item;
        }
        this._head = item;
        this._state++;
      }
      addItemLast(item) {
        if (!this._head && !this._tail) {
          this._head = item;
        } else if (!this._tail) {
          throw new Error("Invalid list");
        } else {
          item.previous = this._tail;
          this._tail.next = item;
        }
        this._tail = item;
        this._state++;
      }
      removeItem(item) {
        if (item === this._head && item === this._tail) {
          this._head = void 0;
          this._tail = void 0;
        } else if (item === this._head) {
          if (!item.next) {
            throw new Error("Invalid list");
          }
          item.next.previous = void 0;
          this._head = item.next;
        } else if (item === this._tail) {
          if (!item.previous) {
            throw new Error("Invalid list");
          }
          item.previous.next = void 0;
          this._tail = item.previous;
        } else {
          const next = item.next;
          const previous = item.previous;
          if (!next || !previous) {
            throw new Error("Invalid list");
          }
          next.previous = previous;
          previous.next = next;
        }
        item.next = void 0;
        item.previous = void 0;
        this._state++;
      }
      touch(item, touch) {
        if (!this._head || !this._tail) {
          throw new Error("Invalid list");
        }
        if (touch !== Touch.First && touch !== Touch.Last) {
          return;
        }
        if (touch === Touch.First) {
          if (item === this._head) {
            return;
          }
          const next = item.next;
          const previous = item.previous;
          if (item === this._tail) {
            previous.next = void 0;
            this._tail = previous;
          } else {
            next.previous = previous;
            previous.next = next;
          }
          item.previous = void 0;
          item.next = this._head;
          this._head.previous = item;
          this._head = item;
          this._state++;
        } else if (touch === Touch.Last) {
          if (item === this._tail) {
            return;
          }
          const next = item.next;
          const previous = item.previous;
          if (item === this._head) {
            next.previous = void 0;
            this._head = next;
          } else {
            next.previous = previous;
            previous.next = next;
          }
          item.next = void 0;
          item.previous = this._tail;
          this._tail.next = item;
          this._tail = item;
          this._state++;
        }
      }
      toJSON() {
        const data = [];
        this.forEach((value, key) => {
          data.push([key, value]);
        });
        return data;
      }
      fromJSON(data) {
        this.clear();
        for (const [key, value] of data) {
          this.set(key, value);
        }
      }
    };
    exports2.LinkedMap = LinkedMap;
    var LRUCache = class extends LinkedMap {
      constructor(limit, ratio = 1) {
        super();
        this._limit = limit;
        this._ratio = Math.min(Math.max(0, ratio), 1);
      }
      get limit() {
        return this._limit;
      }
      set limit(limit) {
        this._limit = limit;
        this.checkTrim();
      }
      get ratio() {
        return this._ratio;
      }
      set ratio(ratio) {
        this._ratio = Math.min(Math.max(0, ratio), 1);
        this.checkTrim();
      }
      get(key, touch = Touch.AsNew) {
        return super.get(key, touch);
      }
      peek(key) {
        return super.get(key, Touch.None);
      }
      set(key, value) {
        super.set(key, value, Touch.Last);
        this.checkTrim();
        return this;
      }
      checkTrim() {
        if (this.size > this._limit) {
          this.trimOld(Math.round(this._limit * this._ratio));
        }
      }
    };
    exports2.LRUCache = LRUCache;
  }
});

// ../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/disposable.js
var require_disposable = __commonJS({
  "../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/disposable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Disposable = void 0;
    var Disposable;
    (function(Disposable2) {
      function create(func) {
        return {
          dispose: func
        };
      }
      Disposable2.create = create;
    })(Disposable || (exports2.Disposable = Disposable = {}));
  }
});

// ../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/ral.js
var require_ral = __commonJS({
  "../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/ral.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var _ral;
    function RAL() {
      if (_ral === void 0) {
        throw new Error(`No runtime abstraction layer installed`);
      }
      return _ral;
    }
    (function(RAL2) {
      function install(ral) {
        if (ral === void 0) {
          throw new Error(`No runtime abstraction layer provided`);
        }
        _ral = ral;
      }
      RAL2.install = install;
    })(RAL || (RAL = {}));
    exports2.default = RAL;
  }
});

// ../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/events.js
var require_events = __commonJS({
  "../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/events.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Emitter = exports2.Event = void 0;
    var ral_1 = require_ral();
    var Event;
    (function(Event2) {
      const _disposable = { dispose() {
      } };
      Event2.None = function() {
        return _disposable;
      };
    })(Event || (exports2.Event = Event = {}));
    var CallbackList = class {
      add(callback, context = null, bucket) {
        if (!this._callbacks) {
          this._callbacks = [];
          this._contexts = [];
        }
        this._callbacks.push(callback);
        this._contexts.push(context);
        if (Array.isArray(bucket)) {
          bucket.push({ dispose: () => this.remove(callback, context) });
        }
      }
      remove(callback, context = null) {
        if (!this._callbacks) {
          return;
        }
        let foundCallbackWithDifferentContext = false;
        for (let i = 0, len = this._callbacks.length; i < len; i++) {
          if (this._callbacks[i] === callback) {
            if (this._contexts[i] === context) {
              this._callbacks.splice(i, 1);
              this._contexts.splice(i, 1);
              return;
            } else {
              foundCallbackWithDifferentContext = true;
            }
          }
        }
        if (foundCallbackWithDifferentContext) {
          throw new Error("When adding a listener with a context, you should remove it with the same context");
        }
      }
      invoke(...args) {
        if (!this._callbacks) {
          return [];
        }
        const ret = [], callbacks = this._callbacks.slice(0), contexts = this._contexts.slice(0);
        for (let i = 0, len = callbacks.length; i < len; i++) {
          try {
            ret.push(callbacks[i].apply(contexts[i], args));
          } catch (e) {
            (0, ral_1.default)().console.error(e);
          }
        }
        return ret;
      }
      isEmpty() {
        return !this._callbacks || this._callbacks.length === 0;
      }
      dispose() {
        this._callbacks = void 0;
        this._contexts = void 0;
      }
    };
    var Emitter = class _Emitter {
      constructor(_options) {
        this._options = _options;
      }
      /**
       * For the public to allow to subscribe
       * to events from this Emitter
       */
      get event() {
        if (!this._event) {
          this._event = (listener, thisArgs, disposables) => {
            if (!this._callbacks) {
              this._callbacks = new CallbackList();
            }
            if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty()) {
              this._options.onFirstListenerAdd(this);
            }
            this._callbacks.add(listener, thisArgs);
            const result = {
              dispose: () => {
                if (!this._callbacks) {
                  return;
                }
                this._callbacks.remove(listener, thisArgs);
                result.dispose = _Emitter._noop;
                if (this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty()) {
                  this._options.onLastListenerRemove(this);
                }
              }
            };
            if (Array.isArray(disposables)) {
              disposables.push(result);
            }
            return result;
          };
        }
        return this._event;
      }
      /**
       * To be kept private to fire an event to
       * subscribers
       */
      fire(event) {
        if (this._callbacks) {
          this._callbacks.invoke.call(this._callbacks, event);
        }
      }
      dispose() {
        if (this._callbacks) {
          this._callbacks.dispose();
          this._callbacks = void 0;
        }
      }
    };
    exports2.Emitter = Emitter;
    Emitter._noop = function() {
    };
  }
});

// ../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/cancellation.js
var require_cancellation = __commonJS({
  "../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/cancellation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CancellationTokenSource = exports2.CancellationToken = void 0;
    var ral_1 = require_ral();
    var Is = require_is2();
    var events_1 = require_events();
    var CancellationToken;
    (function(CancellationToken2) {
      CancellationToken2.None = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: events_1.Event.None
      });
      CancellationToken2.Cancelled = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: events_1.Event.None
      });
      function is(value) {
        const candidate = value;
        return candidate && (candidate === CancellationToken2.None || candidate === CancellationToken2.Cancelled || Is.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested);
      }
      CancellationToken2.is = is;
    })(CancellationToken || (exports2.CancellationToken = CancellationToken = {}));
    var shortcutEvent = Object.freeze(function(callback, context) {
      const handle = (0, ral_1.default)().timer.setTimeout(callback.bind(context), 0);
      return { dispose() {
        handle.dispose();
      } };
    });
    var MutableToken = class {
      constructor() {
        this._isCancelled = false;
      }
      cancel() {
        if (!this._isCancelled) {
          this._isCancelled = true;
          if (this._emitter) {
            this._emitter.fire(void 0);
            this.dispose();
          }
        }
      }
      get isCancellationRequested() {
        return this._isCancelled;
      }
      get onCancellationRequested() {
        if (this._isCancelled) {
          return shortcutEvent;
        }
        if (!this._emitter) {
          this._emitter = new events_1.Emitter();
        }
        return this._emitter.event;
      }
      dispose() {
        if (this._emitter) {
          this._emitter.dispose();
          this._emitter = void 0;
        }
      }
    };
    var CancellationTokenSource = class {
      get token() {
        if (!this._token) {
          this._token = new MutableToken();
        }
        return this._token;
      }
      cancel() {
        if (!this._token) {
          this._token = CancellationToken.Cancelled;
        } else {
          this._token.cancel();
        }
      }
      dispose() {
        if (!this._token) {
          this._token = CancellationToken.None;
        } else if (this._token instanceof MutableToken) {
          this._token.dispose();
        }
      }
    };
    exports2.CancellationTokenSource = CancellationTokenSource;
  }
});

// ../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/sharedArrayCancellation.js
var require_sharedArrayCancellation = __commonJS({
  "../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/sharedArrayCancellation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SharedArrayReceiverStrategy = exports2.SharedArraySenderStrategy = void 0;
    var cancellation_1 = require_cancellation();
    var CancellationState;
    (function(CancellationState2) {
      CancellationState2.Continue = 0;
      CancellationState2.Cancelled = 1;
    })(CancellationState || (CancellationState = {}));
    var SharedArraySenderStrategy = class {
      constructor() {
        this.buffers = /* @__PURE__ */ new Map();
      }
      enableCancellation(request) {
        if (request.id === null) {
          return;
        }
        const buffer = new SharedArrayBuffer(4);
        const data = new Int32Array(buffer, 0, 1);
        data[0] = CancellationState.Continue;
        this.buffers.set(request.id, buffer);
        request.$cancellationData = buffer;
      }
      async sendCancellation(_conn, id) {
        const buffer = this.buffers.get(id);
        if (buffer === void 0) {
          return;
        }
        const data = new Int32Array(buffer, 0, 1);
        Atomics.store(data, 0, CancellationState.Cancelled);
      }
      cleanup(id) {
        this.buffers.delete(id);
      }
      dispose() {
        this.buffers.clear();
      }
    };
    exports2.SharedArraySenderStrategy = SharedArraySenderStrategy;
    var SharedArrayBufferCancellationToken = class {
      constructor(buffer) {
        this.data = new Int32Array(buffer, 0, 1);
      }
      get isCancellationRequested() {
        return Atomics.load(this.data, 0) === CancellationState.Cancelled;
      }
      get onCancellationRequested() {
        throw new Error(`Cancellation over SharedArrayBuffer doesn't support cancellation events`);
      }
    };
    var SharedArrayBufferCancellationTokenSource = class {
      constructor(buffer) {
        this.token = new SharedArrayBufferCancellationToken(buffer);
      }
      cancel() {
      }
      dispose() {
      }
    };
    var SharedArrayReceiverStrategy = class {
      constructor() {
        this.kind = "request";
      }
      createCancellationTokenSource(request) {
        const buffer = request.$cancellationData;
        if (buffer === void 0) {
          return new cancellation_1.CancellationTokenSource();
        }
        return new SharedArrayBufferCancellationTokenSource(buffer);
      }
    };
    exports2.SharedArrayReceiverStrategy = SharedArrayReceiverStrategy;
  }
});

// ../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/semaphore.js
var require_semaphore = __commonJS({
  "../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/semaphore.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Semaphore = void 0;
    var ral_1 = require_ral();
    var Semaphore = class {
      constructor(capacity = 1) {
        if (capacity <= 0) {
          throw new Error("Capacity must be greater than 0");
        }
        this._capacity = capacity;
        this._active = 0;
        this._waiting = [];
      }
      lock(thunk) {
        return new Promise((resolve, reject) => {
          this._waiting.push({ thunk, resolve, reject });
          this.runNext();
        });
      }
      get active() {
        return this._active;
      }
      runNext() {
        if (this._waiting.length === 0 || this._active === this._capacity) {
          return;
        }
        (0, ral_1.default)().timer.setImmediate(() => this.doRunNext());
      }
      doRunNext() {
        if (this._waiting.length === 0 || this._active === this._capacity) {
          return;
        }
        const next = this._waiting.shift();
        this._active++;
        if (this._active > this._capacity) {
          throw new Error(`To many thunks active`);
        }
        try {
          const result = next.thunk();
          if (result instanceof Promise) {
            result.then((value) => {
              this._active--;
              next.resolve(value);
              this.runNext();
            }, (err) => {
              this._active--;
              next.reject(err);
              this.runNext();
            });
          } else {
            this._active--;
            next.resolve(result);
            this.runNext();
          }
        } catch (err) {
          this._active--;
          next.reject(err);
          this.runNext();
        }
      }
    };
    exports2.Semaphore = Semaphore;
  }
});

// ../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/messageReader.js
var require_messageReader = __commonJS({
  "../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/messageReader.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReadableStreamMessageReader = exports2.AbstractMessageReader = exports2.MessageReader = void 0;
    var ral_1 = require_ral();
    var Is = require_is2();
    var events_1 = require_events();
    var semaphore_1 = require_semaphore();
    var MessageReader;
    (function(MessageReader2) {
      function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.listen) && Is.func(candidate.dispose) && Is.func(candidate.onError) && Is.func(candidate.onClose) && Is.func(candidate.onPartialMessage);
      }
      MessageReader2.is = is;
    })(MessageReader || (exports2.MessageReader = MessageReader = {}));
    var AbstractMessageReader = class {
      constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
        this.partialMessageEmitter = new events_1.Emitter();
      }
      dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
      }
      get onError() {
        return this.errorEmitter.event;
      }
      fireError(error) {
        this.errorEmitter.fire(this.asError(error));
      }
      get onClose() {
        return this.closeEmitter.event;
      }
      fireClose() {
        this.closeEmitter.fire(void 0);
      }
      get onPartialMessage() {
        return this.partialMessageEmitter.event;
      }
      firePartialMessage(info) {
        this.partialMessageEmitter.fire(info);
      }
      asError(error) {
        if (error instanceof Error) {
          return error;
        } else {
          return new Error(`Reader received error. Reason: ${Is.string(error.message) ? error.message : "unknown"}`);
        }
      }
    };
    exports2.AbstractMessageReader = AbstractMessageReader;
    var ResolvedMessageReaderOptions;
    (function(ResolvedMessageReaderOptions2) {
      function fromOptions(options) {
        let charset;
        let result;
        let contentDecoder;
        const contentDecoders = /* @__PURE__ */ new Map();
        let contentTypeDecoder;
        const contentTypeDecoders = /* @__PURE__ */ new Map();
        if (options === void 0 || typeof options === "string") {
          charset = options ?? "utf-8";
        } else {
          charset = options.charset ?? "utf-8";
          if (options.contentDecoder !== void 0) {
            contentDecoder = options.contentDecoder;
            contentDecoders.set(contentDecoder.name, contentDecoder);
          }
          if (options.contentDecoders !== void 0) {
            for (const decoder of options.contentDecoders) {
              contentDecoders.set(decoder.name, decoder);
            }
          }
          if (options.contentTypeDecoder !== void 0) {
            contentTypeDecoder = options.contentTypeDecoder;
            contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
          }
          if (options.contentTypeDecoders !== void 0) {
            for (const decoder of options.contentTypeDecoders) {
              contentTypeDecoders.set(decoder.name, decoder);
            }
          }
        }
        if (contentTypeDecoder === void 0) {
          contentTypeDecoder = (0, ral_1.default)().applicationJson.decoder;
          contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
        }
        return { charset, contentDecoder, contentDecoders, contentTypeDecoder, contentTypeDecoders };
      }
      ResolvedMessageReaderOptions2.fromOptions = fromOptions;
    })(ResolvedMessageReaderOptions || (ResolvedMessageReaderOptions = {}));
    var ReadableStreamMessageReader = class extends AbstractMessageReader {
      constructor(readable, options) {
        super();
        this.readable = readable;
        this.options = ResolvedMessageReaderOptions.fromOptions(options);
        this.buffer = (0, ral_1.default)().messageBuffer.create(this.options.charset);
        this._partialMessageTimeout = 1e4;
        this.nextMessageLength = -1;
        this.messageToken = 0;
        this.readSemaphore = new semaphore_1.Semaphore(1);
      }
      set partialMessageTimeout(timeout) {
        this._partialMessageTimeout = timeout;
      }
      get partialMessageTimeout() {
        return this._partialMessageTimeout;
      }
      listen(callback) {
        this.nextMessageLength = -1;
        this.messageToken = 0;
        this.partialMessageTimer = void 0;
        this.callback = callback;
        const result = this.readable.onData((data) => {
          this.onData(data);
        });
        this.readable.onError((error) => this.fireError(error));
        this.readable.onClose(() => this.fireClose());
        return result;
      }
      onData(data) {
        try {
          this.buffer.append(data);
          while (true) {
            if (this.nextMessageLength === -1) {
              const headers = this.buffer.tryReadHeaders(true);
              if (!headers) {
                return;
              }
              const contentLength = headers.get("content-length");
              if (!contentLength) {
                this.fireError(new Error(`Header must provide a Content-Length property.
${JSON.stringify(Object.fromEntries(headers))}`));
                return;
              }
              const length = parseInt(contentLength);
              if (isNaN(length)) {
                this.fireError(new Error(`Content-Length value must be a number. Got ${contentLength}`));
                return;
              }
              this.nextMessageLength = length;
            }
            const body = this.buffer.tryReadBody(this.nextMessageLength);
            if (body === void 0) {
              this.setPartialMessageTimer();
              return;
            }
            this.clearPartialMessageTimer();
            this.nextMessageLength = -1;
            this.readSemaphore.lock(async () => {
              const bytes = this.options.contentDecoder !== void 0 ? await this.options.contentDecoder.decode(body) : body;
              const message = await this.options.contentTypeDecoder.decode(bytes, this.options);
              this.callback(message);
            }).catch((error) => {
              this.fireError(error);
            });
          }
        } catch (error) {
          this.fireError(error);
        }
      }
      clearPartialMessageTimer() {
        if (this.partialMessageTimer) {
          this.partialMessageTimer.dispose();
          this.partialMessageTimer = void 0;
        }
      }
      setPartialMessageTimer() {
        this.clearPartialMessageTimer();
        if (this._partialMessageTimeout <= 0) {
          return;
        }
        this.partialMessageTimer = (0, ral_1.default)().timer.setTimeout((token, timeout) => {
          this.partialMessageTimer = void 0;
          if (token === this.messageToken) {
            this.firePartialMessage({ messageToken: token, waitingTime: timeout });
            this.setPartialMessageTimer();
          }
        }, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout);
      }
    };
    exports2.ReadableStreamMessageReader = ReadableStreamMessageReader;
  }
});

// ../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/messageWriter.js
var require_messageWriter = __commonJS({
  "../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/messageWriter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WriteableStreamMessageWriter = exports2.AbstractMessageWriter = exports2.MessageWriter = void 0;
    var ral_1 = require_ral();
    var Is = require_is2();
    var semaphore_1 = require_semaphore();
    var events_1 = require_events();
    var ContentLength = "Content-Length: ";
    var CRLF = "\r\n";
    var MessageWriter;
    (function(MessageWriter2) {
      function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.dispose) && Is.func(candidate.onClose) && Is.func(candidate.onError) && Is.func(candidate.write);
      }
      MessageWriter2.is = is;
    })(MessageWriter || (exports2.MessageWriter = MessageWriter = {}));
    var AbstractMessageWriter = class {
      constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
      }
      dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
      }
      get onError() {
        return this.errorEmitter.event;
      }
      fireError(error, message, count) {
        this.errorEmitter.fire([this.asError(error), message, count]);
      }
      get onClose() {
        return this.closeEmitter.event;
      }
      fireClose() {
        this.closeEmitter.fire(void 0);
      }
      asError(error) {
        if (error instanceof Error) {
          return error;
        } else {
          return new Error(`Writer received error. Reason: ${Is.string(error.message) ? error.message : "unknown"}`);
        }
      }
    };
    exports2.AbstractMessageWriter = AbstractMessageWriter;
    var ResolvedMessageWriterOptions;
    (function(ResolvedMessageWriterOptions2) {
      function fromOptions(options) {
        if (options === void 0 || typeof options === "string") {
          return { charset: options ?? "utf-8", contentTypeEncoder: (0, ral_1.default)().applicationJson.encoder };
        } else {
          return { charset: options.charset ?? "utf-8", contentEncoder: options.contentEncoder, contentTypeEncoder: options.contentTypeEncoder ?? (0, ral_1.default)().applicationJson.encoder };
        }
      }
      ResolvedMessageWriterOptions2.fromOptions = fromOptions;
    })(ResolvedMessageWriterOptions || (ResolvedMessageWriterOptions = {}));
    var WriteableStreamMessageWriter = class extends AbstractMessageWriter {
      constructor(writable, options) {
        super();
        this.writable = writable;
        this.options = ResolvedMessageWriterOptions.fromOptions(options);
        this.errorCount = 0;
        this.writeSemaphore = new semaphore_1.Semaphore(1);
        this.writable.onError((error) => this.fireError(error));
        this.writable.onClose(() => this.fireClose());
      }
      async write(msg) {
        return this.writeSemaphore.lock(async () => {
          const payload = this.options.contentTypeEncoder.encode(msg, this.options).then((buffer) => {
            if (this.options.contentEncoder !== void 0) {
              return this.options.contentEncoder.encode(buffer);
            } else {
              return buffer;
            }
          });
          return payload.then((buffer) => {
            const headers = [];
            headers.push(ContentLength, buffer.byteLength.toString(), CRLF);
            headers.push(CRLF);
            return this.doWrite(msg, headers, buffer);
          }, (error) => {
            this.fireError(error);
            throw error;
          });
        });
      }
      async doWrite(msg, headers, data) {
        try {
          await this.writable.write(headers.join(""), "ascii");
          return this.writable.write(data);
        } catch (error) {
          this.handleError(error, msg);
          return Promise.reject(error);
        }
      }
      handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
      }
      end() {
        this.writable.end();
      }
    };
    exports2.WriteableStreamMessageWriter = WriteableStreamMessageWriter;
  }
});

// ../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/messageBuffer.js
var require_messageBuffer = __commonJS({
  "../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/messageBuffer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AbstractMessageBuffer = void 0;
    var CR = 13;
    var LF = 10;
    var CRLF = "\r\n";
    var AbstractMessageBuffer = class {
      constructor(encoding = "utf-8") {
        this._encoding = encoding;
        this._chunks = [];
        this._totalLength = 0;
      }
      get encoding() {
        return this._encoding;
      }
      append(chunk) {
        const toAppend = typeof chunk === "string" ? this.fromString(chunk, this._encoding) : chunk;
        this._chunks.push(toAppend);
        this._totalLength += toAppend.byteLength;
      }
      tryReadHeaders(lowerCaseKeys = false) {
        if (this._chunks.length === 0) {
          return void 0;
        }
        let state = 0;
        let chunkIndex = 0;
        let offset = 0;
        let chunkBytesRead = 0;
        row: while (chunkIndex < this._chunks.length) {
          const chunk = this._chunks[chunkIndex];
          offset = 0;
          column: while (offset < chunk.length) {
            const value = chunk[offset];
            switch (value) {
              case CR:
                switch (state) {
                  case 0:
                    state = 1;
                    break;
                  case 2:
                    state = 3;
                    break;
                  default:
                    state = 0;
                }
                break;
              case LF:
                switch (state) {
                  case 1:
                    state = 2;
                    break;
                  case 3:
                    state = 4;
                    offset++;
                    break row;
                  default:
                    state = 0;
                }
                break;
              default:
                state = 0;
            }
            offset++;
          }
          chunkBytesRead += chunk.byteLength;
          chunkIndex++;
        }
        if (state !== 4) {
          return void 0;
        }
        const buffer = this._read(chunkBytesRead + offset);
        const result = /* @__PURE__ */ new Map();
        const headers = this.toString(buffer, "ascii").split(CRLF);
        if (headers.length < 2) {
          return result;
        }
        for (let i = 0; i < headers.length - 2; i++) {
          const header = headers[i];
          const index = header.indexOf(":");
          if (index === -1) {
            throw new Error(`Message header must separate key and value using ':'
${header}`);
          }
          const key = header.substr(0, index);
          const value = header.substr(index + 1).trim();
          result.set(lowerCaseKeys ? key.toLowerCase() : key, value);
        }
        return result;
      }
      tryReadBody(length) {
        if (this._totalLength < length) {
          return void 0;
        }
        return this._read(length);
      }
      get numberOfBytes() {
        return this._totalLength;
      }
      _read(byteCount) {
        if (byteCount === 0) {
          return this.emptyBuffer();
        }
        if (byteCount > this._totalLength) {
          throw new Error(`Cannot read so many bytes!`);
        }
        if (this._chunks[0].byteLength === byteCount) {
          const chunk = this._chunks[0];
          this._chunks.shift();
          this._totalLength -= byteCount;
          return this.asNative(chunk);
        }
        if (this._chunks[0].byteLength > byteCount) {
          const chunk = this._chunks[0];
          const result2 = this.asNative(chunk, byteCount);
          this._chunks[0] = chunk.slice(byteCount);
          this._totalLength -= byteCount;
          return result2;
        }
        const result = this.allocNative(byteCount);
        let resultOffset = 0;
        let chunkIndex = 0;
        while (byteCount > 0) {
          const chunk = this._chunks[chunkIndex];
          if (chunk.byteLength > byteCount) {
            const chunkPart = chunk.slice(0, byteCount);
            result.set(chunkPart, resultOffset);
            resultOffset += byteCount;
            this._chunks[chunkIndex] = chunk.slice(byteCount);
            this._totalLength -= byteCount;
            byteCount -= byteCount;
          } else {
            result.set(chunk, resultOffset);
            resultOffset += chunk.byteLength;
            this._chunks.shift();
            this._totalLength -= chunk.byteLength;
            byteCount -= chunk.byteLength;
          }
        }
        return result;
      }
    };
    exports2.AbstractMessageBuffer = AbstractMessageBuffer;
  }
});

// ../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/connection.js
var require_connection = __commonJS({
  "../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/connection.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createMessageConnection = exports2.ConnectionOptions = exports2.MessageStrategy = exports2.CancellationStrategy = exports2.CancellationSenderStrategy = exports2.CancellationReceiverStrategy = exports2.RequestCancellationReceiverStrategy = exports2.IdCancellationReceiverStrategy = exports2.ConnectionStrategy = exports2.ConnectionError = exports2.ConnectionErrors = exports2.LogTraceNotification = exports2.SetTraceNotification = exports2.TraceFormat = exports2.TraceValues = exports2.Trace = exports2.NullLogger = exports2.ProgressType = exports2.ProgressToken = void 0;
    var ral_1 = require_ral();
    var Is = require_is2();
    var messages_1 = require_messages();
    var linkedMap_1 = require_linkedMap();
    var events_1 = require_events();
    var cancellation_1 = require_cancellation();
    var CancelNotification;
    (function(CancelNotification2) {
      CancelNotification2.type = new messages_1.NotificationType("$/cancelRequest");
    })(CancelNotification || (CancelNotification = {}));
    var ProgressToken;
    (function(ProgressToken2) {
      function is(value) {
        return typeof value === "string" || typeof value === "number";
      }
      ProgressToken2.is = is;
    })(ProgressToken || (exports2.ProgressToken = ProgressToken = {}));
    var ProgressNotification;
    (function(ProgressNotification2) {
      ProgressNotification2.type = new messages_1.NotificationType("$/progress");
    })(ProgressNotification || (ProgressNotification = {}));
    var ProgressType = class {
      constructor() {
      }
    };
    exports2.ProgressType = ProgressType;
    var StarRequestHandler;
    (function(StarRequestHandler2) {
      function is(value) {
        return Is.func(value);
      }
      StarRequestHandler2.is = is;
    })(StarRequestHandler || (StarRequestHandler = {}));
    exports2.NullLogger = Object.freeze({
      error: () => {
      },
      warn: () => {
      },
      info: () => {
      },
      log: () => {
      }
    });
    var Trace;
    (function(Trace2) {
      Trace2[Trace2["Off"] = 0] = "Off";
      Trace2[Trace2["Messages"] = 1] = "Messages";
      Trace2[Trace2["Compact"] = 2] = "Compact";
      Trace2[Trace2["Verbose"] = 3] = "Verbose";
    })(Trace || (exports2.Trace = Trace = {}));
    var TraceValues;
    (function(TraceValues2) {
      TraceValues2.Off = "off";
      TraceValues2.Messages = "messages";
      TraceValues2.Compact = "compact";
      TraceValues2.Verbose = "verbose";
    })(TraceValues || (exports2.TraceValues = TraceValues = {}));
    (function(Trace2) {
      function fromString(value) {
        if (!Is.string(value)) {
          return Trace2.Off;
        }
        value = value.toLowerCase();
        switch (value) {
          case "off":
            return Trace2.Off;
          case "messages":
            return Trace2.Messages;
          case "compact":
            return Trace2.Compact;
          case "verbose":
            return Trace2.Verbose;
          default:
            return Trace2.Off;
        }
      }
      Trace2.fromString = fromString;
      function toString(value) {
        switch (value) {
          case Trace2.Off:
            return "off";
          case Trace2.Messages:
            return "messages";
          case Trace2.Compact:
            return "compact";
          case Trace2.Verbose:
            return "verbose";
          default:
            return "off";
        }
      }
      Trace2.toString = toString;
    })(Trace || (exports2.Trace = Trace = {}));
    var TraceFormat;
    (function(TraceFormat2) {
      TraceFormat2["Text"] = "text";
      TraceFormat2["JSON"] = "json";
    })(TraceFormat || (exports2.TraceFormat = TraceFormat = {}));
    (function(TraceFormat2) {
      function fromString(value) {
        if (!Is.string(value)) {
          return TraceFormat2.Text;
        }
        value = value.toLowerCase();
        if (value === "json") {
          return TraceFormat2.JSON;
        } else {
          return TraceFormat2.Text;
        }
      }
      TraceFormat2.fromString = fromString;
    })(TraceFormat || (exports2.TraceFormat = TraceFormat = {}));
    var SetTraceNotification;
    (function(SetTraceNotification2) {
      SetTraceNotification2.type = new messages_1.NotificationType("$/setTrace");
    })(SetTraceNotification || (exports2.SetTraceNotification = SetTraceNotification = {}));
    var LogTraceNotification;
    (function(LogTraceNotification2) {
      LogTraceNotification2.type = new messages_1.NotificationType("$/logTrace");
    })(LogTraceNotification || (exports2.LogTraceNotification = LogTraceNotification = {}));
    var ConnectionErrors;
    (function(ConnectionErrors2) {
      ConnectionErrors2[ConnectionErrors2["Closed"] = 1] = "Closed";
      ConnectionErrors2[ConnectionErrors2["Disposed"] = 2] = "Disposed";
      ConnectionErrors2[ConnectionErrors2["AlreadyListening"] = 3] = "AlreadyListening";
    })(ConnectionErrors || (exports2.ConnectionErrors = ConnectionErrors = {}));
    var ConnectionError = class _ConnectionError extends Error {
      constructor(code, message) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, _ConnectionError.prototype);
      }
    };
    exports2.ConnectionError = ConnectionError;
    var ConnectionStrategy;
    (function(ConnectionStrategy2) {
      function is(value) {
        const candidate = value;
        return candidate && Is.func(candidate.cancelUndispatched);
      }
      ConnectionStrategy2.is = is;
    })(ConnectionStrategy || (exports2.ConnectionStrategy = ConnectionStrategy = {}));
    var IdCancellationReceiverStrategy;
    (function(IdCancellationReceiverStrategy2) {
      function is(value) {
        const candidate = value;
        return candidate && (candidate.kind === void 0 || candidate.kind === "id") && Is.func(candidate.createCancellationTokenSource) && (candidate.dispose === void 0 || Is.func(candidate.dispose));
      }
      IdCancellationReceiverStrategy2.is = is;
    })(IdCancellationReceiverStrategy || (exports2.IdCancellationReceiverStrategy = IdCancellationReceiverStrategy = {}));
    var RequestCancellationReceiverStrategy;
    (function(RequestCancellationReceiverStrategy2) {
      function is(value) {
        const candidate = value;
        return candidate && candidate.kind === "request" && Is.func(candidate.createCancellationTokenSource) && (candidate.dispose === void 0 || Is.func(candidate.dispose));
      }
      RequestCancellationReceiverStrategy2.is = is;
    })(RequestCancellationReceiverStrategy || (exports2.RequestCancellationReceiverStrategy = RequestCancellationReceiverStrategy = {}));
    var CancellationReceiverStrategy;
    (function(CancellationReceiverStrategy2) {
      CancellationReceiverStrategy2.Message = Object.freeze({
        createCancellationTokenSource(_) {
          return new cancellation_1.CancellationTokenSource();
        }
      });
      function is(value) {
        return IdCancellationReceiverStrategy.is(value) || RequestCancellationReceiverStrategy.is(value);
      }
      CancellationReceiverStrategy2.is = is;
    })(CancellationReceiverStrategy || (exports2.CancellationReceiverStrategy = CancellationReceiverStrategy = {}));
    var CancellationSenderStrategy;
    (function(CancellationSenderStrategy2) {
      CancellationSenderStrategy2.Message = Object.freeze({
        sendCancellation(conn, id) {
          return conn.sendNotification(CancelNotification.type, { id });
        },
        cleanup(_) {
        }
      });
      function is(value) {
        const candidate = value;
        return candidate && Is.func(candidate.sendCancellation) && Is.func(candidate.cleanup);
      }
      CancellationSenderStrategy2.is = is;
    })(CancellationSenderStrategy || (exports2.CancellationSenderStrategy = CancellationSenderStrategy = {}));
    var CancellationStrategy;
    (function(CancellationStrategy2) {
      CancellationStrategy2.Message = Object.freeze({
        receiver: CancellationReceiverStrategy.Message,
        sender: CancellationSenderStrategy.Message
      });
      function is(value) {
        const candidate = value;
        return candidate && CancellationReceiverStrategy.is(candidate.receiver) && CancellationSenderStrategy.is(candidate.sender);
      }
      CancellationStrategy2.is = is;
    })(CancellationStrategy || (exports2.CancellationStrategy = CancellationStrategy = {}));
    var MessageStrategy;
    (function(MessageStrategy2) {
      function is(value) {
        const candidate = value;
        return candidate && Is.func(candidate.handleMessage);
      }
      MessageStrategy2.is = is;
    })(MessageStrategy || (exports2.MessageStrategy = MessageStrategy = {}));
    var ConnectionOptions;
    (function(ConnectionOptions2) {
      function is(value) {
        const candidate = value;
        return candidate && (CancellationStrategy.is(candidate.cancellationStrategy) || ConnectionStrategy.is(candidate.connectionStrategy) || MessageStrategy.is(candidate.messageStrategy));
      }
      ConnectionOptions2.is = is;
    })(ConnectionOptions || (exports2.ConnectionOptions = ConnectionOptions = {}));
    var ConnectionState;
    (function(ConnectionState2) {
      ConnectionState2[ConnectionState2["New"] = 1] = "New";
      ConnectionState2[ConnectionState2["Listening"] = 2] = "Listening";
      ConnectionState2[ConnectionState2["Closed"] = 3] = "Closed";
      ConnectionState2[ConnectionState2["Disposed"] = 4] = "Disposed";
    })(ConnectionState || (ConnectionState = {}));
    function createMessageConnection(messageReader, messageWriter, _logger, options) {
      const logger = _logger !== void 0 ? _logger : exports2.NullLogger;
      let sequenceNumber = 0;
      let notificationSequenceNumber = 0;
      let unknownResponseSequenceNumber = 0;
      const version = "2.0";
      let starRequestHandler = void 0;
      const requestHandlers = /* @__PURE__ */ new Map();
      let starNotificationHandler = void 0;
      const notificationHandlers = /* @__PURE__ */ new Map();
      const progressHandlers = /* @__PURE__ */ new Map();
      let timer;
      let messageQueue = new linkedMap_1.LinkedMap();
      let responsePromises = /* @__PURE__ */ new Map();
      let knownCanceledRequests = /* @__PURE__ */ new Set();
      let requestTokens = /* @__PURE__ */ new Map();
      let trace = Trace.Off;
      let traceFormat = TraceFormat.Text;
      let tracer;
      let state = ConnectionState.New;
      const errorEmitter = new events_1.Emitter();
      const closeEmitter = new events_1.Emitter();
      const unhandledNotificationEmitter = new events_1.Emitter();
      const unhandledProgressEmitter = new events_1.Emitter();
      const disposeEmitter = new events_1.Emitter();
      const cancellationStrategy = options && options.cancellationStrategy ? options.cancellationStrategy : CancellationStrategy.Message;
      function createRequestQueueKey(id) {
        if (id === null) {
          throw new Error(`Can't send requests with id null since the response can't be correlated.`);
        }
        return "req-" + id.toString();
      }
      function createResponseQueueKey(id) {
        if (id === null) {
          return "res-unknown-" + (++unknownResponseSequenceNumber).toString();
        } else {
          return "res-" + id.toString();
        }
      }
      function createNotificationQueueKey() {
        return "not-" + (++notificationSequenceNumber).toString();
      }
      function addMessageToQueue(queue, message) {
        if (messages_1.Message.isRequest(message)) {
          queue.set(createRequestQueueKey(message.id), message);
        } else if (messages_1.Message.isResponse(message)) {
          queue.set(createResponseQueueKey(message.id), message);
        } else {
          queue.set(createNotificationQueueKey(), message);
        }
      }
      function cancelUndispatched(_message) {
        return void 0;
      }
      function isListening() {
        return state === ConnectionState.Listening;
      }
      function isClosed() {
        return state === ConnectionState.Closed;
      }
      function isDisposed() {
        return state === ConnectionState.Disposed;
      }
      function closeHandler() {
        if (state === ConnectionState.New || state === ConnectionState.Listening) {
          state = ConnectionState.Closed;
          closeEmitter.fire(void 0);
        }
      }
      function readErrorHandler(error) {
        errorEmitter.fire([error, void 0, void 0]);
      }
      function writeErrorHandler(data) {
        errorEmitter.fire(data);
      }
      messageReader.onClose(closeHandler);
      messageReader.onError(readErrorHandler);
      messageWriter.onClose(closeHandler);
      messageWriter.onError(writeErrorHandler);
      function triggerMessageQueue() {
        if (timer || messageQueue.size === 0) {
          return;
        }
        timer = (0, ral_1.default)().timer.setImmediate(() => {
          timer = void 0;
          processMessageQueue();
        });
      }
      function handleMessage(message) {
        if (messages_1.Message.isRequest(message)) {
          handleRequest(message);
        } else if (messages_1.Message.isNotification(message)) {
          handleNotification(message);
        } else if (messages_1.Message.isResponse(message)) {
          handleResponse(message);
        } else {
          handleInvalidMessage(message);
        }
      }
      function processMessageQueue() {
        if (messageQueue.size === 0) {
          return;
        }
        const message = messageQueue.shift();
        try {
          const messageStrategy = options?.messageStrategy;
          if (MessageStrategy.is(messageStrategy)) {
            messageStrategy.handleMessage(message, handleMessage);
          } else {
            handleMessage(message);
          }
        } finally {
          triggerMessageQueue();
        }
      }
      const callback = (message) => {
        try {
          if (messages_1.Message.isNotification(message) && message.method === CancelNotification.type.method) {
            const cancelId = message.params.id;
            const key = createRequestQueueKey(cancelId);
            const toCancel = messageQueue.get(key);
            if (messages_1.Message.isRequest(toCancel)) {
              const strategy = options?.connectionStrategy;
              const response = strategy && strategy.cancelUndispatched ? strategy.cancelUndispatched(toCancel, cancelUndispatched) : cancelUndispatched(toCancel);
              if (response && (response.error !== void 0 || response.result !== void 0)) {
                messageQueue.delete(key);
                requestTokens.delete(cancelId);
                response.id = toCancel.id;
                traceSendingResponse(response, message.method, Date.now());
                messageWriter.write(response).catch(() => logger.error(`Sending response for canceled message failed.`));
                return;
              }
            }
            const cancellationToken = requestTokens.get(cancelId);
            if (cancellationToken !== void 0) {
              cancellationToken.cancel();
              traceReceivedNotification(message);
              return;
            } else {
              knownCanceledRequests.add(cancelId);
            }
          }
          addMessageToQueue(messageQueue, message);
        } finally {
          triggerMessageQueue();
        }
      };
      function handleRequest(requestMessage) {
        if (isDisposed()) {
          return;
        }
        function reply(resultOrError, method, startTime2) {
          const message = {
            jsonrpc: version,
            id: requestMessage.id
          };
          if (resultOrError instanceof messages_1.ResponseError) {
            message.error = resultOrError.toJson();
          } else {
            message.result = resultOrError === void 0 ? null : resultOrError;
          }
          traceSendingResponse(message, method, startTime2);
          messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
        }
        function replyError(error, method, startTime2) {
          const message = {
            jsonrpc: version,
            id: requestMessage.id,
            error: error.toJson()
          };
          traceSendingResponse(message, method, startTime2);
          messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
        }
        function replySuccess(result, method, startTime2) {
          if (result === void 0) {
            result = null;
          }
          const message = {
            jsonrpc: version,
            id: requestMessage.id,
            result
          };
          traceSendingResponse(message, method, startTime2);
          messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
        }
        traceReceivedRequest(requestMessage);
        const element = requestHandlers.get(requestMessage.method);
        let type;
        let requestHandler;
        if (element) {
          type = element.type;
          requestHandler = element.handler;
        }
        const startTime = Date.now();
        if (requestHandler || starRequestHandler) {
          const tokenKey = requestMessage.id ?? String(Date.now());
          const cancellationSource = IdCancellationReceiverStrategy.is(cancellationStrategy.receiver) ? cancellationStrategy.receiver.createCancellationTokenSource(tokenKey) : cancellationStrategy.receiver.createCancellationTokenSource(requestMessage);
          if (requestMessage.id !== null && knownCanceledRequests.has(requestMessage.id)) {
            cancellationSource.cancel();
          }
          if (requestMessage.id !== null) {
            requestTokens.set(tokenKey, cancellationSource);
          }
          try {
            let handlerResult;
            if (requestHandler) {
              if (requestMessage.params === void 0) {
                if (type !== void 0 && type.numberOfParams !== 0) {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines ${type.numberOfParams} params but received none.`), requestMessage.method, startTime);
                  return;
                }
                handlerResult = requestHandler(cancellationSource.token);
              } else if (Array.isArray(requestMessage.params)) {
                if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byName) {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by name but received parameters by position`), requestMessage.method, startTime);
                  return;
                }
                handlerResult = requestHandler(...requestMessage.params, cancellationSource.token);
              } else {
                if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by position but received parameters by name`), requestMessage.method, startTime);
                  return;
                }
                handlerResult = requestHandler(requestMessage.params, cancellationSource.token);
              }
            } else if (starRequestHandler) {
              handlerResult = starRequestHandler(requestMessage.method, requestMessage.params, cancellationSource.token);
            }
            const promise = handlerResult;
            if (!handlerResult) {
              requestTokens.delete(tokenKey);
              replySuccess(handlerResult, requestMessage.method, startTime);
            } else if (promise.then) {
              promise.then((resultOrError) => {
                requestTokens.delete(tokenKey);
                reply(resultOrError, requestMessage.method, startTime);
              }, (error) => {
                requestTokens.delete(tokenKey);
                if (error instanceof messages_1.ResponseError) {
                  replyError(error, requestMessage.method, startTime);
                } else if (error && Is.string(error.message)) {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                } else {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                }
              });
            } else {
              requestTokens.delete(tokenKey);
              reply(handlerResult, requestMessage.method, startTime);
            }
          } catch (error) {
            requestTokens.delete(tokenKey);
            if (error instanceof messages_1.ResponseError) {
              reply(error, requestMessage.method, startTime);
            } else if (error && Is.string(error.message)) {
              replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
            } else {
              replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
            }
          }
        } else {
          replyError(new messages_1.ResponseError(messages_1.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`), requestMessage.method, startTime);
        }
      }
      function handleResponse(responseMessage) {
        if (isDisposed()) {
          return;
        }
        if (responseMessage.id === null) {
          if (responseMessage.error) {
            logger.error(`Received response message without id: Error is: 
${JSON.stringify(responseMessage.error, void 0, 4)}`);
          } else {
            logger.error(`Received response message without id. No further error information provided.`);
          }
        } else {
          const key = responseMessage.id;
          const responsePromise = responsePromises.get(key);
          traceReceivedResponse(responseMessage, responsePromise);
          if (responsePromise !== void 0) {
            responsePromises.delete(key);
            try {
              if (responseMessage.error) {
                const error = responseMessage.error;
                responsePromise.reject(new messages_1.ResponseError(error.code, error.message, error.data));
              } else if (responseMessage.result !== void 0) {
                responsePromise.resolve(responseMessage.result);
              } else {
                throw new Error("Should never happen.");
              }
            } catch (error) {
              if (error.message) {
                logger.error(`Response handler '${responsePromise.method}' failed with message: ${error.message}`);
              } else {
                logger.error(`Response handler '${responsePromise.method}' failed unexpectedly.`);
              }
            }
          }
        }
      }
      function handleNotification(message) {
        if (isDisposed()) {
          return;
        }
        let type = void 0;
        let notificationHandler;
        if (message.method === CancelNotification.type.method) {
          const cancelId = message.params.id;
          knownCanceledRequests.delete(cancelId);
          traceReceivedNotification(message);
          return;
        } else {
          const element = notificationHandlers.get(message.method);
          if (element) {
            notificationHandler = element.handler;
            type = element.type;
          }
        }
        if (notificationHandler || starNotificationHandler) {
          try {
            traceReceivedNotification(message);
            if (notificationHandler) {
              if (message.params === void 0) {
                if (type !== void 0) {
                  if (type.numberOfParams !== 0 && type.parameterStructures !== messages_1.ParameterStructures.byName) {
                    logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received none.`);
                  }
                }
                notificationHandler();
              } else if (Array.isArray(message.params)) {
                const params = message.params;
                if (message.method === ProgressNotification.type.method && params.length === 2 && ProgressToken.is(params[0])) {
                  notificationHandler({ token: params[0], value: params[1] });
                } else {
                  if (type !== void 0) {
                    if (type.parameterStructures === messages_1.ParameterStructures.byName) {
                      logger.error(`Notification ${message.method} defines parameters by name but received parameters by position`);
                    }
                    if (type.numberOfParams !== message.params.length) {
                      logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received ${params.length} arguments`);
                    }
                  }
                  notificationHandler(...params);
                }
              } else {
                if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                  logger.error(`Notification ${message.method} defines parameters by position but received parameters by name`);
                }
                notificationHandler(message.params);
              }
            } else if (starNotificationHandler) {
              starNotificationHandler(message.method, message.params);
            }
          } catch (error) {
            if (error.message) {
              logger.error(`Notification handler '${message.method}' failed with message: ${error.message}`);
            } else {
              logger.error(`Notification handler '${message.method}' failed unexpectedly.`);
            }
          }
        } else {
          unhandledNotificationEmitter.fire(message);
        }
      }
      function handleInvalidMessage(message) {
        if (!message) {
          logger.error("Received empty message.");
          return;
        }
        logger.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(message, null, 4)}`);
        const responseMessage = message;
        if (Is.string(responseMessage.id) || Is.number(responseMessage.id)) {
          const key = responseMessage.id;
          const responseHandler = responsePromises.get(key);
          if (responseHandler) {
            responseHandler.reject(new Error("The received response has neither a result nor an error property."));
          }
        }
      }
      function stringifyTrace(params) {
        if (params === void 0 || params === null) {
          return void 0;
        }
        switch (trace) {
          case Trace.Verbose:
            return JSON.stringify(params, null, 4);
          case Trace.Compact:
            return JSON.stringify(params);
          default:
            return void 0;
        }
      }
      function traceSendingRequest(message) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
            data = `Params: ${stringifyTrace(message.params)}

`;
          }
          tracer.log(`Sending request '${message.method} - (${message.id})'.`, data);
        } else {
          logLSPMessage("send-request", message);
        }
      }
      function traceSendingNotification(message) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose || trace === Trace.Compact) {
            if (message.params) {
              data = `Params: ${stringifyTrace(message.params)}

`;
            } else {
              data = "No parameters provided.\n\n";
            }
          }
          tracer.log(`Sending notification '${message.method}'.`, data);
        } else {
          logLSPMessage("send-notification", message);
        }
      }
      function traceSendingResponse(message, method, startTime) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose || trace === Trace.Compact) {
            if (message.error && message.error.data) {
              data = `Error data: ${stringifyTrace(message.error.data)}

`;
            } else {
              if (message.result) {
                data = `Result: ${stringifyTrace(message.result)}

`;
              } else if (message.error === void 0) {
                data = "No result returned.\n\n";
              }
            }
          }
          tracer.log(`Sending response '${method} - (${message.id})'. Processing request took ${Date.now() - startTime}ms`, data);
        } else {
          logLSPMessage("send-response", message);
        }
      }
      function traceReceivedRequest(message) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
            data = `Params: ${stringifyTrace(message.params)}

`;
          }
          tracer.log(`Received request '${message.method} - (${message.id})'.`, data);
        } else {
          logLSPMessage("receive-request", message);
        }
      }
      function traceReceivedNotification(message) {
        if (trace === Trace.Off || !tracer || message.method === LogTraceNotification.type.method) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose || trace === Trace.Compact) {
            if (message.params) {
              data = `Params: ${stringifyTrace(message.params)}

`;
            } else {
              data = "No parameters provided.\n\n";
            }
          }
          tracer.log(`Received notification '${message.method}'.`, data);
        } else {
          logLSPMessage("receive-notification", message);
        }
      }
      function traceReceivedResponse(message, responsePromise) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose || trace === Trace.Compact) {
            if (message.error && message.error.data) {
              data = `Error data: ${stringifyTrace(message.error.data)}

`;
            } else {
              if (message.result) {
                data = `Result: ${stringifyTrace(message.result)}

`;
              } else if (message.error === void 0) {
                data = "No result returned.\n\n";
              }
            }
          }
          if (responsePromise) {
            const error = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : "";
            tracer.log(`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error}`, data);
          } else {
            tracer.log(`Received response ${message.id} without active response promise.`, data);
          }
        } else {
          logLSPMessage("receive-response", message);
        }
      }
      function logLSPMessage(type, message) {
        if (!tracer || trace === Trace.Off) {
          return;
        }
        const lspMessage = {
          isLSPMessage: true,
          type,
          message,
          timestamp: Date.now()
        };
        tracer.log(lspMessage);
      }
      function throwIfClosedOrDisposed() {
        if (isClosed()) {
          throw new ConnectionError(ConnectionErrors.Closed, "Connection is closed.");
        }
        if (isDisposed()) {
          throw new ConnectionError(ConnectionErrors.Disposed, "Connection is disposed.");
        }
      }
      function throwIfListening() {
        if (isListening()) {
          throw new ConnectionError(ConnectionErrors.AlreadyListening, "Connection is already listening");
        }
      }
      function throwIfNotListening() {
        if (!isListening()) {
          throw new Error("Call listen() first.");
        }
      }
      function undefinedToNull(param) {
        if (param === void 0) {
          return null;
        } else {
          return param;
        }
      }
      function nullToUndefined(param) {
        if (param === null) {
          return void 0;
        } else {
          return param;
        }
      }
      function isNamedParam(param) {
        return param !== void 0 && param !== null && !Array.isArray(param) && typeof param === "object";
      }
      function computeSingleParam(parameterStructures, param) {
        switch (parameterStructures) {
          case messages_1.ParameterStructures.auto:
            if (isNamedParam(param)) {
              return nullToUndefined(param);
            } else {
              return [undefinedToNull(param)];
            }
          case messages_1.ParameterStructures.byName:
            if (!isNamedParam(param)) {
              throw new Error(`Received parameters by name but param is not an object literal.`);
            }
            return nullToUndefined(param);
          case messages_1.ParameterStructures.byPosition:
            return [undefinedToNull(param)];
          default:
            throw new Error(`Unknown parameter structure ${parameterStructures.toString()}`);
        }
      }
      function computeMessageParams(type, params) {
        let result;
        const numberOfParams = type.numberOfParams;
        switch (numberOfParams) {
          case 0:
            result = void 0;
            break;
          case 1:
            result = computeSingleParam(type.parameterStructures, params[0]);
            break;
          default:
            result = [];
            for (let i = 0; i < params.length && i < numberOfParams; i++) {
              result.push(undefinedToNull(params[i]));
            }
            if (params.length < numberOfParams) {
              for (let i = params.length; i < numberOfParams; i++) {
                result.push(null);
              }
            }
            break;
        }
        return result;
      }
      const connection = {
        sendNotification: (type, ...args) => {
          throwIfClosedOrDisposed();
          let method;
          let messageParams;
          if (Is.string(type)) {
            method = type;
            const first = args[0];
            let paramStart = 0;
            let parameterStructures = messages_1.ParameterStructures.auto;
            if (messages_1.ParameterStructures.is(first)) {
              paramStart = 1;
              parameterStructures = first;
            }
            let paramEnd = args.length;
            const numberOfParams = paramEnd - paramStart;
            switch (numberOfParams) {
              case 0:
                messageParams = void 0;
                break;
              case 1:
                messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                break;
              default:
                if (parameterStructures === messages_1.ParameterStructures.byName) {
                  throw new Error(`Received ${numberOfParams} parameters for 'by Name' notification parameter structure.`);
                }
                messageParams = args.slice(paramStart, paramEnd).map((value) => undefinedToNull(value));
                break;
            }
          } else {
            const params = args;
            method = type.method;
            messageParams = computeMessageParams(type, params);
          }
          const notificationMessage = {
            jsonrpc: version,
            method,
            params: messageParams
          };
          traceSendingNotification(notificationMessage);
          return messageWriter.write(notificationMessage).catch((error) => {
            logger.error(`Sending notification failed.`);
            throw error;
          });
        },
        onNotification: (type, handler) => {
          throwIfClosedOrDisposed();
          let method;
          if (Is.func(type)) {
            starNotificationHandler = type;
          } else if (handler) {
            if (Is.string(type)) {
              method = type;
              notificationHandlers.set(type, { type: void 0, handler });
            } else {
              method = type.method;
              notificationHandlers.set(type.method, { type, handler });
            }
          }
          return {
            dispose: () => {
              if (method !== void 0) {
                notificationHandlers.delete(method);
              } else {
                starNotificationHandler = void 0;
              }
            }
          };
        },
        onProgress: (_type, token, handler) => {
          if (progressHandlers.has(token)) {
            throw new Error(`Progress handler for token ${token} already registered`);
          }
          progressHandlers.set(token, handler);
          return {
            dispose: () => {
              progressHandlers.delete(token);
            }
          };
        },
        sendProgress: (_type, token, value) => {
          return connection.sendNotification(ProgressNotification.type, { token, value });
        },
        onUnhandledProgress: unhandledProgressEmitter.event,
        sendRequest: (type, ...args) => {
          throwIfClosedOrDisposed();
          throwIfNotListening();
          let method;
          let messageParams;
          let token = void 0;
          if (Is.string(type)) {
            method = type;
            const first = args[0];
            const last = args[args.length - 1];
            let paramStart = 0;
            let parameterStructures = messages_1.ParameterStructures.auto;
            if (messages_1.ParameterStructures.is(first)) {
              paramStart = 1;
              parameterStructures = first;
            }
            let paramEnd = args.length;
            if (cancellation_1.CancellationToken.is(last)) {
              paramEnd = paramEnd - 1;
              token = last;
            }
            const numberOfParams = paramEnd - paramStart;
            switch (numberOfParams) {
              case 0:
                messageParams = void 0;
                break;
              case 1:
                messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                break;
              default:
                if (parameterStructures === messages_1.ParameterStructures.byName) {
                  throw new Error(`Received ${numberOfParams} parameters for 'by Name' request parameter structure.`);
                }
                messageParams = args.slice(paramStart, paramEnd).map((value) => undefinedToNull(value));
                break;
            }
          } else {
            const params = args;
            method = type.method;
            messageParams = computeMessageParams(type, params);
            const numberOfParams = type.numberOfParams;
            token = cancellation_1.CancellationToken.is(params[numberOfParams]) ? params[numberOfParams] : void 0;
          }
          const id = sequenceNumber++;
          let disposable;
          if (token) {
            disposable = token.onCancellationRequested(() => {
              const p = cancellationStrategy.sender.sendCancellation(connection, id);
              if (p === void 0) {
                logger.log(`Received no promise from cancellation strategy when cancelling id ${id}`);
                return Promise.resolve();
              } else {
                return p.catch(() => {
                  logger.log(`Sending cancellation messages for id ${id} failed`);
                });
              }
            });
          }
          const requestMessage = {
            jsonrpc: version,
            id,
            method,
            params: messageParams
          };
          traceSendingRequest(requestMessage);
          if (typeof cancellationStrategy.sender.enableCancellation === "function") {
            cancellationStrategy.sender.enableCancellation(requestMessage);
          }
          return new Promise(async (resolve, reject) => {
            const resolveWithCleanup = (r) => {
              resolve(r);
              cancellationStrategy.sender.cleanup(id);
              disposable?.dispose();
            };
            const rejectWithCleanup = (r) => {
              reject(r);
              cancellationStrategy.sender.cleanup(id);
              disposable?.dispose();
            };
            const responsePromise = { method, timerStart: Date.now(), resolve: resolveWithCleanup, reject: rejectWithCleanup };
            try {
              await messageWriter.write(requestMessage);
              responsePromises.set(id, responsePromise);
            } catch (error) {
              logger.error(`Sending request failed.`);
              responsePromise.reject(new messages_1.ResponseError(messages_1.ErrorCodes.MessageWriteError, error.message ? error.message : "Unknown reason"));
              throw error;
            }
          });
        },
        onRequest: (type, handler) => {
          throwIfClosedOrDisposed();
          let method = null;
          if (StarRequestHandler.is(type)) {
            method = void 0;
            starRequestHandler = type;
          } else if (Is.string(type)) {
            method = null;
            if (handler !== void 0) {
              method = type;
              requestHandlers.set(type, { handler, type: void 0 });
            }
          } else {
            if (handler !== void 0) {
              method = type.method;
              requestHandlers.set(type.method, { type, handler });
            }
          }
          return {
            dispose: () => {
              if (method === null) {
                return;
              }
              if (method !== void 0) {
                requestHandlers.delete(method);
              } else {
                starRequestHandler = void 0;
              }
            }
          };
        },
        hasPendingResponse: () => {
          return responsePromises.size > 0;
        },
        trace: async (_value, _tracer, sendNotificationOrTraceOptions) => {
          let _sendNotification = false;
          let _traceFormat = TraceFormat.Text;
          if (sendNotificationOrTraceOptions !== void 0) {
            if (Is.boolean(sendNotificationOrTraceOptions)) {
              _sendNotification = sendNotificationOrTraceOptions;
            } else {
              _sendNotification = sendNotificationOrTraceOptions.sendNotification || false;
              _traceFormat = sendNotificationOrTraceOptions.traceFormat || TraceFormat.Text;
            }
          }
          trace = _value;
          traceFormat = _traceFormat;
          if (trace === Trace.Off) {
            tracer = void 0;
          } else {
            tracer = _tracer;
          }
          if (_sendNotification && !isClosed() && !isDisposed()) {
            await connection.sendNotification(SetTraceNotification.type, { value: Trace.toString(_value) });
          }
        },
        onError: errorEmitter.event,
        onClose: closeEmitter.event,
        onUnhandledNotification: unhandledNotificationEmitter.event,
        onDispose: disposeEmitter.event,
        end: () => {
          messageWriter.end();
        },
        dispose: () => {
          if (isDisposed()) {
            return;
          }
          state = ConnectionState.Disposed;
          disposeEmitter.fire(void 0);
          const error = new messages_1.ResponseError(messages_1.ErrorCodes.PendingResponseRejected, "Pending response rejected since connection got disposed");
          for (const promise of responsePromises.values()) {
            promise.reject(error);
          }
          responsePromises = /* @__PURE__ */ new Map();
          requestTokens = /* @__PURE__ */ new Map();
          knownCanceledRequests = /* @__PURE__ */ new Set();
          messageQueue = new linkedMap_1.LinkedMap();
          if (Is.func(messageWriter.dispose)) {
            messageWriter.dispose();
          }
          if (Is.func(messageReader.dispose)) {
            messageReader.dispose();
          }
        },
        listen: () => {
          throwIfClosedOrDisposed();
          throwIfListening();
          state = ConnectionState.Listening;
          messageReader.listen(callback);
        },
        inspect: () => {
          (0, ral_1.default)().console.log("inspect");
        }
      };
      connection.onNotification(LogTraceNotification.type, (params) => {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        const verbose = trace === Trace.Verbose || trace === Trace.Compact;
        tracer.log(params.message, verbose ? params.verbose : void 0);
      });
      connection.onNotification(ProgressNotification.type, (params) => {
        const handler = progressHandlers.get(params.token);
        if (handler) {
          handler(params.value);
        } else {
          unhandledProgressEmitter.fire(params);
        }
      });
      return connection;
    }
    exports2.createMessageConnection = createMessageConnection;
  }
});

// ../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/api.js
var require_api = __commonJS({
  "../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/api.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProgressType = exports2.ProgressToken = exports2.createMessageConnection = exports2.NullLogger = exports2.ConnectionOptions = exports2.ConnectionStrategy = exports2.AbstractMessageBuffer = exports2.WriteableStreamMessageWriter = exports2.AbstractMessageWriter = exports2.MessageWriter = exports2.ReadableStreamMessageReader = exports2.AbstractMessageReader = exports2.MessageReader = exports2.SharedArrayReceiverStrategy = exports2.SharedArraySenderStrategy = exports2.CancellationToken = exports2.CancellationTokenSource = exports2.Emitter = exports2.Event = exports2.Disposable = exports2.LRUCache = exports2.Touch = exports2.LinkedMap = exports2.ParameterStructures = exports2.NotificationType9 = exports2.NotificationType8 = exports2.NotificationType7 = exports2.NotificationType6 = exports2.NotificationType5 = exports2.NotificationType4 = exports2.NotificationType3 = exports2.NotificationType2 = exports2.NotificationType1 = exports2.NotificationType0 = exports2.NotificationType = exports2.ErrorCodes = exports2.ResponseError = exports2.RequestType9 = exports2.RequestType8 = exports2.RequestType7 = exports2.RequestType6 = exports2.RequestType5 = exports2.RequestType4 = exports2.RequestType3 = exports2.RequestType2 = exports2.RequestType1 = exports2.RequestType0 = exports2.RequestType = exports2.Message = exports2.RAL = void 0;
    exports2.MessageStrategy = exports2.CancellationStrategy = exports2.CancellationSenderStrategy = exports2.CancellationReceiverStrategy = exports2.ConnectionError = exports2.ConnectionErrors = exports2.LogTraceNotification = exports2.SetTraceNotification = exports2.TraceFormat = exports2.TraceValues = exports2.Trace = void 0;
    var messages_1 = require_messages();
    Object.defineProperty(exports2, "Message", { enumerable: true, get: function() {
      return messages_1.Message;
    } });
    Object.defineProperty(exports2, "RequestType", { enumerable: true, get: function() {
      return messages_1.RequestType;
    } });
    Object.defineProperty(exports2, "RequestType0", { enumerable: true, get: function() {
      return messages_1.RequestType0;
    } });
    Object.defineProperty(exports2, "RequestType1", { enumerable: true, get: function() {
      return messages_1.RequestType1;
    } });
    Object.defineProperty(exports2, "RequestType2", { enumerable: true, get: function() {
      return messages_1.RequestType2;
    } });
    Object.defineProperty(exports2, "RequestType3", { enumerable: true, get: function() {
      return messages_1.RequestType3;
    } });
    Object.defineProperty(exports2, "RequestType4", { enumerable: true, get: function() {
      return messages_1.RequestType4;
    } });
    Object.defineProperty(exports2, "RequestType5", { enumerable: true, get: function() {
      return messages_1.RequestType5;
    } });
    Object.defineProperty(exports2, "RequestType6", { enumerable: true, get: function() {
      return messages_1.RequestType6;
    } });
    Object.defineProperty(exports2, "RequestType7", { enumerable: true, get: function() {
      return messages_1.RequestType7;
    } });
    Object.defineProperty(exports2, "RequestType8", { enumerable: true, get: function() {
      return messages_1.RequestType8;
    } });
    Object.defineProperty(exports2, "RequestType9", { enumerable: true, get: function() {
      return messages_1.RequestType9;
    } });
    Object.defineProperty(exports2, "ResponseError", { enumerable: true, get: function() {
      return messages_1.ResponseError;
    } });
    Object.defineProperty(exports2, "ErrorCodes", { enumerable: true, get: function() {
      return messages_1.ErrorCodes;
    } });
    Object.defineProperty(exports2, "NotificationType", { enumerable: true, get: function() {
      return messages_1.NotificationType;
    } });
    Object.defineProperty(exports2, "NotificationType0", { enumerable: true, get: function() {
      return messages_1.NotificationType0;
    } });
    Object.defineProperty(exports2, "NotificationType1", { enumerable: true, get: function() {
      return messages_1.NotificationType1;
    } });
    Object.defineProperty(exports2, "NotificationType2", { enumerable: true, get: function() {
      return messages_1.NotificationType2;
    } });
    Object.defineProperty(exports2, "NotificationType3", { enumerable: true, get: function() {
      return messages_1.NotificationType3;
    } });
    Object.defineProperty(exports2, "NotificationType4", { enumerable: true, get: function() {
      return messages_1.NotificationType4;
    } });
    Object.defineProperty(exports2, "NotificationType5", { enumerable: true, get: function() {
      return messages_1.NotificationType5;
    } });
    Object.defineProperty(exports2, "NotificationType6", { enumerable: true, get: function() {
      return messages_1.NotificationType6;
    } });
    Object.defineProperty(exports2, "NotificationType7", { enumerable: true, get: function() {
      return messages_1.NotificationType7;
    } });
    Object.defineProperty(exports2, "NotificationType8", { enumerable: true, get: function() {
      return messages_1.NotificationType8;
    } });
    Object.defineProperty(exports2, "NotificationType9", { enumerable: true, get: function() {
      return messages_1.NotificationType9;
    } });
    Object.defineProperty(exports2, "ParameterStructures", { enumerable: true, get: function() {
      return messages_1.ParameterStructures;
    } });
    var linkedMap_1 = require_linkedMap();
    Object.defineProperty(exports2, "LinkedMap", { enumerable: true, get: function() {
      return linkedMap_1.LinkedMap;
    } });
    Object.defineProperty(exports2, "LRUCache", { enumerable: true, get: function() {
      return linkedMap_1.LRUCache;
    } });
    Object.defineProperty(exports2, "Touch", { enumerable: true, get: function() {
      return linkedMap_1.Touch;
    } });
    var disposable_1 = require_disposable();
    Object.defineProperty(exports2, "Disposable", { enumerable: true, get: function() {
      return disposable_1.Disposable;
    } });
    var events_1 = require_events();
    Object.defineProperty(exports2, "Event", { enumerable: true, get: function() {
      return events_1.Event;
    } });
    Object.defineProperty(exports2, "Emitter", { enumerable: true, get: function() {
      return events_1.Emitter;
    } });
    var cancellation_1 = require_cancellation();
    Object.defineProperty(exports2, "CancellationTokenSource", { enumerable: true, get: function() {
      return cancellation_1.CancellationTokenSource;
    } });
    Object.defineProperty(exports2, "CancellationToken", { enumerable: true, get: function() {
      return cancellation_1.CancellationToken;
    } });
    var sharedArrayCancellation_1 = require_sharedArrayCancellation();
    Object.defineProperty(exports2, "SharedArraySenderStrategy", { enumerable: true, get: function() {
      return sharedArrayCancellation_1.SharedArraySenderStrategy;
    } });
    Object.defineProperty(exports2, "SharedArrayReceiverStrategy", { enumerable: true, get: function() {
      return sharedArrayCancellation_1.SharedArrayReceiverStrategy;
    } });
    var messageReader_1 = require_messageReader();
    Object.defineProperty(exports2, "MessageReader", { enumerable: true, get: function() {
      return messageReader_1.MessageReader;
    } });
    Object.defineProperty(exports2, "AbstractMessageReader", { enumerable: true, get: function() {
      return messageReader_1.AbstractMessageReader;
    } });
    Object.defineProperty(exports2, "ReadableStreamMessageReader", { enumerable: true, get: function() {
      return messageReader_1.ReadableStreamMessageReader;
    } });
    var messageWriter_1 = require_messageWriter();
    Object.defineProperty(exports2, "MessageWriter", { enumerable: true, get: function() {
      return messageWriter_1.MessageWriter;
    } });
    Object.defineProperty(exports2, "AbstractMessageWriter", { enumerable: true, get: function() {
      return messageWriter_1.AbstractMessageWriter;
    } });
    Object.defineProperty(exports2, "WriteableStreamMessageWriter", { enumerable: true, get: function() {
      return messageWriter_1.WriteableStreamMessageWriter;
    } });
    var messageBuffer_1 = require_messageBuffer();
    Object.defineProperty(exports2, "AbstractMessageBuffer", { enumerable: true, get: function() {
      return messageBuffer_1.AbstractMessageBuffer;
    } });
    var connection_1 = require_connection();
    Object.defineProperty(exports2, "ConnectionStrategy", { enumerable: true, get: function() {
      return connection_1.ConnectionStrategy;
    } });
    Object.defineProperty(exports2, "ConnectionOptions", { enumerable: true, get: function() {
      return connection_1.ConnectionOptions;
    } });
    Object.defineProperty(exports2, "NullLogger", { enumerable: true, get: function() {
      return connection_1.NullLogger;
    } });
    Object.defineProperty(exports2, "createMessageConnection", { enumerable: true, get: function() {
      return connection_1.createMessageConnection;
    } });
    Object.defineProperty(exports2, "ProgressToken", { enumerable: true, get: function() {
      return connection_1.ProgressToken;
    } });
    Object.defineProperty(exports2, "ProgressType", { enumerable: true, get: function() {
      return connection_1.ProgressType;
    } });
    Object.defineProperty(exports2, "Trace", { enumerable: true, get: function() {
      return connection_1.Trace;
    } });
    Object.defineProperty(exports2, "TraceValues", { enumerable: true, get: function() {
      return connection_1.TraceValues;
    } });
    Object.defineProperty(exports2, "TraceFormat", { enumerable: true, get: function() {
      return connection_1.TraceFormat;
    } });
    Object.defineProperty(exports2, "SetTraceNotification", { enumerable: true, get: function() {
      return connection_1.SetTraceNotification;
    } });
    Object.defineProperty(exports2, "LogTraceNotification", { enumerable: true, get: function() {
      return connection_1.LogTraceNotification;
    } });
    Object.defineProperty(exports2, "ConnectionErrors", { enumerable: true, get: function() {
      return connection_1.ConnectionErrors;
    } });
    Object.defineProperty(exports2, "ConnectionError", { enumerable: true, get: function() {
      return connection_1.ConnectionError;
    } });
    Object.defineProperty(exports2, "CancellationReceiverStrategy", { enumerable: true, get: function() {
      return connection_1.CancellationReceiverStrategy;
    } });
    Object.defineProperty(exports2, "CancellationSenderStrategy", { enumerable: true, get: function() {
      return connection_1.CancellationSenderStrategy;
    } });
    Object.defineProperty(exports2, "CancellationStrategy", { enumerable: true, get: function() {
      return connection_1.CancellationStrategy;
    } });
    Object.defineProperty(exports2, "MessageStrategy", { enumerable: true, get: function() {
      return connection_1.MessageStrategy;
    } });
    var ral_1 = require_ral();
    exports2.RAL = ral_1.default;
  }
});

// ../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/node/ril.js
var require_ril = __commonJS({
  "../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/node/ril.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var util_1 = require("util");
    var api_1 = require_api();
    var MessageBuffer = class _MessageBuffer extends api_1.AbstractMessageBuffer {
      constructor(encoding = "utf-8") {
        super(encoding);
      }
      emptyBuffer() {
        return _MessageBuffer.emptyBuffer;
      }
      fromString(value, encoding) {
        return Buffer.from(value, encoding);
      }
      toString(value, encoding) {
        if (value instanceof Buffer) {
          return value.toString(encoding);
        } else {
          return new util_1.TextDecoder(encoding).decode(value);
        }
      }
      asNative(buffer, length) {
        if (length === void 0) {
          return buffer instanceof Buffer ? buffer : Buffer.from(buffer);
        } else {
          return buffer instanceof Buffer ? buffer.slice(0, length) : Buffer.from(buffer, 0, length);
        }
      }
      allocNative(length) {
        return Buffer.allocUnsafe(length);
      }
    };
    MessageBuffer.emptyBuffer = Buffer.allocUnsafe(0);
    var ReadableStreamWrapper = class {
      constructor(stream) {
        this.stream = stream;
      }
      onClose(listener) {
        this.stream.on("close", listener);
        return api_1.Disposable.create(() => this.stream.off("close", listener));
      }
      onError(listener) {
        this.stream.on("error", listener);
        return api_1.Disposable.create(() => this.stream.off("error", listener));
      }
      onEnd(listener) {
        this.stream.on("end", listener);
        return api_1.Disposable.create(() => this.stream.off("end", listener));
      }
      onData(listener) {
        this.stream.on("data", listener);
        return api_1.Disposable.create(() => this.stream.off("data", listener));
      }
    };
    var WritableStreamWrapper = class {
      constructor(stream) {
        this.stream = stream;
      }
      onClose(listener) {
        this.stream.on("close", listener);
        return api_1.Disposable.create(() => this.stream.off("close", listener));
      }
      onError(listener) {
        this.stream.on("error", listener);
        return api_1.Disposable.create(() => this.stream.off("error", listener));
      }
      onEnd(listener) {
        this.stream.on("end", listener);
        return api_1.Disposable.create(() => this.stream.off("end", listener));
      }
      write(data, encoding) {
        return new Promise((resolve, reject) => {
          const callback = (error) => {
            if (error === void 0 || error === null) {
              resolve();
            } else {
              reject(error);
            }
          };
          if (typeof data === "string") {
            this.stream.write(data, encoding, callback);
          } else {
            this.stream.write(data, callback);
          }
        });
      }
      end() {
        this.stream.end();
      }
    };
    var _ril = Object.freeze({
      messageBuffer: Object.freeze({
        create: (encoding) => new MessageBuffer(encoding)
      }),
      applicationJson: Object.freeze({
        encoder: Object.freeze({
          name: "application/json",
          encode: (msg, options) => {
            try {
              return Promise.resolve(Buffer.from(JSON.stringify(msg, void 0, 0), options.charset));
            } catch (err) {
              return Promise.reject(err);
            }
          }
        }),
        decoder: Object.freeze({
          name: "application/json",
          decode: (buffer, options) => {
            try {
              if (buffer instanceof Buffer) {
                return Promise.resolve(JSON.parse(buffer.toString(options.charset)));
              } else {
                return Promise.resolve(JSON.parse(new util_1.TextDecoder(options.charset).decode(buffer)));
              }
            } catch (err) {
              return Promise.reject(err);
            }
          }
        })
      }),
      stream: Object.freeze({
        asReadableStream: (stream) => new ReadableStreamWrapper(stream),
        asWritableStream: (stream) => new WritableStreamWrapper(stream)
      }),
      console,
      timer: Object.freeze({
        setTimeout(callback, ms, ...args) {
          const handle = setTimeout(callback, ms, ...args);
          return { dispose: () => clearTimeout(handle) };
        },
        setImmediate(callback, ...args) {
          const handle = setImmediate(callback, ...args);
          return { dispose: () => clearImmediate(handle) };
        },
        setInterval(callback, ms, ...args) {
          const handle = setInterval(callback, ms, ...args);
          return { dispose: () => clearInterval(handle) };
        }
      })
    });
    function RIL() {
      return _ril;
    }
    (function(RIL2) {
      function install() {
        api_1.RAL.install(_ril);
      }
      RIL2.install = install;
    })(RIL || (RIL = {}));
    exports2.default = RIL;
  }
});

// ../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/node/main.js
var require_main = __commonJS({
  "../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/node/main.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createMessageConnection = exports2.createServerSocketTransport = exports2.createClientSocketTransport = exports2.createServerPipeTransport = exports2.createClientPipeTransport = exports2.generateRandomPipeName = exports2.StreamMessageWriter = exports2.StreamMessageReader = exports2.SocketMessageWriter = exports2.SocketMessageReader = exports2.PortMessageWriter = exports2.PortMessageReader = exports2.IPCMessageWriter = exports2.IPCMessageReader = void 0;
    var ril_1 = require_ril();
    ril_1.default.install();
    var path = require("path");
    var os = require("os");
    var crypto_1 = require("crypto");
    var net_1 = require("net");
    var api_1 = require_api();
    __exportStar(require_api(), exports2);
    var IPCMessageReader = class extends api_1.AbstractMessageReader {
      constructor(process2) {
        super();
        this.process = process2;
        let eventEmitter = this.process;
        eventEmitter.on("error", (error) => this.fireError(error));
        eventEmitter.on("close", () => this.fireClose());
      }
      listen(callback) {
        this.process.on("message", callback);
        return api_1.Disposable.create(() => this.process.off("message", callback));
      }
    };
    exports2.IPCMessageReader = IPCMessageReader;
    var IPCMessageWriter = class extends api_1.AbstractMessageWriter {
      constructor(process2) {
        super();
        this.process = process2;
        this.errorCount = 0;
        const eventEmitter = this.process;
        eventEmitter.on("error", (error) => this.fireError(error));
        eventEmitter.on("close", () => this.fireClose);
      }
      write(msg) {
        try {
          if (typeof this.process.send === "function") {
            this.process.send(msg, void 0, void 0, (error) => {
              if (error) {
                this.errorCount++;
                this.handleError(error, msg);
              } else {
                this.errorCount = 0;
              }
            });
          }
          return Promise.resolve();
        } catch (error) {
          this.handleError(error, msg);
          return Promise.reject(error);
        }
      }
      handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
      }
      end() {
      }
    };
    exports2.IPCMessageWriter = IPCMessageWriter;
    var PortMessageReader = class extends api_1.AbstractMessageReader {
      constructor(port) {
        super();
        this.onData = new api_1.Emitter();
        port.on("close", () => this.fireClose);
        port.on("error", (error) => this.fireError(error));
        port.on("message", (message) => {
          this.onData.fire(message);
        });
      }
      listen(callback) {
        return this.onData.event(callback);
      }
    };
    exports2.PortMessageReader = PortMessageReader;
    var PortMessageWriter = class extends api_1.AbstractMessageWriter {
      constructor(port) {
        super();
        this.port = port;
        this.errorCount = 0;
        port.on("close", () => this.fireClose());
        port.on("error", (error) => this.fireError(error));
      }
      write(msg) {
        try {
          this.port.postMessage(msg);
          return Promise.resolve();
        } catch (error) {
          this.handleError(error, msg);
          return Promise.reject(error);
        }
      }
      handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
      }
      end() {
      }
    };
    exports2.PortMessageWriter = PortMessageWriter;
    var SocketMessageReader = class extends api_1.ReadableStreamMessageReader {
      constructor(socket, encoding = "utf-8") {
        super((0, ril_1.default)().stream.asReadableStream(socket), encoding);
      }
    };
    exports2.SocketMessageReader = SocketMessageReader;
    var SocketMessageWriter = class extends api_1.WriteableStreamMessageWriter {
      constructor(socket, options) {
        super((0, ril_1.default)().stream.asWritableStream(socket), options);
        this.socket = socket;
      }
      dispose() {
        super.dispose();
        this.socket.destroy();
      }
    };
    exports2.SocketMessageWriter = SocketMessageWriter;
    var StreamMessageReader = class extends api_1.ReadableStreamMessageReader {
      constructor(readable, encoding) {
        super((0, ril_1.default)().stream.asReadableStream(readable), encoding);
      }
    };
    exports2.StreamMessageReader = StreamMessageReader;
    var StreamMessageWriter = class extends api_1.WriteableStreamMessageWriter {
      constructor(writable, options) {
        super((0, ril_1.default)().stream.asWritableStream(writable), options);
      }
    };
    exports2.StreamMessageWriter = StreamMessageWriter;
    var XDG_RUNTIME_DIR = process.env["XDG_RUNTIME_DIR"];
    var safeIpcPathLengths = /* @__PURE__ */ new Map([
      ["linux", 107],
      ["darwin", 103]
    ]);
    function generateRandomPipeName() {
      const randomSuffix = (0, crypto_1.randomBytes)(21).toString("hex");
      if (process.platform === "win32") {
        return `\\\\.\\pipe\\vscode-jsonrpc-${randomSuffix}-sock`;
      }
      let result;
      if (XDG_RUNTIME_DIR) {
        result = path.join(XDG_RUNTIME_DIR, `vscode-ipc-${randomSuffix}.sock`);
      } else {
        result = path.join(os.tmpdir(), `vscode-${randomSuffix}.sock`);
      }
      const limit = safeIpcPathLengths.get(process.platform);
      if (limit !== void 0 && result.length > limit) {
        (0, ril_1.default)().console.warn(`WARNING: IPC handle "${result}" is longer than ${limit} characters.`);
      }
      return result;
    }
    exports2.generateRandomPipeName = generateRandomPipeName;
    function createClientPipeTransport(pipeName, encoding = "utf-8") {
      let connectResolve;
      const connected = new Promise((resolve, _reject) => {
        connectResolve = resolve;
      });
      return new Promise((resolve, reject) => {
        let server = (0, net_1.createServer)((socket) => {
          server.close();
          connectResolve([
            new SocketMessageReader(socket, encoding),
            new SocketMessageWriter(socket, encoding)
          ]);
        });
        server.on("error", reject);
        server.listen(pipeName, () => {
          server.removeListener("error", reject);
          resolve({
            onConnected: () => {
              return connected;
            }
          });
        });
      });
    }
    exports2.createClientPipeTransport = createClientPipeTransport;
    function createServerPipeTransport(pipeName, encoding = "utf-8") {
      const socket = (0, net_1.createConnection)(pipeName);
      return [
        new SocketMessageReader(socket, encoding),
        new SocketMessageWriter(socket, encoding)
      ];
    }
    exports2.createServerPipeTransport = createServerPipeTransport;
    function createClientSocketTransport(port, encoding = "utf-8") {
      let connectResolve;
      const connected = new Promise((resolve, _reject) => {
        connectResolve = resolve;
      });
      return new Promise((resolve, reject) => {
        const server = (0, net_1.createServer)((socket) => {
          server.close();
          connectResolve([
            new SocketMessageReader(socket, encoding),
            new SocketMessageWriter(socket, encoding)
          ]);
        });
        server.on("error", reject);
        server.listen(port, "127.0.0.1", () => {
          server.removeListener("error", reject);
          resolve({
            onConnected: () => {
              return connected;
            }
          });
        });
      });
    }
    exports2.createClientSocketTransport = createClientSocketTransport;
    function createServerSocketTransport(port, encoding = "utf-8") {
      const socket = (0, net_1.createConnection)(port, "127.0.0.1");
      return [
        new SocketMessageReader(socket, encoding),
        new SocketMessageWriter(socket, encoding)
      ];
    }
    exports2.createServerSocketTransport = createServerSocketTransport;
    function isReadableStream(value) {
      const candidate = value;
      return candidate.read !== void 0 && candidate.addListener !== void 0;
    }
    function isWritableStream(value) {
      const candidate = value;
      return candidate.write !== void 0 && candidate.addListener !== void 0;
    }
    function createMessageConnection(input, output, logger, options) {
      if (!logger) {
        logger = api_1.NullLogger;
      }
      const reader = isReadableStream(input) ? new StreamMessageReader(input) : input;
      const writer = isWritableStream(output) ? new StreamMessageWriter(output) : output;
      if (api_1.ConnectionStrategy.is(options)) {
        options = { connectionStrategy: options };
      }
      return (0, api_1.createMessageConnection)(reader, writer, logger, options);
    }
    exports2.createMessageConnection = createMessageConnection;
  }
});

// ../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/node.js
var require_node = __commonJS({
  "../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/node.js"(exports2, module2) {
    "use strict";
    module2.exports = require_main();
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-types@3.17.5/node_modules/vscode-languageserver-types/lib/umd/main.js
var require_main2 = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-types@3.17.5/node_modules/vscode-languageserver-types/lib/umd/main.js"(exports2, module2) {
    "use strict";
    (function(factory) {
      if (typeof module2 === "object" && typeof module2.exports === "object") {
        var v = factory(require, exports2);
        if (v !== void 0) module2.exports = v;
      } else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
      }
    })(function(require2, exports3) {
      "use strict";
      Object.defineProperty(exports3, "__esModule", { value: true });
      exports3.TextDocument = exports3.EOL = exports3.WorkspaceFolder = exports3.InlineCompletionContext = exports3.SelectedCompletionInfo = exports3.InlineCompletionTriggerKind = exports3.InlineCompletionList = exports3.InlineCompletionItem = exports3.StringValue = exports3.InlayHint = exports3.InlayHintLabelPart = exports3.InlayHintKind = exports3.InlineValueContext = exports3.InlineValueEvaluatableExpression = exports3.InlineValueVariableLookup = exports3.InlineValueText = exports3.SemanticTokens = exports3.SemanticTokenModifiers = exports3.SemanticTokenTypes = exports3.SelectionRange = exports3.DocumentLink = exports3.FormattingOptions = exports3.CodeLens = exports3.CodeAction = exports3.CodeActionContext = exports3.CodeActionTriggerKind = exports3.CodeActionKind = exports3.DocumentSymbol = exports3.WorkspaceSymbol = exports3.SymbolInformation = exports3.SymbolTag = exports3.SymbolKind = exports3.DocumentHighlight = exports3.DocumentHighlightKind = exports3.SignatureInformation = exports3.ParameterInformation = exports3.Hover = exports3.MarkedString = exports3.CompletionList = exports3.CompletionItem = exports3.CompletionItemLabelDetails = exports3.InsertTextMode = exports3.InsertReplaceEdit = exports3.CompletionItemTag = exports3.InsertTextFormat = exports3.CompletionItemKind = exports3.MarkupContent = exports3.MarkupKind = exports3.TextDocumentItem = exports3.OptionalVersionedTextDocumentIdentifier = exports3.VersionedTextDocumentIdentifier = exports3.TextDocumentIdentifier = exports3.WorkspaceChange = exports3.WorkspaceEdit = exports3.DeleteFile = exports3.RenameFile = exports3.CreateFile = exports3.TextDocumentEdit = exports3.AnnotatedTextEdit = exports3.ChangeAnnotationIdentifier = exports3.ChangeAnnotation = exports3.TextEdit = exports3.Command = exports3.Diagnostic = exports3.CodeDescription = exports3.DiagnosticTag = exports3.DiagnosticSeverity = exports3.DiagnosticRelatedInformation = exports3.FoldingRange = exports3.FoldingRangeKind = exports3.ColorPresentation = exports3.ColorInformation = exports3.Color = exports3.LocationLink = exports3.Location = exports3.Range = exports3.Position = exports3.uinteger = exports3.integer = exports3.URI = exports3.DocumentUri = void 0;
      var DocumentUri;
      (function(DocumentUri2) {
        function is(value) {
          return typeof value === "string";
        }
        DocumentUri2.is = is;
      })(DocumentUri || (exports3.DocumentUri = DocumentUri = {}));
      var URI;
      (function(URI2) {
        function is(value) {
          return typeof value === "string";
        }
        URI2.is = is;
      })(URI || (exports3.URI = URI = {}));
      var integer;
      (function(integer2) {
        integer2.MIN_VALUE = -2147483648;
        integer2.MAX_VALUE = 2147483647;
        function is(value) {
          return typeof value === "number" && integer2.MIN_VALUE <= value && value <= integer2.MAX_VALUE;
        }
        integer2.is = is;
      })(integer || (exports3.integer = integer = {}));
      var uinteger;
      (function(uinteger2) {
        uinteger2.MIN_VALUE = 0;
        uinteger2.MAX_VALUE = 2147483647;
        function is(value) {
          return typeof value === "number" && uinteger2.MIN_VALUE <= value && value <= uinteger2.MAX_VALUE;
        }
        uinteger2.is = is;
      })(uinteger || (exports3.uinteger = uinteger = {}));
      var Position;
      (function(Position2) {
        function create(line, character) {
          if (line === Number.MAX_VALUE) {
            line = uinteger.MAX_VALUE;
          }
          if (character === Number.MAX_VALUE) {
            character = uinteger.MAX_VALUE;
          }
          return { line, character };
        }
        Position2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Is.uinteger(candidate.line) && Is.uinteger(candidate.character);
        }
        Position2.is = is;
      })(Position || (exports3.Position = Position = {}));
      var Range;
      (function(Range2) {
        function create(one, two, three, four) {
          if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) {
            return { start: Position.create(one, two), end: Position.create(three, four) };
          } else if (Position.is(one) && Position.is(two)) {
            return { start: one, end: two };
          } else {
            throw new Error("Range#create called with invalid arguments[".concat(one, ", ").concat(two, ", ").concat(three, ", ").concat(four, "]"));
          }
        }
        Range2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
        }
        Range2.is = is;
      })(Range || (exports3.Range = Range = {}));
      var Location2;
      (function(Location3) {
        function create(uri, range) {
          return { uri, range };
        }
        Location3.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
        }
        Location3.is = is;
      })(Location2 || (exports3.Location = Location2 = {}));
      var LocationLink;
      (function(LocationLink2) {
        function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
          return { targetUri, targetRange, targetSelectionRange, originSelectionRange };
        }
        LocationLink2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri) && Range.is(candidate.targetSelectionRange) && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
        }
        LocationLink2.is = is;
      })(LocationLink || (exports3.LocationLink = LocationLink = {}));
      var Color;
      (function(Color2) {
        function create(red, green, blue, alpha) {
          return {
            red,
            green,
            blue,
            alpha
          };
        }
        Color2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Is.numberRange(candidate.red, 0, 1) && Is.numberRange(candidate.green, 0, 1) && Is.numberRange(candidate.blue, 0, 1) && Is.numberRange(candidate.alpha, 0, 1);
        }
        Color2.is = is;
      })(Color || (exports3.Color = Color = {}));
      var ColorInformation;
      (function(ColorInformation2) {
        function create(range, color) {
          return {
            range,
            color
          };
        }
        ColorInformation2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Range.is(candidate.range) && Color.is(candidate.color);
        }
        ColorInformation2.is = is;
      })(ColorInformation || (exports3.ColorInformation = ColorInformation = {}));
      var ColorPresentation;
      (function(ColorPresentation2) {
        function create(label, textEdit, additionalTextEdits) {
          return {
            label,
            textEdit,
            additionalTextEdits
          };
        }
        ColorPresentation2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate)) && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
        }
        ColorPresentation2.is = is;
      })(ColorPresentation || (exports3.ColorPresentation = ColorPresentation = {}));
      var FoldingRangeKind;
      (function(FoldingRangeKind2) {
        FoldingRangeKind2.Comment = "comment";
        FoldingRangeKind2.Imports = "imports";
        FoldingRangeKind2.Region = "region";
      })(FoldingRangeKind || (exports3.FoldingRangeKind = FoldingRangeKind = {}));
      var FoldingRange;
      (function(FoldingRange2) {
        function create(startLine, endLine, startCharacter, endCharacter, kind, collapsedText) {
          var result = {
            startLine,
            endLine
          };
          if (Is.defined(startCharacter)) {
            result.startCharacter = startCharacter;
          }
          if (Is.defined(endCharacter)) {
            result.endCharacter = endCharacter;
          }
          if (Is.defined(kind)) {
            result.kind = kind;
          }
          if (Is.defined(collapsedText)) {
            result.collapsedText = collapsedText;
          }
          return result;
        }
        FoldingRange2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Is.uinteger(candidate.startLine) && Is.uinteger(candidate.startLine) && (Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter)) && (Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter)) && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
        }
        FoldingRange2.is = is;
      })(FoldingRange || (exports3.FoldingRange = FoldingRange = {}));
      var DiagnosticRelatedInformation;
      (function(DiagnosticRelatedInformation2) {
        function create(location, message) {
          return {
            location,
            message
          };
        }
        DiagnosticRelatedInformation2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Location2.is(candidate.location) && Is.string(candidate.message);
        }
        DiagnosticRelatedInformation2.is = is;
      })(DiagnosticRelatedInformation || (exports3.DiagnosticRelatedInformation = DiagnosticRelatedInformation = {}));
      var DiagnosticSeverity2;
      (function(DiagnosticSeverity3) {
        DiagnosticSeverity3.Error = 1;
        DiagnosticSeverity3.Warning = 2;
        DiagnosticSeverity3.Information = 3;
        DiagnosticSeverity3.Hint = 4;
      })(DiagnosticSeverity2 || (exports3.DiagnosticSeverity = DiagnosticSeverity2 = {}));
      var DiagnosticTag;
      (function(DiagnosticTag2) {
        DiagnosticTag2.Unnecessary = 1;
        DiagnosticTag2.Deprecated = 2;
      })(DiagnosticTag || (exports3.DiagnosticTag = DiagnosticTag = {}));
      var CodeDescription;
      (function(CodeDescription2) {
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Is.string(candidate.href);
        }
        CodeDescription2.is = is;
      })(CodeDescription || (exports3.CodeDescription = CodeDescription = {}));
      var Diagnostic2;
      (function(Diagnostic3) {
        function create(range, message, severity, code, source, relatedInformation) {
          var result = { range, message };
          if (Is.defined(severity)) {
            result.severity = severity;
          }
          if (Is.defined(code)) {
            result.code = code;
          }
          if (Is.defined(source)) {
            result.source = source;
          }
          if (Is.defined(relatedInformation)) {
            result.relatedInformation = relatedInformation;
          }
          return result;
        }
        Diagnostic3.create = create;
        function is(value) {
          var _a;
          var candidate = value;
          return Is.defined(candidate) && Range.is(candidate.range) && Is.string(candidate.message) && (Is.number(candidate.severity) || Is.undefined(candidate.severity)) && (Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) && (Is.undefined(candidate.codeDescription) || Is.string((_a = candidate.codeDescription) === null || _a === void 0 ? void 0 : _a.href)) && (Is.string(candidate.source) || Is.undefined(candidate.source)) && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
        }
        Diagnostic3.is = is;
      })(Diagnostic2 || (exports3.Diagnostic = Diagnostic2 = {}));
      var Command;
      (function(Command2) {
        function create(title, command) {
          var args = [];
          for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
          }
          var result = { title, command };
          if (Is.defined(args) && args.length > 0) {
            result.arguments = args;
          }
          return result;
        }
        Command2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
        }
        Command2.is = is;
      })(Command || (exports3.Command = Command = {}));
      var TextEdit;
      (function(TextEdit2) {
        function replace(range, newText) {
          return { range, newText };
        }
        TextEdit2.replace = replace;
        function insert(position, newText) {
          return { range: { start: position, end: position }, newText };
        }
        TextEdit2.insert = insert;
        function del(range) {
          return { range, newText: "" };
        }
        TextEdit2.del = del;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range.is(candidate.range);
        }
        TextEdit2.is = is;
      })(TextEdit || (exports3.TextEdit = TextEdit = {}));
      var ChangeAnnotation;
      (function(ChangeAnnotation2) {
        function create(label, needsConfirmation, description) {
          var result = { label };
          if (needsConfirmation !== void 0) {
            result.needsConfirmation = needsConfirmation;
          }
          if (description !== void 0) {
            result.description = description;
          }
          return result;
        }
        ChangeAnnotation2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
        }
        ChangeAnnotation2.is = is;
      })(ChangeAnnotation || (exports3.ChangeAnnotation = ChangeAnnotation = {}));
      var ChangeAnnotationIdentifier;
      (function(ChangeAnnotationIdentifier2) {
        function is(value) {
          var candidate = value;
          return Is.string(candidate);
        }
        ChangeAnnotationIdentifier2.is = is;
      })(ChangeAnnotationIdentifier || (exports3.ChangeAnnotationIdentifier = ChangeAnnotationIdentifier = {}));
      var AnnotatedTextEdit;
      (function(AnnotatedTextEdit2) {
        function replace(range, newText, annotation) {
          return { range, newText, annotationId: annotation };
        }
        AnnotatedTextEdit2.replace = replace;
        function insert(position, newText, annotation) {
          return { range: { start: position, end: position }, newText, annotationId: annotation };
        }
        AnnotatedTextEdit2.insert = insert;
        function del(range, annotation) {
          return { range, newText: "", annotationId: annotation };
        }
        AnnotatedTextEdit2.del = del;
        function is(value) {
          var candidate = value;
          return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
        }
        AnnotatedTextEdit2.is = is;
      })(AnnotatedTextEdit || (exports3.AnnotatedTextEdit = AnnotatedTextEdit = {}));
      var TextDocumentEdit;
      (function(TextDocumentEdit2) {
        function create(textDocument, edits) {
          return { textDocument, edits };
        }
        TextDocumentEdit2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
        }
        TextDocumentEdit2.is = is;
      })(TextDocumentEdit || (exports3.TextDocumentEdit = TextDocumentEdit = {}));
      var CreateFile;
      (function(CreateFile2) {
        function create(uri, options, annotation) {
          var result = {
            kind: "create",
            uri
          };
          if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
            result.options = options;
          }
          if (annotation !== void 0) {
            result.annotationId = annotation;
          }
          return result;
        }
        CreateFile2.create = create;
        function is(value) {
          var candidate = value;
          return candidate && candidate.kind === "create" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
        }
        CreateFile2.is = is;
      })(CreateFile || (exports3.CreateFile = CreateFile = {}));
      var RenameFile;
      (function(RenameFile2) {
        function create(oldUri, newUri, options, annotation) {
          var result = {
            kind: "rename",
            oldUri,
            newUri
          };
          if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
            result.options = options;
          }
          if (annotation !== void 0) {
            result.annotationId = annotation;
          }
          return result;
        }
        RenameFile2.create = create;
        function is(value) {
          var candidate = value;
          return candidate && candidate.kind === "rename" && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
        }
        RenameFile2.is = is;
      })(RenameFile || (exports3.RenameFile = RenameFile = {}));
      var DeleteFile;
      (function(DeleteFile2) {
        function create(uri, options, annotation) {
          var result = {
            kind: "delete",
            uri
          };
          if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) {
            result.options = options;
          }
          if (annotation !== void 0) {
            result.annotationId = annotation;
          }
          return result;
        }
        DeleteFile2.create = create;
        function is(value) {
          var candidate = value;
          return candidate && candidate.kind === "delete" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
        }
        DeleteFile2.is = is;
      })(DeleteFile || (exports3.DeleteFile = DeleteFile = {}));
      var WorkspaceEdit;
      (function(WorkspaceEdit2) {
        function is(value) {
          var candidate = value;
          return candidate && (candidate.changes !== void 0 || candidate.documentChanges !== void 0) && (candidate.documentChanges === void 0 || candidate.documentChanges.every(function(change) {
            if (Is.string(change.kind)) {
              return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
            } else {
              return TextDocumentEdit.is(change);
            }
          }));
        }
        WorkspaceEdit2.is = is;
      })(WorkspaceEdit || (exports3.WorkspaceEdit = WorkspaceEdit = {}));
      var TextEditChangeImpl = (
        /** @class */
        function() {
          function TextEditChangeImpl2(edits, changeAnnotations) {
            this.edits = edits;
            this.changeAnnotations = changeAnnotations;
          }
          TextEditChangeImpl2.prototype.insert = function(position, newText, annotation) {
            var edit;
            var id;
            if (annotation === void 0) {
              edit = TextEdit.insert(position, newText);
            } else if (ChangeAnnotationIdentifier.is(annotation)) {
              id = annotation;
              edit = AnnotatedTextEdit.insert(position, newText, annotation);
            } else {
              this.assertChangeAnnotations(this.changeAnnotations);
              id = this.changeAnnotations.manage(annotation);
              edit = AnnotatedTextEdit.insert(position, newText, id);
            }
            this.edits.push(edit);
            if (id !== void 0) {
              return id;
            }
          };
          TextEditChangeImpl2.prototype.replace = function(range, newText, annotation) {
            var edit;
            var id;
            if (annotation === void 0) {
              edit = TextEdit.replace(range, newText);
            } else if (ChangeAnnotationIdentifier.is(annotation)) {
              id = annotation;
              edit = AnnotatedTextEdit.replace(range, newText, annotation);
            } else {
              this.assertChangeAnnotations(this.changeAnnotations);
              id = this.changeAnnotations.manage(annotation);
              edit = AnnotatedTextEdit.replace(range, newText, id);
            }
            this.edits.push(edit);
            if (id !== void 0) {
              return id;
            }
          };
          TextEditChangeImpl2.prototype.delete = function(range, annotation) {
            var edit;
            var id;
            if (annotation === void 0) {
              edit = TextEdit.del(range);
            } else if (ChangeAnnotationIdentifier.is(annotation)) {
              id = annotation;
              edit = AnnotatedTextEdit.del(range, annotation);
            } else {
              this.assertChangeAnnotations(this.changeAnnotations);
              id = this.changeAnnotations.manage(annotation);
              edit = AnnotatedTextEdit.del(range, id);
            }
            this.edits.push(edit);
            if (id !== void 0) {
              return id;
            }
          };
          TextEditChangeImpl2.prototype.add = function(edit) {
            this.edits.push(edit);
          };
          TextEditChangeImpl2.prototype.all = function() {
            return this.edits;
          };
          TextEditChangeImpl2.prototype.clear = function() {
            this.edits.splice(0, this.edits.length);
          };
          TextEditChangeImpl2.prototype.assertChangeAnnotations = function(value) {
            if (value === void 0) {
              throw new Error("Text edit change is not configured to manage change annotations.");
            }
          };
          return TextEditChangeImpl2;
        }()
      );
      var ChangeAnnotations = (
        /** @class */
        function() {
          function ChangeAnnotations2(annotations) {
            this._annotations = annotations === void 0 ? /* @__PURE__ */ Object.create(null) : annotations;
            this._counter = 0;
            this._size = 0;
          }
          ChangeAnnotations2.prototype.all = function() {
            return this._annotations;
          };
          Object.defineProperty(ChangeAnnotations2.prototype, "size", {
            get: function() {
              return this._size;
            },
            enumerable: false,
            configurable: true
          });
          ChangeAnnotations2.prototype.manage = function(idOrAnnotation, annotation) {
            var id;
            if (ChangeAnnotationIdentifier.is(idOrAnnotation)) {
              id = idOrAnnotation;
            } else {
              id = this.nextId();
              annotation = idOrAnnotation;
            }
            if (this._annotations[id] !== void 0) {
              throw new Error("Id ".concat(id, " is already in use."));
            }
            if (annotation === void 0) {
              throw new Error("No annotation provided for id ".concat(id));
            }
            this._annotations[id] = annotation;
            this._size++;
            return id;
          };
          ChangeAnnotations2.prototype.nextId = function() {
            this._counter++;
            return this._counter.toString();
          };
          return ChangeAnnotations2;
        }()
      );
      var WorkspaceChange = (
        /** @class */
        function() {
          function WorkspaceChange2(workspaceEdit) {
            var _this = this;
            this._textEditChanges = /* @__PURE__ */ Object.create(null);
            if (workspaceEdit !== void 0) {
              this._workspaceEdit = workspaceEdit;
              if (workspaceEdit.documentChanges) {
                this._changeAnnotations = new ChangeAnnotations(workspaceEdit.changeAnnotations);
                workspaceEdit.changeAnnotations = this._changeAnnotations.all();
                workspaceEdit.documentChanges.forEach(function(change) {
                  if (TextDocumentEdit.is(change)) {
                    var textEditChange = new TextEditChangeImpl(change.edits, _this._changeAnnotations);
                    _this._textEditChanges[change.textDocument.uri] = textEditChange;
                  }
                });
              } else if (workspaceEdit.changes) {
                Object.keys(workspaceEdit.changes).forEach(function(key) {
                  var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
                  _this._textEditChanges[key] = textEditChange;
                });
              }
            } else {
              this._workspaceEdit = {};
            }
          }
          Object.defineProperty(WorkspaceChange2.prototype, "edit", {
            /**
             * Returns the underlying {@link WorkspaceEdit} literal
             * use to be returned from a workspace edit operation like rename.
             */
            get: function() {
              this.initDocumentChanges();
              if (this._changeAnnotations !== void 0) {
                if (this._changeAnnotations.size === 0) {
                  this._workspaceEdit.changeAnnotations = void 0;
                } else {
                  this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
                }
              }
              return this._workspaceEdit;
            },
            enumerable: false,
            configurable: true
          });
          WorkspaceChange2.prototype.getTextEditChange = function(key) {
            if (OptionalVersionedTextDocumentIdentifier.is(key)) {
              this.initDocumentChanges();
              if (this._workspaceEdit.documentChanges === void 0) {
                throw new Error("Workspace edit is not configured for document changes.");
              }
              var textDocument = { uri: key.uri, version: key.version };
              var result = this._textEditChanges[textDocument.uri];
              if (!result) {
                var edits = [];
                var textDocumentEdit = {
                  textDocument,
                  edits
                };
                this._workspaceEdit.documentChanges.push(textDocumentEdit);
                result = new TextEditChangeImpl(edits, this._changeAnnotations);
                this._textEditChanges[textDocument.uri] = result;
              }
              return result;
            } else {
              this.initChanges();
              if (this._workspaceEdit.changes === void 0) {
                throw new Error("Workspace edit is not configured for normal text edit changes.");
              }
              var result = this._textEditChanges[key];
              if (!result) {
                var edits = [];
                this._workspaceEdit.changes[key] = edits;
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[key] = result;
              }
              return result;
            }
          };
          WorkspaceChange2.prototype.initDocumentChanges = function() {
            if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) {
              this._changeAnnotations = new ChangeAnnotations();
              this._workspaceEdit.documentChanges = [];
              this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
            }
          };
          WorkspaceChange2.prototype.initChanges = function() {
            if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) {
              this._workspaceEdit.changes = /* @__PURE__ */ Object.create(null);
            }
          };
          WorkspaceChange2.prototype.createFile = function(uri, optionsOrAnnotation, options) {
            this.initDocumentChanges();
            if (this._workspaceEdit.documentChanges === void 0) {
              throw new Error("Workspace edit is not configured for document changes.");
            }
            var annotation;
            if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
              annotation = optionsOrAnnotation;
            } else {
              options = optionsOrAnnotation;
            }
            var operation;
            var id;
            if (annotation === void 0) {
              operation = CreateFile.create(uri, options);
            } else {
              id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
              operation = CreateFile.create(uri, options, id);
            }
            this._workspaceEdit.documentChanges.push(operation);
            if (id !== void 0) {
              return id;
            }
          };
          WorkspaceChange2.prototype.renameFile = function(oldUri, newUri, optionsOrAnnotation, options) {
            this.initDocumentChanges();
            if (this._workspaceEdit.documentChanges === void 0) {
              throw new Error("Workspace edit is not configured for document changes.");
            }
            var annotation;
            if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
              annotation = optionsOrAnnotation;
            } else {
              options = optionsOrAnnotation;
            }
            var operation;
            var id;
            if (annotation === void 0) {
              operation = RenameFile.create(oldUri, newUri, options);
            } else {
              id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
              operation = RenameFile.create(oldUri, newUri, options, id);
            }
            this._workspaceEdit.documentChanges.push(operation);
            if (id !== void 0) {
              return id;
            }
          };
          WorkspaceChange2.prototype.deleteFile = function(uri, optionsOrAnnotation, options) {
            this.initDocumentChanges();
            if (this._workspaceEdit.documentChanges === void 0) {
              throw new Error("Workspace edit is not configured for document changes.");
            }
            var annotation;
            if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
              annotation = optionsOrAnnotation;
            } else {
              options = optionsOrAnnotation;
            }
            var operation;
            var id;
            if (annotation === void 0) {
              operation = DeleteFile.create(uri, options);
            } else {
              id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
              operation = DeleteFile.create(uri, options, id);
            }
            this._workspaceEdit.documentChanges.push(operation);
            if (id !== void 0) {
              return id;
            }
          };
          return WorkspaceChange2;
        }()
      );
      exports3.WorkspaceChange = WorkspaceChange;
      var TextDocumentIdentifier;
      (function(TextDocumentIdentifier2) {
        function create(uri) {
          return { uri };
        }
        TextDocumentIdentifier2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.string(candidate.uri);
        }
        TextDocumentIdentifier2.is = is;
      })(TextDocumentIdentifier || (exports3.TextDocumentIdentifier = TextDocumentIdentifier = {}));
      var VersionedTextDocumentIdentifier;
      (function(VersionedTextDocumentIdentifier2) {
        function create(uri, version) {
          return { uri, version };
        }
        VersionedTextDocumentIdentifier2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.string(candidate.uri) && Is.integer(candidate.version);
        }
        VersionedTextDocumentIdentifier2.is = is;
      })(VersionedTextDocumentIdentifier || (exports3.VersionedTextDocumentIdentifier = VersionedTextDocumentIdentifier = {}));
      var OptionalVersionedTextDocumentIdentifier;
      (function(OptionalVersionedTextDocumentIdentifier2) {
        function create(uri, version) {
          return { uri, version };
        }
        OptionalVersionedTextDocumentIdentifier2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.integer(candidate.version));
        }
        OptionalVersionedTextDocumentIdentifier2.is = is;
      })(OptionalVersionedTextDocumentIdentifier || (exports3.OptionalVersionedTextDocumentIdentifier = OptionalVersionedTextDocumentIdentifier = {}));
      var TextDocumentItem;
      (function(TextDocumentItem2) {
        function create(uri, languageId, version, text) {
          return { uri, languageId, version, text };
        }
        TextDocumentItem2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.integer(candidate.version) && Is.string(candidate.text);
        }
        TextDocumentItem2.is = is;
      })(TextDocumentItem || (exports3.TextDocumentItem = TextDocumentItem = {}));
      var MarkupKind2;
      (function(MarkupKind3) {
        MarkupKind3.PlainText = "plaintext";
        MarkupKind3.Markdown = "markdown";
        function is(value) {
          var candidate = value;
          return candidate === MarkupKind3.PlainText || candidate === MarkupKind3.Markdown;
        }
        MarkupKind3.is = is;
      })(MarkupKind2 || (exports3.MarkupKind = MarkupKind2 = {}));
      var MarkupContent;
      (function(MarkupContent2) {
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(value) && MarkupKind2.is(candidate.kind) && Is.string(candidate.value);
        }
        MarkupContent2.is = is;
      })(MarkupContent || (exports3.MarkupContent = MarkupContent = {}));
      var CompletionItemKind2;
      (function(CompletionItemKind3) {
        CompletionItemKind3.Text = 1;
        CompletionItemKind3.Method = 2;
        CompletionItemKind3.Function = 3;
        CompletionItemKind3.Constructor = 4;
        CompletionItemKind3.Field = 5;
        CompletionItemKind3.Variable = 6;
        CompletionItemKind3.Class = 7;
        CompletionItemKind3.Interface = 8;
        CompletionItemKind3.Module = 9;
        CompletionItemKind3.Property = 10;
        CompletionItemKind3.Unit = 11;
        CompletionItemKind3.Value = 12;
        CompletionItemKind3.Enum = 13;
        CompletionItemKind3.Keyword = 14;
        CompletionItemKind3.Snippet = 15;
        CompletionItemKind3.Color = 16;
        CompletionItemKind3.File = 17;
        CompletionItemKind3.Reference = 18;
        CompletionItemKind3.Folder = 19;
        CompletionItemKind3.EnumMember = 20;
        CompletionItemKind3.Constant = 21;
        CompletionItemKind3.Struct = 22;
        CompletionItemKind3.Event = 23;
        CompletionItemKind3.Operator = 24;
        CompletionItemKind3.TypeParameter = 25;
      })(CompletionItemKind2 || (exports3.CompletionItemKind = CompletionItemKind2 = {}));
      var InsertTextFormat;
      (function(InsertTextFormat2) {
        InsertTextFormat2.PlainText = 1;
        InsertTextFormat2.Snippet = 2;
      })(InsertTextFormat || (exports3.InsertTextFormat = InsertTextFormat = {}));
      var CompletionItemTag;
      (function(CompletionItemTag2) {
        CompletionItemTag2.Deprecated = 1;
      })(CompletionItemTag || (exports3.CompletionItemTag = CompletionItemTag = {}));
      var InsertReplaceEdit;
      (function(InsertReplaceEdit2) {
        function create(newText, insert, replace) {
          return { newText, insert, replace };
        }
        InsertReplaceEdit2.create = create;
        function is(value) {
          var candidate = value;
          return candidate && Is.string(candidate.newText) && Range.is(candidate.insert) && Range.is(candidate.replace);
        }
        InsertReplaceEdit2.is = is;
      })(InsertReplaceEdit || (exports3.InsertReplaceEdit = InsertReplaceEdit = {}));
      var InsertTextMode;
      (function(InsertTextMode2) {
        InsertTextMode2.asIs = 1;
        InsertTextMode2.adjustIndentation = 2;
      })(InsertTextMode || (exports3.InsertTextMode = InsertTextMode = {}));
      var CompletionItemLabelDetails;
      (function(CompletionItemLabelDetails2) {
        function is(value) {
          var candidate = value;
          return candidate && (Is.string(candidate.detail) || candidate.detail === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
        }
        CompletionItemLabelDetails2.is = is;
      })(CompletionItemLabelDetails || (exports3.CompletionItemLabelDetails = CompletionItemLabelDetails = {}));
      var CompletionItem2;
      (function(CompletionItem3) {
        function create(label) {
          return { label };
        }
        CompletionItem3.create = create;
      })(CompletionItem2 || (exports3.CompletionItem = CompletionItem2 = {}));
      var CompletionList;
      (function(CompletionList2) {
        function create(items, isIncomplete) {
          return { items: items ? items : [], isIncomplete: !!isIncomplete };
        }
        CompletionList2.create = create;
      })(CompletionList || (exports3.CompletionList = CompletionList = {}));
      var MarkedString;
      (function(MarkedString2) {
        function fromPlainText(plainText) {
          return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
        }
        MarkedString2.fromPlainText = fromPlainText;
        function is(value) {
          var candidate = value;
          return Is.string(candidate) || Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value);
        }
        MarkedString2.is = is;
      })(MarkedString || (exports3.MarkedString = MarkedString = {}));
      var Hover2;
      (function(Hover3) {
        function is(value) {
          var candidate = value;
          return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) || MarkedString.is(candidate.contents) || Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range.is(value.range));
        }
        Hover3.is = is;
      })(Hover2 || (exports3.Hover = Hover2 = {}));
      var ParameterInformation;
      (function(ParameterInformation2) {
        function create(label, documentation) {
          return documentation ? { label, documentation } : { label };
        }
        ParameterInformation2.create = create;
      })(ParameterInformation || (exports3.ParameterInformation = ParameterInformation = {}));
      var SignatureInformation;
      (function(SignatureInformation2) {
        function create(label, documentation) {
          var parameters = [];
          for (var _i = 2; _i < arguments.length; _i++) {
            parameters[_i - 2] = arguments[_i];
          }
          var result = { label };
          if (Is.defined(documentation)) {
            result.documentation = documentation;
          }
          if (Is.defined(parameters)) {
            result.parameters = parameters;
          } else {
            result.parameters = [];
          }
          return result;
        }
        SignatureInformation2.create = create;
      })(SignatureInformation || (exports3.SignatureInformation = SignatureInformation = {}));
      var DocumentHighlightKind;
      (function(DocumentHighlightKind2) {
        DocumentHighlightKind2.Text = 1;
        DocumentHighlightKind2.Read = 2;
        DocumentHighlightKind2.Write = 3;
      })(DocumentHighlightKind || (exports3.DocumentHighlightKind = DocumentHighlightKind = {}));
      var DocumentHighlight;
      (function(DocumentHighlight2) {
        function create(range, kind) {
          var result = { range };
          if (Is.number(kind)) {
            result.kind = kind;
          }
          return result;
        }
        DocumentHighlight2.create = create;
      })(DocumentHighlight || (exports3.DocumentHighlight = DocumentHighlight = {}));
      var SymbolKind;
      (function(SymbolKind2) {
        SymbolKind2.File = 1;
        SymbolKind2.Module = 2;
        SymbolKind2.Namespace = 3;
        SymbolKind2.Package = 4;
        SymbolKind2.Class = 5;
        SymbolKind2.Method = 6;
        SymbolKind2.Property = 7;
        SymbolKind2.Field = 8;
        SymbolKind2.Constructor = 9;
        SymbolKind2.Enum = 10;
        SymbolKind2.Interface = 11;
        SymbolKind2.Function = 12;
        SymbolKind2.Variable = 13;
        SymbolKind2.Constant = 14;
        SymbolKind2.String = 15;
        SymbolKind2.Number = 16;
        SymbolKind2.Boolean = 17;
        SymbolKind2.Array = 18;
        SymbolKind2.Object = 19;
        SymbolKind2.Key = 20;
        SymbolKind2.Null = 21;
        SymbolKind2.EnumMember = 22;
        SymbolKind2.Struct = 23;
        SymbolKind2.Event = 24;
        SymbolKind2.Operator = 25;
        SymbolKind2.TypeParameter = 26;
      })(SymbolKind || (exports3.SymbolKind = SymbolKind = {}));
      var SymbolTag;
      (function(SymbolTag2) {
        SymbolTag2.Deprecated = 1;
      })(SymbolTag || (exports3.SymbolTag = SymbolTag = {}));
      var SymbolInformation;
      (function(SymbolInformation2) {
        function create(name, kind, range, uri, containerName) {
          var result = {
            name,
            kind,
            location: { uri, range }
          };
          if (containerName) {
            result.containerName = containerName;
          }
          return result;
        }
        SymbolInformation2.create = create;
      })(SymbolInformation || (exports3.SymbolInformation = SymbolInformation = {}));
      var WorkspaceSymbol;
      (function(WorkspaceSymbol2) {
        function create(name, kind, uri, range) {
          return range !== void 0 ? { name, kind, location: { uri, range } } : { name, kind, location: { uri } };
        }
        WorkspaceSymbol2.create = create;
      })(WorkspaceSymbol || (exports3.WorkspaceSymbol = WorkspaceSymbol = {}));
      var DocumentSymbol;
      (function(DocumentSymbol2) {
        function create(name, detail, kind, range, selectionRange, children) {
          var result = {
            name,
            detail,
            kind,
            range,
            selectionRange
          };
          if (children !== void 0) {
            result.children = children;
          }
          return result;
        }
        DocumentSymbol2.create = create;
        function is(value) {
          var candidate = value;
          return candidate && Is.string(candidate.name) && Is.number(candidate.kind) && Range.is(candidate.range) && Range.is(candidate.selectionRange) && (candidate.detail === void 0 || Is.string(candidate.detail)) && (candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) && (candidate.children === void 0 || Array.isArray(candidate.children)) && (candidate.tags === void 0 || Array.isArray(candidate.tags));
        }
        DocumentSymbol2.is = is;
      })(DocumentSymbol || (exports3.DocumentSymbol = DocumentSymbol = {}));
      var CodeActionKind;
      (function(CodeActionKind2) {
        CodeActionKind2.Empty = "";
        CodeActionKind2.QuickFix = "quickfix";
        CodeActionKind2.Refactor = "refactor";
        CodeActionKind2.RefactorExtract = "refactor.extract";
        CodeActionKind2.RefactorInline = "refactor.inline";
        CodeActionKind2.RefactorRewrite = "refactor.rewrite";
        CodeActionKind2.Source = "source";
        CodeActionKind2.SourceOrganizeImports = "source.organizeImports";
        CodeActionKind2.SourceFixAll = "source.fixAll";
      })(CodeActionKind || (exports3.CodeActionKind = CodeActionKind = {}));
      var CodeActionTriggerKind;
      (function(CodeActionTriggerKind2) {
        CodeActionTriggerKind2.Invoked = 1;
        CodeActionTriggerKind2.Automatic = 2;
      })(CodeActionTriggerKind || (exports3.CodeActionTriggerKind = CodeActionTriggerKind = {}));
      var CodeActionContext;
      (function(CodeActionContext2) {
        function create(diagnostics, only, triggerKind) {
          var result = { diagnostics };
          if (only !== void 0 && only !== null) {
            result.only = only;
          }
          if (triggerKind !== void 0 && triggerKind !== null) {
            result.triggerKind = triggerKind;
          }
          return result;
        }
        CodeActionContext2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic2.is) && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string)) && (candidate.triggerKind === void 0 || candidate.triggerKind === CodeActionTriggerKind.Invoked || candidate.triggerKind === CodeActionTriggerKind.Automatic);
        }
        CodeActionContext2.is = is;
      })(CodeActionContext || (exports3.CodeActionContext = CodeActionContext = {}));
      var CodeAction;
      (function(CodeAction2) {
        function create(title, kindOrCommandOrEdit, kind) {
          var result = { title };
          var checkKind = true;
          if (typeof kindOrCommandOrEdit === "string") {
            checkKind = false;
            result.kind = kindOrCommandOrEdit;
          } else if (Command.is(kindOrCommandOrEdit)) {
            result.command = kindOrCommandOrEdit;
          } else {
            result.edit = kindOrCommandOrEdit;
          }
          if (checkKind && kind !== void 0) {
            result.kind = kind;
          }
          return result;
        }
        CodeAction2.create = create;
        function is(value) {
          var candidate = value;
          return candidate && Is.string(candidate.title) && (candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic2.is)) && (candidate.kind === void 0 || Is.string(candidate.kind)) && (candidate.edit !== void 0 || candidate.command !== void 0) && (candidate.command === void 0 || Command.is(candidate.command)) && (candidate.isPreferred === void 0 || Is.boolean(candidate.isPreferred)) && (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
        }
        CodeAction2.is = is;
      })(CodeAction || (exports3.CodeAction = CodeAction = {}));
      var CodeLens;
      (function(CodeLens2) {
        function create(range, data) {
          var result = { range };
          if (Is.defined(data)) {
            result.data = data;
          }
          return result;
        }
        CodeLens2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
        }
        CodeLens2.is = is;
      })(CodeLens || (exports3.CodeLens = CodeLens = {}));
      var FormattingOptions;
      (function(FormattingOptions2) {
        function create(tabSize, insertSpaces) {
          return { tabSize, insertSpaces };
        }
        FormattingOptions2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.uinteger(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
        }
        FormattingOptions2.is = is;
      })(FormattingOptions || (exports3.FormattingOptions = FormattingOptions = {}));
      var DocumentLink;
      (function(DocumentLink2) {
        function create(range, target, data) {
          return { range, target, data };
        }
        DocumentLink2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
        }
        DocumentLink2.is = is;
      })(DocumentLink || (exports3.DocumentLink = DocumentLink = {}));
      var SelectionRange;
      (function(SelectionRange2) {
        function create(range, parent) {
          return { range, parent };
        }
        SelectionRange2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Range.is(candidate.range) && (candidate.parent === void 0 || SelectionRange2.is(candidate.parent));
        }
        SelectionRange2.is = is;
      })(SelectionRange || (exports3.SelectionRange = SelectionRange = {}));
      var SemanticTokenTypes2;
      (function(SemanticTokenTypes3) {
        SemanticTokenTypes3["namespace"] = "namespace";
        SemanticTokenTypes3["type"] = "type";
        SemanticTokenTypes3["class"] = "class";
        SemanticTokenTypes3["enum"] = "enum";
        SemanticTokenTypes3["interface"] = "interface";
        SemanticTokenTypes3["struct"] = "struct";
        SemanticTokenTypes3["typeParameter"] = "typeParameter";
        SemanticTokenTypes3["parameter"] = "parameter";
        SemanticTokenTypes3["variable"] = "variable";
        SemanticTokenTypes3["property"] = "property";
        SemanticTokenTypes3["enumMember"] = "enumMember";
        SemanticTokenTypes3["event"] = "event";
        SemanticTokenTypes3["function"] = "function";
        SemanticTokenTypes3["method"] = "method";
        SemanticTokenTypes3["macro"] = "macro";
        SemanticTokenTypes3["keyword"] = "keyword";
        SemanticTokenTypes3["modifier"] = "modifier";
        SemanticTokenTypes3["comment"] = "comment";
        SemanticTokenTypes3["string"] = "string";
        SemanticTokenTypes3["number"] = "number";
        SemanticTokenTypes3["regexp"] = "regexp";
        SemanticTokenTypes3["operator"] = "operator";
        SemanticTokenTypes3["decorator"] = "decorator";
      })(SemanticTokenTypes2 || (exports3.SemanticTokenTypes = SemanticTokenTypes2 = {}));
      var SemanticTokenModifiers2;
      (function(SemanticTokenModifiers3) {
        SemanticTokenModifiers3["declaration"] = "declaration";
        SemanticTokenModifiers3["definition"] = "definition";
        SemanticTokenModifiers3["readonly"] = "readonly";
        SemanticTokenModifiers3["static"] = "static";
        SemanticTokenModifiers3["deprecated"] = "deprecated";
        SemanticTokenModifiers3["abstract"] = "abstract";
        SemanticTokenModifiers3["async"] = "async";
        SemanticTokenModifiers3["modification"] = "modification";
        SemanticTokenModifiers3["documentation"] = "documentation";
        SemanticTokenModifiers3["defaultLibrary"] = "defaultLibrary";
      })(SemanticTokenModifiers2 || (exports3.SemanticTokenModifiers = SemanticTokenModifiers2 = {}));
      var SemanticTokens2;
      (function(SemanticTokens3) {
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && (candidate.resultId === void 0 || typeof candidate.resultId === "string") && Array.isArray(candidate.data) && (candidate.data.length === 0 || typeof candidate.data[0] === "number");
        }
        SemanticTokens3.is = is;
      })(SemanticTokens2 || (exports3.SemanticTokens = SemanticTokens2 = {}));
      var InlineValueText;
      (function(InlineValueText2) {
        function create(range, text) {
          return { range, text };
        }
        InlineValueText2.create = create;
        function is(value) {
          var candidate = value;
          return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is.string(candidate.text);
        }
        InlineValueText2.is = is;
      })(InlineValueText || (exports3.InlineValueText = InlineValueText = {}));
      var InlineValueVariableLookup;
      (function(InlineValueVariableLookup2) {
        function create(range, variableName, caseSensitiveLookup) {
          return { range, variableName, caseSensitiveLookup };
        }
        InlineValueVariableLookup2.create = create;
        function is(value) {
          var candidate = value;
          return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is.boolean(candidate.caseSensitiveLookup) && (Is.string(candidate.variableName) || candidate.variableName === void 0);
        }
        InlineValueVariableLookup2.is = is;
      })(InlineValueVariableLookup || (exports3.InlineValueVariableLookup = InlineValueVariableLookup = {}));
      var InlineValueEvaluatableExpression;
      (function(InlineValueEvaluatableExpression2) {
        function create(range, expression) {
          return { range, expression };
        }
        InlineValueEvaluatableExpression2.create = create;
        function is(value) {
          var candidate = value;
          return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && (Is.string(candidate.expression) || candidate.expression === void 0);
        }
        InlineValueEvaluatableExpression2.is = is;
      })(InlineValueEvaluatableExpression || (exports3.InlineValueEvaluatableExpression = InlineValueEvaluatableExpression = {}));
      var InlineValueContext;
      (function(InlineValueContext2) {
        function create(frameId, stoppedLocation) {
          return { frameId, stoppedLocation };
        }
        InlineValueContext2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Range.is(value.stoppedLocation);
        }
        InlineValueContext2.is = is;
      })(InlineValueContext || (exports3.InlineValueContext = InlineValueContext = {}));
      var InlayHintKind;
      (function(InlayHintKind2) {
        InlayHintKind2.Type = 1;
        InlayHintKind2.Parameter = 2;
        function is(value) {
          return value === 1 || value === 2;
        }
        InlayHintKind2.is = is;
      })(InlayHintKind || (exports3.InlayHintKind = InlayHintKind = {}));
      var InlayHintLabelPart;
      (function(InlayHintLabelPart2) {
        function create(value) {
          return { value };
        }
        InlayHintLabelPart2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && (candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.location === void 0 || Location2.is(candidate.location)) && (candidate.command === void 0 || Command.is(candidate.command));
        }
        InlayHintLabelPart2.is = is;
      })(InlayHintLabelPart || (exports3.InlayHintLabelPart = InlayHintLabelPart = {}));
      var InlayHint;
      (function(InlayHint2) {
        function create(position, label, kind) {
          var result = { position, label };
          if (kind !== void 0) {
            result.kind = kind;
          }
          return result;
        }
        InlayHint2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Position.is(candidate.position) && (Is.string(candidate.label) || Is.typedArray(candidate.label, InlayHintLabelPart.is)) && (candidate.kind === void 0 || InlayHintKind.is(candidate.kind)) && candidate.textEdits === void 0 || Is.typedArray(candidate.textEdits, TextEdit.is) && (candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.paddingLeft === void 0 || Is.boolean(candidate.paddingLeft)) && (candidate.paddingRight === void 0 || Is.boolean(candidate.paddingRight));
        }
        InlayHint2.is = is;
      })(InlayHint || (exports3.InlayHint = InlayHint = {}));
      var StringValue;
      (function(StringValue2) {
        function createSnippet(value) {
          return { kind: "snippet", value };
        }
        StringValue2.createSnippet = createSnippet;
      })(StringValue || (exports3.StringValue = StringValue = {}));
      var InlineCompletionItem;
      (function(InlineCompletionItem2) {
        function create(insertText, filterText, range, command) {
          return { insertText, filterText, range, command };
        }
        InlineCompletionItem2.create = create;
      })(InlineCompletionItem || (exports3.InlineCompletionItem = InlineCompletionItem = {}));
      var InlineCompletionList;
      (function(InlineCompletionList2) {
        function create(items) {
          return { items };
        }
        InlineCompletionList2.create = create;
      })(InlineCompletionList || (exports3.InlineCompletionList = InlineCompletionList = {}));
      var InlineCompletionTriggerKind;
      (function(InlineCompletionTriggerKind2) {
        InlineCompletionTriggerKind2.Invoked = 0;
        InlineCompletionTriggerKind2.Automatic = 1;
      })(InlineCompletionTriggerKind || (exports3.InlineCompletionTriggerKind = InlineCompletionTriggerKind = {}));
      var SelectedCompletionInfo;
      (function(SelectedCompletionInfo2) {
        function create(range, text) {
          return { range, text };
        }
        SelectedCompletionInfo2.create = create;
      })(SelectedCompletionInfo || (exports3.SelectedCompletionInfo = SelectedCompletionInfo = {}));
      var InlineCompletionContext;
      (function(InlineCompletionContext2) {
        function create(triggerKind, selectedCompletionInfo) {
          return { triggerKind, selectedCompletionInfo };
        }
        InlineCompletionContext2.create = create;
      })(InlineCompletionContext || (exports3.InlineCompletionContext = InlineCompletionContext = {}));
      var WorkspaceFolder;
      (function(WorkspaceFolder2) {
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && URI.is(candidate.uri) && Is.string(candidate.name);
        }
        WorkspaceFolder2.is = is;
      })(WorkspaceFolder || (exports3.WorkspaceFolder = WorkspaceFolder = {}));
      exports3.EOL = ["\n", "\r\n", "\r"];
      var TextDocument2;
      (function(TextDocument3) {
        function create(uri, languageId, version, content) {
          return new FullTextDocument2(uri, languageId, version, content);
        }
        TextDocument3.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
        }
        TextDocument3.is = is;
        function applyEdits(document, edits) {
          var text = document.getText();
          var sortedEdits = mergeSort2(edits, function(a, b) {
            var diff = a.range.start.line - b.range.start.line;
            if (diff === 0) {
              return a.range.start.character - b.range.start.character;
            }
            return diff;
          });
          var lastModifiedOffset = text.length;
          for (var i = sortedEdits.length - 1; i >= 0; i--) {
            var e = sortedEdits[i];
            var startOffset = document.offsetAt(e.range.start);
            var endOffset = document.offsetAt(e.range.end);
            if (endOffset <= lastModifiedOffset) {
              text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
            } else {
              throw new Error("Overlapping edit");
            }
            lastModifiedOffset = startOffset;
          }
          return text;
        }
        TextDocument3.applyEdits = applyEdits;
        function mergeSort2(data, compare) {
          if (data.length <= 1) {
            return data;
          }
          var p = data.length / 2 | 0;
          var left = data.slice(0, p);
          var right = data.slice(p);
          mergeSort2(left, compare);
          mergeSort2(right, compare);
          var leftIdx = 0;
          var rightIdx = 0;
          var i = 0;
          while (leftIdx < left.length && rightIdx < right.length) {
            var ret = compare(left[leftIdx], right[rightIdx]);
            if (ret <= 0) {
              data[i++] = left[leftIdx++];
            } else {
              data[i++] = right[rightIdx++];
            }
          }
          while (leftIdx < left.length) {
            data[i++] = left[leftIdx++];
          }
          while (rightIdx < right.length) {
            data[i++] = right[rightIdx++];
          }
          return data;
        }
      })(TextDocument2 || (exports3.TextDocument = TextDocument2 = {}));
      var FullTextDocument2 = (
        /** @class */
        function() {
          function FullTextDocument3(uri, languageId, version, content) {
            this._uri = uri;
            this._languageId = languageId;
            this._version = version;
            this._content = content;
            this._lineOffsets = void 0;
          }
          Object.defineProperty(FullTextDocument3.prototype, "uri", {
            get: function() {
              return this._uri;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(FullTextDocument3.prototype, "languageId", {
            get: function() {
              return this._languageId;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(FullTextDocument3.prototype, "version", {
            get: function() {
              return this._version;
            },
            enumerable: false,
            configurable: true
          });
          FullTextDocument3.prototype.getText = function(range) {
            if (range) {
              var start = this.offsetAt(range.start);
              var end = this.offsetAt(range.end);
              return this._content.substring(start, end);
            }
            return this._content;
          };
          FullTextDocument3.prototype.update = function(event, version) {
            this._content = event.text;
            this._version = version;
            this._lineOffsets = void 0;
          };
          FullTextDocument3.prototype.getLineOffsets = function() {
            if (this._lineOffsets === void 0) {
              var lineOffsets = [];
              var text = this._content;
              var isLineStart = true;
              for (var i = 0; i < text.length; i++) {
                if (isLineStart) {
                  lineOffsets.push(i);
                  isLineStart = false;
                }
                var ch = text.charAt(i);
                isLineStart = ch === "\r" || ch === "\n";
                if (ch === "\r" && i + 1 < text.length && text.charAt(i + 1) === "\n") {
                  i++;
                }
              }
              if (isLineStart && text.length > 0) {
                lineOffsets.push(text.length);
              }
              this._lineOffsets = lineOffsets;
            }
            return this._lineOffsets;
          };
          FullTextDocument3.prototype.positionAt = function(offset) {
            offset = Math.max(Math.min(offset, this._content.length), 0);
            var lineOffsets = this.getLineOffsets();
            var low = 0, high = lineOffsets.length;
            if (high === 0) {
              return Position.create(0, offset);
            }
            while (low < high) {
              var mid = Math.floor((low + high) / 2);
              if (lineOffsets[mid] > offset) {
                high = mid;
              } else {
                low = mid + 1;
              }
            }
            var line = low - 1;
            return Position.create(line, offset - lineOffsets[line]);
          };
          FullTextDocument3.prototype.offsetAt = function(position) {
            var lineOffsets = this.getLineOffsets();
            if (position.line >= lineOffsets.length) {
              return this._content.length;
            } else if (position.line < 0) {
              return 0;
            }
            var lineOffset = lineOffsets[position.line];
            var nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
            return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
          };
          Object.defineProperty(FullTextDocument3.prototype, "lineCount", {
            get: function() {
              return this.getLineOffsets().length;
            },
            enumerable: false,
            configurable: true
          });
          return FullTextDocument3;
        }()
      );
      var Is;
      (function(Is2) {
        var toString = Object.prototype.toString;
        function defined(value) {
          return typeof value !== "undefined";
        }
        Is2.defined = defined;
        function undefined2(value) {
          return typeof value === "undefined";
        }
        Is2.undefined = undefined2;
        function boolean(value) {
          return value === true || value === false;
        }
        Is2.boolean = boolean;
        function string(value) {
          return toString.call(value) === "[object String]";
        }
        Is2.string = string;
        function number(value) {
          return toString.call(value) === "[object Number]";
        }
        Is2.number = number;
        function numberRange(value, min, max) {
          return toString.call(value) === "[object Number]" && min <= value && value <= max;
        }
        Is2.numberRange = numberRange;
        function integer2(value) {
          return toString.call(value) === "[object Number]" && -2147483648 <= value && value <= 2147483647;
        }
        Is2.integer = integer2;
        function uinteger2(value) {
          return toString.call(value) === "[object Number]" && 0 <= value && value <= 2147483647;
        }
        Is2.uinteger = uinteger2;
        function func(value) {
          return toString.call(value) === "[object Function]";
        }
        Is2.func = func;
        function objectLiteral(value) {
          return value !== null && typeof value === "object";
        }
        Is2.objectLiteral = objectLiteral;
        function typedArray(value, check) {
          return Array.isArray(value) && value.every(check);
        }
        Is2.typedArray = typedArray;
      })(Is || (Is = {}));
    });
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/messages.js
var require_messages2 = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/messages.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProtocolNotificationType = exports2.ProtocolNotificationType0 = exports2.ProtocolRequestType = exports2.ProtocolRequestType0 = exports2.RegistrationType = exports2.MessageDirection = void 0;
    var vscode_jsonrpc_1 = require_main();
    var MessageDirection;
    (function(MessageDirection2) {
      MessageDirection2["clientToServer"] = "clientToServer";
      MessageDirection2["serverToClient"] = "serverToClient";
      MessageDirection2["both"] = "both";
    })(MessageDirection || (exports2.MessageDirection = MessageDirection = {}));
    var RegistrationType = class {
      constructor(method) {
        this.method = method;
      }
    };
    exports2.RegistrationType = RegistrationType;
    var ProtocolRequestType0 = class extends vscode_jsonrpc_1.RequestType0 {
      constructor(method) {
        super(method);
      }
    };
    exports2.ProtocolRequestType0 = ProtocolRequestType0;
    var ProtocolRequestType = class extends vscode_jsonrpc_1.RequestType {
      constructor(method) {
        super(method, vscode_jsonrpc_1.ParameterStructures.byName);
      }
    };
    exports2.ProtocolRequestType = ProtocolRequestType;
    var ProtocolNotificationType0 = class extends vscode_jsonrpc_1.NotificationType0 {
      constructor(method) {
        super(method);
      }
    };
    exports2.ProtocolNotificationType0 = ProtocolNotificationType0;
    var ProtocolNotificationType = class extends vscode_jsonrpc_1.NotificationType {
      constructor(method) {
        super(method, vscode_jsonrpc_1.ParameterStructures.byName);
      }
    };
    exports2.ProtocolNotificationType = ProtocolNotificationType;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/utils/is.js
var require_is3 = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/utils/is.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.objectLiteral = exports2.typedArray = exports2.stringArray = exports2.array = exports2.func = exports2.error = exports2.number = exports2.string = exports2.boolean = void 0;
    function boolean(value) {
      return value === true || value === false;
    }
    exports2.boolean = boolean;
    function string(value) {
      return typeof value === "string" || value instanceof String;
    }
    exports2.string = string;
    function number(value) {
      return typeof value === "number" || value instanceof Number;
    }
    exports2.number = number;
    function error(value) {
      return value instanceof Error;
    }
    exports2.error = error;
    function func(value) {
      return typeof value === "function";
    }
    exports2.func = func;
    function array(value) {
      return Array.isArray(value);
    }
    exports2.array = array;
    function stringArray(value) {
      return array(value) && value.every((elem) => string(elem));
    }
    exports2.stringArray = stringArray;
    function typedArray(value, check) {
      return Array.isArray(value) && value.every(check);
    }
    exports2.typedArray = typedArray;
    function objectLiteral(value) {
      return value !== null && typeof value === "object";
    }
    exports2.objectLiteral = objectLiteral;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.implementation.js
var require_protocol_implementation = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.implementation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ImplementationRequest = void 0;
    var messages_1 = require_messages2();
    var ImplementationRequest;
    (function(ImplementationRequest2) {
      ImplementationRequest2.method = "textDocument/implementation";
      ImplementationRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      ImplementationRequest2.type = new messages_1.ProtocolRequestType(ImplementationRequest2.method);
    })(ImplementationRequest || (exports2.ImplementationRequest = ImplementationRequest = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.typeDefinition.js
var require_protocol_typeDefinition = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.typeDefinition.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TypeDefinitionRequest = void 0;
    var messages_1 = require_messages2();
    var TypeDefinitionRequest;
    (function(TypeDefinitionRequest2) {
      TypeDefinitionRequest2.method = "textDocument/typeDefinition";
      TypeDefinitionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      TypeDefinitionRequest2.type = new messages_1.ProtocolRequestType(TypeDefinitionRequest2.method);
    })(TypeDefinitionRequest || (exports2.TypeDefinitionRequest = TypeDefinitionRequest = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.workspaceFolder.js
var require_protocol_workspaceFolder = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.workspaceFolder.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DidChangeWorkspaceFoldersNotification = exports2.WorkspaceFoldersRequest = void 0;
    var messages_1 = require_messages2();
    var WorkspaceFoldersRequest;
    (function(WorkspaceFoldersRequest2) {
      WorkspaceFoldersRequest2.method = "workspace/workspaceFolders";
      WorkspaceFoldersRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      WorkspaceFoldersRequest2.type = new messages_1.ProtocolRequestType0(WorkspaceFoldersRequest2.method);
    })(WorkspaceFoldersRequest || (exports2.WorkspaceFoldersRequest = WorkspaceFoldersRequest = {}));
    var DidChangeWorkspaceFoldersNotification;
    (function(DidChangeWorkspaceFoldersNotification2) {
      DidChangeWorkspaceFoldersNotification2.method = "workspace/didChangeWorkspaceFolders";
      DidChangeWorkspaceFoldersNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidChangeWorkspaceFoldersNotification2.type = new messages_1.ProtocolNotificationType(DidChangeWorkspaceFoldersNotification2.method);
    })(DidChangeWorkspaceFoldersNotification || (exports2.DidChangeWorkspaceFoldersNotification = DidChangeWorkspaceFoldersNotification = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.configuration.js
var require_protocol_configuration = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.configuration.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ConfigurationRequest = void 0;
    var messages_1 = require_messages2();
    var ConfigurationRequest;
    (function(ConfigurationRequest2) {
      ConfigurationRequest2.method = "workspace/configuration";
      ConfigurationRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      ConfigurationRequest2.type = new messages_1.ProtocolRequestType(ConfigurationRequest2.method);
    })(ConfigurationRequest || (exports2.ConfigurationRequest = ConfigurationRequest = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.colorProvider.js
var require_protocol_colorProvider = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.colorProvider.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ColorPresentationRequest = exports2.DocumentColorRequest = void 0;
    var messages_1 = require_messages2();
    var DocumentColorRequest;
    (function(DocumentColorRequest2) {
      DocumentColorRequest2.method = "textDocument/documentColor";
      DocumentColorRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentColorRequest2.type = new messages_1.ProtocolRequestType(DocumentColorRequest2.method);
    })(DocumentColorRequest || (exports2.DocumentColorRequest = DocumentColorRequest = {}));
    var ColorPresentationRequest;
    (function(ColorPresentationRequest2) {
      ColorPresentationRequest2.method = "textDocument/colorPresentation";
      ColorPresentationRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      ColorPresentationRequest2.type = new messages_1.ProtocolRequestType(ColorPresentationRequest2.method);
    })(ColorPresentationRequest || (exports2.ColorPresentationRequest = ColorPresentationRequest = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.foldingRange.js
var require_protocol_foldingRange = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.foldingRange.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FoldingRangeRefreshRequest = exports2.FoldingRangeRequest = void 0;
    var messages_1 = require_messages2();
    var FoldingRangeRequest;
    (function(FoldingRangeRequest2) {
      FoldingRangeRequest2.method = "textDocument/foldingRange";
      FoldingRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      FoldingRangeRequest2.type = new messages_1.ProtocolRequestType(FoldingRangeRequest2.method);
    })(FoldingRangeRequest || (exports2.FoldingRangeRequest = FoldingRangeRequest = {}));
    var FoldingRangeRefreshRequest;
    (function(FoldingRangeRefreshRequest2) {
      FoldingRangeRefreshRequest2.method = `workspace/foldingRange/refresh`;
      FoldingRangeRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      FoldingRangeRefreshRequest2.type = new messages_1.ProtocolRequestType0(FoldingRangeRefreshRequest2.method);
    })(FoldingRangeRefreshRequest || (exports2.FoldingRangeRefreshRequest = FoldingRangeRefreshRequest = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.declaration.js
var require_protocol_declaration = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.declaration.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DeclarationRequest = void 0;
    var messages_1 = require_messages2();
    var DeclarationRequest;
    (function(DeclarationRequest2) {
      DeclarationRequest2.method = "textDocument/declaration";
      DeclarationRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DeclarationRequest2.type = new messages_1.ProtocolRequestType(DeclarationRequest2.method);
    })(DeclarationRequest || (exports2.DeclarationRequest = DeclarationRequest = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.selectionRange.js
var require_protocol_selectionRange = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.selectionRange.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SelectionRangeRequest = void 0;
    var messages_1 = require_messages2();
    var SelectionRangeRequest;
    (function(SelectionRangeRequest2) {
      SelectionRangeRequest2.method = "textDocument/selectionRange";
      SelectionRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      SelectionRangeRequest2.type = new messages_1.ProtocolRequestType(SelectionRangeRequest2.method);
    })(SelectionRangeRequest || (exports2.SelectionRangeRequest = SelectionRangeRequest = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.progress.js
var require_protocol_progress = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.progress.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WorkDoneProgressCancelNotification = exports2.WorkDoneProgressCreateRequest = exports2.WorkDoneProgress = void 0;
    var vscode_jsonrpc_1 = require_main();
    var messages_1 = require_messages2();
    var WorkDoneProgress;
    (function(WorkDoneProgress2) {
      WorkDoneProgress2.type = new vscode_jsonrpc_1.ProgressType();
      function is(value) {
        return value === WorkDoneProgress2.type;
      }
      WorkDoneProgress2.is = is;
    })(WorkDoneProgress || (exports2.WorkDoneProgress = WorkDoneProgress = {}));
    var WorkDoneProgressCreateRequest;
    (function(WorkDoneProgressCreateRequest2) {
      WorkDoneProgressCreateRequest2.method = "window/workDoneProgress/create";
      WorkDoneProgressCreateRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      WorkDoneProgressCreateRequest2.type = new messages_1.ProtocolRequestType(WorkDoneProgressCreateRequest2.method);
    })(WorkDoneProgressCreateRequest || (exports2.WorkDoneProgressCreateRequest = WorkDoneProgressCreateRequest = {}));
    var WorkDoneProgressCancelNotification;
    (function(WorkDoneProgressCancelNotification2) {
      WorkDoneProgressCancelNotification2.method = "window/workDoneProgress/cancel";
      WorkDoneProgressCancelNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      WorkDoneProgressCancelNotification2.type = new messages_1.ProtocolNotificationType(WorkDoneProgressCancelNotification2.method);
    })(WorkDoneProgressCancelNotification || (exports2.WorkDoneProgressCancelNotification = WorkDoneProgressCancelNotification = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.callHierarchy.js
var require_protocol_callHierarchy = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.callHierarchy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CallHierarchyOutgoingCallsRequest = exports2.CallHierarchyIncomingCallsRequest = exports2.CallHierarchyPrepareRequest = void 0;
    var messages_1 = require_messages2();
    var CallHierarchyPrepareRequest;
    (function(CallHierarchyPrepareRequest2) {
      CallHierarchyPrepareRequest2.method = "textDocument/prepareCallHierarchy";
      CallHierarchyPrepareRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CallHierarchyPrepareRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyPrepareRequest2.method);
    })(CallHierarchyPrepareRequest || (exports2.CallHierarchyPrepareRequest = CallHierarchyPrepareRequest = {}));
    var CallHierarchyIncomingCallsRequest;
    (function(CallHierarchyIncomingCallsRequest2) {
      CallHierarchyIncomingCallsRequest2.method = "callHierarchy/incomingCalls";
      CallHierarchyIncomingCallsRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CallHierarchyIncomingCallsRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyIncomingCallsRequest2.method);
    })(CallHierarchyIncomingCallsRequest || (exports2.CallHierarchyIncomingCallsRequest = CallHierarchyIncomingCallsRequest = {}));
    var CallHierarchyOutgoingCallsRequest;
    (function(CallHierarchyOutgoingCallsRequest2) {
      CallHierarchyOutgoingCallsRequest2.method = "callHierarchy/outgoingCalls";
      CallHierarchyOutgoingCallsRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CallHierarchyOutgoingCallsRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyOutgoingCallsRequest2.method);
    })(CallHierarchyOutgoingCallsRequest || (exports2.CallHierarchyOutgoingCallsRequest = CallHierarchyOutgoingCallsRequest = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.semanticTokens.js
var require_protocol_semanticTokens = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.semanticTokens.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SemanticTokensRefreshRequest = exports2.SemanticTokensRangeRequest = exports2.SemanticTokensDeltaRequest = exports2.SemanticTokensRequest = exports2.SemanticTokensRegistrationType = exports2.TokenFormat = void 0;
    var messages_1 = require_messages2();
    var TokenFormat;
    (function(TokenFormat2) {
      TokenFormat2.Relative = "relative";
    })(TokenFormat || (exports2.TokenFormat = TokenFormat = {}));
    var SemanticTokensRegistrationType;
    (function(SemanticTokensRegistrationType2) {
      SemanticTokensRegistrationType2.method = "textDocument/semanticTokens";
      SemanticTokensRegistrationType2.type = new messages_1.RegistrationType(SemanticTokensRegistrationType2.method);
    })(SemanticTokensRegistrationType || (exports2.SemanticTokensRegistrationType = SemanticTokensRegistrationType = {}));
    var SemanticTokensRequest;
    (function(SemanticTokensRequest2) {
      SemanticTokensRequest2.method = "textDocument/semanticTokens/full";
      SemanticTokensRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      SemanticTokensRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensRequest2.method);
      SemanticTokensRequest2.registrationMethod = SemanticTokensRegistrationType.method;
    })(SemanticTokensRequest || (exports2.SemanticTokensRequest = SemanticTokensRequest = {}));
    var SemanticTokensDeltaRequest;
    (function(SemanticTokensDeltaRequest2) {
      SemanticTokensDeltaRequest2.method = "textDocument/semanticTokens/full/delta";
      SemanticTokensDeltaRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      SemanticTokensDeltaRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensDeltaRequest2.method);
      SemanticTokensDeltaRequest2.registrationMethod = SemanticTokensRegistrationType.method;
    })(SemanticTokensDeltaRequest || (exports2.SemanticTokensDeltaRequest = SemanticTokensDeltaRequest = {}));
    var SemanticTokensRangeRequest;
    (function(SemanticTokensRangeRequest2) {
      SemanticTokensRangeRequest2.method = "textDocument/semanticTokens/range";
      SemanticTokensRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      SemanticTokensRangeRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensRangeRequest2.method);
      SemanticTokensRangeRequest2.registrationMethod = SemanticTokensRegistrationType.method;
    })(SemanticTokensRangeRequest || (exports2.SemanticTokensRangeRequest = SemanticTokensRangeRequest = {}));
    var SemanticTokensRefreshRequest;
    (function(SemanticTokensRefreshRequest2) {
      SemanticTokensRefreshRequest2.method = `workspace/semanticTokens/refresh`;
      SemanticTokensRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      SemanticTokensRefreshRequest2.type = new messages_1.ProtocolRequestType0(SemanticTokensRefreshRequest2.method);
    })(SemanticTokensRefreshRequest || (exports2.SemanticTokensRefreshRequest = SemanticTokensRefreshRequest = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.showDocument.js
var require_protocol_showDocument = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.showDocument.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ShowDocumentRequest = void 0;
    var messages_1 = require_messages2();
    var ShowDocumentRequest;
    (function(ShowDocumentRequest2) {
      ShowDocumentRequest2.method = "window/showDocument";
      ShowDocumentRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      ShowDocumentRequest2.type = new messages_1.ProtocolRequestType(ShowDocumentRequest2.method);
    })(ShowDocumentRequest || (exports2.ShowDocumentRequest = ShowDocumentRequest = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.linkedEditingRange.js
var require_protocol_linkedEditingRange = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.linkedEditingRange.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LinkedEditingRangeRequest = void 0;
    var messages_1 = require_messages2();
    var LinkedEditingRangeRequest;
    (function(LinkedEditingRangeRequest2) {
      LinkedEditingRangeRequest2.method = "textDocument/linkedEditingRange";
      LinkedEditingRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      LinkedEditingRangeRequest2.type = new messages_1.ProtocolRequestType(LinkedEditingRangeRequest2.method);
    })(LinkedEditingRangeRequest || (exports2.LinkedEditingRangeRequest = LinkedEditingRangeRequest = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.fileOperations.js
var require_protocol_fileOperations = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.fileOperations.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WillDeleteFilesRequest = exports2.DidDeleteFilesNotification = exports2.DidRenameFilesNotification = exports2.WillRenameFilesRequest = exports2.DidCreateFilesNotification = exports2.WillCreateFilesRequest = exports2.FileOperationPatternKind = void 0;
    var messages_1 = require_messages2();
    var FileOperationPatternKind;
    (function(FileOperationPatternKind2) {
      FileOperationPatternKind2.file = "file";
      FileOperationPatternKind2.folder = "folder";
    })(FileOperationPatternKind || (exports2.FileOperationPatternKind = FileOperationPatternKind = {}));
    var WillCreateFilesRequest;
    (function(WillCreateFilesRequest2) {
      WillCreateFilesRequest2.method = "workspace/willCreateFiles";
      WillCreateFilesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WillCreateFilesRequest2.type = new messages_1.ProtocolRequestType(WillCreateFilesRequest2.method);
    })(WillCreateFilesRequest || (exports2.WillCreateFilesRequest = WillCreateFilesRequest = {}));
    var DidCreateFilesNotification;
    (function(DidCreateFilesNotification2) {
      DidCreateFilesNotification2.method = "workspace/didCreateFiles";
      DidCreateFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidCreateFilesNotification2.type = new messages_1.ProtocolNotificationType(DidCreateFilesNotification2.method);
    })(DidCreateFilesNotification || (exports2.DidCreateFilesNotification = DidCreateFilesNotification = {}));
    var WillRenameFilesRequest;
    (function(WillRenameFilesRequest2) {
      WillRenameFilesRequest2.method = "workspace/willRenameFiles";
      WillRenameFilesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WillRenameFilesRequest2.type = new messages_1.ProtocolRequestType(WillRenameFilesRequest2.method);
    })(WillRenameFilesRequest || (exports2.WillRenameFilesRequest = WillRenameFilesRequest = {}));
    var DidRenameFilesNotification;
    (function(DidRenameFilesNotification2) {
      DidRenameFilesNotification2.method = "workspace/didRenameFiles";
      DidRenameFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidRenameFilesNotification2.type = new messages_1.ProtocolNotificationType(DidRenameFilesNotification2.method);
    })(DidRenameFilesNotification || (exports2.DidRenameFilesNotification = DidRenameFilesNotification = {}));
    var DidDeleteFilesNotification;
    (function(DidDeleteFilesNotification2) {
      DidDeleteFilesNotification2.method = "workspace/didDeleteFiles";
      DidDeleteFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidDeleteFilesNotification2.type = new messages_1.ProtocolNotificationType(DidDeleteFilesNotification2.method);
    })(DidDeleteFilesNotification || (exports2.DidDeleteFilesNotification = DidDeleteFilesNotification = {}));
    var WillDeleteFilesRequest;
    (function(WillDeleteFilesRequest2) {
      WillDeleteFilesRequest2.method = "workspace/willDeleteFiles";
      WillDeleteFilesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WillDeleteFilesRequest2.type = new messages_1.ProtocolRequestType(WillDeleteFilesRequest2.method);
    })(WillDeleteFilesRequest || (exports2.WillDeleteFilesRequest = WillDeleteFilesRequest = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.moniker.js
var require_protocol_moniker = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.moniker.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MonikerRequest = exports2.MonikerKind = exports2.UniquenessLevel = void 0;
    var messages_1 = require_messages2();
    var UniquenessLevel;
    (function(UniquenessLevel2) {
      UniquenessLevel2.document = "document";
      UniquenessLevel2.project = "project";
      UniquenessLevel2.group = "group";
      UniquenessLevel2.scheme = "scheme";
      UniquenessLevel2.global = "global";
    })(UniquenessLevel || (exports2.UniquenessLevel = UniquenessLevel = {}));
    var MonikerKind;
    (function(MonikerKind2) {
      MonikerKind2.$import = "import";
      MonikerKind2.$export = "export";
      MonikerKind2.local = "local";
    })(MonikerKind || (exports2.MonikerKind = MonikerKind = {}));
    var MonikerRequest;
    (function(MonikerRequest2) {
      MonikerRequest2.method = "textDocument/moniker";
      MonikerRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      MonikerRequest2.type = new messages_1.ProtocolRequestType(MonikerRequest2.method);
    })(MonikerRequest || (exports2.MonikerRequest = MonikerRequest = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.typeHierarchy.js
var require_protocol_typeHierarchy = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.typeHierarchy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TypeHierarchySubtypesRequest = exports2.TypeHierarchySupertypesRequest = exports2.TypeHierarchyPrepareRequest = void 0;
    var messages_1 = require_messages2();
    var TypeHierarchyPrepareRequest;
    (function(TypeHierarchyPrepareRequest2) {
      TypeHierarchyPrepareRequest2.method = "textDocument/prepareTypeHierarchy";
      TypeHierarchyPrepareRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      TypeHierarchyPrepareRequest2.type = new messages_1.ProtocolRequestType(TypeHierarchyPrepareRequest2.method);
    })(TypeHierarchyPrepareRequest || (exports2.TypeHierarchyPrepareRequest = TypeHierarchyPrepareRequest = {}));
    var TypeHierarchySupertypesRequest;
    (function(TypeHierarchySupertypesRequest2) {
      TypeHierarchySupertypesRequest2.method = "typeHierarchy/supertypes";
      TypeHierarchySupertypesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      TypeHierarchySupertypesRequest2.type = new messages_1.ProtocolRequestType(TypeHierarchySupertypesRequest2.method);
    })(TypeHierarchySupertypesRequest || (exports2.TypeHierarchySupertypesRequest = TypeHierarchySupertypesRequest = {}));
    var TypeHierarchySubtypesRequest;
    (function(TypeHierarchySubtypesRequest2) {
      TypeHierarchySubtypesRequest2.method = "typeHierarchy/subtypes";
      TypeHierarchySubtypesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      TypeHierarchySubtypesRequest2.type = new messages_1.ProtocolRequestType(TypeHierarchySubtypesRequest2.method);
    })(TypeHierarchySubtypesRequest || (exports2.TypeHierarchySubtypesRequest = TypeHierarchySubtypesRequest = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineValue.js
var require_protocol_inlineValue = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineValue.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InlineValueRefreshRequest = exports2.InlineValueRequest = void 0;
    var messages_1 = require_messages2();
    var InlineValueRequest;
    (function(InlineValueRequest2) {
      InlineValueRequest2.method = "textDocument/inlineValue";
      InlineValueRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      InlineValueRequest2.type = new messages_1.ProtocolRequestType(InlineValueRequest2.method);
    })(InlineValueRequest || (exports2.InlineValueRequest = InlineValueRequest = {}));
    var InlineValueRefreshRequest;
    (function(InlineValueRefreshRequest2) {
      InlineValueRefreshRequest2.method = `workspace/inlineValue/refresh`;
      InlineValueRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      InlineValueRefreshRequest2.type = new messages_1.ProtocolRequestType0(InlineValueRefreshRequest2.method);
    })(InlineValueRefreshRequest || (exports2.InlineValueRefreshRequest = InlineValueRefreshRequest = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.inlayHint.js
var require_protocol_inlayHint = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.inlayHint.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InlayHintRefreshRequest = exports2.InlayHintResolveRequest = exports2.InlayHintRequest = void 0;
    var messages_1 = require_messages2();
    var InlayHintRequest;
    (function(InlayHintRequest2) {
      InlayHintRequest2.method = "textDocument/inlayHint";
      InlayHintRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      InlayHintRequest2.type = new messages_1.ProtocolRequestType(InlayHintRequest2.method);
    })(InlayHintRequest || (exports2.InlayHintRequest = InlayHintRequest = {}));
    var InlayHintResolveRequest;
    (function(InlayHintResolveRequest2) {
      InlayHintResolveRequest2.method = "inlayHint/resolve";
      InlayHintResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      InlayHintResolveRequest2.type = new messages_1.ProtocolRequestType(InlayHintResolveRequest2.method);
    })(InlayHintResolveRequest || (exports2.InlayHintResolveRequest = InlayHintResolveRequest = {}));
    var InlayHintRefreshRequest;
    (function(InlayHintRefreshRequest2) {
      InlayHintRefreshRequest2.method = `workspace/inlayHint/refresh`;
      InlayHintRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      InlayHintRefreshRequest2.type = new messages_1.ProtocolRequestType0(InlayHintRefreshRequest2.method);
    })(InlayHintRefreshRequest || (exports2.InlayHintRefreshRequest = InlayHintRefreshRequest = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.diagnostic.js
var require_protocol_diagnostic = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.diagnostic.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DiagnosticRefreshRequest = exports2.WorkspaceDiagnosticRequest = exports2.DocumentDiagnosticRequest = exports2.DocumentDiagnosticReportKind = exports2.DiagnosticServerCancellationData = void 0;
    var vscode_jsonrpc_1 = require_main();
    var Is = require_is3();
    var messages_1 = require_messages2();
    var DiagnosticServerCancellationData;
    (function(DiagnosticServerCancellationData2) {
      function is(value) {
        const candidate = value;
        return candidate && Is.boolean(candidate.retriggerRequest);
      }
      DiagnosticServerCancellationData2.is = is;
    })(DiagnosticServerCancellationData || (exports2.DiagnosticServerCancellationData = DiagnosticServerCancellationData = {}));
    var DocumentDiagnosticReportKind;
    (function(DocumentDiagnosticReportKind2) {
      DocumentDiagnosticReportKind2.Full = "full";
      DocumentDiagnosticReportKind2.Unchanged = "unchanged";
    })(DocumentDiagnosticReportKind || (exports2.DocumentDiagnosticReportKind = DocumentDiagnosticReportKind = {}));
    var DocumentDiagnosticRequest;
    (function(DocumentDiagnosticRequest2) {
      DocumentDiagnosticRequest2.method = "textDocument/diagnostic";
      DocumentDiagnosticRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentDiagnosticRequest2.type = new messages_1.ProtocolRequestType(DocumentDiagnosticRequest2.method);
      DocumentDiagnosticRequest2.partialResult = new vscode_jsonrpc_1.ProgressType();
    })(DocumentDiagnosticRequest || (exports2.DocumentDiagnosticRequest = DocumentDiagnosticRequest = {}));
    var WorkspaceDiagnosticRequest;
    (function(WorkspaceDiagnosticRequest2) {
      WorkspaceDiagnosticRequest2.method = "workspace/diagnostic";
      WorkspaceDiagnosticRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WorkspaceDiagnosticRequest2.type = new messages_1.ProtocolRequestType(WorkspaceDiagnosticRequest2.method);
      WorkspaceDiagnosticRequest2.partialResult = new vscode_jsonrpc_1.ProgressType();
    })(WorkspaceDiagnosticRequest || (exports2.WorkspaceDiagnosticRequest = WorkspaceDiagnosticRequest = {}));
    var DiagnosticRefreshRequest;
    (function(DiagnosticRefreshRequest2) {
      DiagnosticRefreshRequest2.method = `workspace/diagnostic/refresh`;
      DiagnosticRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      DiagnosticRefreshRequest2.type = new messages_1.ProtocolRequestType0(DiagnosticRefreshRequest2.method);
    })(DiagnosticRefreshRequest || (exports2.DiagnosticRefreshRequest = DiagnosticRefreshRequest = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.notebook.js
var require_protocol_notebook = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.notebook.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DidCloseNotebookDocumentNotification = exports2.DidSaveNotebookDocumentNotification = exports2.DidChangeNotebookDocumentNotification = exports2.NotebookCellArrayChange = exports2.DidOpenNotebookDocumentNotification = exports2.NotebookDocumentSyncRegistrationType = exports2.NotebookDocument = exports2.NotebookCell = exports2.ExecutionSummary = exports2.NotebookCellKind = void 0;
    var vscode_languageserver_types_1 = require_main2();
    var Is = require_is3();
    var messages_1 = require_messages2();
    var NotebookCellKind;
    (function(NotebookCellKind2) {
      NotebookCellKind2.Markup = 1;
      NotebookCellKind2.Code = 2;
      function is(value) {
        return value === 1 || value === 2;
      }
      NotebookCellKind2.is = is;
    })(NotebookCellKind || (exports2.NotebookCellKind = NotebookCellKind = {}));
    var ExecutionSummary;
    (function(ExecutionSummary2) {
      function create(executionOrder, success) {
        const result = { executionOrder };
        if (success === true || success === false) {
          result.success = success;
        }
        return result;
      }
      ExecutionSummary2.create = create;
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && vscode_languageserver_types_1.uinteger.is(candidate.executionOrder) && (candidate.success === void 0 || Is.boolean(candidate.success));
      }
      ExecutionSummary2.is = is;
      function equals(one, other) {
        if (one === other) {
          return true;
        }
        if (one === null || one === void 0 || other === null || other === void 0) {
          return false;
        }
        return one.executionOrder === other.executionOrder && one.success === other.success;
      }
      ExecutionSummary2.equals = equals;
    })(ExecutionSummary || (exports2.ExecutionSummary = ExecutionSummary = {}));
    var NotebookCell;
    (function(NotebookCell2) {
      function create(kind, document) {
        return { kind, document };
      }
      NotebookCell2.create = create;
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && NotebookCellKind.is(candidate.kind) && vscode_languageserver_types_1.DocumentUri.is(candidate.document) && (candidate.metadata === void 0 || Is.objectLiteral(candidate.metadata));
      }
      NotebookCell2.is = is;
      function diff(one, two) {
        const result = /* @__PURE__ */ new Set();
        if (one.document !== two.document) {
          result.add("document");
        }
        if (one.kind !== two.kind) {
          result.add("kind");
        }
        if (one.executionSummary !== two.executionSummary) {
          result.add("executionSummary");
        }
        if ((one.metadata !== void 0 || two.metadata !== void 0) && !equalsMetadata(one.metadata, two.metadata)) {
          result.add("metadata");
        }
        if ((one.executionSummary !== void 0 || two.executionSummary !== void 0) && !ExecutionSummary.equals(one.executionSummary, two.executionSummary)) {
          result.add("executionSummary");
        }
        return result;
      }
      NotebookCell2.diff = diff;
      function equalsMetadata(one, other) {
        if (one === other) {
          return true;
        }
        if (one === null || one === void 0 || other === null || other === void 0) {
          return false;
        }
        if (typeof one !== typeof other) {
          return false;
        }
        if (typeof one !== "object") {
          return false;
        }
        const oneArray = Array.isArray(one);
        const otherArray = Array.isArray(other);
        if (oneArray !== otherArray) {
          return false;
        }
        if (oneArray && otherArray) {
          if (one.length !== other.length) {
            return false;
          }
          for (let i = 0; i < one.length; i++) {
            if (!equalsMetadata(one[i], other[i])) {
              return false;
            }
          }
        }
        if (Is.objectLiteral(one) && Is.objectLiteral(other)) {
          const oneKeys = Object.keys(one);
          const otherKeys = Object.keys(other);
          if (oneKeys.length !== otherKeys.length) {
            return false;
          }
          oneKeys.sort();
          otherKeys.sort();
          if (!equalsMetadata(oneKeys, otherKeys)) {
            return false;
          }
          for (let i = 0; i < oneKeys.length; i++) {
            const prop = oneKeys[i];
            if (!equalsMetadata(one[prop], other[prop])) {
              return false;
            }
          }
        }
        return true;
      }
    })(NotebookCell || (exports2.NotebookCell = NotebookCell = {}));
    var NotebookDocument;
    (function(NotebookDocument2) {
      function create(uri, notebookType, version, cells) {
        return { uri, notebookType, version, cells };
      }
      NotebookDocument2.create = create;
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.uri) && vscode_languageserver_types_1.integer.is(candidate.version) && Is.typedArray(candidate.cells, NotebookCell.is);
      }
      NotebookDocument2.is = is;
    })(NotebookDocument || (exports2.NotebookDocument = NotebookDocument = {}));
    var NotebookDocumentSyncRegistrationType;
    (function(NotebookDocumentSyncRegistrationType2) {
      NotebookDocumentSyncRegistrationType2.method = "notebookDocument/sync";
      NotebookDocumentSyncRegistrationType2.messageDirection = messages_1.MessageDirection.clientToServer;
      NotebookDocumentSyncRegistrationType2.type = new messages_1.RegistrationType(NotebookDocumentSyncRegistrationType2.method);
    })(NotebookDocumentSyncRegistrationType || (exports2.NotebookDocumentSyncRegistrationType = NotebookDocumentSyncRegistrationType = {}));
    var DidOpenNotebookDocumentNotification;
    (function(DidOpenNotebookDocumentNotification2) {
      DidOpenNotebookDocumentNotification2.method = "notebookDocument/didOpen";
      DidOpenNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidOpenNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidOpenNotebookDocumentNotification2.method);
      DidOpenNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
    })(DidOpenNotebookDocumentNotification || (exports2.DidOpenNotebookDocumentNotification = DidOpenNotebookDocumentNotification = {}));
    var NotebookCellArrayChange;
    (function(NotebookCellArrayChange2) {
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && vscode_languageserver_types_1.uinteger.is(candidate.start) && vscode_languageserver_types_1.uinteger.is(candidate.deleteCount) && (candidate.cells === void 0 || Is.typedArray(candidate.cells, NotebookCell.is));
      }
      NotebookCellArrayChange2.is = is;
      function create(start, deleteCount, cells) {
        const result = { start, deleteCount };
        if (cells !== void 0) {
          result.cells = cells;
        }
        return result;
      }
      NotebookCellArrayChange2.create = create;
    })(NotebookCellArrayChange || (exports2.NotebookCellArrayChange = NotebookCellArrayChange = {}));
    var DidChangeNotebookDocumentNotification;
    (function(DidChangeNotebookDocumentNotification2) {
      DidChangeNotebookDocumentNotification2.method = "notebookDocument/didChange";
      DidChangeNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidChangeNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidChangeNotebookDocumentNotification2.method);
      DidChangeNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
    })(DidChangeNotebookDocumentNotification || (exports2.DidChangeNotebookDocumentNotification = DidChangeNotebookDocumentNotification = {}));
    var DidSaveNotebookDocumentNotification;
    (function(DidSaveNotebookDocumentNotification2) {
      DidSaveNotebookDocumentNotification2.method = "notebookDocument/didSave";
      DidSaveNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidSaveNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidSaveNotebookDocumentNotification2.method);
      DidSaveNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
    })(DidSaveNotebookDocumentNotification || (exports2.DidSaveNotebookDocumentNotification = DidSaveNotebookDocumentNotification = {}));
    var DidCloseNotebookDocumentNotification;
    (function(DidCloseNotebookDocumentNotification2) {
      DidCloseNotebookDocumentNotification2.method = "notebookDocument/didClose";
      DidCloseNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidCloseNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidCloseNotebookDocumentNotification2.method);
      DidCloseNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
    })(DidCloseNotebookDocumentNotification || (exports2.DidCloseNotebookDocumentNotification = DidCloseNotebookDocumentNotification = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineCompletion.js
var require_protocol_inlineCompletion = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineCompletion.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InlineCompletionRequest = void 0;
    var messages_1 = require_messages2();
    var InlineCompletionRequest;
    (function(InlineCompletionRequest2) {
      InlineCompletionRequest2.method = "textDocument/inlineCompletion";
      InlineCompletionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      InlineCompletionRequest2.type = new messages_1.ProtocolRequestType(InlineCompletionRequest2.method);
    })(InlineCompletionRequest || (exports2.InlineCompletionRequest = InlineCompletionRequest = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.js
var require_protocol = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WorkspaceSymbolRequest = exports2.CodeActionResolveRequest = exports2.CodeActionRequest = exports2.DocumentSymbolRequest = exports2.DocumentHighlightRequest = exports2.ReferencesRequest = exports2.DefinitionRequest = exports2.SignatureHelpRequest = exports2.SignatureHelpTriggerKind = exports2.HoverRequest = exports2.CompletionResolveRequest = exports2.CompletionRequest = exports2.CompletionTriggerKind = exports2.PublishDiagnosticsNotification = exports2.WatchKind = exports2.RelativePattern = exports2.FileChangeType = exports2.DidChangeWatchedFilesNotification = exports2.WillSaveTextDocumentWaitUntilRequest = exports2.WillSaveTextDocumentNotification = exports2.TextDocumentSaveReason = exports2.DidSaveTextDocumentNotification = exports2.DidCloseTextDocumentNotification = exports2.DidChangeTextDocumentNotification = exports2.TextDocumentContentChangeEvent = exports2.DidOpenTextDocumentNotification = exports2.TextDocumentSyncKind = exports2.TelemetryEventNotification = exports2.LogMessageNotification = exports2.ShowMessageRequest = exports2.ShowMessageNotification = exports2.MessageType = exports2.DidChangeConfigurationNotification = exports2.ExitNotification = exports2.ShutdownRequest = exports2.InitializedNotification = exports2.InitializeErrorCodes = exports2.InitializeRequest = exports2.WorkDoneProgressOptions = exports2.TextDocumentRegistrationOptions = exports2.StaticRegistrationOptions = exports2.PositionEncodingKind = exports2.FailureHandlingKind = exports2.ResourceOperationKind = exports2.UnregistrationRequest = exports2.RegistrationRequest = exports2.DocumentSelector = exports2.NotebookCellTextDocumentFilter = exports2.NotebookDocumentFilter = exports2.TextDocumentFilter = void 0;
    exports2.MonikerRequest = exports2.MonikerKind = exports2.UniquenessLevel = exports2.WillDeleteFilesRequest = exports2.DidDeleteFilesNotification = exports2.WillRenameFilesRequest = exports2.DidRenameFilesNotification = exports2.WillCreateFilesRequest = exports2.DidCreateFilesNotification = exports2.FileOperationPatternKind = exports2.LinkedEditingRangeRequest = exports2.ShowDocumentRequest = exports2.SemanticTokensRegistrationType = exports2.SemanticTokensRefreshRequest = exports2.SemanticTokensRangeRequest = exports2.SemanticTokensDeltaRequest = exports2.SemanticTokensRequest = exports2.TokenFormat = exports2.CallHierarchyPrepareRequest = exports2.CallHierarchyOutgoingCallsRequest = exports2.CallHierarchyIncomingCallsRequest = exports2.WorkDoneProgressCancelNotification = exports2.WorkDoneProgressCreateRequest = exports2.WorkDoneProgress = exports2.SelectionRangeRequest = exports2.DeclarationRequest = exports2.FoldingRangeRefreshRequest = exports2.FoldingRangeRequest = exports2.ColorPresentationRequest = exports2.DocumentColorRequest = exports2.ConfigurationRequest = exports2.DidChangeWorkspaceFoldersNotification = exports2.WorkspaceFoldersRequest = exports2.TypeDefinitionRequest = exports2.ImplementationRequest = exports2.ApplyWorkspaceEditRequest = exports2.ExecuteCommandRequest = exports2.PrepareRenameRequest = exports2.RenameRequest = exports2.PrepareSupportDefaultBehavior = exports2.DocumentOnTypeFormattingRequest = exports2.DocumentRangesFormattingRequest = exports2.DocumentRangeFormattingRequest = exports2.DocumentFormattingRequest = exports2.DocumentLinkResolveRequest = exports2.DocumentLinkRequest = exports2.CodeLensRefreshRequest = exports2.CodeLensResolveRequest = exports2.CodeLensRequest = exports2.WorkspaceSymbolResolveRequest = void 0;
    exports2.InlineCompletionRequest = exports2.DidCloseNotebookDocumentNotification = exports2.DidSaveNotebookDocumentNotification = exports2.DidChangeNotebookDocumentNotification = exports2.NotebookCellArrayChange = exports2.DidOpenNotebookDocumentNotification = exports2.NotebookDocumentSyncRegistrationType = exports2.NotebookDocument = exports2.NotebookCell = exports2.ExecutionSummary = exports2.NotebookCellKind = exports2.DiagnosticRefreshRequest = exports2.WorkspaceDiagnosticRequest = exports2.DocumentDiagnosticRequest = exports2.DocumentDiagnosticReportKind = exports2.DiagnosticServerCancellationData = exports2.InlayHintRefreshRequest = exports2.InlayHintResolveRequest = exports2.InlayHintRequest = exports2.InlineValueRefreshRequest = exports2.InlineValueRequest = exports2.TypeHierarchySupertypesRequest = exports2.TypeHierarchySubtypesRequest = exports2.TypeHierarchyPrepareRequest = void 0;
    var messages_1 = require_messages2();
    var vscode_languageserver_types_1 = require_main2();
    var Is = require_is3();
    var protocol_implementation_1 = require_protocol_implementation();
    Object.defineProperty(exports2, "ImplementationRequest", { enumerable: true, get: function() {
      return protocol_implementation_1.ImplementationRequest;
    } });
    var protocol_typeDefinition_1 = require_protocol_typeDefinition();
    Object.defineProperty(exports2, "TypeDefinitionRequest", { enumerable: true, get: function() {
      return protocol_typeDefinition_1.TypeDefinitionRequest;
    } });
    var protocol_workspaceFolder_1 = require_protocol_workspaceFolder();
    Object.defineProperty(exports2, "WorkspaceFoldersRequest", { enumerable: true, get: function() {
      return protocol_workspaceFolder_1.WorkspaceFoldersRequest;
    } });
    Object.defineProperty(exports2, "DidChangeWorkspaceFoldersNotification", { enumerable: true, get: function() {
      return protocol_workspaceFolder_1.DidChangeWorkspaceFoldersNotification;
    } });
    var protocol_configuration_1 = require_protocol_configuration();
    Object.defineProperty(exports2, "ConfigurationRequest", { enumerable: true, get: function() {
      return protocol_configuration_1.ConfigurationRequest;
    } });
    var protocol_colorProvider_1 = require_protocol_colorProvider();
    Object.defineProperty(exports2, "DocumentColorRequest", { enumerable: true, get: function() {
      return protocol_colorProvider_1.DocumentColorRequest;
    } });
    Object.defineProperty(exports2, "ColorPresentationRequest", { enumerable: true, get: function() {
      return protocol_colorProvider_1.ColorPresentationRequest;
    } });
    var protocol_foldingRange_1 = require_protocol_foldingRange();
    Object.defineProperty(exports2, "FoldingRangeRequest", { enumerable: true, get: function() {
      return protocol_foldingRange_1.FoldingRangeRequest;
    } });
    Object.defineProperty(exports2, "FoldingRangeRefreshRequest", { enumerable: true, get: function() {
      return protocol_foldingRange_1.FoldingRangeRefreshRequest;
    } });
    var protocol_declaration_1 = require_protocol_declaration();
    Object.defineProperty(exports2, "DeclarationRequest", { enumerable: true, get: function() {
      return protocol_declaration_1.DeclarationRequest;
    } });
    var protocol_selectionRange_1 = require_protocol_selectionRange();
    Object.defineProperty(exports2, "SelectionRangeRequest", { enumerable: true, get: function() {
      return protocol_selectionRange_1.SelectionRangeRequest;
    } });
    var protocol_progress_1 = require_protocol_progress();
    Object.defineProperty(exports2, "WorkDoneProgress", { enumerable: true, get: function() {
      return protocol_progress_1.WorkDoneProgress;
    } });
    Object.defineProperty(exports2, "WorkDoneProgressCreateRequest", { enumerable: true, get: function() {
      return protocol_progress_1.WorkDoneProgressCreateRequest;
    } });
    Object.defineProperty(exports2, "WorkDoneProgressCancelNotification", { enumerable: true, get: function() {
      return protocol_progress_1.WorkDoneProgressCancelNotification;
    } });
    var protocol_callHierarchy_1 = require_protocol_callHierarchy();
    Object.defineProperty(exports2, "CallHierarchyIncomingCallsRequest", { enumerable: true, get: function() {
      return protocol_callHierarchy_1.CallHierarchyIncomingCallsRequest;
    } });
    Object.defineProperty(exports2, "CallHierarchyOutgoingCallsRequest", { enumerable: true, get: function() {
      return protocol_callHierarchy_1.CallHierarchyOutgoingCallsRequest;
    } });
    Object.defineProperty(exports2, "CallHierarchyPrepareRequest", { enumerable: true, get: function() {
      return protocol_callHierarchy_1.CallHierarchyPrepareRequest;
    } });
    var protocol_semanticTokens_1 = require_protocol_semanticTokens();
    Object.defineProperty(exports2, "TokenFormat", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.TokenFormat;
    } });
    Object.defineProperty(exports2, "SemanticTokensRequest", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensRequest;
    } });
    Object.defineProperty(exports2, "SemanticTokensDeltaRequest", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensDeltaRequest;
    } });
    Object.defineProperty(exports2, "SemanticTokensRangeRequest", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensRangeRequest;
    } });
    Object.defineProperty(exports2, "SemanticTokensRefreshRequest", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensRefreshRequest;
    } });
    Object.defineProperty(exports2, "SemanticTokensRegistrationType", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensRegistrationType;
    } });
    var protocol_showDocument_1 = require_protocol_showDocument();
    Object.defineProperty(exports2, "ShowDocumentRequest", { enumerable: true, get: function() {
      return protocol_showDocument_1.ShowDocumentRequest;
    } });
    var protocol_linkedEditingRange_1 = require_protocol_linkedEditingRange();
    Object.defineProperty(exports2, "LinkedEditingRangeRequest", { enumerable: true, get: function() {
      return protocol_linkedEditingRange_1.LinkedEditingRangeRequest;
    } });
    var protocol_fileOperations_1 = require_protocol_fileOperations();
    Object.defineProperty(exports2, "FileOperationPatternKind", { enumerable: true, get: function() {
      return protocol_fileOperations_1.FileOperationPatternKind;
    } });
    Object.defineProperty(exports2, "DidCreateFilesNotification", { enumerable: true, get: function() {
      return protocol_fileOperations_1.DidCreateFilesNotification;
    } });
    Object.defineProperty(exports2, "WillCreateFilesRequest", { enumerable: true, get: function() {
      return protocol_fileOperations_1.WillCreateFilesRequest;
    } });
    Object.defineProperty(exports2, "DidRenameFilesNotification", { enumerable: true, get: function() {
      return protocol_fileOperations_1.DidRenameFilesNotification;
    } });
    Object.defineProperty(exports2, "WillRenameFilesRequest", { enumerable: true, get: function() {
      return protocol_fileOperations_1.WillRenameFilesRequest;
    } });
    Object.defineProperty(exports2, "DidDeleteFilesNotification", { enumerable: true, get: function() {
      return protocol_fileOperations_1.DidDeleteFilesNotification;
    } });
    Object.defineProperty(exports2, "WillDeleteFilesRequest", { enumerable: true, get: function() {
      return protocol_fileOperations_1.WillDeleteFilesRequest;
    } });
    var protocol_moniker_1 = require_protocol_moniker();
    Object.defineProperty(exports2, "UniquenessLevel", { enumerable: true, get: function() {
      return protocol_moniker_1.UniquenessLevel;
    } });
    Object.defineProperty(exports2, "MonikerKind", { enumerable: true, get: function() {
      return protocol_moniker_1.MonikerKind;
    } });
    Object.defineProperty(exports2, "MonikerRequest", { enumerable: true, get: function() {
      return protocol_moniker_1.MonikerRequest;
    } });
    var protocol_typeHierarchy_1 = require_protocol_typeHierarchy();
    Object.defineProperty(exports2, "TypeHierarchyPrepareRequest", { enumerable: true, get: function() {
      return protocol_typeHierarchy_1.TypeHierarchyPrepareRequest;
    } });
    Object.defineProperty(exports2, "TypeHierarchySubtypesRequest", { enumerable: true, get: function() {
      return protocol_typeHierarchy_1.TypeHierarchySubtypesRequest;
    } });
    Object.defineProperty(exports2, "TypeHierarchySupertypesRequest", { enumerable: true, get: function() {
      return protocol_typeHierarchy_1.TypeHierarchySupertypesRequest;
    } });
    var protocol_inlineValue_1 = require_protocol_inlineValue();
    Object.defineProperty(exports2, "InlineValueRequest", { enumerable: true, get: function() {
      return protocol_inlineValue_1.InlineValueRequest;
    } });
    Object.defineProperty(exports2, "InlineValueRefreshRequest", { enumerable: true, get: function() {
      return protocol_inlineValue_1.InlineValueRefreshRequest;
    } });
    var protocol_inlayHint_1 = require_protocol_inlayHint();
    Object.defineProperty(exports2, "InlayHintRequest", { enumerable: true, get: function() {
      return protocol_inlayHint_1.InlayHintRequest;
    } });
    Object.defineProperty(exports2, "InlayHintResolveRequest", { enumerable: true, get: function() {
      return protocol_inlayHint_1.InlayHintResolveRequest;
    } });
    Object.defineProperty(exports2, "InlayHintRefreshRequest", { enumerable: true, get: function() {
      return protocol_inlayHint_1.InlayHintRefreshRequest;
    } });
    var protocol_diagnostic_1 = require_protocol_diagnostic();
    Object.defineProperty(exports2, "DiagnosticServerCancellationData", { enumerable: true, get: function() {
      return protocol_diagnostic_1.DiagnosticServerCancellationData;
    } });
    Object.defineProperty(exports2, "DocumentDiagnosticReportKind", { enumerable: true, get: function() {
      return protocol_diagnostic_1.DocumentDiagnosticReportKind;
    } });
    Object.defineProperty(exports2, "DocumentDiagnosticRequest", { enumerable: true, get: function() {
      return protocol_diagnostic_1.DocumentDiagnosticRequest;
    } });
    Object.defineProperty(exports2, "WorkspaceDiagnosticRequest", { enumerable: true, get: function() {
      return protocol_diagnostic_1.WorkspaceDiagnosticRequest;
    } });
    Object.defineProperty(exports2, "DiagnosticRefreshRequest", { enumerable: true, get: function() {
      return protocol_diagnostic_1.DiagnosticRefreshRequest;
    } });
    var protocol_notebook_1 = require_protocol_notebook();
    Object.defineProperty(exports2, "NotebookCellKind", { enumerable: true, get: function() {
      return protocol_notebook_1.NotebookCellKind;
    } });
    Object.defineProperty(exports2, "ExecutionSummary", { enumerable: true, get: function() {
      return protocol_notebook_1.ExecutionSummary;
    } });
    Object.defineProperty(exports2, "NotebookCell", { enumerable: true, get: function() {
      return protocol_notebook_1.NotebookCell;
    } });
    Object.defineProperty(exports2, "NotebookDocument", { enumerable: true, get: function() {
      return protocol_notebook_1.NotebookDocument;
    } });
    Object.defineProperty(exports2, "NotebookDocumentSyncRegistrationType", { enumerable: true, get: function() {
      return protocol_notebook_1.NotebookDocumentSyncRegistrationType;
    } });
    Object.defineProperty(exports2, "DidOpenNotebookDocumentNotification", { enumerable: true, get: function() {
      return protocol_notebook_1.DidOpenNotebookDocumentNotification;
    } });
    Object.defineProperty(exports2, "NotebookCellArrayChange", { enumerable: true, get: function() {
      return protocol_notebook_1.NotebookCellArrayChange;
    } });
    Object.defineProperty(exports2, "DidChangeNotebookDocumentNotification", { enumerable: true, get: function() {
      return protocol_notebook_1.DidChangeNotebookDocumentNotification;
    } });
    Object.defineProperty(exports2, "DidSaveNotebookDocumentNotification", { enumerable: true, get: function() {
      return protocol_notebook_1.DidSaveNotebookDocumentNotification;
    } });
    Object.defineProperty(exports2, "DidCloseNotebookDocumentNotification", { enumerable: true, get: function() {
      return protocol_notebook_1.DidCloseNotebookDocumentNotification;
    } });
    var protocol_inlineCompletion_1 = require_protocol_inlineCompletion();
    Object.defineProperty(exports2, "InlineCompletionRequest", { enumerable: true, get: function() {
      return protocol_inlineCompletion_1.InlineCompletionRequest;
    } });
    var TextDocumentFilter;
    (function(TextDocumentFilter2) {
      function is(value) {
        const candidate = value;
        return Is.string(candidate) || (Is.string(candidate.language) || Is.string(candidate.scheme) || Is.string(candidate.pattern));
      }
      TextDocumentFilter2.is = is;
    })(TextDocumentFilter || (exports2.TextDocumentFilter = TextDocumentFilter = {}));
    var NotebookDocumentFilter;
    (function(NotebookDocumentFilter2) {
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && (Is.string(candidate.notebookType) || Is.string(candidate.scheme) || Is.string(candidate.pattern));
      }
      NotebookDocumentFilter2.is = is;
    })(NotebookDocumentFilter || (exports2.NotebookDocumentFilter = NotebookDocumentFilter = {}));
    var NotebookCellTextDocumentFilter;
    (function(NotebookCellTextDocumentFilter2) {
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && (Is.string(candidate.notebook) || NotebookDocumentFilter.is(candidate.notebook)) && (candidate.language === void 0 || Is.string(candidate.language));
      }
      NotebookCellTextDocumentFilter2.is = is;
    })(NotebookCellTextDocumentFilter || (exports2.NotebookCellTextDocumentFilter = NotebookCellTextDocumentFilter = {}));
    var DocumentSelector;
    (function(DocumentSelector2) {
      function is(value) {
        if (!Array.isArray(value)) {
          return false;
        }
        for (let elem of value) {
          if (!Is.string(elem) && !TextDocumentFilter.is(elem) && !NotebookCellTextDocumentFilter.is(elem)) {
            return false;
          }
        }
        return true;
      }
      DocumentSelector2.is = is;
    })(DocumentSelector || (exports2.DocumentSelector = DocumentSelector = {}));
    var RegistrationRequest;
    (function(RegistrationRequest2) {
      RegistrationRequest2.method = "client/registerCapability";
      RegistrationRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      RegistrationRequest2.type = new messages_1.ProtocolRequestType(RegistrationRequest2.method);
    })(RegistrationRequest || (exports2.RegistrationRequest = RegistrationRequest = {}));
    var UnregistrationRequest;
    (function(UnregistrationRequest2) {
      UnregistrationRequest2.method = "client/unregisterCapability";
      UnregistrationRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      UnregistrationRequest2.type = new messages_1.ProtocolRequestType(UnregistrationRequest2.method);
    })(UnregistrationRequest || (exports2.UnregistrationRequest = UnregistrationRequest = {}));
    var ResourceOperationKind;
    (function(ResourceOperationKind2) {
      ResourceOperationKind2.Create = "create";
      ResourceOperationKind2.Rename = "rename";
      ResourceOperationKind2.Delete = "delete";
    })(ResourceOperationKind || (exports2.ResourceOperationKind = ResourceOperationKind = {}));
    var FailureHandlingKind;
    (function(FailureHandlingKind2) {
      FailureHandlingKind2.Abort = "abort";
      FailureHandlingKind2.Transactional = "transactional";
      FailureHandlingKind2.TextOnlyTransactional = "textOnlyTransactional";
      FailureHandlingKind2.Undo = "undo";
    })(FailureHandlingKind || (exports2.FailureHandlingKind = FailureHandlingKind = {}));
    var PositionEncodingKind;
    (function(PositionEncodingKind2) {
      PositionEncodingKind2.UTF8 = "utf-8";
      PositionEncodingKind2.UTF16 = "utf-16";
      PositionEncodingKind2.UTF32 = "utf-32";
    })(PositionEncodingKind || (exports2.PositionEncodingKind = PositionEncodingKind = {}));
    var StaticRegistrationOptions;
    (function(StaticRegistrationOptions2) {
      function hasId(value) {
        const candidate = value;
        return candidate && Is.string(candidate.id) && candidate.id.length > 0;
      }
      StaticRegistrationOptions2.hasId = hasId;
    })(StaticRegistrationOptions || (exports2.StaticRegistrationOptions = StaticRegistrationOptions = {}));
    var TextDocumentRegistrationOptions;
    (function(TextDocumentRegistrationOptions2) {
      function is(value) {
        const candidate = value;
        return candidate && (candidate.documentSelector === null || DocumentSelector.is(candidate.documentSelector));
      }
      TextDocumentRegistrationOptions2.is = is;
    })(TextDocumentRegistrationOptions || (exports2.TextDocumentRegistrationOptions = TextDocumentRegistrationOptions = {}));
    var WorkDoneProgressOptions;
    (function(WorkDoneProgressOptions2) {
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && (candidate.workDoneProgress === void 0 || Is.boolean(candidate.workDoneProgress));
      }
      WorkDoneProgressOptions2.is = is;
      function hasWorkDoneProgress(value) {
        const candidate = value;
        return candidate && Is.boolean(candidate.workDoneProgress);
      }
      WorkDoneProgressOptions2.hasWorkDoneProgress = hasWorkDoneProgress;
    })(WorkDoneProgressOptions || (exports2.WorkDoneProgressOptions = WorkDoneProgressOptions = {}));
    var InitializeRequest;
    (function(InitializeRequest2) {
      InitializeRequest2.method = "initialize";
      InitializeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      InitializeRequest2.type = new messages_1.ProtocolRequestType(InitializeRequest2.method);
    })(InitializeRequest || (exports2.InitializeRequest = InitializeRequest = {}));
    var InitializeErrorCodes;
    (function(InitializeErrorCodes2) {
      InitializeErrorCodes2.unknownProtocolVersion = 1;
    })(InitializeErrorCodes || (exports2.InitializeErrorCodes = InitializeErrorCodes = {}));
    var InitializedNotification;
    (function(InitializedNotification2) {
      InitializedNotification2.method = "initialized";
      InitializedNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      InitializedNotification2.type = new messages_1.ProtocolNotificationType(InitializedNotification2.method);
    })(InitializedNotification || (exports2.InitializedNotification = InitializedNotification = {}));
    var ShutdownRequest;
    (function(ShutdownRequest2) {
      ShutdownRequest2.method = "shutdown";
      ShutdownRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      ShutdownRequest2.type = new messages_1.ProtocolRequestType0(ShutdownRequest2.method);
    })(ShutdownRequest || (exports2.ShutdownRequest = ShutdownRequest = {}));
    var ExitNotification;
    (function(ExitNotification2) {
      ExitNotification2.method = "exit";
      ExitNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      ExitNotification2.type = new messages_1.ProtocolNotificationType0(ExitNotification2.method);
    })(ExitNotification || (exports2.ExitNotification = ExitNotification = {}));
    var DidChangeConfigurationNotification;
    (function(DidChangeConfigurationNotification2) {
      DidChangeConfigurationNotification2.method = "workspace/didChangeConfiguration";
      DidChangeConfigurationNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidChangeConfigurationNotification2.type = new messages_1.ProtocolNotificationType(DidChangeConfigurationNotification2.method);
    })(DidChangeConfigurationNotification || (exports2.DidChangeConfigurationNotification = DidChangeConfigurationNotification = {}));
    var MessageType;
    (function(MessageType2) {
      MessageType2.Error = 1;
      MessageType2.Warning = 2;
      MessageType2.Info = 3;
      MessageType2.Log = 4;
      MessageType2.Debug = 5;
    })(MessageType || (exports2.MessageType = MessageType = {}));
    var ShowMessageNotification;
    (function(ShowMessageNotification2) {
      ShowMessageNotification2.method = "window/showMessage";
      ShowMessageNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
      ShowMessageNotification2.type = new messages_1.ProtocolNotificationType(ShowMessageNotification2.method);
    })(ShowMessageNotification || (exports2.ShowMessageNotification = ShowMessageNotification = {}));
    var ShowMessageRequest;
    (function(ShowMessageRequest2) {
      ShowMessageRequest2.method = "window/showMessageRequest";
      ShowMessageRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      ShowMessageRequest2.type = new messages_1.ProtocolRequestType(ShowMessageRequest2.method);
    })(ShowMessageRequest || (exports2.ShowMessageRequest = ShowMessageRequest = {}));
    var LogMessageNotification;
    (function(LogMessageNotification2) {
      LogMessageNotification2.method = "window/logMessage";
      LogMessageNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
      LogMessageNotification2.type = new messages_1.ProtocolNotificationType(LogMessageNotification2.method);
    })(LogMessageNotification || (exports2.LogMessageNotification = LogMessageNotification = {}));
    var TelemetryEventNotification;
    (function(TelemetryEventNotification2) {
      TelemetryEventNotification2.method = "telemetry/event";
      TelemetryEventNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
      TelemetryEventNotification2.type = new messages_1.ProtocolNotificationType(TelemetryEventNotification2.method);
    })(TelemetryEventNotification || (exports2.TelemetryEventNotification = TelemetryEventNotification = {}));
    var TextDocumentSyncKind2;
    (function(TextDocumentSyncKind3) {
      TextDocumentSyncKind3.None = 0;
      TextDocumentSyncKind3.Full = 1;
      TextDocumentSyncKind3.Incremental = 2;
    })(TextDocumentSyncKind2 || (exports2.TextDocumentSyncKind = TextDocumentSyncKind2 = {}));
    var DidOpenTextDocumentNotification;
    (function(DidOpenTextDocumentNotification2) {
      DidOpenTextDocumentNotification2.method = "textDocument/didOpen";
      DidOpenTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidOpenTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidOpenTextDocumentNotification2.method);
    })(DidOpenTextDocumentNotification || (exports2.DidOpenTextDocumentNotification = DidOpenTextDocumentNotification = {}));
    var TextDocumentContentChangeEvent;
    (function(TextDocumentContentChangeEvent2) {
      function isIncremental(event) {
        let candidate = event;
        return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range !== void 0 && (candidate.rangeLength === void 0 || typeof candidate.rangeLength === "number");
      }
      TextDocumentContentChangeEvent2.isIncremental = isIncremental;
      function isFull(event) {
        let candidate = event;
        return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range === void 0 && candidate.rangeLength === void 0;
      }
      TextDocumentContentChangeEvent2.isFull = isFull;
    })(TextDocumentContentChangeEvent || (exports2.TextDocumentContentChangeEvent = TextDocumentContentChangeEvent = {}));
    var DidChangeTextDocumentNotification;
    (function(DidChangeTextDocumentNotification2) {
      DidChangeTextDocumentNotification2.method = "textDocument/didChange";
      DidChangeTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidChangeTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidChangeTextDocumentNotification2.method);
    })(DidChangeTextDocumentNotification || (exports2.DidChangeTextDocumentNotification = DidChangeTextDocumentNotification = {}));
    var DidCloseTextDocumentNotification;
    (function(DidCloseTextDocumentNotification2) {
      DidCloseTextDocumentNotification2.method = "textDocument/didClose";
      DidCloseTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidCloseTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidCloseTextDocumentNotification2.method);
    })(DidCloseTextDocumentNotification || (exports2.DidCloseTextDocumentNotification = DidCloseTextDocumentNotification = {}));
    var DidSaveTextDocumentNotification;
    (function(DidSaveTextDocumentNotification2) {
      DidSaveTextDocumentNotification2.method = "textDocument/didSave";
      DidSaveTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidSaveTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidSaveTextDocumentNotification2.method);
    })(DidSaveTextDocumentNotification || (exports2.DidSaveTextDocumentNotification = DidSaveTextDocumentNotification = {}));
    var TextDocumentSaveReason;
    (function(TextDocumentSaveReason2) {
      TextDocumentSaveReason2.Manual = 1;
      TextDocumentSaveReason2.AfterDelay = 2;
      TextDocumentSaveReason2.FocusOut = 3;
    })(TextDocumentSaveReason || (exports2.TextDocumentSaveReason = TextDocumentSaveReason = {}));
    var WillSaveTextDocumentNotification;
    (function(WillSaveTextDocumentNotification2) {
      WillSaveTextDocumentNotification2.method = "textDocument/willSave";
      WillSaveTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      WillSaveTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(WillSaveTextDocumentNotification2.method);
    })(WillSaveTextDocumentNotification || (exports2.WillSaveTextDocumentNotification = WillSaveTextDocumentNotification = {}));
    var WillSaveTextDocumentWaitUntilRequest;
    (function(WillSaveTextDocumentWaitUntilRequest2) {
      WillSaveTextDocumentWaitUntilRequest2.method = "textDocument/willSaveWaitUntil";
      WillSaveTextDocumentWaitUntilRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WillSaveTextDocumentWaitUntilRequest2.type = new messages_1.ProtocolRequestType(WillSaveTextDocumentWaitUntilRequest2.method);
    })(WillSaveTextDocumentWaitUntilRequest || (exports2.WillSaveTextDocumentWaitUntilRequest = WillSaveTextDocumentWaitUntilRequest = {}));
    var DidChangeWatchedFilesNotification;
    (function(DidChangeWatchedFilesNotification2) {
      DidChangeWatchedFilesNotification2.method = "workspace/didChangeWatchedFiles";
      DidChangeWatchedFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidChangeWatchedFilesNotification2.type = new messages_1.ProtocolNotificationType(DidChangeWatchedFilesNotification2.method);
    })(DidChangeWatchedFilesNotification || (exports2.DidChangeWatchedFilesNotification = DidChangeWatchedFilesNotification = {}));
    var FileChangeType;
    (function(FileChangeType2) {
      FileChangeType2.Created = 1;
      FileChangeType2.Changed = 2;
      FileChangeType2.Deleted = 3;
    })(FileChangeType || (exports2.FileChangeType = FileChangeType = {}));
    var RelativePattern;
    (function(RelativePattern2) {
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && (vscode_languageserver_types_1.URI.is(candidate.baseUri) || vscode_languageserver_types_1.WorkspaceFolder.is(candidate.baseUri)) && Is.string(candidate.pattern);
      }
      RelativePattern2.is = is;
    })(RelativePattern || (exports2.RelativePattern = RelativePattern = {}));
    var WatchKind;
    (function(WatchKind2) {
      WatchKind2.Create = 1;
      WatchKind2.Change = 2;
      WatchKind2.Delete = 4;
    })(WatchKind || (exports2.WatchKind = WatchKind = {}));
    var PublishDiagnosticsNotification;
    (function(PublishDiagnosticsNotification2) {
      PublishDiagnosticsNotification2.method = "textDocument/publishDiagnostics";
      PublishDiagnosticsNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
      PublishDiagnosticsNotification2.type = new messages_1.ProtocolNotificationType(PublishDiagnosticsNotification2.method);
    })(PublishDiagnosticsNotification || (exports2.PublishDiagnosticsNotification = PublishDiagnosticsNotification = {}));
    var CompletionTriggerKind;
    (function(CompletionTriggerKind2) {
      CompletionTriggerKind2.Invoked = 1;
      CompletionTriggerKind2.TriggerCharacter = 2;
      CompletionTriggerKind2.TriggerForIncompleteCompletions = 3;
    })(CompletionTriggerKind || (exports2.CompletionTriggerKind = CompletionTriggerKind = {}));
    var CompletionRequest;
    (function(CompletionRequest2) {
      CompletionRequest2.method = "textDocument/completion";
      CompletionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CompletionRequest2.type = new messages_1.ProtocolRequestType(CompletionRequest2.method);
    })(CompletionRequest || (exports2.CompletionRequest = CompletionRequest = {}));
    var CompletionResolveRequest;
    (function(CompletionResolveRequest2) {
      CompletionResolveRequest2.method = "completionItem/resolve";
      CompletionResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CompletionResolveRequest2.type = new messages_1.ProtocolRequestType(CompletionResolveRequest2.method);
    })(CompletionResolveRequest || (exports2.CompletionResolveRequest = CompletionResolveRequest = {}));
    var HoverRequest;
    (function(HoverRequest2) {
      HoverRequest2.method = "textDocument/hover";
      HoverRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      HoverRequest2.type = new messages_1.ProtocolRequestType(HoverRequest2.method);
    })(HoverRequest || (exports2.HoverRequest = HoverRequest = {}));
    var SignatureHelpTriggerKind;
    (function(SignatureHelpTriggerKind2) {
      SignatureHelpTriggerKind2.Invoked = 1;
      SignatureHelpTriggerKind2.TriggerCharacter = 2;
      SignatureHelpTriggerKind2.ContentChange = 3;
    })(SignatureHelpTriggerKind || (exports2.SignatureHelpTriggerKind = SignatureHelpTriggerKind = {}));
    var SignatureHelpRequest;
    (function(SignatureHelpRequest2) {
      SignatureHelpRequest2.method = "textDocument/signatureHelp";
      SignatureHelpRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      SignatureHelpRequest2.type = new messages_1.ProtocolRequestType(SignatureHelpRequest2.method);
    })(SignatureHelpRequest || (exports2.SignatureHelpRequest = SignatureHelpRequest = {}));
    var DefinitionRequest;
    (function(DefinitionRequest2) {
      DefinitionRequest2.method = "textDocument/definition";
      DefinitionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DefinitionRequest2.type = new messages_1.ProtocolRequestType(DefinitionRequest2.method);
    })(DefinitionRequest || (exports2.DefinitionRequest = DefinitionRequest = {}));
    var ReferencesRequest;
    (function(ReferencesRequest2) {
      ReferencesRequest2.method = "textDocument/references";
      ReferencesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      ReferencesRequest2.type = new messages_1.ProtocolRequestType(ReferencesRequest2.method);
    })(ReferencesRequest || (exports2.ReferencesRequest = ReferencesRequest = {}));
    var DocumentHighlightRequest;
    (function(DocumentHighlightRequest2) {
      DocumentHighlightRequest2.method = "textDocument/documentHighlight";
      DocumentHighlightRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentHighlightRequest2.type = new messages_1.ProtocolRequestType(DocumentHighlightRequest2.method);
    })(DocumentHighlightRequest || (exports2.DocumentHighlightRequest = DocumentHighlightRequest = {}));
    var DocumentSymbolRequest;
    (function(DocumentSymbolRequest2) {
      DocumentSymbolRequest2.method = "textDocument/documentSymbol";
      DocumentSymbolRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentSymbolRequest2.type = new messages_1.ProtocolRequestType(DocumentSymbolRequest2.method);
    })(DocumentSymbolRequest || (exports2.DocumentSymbolRequest = DocumentSymbolRequest = {}));
    var CodeActionRequest;
    (function(CodeActionRequest2) {
      CodeActionRequest2.method = "textDocument/codeAction";
      CodeActionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CodeActionRequest2.type = new messages_1.ProtocolRequestType(CodeActionRequest2.method);
    })(CodeActionRequest || (exports2.CodeActionRequest = CodeActionRequest = {}));
    var CodeActionResolveRequest;
    (function(CodeActionResolveRequest2) {
      CodeActionResolveRequest2.method = "codeAction/resolve";
      CodeActionResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CodeActionResolveRequest2.type = new messages_1.ProtocolRequestType(CodeActionResolveRequest2.method);
    })(CodeActionResolveRequest || (exports2.CodeActionResolveRequest = CodeActionResolveRequest = {}));
    var WorkspaceSymbolRequest;
    (function(WorkspaceSymbolRequest2) {
      WorkspaceSymbolRequest2.method = "workspace/symbol";
      WorkspaceSymbolRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WorkspaceSymbolRequest2.type = new messages_1.ProtocolRequestType(WorkspaceSymbolRequest2.method);
    })(WorkspaceSymbolRequest || (exports2.WorkspaceSymbolRequest = WorkspaceSymbolRequest = {}));
    var WorkspaceSymbolResolveRequest;
    (function(WorkspaceSymbolResolveRequest2) {
      WorkspaceSymbolResolveRequest2.method = "workspaceSymbol/resolve";
      WorkspaceSymbolResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WorkspaceSymbolResolveRequest2.type = new messages_1.ProtocolRequestType(WorkspaceSymbolResolveRequest2.method);
    })(WorkspaceSymbolResolveRequest || (exports2.WorkspaceSymbolResolveRequest = WorkspaceSymbolResolveRequest = {}));
    var CodeLensRequest;
    (function(CodeLensRequest2) {
      CodeLensRequest2.method = "textDocument/codeLens";
      CodeLensRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CodeLensRequest2.type = new messages_1.ProtocolRequestType(CodeLensRequest2.method);
    })(CodeLensRequest || (exports2.CodeLensRequest = CodeLensRequest = {}));
    var CodeLensResolveRequest;
    (function(CodeLensResolveRequest2) {
      CodeLensResolveRequest2.method = "codeLens/resolve";
      CodeLensResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CodeLensResolveRequest2.type = new messages_1.ProtocolRequestType(CodeLensResolveRequest2.method);
    })(CodeLensResolveRequest || (exports2.CodeLensResolveRequest = CodeLensResolveRequest = {}));
    var CodeLensRefreshRequest;
    (function(CodeLensRefreshRequest2) {
      CodeLensRefreshRequest2.method = `workspace/codeLens/refresh`;
      CodeLensRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      CodeLensRefreshRequest2.type = new messages_1.ProtocolRequestType0(CodeLensRefreshRequest2.method);
    })(CodeLensRefreshRequest || (exports2.CodeLensRefreshRequest = CodeLensRefreshRequest = {}));
    var DocumentLinkRequest;
    (function(DocumentLinkRequest2) {
      DocumentLinkRequest2.method = "textDocument/documentLink";
      DocumentLinkRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentLinkRequest2.type = new messages_1.ProtocolRequestType(DocumentLinkRequest2.method);
    })(DocumentLinkRequest || (exports2.DocumentLinkRequest = DocumentLinkRequest = {}));
    var DocumentLinkResolveRequest;
    (function(DocumentLinkResolveRequest2) {
      DocumentLinkResolveRequest2.method = "documentLink/resolve";
      DocumentLinkResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentLinkResolveRequest2.type = new messages_1.ProtocolRequestType(DocumentLinkResolveRequest2.method);
    })(DocumentLinkResolveRequest || (exports2.DocumentLinkResolveRequest = DocumentLinkResolveRequest = {}));
    var DocumentFormattingRequest;
    (function(DocumentFormattingRequest2) {
      DocumentFormattingRequest2.method = "textDocument/formatting";
      DocumentFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentFormattingRequest2.method);
    })(DocumentFormattingRequest || (exports2.DocumentFormattingRequest = DocumentFormattingRequest = {}));
    var DocumentRangeFormattingRequest;
    (function(DocumentRangeFormattingRequest2) {
      DocumentRangeFormattingRequest2.method = "textDocument/rangeFormatting";
      DocumentRangeFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentRangeFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentRangeFormattingRequest2.method);
    })(DocumentRangeFormattingRequest || (exports2.DocumentRangeFormattingRequest = DocumentRangeFormattingRequest = {}));
    var DocumentRangesFormattingRequest;
    (function(DocumentRangesFormattingRequest2) {
      DocumentRangesFormattingRequest2.method = "textDocument/rangesFormatting";
      DocumentRangesFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentRangesFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentRangesFormattingRequest2.method);
    })(DocumentRangesFormattingRequest || (exports2.DocumentRangesFormattingRequest = DocumentRangesFormattingRequest = {}));
    var DocumentOnTypeFormattingRequest;
    (function(DocumentOnTypeFormattingRequest2) {
      DocumentOnTypeFormattingRequest2.method = "textDocument/onTypeFormatting";
      DocumentOnTypeFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentOnTypeFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentOnTypeFormattingRequest2.method);
    })(DocumentOnTypeFormattingRequest || (exports2.DocumentOnTypeFormattingRequest = DocumentOnTypeFormattingRequest = {}));
    var PrepareSupportDefaultBehavior;
    (function(PrepareSupportDefaultBehavior2) {
      PrepareSupportDefaultBehavior2.Identifier = 1;
    })(PrepareSupportDefaultBehavior || (exports2.PrepareSupportDefaultBehavior = PrepareSupportDefaultBehavior = {}));
    var RenameRequest;
    (function(RenameRequest2) {
      RenameRequest2.method = "textDocument/rename";
      RenameRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      RenameRequest2.type = new messages_1.ProtocolRequestType(RenameRequest2.method);
    })(RenameRequest || (exports2.RenameRequest = RenameRequest = {}));
    var PrepareRenameRequest;
    (function(PrepareRenameRequest2) {
      PrepareRenameRequest2.method = "textDocument/prepareRename";
      PrepareRenameRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      PrepareRenameRequest2.type = new messages_1.ProtocolRequestType(PrepareRenameRequest2.method);
    })(PrepareRenameRequest || (exports2.PrepareRenameRequest = PrepareRenameRequest = {}));
    var ExecuteCommandRequest;
    (function(ExecuteCommandRequest2) {
      ExecuteCommandRequest2.method = "workspace/executeCommand";
      ExecuteCommandRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      ExecuteCommandRequest2.type = new messages_1.ProtocolRequestType(ExecuteCommandRequest2.method);
    })(ExecuteCommandRequest || (exports2.ExecuteCommandRequest = ExecuteCommandRequest = {}));
    var ApplyWorkspaceEditRequest;
    (function(ApplyWorkspaceEditRequest2) {
      ApplyWorkspaceEditRequest2.method = "workspace/applyEdit";
      ApplyWorkspaceEditRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      ApplyWorkspaceEditRequest2.type = new messages_1.ProtocolRequestType("workspace/applyEdit");
    })(ApplyWorkspaceEditRequest || (exports2.ApplyWorkspaceEditRequest = ApplyWorkspaceEditRequest = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/connection.js
var require_connection2 = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/connection.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createProtocolConnection = void 0;
    var vscode_jsonrpc_1 = require_main();
    function createProtocolConnection(input, output, logger, options) {
      if (vscode_jsonrpc_1.ConnectionStrategy.is(options)) {
        options = { connectionStrategy: options };
      }
      return (0, vscode_jsonrpc_1.createMessageConnection)(input, output, logger, options);
    }
    exports2.createProtocolConnection = createProtocolConnection;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/api.js
var require_api2 = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/api.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LSPErrorCodes = exports2.createProtocolConnection = void 0;
    __exportStar(require_main(), exports2);
    __exportStar(require_main2(), exports2);
    __exportStar(require_messages2(), exports2);
    __exportStar(require_protocol(), exports2);
    var connection_1 = require_connection2();
    Object.defineProperty(exports2, "createProtocolConnection", { enumerable: true, get: function() {
      return connection_1.createProtocolConnection;
    } });
    var LSPErrorCodes;
    (function(LSPErrorCodes2) {
      LSPErrorCodes2.lspReservedErrorRangeStart = -32899;
      LSPErrorCodes2.RequestFailed = -32803;
      LSPErrorCodes2.ServerCancelled = -32802;
      LSPErrorCodes2.ContentModified = -32801;
      LSPErrorCodes2.RequestCancelled = -32800;
      LSPErrorCodes2.lspReservedErrorRangeEnd = -32800;
    })(LSPErrorCodes || (exports2.LSPErrorCodes = LSPErrorCodes = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/node/main.js
var require_main3 = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/node/main.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createProtocolConnection = void 0;
    var node_1 = require_node();
    __exportStar(require_node(), exports2);
    __exportStar(require_api2(), exports2);
    function createProtocolConnection(input, output, logger, options) {
      return (0, node_1.createMessageConnection)(input, output, logger, options);
    }
    exports2.createProtocolConnection = createProtocolConnection;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/utils/uuid.js
var require_uuid = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/utils/uuid.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.generateUuid = exports2.parse = exports2.isUUID = exports2.v4 = exports2.empty = void 0;
    var ValueUUID = class {
      constructor(_value) {
        this._value = _value;
      }
      asHex() {
        return this._value;
      }
      equals(other) {
        return this.asHex() === other.asHex();
      }
    };
    var V4UUID = class _V4UUID extends ValueUUID {
      static _oneOf(array) {
        return array[Math.floor(array.length * Math.random())];
      }
      static _randomHex() {
        return _V4UUID._oneOf(_V4UUID._chars);
      }
      constructor() {
        super([
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          "-",
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          "-",
          "4",
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          "-",
          _V4UUID._oneOf(_V4UUID._timeHighBits),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          "-",
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex()
        ].join(""));
      }
    };
    V4UUID._chars = ["0", "1", "2", "3", "4", "5", "6", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    V4UUID._timeHighBits = ["8", "9", "a", "b"];
    exports2.empty = new ValueUUID("00000000-0000-0000-0000-000000000000");
    function v4() {
      return new V4UUID();
    }
    exports2.v4 = v4;
    var _UUIDPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    function isUUID(value) {
      return _UUIDPattern.test(value);
    }
    exports2.isUUID = isUUID;
    function parse(value) {
      if (!isUUID(value)) {
        throw new Error("invalid uuid");
      }
      return new ValueUUID(value);
    }
    exports2.parse = parse;
    function generateUuid() {
      return v4().asHex();
    }
    exports2.generateUuid = generateUuid;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/progress.js
var require_progress = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/progress.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.attachPartialResult = exports2.ProgressFeature = exports2.attachWorkDone = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var uuid_1 = require_uuid();
    var WorkDoneProgressReporterImpl = class _WorkDoneProgressReporterImpl {
      constructor(_connection, _token) {
        this._connection = _connection;
        this._token = _token;
        _WorkDoneProgressReporterImpl.Instances.set(this._token, this);
      }
      begin(title, percentage, message, cancellable) {
        let param = {
          kind: "begin",
          title,
          percentage,
          message,
          cancellable
        };
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, param);
      }
      report(arg0, arg1) {
        let param = {
          kind: "report"
        };
        if (typeof arg0 === "number") {
          param.percentage = arg0;
          if (arg1 !== void 0) {
            param.message = arg1;
          }
        } else {
          param.message = arg0;
        }
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, param);
      }
      done() {
        _WorkDoneProgressReporterImpl.Instances.delete(this._token);
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, { kind: "end" });
      }
    };
    WorkDoneProgressReporterImpl.Instances = /* @__PURE__ */ new Map();
    var WorkDoneProgressServerReporterImpl = class extends WorkDoneProgressReporterImpl {
      constructor(connection, token) {
        super(connection, token);
        this._source = new vscode_languageserver_protocol_1.CancellationTokenSource();
      }
      get token() {
        return this._source.token;
      }
      done() {
        this._source.dispose();
        super.done();
      }
      cancel() {
        this._source.cancel();
      }
    };
    var NullProgressReporter = class {
      constructor() {
      }
      begin() {
      }
      report() {
      }
      done() {
      }
    };
    var NullProgressServerReporter = class extends NullProgressReporter {
      constructor() {
        super();
        this._source = new vscode_languageserver_protocol_1.CancellationTokenSource();
      }
      get token() {
        return this._source.token;
      }
      done() {
        this._source.dispose();
      }
      cancel() {
        this._source.cancel();
      }
    };
    function attachWorkDone(connection, params) {
      if (params === void 0 || params.workDoneToken === void 0) {
        return new NullProgressReporter();
      }
      const token = params.workDoneToken;
      delete params.workDoneToken;
      return new WorkDoneProgressReporterImpl(connection, token);
    }
    exports2.attachWorkDone = attachWorkDone;
    var ProgressFeature = (Base) => {
      return class extends Base {
        constructor() {
          super();
          this._progressSupported = false;
        }
        initialize(capabilities) {
          super.initialize(capabilities);
          if (capabilities?.window?.workDoneProgress === true) {
            this._progressSupported = true;
            this.connection.onNotification(vscode_languageserver_protocol_1.WorkDoneProgressCancelNotification.type, (params) => {
              let progress = WorkDoneProgressReporterImpl.Instances.get(params.token);
              if (progress instanceof WorkDoneProgressServerReporterImpl || progress instanceof NullProgressServerReporter) {
                progress.cancel();
              }
            });
          }
        }
        attachWorkDoneProgress(token) {
          if (token === void 0) {
            return new NullProgressReporter();
          } else {
            return new WorkDoneProgressReporterImpl(this.connection, token);
          }
        }
        createWorkDoneProgress() {
          if (this._progressSupported) {
            const token = (0, uuid_1.generateUuid)();
            return this.connection.sendRequest(vscode_languageserver_protocol_1.WorkDoneProgressCreateRequest.type, { token }).then(() => {
              const result = new WorkDoneProgressServerReporterImpl(this.connection, token);
              return result;
            });
          } else {
            return Promise.resolve(new NullProgressServerReporter());
          }
        }
      };
    };
    exports2.ProgressFeature = ProgressFeature;
    var ResultProgress;
    (function(ResultProgress2) {
      ResultProgress2.type = new vscode_languageserver_protocol_1.ProgressType();
    })(ResultProgress || (ResultProgress = {}));
    var ResultProgressReporterImpl = class {
      constructor(_connection, _token) {
        this._connection = _connection;
        this._token = _token;
      }
      report(data) {
        this._connection.sendProgress(ResultProgress.type, this._token, data);
      }
    };
    function attachPartialResult(connection, params) {
      if (params === void 0 || params.partialResultToken === void 0) {
        return void 0;
      }
      const token = params.partialResultToken;
      delete params.partialResultToken;
      return new ResultProgressReporterImpl(connection, token);
    }
    exports2.attachPartialResult = attachPartialResult;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/configuration.js
var require_configuration = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/configuration.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ConfigurationFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var Is = require_is();
    var ConfigurationFeature = (Base) => {
      return class extends Base {
        getConfiguration(arg) {
          if (!arg) {
            return this._getConfiguration({});
          } else if (Is.string(arg)) {
            return this._getConfiguration({ section: arg });
          } else {
            return this._getConfiguration(arg);
          }
        }
        _getConfiguration(arg) {
          let params = {
            items: Array.isArray(arg) ? arg : [arg]
          };
          return this.connection.sendRequest(vscode_languageserver_protocol_1.ConfigurationRequest.type, params).then((result) => {
            if (Array.isArray(result)) {
              return Array.isArray(arg) ? result : result[0];
            } else {
              return Array.isArray(arg) ? [] : null;
            }
          });
        }
      };
    };
    exports2.ConfigurationFeature = ConfigurationFeature;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/workspaceFolder.js
var require_workspaceFolder = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/workspaceFolder.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WorkspaceFoldersFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var WorkspaceFoldersFeature = (Base) => {
      return class extends Base {
        constructor() {
          super();
          this._notificationIsAutoRegistered = false;
        }
        initialize(capabilities) {
          super.initialize(capabilities);
          let workspaceCapabilities = capabilities.workspace;
          if (workspaceCapabilities && workspaceCapabilities.workspaceFolders) {
            this._onDidChangeWorkspaceFolders = new vscode_languageserver_protocol_1.Emitter();
            this.connection.onNotification(vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type, (params) => {
              this._onDidChangeWorkspaceFolders.fire(params.event);
            });
          }
        }
        fillServerCapabilities(capabilities) {
          super.fillServerCapabilities(capabilities);
          const changeNotifications = capabilities.workspace?.workspaceFolders?.changeNotifications;
          this._notificationIsAutoRegistered = changeNotifications === true || typeof changeNotifications === "string";
        }
        getWorkspaceFolders() {
          return this.connection.sendRequest(vscode_languageserver_protocol_1.WorkspaceFoldersRequest.type);
        }
        get onDidChangeWorkspaceFolders() {
          if (!this._onDidChangeWorkspaceFolders) {
            throw new Error("Client doesn't support sending workspace folder change events.");
          }
          if (!this._notificationIsAutoRegistered && !this._unregistration) {
            this._unregistration = this.connection.client.register(vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type);
          }
          return this._onDidChangeWorkspaceFolders.event;
        }
      };
    };
    exports2.WorkspaceFoldersFeature = WorkspaceFoldersFeature;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/callHierarchy.js
var require_callHierarchy = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/callHierarchy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CallHierarchyFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var CallHierarchyFeature = (Base) => {
      return class extends Base {
        get callHierarchy() {
          return {
            onPrepare: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.CallHierarchyPrepareRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), void 0);
              });
            },
            onIncomingCalls: (handler) => {
              const type = vscode_languageserver_protocol_1.CallHierarchyIncomingCallsRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            },
            onOutgoingCalls: (handler) => {
              const type = vscode_languageserver_protocol_1.CallHierarchyOutgoingCallsRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
    exports2.CallHierarchyFeature = CallHierarchyFeature;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/semanticTokens.js
var require_semanticTokens = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/semanticTokens.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SemanticTokensBuilder = exports2.SemanticTokensDiff = exports2.SemanticTokensFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var SemanticTokensFeature = (Base) => {
      return class extends Base {
        get semanticTokens() {
          return {
            refresh: () => {
              return this.connection.sendRequest(vscode_languageserver_protocol_1.SemanticTokensRefreshRequest.type);
            },
            on: (handler) => {
              const type = vscode_languageserver_protocol_1.SemanticTokensRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            },
            onDelta: (handler) => {
              const type = vscode_languageserver_protocol_1.SemanticTokensDeltaRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            },
            onRange: (handler) => {
              const type = vscode_languageserver_protocol_1.SemanticTokensRangeRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
    exports2.SemanticTokensFeature = SemanticTokensFeature;
    var SemanticTokensDiff = class {
      constructor(originalSequence, modifiedSequence) {
        this.originalSequence = originalSequence;
        this.modifiedSequence = modifiedSequence;
      }
      computeDiff() {
        const originalLength = this.originalSequence.length;
        const modifiedLength = this.modifiedSequence.length;
        let startIndex = 0;
        while (startIndex < modifiedLength && startIndex < originalLength && this.originalSequence[startIndex] === this.modifiedSequence[startIndex]) {
          startIndex++;
        }
        if (startIndex < modifiedLength && startIndex < originalLength) {
          let originalEndIndex = originalLength - 1;
          let modifiedEndIndex = modifiedLength - 1;
          while (originalEndIndex >= startIndex && modifiedEndIndex >= startIndex && this.originalSequence[originalEndIndex] === this.modifiedSequence[modifiedEndIndex]) {
            originalEndIndex--;
            modifiedEndIndex--;
          }
          if (originalEndIndex < startIndex || modifiedEndIndex < startIndex) {
            originalEndIndex++;
            modifiedEndIndex++;
          }
          const deleteCount = originalEndIndex - startIndex + 1;
          const newData = this.modifiedSequence.slice(startIndex, modifiedEndIndex + 1);
          if (newData.length === 1 && newData[0] === this.originalSequence[originalEndIndex]) {
            return [
              { start: startIndex, deleteCount: deleteCount - 1 }
            ];
          } else {
            return [
              { start: startIndex, deleteCount, data: newData }
            ];
          }
        } else if (startIndex < modifiedLength) {
          return [
            { start: startIndex, deleteCount: 0, data: this.modifiedSequence.slice(startIndex) }
          ];
        } else if (startIndex < originalLength) {
          return [
            { start: startIndex, deleteCount: originalLength - startIndex }
          ];
        } else {
          return [];
        }
      }
    };
    exports2.SemanticTokensDiff = SemanticTokensDiff;
    var SemanticTokensBuilder2 = class {
      constructor() {
        this._prevData = void 0;
        this.initialize();
      }
      initialize() {
        this._id = Date.now();
        this._prevLine = 0;
        this._prevChar = 0;
        this._data = [];
        this._dataLen = 0;
      }
      push(line, char, length, tokenType, tokenModifiers) {
        let pushLine = line;
        let pushChar = char;
        if (this._dataLen > 0) {
          pushLine -= this._prevLine;
          if (pushLine === 0) {
            pushChar -= this._prevChar;
          }
        }
        this._data[this._dataLen++] = pushLine;
        this._data[this._dataLen++] = pushChar;
        this._data[this._dataLen++] = length;
        this._data[this._dataLen++] = tokenType;
        this._data[this._dataLen++] = tokenModifiers;
        this._prevLine = line;
        this._prevChar = char;
      }
      get id() {
        return this._id.toString();
      }
      previousResult(id) {
        if (this.id === id) {
          this._prevData = this._data;
        }
        this.initialize();
      }
      build() {
        this._prevData = void 0;
        return {
          resultId: this.id,
          data: this._data
        };
      }
      canBuildEdits() {
        return this._prevData !== void 0;
      }
      buildEdits() {
        if (this._prevData !== void 0) {
          return {
            resultId: this.id,
            edits: new SemanticTokensDiff(this._prevData, this._data).computeDiff()
          };
        } else {
          return this.build();
        }
      }
    };
    exports2.SemanticTokensBuilder = SemanticTokensBuilder2;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/showDocument.js
var require_showDocument = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/showDocument.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ShowDocumentFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var ShowDocumentFeature = (Base) => {
      return class extends Base {
        showDocument(params) {
          return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowDocumentRequest.type, params);
        }
      };
    };
    exports2.ShowDocumentFeature = ShowDocumentFeature;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/fileOperations.js
var require_fileOperations = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/fileOperations.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FileOperationsFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var FileOperationsFeature = (Base) => {
      return class extends Base {
        onDidCreateFiles(handler) {
          return this.connection.onNotification(vscode_languageserver_protocol_1.DidCreateFilesNotification.type, (params) => {
            handler(params);
          });
        }
        onDidRenameFiles(handler) {
          return this.connection.onNotification(vscode_languageserver_protocol_1.DidRenameFilesNotification.type, (params) => {
            handler(params);
          });
        }
        onDidDeleteFiles(handler) {
          return this.connection.onNotification(vscode_languageserver_protocol_1.DidDeleteFilesNotification.type, (params) => {
            handler(params);
          });
        }
        onWillCreateFiles(handler) {
          return this.connection.onRequest(vscode_languageserver_protocol_1.WillCreateFilesRequest.type, (params, cancel) => {
            return handler(params, cancel);
          });
        }
        onWillRenameFiles(handler) {
          return this.connection.onRequest(vscode_languageserver_protocol_1.WillRenameFilesRequest.type, (params, cancel) => {
            return handler(params, cancel);
          });
        }
        onWillDeleteFiles(handler) {
          return this.connection.onRequest(vscode_languageserver_protocol_1.WillDeleteFilesRequest.type, (params, cancel) => {
            return handler(params, cancel);
          });
        }
      };
    };
    exports2.FileOperationsFeature = FileOperationsFeature;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/linkedEditingRange.js
var require_linkedEditingRange = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/linkedEditingRange.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LinkedEditingRangeFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var LinkedEditingRangeFeature = (Base) => {
      return class extends Base {
        onLinkedEditingRange(handler) {
          return this.connection.onRequest(vscode_languageserver_protocol_1.LinkedEditingRangeRequest.type, (params, cancel) => {
            return handler(params, cancel, this.attachWorkDoneProgress(params), void 0);
          });
        }
      };
    };
    exports2.LinkedEditingRangeFeature = LinkedEditingRangeFeature;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/typeHierarchy.js
var require_typeHierarchy = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/typeHierarchy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TypeHierarchyFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var TypeHierarchyFeature = (Base) => {
      return class extends Base {
        get typeHierarchy() {
          return {
            onPrepare: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.TypeHierarchyPrepareRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), void 0);
              });
            },
            onSupertypes: (handler) => {
              const type = vscode_languageserver_protocol_1.TypeHierarchySupertypesRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            },
            onSubtypes: (handler) => {
              const type = vscode_languageserver_protocol_1.TypeHierarchySubtypesRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
    exports2.TypeHierarchyFeature = TypeHierarchyFeature;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/inlineValue.js
var require_inlineValue = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/inlineValue.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InlineValueFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var InlineValueFeature = (Base) => {
      return class extends Base {
        get inlineValue() {
          return {
            refresh: () => {
              return this.connection.sendRequest(vscode_languageserver_protocol_1.InlineValueRefreshRequest.type);
            },
            on: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.InlineValueRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params));
              });
            }
          };
        }
      };
    };
    exports2.InlineValueFeature = InlineValueFeature;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/foldingRange.js
var require_foldingRange = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/foldingRange.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FoldingRangeFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var FoldingRangeFeature = (Base) => {
      return class extends Base {
        get foldingRange() {
          return {
            refresh: () => {
              return this.connection.sendRequest(vscode_languageserver_protocol_1.FoldingRangeRefreshRequest.type);
            },
            on: (handler) => {
              const type = vscode_languageserver_protocol_1.FoldingRangeRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
    exports2.FoldingRangeFeature = FoldingRangeFeature;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/inlayHint.js
var require_inlayHint = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/inlayHint.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InlayHintFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var InlayHintFeature = (Base) => {
      return class extends Base {
        get inlayHint() {
          return {
            refresh: () => {
              return this.connection.sendRequest(vscode_languageserver_protocol_1.InlayHintRefreshRequest.type);
            },
            on: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.InlayHintRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params));
              });
            },
            resolve: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.InlayHintResolveRequest.type, (params, cancel) => {
                return handler(params, cancel);
              });
            }
          };
        }
      };
    };
    exports2.InlayHintFeature = InlayHintFeature;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/diagnostic.js
var require_diagnostic = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/diagnostic.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DiagnosticFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var DiagnosticFeature = (Base) => {
      return class extends Base {
        get diagnostics() {
          return {
            refresh: () => {
              return this.connection.sendRequest(vscode_languageserver_protocol_1.DiagnosticRefreshRequest.type);
            },
            on: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.DocumentDiagnosticRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(vscode_languageserver_protocol_1.DocumentDiagnosticRequest.partialResult, params));
              });
            },
            onWorkspace: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.WorkspaceDiagnosticRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(vscode_languageserver_protocol_1.WorkspaceDiagnosticRequest.partialResult, params));
              });
            }
          };
        }
      };
    };
    exports2.DiagnosticFeature = DiagnosticFeature;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/textDocuments.js
var require_textDocuments = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/textDocuments.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TextDocuments = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var TextDocuments2 = class {
      /**
       * Create a new text document manager.
       */
      constructor(configuration) {
        this._configuration = configuration;
        this._syncedDocuments = /* @__PURE__ */ new Map();
        this._onDidChangeContent = new vscode_languageserver_protocol_1.Emitter();
        this._onDidOpen = new vscode_languageserver_protocol_1.Emitter();
        this._onDidClose = new vscode_languageserver_protocol_1.Emitter();
        this._onDidSave = new vscode_languageserver_protocol_1.Emitter();
        this._onWillSave = new vscode_languageserver_protocol_1.Emitter();
      }
      /**
       * An event that fires when a text document managed by this manager
       * has been opened.
       */
      get onDidOpen() {
        return this._onDidOpen.event;
      }
      /**
       * An event that fires when a text document managed by this manager
       * has been opened or the content changes.
       */
      get onDidChangeContent() {
        return this._onDidChangeContent.event;
      }
      /**
       * An event that fires when a text document managed by this manager
       * will be saved.
       */
      get onWillSave() {
        return this._onWillSave.event;
      }
      /**
       * Sets a handler that will be called if a participant wants to provide
       * edits during a text document save.
       */
      onWillSaveWaitUntil(handler) {
        this._willSaveWaitUntil = handler;
      }
      /**
       * An event that fires when a text document managed by this manager
       * has been saved.
       */
      get onDidSave() {
        return this._onDidSave.event;
      }
      /**
       * An event that fires when a text document managed by this manager
       * has been closed.
       */
      get onDidClose() {
        return this._onDidClose.event;
      }
      /**
       * Returns the document for the given URI. Returns undefined if
       * the document is not managed by this instance.
       *
       * @param uri The text document's URI to retrieve.
       * @return the text document or `undefined`.
       */
      get(uri) {
        return this._syncedDocuments.get(uri);
      }
      /**
       * Returns all text documents managed by this instance.
       *
       * @return all text documents.
       */
      all() {
        return Array.from(this._syncedDocuments.values());
      }
      /**
       * Returns the URIs of all text documents managed by this instance.
       *
       * @return the URI's of all text documents.
       */
      keys() {
        return Array.from(this._syncedDocuments.keys());
      }
      /**
       * Listens for `low level` notification on the given connection to
       * update the text documents managed by this instance.
       *
       * Please note that the connection only provides handlers not an event model. Therefore
       * listening on a connection will overwrite the following handlers on a connection:
       * `onDidOpenTextDocument`, `onDidChangeTextDocument`, `onDidCloseTextDocument`,
       * `onWillSaveTextDocument`, `onWillSaveTextDocumentWaitUntil` and `onDidSaveTextDocument`.
       *
       * Use the corresponding events on the TextDocuments instance instead.
       *
       * @param connection The connection to listen on.
       */
      listen(connection) {
        connection.__textDocumentSync = vscode_languageserver_protocol_1.TextDocumentSyncKind.Incremental;
        const disposables = [];
        disposables.push(connection.onDidOpenTextDocument((event) => {
          const td = event.textDocument;
          const document = this._configuration.create(td.uri, td.languageId, td.version, td.text);
          this._syncedDocuments.set(td.uri, document);
          const toFire = Object.freeze({ document });
          this._onDidOpen.fire(toFire);
          this._onDidChangeContent.fire(toFire);
        }));
        disposables.push(connection.onDidChangeTextDocument((event) => {
          const td = event.textDocument;
          const changes = event.contentChanges;
          if (changes.length === 0) {
            return;
          }
          const { version } = td;
          if (version === null || version === void 0) {
            throw new Error(`Received document change event for ${td.uri} without valid version identifier`);
          }
          let syncedDocument = this._syncedDocuments.get(td.uri);
          if (syncedDocument !== void 0) {
            syncedDocument = this._configuration.update(syncedDocument, changes, version);
            this._syncedDocuments.set(td.uri, syncedDocument);
            this._onDidChangeContent.fire(Object.freeze({ document: syncedDocument }));
          }
        }));
        disposables.push(connection.onDidCloseTextDocument((event) => {
          let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
          if (syncedDocument !== void 0) {
            this._syncedDocuments.delete(event.textDocument.uri);
            this._onDidClose.fire(Object.freeze({ document: syncedDocument }));
          }
        }));
        disposables.push(connection.onWillSaveTextDocument((event) => {
          let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
          if (syncedDocument !== void 0) {
            this._onWillSave.fire(Object.freeze({ document: syncedDocument, reason: event.reason }));
          }
        }));
        disposables.push(connection.onWillSaveTextDocumentWaitUntil((event, token) => {
          let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
          if (syncedDocument !== void 0 && this._willSaveWaitUntil) {
            return this._willSaveWaitUntil(Object.freeze({ document: syncedDocument, reason: event.reason }), token);
          } else {
            return [];
          }
        }));
        disposables.push(connection.onDidSaveTextDocument((event) => {
          let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
          if (syncedDocument !== void 0) {
            this._onDidSave.fire(Object.freeze({ document: syncedDocument }));
          }
        }));
        return vscode_languageserver_protocol_1.Disposable.create(() => {
          disposables.forEach((disposable) => disposable.dispose());
        });
      }
    };
    exports2.TextDocuments = TextDocuments2;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/notebook.js
var require_notebook = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/notebook.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NotebookDocuments = exports2.NotebookSyncFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var textDocuments_1 = require_textDocuments();
    var NotebookSyncFeature = (Base) => {
      return class extends Base {
        get synchronization() {
          return {
            onDidOpenNotebookDocument: (handler) => {
              return this.connection.onNotification(vscode_languageserver_protocol_1.DidOpenNotebookDocumentNotification.type, (params) => {
                handler(params);
              });
            },
            onDidChangeNotebookDocument: (handler) => {
              return this.connection.onNotification(vscode_languageserver_protocol_1.DidChangeNotebookDocumentNotification.type, (params) => {
                handler(params);
              });
            },
            onDidSaveNotebookDocument: (handler) => {
              return this.connection.onNotification(vscode_languageserver_protocol_1.DidSaveNotebookDocumentNotification.type, (params) => {
                handler(params);
              });
            },
            onDidCloseNotebookDocument: (handler) => {
              return this.connection.onNotification(vscode_languageserver_protocol_1.DidCloseNotebookDocumentNotification.type, (params) => {
                handler(params);
              });
            }
          };
        }
      };
    };
    exports2.NotebookSyncFeature = NotebookSyncFeature;
    var CellTextDocumentConnection = class _CellTextDocumentConnection {
      onDidOpenTextDocument(handler) {
        this.openHandler = handler;
        return vscode_languageserver_protocol_1.Disposable.create(() => {
          this.openHandler = void 0;
        });
      }
      openTextDocument(params) {
        this.openHandler && this.openHandler(params);
      }
      onDidChangeTextDocument(handler) {
        this.changeHandler = handler;
        return vscode_languageserver_protocol_1.Disposable.create(() => {
          this.changeHandler = handler;
        });
      }
      changeTextDocument(params) {
        this.changeHandler && this.changeHandler(params);
      }
      onDidCloseTextDocument(handler) {
        this.closeHandler = handler;
        return vscode_languageserver_protocol_1.Disposable.create(() => {
          this.closeHandler = void 0;
        });
      }
      closeTextDocument(params) {
        this.closeHandler && this.closeHandler(params);
      }
      onWillSaveTextDocument() {
        return _CellTextDocumentConnection.NULL_DISPOSE;
      }
      onWillSaveTextDocumentWaitUntil() {
        return _CellTextDocumentConnection.NULL_DISPOSE;
      }
      onDidSaveTextDocument() {
        return _CellTextDocumentConnection.NULL_DISPOSE;
      }
    };
    CellTextDocumentConnection.NULL_DISPOSE = Object.freeze({ dispose: () => {
    } });
    var NotebookDocuments = class {
      constructor(configurationOrTextDocuments) {
        if (configurationOrTextDocuments instanceof textDocuments_1.TextDocuments) {
          this._cellTextDocuments = configurationOrTextDocuments;
        } else {
          this._cellTextDocuments = new textDocuments_1.TextDocuments(configurationOrTextDocuments);
        }
        this.notebookDocuments = /* @__PURE__ */ new Map();
        this.notebookCellMap = /* @__PURE__ */ new Map();
        this._onDidOpen = new vscode_languageserver_protocol_1.Emitter();
        this._onDidChange = new vscode_languageserver_protocol_1.Emitter();
        this._onDidSave = new vscode_languageserver_protocol_1.Emitter();
        this._onDidClose = new vscode_languageserver_protocol_1.Emitter();
      }
      get cellTextDocuments() {
        return this._cellTextDocuments;
      }
      getCellTextDocument(cell) {
        return this._cellTextDocuments.get(cell.document);
      }
      getNotebookDocument(uri) {
        return this.notebookDocuments.get(uri);
      }
      getNotebookCell(uri) {
        const value = this.notebookCellMap.get(uri);
        return value && value[0];
      }
      findNotebookDocumentForCell(cell) {
        const key = typeof cell === "string" ? cell : cell.document;
        const value = this.notebookCellMap.get(key);
        return value && value[1];
      }
      get onDidOpen() {
        return this._onDidOpen.event;
      }
      get onDidSave() {
        return this._onDidSave.event;
      }
      get onDidChange() {
        return this._onDidChange.event;
      }
      get onDidClose() {
        return this._onDidClose.event;
      }
      /**
       * Listens for `low level` notification on the given connection to
       * update the notebook documents managed by this instance.
       *
       * Please note that the connection only provides handlers not an event model. Therefore
       * listening on a connection will overwrite the following handlers on a connection:
       * `onDidOpenNotebookDocument`, `onDidChangeNotebookDocument`, `onDidSaveNotebookDocument`,
       *  and `onDidCloseNotebookDocument`.
       *
       * @param connection The connection to listen on.
       */
      listen(connection) {
        const cellTextDocumentConnection = new CellTextDocumentConnection();
        const disposables = [];
        disposables.push(this.cellTextDocuments.listen(cellTextDocumentConnection));
        disposables.push(connection.notebooks.synchronization.onDidOpenNotebookDocument((params) => {
          this.notebookDocuments.set(params.notebookDocument.uri, params.notebookDocument);
          for (const cellTextDocument of params.cellTextDocuments) {
            cellTextDocumentConnection.openTextDocument({ textDocument: cellTextDocument });
          }
          this.updateCellMap(params.notebookDocument);
          this._onDidOpen.fire(params.notebookDocument);
        }));
        disposables.push(connection.notebooks.synchronization.onDidChangeNotebookDocument((params) => {
          const notebookDocument = this.notebookDocuments.get(params.notebookDocument.uri);
          if (notebookDocument === void 0) {
            return;
          }
          notebookDocument.version = params.notebookDocument.version;
          const oldMetadata = notebookDocument.metadata;
          let metadataChanged = false;
          const change = params.change;
          if (change.metadata !== void 0) {
            metadataChanged = true;
            notebookDocument.metadata = change.metadata;
          }
          const opened = [];
          const closed = [];
          const data = [];
          const text = [];
          if (change.cells !== void 0) {
            const changedCells = change.cells;
            if (changedCells.structure !== void 0) {
              const array = changedCells.structure.array;
              notebookDocument.cells.splice(array.start, array.deleteCount, ...array.cells !== void 0 ? array.cells : []);
              if (changedCells.structure.didOpen !== void 0) {
                for (const open of changedCells.structure.didOpen) {
                  cellTextDocumentConnection.openTextDocument({ textDocument: open });
                  opened.push(open.uri);
                }
              }
              if (changedCells.structure.didClose) {
                for (const close of changedCells.structure.didClose) {
                  cellTextDocumentConnection.closeTextDocument({ textDocument: close });
                  closed.push(close.uri);
                }
              }
            }
            if (changedCells.data !== void 0) {
              const cellUpdates = new Map(changedCells.data.map((cell) => [cell.document, cell]));
              for (let i = 0; i <= notebookDocument.cells.length; i++) {
                const change2 = cellUpdates.get(notebookDocument.cells[i].document);
                if (change2 !== void 0) {
                  const old = notebookDocument.cells.splice(i, 1, change2);
                  data.push({ old: old[0], new: change2 });
                  cellUpdates.delete(change2.document);
                  if (cellUpdates.size === 0) {
                    break;
                  }
                }
              }
            }
            if (changedCells.textContent !== void 0) {
              for (const cellTextDocument of changedCells.textContent) {
                cellTextDocumentConnection.changeTextDocument({ textDocument: cellTextDocument.document, contentChanges: cellTextDocument.changes });
                text.push(cellTextDocument.document.uri);
              }
            }
          }
          this.updateCellMap(notebookDocument);
          const changeEvent = { notebookDocument };
          if (metadataChanged) {
            changeEvent.metadata = { old: oldMetadata, new: notebookDocument.metadata };
          }
          const added = [];
          for (const open of opened) {
            added.push(this.getNotebookCell(open));
          }
          const removed = [];
          for (const close of closed) {
            removed.push(this.getNotebookCell(close));
          }
          const textContent = [];
          for (const change2 of text) {
            textContent.push(this.getNotebookCell(change2));
          }
          if (added.length > 0 || removed.length > 0 || data.length > 0 || textContent.length > 0) {
            changeEvent.cells = { added, removed, changed: { data, textContent } };
          }
          if (changeEvent.metadata !== void 0 || changeEvent.cells !== void 0) {
            this._onDidChange.fire(changeEvent);
          }
        }));
        disposables.push(connection.notebooks.synchronization.onDidSaveNotebookDocument((params) => {
          const notebookDocument = this.notebookDocuments.get(params.notebookDocument.uri);
          if (notebookDocument === void 0) {
            return;
          }
          this._onDidSave.fire(notebookDocument);
        }));
        disposables.push(connection.notebooks.synchronization.onDidCloseNotebookDocument((params) => {
          const notebookDocument = this.notebookDocuments.get(params.notebookDocument.uri);
          if (notebookDocument === void 0) {
            return;
          }
          this._onDidClose.fire(notebookDocument);
          for (const cellTextDocument of params.cellTextDocuments) {
            cellTextDocumentConnection.closeTextDocument({ textDocument: cellTextDocument });
          }
          this.notebookDocuments.delete(params.notebookDocument.uri);
          for (const cell of notebookDocument.cells) {
            this.notebookCellMap.delete(cell.document);
          }
        }));
        return vscode_languageserver_protocol_1.Disposable.create(() => {
          disposables.forEach((disposable) => disposable.dispose());
        });
      }
      updateCellMap(notebookDocument) {
        for (const cell of notebookDocument.cells) {
          this.notebookCellMap.set(cell.document, [cell, notebookDocument]);
        }
      }
    };
    exports2.NotebookDocuments = NotebookDocuments;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/moniker.js
var require_moniker = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/moniker.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MonikerFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var MonikerFeature = (Base) => {
      return class extends Base {
        get moniker() {
          return {
            on: (handler) => {
              const type = vscode_languageserver_protocol_1.MonikerRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
    exports2.MonikerFeature = MonikerFeature;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/server.js
var require_server = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/server.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createConnection = exports2.combineFeatures = exports2.combineNotebooksFeatures = exports2.combineLanguagesFeatures = exports2.combineWorkspaceFeatures = exports2.combineWindowFeatures = exports2.combineClientFeatures = exports2.combineTracerFeatures = exports2.combineTelemetryFeatures = exports2.combineConsoleFeatures = exports2._NotebooksImpl = exports2._LanguagesImpl = exports2.BulkUnregistration = exports2.BulkRegistration = exports2.ErrorMessageTracker = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var Is = require_is();
    var UUID = require_uuid();
    var progress_1 = require_progress();
    var configuration_1 = require_configuration();
    var workspaceFolder_1 = require_workspaceFolder();
    var callHierarchy_1 = require_callHierarchy();
    var semanticTokens_1 = require_semanticTokens();
    var showDocument_1 = require_showDocument();
    var fileOperations_1 = require_fileOperations();
    var linkedEditingRange_1 = require_linkedEditingRange();
    var typeHierarchy_1 = require_typeHierarchy();
    var inlineValue_1 = require_inlineValue();
    var foldingRange_1 = require_foldingRange();
    var inlayHint_1 = require_inlayHint();
    var diagnostic_1 = require_diagnostic();
    var notebook_1 = require_notebook();
    var moniker_1 = require_moniker();
    function null2Undefined(value) {
      if (value === null) {
        return void 0;
      }
      return value;
    }
    var ErrorMessageTracker = class {
      constructor() {
        this._messages = /* @__PURE__ */ Object.create(null);
      }
      /**
       * Add a message to the tracker.
       *
       * @param message The message to add.
       */
      add(message) {
        let count = this._messages[message];
        if (!count) {
          count = 0;
        }
        count++;
        this._messages[message] = count;
      }
      /**
       * Send all tracked messages to the connection's window.
       *
       * @param connection The connection established between client and server.
       */
      sendErrors(connection) {
        Object.keys(this._messages).forEach((message) => {
          connection.window.showErrorMessage(message);
        });
      }
    };
    exports2.ErrorMessageTracker = ErrorMessageTracker;
    var RemoteConsoleImpl = class {
      constructor() {
      }
      rawAttach(connection) {
        this._rawConnection = connection;
      }
      attach(connection) {
        this._connection = connection;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      fillServerCapabilities(_capabilities) {
      }
      initialize(_capabilities) {
      }
      error(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Error, message);
      }
      warn(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Warning, message);
      }
      info(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Info, message);
      }
      log(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Log, message);
      }
      debug(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Debug, message);
      }
      send(type, message) {
        if (this._rawConnection) {
          this._rawConnection.sendNotification(vscode_languageserver_protocol_1.LogMessageNotification.type, { type, message }).catch(() => {
            (0, vscode_languageserver_protocol_1.RAL)().console.error(`Sending log message failed`);
          });
        }
      }
    };
    var _RemoteWindowImpl = class {
      constructor() {
      }
      attach(connection) {
        this._connection = connection;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      showErrorMessage(message, ...actions) {
        let params = { type: vscode_languageserver_protocol_1.MessageType.Error, message, actions };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
      }
      showWarningMessage(message, ...actions) {
        let params = { type: vscode_languageserver_protocol_1.MessageType.Warning, message, actions };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
      }
      showInformationMessage(message, ...actions) {
        let params = { type: vscode_languageserver_protocol_1.MessageType.Info, message, actions };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
      }
    };
    var RemoteWindowImpl = (0, showDocument_1.ShowDocumentFeature)((0, progress_1.ProgressFeature)(_RemoteWindowImpl));
    var BulkRegistration;
    (function(BulkRegistration2) {
      function create() {
        return new BulkRegistrationImpl();
      }
      BulkRegistration2.create = create;
    })(BulkRegistration || (exports2.BulkRegistration = BulkRegistration = {}));
    var BulkRegistrationImpl = class {
      constructor() {
        this._registrations = [];
        this._registered = /* @__PURE__ */ new Set();
      }
      add(type, registerOptions) {
        const method = Is.string(type) ? type : type.method;
        if (this._registered.has(method)) {
          throw new Error(`${method} is already added to this registration`);
        }
        const id = UUID.generateUuid();
        this._registrations.push({
          id,
          method,
          registerOptions: registerOptions || {}
        });
        this._registered.add(method);
      }
      asRegistrationParams() {
        return {
          registrations: this._registrations
        };
      }
    };
    var BulkUnregistration;
    (function(BulkUnregistration2) {
      function create() {
        return new BulkUnregistrationImpl(void 0, []);
      }
      BulkUnregistration2.create = create;
    })(BulkUnregistration || (exports2.BulkUnregistration = BulkUnregistration = {}));
    var BulkUnregistrationImpl = class {
      constructor(_connection, unregistrations) {
        this._connection = _connection;
        this._unregistrations = /* @__PURE__ */ new Map();
        unregistrations.forEach((unregistration) => {
          this._unregistrations.set(unregistration.method, unregistration);
        });
      }
      get isAttached() {
        return !!this._connection;
      }
      attach(connection) {
        this._connection = connection;
      }
      add(unregistration) {
        this._unregistrations.set(unregistration.method, unregistration);
      }
      dispose() {
        let unregistrations = [];
        for (let unregistration of this._unregistrations.values()) {
          unregistrations.push(unregistration);
        }
        let params = {
          unregisterations: unregistrations
        };
        this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).catch(() => {
          this._connection.console.info(`Bulk unregistration failed.`);
        });
      }
      disposeSingle(arg) {
        const method = Is.string(arg) ? arg : arg.method;
        const unregistration = this._unregistrations.get(method);
        if (!unregistration) {
          return false;
        }
        let params = {
          unregisterations: [unregistration]
        };
        this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).then(() => {
          this._unregistrations.delete(method);
        }, (_error) => {
          this._connection.console.info(`Un-registering request handler for ${unregistration.id} failed.`);
        });
        return true;
      }
    };
    var RemoteClientImpl = class {
      attach(connection) {
        this._connection = connection;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      register(typeOrRegistrations, registerOptionsOrType, registerOptions) {
        if (typeOrRegistrations instanceof BulkRegistrationImpl) {
          return this.registerMany(typeOrRegistrations);
        } else if (typeOrRegistrations instanceof BulkUnregistrationImpl) {
          return this.registerSingle1(typeOrRegistrations, registerOptionsOrType, registerOptions);
        } else {
          return this.registerSingle2(typeOrRegistrations, registerOptionsOrType);
        }
      }
      registerSingle1(unregistration, type, registerOptions) {
        const method = Is.string(type) ? type : type.method;
        const id = UUID.generateUuid();
        let params = {
          registrations: [{ id, method, registerOptions: registerOptions || {} }]
        };
        if (!unregistration.isAttached) {
          unregistration.attach(this.connection);
        }
        return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then((_result) => {
          unregistration.add({ id, method });
          return unregistration;
        }, (_error) => {
          this.connection.console.info(`Registering request handler for ${method} failed.`);
          return Promise.reject(_error);
        });
      }
      registerSingle2(type, registerOptions) {
        const method = Is.string(type) ? type : type.method;
        const id = UUID.generateUuid();
        let params = {
          registrations: [{ id, method, registerOptions: registerOptions || {} }]
        };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then((_result) => {
          return vscode_languageserver_protocol_1.Disposable.create(() => {
            this.unregisterSingle(id, method).catch(() => {
              this.connection.console.info(`Un-registering capability with id ${id} failed.`);
            });
          });
        }, (_error) => {
          this.connection.console.info(`Registering request handler for ${method} failed.`);
          return Promise.reject(_error);
        });
      }
      unregisterSingle(id, method) {
        let params = {
          unregisterations: [{ id, method }]
        };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).catch(() => {
          this.connection.console.info(`Un-registering request handler for ${id} failed.`);
        });
      }
      registerMany(registrations) {
        let params = registrations.asRegistrationParams();
        return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then(() => {
          return new BulkUnregistrationImpl(this._connection, params.registrations.map((registration) => {
            return { id: registration.id, method: registration.method };
          }));
        }, (_error) => {
          this.connection.console.info(`Bulk registration failed.`);
          return Promise.reject(_error);
        });
      }
    };
    var _RemoteWorkspaceImpl = class {
      constructor() {
      }
      attach(connection) {
        this._connection = connection;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      applyEdit(paramOrEdit) {
        function isApplyWorkspaceEditParams(value) {
          return value && !!value.edit;
        }
        let params = isApplyWorkspaceEditParams(paramOrEdit) ? paramOrEdit : { edit: paramOrEdit };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ApplyWorkspaceEditRequest.type, params);
      }
    };
    var RemoteWorkspaceImpl = (0, fileOperations_1.FileOperationsFeature)((0, workspaceFolder_1.WorkspaceFoldersFeature)((0, configuration_1.ConfigurationFeature)(_RemoteWorkspaceImpl)));
    var TracerImpl = class {
      constructor() {
        this._trace = vscode_languageserver_protocol_1.Trace.Off;
      }
      attach(connection) {
        this._connection = connection;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      set trace(value) {
        this._trace = value;
      }
      log(message, verbose) {
        if (this._trace === vscode_languageserver_protocol_1.Trace.Off) {
          return;
        }
        this.connection.sendNotification(vscode_languageserver_protocol_1.LogTraceNotification.type, {
          message,
          verbose: this._trace === vscode_languageserver_protocol_1.Trace.Verbose ? verbose : void 0
        }).catch(() => {
        });
      }
    };
    var TelemetryImpl = class {
      constructor() {
      }
      attach(connection) {
        this._connection = connection;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      logEvent(data) {
        this.connection.sendNotification(vscode_languageserver_protocol_1.TelemetryEventNotification.type, data).catch(() => {
          this.connection.console.log(`Sending TelemetryEventNotification failed`);
        });
      }
    };
    var _LanguagesImpl = class {
      constructor() {
      }
      attach(connection) {
        this._connection = connection;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      attachWorkDoneProgress(params) {
        return (0, progress_1.attachWorkDone)(this.connection, params);
      }
      attachPartialResultProgress(_type, params) {
        return (0, progress_1.attachPartialResult)(this.connection, params);
      }
    };
    exports2._LanguagesImpl = _LanguagesImpl;
    var LanguagesImpl = (0, foldingRange_1.FoldingRangeFeature)((0, moniker_1.MonikerFeature)((0, diagnostic_1.DiagnosticFeature)((0, inlayHint_1.InlayHintFeature)((0, inlineValue_1.InlineValueFeature)((0, typeHierarchy_1.TypeHierarchyFeature)((0, linkedEditingRange_1.LinkedEditingRangeFeature)((0, semanticTokens_1.SemanticTokensFeature)((0, callHierarchy_1.CallHierarchyFeature)(_LanguagesImpl)))))))));
    var _NotebooksImpl = class {
      constructor() {
      }
      attach(connection) {
        this._connection = connection;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      attachWorkDoneProgress(params) {
        return (0, progress_1.attachWorkDone)(this.connection, params);
      }
      attachPartialResultProgress(_type, params) {
        return (0, progress_1.attachPartialResult)(this.connection, params);
      }
    };
    exports2._NotebooksImpl = _NotebooksImpl;
    var NotebooksImpl = (0, notebook_1.NotebookSyncFeature)(_NotebooksImpl);
    function combineConsoleFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineConsoleFeatures = combineConsoleFeatures;
    function combineTelemetryFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineTelemetryFeatures = combineTelemetryFeatures;
    function combineTracerFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineTracerFeatures = combineTracerFeatures;
    function combineClientFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineClientFeatures = combineClientFeatures;
    function combineWindowFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineWindowFeatures = combineWindowFeatures;
    function combineWorkspaceFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineWorkspaceFeatures = combineWorkspaceFeatures;
    function combineLanguagesFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineLanguagesFeatures = combineLanguagesFeatures;
    function combineNotebooksFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineNotebooksFeatures = combineNotebooksFeatures;
    function combineFeatures(one, two) {
      function combine(one2, two2, func) {
        if (one2 && two2) {
          return func(one2, two2);
        } else if (one2) {
          return one2;
        } else {
          return two2;
        }
      }
      let result = {
        __brand: "features",
        console: combine(one.console, two.console, combineConsoleFeatures),
        tracer: combine(one.tracer, two.tracer, combineTracerFeatures),
        telemetry: combine(one.telemetry, two.telemetry, combineTelemetryFeatures),
        client: combine(one.client, two.client, combineClientFeatures),
        window: combine(one.window, two.window, combineWindowFeatures),
        workspace: combine(one.workspace, two.workspace, combineWorkspaceFeatures),
        languages: combine(one.languages, two.languages, combineLanguagesFeatures),
        notebooks: combine(one.notebooks, two.notebooks, combineNotebooksFeatures)
      };
      return result;
    }
    exports2.combineFeatures = combineFeatures;
    function createConnection2(connectionFactory, watchDog, factories) {
      const logger = factories && factories.console ? new (factories.console(RemoteConsoleImpl))() : new RemoteConsoleImpl();
      const connection = connectionFactory(logger);
      logger.rawAttach(connection);
      const tracer = factories && factories.tracer ? new (factories.tracer(TracerImpl))() : new TracerImpl();
      const telemetry = factories && factories.telemetry ? new (factories.telemetry(TelemetryImpl))() : new TelemetryImpl();
      const client = factories && factories.client ? new (factories.client(RemoteClientImpl))() : new RemoteClientImpl();
      const remoteWindow = factories && factories.window ? new (factories.window(RemoteWindowImpl))() : new RemoteWindowImpl();
      const workspace = factories && factories.workspace ? new (factories.workspace(RemoteWorkspaceImpl))() : new RemoteWorkspaceImpl();
      const languages = factories && factories.languages ? new (factories.languages(LanguagesImpl))() : new LanguagesImpl();
      const notebooks = factories && factories.notebooks ? new (factories.notebooks(NotebooksImpl))() : new NotebooksImpl();
      const allRemotes = [logger, tracer, telemetry, client, remoteWindow, workspace, languages, notebooks];
      function asPromise(value) {
        if (value instanceof Promise) {
          return value;
        } else if (Is.thenable(value)) {
          return new Promise((resolve, reject) => {
            value.then((resolved) => resolve(resolved), (error) => reject(error));
          });
        } else {
          return Promise.resolve(value);
        }
      }
      let shutdownHandler = void 0;
      let initializeHandler = void 0;
      let exitHandler = void 0;
      let protocolConnection = {
        listen: () => connection.listen(),
        sendRequest: (type, ...params) => connection.sendRequest(Is.string(type) ? type : type.method, ...params),
        onRequest: (type, handler) => connection.onRequest(type, handler),
        sendNotification: (type, param) => {
          const method = Is.string(type) ? type : type.method;
          return connection.sendNotification(method, param);
        },
        onNotification: (type, handler) => connection.onNotification(type, handler),
        onProgress: connection.onProgress,
        sendProgress: connection.sendProgress,
        onInitialize: (handler) => {
          initializeHandler = handler;
          return {
            dispose: () => {
              initializeHandler = void 0;
            }
          };
        },
        onInitialized: (handler) => connection.onNotification(vscode_languageserver_protocol_1.InitializedNotification.type, handler),
        onShutdown: (handler) => {
          shutdownHandler = handler;
          return {
            dispose: () => {
              shutdownHandler = void 0;
            }
          };
        },
        onExit: (handler) => {
          exitHandler = handler;
          return {
            dispose: () => {
              exitHandler = void 0;
            }
          };
        },
        get console() {
          return logger;
        },
        get telemetry() {
          return telemetry;
        },
        get tracer() {
          return tracer;
        },
        get client() {
          return client;
        },
        get window() {
          return remoteWindow;
        },
        get workspace() {
          return workspace;
        },
        get languages() {
          return languages;
        },
        get notebooks() {
          return notebooks;
        },
        onDidChangeConfiguration: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidChangeConfigurationNotification.type, handler),
        onDidChangeWatchedFiles: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidChangeWatchedFilesNotification.type, handler),
        __textDocumentSync: void 0,
        onDidOpenTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidOpenTextDocumentNotification.type, handler),
        onDidChangeTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidChangeTextDocumentNotification.type, handler),
        onDidCloseTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidCloseTextDocumentNotification.type, handler),
        onWillSaveTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.WillSaveTextDocumentNotification.type, handler),
        onWillSaveTextDocumentWaitUntil: (handler) => connection.onRequest(vscode_languageserver_protocol_1.WillSaveTextDocumentWaitUntilRequest.type, handler),
        onDidSaveTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidSaveTextDocumentNotification.type, handler),
        sendDiagnostics: (params) => connection.sendNotification(vscode_languageserver_protocol_1.PublishDiagnosticsNotification.type, params),
        onHover: (handler) => connection.onRequest(vscode_languageserver_protocol_1.HoverRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), void 0);
        }),
        onCompletion: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CompletionRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onCompletionResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CompletionResolveRequest.type, handler),
        onSignatureHelp: (handler) => connection.onRequest(vscode_languageserver_protocol_1.SignatureHelpRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), void 0);
        }),
        onDeclaration: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DeclarationRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onDefinition: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DefinitionRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onTypeDefinition: (handler) => connection.onRequest(vscode_languageserver_protocol_1.TypeDefinitionRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onImplementation: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ImplementationRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onReferences: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ReferencesRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onDocumentHighlight: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentHighlightRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onDocumentSymbol: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentSymbolRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onWorkspaceSymbol: (handler) => connection.onRequest(vscode_languageserver_protocol_1.WorkspaceSymbolRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onWorkspaceSymbolResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.WorkspaceSymbolResolveRequest.type, handler),
        onCodeAction: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CodeActionRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onCodeActionResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CodeActionResolveRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onCodeLens: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CodeLensRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onCodeLensResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CodeLensResolveRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onDocumentFormatting: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentFormattingRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), void 0);
        }),
        onDocumentRangeFormatting: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentRangeFormattingRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), void 0);
        }),
        onDocumentOnTypeFormatting: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentOnTypeFormattingRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onRenameRequest: (handler) => connection.onRequest(vscode_languageserver_protocol_1.RenameRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), void 0);
        }),
        onPrepareRename: (handler) => connection.onRequest(vscode_languageserver_protocol_1.PrepareRenameRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onDocumentLinks: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentLinkRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onDocumentLinkResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentLinkResolveRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onDocumentColor: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentColorRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onColorPresentation: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ColorPresentationRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onFoldingRanges: (handler) => connection.onRequest(vscode_languageserver_protocol_1.FoldingRangeRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onSelectionRanges: (handler) => connection.onRequest(vscode_languageserver_protocol_1.SelectionRangeRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onExecuteCommand: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ExecuteCommandRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), void 0);
        }),
        dispose: () => connection.dispose()
      };
      for (let remote of allRemotes) {
        remote.attach(protocolConnection);
      }
      connection.onRequest(vscode_languageserver_protocol_1.InitializeRequest.type, (params) => {
        watchDog.initialize(params);
        if (Is.string(params.trace)) {
          tracer.trace = vscode_languageserver_protocol_1.Trace.fromString(params.trace);
        }
        for (let remote of allRemotes) {
          remote.initialize(params.capabilities);
        }
        if (initializeHandler) {
          let result = initializeHandler(params, new vscode_languageserver_protocol_1.CancellationTokenSource().token, (0, progress_1.attachWorkDone)(connection, params), void 0);
          return asPromise(result).then((value) => {
            if (value instanceof vscode_languageserver_protocol_1.ResponseError) {
              return value;
            }
            let result2 = value;
            if (!result2) {
              result2 = { capabilities: {} };
            }
            let capabilities = result2.capabilities;
            if (!capabilities) {
              capabilities = {};
              result2.capabilities = capabilities;
            }
            if (capabilities.textDocumentSync === void 0 || capabilities.textDocumentSync === null) {
              capabilities.textDocumentSync = Is.number(protocolConnection.__textDocumentSync) ? protocolConnection.__textDocumentSync : vscode_languageserver_protocol_1.TextDocumentSyncKind.None;
            } else if (!Is.number(capabilities.textDocumentSync) && !Is.number(capabilities.textDocumentSync.change)) {
              capabilities.textDocumentSync.change = Is.number(protocolConnection.__textDocumentSync) ? protocolConnection.__textDocumentSync : vscode_languageserver_protocol_1.TextDocumentSyncKind.None;
            }
            for (let remote of allRemotes) {
              remote.fillServerCapabilities(capabilities);
            }
            return result2;
          });
        } else {
          let result = { capabilities: { textDocumentSync: vscode_languageserver_protocol_1.TextDocumentSyncKind.None } };
          for (let remote of allRemotes) {
            remote.fillServerCapabilities(result.capabilities);
          }
          return result;
        }
      });
      connection.onRequest(vscode_languageserver_protocol_1.ShutdownRequest.type, () => {
        watchDog.shutdownReceived = true;
        if (shutdownHandler) {
          return shutdownHandler(new vscode_languageserver_protocol_1.CancellationTokenSource().token);
        } else {
          return void 0;
        }
      });
      connection.onNotification(vscode_languageserver_protocol_1.ExitNotification.type, () => {
        try {
          if (exitHandler) {
            exitHandler();
          }
        } finally {
          if (watchDog.shutdownReceived) {
            watchDog.exit(0);
          } else {
            watchDog.exit(1);
          }
        }
      });
      connection.onNotification(vscode_languageserver_protocol_1.SetTraceNotification.type, (params) => {
        tracer.trace = vscode_languageserver_protocol_1.Trace.fromString(params.value);
      });
      return protocolConnection;
    }
    exports2.createConnection = createConnection2;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/node/files.js
var require_files = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/node/files.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.resolveModulePath = exports2.FileSystem = exports2.resolveGlobalYarnPath = exports2.resolveGlobalNodePath = exports2.resolve = exports2.uriToFilePath = void 0;
    var url = require("url");
    var path = require("path");
    var fs = require("fs");
    var child_process_1 = require("child_process");
    function uriToFilePath(uri) {
      let parsed = url.parse(uri);
      if (parsed.protocol !== "file:" || !parsed.path) {
        return void 0;
      }
      let segments = parsed.path.split("/");
      for (var i = 0, len = segments.length; i < len; i++) {
        segments[i] = decodeURIComponent(segments[i]);
      }
      if (process.platform === "win32" && segments.length > 1) {
        let first = segments[0];
        let second = segments[1];
        if (first.length === 0 && second.length > 1 && second[1] === ":") {
          segments.shift();
        }
      }
      return path.normalize(segments.join("/"));
    }
    exports2.uriToFilePath = uriToFilePath;
    function isWindows() {
      return process.platform === "win32";
    }
    function resolve(moduleName, nodePath, cwd, tracer) {
      const nodePathKey = "NODE_PATH";
      const app = [
        "var p = process;",
        "p.on('message',function(m){",
        "if(m.c==='e'){",
        "p.exit(0);",
        "}",
        "else if(m.c==='rs'){",
        "try{",
        "var r=require.resolve(m.a);",
        "p.send({c:'r',s:true,r:r});",
        "}",
        "catch(err){",
        "p.send({c:'r',s:false});",
        "}",
        "}",
        "});"
      ].join("");
      return new Promise((resolve2, reject) => {
        let env = process.env;
        let newEnv = /* @__PURE__ */ Object.create(null);
        Object.keys(env).forEach((key) => newEnv[key] = env[key]);
        if (nodePath && fs.existsSync(nodePath)) {
          if (newEnv[nodePathKey]) {
            newEnv[nodePathKey] = nodePath + path.delimiter + newEnv[nodePathKey];
          } else {
            newEnv[nodePathKey] = nodePath;
          }
          if (tracer) {
            tracer(`NODE_PATH value is: ${newEnv[nodePathKey]}`);
          }
        }
        newEnv["ELECTRON_RUN_AS_NODE"] = "1";
        try {
          let cp = (0, child_process_1.fork)("", [], {
            cwd,
            env: newEnv,
            execArgv: ["-e", app]
          });
          if (cp.pid === void 0) {
            reject(new Error(`Starting process to resolve node module  ${moduleName} failed`));
            return;
          }
          cp.on("error", (error) => {
            reject(error);
          });
          cp.on("message", (message2) => {
            if (message2.c === "r") {
              cp.send({ c: "e" });
              if (message2.s) {
                resolve2(message2.r);
              } else {
                reject(new Error(`Failed to resolve module: ${moduleName}`));
              }
            }
          });
          let message = {
            c: "rs",
            a: moduleName
          };
          cp.send(message);
        } catch (error) {
          reject(error);
        }
      });
    }
    exports2.resolve = resolve;
    function resolveGlobalNodePath(tracer) {
      let npmCommand = "npm";
      const env = /* @__PURE__ */ Object.create(null);
      Object.keys(process.env).forEach((key) => env[key] = process.env[key]);
      env["NO_UPDATE_NOTIFIER"] = "true";
      const options = {
        encoding: "utf8",
        env
      };
      if (isWindows()) {
        npmCommand = "npm.cmd";
        options.shell = true;
      }
      let handler = () => {
      };
      try {
        process.on("SIGPIPE", handler);
        let stdout = (0, child_process_1.spawnSync)(npmCommand, ["config", "get", "prefix"], options).stdout;
        if (!stdout) {
          if (tracer) {
            tracer(`'npm config get prefix' didn't return a value.`);
          }
          return void 0;
        }
        let prefix = stdout.trim();
        if (tracer) {
          tracer(`'npm config get prefix' value is: ${prefix}`);
        }
        if (prefix.length > 0) {
          if (isWindows()) {
            return path.join(prefix, "node_modules");
          } else {
            return path.join(prefix, "lib", "node_modules");
          }
        }
        return void 0;
      } catch (err) {
        return void 0;
      } finally {
        process.removeListener("SIGPIPE", handler);
      }
    }
    exports2.resolveGlobalNodePath = resolveGlobalNodePath;
    function resolveGlobalYarnPath(tracer) {
      let yarnCommand = "yarn";
      let options = {
        encoding: "utf8"
      };
      if (isWindows()) {
        yarnCommand = "yarn.cmd";
        options.shell = true;
      }
      let handler = () => {
      };
      try {
        process.on("SIGPIPE", handler);
        let results = (0, child_process_1.spawnSync)(yarnCommand, ["global", "dir", "--json"], options);
        let stdout = results.stdout;
        if (!stdout) {
          if (tracer) {
            tracer(`'yarn global dir' didn't return a value.`);
            if (results.stderr) {
              tracer(results.stderr);
            }
          }
          return void 0;
        }
        let lines = stdout.trim().split(/\r?\n/);
        for (let line of lines) {
          try {
            let yarn = JSON.parse(line);
            if (yarn.type === "log") {
              return path.join(yarn.data, "node_modules");
            }
          } catch (e) {
          }
        }
        return void 0;
      } catch (err) {
        return void 0;
      } finally {
        process.removeListener("SIGPIPE", handler);
      }
    }
    exports2.resolveGlobalYarnPath = resolveGlobalYarnPath;
    var FileSystem;
    (function(FileSystem2) {
      let _isCaseSensitive = void 0;
      function isCaseSensitive() {
        if (_isCaseSensitive !== void 0) {
          return _isCaseSensitive;
        }
        if (process.platform === "win32") {
          _isCaseSensitive = false;
        } else {
          _isCaseSensitive = !fs.existsSync(__filename.toUpperCase()) || !fs.existsSync(__filename.toLowerCase());
        }
        return _isCaseSensitive;
      }
      FileSystem2.isCaseSensitive = isCaseSensitive;
      function isParent(parent, child) {
        if (isCaseSensitive()) {
          return path.normalize(child).indexOf(path.normalize(parent)) === 0;
        } else {
          return path.normalize(child).toLowerCase().indexOf(path.normalize(parent).toLowerCase()) === 0;
        }
      }
      FileSystem2.isParent = isParent;
    })(FileSystem || (exports2.FileSystem = FileSystem = {}));
    function resolveModulePath(workspaceRoot, moduleName, nodePath, tracer) {
      if (nodePath) {
        if (!path.isAbsolute(nodePath)) {
          nodePath = path.join(workspaceRoot, nodePath);
        }
        return resolve(moduleName, nodePath, nodePath, tracer).then((value) => {
          if (FileSystem.isParent(nodePath, value)) {
            return value;
          } else {
            return Promise.reject(new Error(`Failed to load ${moduleName} from node path location.`));
          }
        }).then(void 0, (_error) => {
          return resolve(moduleName, resolveGlobalNodePath(tracer), workspaceRoot, tracer);
        });
      } else {
        return resolve(moduleName, resolveGlobalNodePath(tracer), workspaceRoot, tracer);
      }
    }
    exports2.resolveModulePath = resolveModulePath;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/node.js
var require_node2 = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/node.js"(exports2, module2) {
    "use strict";
    module2.exports = require_main3();
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/inlineCompletion.proposed.js
var require_inlineCompletion_proposed = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/inlineCompletion.proposed.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InlineCompletionFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var InlineCompletionFeature = (Base) => {
      return class extends Base {
        get inlineCompletion() {
          return {
            on: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.InlineCompletionRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params));
              });
            }
          };
        }
      };
    };
    exports2.InlineCompletionFeature = InlineCompletionFeature;
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/api.js
var require_api3 = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/api.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProposedFeatures = exports2.NotebookDocuments = exports2.TextDocuments = exports2.SemanticTokensBuilder = void 0;
    var semanticTokens_1 = require_semanticTokens();
    Object.defineProperty(exports2, "SemanticTokensBuilder", { enumerable: true, get: function() {
      return semanticTokens_1.SemanticTokensBuilder;
    } });
    var ic = require_inlineCompletion_proposed();
    __exportStar(require_main3(), exports2);
    var textDocuments_1 = require_textDocuments();
    Object.defineProperty(exports2, "TextDocuments", { enumerable: true, get: function() {
      return textDocuments_1.TextDocuments;
    } });
    var notebook_1 = require_notebook();
    Object.defineProperty(exports2, "NotebookDocuments", { enumerable: true, get: function() {
      return notebook_1.NotebookDocuments;
    } });
    __exportStar(require_server(), exports2);
    var ProposedFeatures2;
    (function(ProposedFeatures3) {
      ProposedFeatures3.all = {
        __brand: "features",
        languages: ic.InlineCompletionFeature
      };
    })(ProposedFeatures2 || (exports2.ProposedFeatures = ProposedFeatures2 = {}));
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/node/main.js
var require_main4 = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/node/main.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createConnection = exports2.Files = void 0;
    var node_util_1 = require("util");
    var Is = require_is();
    var server_1 = require_server();
    var fm = require_files();
    var node_1 = require_node2();
    __exportStar(require_node2(), exports2);
    __exportStar(require_api3(), exports2);
    var Files;
    (function(Files2) {
      Files2.uriToFilePath = fm.uriToFilePath;
      Files2.resolveGlobalNodePath = fm.resolveGlobalNodePath;
      Files2.resolveGlobalYarnPath = fm.resolveGlobalYarnPath;
      Files2.resolve = fm.resolve;
      Files2.resolveModulePath = fm.resolveModulePath;
    })(Files || (exports2.Files = Files = {}));
    var _protocolConnection;
    function endProtocolConnection() {
      if (_protocolConnection === void 0) {
        return;
      }
      try {
        _protocolConnection.end();
      } catch (_err) {
      }
    }
    var _shutdownReceived = false;
    var exitTimer = void 0;
    function setupExitTimer() {
      const argName = "--clientProcessId";
      function runTimer(value) {
        try {
          let processId = parseInt(value);
          if (!isNaN(processId)) {
            exitTimer = setInterval(() => {
              try {
                process.kill(processId, 0);
              } catch (ex) {
                endProtocolConnection();
                process.exit(_shutdownReceived ? 0 : 1);
              }
            }, 3e3);
          }
        } catch (e) {
        }
      }
      for (let i = 2; i < process.argv.length; i++) {
        let arg = process.argv[i];
        if (arg === argName && i + 1 < process.argv.length) {
          runTimer(process.argv[i + 1]);
          return;
        } else {
          let args = arg.split("=");
          if (args[0] === argName) {
            runTimer(args[1]);
          }
        }
      }
    }
    setupExitTimer();
    var watchDog = {
      initialize: (params) => {
        const processId = params.processId;
        if (Is.number(processId) && exitTimer === void 0) {
          setInterval(() => {
            try {
              process.kill(processId, 0);
            } catch (ex) {
              process.exit(_shutdownReceived ? 0 : 1);
            }
          }, 3e3);
        }
      },
      get shutdownReceived() {
        return _shutdownReceived;
      },
      set shutdownReceived(value) {
        _shutdownReceived = value;
      },
      exit: (code) => {
        endProtocolConnection();
        process.exit(code);
      }
    };
    function createConnection2(arg1, arg2, arg3, arg4) {
      let factories;
      let input;
      let output;
      let options;
      if (arg1 !== void 0 && arg1.__brand === "features") {
        factories = arg1;
        arg1 = arg2;
        arg2 = arg3;
        arg3 = arg4;
      }
      if (node_1.ConnectionStrategy.is(arg1) || node_1.ConnectionOptions.is(arg1)) {
        options = arg1;
      } else {
        input = arg1;
        output = arg2;
        options = arg3;
      }
      return _createConnection(input, output, options, factories);
    }
    exports2.createConnection = createConnection2;
    function _createConnection(input, output, options, factories) {
      let stdio = false;
      if (!input && !output && process.argv.length > 2) {
        let port = void 0;
        let pipeName = void 0;
        let argv = process.argv.slice(2);
        for (let i = 0; i < argv.length; i++) {
          let arg = argv[i];
          if (arg === "--node-ipc") {
            input = new node_1.IPCMessageReader(process);
            output = new node_1.IPCMessageWriter(process);
            break;
          } else if (arg === "--stdio") {
            stdio = true;
            input = process.stdin;
            output = process.stdout;
            break;
          } else if (arg === "--socket") {
            port = parseInt(argv[i + 1]);
            break;
          } else if (arg === "--pipe") {
            pipeName = argv[i + 1];
            break;
          } else {
            var args = arg.split("=");
            if (args[0] === "--socket") {
              port = parseInt(args[1]);
              break;
            } else if (args[0] === "--pipe") {
              pipeName = args[1];
              break;
            }
          }
        }
        if (port) {
          let transport = (0, node_1.createServerSocketTransport)(port);
          input = transport[0];
          output = transport[1];
        } else if (pipeName) {
          let transport = (0, node_1.createServerPipeTransport)(pipeName);
          input = transport[0];
          output = transport[1];
        }
      }
      var commandLineMessage = "Use arguments of createConnection or set command line parameters: '--node-ipc', '--stdio' or '--socket={number}'";
      if (!input) {
        throw new Error("Connection input stream is not set. " + commandLineMessage);
      }
      if (!output) {
        throw new Error("Connection output stream is not set. " + commandLineMessage);
      }
      if (Is.func(input.read) && Is.func(input.on)) {
        let inputStream = input;
        inputStream.on("end", () => {
          endProtocolConnection();
          process.exit(_shutdownReceived ? 0 : 1);
        });
        inputStream.on("close", () => {
          endProtocolConnection();
          process.exit(_shutdownReceived ? 0 : 1);
        });
      }
      const connectionFactory = (logger) => {
        const result = (0, node_1.createProtocolConnection)(input, output, logger, options);
        if (stdio) {
          patchConsole(logger);
        }
        return result;
      };
      return (0, server_1.createConnection)(connectionFactory, watchDog, factories);
    }
    function patchConsole(logger) {
      function serialize(args) {
        return args.map((arg) => typeof arg === "string" ? arg : (0, node_util_1.inspect)(arg)).join(" ");
      }
      const counters = /* @__PURE__ */ new Map();
      console.assert = function assert(assertion, ...args) {
        if (assertion) {
          return;
        }
        if (args.length === 0) {
          logger.error("Assertion failed");
        } else {
          const [message, ...rest] = args;
          logger.error(`Assertion failed: ${message} ${serialize(rest)}`);
        }
      };
      console.count = function count(label = "default") {
        const message = String(label);
        let counter = counters.get(message) ?? 0;
        counter += 1;
        counters.set(message, counter);
        logger.log(`${message}: ${message}`);
      };
      console.countReset = function countReset(label) {
        if (label === void 0) {
          counters.clear();
        } else {
          counters.delete(String(label));
        }
      };
      console.debug = function debug(...args) {
        logger.log(serialize(args));
      };
      console.dir = function dir(arg, options) {
        logger.log((0, node_util_1.inspect)(arg, options));
      };
      console.log = function log(...args) {
        logger.log(serialize(args));
      };
      console.error = function error(...args) {
        logger.error(serialize(args));
      };
      console.trace = function trace(...args) {
        const stack = new Error().stack.replace(/(.+\n){2}/, "");
        let message = "Trace";
        if (args.length !== 0) {
          message += `: ${serialize(args)}`;
        }
        logger.log(`${message}
${stack}`);
      };
      console.warn = function warn(...args) {
        logger.warn(serialize(args));
      };
    }
  }
});

// ../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/node.js
var require_node3 = __commonJS({
  "../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/node.js"(exports2, module2) {
    "use strict";
    module2.exports = require_main4();
  }
});

// ../typed-mind/dist/longform-parser.js
var require_longform_parser = __commonJS({
  "../typed-mind/dist/longform-parser.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LongformParser = void 0;
    var isDTOFieldDefinition = (value) => {
      return typeof value === "object" && value !== null;
    };
    var LongformParser = class {
      lines = [];
      currentLine = 0;
      parseLongform(input, startLine) {
        this.lines = input.split("\n");
        this.currentLine = startLine;
        const firstLine = this.lines[startLine];
        if (!firstLine)
          return null;
        const match = firstLine.trim().match(/^(program|file|function|class|dto|component|asset|constants|parameter|dependency)\s+(\w+)\s*\{?$/);
        if (!match)
          return null;
        const [_, type, name] = match;
        const block = this.parseBlock(type, name, startLine);
        return this.convertToEntity(block);
      }
      parseBlock(type, name, startLine) {
        const properties = /* @__PURE__ */ new Map();
        const position = { line: startLine + 1, column: 1 };
        const rawLines = [this.lines[startLine]];
        this.currentLine = startLine + 1;
        while (this.currentLine < this.lines.length) {
          const line = this.lines[this.currentLine];
          rawLines.push(line);
          const trimmed = line.trim();
          if (trimmed === "}") {
            break;
          }
          if (trimmed && !trimmed.startsWith("#")) {
            this.parseProperty(trimmed, properties);
          }
          this.currentLine++;
        }
        return {
          type,
          name,
          properties,
          position,
          raw: rawLines.join("\n")
        };
      }
      parseProperty(line, properties) {
        if (line.includes("{") && !line.includes("}")) {
          const match = line.match(/^(\w+):\s*\{$/);
          if (match) {
            const propName = match[1];
            properties.set(propName, this.parseNestedObject());
            return;
          }
        }
        const arrayMatch = line.match(/^(\w+):\s*\[([^\]]*)\]$/);
        if (arrayMatch) {
          const [_, key, value] = arrayMatch;
          const items = value.split(",").map((s) => s.trim()).filter((s) => s);
          properties.set(key, items);
          return;
        }
        const stringMatch = line.match(/^(\w+):\s*"([^"]*)"$/);
        if (stringMatch) {
          const [_, key, value] = stringMatch;
          properties.set(key, value);
          return;
        }
        const boolMatch = line.match(/^(\w+):\s*(true|false)$/);
        if (boolMatch) {
          const [_, key, value] = boolMatch;
          properties.set(key, value === "true");
          return;
        }
        const identMatch = line.match(/^(\w+):\s*(\w+)$/);
        if (identMatch) {
          const [_, key, value] = identMatch;
          properties.set(key, value);
          return;
        }
      }
      parseNestedObject() {
        const obj = {};
        this.currentLine++;
        while (this.currentLine < this.lines.length) {
          const line = this.lines[this.currentLine];
          const trimmed = line.trim();
          if (trimmed === "}") {
            break;
          }
          if (trimmed && !trimmed.startsWith("#")) {
            const match = trimmed.match(/^(\w+):\s*\{$/);
            if (match) {
              obj[match[1]] = this.parseNestedObject();
            } else {
              const propMatch = trimmed.match(/^(\w+):\s*(.+)$/);
              if (propMatch) {
                const [_, key, value] = propMatch;
                const cleanValue = value.replace(/^"(.*)"$/, "$1");
                if (cleanValue === "true" || cleanValue === "false") {
                  obj[key] = cleanValue === "true";
                } else {
                  obj[key] = cleanValue;
                }
              }
            }
          }
          this.currentLine++;
        }
        return obj;
      }
      convertToEntity(block) {
        const { type, name, properties, position, raw } = block;
        const comment = properties.get("description");
        switch (type) {
          case "program":
            return {
              name,
              type: "Program",
              entry: properties.get("entry") || "",
              version: properties.get("version"),
              purpose: properties.get("purpose") || properties.get("description"),
              position,
              raw,
              comment
            };
          case "file":
            return {
              name,
              type: "File",
              path: properties.get("path") || "",
              imports: properties.get("imports") || [],
              exports: properties.get("exports") || [],
              purpose: properties.get("purpose") || properties.get("description"),
              position,
              raw,
              comment
            };
          case "function":
            return {
              name,
              type: "Function",
              signature: properties.get("signature") || "",
              description: properties.get("description"),
              calls: properties.get("calls") || [],
              input: properties.get("input"),
              output: properties.get("output"),
              affects: properties.get("affects") || [],
              consumes: properties.get("consumes") || [],
              position,
              raw,
              comment
            };
          case "class":
            return {
              name,
              type: "Class",
              extends: properties.get("extends"),
              implements: properties.get("implements") || [],
              methods: properties.get("methods") || [],
              imports: properties.get("imports") || [],
              purpose: properties.get("purpose") || properties.get("description"),
              position,
              raw,
              comment
            };
          case "dto":
            const fields = [];
            const fieldsObj = properties.get("fields") || {};
            for (const [fieldName, fieldDef] of Object.entries(fieldsObj)) {
              if (isDTOFieldDefinition(fieldDef)) {
                const field = {
                  name: fieldName,
                  type: fieldDef.type || "any",
                  optional: fieldDef.optional || false,
                  ...fieldDef.description && { description: fieldDef.description }
                };
                fields.push(field);
              } else {
                fields.push({
                  name: fieldName,
                  type: "any",
                  optional: false
                });
              }
            }
            return {
              name,
              type: "DTO",
              purpose: properties.get("purpose") || properties.get("description"),
              fields,
              position,
              raw,
              comment
            };
          case "component":
            return {
              name,
              type: "UIComponent",
              purpose: properties.get("description") || "",
              root: properties.get("root") || false,
              contains: properties.get("contains") || [],
              containedBy: properties.get("containedBy") || [],
              affectedBy: properties.get("affectedBy") || [],
              position,
              raw,
              comment
            };
          case "asset":
            return {
              name,
              type: "Asset",
              description: properties.get("description") || "",
              containsProgram: properties.get("containsProgram"),
              position,
              raw,
              comment
            };
          case "constants":
            return {
              name,
              type: "Constants",
              path: properties.get("path") || "",
              schema: properties.get("schema"),
              purpose: properties.get("purpose") || properties.get("description"),
              position,
              raw,
              comment
            };
          case "parameter":
            const paramType = properties.get("type") || "env";
            return {
              name,
              type: "RunParameter",
              paramType,
              description: properties.get("description") || "",
              defaultValue: properties.get("default"),
              required: properties.get("required") || false,
              consumedBy: [],
              position,
              raw,
              comment
            };
          case "dependency":
            return {
              name,
              type: "Dependency",
              purpose: properties.get("purpose") || properties.get("description") || "",
              version: properties.get("version"),
              importedBy: [],
              position,
              raw,
              comment
            };
          default:
            return null;
        }
      }
      getConsumedLines() {
        return this.currentLine;
      }
    };
    exports2.LongformParser = LongformParser;
  }
});

// ../typed-mind/dist/parser-patterns.js
var require_parser_patterns = __commonJS({
  "../typed-mind/dist/parser-patterns.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PATTERN_DESCRIPTIONS = exports2.testContinuationPattern = exports2.testEntityPattern = exports2.getGeneralPattern = exports2.getContinuationPattern = exports2.getEntityPattern = exports2.ENTITY_TYPE_NAMES = exports2.GENERAL_PATTERNS = exports2.CONTINUATION_PATTERNS = exports2.ENTITY_PATTERNS = void 0;
    exports2.ENTITY_PATTERNS = {
      // Program: AppName -> EntryFile v1.0.0 or AppName -> EntryFile "Main application" v1.0.0
      PROGRAM: /^(\w+)\s*->\s*(\w+)(?:\s+"([^"]+)")?(?:\s+v([\d.]+))?$/,
      // File: UserService @ src/services/user.ts:
      FILE: /^(\w+)\s*@\s*([^:]+):/,
      // Function: createUser :: (data: UserInput) => Promise<User>
      FUNCTION: /^(\w+)\s*::\s*(.+)$/,
      // Class: UserController <: BaseController, IController
      CLASS: /^(\w+)\s*<:\s*(.*)$/,
      // ClassFile: ClassName #: path/to/file.ts <: BaseClass
      CLASS_FILE: /^([A-Za-z][A-Za-z0-9_]*)\s*#:\s*([^\s<]+)(?:\s*<:\s*(.+))?$/,
      // Constants: AppConfig ! src/config.ts : ConfigSchema
      CONSTANTS: /^(\w+)\s*!\s*([^:]+)(?:\s*:\s*(\w+))?$/,
      // DTO: UserDTO % "User data transfer object"
      DTO_WITH_PURPOSE: /^(\w+)\s*%\s*"([^"]+)"$/,
      // DTO without purpose: UserDTO %
      DTO_SIMPLE: /^(\w+)\s*%$/,
      // Asset: Logo ~ "Company logo image"
      ASSET: /^(\w+)\s*~\s*"([^"]+)"$/,
      // UIComponent: LoginForm & "User login form" or RootApp &! "Root application"
      UI_COMPONENT: /^(\w+)\s*(&!?)\s*"([^"]+)"$/,
      // RunParameter: DATABASE_URL $env "PostgreSQL connection string" (required)
      RUN_PARAMETER: /^(\w+)\s*\$(\w+)\s*"([^"]+)"(?:\s*\((\w+)\))?$/,
      // Dependency: axios ^ "HTTP client library" v3.0.0
      // Supports scoped packages like @org/package
      DEPENDENCY: /^([@\w\-/]+)\s*\^\s*"([^"]+)"(?:\s*v?([\d.\-\w]+))?$/,
      // Long form entity declaration: EntityName:
      LONGFORM_ENTITY: /^(\w+)\s*:$/,
      // Long form type specification: type: EntityType
      LONGFORM_TYPE: /^\s*type:\s*(\w+)$/
    };
    exports2.CONTINUATION_PATTERNS = {
      // Imports: <- [Database, UserModel]
      IMPORTS: /^<-\s*\[([^\]]+)\]/,
      // Exports: -> [createUser, getUser]
      EXPORTS: /^->\s*\[([^\]]+)\]/,
      // Function calls: ~> [validateInput, Database.insert]
      CALLS: /^~>\s*\[([^\]]+)\]/,
      // Function Input: <- UserCreateDTO
      INPUT: /^<-\s*(\w+)$/,
      // Function Output: -> UserDTO
      OUTPUT: /^->\s*(\w+)$/,
      // Class methods: => [handleCreate, handleGet]
      METHODS: /^=>\s*\[([^\]]+)\]/,
      // Function affects UI components: ~ [ComponentA, ComponentB]
      AFFECTS: /^~\s*\[([^\]]+)\]/,
      // UIComponent contains: > [ChildComponent1, ChildComponent2]
      CONTAINS: /^>\s*\[([^\]]+)\]/,
      // UIComponent containedBy: < [ParentComponent]
      CONTAINED_BY: /^<\s*\[([^\]]+)\]/,
      // Asset contains program: >> ProgramName
      CONTAINS_PROGRAM: /^>>\s*(\w+)$/,
      // DTO Fields: - fieldName: type "description" (optional) or - fieldName?: type "description"
      DTO_FIELD: /^-\s*(\w+)(\?)?\s*:\s*([^"]+?)(?:\s*"([^"]+)")?(?:\s*\(([^)]+)\))?$/,
      // Comment: # This is a comment about the entity
      COMMENT: /^#\s*(.+)$/,
      // Description/Purpose: "Creates a new user in the database"
      DESCRIPTION: /^"([^"]+)"$/,
      // RunParameter default value: = "default-value"
      DEFAULT_VALUE: /^=\s*"([^"]+)"$/,
      // Function consumes RunParameters: $< [DATABASE_URL, API_KEY]
      CONSUMES: /^\$<\s*\[([^\]]+)\]$/
    };
    exports2.GENERAL_PATTERNS = {
      // Entity declaration check - entities can start with any letter
      ENTITY_DECLARATION: /^[@\w\-/]+\s*(->|@|<:|#:|!|::|%|~|&|\$|\^|\s*:)/,
      // Longform declaration check
      LONGFORM_DECLARATION: /^(program|file|function|class|dto|component|asset|constants|parameter|import|dependency)\s+/,
      // Continuation line check - lines starting with whitespace and specific operators
      CONTINUATION: /^\s+(->|<-|~>|=>|>>|>|<|~|"|#|-|=|\$<)/,
      // Import statement check - both @import and import
      IMPORT_STATEMENT: /^(?:@import|import)\s+"([^"]+)"(?:\s+as\s+(\w+))?$/,
      // Inline comment extraction - must not match #: operator
      INLINE_COMMENT: /^(.+?)\s+#\s+(.+)$/
    };
    exports2.ENTITY_TYPE_NAMES = [
      "Program",
      "File",
      "Function",
      "Class",
      "ClassFile",
      "Constants",
      "DTO",
      "Asset",
      "UIComponent",
      "RunParameter",
      "Dependency"
    ];
    var getEntityPattern = (key) => {
      return exports2.ENTITY_PATTERNS[key];
    };
    exports2.getEntityPattern = getEntityPattern;
    var getContinuationPattern = (key) => {
      return exports2.CONTINUATION_PATTERNS[key];
    };
    exports2.getContinuationPattern = getContinuationPattern;
    var getGeneralPattern = (key) => {
      return exports2.GENERAL_PATTERNS[key];
    };
    exports2.getGeneralPattern = getGeneralPattern;
    var testEntityPattern = (key, input) => {
      return exports2.ENTITY_PATTERNS[key].test(input);
    };
    exports2.testEntityPattern = testEntityPattern;
    var testContinuationPattern = (key, input) => {
      return exports2.CONTINUATION_PATTERNS[key].test(input);
    };
    exports2.testContinuationPattern = testContinuationPattern;
    exports2.PATTERN_DESCRIPTIONS = {
      PROGRAM: {
        pattern: "Name -> EntryPoint [Purpose] [Version]",
        example: 'TodoApp -> AppEntry "Main application" v1.0.0',
        description: "Defines an application entry point"
      },
      FILE: {
        pattern: "Name @ path:",
        example: "UserService @ src/services/user.ts:",
        description: "Defines a source code file"
      },
      FUNCTION: {
        pattern: "Name :: Signature",
        example: "createUser :: (data: UserDTO) => Promise<User>",
        description: "Defines a function with its type signature"
      },
      CLASS: {
        pattern: "Name <: BaseClass[, Interface1, Interface2]",
        example: "UserController <: BaseController, IController",
        description: "Defines a class with inheritance"
      },
      CLASS_FILE: {
        pattern: "Name #: path [<: BaseClass[, Interface1, Interface2]]",
        example: "UserController #: src/controllers/user.ts <: BaseController",
        description: "Defines a class-file fusion entity (both class and file)"
      },
      CONSTANTS: {
        pattern: "Name ! path [: Schema]",
        example: "Config ! src/config.ts : ConfigSchema",
        description: "Defines a constants/configuration file"
      },
      DTO: {
        pattern: "Name % [Purpose]",
        example: 'UserDTO % "User data transfer object"',
        description: "Defines a Data Transfer Object"
      },
      ASSET: {
        pattern: "Name ~ Description",
        example: 'Logo ~ "Company logo SVG"',
        description: "Defines a static asset"
      },
      UI_COMPONENT: {
        pattern: "Name & Description | Name &! Description",
        example: 'App &! "Root application component"',
        description: "Defines a UI component (&! for root)"
      },
      RUN_PARAMETER: {
        pattern: "Name $type Description [(required)]",
        example: 'DATABASE_URL $env "PostgreSQL connection" (required)',
        description: "Defines a runtime parameter"
      },
      DEPENDENCY: {
        pattern: "Name ^ Purpose [Version]",
        example: 'axios ^ "HTTP client library" v3.0.0',
        description: "Defines an external dependency"
      }
    };
  }
});

// ../typed-mind/dist/grammar-validator.js
var require_grammar_validator = __commonJS({
  "../typed-mind/dist/grammar-validator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.GrammarValidator = void 0;
    var parser_patterns_1 = require_parser_patterns();
    var GrammarValidator = class {
      errors = [];
      validateEntity(entity) {
        this.errors = [];
        this.validateRequiredField(entity, "name", "string");
        this.validateRequiredField(entity, "type", "string");
        this.validateRequiredField(entity, "position", "object");
        this.validateRequiredField(entity, "raw", "string");
        if (!parser_patterns_1.ENTITY_TYPE_NAMES.includes(entity.type)) {
          this.addError(entity, "type", "valid entity type", entity.type, `Invalid entity type: ${entity.type}. Must be one of: ${parser_patterns_1.ENTITY_TYPE_NAMES.join(", ")}`);
        }
        switch (entity.type) {
          case "Program":
            this.validateProgramEntity(entity);
            break;
          case "File":
            this.validateFileEntity(entity);
            break;
          case "Function":
            this.validateFunctionEntity(entity);
            break;
          case "Class":
            this.validateClassEntity(entity);
            break;
          case "Constants":
            this.validateConstantsEntity(entity);
            break;
          case "DTO":
            this.validateDTOEntity(entity);
            break;
          case "Asset":
            this.validateAssetEntity(entity);
            break;
          case "UIComponent":
            this.validateUIComponentEntity(entity);
            break;
          case "RunParameter":
            this.validateRunParameterEntity(entity);
            break;
          case "Dependency":
            this.validateDependencyEntity(entity);
            break;
        }
        return {
          valid: this.errors.length === 0,
          errors: this.errors
        };
      }
      validateProgramEntity(entity) {
        this.validateRequiredField(entity, "entry", "string");
        this.validateOptionalField(entity, "version", "string", /^[\d.]+$/);
        this.validateOptionalField(entity, "purpose", "string");
      }
      validateFileEntity(entity) {
        this.validateRequiredField(entity, "path", "string");
        this.validateOptionalField(entity, "imports", "array");
        this.validateOptionalField(entity, "exports", "array");
        this.validateOptionalField(entity, "purpose", "string");
      }
      validateFunctionEntity(entity) {
        this.validateRequiredField(entity, "signature", "string");
        this.validateOptionalField(entity, "calls", "array");
        this.validateOptionalField(entity, "description", "string");
        this.validateOptionalField(entity, "input", "string");
        this.validateOptionalField(entity, "output", "string");
        this.validateOptionalField(entity, "affects", "array");
        this.validateOptionalField(entity, "consumes", "array");
      }
      validateClassEntity(entity) {
        this.validateOptionalField(entity, "implements", "array");
        this.validateOptionalField(entity, "methods", "array");
        this.validateOptionalField(entity, "extends", "string");
        this.validateOptionalField(entity, "path", "string");
        this.validateOptionalField(entity, "imports", "array");
        this.validateOptionalField(entity, "purpose", "string");
      }
      validateConstantsEntity(entity) {
        this.validateRequiredField(entity, "path", "string");
        this.validateOptionalField(entity, "schema", "string");
        this.validateOptionalField(entity, "purpose", "string");
      }
      validateDTOEntity(entity) {
        this.validateRequiredField(entity, "fields", "array");
        this.validateOptionalField(entity, "purpose", "string");
        if ("fields" in entity && Array.isArray(entity.fields)) {
          entity.fields.forEach((field, index) => {
            if (!field.name || typeof field.name !== "string") {
              this.addError(entity, `fields[${index}].name`, "string", typeof field.name, `DTO field at index ${index} must have a name`);
            }
            if (!field.type || typeof field.type !== "string") {
              this.addError(entity, `fields[${index}].type`, "string", typeof field.type, `DTO field '${field.name}' must have a type`);
            }
            if (field.description !== void 0 && typeof field.description !== "string") {
              this.addError(entity, `fields[${index}].description`, "string", typeof field.description, `DTO field '${field.name}' description must be a string`);
            }
            if (field.optional !== void 0 && typeof field.optional !== "boolean") {
              this.addError(entity, `fields[${index}].optional`, "boolean", typeof field.optional, `DTO field '${field.name}' optional flag must be a boolean`);
            }
          });
        }
      }
      validateAssetEntity(entity) {
        this.validateRequiredField(entity, "description", "string");
        this.validateOptionalField(entity, "containsProgram", "string");
      }
      validateUIComponentEntity(entity) {
        this.validateRequiredField(entity, "purpose", "string");
        this.validateOptionalField(entity, "contains", "array");
        this.validateOptionalField(entity, "containedBy", "array");
        this.validateOptionalField(entity, "affectedBy", "array");
        this.validateOptionalField(entity, "root", "boolean");
      }
      validateRunParameterEntity(entity) {
        this.validateRequiredField(entity, "paramType", "string", /^(env|iam|runtime|config)$/);
        this.validateRequiredField(entity, "description", "string");
        this.validateOptionalField(entity, "consumedBy", "array");
        this.validateOptionalField(entity, "required", "boolean");
        this.validateOptionalField(entity, "defaultValue", "string");
      }
      validateDependencyEntity(entity) {
        this.validateRequiredField(entity, "purpose", "string");
        this.validateOptionalField(entity, "importedBy", "array");
        this.validateOptionalField(entity, "version", "string");
      }
      validateRequiredField(entity, field, expectedType, pattern) {
        if (!(field in entity)) {
          this.addError(entity, field, expectedType, "undefined", `Required field '${field}' is missing`);
          return;
        }
        const value = this.getEntityFieldValue(entity, field);
        const actualType = Array.isArray(value) ? "array" : typeof value;
        if (actualType !== expectedType) {
          this.addError(entity, field, expectedType, actualType, `Field '${field}' must be of type ${expectedType}`);
          return;
        }
        if (pattern && typeof value === "string" && !pattern.test(value)) {
          this.addError(entity, field, `string matching ${pattern}`, value, `Field '${field}' does not match required pattern ${pattern}`);
        }
      }
      validateOptionalField(entity, field, expectedType, pattern) {
        if (!(field in entity)) {
          return;
        }
        const value = this.getEntityFieldValue(entity, field);
        if (value === void 0 || value === null) {
          return;
        }
        const actualType = Array.isArray(value) ? "array" : typeof value;
        if (actualType !== expectedType) {
          this.addError(entity, field, expectedType, actualType, `Optional field '${field}' must be of type ${expectedType} when present`);
          return;
        }
        if (pattern && typeof value === "string" && !pattern.test(value)) {
          this.addError(entity, field, `string matching ${pattern}`, value, `Optional field '${field}' does not match required pattern ${pattern}`);
        }
      }
      addError(entity, field, expected, actual, message) {
        this.errors.push({
          entity: entity.name,
          type: entity.type,
          field,
          expected,
          actual,
          message
        });
      }
      // Batch validation for multiple entities
      validateEntities(entities) {
        const allErrors = [];
        for (const [_, entity] of entities) {
          const result = this.validateEntity(entity);
          allErrors.push(...result.errors);
        }
        return {
          valid: allErrors.length === 0,
          errors: allErrors
        };
      }
      // Format errors for display
      formatErrors(errors) {
        if (errors.length === 0) {
          return "No grammar validation errors found.";
        }
        const errorMessages = errors.map((error) => `  - ${error.entity} (${error.type}): ${error.message}`);
        return `Grammar validation errors found:
${errorMessages.join("\n")}`;
      }
      /**
       * Type-safe field access helper to replace (entity as any)[field]
       */
      getEntityFieldValue(entity, field) {
        const entityRecord = entity;
        return entityRecord[field];
      }
    };
    exports2.GrammarValidator = GrammarValidator;
  }
});

// ../typed-mind/dist/parser.js
var require_parser = __commonJS({
  "../typed-mind/dist/parser.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DSLParser = void 0;
    var longform_parser_1 = require_longform_parser();
    var parser_patterns_1 = require_parser_patterns();
    var grammar_validator_1 = require_grammar_validator();
    var DSLParser2 = class {
      lines = [];
      entities = /* @__PURE__ */ new Map();
      imports = [];
      namingConflicts = [];
      longformParser = new longform_parser_1.LongformParser();
      grammarValidator = new grammar_validator_1.GrammarValidator();
      validateGrammar = false;
      parseErrors = [];
      errorRecoveryMode = true;
      // Enable error recovery by default
      parse(input, options) {
        this.validateGrammar = options?.validateGrammar ?? false;
        this.errorRecoveryMode = options?.errorRecovery ?? true;
        this.lines = input.split("\n");
        this.entities.clear();
        this.imports = [];
        this.namingConflicts = [];
        this.parseErrors = [];
        let currentEntity = null;
        const entityStack = [];
        for (let lineNum = 0; lineNum < this.lines.length; lineNum++) {
          const line = this.lines[lineNum];
          if (!line)
            continue;
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#"))
            continue;
          if (trimmed.startsWith("@import") || trimmed.startsWith("import ")) {
            this.parseImport(trimmed, lineNum + 1);
            continue;
          }
          if (this.isLongformDeclaration(trimmed)) {
            const longformEntity = this.longformParser.parseLongform(input, lineNum);
            if (longformEntity) {
              this.entities.set(longformEntity.name, longformEntity);
              lineNum = this.longformParser.getConsumedLines() - 1;
              currentEntity = null;
            }
            continue;
          }
          if (currentEntity && this.isContinuation(line)) {
            this.parseContinuation(currentEntity, trimmed, lineNum + 1);
            continue;
          }
          if (this.isEntityDeclaration(trimmed)) {
            try {
              currentEntity = this.parseEntity(trimmed, lineNum + 1);
            } catch (error) {
              this.handleParseError(trimmed, lineNum + 1, error);
              currentEntity = null;
              continue;
            }
            if (currentEntity) {
              const existingEntity = this.entities.get(currentEntity.name);
              if (existingEntity && existingEntity.type !== currentEntity.type) {
                this.namingConflicts.push({
                  name: currentEntity.name,
                  existingEntity,
                  newEntity: currentEntity
                });
              }
              this.entities.set(currentEntity.name, currentEntity);
              entityStack.push(currentEntity);
            }
          } else {
            if (this.looksLikeEntity(trimmed)) {
              this.handleParseError(trimmed, lineNum + 1, new Error("Malformed entity declaration"));
            }
            currentEntity = null;
          }
        }
        this.distributeFunctionDependencies();
        this.establishBidirectionalRelationships();
        const result = {
          entities: this.entities,
          imports: this.imports
        };
        if (this.parseErrors.length > 0) {
          result.parseErrors = this.parseErrors;
        }
        if (this.namingConflicts.length > 0) {
          result.namingConflicts = this.namingConflicts;
        }
        if (this.validateGrammar) {
          const validationResult = this.grammarValidator.validateEntities(this.entities);
          if (!validationResult.valid) {
            result.grammarErrors = validationResult.errors.map((e) => ({
              entity: e.entity,
              type: e.type,
              field: e.field,
              message: e.message
            }));
          }
        }
        return result;
      }
      isEntityDeclaration(line) {
        return parser_patterns_1.GENERAL_PATTERNS.ENTITY_DECLARATION.test(line);
      }
      isLongformDeclaration(line) {
        return parser_patterns_1.GENERAL_PATTERNS.LONGFORM_DECLARATION.test(line);
      }
      isContinuation(line) {
        return parser_patterns_1.GENERAL_PATTERNS.CONTINUATION.test(line);
      }
      parseEntity(line, lineNum) {
        const position = { line: lineNum, column: 1 };
        const { cleanLine, comment } = this.extractInlineComment(line);
        const programMatch = cleanLine.match(parser_patterns_1.ENTITY_PATTERNS.PROGRAM);
        if (programMatch) {
          return {
            name: programMatch[1],
            type: "Program",
            entry: programMatch[2],
            purpose: programMatch[3],
            version: programMatch[4],
            position,
            raw: line,
            comment
          };
        }
        const fileMatch = cleanLine.match(parser_patterns_1.ENTITY_PATTERNS.FILE);
        if (fileMatch) {
          let isClass = false;
          for (let i = lineNum; i < Math.min(lineNum + 5, this.lines.length); i++) {
            const nextLine = this.lines[i]?.trim();
            if (nextLine?.startsWith("=>")) {
              isClass = true;
              break;
            }
            if (nextLine && this.isEntityDeclaration(nextLine)) {
              break;
            }
          }
          if (isClass) {
            return {
              name: fileMatch[1],
              type: "Class",
              path: fileMatch[2]?.trim(),
              implements: [],
              methods: [],
              position,
              raw: line,
              comment
            };
          } else {
            return {
              name: fileMatch[1],
              type: "File",
              path: fileMatch[2]?.trim(),
              imports: [],
              exports: [],
              position,
              raw: line,
              comment
            };
          }
        }
        const functionMatch = cleanLine.match(parser_patterns_1.ENTITY_PATTERNS.FUNCTION);
        if (functionMatch) {
          return {
            name: functionMatch[1],
            type: "Function",
            signature: functionMatch[2]?.trim(),
            calls: [],
            position,
            raw: line,
            comment
          };
        }
        const classFileMatch = cleanLine.match(parser_patterns_1.ENTITY_PATTERNS.CLASS_FILE);
        if (classFileMatch) {
          const inheritance = classFileMatch[3]?.trim();
          let baseClass;
          let interfaces = [];
          if (inheritance) {
            const parts = inheritance.split(",").map((s) => s.trim());
            if (parts.length > 0 && parts[0]) {
              baseClass = parts[0];
              interfaces = parts.slice(1);
            }
          }
          return {
            name: classFileMatch[1],
            type: "ClassFile",
            path: classFileMatch[2]?.trim(),
            extends: baseClass,
            implements: interfaces,
            methods: [],
            imports: [],
            exports: [classFileMatch[1]],
            // Class-file fusion automatically exports the class
            position,
            raw: line,
            comment
          };
        }
        const classMatch = cleanLine.match(parser_patterns_1.ENTITY_PATTERNS.CLASS);
        if (classMatch) {
          const inheritance = classMatch[2]?.trim();
          let baseClass;
          let interfaces = [];
          if (inheritance) {
            const parts = inheritance.split(",").map((s) => s.trim());
            if (parts.length > 0 && parts[0]) {
              baseClass = parts[0];
              interfaces = parts.slice(1);
            }
          }
          return {
            name: classMatch[1],
            type: "Class",
            extends: baseClass,
            implements: interfaces,
            methods: [],
            imports: [],
            position,
            raw: line,
            comment
          };
        }
        const constantsMatch = cleanLine.match(parser_patterns_1.ENTITY_PATTERNS.CONSTANTS);
        if (constantsMatch) {
          return {
            name: constantsMatch[1],
            type: "Constants",
            path: constantsMatch[2]?.trim(),
            schema: constantsMatch[3],
            position,
            raw: line,
            comment
          };
        }
        const dtoMatch = cleanLine.match(parser_patterns_1.ENTITY_PATTERNS.DTO_WITH_PURPOSE);
        if (dtoMatch) {
          return {
            name: dtoMatch[1],
            type: "DTO",
            purpose: dtoMatch[2],
            fields: [],
            position,
            raw: line,
            comment
          };
        }
        const dtoSimpleMatch = cleanLine.match(parser_patterns_1.ENTITY_PATTERNS.DTO_SIMPLE);
        if (dtoSimpleMatch) {
          return {
            name: dtoSimpleMatch[1],
            type: "DTO",
            fields: [],
            position,
            raw: line,
            comment
          };
        }
        const assetMatch = cleanLine.match(parser_patterns_1.ENTITY_PATTERNS.ASSET);
        if (assetMatch) {
          return {
            name: assetMatch[1],
            type: "Asset",
            description: assetMatch[2],
            position,
            raw: line,
            comment
          };
        }
        const uiComponentMatch = cleanLine.match(parser_patterns_1.ENTITY_PATTERNS.UI_COMPONENT);
        if (uiComponentMatch) {
          const isRoot = uiComponentMatch[2] === "&!";
          return {
            name: uiComponentMatch[1],
            type: "UIComponent",
            purpose: uiComponentMatch[3],
            root: isRoot || void 0,
            contains: [],
            containedBy: [],
            affectedBy: [],
            position,
            raw: line,
            comment
          };
        }
        const runParamMatch = cleanLine.match(parser_patterns_1.ENTITY_PATTERNS.RUN_PARAMETER);
        if (runParamMatch) {
          const paramType = runParamMatch[2];
          const isRequired = runParamMatch[4] === "required";
          return {
            name: runParamMatch[1],
            type: "RunParameter",
            paramType,
            description: runParamMatch[3],
            required: isRequired || void 0,
            consumedBy: [],
            position,
            raw: line,
            comment
          };
        }
        const depMatch = cleanLine.match(parser_patterns_1.ENTITY_PATTERNS.DEPENDENCY);
        if (depMatch) {
          return {
            name: depMatch[1],
            type: "Dependency",
            purpose: depMatch[2],
            version: depMatch[3],
            importedBy: [],
            position,
            raw: line,
            comment
          };
        }
        const longFormMatch = cleanLine.match(parser_patterns_1.ENTITY_PATTERNS.LONGFORM_ENTITY);
        if (longFormMatch) {
          const nextLineNum = lineNum;
          if (nextLineNum < this.lines.length) {
            const nextLine = this.lines[nextLineNum]?.trim();
            const typeMatch = nextLine?.match(parser_patterns_1.ENTITY_PATTERNS.LONGFORM_TYPE);
            if (typeMatch) {
              const entityType = typeMatch[1];
              const name = longFormMatch[1];
              const entity = this.createLongFormEntity(name, entityType, position, line);
              if (entity && comment) {
                entity.comment = comment;
              }
              return entity;
            }
          }
        }
        if (!this.errorRecoveryMode) {
          throw new Error(`Unable to parse entity declaration: ${line}`);
        }
        return null;
      }
      parseContinuation(entity, line, _lineNum) {
        const { cleanLine } = this.extractInlineComment(line);
        const trimmedLine = cleanLine.trim();
        const importMatch = trimmedLine.match(/^<-\s*\[([^\]]+)\]/);
        if (importMatch) {
          if (entity.type === "Function") {
            const funcEntity = entity;
            const items = this.parseList(importMatch[1]);
            if (!funcEntity.calls)
              funcEntity.calls = [];
            if (!funcEntity.affects)
              funcEntity.affects = [];
            if (!funcEntity.consumes)
              funcEntity.consumes = [];
            funcEntity._dependencies = items;
            return;
          } else if ("imports" in entity && Array.isArray(entity.imports)) {
            entity.imports = this.parseList(importMatch[1]);
            return;
          }
        }
        const exportMatch = trimmedLine.match(/^->\s*\[([^\]]+)\]/);
        if (exportMatch) {
          if ("exports" in entity) {
            entity.exports = this.parseList(exportMatch[1]);
            return;
          } else if (entity.type === "Dependency") {
            const depEntity = entity;
            depEntity.exports = this.parseList(exportMatch[1]);
            return;
          }
        }
        const callsMatch = trimmedLine.match(/^~>\s*\[([^\]]+)\]/);
        if (callsMatch && "calls" in entity) {
          entity.calls = this.parseList(callsMatch[1]);
          return;
        }
        const inputMatch = trimmedLine.match(/^<-\s*(\w+)$/);
        if (inputMatch && entity.type === "Function") {
          const funcEntity = entity;
          funcEntity.input = inputMatch[1];
          return;
        }
        const outputMatch = trimmedLine.match(/^->\s*(\w+)$/);
        if (outputMatch && entity.type === "Function") {
          const funcEntity = entity;
          funcEntity.output = outputMatch[1];
          return;
        }
        const methodsMatch = trimmedLine.match(/^=>\s*\[([^\]]+)\]/);
        if (methodsMatch && "methods" in entity) {
          entity.methods = this.parseList(methodsMatch[1]);
          return;
        }
        const affectsMatch = trimmedLine.match(/^~\s*\[([^\]]+)\]/);
        if (affectsMatch && entity.type === "Function") {
          const funcEntity = entity;
          funcEntity.affects = this.parseList(affectsMatch[1]);
          for (const componentName of funcEntity.affects) {
            const component = this.entities.get(componentName);
            if (component && component.type === "UIComponent") {
              const uiComponent = component;
              if (!uiComponent.affectedBy) {
                uiComponent.affectedBy = [];
              }
              if (!uiComponent.affectedBy.includes(funcEntity.name)) {
                uiComponent.affectedBy.push(funcEntity.name);
              }
            }
          }
          return;
        }
        const containsMatch = trimmedLine.match(/^>\s*\[([^\]]+)\]/);
        if (containsMatch && entity.type === "UIComponent") {
          const uiEntity = entity;
          uiEntity.contains = this.parseList(containsMatch[1]);
          return;
        }
        const containedByMatch = trimmedLine.match(/^<\s*\[([^\]]+)\]/);
        if (containedByMatch && entity.type === "UIComponent") {
          const uiEntity = entity;
          uiEntity.containedBy = this.parseList(containedByMatch[1]);
          return;
        }
        const containsProgramMatch = trimmedLine.match(/^>>\s*(\w+)$/);
        if (containsProgramMatch && entity.type === "Asset") {
          const assetEntity = entity;
          assetEntity.containsProgram = containsProgramMatch[1];
          return;
        }
        const dtoFieldMatch = trimmedLine.match(parser_patterns_1.CONTINUATION_PATTERNS.DTO_FIELD);
        if (dtoFieldMatch && entity.type === "DTO") {
          const dtoEntity = entity;
          const field = {
            name: dtoFieldMatch[1],
            type: dtoFieldMatch[3]?.trim(),
            description: dtoFieldMatch[4],
            optional: dtoFieldMatch[2] === "?" || dtoFieldMatch[5]?.includes("optional") || false
          };
          dtoEntity.fields.push(field);
          return;
        }
        const commentMatch = trimmedLine.match(parser_patterns_1.CONTINUATION_PATTERNS.COMMENT);
        if (commentMatch) {
          entity.comment = commentMatch[1];
          return;
        }
        const descMatch = trimmedLine.match(parser_patterns_1.CONTINUATION_PATTERNS.DESCRIPTION);
        if (descMatch) {
          const description = descMatch[1];
          if (entity.type === "Function") {
            const funcEntity = entity;
            funcEntity.description = description;
          } else if (entity.type === "Program") {
            const progEntity = entity;
            progEntity.purpose = description;
          } else if (entity.type === "File") {
            const fileEntity = entity;
            fileEntity.purpose = description;
          } else if (entity.type === "Class") {
            const classEntity = entity;
            classEntity.purpose = description;
          } else if (entity.type === "Constants") {
            const constEntity = entity;
            constEntity.purpose = description;
          }
          return;
        }
        const defaultValueMatch = trimmedLine.match(parser_patterns_1.CONTINUATION_PATTERNS.DEFAULT_VALUE);
        if (defaultValueMatch && entity.type === "RunParameter") {
          const paramEntity = entity;
          paramEntity.defaultValue = defaultValueMatch[1];
          return;
        }
        const consumesMatch = trimmedLine.match(parser_patterns_1.CONTINUATION_PATTERNS.CONSUMES);
        if (consumesMatch && entity.type === "Function") {
          const funcEntity = entity;
          funcEntity.consumes = this.parseList(consumesMatch[1]);
          for (const paramName of funcEntity.consumes) {
            const param = this.entities.get(paramName);
            if (param && param.type === "RunParameter") {
              const runParam = param;
              if (!runParam.consumedBy) {
                runParam.consumedBy = [];
              }
              if (!runParam.consumedBy.includes(funcEntity.name)) {
                runParam.consumedBy.push(funcEntity.name);
              }
            }
          }
          return;
        }
      }
      parseList(listStr) {
        return listStr.split(",").map((item) => item.trim());
      }
      extractInlineComment(line) {
        const commentMatch = line.match(parser_patterns_1.GENERAL_PATTERNS.INLINE_COMMENT);
        if (commentMatch) {
          return {
            cleanLine: commentMatch[1]?.trim(),
            comment: commentMatch[2]?.trim()
          };
        }
        return { cleanLine: line };
      }
      parseImport(line, lineNum) {
        const importMatch = line.match(parser_patterns_1.GENERAL_PATTERNS.IMPORT_STATEMENT);
        if (importMatch) {
          const importStatement = {
            path: importMatch[1],
            alias: importMatch[2],
            position: { line: lineNum, column: 1 }
          };
          this.imports.push(importStatement);
        }
      }
      createLongFormEntity(name, type, position, raw) {
        const baseEntity = { name, position, raw };
        switch (type) {
          case "Program":
            return { ...baseEntity, type: "Program", entry: "" };
          case "File":
            return { ...baseEntity, type: "File", path: "", imports: [], exports: [] };
          case "Function":
            return { ...baseEntity, type: "Function", signature: "", calls: [] };
          case "Class":
            return { ...baseEntity, type: "Class", implements: [], methods: [] };
          case "ClassFile":
            return { ...baseEntity, type: "ClassFile", path: "", implements: [], methods: [], imports: [], exports: [name] };
          case "Constants":
            return { ...baseEntity, type: "Constants", path: "" };
          default:
            return null;
        }
      }
      establishBidirectionalRelationships() {
        for (const entity of this.entities.values()) {
          if (entity.type === "Function") {
            const funcEntity = entity;
            if (funcEntity.affects) {
              for (const componentName of funcEntity.affects) {
                const component = this.entities.get(componentName);
                if (component && component.type === "UIComponent") {
                  const uiComponent = component;
                  if (!uiComponent.affectedBy) {
                    uiComponent.affectedBy = [];
                  }
                  if (!uiComponent.affectedBy.includes(funcEntity.name)) {
                    uiComponent.affectedBy.push(funcEntity.name);
                  }
                }
              }
            }
            if (funcEntity.consumes) {
              for (const resourceName of funcEntity.consumes) {
                const resource = this.entities.get(resourceName);
                if (resource) {
                  if (resource.type === "RunParameter") {
                    const runParam = resource;
                    if (!runParam.consumedBy) {
                      runParam.consumedBy = [];
                    }
                    if (!runParam.consumedBy.includes(funcEntity.name)) {
                      runParam.consumedBy.push(funcEntity.name);
                    }
                  }
                }
              }
            }
          }
          if (entity.type === "UIComponent") {
            const uiComponent = entity;
            if (uiComponent.contains) {
              for (const childName of uiComponent.contains) {
                const child = this.entities.get(childName);
                if (child && child.type === "UIComponent") {
                  const childComponent = child;
                  if (!childComponent.containedBy) {
                    childComponent.containedBy = [];
                  }
                  if (!childComponent.containedBy.includes(uiComponent.name)) {
                    childComponent.containedBy.push(uiComponent.name);
                  }
                }
              }
            }
          }
        }
      }
      distributeFunctionDependencies() {
        for (const entity of this.entities.values()) {
          if (entity.type === "Function") {
            const funcEntity = entity;
            if (funcEntity._dependencies) {
              const unresolvedDeps = [];
              const dtos = [];
              for (const dep of funcEntity._dependencies) {
                const depEntity = this.entities.get(dep);
                if (depEntity) {
                  switch (depEntity.type) {
                    case "DTO":
                      dtos.push(dep);
                      break;
                    case "Function":
                    case "Class":
                    case "ClassFile":
                      if (!funcEntity.calls.includes(dep)) {
                        funcEntity.calls.push(dep);
                      }
                      break;
                    case "UIComponent":
                      if (!funcEntity.affects)
                        funcEntity.affects = [];
                      if (!funcEntity.affects.includes(dep)) {
                        funcEntity.affects.push(dep);
                      }
                      const uiComponent = depEntity;
                      if (!uiComponent.affectedBy) {
                        uiComponent.affectedBy = [];
                      }
                      if (!uiComponent.affectedBy.includes(funcEntity.name)) {
                        uiComponent.affectedBy.push(funcEntity.name);
                      }
                      break;
                    case "Dependency":
                      unresolvedDeps.push(dep);
                      break;
                    case "Asset":
                    case "RunParameter":
                    case "Constants":
                      if (!funcEntity.consumes)
                        funcEntity.consumes = [];
                      if (!funcEntity.consumes.includes(dep)) {
                        funcEntity.consumes.push(dep);
                      }
                      if (depEntity.type === "RunParameter") {
                        const runParam = depEntity;
                        if (!runParam.consumedBy) {
                          runParam.consumedBy = [];
                        }
                        if (!runParam.consumedBy.includes(funcEntity.name)) {
                          runParam.consumedBy.push(funcEntity.name);
                        }
                      }
                      break;
                    // Files and Programs are typically not in dependency lists
                    default:
                      unresolvedDeps.push(dep);
                  }
                } else {
                  unresolvedDeps.push(dep);
                }
              }
              if (dtos.length > 0) {
                if (!funcEntity.input && dtos.length >= 1) {
                  funcEntity.input = dtos[0];
                }
                if (dtos.length > 1) {
                }
              }
              if (unresolvedDeps.length > 0) {
                funcEntity._dependencies = unresolvedDeps;
              } else {
                delete funcEntity._dependencies;
              }
            }
          }
        }
      }
      // Error recovery helper methods
      handleParseError(line, lineNum, error) {
        if (!this.errorRecoveryMode) {
          throw error;
        }
        const parseError = {
          line: lineNum,
          column: 1,
          message: error.message || "Parse error",
          context: line,
          recoverable: true
        };
        this.parseErrors.push(parseError);
      }
      looksLikeEntity(line) {
        const entityIndicators = [
          "->",
          // Program
          "@",
          // File
          "::",
          // Function
          "<:",
          // Class
          "#:",
          // ClassFile
          "!",
          // Constants
          "%",
          // DTO
          "~",
          // Asset (but check for proper format)
          "&",
          // UIComponent
          "$",
          // RunParameter
          "^"
          // Dependency
        ];
        for (const indicator of entityIndicators) {
          if (line.includes(indicator)) {
            if (indicator === "~") {
              return /^\w+\s*~\s*[^"]/.test(line) || /^\w+\s*~\s*$/.test(line);
            }
            return true;
          }
        }
        if (/^[A-Za-z]\w*\s+[->@:!%~&$^]/.test(line)) {
          return true;
        }
        if (/^[A-Za-z]\w*[->@:!%~&$^]{2,}/.test(line)) {
          return true;
        }
        return false;
      }
    };
    exports2.DSLParser = DSLParser2;
  }
});

// ../typed-mind/dist/validator.js
var require_validator = __commonJS({
  "../typed-mind/dist/validator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DSLValidator = void 0;
    var DSLValidator2 = class _DSLValidator {
      errors = [];
      options;
      // Define which entity types can be referenced by which reference types
      static VALID_REFERENCES = {
        imports: {
          from: ["File", "Class", "ClassFile"],
          to: ["Function", "Class", "ClassFile", "Constants", "DTO", "Asset", "UIComponent", "RunParameter", "File", "Dependency"]
        },
        exports: {
          from: ["File", "ClassFile", "Program", "Dependency"],
          to: ["Function", "Class", "ClassFile", "Constants", "DTO", "Asset", "UIComponent", "File"]
        },
        calls: {
          from: ["Function"],
          to: ["Function", "Class"]
          // Class is allowed because of method calls
        },
        extends: {
          from: ["Class", "ClassFile"],
          to: ["Class", "ClassFile"]
        },
        implements: {
          from: ["Class", "ClassFile"],
          to: ["Class", "ClassFile"]
          // In TypedMind, interfaces are represented as Classes
        },
        contains: {
          from: ["UIComponent"],
          to: ["UIComponent"]
        },
        containedBy: {
          from: ["UIComponent"],
          to: ["UIComponent"]
        },
        affects: {
          from: ["Function"],
          to: ["UIComponent"]
        },
        affectedBy: {
          from: ["UIComponent"],
          to: ["Function"]
        },
        consumes: {
          from: ["Function"],
          to: ["RunParameter", "Asset", "Dependency", "Constants"]
        },
        consumedBy: {
          from: ["RunParameter"],
          to: ["Function"]
        },
        input: {
          from: ["Function"],
          to: ["DTO"]
        },
        output: {
          from: ["Function"],
          to: ["DTO"]
        },
        entry: {
          from: ["Program"],
          to: ["File"]
        },
        containsProgram: {
          from: ["Asset"],
          to: ["Program"]
        },
        schema: {
          from: ["Constants"],
          to: ["Class", "DTO"]
          // Schema can reference a type definition
        }
      };
      constructor(options = {}) {
        this.options = options;
      }
      validate(entities, optionsOrParseResult) {
        this.errors = [];
        let parseResult;
        if (optionsOrParseResult && "entities" in optionsOrParseResult) {
          parseResult = optionsOrParseResult;
        } else if (optionsOrParseResult) {
          this.options = { ...this.options, ...optionsOrParseResult };
        }
        this.populateReferencedBy(entities);
        if (parseResult?.namingConflicts) {
          this.processNamingConflicts(parseResult.namingConflicts);
        }
        this.checkNamingConflicts(entities);
        if (!this.options.skipOrphanCheck) {
          this.checkOrphans(entities);
        }
        this.checkImports(entities);
        this.checkCircularDeps(entities);
        this.checkCircularUIComponentContainment(entities);
        this.checkInheritanceChains(entities);
        this.checkEntryPoint(entities);
        this.checkUniquePaths(entities);
        this.checkClassAndFunctionExports(entities);
        this.checkDuplicateExports(entities);
        this.checkMethodCalls(entities);
        this.checkUndefinedExports(entities);
        this.checkFunctionDTOs(entities);
        this.checkFunctionDependencies(entities);
        this.checkDTOFieldTypes(entities);
        this.checkUIComponentRelationships(entities);
        this.checkFunctionUIComponentAffects(entities);
        this.checkAssetProgramRelationships(entities);
        this.checkUIComponentContainment(entities);
        this.checkFunctionConsumption(entities);
        return {
          valid: this.errors.length === 0,
          errors: this.errors
        };
      }
      processNamingConflicts(namingConflicts) {
        for (const conflict of namingConflicts) {
          const { name, existingEntity, newEntity } = conflict;
          if (existingEntity.type === "Class" && newEntity.type === "File" || existingEntity.type === "File" && newEntity.type === "Class") {
            const fileEntity = existingEntity.type === "File" ? existingEntity : newEntity;
            const classEntity = existingEntity.type === "Class" ? existingEntity : newEntity;
            this.addError({
              position: classEntity.position,
              message: `Entity name '${name}' is used by both a File and a Class. Consider using the #: operator for class-file fusion.`,
              severity: "error",
              suggestion: `Replace with: ${name} #: ${fileEntity.path} <: BaseClass`
            });
            this.addError({
              position: fileEntity.position,
              message: `Entity name '${name}' is used by both a File and a Class. Consider using the #: operator for class-file fusion.`,
              severity: "error",
              suggestion: `Replace with: ${name} #: ${fileEntity.path} <: BaseClass`
            });
          } else {
            this.addError({
              position: newEntity.position,
              message: `Duplicate entity name '${name}' found in multiple ${existingEntity.type}, ${newEntity.type} entities`,
              severity: "error",
              suggestion: "Entity names must be unique across the entire codebase"
            });
          }
        }
      }
      checkNamingConflicts(entities) {
        const nameGroups = /* @__PURE__ */ new Map();
        for (const entity of entities.values()) {
          const name = entity.name;
          if (!nameGroups.has(name)) {
            nameGroups.set(name, []);
          }
          nameGroups.get(name).push(entity);
        }
        for (const [name, entitiesWithSameName] of nameGroups) {
          if (entitiesWithSameName.length > 1) {
            const hasClass = entitiesWithSameName.some((e) => e.type === "Class");
            const hasFile = entitiesWithSameName.some((e) => e.type === "File");
            if (hasClass && hasFile) {
              const classEntity = entitiesWithSameName.find((e) => e.type === "Class");
              const fileEntity = entitiesWithSameName.find((e) => e.type === "File");
              if (classEntity && fileEntity) {
                this.addError({
                  position: classEntity.position,
                  message: `Entity name '${name}' is used by both a File and a Class. Consider using the #: operator for class-file fusion.`,
                  severity: "error",
                  suggestion: `Replace with: ${name} #: ${fileEntity.path} <: BaseClass`
                });
                this.addError({
                  position: fileEntity.position,
                  message: `Entity name '${name}' is used by both a File and a Class. Consider using the #: operator for class-file fusion.`,
                  severity: "error",
                  suggestion: `Replace with: ${name} #: ${fileEntity.path} <: BaseClass`
                });
              }
            } else {
              const [first] = entitiesWithSameName;
              if (first) {
                this.addError({
                  position: first.position,
                  message: `Duplicate entity name '${name}' found in multiple ${entitiesWithSameName.map((e) => e.type).join(", ")} entities`,
                  severity: "error",
                  suggestion: "Entity names must be unique across the entire codebase"
                });
              }
            }
          }
        }
      }
      checkOrphans(entities) {
        const referenced = /* @__PURE__ */ new Set();
        for (const entity of entities.values()) {
          if ("imports" in entity) {
            for (const imp of entity.imports) {
              if (!imp.includes("*")) {
                referenced.add(imp);
              }
            }
          }
          if ("calls" in entity) {
            for (const call of entity.calls) {
              referenced.add(call);
            }
          }
          if ("methods" in entity) {
            for (const method of entity.methods) {
              referenced.add(method);
            }
          }
          if (entity.type === "Program") {
            referenced.add(entity.entry);
            const program = entity;
            if (program.exports) {
              for (const exp of program.exports) {
                referenced.add(exp);
              }
            }
          }
          if ("consumes" in entity) {
            for (const param of entity.consumes) {
              referenced.add(param);
            }
          }
          if (entity.type === "Function") {
            const funcEntity = entity;
            if (funcEntity.input) {
              referenced.add(funcEntity.input);
            }
            if (funcEntity.output) {
              referenced.add(funcEntity.output);
            }
          }
          if (entity.type === "UIComponent") {
            const uiEntity = entity;
            if (uiEntity.contains) {
              for (const child of uiEntity.contains) {
                referenced.add(child);
              }
            }
          }
          if (entity.type === "Asset") {
            const assetEntity = entity;
            if (assetEntity.containsProgram) {
              referenced.add(assetEntity.containsProgram);
            }
          }
        }
        for (const [name, entity] of entities) {
          if (!referenced.has(name) && entity.type !== "Program" && entity.type !== "Dependency") {
            if (entity.type === "File") {
              if (!this.isFileConsumed(entity, entities)) {
                this.addError({
                  position: entity.position,
                  message: `Orphaned file '${name}' - none of its exports are imported`,
                  severity: "error",
                  suggestion: "Remove this file or import its exports somewhere"
                });
              }
            } else {
              this.addError({
                position: entity.position,
                message: `Orphaned entity '${name}'`,
                severity: "error",
                suggestion: "Remove or reference this entity"
              });
            }
          }
        }
      }
      isFileConsumed(fileEntity, allEntities) {
        for (const exportName of fileEntity.exports || []) {
          if (this.isEntityImported(exportName, allEntities)) {
            return true;
          }
        }
        return false;
      }
      isEntityImported(entityName, allEntities) {
        for (const entity of allEntities.values()) {
          if ("imports" in entity) {
            for (const imp of entity.imports) {
              if (imp === entityName) {
                return true;
              }
              if (imp.includes("*")) {
                const base = imp.split("*")[0];
                if (entityName.startsWith(base)) {
                  return true;
                }
              }
            }
          }
        }
        return false;
      }
      checkImports(entities) {
        for (const entity of entities.values()) {
          if (!("imports" in entity))
            continue;
          for (const imp of entity.imports) {
            if (imp.includes("*")) {
              const base = imp.split("*")[0];
              const hasMatch = Array.from(entities.keys()).some((name) => name.startsWith(base));
              if (!hasMatch) {
                this.addError({
                  position: entity.position,
                  message: `No entities match import pattern '${imp}'`,
                  severity: "error"
                });
              }
            } else if (!entities.has(imp)) {
              const isDependency = Array.from(entities.values()).some((e) => e.type === "Dependency" && e.name === imp);
              if (!isDependency) {
                const suggestion = this.findSimilar(imp, entities);
                const error = {
                  position: entity.position,
                  message: `Import '${imp}' not found`,
                  severity: "error"
                };
                if (suggestion) {
                  error.suggestion = `Did you mean '${suggestion}'?`;
                }
                this.addError(error);
              }
            }
          }
        }
      }
      checkCircularDeps(entities) {
        const importGraph = /* @__PURE__ */ new Map();
        for (const [name, entity] of entities) {
          if ((entity.type === "File" || entity.type === "ClassFile") && "imports" in entity) {
            const fileImports = entity.imports.filter((imp) => {
              const imported = entities.get(imp);
              return imported && (imported.type === "File" || imported.type === "ClassFile");
            });
            importGraph.set(name, fileImports);
          }
        }
        const visited = /* @__PURE__ */ new Set();
        const recursionStack = /* @__PURE__ */ new Set();
        const reportedCycles = /* @__PURE__ */ new Set();
        const hasCycle = (node, path = []) => {
          if (!importGraph.has(node)) {
            return null;
          }
          visited.add(node);
          recursionStack.add(node);
          path.push(node);
          const deps = importGraph.get(node) || [];
          for (const dep of deps) {
            if (!visited.has(dep)) {
              const cycle = hasCycle(dep, [...path]);
              if (cycle)
                return cycle;
            } else if (recursionStack.has(dep)) {
              return [...path, dep];
            }
          }
          recursionStack.delete(node);
          return null;
        };
        for (const name of importGraph.keys()) {
          if (!visited.has(name)) {
            const cycle = hasCycle(name);
            if (cycle) {
              const cycleKey = [...cycle].sort().join("->");
              if (!reportedCycles.has(cycleKey)) {
                reportedCycles.add(cycleKey);
                const entity = entities.get(name);
                if (entity) {
                  this.addError({
                    position: entity.position,
                    message: `Circular import detected: ${cycle.join(" -> ")}`,
                    severity: "error",
                    suggestion: "Break the circular dependency by refactoring shared code into a separate module"
                  });
                }
              }
            }
          }
        }
      }
      checkCircularUIComponentContainment(entities) {
        const containmentGraph = /* @__PURE__ */ new Map();
        for (const [name, entity] of entities) {
          if (entity.type === "UIComponent" && "contains" in entity) {
            const uiEntity = entity;
            if (uiEntity.contains) {
              containmentGraph.set(name, uiEntity.contains);
            }
          }
        }
        const visited = /* @__PURE__ */ new Set();
        const recursionStack = /* @__PURE__ */ new Set();
        const reportedCycles = /* @__PURE__ */ new Set();
        const hasCycle = (node, path = []) => {
          if (!containmentGraph.has(node)) {
            return null;
          }
          visited.add(node);
          recursionStack.add(node);
          path.push(node);
          const containedComponents = containmentGraph.get(node) || [];
          for (const contained of containedComponents) {
            if (contained === node) {
              const entity = entities.get(node);
              if (entity) {
                this.addError({
                  position: entity.position,
                  message: `UIComponent '${node}' contains itself`,
                  severity: "error",
                  suggestion: "Remove self-reference from the contains list"
                });
              }
              continue;
            }
            if (!visited.has(contained)) {
              const cycle = hasCycle(contained, [...path]);
              if (cycle)
                return cycle;
            } else if (recursionStack.has(contained)) {
              return [...path, contained];
            }
          }
          recursionStack.delete(node);
          return null;
        };
        for (const name of containmentGraph.keys()) {
          if (!visited.has(name)) {
            const cycle = hasCycle(name);
            if (cycle) {
              const cycleKey = [...cycle].sort().join("->");
              if (!reportedCycles.has(cycleKey)) {
                reportedCycles.add(cycleKey);
                const entity = entities.get(name);
                if (entity) {
                  this.addError({
                    position: entity.position,
                    message: `UIComponent '${name}' has circular containment: ${cycle.join(" -> ")}`,
                    severity: "error",
                    suggestion: "Break the circular containment by removing one of the contains relationships"
                  });
                }
              }
            }
          }
        }
      }
      checkInheritanceChains(entities) {
        const inheritanceGraph = /* @__PURE__ */ new Map();
        for (const [name, entity] of entities) {
          if ((entity.type === "Class" || entity.type === "ClassFile") && "extends" in entity) {
            const classEntity = entity;
            if (classEntity.extends) {
              inheritanceGraph.set(name, classEntity.extends);
              if (classEntity.extends === name) {
                this.addError({
                  position: entity.position,
                  message: `Class '${name}' inherits from itself`,
                  severity: "error",
                  suggestion: "Remove the self-inheritance or choose a different base class"
                });
                continue;
              }
              if (!entities.has(classEntity.extends)) {
                this.addError({
                  position: entity.position,
                  message: `Class '${name}' extends '${classEntity.extends}' which does not exist`,
                  severity: "error",
                  suggestion: `Define '${classEntity.extends}' as a Class or ClassFile entity`
                });
              }
            }
            if (classEntity.implements) {
              for (const intf of classEntity.implements) {
                if (!entities.has(intf)) {
                  this.addError({
                    position: entity.position,
                    message: `Class '${name}' implements '${intf}' which does not exist`,
                    severity: "error",
                    suggestion: `Define '${intf}' as a Class or ClassFile entity`
                  });
                }
              }
            }
          }
        }
        const visited = /* @__PURE__ */ new Set();
        const recursionStack = /* @__PURE__ */ new Set();
        const reportedCycles = /* @__PURE__ */ new Set();
        const hasCycle = (node, path = []) => {
          if (!inheritanceGraph.has(node)) {
            return null;
          }
          visited.add(node);
          recursionStack.add(node);
          path.push(node);
          const parent = inheritanceGraph.get(node);
          if (parent) {
            if (!visited.has(parent)) {
              const cycle = hasCycle(parent, [...path]);
              if (cycle)
                return cycle;
            } else if (recursionStack.has(parent)) {
              return [...path, parent];
            }
          }
          recursionStack.delete(node);
          return null;
        };
        for (const name of inheritanceGraph.keys()) {
          if (!visited.has(name)) {
            const cycle = hasCycle(name);
            if (cycle) {
              const cycleKey = [...cycle].sort().join("->");
              if (!reportedCycles.has(cycleKey)) {
                reportedCycles.add(cycleKey);
                const entity = entities.get(name);
                if (entity) {
                  this.addError({
                    position: entity.position,
                    message: `Class '${name}' has circular inheritance: ${cycle.join(" -> ")}`,
                    severity: "error",
                    suggestion: "Break the circular inheritance by removing one of the extends relationships"
                  });
                }
              }
            }
          }
        }
      }
      checkEntryPoint(entities) {
        const programs = Array.from(entities.values()).filter((e) => e.type === "Program");
        if (programs.length === 0) {
          this.addError({
            position: { line: 1, column: 1 },
            message: "No program entry point defined",
            severity: "error",
            suggestion: "Add a Program entity: AppName -> EntryFile"
          });
        }
        for (const program of programs) {
          const entryFile = entities.get(program.entry);
          if (!entryFile) {
            this.addError({
              position: program.position,
              message: `Program '${program.name}' references undefined entry point '${program.entry}'`,
              severity: "error",
              suggestion: `Define a File entity: ${program.entry} @ path/to/file.ext:`
            });
          } else if (entryFile.type !== "File") {
            this.addError({
              position: program.position,
              message: `Program '${program.name}' entry point '${program.entry}' must be a File entity, but found ${entryFile.type}`,
              severity: "error",
              suggestion: `Change '${program.entry}' to a File entity: ${program.entry} @ path/to/file.ext:`
            });
          }
        }
      }
      checkUniquePaths(entities) {
        const entityNamesByPath = /* @__PURE__ */ new Map();
        for (const entity of entities.values()) {
          if ("path" in entity && entity.path) {
            const path = entity.path;
            if (path.includes("#")) {
              continue;
            }
            if (!entityNamesByPath.has(path)) {
              entityNamesByPath.set(path, []);
            }
            const entitiesAtPath = entityNamesByPath.get(path);
            if (entity.type === "File" || entity.type === "ClassFile") {
              const existingFileType = entitiesAtPath.find((name) => {
                const existing = entities.get(name);
                return existing && (existing.type === "File" || existing.type === "ClassFile");
              });
              if (existingFileType) {
                const existing = entities.get(existingFileType);
                this.addError({
                  position: entity.position,
                  message: `Path '${entity.path}' already used by ${existing.type} '${existing.name}'`,
                  severity: "error",
                  suggestion: `Each File/ClassFile must have a unique path. Consider using ClassFile fusion with #:`
                });
              }
            }
            entitiesAtPath.push(entity.name);
          }
        }
      }
      findSimilar(target, entities) {
        let bestMatch = "";
        let bestScore = 0.6;
        for (const name of entities.keys()) {
          const score = this.similarity(target.toLowerCase(), name.toLowerCase());
          if (score > bestScore) {
            bestScore = score;
            bestMatch = name;
          }
        }
        return bestMatch || null;
      }
      similarity(a, b) {
        if (a === b)
          return 1;
        if (a.length === 0 || b.length === 0)
          return 0;
        const matrix = [];
        for (let i = 0; i <= b.length; i++) {
          matrix[i] = [];
          for (let j = 0; j <= a.length; j++) {
            if (i === 0) {
              matrix[i][j] = j;
            } else if (j === 0) {
              matrix[i][j] = i;
            } else {
              matrix[i][j] = 0;
            }
          }
        }
        for (let i = 1; i <= b.length; i++) {
          for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
              matrix[i][j] = matrix[i - 1][j - 1];
            } else {
              matrix[i][j] = Math.min(
                matrix[i - 1][j - 1] + 1,
                // substitution
                matrix[i][j - 1] + 1,
                // insertion
                matrix[i - 1][j] + 1
              );
            }
          }
        }
        const distance = matrix[b.length][a.length];
        return 1 - distance / Math.max(a.length, b.length);
      }
      isDTOExportedByDependency(dtoName, entities) {
        for (const entity of entities.values()) {
          if (entity.type === "Dependency") {
            const depEntity = entity;
            if (depEntity.exports && depEntity.exports.includes(dtoName)) {
              return true;
            }
          }
        }
        return false;
      }
      addError(error) {
        this.errors.push(error);
      }
      checkClassAndFunctionExports(entities) {
        const exportedEntities = /* @__PURE__ */ new Set();
        const classMethods = /* @__PURE__ */ new Set();
        for (const entity of entities.values()) {
          if ("exports" in entity && entity.exports) {
            for (const exp of entity.exports) {
              exportedEntities.add(exp);
            }
          }
          if ("methods" in entity && entity.methods) {
            for (const method of entity.methods) {
              classMethods.add(method);
            }
          }
        }
        for (const [name, entity] of entities) {
          if (entity.type === "Class" && !exportedEntities.has(name)) {
            this.addError({
              position: entity.position,
              message: `Class '${name}' is not exported by any file`,
              severity: "error",
              suggestion: `Add '${name}' to the exports of a file entity or convert to ClassFile with #: operator`
            });
          } else if (entity.type === "Function" && !exportedEntities.has(name) && !classMethods.has(name)) {
            this.addError({
              position: entity.position,
              message: `Function '${name}' is not exported by any file and is not a class method`,
              severity: "error",
              suggestion: `Either add '${name}' to the exports of a file entity or define it as a method of a class`
            });
          }
        }
      }
      checkDuplicateExports(entities) {
        const exportMap = /* @__PURE__ */ new Map();
        for (const entity of entities.values()) {
          if ("exports" in entity && entity.exports) {
            for (const exp of entity.exports) {
              if (!exportMap.has(exp)) {
                exportMap.set(exp, []);
              }
              exportMap.get(exp).push(entity);
            }
          }
        }
        for (const [exportName, exporters] of exportMap) {
          if (exporters.length > 1) {
            const isEntity = entities.has(exportName);
            const [first] = exporters;
            if (isEntity && first) {
              this.addError({
                position: first.position,
                message: `Entity '${exportName}' is exported by multiple files: ${exporters.map((e) => e.name).join(", ")}`,
                severity: "error",
                suggestion: "Each entity should be exported by exactly one file. Remove the duplicate exports."
              });
            }
          }
        }
      }
      checkMethodCalls(entities) {
        for (const entity of entities.values()) {
          if ("calls" in entity && entity.calls) {
            for (const call of entity.calls) {
              if (call.includes(".")) {
                const [objectName, methodName] = call.split(".", 2);
                const targetEntity = entities.get(objectName);
                if (!targetEntity) {
                  this.addError({
                    position: entity.position,
                    message: `Call to '${call}' references unknown entity '${objectName}'`,
                    severity: "error"
                  });
                } else if (targetEntity.type !== "Class" && targetEntity.type !== "ClassFile") {
                  this.addError({
                    position: entity.position,
                    message: `Cannot call method '${methodName}' on ${targetEntity.type} '${objectName}'. Only Classes and ClassFiles can have methods`,
                    severity: "error",
                    suggestion: `Either define '${objectName}' as a Class/ClassFile or use a different call syntax`
                  });
                } else {
                  const classEntity = targetEntity;
                  if (!classEntity.methods.includes(methodName)) {
                    this.addError({
                      position: entity.position,
                      message: `Method '${methodName}' not found on ${targetEntity.type.toLowerCase()} '${objectName}'`,
                      severity: "error",
                      suggestion: `Available methods: ${classEntity.methods.join(", ")}`
                    });
                  }
                }
              }
            }
          }
        }
      }
      checkUndefinedExports(entities) {
        for (const entity of entities.values()) {
          if (entity.type !== "Dependency" && "exports" in entity && entity.exports) {
            for (const exportName of entity.exports) {
              if (!entities.has(exportName)) {
                this.addError({
                  position: entity.position,
                  message: `Export '${exportName}' is not defined anywhere in the codebase`,
                  severity: "error",
                  suggestion: `Define '${exportName}' as a Function, Class, Constants, Asset, or UIComponent entity`
                });
              }
            }
          }
        }
      }
      checkFunctionDTOs(entities) {
        for (const entity of entities.values()) {
          if (entity.type === "Function") {
            const funcEntity = entity;
            if (funcEntity.input) {
              const inputEntity = entities.get(funcEntity.input);
              if (!inputEntity) {
                const isExportedByDependency = this.isDTOExportedByDependency(funcEntity.input, entities);
                if (!isExportedByDependency) {
                  this.addError({
                    position: entity.position,
                    message: `Function input DTO '${funcEntity.input}' not found`,
                    severity: "error",
                    suggestion: `Define '${funcEntity.input}' as a DTO entity or import it from a dependency`
                  });
                }
              } else if (inputEntity.type !== "DTO") {
                this.addError({
                  position: entity.position,
                  message: `Function input '${funcEntity.input}' is not a DTO (it's a ${inputEntity.type})`,
                  severity: "error",
                  suggestion: `Change '${funcEntity.input}' to a DTO or use a different input type`
                });
              }
            }
            if (funcEntity.output) {
              const outputEntity = entities.get(funcEntity.output);
              if (!outputEntity) {
                const isExportedByDependency = this.isDTOExportedByDependency(funcEntity.output, entities);
                if (!isExportedByDependency) {
                  this.addError({
                    position: entity.position,
                    message: `Function output DTO '${funcEntity.output}' not found`,
                    severity: "error",
                    suggestion: `Define '${funcEntity.output}' as a DTO entity or import it from a dependency`
                  });
                }
              } else if (outputEntity.type !== "DTO") {
                this.addError({
                  position: entity.position,
                  message: `Function output '${funcEntity.output}' is not a DTO (it's a ${outputEntity.type})`,
                  severity: "error",
                  suggestion: `Change '${funcEntity.output}' to a DTO or use a different output type`
                });
              }
            }
          }
        }
      }
      checkUIComponentRelationships(entities) {
        for (const entity of entities.values()) {
          if (entity.type === "UIComponent") {
            const uiEntity = entity;
            if (uiEntity.contains) {
              for (const childName of uiEntity.contains) {
                const childEntity = entities.get(childName);
                if (!childEntity) {
                  this.addError({
                    position: entity.position,
                    message: `UIComponent '${entity.name}' contains unknown component '${childName}'`,
                    severity: "error",
                    suggestion: `Define '${childName}' as a UIComponent`
                  });
                } else if (childEntity.type !== "UIComponent") {
                  this.addError({
                    position: entity.position,
                    message: `UIComponent '${entity.name}' cannot contain '${childName}' (it's a ${childEntity.type})`,
                    severity: "error",
                    suggestion: `Only UIComponents can contain other UIComponents`
                  });
                }
              }
            }
            if (uiEntity.containedBy) {
              for (const parentName of uiEntity.containedBy) {
                const parentEntity = entities.get(parentName);
                if (!parentEntity) {
                  this.addError({
                    position: entity.position,
                    message: `UIComponent '${entity.name}' references unknown parent '${parentName}'`,
                    severity: "error",
                    suggestion: `Define '${parentName}' as a UIComponent`
                  });
                } else if (parentEntity.type !== "UIComponent") {
                  this.addError({
                    position: entity.position,
                    message: `UIComponent '${entity.name}' cannot be contained by '${parentName}' (it's a ${parentEntity.type})`,
                    severity: "error",
                    suggestion: `Only UIComponents can contain other UIComponents`
                  });
                }
              }
            }
          }
        }
      }
      checkFunctionUIComponentAffects(entities) {
        const componentAffectedBy = /* @__PURE__ */ new Map();
        for (const entity of entities.values()) {
          if (entity.type === "Function") {
            const funcEntity = entity;
            if (funcEntity.affects) {
              for (const componentName of funcEntity.affects) {
                const componentEntity = entities.get(componentName);
                if (!componentEntity) {
                  this.addError({
                    position: entity.position,
                    message: `Function '${entity.name}' affects unknown component '${componentName}'`,
                    severity: "error",
                    suggestion: `Define '${componentName}' as a UIComponent`
                  });
                } else if (componentEntity.type !== "UIComponent") {
                  this.addError({
                    position: entity.position,
                    message: `Function '${entity.name}' cannot affect '${componentName}' (it's a ${componentEntity.type})`,
                    severity: "error",
                    suggestion: `Functions can only affect UIComponents`
                  });
                } else {
                  if (!componentAffectedBy.has(componentName)) {
                    componentAffectedBy.set(componentName, []);
                  }
                  componentAffectedBy.get(componentName).push(entity.name);
                }
              }
            }
          }
        }
        for (const entity of entities.values()) {
          if (entity.type === "UIComponent") {
            const uiEntity = entity;
            const functionsAffecting = componentAffectedBy.get(entity.name) || [];
            if (uiEntity.affectedBy && uiEntity.affectedBy.length > 0) {
              for (const funcName of uiEntity.affectedBy) {
                if (!functionsAffecting.includes(funcName)) {
                  this.addError({
                    position: entity.position,
                    message: `UIComponent '${entity.name}' claims to be affected by '${funcName}', but that function doesn't affect it`,
                    severity: "error",
                    suggestion: `Add '${entity.name}' to the affects list of function '${funcName}'`
                  });
                }
              }
            }
          }
        }
      }
      checkAssetProgramRelationships(entities) {
        for (const entity of entities.values()) {
          if (entity.type === "Asset") {
            const assetEntity = entity;
            if (assetEntity.containsProgram) {
              const programEntity = entities.get(assetEntity.containsProgram);
              if (!programEntity) {
                this.addError({
                  position: entity.position,
                  message: `Asset '${entity.name}' references unknown program '${assetEntity.containsProgram}'`,
                  severity: "error",
                  suggestion: `Define '${assetEntity.containsProgram}' as a Program entity`
                });
              } else if (programEntity.type !== "Program") {
                this.addError({
                  position: entity.position,
                  message: `Asset '${entity.name}' cannot contain '${assetEntity.containsProgram}' (it's a ${programEntity.type})`,
                  severity: "error",
                  suggestion: `Assets can only contain Program entities`
                });
              }
            }
          }
        }
      }
      checkUIComponentContainment(entities) {
        const containedComponents = /* @__PURE__ */ new Set();
        for (const entity of entities.values()) {
          if (entity.type === "UIComponent") {
            const uiEntity = entity;
            if (uiEntity.contains) {
              for (const childName of uiEntity.contains) {
                containedComponents.add(childName);
              }
            }
          }
        }
        for (const entity of entities.values()) {
          if (entity.type === "UIComponent") {
            const uiEntity = entity;
            if (uiEntity.root) {
              continue;
            }
            if (!containedComponents.has(entity.name)) {
              this.addError({
                position: entity.position,
                message: `UIComponent '${entity.name}' is not contained by any other UIComponent`,
                severity: "error",
                suggestion: `Either add '${entity.name}' to another UIComponent's contains list, or mark it as a root component with &!`
              });
            }
          }
        }
      }
      checkFunctionConsumption(entities) {
        const validConsumeTypes = ["RunParameter", "Asset", "Dependency", "Constants"];
        for (const entity of entities.values()) {
          if (entity.type === "Function") {
            const funcEntity = entity;
            if (funcEntity.consumes) {
              for (const consumeName of funcEntity.consumes) {
                const consumeEntity = entities.get(consumeName);
                if (!consumeEntity) {
                  this.addError({
                    position: entity.position,
                    message: `Function '${entity.name}' consumes unknown entity '${consumeName}'`,
                    severity: "error",
                    suggestion: `Define '${consumeName}' as one of: ${validConsumeTypes.join(", ")}`
                  });
                } else if (!validConsumeTypes.includes(consumeEntity.type)) {
                  this.addError({
                    position: entity.position,
                    message: `Function '${entity.name}' cannot consume '${consumeName}' (it's a ${consumeEntity.type})`,
                    severity: "error",
                    suggestion: `Functions can only consume: ${validConsumeTypes.join(", ")}`
                  });
                }
              }
            }
          }
        }
        for (const entity of entities.values()) {
          if (entity.type === "RunParameter") {
            const paramEntity = entity;
            if (paramEntity.consumedBy && paramEntity.consumedBy.length > 0) {
              for (const funcName of paramEntity.consumedBy) {
                const funcEntity = entities.get(funcName);
                if (!funcEntity) {
                  this.addError({
                    position: entity.position,
                    message: `RunParameter '${entity.name}' claims to be consumed by unknown function '${funcName}'`,
                    severity: "error"
                  });
                } else if (funcEntity.type !== "Function") {
                  this.addError({
                    position: entity.position,
                    message: `RunParameter '${entity.name}' claims to be consumed by '${funcName}' which is not a Function`,
                    severity: "error"
                  });
                } else {
                  const func = funcEntity;
                  if (!func.consumes || !func.consumes.includes(entity.name)) {
                    this.addError({
                      position: entity.position,
                      message: `RunParameter '${entity.name}' claims to be consumed by '${funcName}', but that function doesn't consume it`,
                      severity: "error",
                      suggestion: `Add '${entity.name}' to the consumes list of function '${funcName}'`
                    });
                  }
                }
              }
            }
          }
        }
      }
      populateReferencedBy(entities) {
        for (const entity of entities.values()) {
          entity.referencedBy = [];
        }
        const addReference = (targetName, refType, from) => {
          const target = entities.get(targetName);
          if (!target)
            return;
          const validRef = _DSLValidator.VALID_REFERENCES[refType];
          if (!validRef) {
            this.addError({
              position: from.position,
              message: `Unknown reference type '${refType}'`,
              severity: "error"
            });
            return;
          }
          if (!validRef.from.includes(from.type)) {
            this.addError({
              position: from.position,
              message: `${from.type} '${from.name}' cannot have '${refType}' references`,
              severity: "error",
              suggestion: `Only ${validRef.from.join(", ")} entities can have '${refType}' references`
            });
            return;
          }
          if (!validRef.to.includes(target.type)) {
            this.addError({
              position: from.position,
              message: `Cannot use '${refType}' to reference ${target.type} '${targetName}'`,
              severity: "error",
              suggestion: `'${refType}' can only reference: ${validRef.to.join(", ")}`
            });
            return;
          }
          const exists = target.referencedBy.some((ref) => ref.from === from.name && ref.type === refType);
          if (!exists) {
            target.referencedBy.push({
              from: from.name,
              type: refType,
              fromType: from.type
            });
          }
        };
        for (const referencer of entities.values()) {
          if ("imports" in referencer) {
            for (const imp of referencer.imports) {
              if (!imp.includes("*")) {
                const dependency = Array.from(entities.values()).find((e) => e.type === "Dependency" && e.name === imp);
                if (dependency) {
                  const depEntity = dependency;
                  if (!depEntity.importedBy) {
                    depEntity.importedBy = [];
                  }
                  if (!depEntity.importedBy.includes(referencer.name)) {
                    depEntity.importedBy.push(referencer.name);
                  }
                } else {
                  addReference(imp, "imports", referencer);
                }
              }
            }
          }
          if ("exports" in referencer) {
            for (const exp of referencer.exports) {
              addReference(exp, "exports", referencer);
            }
          }
          if ("calls" in referencer) {
            for (const call of referencer.calls) {
              const callTarget = call.includes(".") ? call.split(".")[0] : call;
              addReference(callTarget, "calls", referencer);
            }
          }
          if (referencer.type === "Program") {
            addReference(referencer.entry, "entry", referencer);
          }
          if (referencer.type === "Function") {
            const func = referencer;
            if (func.input) {
              addReference(func.input, "input", referencer);
            }
            if (func.output) {
              addReference(func.output, "output", referencer);
            }
          }
          if ("consumes" in referencer) {
            const func = referencer;
            if (func.consumes) {
              for (const param of func.consumes) {
                addReference(param, "consumes", referencer);
              }
            }
          }
          if ("affects" in referencer) {
            const func = referencer;
            if (func.affects) {
              for (const comp of func.affects) {
                addReference(comp, "affects", referencer);
              }
            }
          }
          if (referencer.type === "Asset") {
            const asset = referencer;
            if (asset.containsProgram) {
              addReference(asset.containsProgram, "containsProgram", referencer);
            }
          }
          if (referencer.type === "UIComponent") {
            const ui = referencer;
            if (ui.contains) {
              for (const child of ui.contains) {
                addReference(child, "contains", referencer);
              }
            }
            if (ui.containedBy) {
              for (const parent of ui.containedBy) {
                addReference(parent, "containedBy", referencer);
              }
            }
          }
          if (referencer.type === "Class") {
            const cls = referencer;
            if (cls.extends) {
              addReference(cls.extends, "extends", referencer);
            }
            for (const intf of cls.implements) {
              addReference(intf, "implements", referencer);
            }
          }
          if (referencer.type === "Constants") {
            const cnst = referencer;
            if (cnst.schema) {
              addReference(cnst.schema, "schema", referencer);
            }
          }
          if (referencer.type === "UIComponent") {
            const ui = referencer;
            if (ui.affectedBy) {
              for (const funcName of ui.affectedBy) {
                addReference(funcName, "affectedBy", referencer);
              }
            }
          }
          if (referencer.type === "RunParameter") {
            const param = referencer;
            if (param.consumedBy) {
              for (const funcName of param.consumedBy) {
                addReference(funcName, "consumedBy", referencer);
              }
            }
          }
        }
      }
      checkFunctionDependencies(entities) {
        for (const entity of entities.values()) {
          if (entity.type === "Function") {
            const funcEntity = entity;
            if (funcEntity._dependencies) {
              for (const dep of funcEntity._dependencies) {
                const depEntity = entities.get(dep);
                if (!depEntity) {
                  this.addError({
                    position: entity.position,
                    message: `Function dependency '${dep}' not found`,
                    severity: "error",
                    suggestion: `Define '${dep}' as an entity or remove it from the dependency list`
                  });
                } else if (depEntity.type === "Dependency") {
                  this.addError({
                    position: entity.position,
                    message: `Cannot directly consume dependency '${dep}' in function '${funcEntity.name}'`,
                    severity: "error",
                    suggestion: `Import specific entities from '${dep}' instead. If '${dep}' exports entities, add them with '-> [EntityName]' and import those entities in your files.`
                  });
                }
              }
            }
          }
        }
      }
      checkDTOFieldTypes(entities) {
        for (const entity of entities.values()) {
          if (entity.type === "DTO") {
            const dtoEntity = entity;
            if (dtoEntity.fields) {
              for (const field of dtoEntity.fields) {
                if (!field.type)
                  continue;
                if (field.type === "Function" || /\bFunction\b/.test(field.type)) {
                  this.addError({
                    position: entity.position,
                    message: `DTO '${entity.name}' field '${field.name}' cannot have Function type`,
                    severity: "error",
                    suggestion: `DTOs should only contain data fields. Use string, number, boolean, object, array, or other data types instead`
                  });
                  continue;
                }
                this.validateFieldTypeReferences(field.type, entity, field.name, entities);
              }
            }
          }
        }
      }
      validateFieldTypeReferences(fieldType, entity, fieldName, entities) {
        const typesToCheck = this.extractTypesFromFieldType(fieldType);
        for (const typeName of typesToCheck) {
          if (this.isPrimitiveType(typeName)) {
            continue;
          }
          const referencedEntity = entities.get(typeName);
          if (!referencedEntity) {
            this.addError({
              position: entity.position,
              message: `DTO '${entity.name}' field '${fieldName}' references undefined type '${typeName}'`,
              severity: "error",
              suggestion: `Define '${typeName}' as a DTO or Class entity`
            });
          } else if (referencedEntity.type !== "DTO" && referencedEntity.type !== "Class") {
            this.addError({
              position: entity.position,
              message: `DTO '${entity.name}' field '${fieldName}' references '${typeName}' which is a ${referencedEntity.type}, not a DTO or Class`,
              severity: "error",
              suggestion: `Field types should reference DTO or Class entities for complex types`
            });
          }
        }
      }
      extractTypesFromFieldType(fieldType) {
        const types = [];
        const baseType = fieldType.replace(/\[\]/g, "");
        if (baseType.includes("|")) {
          const unionParts = baseType.split("|").map((part) => part.trim());
          for (const part of unionParts) {
            if (!this.isPrimitiveType(part) && this.isCustomTypeName(part)) {
              types.push(part);
            }
          }
        } else {
          if (!this.isPrimitiveType(baseType) && this.isCustomTypeName(baseType)) {
            types.push(baseType);
          }
        }
        return types;
      }
      isPrimitiveType(typeName) {
        const primitives = [
          "string",
          "number",
          "boolean",
          "object",
          "any",
          "void",
          "null",
          "undefined",
          "Date",
          "Array",
          "Promise",
          "Map",
          "Set",
          "Record",
          "Partial",
          "Required",
          "Pick",
          "Omit"
        ];
        return primitives.includes(typeName);
      }
      isCustomTypeName(typeName) {
        if (typeName.includes("<") && typeName.includes(">")) {
          const match = typeName.match(/<([^>]+)>/);
          if (match) {
            return this.isCustomTypeName(match[1]);
          }
        }
        return /^[A-Z]/.test(typeName) && /^[A-Za-z][A-Za-z0-9_]*$/.test(typeName);
      }
    };
    exports2.DSLValidator = DSLValidator2;
  }
});

// ../typed-mind/dist/formatter.js
var require_formatter = __commonJS({
  "../typed-mind/dist/formatter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ErrorFormatter = void 0;
    var ErrorFormatter = class {
      format(error, lines) {
        const { position, message, severity, suggestion } = error;
        const line = lines[position.line - 1] || "";
        const pointer = " ".repeat(Math.max(0, position.column - 1)) + "^";
        let output = `${severity.toUpperCase()} at line ${position.line}, col ${position.column}: ${message}
`;
        output += `  ${position.line} | ${line}
`;
        output += `     ${pointer}
`;
        if (suggestion) {
          output += `  Suggestion: ${suggestion}
`;
        }
        return output;
      }
      formatAll(errors, lines) {
        return errors.map((error) => this.format(error, lines)).join("\n");
      }
    };
    exports2.ErrorFormatter = ErrorFormatter;
  }
});

// ../typed-mind/dist/import-resolver.js
var require_import_resolver = __commonJS({
  "../typed-mind/dist/import-resolver.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ImportResolver = void 0;
    var fs_1 = require("fs");
    var path_1 = require("path");
    var parser_1 = require_parser();
    var ImportResolver = class {
      parser = new parser_1.DSLParser();
      resolvedPaths = /* @__PURE__ */ new Map();
      resolutionStack = [];
      resolveImports(imports, basePath) {
        const allEntities = /* @__PURE__ */ new Map();
        const errors = [];
        for (const importStmt of imports) {
          const fullPath = this.resolvePath(importStmt.path, basePath);
          if (this.resolutionStack.includes(fullPath)) {
            errors.push({
              position: importStmt.position,
              message: `Circular import detected: ${[...this.resolutionStack, fullPath].join(" -> ")}`,
              severity: "error"
            });
            continue;
          }
          this.resolutionStack.push(fullPath);
          const result = this.resolveImport(importStmt, basePath);
          if (result.errors) {
            errors.push(...result.errors);
            this.resolutionStack.pop();
            continue;
          }
          const prefix = result.import.alias ? `${result.import.alias}.` : "";
          for (const [name, entity] of result.entities) {
            const prefixedName = prefix + name;
            if (allEntities.has(prefixedName)) {
              errors.push({
                position: result.import.position,
                message: `Duplicate entity name '${prefixedName}' from import`,
                severity: "error",
                suggestion: "Use an alias to avoid naming conflicts"
              });
            } else {
              const clonedEntity = { ...entity, name: prefixedName };
              allEntities.set(prefixedName, clonedEntity);
            }
          }
          if (result.imports.length > 0) {
            const importDir = (0, path_1.dirname)(fullPath);
            const nestedResult = this.resolveImports(result.imports, importDir);
            for (const [name, entity] of nestedResult.resolvedEntities) {
              const nestedName = prefix + name;
              if (!allEntities.has(nestedName)) {
                allEntities.set(nestedName, { ...entity, name: nestedName });
              }
            }
            errors.push(...nestedResult.errors);
          }
          this.resolutionStack.pop();
        }
        return { resolvedEntities: allEntities, errors };
      }
      resolveImport(importStmt, basePath) {
        const fullPath = this.resolvePath(importStmt.path, basePath);
        if (this.resolvedPaths.has(fullPath)) {
          const cached = this.resolvedPaths.get(fullPath);
          return {
            import: importStmt,
            entities: cached.entities,
            imports: cached.imports
          };
        }
        try {
          const content = (0, fs_1.readFileSync)(fullPath, "utf-8");
          const parseResult = this.parser.parse(content);
          this.resolvedPaths.set(fullPath, parseResult);
          return {
            import: importStmt,
            entities: parseResult.entities,
            imports: parseResult.imports
          };
        } catch (error) {
          return {
            import: importStmt,
            entities: /* @__PURE__ */ new Map(),
            imports: [],
            errors: [
              {
                position: importStmt.position,
                message: `Failed to import '${importStmt.path}': ${error}`,
                severity: "error"
              }
            ]
          };
        }
      }
      resolvePath(importPath, basePath) {
        if ((0, path_1.isAbsolute)(importPath)) {
          return importPath;
        }
        return (0, path_1.resolve)(basePath, importPath);
      }
    };
    exports2.ImportResolver = ImportResolver;
  }
});

// ../typed-mind/dist/syntax-generator.js
var require_syntax_generator = __commonJS({
  "../typed-mind/dist/syntax-generator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.detectSyntaxFormat = exports2.toggleSyntaxFormat = exports2.SyntaxGenerator = void 0;
    var parser_patterns_1 = require_parser_patterns();
    var SyntaxGenerator2 = class {
      options;
      constructor(options = {}) {
        this.options = {
          preserveComments: true,
          indentSize: 2,
          preserveEmptyLines: true,
          ...options
        };
      }
      /**
       * Detect the primary format of DSL content
       */
      detectFormat(content) {
        const lines = content.split("\n");
        let shortformLines = 0;
        let longformLines = 0;
        let totalSignificantLines = 0;
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) {
            continue;
          }
          totalSignificantLines++;
          if (parser_patterns_1.GENERAL_PATTERNS.LONGFORM_DECLARATION.test(trimmed)) {
            longformLines++;
            continue;
          }
          if (parser_patterns_1.GENERAL_PATTERNS.ENTITY_DECLARATION.test(trimmed)) {
            if (this.isShortformEntityLine(trimmed)) {
              shortformLines++;
              continue;
            }
          }
          if (parser_patterns_1.GENERAL_PATTERNS.CONTINUATION.test(line)) {
            continue;
          }
        }
        const shortformRatio = totalSignificantLines > 0 ? shortformLines / totalSignificantLines : 0;
        const longformRatio = totalSignificantLines > 0 ? longformLines / totalSignificantLines : 0;
        let format;
        let confidence;
        if (shortformLines === 0 && longformLines === 0) {
          format = "shortform";
          confidence = 0.5;
        } else if (longformLines === 0 && shortformLines > 0) {
          format = "shortform";
          confidence = 1;
        } else if (shortformLines === 0 && longformLines > 0) {
          format = "longform";
          confidence = 1;
        } else if (shortformRatio > 0.6) {
          format = "shortform";
          confidence = shortformRatio;
        } else if (longformRatio > 0.6) {
          format = "longform";
          confidence = longformRatio;
        } else {
          format = "mixed";
          confidence = 1 - Math.abs(shortformRatio - longformRatio);
        }
        return {
          format,
          shortformLines,
          longformLines,
          totalLines: totalSignificantLines,
          confidence
        };
      }
      /**
       * Toggle format of DSL content
       */
      toggleFormat(content) {
        const detection = this.detectFormat(content);
        const targetFormat = detection.format === "longform" ? "shortform" : "longform";
        return this.convertToFormat(content, targetFormat);
      }
      /**
       * Convert DSL content to specific format
       */
      convertToFormat(content, targetFormat) {
        try {
          if (targetFormat === "shortform") {
            return this.convertToShortform(content);
          } else {
            return this.convertToLongform(content);
          }
        } catch (error) {
          return {
            _tag: "failure",
            error: {
              message: error instanceof Error ? error.message : "Unknown error during syntax conversion"
            }
          };
        }
      }
      /**
       * Generate shortform syntax from entities
       */
      toShortform(entities) {
        try {
          const lines = [];
          const sortedEntities = Array.from(entities.values()).sort((a, b) => {
            const typeOrder = this.getEntityTypeOrder(a.type);
            const typeOrderB = this.getEntityTypeOrder(b.type);
            if (typeOrder !== typeOrderB) {
              return typeOrder - typeOrderB;
            }
            return a.name.localeCompare(b.name);
          });
          for (const entity of sortedEntities) {
            const entityLines = this.entityToShortform(entity);
            if (entityLines._tag === "failure") {
              return entityLines;
            }
            lines.push(...entityLines.value);
            if (this.options.preserveEmptyLines) {
              lines.push("");
            }
          }
          return {
            _tag: "success",
            value: lines.join("\n").trim()
          };
        } catch (error) {
          return {
            _tag: "failure",
            error: {
              message: error instanceof Error ? error.message : "Failed to generate shortform syntax"
            }
          };
        }
      }
      /**
       * Generate longform syntax from entities
       */
      toLongform(entities) {
        try {
          const lines = [];
          const sortedEntities = Array.from(entities.values()).sort((a, b) => {
            const typeOrder = this.getEntityTypeOrder(a.type);
            const typeOrderB = this.getEntityTypeOrder(b.type);
            if (typeOrder !== typeOrderB) {
              return typeOrder - typeOrderB;
            }
            return a.name.localeCompare(b.name);
          });
          for (const entity of sortedEntities) {
            const entityLines = this.entityToLongform(entity);
            if (entityLines._tag === "failure") {
              return entityLines;
            }
            lines.push(...entityLines.value);
            if (this.options.preserveEmptyLines) {
              lines.push("");
            }
          }
          return {
            _tag: "success",
            value: lines.join("\n").trim()
          };
        } catch (error) {
          return {
            _tag: "failure",
            error: {
              message: error instanceof Error ? error.message : "Failed to generate longform syntax"
            }
          };
        }
      }
      // Private helper methods
      isShortformEntityLine(line) {
        const patterns = [
          parser_patterns_1.ENTITY_PATTERNS.PROGRAM,
          parser_patterns_1.ENTITY_PATTERNS.FILE,
          parser_patterns_1.ENTITY_PATTERNS.FUNCTION,
          parser_patterns_1.ENTITY_PATTERNS.CLASS,
          parser_patterns_1.ENTITY_PATTERNS.CLASS_FILE,
          parser_patterns_1.ENTITY_PATTERNS.CONSTANTS,
          parser_patterns_1.ENTITY_PATTERNS.DTO_WITH_PURPOSE,
          parser_patterns_1.ENTITY_PATTERNS.DTO_SIMPLE,
          parser_patterns_1.ENTITY_PATTERNS.ASSET,
          parser_patterns_1.ENTITY_PATTERNS.UI_COMPONENT,
          parser_patterns_1.ENTITY_PATTERNS.RUN_PARAMETER,
          parser_patterns_1.ENTITY_PATTERNS.DEPENDENCY
        ];
        return patterns.some((pattern) => pattern.test(line));
      }
      getEntityTypeOrder(type) {
        const order = {
          Program: 0,
          File: 1,
          ClassFile: 2,
          Class: 3,
          Function: 4,
          DTO: 5,
          Constants: 6,
          Asset: 7,
          UIComponent: 8,
          RunParameter: 9,
          Dependency: 10
        };
        return order[type] ?? 99;
      }
      convertToShortform(content) {
        const lines = content.split("\n");
        const result = [];
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) {
            if (this.options.preserveComments || this.options.preserveEmptyLines) {
              result.push(line);
            }
            continue;
          }
          result.push(line);
        }
        return {
          _tag: "success",
          value: result.join("\n")
        };
      }
      convertToLongform(content) {
        const lines = content.split("\n");
        const result = [];
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) {
            if (this.options.preserveComments || this.options.preserveEmptyLines) {
              result.push(line);
            }
            continue;
          }
          result.push(line);
        }
        return {
          _tag: "success",
          value: result.join("\n")
        };
      }
      entityToShortform(entity) {
        try {
          const lines = [];
          if (entity.comment && this.options.preserveComments) {
            lines.push(`# ${entity.comment}`);
          }
          switch (entity.type) {
            case "Program":
              lines.push(...this.programToShortform(entity));
              break;
            case "File":
              lines.push(...this.fileToShortform(entity));
              break;
            case "Function":
              lines.push(...this.functionToShortform(entity));
              break;
            case "Class":
              lines.push(...this.classToShortform(entity));
              break;
            case "ClassFile":
              lines.push(...this.classFileToShortform(entity));
              break;
            case "Constants":
              lines.push(...this.constantsToShortform(entity));
              break;
            case "DTO":
              lines.push(...this.dtoToShortform(entity));
              break;
            case "Asset":
              lines.push(...this.assetToShortform(entity));
              break;
            case "UIComponent":
              lines.push(...this.uiComponentToShortform(entity));
              break;
            case "RunParameter":
              lines.push(...this.runParameterToShortform(entity));
              break;
            case "Dependency":
              lines.push(...this.dependencyToShortform(entity));
              break;
            default:
              return {
                _tag: "failure",
                error: {
                  message: `Unknown entity type: ${entity.type}`,
                  entity: entity.name
                }
              };
          }
          return {
            _tag: "success",
            value: lines
          };
        } catch (error) {
          return {
            _tag: "failure",
            error: {
              message: error instanceof Error ? error.message : "Failed to convert entity to shortform",
              entity: entity.name
            }
          };
        }
      }
      entityToLongform(entity) {
        try {
          const lines = [];
          switch (entity.type) {
            case "Program":
              lines.push(...this.programToLongform(entity));
              break;
            case "File":
              lines.push(...this.fileToLongform(entity));
              break;
            case "Function":
              lines.push(...this.functionToLongform(entity));
              break;
            case "Class":
              lines.push(...this.classToLongform(entity));
              break;
            case "ClassFile":
              lines.push(...this.classFileToLongform(entity));
              break;
            case "Constants":
              lines.push(...this.constantsToLongform(entity));
              break;
            case "DTO":
              lines.push(...this.dtoToLongform(entity));
              break;
            case "Asset":
              lines.push(...this.assetToLongform(entity));
              break;
            case "UIComponent":
              lines.push(...this.uiComponentToLongform(entity));
              break;
            case "RunParameter":
              lines.push(...this.runParameterToLongform(entity));
              break;
            case "Dependency":
              lines.push(...this.dependencyToLongform(entity));
              break;
            default:
              return {
                _tag: "failure",
                error: {
                  message: `Unknown entity type: ${entity.type}`,
                  entity: entity.name
                }
              };
          }
          return {
            _tag: "success",
            value: lines
          };
        } catch (error) {
          return {
            _tag: "failure",
            error: {
              message: error instanceof Error ? error.message : "Failed to convert entity to longform",
              entity: entity.name
            }
          };
        }
      }
      // Shortform entity converters
      programToShortform(entity) {
        const lines = [];
        let line = `${entity.name} -> ${entity.entry}`;
        if (entity.purpose) {
          line += ` "${entity.purpose}"`;
        }
        if (entity.version) {
          line += ` v${entity.version}`;
        }
        lines.push(line);
        if (entity.exports && entity.exports.length > 0) {
          lines.push(`  -> [${entity.exports.join(", ")}]`);
        }
        return lines;
      }
      fileToShortform(entity) {
        const lines = [];
        lines.push(`${entity.name} @ ${entity.path}:`);
        if (entity.purpose) {
          lines.push(`  "${entity.purpose}"`);
        }
        if (entity.imports && entity.imports.length > 0) {
          lines.push(`  <- [${entity.imports.join(", ")}]`);
        }
        if (entity.exports && entity.exports.length > 0) {
          lines.push(`  -> [${entity.exports.join(", ")}]`);
        }
        return lines;
      }
      functionToShortform(entity) {
        const lines = [];
        lines.push(`${entity.name} :: ${entity.signature}`);
        if (entity.description) {
          lines.push(`  "${entity.description}"`);
        }
        if (entity.input) {
          lines.push(`  <- ${entity.input}`);
        }
        if (entity.output) {
          lines.push(`  -> ${entity.output}`);
        }
        if (entity.calls && entity.calls.length > 0) {
          lines.push(`  ~> [${entity.calls.join(", ")}]`);
        }
        if (entity.affects && entity.affects.length > 0) {
          lines.push(`  ~ [${entity.affects.join(", ")}]`);
        }
        if (entity.consumes && entity.consumes.length > 0) {
          lines.push(`  $< [${entity.consumes.join(", ")}]`);
        }
        return lines;
      }
      classToShortform(entity) {
        const lines = [];
        let line = `${entity.name} <:`;
        if (entity.extends) {
          line += ` ${entity.extends}`;
          if (entity.implements.length > 0) {
            line += `, ${entity.implements.join(", ")}`;
          }
        } else if (entity.implements.length > 0) {
          line += ` ${entity.implements.join(", ")}`;
        }
        lines.push(line);
        if (entity.purpose) {
          lines.push(`  "${entity.purpose}"`);
        }
        if (entity.methods && entity.methods.length > 0) {
          lines.push(`  => [${entity.methods.join(", ")}]`);
        }
        return lines;
      }
      classFileToShortform(entity) {
        const lines = [];
        let line = `${entity.name} #: ${entity.path}`;
        if (entity.extends) {
          line += ` <: ${entity.extends}`;
          if (entity.implements.length > 0) {
            line += `, ${entity.implements.join(", ")}`;
          }
        } else if (entity.implements.length > 0) {
          line += ` <: ${entity.implements.join(", ")}`;
        }
        lines.push(line);
        if (entity.purpose) {
          lines.push(`  "${entity.purpose}"`);
        }
        if (entity.imports && entity.imports.length > 0) {
          lines.push(`  <- [${entity.imports.join(", ")}]`);
        }
        if (entity.methods && entity.methods.length > 0) {
          lines.push(`  => [${entity.methods.join(", ")}]`);
        }
        if (entity.exports && entity.exports.length > 0) {
          lines.push(`  -> [${entity.exports.join(", ")}]`);
        }
        return lines;
      }
      constantsToShortform(entity) {
        const lines = [];
        let line = `${entity.name} ! ${entity.path}`;
        if (entity.schema) {
          line += ` : ${entity.schema}`;
        }
        lines.push(line);
        if (entity.purpose) {
          lines.push(`  "${entity.purpose}"`);
        }
        return lines;
      }
      dtoToShortform(entity) {
        const lines = [];
        let line = `${entity.name} %`;
        if (entity.purpose) {
          line += ` "${entity.purpose}"`;
        }
        lines.push(line);
        for (const field of entity.fields) {
          let fieldLine = `  - ${field.name}`;
          if (field.optional && field.description) {
            fieldLine += "?";
          }
          fieldLine += `: ${field.type}`;
          if (field.description) {
            fieldLine += ` "${field.description}"`;
          }
          if (field.optional) {
            if (!field.description) {
              fieldLine += " (optional)";
            } else {
              fieldLine += " (optional)";
            }
          }
          lines.push(fieldLine);
        }
        return lines;
      }
      assetToShortform(entity) {
        const lines = [];
        lines.push(`${entity.name} ~ "${entity.description}"`);
        if (entity.containsProgram) {
          lines.push(`  >> ${entity.containsProgram}`);
        }
        return lines;
      }
      uiComponentToShortform(entity) {
        const lines = [];
        const marker = entity.root ? "&!" : "&";
        lines.push(`${entity.name} ${marker} "${entity.purpose}"`);
        if (entity.contains && entity.contains.length > 0) {
          lines.push(`  > [${entity.contains.join(", ")}]`);
        }
        if (entity.containedBy && entity.containedBy.length > 0) {
          lines.push(`  < [${entity.containedBy.join(", ")}]`);
        }
        return lines;
      }
      runParameterToShortform(entity) {
        const lines = [];
        let line = `${entity.name} $${entity.paramType} "${entity.description}"`;
        if (entity.required) {
          line += " (required)";
        }
        lines.push(line);
        if (entity.defaultValue) {
          lines.push(`  = "${entity.defaultValue}"`);
        }
        return lines;
      }
      dependencyToShortform(entity) {
        const lines = [];
        let line = `${entity.name} ^ "${entity.purpose}"`;
        if (entity.version) {
          line += ` v${entity.version}`;
        }
        lines.push(line);
        if (entity.exports && entity.exports.length > 0) {
          lines.push(`  -> [${entity.exports.join(", ")}]`);
        }
        return lines;
      }
      // Longform entity converters (simplified for now)
      programToLongform(entity) {
        const lines = [];
        lines.push(`program ${entity.name} {`);
        lines.push(`  type: Program`);
        lines.push(`  entry: ${entity.entry}`);
        if (entity.purpose) {
          lines.push(`  purpose: "${entity.purpose}"`);
        }
        if (entity.version) {
          lines.push(`  version: ${entity.version}`);
        }
        if (entity.exports && entity.exports.length > 0) {
          lines.push(`  exports: [${entity.exports.join(", ")}]`);
        }
        lines.push("}");
        return lines;
      }
      fileToLongform(entity) {
        const lines = [];
        lines.push(`file ${entity.name} {`);
        lines.push(`  type: File`);
        lines.push(`  path: ${entity.path}`);
        if (entity.purpose) {
          lines.push(`  purpose: "${entity.purpose}"`);
        }
        if (entity.imports && entity.imports.length > 0) {
          lines.push(`  imports: [${entity.imports.join(", ")}]`);
        }
        if (entity.exports && entity.exports.length > 0) {
          lines.push(`  exports: [${entity.exports.join(", ")}]`);
        }
        lines.push("}");
        return lines;
      }
      functionToLongform(entity) {
        const lines = [];
        lines.push(`function ${entity.name} {`);
        lines.push(`  type: Function`);
        lines.push(`  signature: ${entity.signature}`);
        if (entity.description) {
          lines.push(`  description: "${entity.description}"`);
        }
        if (entity.input) {
          lines.push(`  input: ${entity.input}`);
        }
        if (entity.output) {
          lines.push(`  output: ${entity.output}`);
        }
        if (entity.calls && entity.calls.length > 0) {
          lines.push(`  calls: [${entity.calls.join(", ")}]`);
        }
        if (entity.affects && entity.affects.length > 0) {
          lines.push(`  affects: [${entity.affects.join(", ")}]`);
        }
        if (entity.consumes && entity.consumes.length > 0) {
          lines.push(`  consumes: [${entity.consumes.join(", ")}]`);
        }
        lines.push("}");
        return lines;
      }
      classToLongform(entity) {
        const lines = [];
        lines.push(`class ${entity.name} {`);
        lines.push(`  type: Class`);
        if (entity.extends) {
          lines.push(`  extends: ${entity.extends}`);
        }
        if (entity.implements.length > 0) {
          lines.push(`  implements: [${entity.implements.join(", ")}]`);
        }
        if (entity.purpose) {
          lines.push(`  purpose: "${entity.purpose}"`);
        }
        if (entity.methods && entity.methods.length > 0) {
          lines.push(`  methods: [${entity.methods.join(", ")}]`);
        }
        lines.push("}");
        return lines;
      }
      classFileToLongform(entity) {
        const lines = [];
        lines.push(`classfile ${entity.name} {`);
        lines.push(`  type: ClassFile`);
        lines.push(`  path: ${entity.path}`);
        if (entity.extends) {
          lines.push(`  extends: ${entity.extends}`);
        }
        if (entity.implements.length > 0) {
          lines.push(`  implements: [${entity.implements.join(", ")}]`);
        }
        if (entity.purpose) {
          lines.push(`  purpose: "${entity.purpose}"`);
        }
        if (entity.imports && entity.imports.length > 0) {
          lines.push(`  imports: [${entity.imports.join(", ")}]`);
        }
        if (entity.methods && entity.methods.length > 0) {
          lines.push(`  methods: [${entity.methods.join(", ")}]`);
        }
        if (entity.exports && entity.exports.length > 0) {
          lines.push(`  exports: [${entity.exports.join(", ")}]`);
        }
        lines.push("}");
        return lines;
      }
      constantsToLongform(entity) {
        const lines = [];
        lines.push(`constants ${entity.name} {`);
        lines.push(`  type: Constants`);
        lines.push(`  path: ${entity.path}`);
        if (entity.schema) {
          lines.push(`  schema: ${entity.schema}`);
        }
        if (entity.purpose) {
          lines.push(`  purpose: "${entity.purpose}"`);
        }
        lines.push("}");
        return lines;
      }
      dtoToLongform(entity) {
        const lines = [];
        lines.push(`dto ${entity.name} {`);
        lines.push(`  type: DTO`);
        if (entity.purpose) {
          lines.push(`  purpose: "${entity.purpose}"`);
        }
        if (entity.fields.length > 0) {
          lines.push(`  fields: {`);
          for (const field of entity.fields) {
            const fieldLine = `    ${field.name}: {`;
            lines.push(fieldLine);
            lines.push(`      type: ${field.type}`);
            if (field.description) {
              lines.push(`      description: "${field.description}"`);
            }
            if (field.optional) {
              lines.push(`      optional: true`);
            }
            lines.push(`    }`);
          }
          lines.push(`  }`);
        }
        lines.push("}");
        return lines;
      }
      assetToLongform(entity) {
        const lines = [];
        lines.push(`asset ${entity.name} {`);
        lines.push(`  type: Asset`);
        lines.push(`  description: "${entity.description}"`);
        if (entity.containsProgram) {
          lines.push(`  containsProgram: ${entity.containsProgram}`);
        }
        lines.push("}");
        return lines;
      }
      uiComponentToLongform(entity) {
        const lines = [];
        lines.push(`component ${entity.name} {`);
        lines.push(`  type: UIComponent`);
        lines.push(`  purpose: "${entity.purpose}"`);
        if (entity.root) {
          lines.push(`  root: true`);
        }
        if (entity.contains && entity.contains.length > 0) {
          lines.push(`  contains: [${entity.contains.join(", ")}]`);
        }
        if (entity.containedBy && entity.containedBy.length > 0) {
          lines.push(`  containedBy: [${entity.containedBy.join(", ")}]`);
        }
        lines.push("}");
        return lines;
      }
      runParameterToLongform(entity) {
        const lines = [];
        lines.push(`parameter ${entity.name} {`);
        lines.push(`  type: RunParameter`);
        lines.push(`  paramType: ${entity.paramType}`);
        lines.push(`  description: "${entity.description}"`);
        if (entity.required) {
          lines.push(`  required: true`);
        }
        if (entity.defaultValue) {
          lines.push(`  defaultValue: "${entity.defaultValue}"`);
        }
        lines.push("}");
        return lines;
      }
      dependencyToLongform(entity) {
        const lines = [];
        lines.push(`dependency ${entity.name} {`);
        lines.push(`  type: Dependency`);
        lines.push(`  purpose: "${entity.purpose}"`);
        if (entity.version) {
          lines.push(`  version: ${entity.version}`);
        }
        if (entity.exports && entity.exports.length > 0) {
          lines.push(`  exports: [${entity.exports.join(", ")}]`);
        }
        lines.push("}");
        return lines;
      }
    };
    exports2.SyntaxGenerator = SyntaxGenerator2;
    var toggleSyntaxFormat = (content, options) => {
      const generator = new SyntaxGenerator2(options);
      return generator.toggleFormat(content);
    };
    exports2.toggleSyntaxFormat = toggleSyntaxFormat;
    var detectSyntaxFormat = (content) => {
      const generator = new SyntaxGenerator2();
      return generator.detectFormat(content);
    };
    exports2.detectSyntaxFormat = detectSyntaxFormat;
  }
});

// ../typed-mind/dist/branded-types.js
var require_branded_types = __commonJS({
  "../typed-mind/dist/branded-types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.unbrand = exports2.EntityTypeName = exports2.Description = exports2.Version = exports2.FunctionSignature = exports2.FilePath = exports2.EntityName = void 0;
    exports2.EntityName = {
      create: (name) => {
        if (!name.trim()) {
          throw new Error("Entity name cannot be empty");
        }
        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
          throw new Error(`Invalid entity name: ${name}. Must start with letter or underscore, followed by alphanumeric characters or underscores.`);
        }
        return name;
      },
      isValid: (name) => {
        return name.trim().length > 0 && /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
      },
      unsafe: (name) => name
    };
    exports2.FilePath = {
      create: (path) => {
        if (!path.trim()) {
          throw new Error("File path cannot be empty");
        }
        return path;
      },
      isValid: (path) => {
        return path.trim().length > 0;
      },
      unsafe: (path) => path
    };
    exports2.FunctionSignature = {
      create: (signature) => {
        if (!signature.trim()) {
          throw new Error("Function signature cannot be empty");
        }
        return signature;
      },
      unsafe: (signature) => signature
    };
    exports2.Version = {
      create: (version) => {
        const normalizedVersion = version.startsWith("v") ? version.slice(1) : version;
        if (!/^\d+(\.\d+)*(-[\w\-\.]+)?$/.test(normalizedVersion)) {
          throw new Error(`Invalid version format: ${version}`);
        }
        return normalizedVersion;
      },
      unsafe: (version) => version
    };
    exports2.Description = {
      create: (description) => {
        return description;
      },
      unsafe: (description) => description
    };
    exports2.EntityTypeName = {
      create: (typeName) => {
        const validTypes = [
          "Program",
          "File",
          "Function",
          "Class",
          "ClassFile",
          "Constants",
          "DTO",
          "Asset",
          "UIComponent",
          "RunParameter",
          "Dependency"
        ];
        if (!validTypes.includes(typeName)) {
          throw new Error(`Invalid entity type: ${typeName}. Must be one of: ${validTypes.join(", ")}`);
        }
        return typeName;
      },
      unsafe: (typeName) => typeName
    };
    var unbrand = (value) => value;
    exports2.unbrand = unbrand;
  }
});

// ../typed-mind/dist/result.js
var require_result = __commonJS({
  "../typed-mind/dist/result.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AsyncResult = exports2.Result = exports2.isErr = exports2.isOk = exports2.Err = exports2.Ok = void 0;
    var Ok = (value) => ({
      _tag: "success",
      value
    });
    exports2.Ok = Ok;
    var Err = (error) => ({
      _tag: "failure",
      error
    });
    exports2.Err = Err;
    var isOk = (result) => result._tag === "success";
    exports2.isOk = isOk;
    var isErr = (result) => result._tag === "failure";
    exports2.isErr = isErr;
    exports2.Result = {
      /**
       * Create a successful result
       */
      ok: exports2.Ok,
      /**
       * Create a failed result
       */
      err: exports2.Err,
      /**
       * Check if result is successful
       */
      isOk: exports2.isOk,
      /**
       * Check if result is failed
       */
      isErr: exports2.isErr,
      /**
       * Map over the success value, leaving errors unchanged
       */
      map: (result, fn) => {
        return (0, exports2.isOk)(result) ? (0, exports2.Ok)(fn(result.value)) : result;
      },
      /**
       * Map over the error value, leaving success unchanged
       */
      mapErr: (result, fn) => {
        return (0, exports2.isErr)(result) ? (0, exports2.Err)(fn(result.error)) : result;
      },
      /**
       * Chain operations that return Results (flatMap)
       */
      andThen: (result, fn) => {
        return (0, exports2.isOk)(result) ? fn(result.value) : result;
      },
      /**
       * Provide a default value for failed results
       */
      unwrapOr: (result, defaultValue) => {
        return (0, exports2.isOk)(result) ? result.value : defaultValue;
      },
      /**
       * Extract the value or throw the error
       */
      unwrap: (result) => {
        if ((0, exports2.isOk)(result)) {
          return result.value;
        }
        throw result.error;
      },
      /**
       * Extract the error or throw if successful
       */
      unwrapErr: (result) => {
        if ((0, exports2.isErr)(result)) {
          return result.error;
        }
        throw new Error("Called unwrapErr on a successful result");
      },
      /**
       * Combine multiple Results into a single Result containing an array
       * If any Result is an error, return the first error
       */
      all: (results) => {
        const values = [];
        for (const result of results) {
          if ((0, exports2.isErr)(result)) {
            return result;
          }
          values.push(result.value);
        }
        return (0, exports2.Ok)(values);
      },
      /**
       * Try to execute a function that might throw, converting to Result
       */
      try: (fn) => {
        try {
          return (0, exports2.Ok)(fn());
        } catch (error) {
          return (0, exports2.Err)(error instanceof Error ? error : new Error(String(error)));
        }
      },
      /**
       * Try to execute an async function that might throw, converting to Result
       */
      tryAsync: async (fn) => {
        try {
          const value = await fn();
          return (0, exports2.Ok)(value);
        } catch (error) {
          return (0, exports2.Err)(error instanceof Error ? error : new Error(String(error)));
        }
      },
      /**
       * Apply a function to both success and error cases
       */
      match: (result, handlers) => {
        return (0, exports2.isOk)(result) ? handlers.ok(result.value) : handlers.err(result.error);
      }
    };
    exports2.AsyncResult = {
      /**
       * Map over an async Result
       */
      map: async (result, fn) => {
        const resolved = await result;
        return (0, exports2.isOk)(resolved) ? (0, exports2.Ok)(await fn(resolved.value)) : resolved;
      },
      /**
       * Chain async operations that return Results
       */
      andThen: async (result, fn) => {
        const resolved = await result;
        return (0, exports2.isOk)(resolved) ? await fn(resolved.value) : resolved;
      }
    };
  }
});

// ../typed-mind/dist/error-types.js
var require_error_types = __commonJS({
  "../typed-mind/dist/error-types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isProgramStructureError = exports2.isUIComponentError = exports2.isDTOError = exports2.isFunctionError = exports2.isEntityValidationError = exports2.isParseError = exports2.TypedMindErrors = void 0;
    exports2.TypedMindErrors = {
      parse: {
        invalidSyntax: (position, raw, expected) => ({
          kind: "parse",
          type: "invalid_syntax",
          position,
          severity: "error",
          raw,
          ...expected && { expected }
        }),
        unexpectedToken: (position, raw, suggestion) => ({
          kind: "parse",
          type: "unexpected_token",
          position,
          severity: "error",
          raw,
          ...suggestion && { suggestion }
        }),
        missingRequiredField: (position, raw, field) => ({
          kind: "parse",
          type: "missing_required_field",
          position,
          severity: "error",
          raw,
          expected: field
        })
      },
      entity: {
        missingEntity: (position, entityName, entityType, referencedEntity) => ({
          kind: "entity_validation",
          type: "missing_entity",
          position,
          severity: "error",
          entityName,
          entityType,
          details: { referencedEntity }
        }),
        duplicateEntity: (position, entityName, entityType, conflictingEntity) => ({
          kind: "entity_validation",
          type: "duplicate_entity",
          position,
          severity: "error",
          entityName,
          entityType,
          details: { conflictingEntity }
        }),
        circularDependency: (position, entityName, entityType, circularPath) => ({
          kind: "entity_validation",
          type: "circular_dependency",
          position,
          severity: "error",
          entityName,
          entityType,
          details: { circularPath }
        })
      },
      function: {
        invalidSignature: (position, functionName, signature) => ({
          kind: "function",
          type: "invalid_signature",
          position,
          severity: "error",
          functionName,
          signature
        }),
        invalidCall: (position, functionName, calledFunction) => ({
          kind: "function",
          type: "invalid_call",
          position,
          severity: "error",
          functionName,
          calledFunction
        })
      },
      dto: {
        functionInDTO: (position, dtoName, fieldName) => ({
          kind: "dto",
          type: "function_in_dto",
          position,
          severity: "error",
          dtoName,
          fieldName
        }),
        invalidFieldType: (position, dtoName, fieldName, fieldType) => ({
          kind: "dto",
          type: "invalid_field_type",
          position,
          severity: "error",
          dtoName,
          fieldName,
          fieldType
        })
      },
      uiComponent: {
        circularContainment: (position, componentName, parentComponent) => ({
          kind: "ui_component",
          type: "circular_containment",
          position,
          severity: "error",
          componentName,
          parentComponent
        })
      },
      program: {
        missingProgram: (position) => ({
          kind: "program_structure",
          type: "missing_program",
          position,
          severity: "error"
        }),
        multiplePrograms: (position, programName) => ({
          kind: "program_structure",
          type: "multiple_programs",
          position,
          severity: "warning",
          programName
        })
      }
    };
    var isParseError = (error) => error.kind === "parse";
    exports2.isParseError = isParseError;
    var isEntityValidationError = (error) => error.kind === "entity_validation";
    exports2.isEntityValidationError = isEntityValidationError;
    var isFunctionError = (error) => error.kind === "function";
    exports2.isFunctionError = isFunctionError;
    var isDTOError = (error) => error.kind === "dto";
    exports2.isDTOError = isDTOError;
    var isUIComponentError = (error) => error.kind === "ui_component";
    exports2.isUIComponentError = isUIComponentError;
    var isProgramStructureError = (error) => error.kind === "program_structure";
    exports2.isProgramStructureError = isProgramStructureError;
  }
});

// ../typed-mind/dist/entity-map.js
var require_entity_map = __commonJS({
  "../typed-mind/dist/entity-map.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.EntityMap = void 0;
    var branded_types_1 = require_branded_types();
    var EntityMap = class _EntityMap {
      entities = /* @__PURE__ */ new Map();
      typeIndex = /* @__PURE__ */ new Map();
      constructor(initialEntities) {
        if (initialEntities instanceof _EntityMap) {
          this.entities = new Map(initialEntities.entities);
          this.typeIndex = /* @__PURE__ */ new Map();
          for (const [type, names] of initialEntities.typeIndex) {
            this.typeIndex.set(type, new Set(names));
          }
        } else if (initialEntities instanceof Map) {
          for (const [, entity] of initialEntities) {
            this.set(entity);
          }
        }
      }
      /**
       * Add an entity to the map
       */
      set(entity) {
        const entityName = entity.name;
        if (this.entities.has(entityName)) {
          return {
            _tag: "failure",
            error: {
              kind: "entity_map_error",
              type: "duplicate_entity",
              entityName: branded_types_1.EntityName.unsafe(entityName),
              message: `Entity '${entityName}' already exists`
            }
          };
        }
        this.entities.set(entityName, entity);
        const typeSet = this.typeIndex.get(entity.type) ?? /* @__PURE__ */ new Set();
        typeSet.add(entityName);
        this.typeIndex.set(entity.type, typeSet);
        return { _tag: "success", value: void 0 };
      }
      /**
       * Get an entity by name with optional type checking
       */
      get(name, expectedType) {
        const entityName = typeof name === "string" ? name : name;
        const entity = this.entities.get(entityName);
        if (!entity) {
          return {
            _tag: "failure",
            error: {
              kind: "entity_map_error",
              type: "entity_not_found",
              entityName: branded_types_1.EntityName.unsafe(entityName),
              message: `Entity '${entityName}' not found`
            }
          };
        }
        if (expectedType && entity.type !== expectedType) {
          return {
            _tag: "failure",
            error: {
              kind: "entity_map_error",
              type: "type_mismatch",
              entityName: branded_types_1.EntityName.unsafe(entityName),
              expectedType,
              actualType: entity.type,
              message: `Expected entity '${entityName}' to be of type '${expectedType}', but got '${entity.type}'`
            }
          };
        }
        return { _tag: "success", value: entity };
      }
      /**
       * Get an entity unsafely (throws on missing)
       */
      getUnsafe(name) {
        const entityName = typeof name === "string" ? name : name;
        const entity = this.entities.get(entityName);
        if (!entity) {
          throw new Error(`Entity '${entityName}' not found`);
        }
        return entity;
      }
      /**
       * Get a typed entity unsafely
       */
      getTypedUnsafe(name, expectedType) {
        const entity = this.getUnsafe(name);
        if (entity.type !== expectedType) {
          throw new Error(`Expected entity '${name}' to be of type '${expectedType}', but got '${entity.type}'`);
        }
        return entity;
      }
      /**
       * Check if an entity exists
       */
      has(name) {
        const entityName = typeof name === "string" ? name : name;
        return this.entities.has(entityName);
      }
      /**
       * Check if an entity exists with a specific type
       */
      hasOfType(name, type) {
        const entity = this.entities.get(typeof name === "string" ? name : name);
        return entity?.type === type || false;
      }
      /**
       * Remove an entity
       */
      delete(name) {
        const entityName = typeof name === "string" ? name : name;
        const entity = this.entities.get(entityName);
        if (!entity) {
          return false;
        }
        this.entities.delete(entityName);
        const typeSet = this.typeIndex.get(entity.type);
        if (typeSet) {
          typeSet.delete(entityName);
          if (typeSet.size === 0) {
            this.typeIndex.delete(entity.type);
          }
        }
        return true;
      }
      /**
       * Get all entities of a specific type
       */
      getByType(type) {
        const names = this.typeIndex.get(type) ?? /* @__PURE__ */ new Set();
        return Array.from(names).map((name) => this.entities.get(name)).filter((entity) => entity.type === type);
      }
      /**
       * Get all entity names of a specific type
       */
      getNamesOfType(type) {
        const names = this.typeIndex.get(type) ?? /* @__PURE__ */ new Set();
        return Array.from(names).map((name) => branded_types_1.EntityName.unsafe(name));
      }
      /**
       * Get all entities
       */
      getAll() {
        return Array.from(this.entities.values());
      }
      /**
       * Get all entity names
       */
      getAllNames() {
        return Array.from(this.entities.keys()).map((name) => branded_types_1.EntityName.unsafe(name));
      }
      /**
       * Get entity count
       */
      size() {
        return this.entities.size;
      }
      /**
       * Get entity count by type
       */
      sizeByType(type) {
        return this.typeIndex.get(type)?.size ?? 0;
      }
      /**
       * Check if the map is empty
       */
      isEmpty() {
        return this.entities.size === 0;
      }
      /**
       * Clear all entities
       */
      clear() {
        this.entities.clear();
        this.typeIndex.clear();
      }
      /**
       * Create a new EntityMap with filtered entities
       */
      filter(predicate) {
        const filtered = new _EntityMap();
        for (const entity of this.entities.values()) {
          if (predicate(entity)) {
            filtered.set(entity);
          }
        }
        return filtered;
      }
      /**
       * Transform to a regular Map (for compatibility)
       */
      toMap() {
        return new Map(this.entities);
      }
      /**
       * Create an EntityMap from a regular Map
       */
      static fromMap(map) {
        const entityMap = new _EntityMap();
        const errors = [];
        for (const entity of map.values()) {
          const result = entityMap.set(entity);
          if (result._tag === "failure") {
            errors.push(result.error);
          }
        }
        if (errors.length > 0) {
          return { _tag: "failure", error: errors };
        }
        return { _tag: "success", value: entityMap };
      }
      /**
       * Merge another EntityMap into this one
       */
      merge(other) {
        const errors = [];
        for (const entity of other.getAll()) {
          const result = this.set(entity);
          if (result._tag === "failure") {
            errors.push(result.error);
          }
        }
        if (errors.length > 0) {
          return { _tag: "failure", error: errors };
        }
        return { _tag: "success", value: void 0 };
      }
      /**
       * Find entities that reference a specific entity
       */
      findReferencesToEntity(targetName) {
        const target = typeof targetName === "string" ? targetName : targetName;
        const referencing = [];
        for (const entity of this.entities.values()) {
          const checkArrayField = (field) => field.includes(target);
          if ("imports" in entity && entity.imports && checkArrayField(entity.imports)) {
            referencing.push(entity);
          }
          if ("exports" in entity && entity.exports && checkArrayField(entity.exports)) {
            referencing.push(entity);
          }
          if ("calls" in entity && entity.calls && checkArrayField(entity.calls)) {
            referencing.push(entity);
          }
          if ("affects" in entity && entity.affects && checkArrayField(entity.affects)) {
            referencing.push(entity);
          }
          if ("consumes" in entity && entity.consumes && checkArrayField(entity.consumes)) {
            referencing.push(entity);
          }
          if ("contains" in entity && entity.contains && checkArrayField(entity.contains)) {
            referencing.push(entity);
          }
        }
        return referencing;
      }
    };
    exports2.EntityMap = EntityMap;
  }
});

// ../typed-mind/dist/entity-builder.js
var require_entity_builder = __commonJS({
  "../typed-mind/dist/entity-builder.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createEntityBuilder = exports2.EntityBuilder = exports2.ClassFileEntityBuilder = exports2.DTOEntityBuilder = exports2.FunctionEntityBuilder = exports2.FileEntityBuilder = exports2.ProgramEntityBuilder = void 0;
    var createDefaultPosition = () => ({ line: 0, column: 0 });
    var ProgramEntityBuilder = class _ProgramEntityBuilder {
      data = {
        type: "Program",
        position: createDefaultPosition(),
        raw: ""
      };
      static create() {
        return new _ProgramEntityBuilder();
      }
      name(name) {
        this.data.name = name;
        return this;
      }
      entry(entryPoint) {
        this.data.entry = entryPoint;
        return this;
      }
      version(version) {
        this.data.version = version;
        return this;
      }
      purpose(purpose) {
        this.data.purpose = purpose;
        return this;
      }
      exports(exports3) {
        this.data.exports = exports3;
        return this;
      }
      position(position) {
        this.data.position = position;
        return this;
      }
      raw(raw) {
        this.data.raw = raw;
        return this;
      }
      comment(comment) {
        this.data.comment = comment;
        return this;
      }
      build() {
        if (!this.data.name) {
          return { _tag: "failure", error: "Program name is required" };
        }
        if (!this.data.entry) {
          return { _tag: "failure", error: "Program entry point is required" };
        }
        return {
          _tag: "success",
          value: {
            type: "Program",
            name: this.data.name,
            entry: this.data.entry,
            position: this.data.position || createDefaultPosition(),
            raw: this.data.raw || "",
            ...this.data.version && { version: this.data.version },
            ...this.data.purpose && { purpose: this.data.purpose },
            ...this.data.exports && { exports: this.data.exports },
            ...this.data.comment && { comment: this.data.comment }
          }
        };
      }
    };
    exports2.ProgramEntityBuilder = ProgramEntityBuilder;
    var FileEntityBuilder = class _FileEntityBuilder {
      data = {
        type: "File",
        position: createDefaultPosition(),
        raw: "",
        imports: [],
        exports: []
      };
      static create() {
        return new _FileEntityBuilder();
      }
      name(name) {
        this.data.name = name;
        return this;
      }
      path(path) {
        this.data.path = path;
        return this;
      }
      imports(imports) {
        this.data.imports = imports;
        return this;
      }
      addImport(importName) {
        if (!this.data.imports)
          this.data.imports = [];
        this.data.imports.push(importName);
        return this;
      }
      exports(exports3) {
        this.data.exports = exports3;
        return this;
      }
      addExport(exportName) {
        if (!this.data.exports)
          this.data.exports = [];
        this.data.exports.push(exportName);
        return this;
      }
      purpose(purpose) {
        this.data.purpose = purpose;
        return this;
      }
      position(position) {
        this.data.position = position;
        return this;
      }
      raw(raw) {
        this.data.raw = raw;
        return this;
      }
      comment(comment) {
        this.data.comment = comment;
        return this;
      }
      build() {
        if (!this.data.name) {
          return { _tag: "failure", error: "File name is required" };
        }
        if (!this.data.path) {
          return { _tag: "failure", error: "File path is required" };
        }
        return {
          _tag: "success",
          value: {
            type: "File",
            name: this.data.name,
            path: this.data.path,
            imports: this.data.imports || [],
            exports: this.data.exports || [],
            position: this.data.position || createDefaultPosition(),
            raw: this.data.raw || "",
            ...this.data.purpose && { purpose: this.data.purpose },
            ...this.data.comment && { comment: this.data.comment }
          }
        };
      }
    };
    exports2.FileEntityBuilder = FileEntityBuilder;
    var FunctionEntityBuilder = class _FunctionEntityBuilder {
      data = {
        type: "Function",
        position: createDefaultPosition(),
        raw: "",
        calls: [],
        affects: [],
        consumes: []
      };
      static create() {
        return new _FunctionEntityBuilder();
      }
      name(name) {
        this.data.name = name;
        return this;
      }
      signature(signature) {
        this.data.signature = signature;
        return this;
      }
      container(container) {
        this.data.container = container;
        return this;
      }
      description(description) {
        this.data.description = description;
        return this;
      }
      calls(calls) {
        this.data.calls = calls;
        return this;
      }
      addCall(call) {
        if (!this.data.calls)
          this.data.calls = [];
        this.data.calls.push(call);
        return this;
      }
      input(inputDTO) {
        this.data.input = inputDTO;
        return this;
      }
      output(outputDTO) {
        this.data.output = outputDTO;
        return this;
      }
      affects(affects) {
        this.data.affects = affects;
        return this;
      }
      addAffects(component) {
        if (!this.data.affects)
          this.data.affects = [];
        this.data.affects.push(component);
        return this;
      }
      consumes(consumes) {
        this.data.consumes = consumes;
        return this;
      }
      addConsumes(parameter) {
        if (!this.data.consumes)
          this.data.consumes = [];
        this.data.consumes.push(parameter);
        return this;
      }
      position(position) {
        this.data.position = position;
        return this;
      }
      raw(raw) {
        this.data.raw = raw;
        return this;
      }
      comment(comment) {
        this.data.comment = comment;
        return this;
      }
      build() {
        if (!this.data.name) {
          return { _tag: "failure", error: "Function name is required" };
        }
        if (!this.data.signature) {
          return { _tag: "failure", error: "Function signature is required" };
        }
        return {
          _tag: "success",
          value: {
            type: "Function",
            name: this.data.name,
            signature: this.data.signature,
            calls: this.data.calls || [],
            affects: this.data.affects || [],
            consumes: this.data.consumes || [],
            position: this.data.position || createDefaultPosition(),
            raw: this.data.raw || "",
            ...this.data.container && { container: this.data.container },
            ...this.data.description && { description: this.data.description },
            ...this.data.input && { input: this.data.input },
            ...this.data.output && { output: this.data.output },
            ...this.data.comment && { comment: this.data.comment }
          }
        };
      }
    };
    exports2.FunctionEntityBuilder = FunctionEntityBuilder;
    var DTOEntityBuilder = class _DTOEntityBuilder {
      data = {
        type: "DTO",
        position: createDefaultPosition(),
        raw: "",
        fields: []
      };
      static create() {
        return new _DTOEntityBuilder();
      }
      name(name) {
        this.data.name = name;
        return this;
      }
      purpose(purpose) {
        this.data.purpose = purpose;
        return this;
      }
      fields(fields) {
        this.data.fields = fields;
        return this;
      }
      addField(field) {
        if (!this.data.fields)
          this.data.fields = [];
        this.data.fields.push(field);
        return this;
      }
      addFieldFromParts(name, type, description, optional) {
        const field = {
          name,
          type,
          ...description && { description },
          ...optional && { optional }
        };
        return this.addField(field);
      }
      position(position) {
        this.data.position = position;
        return this;
      }
      raw(raw) {
        this.data.raw = raw;
        return this;
      }
      comment(comment) {
        this.data.comment = comment;
        return this;
      }
      build() {
        if (!this.data.name) {
          return { _tag: "failure", error: "DTO name is required" };
        }
        return {
          _tag: "success",
          value: {
            type: "DTO",
            name: this.data.name,
            fields: this.data.fields || [],
            position: this.data.position || createDefaultPosition(),
            raw: this.data.raw || "",
            ...this.data.purpose && { purpose: this.data.purpose },
            ...this.data.comment && { comment: this.data.comment }
          }
        };
      }
    };
    exports2.DTOEntityBuilder = DTOEntityBuilder;
    var ClassFileEntityBuilder = class _ClassFileEntityBuilder {
      data = {
        type: "ClassFile",
        position: createDefaultPosition(),
        raw: "",
        implements: [],
        methods: [],
        imports: [],
        exports: []
      };
      static create() {
        return new _ClassFileEntityBuilder();
      }
      name(name) {
        this.data.name = name;
        return this;
      }
      path(path) {
        this.data.path = path;
        return this;
      }
      extends(baseClass) {
        this.data.extends = baseClass;
        return this;
      }
      implements(interfaces) {
        this.data.implements = interfaces;
        return this;
      }
      addImplements(interfaceName) {
        if (!this.data.implements)
          this.data.implements = [];
        this.data.implements.push(interfaceName);
        return this;
      }
      methods(methods) {
        this.data.methods = methods;
        return this;
      }
      addMethod(method) {
        if (!this.data.methods)
          this.data.methods = [];
        this.data.methods.push(method);
        return this;
      }
      imports(imports) {
        this.data.imports = imports;
        return this;
      }
      addImport(importName) {
        if (!this.data.imports)
          this.data.imports = [];
        this.data.imports.push(importName);
        return this;
      }
      exports(exports3) {
        this.data.exports = exports3;
        return this;
      }
      addExport(exportName) {
        if (!this.data.exports)
          this.data.exports = [];
        this.data.exports.push(exportName);
        return this;
      }
      purpose(purpose) {
        this.data.purpose = purpose;
        return this;
      }
      position(position) {
        this.data.position = position;
        return this;
      }
      raw(raw) {
        this.data.raw = raw;
        return this;
      }
      comment(comment) {
        this.data.comment = comment;
        return this;
      }
      build() {
        if (!this.data.name) {
          return { _tag: "failure", error: "ClassFile name is required" };
        }
        if (!this.data.path) {
          return { _tag: "failure", error: "ClassFile path is required" };
        }
        return {
          _tag: "success",
          value: {
            type: "ClassFile",
            name: this.data.name,
            path: this.data.path,
            implements: this.data.implements || [],
            methods: this.data.methods || [],
            imports: this.data.imports || [],
            exports: this.data.exports || [],
            position: this.data.position || createDefaultPosition(),
            raw: this.data.raw || "",
            ...this.data.extends && { extends: this.data.extends },
            ...this.data.purpose && { purpose: this.data.purpose },
            ...this.data.comment && { comment: this.data.comment }
          }
        };
      }
    };
    exports2.ClassFileEntityBuilder = ClassFileEntityBuilder;
    var EntityBuilder = class _EntityBuilder {
      static program() {
        return ProgramEntityBuilder.create();
      }
      static file() {
        return FileEntityBuilder.create();
      }
      static function() {
        return FunctionEntityBuilder.create();
      }
      static dto() {
        return DTOEntityBuilder.create();
      }
      static classFile() {
        return ClassFileEntityBuilder.create();
      }
      // Convenience method to create any builder
      static create(type) {
        switch (type) {
          case "Program":
            return _EntityBuilder.program();
          case "File":
            return _EntityBuilder.file();
          case "Function":
            return _EntityBuilder.function();
          case "DTO":
            return _EntityBuilder.dto();
          case "ClassFile":
            return _EntityBuilder.classFile();
          default:
            throw new Error(`Builder for entity type '${type}' not implemented yet`);
        }
      }
    };
    exports2.EntityBuilder = EntityBuilder;
    exports2.createEntityBuilder = EntityBuilder.create;
  }
});

// ../typed-mind/dist/grammar-doc-generator.js
var require_grammar_doc_generator = __commonJS({
  "../typed-mind/dist/grammar-doc-generator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.GrammarDocGenerator = void 0;
    var parser_patterns_1 = require_parser_patterns();
    var explanation = `
## Note from Author
TypedMind is meant to be a DSL to represent a variety of programs and
force AI to create a cohesive program architecture with a relatively token efficient syntax.

Entities link bidirectionally, so for example it is not enough to declare a function,
the file must also be declared. The function must be exported by a file. And the function must be 
consumed by another entity to avoid dead code. The TypeMind checker will validate these scenarios.
`;
    var GrammarDocGenerator = class {
      generateMarkdown() {
        const sections = [];
        sections.push("# TypedMind DSL Grammar Reference");
        sections.push("");
        sections.push("This document is auto-generated from the parser patterns.");
        sections.push("");
        sections.push(explanation.trim());
        sections.push("");
        sections.push("## Table of Contents");
        sections.push("");
        sections.push("1. [Entity Types](#entity-types)");
        sections.push("2. [Entity Patterns](#entity-patterns)");
        sections.push("3. [Continuation Patterns](#continuation-patterns)");
        sections.push("4. [General Patterns](#general-patterns)");
        sections.push("5. [Quick Reference Example](#quick-reference-example)");
        sections.push("6. [Comprehensive Examples](#comprehensive-examples)");
        sections.push("7. [Key Features](#key-features)");
        sections.push("8. [DTO Field Syntax](#dto-field-syntax)");
        sections.push("9. [Method Call Syntax](#method-call-syntax)");
        sections.push("10. [Function Auto-Distribution Details](#function-auto-distribution-details)");
        sections.push("11. [Entity Naming Rules](#entity-naming-rules)");
        sections.push("12. [Validation Rules](#validation-rules)");
        sections.push("13. [Best Practices](#best-practices)");
        sections.push("");
        sections.push("## Entity Types");
        sections.push("");
        sections.push("TypedMind supports the following entity types:");
        sections.push("");
        sections.push("| Entity Type | Description |");
        sections.push("|------------|-------------|");
        const entityDescriptions = {
          Program: "Defines an application entry point",
          File: "Defines a source code file",
          Function: "Defines a function with its type signature",
          Class: "Defines a class with inheritance",
          ClassFile: "Combines class and file definitions in one entity - perfect for services, controllers, and modules",
          Constants: "Defines a constants/configuration file",
          DTO: "Defines a Data Transfer Object for data structures (config, parameters, serialization) - NO function fields allowed",
          Asset: "Defines a static asset",
          UIComponent: "Defines a UI component (&! for root)",
          RunParameter: "Defines a runtime parameter",
          Dependency: "Defines an external dependency"
        };
        for (const typeName of parser_patterns_1.ENTITY_TYPE_NAMES) {
          const desc = entityDescriptions[typeName];
          if (desc) {
            sections.push(`| ${typeName} | ${desc} |`);
          }
        }
        sections.push("");
        sections.push("## Entity Patterns");
        sections.push("");
        sections.push("### Shortform Syntax Patterns");
        sections.push("");
        sections.push("| Entity | Pattern | Example | Regex |");
        sections.push("|--------|---------|---------|-------|");
        for (const [name, pattern] of Object.entries(parser_patterns_1.ENTITY_PATTERNS)) {
          const desc = parser_patterns_1.PATTERN_DESCRIPTIONS[name];
          if (desc) {
            const entityName = this.formatPatternName(name);
            sections.push(`| **${entityName}** | \`${desc.pattern}\` | \`${desc.example}\` | \`${pattern.source}\` |`);
          }
        }
        sections.push("");
        sections.push("**Note:** Version format - The parser strips the 'v' prefix from versions. Both `v1.0.0` and `1.0.0` are stored as `1.0.0`.");
        sections.push("");
        sections.push("## Continuation Patterns");
        sections.push("");
        sections.push("These patterns match continuation lines that add properties to entities:");
        sections.push("");
        sections.push("| Pattern | Description | Example |");
        sections.push("|---------|-------------|---------|");
        const continuationInfo = {
          IMPORTS: { desc: "Entity imports", example: "<- [Database, UserModel]" },
          EXPORTS: { desc: "Entity exports", example: "-> [createUser, getUser]" },
          CALLS: { desc: "Function calls", example: "~> [validate, save]" },
          INPUT: { desc: "Function input DTO", example: "<- UserCreateDTO" },
          OUTPUT: { desc: "Function output DTO", example: "-> UserDTO" },
          METHODS: { desc: "Class methods", example: "=> [create, read, update]" },
          AFFECTS: { desc: "Function affects UI", example: "~ [UserList, UserForm]" },
          CONTAINS: { desc: "UI component contains", example: "> [Header, Footer]" },
          CONTAINED_BY: { desc: "UI component parent", example: "< [Dashboard]" },
          CONTAINS_PROGRAM: { desc: "Asset contains program", example: ">> ClientApp" },
          DTO_FIELD: { desc: "DTO field definition", example: '- name: string "User name"' },
          COMMENT: { desc: "Comment line", example: "# This is a comment" },
          DESCRIPTION: { desc: "Entity description", example: '"Creates a new user"' },
          DEFAULT_VALUE: { desc: "Parameter default", example: '= "default-value"' },
          CONSUMES: { desc: "Function consumes params", example: "$< [DATABASE_URL, API_KEY]" }
        };
        for (const [name] of Object.entries(parser_patterns_1.CONTINUATION_PATTERNS)) {
          const info = continuationInfo[name];
          if (info) {
            sections.push(`| ${this.formatPatternName(name)} | ${info.desc} | \`${info.example}\` |`);
          }
        }
        sections.push("");
        sections.push("## General Patterns");
        sections.push("");
        sections.push("These patterns are used for general parsing tasks:");
        sections.push("");
        const generalInfo = {
          ENTITY_DECLARATION: "Detects any entity declaration line",
          LONGFORM_DECLARATION: "Detects longform syntax declarations",
          CONTINUATION: "Detects continuation lines for entity properties",
          IMPORT_STATEMENT: "Matches import statements (@import or import)",
          INLINE_COMMENT: "Extracts inline comments from lines"
        };
        for (const [name, pattern] of Object.entries(parser_patterns_1.GENERAL_PATTERNS)) {
          const desc = generalInfo[name];
          if (desc) {
            sections.push(`### ${this.formatPatternName(name)}`);
            sections.push("");
            sections.push(`**Description:** ${desc}`);
            sections.push("");
            sections.push(`**Regex:** \`${pattern.source}\``);
            sections.push("");
          }
        }
        sections.push("## Quick Reference Example");
        sections.push("");
        sections.push("```tmd");
        sections.push("TodoApp -> main v1.0.0                      # Program");
        sections.push("main @ src/index.ts:                        # File");
        sections.push("  <- [UserService]");
        sections.push("  -> [startApp]");
        sections.push("");
        sections.push("UserService #: src/services/user.ts         # ClassFile (fusion)");
        sections.push("  <- [UserDTO]");
        sections.push("  => [createUser, findUser]");
        sections.push("");
        sections.push("startApp :: () => void                      # Function");
        sections.push("  ~> [createUser]");
        sections.push("");
        sections.push("createUser :: (data: UserDTO) => UserDTO    # Function");
        sections.push("  <- UserDTO                                # Input DTO");
        sections.push("  -> UserDTO                                # Output DTO");
        sections.push("");
        sections.push("UserDTO %                                    # DTO");
        sections.push('  - name: string "User name"');
        sections.push('  - email: string "Email"');
        sections.push("");
        sections.push("# Example showing other entity types:");
        sections.push('App &! "Root component"                     # UIComponent (root)');
        sections.push('DATABASE_URL $env "DB connection" (required) # RunParameter');
        sections.push("Config ! src/config.ts                      # Constants");
        sections.push('Logo ~ "Company logo"                       # Asset');
        sections.push('react ^ "UI library" v18.0.0                # Dependency');
        sections.push("```");
        sections.push("");
        sections.push("## Comprehensive Examples");
        sections.push("");
        sections.push("### Complete Application Example");
        sections.push("```tmd");
        sections.push("# Program definition");
        sections.push('TodoApp -> main "Todo application" v1.0.0');
        sections.push("");
        sections.push("# Entry file");
        sections.push("main @ src/index.ts:");
        sections.push("  <- [TodoService, AuthService]");
        sections.push("  -> [startApp]");
        sections.push("");
        sections.push("# Start function with auto-distribution");
        sections.push("startApp :: () => Promise<void>");
        sections.push('  "Starts the application with all dependencies"');
        sections.push("  <- [ConfigDTO, initializeDatabase, AuthService, TodoApp, DATABASE_URL]");
        sections.push("  # Auto-distributed to:");
        sections.push("  # input: ConfigDTO");
        sections.push("  # calls: [initializeDatabase, AuthService]");
        sections.push("  # affects: [TodoApp]");
        sections.push("  # consumes: [DATABASE_URL]");
        sections.push("");
        sections.push("# ClassFile fusion - combines class and file");
        sections.push("TodoService #: src/services/todo.ts <: BaseService");
        sections.push("  <- [TodoDTO, CreateTodoDTO, Database, Logger]");
        sections.push("  => [createTodo, getTodos, updateTodo, deleteTodo]");
        sections.push("  -> [todoHelper]  # Additional export");
        sections.push("");
        sections.push("# Function with method calls");
        sections.push("createTodo :: (data: CreateTodoDTO) => Promise<TodoDTO>");
        sections.push("  <- CreateTodoDTO  # Input DTO");
        sections.push("  -> TodoDTO        # Output DTO");
        sections.push("  ~> [validateTodo, Database.insert, Logger.info]  # Method calls");
        sections.push("  ~ [TodoList]      # Affects UI");
        sections.push("");
        sections.push("# DTOs with comprehensive field syntax");
        sections.push('CreateTodoDTO % "Data for creating a todo"');
        sections.push('  - title: string "Todo title"');
        sections.push('  - description?: string "Optional description"');
        sections.push('  - dueDate: Date "Due date" (optional)');
        sections.push('  - priority: number "Priority level (1-5)"');
        sections.push('  - tags: string[] "Associated tags"');
        sections.push('  - metadata: object "Additional metadata"');
        sections.push("");
        sections.push('TodoDTO % "Complete todo object"');
        sections.push('  - id: string "Unique identifier"');
        sections.push('  - title: string "Todo title"');
        sections.push('  - description: string "Description" (optional)');
        sections.push('  - completed: boolean "Completion status"');
        sections.push('  - dueDate: Date "Due date" (optional)');
        sections.push('  - createdAt: Date "Creation timestamp"');
        sections.push('  - updatedAt: Date "Last update timestamp"');
        sections.push("");
        sections.push("# UI Components with containment");
        sections.push('TodoApp &! "Root todo application"');
        sections.push("  > [Header, TodoList, CreateForm, Footer]");
        sections.push("");
        sections.push('TodoList & "List of todos"');
        sections.push("  < [TodoApp]");
        sections.push("  > [TodoItem]");
        sections.push("");
        sections.push("# Runtime parameters");
        sections.push('DATABASE_URL $env "PostgreSQL connection string" (required)');
        sections.push('API_KEY $env "External API key"');
        sections.push('  = "default-dev-key"');
        sections.push("");
        sections.push("# External dependencies");
        sections.push('react ^ "React framework" v18.0.0');
        sections.push('express ^ "Web framework" v4.18.0');
        sections.push("```");
        sections.push("");
        sections.push("## Key Features");
        sections.push("");
        sections.push("### ClassFile Fusion (`#:`)");
        sections.push("Combines Class and File into one entity - perfect for services/controllers:");
        sections.push("```tmd");
        sections.push("UserService #: src/services/user.ts <: BaseService");
        sections.push("  <- [Database, Logger]       # File imports");
        sections.push("  => [create, update, delete] # Class methods");
        sections.push("  -> [userHelper]             # Additional exports");
        sections.push("```");
        sections.push("");
        sections.push("### Function Auto-Distribution");
        sections.push("The `<- [...]` syntax intelligently categorizes mixed dependencies:");
        sections.push("```tmd");
        sections.push("processOrder :: (order: OrderDTO) => void");
        sections.push("  <- [OrderDTO, validateOrder, Database, OrderUI, API_KEY]");
        sections.push("  # Auto-distributed: input (DTO), calls (Functions/Classes),");
        sections.push("  # affects (UI), consumes (RunParams/Assets/Constants)");
        sections.push("```");
        sections.push("");
        sections.push("#### Distribution Rules");
        sections.push("");
        sections.push("| Entity Type | Distributed To | Description |");
        sections.push("|-------------|----------------|-------------|");
        sections.push("| Function | `calls` | Function calls another function |");
        sections.push("| Class/ClassFile | `calls` | Function calls class methods |");
        sections.push("| UIComponent | `affects` | Function modifies UI state |");
        sections.push("| RunParameter | `consumes` | Function uses runtime parameter |");
        sections.push("| Asset | `consumes` | Function uses static asset |");
        sections.push("| Constants | `consumes` | Function uses configuration |");
        sections.push("| Dependency | `consumes` | Function uses external library |");
        sections.push("| DTO (single) | `input` | Function takes DTO as parameter |");
        sections.push("| DTO (multiple) | ignored | Use explicit `<- DTOName` for input |");
        sections.push("");
        sections.push("#### Auto-Distribution Examples");
        sections.push("```tmd");
        sections.push("# Mixed dependencies before auto-distribution");
        sections.push("processPayment :: (payment: PaymentDTO) => Receipt");
        sections.push("  <- [PaymentDTO, validateCard, PaymentGateway, PaymentUI, STRIPE_KEY, stripe]");
        sections.push("");
        sections.push("# After auto-distribution:");
        sections.push("# input: PaymentDTO");
        sections.push("# calls: [validateCard, PaymentGateway]");
        sections.push("# affects: [PaymentUI]");
        sections.push("# consumes: [STRIPE_KEY, stripe]");
        sections.push("```");
        sections.push("");
        sections.push("### Method Call Syntax");
        sections.push("");
        sections.push("Functions can call other functions and class methods using the `~>` operator:");
        sections.push("");
        sections.push("#### Basic Function Calls");
        sections.push("```tmd");
        sections.push("processData :: () => void");
        sections.push("  ~> [validateInput, transform, saveResult]");
        sections.push("```");
        sections.push("");
        sections.push("#### Class Method Calls");
        sections.push("```tmd");
        sections.push("# Calling methods on Classes/ClassFiles");
        sections.push("createUser :: (data: UserDTO) => void");
        sections.push("  ~> [UserService.create, Logger.info]");
        sections.push("");
        sections.push("# Recursive/self-referencing calls are allowed");
        sections.push("fibonacci :: (n: number) => number");
        sections.push("  ~> [fibonacci]  # Recursive call to itself");
        sections.push("```");
        sections.push("");
        sections.push("#### Method Call Rules");
        sections.push("- Direct function names: `functionName`");
        sections.push("- Class methods: `ClassName.methodName`");
        sections.push("- ClassFile methods: `ClassFileName.methodName`");
        sections.push("- Called methods must be defined in the entity's `=> [...]` list");
        sections.push("- Circular function calls are detected and reported as errors");
        sections.push("- Self-referencing (recursive) calls are allowed");
        sections.push("");
        sections.push("## Validation Rules");
        sections.push("");
        sections.push("### Bidirectional Consistency");
        sections.push("TypedMind automatically maintains bidirectional relationships:");
        sections.push("- Function affects UIComponent \u2192 UIComponent.affectedBy includes Function");
        sections.push("- Function consumes RunParameter \u2192 RunParameter.consumedBy includes Function");
        sections.push("- UIComponent contains child \u2192 child.containedBy includes parent");
        sections.push("- Asset contains Program \u2192 Program must exist");
        sections.push("");
        sections.push("### Entity Naming Rules");
        sections.push("");
        sections.push("#### Valid Entity Names");
        sections.push("- Must start with letter (a-z, A-Z) or underscore (_)");
        sections.push("- Can contain letters, numbers, underscores");
        sections.push("- Case-sensitive (UserService \u2260 userService)");
        sections.push("- Unicode letters supported (e.g., \u540D\u524D)");
        sections.push("");
        sections.push("#### Invalid Entity Names");
        sections.push("- Cannot start with numbers: `123Name` \u274C");
        sections.push("- Cannot contain spaces: `User Service` \u274C");
        sections.push("- Cannot use kebab-case: `user-service` \u274C");
        sections.push("- Cannot be reserved keywords (varies by implementation)");
        sections.push("");
        sections.push("#### Naming Examples");
        sections.push("```tmd");
        sections.push("# Valid names");
        sections.push("UserService      # PascalCase");
        sections.push("userService      # camelCase");
        sections.push("user_service     # snake_case");
        sections.push("_privateService  # underscore prefix");
        sections.push("Service2         # numbers allowed (not first)");
        sections.push("\u540D\u524DService      # Unicode letters");
        sections.push("");
        sections.push("# Invalid names");
        sections.push("123Service       # starts with number");
        sections.push('"User Service"   # contains spaces');
        sections.push("user-service     # kebab-case");
        sections.push("```");
        sections.push("");
        sections.push("#### Uniqueness Rules");
        sections.push("- Names must be unique across ALL entity types");
        sections.push("- Exception: ClassFile can replace separate Class + File with same name");
        sections.push("- The validator will suggest using ClassFile fusion when detecting Class/File name conflicts");
        sections.push("");
        sections.push("### Reference Type Validation");
        sections.push("Each reference type has specific allowed source and target entity types:");
        sections.push("");
        sections.push("| Reference | From Entities | To Entities |");
        sections.push("|-----------|---------------|-------------|");
        sections.push("| imports | File, Class, ClassFile | Function, Class, Constants, DTO, etc. |");
        sections.push("| exports | File, ClassFile | Function, Class, Constants, DTO, etc. |");
        sections.push("| calls | Function | Function, Class (for methods) |");
        sections.push("| extends | Class, ClassFile | Class, ClassFile |");
        sections.push("| affects | Function | UIComponent |");
        sections.push("| consumes | Function | RunParameter, Asset, Constants |");
        sections.push("");
        sections.push("## Parser Intelligence");
        sections.push("");
        sections.push("### Context-Aware Parsing");
        sections.push("The parser uses look-ahead to determine entity types:");
        sections.push("- `Name @ path:` followed by `=> [methods]` \u2192 Class entity");
        sections.push("- `Name @ path:` without methods \u2192 File entity");
        sections.push("- Inline comments (`# comment`) are extracted and stored separately");
        sections.push("- Mixed shortform/longform syntax is supported in the same file");
        sections.push("");
        sections.push("### Import Resolution");
        sections.push("- Circular imports are detected and reported as errors");
        sections.push('- Aliased imports prefix all imported entities: `@import "./auth.tmd" as Auth`');
        sections.push("- Nested imports are resolved recursively");
        sections.push("- Import paths can be relative or absolute");
        sections.push("");
        sections.push("## Operator Quick Reference");
        sections.push("");
        sections.push("```");
        sections.push("->  Entry point (Program) or Exports (File/Function)");
        sections.push("<-  Imports or Dependencies");
        sections.push("@   File path location");
        sections.push("#:  ClassFile fusion (class + file)");
        sections.push("::  Function signature");
        sections.push("<:  Class inheritance");
        sections.push("!   Constants marker");
        sections.push("%   DTO marker");
        sections.push("~   Asset description or Function affects UI");
        sections.push("&   UIComponent (&! for root)");
        sections.push("$   RunParameter ($env, $iam, etc.)");
        sections.push("^   External dependency");
        sections.push("~>  Function calls");
        sections.push("=>  Class methods");
        sections.push(">>  Asset contains program");
        sections.push(">   UIComponent contains");
        sections.push("<   UIComponent contained by");
        sections.push("$<  Function consumes parameters");
        sections.push(":   Constants schema");
        sections.push("=   Parameter default value");
        sections.push("```");
        sections.push("");
        sections.push("### DTOs vs Classes");
        sections.push("**DTOs**: Pure data structures (NO functions allowed)");
        sections.push("**Classes**: Behavior and business logic (have methods)");
        sections.push("```tmd");
        sections.push("UserDTO %                            # DTO: data only");
        sections.push('  - name: string "User name"');
        sections.push("  - email: string");
        sections.push("");
        sections.push("UserService #: src/services/user.ts # Class: behavior");
        sections.push("  => [createUser, findUser]         # Has methods");
        sections.push("```");
        sections.push("");
        sections.push("### DTO Field Syntax");
        sections.push("");
        sections.push("DTOs support rich type definitions for fields:");
        sections.push("");
        sections.push("#### Basic Field Syntax");
        sections.push("```tmd");
        sections.push("UserDTO %");
        sections.push('  - name: string "User full name"           # Required field');
        sections.push("  - email: string                           # No description");
        sections.push('  - age?: number "Optional age"             # Optional field with ?');
        sections.push('  - nickname: string "Nickname" (optional)  # Optional with annotation');
        sections.push("```");
        sections.push("");
        sections.push("#### Supported Field Types");
        sections.push("- **Primitives**: `string`, `number`, `boolean`, `any`, `void`, `null`, `undefined`");
        sections.push("- **Arrays**: `string[]`, `number[]`, `UserDTO[]`, `any[][]` (multi-dimensional)");
        sections.push("- **Objects**: `object`, `{ key: string, value: number }` (inline objects)");
        sections.push('- **Unions**: `string | number`, `"active" | "inactive" | "pending"`');
        sections.push("- **Tuples**: `[string, number]`, `[boolean, string, number]`");
        sections.push("- **DTO References**: `UserDTO`, `AddressDTO` (must be defined entities)");
        sections.push("- **Complex Types**: `Record<string, any>`, `Map<string, number>`, `Date`");
        sections.push("");
        sections.push("#### Complex Field Examples");
        sections.push("```tmd");
        sections.push('ComplexDTO % "Advanced field types"');
        sections.push('  - id: string "Unique identifier"');
        sections.push('  - metadata?: object "Optional metadata"');
        sections.push('  - tags: string[] "Array of tags"');
        sections.push('  - status: "draft" | "published" | "archived" "Union type"');
        sections.push('  - coordinates: [number, number] "Tuple for lat/lng"');
        sections.push('  - config: { apiUrl: string, timeout: number } "Inline object"');
        sections.push('  - matrix: number[][] "2D array"');
        sections.push('  - user: UserDTO "Reference to another DTO"');
        sections.push('  - children?: ComplexDTO[] "Self-referencing array"');
        sections.push("```");
        sections.push("");
        sections.push("#### Field Validation Rules");
        sections.push("- Field names must be valid identifiers (no spaces, start with letter/underscore)");
        sections.push("- Field types cannot be `Function` or contain function types");
        sections.push("- Optional fields can use either `?` suffix or `(optional)` annotation");
        sections.push("- Referenced DTOs must exist in the same scope");
        sections.push("");
        sections.push("## Advanced Patterns via Purpose Fields");
        sections.push("");
        sections.push("The purpose field can capture advanced programming patterns that TypedMind structure alone cannot represent:");
        sections.push("");
        sections.push("### Pattern Examples");
        sections.push("```tmd");
        sections.push("# Example patterns - showing syntax only (not complete programs)");
        sections.push("# Async/Concurrent");
        sections.push('processWorker :: (jobs: Channel<Job>) => void "ASYNC: Goroutine worker"');
        sections.push('DataChannel % "CHANNEL: MPSC unbounded"');
        sections.push("");
        sections.push("# Generics/Templates");
        sections.push('Container<T> <: Base "GENERIC<T: Display>: Type-parameterized"');
        sections.push("");
        sections.push("# Dependency Injection");
        sections.push('UserService #: src/service.ts "@Injectable @Scope(singleton)"');
        sections.push("");
        sections.push("# Event-Driven");
        sections.push('Button & "Component" "EVENTS: onClick, onHover, onFocus"');
        sections.push('DataEmitter <: EventEmitter "EMITS: data, error, close"');
        sections.push("");
        sections.push("# Resource Management");
        sections.push('FileReader :: (path: string) => string "RAII: auto-closes handle"');
        sections.push('Connection % "Context manager: auto-commit on scope exit"');
        sections.push("");
        sections.push("# Build Configuration");
        sections.push('DebugLogger ! src/debug.ts "BUILD: #ifdef DEBUG only"');
        sections.push("");
        sections.push("# Pattern Matching");
        sections.push('handleOption :: (val: Option<T>) => string "MATCH: Some(x) | None"');
        sections.push("");
        sections.push("# Middleware/Pipeline");
        sections.push('AuthMiddleware :: (req, res, next) => void "MIDDLEWARE: JWT validation"');
        sections.push('Pipeline @ src/pipeline.ts: "PIPELINE: cors -> auth -> router"');
        sections.push("```");
        sections.push("");
        sections.push("### Semantic Conventions");
        sections.push("Establish project-specific conventions in purpose fields:");
        sections.push("- **ASYNC/AWAIT**: Async functions and promises");
        sections.push("- **GENERIC<T>**: Generic type parameters");
        sections.push("- **@Decorator**: Decorators and annotations");
        sections.push("- **EVENTS**: Event emitters and handlers");
        sections.push("- **CHANNEL**: Concurrent communication");
        sections.push("- **RAII/Context**: Resource management");
        sections.push("- **BUILD**: Conditional compilation");
        sections.push("- **PIPELINE**: Middleware chains");
        sections.push("");
        sections.push("## Entity Capability Matrix");
        sections.push("");
        sections.push("| Entity | Can Import | Can Export | Has Methods | Can Extend | Has Path |");
        sections.push("|--------|------------|------------|-------------|------------|----------|");
        sections.push("| File | \u2705 | \u2705 | \u274C | \u274C | \u2705 |");
        sections.push("| Class | \u274C | \u274C | \u2705 | \u2705 | \u274C |");
        sections.push("| ClassFile | \u2705 | \u2705 | \u2705 | \u2705 | \u2705 |");
        sections.push("| Function | \u274C | \u274C | \u274C | \u274C | \u274C |");
        sections.push("| DTO | \u274C | \u274C | \u274C | \u274C | \u274C |");
        sections.push("| Constants | \u274C | \u274C | \u274C | \u274C | \u2705 |");
        sections.push("| Asset | \u274C | \u274C | \u274C | \u274C | \u274C |");
        sections.push("| UIComponent | \u274C | \u274C | \u274C | \u274C | \u274C |");
        sections.push("| RunParameter | \u274C | \u274C | \u274C | \u274C | \u274C |");
        sections.push("| Dependency | \u274C | \u274C | \u274C | \u274C | \u274C |");
        sections.push("");
        sections.push("## Valid RunParameter Types");
        sections.push("");
        sections.push("RunParameters use `$type` syntax with these valid types:");
        sections.push("- **$env**: Environment variable");
        sections.push("- **$iam**: IAM role or permission");
        sections.push("- **$runtime**: Runtime configuration");
        sections.push("- **$config**: Configuration parameter");
        sections.push("");
        sections.push('Example: `DATABASE_URL $env "Connection string" (required)`');
        sections.push("");
        sections.push("## Export Rules");
        sections.push("");
        sections.push("### What Files and ClassFiles Can Export");
        sections.push("\u2705 **Can Export:**");
        sections.push("- Functions");
        sections.push("- Classes");
        sections.push("- Constants");
        sections.push("- DTOs");
        sections.push("");
        sections.push("\u274C **Cannot Export:**");
        sections.push("- Assets (static files, not code)");
        sections.push("- UIComponents (UI structure, not modules)");
        sections.push("- RunParameters (runtime config, not code)");
        sections.push("- Dependencies (external packages)");
        sections.push("");
        sections.push("### ClassFile Auto-Export");
        sections.push("ClassFiles automatically export themselves. Manual export creates duplication:");
        sections.push("```tmd");
        sections.push("UserService #: src/user.ts");
        sections.push("  -> [helper]  # \u2705 Exports helper");
        sections.push("  # -> [UserService]  # \u274C Redundant - auto-exported");
        sections.push("```");
        sections.push("");
        sections.push("## Common Pitfalls");
        sections.push("");
        sections.push("### \u274C Don't Import Class Methods Directly");
        sections.push("```tmd");
        sections.push("# Wrong");
        sections.push("File @ src/app.ts:");
        sections.push("  <- [UserService.createUser]  # Can't import methods");
        sections.push("");
        sections.push("# Right");
        sections.push("File @ src/app.ts:");
        sections.push("  <- [UserService]  # Import the ClassFile");
        sections.push("  # Now createUser method is available");
        sections.push("```");
        sections.push("");
        sections.push("### \u274C Don't Call ClassFiles Directly");
        sections.push("```tmd");
        sections.push("# Wrong");
        sections.push("processData :: () => void");
        sections.push("  ~> [DataProcessor]  # Can't call ClassFile");
        sections.push("");
        sections.push("# Right");
        sections.push("processData :: () => void");
        sections.push("  ~> [process]  # Call the method, not the ClassFile");
        sections.push("```");
        sections.push("");
        sections.push("### \u274C Don't Give Classes Import/Export");
        sections.push("```tmd");
        sections.push("# Wrong - Classes can't import");
        sections.push("MyClass <: Base");
        sections.push("  <- [Logger]  # Classes don't support imports!");
        sections.push("");
        sections.push("# Right - Use ClassFile for import capability");
        sections.push("MyClass #: src/my-class.ts <: Base");
        sections.push("  <- [Logger]  # ClassFiles can import");
        sections.push("```");
        sections.push("");
        sections.push("### \u274C Don't Confuse Entity Capabilities");
        sections.push("```tmd");
        sections.push("# Wrong - Mixed capabilities");
        sections.push("DataFile @ src/data.ts:");
        sections.push("  => [processData]  # Files can't have methods!");
        sections.push("");
        sections.push("DataClass <: Base");
        sections.push("  @ src/data.ts:  # Classes can't have paths!");
        sections.push("```");
        sections.push("");
        sections.push("## DTO Field Syntax");
        sections.push("");
        sections.push("DTOs support comprehensive field definitions with types, descriptions, and optionality:");
        sections.push("");
        sections.push("### Field Patterns");
        sections.push("");
        sections.push("```tmd");
        sections.push("UserDTO %");
        sections.push('  - name: string "User full name"           # Required field');
        sections.push('  - email?: string "Email address"            # Optional field (? syntax)');
        sections.push('  - age: number "User age" (optional)        # Optional field (parentheses)');
        sections.push('  - tags: string[] "User tags"                # Array type');
        sections.push('  - metadata: object "Additional data"        # Generic object type');
        sections.push('  - createdAt: Date "Account creation"        # Built-in types');
        sections.push('  - profile: ProfileDTO "User profile"       # Reference to other DTO');
        sections.push("```");
        sections.push("");
        sections.push("### Supported Types");
        sections.push("- **Primitives**: `string`, `number`, `boolean`, `Date`");
        sections.push("- **Collections**: `string[]`, `number[]`, `Type[]`");
        sections.push("- **Generic**: `object`, `any`");
        sections.push("- **DTO References**: `OtherDTO` (must be defined elsewhere)");
        sections.push("- **Complex Types**: `Promise<Type>`, `Optional<Type>`, custom types");
        sections.push("");
        sections.push("### Field Rules");
        sections.push("- Field names must be valid identifiers (alphanumeric + underscore)");
        sections.push("- Types cannot be `Function` or reference function names");
        sections.push("- Descriptions are optional but recommended for clarity");
        sections.push("- Optional fields can use `?` suffix or `(optional)` annotation");
        sections.push("");
        sections.push("## Method Call Syntax");
        sections.push("");
        sections.push("Functions can call other functions, class methods, or static methods using the `~>` operator:");
        sections.push("");
        sections.push("### Call Patterns");
        sections.push("");
        sections.push("```tmd");
        sections.push("# Function calls");
        sections.push("processUser :: (data: UserDTO) => void");
        sections.push("  ~> [validateInput, createUser, sendNotification]");
        sections.push("");
        sections.push("# Class method calls (ClassName.methodName)");
        sections.push("handleRequest :: (req: Request) => Response");
        sections.push("  ~> [UserService.findById, OrderService.create]");
        sections.push("");
        sections.push("# Mixed calls");
        sections.push("complexProcess :: () => void");
        sections.push("  ~> [validateAuth, Database.connect, UserService.update, logEvent]");
        sections.push("```");
        sections.push("");
        sections.push("### Method Call Rules");
        sections.push("- Function names: Direct references to other Function entities");
        sections.push("- Class methods: `ClassName.methodName` where ClassName exists and has method");
        sections.push("- Static calls: `ModuleName.staticMethod` for utility functions");
        sections.push("- All called entities must be defined in the program");
        sections.push("- Circular function calls are detected and reported as warnings");
        sections.push("");
        sections.push("## Function Auto-Distribution Details");
        sections.push("");
        sections.push("The `<- [...]` syntax intelligently categorizes mixed dependencies based on entity types:");
        sections.push("");
        sections.push("### Distribution Rules");
        sections.push("");
        sections.push("| Entity Type | Distributed To | Description |");
        sections.push("|-------------|----------------|-------------|");
        sections.push("| Function, Class, ClassFile | `calls` (`~>`) | Function calls another function or class method |");
        sections.push("| UIComponent | `affects` (`~`) | Function modifies UI component state |");
        sections.push("| RunParameter, Asset, Constants, Dependency | `consumes` (`$<`) | Function uses external resources |");
        sections.push("| DTO (single) | `input` (`<-`) | Function takes DTO as input parameter |");
        sections.push("| DTO (multiple) | Error | Functions can only have one input DTO |");
        sections.push("");
        sections.push("### Distribution Examples");
        sections.push("");
        sections.push("```tmd");
        sections.push("# Mixed dependency list");
        sections.push("processOrder :: (order: OrderDTO) => Promise<Receipt>");
        sections.push("  <- [OrderDTO, validateOrder, PaymentService, OrderUI, STRIPE_KEY, Database]");
        sections.push("");
        sections.push("# Automatically distributed to:");
        sections.push("# input: OrderDTO");
        sections.push("# calls: [validateOrder, PaymentService, Database]");
        sections.push("# affects: [OrderUI]");
        sections.push("# consumes: [STRIPE_KEY]");
        sections.push("```");
        sections.push("");
        sections.push("### Auto-Distribution Benefits");
        sections.push("- **Concise syntax**: Single list instead of multiple continuation lines");
        sections.push("- **Type safety**: Parser validates entity types and relationships");
        sections.push("- **Bidirectional links**: All relationships are automatically maintained");
        sections.push("- **Error detection**: Invalid entity types or missing entities are caught");
        sections.push("");
        sections.push("## Entity Naming Rules");
        sections.push("");
        sections.push("### Naming Requirements");
        sections.push("- **Global uniqueness**: Entity names must be unique across ALL entity types");
        sections.push("- **Valid identifiers**: Must start with letter, can contain letters, numbers, underscores");
        sections.push("- **Case sensitive**: `UserService` and `userservice` are different entities");
        sections.push("- **Reserved names**: Cannot use TypedMind keywords or operators as names");
        sections.push("");
        sections.push("### ClassFile Fusion Exception");
        sections.push("ClassFile entities can replace separate Class + File pairs:");
        sections.push("");
        sections.push("```tmd");
        sections.push("# \u274C Naming conflict: separate Class and File");
        sections.push("UserService <: BaseService");
        sections.push("  => [createUser, findUser]");
        sections.push("");
        sections.push("UserService @ src/services/user.ts:  # ERROR: Name conflict!");
        sections.push("  -> [UserService]");
        sections.push("");
        sections.push("# \u2705 Solution: Use ClassFile fusion");
        sections.push("UserService #: src/services/user.ts <: BaseService");
        sections.push("  => [createUser, findUser]                 # Class methods");
        sections.push("  <- [Database, Logger]                     # File imports");
        sections.push("  # UserService is auto-exported from file");
        sections.push("```");
        sections.push("");
        sections.push("### Name Validation Errors");
        sections.push("Common naming validation errors:");
        sections.push("- **Duplicate names**: Two entities with the same name");
        sections.push("- **Invalid characters**: Names with spaces, hyphens, or special characters");
        sections.push("- **Reserved keywords**: Using TypedMind operators as entity names");
        sections.push("- **Empty names**: Missing or empty entity names");
        sections.push("");
        sections.push("## Best Practices");
        sections.push("");
        sections.push("- **Use ClassFile (`#:`)** for services, controllers, repositories");
        sections.push("- **Group by feature**: Keep related entities together");
        sections.push("- **Mix dependencies freely**: Parser auto-categorizes them");
        sections.push("- **DTOs for data, Classes for behavior**: Keep them separate");
        sections.push("- **Leverage purpose fields**: Document async, generics, DI, events, etc.");
        sections.push("- **Establish conventions**: Create project-specific semantic patterns");
        sections.push("- **Bidirectional links**: Automatically maintained by the parser");
        sections.push("- **Check capability matrix**: Ensure entities have the right capabilities");
        sections.push("- **Name entities clearly**: Use descriptive, unique names across all types");
        sections.push("- **Document field types**: Include descriptions for all DTO fields");
        sections.push("- **Use method calls correctly**: Reference methods as `ClassName.methodName`");
        return sections.join("\n");
      }
      generateJSON() {
        const grammar = {
          entityTypes: parser_patterns_1.ENTITY_TYPE_NAMES,
          patterns: {
            entity: this.patternsToJSON(parser_patterns_1.ENTITY_PATTERNS),
            continuation: this.patternsToJSON(parser_patterns_1.CONTINUATION_PATTERNS),
            general: this.patternsToJSON(parser_patterns_1.GENERAL_PATTERNS)
          },
          descriptions: parser_patterns_1.PATTERN_DESCRIPTIONS
        };
        return JSON.stringify(grammar, null, 2);
      }
      generateEBNF() {
        const lines = [];
        lines.push("(* TypedMind DSL Grammar in EBNF notation *)");
        lines.push("");
        lines.push("(* Document Structure *)");
        lines.push("document = (import_statement | entity | comment | empty_line)*;");
        lines.push("");
        lines.push("(* Import Statements *)");
        lines.push('import_statement = ("@import" | "import") string_literal ["as" identifier];');
        lines.push("");
        lines.push("(* Entity Declarations *)");
        lines.push("entity = program | file | function | class | classfile | dto | asset | component | parameter | dependency | constants;");
        lines.push("");
        lines.push("(* Program Entity *)");
        lines.push('program = identifier "->" identifier [string_literal] ["v" version];');
        lines.push('version = digit+ "." digit+ "." digit+;');
        lines.push("");
        lines.push("(* File Entity *)");
        lines.push('file = identifier "@" path ":" [file_body];');
        lines.push("file_body = (imports | exports | description)*;");
        lines.push('imports = "<-" "[" identifier_list "]";');
        lines.push('exports = "->" "[" identifier_list "]";');
        lines.push("");
        lines.push("(* Function Entity *)");
        lines.push('function = identifier "::" signature [function_body];');
        lines.push("function_body = (description | input | output | calls | affects | consumes)*;");
        lines.push('input = "<-" identifier;');
        lines.push('output = "->" identifier;');
        lines.push('calls = "~>" "[" identifier_list "]";');
        lines.push('affects = "~" "[" identifier_list "]";');
        lines.push('consumes = "$<" "[" identifier_list "]";');
        lines.push("");
        lines.push("(* Class Entity *)");
        lines.push('class = identifier "<:" [identifier] ["," identifier_list] [class_body];');
        lines.push("class_body = (methods | description)*;");
        lines.push('methods = "=>" "[" identifier_list "]";');
        lines.push("");
        lines.push("(* ClassFile Entity *)");
        lines.push('classfile = identifier "#:" path ["<:" [identifier] ["," identifier_list]] [classfile_body];');
        lines.push("classfile_body = (imports | exports | methods | description)*;");
        lines.push("");
        lines.push("(* DTO Entity *)");
        lines.push('dto = identifier "%" [string_literal] [dto_body];');
        lines.push("dto_body = field_definition*;");
        lines.push('field_definition = "-" identifier ["?"] ":" type [string_literal] ["(" "optional" ")"];');
        lines.push("");
        lines.push("(* Asset Entity *)");
        lines.push('asset = identifier "~" string_literal [asset_body];');
        lines.push("asset_body = (contains_program)*;");
        lines.push('contains_program = ">>" identifier;');
        lines.push("");
        lines.push("(* UIComponent Entity *)");
        lines.push('component = identifier ("&" | "&!") string_literal [component_body];');
        lines.push("component_body = (contains | contained_by)*;");
        lines.push('contains = ">" "[" identifier_list "]";');
        lines.push('contained_by = "<" "[" identifier_list "]";');
        lines.push("");
        lines.push("(* RunParameter Entity *)");
        lines.push('parameter = identifier "$" param_type string_literal ["(" "required" ")"] [default_value];');
        lines.push('param_type = "env" | "iam" | "runtime" | "config";');
        lines.push('default_value = "=" string_literal;');
        lines.push("");
        lines.push("(* Dependency Entity *)");
        lines.push('dependency = identifier "^" string_literal ["v" version_spec];');
        lines.push("");
        lines.push("(* Constants Entity *)");
        lines.push('constants = identifier "!" path [":" identifier];');
        lines.push("");
        lines.push("(* Common Elements *)");
        lines.push('identifier = letter (letter | digit | "_")*;');
        lines.push('identifier_list = identifier ("," identifier)*;');
        lines.push(`string_literal = '"' character* '"';`);
        lines.push("path = string_literal;");
        lines.push("type = identifier;");
        lines.push('signature = "(" [parameters] ")" "=>" return_type;');
        lines.push("description = string_literal;");
        lines.push('comment = "#" character*;');
        lines.push("empty_line = whitespace*;");
        return lines.join("\n");
      }
      formatPatternName(name) {
        return name.split("_").map((word) => word.charAt(0) + word.slice(1).toLowerCase()).join(" ");
      }
      patternsToJSON(patterns) {
        const result = {};
        for (const [name, pattern] of Object.entries(patterns)) {
          result[name] = pattern.source;
        }
        return result;
      }
    };
    exports2.GrammarDocGenerator = GrammarDocGenerator;
  }
});

// ../typed-mind/dist/index.js
var require_dist = __commonJS({
  "../typed-mind/dist/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DSLChecker = exports2.detectSyntaxFormat = exports2.toggleSyntaxFormat = exports2.SyntaxGenerator = exports2.GrammarDocGenerator = exports2.PATTERN_DESCRIPTIONS = exports2.GENERAL_PATTERNS = exports2.CONTINUATION_PATTERNS = exports2.ENTITY_PATTERNS = exports2.GrammarValidator = exports2.LongformParser = exports2.ErrorFormatter = exports2.DSLValidator = exports2.DSLParser = void 0;
    var parser_1 = require_parser();
    var validator_1 = require_validator();
    var formatter_1 = require_formatter();
    var import_resolver_1 = require_import_resolver();
    var syntax_generator_1 = require_syntax_generator();
    var path_1 = require("path");
    __exportStar(require_branded_types(), exports2);
    __exportStar(require_result(), exports2);
    __exportStar(require_error_types(), exports2);
    __exportStar(require_entity_map(), exports2);
    __exportStar(require_entity_builder(), exports2);
    var parser_2 = require_parser();
    Object.defineProperty(exports2, "DSLParser", { enumerable: true, get: function() {
      return parser_2.DSLParser;
    } });
    var validator_2 = require_validator();
    Object.defineProperty(exports2, "DSLValidator", { enumerable: true, get: function() {
      return validator_2.DSLValidator;
    } });
    var formatter_2 = require_formatter();
    Object.defineProperty(exports2, "ErrorFormatter", { enumerable: true, get: function() {
      return formatter_2.ErrorFormatter;
    } });
    var longform_parser_1 = require_longform_parser();
    Object.defineProperty(exports2, "LongformParser", { enumerable: true, get: function() {
      return longform_parser_1.LongformParser;
    } });
    var grammar_validator_1 = require_grammar_validator();
    Object.defineProperty(exports2, "GrammarValidator", { enumerable: true, get: function() {
      return grammar_validator_1.GrammarValidator;
    } });
    var parser_patterns_1 = require_parser_patterns();
    Object.defineProperty(exports2, "ENTITY_PATTERNS", { enumerable: true, get: function() {
      return parser_patterns_1.ENTITY_PATTERNS;
    } });
    Object.defineProperty(exports2, "CONTINUATION_PATTERNS", { enumerable: true, get: function() {
      return parser_patterns_1.CONTINUATION_PATTERNS;
    } });
    Object.defineProperty(exports2, "GENERAL_PATTERNS", { enumerable: true, get: function() {
      return parser_patterns_1.GENERAL_PATTERNS;
    } });
    Object.defineProperty(exports2, "PATTERN_DESCRIPTIONS", { enumerable: true, get: function() {
      return parser_patterns_1.PATTERN_DESCRIPTIONS;
    } });
    var grammar_doc_generator_1 = require_grammar_doc_generator();
    Object.defineProperty(exports2, "GrammarDocGenerator", { enumerable: true, get: function() {
      return grammar_doc_generator_1.GrammarDocGenerator;
    } });
    var syntax_generator_2 = require_syntax_generator();
    Object.defineProperty(exports2, "SyntaxGenerator", { enumerable: true, get: function() {
      return syntax_generator_2.SyntaxGenerator;
    } });
    Object.defineProperty(exports2, "toggleSyntaxFormat", { enumerable: true, get: function() {
      return syntax_generator_2.toggleSyntaxFormat;
    } });
    Object.defineProperty(exports2, "detectSyntaxFormat", { enumerable: true, get: function() {
      return syntax_generator_2.detectSyntaxFormat;
    } });
    var DSLChecker2 = class {
      parser = new parser_1.DSLParser();
      validator;
      formatter = new formatter_1.ErrorFormatter();
      importResolver = new import_resolver_1.ImportResolver();
      syntaxGenerator = new syntax_generator_1.SyntaxGenerator();
      options;
      constructor(options = {}) {
        this.options = options;
        this.validator = new validator_1.DSLValidator(options);
      }
      /**
       * Get the current options
       */
      getOptions() {
        return this.options;
      }
      /**
       * Type-safe check method with branded types support
       */
      check(input, filePath) {
        const parseResult = this.parser.parse(input);
        const allEntities = new Map(parseResult.entities);
        const allErrors = [];
        if (parseResult.imports.length > 0 && filePath) {
          const basePath = (0, path_1.dirname)(filePath);
          const { resolvedEntities, errors } = this.importResolver.resolveImports(parseResult.imports, basePath);
          for (const [name, entity] of resolvedEntities) {
            if (allEntities.has(name)) {
              allErrors.push({
                position: entity.position,
                message: `Entity '${name}' conflicts with imported entity`,
                severity: "error"
              });
            } else {
              allEntities.set(name, entity);
            }
          }
          allErrors.push(...errors);
        }
        const result = this.validator.validate(allEntities, parseResult);
        result.errors.push(...allErrors);
        result.valid = result.errors.length === 0;
        if (!result.valid) {
          const lines = input.split("\n");
          for (const error of result.errors) {
            console.error(this.formatter.format(error, lines));
          }
        }
        return result;
      }
      /**
       * Enhanced check method that returns Result type for functional error handling
       */
      checkSafe(input, filePath) {
        const result = this.check(input, typeof filePath === "string" ? filePath : void 0);
        if (result.valid) {
          const graph = this.parse(input, typeof filePath === "string" ? filePath : void 0);
          return { _tag: "success", value: graph };
        } else {
          return { _tag: "failure", error: result.errors };
        }
      }
      /**
       * Type-safe parse method with branded types support
       */
      parse(input, filePath) {
        const parseResult = this.parser.parse(input);
        const allEntities = new Map(parseResult.entities);
        if (parseResult.imports.length > 0 && filePath) {
          const basePath = (0, path_1.dirname)(filePath);
          const { resolvedEntities } = this.importResolver.resolveImports(parseResult.imports, basePath);
          for (const [name, entity] of resolvedEntities) {
            if (!allEntities.has(name)) {
              allEntities.set(name, entity);
            }
          }
        }
        const dependencies = this.buildDependencyGraph(allEntities);
        return {
          entities: allEntities,
          dependencies,
          imports: parseResult.imports
        };
      }
      /**
       * Toggle the syntax format of DSL content between shortform and longform
       */
      toggleFormat(input, filePath) {
        const detection = this.syntaxGenerator.detectFormat(input);
        const targetFormat = detection.format === "longform" ? "shortform" : "longform";
        try {
          const graph = this.parse(input, filePath);
          if (targetFormat === "shortform") {
            return this.syntaxGenerator.toShortform(graph.entities);
          } else {
            return this.syntaxGenerator.toLongform(graph.entities);
          }
        } catch (error) {
          return {
            _tag: "failure",
            error: {
              message: error instanceof Error ? error.message : "Failed to parse content for format conversion"
            }
          };
        }
      }
      /**
       * Convert DSL content to shortform syntax using parsed entities
       */
      toShortform(input, filePath) {
        const graph = this.parse(input, filePath);
        return this.syntaxGenerator.toShortform(graph.entities);
      }
      /**
       * Convert DSL content to longform syntax using parsed entities
       */
      toLongform(input, filePath) {
        const graph = this.parse(input, filePath);
        return this.syntaxGenerator.toLongform(graph.entities);
      }
      /**
       * Detect the primary syntax format of DSL content
       */
      detectFormat(input) {
        return this.syntaxGenerator.detectFormat(input);
      }
      buildDependencyGraph(entities) {
        const graph = /* @__PURE__ */ new Map();
        for (const [name, entity] of entities) {
          const deps = [];
          if ("imports" in entity) {
            deps.push(...entity.imports.filter((imp) => !imp.includes("*")));
          }
          if ("calls" in entity) {
            deps.push(...entity.calls);
          }
          if (entity.type === "Program") {
            deps.push(entity.entry);
          }
          graph.set(name, deps);
        }
        return graph;
      }
    };
    exports2.DSLChecker = DSLChecker2;
  }
});

// src/server.ts
var import_node = __toESM(require_node3());

// ../../node_modules/.pnpm/vscode-languageserver-textdocument@1.0.12/node_modules/vscode-languageserver-textdocument/lib/esm/main.js
var FullTextDocument = class _FullTextDocument {
  constructor(uri, languageId, version, content) {
    this._uri = uri;
    this._languageId = languageId;
    this._version = version;
    this._content = content;
    this._lineOffsets = void 0;
  }
  get uri() {
    return this._uri;
  }
  get languageId() {
    return this._languageId;
  }
  get version() {
    return this._version;
  }
  getText(range) {
    if (range) {
      const start = this.offsetAt(range.start);
      const end = this.offsetAt(range.end);
      return this._content.substring(start, end);
    }
    return this._content;
  }
  update(changes, version) {
    for (const change of changes) {
      if (_FullTextDocument.isIncremental(change)) {
        const range = getWellformedRange(change.range);
        const startOffset = this.offsetAt(range.start);
        const endOffset = this.offsetAt(range.end);
        this._content = this._content.substring(0, startOffset) + change.text + this._content.substring(endOffset, this._content.length);
        const startLine = Math.max(range.start.line, 0);
        const endLine = Math.max(range.end.line, 0);
        let lineOffsets = this._lineOffsets;
        const addedLineOffsets = computeLineOffsets(change.text, false, startOffset);
        if (endLine - startLine === addedLineOffsets.length) {
          for (let i = 0, len = addedLineOffsets.length; i < len; i++) {
            lineOffsets[i + startLine + 1] = addedLineOffsets[i];
          }
        } else {
          if (addedLineOffsets.length < 1e4) {
            lineOffsets.splice(startLine + 1, endLine - startLine, ...addedLineOffsets);
          } else {
            this._lineOffsets = lineOffsets = lineOffsets.slice(0, startLine + 1).concat(addedLineOffsets, lineOffsets.slice(endLine + 1));
          }
        }
        const diff = change.text.length - (endOffset - startOffset);
        if (diff !== 0) {
          for (let i = startLine + 1 + addedLineOffsets.length, len = lineOffsets.length; i < len; i++) {
            lineOffsets[i] = lineOffsets[i] + diff;
          }
        }
      } else if (_FullTextDocument.isFull(change)) {
        this._content = change.text;
        this._lineOffsets = void 0;
      } else {
        throw new Error("Unknown change event received");
      }
    }
    this._version = version;
  }
  getLineOffsets() {
    if (this._lineOffsets === void 0) {
      this._lineOffsets = computeLineOffsets(this._content, true);
    }
    return this._lineOffsets;
  }
  positionAt(offset) {
    offset = Math.max(Math.min(offset, this._content.length), 0);
    const lineOffsets = this.getLineOffsets();
    let low = 0, high = lineOffsets.length;
    if (high === 0) {
      return { line: 0, character: offset };
    }
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (lineOffsets[mid] > offset) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    const line = low - 1;
    offset = this.ensureBeforeEOL(offset, lineOffsets[line]);
    return { line, character: offset - lineOffsets[line] };
  }
  offsetAt(position) {
    const lineOffsets = this.getLineOffsets();
    if (position.line >= lineOffsets.length) {
      return this._content.length;
    } else if (position.line < 0) {
      return 0;
    }
    const lineOffset = lineOffsets[position.line];
    if (position.character <= 0) {
      return lineOffset;
    }
    const nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
    const offset = Math.min(lineOffset + position.character, nextLineOffset);
    return this.ensureBeforeEOL(offset, lineOffset);
  }
  ensureBeforeEOL(offset, lineOffset) {
    while (offset > lineOffset && isEOL(this._content.charCodeAt(offset - 1))) {
      offset--;
    }
    return offset;
  }
  get lineCount() {
    return this.getLineOffsets().length;
  }
  static isIncremental(event) {
    const candidate = event;
    return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range !== void 0 && (candidate.rangeLength === void 0 || typeof candidate.rangeLength === "number");
  }
  static isFull(event) {
    const candidate = event;
    return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range === void 0 && candidate.rangeLength === void 0;
  }
};
var TextDocument;
(function(TextDocument2) {
  function create(uri, languageId, version, content) {
    return new FullTextDocument(uri, languageId, version, content);
  }
  TextDocument2.create = create;
  function update(document, changes, version) {
    if (document instanceof FullTextDocument) {
      document.update(changes, version);
      return document;
    } else {
      throw new Error("TextDocument.update: document must be created by TextDocument.create");
    }
  }
  TextDocument2.update = update;
  function applyEdits(document, edits) {
    const text = document.getText();
    const sortedEdits = mergeSort(edits.map(getWellformedEdit), (a, b) => {
      const diff = a.range.start.line - b.range.start.line;
      if (diff === 0) {
        return a.range.start.character - b.range.start.character;
      }
      return diff;
    });
    let lastModifiedOffset = 0;
    const spans = [];
    for (const e of sortedEdits) {
      const startOffset = document.offsetAt(e.range.start);
      if (startOffset < lastModifiedOffset) {
        throw new Error("Overlapping edit");
      } else if (startOffset > lastModifiedOffset) {
        spans.push(text.substring(lastModifiedOffset, startOffset));
      }
      if (e.newText.length) {
        spans.push(e.newText);
      }
      lastModifiedOffset = document.offsetAt(e.range.end);
    }
    spans.push(text.substr(lastModifiedOffset));
    return spans.join("");
  }
  TextDocument2.applyEdits = applyEdits;
})(TextDocument || (TextDocument = {}));
function mergeSort(data, compare) {
  if (data.length <= 1) {
    return data;
  }
  const p = data.length / 2 | 0;
  const left = data.slice(0, p);
  const right = data.slice(p);
  mergeSort(left, compare);
  mergeSort(right, compare);
  let leftIdx = 0;
  let rightIdx = 0;
  let i = 0;
  while (leftIdx < left.length && rightIdx < right.length) {
    const ret = compare(left[leftIdx], right[rightIdx]);
    if (ret <= 0) {
      data[i++] = left[leftIdx++];
    } else {
      data[i++] = right[rightIdx++];
    }
  }
  while (leftIdx < left.length) {
    data[i++] = left[leftIdx++];
  }
  while (rightIdx < right.length) {
    data[i++] = right[rightIdx++];
  }
  return data;
}
function computeLineOffsets(text, isAtLineStart, textOffset = 0) {
  const result = isAtLineStart ? [textOffset] : [];
  for (let i = 0; i < text.length; i++) {
    const ch = text.charCodeAt(i);
    if (isEOL(ch)) {
      if (ch === 13 && i + 1 < text.length && text.charCodeAt(i + 1) === 10) {
        i++;
      }
      result.push(textOffset + i + 1);
    }
  }
  return result;
}
function isEOL(char) {
  return char === 13 || char === 10;
}
function getWellformedRange(range) {
  const start = range.start;
  const end = range.end;
  if (start.line > end.line || start.line === end.line && start.character > end.character) {
    return { start: end, end: start };
  }
  return range;
}
function getWellformedEdit(textEdit) {
  const range = getWellformedRange(textEdit.range);
  if (range !== textEdit.range) {
    return { newText: textEdit.newText, range };
  }
  return textEdit;
}

// src/server.ts
var import_typed_mind = __toESM(require_dist());
var TypedMindLanguageServer = class {
  connection = (0, import_node.createConnection)(import_node.ProposedFeatures.all);
  documents = new import_node.TextDocuments(TextDocument);
  parser = new import_typed_mind.DSLParser();
  validator = new import_typed_mind.DSLValidator();
  syntaxGenerator = new import_typed_mind.SyntaxGenerator();
  // Cache parsed entities per document
  documentEntities = /* @__PURE__ */ new Map();
  // Semantic tokens legend
  tokenTypes = [
    import_node.SemanticTokenTypes.function,
    import_node.SemanticTokenTypes.class,
    import_node.SemanticTokenTypes.interface,
    import_node.SemanticTokenTypes.variable,
    import_node.SemanticTokenTypes.parameter,
    import_node.SemanticTokenTypes.property,
    import_node.SemanticTokenTypes.namespace,
    import_node.SemanticTokenTypes.type
  ];
  tokenModifiers = [
    import_node.SemanticTokenModifiers.declaration,
    import_node.SemanticTokenModifiers.definition,
    import_node.SemanticTokenModifiers.readonly,
    import_node.SemanticTokenModifiers.static
  ];
  constructor() {
    this.setupHandlers();
  }
  setupHandlers() {
    this.connection.onInitialize((_params) => {
      const result = {
        capabilities: {
          textDocumentSync: import_node.TextDocumentSyncKind.Incremental,
          completionProvider: {
            resolveProvider: false,
            triggerCharacters: ["-", "<", "@", ":", "~", "!", "=", "#"]
          },
          hoverProvider: true,
          definitionProvider: true,
          referencesProvider: true,
          semanticTokensProvider: {
            legend: {
              tokenTypes: this.tokenTypes,
              tokenModifiers: this.tokenModifiers
            },
            full: true
          }
        }
      };
      return result;
    });
    this.connection.onInitialized(() => {
      this.connection.console.log("TypedMind Language Server initialized");
    });
    this.documents.onDidOpen((event) => {
      this.validateTextDocument(event.document);
    });
    this.documents.onDidChangeContent((change) => {
      this.validateTextDocument(change.document);
    });
    this.connection.onCompletion((params) => {
      return this.provideCompletions(params);
    });
    this.connection.onHover((params) => {
      return this.provideHover(params);
    });
    this.connection.onDefinition((params) => {
      return this.provideDefinition(params);
    });
    this.connection.onReferences((params) => {
      return this.provideReferences(params);
    });
    this.connection.languages.semanticTokens.on((params) => {
      return this.provideSemanticTokens(params);
    });
    this.connection.onRequest("typedmind/toggleFormat", (params) => {
      return this.handleToggleFormat(params);
    });
  }
  async validateTextDocument(textDocument) {
    const text = textDocument.getText();
    const diagnostics = [];
    try {
      const parseResult = this.parser.parse(text);
      this.documentEntities.set(textDocument.uri, parseResult.entities);
      const validationResult = this.validator.validate(parseResult.entities);
      for (const error of validationResult.errors) {
        const diagnostic = {
          severity: error.severity === "error" ? import_node.DiagnosticSeverity.Error : import_node.DiagnosticSeverity.Warning,
          range: {
            start: { line: error.position.line - 1, character: error.position.column - 1 },
            end: { line: error.position.line - 1, character: error.position.column + 10 }
          },
          message: error.message,
          source: "typed-mind"
        };
        if (error.suggestion) {
          diagnostic.message += `
${error.suggestion}`;
        }
        diagnostics.push(diagnostic);
      }
    } catch (parseError) {
      const diagnostic = {
        severity: import_node.DiagnosticSeverity.Error,
        range: {
          start: { line: 0, character: 0 },
          end: { line: 0, character: 1 }
        },
        message: `Parse error: ${parseError}`,
        source: "typed-mind"
      };
      diagnostics.push(diagnostic);
    }
    await this.connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
  }
  provideCompletions(params) {
    const document = this.documents.get(params.textDocument.uri);
    if (!document) return [];
    const entities = this.documentEntities.get(params.textDocument.uri);
    if (!entities) return [];
    const items = [];
    const entityTypes = [
      "Program",
      "File",
      "Function",
      "Class",
      "Constants",
      "DTO",
      "Asset",
      "UIComponent",
      "RunParameter",
      "Dependency"
    ];
    for (const type of entityTypes) {
      items.push({
        label: type,
        kind: import_node.CompletionItemKind.Keyword,
        detail: `Entity type: ${type}`
      });
    }
    const operators = [
      { label: "->", detail: "Entry point operator" },
      { label: "<-", detail: "Import operator" },
      { label: "@", detail: "Location operator" },
      { label: "::", detail: "Function signature operator" },
      { label: "~>", detail: "Function calls operator" },
      { label: "<:", detail: "Extends operator" },
      { label: "!", detail: "Constants operator" },
      { label: "=>", detail: "Methods operator" },
      { label: "%", detail: "DTO operator" },
      { label: "~", detail: "Asset operator" },
      { label: "&", detail: "UIComponent operator" },
      { label: "&!", detail: "Root UIComponent operator" },
      { label: "^", detail: "Dependency operator" },
      { label: "$env", detail: "Environment variable parameter" },
      { label: "$iam", detail: "IAM role parameter" },
      { label: "$runtime", detail: "Runtime configuration parameter" },
      { label: "$config", detail: "Application configuration parameter" },
      { label: "$<", detail: "Function consumes parameters" },
      { label: ">>", detail: "Asset contains program" },
      { label: ">", detail: "UIComponent contains" },
      { label: "<", detail: "UIComponent contained by" }
    ];
    for (const op of operators) {
      items.push({
        label: op.label,
        kind: import_node.CompletionItemKind.Operator,
        detail: op.detail
      });
    }
    for (const [name, entity] of Array.from(entities)) {
      items.push({
        label: name,
        kind: this.getCompletionItemKind(entity.type),
        detail: `${entity.type}: ${name}`
      });
    }
    return items;
  }
  getCompletionItemKind(entityType) {
    switch (entityType) {
      case "Program":
        return import_node.CompletionItemKind.Module;
      case "File":
        return import_node.CompletionItemKind.File;
      case "Function":
        return import_node.CompletionItemKind.Function;
      case "Class":
        return import_node.CompletionItemKind.Class;
      case "Constants":
        return import_node.CompletionItemKind.Constant;
      case "DTO":
        return import_node.CompletionItemKind.Interface;
      case "Asset":
        return import_node.CompletionItemKind.File;
      case "UIComponent":
        return import_node.CompletionItemKind.Class;
      case "RunParameter":
        return import_node.CompletionItemKind.Property;
      case "Dependency":
        return import_node.CompletionItemKind.Module;
      default:
        return import_node.CompletionItemKind.Variable;
    }
  }
  provideHover(params) {
    const document = this.documents.get(params.textDocument.uri);
    if (!document) return null;
    const entities = this.documentEntities.get(params.textDocument.uri);
    if (!entities) return null;
    const text = document.getText();
    const offset = document.offsetAt(params.position);
    const wordRange = this.getWordRangeAtPosition(text, offset);
    if (!wordRange) return null;
    const word = text.substring(wordRange.start, wordRange.end);
    const entity = entities.get(word);
    if (!entity) return null;
    const contents = [`**${entity.type}**: ${entity.name}`];
    if (entity.comment) {
      contents.push(`\u{1F4AC} *${entity.comment}*`);
    }
    if (entity.referencedBy && entity.referencedBy.length > 0) {
      const refsByType = /* @__PURE__ */ new Map();
      for (const ref of entity.referencedBy) {
        if (typeof ref === "object" && ref.type && ref.from) {
          if (!refsByType.has(ref.type)) {
            refsByType.set(ref.type, []);
          }
          refsByType.get(ref.type).push(ref.from);
        } else if (typeof ref === "string") {
          if (!refsByType.has("reference")) {
            refsByType.set("reference", []);
          }
          refsByType.get("reference").push(ref);
        }
      }
      const refStrings = [];
      for (const [type, froms] of Array.from(refsByType)) {
        refStrings.push(`${type}: ${froms.join(", ")}`);
      }
      contents.push(`**Referenced By**: ${refStrings.join(" | ")}`);
    }
    if ("path" in entity && entity.path) {
      contents.push(`**Path**: ${entity.path}`);
    }
    if ("signature" in entity && entity.signature) {
      contents.push(`**Signature**: \`${entity.signature}\``);
    }
    if ("description" in entity && entity.description) {
      contents.push(`**Description**: ${entity.description}`);
    }
    if ("purpose" in entity && entity.purpose && entity.type !== "DTO" && entity.type !== "UIComponent") {
      contents.push(`**Purpose**: ${entity.purpose}`);
    }
    if ("imports" in entity && entity.imports && entity.imports.length > 0) {
      contents.push(`**Imports**: ${entity.imports.join(", ")}`);
    }
    if ("exports" in entity && entity.exports.length > 0) {
      contents.push(`**Exports**: ${entity.exports.join(", ")}`);
    }
    if ("calls" in entity && entity.calls.length > 0) {
      contents.push(`**Calls**: ${entity.calls.join(", ")}`);
    }
    if (entity.type === "DTO") {
      const dtoEntity = entity;
      if (dtoEntity.purpose) {
        contents.push(`**Purpose**: ${dtoEntity.purpose}`);
      }
      if (dtoEntity.fields && dtoEntity.fields.length > 0) {
        const fieldList = dtoEntity.fields.map((field) => {
          const optional = field.optional ? " *(optional)*" : "";
          const desc = field.description ? ` - ${field.description}` : "";
          return `\u2022 \`${field.name}: ${field.type}\`${optional}${desc}`;
        }).join("\n");
        contents.push(`**Fields**:
${fieldList}`);
      }
    }
    if (entity.type === "Asset") {
      const assetEntity = entity;
      if (assetEntity.containsProgram) {
        contents.push(`**Contains Program**: ${assetEntity.containsProgram}`);
      }
    }
    if (entity.type === "UIComponent") {
      const uiEntity = entity;
      if (uiEntity.purpose) {
        contents.push(`**Purpose**: ${uiEntity.purpose}`);
      }
      if (uiEntity.root) {
        contents.push(`**Root Component**: \u2713`);
      }
      if (uiEntity.contains && uiEntity.contains.length > 0) {
        contents.push(`**Contains**: ${uiEntity.contains.join(", ")}`);
      }
      if (uiEntity.containedBy && uiEntity.containedBy.length > 0) {
        contents.push(`**Contained By**: ${uiEntity.containedBy.join(", ")}`);
      }
      if (uiEntity.affectedBy && uiEntity.affectedBy.length > 0) {
        contents.push(`**Affected By**: ${uiEntity.affectedBy.join(", ")}`);
      }
    }
    if (entity.type === "RunParameter") {
      const paramEntity = entity;
      contents.push(`**Parameter Type**: ${paramEntity.paramType}`);
      if (paramEntity.required) {
        contents.push(`**Required**: \u2713`);
      }
      if (paramEntity.defaultValue) {
        contents.push(`**Default Value**: \`${paramEntity.defaultValue}\``);
      }
      if (paramEntity.consumedBy && paramEntity.consumedBy.length > 0) {
        contents.push(`**Consumed By**: ${paramEntity.consumedBy.join(", ")}`);
      }
    }
    if (entity.type === "Function") {
      const funcEntity = entity;
      if (funcEntity.input) {
        contents.push(`**Input**: ${funcEntity.input}`);
      }
      if (funcEntity.output) {
        contents.push(`**Output**: ${funcEntity.output}`);
      }
      if (funcEntity.affects && funcEntity.affects.length > 0) {
        contents.push(`**Affects**: ${funcEntity.affects.join(", ")}`);
      }
      if (funcEntity.consumes && funcEntity.consumes.length > 0) {
        contents.push(`**Consumes**: ${funcEntity.consumes.join(", ")}`);
      }
    }
    if (entity.type === "Dependency") {
      const depEntity = entity;
      if (depEntity.purpose) {
        contents.push(`**Purpose**: ${depEntity.purpose}`);
      }
      if (depEntity.version) {
        contents.push(`**Version**: ${depEntity.version}`);
      }
      if (depEntity.importedBy && depEntity.importedBy.length > 0) {
        contents.push(`**Imported By**: ${depEntity.importedBy.join(", ")}`);
      }
    }
    return {
      contents: {
        kind: import_node.MarkupKind.Markdown,
        value: contents.join("\n\n")
      }
    };
  }
  provideDefinition(params) {
    const document = this.documents.get(params.textDocument.uri);
    if (!document) return null;
    const entities = this.documentEntities.get(params.textDocument.uri);
    if (!entities) return null;
    const text = document.getText();
    const offset = document.offsetAt(params.position);
    const wordRange = this.getWordRangeAtPosition(text, offset);
    if (!wordRange) return null;
    const word = text.substring(wordRange.start, wordRange.end);
    const entity = entities.get(word);
    if (!entity) return null;
    return {
      uri: params.textDocument.uri,
      range: {
        start: { line: entity.position.line - 1, character: 0 },
        end: { line: entity.position.line - 1, character: entity.raw.length }
      }
    };
  }
  provideReferences(params) {
    const document = this.documents.get(params.textDocument.uri);
    if (!document) return [];
    const entities = this.documentEntities.get(params.textDocument.uri);
    if (!entities) return [];
    const text = document.getText();
    const offset = document.offsetAt(params.position);
    const wordRange = this.getWordRangeAtPosition(text, offset);
    if (!wordRange) return [];
    const word = text.substring(wordRange.start, wordRange.end);
    const locations = [];
    const lines = text.split("\n");
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      if (!line) continue;
      let columnIndex = line.indexOf(word);
      while (columnIndex !== -1) {
        const beforeChar = columnIndex > 0 ? line[columnIndex - 1] : " ";
        const afterChar = columnIndex + word.length < line.length ? line[columnIndex + word.length] : " ";
        if (this.isWordBoundary(beforeChar) && this.isWordBoundary(afterChar)) {
          locations.push({
            uri: params.textDocument.uri,
            range: {
              start: { line: lineIndex, character: columnIndex },
              end: { line: lineIndex, character: columnIndex + word.length }
            }
          });
        }
        columnIndex = line.indexOf(word, columnIndex + 1);
      }
    }
    return locations;
  }
  getWordRangeAtPosition(text, offset) {
    if (offset < 0 || offset >= text.length) return null;
    let start = offset;
    let end = offset;
    while (start > 0 && this.isEntityNameChar(text[start - 1])) {
      start--;
    }
    if (start > 0 && text[start - 1] === "@") {
      if (start === 1 || !this.isEntityNameChar(text[start - 2])) {
        start--;
      }
    }
    while (end < text.length && this.isEntityNameChar(text[end])) {
      end++;
    }
    if (start === end) return null;
    return { start, end };
  }
  isEntityNameChar(char) {
    if (!char) return false;
    return /[a-zA-Z0-9\-_/]/.test(char);
  }
  isWordBoundary(char) {
    if (!char) return true;
    return /[\s\[\],<>@:~!=#\-]/.test(char);
  }
  provideSemanticTokens(params) {
    const document = this.documents.get(params.textDocument.uri);
    if (!document) {
      return { data: [] };
    }
    const entities = this.documentEntities.get(params.textDocument.uri);
    if (!entities) {
      return { data: [] };
    }
    const builder = new import_node.SemanticTokensBuilder();
    const text = document.getText();
    const lines = text.split("\n");
    const entityTypeMap = /* @__PURE__ */ new Map();
    for (const [name, entity] of Array.from(entities)) {
      entityTypeMap.set(name, entity.type);
    }
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      if (!line) continue;
      const words = Array.from(line.matchAll(/\b([A-Za-z][A-Za-z0-9@/_-]*)\b/g));
      for (const match of words) {
        const word = match[1];
        const index = match.index;
        if (!word || index === void 0) continue;
        const entityType = entityTypeMap.get(word);
        if (entityType) {
          const tokenType = this.getSemanticTokenType(entityType);
          const tokenModifier = this.getSemanticTokenModifier(line, index);
          builder.push(lineIndex, index, word.length, tokenType, tokenModifier);
        }
      }
    }
    return builder.build();
  }
  getSemanticTokenType(entityType) {
    switch (entityType) {
      case "Function":
        return this.tokenTypes.indexOf(import_node.SemanticTokenTypes.function);
      case "Class":
        return this.tokenTypes.indexOf(import_node.SemanticTokenTypes.class);
      case "DTO":
      case "Asset":
      case "UIComponent":
        return this.tokenTypes.indexOf(import_node.SemanticTokenTypes.interface);
      case "RunParameter":
        return this.tokenTypes.indexOf(import_node.SemanticTokenTypes.parameter);
      case "Constants":
        return this.tokenTypes.indexOf(import_node.SemanticTokenTypes.property);
      case "Program":
      case "Dependency":
        return this.tokenTypes.indexOf(import_node.SemanticTokenTypes.namespace);
      case "File":
        return this.tokenTypes.indexOf(import_node.SemanticTokenTypes.type);
      default:
        return this.tokenTypes.indexOf(import_node.SemanticTokenTypes.variable);
    }
  }
  getSemanticTokenModifier(line, position) {
    const afterWord = line.substring(position);
    if (/^\w*\s*(->|@|<:|!|::|%|~|&|\$|\^)/.test(afterWord)) {
      return 1 << this.tokenModifiers.indexOf(import_node.SemanticTokenModifiers.declaration);
    }
    return 0;
  }
  /**
   * Handle format toggle request from VS Code extension
   */
  async handleToggleFormat(params) {
    try {
      this.connection.console.log(`Toggle format request received for ${params.uri}`);
      const document = this.documents.get(params.uri);
      if (!document) {
        this.connection.console.log("Document not found");
        return { newText: "", error: "Document not found" };
      }
      const fullText = document.getText();
      let textToProcess = fullText;
      this.connection.console.log(`Original text length: ${fullText.length}`);
      if (params.range) {
        const lines = fullText.split("\n");
        const startLineIndex = Math.max(0, params.range.start);
        const endLineIndex = Math.min(lines.length - 1, params.range.end);
        if (startLineIndex <= endLineIndex) {
          textToProcess = lines.slice(startLineIndex, endLineIndex + 1).join("\n");
        }
        this.connection.console.log(`Processing selected text (lines ${startLineIndex}-${endLineIndex}), length: ${textToProcess.length}`);
      } else {
        this.connection.console.log("Processing entire document");
      }
      const detection = this.syntaxGenerator.detectFormat(textToProcess);
      this.connection.console.log(`Detected format: ${JSON.stringify(detection)}`);
      const checker = new import_typed_mind.DSLChecker();
      const result = checker.toggleFormat(textToProcess);
      this.connection.console.log(`Toggle result success: ${result._tag === "success"}`);
      if (result._tag === "success") {
        this.connection.console.log(`New text length: ${result.value.length}`);
        this.connection.console.log(`Content changed: ${result.value !== textToProcess}`);
        return { newText: result.value };
      } else {
        this.connection.console.log(`Toggle error: ${result.error.message}`);
        return {
          newText: textToProcess,
          // Return original on error
          error: result.error.message
        };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error during format toggle";
      this.connection.console.error(`Format toggle error: ${errorMessage}`);
      return {
        newText: "",
        error: errorMessage
      };
    }
  }
  start() {
    this.documents.listen(this.connection);
    this.connection.listen();
  }
};

// src/start-server.ts
function startServer() {
  process.on("uncaughtException", (error) => {
    console.error("TypedMind LSP uncaught exception:", error.message);
    process.exit(1);
  });
  process.on("unhandledRejection", (reason) => {
    console.error("TypedMind LSP unhandled rejection:", reason);
    process.exit(1);
  });
  try {
    const server = new TypedMindLanguageServer();
    server.start();
  } catch (error) {
    console.error("Failed to start TypedMind Language Server:", error);
    process.exit(1);
  }
}

// src/cli.ts
startServer();
