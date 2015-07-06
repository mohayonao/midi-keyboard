(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.MIDIKeyboard = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _CONTROL_CHANGES, _extends$parseMessage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _xtend = require("xtend");

var _xtend2 = _interopRequireDefault(_xtend);

var CONTROL_CHANGES = (_CONTROL_CHANGES = {}, _defineProperty(_CONTROL_CHANGES, 0x01, "modulation"), _defineProperty(_CONTROL_CHANGES, 0x07, "volume"), _defineProperty(_CONTROL_CHANGES, 0x0a, "pan"), _defineProperty(_CONTROL_CHANGES, 0x0b, "expression"), _defineProperty(_CONTROL_CHANGES, 0x40, "sustain"), _CONTROL_CHANGES);

function parseMessage(st, d1, d2) {
  var messageType = st & 0xf0;
  var value = Math.max(0, Math.min(d2, 127));
  var channel = Math.max(0, Math.min(st & 0x0f, 15));

  // note off
  if (messageType === 0x80) {
    return { dataType: "noteOff", noteNumber: d1, velocity: value, channel: channel };
  }

  // note on
  if (messageType === 0x90) {
    if (value === 0) {
      return { dataType: "noteOff", noteNumber: d1, velocity: value, channel: channel };
    }
    return { dataType: "noteOn", noteNumber: d1, velocity: value, channel: channel };
  }

  // control change
  if (messageType === 0xb0) {
    if (CONTROL_CHANGES.hasOwnProperty(d1)) {
      return { dataType: CONTROL_CHANGES[d1], value: value, channel: channel };
    }
  }

  // pitch bend
  if (messageType === 0xe0) {
    var pitchBendValue = d2 * 128 + d1 - 8192;

    return { dataType: "pitchbend", value: pitchBendValue, channel: channel };
  }

  return null;
}

function _extends(MIDIDevice) {
  return (function (_MIDIDevice) {
    function LaunchControl() {
      var _this = this;

      var deviceName = arguments[0] === undefined ? "Keystation Mini 32" : arguments[0];

      _classCallCheck(this, LaunchControl);

      _get(Object.getPrototypeOf(LaunchControl.prototype), "constructor", this).call(this, deviceName);

      this._onmidimessage = function (e) {
        var msg = parseMessage(e.data[0], e.data[1], e.data[2]);

        if (msg === null) {
          return;
        }

        _this.emit("message", (0, _xtend2["default"])({ type: "message", deviceName: _this.deviceName }, msg));
      };
    }

    _inherits(LaunchControl, _MIDIDevice);

    return LaunchControl;
  })(MIDIDevice);
}

exports["default"] = (_extends$parseMessage = {}, _defineProperty(_extends$parseMessage, "extends", _extends), _defineProperty(_extends$parseMessage, "parseMessage", parseMessage), _extends$parseMessage);
module.exports = exports["default"];
},{"xtend":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoMidiDeviceWebmidi = require("@mohayonao/midi-device/webmidi");

var _mohayonaoMidiDeviceWebmidi2 = _interopRequireDefault(_mohayonaoMidiDeviceWebmidi);

var _MIDIKeyboard = require("./MIDIKeyboard");

var _MIDIKeyboard2 = _interopRequireDefault(_MIDIKeyboard);

exports["default"] = _MIDIKeyboard2["default"]["extends"](_mohayonaoMidiDeviceWebmidi2["default"]);
module.exports = exports["default"];
},{"./MIDIKeyboard":1,"@mohayonao/midi-device/webmidi":7}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoEventEmitter = require("@mohayonao/event-emitter");

var _mohayonaoEventEmitter2 = _interopRequireDefault(_mohayonaoEventEmitter);

exports["default"] = _mohayonaoEventEmitter2["default"];
module.exports = exports["default"];
},{"@mohayonao/event-emitter":6}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _EventEmitter2 = require("./EventEmitter");

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var MIDIDevice = (function (_EventEmitter) {
  function MIDIDevice(deviceName) {
    _classCallCheck(this, MIDIDevice);

    _get(Object.getPrototypeOf(MIDIDevice.prototype), "constructor", this).call(this);

    this._input = null;
    this._output = null;
    this._deviceName = deviceName;
  }

  _inherits(MIDIDevice, _EventEmitter);

  _createClass(MIDIDevice, [{
    key: "open",
    value: function open() {
      return Promise.reject(new Error("subclass responsibility"));
    }
  }, {
    key: "close",
    value: function close() {
      return Promise.reject(new Error("subclass responsibility"));
    }
  }, {
    key: "send",
    value: function send() {
      throw new Error("subclass responsibility");
    }
  }, {
    key: "_onmidimessage",
    value: function _onmidimessage() {}
  }, {
    key: "deviceName",
    get: function get() {
      return this._deviceName;
    }
  }], [{
    key: "requestDeviceNames",
    value: function requestDeviceNames() {
      return Promise.reject(new Error("subclass responsibility"));
    }
  }]);

  return MIDIDevice;
})(_EventEmitter3["default"]);

exports["default"] = MIDIDevice;
module.exports = exports["default"];
},{"./EventEmitter":3}],5:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _MIDIDevice2 = require("./MIDIDevice");

var _MIDIDevice3 = _interopRequireDefault(_MIDIDevice2);

function findMIDIPortByName(iter, deviceName) {
  for (var x = iter.next(); !x.done; x = iter.next()) {
    if (x.value.name === deviceName) {
      return x.value;
    }
  }

  return null;
}

