"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

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
app.use('/uploads', _express["default"]["static"](_path["default"].join(__dirname + '/uploads')));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + _path["default"].extname(file.originalname));
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});
app.post('/upload', upload.array("images", 10), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var files, fileUrlArr;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            files = req.files;
            fileUrlArr = files.map(function (file) {
              var filePath = _path["default"].join(file.filename);

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
}());
app.get('/download/:imageName', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var imageName, path, compressedPath, compressedImage, file;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            imageName = req.params.imageName;
            path = 'uploads/' + imageName;
            compressedPath = 'compressed/' + imageName;
            _context2.next = 5;
            return (0, _imagemin["default"])([path], {
              destination: "compressed",
              plugins: [(0, _imageminPngquant["default"])({
                quality: [0.6, 0.8]
              }), (0, _imageminMozjpeg["default"])(), (0, _imageminGiflossy["default"])({
                lossy: 70
              }), (0, _imageminSvgo["default"])({
                plugins: (0, _svgo.extendDefaultPlugins)([{
                  name: 'removeViewBox',
                  active: false
                }])
              })]
            });

          case 5:
            compressedImage = _context2.sent;
            file = _fs["default"].createReadStream(compressedPath);
            file.on('end', function () {
              _fs["default"].unlink(path, function () {
                console.log(path + " hase been deleted!");
              });

              _fs["default"].unlink(compressedPath, function () {
                console.log(compressedPath + " hase been deleted!");
              });
            });
            file.pipe(res);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log("Server is listening to " + PORT);
});