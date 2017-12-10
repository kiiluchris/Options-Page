'use strict';
const {assert} = require('chai');
const {spy, stub} = require('sinon');
const mergeJSON = require('../lib//merge-json');
const {
  webtoons, mergedWebtoons, extraWebtoons,
  deepArray, deepArrayExtras, mergedDeepArray,
  deepObj, deepObjNew, mergedDeepObj
} = require('./data');


describe('JS variable merging', function(){
  beforeEach('Setup merge function listeners', function setupSinon(){
    spy(mergeJSON, 'mergeArrays');
    spy(mergeJSON, 'mergeJSONObjects');
    spy(mergeJSON, 'mergeOrReplaceVariable');
  });
  
  afterEach('Destroy merge function listeners', function destroySinon(){
    mergeJSON.mergeArrays.restore();
    mergeJSON.mergeJSONObjects.restore();
    mergeJSON.mergeOrReplaceVariable.restore();
  });
  
  describe('Array Merge tests', function(){
    it('Merges two flat arrays', function(){
      const arr = mergeJSON.mergeOrReplaceVariable([4,5,6], [1,2,3]);
      assert.lengthOf(arr, 6, `Array length meant to be 6. ${arr.length} elements in array.`)
      assert.strictEqual(2, arr[4]);
    });
    it('Merges multiple flat arrays', function(){
      const arr = mergeJSON.mergeOrReplaceVariable.all(
        [[4,5,6], [1,2,3], [45,56,67], [678, 234, 567]]
      );
      assert.lengthOf(arr, 12, `Array length meant to be 6. ${arr.length} elements in array.`)
      assert.deepEqual(arr, [4,5,6, 1,2,3, 45,56,67, 678, 234, 567]);
    });
    
    it('Merges two multidimensional arrays', function(){
      const arr = mergeJSON.mergeOrReplaceVariable([[1,2,3], [456, 678, 789]], [[1,2,3,67], [4,5,6]]);      
      assert.lengthOf(arr, 2, `Array length meant to be 6. ${arr.length} elements in array.`)
      assert.strictEqual(67, arr[0][3]);
      assert.strictEqual(4, arr[1][3]);
      assert.deepEqual(arr, [[1,2,3,67], [456, 678, 789, 4,5,6]]);
    });
  });

  describe('JSON Object Merging', function(){
    it('Merges objects at a shallow level', function(){
      const obj1 = {g: "asd", h: "OLD"};
      const obj2 = {g: 234, t: [45]};
      const res = mergeJSON.mergeOrReplaceVariable(obj1, obj2);
      assert.deepEqual({ g: 234, h: 'OLD', t: [ 45 ] }, res)
    });
    it('Merges two objects deeply', function(){
      const res = mergeJSON.mergeOrReplaceVariable(deepObj, deepObjNew);
      assert.deepEqual(mergedDeepObj, res);
    });
    it('Merges arrays within objects while filtering', function(){
      const res = mergeJSON.mergeOrReplaceVariable(
        webtoons, extraWebtoons, {filterKeys: {"0": "link"}}
      );
      assert.deepEqual(res, mergedWebtoons);
    });
    it('Deeply merges arrays within objects while filtering', function(){
      const res = mergeJSON.mergeOrReplaceVariable(
        deepArray, deepArrayExtras, {filterKeys: {"0": "link"}}
      );
      assert.deepEqual(res, mergedDeepArray);
    });
  });
});