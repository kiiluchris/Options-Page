'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportData = exports.importData = exports.optionsUITemplatePath = exports.setupOptionsListeners = undefined;

var _extension = require('./extension');

const setupOptionsListeners = exports.setupOptionsListeners = ({ cleanupKeys, filterKeys }) => {
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