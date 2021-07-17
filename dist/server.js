"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
            files = req.files;
            fileUrlArr = files.map(function (file) {
              var filePath = _path5["default"].join(file.filename);

              return filePath;
            });
            res.json(JSON.stringify(fileUrlArr));

          case 3:
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

app.get('/compress/image', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var imageName, compressRatio, pngRatio, jpegRatio, gifRatio, _path, compressedPath, compressedImage;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            imageName = req.query.imageName;
            compressRatio = Number(req.query.compressRatio);
            pngRatio = {
              max: compressRatio / 100,
              min: compressRatio / 100 - compressRatio / 100 * .2
            };
            jpegRatio = compressRatio;
            gifRatio = Math.ceil(3 - compressRatio / 100 * 3);
            _path = 'uploads/' + imageName;
            compressedPath = 'compressed/' + imageName;
            _context2.next = 10;
            return (0, _imagemin["default"])([_path], {
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
            });

          case 10:
            compressedImage = _context2.sent;
            res.sendStatus(200);
            _context2.next = 18;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
            res.sendStatus(500);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 14]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); //Handles image download

app.get("/download/image", function (req, res) {
  try {
    var compressedPath = req.query.url;

    var _path2 = "uploads/" + compressedPath.split("/")[1];

    var file = _fs["default"].createReadStream(compressedPath);

    file.on('end', function () {
      _fs["default"].unlink(_path2, function () {
        console.log(_path2.split("/")[1] + " has been deleted!");
      });

      _fs["default"].unlink(compressedPath, function () {
        console.log(compressedPath.split("/")[1] + " has been deleted!");
      });
    });
    file.pipe(res);
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
            files = req.files;
            fileUrlArr = files.map(function (file) {
              var filePath = _path5["default"].join(file.filename);

              return filePath;
            });
            res.json(JSON.stringify(fileUrlArr));

          case 3:
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

app.get('/compress/pdf', function (req, res) {
  var pdfName = req.query.pdfName;
  var path = 'uploads/' + pdfName;
  var compressedPath = 'compressed/' + pdfName;
  (0, _child_process.exec)("gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=./".concat(compressedPath, " ./").concat(path), function (error) {
    if (error) {
      console.error("Error encountered while compressing ".concat(pdfName));
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
}); //Handles pdf download

app.get('/download/pdf', function (req, res) {
  try {
    var compressedPath = req.query.url;

    var _path3 = "uploads/" + compressedPath.split("/")[1];

    var file = _fs["default"].createReadStream(compressedPath);

    file.on('end', function () {
      _fs["default"].unlink(_path3, function () {
        console.log(_path3.split("/")[1] + " hase been deleted!");
      });

      _fs["default"].unlink(compressedPath, function () {
        console.log(compressedPath.split("/")[1] + " hase been deleted!");
      });
    });
    file.pipe(res);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}); //Handles video upload

app.post('/upload/videos', upload.array("videos", 5), /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var files, fileUrlArr;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            files = req.files;
            fileUrlArr = files.map(function (file) {
              var filePath = _path5["default"].join(file.filename);

              return filePath;
            });
            res.json(JSON.stringify(fileUrlArr));

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); //Handles video compression

app.get('/compress/video', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var videoName, compressRatio, path, compressedPath, crf, widthScale, heightScale;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            videoName = req.query.videoName;
            compressRatio = Number(req.query.compressRatio);
            path = 'uploads/' + videoName;
            compressedPath = 'compressed/' + videoName;
            crf = 24 - Math.ceil((compressRatio / 100 - .5) * 2 * 6);
            widthScale = 0.5 + compressRatio / 2 / 100;
            heightScale = 0.5 + compressRatio / 2 / 100;
            console.log("crf" + crf);
            console.log("width: " + widthScale);
            console.log("height: " + heightScale);
            (0, _child_process.exec)("ffmpeg -i ./".concat(path, " -crf ").concat(crf, " -vf \"scale=iw*").concat(widthScale, ":ih*").concat(heightScale, "\" ./").concat(compressedPath), {
              timeout: 360000
            }, function (error) {
              if (error) {
                console.error("Error encountered while compressing ".concat(videoName));
                res.sendStatus(500);
              } else {
                res.sendStatus(200);
              }
            });

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()); //Handles video download

app.get('/download/video', function (req, res) {
  try {
    var compressedPath = req.query.url;

    var _path4 = "uploads/" + compressedPath.split("/")[1];

    var file = _fs["default"].createReadStream(compressedPath);

    file.on('end', function () {
      _fs["default"].unlink(_path4, function () {
        console.log(_path4.split("/")[1] + " hase been deleted!");
      });

      _fs["default"].unlink(compressedPath, function () {
        console.log(compressedPath.split("/")[1] + " hase been deleted!");
      });
    });
    file.pipe(res);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log("Server is listening to " + PORT);
});