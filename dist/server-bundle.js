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
eval("\n\n// setup env variables\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\n// SILENCE ERROR IN PROD\nif (false) {}\n\n// PACKAGES . . .\nconst express = __webpack_require__(/*! express */ \"express\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst morgan = __webpack_require__(/*! morgan */ \"morgan\");\nconst webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\n\nconst PORT = process.env.PORT || 3000;\nconst webpack = __webpack_require__(/*! webpack */ \"webpack\");\nconst webpackConfig = __webpack_require__(/*! ../../webpack.server.config.js */ \"./webpack.server.config.js\");\nconst compiler = webpack(webpackConfig);\n\n// SETUP ROUTES . . .\nconst index = __webpack_require__(/*! ./routes/index */ \"./src/server/routes/index.js\");\n\n// EXPRESS APP\nconst app = express();\n\n// HTTP headers security\napp.disable('x-powered-by');\n\n// MIDDLEWARE . . .\n// parse application/x-www-form-urlencoded\napp.use(bodyParser.urlencoded({ extended: false }));\n\n// parse application/json\napp.use(bodyParser.json());\n\n// http request logger\nswitch (app.get('env')) {\n  case 'production':\n    app.use(morgan('combined'));\n    break;\n  case 'development':\n    app.use(morgan('dev'));\n    break;\n  default:\n    console.log('No logging done by morgan.');\n}\n\napp.use(webpackDevMiddleware(compiler, {\n  publicPath: webpackConfig.output.publicPath,\n  reload: true,\n  timeout: 2000\n}));\n\n// SERVE STATIC FILES\napp.use(express.static('dist'));\n\n// USE ROUTES . . .\napp.use('/api', index);\n\napp.get('*', function(req, res) {\n  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));\n});\n\n// 404 CATCH ALL\napp.use(function(_req, res, _next) {\n  res.sendStatus(404);\n});\n\n// ERROR HANDLING\napp.use(function(err, req, res, next) {\n  console.error(err.message);\n  // If no specified error code, set to 'Internal Server Error (500)'\n  if (!err.statusCode) {\n    err.statusCode = 500;\n  }\n  // Send error with status code and message\n  res.status(err.statusCode).send(err.message);\n});\n\n// START SERVER!!!\napp.listen(PORT, function() {\n  console.log('Served fresh daily on PORT: ', PORT);\n});\n\n\n//# sourceURL=webpack:///./src/server/express.js?");

/***/ }),

/***/ "./src/server/main-server.js":
/*!***********************************!*\
  !*** ./src/server/main-server.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./express */ \"./src/server/express.js\");\n\n\n//# sourceURL=webpack:///./src/server/main-server.js?");

/***/ }),

/***/ "./src/server/routes/index.js":
/*!************************************!*\
  !*** ./src/server/routes/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\nvar router = express.Router();\n\n/* GET home page. */\nrouter.get('/', function(req, res, next) {\n  res.sendStatus(200);\n  res.send('Hello Express routes!')\n});\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./src/server/routes/index.js?");

/***/ }),

/***/ "./webpack.server.config.js":
/*!**********************************!*\
  !*** ./webpack.server.config.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const path = __webpack_require__(/*! path */ \"path\");\nconst webpack = __webpack_require__(/*! webpack */ \"webpack\");\nconst nodeExternals = __webpack_require__(/*! webpack-node-externals */ \"webpack-node-externals\");\n\nmodule.exports = {\n  mode: 'development',\n  entry: {\n    server: './src/server/main-server.js'\n  },\n  output: {\n    path: path.join(__dirname, 'dist'),\n    publicPath: '/',\n    filename: 'server-bundle.js'\n  },\n  target: 'node',\n  node: {\n    __dirname: false\n  },\n  externals: [nodeExternals()]\n}\n\n\n//# sourceURL=webpack:///./webpack.server.config.js?");

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