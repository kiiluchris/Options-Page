'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportData = exports.importData = exports.optionsUITemplatePath = exports.setupOptionsListeners = undefined;

var _extension = require('./extension');

/**
 * Setup click listeners for the options.html
 * 
 * @export
 * @param {object} {cleanupKeys, filterKeys} Array of keys to be retained at the root of data, Object mapping object keys of arrays to keys by which contents are filtered
 */
const setupOptionsListeners = exports.setupOptionsListeners = ({ cleanupKeys = [], filterKeys = {} }) => {
  document.querySelector('main button#import').addEventListener('click', () => {
    (0, _extension.importData)({ cleanupKeys, filterKeys }).catch(console.error);
  });
  document.querySelector('main button#export').addEventListener('click', () => {
    (0, _extension.exportData)().catch(console.error);
  });
  document.querySelector('main button#merge').addEventListener('click', () => {
    (0, _extension.importData)({ cleanupKeys, filterKeys }, false).catch(console.error);
  });
};

exports.default = setupOptionsListeners;
const optionsUITemplatePath = exports.optionsUITemplatePath = __dirname + '../options.ejs';
exports.importData = _extension.importData;
exports.exportData = _extension.exportData;