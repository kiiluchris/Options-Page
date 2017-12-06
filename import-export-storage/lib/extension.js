'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importData = exports.exportData = undefined;

var exportData = exports.exportData = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var _this = this;

    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new Promise(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
                var data, blob, url, el;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return getStorage(key);

                      case 2:
                        data = _context.sent;
                        blob = new Blob([JSON.stringify(data, null, '\t')], { type: 'application/json' });
                        url = URL.createObjectURL(blob);
                        el = document.createElement('a');

                        el.setAttribute('href', url);
                        el.setAttribute('download', 'data.json');
                        el.addEventListener('click', resolve);
                        el.click();

                      case 10:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }()).then(window.close));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function exportData() {
    return _ref.apply(this, arguments);
  };
}();

var importData = exports.importData = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref3) {
    var _this3 = this;

    var _ref3$cleanupKeys = _ref3.cleanupKeys,
        cleanupKeys = _ref3$cleanupKeys === undefined ? [] : _ref3$cleanupKeys,
        _ref3$filterKeys = _ref3.filterKeys,
        filterKeys = _ref3$filterKeys === undefined ? {} : _ref3$filterKeys;
    var isReplacingData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt('return', new Promise(function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve) {
                var el;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        el = document.createElement('input');

                        el.setAttribute('type', 'file');
                        el.setAttribute('accept', '.json');
                        el.click();
                        el.addEventListener('change', function () {
                          if (this.files.length) {
                            var reader = new FileReader();
                            reader.addEventListener('load', function () {
                              var _this2 = this;

                              return function () {
                                var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(res) {
                                  var data, dataInStorage;
                                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                      switch (_context3.prev = _context3.next) {
                                        case 0:
                                          data = cleanData(res, cleanupKeys);

                                          if (!isReplacingData) {
                                            _context3.next = 6;
                                            break;
                                          }

                                          _context3.next = 4;
                                          return setStorage(data);

                                        case 4:
                                          _context3.next = 11;
                                          break;

                                        case 6:
                                          _context3.next = 8;
                                          return getStorage();

                                        case 8:
                                          dataInStorage = _context3.sent;
                                          _context3.next = 11;
                                          return setStorage((0, _mergeJson.mergeJSONObjects)(filterKeys)(data, dataInStorage));

                                        case 11:
                                        case 'end':
                                          return _context3.stop();
                                      }
                                    }
                                  }, _callee3, _this2);
                                }));

                                return function (_x8) {
                                  return _ref6.apply(this, arguments);
                                };
                              }()(this.result).then(resolve).catch(console.error);
                            });
                            reader.readAsText(this.files[0]);
                          }
                        });

                      case 5:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, _this3);
              }));

              return function (_x7) {
                return _ref5.apply(this, arguments);
              };
            }()).then(window.close));

          case 1:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function importData(_x6) {
    return _ref4.apply(this, arguments);
  };
}();

var _mergeJson = require('./merge-json');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function getStorage() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return new Promise(function (res) {
    var _chrome$storage$local;

    var args = key === '' ? [res] : [key, res];
    (_chrome$storage$local = chrome.storage.local).get.apply(_chrome$storage$local, args);
  });
}

function setStorage(data) {
  return new Promise(function (res) {
    chrome.storage.local.set(data, res);
  });
}

function cleanData(fileContents) {
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var src = JSON.parse(fileContents);
  var parsedData = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var k = _step.value;

      if (src.hasOwnProperty(k)) {
        parsedData[k] = src[k];
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

  return parsedData;
}