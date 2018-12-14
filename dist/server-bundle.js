/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/main-server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/express.js":
/*!*******************************!*\
  !*** ./src/server/express.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\n// setup env variables\r\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\r\n\r\n// SILENCE ERROR IN PROD\r\nif (false) {}\r\n\r\n// PACKAGES . . .\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\r\nconst morgan = __webpack_require__(/*! morgan */ \"morgan\");\r\nconst webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\r\n\r\nconst PORT = process.env.PORT || 3000;\r\nconst webpack = __webpack_require__(/*! webpack */ \"webpack\");\r\nconst webpackConfig = __webpack_require__(/*! ../../webpack.server.config.js */ \"./webpack.server.config.js\");\r\nconst compiler = webpack(webpackConfig);\r\n\r\n// SETUP ROUTES . . .\r\nconst index = __webpack_require__(/*! ./routes/index */ \"./src/server/routes/index.js\");\r\n\r\n// EXPRESS APP\r\nconst app = express();\r\n\r\n// HTTP headers security\r\napp.disable('x-powered-by');\r\n\r\n// MIDDLEWARE . . .\r\n// parse application/x-www-form-urlencoded\r\napp.use(bodyParser.urlencoded({ extended: false }));\r\n\r\n// parse application/json\r\napp.use(bodyParser.json());\r\n\r\n// http request logger\r\nswitch (app.get('env')) {\r\n  case 'production':\r\n    app.use(morgan('combined'));\r\n    break;\r\n  case 'development':\r\n    app.use(morgan('dev'));\r\n    break;\r\n  default:\r\n    console.log('No logging done by morgan.');\r\n}\r\n\r\napp.use(webpackDevMiddleware(compiler, {\r\n  publicPath: webpackConfig.output.publicPath,\r\n  reload: true,\r\n  timeout: 2000\r\n}));\r\n\r\n// SERVE STATIC FILES\r\napp.use(express.static('dist'));\r\n\r\n// USE ROUTES . . .\r\napp.use('/api', index);\r\n\r\napp.get('*', function(req, res) {\r\n  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));\r\n});\r\n\r\n// 404 CATCH ALL\r\napp.use(function(_req, res, _next) {\r\n  res.sendStatus(404);\r\n});\r\n\r\n// ERROR HANDLING\r\napp.use(function(err, req, res, next) {\r\n  console.error(err.message);\r\n  // If no specified error code, set to 'Internal Server Error (500)'\r\n  if (!err.statusCode) {\r\n    err.statusCode = 500;\r\n  }\r\n  // Send error with status code and message\r\n  res.status(err.statusCode).send(err.message);\r\n});\r\n\r\n// START SERVER!!!\r\napp.listen(PORT, function() {\r\n  console.log('Served fresh daily on PORT: ', PORT);\r\n});\r\n\n\n//# sourceURL=webpack:///./src/server/express.js?");

/***/ }),

/***/ "./src/server/main-server.js":
/*!***********************************!*\
  !*** ./src/server/main-server.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./express */ \"./src/server/express.js\");\r\n\n\n//# sourceURL=webpack:///./src/server/main-server.js?");

/***/ }),

/***/ "./src/server/routes/index.js":
/*!************************************!*\
  !*** ./src/server/routes/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\r\nvar router = express.Router();\r\n\r\n/* GET home page. */\r\nrouter.get('/', function(req, res, next) {\r\n  res.sendStatus(200);\r\n  res.send('Hello Express routes!')\r\n});\r\n\r\nmodule.exports = router;\r\n\n\n//# sourceURL=webpack:///./src/server/routes/index.js?");

/***/ }),

/***/ "./webpack.server.config.js":
/*!**********************************!*\
  !*** ./webpack.server.config.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const path = __webpack_require__(/*! path */ \"path\");\r\nconst webpack = __webpack_require__(/*! webpack */ \"webpack\");\r\nconst nodeExternals = __webpack_require__(/*! webpack-node-externals */ \"webpack-node-externals\");\r\n\r\nmodule.exports = {\r\n  mode: 'development',\r\n  entry: {\r\n    server: './src/server/main-server.js'\r\n  },\r\n  output: {\r\n    path: path.join(__dirname, 'dist'),\r\n    publicPath: '/',\r\n    filename: 'server-bundle.js'\r\n  },\r\n  target: 'node',\r\n  node: {\r\n    __dirname: false\r\n  },\r\n  externals: [nodeExternals()]\r\n}\r\n\n\n//# sourceURL=webpack:///./webpack.server.config.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-dev-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-dev-middleware%22?");

/***/ }),

/***/ "webpack-node-externals":
/*!*****************************************!*\
  !*** external "webpack-node-externals" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-node-externals\");\n\n//# sourceURL=webpack:///external_%22webpack-node-externals%22?");

/***/ })

/******/ });