'use strict';

// setup env variables
require('dotenv').config();

// SILENCE ERROR IN PROD
if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ silent: true });
}

// PACKAGES . . .
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const webpackDevMiddleware = require('webpack-dev-middleware');

const PORT = process.env.PORT || 3000;
const webpack = require('webpack');
const webpackConfig = require('../../webpack.server.config.js');
const compiler = webpack(webpackConfig);

// SETUP ROUTES . . .
const index = require('./routes/index');

// EXPRESS APP
const app = express();

// HTTP headers security
app.disable('x-powered-by');

// MIDDLEWARE . . .
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// http request logger
switch (app.get('env')) {
  case 'production':
    app.use(morgan('combined'));
    break;
  case 'development':
    app.use(morgan('dev'));
    break;
  default:
    console.log('No logging done by morgan.');
}

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  reload: true,
  timeout: 2000
}));

// SERVE STATIC FILES
app.use(express.static('dist'));

// USE ROUTES . . .
app.use('/api', index);

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

// 404 CATCH ALL
app.use(function(_req, res, _next) {
  res.sendStatus(404);
});

// ERROR HANDLING
app.use(function(err, req, res, next) {
  console.error(err.message);
  // If no specified error code, set to 'Internal Server Error (500)'
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  // Send error with status code and message
  res.status(err.statusCode).send(err.message);
});

// START SERVER!!!
app.listen(PORT, function() {
  console.log('Served fresh daily on PORT: ', PORT);
});
