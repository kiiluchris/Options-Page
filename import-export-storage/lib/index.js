'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportData = exports.importData = exports.templatePath = undefined;

var _extension = require('./extension');

var setupOptionsListeners = function setupOptionsListeners(_ref) {
  var cleanupKeys = _ref.cleanupKeys,
      filterKeys = _ref.filterKeys;

  document.querySelector('main button#import').addEventListener('click', function () {
    (0, _extension.importData)({ cleanupKeys: cleanupKeys, filterKeys: filterKeys }).catch(console.error);
  });
  document.querySelector('main button#export').addEventListener('click', function () {
    (0, _extension.exportData)().catch(console.error);
  });
  document.querySelector('main button#merge').addEventListener('click', function () {
    (0, _extension.importData)({ cleanupKeys: cleanupKeys, filterKeys: filterKeys }, false).catch(console.error);
  });
};

exports.default = setupOptionsListeners;
var templatePath = exports.templatePath = __dirname + '../options.ejs';
exports.importData = _extension.importData;
exports.exportData = _extension.exportData;