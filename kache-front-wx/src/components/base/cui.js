export default {
  isString: function (s) {
    return typeof s === 'string';
  },
  /**
   * Returns `true` if the passed value is a JavaScript Date object, `false` otherwise.
   * @param {Object} obj The object to test.
   * @return {Boolean}
   */
  isDate: function (obj) {
    return toString.call(obj) === '[object Date]';
  },
  /**
   * Returns 'true' if the passed value is a String that matches the MS Date JSON
   * encoding format.
   * @param {String} value The string to test.
   * @return {Boolean}
   */
  isMSDate: function (value) {
    if (!CUI.isString(value)) {
      return false;
    }
    return MSDateRe.test(value);
  },
  /**
   * Returns `true` if the passed value is a JavaScript Object, `false` otherwise.
   * @param {Object} value The value to test.
   * @return {Boolean}
   * @method
   */
  isObject: (toString.call(null) === '[object Object]') ? function (value) {
    // check ownerDocument here as well to exclude DOM nodes
    return value != null && toString.call(value) === '[object Object]' && value.ownerDocument === undefined;
  } : function (value) {
    return toString.call(value) === '[object Object]';
  },
  /**
   * @private
   */
  isSimpleObject: function (value) {
    return value instanceof Object && value.constructor === Object;
  },
  /**
   * Returns `true` if the passed value is a JavaScript 'primitive', a string, number
   * or boolean.
   * @param {Object} value The value to test.
   * @return {Boolean}
   */
  isPrimitive: function (value) {
    var type = typeof value;
    return type === 'string' || type === 'number' || type === 'boolean';
  },
  isArray: ('isArray' in Array) ? Array.isArray : function (value) {
    return toString.call(value) === '[object Array]';
  },
  // Safari 3.x and 4.x returns 'function' for typeof <NodeList>, hence we need to fall back to using
  // Object.prototype.toString (slower)
  isFunction: (typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function') ? function (value) {
    return !!value && toString.call(value) === '[object Function]';
  } : function (value) {
    return !!value && typeof value === 'function';
  },
  /**
   * Returns `true` if the passed value is a number. Returns `false` for non-finite numbers.
   * @param {Object} value The value to test.
   * @return {Boolean}
   */
  isNumber: function (value) {
    return typeof value === 'number' && isFinite(value);
  },
  /**
   * Validates that a value is numeric.
   * @param {Object} value Examples: 1, '1', '2.34'
   * @return {Boolean} True if numeric, false otherwise
   */
  isNumeric: function (value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },
  /**
   * Returns `true` if the passed value is a boolean.
   *
   * @param {Object} value The value to test.
   * @return {Boolean}
   */
  isBoolean: function (value) {
    return typeof value === 'boolean';
  },
  /**
   * Returns `true` if the passed value is an HTMLElement
   * @param {Object} value The value to test.
   * @return {Boolean}
   */
  isElement: function (value) {
    return value ? value.nodeType === 1 : false;
  },
  /**
   * Copies all the properties of config to object if they don't already exist.
   * @param {Object} object The receiver of the properties
   * @param {Object} config The source of the properties
   * @return {Object} returns obj
   */
  applyIf: function (object, config) {
    if (object && config && typeof config === 'object') {
      for (var property in config) {
        if (object[property] === undefined) {
          object[property] = config[property];
        }
      }
    }
    return object;
  },
  Logger: {
    log: function (message, priority) {
      if (message && global.console) {
        if (!priority || !(priority in global.console)) {
          priority = 'log';
        }
        message = '[' + priority.toUpperCase() + '] ' + message;
        global.console[priority](message);
      }
    },
    verbose: function (message) {
      this.log(message, 'verbose');
    },
    info: function (message) {
      this.log(message, 'info');
    },
    warn: function (message) {
      this.log(message, 'warn');
    },
    error: function (message) {
      throw new Error(message);
    },
    deprecate: function (message) {
      this.log(message, 'warn');
    }
  },
  isEmpty: function (v) {
    if (v == undefined || v === "" || v == "" || v == NaN) return true;
    else
      return false;
  }
}