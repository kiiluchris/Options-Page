'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.mergeJSONObjects = mergeJSONObjects;
exports.mergeArrays = mergeArrays;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function haveSameType(obj, obj2) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === (typeof obj2 === 'undefined' ? 'undefined' : _typeof(obj2));
}

function mergeJSONObjects() {
  var filterKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (data, old) {
    var result = _extends({}, old);
    var keys = Object.keys(data);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        var currentNew = data[key];
        var currentOld = result[key];
        if (!haveSameType(currentNew, currentOld)) {
          result[key] = currentNew;
        } else if (result.hasOwnProperty(key) && (typeof currentNew === 'undefined' ? 'undefined' : _typeof(currentNew)) === 'object' && (typeof currentOld === 'undefined' ? 'undefined' : _typeof(currentOld)) === 'object') {
          var appendFunc = Array.isArray(currentNew) && Array.isArray(currentOld) ? mergeArrays(key, filterKeys) : mergeJSONObjects(filterKeys);
          result[key] = appendFunc(currentNew, currentOld);
        } else {
          result[key] = currentNew;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return result;
  };
}

function checkItemInArray(_ref) {
  var _key = _ref._key,
      key = _ref.key,
      item = _ref.item,
      arr = _ref.arr;

  var index = void 0;

  var _loop = function _loop(subItem) {
    for (var subIndex = 0; subIndex < arr.length; subIndex++) {
      var subArr = arr[subIndex];
      if (Array.isArray(subArr[_key]) && ~(index = subArr[_key].findIndex(function (_r) {
        return _r[key] === subItem[key];
      }))) {
        return {
          v: {
            isInArray: true,
            subArr: subArr,
            subIndex: subIndex
          }
        };
      }
    }
  };

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = item[_key][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var subItem = _step2.value;

      var _ret = _loop(subItem);

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return {
    isInArray: false
  };
}

function mergeArrays() {
  var _key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var filterKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var key = filterKeys[_key];

  return function (arr, old) {
    var result = old.slice();

    var _loop2 = function _loop2(i) {
      var item = arr[i];
      var hasChanged = false;
      if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && key !== undefined) {
        var index = void 0;
        if (!Array.isArray(item)) {
          if (item[_key] !== undefined && item[_key][key] !== undefined && ~(index = result.findIndex(function (r) {
            return r[_key][key] === item[_key][key];
          }))) {
            result[index] = mergeJSONObjects(filterKeys)(item, result[index]);
            hasChanged = true;
          } else if (item[key] !== undefined && ~(index = result.findIndex(function (r) {
            return r[key] === item[key];
          }))) {
            result[index] = mergeJSONObjects(filterKeys)(item, result[index]);
            hasChanged = true;
          } else if (item[_key] !== undefined && Array.isArray(item[_key])) {
            var _checkItemInArray = checkItemInArray({ _key: _key, key: key, item: item, arr: result }),
                isInArray = _checkItemInArray.isInArray,
                subArr = _checkItemInArray.subArr,
                subIndex = _checkItemInArray.subIndex;

            if (isInArray) {
              var itemVal = item[_key].slice();
              delete item[_key];
              var subResVal = subArr[_key].slice();
              delete subArr[_key];
              var obj = mergeJSONObjects(filterKeys)(item, subArr);
              obj[_key] = mergeArrays(key, _extends(_defineProperty({}, key, key), filterKeys))(subResVal, itemVal);
              result[subIndex] = obj;
              hasChanged = true;
            }
          }
        }
      }

      if (!hasChanged && !result.includes(item)) {
        result.push(item);
      }
    };

    for (var i = 0; i < arr.length; i++) {
      _loop2(i);
    }

    return result;
  };
}