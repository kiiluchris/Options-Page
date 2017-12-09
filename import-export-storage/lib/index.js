'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportData = exports.importData = exports.optionsUITemplatePath = exports.setupOptionsListeners = undefined;

var _extension = require('./extension');

var _path = require('path');

/**
 * Setup click listeners for the options.html
 * 
 * @export
 * @param {object} {cleanupKeys, filterKeys} Array of keys to be retained at the root of data, Object mapping object keys of arrays to keys by which contents are filtered
 */
const setupOptionsListeners = exports.setupOptionsListeners = function ({ cleanupKeys = [], filterKeys = {} }) {
  document.querySelector('main button#import').addEventListener('click', function () {
    (0, _extension.importData)({ cleanupKeys, filterKeys }).then(window.close).catch(console.error);
  });
  document.querySelector('main button#export').addEventListener('click', function () {
    (0, _extension.exportData)().then(window.close).catch(console.error);
  });
  document.querySelector('main button#merge').addEventListener('click', function () {
    (0, _extension.importData)({ cleanupKeys, filterKeys }, false).then(window.close).catch(console.error);
  });
};
const optionsUITemplatePath = exports.optionsUITemplatePath = (0, _path.resolve)(__dirname, '../options.html');
exports.importData = _extension.importData;
exports.exportData = _extension.exportData;