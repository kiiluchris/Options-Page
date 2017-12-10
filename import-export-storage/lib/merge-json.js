'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.cleanData = cleanData;
exports.mergeJSONObjects = mergeJSONObjects;
exports.mergeArrays = mergeArrays;
exports.mergeOrReplaceVariable = mergeOrReplaceVariable;
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
 * @param {string} [jsonString='{}'] JSON formatted string
 * @param {string[]} [keys=[]] Object keys which are to be returned
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
function mergeJSONObjects(old = {}, data = {}, { filterKeys = {} } = {}) {
  if (!(old.constructor === Object && data.constructor === Object)) {
    return data;
  }
  const result = _extends({}, old);
  const keys = Object.keys(data);
  for (const key of keys) {
    const currentNew = data[key];
    result[key] = result.hasOwnProperty(key) ? mergeOrReplaceVariable(result[key], currentNew, { key, filterKeys }) : currentNew;
  }

  return result;
}

/**
 * Check if item key of item is the same as an item in the array
 * 
 * @param {object} {itemKey, subItemKey, item, arr} Object key, Key by which items are filtered, Item being searched for, Array
 * @returns 
 */
function checkItemInArray({ key = '', subKey = '', item = [], arr = [] }) {
  let index;
  for (const subItem of item[key]) {
    for (let subIndex = 0; subIndex < arr.length; subIndex++) {
      const oldItem = arr[subIndex];
      if (Array.isArray(oldItem[key]) && ~(index = oldItem[key].findIndex(function (_r) {
        return _r[subKey] === subItem[subKey];
      }))) {
        return {
          isInArray: true,
          oldItem,
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
 * @param {string} [key=''] Key of an object containing an array
 * @param {object} [filterKeys={}] Object containing the mapping key of the object in an array to the keys by which they are filtered
 * @returns 
 */
function mergeArrays(old = [], arr = [], { key = '', filterKeys = {} } = {}) {
  if (!(Array.isArray(old) && Array.isArray(arr))) {
    return arr;
  }
  const subKey = filterKeys[key];
  const result = old.slice();
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    let hasChanged = false;
    if (typeof item === 'object' && typeof result[i] === 'object') {
      let index;
      if (!Array.isArray(item) && subKey !== undefined) {
        if (item[key] !== undefined && item[key][subKey] !== undefined && ~(index = result.findIndex(function (r) {
          return r[key][subKey] === item[key][subKey];
        })) || item[subKey] !== undefined && ~(index = result.findIndex(function (r) {
          return r[subKey] === item[subKey];
        }))) {
          result[index] = mergeOrReplaceVariable(result[index], item, { filterKeys });
          hasChanged = true;
        } else if (Array.isArray(item[key])) {
          const { isInArray, oldItem, subIndex } = checkItemInArray({
            subKey, key, item, arr: result
          });
          if (isInArray) {
            const itemArr = item[key].slice();
            const oldItemArr = oldItem[key].slice();
            delete item[key];
            delete oldItem[key];
            const obj = mergeOrReplaceVariable(oldItem, item, { filterKeys });
            obj[key] = mergeOrReplaceVariable(oldItemArr, itemArr, {
              key: subKey, filterKeys: _extends({ [subKey]: subKey }, filterKeys)
            });
            result[subIndex] = obj;
            hasChanged = true;
          }
        }
      } else {
        result[i] = mergeOrReplaceVariable(result[i], item, {
          key: subKey, filterKeys: _extends({ [subKey]: subKey }, filterKeys)
        });
        hasChanged = true;
      }
    }

    if (!hasChanged && !result.includes(item)) {
      result.push(item);
    }
  }

  return result;
}

function mergeOrReplaceVariable(oldVal, newVal, { key = '', filterKeys = {} } = {}) {
  if (Array.isArray(newVal) && Array.isArray(oldVal)) {
    return mergeArrays(oldVal, newVal, { key, filterKeys });
  } else if (oldVal.constructor === Object && newVal.constructor === Object) {
    return mergeJSONObjects(oldVal, newVal, { filterKeys });
  }

  return newVal;
}

mergeOrReplaceVariable.all = function (arr = [], options = {}) {
  return arr.reduce(function (prev, next) {
    return mergeOrReplaceVariable(prev, next, options);
  }, {});
};