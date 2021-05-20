"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

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
app.post('/compress', upload.single("images"), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var files, compressedFiles, fileUrlArr;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            files = req.files;
            _context.next = 3;
            return (0, _imagemin["default"])(['uploads/*.{jpeg,jpg,png,gif,svg}'], {
              destination: "output",
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

          case 3:
            compressedFiles = _context.sent;
            //const filepath = path.join(process.cwd()+"/"+compressedFiles[0].destinationPath);
            //const filename = compressedFiles[0].destinationPath.split("/")[1]
            console.log(compressedFiles);
            fileUrlArr = compressedFiles.map(function (file) {
              var filePath = _path["default"].join(process.cwd() + '/' + file.destinationPath);

              return filePath;
            }); //console.log(filepath)
            //res.send(filepath);

            res.json(JSON.stringify(fileUrlArr));

          case 7:
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
app.get('/time', function (req, res) {
  var time = new Date().toString(); //console.log(time)

  res.send(time);
});
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log("Server is listening to " + PORT);
});