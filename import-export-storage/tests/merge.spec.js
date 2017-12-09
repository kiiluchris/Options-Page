'use strict';
const {assert} = require('chai');
const {mergeArrays, mergeJSONObjects} = require('../lib//merge-json');
const {
  webtoons, mergedWebtoons, extraWebtoons,
  deepArray, deepArrayExtras, mergedDeepArray,
  deepObj, deepObjNew, mergedDeepObj
} = require('./data');

describe('Array Merge tests', () => {
  it('Merges two flat arrays', () => {
    const arr = mergeArrays()([4,5,6], [1,2,3]);
    assert.lengthOf(arr, 6, `Array length meant to be 6. ${arr.length} elements in array.`)
    assert.strictEqual(2, arr[4]);
  });
  
  it('Merges two multidimensional arrays', () => {
    const arr = mergeArrays()([[1,2,3], [456, 678, 789]], [[1,2,3,67], [4,5,6]]);
    assert.lengthOf(arr, 2, `Array length meant to be 6. ${arr.length} elements in array.`)
    assert.strictEqual(67, arr[0][3]);
    assert.strictEqual(4, arr[1][3]);
    assert.deepEqual(arr, [[1,2,3,67], [456, 678, 789, 4,5,6]]);
  });
});

describe('JSON Object Merging', () => {
  it('Merges objects at a shallow level', () => {
    const obj1 = {g: "asd", h: "OLD"};
    const obj2 = {g: 234, t: [45]};
    const res = mergeJSONObjects()(obj1, obj2);
    assert.deepEqual({ g: 234, h: 'OLD', t: [ 45 ] }, res)
  });
  it('Merges two objects deeply', () => {
    const res = mergeJSONObjects()(deepObj, deepObjNew);
    assert.deepEqual(mergedDeepObj, res);
  });
  it('Merges arrays within objects while filtering', () => {
    const res = mergeJSONObjects({"0": "link"})(
      webtoons, extraWebtoons
    );
    assert.deepEqual(res, mergedWebtoons);
  });
  it('Deeply merges arrays within objects while filtering', () => {
    const res = mergeJSONObjects({"0": "link"})(
      deepArray, deepArrayExtras
    );
    // console.log(JSON.stringify(res.x[0], null, '\t'))
    assert.deepEqual(res, mergedDeepArray);
  })
});