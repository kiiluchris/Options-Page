'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.cleanData = cleanData;
exports.mergeJSONObjects = mergeJSONObjects;
exports.mergeArrays = mergeArrays;
/**
 * Check two values are of the same type
 * 
 * @param {any} obj 
 * @param {any} obj2 
 * @returns 
 */
function haveSameType(obj, obj2) {
  return typeof obj === typeof obj2;
}

/**
 * Filter object to get only necessary keys values
 * 
 * @export
 * @param {any} [jsonString='{}'] JSON formatted string
 * @param {any} [keys=[]] Object keys which are to be returned
 * @returns 
 */
function cleanData(jsonString = '{}', keys = []) {
  const src = JSON.parse(jsonString);
  let parsedData = {};
  for (const k of keys) {
    if (src.hasOwnProperty(k)) {
      parsedData[k] = src[k];
    }
  }

  return parsedData;
}

/**
 * Deeply Merges two JSON objects 
 * 
 * @export
 * @param {object} [filterKeys={}] An object mapping an object containing an array to the key by which it is filtered
 * @returns 
 */
function mergeJSONObjects(filterKeys = {}) {
  return function (data, old) {
    const result = _extends({}, old);
    const keys = Object.keys(data);
    for (const key of keys) {
      const currentNew = data[key];
      const currentOld = result[key];
      if (!haveSameType(currentNew, currentOld)) {
        result[key] = currentNew;
      } else if (result.hasOwnProperty(key) && typeof currentNew === 'object' && typeof currentOld === 'object') {
        const appendFunc = Array.isArray(currentNew) && Array.isArray(currentOld) ? mergeArrays(key, filterKeys) : mergeJSONObjects(filterKeys);
        result[key] = appendFunc(currentNew, currentOld);
      } else {
        result[key] = currentNew;
      }
    }

    return result;
  };
}

/**
 * Check if item key of item is the same as an item in the array
 * 
 * @param {object} {_key, key, item, arr} Object key, Key by which items are filtered, Item being searched for, Array
 * @returns 
 */
function checkItemInArray({ _key, key, item, arr }) {
  let index;
  for (const subItem of item[_key]) {
    for (let subIndex = 0; subIndex < arr.length; subIndex++) {
      const subArr = arr[subIndex];
      if (Array.isArray(subArr[_key]) && ~(index = subArr[_key].findIndex(function (_r) {
        return _r[key] === subItem[key];
      }))) {
        return {
          isInArray: true,
          subArr,
          subIndex
        };
      }
    }
  }

  return {
    isInArray: false
  };
}

/**
 * Deeply merge two arrays
 * 
 * @export
 * @param {string} [_key=''] Key of an object containing an array
 * @param {object} [filterKeys={}] Object containing the mapping key of the object in an array to the keys by which they are filtered
 * @returns 
 */
function mergeArrays(_key = '', filterKeys = {}) {
  const key = filterKeys[_key];

  return function (arr, old) {
    const result = old.slice();
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      let hasChanged = false;
      if (typeof item === 'object' && key !== undefined) {
        let index;
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
            const { isInArray, subArr, subIndex } = checkItemInArray({ _key, key, item, arr: result });
            if (isInArray) {
              const itemVal = item[_key].slice();
              delete item[_key];
              const subResVal = subArr[_key].slice();
              delete subArr[_key];
              const obj = mergeJSONObjects(filterKeys)(item, subArr);
              obj[_key] = mergeArrays(key, _extends({ [key]: key }, filterKeys))(subResVal, itemVal);
              result[subIndex] = obj;
              hasChanged = true;
            }
          }
        }
      }

      if (!hasChanged && !result.includes(item)) {
        result.push(item);
      }
    }

    return result;
  };
}