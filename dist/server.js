"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/stable");

require("regenerator-runtime/runtime");

var _util = _interopRequireDefault(require("util"));

var BPromise = _interopRequireWildcard(require("bluebird"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _multer = _interopRequireDefault(require("multer"));

var _path5 = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _child_process = require("child_process");

var _imagemin = _interopRequireDefault(require("imagemin"));

var _imageminPngquant = _interopRequireDefault(require("imagemin-pngquant"));

var _imageminMozjpeg = _interopRequireDefault(require("imagemin-mozjpeg"));

var _imageminGiflossy = _interopRequireDefault(require("imagemin-giflossy"));

var _imageminSvgo = _interopRequireDefault(require("imagemin-svgo"));

var _svgo = require("svgo");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var execPromise = _util["default"].promisify(_child_process.exec);

var app = (0, _express["default"])();
app.use('/uploads', _express["default"]["static"](_path5["default"].join(__dirname + '/uploads')));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + _path5["default"].extname(file.originalname));
  }
});

var upload = (0, _multer["default"])({
  storage: storage
}); //Handles image upload

app.post('/upload/images', upload.array("images", 20), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var files, fileUrlArr;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return req.files;

          case 2:
            files = _context.sent;
            //console.log(files);
            fileUrlArr = files.map(function (file) {
              var filePath = _path5["default"].join(file.filename);

              return filePath;
            }); //console.log("file url array: "+fileUrlArr)

            res.json(JSON.stringify(fileUrlArr));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // Handle Image compression 

app.get('/compress/images', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var imageNameArray, imagePathArray, compressRatio, pngRatio, jpegRatio, gifRatio;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            try {
              imageNameArray = req.query.imageNames;

              if (!Array.isArray(imageNameArray)) {
                imageNameArray = new Array(imageNameArray);
              }

              imagePathArray = imageNameArray.map(function (imageName) {
                return 'uploads/' + imageName;
              });
              compressRatio = Number(req.query.compressRatio);
              pngRatio = {
                max: compressRatio / 100,
                min: compressRatio / 100 - compressRatio / 100 * .2
              };
              jpegRatio = compressRatio;
              gifRatio = Math.ceil(3 - compressRatio / 100 * 3);
              (0, _imagemin["default"])(_toConsumableArray(imagePathArray), {
                destination: "compressed",
                plugins: [(0, _imageminPngquant["default"])({
                  quality: [pngRatio.min, pngRatio.max]
                }), (0, _imageminMozjpeg["default"])({
                  quality: jpegRatio
                }), (0, _imageminGiflossy["default"])({
                  lossy: 70,
                  optimizationLevel: gifRatio
                }), (0, _imageminSvgo["default"])({
                  plugins: (0, _svgo.extendDefaultPlugins)([{
                    name: 'removeViewBox',
                    active: false
                  }])
                })]
              }).then(function () {
                return res.sendStatus(200);
              });
              ;
            } catch (error) {
              console.error(error);
              res.sendStatus(500);
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); //Handles image download

app.get("/download/image", function (req, res) {
  try {
    var fileName = req.query.url;
    var compressedPath = "compressed/" + req.query.url;

    var _path = "uploads/" + req.query.url;

    var url = process.cwd() + '/compressed/' + fileName;
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Content-Dispositon", "attachment; filename=" + 'test.jpeg');
    res.sendFile(url, {
      headers: {
        "Content-Disposition": "attachment;filename=".concat(fileName)
      }
    }, function (err) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        console.log("File send: " + fileName);
        setTimeout(function () {
          _fs["default"].unlink(_path, function () {
            console.log(_path.split("/")[1] + " has been deleted from uploads folder!");
          });

          _fs["default"].unlink(compressedPath, function () {
            console.log(compressedPath.split("/")[1] + " has been deleted from compressed folder!");
          });
        }, 36000);
      }
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}); //Handles pdf upload

app.post('/upload/pdfs', upload.array("pdfs", 20), /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var files, fileUrlArr;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return req.files;

          case 2:
            files = _context3.sent;
            fileUrlArr = files.map(function (file) {
              var filePath = _path5["default"].join(file.filename);

              return filePath;
            });
            res.json(JSON.stringify(fileUrlArr));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // Handles Pdf compression

app.get('/compress/pdfs', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var pdfNameArray, _path2, compressedPath;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (Array.isArray(req.query.pdfNames)) {
              pdfNameArray = req.query.pdfNames;
              pdfNameArray = pdfNameArray.map(function (pdfName) {
                var path = 'uploads/' + pdfName;
                var compressedPath = 'compressed/' + pdfName;
                return execPromise("gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=./".concat(compressedPath, " ./").concat(path));
              });
              Promise.all(pdfNameArray).then(function () {
                res.sendStatus(200);
              })["catch"](function () {
                console.error(error);
                res.sendStatus(500);
              });
            } else {
              _path2 = 'uploads/' + req.query.pdfNames;
              compressedPath = 'compressed/' + req.query.pdfNames;
              execPromise("gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=./".concat(compressedPath, " ./").concat(_path2)).then(function () {
                res.sendStatus(200);
              });
            } //let pdfPathArray = pdfNameArray.map(pdfName=>"uploads/"+pdfName)


          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); //Handles pdf download

app.get('/download/pdf', function (req, res) {
  try {
    var fileName = req.query.url;
    var compressedPath = "compressed/" + req.query.url;

    var _path3 = "uploads/" + req.query.url;

    var url = process.cwd() + "/" + compressedPath;
    res.sendFile(url, {
      headers: {
        "Content-Disposition": "attachment;filename=".concat(fileName)
      }
    }, function (err) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        console.log("File send: " + fileName);
        setTimeout(function () {
          _fs["default"].unlink(_path3, function () {
            console.log(_path3.split("/")[1] + " has been deleted from uploads folder!");
          });

          _fs["default"].unlink(compressedPath, function () {
            console.log(compressedPath.split("/")[1] + " has been deleted from compressed folder!");
          });
        }, 36000);
      }
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}); //Handles video upload

app.post('/upload/videos', upload.array("videos", 5), /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var files, fileUrlArr;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            files = req.files;
            fileUrlArr = files.map(function (file) {
              var filePath = _path5["default"].join(file.filename);

              return filePath;
            });
            res.json(JSON.stringify(fileUrlArr));

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()); //Handles video compression

app.get('/compress/videos', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var videoNameArray, compressRatio, crf, widthScale, heightScale;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            videoNameArray = req.query.videoNames;
            compressRatio = Number(req.query.compressRatio);
            crf = 24 - Math.ceil((compressRatio / 100 - .5) * 2 * 6);
            widthScale = 0.5 + compressRatio / 2 / 100;
            heightScale = 0.5 + compressRatio / 2 / 100;

            if (!Array.isArray(videoNameArray)) {
              videoNameArray = new Array(videoNameArray);
            }

            videoNameArray = videoNameArray.map(function (videoName) {
              var path = 'uploads/' + videoName;
              var compressedPath = 'compressed/' + videoName;
              return execPromise("ffmpeg -i ./".concat(path, " -crf ").concat(crf, " -vf \"scale=iw*").concat(widthScale, ":ih*").concat(heightScale, "\" ./").concat(compressedPath));
            });
            Promise.all(videoNameArray).then(function () {
              res.sendStatus(200);
            })["catch"](function (err) {
              console.log(err);
              res.sendStatus(500);
            });

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}()); //Handles video download

app.get('/download/video', function (req, res) {
  try {
    var fileName = req.query.url;
    var compressedPath = "compressed/" + req.query.url;

    var _path4 = "uploads/" + compressedPath.split("/")[1];

    var url = process.cwd() + "/" + compressedPath;
    res.sendFile(url, {
      headers: {
        "Content-Disposition": "attachment;filename=".concat(fileName)
      }
    }, function (err) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        console.log("File send: " + fileName);
        setTimeout(function () {
          _fs["default"].unlink(_path4, function () {
            console.log(_path4.split("/")[1] + " has been deleted from uploads folder!");
          });

          _fs["default"].unlink(compressedPath, function () {
            console.log(compressedPath.split("/")[1] + " has been deleted from compressed folder!");
          });
        }, 36000);
      }
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log("Server is listening to " + PORT);
});