function collectDeviceNames(iter) {
  var result = [];

  for (var x = iter.next(); !x.done; x = iter.next()) {
    result.push(x.value.name);
  }

  return result;
}

var WebMIDIDevice = (function (_MIDIDevice) {
  function WebMIDIDevice() {
    _classCallCheck(this, WebMIDIDevice);

    _get(Object.getPrototypeOf(WebMIDIDevice.prototype), "constructor", this).apply(this, arguments);
  }

  _inherits(WebMIDIDevice, _MIDIDevice);

  _createClass(WebMIDIDevice, [{
    key: "open",
    value: function open() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (!global.navigator || typeof global.navigator.requestMIDIAccess !== "function") {
          return reject(new TypeError("Web MIDI API is not supported"));
        }

        if (_this._input !== null || _this._output !== null) {
          return reject(new TypeError(_this.deviceName + " has already been opened"));
        }

        var successCallback = function successCallback(access) {
          _this._access = access;

          var input = findMIDIPortByName(access.inputs.values(), _this.deviceName);
          var output = findMIDIPortByName(access.outputs.values(), _this.deviceName);

          if (input === null && output === null) {
            return reject(new TypeError(_this.deviceName + " is not found"));
          }

          if (input !== null) {
            _this._input = input;

            input.onmidimessage = function (e) {
              _this._onmidimessage(e);
            };
          }

          if (output !== null) {
            _this._output = output;
          }

          return Promise.all([_this._input && _this._input.open(), _this._output && _this._output.open()]).then(resolve, reject);
        };

        if (_this._access) {
          return successCallback(_this._access);
        }

        return global.navigator.requestMIDIAccess().then(successCallback, reject);
      });
    }
  }, {
    key: "close",
    value: function close() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (_this2._input === null && _this2._output === null) {
          return reject(new TypeError(_this2.deviceName + " has already been closed"));
        }

        var input = _this2._input;
        var output = _this2._output;

        _this2._input = null;
        _this2._output = null;

        return Promise.all([input && input.close(), output && output.close()]).then(resolve, reject);
      });
    }
  }, {
    key: "send",
    value: function send(data) {
      if (this._output !== null) {
        this._output.send(data);
      }
    }
  }], [{
    key: "requestDeviceNames",
    value: function requestDeviceNames() {
      return new Promise(function (resolve, reject) {
        if (!global.navigator || typeof global.navigator.requestMIDIAccess !== "function") {
          return reject(new TypeError("Web MIDI API is not supported"));
        }

        return global.navigator.requestMIDIAccess().then(function (access) {
          var inputDeviceNames = collectDeviceNames(access.inputs.values());
          var outputDeviceNames = collectDeviceNames(access.outputs.values());

          resolve({
            inputs: inputDeviceNames,
            outputs: outputDeviceNames
          });
        }, reject);
      });
    }
  }]);

  return WebMIDIDevice;
})(_MIDIDevice3["default"]);

exports["default"] = WebMIDIDevice;
module.exports = exports["default"];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./MIDIDevice":4}],6:[function(require,module,exports){
"use strict";

var LISTENERS = typeof Symbol !== "undefined" ? Symbol("LISTENERS") : "_@mohayonao/event-emitter:listeners";

function EventEmitter() {
  this[LISTENERS] = {};
}

EventEmitter.prototype.listeners = function(event) {
  if (this[LISTENERS].hasOwnProperty(event)) {
    return this[LISTENERS][event].map(function(listener) {
      return listener.listener || listener;
    }).reverse();
  }

  return [];
};

EventEmitter.prototype.addListener = function(event, listener) {
  if (typeof listener === "function") {
    if (!this[LISTENERS].hasOwnProperty(event)) {
      this[LISTENERS][event] = [ listener ];
    } else {
      this[LISTENERS][event].unshift(listener);
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(event, listener) {
  var _this, func;

  _this = this;

  if (typeof listener === "function") {
    func = function(arg1) {
      _this.removeListener(event, func);
      listener(arg1);
    };

    func.listener = listener;

    this.addListener(event, func);
  }

  return this;
};

EventEmitter.prototype.removeListener = function(event, listener) {
  var listeners, i;

  if (typeof listener === "function" && this[LISTENERS].hasOwnProperty(event)) {
    listeners = this[LISTENERS][event];

    for (i = listeners.length - 1; i >= 0; i--) {
      if (listeners[i] === listener || listeners[i].listener === listener) {
        listeners.splice(i, 1);
        break;
      }
    }
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(event) {
  if (typeof event === "undefined") {
    this[LISTENERS] = {};
  } else if (this[LISTENERS].hasOwnProperty(event)) {
    delete this[LISTENERS][event];
  }

  return this;
};

EventEmitter.prototype.emit = function(event, arg1) {
  var listeners, i;

  if (this[LISTENERS].hasOwnProperty(event)) {
    listeners = this[LISTENERS][event];

    for (i = listeners.length - 1; i >= 0; i--) {
      listeners[i](arg1);
    }
  }

  return this;
};

module.exports = EventEmitter;

},{}],7:[function(require,module,exports){
module.exports = require("./lib/WebMIDIDevice");

},{"./lib/WebMIDIDevice":5}],8:[function(require,module,exports){
module.exports = extend

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],9:[function(require,module,exports){
module.exports = require("./lib/WebMIDIKeyboard");

},{"./lib/WebMIDIKeyboard":2}]},{},[9])(9)
});